import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

/** Get the global leaderboard, top 50 students by points. */
export const global = query({
  args: {},
  handler: async (ctx) => {
    const entries = await ctx.db
      .query("leaderboard")
      .withIndex("by_points")
      .order("desc")
      .take(50);
    return entries.map((e, i) => ({
      rank: i + 1,
      name: e.name,
      points: e.points,
      coursesCompleted: e.coursesCompleted,
      quizzesPassed: e.quizzesPassed,
      streak: e.streak,
      badges: e.badges,
    }));
  },
});

/** Get the current user's rank and stats. */
export const myRank = query({
  args: {},
  handler: async (ctx) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) return null;
    const userId = user.subject as any;
    const entry = await ctx.db
      .query("leaderboard")
      .filter((q) => q.eq(q.field("userId"), userId))
      .first();
    if (!entry) return null;
    // Count how many people have more points
    const allAbove = await ctx.db
      .query("leaderboard")
      .withIndex("by_points")
      .order("desc")
      .collect();
    const rank = allAbove.findIndex((e) => e.userId === userId) + 1;
    return {
      rank,
      name: entry.name,
      points: entry.points,
      coursesCompleted: entry.coursesCompleted,
      quizzesPassed: entry.quizzesPassed,
      streak: entry.streak,
      badges: entry.badges,
      totalStudents: allAbove.length,
    };
  },
});

/** Update or create the current user's leaderboard entry. */
export const upsert = mutation({
  args: {
    name: v.string(),
    points: v.number(),
    coursesCompleted: v.number(),
    quizzesPassed: v.number(),
    streak: v.number(),
    badges: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new Error("Must be signed in");
    const userId = user.subject as any;
    const existing = await ctx.db
      .query("leaderboard")
      .filter((q) => q.eq(q.field("userId"), userId))
      .first();
    if (existing) {
      await ctx.db.patch(existing._id, {
        ...args,
        updatedAt: Date.now(),
      });
    } else {
      await ctx.db.insert("leaderboard", {
        userId,
        ...args,
        updatedAt: Date.now(),
      });
    }
  },
});
