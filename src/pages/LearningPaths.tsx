import { api } from "@/convex/_generated/api";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { useQuery } from "convex/react";
import { formatMoney } from "@/lib/format";
import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock,
  GraduationCap,
  Route,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

export default function LearningPaths() {
  const paths = useQuery(api.learningPaths.list);
  const myProgress = useQuery(api.learningPaths.myProgress);
  const recommended = useQuery(api.learningPaths.recommended);
  const [selectedPath, setSelectedPath] = useState<string | null>(null);

  const getProgress = (pathId: string) =>
    myProgress?.find((p) => p.pathId === pathId);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <AppHeader path="~/learning-paths" />

      <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
        <div className="flex items-center gap-2 text-xs text-term-green">
          <Route className="size-4" />
          <span>curated course sequences</span>
        </div>

        <h1 className="mt-3 text-3xl font-bold tracking-tight">
          Learning Paths
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Follow a guided sequence of courses designed to build your skills
          progressively. Each path takes you from fundamentals to mastery.
        </p>

        {/* ── Recommended Path ────────────────────────────────── */}
        {recommended && (
          <div className="mt-6 border border-term-green/30 bg-term-green/[0.03] p-4">
            <div className="flex items-start gap-3">
              <Sparkles className="mt-0.5 size-5 shrink-0 text-term-green" />
              <div className="flex-1">
                <p className="text-[11px] uppercase tracking-wider text-term-green">
                  recommended next
                </p>
                <p className="mt-1 font-semibold">{recommended.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {recommended.description}
                </p>
                <Button
                  asChild
                  size="sm"
                  className="mt-3 gap-1.5 text-xs"
                >
                  <Link to={`/learning-paths/${recommended.id}`}>
                    start path
                    <ChevronRight className="size-3.5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* ── Progress Overview ────────────────────────────────── */}
        {myProgress && myProgress.some((p) => p.percent > 0) && (
          <div className="mt-6">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-term-green">$</span>
              <span>cat my-progress.log</span>
            </div>
            <div className="mt-3 border border-border bg-card">
              {myProgress
                .filter((p) => p.percent > 0)
                .sort((a, b) => b.percent - a.percent)
                .map((progress) => (
                  <div
                    key={progress.pathId}
                    className="flex items-center justify-between gap-4 border-b border-border px-4 py-3 last:border-b-0"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{progress.icon}</span>
                      <div>
                        <p className="text-sm font-medium">{progress.title}</p>
                        <p className="text-[10px] text-muted-foreground">
                          {progress.completedCourses}/{progress.totalCourses}{" "}
                          courses completed
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-24">
                        <div className="h-2 bg-muted">
                          <div
                            className="h-full bg-term-green transition-all"
                            style={{ width: `${progress.percent}%` }}
                          />
                        </div>
                      </div>
                      <span className="w-10 text-right font-mono text-xs text-term-green">
                        {progress.percent}%
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* ── All Paths ──────────────────────────────────────── */}
        <div className="mt-8 flex items-center gap-2 text-sm">
          <span className="text-term-green">$</span>
          <span>ls paths/</span>
          <span className="inline-block h-4 w-2 bg-foreground cursor-blink" />
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {paths === undefined &&
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-48 animate-pulse bg-muted" />
            ))}

          {paths?.map((path) => {
            const progress = getProgress(path.id);
            const isExpanded = selectedPath === path.id;
            const completedPercent = progress?.percent ?? 0;

            return (
              <div
                key={path.id}
                className={`border bg-card transition-colors ${
                  isExpanded ? "border-term-green/50" : "border-border hover:border-term-green/30"
                }`}
              >
                <div
                  className="flex cursor-pointer items-start justify-between gap-3 p-4"
                  onClick={() =>
                    setSelectedPath(isExpanded ? null : path.id)
                  }
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{path.icon}</span>
                    <div>
                      <p className="font-semibold">{path.title}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {path.description}
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-3 text-[10px] text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <BookOpen className="size-3" />
                          {path.availableCourses}/{path.totalCourses} courses
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="size-3" />
                          ~{path.estimatedWeeks} weeks
                        </span>
                        <span
                          className={`border px-1.5 py-0.5 ${
                            path.difficulty === "beginner"
                              ? "border-term-green/40 bg-term-green/10 text-term-green"
                              : path.difficulty === "intermediate"
                                ? "border-term-amber/40 bg-term-amber/10 text-term-amber"
                                : "border-border bg-muted text-muted-foreground"
                          }`}
                        >
                          {path.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>
                  {completedPercent > 0 && (
                    <span className="shrink-0 font-mono text-xs text-term-green">
                      {completedPercent}%
                    </span>
                  )}
                </div>

                {/* Progress bar */}
                {completedPercent > 0 && (
                  <div className="h-1 bg-muted">
                    <div
                      className="h-full bg-term-green transition-all"
                      style={{ width: `${completedPercent}%` }}
                    />
                  </div>
                )}

                {/* Expanded course list */}
                {isExpanded && (
                  <div className="border-t border-border">
                    {path.courses.filter((c): c is NonNullable<typeof c> => c !== null).map((course, i) => (
                        <Link
                          key={course._id}
                          to={`/courses/${course.slug}`}
                          className="flex items-center justify-between gap-3 border-b border-border px-4 py-3 last:border-b-0 hover:bg-accent/30"
                        >
                          <div className="flex items-center gap-3">
                            <span className="flex size-6 shrink-0 items-center justify-center border border-border text-[10px] font-mono text-muted-foreground">
                              {i + 1}
                            </span>
                            <div>
                              <p className="text-sm font-medium">
                                {course.title}
                              </p>
                              <p className="text-[10px] text-muted-foreground">
                                {course.category} · {course.durationMinutes}m
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">
                              {formatMoney(course.priceCents)}
                            </span>
                            <ChevronRight className="size-3.5 text-muted-foreground" />
                          </div>
                        </Link>
                      ))}
                    <div className="flex items-center justify-between gap-3 px-4 py-3">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <GraduationCap className="size-3.5 text-term-green" />
                        Complete all {path.totalCourses} courses to earn a
                        Learning Path badge
                      </div>
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="text-xs"
                      >
                        <Link
                          to={`/courses/${path.courses[0]?.slug}`}
                        >
                          <TrendingUp className="size-3.5" />
                          start first course
                        </Link>
                      </Button>
                    </div>
                  </div>
                )}

                {/* Quick action */}
                {!isExpanded && completedPercent === 0 && (
                  <div className="border-t border-border px-4 py-2.5">
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start gap-1.5 text-[11px] text-muted-foreground hover:text-foreground"
                    >
                      <Link to={`/courses/${path.courses[0]?.slug}`}>
                        start path →
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
