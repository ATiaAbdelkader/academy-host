import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const myReferral = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("referrals")
      .withIndex("by_referrer", (q) => q.eq("referrerId", args.userId))
      .first();
  },
});

export const stats = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const referral = await ctx.db
      .query("referrals")
      .withIndex("by_referrer", (q) => q.eq("referrerId", args.userId))
      .first();
    if (!referral) return null;
    return {
      code: referral.code,
      uses: referral.uses,
      rewardPointsEarned: referral.rewardPointsEarned,
    };
  },
});

export const createReferral = mutation({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("referrals")
      .withIndex("by_referrer", (q) => q.eq("referrerId", args.userId))
      .first();
    if (existing) return existing;

    const code = `AGRI${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
    return await ctx.db.insert("referrals", {
      referrerId: args.userId,
      code,
      uses: 0,
      rewardPointsEarned: 0,
      active: true,
      createdAt: Date.now(),
    });
  },
});

export const applyReferral = mutation({
  args: { code: v.string(), refereeId: v.id("users") },
  handler: async (ctx, args) => {
    const referral = await ctx.db
      .query("referrals")
      .withIndex("by_code", (q) => q.eq("code", args.code))
      .first();
    if (!referral || !referral.active) throw new Error("Invalid referral code");
    if (referral.referrerId === args.refereeId) throw new Error("Cannot refer yourself");

    await ctx.db.patch(referral._id, {
      uses: referral.uses + 1,
      rewardPointsEarned: referral.rewardPointsEarned + 50,
      refereeId: args.refereeId,
    });

    // Award referrer 50 points
    const stats = await ctx.db
      .query("userStats")
      .withIndex("by_user", (q) => q.eq("userId", referral.referrerId))
      .first();
    if (stats) {
      await ctx.db.patch(stats._id, { points: stats.points + 50 });
    }

    // Award referee 25 points
    const refStats = await ctx.db
      .query("userStats")
      .withIndex("by_user", (q) => q.eq("userId", args.refereeId))
      .first();
    if (refStats) {
      await ctx.db.patch(refStats._id, { points: refStats.points + 25 });
    }

    return { referrerReward: 50, refereeReward: 25 };
  },
});
