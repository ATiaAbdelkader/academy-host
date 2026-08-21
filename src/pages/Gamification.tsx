import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { useAuth } from "@/hooks/use-auth";
import { Trophy, Flame, Star, Zap, Target, Award, TrendingUp, Medal } from "lucide-react";
import { POINTS } from "../convex/gamification";

const LEVEL_THRESHOLDS = [0, 50, 150, 300, 500, 750, 1000, 1500, 2000, 3000, 5000];
const LEVEL_NAMES = ["Seedling", "Sprout", "Grower", "Cultivator", "Farmer", "Expert", "Master", "Grandmaster", "Legend", "Champion", "Icon"];

function getLevel(points: number) {
  let level = 1;
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (points >= LEVEL_THRESHOLDS[i]) { level = i + 1; break; }
  }
  const currentThreshold = LEVEL_THRESHOLDS[level - 1] ?? 0;
  const nextThreshold = LEVEL_THRESHOLDS[level] ?? LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1]!;
  const progress = nextThreshold > currentThreshold ? ((points - currentThreshold) / (nextThreshold - currentThreshold)) * 100 : 100;
  return { level, name: LEVEL_NAMES[level - 1] ?? "Icon", progress: Math.min(100, progress), nextThreshold };
}

export default function Gamification() {
  const { user } = useAuth();
  const stats = useQuery(api.gamification.myStats);
  const leaderboard = useQuery(api.gamification.leaderboard);

  const points = stats?.points ?? 0;
  const streak = stats?.streakDays ?? 0;
  const badges = stats?.badges ?? [];
  const { level, name: levelName, progress, nextThreshold } = getLevel(points);

  const myRank = leaderboard?.myRank ?? null;

  return (
    <div className="min-h-screen bg-[var(--color-bg,#fafaf8)] font-mono">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <Trophy className="w-6 h-6 text-[var(--color-primary,#16a34a)]" />
          <h1 className="text-2xl font-bold tracking-tight">Gamification Hub</h1>
        </div>

        {/* Player Card */}
        <div className="bg-gradient-to-r from-green-600 to-green-800 text-white rounded-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold">
              {user?.name?.[0] ?? "S"}
            </div>
            <div>
              <div className="text-xl font-bold">{user?.name ?? "Student"}</div>
              <div className="text-green-200 text-sm">Level {level} · {levelName}</div>
            </div>
            {myRank != null && myRank >= 0 && (
              <div className="ml-auto text-right">
                <div className="text-2xl font-bold">#{myRank + 1}</div>
                <div className="text-green-200 text-xs">Global Rank</div>
              </div>
            )}
          </div>
          <div className="mb-2">
            <div className="flex justify-between text-xs mb-1">
              <span>{points} XP</span>
              <span>{nextThreshold} XP</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3">
              <div className="bg-white h-3 rounded-full transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>
          <div className="text-green-200 text-xs">{Math.round(progress)}% to Level {level + 1}</div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <Zap className="w-5 h-5 text-amber-500 mx-auto mb-1" />
            <div className="text-2xl font-bold">{points}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">Total XP</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <Flame className="w-5 h-5 text-orange-500 mx-auto mb-1" />
            <div className="text-2xl font-bold">{streak}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">Day Streak</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <Award className="w-5 h-5 text-green-500 mx-auto mb-1" />
            <div className="text-2xl font-bold">{badges.length}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">Badges</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <Medal className="w-5 h-5 text-purple-500 mx-auto mb-1" />
            <div className="text-2xl font-bold">{level}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">Level</div>
          </div>
        </div>

        {/* Points Earning Guide */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-8">
          <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
            <h2 className="font-bold text-sm uppercase tracking-wider">How to Earn XP</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-gray-100">
            {Object.entries(POINTS).map(([action, pts]) => (
              <div key={action} className="bg-white p-3 flex items-center gap-2">
                <Target className="w-4 h-4 text-green-500 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-gray-800">{action.replace(/([A-Z])/g, " $1").trim()}</div>
                  <div className="text-xs text-green-600">+{pts} XP</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
            <h2 className="font-bold text-sm uppercase tracking-wider">Leaderboard</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {leaderboard && leaderboard.rows && leaderboard.rows.length > 0 ? (
              leaderboard.rows.slice(0, 15).map((entry: any, i: number) => (
                <div
                  key={i}
                  className={`px-4 py-3 flex items-center gap-3 ${entry.userId === user?._id ? "bg-green-50" : ""}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    i === 0 ? "bg-amber-100 text-amber-700" :
                    i === 1 ? "bg-gray-100 text-gray-600" :
                    i === 2 ? "bg-orange-100 text-orange-700" :
                    "bg-gray-50 text-gray-500"
                  }`}>
                    {i < 3 ? ["🥇", "🥈", "🥉"][i] : i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm">{entry.name}</div>
                    <div className="text-xs text-gray-500">
                      {entry.coursesCompleted} courses · {entry.streak} day streak
                    </div>
                  </div>
                  <div className="text-sm font-bold text-amber-600">{entry.points} XP</div>
                </div>
              ))
            ) : (
              <div className="px-4 py-8 text-center text-gray-500 text-sm">
                No rankings yet. Start earning points!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
