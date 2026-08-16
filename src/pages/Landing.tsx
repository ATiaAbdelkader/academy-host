import { Button } from "@/components/ui/button";
import { useLessons } from "@/hooks/use-lessons";
import { ArrowRight, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: "easeOut" as const },
};

function WindowDots() {
  return (
    <span className="flex items-center gap-1.5">
      <span className="size-2.5 rounded-full border border-border bg-muted" />
      <span className="size-2.5 rounded-full border border-border bg-muted" />
      <span className="size-2.5 rounded-full border border-border bg-muted" />
    </span>
  );
}

function Brand() {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <span className="inline-block size-3.5 bg-term-green" />
      <span className="text-sm font-semibold tracking-tight">may_academy</span>
      <span className="hidden text-xs text-muted-foreground sm:inline">
        v1.0
      </span>
    </Link>
  );
}

export default function Landing() {
  const lessons = useLessons();

  const modules = [
    { id: "01", name: "getting-started", label: "Getting Started", count: "2 lessons", duration: "18 min" },
    { id: "02", name: "core-skills", label: "Core Skills", count: "2 lessons", duration: "27 min" },
    { id: "03", name: "practice-assessment", label: "Practice & Assessment", count: "2 lessons", duration: "30 min" },
  ];

  const totalMinutes = lessons?.reduce((sum, l) => sum + l.durationMinutes, 0) ?? 75;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── Top bar ─────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-sm">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <Brand />
          <nav className="hidden items-center gap-6 text-xs text-muted-foreground md:flex">
            <a href="#curriculum" className="transition-colors hover:text-foreground">
              ./modules
            </a>
            <a href="#how" className="transition-colors hover:text-foreground">
              ./how-it-works
            </a>
            <a href="#access" className="transition-colors hover:text-foreground">
              ./access
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm" className="text-xs">
              <Link to="/auth">
                <span className="text-term-green">$</span> sign_in
              </Link>
            </Button>
            <Button asChild size="sm" className="text-xs">
              <Link to="/auth?returnTo=/dashboard">
                start learning <ArrowRight className="size-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="bg-grid-faint relative overflow-hidden border-b border-border">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:py-28">
          <motion.div {...fadeUp}>
            <p className="flex items-center gap-2 text-xs text-term-green">
              <span className="inline-block size-2 rounded-full bg-term-green-bright" />
              [ok] academy online — lessons ready for students
            </p>
            <h1 className="mt-5 text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              Training that runs
              <br />
              like a well-formed
              <br />
              <span className="text-term-green">program.</span>
            </h1>
            <p className="mt-6 max-w-md text-sm leading-6 text-muted-foreground">
              May Academy hosts structured lessons for students. No chat
              channels, no leaderboards, no noise — just a curriculum, in
              order, one lesson at a time.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="gap-2 text-sm">
                <Link to="/auth?returnTo=/dashboard">
                  start learning <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-sm">
                <a href="#curriculum">
                  <span className="text-term-green">$</span> ls modules/
                </a>
              </Button>
            </div>
            <p className="mt-6 text-xs text-muted-foreground">
              // student access — sign in with email or as a guest
            </p>
          </motion.div>

          {/* terminal mockup */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
            className="border border-border bg-card shadow-[6px_6px_0_0_color-mix(in_oklch,var(--term-green)_12%,transparent)]"
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
              <span className="text-xs text-muted-foreground">
                may_academy — student session
              </span>
              <WindowDots />
            </div>
            <div className="space-y-2.5 px-4 py-5 text-[13px] leading-5">
              <p>
                <span className="text-term-green">$</span>{" "}
                <span className="text-foreground">mayacademy init --student</span>
              </p>
              <p className="text-term-green">
                [ok] identity confirmed · welcome back
              </p>
              <p>
                <span className="text-term-green">$</span>{" "}
                <span className="text-foreground">mayacademy ls modules/</span>
              </p>
              <div className="border border-border">
                <div className="grid grid-cols-[3rem_1fr_auto_auto] gap-x-4 border-b border-border bg-muted px-3 py-1.5 text-[11px] uppercase tracking-wider text-muted-foreground">
                  <span>mod</span>
                  <span>name</span>
                  <span className="text-right">lessons</span>
                  <span className="w-14 text-right">time</span>
                </div>
                {modules.map((m) => (
                  <div
                    key={m.id}
                    className="grid grid-cols-[3rem_1fr_auto_auto] gap-x-4 border-b border-border px-3 py-1.5 last:border-b-0"
                  >
                    <span className="text-term-green">{m.id}</span>
                    <span>{m.name}</span>
                    <span className="text-right text-muted-foreground">{m.count}</span>
                    <span className="w-14 text-right text-muted-foreground">{m.duration}</span>
                  </div>
                ))}
              </div>
              <p>
                <span className="text-term-green">$</span>{" "}
                <span className="text-foreground">mayacademy status --all</span>
              </p>
              <p className="text-term-green">[ok] 3 modules · 6 lessons · ready</p>
              <p>
                <span className="text-term-green">$</span>{" "}
                <span className="inline-block h-4 w-2 translate-y-0.5 bg-foreground cursor-blink" />
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Curriculum ──────────────────────────────────────────── */}
      <section id="curriculum" className="border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs text-term-green">// curriculum</p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                Three modules. Six lessons. One order.
              </h2>
            </div>
            <p className="text-xs text-muted-foreground">
              total load ≈ {totalMinutes} min · follow top to bottom
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {modules.map((m, i) => {
              const moduleLessons = lessons?.filter((l) =>
                l.module.startsWith(m.id),
              );
              return (
                <div
                  key={m.id}
                  className="border border-border bg-card transition-colors hover:border-term-green/50"
                >
                  <div className="flex items-center justify-between border-b border-border bg-muted px-4 py-2.5">
                    <span className="text-xs font-semibold">
                      module/{m.id}
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      {m.count} · {m.duration}
                    </span>
                  </div>
                  <div className="p-2">
                    {moduleLessons?.length ? (
                      moduleLessons.map((lesson, idx) => (
                        <Link
                          key={lesson._id}
                          to="/auth?returnTo=/dashboard"
                          className="group flex items-start gap-3 px-2 py-2.5 transition-colors hover:bg-accent/60"
                        >
                          <span className="mt-0.5 text-[11px] text-muted-foreground">
                            [{String(idx + 1).padStart(2, "0")}]
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-[13px] font-medium group-hover:text-accent-foreground">
                              {lesson.title}
                            </span>
                            <span className="mt-0.5 block text-[11px] leading-4 text-muted-foreground">
                              {lesson.description}
                            </span>
                          </span>
                          <ChevronRight className="mt-1 size-3.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-term-green" />
                        </Link>
                      ))
                    ) : (
                      <div className="space-y-2 p-2">
                        <div className="h-4 animate-pulse bg-muted" />
                        <div className="h-4 animate-pulse bg-muted" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── How it works ────────────────────────────────────────── */}
      <section id="how" className="border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <p className="text-xs text-term-green">// how-it-works</p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
            Built like a terminal. Scoped like version 1.
          </h2>
          <div className="mt-10 border border-border">
            {[
              {
                id: "01",
                title: "Structured lessons",
                body: "Every lesson is a sequence of blocks — prose, code, lists, notes — rendered like a well-formatted man page.",
              },
              {
                id: "02",
                title: "Student access",
                body: "Students sign in and follow the curriculum in order. Nothing to configure, nothing to break.",
              },
              {
                id: "03",
                title: "Status you can read",
                body: "Green means ready, amber means pay attention. One glance tells you where you are.",
              },
              {
                id: "04",
                title: "No distractions",
                body: "No chat, no progress walls, no notifications. The lesson is the product.",
              },
            ].map((row, i) => (
              <div
                key={row.id}
                className={`grid gap-2 px-4 py-4 sm:grid-cols-[3.5rem_10rem_1fr] sm:gap-6 sm:px-6 ${
                  i !== 0 ? "border-t border-border" : ""
                } ${i % 2 === 1 ? "bg-card" : ""}`}
              >
                <span className="text-xs text-term-green">{row.id}</span>
                <span className="text-sm font-semibold">{row.title}</span>
                <span className="text-sm leading-6 text-muted-foreground">
                  {row.body}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Access CTA ──────────────────────────────────────────── */}
      <section id="access" className="border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <div className="border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
              <span className="text-xs text-muted-foreground">
                may_academy — enroll
              </span>
              <WindowDots />
            </div>
            <div className="flex flex-col items-start gap-6 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <div>
                <p className="text-sm">
                  <span className="text-term-green">$</span>{" "}
                  <span className="font-semibold">mayacademy enroll --now</span>
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  // email verification or instant guest access — students only
                </p>
              </div>
              <div className="flex w-full flex-wrap gap-3 sm:w-auto">
                <Button asChild className="gap-2 text-sm">
                  <Link to="/auth?returnTo=/dashboard">
                    open lessons <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="text-sm">
                  <Link to="/auth">sign in</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-10 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          <span className="text-term-green">may_academy</span> © 2026 — v1.0
        </p>
        <p>// lessons for students. nothing else.</p>
      </footer>
    </div>
  );
}
