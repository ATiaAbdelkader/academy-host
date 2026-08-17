import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { POINTS, recordActivity } from "./gamification";

/** Rating aggregates for every course — one query for the whole catalog. */
export const summaries = query({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query("reviews").collect();
    const byCourse = new Map<string, { total: number; count: number }>();
    for (const review of all) {
      const entry = byCourse.get(review.courseId) ?? { total: 0, count: 0 };
      entry.total += review.rating;
      entry.count += 1;
      byCourse.set(review.courseId, entry);
    }
    return Array.from(byCourse.entries()).map(([courseId, entry]) => ({
      courseId,
      avgRating: Math.round((entry.total / entry.count) * 10) / 10,
      reviewCount: entry.count,
    }));
  },
});

/** Visible reviews for one course, newest first, with author names. */
export const listForCourse = query({
  args: { courseId: v.id("courses") },
  handler: async (ctx, { courseId }) => {
    const reviews = await ctx.db
      .query("reviews")
      .withIndex("by_course", (q) => q.eq("courseId", courseId))
      .collect();
    const sorted = reviews.sort((a, b) => b.createdAt - a.createdAt);
    return Promise.all(
      sorted.map(async (review) => {
        const user = await ctx.db.get(review.userId);
        return {
          ...review,
          authorName:
            user?.name?.trim() ||
            (user?.email ? user.email.split("@")[0] : "Student"),
        };
      }),
    );
  },
});

/** The signed-in student's own review for a course, if any. */
export const myReview = query({
  args: { courseId: v.id("courses") },
  handler: async (ctx, { courseId }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return null;
    }
    return ctx.db
      .query("reviews")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("courseId"), courseId))
      .first();
  },
});

/**
 * Whether the signed-in student may review a course: they need a confirmed
 * booking and must not already have reviewed it.
 */
export const canReview = query({
  args: { courseId: v.id("courses") },
  handler: async (ctx, { courseId }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return { allowed: false, reason: "Sign in to leave a review." };
    }
    const existing = await ctx.db
      .query("reviews")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("courseId"), courseId))
      .first();
    if (existing) {
      return { allowed: false, reason: "You already reviewed this course." };
    }
    const booking = await ctx.db
      .query("bookings")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) =>
        q.and(
          q.eq(q.field("courseId"), courseId),
          q.eq(q.field("status"), "confirmed"),
        ),
      )
      .first();
    if (!booking) {
      return {
        allowed: false,
        reason: "Only students with a confirmed booking can review.",
      };
    }
    return { allowed: true, reason: null };
  },
});

/** Post a rating (1–5) with an optional note. Confirmed bookings only. */
export const post = mutation({
  args: {
    courseId: v.id("courses"),
    rating: v.number(),
    comment: v.optional(v.string()),
  },
  handler: async (ctx, { courseId, rating, comment }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Sign in to leave a review.");
    }
    const cleanRating = Math.round(rating);
    if (cleanRating < 1 || cleanRating > 5) {
      throw new Error("Rating must be between 1 and 5 stars.");
    }
    const trimmed = (comment ?? "").trim();
    if (trimmed.length > 1000) {
      throw new Error("Keep review notes under 1,000 characters.");
    }
    const existing = await ctx.db
      .query("reviews")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("courseId"), courseId))
      .first();
    if (existing) {
      throw new Error("You already reviewed this course.");
    }
    const booking = await ctx.db
      .query("bookings")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) =>
        q.and(
          q.eq(q.field("courseId"), courseId),
          q.eq(q.field("status"), "confirmed"),
        ),
      )
      .first();
    if (!booking) {
      throw new Error("Only students with a confirmed booking can review.");
    }
    const reviewId = await ctx.db.insert("reviews", {
      courseId,
      userId,
      rating: cleanRating,
      comment: trimmed.length > 0 ? trimmed : undefined,
      createdAt: Date.now(),
    });
    void recordActivity(ctx, userId, {
      points: POINTS.review,
      review: true,
    });
    return reviewId;
  },
});

// ---------------------------------------------------------------------------
// Admin — moderation
// ---------------------------------------------------------------------------

export const adminList = query({
  args: {},
  handler: async (ctx) => {
    const reviews = await ctx.db.query("reviews").order("desc").collect();
    return Promise.all(
      reviews.map(async (review) => {
        const course = await ctx.db.get(review.courseId);
        const user = await ctx.db.get(review.userId);
        return {
          ...review,
          courseTitle: course?.title ?? "Course removed",
          authorName:
            user?.name?.trim() ||
            (user?.email ? user.email.split("@")[0] : "Student"),
        };
      }),
    );
  },
});

export const remove = mutation({
  args: { id: v.id("reviews") },
  handler: async (ctx, { id }) => {
    const review = await ctx.db.get(id);
    if (!review) {
      throw new Error("Review not found.");
    }
    await ctx.db.delete(id);
    return id;
  },
});
