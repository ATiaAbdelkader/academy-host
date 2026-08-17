import { getAuthUserId } from "@convex-dev/auth/server";
import { query } from "./_generated/server";
import { v } from "convex/values";

function displayName(user: {
  name?: string | undefined;
  email?: string | undefined;
}): string {
  return (
    user?.name?.trim() ||
    (user?.email ? user.email.split("@")[0] : "Student") ||
    "Student"
  );
}

/**
 * Per-session rosters for the admin console: every session with its booked
 * students (attendance state included) and its waitlist, in queue order.
 */
export const sessionRosters = query({
  args: {},
  handler: async (ctx) => {
    const callerId = await getAuthUserId(ctx);
    if (!callerId) {
      throw new Error("Not signed in.");
    }
    const caller = await ctx.db.get(callerId);
    if (caller?.role !== "admin") {
      throw new Error("Administrator access required.");
    }
    const sessions = await ctx.db.query("sessions").order("desc").collect();
    return Promise.all(
      sessions.map(async (session) => {
        const course = await ctx.db.get(session.courseId);
        const bookings = await ctx.db
          .query("bookings")
          .withIndex("by_session", (q) => q.eq("sessionId", session._id))
          .collect();
        const active = bookings.filter((b) => b.status !== "cancelled");
        const roster = await Promise.all(
          active.map(async (booking) => {
            const user = await ctx.db.get(booking.userId);
            return {
              bookingId: booking._id,
              name: displayName(user ?? {}),
              email: user?.email ?? null,
              status: booking.status,
              paymentStatus: booking.paymentStatus,
              attendedAt: booking.attendedAt ?? null,
              bookedAt: booking.createdAt,
            };
          }),
        );
        roster.sort((a, b) => a.bookedAt - b.bookedAt);
        const waitlist = await ctx.db
          .query("waitlist")
          .withIndex("by_session", (q) => q.eq("sessionId", session._id))
          .collect();
        const queue = [...waitlist].sort((a, b) => a.createdAt - b.createdAt);
        const waitlistJoined = await Promise.all(
          queue.map(async (entry) => {
            const user = await ctx.db.get(entry.userId);
            return {
              waitlistId: entry._id,
              name: displayName(user ?? {}),
              email: user?.email ?? null,
              joinedAt: entry.createdAt,
            };
          }),
        );
        return {
          sessionId: session._id,
          courseTitle: course?.title ?? "Course removed",
          startsAt: session.startsAt,
          durationMinutes: session.durationMinutes,
          capacity: session.capacity,
          venue: session.venue ?? null,
          roster,
          waitlist: waitlistJoined,
        };
      }),
    );
  },
});

/**
 * Sessions that still need a reminder email, joined with course info.
 * Covers both the 24-hour and 1-hour windows so one cron pass handles both.
 */
export const reminderSessions = query({
  args: { now: v.number() },
  handler: async (ctx, { now }) => {
    const HOUR = 60 * 60 * 1000;
    const from = now + 0.5 * HOUR;
    const to = now + 26 * HOUR;
    const sessions = await ctx.db.query("sessions").collect();
    const upcoming = sessions
      .filter(
        (s) => s.startsAt >= from && s.startsAt <= to,
      )
      .filter(
        (s) => !s.reminder24hSentAt || !s.reminder1hSentAt,
      );
    return Promise.all(
      upcoming.map(async (session) => {
        const course = await ctx.db.get(session.courseId);
        return {
          ...session,
          title: course?.title ?? "Course removed",
          slug: course?.slug ?? "",
        };
      }),
    );
  },
});

/**
 * One student's full training record — bookings, progress, reviews, comments,
 * and waitlists, each joined with course/session info. Admin only.
 */
export const studentHistory = query({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    const callerId = await getAuthUserId(ctx);
    if (callerId === null) {
      throw new Error("Not signed in.");
    }
    const caller = await ctx.db.get(callerId);
    if (caller?.role !== "admin") {
      throw new Error("Administrator access required.");
    }
    const user = await ctx.db.get(userId);
    if (!user) {
      return null;
    }

    const bookings = await ctx.db
      .query("bookings")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();
    const joinedBookings = await Promise.all(
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

    const progress = await ctx.db
      .query("progress")
      .withIndex("by_user_course", (q) => q.eq("userId", userId))
      .collect();
    const joinedProgress = await Promise.all(
      progress.map(async (entry) => {
        const course = await ctx.db.get(entry.courseId);
        return {
          ...entry,
          courseTitle: course?.title ?? "Course removed",
          courseSlug: course?.slug ?? "",
        };
      }),
    );

    const reviews = await ctx.db
      .query("reviews")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();
    const joinedReviews = await Promise.all(
      reviews.map(async (review) => {
        const course = await ctx.db.get(review.courseId);
        return {
          ...review,
          courseTitle: course?.title ?? "Course removed",
        };
      }),
    );

    const waitlists = await ctx.db
      .query("waitlist")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();
    const joinedWaitlists = await Promise.all(
      waitlists.map(async (entry) => {
        const session = await ctx.db.get(entry.sessionId);
        const course = session ? await ctx.db.get(session.courseId) : null;
        return {
          ...entry,
          courseTitle: course?.title ?? "Course removed",
          sessionStartsAt: session?.startsAt ?? 0,
        };
      }),
    );

    return {
      user,
      bookings: joinedBookings,
      progress: joinedProgress,
      reviews: joinedReviews,
      waitlists: joinedWaitlists,
    };
  },
});

/** Confirmed, non-cancelled bookings for a session, with the account email. */
export const reminderBookings = query({
  args: { sessionId: v.id("sessions") },
  handler: async (ctx, { sessionId }) => {
    const bookings = await ctx.db
      .query("bookings")
      .withIndex("by_session", (q) => q.eq("sessionId", sessionId))
      .filter((q) => q.eq(q.field("status"), "confirmed"))
      .collect();
    return Promise.all(
      bookings.map(async (booking) => {
        const user = await ctx.db.get(booking.userId);
        return { ...booking, email: user?.email ?? null };
      }),
    );
  },
});
