import { getAuthUserId } from "@convex-dev/auth/server";
import { query } from "./_generated/server";

/**
 * Progress Nudges: smart reminders and suggestions based on the
 * student's activity patterns, streaks, and learning progress.
 */

type Nudge = {
  id: string;
  type: "streak" | "course" | "flashcard" | "quiz" | "milestone" | "break";
  title: string;
  message: string;
  action: string;
  actionLink: string;
  priority: "high" | "medium" | "low";
  icon: string;
};

/** Generate personalized nudges for the signed-in student. */
export const myNudges = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    const nudges: Nudge[] = [];
    const now = Date.now();
    const today = new Date(now).toISOString().slice(0, 10);

    // Get user stats
    const stats = await ctx.db
      .query("userStats")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();

    // Get progress
    const progress = await ctx.db
      .query("progress")
      .withIndex("by_user_course", (q) => q.eq("userId", userId))
      .collect();

    // Get quiz attempts
    const attempts = await ctx.db
      .query("quizAttempts")
      .withIndex("by_user_course", (q) => q.eq("userId", userId))
      .collect();

    // Get flashcards
    const cards = await ctx.db
      .query("reviewCards")
      .withIndex("by_user_due", (q) => q.eq("userId", userId))
      .collect();

    const dueCards = cards.filter((c) => c.due <= now);
    const completedCourses = progress.filter((p) => p.status === "completed");
    const inProgressCourses = progress.filter((p) => p.status === "started");

    // ── Streak Nudges ───────────────────────────────────────
    if (stats) {
      const lastActive = stats.lastActiveDate;
      if (lastActive && lastActive !== today) {
        const daysSinceActive = Math.floor(
          (now - new Date(lastActive).getTime()) / (24 * 60 * 60 * 1000)
        );

        if (daysSinceActive === 1) {
          nudges.push({
            id: "streak-continue",
            type: "streak",
            title: "Keep your streak alive!",
            message: `You studied yesterday. Log in today to keep your ${stats.streakDays}-day streak going.`,
            action: "Study now",
            actionLink: "/dashboard",
            priority: "high",
            icon: "🔥",
          });
        } else if (daysSinceActive >= 3 && daysSinceActive < 7) {
          nudges.push({
            id: "streak-recover",
            type: "streak",
            title: "Break in study streak",
            message: `It's been ${daysSinceActive} days since you studied. Your streak was ${stats.bestStreak} days — pick up where you left off!`,
            action: "Resume learning",
            actionLink: "/dashboard",
            priority: "medium",
            icon: "📅",
          });
        } else if (daysSinceActive >= 7) {
          nudges.push({
            id: "streak-long-break",
            type: "break",
            title: "Welcome back!",
            message: `It's been a while since your last visit. Start with a quick review to refresh your memory.`,
            action: "Quick review",
            actionLink: "/flashcards",
            priority: "medium",
            icon: "👋",
          });
        }
      } else if (lastActive === today && stats.streakDays >= 3) {
        nudges.push({
          id: "streak-maintain",
          type: "streak",
          title: "Streak active!",
          message: `${stats.streakDays} days strong. You're building a great habit.`,
          action: "Keep going",
          actionLink: "/dashboard",
          priority: "low",
          icon: "⚡",
        });
      }
    }

    // ── Flashcard Nudges ────────────────────────────────────
    if (dueCards.length > 0) {
      nudges.push({
        id: "flashcards-due",
        type: "flashcard",
        title: "Flashcards due for review",
        message: `You have ${dueCards.length} card${dueCards.length !== 1 ? "s" : ""} waiting. Spaced repetition works best when you review on time.`,
        action: "Review now",
        actionLink: "/flashcards",
        priority: "high",
        icon: "🧠",
      });
    }

    // ── Course Progress Nudges ──────────────────────────────
    if (inProgressCourses.length > 0) {
      // Find the most recently started course
      const recent = inProgressCourses.sort(
        (a, b) => b.updatedAt - a.updatedAt
      )[0];
      const modules = await ctx.db.get(recent.courseId);
      const lastModule = recent.lastModuleIndex ?? 0;
      const totalModules = modules?.modules?.length ?? 6;

      if (lastModule < totalModules - 1) {
        nudges.push({
          id: "course-continue",
          type: "course",
          title: "Continue your course",
          message: `You're on module ${lastModule + 1} of ${totalModules} in "${modules?.title ?? "your course"}". Keep going!`,
          action: "Continue",
          actionLink: `/courses/${modules?.slug}?module=${lastModule + 1}`,
          priority: "medium",
          icon: "📚",
        });
      }
    }

    // ── Quiz Performance Nudges ─────────────────────────────
    const recentAttempts = attempts
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, 5);

    const failedRecent = recentAttempts.filter((a) => !a.passed);
    if (failedRecent.length >= 2) {
      const course = await ctx.db.get(failedRecent[0].courseId);
      nudges.push({
        id: "quiz-struggle",
        type: "quiz",
        title: "Struggling with quizzes?",
        message: `You've had ${failedRecent.length} recent attempts that didn't pass. Review the material or try the flashcards for this topic.`,
        action: "Review flashcards",
        actionLink: "/flashcards",
        priority: "high",
        icon: "📝",
      });
    }

    // ── Milestone Nudges ────────────────────────────────────
    if (completedCourses.length === 1 && stats?.quizPasses !== undefined) {
      nudges.push({
        id: "milestone-first",
        type: "milestone",
        title: "First course completed!",
        message: "Congratulations on completing your first course! You've earned 50 bonus points.",
        action: "View certificate",
        actionLink: "/certificates",
        priority: "medium",
        icon: "🎉",
      });
    }

    if (stats?.quizPasses !== undefined && stats.quizPasses >= 10) {
      const hasQuizMaster = stats.badges.includes("quiz_master");
      if (!hasQuizMaster) {
        nudges.push({
          id: "milestone-quiz-master",
          type: "milestone",
          title: "Quiz Master unlocked!",
          message: `You've passed ${stats.quizPasses} module quizzes. That's impressive dedication!`,
          action: "View badges",
          actionLink: "/dashboard",
          priority: "medium",
          icon: "🏆",
        });
      }
    }

    // ── No Courses Started ──────────────────────────────────
    if (progress.length === 0 && attempts.length === 0) {
      nudges.push({
        id: "get-started",
        type: "course",
        title: "Ready to start learning?",
        message: "Browse the catalog and pick your first course. We recommend starting with the Agricultural Foundations path.",
        action: "Browse catalog",
        actionLink: "/courses",
        priority: "high",
        icon: "🌱",
      });
    }

    // ── Learning Path Nudges ────────────────────────────────
    const allCoursesCompleted =
      progress.length > 0 &&
      progress.every((p) => p.status === "completed");
    if (allCoursesCompleted && completedCourses.length >= 4) {
      nudges.push({
        id: "path-complete",
        type: "milestone",
        title: "Learning path mastery!",
        message: "You've completed multiple courses. Consider exploring a new learning path to broaden your skills.",
        action: "Explore paths",
        actionLink: "/learning-paths",
        priority: "medium",
        icon: "🌟",
      });
    }

    // Sort by priority and return top nudges
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return nudges
      .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
      .slice(0, 5);
  },
});

/** Get nudge summary counts for the dashboard header. */
export const nudgeSummary = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return { high: 0, total: 0 };

    const now = Date.now();
    const today = new Date(now).toISOString().slice(0, 10);

    const stats = await ctx.db
      .query("userStats")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();

    const cards = await ctx.db
      .query("reviewCards")
      .withIndex("by_user_due", (q) => q.eq("userId", userId))
      .collect();

    const dueCards = cards.filter((c) => c.due <= now).length;
    const streakBreak =
      stats?.lastActiveDate && stats.lastActiveDate !== today;

    return {
      high: dueCards > 0 ? 1 : streakBreak ? 1 : 0,
      total: dueCards > 0 ? 1 : 0 + (streakBreak ? 1 : 0),
    };
  },
});
