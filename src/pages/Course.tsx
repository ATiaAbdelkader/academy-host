"use client";
import Link from "next/link";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { api } from "@/convex/_generated/api";
import type { Doc, Id } from "@/convex/_generated/dataModel";
import { AiAssistant, AssistantToggle } from "@/components/AiAssistant";
import { AppHeader } from "@/components/AppHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/use-auth";
import { formatMoney, formatSession } from "@/lib/format";
import {
  getOfflineCourse,
  isSavedOffline,
  removeOfflineCourse,
  saveCourseForOffline,
} from "@/lib/offline";
import { useAction, useMutation, useQuery } from "convex/react";
import {
  ArrowLeft,
  Award,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  Download,
  Flag,
  Leaf,
  Loader2,
  MessageSquare,
  Lock,
  Star,
  Trash2,
  UserRound,
  Users,
  WifiOff,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { ContentBlock } from "@/convex/schema";
import { toast } from "sonner";

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

function VideoBlock({
  block,
}: {
  block: Extract<ContentBlock, { type: "video" }>;
}) {
  const url = block.url.trim();
  let embedUrl: string | null = null;
  const yt = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([\w-]{6,})/,
  );
  if (yt) {
    embedUrl = `https://www.youtube-nocookie.com/embed/${yt[1]}`;
  } else {
    const vm = url.match(/vimeo\.com\/(\d+)/);
    if (vm) {
      embedUrl = `https://player.vimeo.com/video/${vm[1]}`;
    }
  }
  const isDirect = /\.(mp4|webm|ogg)(\?.*)?$/i.test(url);
  return (
    <figure>
      <div className="border border-border bg-muted/30">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            title={block.caption ?? "Course video"}
            className="aspect-video w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : isDirect ? (
          <video src={url} controls className="aspect-video w-full" />
        ) : (
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="block px-4 py-8 text-center text-xs text-term-green underline-offset-4 hover:underline"
          >
            ▸ open video — {url}
          </a>
        )}
      </div>
      {block.caption && (
        <figcaption className="mt-2 text-xs text-muted-foreground">
          {block.caption}
        </figcaption>
      )}
    </figure>
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

/** Private study notes for one course. Keyed by the progress entry id in the
 *  parent so it always initializes from the freshest saved note without an
 *  effect. */
function NotesPanel({
  courseId,
  initialNote,
}: {
  courseId: Id<"courses">;
  initialNote: string;
}) {
  const setNote = useMutation(api.progress.setNote);
  const [draft, setDraft] = useState(initialNote);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await setNote({ courseId, note: draft });
      setSaved(true);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not save notes.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-2 border-t border-border pt-3">
      <p className="text-[11px] font-medium text-muted-foreground">
        my notes — private to you
      </p>
      <Textarea
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        rows={3}
        placeholder="Your own study notes for this course…"
        maxLength={5000}
        className="resize-none text-xs"
      />
      <div className="flex items-center justify-end gap-2">
        {draft !== initialNote && (
          <span className="mr-auto text-[10px] text-term-amber">unsaved</span>
        )}
        <Button
          variant="outline"
          size="sm"
          className="h-7 text-[11px]"
          disabled={saving || draft === initialNote}
          onClick={() => setDraft(initialNote)}
        >
          discard
        </Button>
        <Button
          size="sm"
          className="h-7 text-[11px]"
          disabled={saving || draft === initialNote}
          onClick={() => void handleSave()}
        >
          {saving ? (
            <Loader2 className="size-3 animate-spin" />
          ) : (
            "save notes"
          )}
        </Button>
      </div>
      {saved && (
        <p className="text-[10px] text-term-green">[ok] notes saved</p>
      )}
    </div>
  );
}

