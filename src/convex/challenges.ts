import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const activeChallenges = query({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    return await ctx.db
      .query("weeklyChallenges")
      .withIndex("by_active", (q) => q.eq("active", true))
      .collect();
  },
});

export const myProgress = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("challengeParticipations")
      .withIndex("by_user_challenge", (q: any) => q.eq("userId", args.userId))
      .collect();
  },
});

export const join = mutation({
  args: { challengeId: v.id("weeklyChallenges"), userId: v.id("users") },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("challengeParticipations")
      .withIndex("by_user_challenge", (q: any) =>
        q.eq("userId", args.userId).eq("challengeId", args.challengeId)
      )
      .first();
    if (existing) return existing._id;

    return await ctx.db.insert("challengeParticipations", {
      challengeId: args.challengeId,
      userId: args.userId,
      progress: 0,
      completed: false,
      claimed: false,
      createdAt: Date.now(),
    });
  },
});

export const updateProgress = mutation({
  args: {
    challengeId: v.id("weeklyChallenges"),
    userId: v.id("users"),
    increment: v.number(),
  },
  handler: async (ctx, args) => {
    const participation = await ctx.db
      .query("challengeParticipations")
      .withIndex("by_user_challenge", (q: any) =>
        q.eq("userId", args.userId).eq("challengeId", args.challengeId)
      )
      .first();
    if (!participation) return;

    const challenge = await ctx.db.get(args.challengeId);
    if (!challenge) return;

    const newProgress = participation.progress + args.increment;
    const completed = newProgress >= challenge.targetValue;
    const patch: Record<string, unknown> = { progress: newProgress };
    if (completed && !participation.completed) {
      patch.completed = true;
      patch.completedAt = Date.now();
    }
    await ctx.db.patch(participation._id, patch);
  },
});

export const claimReward = mutation({
  args: { participationId: v.id("challengeParticipations") },
  handler: async (ctx, args) => {
    const participation = await ctx.db.get(args.participationId);
    if (!participation || !participation.completed || participation.claimed) {
      throw new Error("Cannot claim reward");
    }

    const challenge = await ctx.db.get(participation.challengeId);
    if (!challenge) throw new Error("Challenge not found");

    const stats = await ctx.db
      .query("userStats")
      .withIndex("by_user", (q) => q.eq("userId", participation.userId))
      .first();
    if (stats) {
      await ctx.db.patch(stats._id, {
        points: stats.points + challenge.pointsReward,
      });
    }

    await ctx.db.patch(args.participationId, { claimed: true });
    return { pointsEarned: challenge.pointsReward };
  },
});

export const createChallenge = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    type: v.union(
      v.literal("quiz"),
      v.literal("journal"),
      v.literal("streak"),
      v.literal("review"),
      v.literal("quizComp")
    ),
    targetValue: v.number(),
    pointsReward: v.number(),
    badgeReward: v.optional(v.string()),
    startDate: v.number(),
    endDate: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("weeklyChallenges", {
      ...args,
      active: true,
      createdAt: Date.now(),
    });
  },
});
