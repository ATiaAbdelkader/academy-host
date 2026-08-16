import { getAuthUserId } from "@convex-dev/auth/server";
import { action, mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";
import type { Id } from "./_generated/dataModel";
import { notifyUser } from "./inapp";

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
    venue: v.optional(v.string()),
    joinUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return ctx.db.insert("sessions", {
      courseId: args.courseId,
      startsAt: args.startsAt,
      durationMinutes: args.durationMinutes,
      capacity: args.capacity,
      venue: args.venue?.trim() || undefined,
      joinUrl: args.joinUrl?.trim() || undefined,
    });
  },
});

export const removeSession = mutation({
  args: { id: v.id("sessions") },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id);
    return id;
  },
});

/** All sessions across the catalog with course title and booked seats — admin. */
export const adminListSessions = query({
  args: {},
  handler: async (ctx) => {
    const sessions = await ctx.db.query("sessions").order("desc").collect();
    return Promise.all(
      sessions.map(async (session) => {
        const course = await ctx.db.get(session.courseId);
        const active = await ctx.db
          .query("bookings")
          .withIndex("by_session", (q) => q.eq("sessionId", session._id))
          .filter((q) => q.neq(q.field("status"), "cancelled"))
          .collect();
        return {
          ...session,
          courseTitle: course?.title ?? "Course removed",
          bookedCount: active.length,
        };
      }),
    );
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
      sessionVenue: session?.venue ?? null,
      sessionJoinUrl: session?.joinUrl ?? null,
      instructor: course?.instructor ?? null,
      email: user?.email ?? null,
    };
  },
});

/** Record that the confirmation email for a booking has been sent. */
export const markBookingEmailed = mutation({
  args: { bookingId: v.id("bookings") },
  handler: async (ctx, { bookingId }) => {
    await ctx.db.patch(bookingId, { confirmationEmailSentAt: Date.now() });
    return bookingId;
  },
});

/** Move a booking to another session of the same course. */
export const rescheduleBooking = mutation({
  args: {
    bookingId: v.id("bookings"),
    newSessionId: v.id("sessions"),
  },
  handler: async (ctx, { bookingId, newSessionId }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Sign in to manage bookings.");
    }
    const booking = await ctx.db.get(bookingId);
    if (!booking || booking.userId !== userId) {
      throw new Error("Booking not found.");
    }
    if (booking.status === "cancelled") {
      throw new Error("This booking was cancelled.");
    }
    const target = await ctx.db.get(newSessionId);
    if (!target) {
      throw new Error("Session not found.");
    }
    if (target.courseId !== booking.courseId) {
      throw new Error("That session belongs to a different course.");
    }
    const active = await ctx.db
      .query("bookings")
      .withIndex("by_session", (q) => q.eq("sessionId", newSessionId))
      .filter((q) => q.neq(q.field("status"), "cancelled"))
      .collect();
    if (active.length >= target.capacity) {
      throw new Error("That session is full. Please choose another time.");
    }
    const duplicate = await ctx.db
      .query("bookings")
      .withIndex("by_session", (q) => q.eq("sessionId", newSessionId))
      .filter((q) =>
        q.and(
          q.eq(q.field("userId"), userId),
          q.neq(q.field("status"), "cancelled"),
        ),
      )
      .first();
    if (duplicate) {
      throw new Error("You already have a booking for that session.");
    }
    await ctx.db.patch(bookingId, { sessionId: newSessionId });
    return bookingId;
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
    // Count coupon usage once, when a paid booking settles.
    if (
      paymentStatus === "paid" &&
      booking.paymentStatus !== "paid" &&
      booking.couponCode
    ) {
      const coupon = await ctx.db
        .query("coupons")
        .withIndex("by_code")
        .filter((q) => q.eq(q.field("code"), booking.couponCode))
        .first();
      if (coupon) {
        await ctx.db.patch(coupon._id, {
          usedCount: (coupon.usedCount ?? 0) + 1,
        });
      }
    }
    const course = await ctx.db.get(booking.courseId);
    await notifyUser(ctx, {
      userId: booking.userId,
      kind: "booking_confirmed",
      title: "Booking confirmed",
      body: `${course?.title ?? "Your course"} — your seat is confirmed.`,
      link: `/booking/${bookingId}`,
    }).catch(() => {});
    return bookingId;
  },
});

