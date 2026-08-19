import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const listByCourse = query({
  args: { courseId: v.id("courses"), status: v.optional(v.string()) },
  handler: async (ctx, args) => {
    let reviews = await ctx.db
      .query("peerReviews")
      .withIndex("by_course", (q) => q.eq("courseId", args.courseId))
      .collect();
    if (args.status) {
      reviews = reviews.filter((r) => r.status === args.status);
    }
    return reviews;
  },
});

export const mySubmissions = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("peerReviews")
      .withIndex("by_author", (q) => q.eq("authorId", args.userId))
      .collect();
  },
});

export const pendingReviews = query({
  args: { reviewerId: v.id("users") },
  handler: async (ctx, args) => {
    const all = await ctx.db
      .query("peerReviews")
      .withIndex("by_status", (q) => q.eq("status", "submitted"))
      .collect();
    return all.filter((r) => r.authorId !== args.reviewerId);
  },
});

export const submit = mutation({
  args: {
    authorId: v.id("users"),
    authorName: v.string(),
    courseId: v.id("courses"),
    moduleId: v.number(),
    title: v.string(),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("peerReviews", {
      ...args,
      status: "submitted",
      createdAt: Date.now(),
    });
  },
});

export const claim = mutation({
  args: { reviewId: v.id("peerReviews"), reviewerId: v.id("users") },
  handler: async (ctx, args) => {
    const review = await ctx.db.get(args.reviewId);
    if (!review) throw new Error("Not found");
    if (review.status !== "submitted") throw new Error("Already claimed");
    await ctx.db.patch(args.reviewId, { status: "under_review", reviewerId: args.reviewerId });
  },
});

export const grade = mutation({
  args: {
    reviewId: v.id("peerReviews"),
    reviewerId: v.id("users"),
    reviewerName: v.string(),
    grade: v.number(),
    feedback: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.reviewId, {
      status: "graded",
      reviewerId: args.reviewerId,
      reviewerName: args.reviewerName,
      grade: args.grade,
      feedback: args.feedback,
      reviewedAt: Date.now(),
    });
  },
});
