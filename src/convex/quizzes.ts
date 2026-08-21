import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query, type MutationCtx } from "./_generated/server";
import { v } from "convex/values";
import type { ContentBlock } from "./schema";
import type { Doc, Id } from "./_generated/dataModel";
import { POINTS, recordActivity } from "./gamification";

/** Every content block in a course, in reading order — modules flatten to one stream. */
function blocksOf(course: Doc<"courses">): ContentBlock[] {
  return course.modules && course.modules.length > 0
    ? course.modules.flatMap((m) => m.content)
    : course.content;
}

/** The quiz blocks in a course, in order (their index is the module ordinal). */
function quizBlocksOf(
  course: Doc<"courses">,
): Extract<ContentBlock, { type: "quiz" }>[] {
  return blocksOf(course).filter(
    (block): block is Extract<ContentBlock, { type: "quiz" }> =>
      block.type === "quiz",
  );
}

/**
 * Grade a quiz submission server-side against the course content (students
 * never send their own score). Returns the result; the attempt is stored so
 * the best passing score counts toward course completion.
 */
/** The module a quiz block belongs to (0-based), for resume + drop-off. */
function moduleIndexOfQuiz(
  course: Doc<"courses">,
  quizIndex: number,
): number {
  let seen = 0;
  const modules =
    course.modules && course.modules.length > 0
      ? course.modules
      : [{ title: "Course content", content: course.content }];
  for (let mi = 0; mi < modules.length; mi += 1) {
    const quizCount = modules[mi].content.filter(
      (b) => b.type === "quiz",
    ).length;
    if (quizIndex < seen + quizCount) {
      return mi;
    }
    seen += quizCount;
  }
  return modules.length - 1;
}

/** Advance the student's furthest-module bookmark (resume + drop-off data). */
async function recordFurthestModule(
  ctx: MutationCtx,
  userId: Id<"users">,
  courseId: Id<"courses">,
  moduleIndex: number,
) {
  const existing = await ctx.db
    .query("progress")
    .withIndex("by_user_course", (q: any) =>
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
    return;
  }
  const furthest = Math.max(existing.lastModuleIndex ?? 0, moduleIndex);
  if (existing.lastModuleIndex !== furthest) {
    await ctx.db.patch(existing._id, {
      status: existing.status === "completed" ? "completed" : "started",
      lastModuleIndex: furthest,
      updatedAt: now,
    });
  }
}

