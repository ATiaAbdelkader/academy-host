import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import type { ContentBlock } from "./schema";

/** The quiz blocks in a course, in order. */
function quizBlocksOf(content: ContentBlock[]): Extract<ContentBlock, { type: "quiz" }>[] {
  return content.filter(
    (block): block is Extract<ContentBlock, { type: "quiz" }> =>
      block.type === "quiz",
  );
}

/**
 * Grade a quiz submission server-side against the course content (students
 * never send their own score). Returns the result; the attempt is stored so
 * the best passing score counts toward course completion.
 */
export const submitQuiz = mutation({
  args: {
    courseId: v.id("courses"),
    quizIndex: v.number(),
    answers: v.array(v.number()),
  },
  handler: async (ctx, { courseId, quizIndex, answers }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Sign in to take the quiz.");
    }
    const course = await ctx.db.get(courseId);
    if (!course) {
      throw new Error("Course not found.");
    }
    const quizzes = quizBlocksOf(course.content);
    const quiz = quizzes[quizIndex];
    if (!quiz) {
      throw new Error("Quiz not found.");
    }
    if (quiz.questions.length === 0) {
      throw new Error("This quiz has no questions yet.");
    }
    if (answers.length !== quiz.questions.length) {
      throw new Error("Answer every question before submitting.");
    }
    const cleanAnswers = answers.map((answer) => {
      if (!Number.isInteger(answer) || answer < 0) return 0;
      return answer;
    });
    let correct = 0;
    quiz.questions.forEach((question, i) => {
      if (cleanAnswers[i] === question.answerIndex) {
        correct += 1;
      }
    });
    const total = quiz.questions.length;
    const percent = Math.round((correct / total) * 100);
    const passed = percent >= quiz.passPercent;
    const attemptId = await ctx.db.insert("quizAttempts", {
      userId,
      courseId,
      quizIndex,
      correct,
      total,
      passed,
      answers: cleanAnswers,
      createdAt: Date.now(),
    });
    return { attemptId, correct, total, percent, passed, passPercent: quiz.passPercent };
  },
});

/**
 * The signed-in student's attempts for one course, newest first, plus the best
 * passing result per quiz block (used for the completion gate).
 */
export const myQuizResults = query({
  args: { courseId: v.id("courses") },
  handler: async (ctx, { courseId }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return null;
    }
    const attempts = await ctx.db
      .query("quizAttempts")
      .withIndex("by_user_course", (q) =>
        q.eq("userId", userId).eq("courseId", courseId),
      )
      .order("desc")
      .collect();
    return attempts;
  },
});
