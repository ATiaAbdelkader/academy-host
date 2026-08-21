import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

/** List active seasonal challenges */
export const listActive = query({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const challenges = await ctx.db.query("weeklyChallenges").collect();
    return challenges.filter((c) => c.active).sort((a, b) => a.startDate - b.startDate);
  },
});

/** Get my challenge attempts */
export const myAttempts = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];
    const userId = identity.subject as any;
    const participations = await ctx.db
      .query("challengeParticipations")
      .filter((q) => q.eq(q.field("userId"), userId))
      .collect();
    return participations;
  },
});

/** Submit challenge answers */
export const submit = mutation({
  args: {
    challengeId: v.id("weeklyChallenges"),
    answers: v.array(
      v.object({
        questionIndex: v.number(),
        selectedAnswer: v.optional(v.number()),
        textAnswer: v.optional(v.string()),
      })
    ),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    const userId = identity.subject as any;

    const challenge = await ctx.db.get(args.challengeId);
    if (!challenge) throw new Error("Challenge not found");

    // Check if already participated
    const existing = await ctx.db
      .query("challengeParticipations")
      .filter((q) =>
        q.and(
          q.eq(q.field("userId"), userId),
          q.eq(q.field("challengeId"), args.challengeId)
        )
      )
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        completed: true,
        completedAt: Date.now(),
      });
      return existing._id;
    }

    return await ctx.db.insert("challengeParticipations", {
      challengeId: args.challengeId,
      userId,
      progress: 100,
      completed: true,
      claimed: false,
      createdAt: Date.now(),
      completedAt: Date.now(),
    });
  },
});

/** Seed seasonal challenges */
export const seedSeasonal = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("weeklyChallenges").collect();
    if (existing.length > 3) return { seeded: false };

    const now = Date.now();
    const month = 30 * 86400000;

    const seasons = [
      {
        title: "Spring Planting Sprint",
        description: "Complete 5 course modules related to planting and soil preparation",
        type: "quiz" as const,
        targetValue: 5,
        pointsReward: 200,
        badgeReward: "Spring Planter",
        startDate: now,
        endDate: now + month,
        active: true,
        createdAt: now,
      },
      {
        title: "Summer Growth Challenge",
        description: "Earn 100 points from quizzes and journal entries this month",
        type: "quizComp" as const,
        targetValue: 100,
        pointsReward: 300,
        badgeReward: "Summer Grower",
        startDate: now + month,
        endDate: now + 2 * month,
        active: true,
        createdAt: now,
      },
      {
        title: "Harvest Season Review",
        description: "Review and complete 3 field journal entries documenting crop outcomes",
        type: "journal" as const,
        targetValue: 3,
        pointsReward: 250,
        badgeReward: "Harvest Analyst",
        startDate: now + 2 * month,
        endDate: now + 3 * month,
        active: true,
        createdAt: now,
      },
      {
        title: "Winter Study Marathon",
        description: "Maintain a 14-day learning streak during the off-season",
        type: "streak" as const,
        targetValue: 14,
        pointsReward: 500,
        badgeReward: "Winter Scholar",
        startDate: now + 3 * month,
        endDate: now + 6 * month,
        active: true,
        createdAt: now,
      },
    ];

    for (const s of seasons) {
      await ctx.db.insert("weeklyChallenges", s);
    }
    return { seeded: true, count: seasons.length };
  },
});