export const submitQuiz = mutation({
  args: {
    courseId: v.id("courses"),
    quizIndex: v.number(),
    answers: v.array(v.number()),
    textAnswers: v.optional(v.array(v.string())),
  },
  handler: async (ctx, { courseId, quizIndex, answers, textAnswers }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Sign in to take the quiz.");
    }
    const course = await ctx.db.get(courseId);
    if (!course) {
      throw new Error("Course not found.");
    }
    const quizzes = quizBlocksOf(course);
    const quiz = quizzes[quizIndex];
    if (!quiz) {
      throw new Error("Quiz not found.");
    }
    if (quiz.questions.length === 0) {
      throw new Error("This quiz has no questions yet.");
    }
    // Modules unlock in order: every earlier quiz must already be passed.
    if (quizIndex > 0) {
      const attempts = await ctx.db
        .query("quizAttempts")
        .withIndex("by_user_course", (q: any) =>
          q.eq("userId", userId).eq("courseId", courseId),
        )
        .collect();
      const passed = new Set(
        attempts.filter((a) => a.passed).map((a) => a.quizIndex),
      );
      for (let i = 0; i < quizIndex; i += 1) {
        if (!passed.has(i)) {
          throw new Error(
            "Pass the previous module's quiz before moving on.",
          );
        }
      }
    }
    if (answers.length !== quiz.questions.length) {
      throw new Error("Answer every question before submitting.");
    }
    const cleanAnswers = answers.map((answer) => {
      if (!Number.isInteger(answer) || answer < 0) return 0;
      return answer;
    });
    // Split the questions into auto-graded (multiple choice) and open ones
    // that wait for an instructor to review.
    const openIndexes: number[] = [];
    let correct = 0;
    quiz.questions.forEach((question, i) => {
      if (question.open) {
        openIndexes.push(i);
        return;
      }
      if (cleanAnswers[i] === question.answerIndex) {
        correct += 1;
      }
    });
    const cleanText = quiz.questions.map((question, i) =>
      question.open ? (textAnswers?.[i] ?? "").trim() : "",
    );
    if (openIndexes.some((i) => cleanText[i].length === 0)) {
      throw new Error("Answer every open question before submitting.");
    }
    const total = quiz.questions.length;
    const pendingReview = openIndexes.length > 0;
    const percent = Math.round((correct / total) * 100);
    // With open questions the attempt can't pass until the instructor grades
    // them; pure multiple-choice quizzes pass immediately on the score.
    const passed = !pendingReview && percent >= quiz.passPercent;
    // First passing attempt of this quiz counts toward gamification only once.
    if (passed) {
      const priorPass = await ctx.db
        .query("quizAttempts")
        .withIndex("by_user_course", (q: any) =>
          q.eq("userId", userId).eq("courseId", courseId),
        )
        .filter((q) =>
          q.and(
            q.eq(q.field("quizIndex"), quizIndex),
            q.eq(q.field("passed"), true),
          ),
        )
        .first();
      if (!priorPass) {
        void recordActivity(ctx, userId, {
          points: POINTS.quizPass,
          quizPass: true,
        });
      }
    }
    // Resume bookmark: reaching a module's quiz counts as reaching that module.
    void recordFurthestModule(ctx, userId, courseId, moduleIndexOfQuiz(course, quizIndex));
    const attemptId = await ctx.db.insert("quizAttempts", {
      userId,
      courseId,
      quizIndex,
      correct,
      total,
      passed,
      pendingReview: pendingReview || undefined,
      answers: cleanAnswers,
      textAnswers: pendingReview ? cleanText : undefined,
      createdAt: Date.now(),
    });

    // Auto-create flashcards from wrong answers for spaced repetition review
    const wrongQuestions = quiz.questions
      .map((q, i) => ({
        question: q.question,
        options: q.options,
        answerIndex: q.answerIndex,
        wasCorrect: !q.open && cleanAnswers[i] === q.answerIndex,
      }))
      .filter((q) => !q.wasCorrect && !quiz.questions[quiz.questions.indexOf(quiz.questions.find((qq) => qq.question === q.question)!)].open);

    if (wrongQuestions.length > 0) {
      // Find module title for this quiz
      const modules = course.modules && course.modules.length > 0
        ? course.modules
        : [{ title: "Course content", content: course.content }];
      let quizCount = 0;
      let moduleTitle = modules[0]?.title ?? "Module";
      for (const mod of modules) {
        const modQuizCount = mod.content.filter((b) => b.type === "quiz").length;
        if (quizIndex < quizCount + modQuizCount) {
          moduleTitle = mod.title;
          break;
        }
        quizCount += modQuizCount;
      }

      // Create flashcards for wrong answers
      const now = Date.now();
      for (const q of wrongQuestions) {
        const existing = await ctx.db
          .query("reviewCards")
          .withIndex("by_user_due", (qs) => qs.eq("userId", userId))
          .filter((qs) =>
            qs.and(
              qs.eq(qs.field("courseId"), courseId),
              qs.eq(qs.field("question"), q.question)
            )
          )
          .first();

        if (!existing) {
          await ctx.db.insert("reviewCards", {
            userId,
            courseId,
            courseTitle: course.title,
            courseSlug: course.slug,
            moduleTitle,
            question: q.question,
            options: q.options,
            answerIndex: q.answerIndex,
            due: now,
            state: {
              difficulty: 5,
              stability: 1,
              elapsedDays: 0,
              scheduledDays: 0,
              reps: 0,
              lapses: 0,
              lastReview: now,
            },
            createdAt: now,
          });
        } else if (existing.due > now) {
          // Reset card if student got it wrong again
          await ctx.db.patch(existing._id, {
            due: now,
            state: {
              ...existing.state,
              lapses: existing.state.lapses + 1,
              stability: Math.max(1, existing.state.stability * 0.5),
            },
          });
        }
      }
    }

    return {
      attemptId,
      correct,
      total,
      percent,
      passed,
      passPercent: quiz.passPercent,
      pendingReview,
    };
  },
});

/**
 * Admin queue of quiz attempts that contain open answers waiting to be
 * graded. Each entry carries the student's answer, the model answer, and the
 * current verdict (null = still pending) so the console can grade inline.
 */
