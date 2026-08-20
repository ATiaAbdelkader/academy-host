import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { useAuth } from "@/hooks/use-auth";
import { Flame, Clock, Zap, Target, BookOpen, Coffee, Bell, TrendingUp, AlertTriangle } from "lucide-react";

const NUDE_ICONS: Record<string, React.FC<{ className?: string }>> = {
  streak: Flame,
  course: BookOpen,
  flashcard: Target,
  quiz: Zap,
  milestone: TrendingUp,
  break: Coffee,
};

const PRIORITY_COLORS: Record<string, string> = {
  high: "bg-red-50 border-red-200 text-red-800",
  medium: "bg-amber-50 border-amber-200 text-amber-800",
  low: "bg-green-50 border-green-200 text-green-800",
};

export default function Nudges() {
  const { user } = useAuth();
  const userId = user?._id;
  const nudges = useQuery(api.nudges.myNudges);
  const summary = useQuery(api.nudges.nudgeSummary);

  return (
    <div className="min-h-screen bg-[var(--color-bg,#fafaf8)] font-mono">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-6 h-6 text-[var(--color-primary,#16a34a)]" />
          <h1 className="text-2xl font-bold tracking-tight">Learning Streaks & Nudges</h1>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <Flame className="w-6 h-6 text-orange-500 mx-auto mb-1" />
            <div className="text-2xl font-bold">{summary?.total ?? 0}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">Active Nudges</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <AlertTriangle className="w-6 h-6 text-red-500 mx-auto mb-1" />
            <div className="text-2xl font-bold">{summary?.high ?? 0}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">High Priority</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <Zap className="w-6 h-6 text-amber-500 mx-auto mb-1" />
            <div className="text-2xl font-bold">{nudges?.length ?? 0}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">Suggestions</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <Clock className="w-6 h-6 text-blue-500 mx-auto mb-1" />
            <div className="text-2xl font-bold">{new Date().toLocaleDateString("en-US", { weekday: "short" })}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">Today</div>
          </div>
        </div>

        {/* Nudges List */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
            <h2 className="font-bold text-sm uppercase tracking-wider">Personalized Nudges</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {nudges && nudges.length > 0 ? (
              nudges.map((nudge: any) => {
                const Icon = NUDE_ICONS[nudge.type] ?? Bell;
                return (
                  <div key={nudge.id} className={`px-4 py-3 flex items-start gap-3 border-l-4 ${PRIORITY_COLORS[nudge.priority] ?? "border-gray-200 bg-white"}`}>
                    <Icon className="w-5 h-5 mt-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm">{nudge.title}</div>
                      <div className="text-xs text-gray-600 mt-0.5">{nudge.message}</div>
                    </div>
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 shrink-0">
                      {nudge.type}
                    </span>
                  </div>
                );
              })
            ) : (
              <div className="px-4 py-8 text-center text-gray-500 text-sm">
                No nudges yet. Complete some lessons to get personalized suggestions!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
