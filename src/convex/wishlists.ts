import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const myWishlist = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("wishlists")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();
  },
});

export const isWishlisted = query({
  args: { userId: v.id("users"), courseId: v.id("courses") },
  handler: async (ctx, args) => {
    const item = await ctx.db
      .query("wishlists")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .first();
    return item ? true : false;
  },
});

export const toggle = mutation({
  args: { userId: v.id("users"), courseId: v.id("courses") },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("wishlists")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .first();
    if (existing) {
      await ctx.db.delete(existing._id);
      return false;
    }
    await ctx.db.insert("wishlists", {
      userId: args.userId,
      courseId: args.courseId,
      createdAt: Date.now(),
    });
    return true;
  },
});

export const recentReviews = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const reviews = await ctx.db.query("reviews").order("desc").take(args.limit ?? 20);
    const results = await Promise.all(
      reviews.map(async (r) => {
        const course = await ctx.db.get(r.courseId);
        const user = await ctx.db.get(r.userId);
        return {
          ...r,
          courseName: course?.title ?? "Unknown",
          courseSlug: course?.slug ?? "",
          userName: user?.name ?? "Anonymous",
          userImage: user?.image,
        };
      })
    );
    return results;
  },
});
