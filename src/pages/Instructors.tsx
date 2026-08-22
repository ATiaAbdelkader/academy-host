"use client";
import Link from "next/link";
import { api } from "@/convex/_generated/api";
import { AppHeader } from "@/components/AppHeader";
import { Badge } from "@/components/ui/badge";
import { formatMoney } from "@/lib/format";
import { useQuery_experimental } from "convex/react";
import { BookOpen, Clock3, GraduationCap, TriangleAlert, UserRound } from "lucide-react";

export default function Instructors() {
  // Non-throwing variant: a failed query renders an error state instead of
  // taking the whole app down through the error boundary.
  const query = useQuery_experimental({
    query: api.courses.instructors,
    args: {},
    throwOnError: false,
  });
  const instructors =
    query.status === "success" ? query.data : undefined;
  const queryError =
    query.status === "error" ? (query.error as Error).message : null;

  const totalCourses =
    instructors?.reduce((sum, i) => sum + i.courseCount, 0) ?? 0;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <AppHeader path="~/instructors" />

      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        <p className="text-xs text-term-green">
          [ok] instructor directory — public
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">Instructors</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          The people behind the material. Every course lists the instructor who
          wrote and teaches it — and every instructor's courses live under one
          profile here.
        </p>

        {/* ── ls instructors/ ───────────────────────────────────── */}
        <div className="mt-8 flex items-center gap-2 text-sm">
          <span className="text-term-green">$</span>
          <span>ls instructors/ --all</span>
          <span className="inline-block h-4 w-2 bg-foreground cursor-blink" />
        </div>

        {queryError && (
          <div className="mt-4 border border-term-amber/40 bg-term-amber/[0.07] px-4 py-8 text-center text-sm">
            <TriangleAlert className="mx-auto size-5 text-term-amber" />
            <p className="mt-2">
              <span className="text-term-amber">[warn]</span> could not load
              the instructor directory.
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{queryError}</p>
          </div>
        )}

        {instructors === undefined && !queryError && (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="border border-border bg-card p-5">
                <div className="h-4 w-2/3 animate-pulse bg-muted" />
                <div className="mt-2 h-3 w-1/2 animate-pulse bg-muted" />
                <div className="mt-4 h-3 animate-pulse bg-muted" />
                <div className="mt-1.5 h-3 animate-pulse bg-muted" />
              </div>
            ))}
          </div>
        )}

        {instructors !== undefined && instructors.length === 0 && (
          <div className="mt-4 border border-border bg-card px-4 py-10 text-center text-sm text-muted-foreground">
            <p>
              <span className="text-term-amber">[warn]</span> no instructors in
              the published catalog yet.
            </p>
          </div>
        )}

        {instructors !== undefined && instructors.length > 0 && (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {instructors.map((instructor) => (
              <section
                key={instructor.name}
                className="flex flex-col border border-border bg-card shadow-[4px_4px_0_0_color-mix(in_oklch,var(--term-green)_8%,transparent)]"
              >
                <header className="flex items-start justify-between gap-3 border-b border-border bg-muted/40 px-4 py-3">
                  <div className="min-w-0">
                    <h2 className="flex items-center gap-2 text-sm font-semibold">
                      <UserRound className="size-4 shrink-0 text-term-green" />
                      <span className="truncate">{instructor.name}</span>
                    </h2>
                    {instructor.title && (
                      <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
                        {instructor.title}
                      </p>
                    )}
                  </div>
                  <span className="shrink-0 border border-term-green/30 bg-term-green/10 px-1.5 py-0.5 text-[10px] font-medium text-term-green">
                    {instructor.courseCount}{" "}
                    {instructor.courseCount === 1 ? "course" : "courses"}
                  </span>
                </header>

                <div className="flex-1 space-y-2.5 px-4 py-3">
                  {instructor.courses.map((course) => (
                    <Link
                      key={course.courseId}
                      to={`/courses/${course.slug}`}
                      className="group block border border-border px-3 py-2 transition-colors hover:border-term-green/50 hover:bg-accent/40"
                    >
                      <span className="flex items-baseline gap-2">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-term-green">
                          {course.category}
                        </span>
                      </span>
                      <span className="mt-0.5 block truncate text-xs font-medium group-hover:text-accent-foreground">
                        {course.title}
                      </span>
                      <span className="mt-1 flex items-center gap-2.5 text-[10px] text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <Clock3 className="size-2.5" />
                          {course.durationMinutes}m
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <BookOpen className="size-2.5" />
                          {course.priceCents === 0 ? "free" : formatMoney(course.priceCents)}
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>

                <footer className="flex flex-wrap items-center gap-1.5 border-t border-border px-4 py-2.5">
                  {instructor.categories.map((category) => (
                    <Badge
                      key={category}
                      variant="secondary"
                      className="text-[9px] font-medium text-muted-foreground"
                    >
                      {category}
                    </Badge>
                  ))}
                </footer>
              </section>
            ))}
          </div>
        )}

        {/* ── Status line ───────────────────────────────────────── */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
          <p>
            <span className="text-term-green">[ok]</span>{" "}
            {instructors?.length ?? "…"} instructors · {totalCourses} courses
            across the published catalog
          </p>
          <p className="inline-flex items-center gap-1.5">
            <GraduationCap className="size-3.5 text-term-green" />
            profiles update automatically as the catalog changes
          </p>
        </div>
      </div>
    </main>
  );
}