function QuizBlock({
  block,
  courseId,
  index,
}: {
  block: Extract<ContentBlock, { type: "quiz" }>;
  courseId: Id<"courses">;
  index: number;
}) {
  const { isAuthenticated } = useAuth();
  const submitQuiz = useMutation(api.quizzes.submitQuiz);
  const results = useQuery(
    api.quizzes.myQuizResults,
    isAuthenticated ? { courseId } : "skip",
  );

  const [answers, setAnswers] = useState<(number | null)[]>(() =>
    Array.from({ length: block.questions.length }, () => null),
  );
  const [textAnswers, setTextAnswers] = useState<string[]>(() =>
    Array.from({ length: block.questions.length }, () => ""),
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastResult, setLastResult] = useState<{
    correct: number;
    total: number;
    percent: number;
    passed: boolean;
    passPercent: number;
    pendingReview?: boolean;
  } | null>(null);

  const attempts = (results ?? []).filter((a) => a.quizIndex === index);
  const passed = attempts.some((a) => a.passed);
  const awaitingReview = attempts.some((a) => a.pendingReview);
  const latestOpenGrades = attempts[0]?.openGrades ?? null;
  const answered = block.questions.every((question, qi) =>
    question.open
      ? textAnswers[qi].trim().length > 0
      : answers[qi] !== null,
  );

  const handleSubmit = async () => {
    if (!answered || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const result = await submitQuiz({
        courseId,
        quizIndex: index,
        answers: answers.map((a) => a ?? 0),
        textAnswers,
      });
      setLastResult(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not submit the quiz.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="border border-border bg-muted/20">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-muted px-4 py-2.5">
        <span className="flex items-center gap-2 text-xs font-semibold">
          <span className="text-term-green">[quiz]</span>
          {block.title || `Knowledge check ${index + 1}`}
        </span>
        <span className="text-[11px] text-muted-foreground">
          pass mark {block.passPercent}% · {block.questions.length}{" "}
          {block.questions.length === 1 ? "question" : "questions"}
        </span>
      </div>

      <div className="space-y-4 px-4 py-4">
        {block.instructions && (
          <p className="text-xs text-muted-foreground">
            {block.instructions}
          </p>
        )}

        {passed && (
          <p className="border border-term-green/40 border-l-2 border-l-term-green bg-term-green/[0.07] px-3 py-2 text-xs text-term-green">
            [ok] passed{lastResult ? ` — ${lastResult.percent}%` : ""} · you
            may retake anytime
          </p>
        )}
        {awaitingReview && !passed && (
          <p className="border border-term-amber/40 border-l-2 border-l-term-amber bg-term-amber/[0.07] px-3 py-2 text-xs text-term-amber">
            [warn] submitted — an instructor is reviewing your written answers.
            The next module unlocks once the review is graded.
          </p>
        )}

        {block.questions.map((question, qi) => {
          const review = question.open
            ? latestOpenGrades && latestOpenGrades[qi] !== null
              ? latestOpenGrades[qi]
              : null
            : lastResult
              ? answers[qi] === question.answerIndex
              : null;
          return (
            <div key={qi} className="space-y-2">
              <p className="text-sm font-medium">
                <span className="mr-2 text-[11px] text-term-green">
                  Q{qi + 1}
                </span>
                {question.question}
                {question.open && (
                  <span className="ml-2 border border-term-amber/40 bg-term-amber/10 px-1 py-0.5 text-[9px] font-medium uppercase tracking-wider text-term-amber">
                    written answer
                  </span>
                )}
              </p>
              {question.open ? (
                <Textarea
                  value={textAnswers[qi]}
                  onChange={(e) =>
                    setTextAnswers((prev) =>
                      prev.map((t, i) => (i === qi ? e.target.value : t)),
                    )
                  }
                  rows={3}
                  placeholder="Write your answer — an instructor will review it."
                  className="resize-y text-sm"
                />
              ) : (
                <RadioGroup
                  value={
                    answers[qi] != null ? String(answers[qi]) : undefined
                  }
                  onValueChange={(value) =>
                    setAnswers((prev) =>
                      prev.map((a, i) => (i === qi ? Number(value) : a)),
                    )
                  }
                  className="gap-1.5"
                >
                  {question.options.map((option, oi) => (
                    <div key={oi} className="flex items-center gap-2 text-sm">
                      <RadioGroupItem
                        id={`quiz-${index}-q${qi}-o${oi}`}
                        value={String(oi)}
                      />
                      <label
                        htmlFor={`quiz-${index}-q${qi}-o${oi}`}
                        className={`flex items-center gap-1.5 ${
                          review === null
                            ? "text-foreground/85"
                            : oi === question.answerIndex
                              ? "text-term-green"
                              : oi === answers[qi]
                                ? "text-term-amber"
                                : "text-muted-foreground/60"
                        }`}
                      >
                        {review !== null && oi === question.answerIndex && (
                          <Check className="size-3.5" />
                        )}
                        {review !== null &&
                          oi === answers[qi] &&
                          oi !== question.answerIndex && (
                            <X className="size-3.5" />
                          )}
                        {option}
                      </label>
                    </div>
                  ))}
                </RadioGroup>
              )}
              {question.open && review === null && (
                <p className="text-[11px] text-muted-foreground">
                  awaiting instructor review
                </p>
              )}
              {review !== null && (
                <p
                  className={`text-[11px] ${
                    review ? "text-term-green" : "text-term-amber"
                  }`}
                >
                  {question.open
                    ? review
                      ? "instructor graded: correct"
                      : "instructor graded: revisit this topic"
                    : review
                      ? "correct"
                      : "incorrect"}
                </p>
              )}
            </div>
          );
        })}

        {error && (
          <p className="border border-term-amber/40 bg-term-amber/[0.07] px-3 py-2 text-xs text-term-amber">
            {error}
          </p>
        )}

        {!isAuthenticated ? (
          <p className="text-xs text-muted-foreground">
            <Link href={`/auth?returnTo=${window.location.pathname}`}
              className="text-term-green underline-offset-4 hover:underline"
            >
              Sign in
            </Link>{" "}
            to take the quiz and track your result.
          </p>
        ) : (
          <div className="flex items-center gap-3">
            <Button
              size="sm"
              className="text-xs"
              disabled={!answered || submitting}
              onClick={() => void handleSubmit()}
            >
              {submitting ? (
                <Loader2 className="size-3.5 animate-spin" />
              ) : (
                "submit answers"
              )}
            </Button>
            {lastResult && (
              <span
                className={`text-xs font-medium ${
                  lastResult.passed ? "text-term-green" : "text-term-amber"
                }`}
              >
                {lastResult.pendingReview
                  ? `${lastResult.percent}% auto-graded — written answers awaiting instructor review`
                  : `${lastResult.percent}% — ${lastResult.correct}/${lastResult.total} correct · ${lastResult.passed ? "passed" : `need ${lastResult.passPercent}%`}`}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function BlockView({
  block,
  courseId,
  quizIndex,
}: {
  block: ContentBlock;
  courseId?: Id<"courses">;
  quizIndex?: number;
}) {
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
    case "video":
      return <VideoBlock block={block} />;
    case "quiz":
      return (
        <QuizBlock
          block={block}
          courseId={courseId ?? ("" as Id<"courses">)}
          index={quizIndex ?? 0}
        />
      );
    default:
      return null;
  }
}

export default function Course() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useRouter();
  const [searchParams] = useSearchParams();
  const { user, isAuthenticated } = useAuth();

  const liveCourse = useQuery(api.courses.getBySlug, { slug: slug ?? "" });
  const [offlineCourse, setOfflineCourse] = useState<Doc<"courses"> | null>(
    null,
  );
  const [isOffline, setIsOffline] = useState(
    () => typeof window !== "undefined" && !window.navigator.onLine,
  );
  const [savedOffline, setSavedOffline] = useState(false);
  const course = liveCourse ?? offlineCourse;
  const sessions = useQuery(
    api.bookings.listSessionsForCourse,
    course ? { courseId: course._id } : "skip",
  );
  const comments = useQuery(
    api.comments.listForCourse,
    course ? { courseId: course._id } : "skip",
  );
  const reviewSummaries = useQuery(api.reviews.summaries);
  const reviews = useQuery(
    api.reviews.listForCourse,
    course ? { courseId: course._id } : "skip",
  );
  const myReview = useQuery(
    api.reviews.myReview,
    isAuthenticated && course ? { courseId: course._id } : "skip",
  );
  const reviewPermission = useQuery(
    api.reviews.canReview,
    isAuthenticated && course ? { courseId: course._id } : "skip",
  );

  const bookSession = useMutation(api.bookings.bookSession);
  const postComment = useMutation(api.comments.post);
  const postReview = useMutation(api.reviews.post);
  const setProgress = useMutation(api.progress.setStatus);
  const recordModule = useMutation(api.progress.recordModule);
  const joinWaitlist = useMutation(api.waitlist.join);
  const leaveWaitlist = useMutation(api.waitlist.leave);
  const sendConfirmation = useAction(api.notifications.sendBookingConfirmation);

  const progress = useQuery(
    api.progress.myProgress,
    isAuthenticated ? {} : "skip",
  );
  const quizResults = useQuery(
    api.quizzes.myQuizResults,
    isAuthenticated && course ? { courseId: course._id } : "skip",
  );

  const [selectedSession, setSelectedSession] = useState<
    Id<"sessions"> | null
  >(null);
  const waitlistState = useQuery(
    api.waitlist.forSession,
    selectedSession ? { sessionId: selectedSession } : "skip",
  );
  const [booking, setBooking] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [commentText, setCommentText] = useState("");
  const [posting, setPosting] = useState(false);
  const [commentError, setCommentError] = useState<string | null>(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [postingReview, setPostingReview] = useState(false);
  const [reviewError, setReviewError] = useState<string | null>(null);
  const [assistantOpen, setAssistantOpen] = useState(false);

  // Offline reading: track connectivity and fall back to the saved copy.
  useEffect(() => {
    const goOnline = () => setIsOffline(false);
    const goOffline = () => setIsOffline(true);
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  useEffect(() => {
    setSavedOffline(slug ? isSavedOffline(slug) : false);
  }, [slug]);

  useEffect(() => {
    if (!slug || !isOffline || liveCourse !== undefined) return;
    const cached = getOfflineCourse(slug);
    if (cached) {
      setOfflineCourse(cached as Doc<"courses">);
    }
  }, [slug, isOffline, liveCourse]);

  const handleSaveOffline = () => {
    if (!slug || !liveCourse) return;
    saveCourseForOffline(slug, liveCourse);
    setSavedOffline(true);
    toast.success("Course saved for offline reading.");
  };

  const handleRemoveOffline = () => {
    if (!slug) return;
    removeOfflineCourse(slug);
    setSavedOffline(false);
    toast.success("Offline copy removed.");
  };

  // Bundle coupons arrive as ?coupon=CODE; carry them into the booking page.
  useEffect(() => {
    const coupon = searchParams.get("coupon");
    if (coupon) {
      window.sessionStorage.setItem("agriskills:pending-coupon", coupon);
    }
  }, [searchParams]);

  // Resume learning: watch which module sections the student actually reads
  // and bookmark the furthest one (drives the dashboard resume card and the
  // admin drop-off report).
  const moduleRefs = useRef<(HTMLElement | null)[]>([]);
  useEffect(() => {
    if (!isAuthenticated || !course) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          const mi = Number(el.dataset.moduleIndex);
          if (Number.isInteger(mi) && course) {
            void recordModule({ courseId: course._id, moduleIndex: mi }).catch(
              () => {},
            );
          }
        }
      },
      { rootMargin: "0px 0px -35% 0px", threshold: 0.35 },
    );
    moduleRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [
    isAuthenticated,
    course,
    course?.modules?.length ?? (course ? 1 : 0),
    recordModule,
  ]);

  // ?module=N (from the dashboard resume card) jumps straight to that module.
  const resumeModule = searchParams.get("module");
  useEffect(() => {
    if (resumeModule === null || !course) return;
    const mi = Number(resumeModule);
    if (!Number.isInteger(mi)) return;
    const el = moduleRefs.current[mi];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      void recordModule({ courseId: course._id, moduleIndex: mi }).catch(
        () => {},
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resumeModule, course]);

  const isAdmin = user?.role === "admin";
  const progressEntry = course
    ? progress?.find((p) => p.courseId === course._id)
    : undefined;
  const reviewSummary = course
    ? reviewSummaries?.find((s) => s.courseId === course._id)
    : undefined;
  // Modules — legacy flat content renders as a single module.
  const modules =
    course && course.modules && course.modules.length > 0
      ? course.modules
      : course
        ? [{ title: "Course content", content: course.content }]
        : [];
  // Flatten quiz blocks in reading order; each module's quiz ordinal is its
  // index among all quiz blocks (the backend grades against this ordering).
  const quizBlocks: {
    ordinal: number;
    moduleIndex: number;
  }[] = [];
  const firstQuizOrdinal: number[] = [];
  let quizCounter = 0;
  modules.forEach((m, mi) => {
    firstQuizOrdinal.push(quizCounter);
    m.content.forEach((block) => {
      if (block.type === "quiz") {
        quizBlocks.push({ ordinal: quizCounter, moduleIndex: mi });
        quizCounter += 1;
      }
    });
  });
  const passedQuizIndexes = new Set(
    (quizResults ?? []).filter((a) => a.passed).map((a) => a.quizIndex),
  );
  const moduleUnlocked = (mi: number) => {
    if (mi === 0) return true;
    for (let o = 0; o < firstQuizOrdinal[mi]; o += 1) {
      if (!passedQuizIndexes.has(o)) return false;
    }
    return true;
  };
  const moduleComplete = (mi: number) =>
    quizBlocks
      .filter((qb) => qb.moduleIndex === mi)
      .every((qb) => passedQuizIndexes.has(qb.ordinal));
  const quizzesPassed = quizBlocks.filter((qb) =>
    passedQuizIndexes.has(qb.ordinal),
  ).length;
  const allQuizzesPassed =
    quizBlocks.length === 0 || quizzesPassed === quizBlocks.length;
  const modulesPassed = modules.filter((_, mi) => moduleComplete(mi)).length;
  const modulesBar =
    modules.length === 0
      ? ""
      : `${Math.round((modulesPassed / modules.length) * 100)}% [${modulesPassed}/${modules.length} modules]`;

  const selectedSessionData =
    sessions?.find((s) => s._id === selectedSession) ?? null;
  const selectedIsFull = selectedSessionData
    ? selectedSessionData.bookedCount >= selectedSessionData.capacity
    : false;
  const onWaitlist = waitlistState?.position != null;

  const handleBook = async (sessionId: Id<"sessions">) => {
    setBooking(true);
    setBookingError(null);
    try {
      const bookingId = await bookSession({ sessionId });
      // Free courses confirm instantly; send the confirmation email in the
      // background (idempotent, so this is safe to fire from the client).
      if (course?.priceCents === 0) {
        void sendConfirmation({
          bookingId,
          origin: window.location.origin,
        }).catch(() => {});
      }
      const pendingCoupon = window.sessionStorage.getItem(
        "agriskills:pending-coupon",
      );
      window.sessionStorage.removeItem("agriskills:pending-coupon");
      navigate(
        pendingCoupon
          ? `/booking/${bookingId}?coupon=${encodeURIComponent(pendingCoupon)}`
          : `/booking/${bookingId}`,
      );
    } catch (error) {
      setBookingError(
        error instanceof Error ? error.message : "Could not book this session.",
      );
      setBooking(false);
    }
  };

  const handleSetProgress = async (
    status: "started" | "completed" | null,
  ) => {
    if (!course) return;
    try {
      await setProgress({ courseId: course._id, status });
      toast.success(
        status === "completed"
          ? "Course marked complete."
          : status === "started"
            ? "Course marked in progress."
            : "Progress cleared.",
      );
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not update progress.",
      );
    }
  };

  const handleJoinWaitlist = async () => {
    if (!selectedSession) return;
    setBookingError(null);
    try {
      await joinWaitlist({ sessionId: selectedSession });
      toast.success("You're on the waitlist — we'll hold the next freed seat.");
    } catch (error) {
      setBookingError(
        error instanceof Error ? error.message : "Could not join the waitlist.",
      );
    }
  };

  const handleLeaveWaitlist = async () => {
    if (!selectedSession) return;
    try {
      await leaveWaitlist({ sessionId: selectedSession });
      toast.success("Removed from the waitlist.");
    } catch (error) {
      setBookingError(
        error instanceof Error ? error.message : "Could not leave the waitlist.",
      );
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

  const handlePostReview = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!course || postingReview) return;
    setPostingReview(true);
    setReviewError(null);
    try {
      await postReview({
        courseId: course._id,
        rating: reviewRating,
        comment: reviewComment.trim() || undefined,
      });
      setReviewComment("");
    } catch (error) {
      setReviewError(
        error instanceof Error ? error.message : "Could not post the review.",
      );
    } finally {
      setPostingReview(false);
    }
  };

  const unavailable = course !== undefined && course !== null && !course.published && !isAdmin;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <AppHeader path={`~/courses/${slug}`} />

      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
        {/* ── Back ──────────────────────────────────────────────── */}
        <Link href="/courses"
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
              <Link href="/courses">back to catalog</Link>
            </Button>
          </div>
        )}

        {course && (
          <>
            {isOffline && (
              <div className="mt-6 flex items-start gap-3 border border-term-amber/40 border-l-2 border-l-term-amber bg-term-amber/[0.07] px-4 py-3 text-sm">
                <WifiOff className="mt-0.5 size-4 shrink-0 text-term-amber" />
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-term-amber">
                    offline mode
                  </p>
                  <p className="mt-1 text-xs leading-5 text-foreground/85">
                    You're viewing the saved copy of this lesson. Text and
                    quizzes read fine without a connection — videos and quiz
                    submissions need to come back online.
                  </p>
                </div>
              </div>
            )}
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
                <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-2.5">
                  <span className="truncate text-xs text-muted-foreground">
                    cat courses/{course.slug}.md
                  </span>
                  <span className="flex shrink-0 items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-6 gap-1 px-2 text-[10px]"
                      onClick={
                        savedOffline ? handleRemoveOffline : handleSaveOffline
                      }
                    >
                      {savedOffline ? (
                        <>
                          <Trash2 className="size-3" />
                          remove offline
                        </>
                      ) : (
                        <>
                          <Download className="size-3 text-term-green" />
                          save offline
                        </>
                      )}
                    </Button>
                    <WindowDots />
                  </span>
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

                  {reviewSummary && (
                    <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Star className="size-3.5 fill-term-amber text-term-amber" />
                      <span className="font-medium text-foreground/80">
                        {reviewSummary.avgRating.toFixed(1)}
                      </span>
                      <span>
                        · {reviewSummary.reviewCount}{" "}
                        {reviewSummary.reviewCount === 1
                          ? "review"
                          : "reviews"}
                      </span>
                    </p>
                  )}

                  {course.instructor && (
                    <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <UserRound className="size-3.5 text-term-green" />
                      instructor:
                      <Link href="/instructors"
                        className="font-medium text-foreground/80 underline-offset-4 hover:text-term-green hover:underline"
                      >
                        {course.instructor}
                      </Link>
                      {course.instructorTitle ? (
                        <span>· {course.instructorTitle}</span>
                      ) : null}
                    </p>
                  )}

                  {isAuthenticated && modules.length > 0 && (
                    <div className="mt-6 border border-border bg-muted/30">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-2">
                        <span className="text-[11px] font-semibold text-muted-foreground">
                          course progress
                        </span>
                        <span
                          className={`text-[11px] font-medium ${
                            allQuizzesPassed
                              ? "text-term-green"
                              : "text-term-amber"
                          }`}
                        >
                          {modulesBar}
                        </span>
                      </div>
                      <div className="h-2 bg-muted">
                        <div
                          className={`h-full transition-all ${
                            allQuizzesPassed
                              ? "bg-term-green"
                              : "bg-term-amber"
                          }`}
                          style={{
                            width: `${Math.round(
                              (modules.length
                                ? modulesPassed / modules.length
                                : 0) * 100,
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="mt-8 space-y-6">
                    {modules.map((m, mi) =>
                      moduleUnlocked(mi) ? (
                        <section
                          key={mi}
                          ref={(el) => {
                            moduleRefs.current[mi] = el;
                          }}
                          data-module-index={mi}
                          className="scroll-mt-16 border border-border bg-muted/20"
                        >
                          <header className="flex items-center justify-between gap-2 border-b border-border bg-muted px-4 py-2.5">
                            <span className="flex items-baseline gap-2 text-xs font-semibold">
                              <span className="shrink-0 text-term-green">
                                module {String(mi + 1).padStart(2, "0")}
                              </span>
                              <span className="text-foreground/85">
                                {m.title}
                              </span>
                            </span>
                            {moduleComplete(mi) && (
                              <span className="inline-flex shrink-0 items-center gap-1 text-[11px] text-term-green">
                                <CheckCircle2 className="size-3.5" />
                                complete
                              </span>
                            )}
                          </header>
                          <div className="space-y-4 px-4 py-5 sm:px-6">
                            {m.content.map((block, bi) => {
                              let quizIndex = -1;
                              if (block.type === "quiz") {
                                const before = m.content
                                  .slice(0, bi)
                                  .filter((b) => b.type === "quiz").length;
                                quizIndex = firstQuizOrdinal[mi] + before;
                              }
                              return (
                                <BlockView
                                  key={bi}
                                  block={block}
                                  courseId={course._id}
                                  quizIndex={quizIndex}
                                />
                              );
                            })}
                          </div>
                        </section>
                      ) : (
                        <section
                          key={mi}
                          className="flex items-center justify-between gap-3 border border-dashed border-border bg-muted/30 px-4 py-4"
                        >
                          <p className="flex items-center gap-2 text-xs font-semibold text-foreground/70">
                            <Lock className="size-3.5 shrink-0 text-term-amber" />
                            module {String(mi + 1).padStart(2, "0")} —{" "}
                            {m.title}
                          </p>
                          <p className="shrink-0 text-[11px] text-muted-foreground">
                            pass the previous module's quiz to unlock
                          </p>
                        </section>
                      ),
                    )}
                  </div>

                  <div className="mt-8">
                    <AssistantToggle
                      open={assistantOpen}
                      onToggle={() => setAssistantOpen((open) => !open)}
                    />
                    {assistantOpen && (
                      <div className="mt-3">
                        <AiAssistant
                          courseId={course._id}
                          courseTitle={course.title}
                        />
                      </div>
                    )}
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
                              onClick={() => setSelectedSession(session._id)}
                              className={`w-full border px-3 py-2.5 text-left text-xs transition-colors ${
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
                              <span
                                className={`mt-1 flex items-center gap-1.5 text-[11px] ${
                                  full
                                    ? "text-term-amber"
                                    : "text-muted-foreground"
                                }`}
                              >
                                <Users className="size-3" />
                                {full
                                  ? "full — waitlist open"
                                  : seatsLeft === 1
                                    ? "1 seat left"
                                    : `${seatsLeft} seats left`}
                              </span>
                              {session.venue && (
                                <span className="mt-1 block truncate text-[10px] text-muted-foreground/80">
                                  @ {session.venue}
                                </span>
                              )}
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
                      ) : selectedIsFull ? (
                        !isAuthenticated ? (
                          <Button asChild className="w-full text-sm">
                            <Link href={`/auth?returnTo=/courses/${course.slug}`}
                            >
                              sign in to join waitlist
                              <ArrowLeft className="rotate-180" />
                            </Link>
                          </Button>
                        ) : onWaitlist ? (
                          <div className="space-y-2">
                            <p className="border border-term-green/40 bg-term-green/[0.07] px-3 py-2 text-xs text-term-green">
                              on waitlist — position {waitlistState?.position}
                            </p>
                            <Button
                              variant="outline"
                              onClick={handleLeaveWaitlist}
                              className="w-full text-xs"
                            >
                              leave waitlist
                            </Button>
                          </div>
                        ) : (
                          <Button
                            onClick={handleJoinWaitlist}
                            disabled={!selectedSession}
                            className="w-full text-sm"
                          >
                            join waitlist — get the next freed seat
                          </Button>
                        )
                      ) : !isAuthenticated ? (
                        <Button asChild className="w-full text-sm">
                          <Link href={`/auth?returnTo=/courses/${course.slug}`}
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
                        {selectedIsFull
                          ? "session full — seats are offered to the waitlist first"
                          : course.priceCents === 0
                            ? "free course — confirmed instantly"
                            : "payment via secure checkout after booking"}
                      </p>
                    </div>
                  </div>
                </div>

                {isAuthenticated && (
                  <div className="mt-4 border border-border bg-card">
                    <div className="border-b border-border bg-muted px-4 py-2.5">
                      <span className="text-xs font-semibold">my progress</span>
                    </div>
                    <div className="space-y-2 px-4 py-3">
                      <p className="text-xs text-muted-foreground">
                        {progressEntry
                          ? progressEntry.status === "completed"
                            ? "completed"
                            : "in progress"
                          : "not started"}
                      </p>
                      {quizBlocks.length > 0 && (
                        <p
                          className={`flex items-center gap-1.5 text-[11px] ${
                            allQuizzesPassed
                              ? "text-term-green"
                              : "text-term-amber"
                          }`}
                        >
                          <CheckCircle2 className="size-3" />
                          quizzes {quizzesPassed}/{quizBlocks.length} passed
                        </p>
                      )}
                      <div className="flex gap-2">
                        <Button
                          variant={
                            progressEntry?.status === "started"
                              ? "default"
                              : "outline"
                          }
                          size="sm"
                          className="flex-1 text-xs"
                          onClick={() => handleSetProgress("started")}
                        >
                          <Flag className="size-3.5" />
                          started
                        </Button>
                        <Button
                          variant={
                            progressEntry?.status === "completed"
                              ? "default"
                              : "outline"
                          }
                          size="sm"
                          className="flex-1 text-xs"
                          disabled={
                            quizBlocks.length > 0 && !allQuizzesPassed
                          }
                          title={
                            quizBlocks.length > 0 && !allQuizzesPassed
                              ? "Pass every quiz in this course first"
                              : undefined
                          }
                          onClick={() => handleSetProgress("completed")}
                        >
                          <CheckCircle2 className="size-3.5" />
                          completed
                        </Button>
                      </div>
                      {quizBlocks.length > 0 && !allQuizzesPassed && (
                        <p className="text-[11px] text-term-amber">
                          pass every quiz above to mark this course completed
                        </p>
                      )}
                      {progressEntry?.status === "completed" && (
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="w-full text-xs"
                        >
                          <Link href={`/certificate/${course._id}`}>
                            <Award className="size-3.5" />
                            view certificate
                          </Link>
                        </Button>
                      )}
                      {progressEntry && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full text-xs text-muted-foreground"
                          onClick={() => handleSetProgress(null)}
                        >
                          clear progress
                        </Button>
                      )}

                      <NotesPanel
                        key={progressEntry?._id ?? "none"}
                        courseId={course._id}
                        initialNote={progressEntry?.note ?? ""}
                      />
                    </div>
                  </div>
                )}
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
                    <Link href={`/auth?returnTo=/courses/${course.slug}`}
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

            {/* ── Reviews ────────────────────────────────────────── */}
            <section className="mt-12">
              <p className="flex items-center gap-1.5 text-xs text-term-green">
                <Star className="size-3.5" />
                // reviews & ratings
              </p>
              <h2 className="mt-2 text-lg font-bold tracking-tight">
                {reviewSummary
                  ? `${reviewSummary.avgRating.toFixed(1)} / 5 · ${
                      reviewSummary.reviewCount
                    } ${reviewSummary.reviewCount === 1 ? "review" : "reviews"}`
                  : "Reviews"}
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Ratings come from students with a confirmed booking for this
                course.
              </p>

              <div className="mt-5 border border-border bg-card">
                {isAuthenticated &&
                  myReview === null &&
                  reviewPermission?.allowed && (
                    <form
                      onSubmit={handlePostReview}
                      className="space-y-3 border-b border-border px-4 py-4"
                    >
                      <div className="flex items-center gap-1">
                        <span className="mr-2 text-[11px] uppercase tracking-wider text-muted-foreground">
                          your rating
                        </span>
                        {[1, 2, 3, 4, 5].map((value) => (
                          <button
                            key={value}
                            type="button"
                            onClick={() => setReviewRating(value)}
                            className="p-0.5 transition-transform hover:scale-110"
                            aria-label={`${value} star${value === 1 ? "" : "s"}`}
                          >
                            <Star
                              className={`size-4 ${
                                value <= reviewRating
                                  ? "fill-term-amber text-term-amber"
                                  : "text-muted-foreground/40"
                              }`}
                            />
                          </button>
                        ))}
                        <span className="ml-2 text-xs font-medium">
                          {reviewRating}/5
                        </span>
                      </div>
                      <Textarea
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        placeholder="What did the course do well? (optional)"
                        rows={2}
                        maxLength={1000}
                        className="resize-none"
                      />
                      {reviewError && (
                        <p className="border border-term-amber/40 bg-term-amber/[0.07] px-3 py-2 text-xs text-term-amber">
                          {reviewError}
                        </p>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] text-muted-foreground">
                          {reviewComment.length}/1000
                        </span>
                        <Button
                          type="submit"
                          size="sm"
                          className="text-xs"
                          disabled={postingReview}
                        >
                          {postingReview ? (
                            <Loader2 className="size-3.5 animate-spin" />
                          ) : (
                            "post review"
                          )}
                        </Button>
                      </div>
                    </form>
                  )}

                {isAuthenticated && myReview !== undefined && myReview !== null && (
                  <div className="border-b border-border px-4 py-3">
                    <p className="flex items-center gap-1.5 text-[11px]">
                      <span className="font-semibold text-term-green">
                        your review
                      </span>
                      <span className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((value) => (
                          <Star
                            key={value}
                            className={`size-3 ${
                              value <= myReview.rating
                                ? "fill-term-amber text-term-amber"
                                : "text-muted-foreground/40"
                            }`}
                          />
                        ))}
                      </span>
                    </p>
                    {myReview.comment && (
                      <p className="mt-1.5 text-sm leading-6 text-foreground/85">
                        {myReview.comment}
                      </p>
                    )}
                  </div>
                )}

                {isAuthenticated &&
                  myReview === null &&
                  reviewPermission !== undefined &&
                  !reviewPermission.allowed && (
                    <div className="border-b border-border px-4 py-3 text-xs text-muted-foreground">
                      {reviewPermission.reason}
                    </div>
                  )}

                {reviews !== undefined && reviews.length === 0 && (
                  <div className="px-4 py-8 text-center text-xs text-muted-foreground">
                    <p>
                      <span className="text-term-green">[ok]</span> no reviews
                      yet — be the first to rate this course.
                    </p>
                  </div>
                )}

                {reviews !== undefined &&
                  reviews.length > 0 &&
                  reviews.map((review) => (
                    <div
                      key={review._id}
                      className="border-b border-border px-4 py-3 last:border-b-0"
                    >
                      <p className="flex items-baseline gap-2 text-[11px]">
                        <span className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((value) => (
                            <Star
                              key={value}
                              className={`size-3 ${
                                value <= review.rating
                                  ? "fill-term-amber text-term-amber"
                                  : "text-muted-foreground/40"
                              }`}
                            />
                          ))}
                        </span>
                        <span className="font-semibold text-term-green">
                          {review.authorName}
                        </span>
                        <span className="text-muted-foreground">
                          {new Date(review.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </p>
                      {review.comment && (
                        <p className="mt-1.5 text-sm leading-6 text-foreground/85">
                          {review.comment}
                        </p>
                      )}
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
