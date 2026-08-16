import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/** Visible comments for a course, newest first. */
export const listForCourse = query({
  args: { courseId: v.id("courses") },
  handler: async (ctx, { courseId }) => {
    const comments = await ctx.db
      .query("comments")
      .withIndex("by_course", (q) => q.eq("courseId", courseId))
      .filter((q) => q.eq(q.field("visible"), true))
      .collect();
    return comments.sort((a, b) => b.createdAt - a.createdAt);
  },
});

export const post = mutation({
  args: {
    courseId: v.id("courses"),
    text: v.string(),
  },
  handler: async (ctx, { courseId, text }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Sign in to leave a comment.");
    }
    const trimmed = text.trim();
    if (trimmed.length === 0) {
      throw new Error("Comment cannot be empty.");
    }
    if (trimmed.length > 2000) {
      throw new Error("Keep comments under 2,000 characters.");
    }
    const user = await ctx.db.get(userId);
    const authorName =
      user?.name?.trim() ||
      (user?.email ? user.email.split("@")[0] : "Student");
    const commentId = await ctx.db.insert("comments", {
      courseId,
      userId,
      authorName,
      text: trimmed,
      visible: true,
      createdAt: Date.now(),
    });
    return commentId;
  },
});

// ---------------------------------------------------------------------------
// Admin — moderation
// ---------------------------------------------------------------------------

export const adminList = query({
  args: {},
  handler: async (ctx) => {
    const comments = await ctx.db.query("comments").order("desc").collect();
    return Promise.all(
      comments.map(async (comment) => {
        const course = await ctx.db.get(comment.courseId);
        return {
          ...comment,
          courseTitle: course?.title ?? "Course removed",
        };
      }),
    );
  },
});

export const setVisibility = mutation({
  args: {
    id: v.id("comments"),
    visible: v.boolean(),
  },
  handler: async (ctx, { id, visible }) => {
    const comment = await ctx.db.get(id);
    if (!comment) {
      throw new Error("Comment not found.");
    }
    await ctx.db.patch(id, { visible });
    return id;
  },
});

export const remove = mutation({
  args: { id: v.id("comments") },
  handler: async (ctx, { id }) => {
    const comment = await ctx.db.get(id);
    if (!comment) {
      throw new Error("Comment not found.");
    }
    await ctx.db.delete(id);
    return id;
  },
});
