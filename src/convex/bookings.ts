import { getAuthUserId } from "@convex-dev/auth/server";
import { action, mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";

// ---------------------------------------------------------------------------
// Sessions
// ---------------------------------------------------------------------------

/** Upcoming sessions for a course with live booked-seat counts. */
export const listSessionsForCourse = query({
  args: { courseId: v.id("courses") },
  handler: async (ctx, { courseId }) => {
    const now = Date.now();
    const sessions = await ctx.db
      .query("sessions")
      .withIndex("by_course_start", (q) => q.eq("courseId", courseId))
      .filter((q) => q.gte(q.field("startsAt"), now))
      .collect();
    return Promise.all(
      sessions.map(async (session) => {
        const active = await ctx.db
          .query("bookings")
          .withIndex("by_session", (q) => q.eq("sessionId", session._id))
          .filter((q) => q.neq(q.field("status"), "cancelled"))
          .collect();
        return { ...session, bookedCount: active.length };
      }),
    );
  },
});

export const createSession = mutation({
  args: {
    courseId: v.id("courses"),
    startsAt: v.number(),
    durationMinutes: v.number(),
    capacity: v.number(),
  },
  handler: async (ctx, args) => {
    return ctx.db.insert("sessions", args);
  },
});

export const removeSession = mutation({
  args: { id: v.id("sessions") },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id);
    return id;
  },
});

// ---------------------------------------------------------------------------
// Bookings (student)
// ---------------------------------------------------------------------------

/** Book a session. Free courses are confirmed immediately; paid ones wait for checkout. */
export const bookSession = mutation({
  args: { sessionId: v.id("sessions") },
  handler: async (ctx, { sessionId }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Sign in to book a session.");
    }
    const session = await ctx.db.get(sessionId);
    if (!session) {
      throw new Error("Session not found.");
    }
    const course = await ctx.db.get(session.courseId);
    if (!course) {
      throw new Error("Course not found.");
    }
    if (!course.published) {
      throw new Error("This course is not yet available.");
    }

    const existing = await ctx.db
      .query("bookings")
      .withIndex("by_session", (q) => q.eq("sessionId", sessionId))
      .filter((q) =>
        q.and(
          q.eq(q.field("userId"), userId),
          q.neq(q.field("status"), "cancelled"),
        ),
      )
      .first();
    if (existing) {
      throw new Error("You already have a booking for this session.");
    }

    const active = await ctx.db
      .query("bookings")
      .withIndex("by_session", (q) => q.eq("sessionId", sessionId))
      .filter((q) => q.neq(q.field("status"), "cancelled"))
      .collect();
    if (active.length >= session.capacity) {
      throw new Error("This session is full. Please choose another time.");
    }

    const isFree = course.priceCents === 0;
    const bookingId = await ctx.db.insert("bookings", {
      userId,
      courseId: course._id,
      sessionId,
      amountCents: course.priceCents,
      status: isFree ? "confirmed" : "pending",
      paymentStatus: isFree ? "waived" : "unpaid",
      createdAt: Date.now(),
    });
    return bookingId;
  },
});

/** A booking joined with its course, session, and account. */
export const getBooking = query({
  args: { bookingId: v.id("bookings") },
  handler: async (ctx, { bookingId }) => {
    const booking = await ctx.db.get(bookingId);
    if (!booking) {
      return null;
    }
    const course = await ctx.db.get(booking.courseId);
    const session = await ctx.db.get(booking.sessionId);
    const user = await ctx.db.get(booking.userId);
    return {
      ...booking,
      courseTitle: course?.title ?? "Course removed",
      courseSlug: course?.slug ?? "",
      sessionStartsAt: session?.startsAt ?? 0,
      email: user?.email ?? null,
    };
  },
});

/** Mark a booking paid/confirmed. Used by Stripe verification and free courses. */
export const confirmBooking = mutation({
  args: {
    bookingId: v.id("bookings"),
    paymentStatus: v.union(v.literal("paid"), v.literal("waived")),
  },
  handler: async (ctx, { bookingId, paymentStatus }) => {
    const booking = await ctx.db.get(bookingId);
    if (!booking) {
      throw new Error("Booking not found.");
    }
    if (booking.status === "cancelled") {
      throw new Error("This booking was cancelled.");
    }
    await ctx.db.patch(bookingId, { status: "confirmed", paymentStatus });
    return bookingId;
  },
});

/** The current customer's bookings, newest first. */
export const myBookings = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return null;
    }
    const bookings = await ctx.db
      .query("bookings")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();
    return Promise.all(
      bookings.map(async (booking) => {
        const course = await ctx.db.get(booking.courseId);
        const session = await ctx.db.get(booking.sessionId);
        return {
          ...booking,
          courseTitle: course?.title ?? "Course removed",
          courseSlug: course?.slug ?? "",
          sessionStartsAt: session?.startsAt ?? 0,
        };
      }),
    );
  },
});

