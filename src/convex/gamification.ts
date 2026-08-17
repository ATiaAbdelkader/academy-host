import { getAuthUserId } from "@convex-dev/auth/server";
import { query } from "./_generated/server";
import type { MutationCtx } from "./_generated/server";
import type { Id } from "./_generated/dataModel";
import { BADGE_DEFS } from "../lib/badges";

/**
 * Gamification for the academy: students earn points for real study actions
 * (passing module quizzes, completing courses, attending sessions, leaving
 * reviews) and build streaks by studying on consecutive days. Badges are
 * derived from lifetime counters, so they are always consistent with the
 * underlying activity — nothing needs to be manually awarded.
 */

/** Point values for each action, so the frontend can show "what earns points". */
export const POINTS = {
  quizPass: 10,
  courseCompleted: 50,
  attended: 20,
  booking: 5,
  review: 5,
  planCompleted: 30,
} as const;

/** Badge catalog (shared with the dashboard via src/lib/badges.ts). */
export { BADGE_DEFS };

type Activity = {
  points?: number;
  quizPass?: boolean;
  courseCompleted?: boolean;
  booking?: boolean;
  attended?: boolean;
  review?: boolean;
};

/** "YYYY-MM-DD" in UTC — streaks count study days, not timezones. */
function dayKey(ts: number): string {
  return new Date(ts).toISOString().slice(0, 10);
}

function computeBadges(s: {
  quizPasses: number;
  coursesCompleted: number;
  bestStreak: number;
  attendedCount: number;
  bookingsCount: number;
  reviewsCount: number;
}): string[] {
  const badges: string[] = [];
  if (s.quizPasses >= 1) badges.push("first_pass");
  if (s.quizPasses >= 10) badges.push("quiz_master");
  if (s.quizPasses >= 25) badges.push("quiz_legend");
  if (s.coursesCompleted >= 1) badges.push("first_course");
  if (s.coursesCompleted >= 3) badges.push("scholar");
  if (s.coursesCompleted >= 6) badges.push("graduate");
  if (s.bestStreak >= 3) badges.push("streak_3");
  if (s.bestStreak >= 7) badges.push("streak_7");
  if (s.bestStreak >= 14) badges.push("streak_14");
  if (s.attendedCount >= 1) badges.push("attendee");
  if (s.attendedCount >= 5) badges.push("regular");
  if (s.bookingsCount >= 1) badges.push("first_booking");
  if (s.reviewsCount >= 1) badges.push("reviewer");
  return badges;
}

/**
 * Record study activity for a user: applies points, advances the streak, and
 * recomputes badges. Called from the mutations that own each action (quiz
 * pass, course completion, attendance, booking, review, plan completion).
 * Never throws — gamification must not block the underlying action.
 */
export async function recordActivity(
  ctx: MutationCtx,
  userId: Id<"users">,
  activity: Activity,
): Promise<void> {
  try {
    const now = Date.now();
    const today = dayKey(now);
    const existing = await ctx.db
      .query("userStats")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();
    const base = existing ?? {
      userId,
      points: 0,
      streakDays: 0,
      bestStreak: 0,
      lastActiveDate: undefined as string | undefined,
      quizPasses: 0,
      coursesCompleted: 0,
      bookingsCount: 0,
      attendedCount: 0,
      reviewsCount: 0,
      badges: [] as string[],
      updatedAt: now,
    };

    // Streak: activity today keeps it, activity yesterday extends it,
    // anything else restarts at 1.
    let streakDays = base.streakDays;
    if (base.lastActiveDate !== today) {
      const yesterday = dayKey(now - 24 * 60 * 60 * 1000);
      streakDays = base.lastActiveDate === yesterday ? streakDays + 1 : 1;
    }
    const bestStreak = Math.max(base.bestStreak, streakDays);

    const quizPasses = base.quizPasses + (activity.quizPass ? 1 : 0);
    const coursesCompleted =
      base.coursesCompleted + (activity.courseCompleted ? 1 : 0);
    const bookingsCount = base.bookingsCount + (activity.booking ? 1 : 0);
    const attendedCount = base.attendedCount + (activity.attended ? 1 : 0);
    const reviewsCount = base.reviewsCount + (activity.review ? 1 : 0);

    const fields = {
      userId,
      points: base.points + (activity.points ?? 0),
      streakDays,
      bestStreak,
      lastActiveDate: today,
      quizPasses,
      coursesCompleted,
      bookingsCount,
      attendedCount,
      reviewsCount,
      badges: computeBadges({
        quizPasses,
        coursesCompleted,
        bestStreak,
        attendedCount,
        bookingsCount,
        reviewsCount,
      }),
      updatedAt: now,
    };

    if (existing) {
      await ctx.db.patch(existing._id, fields);
    } else {
      await ctx.db.insert("userStats", fields);
    }
  } catch {
    // Never let a gamification write fail the underlying study action.
  }
}

/** The signed-in student's own gamification stats + leaderboard rank. */
export const myStats = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return null;
    }
    const stats = await ctx.db
      .query("userStats")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();
    if (!stats) {
      return {
        points: 0,
        streakDays: 0,
        bestStreak: 0,
        quizPasses: 0,
        coursesCompleted: 0,
        bookingsCount: 0,
        attendedCount: 0,
        reviewsCount: 0,
        badges: [],
        rank: null,
      };
    }
    const all = await ctx.db.query("userStats").collect();
    const sorted = [...all].sort((a, b) => b.points - a.points);
    const rank = sorted.findIndex((s) => s.userId === userId) + 1;
    return {
      points: stats.points,
      streakDays: stats.streakDays,
      bestStreak: stats.bestStreak,
      quizPasses: stats.quizPasses,
      coursesCompleted: stats.coursesCompleted,
      bookingsCount: stats.bookingsCount,
      attendedCount: stats.attendedCount,
      reviewsCount: stats.reviewsCount,
      badges: stats.badges,
      rank: rank > 0 ? rank : null,
    };
  },
});

/** Top students by points, plus the caller's own rank. */
export const leaderboard = query({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query("userStats").collect();
    const sorted = [...all].sort((a, b) => b.points - a.points).slice(0, 10);
    const rows = await Promise.all(
      sorted.map(async (stats, index) => {
        const user = await ctx.db.get(stats.userId);
        return {
          rank: index + 1,
          points: stats.points,
          streakDays: stats.streakDays,
          badges: stats.badges,
          name:
            user?.name?.trim() ||
            (user?.email ? user.email.split("@")[0] : "Student"),
        };
      }),
    );
    const userId = await getAuthUserId(ctx);
    const myIndex = userId ? sorted.findIndex((s) => s.userId === userId) : -1;
    const myStatsRow = userId
      ? await ctx.db
          .query("userStats")
          .withIndex("by_user", (q) => q.eq("userId", userId))
          .first()
      : null;
    return {
      rows,
      myRank: myIndex >= 0 ? myIndex + 1 : null,
      myPoints: myStatsRow?.points ?? 0,
    };
  },
});