/** Admin: mark a confirmed booking as attended (or clear it). */
export const markAttended = mutation({
  args: {
    bookingId: v.id("bookings"),
    attended: v.boolean(),
  },
  handler: async (ctx, { bookingId, attended }) => {
    const booking = await ctx.db.get(bookingId);
    if (!booking) {
      throw new Error("Booking not found.");
    }
    if (attended && booking.status !== "confirmed") {
      throw new Error("Only confirmed bookings can be marked attended.");
    }
    await ctx.db.patch(bookingId, {
      attendedAt: attended ? Date.now() : undefined,
    });
    return bookingId;
  },
});

/**
 * Admin: refund a paid booking through Stripe. Requires the payment intent
 * stored during checkout verification. Idempotent — a booking is refunded once.
 */
export const refundBooking = action({
  args: { bookingId: v.id("bookings") },
  handler: async (ctx, { bookingId }) => {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      return { ok: false as const, error: "STRIPE_KEY_MISSING" };
    }
    const booking = await ctx.runQuery(api.bookings.getBooking, { bookingId });
    if (!booking) {
      return { ok: false as const, error: "Booking not found." };
    }
    if (booking.paymentStatus !== "paid") {
      return {
        ok: false as const,
        error: "Only paid bookings can be refunded.",
      };
    }
    if (booking.refundedAt) {
      return { ok: false as const, error: "This booking was already refunded." };
    }
    if (!booking.stripePaymentIntentId) {
      return {
        ok: false as const,
        error: "No payment intent recorded for this booking.",
      };
    }
    const Stripe = await import("stripe");
    const stripe = new Stripe.default(key);
    const refund = await stripe.refunds.create({
      payment_intent: booking.stripePaymentIntentId,
      metadata: { bookingId },
    });
    if (refund.status !== "succeeded" && refund.status !== "pending") {
      return {
        ok: false as const,
        error: `Refund ${refund.status} — try again shortly.`,
      };
    }
    await ctx.runMutation(api.bookings.markBookingRefunded, {
      bookingId,
      refundId: refund.id,
    });
    return { ok: true as const, refundId: refund.id };
  },
});

/** Record that the refund notice email was sent. */
export const markRefundEmailed = mutation({
  args: { bookingId: v.id("bookings") },
  handler: async (ctx, { bookingId }) => {
    await ctx.db.patch(bookingId, { refundEmailSentAt: Date.now() });
    return bookingId;
  },
});

/** Record the Stripe payment intent (and hosted receipt) on a booking. */
export const setPaymentIntent = mutation({
  args: {
    bookingId: v.id("bookings"),
    paymentIntentId: v.string(),
    receiptUrl: v.optional(v.string()),
  },
  handler: async (ctx, { bookingId, paymentIntentId, receiptUrl }) => {
    await ctx.db.patch(bookingId, {
      stripePaymentIntentId: paymentIntentId,
      stripeReceiptUrl: receiptUrl || undefined,
    });
    return bookingId;
  },
});

