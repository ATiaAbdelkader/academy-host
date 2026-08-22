"use client";
import Link from "next/link";
import { useMemo } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuth } from "../hooks/use-auth";
import {
  Trophy, Star, Flame, BookOpen, Award,
  TrendingUp, Target, ExternalLink, Zap
} from "lucide-react";

export default function ShowcaseWall() {
  const { user } = useAuth();
  const myProgress = useQuery(api.progress.myProgress);
  const gamStats = useQuery(api.gamification.myStats);
  const myMicroCreds = useQuery(api.microCredentials.myCredentials, user?._id ? { userId: user._id } : "skip");
  const courses = useQuery(api.courses.list);

  const completedCourses = useMemo(() => {
    if (!myProgress || !courses) return [];
    return myProgress
      .filter((p: any) => p.status === "completed")
      .map((p: any) => {
        const course = courses.find((c) => c._id === p.courseId);
        return course ? { ...course, completedAt: p.updatedAt } : null;
      })
      .filter(Boolean);
  }, [myProgress, courses]);

  return (
    <div className="min-h-screen bg-[var(--color-background)] p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-foreground)] font-mono flex items-center gap-3">
            <Trophy className="w-8 h-8 text-amber-500" />
            Achievement Showcase
          </h1>
          <p className="text-[var(--color-muted-foreground)] mt-2 font-mono text-sm">
            Your complete learning profile — badges, certificates, skills, and stats
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: BookOpen, label: "Courses Done", value: completedCourses.length, color: "text-green-600" },
            { icon: Star, label: "Points", value: gamStats?.points ?? 0, color: "text-amber-600" },
            { icon: Flame, label: "Best Streak", value: `${gamStats?.bestStreak ?? 0}d`, color: "text-orange-600" },
            { icon: Zap, label: "Quiz Passes", value: gamStats?.quizPasses ?? 0, color: "text-blue-600" },
          ].map((stat) => (
            <div key={stat.label} className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg p-4 text-center">
              <stat.icon className={`w-5 h-5 ${stat.color} mx-auto mb-1`} />
              <p className="text-2xl font-bold font-mono text-[var(--color-foreground)]">{stat.value}</p>
              <p className="text-xs text-[var(--color-muted-foreground)] font-mono">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Badges from Gamification Stats */}
        {gamStats?.badges && gamStats.badges.length > 0 && (
          <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl p-6">
            <h2 className="text-lg font-bold font-mono text-[var(--color-foreground)] mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              Achievement Badges ({gamStats.badges.length})
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {gamStats.badges.map((badge: string, i: number) => (
                <div key={i} className="bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg p-3 text-center">
                  <div className="text-2xl mb-1">🏅</div>
                  <p className="text-xs font-mono font-bold text-[var(--color-foreground)]">{badge}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Micro-Credentials */}
        {myMicroCreds && myMicroCreds.length > 0 && (
          <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl p-6">
            <h2 className="text-lg font-bold font-mono text-[var(--color-foreground)] mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-green-600" />
              Micro-Credentials ({myMicroCreds.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {myMicroCreds.map((cred: any, i: number) => (
                <div key={i} className="flex items-center gap-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg p-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold font-mono text-sm">
                    {cred.credential?.icon ?? "C"}
                  </div>
                  <div>
                    <p className="text-sm font-mono font-bold text-[var(--color-foreground)]">{cred.credential?.name ?? "Credential"}</p>
                    <p className="text-[10px] text-[var(--color-muted-foreground)] font-mono">+100 bonus points</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Completed Courses */}
        {completedCourses.length > 0 && (
          <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl p-6">
            <h2 className="text-lg font-bold font-mono text-[var(--color-foreground)] mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-green-600" />
              Completed Courses ({completedCourses.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {completedCourses.map((course: any) => course && (
                <Link
                  key={course._id}
                  to={`/courses/${course.slug}`}
                  className="flex items-center gap-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg p-3 hover:border-green-300 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-mono font-bold text-[var(--color-foreground)] truncate">{course.title}</p>
                    <p className="text-[10px] text-[var(--color-muted-foreground)] font-mono">
                      {course.category} • {new Date(course.completedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[var(--color-muted-foreground)] shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {completedCourses.length === 0 && (!gamStats?.badges || gamStats.badges.length === 0) && (
          <div className="text-center py-12 text-[var(--color-muted-foreground)] font-mono">
            <Trophy className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>Start learning to build your showcase!</p>
            <Link href="/courses" className="text-green-600 hover:underline text-sm mt-2 inline-block">
              Browse courses →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
