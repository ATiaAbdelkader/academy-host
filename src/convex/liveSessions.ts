import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: { courseId: v.optional(v.id("courses")) },
  handler: async (ctx, args) => {
    if (args.courseId) {
      return await ctx.db
        .query("liveSessions")
        .withIndex("by_course", (q) => q.eq("courseId", args.courseId!))
        .order("desc")
        .collect();
    }
    return await ctx.db.query("liveSessions").order("desc").collect();
  },
});

export const upcoming = query({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    return await ctx.db
      .query("liveSessions")
      .withIndex("by_startsAt", (q) => q.gte("startsAt", now))
      .order("asc")
      .collect();
  },
});

export const get = query({
  args: { sessionId: v.id("liveSessions") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.sessionId);
  },
});

export const rsvpCount = query({
  args: { sessionId: v.id("liveSessions") },
  handler: async (ctx, args) => {
    const rsvps = await ctx.db
      .query("liveSessionRsvps")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .collect();
    return {
      total: rsvps.length,
      attended: rsvps.filter((r) => r.status === "attended").length,
    };
  },
});

export const myRsvps = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("liveSessionRsvps")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();
  },
});

export const create = mutation({
  args: {
    courseId: v.id("courses"),
    title: v.string(),
    description: v.optional(v.string()),
    instructorId: v.id("users"),
    instructorName: v.string(),
    startsAt: v.number(),
    durationMinutes: v.number(),
    capacity: v.number(),
    meetingUrl: v.optional(v.string()),
    tags: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("liveSessions", {
      ...args,
      status: "scheduled",
      createdAt: Date.now(),
    });
  },
});

export const rsvp = mutation({
  args: { sessionId: v.id("liveSessions"), userId: v.id("users") },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("liveSessionRsvps")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .collect();
    const session = await ctx.db.get(args.sessionId);
    if (!session) throw new Error("Session not found");
    if (existing.length >= session.capacity) throw new Error("Session is full");

    const alreadyRsvped = existing.find((r) => r.userId === args.userId);
    if (alreadyRsvped) throw new Error("Already registered");

    return await ctx.db.insert("liveSessionRsvps", {
      sessionId: args.sessionId,
      userId: args.userId,
      status: "registered",
      createdAt: Date.now(),
    });
  },
});

export const markAttended = mutation({
  args: { sessionId: v.id("liveSessions"), userId: v.id("users") },
  handler: async (ctx, args) => {
    const rsvp = await ctx.db
      .query("liveSessionRsvps")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .collect();
    const entry = rsvp.find((r) => r.userId === args.userId);
    if (entry) {
      await ctx.db.patch(entry._id, { status: "attended" });
    }
  },
});

export const addRecording = mutation({
  args: { sessionId: v.id("liveSessions"), recordingUrl: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.sessionId, { recordingUrl: args.recordingUrl });
  },
});
