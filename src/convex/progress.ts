import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/** The signed-in student's progress entries, joined with course info. */
export const myProgress = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return null;
    }
    const entries = await ctx.db
      .query("progress")
      .withIndex("by_user_course", (q) => q.eq("userId", userId))
      .collect();
    return Promise.all(
      entries.map(async (entry) => {
        const course = await ctx.db.get(entry.courseId);
        return {
          ...entry,
          courseTitle: course?.title ?? "Course removed",
          courseSlug: course?.slug ?? "",
        };
      }),
    );
  },
});

/** Set (or clear) the student's status for one course. */
export const setStatus = mutation({
  args: {
    courseId: v.id("courses"),
    status: v.union(
      v.literal("started"),
      v.literal("completed"),
      v.null(),
    ),
  },
  handler: async (ctx, { courseId, status }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Sign in to track progress.");
    }
    const existing = await ctx.db
      .query("progress")
      .withIndex("by_user_course", (q) =>
        q.eq("userId", userId).eq("courseId", courseId),
      )
      .first();
    if (existing) {
      if (status === null) {
        await ctx.db.delete(existing._id);
        return existing._id;
      }
      await ctx.db.patch(existing._id, { status, updatedAt: Date.now() });
      return existing._id;
    }
    if (status === null) {
      return null;
    }
    return ctx.db.insert("progress", {
      userId,
      courseId,
      status,
      updatedAt: Date.now(),
    });
  },
});
