import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import type { ContentBlock } from "./schema";
import { POINTS, recordActivity } from "./gamification";

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

/**
 * Record that the student reached a module (furthest module wins). Creates a
 * "started" progress row when none exists, so it doubles as the resume
 * bookmark and the admin drop-off signal.
 */
export const recordModule = mutation({
  args: {
    courseId: v.id("courses"),
    moduleIndex: v.number(),
  },
  handler: async (ctx, { courseId, moduleIndex }) => {
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
    const now = Date.now();
    if (!existing) {
      await ctx.db.insert("progress", {
        userId,
        courseId,
        status: "started",
        lastModuleIndex: moduleIndex,
        updatedAt: now,
      });
      return { created: true as const, moduleIndex };
    }
    const furthest = Math.max(existing.lastModuleIndex ?? 0, moduleIndex);
    if (existing.lastModuleIndex !== furthest) {
      await ctx.db.patch(existing._id, {
        status: existing.status === "completed" ? "completed" : "started",
        lastModuleIndex: furthest,
        updatedAt: now,
      });
    }
    return { created: false as const, moduleIndex: furthest };
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
    // Completing a course requires passing every module quiz in it.
    if (status === "completed") {
      const course = await ctx.db.get(courseId);
      if (course) {
        const blocks =
          course.modules && course.modules.length > 0
            ? course.modules.flatMap((m) => m.content)
            : course.content;
        const quizzes = blocks.filter(
          (block): block is Extract<ContentBlock, { type: "quiz" }> =>
            block.type === "quiz",
        );
        if (quizzes.length > 0) {
          const attempts = await ctx.db
            .query("quizAttempts")
            .withIndex("by_user_course", (q) =>
              q.eq("userId", userId).eq("courseId", courseId),
            )
            .collect();
          const passed = new Set(
            attempts.filter((a) => a.passed).map((a) => a.quizIndex),
          );
          if (quizzes.some((_quiz, i) => !passed.has(i))) {
            throw new Error(
              "Pass every quiz in this course before marking it completed.",
            );
          }
        }
      }
    }
    const existing = await ctx.db
      .query("progress")
      .withIndex("by_user_course", (q) =>
        q.eq("userId", userId).eq("courseId", courseId),
      )
      .first();
    // Completing a course for the first time earns points and a badge.
    const firstCompletion =
      status === "completed" && existing?.status !== "completed";
    if (existing) {
      if (status === null) {
        await ctx.db.delete(existing._id);
        return existing._id;
      }
      await ctx.db.patch(existing._id, { status, updatedAt: Date.now() });
      if (firstCompletion) {
        void recordActivity(ctx, userId, {
          points: POINTS.courseCompleted,
          courseCompleted: true,
        });
      }
      return existing._id;
    }
    if (status === null) {
      return null;
    }
    const inserted = await ctx.db.insert("progress", {
      userId,
      courseId,
      status,
      updatedAt: Date.now(),
    });
    if (firstCompletion) {
      void recordActivity(ctx, userId, {
        points: POINTS.courseCompleted,
        courseCompleted: true,
      });
    }
    return inserted;
  },
});

/** Save (or clear) the student's private notes for a course. */
export const setNote = mutation({
  args: {
    courseId: v.id("courses"),
    note: v.string(),
  },
  handler: async (ctx, { courseId, note }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Sign in to save notes.");
    }
    const trimmed = note.trim();
    if (trimmed.length > 5000) {
      throw new Error("Keep notes under 5,000 characters.");
    }
    const existing = await ctx.db
      .query("progress")
      .withIndex("by_user_course", (q) =>
        q.eq("userId", userId).eq("courseId", courseId),
      )
      .first();
    if (existing) {
      await ctx.db.patch(existing._id, {
        note: trimmed.length > 0 ? trimmed : undefined,
        updatedAt: Date.now(),
      });
      return existing._id;
    }
    // Notes create a minimal progress entry so they surface in myProgress.
    return ctx.db.insert("progress", {
      userId,
      courseId,
      status: "started",
      note: trimmed.length > 0 ? trimmed : undefined,
      updatedAt: Date.now(),
    });
  },
});
