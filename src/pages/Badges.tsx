import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { useAuth } from "@/hooks/use-auth";
import { Award, Trophy, Flame, Star, Lock } from "lucide-react";
import { BADGE_DEFS } from "../lib/badges";

const BADGE_ICONS: Record<string, string> = {
  first_pass: "🎯",
  quiz_master: "🧠",
  quiz_legend: "👑",
  first_course: "🏆",
  scholar: "📚",
  graduate: "🎓",
  streak_3: "🔥",
  streak_7: "⚡",
  streak_14: "💎",
  attendee: "🎫",
  regular: "⭐",
  first_booking: "📅",
  reviewer: "✍️",
};

export default function Badges() {
  const { user } = useAuth();
  const stats = useQuery(api.gamification.myStats);

  const earnedBadges = stats?.badges ?? [];
  const allBadges = Object.entries(BADGE_DEFS);

  return (
    <div className="min-h-screen bg-[var(--color-bg,#fafaf8)] font-mono">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <Award className="w-6 h-6 text-[var(--color-primary,#16a34a)]" />
          <h1 className="text-2xl font-bold tracking-tight">Skill Badges & Milestones</h1>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <Trophy className="w-5 h-5 text-amber-500 mx-auto mb-1" />
            <div className="text-2xl font-bold">{stats?.points ?? 0}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">Total Points</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <Award className="w-5 h-5 text-green-500 mx-auto mb-1" />
            <div className="text-2xl font-bold">{earnedBadges.length}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">Badges Earned</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <Flame className="w-5 h-5 text-orange-500 mx-auto mb-1" />
            <div className="text-2xl font-bold">{stats?.streakDays ?? 0}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">Day Streak</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <Star className="w-5 h-5 text-purple-500 mx-auto mb-1" />
            <div className="text-2xl font-bold">{stats?.bestStreak ?? 0}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">Best Streak</div>
          </div>
        </div>

        {/* Badges Grid */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
            <h2 className="font-bold text-sm uppercase tracking-wider">
              All Badges ({earnedBadges.length}/{allBadges.length} earned)
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100">
            {allBadges.map(([key, def]) => {
              const earned = earnedBadges.includes(key);
              return (
                <div
                  key={key}
                  className={`bg-white p-4 flex items-start gap-3 ${!earned ? "opacity-40" : ""}`}
                >
                  <div className="text-3xl">{BADGE_ICONS[key] ?? "🏅"}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm flex items-center gap-1">
                      {def.label}
                      {!earned && <Lock className="w-3 h-3 text-gray-400" />}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">{def.blurb}</div>
                  </div>
                  {earned && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold shrink-0">
                      Earned
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
