import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

/** Post an answer */
export const postAnswer = mutation({
  args: {
    userId: v.id("users"),
    authorName: v.string(),
    courseId: v.id("courses"),
    questionText: v.string(),
    answerText: v.string(),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("peerTeachingAnswers", {
      ...args,
      upvotes: 0,
      verified: false,
      pointsEarned: 0,
      createdAt: Date.now(),
    });
    return id;
  },
});

/** Upvote an answer */
export const upvote = mutation({
  args: { answerId: v.id("peerTeachingAnswers") },
  handler: async (ctx, { answerId }) => {
    const answer = await ctx.db.get(answerId);
    if (!answer) throw new Error("Answer not found");
    const newUpvotes = answer.upvotes + 1;
    const points = newUpvotes >= 5 ? 15 : newUpvotes >= 3 ? 10 : newUpvotes >= 1 ? 5 : 0;
    await ctx.db.patch(answerId, { upvotes: newUpvotes, pointsEarned: points });
    return { upvotes: newUpvotes, points };
  },
});

/** Verify an answer (instructor) */
export const verify = mutation({
  args: { answerId: v.id("peerTeachingAnswers") },
  handler: async (ctx, { answerId }) => {
    await ctx.db.patch(answerId, { verified: true, pointsEarned: 25 });
    const answer = await ctx.db.get(answerId);
    if (answer) {
      const stats = await ctx.db.query("userStats").withIndex("by_user", (q) => q.eq("userId", answer.userId)).first();
      if (stats) await ctx.db.patch(stats._id, { points: stats.points + 25, updatedAt: Date.now() });
    }
  },
});

/** Get answers for a course */
export const byCourse = query({
  args: { courseId: v.id("courses") },
  handler: async (ctx, { courseId }) =>
    ctx.db.query("peerTeachingAnswers").withIndex("by_course", (q) => q.eq("courseId", courseId)).collect(),
});

/** My answers */
export const myAnswers = query({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) =>
    ctx.db.query("peerTeachingAnswers").withIndex("by_user", (q) => q.eq("userId", userId)).collect(),
});
