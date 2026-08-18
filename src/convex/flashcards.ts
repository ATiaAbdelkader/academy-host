import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Spaced-repetition flashcards using the FSRS algorithm.
 * Cards are auto-created when a student answers a quiz question wrong.
 * The review page surfaces due cards and schedules optimal review intervals.
 */

/** FSRS parameters (simplified for server-side computation). */
const FSRS = {
  requestRetention: 0.9,
  maximumInterval: 365,
  w: [0.4, 0.6, 2.4, 5.8, 4.93, 0.94, 0.86, 0.01, 1.49, 0.14, 0.94, 2.18, 0.05, 0.34, 1.26, 0.29, 2.61],
};

/** Calculate next review interval and state using simplified FSRS. */
function fsrsNext(state: {
  difficulty: number;
  stability: number;
  elapsedDays: number;
  scheduledDays: number;
  reps: number;
  lapses: number;
  lastReview: number;
}, grade: number): {
  difficulty: number;
  stability: number;
  elapsedDays: number;
  scheduledDays: number;
  reps: number;
  lapses: number;
  lastReview: number;
  nextDue: number;
} {
  const now = Date.now();
  const { difficulty, stability, reps, lapses } = state;

  // grade: 1=again, 2=hard, 3=good, 4=easy
  if (grade < 3) {
    // Failed review: reset
    const newLapses = lapses + 1;
    const newStability = Math.max(1, stability * 0.2);
    const scheduledDays = 1;
    return {
      difficulty: Math.min(10, difficulty + 0.2),
      stability: newStability,
      elapsedDays: 0,
      scheduledDays,
      reps: reps,
      lapses: newLapses,
      lastReview: now,
      nextDue: now + scheduledDays * 24 * 60 * 60 * 1000,
    };
  }

  // Successful review
  const newReps = reps + 1;
  let newStability: number;

  if (reps === 0) {
    // First successful review
    newStability = stability * (1 + FSRS.w[0] * (4 - grade + 1));
  } else {
    // Subsequent reviews
    const successFactor = FSRS.w[1] * (11 - difficulty);
    newStability = stability * (1 + Math.exp(FSRS.w[2]) * (11 - difficulty) * Math.pow(stability, -FSRS.w[3]) * (Math.exp(FSRS.w[4] * (1 - grade)) - 1));
    newStability = Math.max(stability, newStability);
  }

  // Calculate interval based on stability and retention
  const retrievability = Math.exp(-Math.log(FSRS.requestRetention) / newStability);
  let scheduledDays = Math.round(newStability * (Math.exp(FSRS.w[5] * (grade - 3)) - 1) * FSRS.w[6]);
  scheduledDays = Math.max(1, Math.min(scheduledDays, FSRS.maximumInterval));

  return {
    difficulty: Math.max(1, Math.min(10, difficulty + (0.1 - (4 - grade) * (0.08 + (4 - grade) * 0.02)))),
    stability: newStability,
    elapsedDays: Math.round((now - state.lastReview) / (24 * 60 * 60 * 1000)),
    scheduledDays,
    reps: newReps,
    lapses,
    lastReview: now,
    nextDue: now + scheduledDays * 24 * 60 * 60 * 1000,
  };
}

/** Get all due flashcards for the signed-in student, grouped by course. */
export const dueCards = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return [];
    }
    const now = Date.now();
    const cards = await ctx.db
      .query("reviewCards")
      .withIndex("by_user_due", (q) =>
        q.eq("userId", userId).lte("due", now)
      )
      .collect();

    // Group by course for display
    const byCourse = new Map<string, typeof cards>();
    for (const card of cards) {
      const existing = byCourse.get(card.courseId) ?? [];
      existing.push(card);
      byCourse.set(card.courseId, existing);
    }

    return cards.sort((a, b) => a.due - b.due).slice(0, 20);
  },
});

/** Get flashcard stats for the signed-in student. */
export const myStats = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return { total: 0, due: 0, mastered: 0, learning: 0, newCards: 0 };
    }
    const allCards = await ctx.db
      .query("reviewCards")
      .withIndex("by_user_due", (q) => q.eq("userId", userId))
      .collect();

    const now = Date.now();
    const due = allCards.filter((c) => c.due <= now).length;
    const mastered = allCards.filter((c) => c.state.stability > 21 && c.state.reps >= 3).length;
    const learning = allCards.filter((c) => c.state.reps > 0 && c.state.stability <= 21).length;
    const newCards = allCards.filter((c) => c.state.reps === 0).length;

    return {
      total: allCards.length,
      due,
      mastered,
      learning,
      newCards,
    };
  },
});

