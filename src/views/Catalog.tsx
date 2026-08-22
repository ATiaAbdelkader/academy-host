"use client";
import Link from "next/link";
import { api } from "@/convex/_generated/api";
import { AiAssistant, AssistantToggle } from "@/components/AiAssistant";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCatalog } from "@/hooks/use-catalog";
import { formatMoney } from "@/lib/format";
import { listOfflineCourses, type OfflineCourse } from "@/lib/offline";
import { useQuery } from "@/lib/convex-react-safe";
import {
  ChevronRight,
  Download,
  Leaf,
  Search,
  Sprout,
  Star,
  UserRound,
  Clock,
  BookOpen,
  Sparkles,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export default function Catalog() {
  const courses = useCatalog();
  const reviewSummaries = useQuery(api.reviews.summaries);
  const published = useMemo(
    () => (courses ? [...courses].filter((c) => c.published) : undefined),
    [courses],
  );

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [offlineCourses, setOfflineCourses] = useState<OfflineCourse[]>([]);

  useEffect(() => {
    setOfflineCourses(listOfflineCourses());
  }, []);

  const categories = useMemo(
    () =>
      Array.from(
        new Map((published ?? []).map((c) => [c.category, c.category])).values(),
      ),
    [published],
  );

  const filtered = useMemo(() => {
    if (!published) return undefined;
    const q = query.trim().toLowerCase();
    return published.filter((c) => {
      if (category && c.category !== category) return false;
      if (!q) return true;
      const topics = (c.modules ?? [])
        .flatMap((m) => [
          m.title,
          ...m.content
            .filter((b) => b.type === "quiz")
            .map((b) => (b.type === "quiz" ? b.title : "")),
        ])
        .filter(Boolean)
        .join(" ");
      return (
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        (c.instructor ?? "").toLowerCase().includes(q) ||
        topics.toLowerCase().includes(q)
      );
    });
  }, [published, query, category]);

  const totalMinutes =
    published?.reduce((sum, c) => sum + c.durationMinutes, 0) ?? 0;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <AppHeader path="~/catalog" />

      {/* ── Hero Section ──────────────────────────────────── */}
      <section className="relative overflow-hidden bg-hero-gradient noise-bg">
        <div className="pointer-events-none absolute -top-40 -right-40 size-96 rounded-full bg-agri-green/6 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-32 size-80 rounded-full bg-agri-amber/6 blur-3xl" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 py-20 sm:px-8">
          <div className="mx-auto max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-agri-green/20 bg-agri-green/8 px-4 py-1.5 text-sm font-medium text-agri-green">
              <Sprout className="size-3.5" />
              Course Catalog
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Find the right course for your{" "}
              <span className="text-gradient-green">farming goals.</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
              Practical, instructor-led courses for agriculture professionals.
              Open a course to read the material, see the session schedule, and
              book a seat.
            </p>
          </div>

          {/* ── Stats Row ─────────────────────────────────── */}
          <div className="mt-10 grid grid-cols-3 gap-4">
            <div className="glass-card rounded-2xl px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-agri-green/10">
                  <BookOpen className="size-5 text-agri-green" />
                </div>
                <div>
                  <p className="text-xl font-bold">
                    {published?.length ?? "…"}
                  </p>
                  <p className="text-sm text-muted-foreground">Courses</p>
                </div>
              </div>
            </div>
            <div className="glass-card rounded-2xl px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-agri-leaf/10">
                  <Leaf className="size-5 text-agri-leaf" />
                </div>
                <div>
                  <p className="text-xl font-bold">{categories.length}</p>
                  <p className="text-sm text-muted-foreground">Tracks</p>
                </div>
              </div>
            </div>
            <div className="glass-card rounded-2xl px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-agri-amber/15">
                  <Clock className="size-5 text-agri-amber" />
                </div>
                <div>
                  <p className="text-xl font-bold">~{Math.floor(totalMinutes / 60)}h</p>
                  <p className="text-sm text-muted-foreground">Content</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── AI Assistant ──────────────────────────────────── */}
      <div className="mx-auto w-full max-w-6xl px-5 pt-8 sm:px-8">
        <div className="flex items-center gap-3">
          <AssistantToggle
            open={assistantOpen}
            onToggle={() => setAssistantOpen((open) => !open)}
          />
          <span className="text-sm text-muted-foreground">
            Ask the AI assistant which course fits your goal
          </span>
        </div>
        {assistantOpen && (
          <div className="mt-4 max-w-xl">
            <AiAssistant />
          </div>
        )}
      </div>

      {/* ── Offline Courses ───────────────────────────────── */}
      {offlineCourses.length > 0 && (
        <div className="mx-auto w-full max-w-6xl px-5 pt-6 sm:px-8">
          <div className="flex flex-wrap items-center gap-2 rounded-2xl glass-card px-5 py-3.5">
            <span className="flex items-center gap-1.5 rounded-full bg-agri-green/10 px-3 py-1 text-xs font-medium text-agri-green">
              <Download className="size-3.5" />
              Available offline ({offlineCourses.length})
            </span>
            {offlineCourses.map((entry) => (
              <Link
                key={entry.slug}
                href={`/courses/${entry.slug}`}
                className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {String((entry.course as { title?: string }).title ?? entry.slug)}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ── Search & Filters ──────────────────────────────── */}
      <section className="py-20">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            {/* Search */}
            <div className="relative flex-1 sm:max-w-sm">
              <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search courses or topics…"
                className="h-11 rounded-xl border-border/40 pl-10 text-sm bg-card/50 backdrop-blur-sm focus-visible:border-agri-green/40 transition-colors"
              />
            </div>

            {/* Category filter pills */}
            <div className="flex flex-wrap items-center gap-2">
              <Button
                type="button"
                variant={category === null ? "default" : "outline"}
                size="sm"
                className={`rounded-full text-sm font-medium ${category === null ? "shadow-md" : "rounded-full"}`}
                onClick={() => setCategory(null)}
              >
                All
              </Button>
              {categories.map((c) => (
                <Button
                  key={c}
                  type="button"
                  variant={category === c ? "default" : "outline"}
                  size="sm"
                  className={`rounded-full text-sm font-medium ${category === c ? "shadow-md" : "rounded-full"}`}
                  onClick={() => setCategory(category === c ? null : c)}
                >
                  {c.toLowerCase()}
                </Button>
              ))}
            </div>
          </div>

          {/* ── Course Grid ──────────────────────────────────── */}
          <div className="mt-10">
            {/* Loading skeleton */}
            {filtered === undefined && (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-border/40 bg-card p-6"
                  >
                    <div className="mb-3 h-5 w-3/4 shimmer rounded-lg" />
                    <div className="mb-4 h-4 w-full shimmer rounded" />
                    <div className="mb-4 h-4 w-2/3 shimmer rounded" />
                    <div className="flex items-center justify-between">
                      <div className="h-4 w-16 shimmer rounded" />
                      <div className="h-4 w-12 shimmer rounded" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty state */}
            {filtered !== undefined && filtered.length === 0 && (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-border/40 bg-card px-6 py-20 text-center">
                <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-agri-amber/10">
                  <Search className="size-6 text-agri-amber" />
                </div>
                <h3 className="text-lg font-semibold">No courses found</h3>
                <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                  No courses match your current search or filter. Try adjusting
                  your keywords or clearing the filters — search also covers
                  module topics and instructors.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-6 rounded-xl"
                  onClick={() => {
                    setQuery("");
                    setCategory(null);
                  }}
                >
                  Clear all filters
                </Button>
              </div>
            )}

            {/* Course cards */}
            {filtered !== undefined && filtered.length > 0 && (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((course) => {
                  const summary = reviewSummaries?.find(
                    (s) => s.courseId === course._id,
                  );
                  return (
                    <Link
                      key={course._id}
                      href={`/courses/${course.slug}`}
                      className="card-hover group relative rounded-2xl border border-border/40 bg-card p-6 overflow-hidden"
                    >
                      {/* Subtle corner glow */}
                      <div className="pointer-events-none absolute -top-8 -right-8 size-24 rounded-full bg-agri-green/5 blur-2xl transition-all group-hover:bg-agri-green/10" />

                      {/* Category badge + order number */}
                      <div className="relative mb-3 flex items-center justify-between">
                        <span className="rounded-full bg-agri-green/10 px-3 py-1 text-xs font-medium text-agri-green">
                          {course.category}
                        </span>
                        <span className="flex size-7 items-center justify-center rounded-lg bg-muted text-xs font-bold text-muted-foreground">
                          {String(course.order).padStart(2, "0")}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="relative text-[15px] font-semibold tracking-tight group-hover:text-agri-green transition-colors">
                        {course.title}
                      </h3>

                      {/* Description */}
                      <p className="relative mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                        {course.description}
                      </p>

                      {/* Instructor + Rating */}
                      <div className="relative mt-3 flex items-center gap-3">
                        {course.instructor && (
                          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                            <UserRound className="size-3.5 text-agri-green" />
                            {course.instructor}
                          </span>
                        )}
                        {summary && (
                          <span className="flex items-center gap-1 text-sm font-medium text-agri-amber">
                            <Star className="size-3.5 fill-agri-amber text-agri-amber" />
                            {summary.avgRating.toFixed(1)}
                            <span className="font-normal text-muted-foreground">
                              ({summary.reviewCount})
                            </span>
                          </span>
                        )}
                      </div>

                      {/* Footer: duration + price + arrow */}
                      <div className="relative mt-5 flex items-center justify-between border-t border-border/40 pt-4">
                        <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <Clock className="size-3.5" />
                          {course.durationMinutes} min
                        </span>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-sm font-semibold ${
                              course.priceCents === 0
                                ? "text-agri-green"
                                : "text-foreground"
                            }`}
                          >
                            {formatMoney(course.priceCents)}
                          </span>
                          <ChevronRight className="size-4 text-muted-foreground/60 transition-transform group-hover:translate-x-1 group-hover:text-agri-green" />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* ── Footer info ──────────────────────────────────── */}
          {filtered !== undefined && filtered.length > 0 && (
            <div className="mt-10 flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
              <p>
                Showing {filtered.length} of {published?.length ?? 0} courses
                &middot; {categories.length} tracks &middot; ~{totalMinutes} min total content
              </p>
              <p className="flex items-center gap-1.5">
                <Sparkles className="size-3.5 text-agri-amber" />
                Schedule updates live as sessions are booked
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
