import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const listByModule = query({
  args: { courseId: v.id("courses"), moduleIndex: v.number() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("moduleDiscussions")
      .withIndex("by_course_module", (q) =>
        q.eq("courseId", args.courseId).eq("moduleIndex", args.moduleIndex)
      )
      .collect();
  },
});

export const askQuestion = mutation({
  args: {
    courseId: v.id("courses"),
    moduleIndex: v.number(),
    userId: v.id("users"),
    authorName: v.string(),
    question: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("moduleDiscussions", {
      ...args,
      upvotes: 0,
      answerCount: 0,
      resolved: false,
      createdAt: Date.now(),
    });
  },
});

export const reply = mutation({
  args: {
    parentReplyId: v.id("moduleDiscussions"),
    courseId: v.id("courses"),
    moduleIndex: v.number(),
    userId: v.id("users"),
    authorName: v.string(),
    question: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.parentReplyId, {
      answerCount: (await ctx.db.get(args.parentReplyId))?.answerCount ?? 0 + 1,
    });
    return await ctx.db.insert("moduleDiscussions", {
      courseId: args.courseId,
      moduleIndex: args.moduleIndex,
      userId: args.userId,
      authorName: args.authorName,
      question: args.question,
      parentReplyId: args.parentReplyId,
      upvotes: 0,
      answerCount: 0,
      resolved: false,
      createdAt: Date.now(),
    });
  },
});

export const upvote = mutation({
  args: { discussionId: v.id("moduleDiscussions") },
  handler: async (ctx, args) => {
    const doc = await ctx.db.get(args.discussionId);
    if (doc) {
      await ctx.db.patch(args.discussionId, { upvotes: doc.upvotes + 1 });
    }
  },
});

export const markResolved = mutation({
  args: { discussionId: v.id("moduleDiscussions") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.discussionId, { resolved: true });
  },
});