/** Get flashcards grouped by course for browsing. */
export const byCourse = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return [];
    }
    const allCards = await ctx.db
      .query("reviewCards")
      .withIndex("by_user_due", (q) => q.eq("userId", userId))
      .collect();

    const courseMap = new Map<string, {
      courseId: string;
      courseTitle: string;
      courseSlug: string;
      cards: typeof allCards;
    }>();

    for (const card of allCards) {
      const existing = courseMap.get(card.courseId);
      if (existing) {
        existing.cards.push(card);
      } else {
        courseMap.set(card.courseId, {
          courseId: card.courseId,
          courseTitle: card.courseTitle,
          courseSlug: card.courseSlug,
          cards: [card],
        });
      }
    }

    return Array.from(courseMap.values()).map((course) => ({
      courseId: course.courseId,
      courseTitle: course.courseTitle,
      courseSlug: course.courseSlug,
      totalCards: course.cards.length,
      dueCards: course.cards.filter((c) => c.due <= Date.now()).length,
      masteredCards: course.cards.filter((c) => c.state.stability > 21 && c.state.reps >= 3).length,
    }));
  },
});

/** Review a flashcard with a grade (1=again, 2=hard, 3=good, 4=easy). */
export const reviewCard = mutation({
  args: {
    cardId: v.id("reviewCards"),
    grade: v.number(), // 1-4
  },
  handler: async (ctx, { cardId, grade }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Sign in to review flashcards.");
    }
    const card = await ctx.db.get(cardId);
    if (!card) {
      throw new Error("Card not found.");
    }
    if (card.userId !== userId) {
      throw new Error("This card belongs to another student.");
    }

    const cleanGrade = Math.max(1, Math.min(4, Math.round(grade)));
    const newState = fsrsNext(card.state, cleanGrade);

    await ctx.db.patch(cardId, {
      state: {
        difficulty: newState.difficulty,
        stability: newState.stability,
        elapsedDays: newState.elapsedDays,
        scheduledDays: newState.scheduledDays,
        reps: newState.reps,
        lapses: newState.lapses,
        lastReview: newState.lastReview,
      },
      due: newState.nextDue,
    });

    return {
      cardId,
      nextDue: newState.nextDue,
      scheduledDays: newState.scheduledDays,
      grade: cleanGrade,
    };
  },
});

/** Auto-create flashcards from wrong quiz answers. Called from quiz submission. */
export const createFromWrongAnswers = mutation({
  args: {
    courseId: v.id("courses"),
    courseTitle: v.string(),
    courseSlug: v.string(),
    moduleTitle: v.string(),
    questions: v.array(
      v.object({
        question: v.string(),
        options: v.array(v.string()),
        answerIndex: v.number(),
        wasCorrect: v.boolean(),
      })
    ),
  },
  handler: async (ctx, { courseId, courseTitle, courseSlug, moduleTitle, questions }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return;

    const now = Date.now();
    let created = 0;

    for (const q of questions) {
      if (q.wasCorrect) continue;

      // Check if card already exists for this question
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

      if (existing) {
        // Reset the card if it exists but was wrong again
        if (existing.due > now) {
          await ctx.db.patch(existing._id, {
            due: now,
            state: {
              ...existing.state,
              lapses: existing.state.lapses + 1,
              stability: Math.max(1, existing.state.stability * 0.5),
            },
          });
        }
        continue;
      }

      await ctx.db.insert("reviewCards", {
        userId,
        courseId,
        courseTitle,
        courseSlug,
        moduleTitle,
        question: q.question,
        options: q.options,
        answerIndex: q.answerIndex,
        due: now, // Due immediately for first review
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
      created++;
    }

    return { created };
  },
});

/** Delete a flashcard. */
export const deleteCard = mutation({
  args: { cardId: v.id("reviewCards") },
  handler: async (ctx, { cardId }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Sign in.");
    const card = await ctx.db.get(cardId);
    if (!card || card.userId !== userId) throw new Error("Card not found.");
    await ctx.db.delete(cardId);
    return { deleted: true };
  },
});

/** Delete all cards for a specific course. */
export const deleteCourseCards = mutation({
  args: { courseId: v.id("courses") },
  handler: async (ctx, { courseId }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Sign in.");
    const cards = await ctx.db
      .query("reviewCards")
      .withIndex("by_user_due", (q) => q.eq("userId", userId))
      .collect();
    const courseCards = cards.filter((c) => c.courseId === courseId);
    for (const card of courseCards) {
      await ctx.db.delete(card._id);
    }
    return { deleted: courseCards.length };
  },
});
