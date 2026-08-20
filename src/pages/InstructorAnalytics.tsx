import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { BarChart3, Users, BookOpen, TrendingUp, Award, Eye, Clock, CheckCircle2 } from "lucide-react";

export default function InstructorAnalytics() {
  const courses = useQuery(api.courses.list);
  const quizInsights = useQuery(api.insights.myQuizInsights);
  const leaderboard = useQuery(api.gamification.leaderboard);

  const totalCourses = courses?.length ?? 0;
  const publishedCourses = courses?.filter((c: any) => c.published).length ?? 0;
  const totalModules = courses?.reduce((sum: number, c: any) => sum + (c.modules?.length ?? 0), 0) ?? 0;

  // Aggregate quiz data from all courses
  const categories = courses
    ? Array.from(new Set(courses.map((c: any) => c.category))).sort()
    : [];

  const categoryStats = categories.map((cat) => {
    const catCourses = courses?.filter((c: any) => c.category === cat) ?? [];
    const moduleCount = catCourses.reduce((sum: number, c: any) => sum + (c.modules?.length ?? 0), 0);
    return { category: cat, courseCount: catCourses.length, moduleCount };
  });

  return (
    <div className="min-h-screen bg-[var(--color-bg,#fafaf8)] font-mono">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <BarChart3 className="w-6 h-6 text-[var(--color-primary,#16a34a)]" />
          <h1 className="text-2xl font-bold tracking-tight">Instructor Analytics</h1>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <BookOpen className="w-5 h-5 text-green-500 mx-auto mb-1" />
            <div className="text-2xl font-bold">{publishedCourses}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">Published Courses</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <Eye className="w-5 h-5 text-blue-500 mx-auto mb-1" />
            <div className="text-2xl font-bold">{totalModules}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">Total Modules</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <Users className="w-5 h-5 text-purple-500 mx-auto mb-1" />
            <div className="text-2xl font-bold">{leaderboard?.rows?.length ?? 0}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">Active Learners</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <TrendingUp className="w-5 h-5 text-amber-500 mx-auto mb-1" />
            <div className="text-2xl font-bold">{categories.length}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">Categories</div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-8">
          <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
            <h2 className="font-bold text-sm uppercase tracking-wider">Category Breakdown</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {categoryStats.map((cat) => (
              <div key={cat.category} className="px-4 py-3 flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm">{cat.category}</div>
                  <div className="text-xs text-gray-500">{cat.courseCount} courses · {cat.moduleCount} modules</div>
                </div>
                <div className="w-32 bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${Math.min(100, (cat.moduleCount / Math.max(totalModules, 1)) * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quiz Performance Insights */}
        {quizInsights && quizInsights.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-8">
            <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
              <h2 className="font-bold text-sm uppercase tracking-wider">Quiz Performance Insights</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {quizInsights.map((insight: any, i: number) => (
                <div key={i} className="px-4 py-3 flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm">{insight.courseTitle ?? "Course"}</div>
                    <div className="text-xs text-gray-500">
                      {insight.passRate != null ? `${Math.round(insight.passRate)}% pass rate` : "No attempts yet"}
                    </div>
                  </div>
                  <div className="text-sm font-bold text-green-600">
                    {insight.averageScore != null ? `${insight.averageScore}%` : "—"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Top Learners */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
            <h2 className="font-bold text-sm uppercase tracking-wider">Top Learners Leaderboard</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {leaderboard && leaderboard.rows && leaderboard.rows.length > 0 ? (
              leaderboard.rows.slice(0, 10).map((entry: any, i: number) => (
                <div key={i} className="px-4 py-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-sm font-bold text-green-700">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm">{entry.name}</div>
                    <div className="text-xs text-gray-500">
                      {entry.coursesCompleted} courses · {entry.quizzesPassed} quizzes · {entry.streak} day streak
                    </div>
                  </div>
                  <div className="text-sm font-bold text-amber-600">{entry.points} pts</div>
                </div>
              ))
            ) : (
              <div className="px-4 py-8 text-center text-gray-500 text-sm">
                No learner data yet
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
