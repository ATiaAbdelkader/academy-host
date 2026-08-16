import { query } from "./_generated/server";
import { v } from "convex/values";

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
