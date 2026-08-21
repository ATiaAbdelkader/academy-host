import { getAuthUserId } from "@convex-dev/auth/server";
import { query } from "./_generated/server";
import type { ContentBlock, CourseModule } from "./schema";
import type { Doc, Id } from "./_generated/dataModel";

/** Helper: extract quiz blocks from a course in reading order. */
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
 * Full analytics payload for the signed-in student's dashboard.
 * Returns quiz score history, per-course progress, study streak data,
 * and subject-area strength/weakness breakdown.
 */
export const myAnalytics = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;

    // ── Quiz attempts ──────────────────────────────────────────────
    const attempts = await ctx.db
      .query("quizAttempts")
      .withIndex("by_user_course", (q) => q.eq("userId", userId))
      .collect();

    // ── Progress entries ───────────────────────────────────────────
    const progress = await ctx.db
      .query("progress")
      .withIndex("by_user_course", (q) => q.eq("userId", userId))
      .collect();

    // ── User stats ─────────────────────────────────────────────────
    const stats = await ctx.db
      .query("userStats")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();

    // ── Course metadata ────────────────────────────────────────────
    const courses = await ctx.db.query("courses").collect();
    const courseById = new Map(courses.map((c) => [c._id, c]));

    // ── Score history (sorted chronologically for charts) ──────────
    const sortedAttempts = [...attempts].sort(
      (a, b) => a.createdAt - b.createdAt,
    );
    const scoreHistory = sortedAttempts.map((attempt) => {
      const course = courseById.get(attempt.courseId);
      return {
        date: attempt.createdAt,
        score: Math.round((attempt.correct / attempt.total) * 100),
        passed: attempt.passed,
        courseTitle: course?.title ?? "Course",
        courseSlug: course?.slug ?? "",
        quizIndex: attempt.quizIndex,
      };
    });

    // ── Per-course breakdown ───────────────────────────────────────
    const byCourseMap = new Map<Id<"courses">, Doc<"quizAttempts">[]>();
    for (const attempt of attempts) {
      const list = byCourseMap.get(attempt.courseId) ?? [];
      list.push(attempt);
      byCourseMap.set(attempt.courseId, list);
    }

    const courseBreakdown = progress.map((entry) => {
      const course = courseById.get(entry.courseId);
      const courseAttempts = byCourseMap.get(entry.courseId) ?? [];
      const totalModules = course?.modules?.length ?? 0;
      const passedQuizzes = new Set(
        courseAttempts.filter((a) => a.passed).map((a) => a.quizIndex),
      ).size;
      const bestScore =
        courseAttempts.length > 0
          ? Math.round(
              Math.max(
                ...courseAttempts.map(
                  (a) => (a.correct / a.total) * 100,
                ),
              ),
            )
          : 0;
      const avgScore =
        courseAttempts.length > 0
          ? Math.round(
              courseAttempts.reduce(
                (sum, a) => sum + (a.correct / a.total) * 100,
                0,
              ) / courseAttempts.length,
            )
          : 0;

      return {
        courseId: entry.courseId,
        title: course?.title ?? "Course removed",
        slug: course?.slug ?? "",
        category: course?.category ?? "",
        status: entry.status,
        lastModuleIndex: entry.lastModuleIndex ?? 0,
        totalModules,
        passedQuizzes,
        totalAttempts: courseAttempts.length,
        bestScore,
        avgScore,
        progressPct:
          totalModules > 0
            ? Math.round(
                ((entry.lastModuleIndex ?? 0) / totalModules) * 100,
              )
            : entry.status === "completed"
              ? 100
              : 0,
      };
    });

    // ── Strength / weakness by category ────────────────────────────
    const categoryStats = new Map<
      string,
      { correct: number; total: number; attempts: number }
    >();
    for (const attempt of attempts) {
      const course = courseById.get(attempt.courseId);
      if (!course) continue;
      const cat = course.category || "General";
      const existing = categoryStats.get(cat) ?? {
        correct: 0,
        total: 0,
        attempts: 0,
      };
      existing.correct += attempt.correct;
      existing.total += attempt.total;
      existing.attempts += 1;
      categoryStats.set(cat, existing);
    }

    const categories = Array.from(categoryStats.entries()).map(
      ([category, data]) => ({
        category,
        accuracy: Math.round((data.correct / data.total) * 100),
        totalQuestions: data.total,
        attempts: data.attempts,
      }),
    );

    // ── Study activity timeline (points earned per day, last 30 days) ──
    const now = Date.now();
    const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;
    const dailyActivity: Record<string, number> = {};
    for (const attempt of sortedAttempts) {
      if (attempt.createdAt < thirtyDaysAgo) continue;
      const day = new Date(attempt.createdAt).toISOString().slice(0, 10);
      dailyActivity[day] = (dailyActivity[day] ?? 0) + 1;
    }
    // Fill in zeros for days with no activity
    const activityTimeline: Array<{ date: string; quizzes: number }> = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date(now - i * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10);
      activityTimeline.push({ date: d, quizzes: dailyActivity[d] ?? 0 });
    }

    // ── Summary stats ──────────────────────────────────────────────
    const totalQuizAttempts = attempts.length;
    const totalPassed = attempts.filter((a) => a.passed).length;
    const overallPassRate =
      totalQuizAttempts > 0
        ? Math.round((totalPassed / totalQuizAttempts) * 100)
        : 0;
    const overallAvgScore =
      totalQuizAttempts > 0
        ? Math.round(
            attempts.reduce(
              (sum, a) => sum + (a.correct / a.total) * 100,
              0,
            ) / totalQuizAttempts,
          )
        : 0;
    const coursesCompleted = progress.filter(
      (p) => p.status === "completed",
    ).length;
    const coursesStarted = progress.length;

    return {
      summary: {
        totalQuizAttempts,
        totalPassed,
        overallPassRate,
        overallAvgScore,
        coursesStarted,
        coursesCompleted,
        points: stats?.points ?? 0,
        streakDays: stats?.streakDays ?? 0,
        bestStreak: stats?.bestStreak ?? 0,
        badges: stats?.badges ?? [],
      },
      scoreHistory,
      courseBreakdown: courseBreakdown.sort(
        (a, b) => b.progressPct - a.progressPct,
      ),
      categories: categories.sort((a, b) => b.accuracy - a.accuracy),
      activityTimeline,
    };
  },
});
