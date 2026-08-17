import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import type { Doc } from "./_generated/dataModel";
import { POINTS, recordActivity } from "./gamification";

/**
 * Study plan scheduler: a student picks a course and a start date, and the
 * academy builds a day-by-day plan — one lesson + one quiz per module, then a
 * final review task. Tasks tick off as the student works through them.
 */

/** Build the task list for a course: lesson + quiz per module, then review. */
function buildTasks(
  course: Doc<"courses">,
): { day: number; title: string; kind: "lesson" | "quiz" | "review" }[] {
  const modules = course.modules ?? [];
  const tasks: { day: number; title: string; kind: "lesson" | "quiz" | "review" }[] = [];
  modules.forEach((module, i) => {
    tasks.push({
      day: i,
      title: `Module ${i + 1}: ${module.title} — study the lesson`,
      kind: "lesson",
    });
    tasks.push({
      day: i,
      title: `Module ${i + 1} quiz — pass to unlock the next module`,
      kind: "quiz",
    });
  });
  tasks.push({
    day: modules.length,
    title: "Review the full course and earn your certificate",
    kind: "review",
  });
  return tasks;
}

/** Create a study plan for one course starting on a given day. */
export const createPlan = mutation({
  args: {
    courseId: v.id("courses"),
    startDate: v.number(),
  },
  handler: async (ctx, { courseId, startDate }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Sign in to create a study plan.");
    }
    const course = await ctx.db.get(courseId);
    if (!course) {
      throw new Error("Course not found.");
    }
    if (!course.modules || course.modules.length === 0) {
      throw new Error("This course has no modules to schedule yet.");
    }
    const dayStart = new Date(startDate);
    dayStart.setHours(0, 0, 0, 0);
    const planId = await ctx.db.insert("studyPlans", {
      userId,
      courseId,
      title: course.title,
      startDate: dayStart.getTime(),
      completed: false,
      createdAt: Date.now(),
    });
    for (const task of buildTasks(course)) {
      await ctx.db.insert("studyTasks", {
        planId,
        day: task.day,
        title: task.title,
        kind: task.kind,
        done: false,
      });
    }
    return planId;
  },
});

/** The signed-in student's plans with tasks, newest first. */
export const myPlans = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return null;
    }
    const plans = await ctx.db
      .query("studyPlans")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();
    return Promise.all(
      plans.map(async (plan) => {
        const course = await ctx.db.get(plan.courseId);
        const tasks = await ctx.db
          .query("studyTasks")
          .withIndex("by_plan", (q) => q.eq("planId", plan._id))
          .collect();
        const sortedTasks = [...tasks].sort((a, b) => a.day - b.day);
        return {
          ...plan,
          courseSlug: course?.slug ?? "",
          courseId: plan.courseId,
          tasks: sortedTasks,
        };
      }),
    );
  },
});

/** Toggle one task done/undone. Completing the last task finishes the plan. */
export const toggleTask = mutation({
  args: {
    taskId: v.id("studyTasks"),
    done: v.boolean(),
  },
  handler: async (ctx, { taskId, done }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Sign in to manage your study plan.");
    }
    const task = await ctx.db.get(taskId);
    if (!task) {
      throw new Error("Task not found.");
    }
    const plan = await ctx.db.get(task.planId);
    if (!plan || plan.userId !== userId) {
      throw new Error("Plan not found.");
    }
    await ctx.db.patch(taskId, {
      done,
      doneAt: done ? Date.now() : undefined,
    });

    if (done && !plan.completed) {
      const tasks = await ctx.db
        .query("studyTasks")
        .withIndex("by_plan", (q) => q.eq("planId", plan._id))
        .collect();
      const allDone = tasks.every((t) => t._id === taskId ? done : t.done);
      if (allDone) {
        await ctx.db.patch(plan._id, {
          completed: true,
          completedAt: Date.now(),
        });
        // Finishing the whole plan is its own achievement on top of the
        // course-completion points earned in the course itself.
        void recordActivity(ctx, userId, {
          points: POINTS.planCompleted,
        });
      }
    }
    return taskId;
  },
});

/** Delete a plan and its tasks. */
export const deletePlan = mutation({
  args: { planId: v.id("studyPlans") },
  handler: async (ctx, { planId }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Sign in to manage your study plan.");
    }
    const plan = await ctx.db.get(planId);
    if (!plan || plan.userId !== userId) {
      throw new Error("Plan not found.");
    }
    const tasks = await ctx.db
      .query("studyTasks")
      .withIndex("by_plan", (q) => q.eq("planId", planId))
      .collect();
    for (const task of tasks) {
      await ctx.db.delete(task._id);
    }
    await ctx.db.delete(planId);
    return planId;
  },
});