/** Record that a booking was refunded. */
export const markBookingRefunded = mutation({
  args: {
    bookingId: v.id("bookings"),
    refundId: v.string(),
  },
  handler: async (ctx, { bookingId, refundId }) => {
    const booking = await ctx.db.get(bookingId);
    await ctx.db.patch(bookingId, {
      refundedAt: Date.now(),
      refundId,
    });
    if (booking) {
      const course = await ctx.db.get(booking.courseId);
      await notifyUser(ctx, {
        userId: booking.userId,
        kind: "refunded",
        title: "Refund issued",
        body: `${course?.title ?? "Your course"} — your payment has been refunded.`,
        link: `/booking/${bookingId}`,
      }).catch(() => {});
    }
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
          sessionVenue: session?.venue ?? null,
          sessionJoinUrl: session?.joinUrl ?? null,
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
      return { bookingId, offeredBookingId: null };
    }
    if (booking.paymentStatus === "paid") {
      throw new Error(
        "This booking is already paid. Contact the academy to cancel or reschedule.",
      );
    }
    await ctx.db.patch(bookingId, { status: "cancelled" });

    // A freed seat goes to the longest-waiting student on the session's
    // waitlist. They get a pending booking and can settle it in checkout.
    let offeredBookingId: Id<"bookings"> | null = null;
    const session = await ctx.db.get(booking.sessionId);
    if (session) {
      const waitlist = await ctx.db
        .query("waitlist")
        .withIndex("by_session", (q) => q.eq("sessionId", session._id))
        .collect();
      const nextUp = waitlist.sort((a, b) => a.createdAt - b.createdAt)[0];
      if (nextUp) {
        const alreadyBooked = await ctx.db
          .query("bookings")
          .withIndex("by_session", (q) => q.eq("sessionId", session._id))
          .filter((q) =>
            q.and(
              q.eq(q.field("userId"), nextUp.userId),
              q.neq(q.field("status"), "cancelled"),
            ),
          )
          .first();
        await ctx.db.delete(nextUp._id);
        if (!alreadyBooked) {
          const course = await ctx.db.get(session.courseId);
          const isFree = (course?.priceCents ?? 0) === 0;
          const newBookingId = await ctx.db.insert("bookings", {
            userId: nextUp.userId,
            courseId: session.courseId,
            sessionId: session._id,
            amountCents: course?.priceCents ?? 0,
            // Free courses confirm instantly; paid seats wait for checkout.
            status: isFree ? "confirmed" : "pending",
            paymentStatus: isFree ? "waived" : "unpaid",
            createdAt: Date.now(),
          });
          offeredBookingId = newBookingId;
          await notifyUser(ctx, {
            userId: nextUp.userId,
            kind: "seat_offered",
            title: "A seat opened up",
            body: `${course?.title ?? "Your course"} — settle payment to confirm your seat.`,
            link: `/booking/${newBookingId}`,
          }).catch(() => {});
        }
      }
    }
    return { bookingId, offeredBookingId };
  },
});

/** Apply (or clear) a discount code on a booking before checkout. */
export const applyCoupon = mutation({
  args: {
    bookingId: v.id("bookings"),
    code: v.string(),
  },
  handler: async (ctx, { bookingId, code }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Sign in to apply a coupon.");
    }
    const booking = await ctx.db.get(bookingId);
    if (!booking || booking.userId !== userId) {
      throw new Error("Booking not found.");
    }
    if (booking.status !== "pending" || booking.paymentStatus !== "unpaid") {
      throw new Error("Coupons can only be applied before payment.");
    }
    const normalized = code.trim().toUpperCase().replace(/\s+/g, "");
    if (normalized.length === 0) {
      await ctx.db.patch(bookingId, {
        couponCode: undefined,
        discountCents: undefined,
      });
      return { ok: true as const, percentOff: 0 };
    }
    const coupon = await ctx.db
      .query("coupons")
      .withIndex("by_code")
      .filter((q) => q.eq(q.field("code"), normalized))
      .first();
    if (!coupon || !coupon.active) {
      return { ok: false as const, error: "That code is not valid." };
    }
    if (coupon.maxUses !== undefined && (coupon.usedCount ?? 0) >= coupon.maxUses) {
      return {
        ok: false as const,
        error: "That code has reached its usage limit.",
      };
    }
    const discountCents = Math.round(
      (booking.amountCents * coupon.percentOff) / 100,
    );
    await ctx.db.patch(bookingId, {
      couponCode: coupon.code,
      discountCents,
    });
    return { ok: true as const, percentOff: coupon.percentOff };
  },
});

/** Record that a session reminder email was sent. */
export const markReminderSent = mutation({
  args: {
    sessionId: v.id("sessions"),
    kind: v.union(v.literal("24h"), v.literal("1h")),
  },
  handler: async (ctx, { sessionId, kind }) => {
    await ctx.db.patch(sessionId, {
      [kind === "24h" ? "reminder24hSentAt" : "reminder1hSentAt"]: Date.now(),
    });
    return sessionId;
  },
});

