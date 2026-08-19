import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

/** Get adaptive quiz questions — picks from pool based on student skill level */
export const getAdaptiveQuestions = query({
  args: {
    courseId: v.id("courses"),
    moduleIndex: v.number(),
    userId: v.id("users"),
  },
  handler: async (ctx, { courseId, moduleIndex, userId }) => {
    // Get student's past attempts for this quiz
    const attempts = await ctx.db
      .query("quizAttempts")
      .withIndex("by_user_course", (q) =>
        q.eq("userId", userId).eq("courseId", courseId)
      )
      .collect();
    
    const quizAttempts = attempts.filter((a) => a.quizIndex === moduleIndex);
    const avgScore = quizAttempts.length > 0
      ? quizAttempts.reduce((sum, a) => sum + (a.correct / a.total) * 100, 0) / quizAttempts.length
      : 0;

    // Get the course module
    const course = await ctx.db.get(courseId);
    if (!course?.modules) return { questions: [], difficulty: "beginner" as const };
    
    const module = course.modules[moduleIndex];
    if (!module) return { questions: [], difficulty: "beginner" as const };

    const quizBlock = module.content.find((b) => b.type === "quiz");
    if (!quizBlock || quizBlock.type !== "quiz") return { questions: [], difficulty: "beginner" as const };

    // Determine difficulty based on performance
    let difficulty: "beginner" | "intermediate" | "advanced" = "beginner";
    if (avgScore >= 80) difficulty = "advanced";
    else if (avgScore >= 60) difficulty = "intermediate";

    return {
      questions: quizBlock.questions,
      passPercent: quizBlock.passPercent,
      difficulty,
      previousScore: avgScore,
      attemptsTaken: quizAttempts.length,
    };
  },
});

/** Record quiz attempt and update mastery */
export const recordAttempt = mutation({
  args: {
    userId: v.id("users"),
    courseId: v.id("courses"),
    moduleIndex: v.number(),
    answers: v.array(v.number()),
    correct: v.number(),
    total: v.number(),
  },
  handler: async (ctx, { userId, courseId, moduleIndex, answers, correct, total }) => {
    const passed = (correct / total) * 100 >= 60; // default 60% pass
    
    await ctx.db.insert("quizAttempts", {
      userId,
      courseId,
      quizIndex: moduleIndex,
      correct,
      total,
      passed,
      answers,
      createdAt: Date.now(),
    });

    // Update progress
    const existing = await ctx.db
      .query("progress")
      .withIndex("by_user_course", (q) =>
        q.eq("userId", userId).eq("courseId", courseId)
      )
      .first();

    if (existing) {
      const newLastModule = Math.max(existing.lastModuleIndex ?? 0, moduleIndex + 1);
      await ctx.db.patch(existing._id, {
        lastModuleIndex: newLastModule,
        updatedAt: Date.now(),
      });
    }

    // Award points for passing
    if (passed) {
      const stats = await ctx.db
        .query("userStats")
        .withIndex("by_user", (q) => q.eq("userId", userId))
        .first();
      if (stats) {
        await ctx.db.patch(stats._id, {
          points: stats.points + 10,
          quizPasses: stats.quizPasses + 1,
          updatedAt: Date.now(),
        });
      }
    }

    return { passed, score: Math.round((correct / total) * 100) };
  },
});

/** Mastery check — is this module mastered? */
export const getMasteryStatus = query({
  args: { courseId: v.id("courses"), moduleIndex: v.number(), userId: v.id("users") },
  handler: async (ctx, { courseId, moduleIndex, userId }) => {
    const attempts = await ctx.db
      .query("quizAttempts")
      .withIndex("by_user_course", (q) =>
        q.eq("userId", userId).eq("courseId", courseId)
      )
      .collect();

    const quizAttempts = attempts.filter((a) => a.quizIndex === moduleIndex);
    if (quizAttempts.length === 0) return { mastered: false, bestScore: 0, attempts: 0 };

    const bestScore = Math.max(...quizAttempts.map((a) => Math.round((a.correct / a.total) * 100)));
    const mastered = bestScore >= 80; // mastery threshold

    return { mastered, bestScore, attempts: quizAttempts.length };
  },
});
