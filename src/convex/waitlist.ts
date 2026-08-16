import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/** Live waitlist state for one session: count and the user's position (if any). */
export const forSession = query({
  args: { sessionId: v.id("sessions") },
  handler: async (ctx, { sessionId }) => {
    const entries = await ctx.db
      .query("waitlist")
      .withIndex("by_session", (q) => q.eq("sessionId", sessionId))
      .collect();
    const sorted = [...entries].sort((a, b) => a.createdAt - b.createdAt);
    const userId = await getAuthUserId(ctx);
    const myIndex = userId
      ? sorted.findIndex((entry) => entry.userId === userId)
      : -1;
    return {
      count: sorted.length,
      position: myIndex >= 0 ? myIndex + 1 : null,
    };
  },
});

/** Join the waitlist for a session (only when not already booked). */
export const join = mutation({
  args: { sessionId: v.id("sessions") },
  handler: async (ctx, { sessionId }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Sign in to join the waitlist.");
    }
    const session = await ctx.db.get(sessionId);
    if (!session) {
      throw new Error("Session not found.");
    }
    const alreadyOn = await ctx.db
      .query("waitlist")
      .withIndex("by_session", (q) => q.eq("sessionId", sessionId))
      .filter((q) => q.eq(q.field("userId"), userId))
      .first();
    if (alreadyOn) {
      throw new Error("You are already on this waitlist.");
    }
    const active = await ctx.db
      .query("bookings")
      .withIndex("by_session", (q) => q.eq("sessionId", sessionId))
      .filter((q) =>
        q.and(
          q.eq(q.field("userId"), userId),
          q.neq(q.field("status"), "cancelled"),
        ),
      )
      .first();
    if (active) {
      throw new Error("You already have a booking for this session.");
    }
    return ctx.db.insert("waitlist", {
      sessionId,
      userId,
      createdAt: Date.now(),
    });
  },
});

/** Leave the waitlist for a session. */
export const leave = mutation({
  args: { sessionId: v.id("sessions") },
  handler: async (ctx, { sessionId }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Sign in to manage your waitlist.");
    }
    const entry = await ctx.db
      .query("waitlist")
      .withIndex("by_session", (q) => q.eq("sessionId", sessionId))
      .filter((q) => q.eq(q.field("userId"), userId))
      .first();
    if (!entry) {
      return null;
    }
    await ctx.db.delete(entry._id);
    return entry._id;
  },
});

/** The signed-in student's waitlist entries, joined with session and course. */
export const myWaitlists = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return null;
    }
    const entries = await ctx.db
      .query("waitlist")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();
    return Promise.all(
      entries.map(async (entry) => {
        const session = await ctx.db.get(entry.sessionId);
        const course = session ? await ctx.db.get(session.courseId) : null;
        const all = await ctx.db
          .query("waitlist")
          .withIndex("by_session", (q) => q.eq("sessionId", entry.sessionId))
          .collect();
        const sorted = [...all].sort((a, b) => a.createdAt - b.createdAt);
        const position = sorted.findIndex((e) => e._id === entry._id) + 1;
        return {
          ...entry,
          courseTitle: course?.title ?? "Course removed",
          courseSlug: course?.slug ?? "",
          sessionStartsAt: session?.startsAt ?? 0,
          position,
        };
      }),
    );
  },
});
