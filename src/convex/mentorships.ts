import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const listMentors = query({
  args: { expertise: v.optional(v.string()) },
  handler: async (ctx, args) => {
    let mentors = await ctx.db.query("mentors").collect();
    if (args.expertise) {
      mentors = mentors.filter((m) =>
        m.expertise.some((e) =>
          e.toLowerCase().includes(args.expertise!.toLowerCase())
        )
      );
    }
    return mentors;
  },
});

export const getMentor = query({
  args: { mentorId: v.id("mentors") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.mentorId);
  },
});

export const myMentorships = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const asMentee = await ctx.db
      .query("mentorships")
      .withIndex("by_mentee", (q) => q.eq("menteeId", args.userId))
      .collect();
    const asMentor = await ctx.db
      .query("mentors")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();
    return { asMentee, mentorProfile: asMentor[0] ?? null };
  },
});

export const registerAsMentor = mutation({
  args: {
    userId: v.id("users"),
    name: v.string(),
    bio: v.string(),
    expertise: v.array(v.string()),
    maxMentees: v.number(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("mentors")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .first();
    if (existing) {
      await ctx.db.patch(existing._id, {
        bio: args.bio,
        expertise: args.expertise,
        maxMentees: args.maxMentees,
      });
      return existing._id;
    }
    return await ctx.db.insert("mentors", {
      ...args,
      available: true,
      rating: 0,
      menteeCount: 0,
      createdAt: Date.now(),
    });
  },
});

export const requestMentorship = mutation({
  args: {
    mentorId: v.id("mentors"),
    menteeId: v.id("users"),
    courseId: v.optional(v.id("courses")),
    goals: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const mentor = await ctx.db.get(args.mentorId);
    if (!mentor) throw new Error("Mentor not found");
    if (!mentor.available) throw new Error("Mentor not available");
    if (mentor.menteeCount >= mentor.maxMentees) throw new Error("Mentor at capacity");

    return await ctx.db.insert("mentorships", {
      mentorId: args.mentorId,
      menteeId: args.menteeId,
      courseId: args.courseId,
      status: "pending",
      goals: args.goals,
      createdAt: Date.now(),
    });
  },
});

export const updateStatus = mutation({
  args: {
    mentorshipId: v.id("mentorships"),
    status: v.union(v.literal("active"), v.literal("completed"), v.literal("cancelled")),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const patch: Record<string, unknown> = { status: args.status };
    if (args.notes) patch.notes = args.notes;
    if (args.status === "active") patch.startedAt = Date.now();
    if (args.status === "completed") patch.completedAt = Date.now();
    await ctx.db.patch(args.mentorshipId, patch);
  },
});

export const leaveReview = mutation({
  args: { mentorId: v.id("mentors"), rating: v.number() },
  handler: async (ctx, args) => {
    const mentor = await ctx.db.get(args.mentorId);
    if (!mentor) throw new Error("Mentor not found");
    const newRating =
      (mentor.rating * mentor.menteeCount + args.rating) /
      (mentor.menteeCount + 1);
    await ctx.db.patch(args.mentorId, {
      rating: Math.round(newRating * 10) / 10,
      menteeCount: mentor.menteeCount + 1,
    });
  },
});
