"use client";
import Link from "next/link";
import { useMemo } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuth } from "../hooks/use-auth";
import {
  AlertTriangle, CheckCircle2, TrendingUp, BookOpen,
  Target, ArrowRight, Lightbulb, BarChart3
} from "lucide-react";

export default function KnowledgeGaps() {
  const { user } = useAuth();
  const myProgress = useQuery(api.progress.myProgress);
  const gamificationStats = useQuery(api.gamification.myStats);
  const courses = useQuery(api.courses.list);

  // Get weak courses from progress data (those with started but not completed)
  const progressAnalysis = useMemo(() => {
    if (!myProgress || !courses) return [];
    return myProgress
      .filter((p: any) => p.status === "started" && p.lastModuleIndex !== undefined)
      .map((p: any) => {
        const course = courses.find((c) => c._id === p.courseId);
        const totalModules = course?.modules?.length ?? 6;
        const progressPct = p.lastModuleIndex !== undefined ? ((p.lastModuleIndex + 1) / totalModules) * 100 : 0;
        return {
          courseId: p.courseId,
          courseTitle: course?.title ?? "Unknown",
          lastModule: p.lastModuleIndex ?? 0,
          totalModules,
          progressPct,
          status: progressPct >= 100 ? "completed" : progressPct >= 50 ? "developing" : "needs-work" as const,
        };
      })
      .sort((a, b) => a.progressPct - b.progressPct);
  }, [myProgress, courses]);

  const weakCourses = progressAnalysis.filter((c) => c.status === "needs-work");
  const developingCourses = progressAnalysis.filter((c) => c.status === "developing");
  const completedCourses = myProgress?.filter((p: any) => p.status === "completed") ?? [];

  // Get unstarted courses
  const unstartedCourses = useMemo(() => {
    if (!myProgress || !courses) return [];
    const startedIds = new Set(myProgress.map((p: any) => p.courseId));
    return courses.filter((c) => !startedIds.has(c._id)).slice(0, 6);
  }, [myProgress, courses]);

  return (
    <div className="min-h-screen bg-[var(--color-background)] p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-foreground)] font-mono flex items-center gap-3">
            <Target className="w-8 h-8 text-green-600" />
            Knowledge Gap Detector
          </h1>
          <p className="text-[var(--color-muted-foreground)] mt-2 font-mono text-sm">
            Personalized analysis of your learning progress with suggestions for improvement
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <AlertTriangle className="w-5 h-5 text-red-500 mx-auto mb-1" />
            <p className="text-2xl font-bold font-mono text-red-700">{weakCourses.length}</p>
            <p className="text-xs font-mono text-red-600">Early Stage</p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-center">
            <TrendingUp className="w-5 h-5 text-amber-500 mx-auto mb-1" />
            <p className="text-2xl font-bold font-mono text-amber-700">{developingCourses.length}</p>
            <p className="text-xs font-mono text-amber-600">In Progress</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto mb-1" />
            <p className="text-2xl font-bold font-mono text-green-700">{completedCourses.length}</p>
            <p className="text-xs font-mono text-green-600">Completed</p>
          </div>
        </div>

        {/* Weak Areas - Courses barely started */}
        {weakCourses.length > 0 && (
          <div className="bg-[var(--color-card)] border border-red-200 rounded-xl p-6">
            <h2 className="text-lg font-bold font-mono text-red-700 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Courses Needing More Attention
            </h2>
            <div className="space-y-3">
              {weakCourses.map((item) => (
                <div key={item.courseId} className="flex items-center justify-between bg-red-50 border border-red-100 rounded-lg p-3">
                  <div className="flex-1">
                    <p className="font-mono text-sm font-bold text-[var(--color-foreground)]">{item.courseTitle}</p>
                    <p className="text-xs font-mono text-red-600">
                      Module {item.lastModule + 1}/{item.totalModules} • {item.progressPct.toFixed(0)}% complete
                    </p>
                  </div>
                  <Link href={`/courses/${item.courseId}`}
                    className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded font-mono text-xs hover:bg-red-200 transition-colors"
                  >
                    Continue <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Developing Areas - Courses more than half done */}
        {developingCourses.length > 0 && (
          <div className="bg-[var(--color-card)] border border-amber-200 rounded-xl p-6">
            <h2 className="text-lg font-bold font-mono text-amber-700 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Almost There — Finish Strong
            </h2>
            <div className="space-y-3">
              {developingCourses.map((item) => (
                <div key={item.courseId} className="flex items-center justify-between bg-amber-50 border border-amber-100 rounded-lg p-3">
                  <div className="flex-1">
                    <p className="font-mono text-sm font-bold text-[var(--color-foreground)]">{item.courseTitle}</p>
                    <p className="text-xs font-mono text-amber-600">
                      Module {item.lastModule + 1}/{item.totalModules} • {item.progressPct.toFixed(0)}% complete
                    </p>
                  </div>
                  <Link href={`/courses/${item.courseId}`}
                    className="flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-700 rounded font-mono text-xs hover:bg-amber-200 transition-colors"
                  >
                    Finish <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Gamification Stats */}
        {gamificationStats && (
          <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl p-6">
            <h2 className="text-lg font-bold font-mono text-[var(--color-foreground)] mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              Your Learning Stats
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg p-3 text-center">
                <p className="text-lg font-bold font-mono text-[var(--color-foreground)]">{gamificationStats.points}</p>
                <p className="text-[10px] font-mono text-[var(--color-muted-foreground)]">Points Earned</p>
              </div>
              <div className="bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg p-3 text-center">
                <p className="text-lg font-bold font-mono text-[var(--color-foreground)]">{gamificationStats.streakDays}d</p>
                <p className="text-[10px] font-mono text-[var(--color-muted-foreground)]">Current Streak</p>
              </div>
              <div className="bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg p-3 text-center">
                <p className="text-lg font-bold font-mono text-[var(--color-foreground)]">{gamificationStats.coursesCompleted}</p>
                <p className="text-[10px] font-mono text-[var(--color-muted-foreground)]">Courses Done</p>
              </div>
              <div className="bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg p-3 text-center">
                <p className="text-lg font-bold font-mono text-[var(--color-foreground)]">{gamificationStats.quizPasses}</p>
                <p className="text-[10px] font-mono text-[var(--color-muted-foreground)]">Quizzes Passed</p>
              </div>
            </div>
          </div>
        )}

        {/* Suggested Next Courses */}
        {unstartedCourses.length > 0 && (
          <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl p-6">
            <h2 className="text-lg font-bold font-mono text-[var(--color-foreground)] mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-500" />
              Recommended Next Courses
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {unstartedCourses.map((course) => (
                <Link
                  key={course._id}
                  to={`/courses/${course.slug}`}
                  className="flex items-center gap-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg p-3 hover:border-green-300 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                    <BookOpen className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-mono font-bold text-[var(--color-foreground)] truncate">{course.title}</p>
                    <p className="text-[10px] text-[var(--color-muted-foreground)] font-mono">{course.category}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[var(--color-muted-foreground)] shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {progressAnalysis.length === 0 && (
          <div className="text-center py-12 text-[var(--color-muted-foreground)] font-mono">
            <Target className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>Start some courses to see your knowledge analysis</p>
            <Link href="/courses" className="text-green-600 hover:underline text-sm mt-2 inline-block">
              Browse courses →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
