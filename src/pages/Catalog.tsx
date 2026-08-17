import { api } from "@/convex/_generated/api";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCatalog } from "@/hooks/use-catalog";
import { formatMoney } from "@/lib/format";
import { useQuery } from "convex/react";
import { ChevronRight, Search, Star, UserRound } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router";

export default function Catalog() {
  const courses = useCatalog();
  const reviewSummaries = useQuery(api.reviews.summaries);
  const published = useMemo(
    () => (courses ? [...courses].filter((c) => c.published) : undefined),
    [courses],
  );

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);

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
      return (
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
      );
    });
  }, [published, query, category]);

  const totalMinutes =
    published?.reduce((sum, c) => sum + c.durationMinutes, 0) ?? 0;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <AppHeader path="~/catalog" />

      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        <p className="text-xs text-term-green">
          [ok] catalog open — public browsing
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">
          Training Catalog
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Practical, instructor-led courses for customers of our products and
          services. Open a course to read the material, see the session
          schedule, and book a seat.
        </p>

        {/* ── Controls ──────────────────────────────────────────── */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1 sm:max-w-sm">
            <Search className="absolute left-3 top-2.5 size-4 text-term-green" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="find course…"
              className="pl-9"
            />
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
              filter
            </span>
            <Button
              type="button"
              variant={category === null ? "default" : "outline"}
              size="sm"
              className="text-xs"
              onClick={() => setCategory(null)}
            >
              all
            </Button>
            {categories.map((c) => (
              <Button
                key={c}
                type="button"
                variant={category === c ? "default" : "outline"}
                size="sm"
                className="text-xs"
                onClick={() => setCategory(category === c ? null : c)}
              >
                {c.toLowerCase()}
              </Button>
            ))}
          </div>
        </div>

        {/* ── ls catalog/ ───────────────────────────────────────── */}
        <div className="mt-8 flex items-center gap-2 text-sm">
          <span className="text-term-green">$</span>
          <span>
            ls catalog/{category ? `${category.toLowerCase()}/` : ""}
            {query.trim() ? ` --match "${query.trim()}"` : " --all"}
          </span>
          <span className="inline-block h-4 w-2 bg-foreground cursor-blink" />
        </div>

        <div className="mt-4 border border-border bg-card">
          <div className="grid grid-cols-[2.5rem_1fr_auto_auto] items-center gap-3 border-b border-border bg-muted px-4 py-2 text-[11px] uppercase tracking-wider text-muted-foreground sm:grid-cols-[2.5rem_1fr_9rem_6rem_6rem]">
            <span>code</span>
            <span>title</span>
            <span className="hidden text-right sm:block">category</span>
            <span className="text-right">time</span>
            <span className="text-right">price</span>
          </div>

          {filtered === undefined && (
            <div className="space-y-0">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[2.5rem_1fr_auto_auto] items-center gap-3 border-b border-border px-4 py-3 last:border-b-0"
                >
                  <div className="h-3 animate-pulse bg-muted" />
                  <div className="h-3 animate-pulse bg-muted" />
                  <div className="h-3 w-16 animate-pulse bg-muted" />
                  <div className="h-3 w-12 animate-pulse bg-muted" />
                </div>
              ))}
            </div>
          )}

          {filtered !== undefined && filtered.length === 0 && (
            <div className="px-4 py-10 text-center text-sm text-muted-foreground">
              <p>
                <span className="text-term-amber">[warn]</span> no courses
                match — try a different search or clear the filters.
              </p>
            </div>
          )}

          {filtered !== undefined &&
            filtered.length > 0 &&
            filtered.map((course) => {
              const summary = reviewSummaries?.find(
                (s) => s.courseId === course._id,
              );
              return (
              <Link
                key={course._id}
                to={`/courses/${course.slug}`}
                className="group grid grid-cols-[2.5rem_1fr_auto_auto] items-center gap-3 border-b border-border px-4 py-3 transition-colors last:border-b-0 hover:bg-accent/50 sm:grid-cols-[2.5rem_1fr_9rem_6rem_6rem]"
              >
                <span className="text-[11px] text-term-green">
                  {String(course.order).padStart(2, "0")}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium group-hover:text-accent-foreground">
                    {course.title}
                  </span>
                  <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                    {course.description}
                  </span>
                  {course.instructor && (
                    <span className="mt-0.5 flex items-center gap-1 text-[10px] text-muted-foreground/70">
                      <UserRound className="size-2.5 text-term-green" />
                      by {course.instructor}
                    </span>
                  )}
                  {summary && (
                    <span className="mt-0.5 flex items-center gap-1 text-[11px] text-term-amber">
                      <Star className="size-3 fill-term-amber text-term-amber" />
                      {summary.avgRating.toFixed(1)} · {summary.reviewCount}{" "}
                      {summary.reviewCount === 1 ? "review" : "reviews"}
                    </span>
                  )}
                </span>
                <span className="hidden text-right text-xs text-muted-foreground sm:block">
                  {course.category}
                </span>
                <span className="text-right text-xs text-muted-foreground">
                  {course.durationMinutes}m
                </span>
                <span className="flex items-center justify-end gap-2">
                  <span
                    className={`text-sm font-semibold ${
                      course.priceCents === 0
                        ? "text-term-green"
                        : "text-foreground"
                    }`}
                  >
                    {formatMoney(course.priceCents)}
                  </span>
                  <ChevronRight className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-term-green" />
                </span>
              </Link>
              );
            })}
        </div>

        {/* ── Status line ───────────────────────────────────────── */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
          <p>
            <span className="text-term-green">[ok]</span>{" "}
            {filtered?.length ?? "…"} courses · {categories.length} tracks · ~
            {totalMinutes} min total
          </p>
          <p>
            <span className="text-term-green">[ok]</span> schedule updates live
            as sessions are booked
          </p>
        </div>
      </div>
    </main>
  );
}