/** Record that a waitlist seat-offer email was sent for a booking. */
export const markWaitlistOfferEmailed = mutation({
  args: { bookingId: v.id("bookings") },
  handler: async (ctx, { bookingId }) => {
    await ctx.db.patch(bookingId, {
      waitlistOfferEmailSentAt: Date.now(),
    });
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

    const unitAmount = booking.amountCents - (booking.discountCents ?? 0);
    if (unitAmount <= 0) {
      return {
        ok: false as const,
        error: "The discount covers the full price — nothing to pay.",
      };
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
            unit_amount: unitAmount,
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
    origin: v.optional(v.string()),
  },
  handler: async (ctx, { bookingId, sessionId, origin }) => {
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
    const paymentIntentId =
      typeof session.payment_intent === "string"
        ? session.payment_intent
        : session.payment_intent?.id;
    if (paymentIntentId) {
      // Store the payment intent so the admin console can issue refunds,
      // plus the hosted receipt link for the student.
      await ctx.runMutation(api.bookings.setPaymentIntent, {
        bookingId,
        paymentIntentId,
        receiptUrl:
          (
            session as unknown as { receipt_url?: string | null }
          ).receipt_url ?? undefined,
      });
    }
    await ctx.runMutation(api.bookings.confirmBooking, {
      bookingId,
      paymentStatus: "paid",
    });
    // Confirmations are emailed automatically; failures never block the
    // payment confirmation itself.
    await ctx.runAction(api.notifications.sendBookingConfirmation, {
      bookingId,
      origin,
    }).catch(() => {});
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
    if (status === "confirmed") {
      const course = await ctx.db.get(booking.courseId);
      await notifyUser(ctx, {
        userId: booking.userId,
        kind: "booking_confirmed",
        title: "Booking confirmed",
        body: `${course?.title ?? "Your course"} — your seat is confirmed.`,
        link: `/booking/${bookingId}`,
      }).catch(() => {});
    }
    return bookingId;
  },
});

// ---------------------------------------------------------------------------
// Admin — metrics
// ---------------------------------------------------------------------------

/** Summary numbers for the admin revenue dashboard. */
export const adminStats = query({
  args: {},
  handler: async (ctx) => {
    const bookings = await ctx.db.query("bookings").collect();
    const courses = await ctx.db.query("courses").collect();
    const courseById = new Map(courses.map((c) => [c._id, c]));

    let paidRevenueCents = 0;
    let onSiteValueCents = 0;
    let confirmed = 0;
    let pending = 0;
    let cancelled = 0;
    let attended = 0;
    let refundedCount = 0;
    let refundedValueCents = 0;
    let couponSavingsCents = 0;
    const perCourse = new Map<
      string,
      { title: string; revenueCents: number; count: number }
    >();

    for (const booking of bookings) {
      if (booking.status === "cancelled") {
        cancelled += 1;
      } else if (booking.status === "pending") {
        pending += 1;
      } else {
        confirmed += 1;
      }
      const net = booking.amountCents - (booking.discountCents ?? 0);
      if (booking.paymentStatus === "paid") {
        paidRevenueCents += net;
        couponSavingsCents += booking.discountCents ?? 0;
      }
      if (booking.status === "confirmed" && booking.paymentStatus === "waived") {
        onSiteValueCents += booking.amountCents;
      }
      if (booking.attendedAt) {
        attended += 1;
      }
      if (booking.refundedAt) {
        refundedCount += 1;
        refundedValueCents += booking.amountCents;
      }
      const entry =
        perCourse.get(booking.courseId) ??
        ({
          title: courseById.get(booking.courseId)?.title ?? "Course removed",
          revenueCents: 0,
          count: 0,
        } satisfies {
          title: string;
          revenueCents: number;
          count: number;
        });
      if (booking.paymentStatus === "paid") {
        entry.revenueCents += net;
      }
      if (booking.status !== "cancelled") {
        entry.count += 1;
      }
      perCourse.set(booking.courseId, entry);
    }

    const revenueByCourse = Array.from(perCourse.values())
      .sort((a, b) => b.revenueCents - a.revenueCents)
      .slice(0, 6);
    const reviews = await ctx.db.query("reviews").collect();
    const coupons = await ctx.db.query("coupons").collect();

    return {
      bookingsTotal: bookings.length,
      confirmed,
      pending,
      cancelled,
      attended,
      refundedCount,
      refundedValueCents,
      couponSavingsCents,
      paidRevenueCents,
      onSiteValueCents,
      revenueByCourse,
      reviewsCount: reviews.length,
      couponsCount: coupons.length,
    };
  },
});
