import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { AppHeader } from "@/components/AppHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/use-auth";
import { formatMoney, formatSession } from "@/lib/format";
import { useMutation, useQuery } from "convex/react";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  Clock3,
  Loader2,
  MessageSquare,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import type { ContentBlock } from "@/convex/schema";

function WindowDots() {
  return (
    <span className="flex items-center gap-1.5">
      <span className="size-2.5 rounded-full border border-border bg-muted" />
      <span className="size-2.5 rounded-full border border-border bg-muted" />
      <span className="size-2.5 rounded-full border border-border bg-muted" />
    </span>
  );
}

function CodeBlock({ block }: { block: Extract<ContentBlock, { type: "code" }> }) {
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

function NoteBlock({ block }: { block: Extract<ContentBlock, { type: "note" }> }) {
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
        {warn ? "> caution" : "> note"}
      </p>
      <p className="mt-1 text-sm leading-6 text-foreground/85">{block.text}</p>
    </div>
  );
}

function BlockView({ block }: { block: ContentBlock }) {
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

export default function Course() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const course = useQuery(api.courses.getBySlug, { slug: slug ?? "" });
  const sessions = useQuery(
    api.bookings.listSessionsForCourse,
    course ? { courseId: course._id } : "skip",
  );
  const comments = useQuery(
    api.comments.listForCourse,
    course ? { courseId: course._id } : "skip",
  );

  const bookSession = useMutation(api.bookings.bookSession);
  const postComment = useMutation(api.comments.post);

  const [selectedSession, setSelectedSession] = useState<
    Id<"sessions"> | null
  >(null);
  const [booking, setBooking] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [commentText, setCommentText] = useState("");
  const [posting, setPosting] = useState(false);
  const [commentError, setCommentError] = useState<string | null>(null);

  const isAdmin = user?.role === "admin";

  const handleBook = async (sessionId: Id<"sessions">) => {
    setBooking(true);
    setBookingError(null);
    try {
      const bookingId = await bookSession({ sessionId });
      navigate(`/booking/${bookingId}`);
    } catch (error) {
      setBookingError(
        error instanceof Error ? error.message : "Could not book this session.",
      );
      setBooking(false);
    }
  };

  const handlePostComment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!course || commentText.trim().length === 0 || posting) return;
    setPosting(true);
    try {
      await postComment({ courseId: course._id, text: commentText });
      setCommentText("");
      setCommentError(null);
    } catch (error) {
      setCommentError(
        error instanceof Error ? error.message : "Could not post the comment.",
      );
    } finally {
      setPosting(false);
    }
  };

  const unavailable = course !== undefined && course !== null && !course.published && !isAdmin;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <AppHeader path={`~/courses/${slug}`} />

      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
        {/* ── Back ──────────────────────────────────────────────── */}
        <Link
          to="/courses"
          className="group inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-term-green"
        >
          <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
          ../catalog
        </Link>

        {course === undefined && (
          <div className="mt-6 space-y-4 border border-border bg-card p-8">
            <div className="h-8 w-2/3 animate-pulse bg-muted" />
            <div className="h-4 w-full animate-pulse bg-muted" />
            <div className="h-4 w-5/6 animate-pulse bg-muted" />
            <div className="h-24 animate-pulse bg-muted" />
          </div>
        )}

        {course === null && (
          <div className="mt-6 border border-border bg-card px-6 py-12 text-center">
            <p className="text-sm">
              <span className="text-term-amber">cat:</span> courses/{slug}: No
              such course in the catalog
            </p>
            <Button asChild variant="outline" size="sm" className="mt-5 text-xs">
              <Link to="/courses">back to catalog</Link>
            </Button>
          </div>
        )}

        {course && (
          <>
            {unavailable && (
              <div className="mt-6 border border-term-amber/40 border-l-2 border-l-term-amber bg-term-amber/[0.07] px-4 py-3 text-sm">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-term-amber">
                  {">"} draft
                </span>
                <p className="mt-1 text-foreground/85">
                  This course is not yet published, so it cannot be booked.
                  {isAdmin
                    ? " You are viewing it as an administrator."
                    : ""}
                </p>
              </div>
            )}

            <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_22rem]">
              {/* ── Lesson window ────────────────────────────────── */}
              <div className="border border-border bg-card shadow-[6px_6px_0_0_color-mix(in_oklch,var(--term-green)_10%,transparent)]">
                <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
                  <span className="truncate text-xs text-muted-foreground">
                    cat courses/{course.slug}.md
                  </span>
                  <WindowDots />
                </div>

                <div className="px-4 py-6 sm:px-8 sm:py-8">
                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
                    <span className="text-term-green">
                      track/{course.category.toLowerCase().replace(/[^a-z]+/g, "-")}
                    </span>
                    <span>·</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock3 className="size-3" />
                      ~{course.durationMinutes} min
                    </span>
                    <span>·</span>
                    <Badge
                      variant="secondary"
                      className={`gap-1.5 text-[10px] font-medium ${
                        course.published
                          ? "border-term-green/30 bg-term-green/10 text-term-green"
                          : "border-term-amber/30 bg-term-amber/10 text-term-amber"
                      }`}
                    >
                      <span
                        className={`size-1.5 rounded-full ${
                          course.published
                            ? "bg-term-green-bright"
                            : "bg-term-amber"
                        }`}
                      />
                      {course.published ? "OPEN" : "DRAFT"}
                    </Badge>
                  </div>
                  <h1 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                    {course.title}
                  </h1>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {course.description}
                  </p>

                  <div className="mt-8 space-y-4">
                    {course.content.map((block, i) => (
                      <BlockView key={i} block={block} />
                    ))}
                  </div>
                </div>
              </div>

              {/* ── Booking panel ────────────────────────────────── */}
              <aside className="lg:sticky lg:top-20 lg:self-start">
                <div className="border border-border bg-card">
                  <div className="flex items-center justify-between border-b border-border bg-muted px-4 py-2.5">
                    <span className="text-xs font-semibold">
                      book session
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      {formatMoney(course.priceCents)}
                    </span>
                  </div>

                  <div className="px-4 py-4">
                    <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <CalendarDays className="size-3.5" />
                      upcoming sessions
                    </p>

                    {sessions === undefined && (
                      <div className="mt-3 space-y-2">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <div
                            key={i}
                            className="h-12 animate-pulse border border-border bg-muted/50"
                          />
                        ))}
                      </div>
                    )}

                    {sessions !== undefined && sessions.length === 0 && (
                      <p className="mt-3 border border-border bg-muted/50 px-3 py-3 text-xs text-muted-foreground">
                        <span className="text-term-amber">[warn]</span> no
                        sessions scheduled yet — check back soon.
                      </p>
                    )}

                    {sessions !== undefined && sessions.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {sessions.map((session) => {
                          const seatsLeft =
                            session.capacity - session.bookedCount;
                          const full = seatsLeft <= 0;
                          const selected =
                            selectedSession === session._id;
                          return (
                            <button
                              key={session._id}
                              type="button"
                              disabled={full}
                              onClick={() => setSelectedSession(session._id)}
                              className={`w-full border px-3 py-2.5 text-left text-xs transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                                selected
                                  ? "border-term-green bg-term-green/10"
                                  : "border-border hover:border-term-green/50 hover:bg-accent/40"
                              }`}
                            >
                              <span className="flex items-center justify-between gap-2">
                                <span className="font-medium">
                                  {formatSession(session.startsAt)}
                                </span>
                                {selected && (
                                  <Check className="size-3.5 text-term-green" />
                                )}
                              </span>
                              <span className="mt-1 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                                <Users className="size-3" />
                                {full
                                  ? "session full"
                                  : seatsLeft === 1
                                    ? "1 seat left"
                                    : `${seatsLeft} seats left`}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {bookingError && (
                      <p className="mt-3 border border-term-amber/40 bg-term-amber/[0.07] px-3 py-2 text-xs text-term-amber">
                        {bookingError}
                      </p>
                    )}

                    <div className="mt-4">
                      {unavailable ? (
                        <Button disabled className="w-full text-sm">
                          not yet available
                        </Button>
                      ) : !isAuthenticated ? (
                        <Button asChild className="w-full text-sm">
                          <Link
                            to={`/auth?returnTo=/courses/${course.slug}`}
                          >
                            sign in to book <ArrowLeft className="rotate-180" />
                          </Link>
                        </Button>
                      ) : (
                        <Button
                          disabled={!selectedSession || booking}
                          onClick={() =>
                            selectedSession && handleBook(selectedSession)
                          }
                          className="w-full text-sm"
                        >
                          {booking ? (
                            <>
                              <Loader2 className="size-4 animate-spin" />
                              reserving…
                            </>
                          ) : (
                            <>
                              {course.priceCents === 0
                                ? "book free session"
                                : `book for ${formatMoney(course.priceCents)}`}
                              <ArrowLeft className="rotate-180" />
                            </>
                          )}
                        </Button>
                      )}
                      <p className="mt-2 text-center text-[11px] text-muted-foreground">
                        {course.priceCents === 0
                          ? "free course — confirmed instantly"
                          : "payment via secure checkout after booking"}
                      </p>
                    </div>
                  </div>
                </div>
              </aside>
            </div>

            {/* ── Comments ───────────────────────────────────────── */}
            <section className="mt-12">
              <p className="flex items-center gap-1.5 text-xs text-term-green">
                <MessageSquare className="size-3.5" />
                // questions & comments
              </p>
              <h2 className="mt-2 text-lg font-bold tracking-tight">
                Discussion
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Our team answers every question within one business day.
              </p>

              <div className="mt-5 border border-border bg-card">
                <div className="border-b border-border bg-muted px-4 py-2 text-[11px] uppercase tracking-wider text-muted-foreground">
                  {comments === undefined
                    ? "loading…"
                    : `${comments.length} ${
                        comments.length === 1 ? "comment" : "comments"
                      }`}
                </div>

                {isAuthenticated ? (
                  <form
                    onSubmit={handlePostComment}
                    className="space-y-3 border-b border-border px-4 py-4"
                  >
                    {commentError && (
                      <p className="border border-term-amber/40 bg-term-amber/[0.07] px-3 py-2 text-xs text-term-amber">
                        {commentError}
                      </p>
                    )}
                    <Textarea
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Ask a question or leave a note…"
                      rows={3}
                      maxLength={2000}
                      className="resize-none"
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-muted-foreground">
                        {commentText.length}/2000
                      </span>
                      <Button
                        type="submit"
                        size="sm"
                        className="text-xs"
                        disabled={posting || commentText.trim().length === 0}
                      >
                        {posting ? (
                          <Loader2 className="size-3.5 animate-spin" />
                        ) : (
                          "post comment"
                        )}
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="border-b border-border px-4 py-4 text-xs text-muted-foreground">
                    <Link
                      to={`/auth?returnTo=/courses/${course.slug}`}
                      className="text-term-green underline-offset-4 hover:underline"
                    >
                      Sign in
                    </Link>{" "}
                    to join the discussion.
                  </div>
                )}

                {comments !== undefined && comments.length === 0 && (
                  <div className="px-4 py-8 text-center text-xs text-muted-foreground">
                    <p>
                      <span className="text-term-green">[ok]</span> no comments
                      yet — start the conversation.
                    </p>
                  </div>
                )}

                {comments !== undefined &&
                  comments.length > 0 &&
                  comments.map((comment) => (
                    <div
                      key={comment._id}
                      className="border-b border-border px-4 py-3 last:border-b-0"
                    >
                      <p className="flex items-baseline gap-2 text-[11px]">
                        <span className="font-semibold text-term-green">
                          {comment.authorName}
                        </span>
                        <span className="text-muted-foreground">
                          {new Date(comment.createdAt).toLocaleString()}
                        </span>
                      </p>
                      <p className="mt-1.5 text-sm leading-6 text-foreground/85">
                        {comment.text}
                      </p>
                    </div>
                  ))}
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