export const pendingReviewAttempts = query({
  args: {},
  handler: async (ctx) => {
    const callerId = await getAuthUserId(ctx);
    if (!callerId) {
      throw new Error("Not signed in.");
    }
    const caller = await ctx.db.get(callerId);
    if (caller?.role !== "admin") {
      throw new Error("Administrator access required.");
    }
    const attempts = await ctx.db
      .query("quizAttempts")
      .filter((q) => q.eq(q.field("pendingReview"), true))
      .order("desc")
      .collect();
    return Promise.all(
      attempts.map(async (attempt) => {
        const course = await ctx.db.get(attempt.courseId);
        const user = await ctx.db.get(attempt.userId);
        const quiz = course ? quizBlocksOf(course)[attempt.quizIndex] : null;
        const name =
          user?.name?.trim() ||
          (user?.email ? user.email.split("@")[0] : "Student");
        const openQuestions = quiz
          ? quiz.questions
              .map((question, i) => ({ question, i }))
              .filter(({ question }) => question.open)
          : [];
        return {
          attemptId: attempt._id,
          courseId: attempt.courseId,
          courseTitle: course?.title ?? "Course removed",
          studentName: name,
          quizIndex: attempt.quizIndex,
          quizTitle: quiz?.title ?? `Quiz ${attempt.quizIndex + 1}`,
          createdAt: attempt.createdAt,
          mcScore: `${attempt.correct}/${attempt.total}`,
          questions: openQuestions.map(({ question, i }) => ({
            question: question.question,
            modelAnswer: question.modelAnswer ?? "",
            answer: attempt.textAnswers?.[i] ?? "",
            grade: attempt.openGrades?.[i] ?? null,
          })),
        };
      }),
    );
  },
});

/**
 * Admin grades one open answer. When every open answer in the attempt is
 * graded, the attempt's score and pass status are finalized (and the student
 * earns the quiz-pass points if it just became a pass).
 */
export const gradeOpenAnswer = mutation({
  args: {
    attemptId: v.id("quizAttempts"),
    questionIndex: v.number(),
    correct: v.boolean(),
  },
  handler: async (ctx, { attemptId, questionIndex, correct }) => {
    const callerId = await getAuthUserId(ctx);
    if (!callerId) {
      throw new Error("Not signed in.");
    }
    const caller = await ctx.db.get(callerId);
    if (caller?.role !== "admin") {
      throw new Error("Administrator access required.");
    }
    const attempt = await ctx.db.get(attemptId);
    if (!attempt || !attempt.pendingReview) {
      throw new Error("Attempt not found or already reviewed.");
    }
    const course = await ctx.db.get(attempt.courseId);
    const quiz = course ? quizBlocksOf(course)[attempt.quizIndex] : null;
    if (!quiz) {
      throw new Error("Course quiz not found.");
    }
    const openIndexes = quiz.questions
      .map((question, i) => (question.open ? i : -1))
      .filter((i) => i >= 0);
    if (!openIndexes.includes(questionIndex)) {
      throw new Error("That question is not an open question.");
    }
    // Grades align to the full questions array; null = not graded yet.
    const grades = [
      ...(attempt.openGrades ?? quiz.questions.map(() => null)),
    ];
    grades[questionIndex] = correct;
    const allGraded = quiz.questions.every((question, i) =>
      question.open ? grades[i] !== null : true,
    );

    if (!allGraded) {
      await ctx.db.patch(attemptId, { openGrades: grades });
      return { attemptId, pending: true as const };
    }

    const openCorrect = grades.filter((g) => g === true).length;
    const finalCorrect = attempt.correct + openCorrect;
    const total = attempt.total;
    const percent = Math.round((finalCorrect / total) * 100);
    const passed = percent >= quiz.passPercent;
    await ctx.db.patch(attemptId, {
      openGrades: grades,
      pendingReview: undefined,
      correct: finalCorrect,
      passed,
    });
    if (passed) {
      const priorPass = await ctx.db
        .query("quizAttempts")
        .withIndex("by_user_course", (q: any) =>
          q.eq("userId", attempt.userId).eq("courseId", attempt.courseId),
        )
        .filter((q) =>
          q.and(
            q.eq(q.field("quizIndex"), attempt.quizIndex),
            q.eq(q.field("passed"), true),
          ),
        )
        .first();
      if (!priorPass) {
        void recordActivity(ctx, attempt.userId, {
          points: POINTS.quizPass,
          quizPass: true,
        });
      }
      if (course) {
        void recordFurthestModule(
          ctx,
          attempt.userId,
          attempt.courseId,
          moduleIndexOfQuiz(course, attempt.quizIndex),
        );
      }
    }
    return { attemptId, pending: false as const, passed, percent };
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
      .withIndex("by_user_course", (q: any) =>
        q.eq("userId", userId).eq("courseId", courseId),
      )
      .order("desc")
      .collect();
    return attempts;
  },
});
