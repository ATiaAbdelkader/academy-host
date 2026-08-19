import { query } from "./_generated/server";
import { v } from "convex/values";

export const verifyCredential = query({
  args: { studentId: v.id("users"), courseId: v.id("courses") },
  handler: async (ctx, args) => {
    // Check if student completed this specific course
    const progress = await ctx.db
      .query("progress")
      .filter((q) =>
        q.and(
          q.eq(q.field("userId"), args.studentId),
          q.eq(q.field("courseId"), args.courseId),
          q.eq(q.field("status"), "completed")
        )
      )
      .first();

    if (!progress) {
      return { verified: false, message: "Course not completed" };
    }

    const course = await ctx.db.get(args.courseId);
    if (!course) {
      return { verified: false, message: "Course not found" };
    }

    // Look for quiz attempts as proof of completion
    const quizAttempt = await ctx.db
      .query("quizAttempts")
      .filter((q) =>
        q.and(
          q.eq(q.field("userId"), args.studentId),
          q.eq(q.field("courseId"), args.courseId)
        )
      )
      .order("desc")
      .first();

    return {
      verified: true,
      studentId: args.studentId,
      course: {
        title: course.title,
        category: course.category,
      },
      completedAt: progress.updatedAt,
      score: quizAttempt ? `${quizAttempt.correct}/${quizAttempt.total}` : null,
      passed: quizAttempt?.passed ?? null,
    };
  },
});

export const getStudentPublicProfile = query({
  args: { studentId: v.id("users") },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.studentId);
    if (!user) return null;

    // Get all completed courses for this student
    const completedProgress = await ctx.db
      .query("progress")
      .filter((q) =>
        q.and(
          q.eq(q.field("userId"), args.studentId),
          q.eq(q.field("status"), "completed")
        )
      )
      .collect();

    const courseDetails = await Promise.all(
      completedProgress.map(async (p) => {
        const course = await ctx.db.get(p.courseId);
        return {
          courseId: p.courseId,
          courseTitle: course?.title ?? "Unknown",
          category: course?.category ?? "General",
          completedAt: p.updatedAt,
        };
      })
    );

    // Get leaderboard data
    const leaderboardEntries = await ctx.db
      .query("leaderboard")
      .filter((q) => q.eq(q.field("userId"), args.studentId))
      .first();

    return {
      name: user.name,
      email: user.email,
      courses: courseDetails,
      stats: {
        coursesCompleted: courseDetails.length,
        totalPoints: leaderboardEntries?.points ?? 0,
        streak: leaderboardEntries?.streak ?? 0,
      },
    };
  },
});
