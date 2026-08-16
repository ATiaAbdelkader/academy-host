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
 * Admin overview of quiz engagement: attempt volume, unique students, pass
 * rate, and average score — overall and broken out per course.
 */
export const adminQuizStats = query({
  args: {},
  handler: async (ctx) => {
    const attempts = await ctx.db.query("quizAttempts").collect();
    const courses = await ctx.db.query("courses").collect();
    const courseById = new Map(courses.map((c) => [c._id, c]));

    type CourseRow = {
      courseId: string;
      title: string;
      attempts: number;
      passed: number;
      students: Set<string>;
      sumPercent: number;
    };
    const perCourse = new Map<string, CourseRow>();
    let passedAttempts = 0;
    let sumPercent = 0;

    for (const attempt of attempts) {
      const percent =
        attempt.total > 0
          ? Math.round((attempt.correct / attempt.total) * 100)
          : 0;
      sumPercent += percent;
      if (attempt.passed) {
        passedAttempts += 1;
      }
      const row =
        perCourse.get(attempt.courseId) ??
        ({
          courseId: attempt.courseId,
          title: courseById.get(attempt.courseId)?.title ?? "Course removed",
          attempts: 0,
          passed: 0,
          students: new Set<string>(),
          sumPercent: 0,
        } satisfies CourseRow);
      row.attempts += 1;
      if (attempt.passed) {
        row.passed += 1;
      }
      row.students.add(attempt.userId);
      row.sumPercent += percent;
      perCourse.set(attempt.courseId, row);
    }

    const totalAttempts = attempts.length;
    const byCourse = Array.from(perCourse.values())
      .map((row) => ({
        courseId: row.courseId,
        title: row.title,
        attempts: row.attempts,
        students: row.students.size,
        passRate:
          row.attempts > 0 ? Math.round((row.passed / row.attempts) * 100) : 0,
        avgScore:
          row.attempts > 0 ? Math.round(row.sumPercent / row.attempts) : 0,
      }))
      .sort((a, b) => b.attempts - a.attempts)
      .slice(0, 8);

    return {
      totalAttempts,
      uniqueStudents: new Set(attempts.map((a) => a.userId)).size,
      passRate:
        totalAttempts > 0
          ? Math.round((passedAttempts / totalAttempts) * 100)
          : 0,
      avgScore:
        totalAttempts > 0 ? Math.round(sumPercent / totalAttempts) : 0,
      byCourse,
    };
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