export const cancelBooking = mutation({
  args: { bookingId: v.id("bookings") },
  handler: async (ctx, { bookingId }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Sign in to manage bookings.");
    }
    const booking = await ctx.db.get(bookingId);
    if (!booking || booking.userId !== userId) {
      throw new Error("Booking not found.");
    }
    if (booking.status === "cancelled") {
      return bookingId;
    }
    if (booking.paymentStatus === "paid") {
      throw new Error(
        "This booking is already paid. Contact the academy to cancel or reschedule.",
      );
    }
    await ctx.db.patch(bookingId, { status: "cancelled" });
    return bookingId;
  },
});

// ---------------------------------------------------------------------------
// Stripe checkout
// ---------------------------------------------------------------------------

/**
 * Create a Stripe Checkout Session for a booking. Returns the hosted checkout
 * URL. When STRIPE_SECRET_KEY is not configured, returns a typed error so the
 * UI can show a clear setup message instead of failing silently.
 */
export const createCheckoutSession = action({
  args: {
    bookingId: v.id("bookings"),
    origin: v.string(),
  },
  handler: async (ctx, { bookingId, origin }) => {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      return { ok: false as const, error: "STRIPE_KEY_MISSING" };
    }
    const booking = await ctx.runQuery(api.bookings.getBooking, { bookingId });
    if (!booking) {
      return { ok: false as const, error: "Booking not found." };
    }
    if (booking.status === "cancelled") {
      return { ok: false as const, error: "This booking was cancelled." };
    }
    if (
      booking.paymentStatus === "paid" ||
      booking.paymentStatus === "waived"
    ) {
      return { ok: false as const, error: "This booking is already settled." };
    }

    const Stripe = await import("stripe");
    const stripe = new Stripe.default(key);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `AgriSkills Academy — ${booking.courseTitle}`,
            },
            unit_amount: booking.amountCents,
          },
          quantity: 1,
        },
      ],
      customer_email: booking.email ?? undefined,
      metadata: { bookingId },
      success_url: `${origin}/booking/${bookingId}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/booking/${bookingId}?cancelled=1`,
    });
    return { ok: true as const, url: session.url ?? "" };
  },
});

/**
 * Verify a completed Stripe Checkout Session server-side, then mark the
 * booking confirmed. Called from the booking page after Stripe redirects back.
 */
export const verifyCheckout = action({
  args: {
    bookingId: v.id("bookings"),
    sessionId: v.string(),
  },
  handler: async (ctx, { bookingId, sessionId }) => {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      return { ok: false as const, error: "STRIPE_KEY_MISSING" };
    }
    const Stripe = await import("stripe");
    const stripe = new Stripe.default(key);
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.metadata?.bookingId !== bookingId) {
      return { ok: false as const, error: "Checkout session does not match this booking." };
    }
    if (session.payment_status !== "paid") {
      return { ok: false as const, error: "Payment was not completed." };
    }
    await ctx.runMutation(api.bookings.confirmBooking, {
      bookingId,
      paymentStatus: "paid",
    });
    return { ok: true as const };
  },
});

// ---------------------------------------------------------------------------
// Admin — bookings
// ---------------------------------------------------------------------------

export const adminListBookings = query({
  args: {},
  handler: async (ctx) => {
    const bookings = await ctx.db.query("bookings").order("desc").collect();
    return Promise.all(
      bookings.map(async (booking) => {
        const course = await ctx.db.get(booking.courseId);
        const session = await ctx.db.get(booking.sessionId);
        const user = await ctx.db.get(booking.userId);
        return {
          ...booking,
          courseTitle: course?.title ?? "Course removed",
          sessionStartsAt: session?.startsAt ?? 0,
          email: user?.email ?? null,
        };
      }),
    );
  },
});

export const setBookingStatus = mutation({
  args: {
    bookingId: v.id("bookings"),
    status: v.union(v.literal("confirmed"), v.literal("cancelled")),
  },
  handler: async (ctx, { bookingId, status }) => {
    const booking = await ctx.db.get(bookingId);
    if (!booking) {
      throw new Error("Booking not found.");
    }
    await ctx.db.patch(bookingId, {
      status,
      // Confirming an unpaid booking by hand counts as settled on-site.
      paymentStatus:
        status === "confirmed" && booking.paymentStatus === "unpaid"
          ? "waived"
          : booking.paymentStatus,
    });
    return bookingId;
  },
});
