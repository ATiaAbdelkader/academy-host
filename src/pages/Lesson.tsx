import { api } from "@/convex/_generated/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLessons } from "@/hooks/use-lessons";
import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "convex/react";
import { ArrowLeft, ArrowRight, Clock3, LogOut } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";
import type { LessonBlock } from "@/convex/schema";

function WindowDots() {
  return (
    <span className="flex items-center gap-1.5">
      <span className="size-2.5 rounded-full border border-border bg-muted" />
      <span className="size-2.5 rounded-full border border-border bg-muted" />
      <span className="size-2.5 rounded-full border border-border bg-muted" />
    </span>
  );
}

function CodeBlock({ block }: { block: Extract<LessonBlock, { type: "code" }> }) {
  const lines = block.text.split("\n");
  return (
    <pre className="overflow-x-auto border border-border border-l-2 border-l-term-green bg-card px-4 py-3 text-[13px] leading-6">
      {lines.map((line, i) => (
        <span key={i} className="block whitespace-pre">
          {i === 0 && block.prompt ? (
            <>
              <span className="text-term-green">$ </span>
              <span className="text-foreground">{line}</span>
            </>
          ) : (
            <span className="text-foreground/80">{line}</span>
          )}
        </span>
      ))}
    </pre>
  );
}

function NoteBlock({ block }: { block: Extract<LessonBlock, { type: "note" }> }) {
  const warn = block.tone === "warn";
  return (
    <div
      className={`border px-4 py-3 ${
        warn
          ? "border-term-amber/40 border-l-2 border-l-term-amber bg-term-amber/[0.07]"
          : "border-term-green/40 border-l-2 border-l-term-green bg-term-green/[0.07]"
      }`}
    >
      <p
        className={`text-[11px] font-semibold uppercase tracking-wider ${
          warn ? "text-term-amber" : "text-term-green"
        }`}
      >
        {warn ? "> warn" : "> info"}
      </p>
      <p className="mt-1 text-sm leading-6 text-foreground/85">{block.text}</p>
    </div>
  );
}

function BlockView({ block }: { block: LessonBlock }) {
  switch (block.type) {
    case "heading":
      return (
        <h2 className="mt-8 flex items-baseline gap-2 text-xl font-bold tracking-tight first:mt-0">
          <span className="text-term-green">##</span>
          <span>{block.text}</span>
        </h2>
      );
    case "paragraph":
      return (
        <p className="text-sm leading-7 text-foreground/85">{block.text}</p>
      );
    case "code":
      return <CodeBlock block={block} />;
    case "list":
      return (
        <ul className="space-y-2">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm leading-6">
              <span className="mt-0.5 shrink-0 text-[11px] text-term-green">
                [{String(i + 1).padStart(2, "0")}]
              </span>
              <span className="text-foreground/85">{item}</span>
            </li>
          ))}
        </ul>
      );
    case "note":
      return <NoteBlock block={block} />;
    default:
      return null;
  }
}

export default function Lesson() {
  const { slug } = useParams<{ slug: string }>();
  const { user, signOut } = useAuth();
  const lessons = useLessons();
  const lesson = useQuery(api.lessons.getBySlug, { slug: slug ?? "" });
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const sorted = lessons ? [...lessons].sort((a, b) => a.order - b.order) : [];
  const currentIndex = lesson ? sorted.findIndex((l) => l._id === lesson._id) : -1;
  const prev = currentIndex > 0 ? sorted[currentIndex - 1] : null;
  const next =
    currentIndex >= 0 && currentIndex < sorted.length - 1
      ? sorted[currentIndex + 1]
      : null;

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* ── Top bar ─────────────────────────────────────────────── */}
      <header className="border-b border-border">
        <div className="mx-auto flex h-14 w-full max-w-4xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2.5">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="inline-block size-3.5 bg-term-green" />
              <span className="text-sm font-semibold tracking-tight">
                may_academy
              </span>
            </Link>
            <span className="text-xs text-muted-foreground">
              ~/lessons/{slug}
            </span>
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

      <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6">
        {/* ── Back ──────────────────────────────────────────────── */}
        <Link
          to="/dashboard"
          className="group inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-term-green"
        >
          <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
          ../curriculum
        </Link>

        {/* ── Terminal window ───────────────────────────────────── */}
        <div className="mt-5 border border-border bg-card shadow-[6px_6px_0_0_color-mix(in_oklch,var(--term-green)_12%,transparent)]">
          <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
            <span className="truncate text-xs text-muted-foreground">
              cat lessons/{slug}.md
            </span>
            <WindowDots />
          </div>

          <div className="px-4 py-6 sm:px-8 sm:py-8">
            {lesson === undefined && (
              <div className="space-y-4">
                <div className="h-8 w-2/3 animate-pulse bg-muted" />
                <div className="h-4 w-full animate-pulse bg-muted" />
                <div className="h-4 w-5/6 animate-pulse bg-muted" />
                <div className="h-24 animate-pulse bg-muted" />
              </div>
            )}

            {lesson === null && (
              <div className="py-8 text-center">
                <p className="text-sm">
                  <span className="text-term-amber">cat:</span> lessons/
                  {slug}: No such file or directory
                </p>
                <Button asChild variant="outline" size="sm" className="mt-5 text-xs">
                  <Link to="/dashboard">back to curriculum</Link>
                </Button>
              </div>
            )}

            {lesson && (
              <>
                {/* lesson header */}
                <div className="flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
                  <span className="text-term-green">
                    module/{lesson.module}
                  </span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock3 className="size-3" />~{lesson.durationMinutes} min
                  </span>
                  <span>·</span>
                  <Badge
                    variant="secondary"
                    className="gap-1.5 border-term-green/30 bg-term-green/10 text-[10px] font-medium text-term-green"
                  >
                    <span className="size-1.5 rounded-full bg-term-green-bright" />
                    READY
                  </Badge>
                </div>
                <h1 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                  {lesson.title}
                </h1>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {lesson.description}
                </p>

                {/* content */}
                <div className="mt-8 space-y-4">
                  {lesson.content.map((block, i) => (
                    <BlockView key={i} block={block} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* ── Prev / next ───────────────────────────────────────── */}
        {lesson && (
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {prev ? (
              <Link
                to={`/lessons/${prev.slug}`}
                className="group border border-border bg-card px-4 py-3 transition-colors hover:border-term-green/50 hover:bg-accent/40"
              >
                <p className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-muted-foreground">
                  <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
                  previous
                </p>
                <p className="mt-1 truncate text-sm font-medium">
                  {prev.title}
                </p>
              </Link>
            ) : (
              <div />
            )}
            {next && (
              <Link
                to={`/lessons/${next.slug}`}
                className="group border border-border bg-card px-4 py-3 text-right transition-colors hover:border-term-green/50 hover:bg-accent/40"
              >
                <p className="flex items-center justify-end gap-1.5 text-[11px] uppercase tracking-wider text-muted-foreground">
                  next
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </p>
                <p className="mt-1 truncate text-sm font-medium">
                  {next.title}
                </p>
              </Link>
            )}
          </div>
        )}

        <p className="mt-8 text-center text-[11px] text-muted-foreground">
          <span className="text-term-green">[ok]</span> end of lesson ·{" "}
          {user?.email ?? "student"} · may_academy v1.0
        </p>
      </div>
    </main>
  );
}
