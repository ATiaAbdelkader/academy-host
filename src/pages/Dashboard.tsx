import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useLessons } from "@/hooks/use-lessons";
import { Clock3, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router";

const MIN_LOADING_LINES = 3;

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const lessons = useLessons();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const modules = lessons
    ? Array.from(new Map(lessons.map((l) => [l.module, l])).values())
    : [];

  const totalMinutes =
    lessons?.reduce((sum, l) => sum + l.durationMinutes, 0) ?? 0;

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* ── Top bar ─────────────────────────────────────────────── */}
      <header className="border-b border-border">
        <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2.5">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="inline-block size-3.5 bg-term-green" />
              <span className="text-sm font-semibold tracking-tight">
                may_academy
              </span>
            </Link>
            <span className="text-xs text-muted-foreground">~/student</span>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-2 text-xs"
            onClick={handleSignOut}
          >
            <LogOut className="size-3.5" />
            sign_out
          </Button>
        </div>
      </header>

      <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
        {/* ── Prompt ────────────────────────────────────────────── */}
        <p className="text-xs text-term-green">
          [ok] signed in as student
          {user?.email ? ` — ${user.email}` : user?.name ? ` — ${user.name}` : ""}
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">
          Curriculum
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          All lessons hosted by May Academy. Follow them in order.
        </p>

        {/* ── ls lessons/ ───────────────────────────────────────── */}
        <div className="mt-10 flex items-center gap-2 text-sm">
          <span className="text-term-green">$</span>
          <span>ls lessons/</span>
          <span className="inline-block h-4 w-2 bg-foreground cursor-blink" />
        </div>

        <div className="mt-4 border border-border bg-card">
          <div className="grid grid-cols-[2.5rem_1fr_auto] items-center gap-3 border-b border-border bg-muted px-4 py-2 text-[11px] uppercase tracking-wider text-muted-foreground sm:grid-cols-[2.5rem_1fr_8rem_6rem]">
            <span>idx</span>
            <span>title</span>
            <span className="hidden text-right sm:block">time</span>
            <span className="text-right">status</span>
          </div>

          {lessons === undefined && (
            <div className="space-y-0">
              {Array.from({ length: MIN_LOADING_LINES }).map((_, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[2.5rem_1fr_auto] items-center gap-3 border-b border-border px-4 py-3 last:border-b-0"
                >
                  <div className="h-3 animate-pulse bg-muted" />
                  <div className="h-3 animate-pulse bg-muted" />
                  <div className="h-3 w-14 animate-pulse bg-muted" />
                </div>
              ))}
            </div>
          )}

          {lessons && lessons.length === 0 && (
            <div className="px-4 py-10 text-center text-sm text-muted-foreground">
              <p>
                <span className="text-term-amber">[warn]</span> no lessons
                found — seeding curriculum…
              </p>
            </div>
          )}

          {lessons && lessons.length > 0 && (
            <>
              {modules.map((mod) => {
                const moduleLessons = lessons.filter(
                  (l) => l.module === mod.module,
                );
                return (
                  <div key={mod.module}>
                    <div className="flex items-center justify-between border-b border-border bg-accent/40 px-4 py-2">
                      <span className="text-xs font-semibold text-accent-foreground">
                        module/{mod.module}
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        {moduleLessons.length}{" "}
                        {moduleLessons.length === 1 ? "lesson" : "lessons"}
                      </span>
                    </div>
                    {moduleLessons.map((lesson, idx) => (
                      <Link
                        key={lesson._id}
                        to={`/lessons/${lesson.slug}`}
                        className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-3 border-b border-border px-4 py-3 transition-colors last:border-b-0 hover:bg-accent/50"
                      >
                        <span className="text-[11px] text-muted-foreground">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-medium group-hover:text-accent-foreground">
                            {lesson.title}
                          </span>
                          <span className="mt-0.5 hidden truncate text-xs text-muted-foreground sm:block">
                            {lesson.description}
                          </span>
                        </span>
                        <span className="hidden items-center gap-1.5 text-xs text-muted-foreground sm:flex sm:justify-end">
                          <Clock3 className="size-3.5" />
                          {lesson.durationMinutes} min
                        </span>
                        <span className="flex justify-end">
                          <Badge
                            variant="secondary"
                            className="gap-1.5 border-term-green/30 bg-term-green/10 text-[10px] font-medium text-term-green"
                          >
                            <span className="size-1.5 rounded-full bg-term-green-bright" />
                            READY
                          </Badge>
                        </span>
                      </Link>
                    ))}
                  </div>
                );
              })}
            </>
          )}
        </div>

        {/* ── Status line ───────────────────────────────────────── */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
          <p>
            <span className="text-term-green">[ok]</span>{" "}
            {lessons?.length ?? "…"} lessons · {modules.length} modules · ~
            {totalMinutes} min total
          </p>
          <p>
            <span className="text-term-green">[ok]</span> sync up to date
          </p>
        </div>
      </div>
    </main>
  );
}
