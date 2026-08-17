import { getAuthUserId } from "@convex-dev/auth/server";
import { query } from "./_generated/server";
import type { ContentBlock, CourseModule } from "./schema";
import type { Doc, Id } from "./_generated/dataModel";

/** The quiz blocks in a course, in reading order (index = module ordinal). */
function quizBlocksOf(
  course: Doc<"courses">,
): Extract<ContentBlock, { type: "quiz" }>[] {
  const modules: CourseModule[] =
    course.modules && course.modules.length > 0
      ? course.modules
      : [{ title: "Course content", content: course.content }];
  return modules
    .flatMap((m) => m.content)
    .filter(
      (block): block is Extract<ContentBlock, { type: "quiz" }> =>
        block.type === "quiz",
    );
}

/**
 * The signed-in student's quiz insights across every course they've attempted:
 * attempt count, best score, the recent score trend, and the specific
 * questions answered wrong most often (with the module they belong to), so the
 * dashboard can tell them exactly what to review.
 */
export const myQuizInsights = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return null;
    }
    const attempts = await ctx.db
      .query("quizAttempts")
      .withIndex("by_user_course", (q) => q.eq("userId", userId))
      .collect();
    if (attempts.length === 0) {
      return [];
    }
    const courses = await ctx.db.query("courses").collect();
    const courseById = new Map(courses.map((c) => [c._id, c]));

    const byCourse = new Map<Id<"courses">, Doc<"quizAttempts">[]>();
    for (const attempt of attempts) {
      const list = byCourse.get(attempt.courseId) ?? [];
      list.push(attempt);
      byCourse.set(attempt.courseId, list);
    }

    const results: Array<{
      courseId: string;
      courseTitle: string;
      courseSlug: string;
      attempts: number;
      bestScore: number;
      passed: number;
      lastScores: Array<{ score: number; passed: boolean; createdAt: number }>;
      weakTopics: Array<{
        moduleTitle: string;
        question: string;
        timesWrong: number;
      }>;
    }> = [];

    for (const [courseId, list] of byCourse) {
      const course = courseById.get(courseId);
      const quizzes = course ? quizBlocksOf(course) : [];
      const sorted = [...list].sort((a, b) => a.createdAt - b.createdAt);
      const lastScores = sorted.slice(-5).map((attempt) => ({
        score: Math.round((attempt.correct / attempt.total) * 100),
        passed: attempt.passed,
        createdAt: attempt.createdAt,
      }));

      const weak = new Map<
        string,
        { moduleTitle: string; question: string; timesWrong: number }
      >();
      for (const attempt of list) {
        const quiz = quizzes[attempt.quizIndex];
        if (!quiz || !attempt.answers) continue;
        quiz.questions.forEach((question, qi) => {
          if (qi >= attempt.answers!.length) return;
          if (attempt.answers![qi] === question.answerIndex) return;
          const key = `${attempt.quizIndex}:${qi}`;
          const existing = weak.get(key) ?? {
            moduleTitle: quiz.title,
            question: question.question,
            timesWrong: 0,
          };
          existing.timesWrong += 1;
          weak.set(key, existing);
        });
      }

      results.push({
        courseId,
        courseTitle: course?.title ?? "Course removed",
        courseSlug: course?.slug ?? "",
        attempts: list.length,
        bestScore: Math.round(
          Math.max(...list.map((attempt) => attempt.correct / attempt.total)) *
            100,
        ),
        passed: list.filter((attempt) => attempt.passed).length,
        lastScores,
        weakTopics: Array.from(weak.values())
          .sort((a, b) => b.timesWrong - a.timesWrong)
          .slice(0, 5),
      });
    }

    return results.sort((a, b) => b.attempts - a.attempts);
  },
});
