import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useCatalog } from "@/hooks/use-catalog";
import { BADGE_DEFS } from "@/lib/badges";
import { formatMoney, formatSession } from "@/lib/format";
import { downloadIcs } from "@/lib/ics";
import { useAction, useMutation, useQuery } from "convex/react";
import {
  Award,
  CalendarDays,
  CalendarPlus,
  CheckCircle2,
  Flame,
  Flag,
  ListMinus,
  Loader2,
  ShieldCheck,
  Trophy,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

export default function Dashboard() {
  const { user } = useAuth();
  const bookings = useQuery(api.bookings.myBookings);
  const progressQuery = useQuery(api.progress.myProgress);
  const waitlists = useQuery(api.waitlist.myWaitlists);
  const myStats = useQuery(api.gamification.myStats);
  const leaderboard = useQuery(api.gamification.leaderboard);
  const insights = useQuery(api.insights.myQuizInsights);
  const progress = progressQuery ?? [];
  const courses = useCatalog();
  const resumeEntries = (progress ?? [])
    .filter((p) => p.status !== "completed" && p.lastModuleIndex != null)
    .map((p) => {
      const course = (courses ?? []).find((c) => c._id === p.courseId);
      return {
        courseId: p.courseId,
        courseSlug: course?.slug ?? p.courseSlug,
        courseTitle: course?.title ?? p.courseTitle,
        moduleIndex: p.lastModuleIndex ?? 0,
        moduleTitle: course?.modules?.[p.lastModuleIndex ?? 0]?.title ?? "",
        moduleCount: course?.modules?.length ?? 0,
      };
    })
    .filter((entry) => entry.moduleCount > 0)
    .sort((a, b) => b.moduleIndex - a.moduleIndex)
    .slice(0, 3);
  const cancelBooking = useMutation(api.bookings.cancelBooking);
  const leaveWaitlist = useMutation(api.waitlist.leave);
  const sendWaitlistOffer = useAction(api.notifications.sendWaitlistOffer);

  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [cancelError, setCancelError] = useState<string | null>(null);
  const [reviewCourse, setReviewCourse] = useState<string | null>(null);

  const isAdmin = user?.role === "admin";

  const publishedCourses = (courses ?? []).filter((c) => c.published);
  const completedCount =
    progress?.filter((p) => p.status === "completed").length ?? 0;
  const progressPct = publishedCourses.length
    ? Math.round((completedCount / publishedCourses.length) * 100)
    : 0;
  const barFilled = Math.min(10, Math.round(progressPct / 10));
  const progressBar = `${"#".repeat(barFilled)}${"-".repeat(10 - barFilled)}`;

  const handleCancel = async (bookingId: Id<"bookings">) => {
    setCancellingId(bookingId);
    setCancelError(null);
    try {
      const result = await cancelBooking({ bookingId });
      // If a waitlisted student was offered the freed seat, notify them.
      if (result.offeredBookingId) {
        void sendWaitlistOffer({
          bookingId: result.offeredBookingId,
          origin: window.location.origin,
        }).catch(() => {});
      }
      toast.success("Booking cancelled.");
    } catch (err) {
      setCancelError(
        err instanceof Error ? err.message : "Could not cancel the booking.",
      );
    } finally {
      setCancellingId(null);
    }
  };

  const handleCalendarExport = () => {
    const events = (bookings ?? [])
      .filter((b) => b.status !== "cancelled" && b.sessionStartsAt)
      .map((b) => ({
        uid: `agriskills-booking-${b._id}`,
        title: `AgriSkills Academy — ${b.courseTitle}`,
        description:
          b.status === "pending"
            ? "Payment pending — settle checkout to confirm your seat."
            : "Live training session.",
        location: b.sessionVenue ?? b.sessionJoinUrl ?? undefined,
        start: b.sessionStartsAt,
        end: b.sessionStartsAt + 60 * 60 * 1000,
      }));
    if (events.length === 0) {
      toast.error("No upcoming sessions to export.");
      return;
    }
    downloadIcs(events, "agriskills-my-sessions");
    toast.success("Calendar file downloaded — import it into any calendar app.");
  };

  const handleLeaveWaitlist = async (sessionId: Id<"sessions">) => {
    try {
      await leaveWaitlist({ sessionId });
      toast.success("Removed from the waitlist.");
    } catch (err) {
      setCancelError(
        err instanceof Error ? err.message : "Could not leave the waitlist.",
      );
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <AppHeader path="~/my-sessions" />

      <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
        <p className="text-xs text-term-green">
          [ok] signed in{user?.email ? ` — ${user.email}` : ""}
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">My Sessions</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Your bookings, waitlists, and training progress with AgriSkills
          Academy — all in one place.
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Button asChild size="sm" className="text-xs">
            <Link to="/courses">browse catalog</Link>
          </Button>
          {isAdmin && (
            <Button
              asChild
              variant="outline"
              size="sm"
              className="gap-1.5 text-xs"
            >
              <Link to="/admin">
                <ShieldCheck className="size-3.5" />
                admin console
              </Link>
            </Button>
          )}
        </div>

        {/* ── Progress ───────────────────────────────────────────── */}
        <div className="mt-8 flex items-center gap-2 text-sm">
          <span className="text-term-green">$</span>
          <span>cat progress.log</span>
        </div>

        <div className="mt-3 border border-border bg-card">
          <div className="flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="flex items-center gap-1.5 text-sm">
                <span className="font-semibold">
                  {completedCount} of {publishedCourses.length}
                </span>
                <span className="text-muted-foreground">courses completed</span>
              </p>
              <p className="mt-1.5 font-mono text-xs text-term-green">
                [{progressBar}] {progressPct}%
              </p>
              {completedCount > 0 && (
                <p className="mt-1.5 flex items-center gap-1 text-[11px] text-term-green">
                  <Award className="size-3" />
                  [ok] certified in {completedCount}{" "}
                  {completedCount === 1 ? "course" : "courses"} — view
                  certificates from the list below
                </p>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="gap-1.5 text-xs"
              >
                <Link to="/courses">
                  <Flag className="size-3.5" />
                  in-progress courses
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="gap-1.5 text-xs"
              >
                <Link to="/certificates">
                  <CheckCircle2 className="size-3.5" />
                  certificates
                </Link>
              </Button>
            </div>
          </div>

          {progress !== undefined && progress.length > 0 && (
            <div className="border-t border-border">
              {progress.map((entry) => (
                <div
                  key={entry._id}
                  className="flex items-center justify-between gap-3 border-b border-border px-4 py-2.5 last:border-b-0 hover:bg-accent/30"
                >
                  <Link
                    to={`/courses/${entry.courseSlug}`}
                    className="min-w-0 truncate text-sm font-medium underline-offset-4 hover:underline"
                  >
                    {entry.courseTitle}
                  </Link>
                  <span className="flex shrink-0 items-center gap-2">
                    {entry.status === "completed" && (
                      <Link
                        to={`/certificate/${entry.courseId}`}
                        className="flex items-center gap-1 text-[11px] text-term-green underline-offset-4 hover:underline"
                      >
                        <Award className="size-3" />
                        certificate
                      </Link>
                    )}
                    <span
                      className={`border px-1.5 py-0.5 text-[10px] font-medium ${
                        entry.status === "completed"
                          ? "border-term-green/40 bg-term-green/10 text-term-green"
                          : "border-term-amber/40 bg-term-amber/10 text-term-amber"
                      }`}
                    >
                      {entry.status === "completed"
                        ? "COMPLETED"
                        : "IN PROGRESS"}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          )}

          {progress !== undefined && progress.length === 0 && (
            <div className="border-t border-border px-4 py-4 text-center text-xs text-muted-foreground">
              <p>
                <span className="text-term-green">[ok]</span> no progress yet —
                open any course and mark it started or completed.
              </p>
            </div>
          )}
        </div>

        {/* ── Resume learning ──────────────────────────────────── */}
        {resumeEntries.length > 0 && (
          <>
            <div className="mt-8 flex items-center gap-2 text-sm">
              <span className="text-term-green">$</span>
              <span>ls resume/</span>
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {resumeEntries.map((entry) => (
                <Link
                  key={entry.courseId}
                  to={`/courses/${entry.courseSlug}?module=${entry.moduleIndex}`}
                  className="group border border-border bg-card transition-colors hover:border-term-green/50"
                >
                  <div className="flex items-center justify-between gap-2 border-b border-border bg-muted px-4 py-2">
                    <span className="truncate text-xs font-semibold">
                      {entry.courseTitle}
                    </span>
                    <span className="shrink-0 text-[10px] text-muted-foreground">
                      module {entry.moduleIndex + 1}/{entry.moduleCount}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3 px-4 py-3">
                    <span className="min-w-0 truncate text-xs text-muted-foreground">
                      next: {entry.moduleTitle || "keep reading"}
                    </span>
                    <span className="shrink-0 text-[11px] text-term-green transition-transform group-hover:translate-x-0.5">
                      resume {">"}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* ── Gamification ──────────────────────────────────────── */}
        <div className="mt-8 flex items-center gap-2 text-sm">
          <span className="text-term-green">$</span>
          <span>cat learner-profile.json</span>
          <span className="inline-block h-4 w-2 bg-foreground cursor-blink" />
        </div>

        <div className="mt-3 border border-border bg-card">
          <div className="grid gap-0 lg:grid-cols-[1.15fr_1fr]">
            <div className="border-b border-border lg:border-b-0 lg:border-r">
              <div className="flex items-center justify-between gap-2 border-b border-border bg-muted px-4 py-2.5">
                <span className="text-xs font-semibold">learner profile</span>
                <span className="text-[11px] text-muted-foreground">
                  points update live as you study
                </span>
              </div>
              {myStats === undefined || myStats === null ? (
                <div className="space-y-2 p-4">
                  <div className="h-4 animate-pulse bg-muted" />
                  <div className="h-4 animate-pulse bg-muted" />
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-px bg-border sm:grid-cols-4">
                    <Stat
                      icon={<Trophy className="size-3.5 text-term-amber" />}
                      label="points"
                      value={String(myStats.points)}
                    />
                    <Stat
                      icon={<Award className="size-3.5 text-term-green" />}
                      label="rank"
                      value={myStats.rank ? `#${myStats.rank}` : "—"}
                    />
                    <Stat
                      icon={
                        <Flame
                          className={`size-3.5 ${
                            myStats.streakDays >= 3
                              ? "text-term-amber"
                              : "text-muted-foreground"
                          }`}
                        />
                      }
                      label="streak"
                      value={`${myStats.streakDays} ${myStats.streakDays === 1 ? "day" : "days"}`}
                    />
                    <Stat
                      icon={<CheckCircle2 className="size-3.5 text-term-green" />}
                      label="courses done"
                      value={String(myStats.coursesCompleted)}
                    />
                  </div>
                  <div className="px-4 py-3">
                    <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                      badges ({myStats.badges.length}/
                      {Object.keys(BADGE_DEFS).length})
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {Object.entries(BADGE_DEFS).map(([id, def]) => {
                        const earned = myStats.badges.includes(id);
                        return (
                          <span
                            key={id}
                            title={`${def.label} — ${def.blurb}`}
                            className={`border px-1.5 py-0.5 text-[10px] font-medium ${
                              earned
                                ? "border-term-green/40 bg-term-green/10 text-term-green"
                                : "border-border bg-muted text-muted-foreground/50"
                            }`}
                          >
                            {def.label}
                          </span>
                        );
                      })}
                    </div>
                    <p className="mt-3 text-[11px] text-muted-foreground">
                      <span className="text-term-green">[ok]</span> +10 pass a
                      module quiz · +50 complete a course · +20 attend a
                      session · +5 book · +5 review
                    </p>
                  </div>
                </>
              )}
            </div>

            <div>
              <div className="border-b border-border bg-muted px-4 py-2.5">
                <span className="text-xs font-semibold">leaderboard</span>
                <span className="ml-2 text-[11px] text-muted-foreground">
                  top students this season
                </span>
              </div>
              {leaderboard === undefined && (
                <div className="space-y-2 p-4">
                  <div className="h-4 animate-pulse bg-muted" />
                  <div className="h-4 animate-pulse bg-muted" />
                </div>
              )}
              {leaderboard !== undefined && leaderboard.rows.length === 0 && (
                <div className="px-4 py-6 text-center text-xs text-muted-foreground">
                  <p>
                    <span className="text-term-green">[ok]</span> no points on
                    the board yet — pass a quiz and start the climb.
                  </p>
                </div>
              )}
              {leaderboard !== undefined && leaderboard.rows.length > 0 && (
                <div>
                  {leaderboard.rows.map((row) => (
                    <div
                      key={row.rank}
                      className="flex items-center justify-between gap-2 border-b border-border px-4 py-2 text-xs last:border-b-0 hover:bg-accent/30"
                    >
                      <span className="flex min-w-0 items-center gap-2">
                        <span className="w-7 shrink-0 font-mono text-term-green">
                          #{row.rank}
                        </span>
                        <span className="truncate font-medium">{row.name}</span>
                        {row.rank === 1 && (
                          <Trophy className="size-3 shrink-0 text-term-amber" />
                        )}
                      </span>
                      <span className="flex shrink-0 items-center gap-2">
                        <span className="text-muted-foreground">
                          {row.points} pts
                        </span>
                        {row.streakDays >= 3 && (
                          <Flame className="size-3 text-term-amber" />
                        )}
                      </span>
                    </div>
                  ))}
                  {leaderboard.myRank && (
                    <div className="flex items-center justify-between gap-2 bg-term-green/5 px-4 py-2 text-xs">
                      <span className="flex min-w-0 items-center gap-2">
                        <span className="w-7 shrink-0 font-mono text-term-green">
                          #{leaderboard.myRank}
                        </span>
                        <span className="truncate font-semibold">you</span>
                      </span>
                      <span className="text-muted-foreground">
                        {leaderboard.myPoints} pts
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Bookings ───────────────────────────────────────────── */}
        {/* ── Learner insights ──────────────────────────────────── */}
        <div className="mt-8 flex items-center gap-2 text-sm">
          <span className="text-term-green">$</span>
          <span>cat insights.log</span>
          <span className="inline-block h-4 w-2 bg-foreground cursor-blink" />
        </div>

        <div className="mt-3 border border-border bg-card">
          {insights === undefined && (
            <div className="space-y-2 p-4">
              <div className="h-4 animate-pulse bg-muted" />
              <div className="h-4 animate-pulse bg-muted" />
            </div>
          )}
          {insights !== undefined && insights !== null && insights.length === 0 && (
            <div className="px-4 py-8 text-center text-xs text-muted-foreground">
              <p>
                <span className="text-term-green">[ok]</span> no quiz data yet
                — take a module quiz and your review targets show up here.
              </p>
            </div>
          )}
          {insights !== undefined && insights !== null && insights.length > 0 && (
            <div>
              <div className="grid grid-cols-[1fr_4rem_6rem_auto] items-center gap-3 border-b border-border bg-muted px-4 py-2 text-[11px] uppercase tracking-wider text-muted-foreground sm:grid-cols-[1fr_4rem_6rem_14rem_auto]">
                <span>course</span>
                <span className="text-right">best</span>
                <span className="text-right">attempts</span>
                <span className="hidden text-right sm:block">last 5 scores</span>
                <span className="w-24 text-right">review</span>
              </div>
              {insights.map((row) => (
                <div
                  key={row.courseId}
                  className="border-b border-border last:border-b-0"
                >
                  <div className="grid grid-cols-[1fr_4rem_6rem_auto] items-center gap-3 px-4 py-2.5 sm:grid-cols-[1fr_4rem_6rem_14rem_auto]">
                    <Link
                      to={`/courses/${row.courseSlug}`}
                      className="min-w-0 truncate text-sm font-medium underline-offset-4 hover:underline"
                    >
                      {row.courseTitle}
                    </Link>
                    <span
                      className={`text-right text-sm font-semibold ${
                        row.bestScore >= 70
                          ? "text-term-green"
                          : "text-term-amber"
                      }`}
                    >
                      {row.bestScore}%
                    </span>
                    <span className="text-right text-xs text-muted-foreground">
                      {row.attempts}
                    </span>
                    <span className="hidden items-center justify-end gap-1 sm:flex">
                      {row.lastScores.map((score, index) => (
                        <span
                          key={`${score.createdAt}-${index}`}
                          title={`${score.score}% ${
                            score.passed ? "passed" : "failed"
                          }`}
                          className={`flex h-6 w-6 items-center justify-center border font-mono text-[10px] ${
                            score.passed
                              ? "border-term-green/40 bg-term-green/10 text-term-green"
                              : "border-term-amber/40 bg-term-amber/10 text-term-amber"
                          }`}
                        >
                          {score.score}
                        </span>
                      ))}
                    </span>
                    <span className="flex w-24 justify-end">
                      {row.weakTopics.length > 0 ? (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="h-7 text-[11px]"
                          onClick={() => setReviewCourse(row.courseId)}
                        >
                          {reviewCourse === row.courseId
                            ? "hide topics"
                            : `${row.weakTopics.length} to review`}
                        </Button>
                      ) : (
                        <span className="text-[10px] text-term-green">
                          [ok] none
                        </span>
                      )}
                    </span>
                  </div>
                  {reviewCourse === row.courseId && row.weakTopics.length > 0 && (
                    <div className="space-y-1.5 border-t border-border bg-muted/30 px-4 py-3">
                      <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                        review these — questions you've missed
                      </p>
                      {row.weakTopics.map((topic, index) => (
                        <div
                          key={`${topic.question}-${index}`}
                          className="flex items-start justify-between gap-3 border border-border bg-card px-3 py-2 text-xs"
                        >
                          <span className="min-w-0">
                            <span className="block font-medium">
                              {topic.question}
                            </span>
                            <span className="mt-0.5 block text-[10px] text-muted-foreground">
                              quiz: {topic.moduleTitle}
                            </span>
                          </span>
                          <span className="shrink-0 font-mono text-[10px] text-term-amber">
                            missed {topic.timesWrong}{" "}
                            {topic.timesWrong === 1 ? "time" : "times"}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 flex items-center justify-between gap-3 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-term-green">$</span>
            <span>ls bookings/</span>
            <span className="inline-block h-4 w-2 bg-foreground cursor-blink" />
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-7 gap-1.5 text-[11px]"
            onClick={handleCalendarExport}
          >
            <CalendarPlus className="size-3.5" />
            add to calendar (.ics)
          </Button>
        </div>

        <div className="mt-3 border border-border bg-card">
          <div className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-3 border-b border-border bg-muted px-4 py-2 text-[11px] uppercase tracking-wider text-muted-foreground sm:grid-cols-[1.4fr_1fr_6rem_6rem_auto]">
            <span>course</span>
            <span className="hidden sm:block">session</span>
            <span className="text-right">amount</span>
            <span className="text-right">status</span>
            <span className="w-16 text-right">action</span>
          </div>

          {bookings === undefined && (
            <div className="space-y-0">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[1fr_auto] items-center gap-3 border-b border-border px-4 py-3 last:border-b-0"
                >
                  <div className="h-3 animate-pulse bg-muted" />
                  <div className="h-3 w-20 animate-pulse bg-muted" />
                </div>
              ))}
            </div>
          )}

          {bookings !== undefined && bookings !== null && bookings.length === 0 && (
            <div className="px-4 py-10 text-center text-sm text-muted-foreground">
              <p>
                <span className="text-term-green">[ok]</span> no bookings yet —
                open the catalog and reserve your first session.
              </p>
              <Button asChild variant="outline" size="sm" className="mt-4 text-xs">
                <Link to="/courses">browse catalog</Link>
              </Button>
            </div>
          )}

          {bookings !== undefined &&
            bookings !== null &&
            bookings.length > 0 &&
            bookings.map((booking) => (
              <div
                key={booking._id}
                className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-3 border-b border-border px-4 py-3 last:border-b-0 hover:bg-accent/30 sm:grid-cols-[1.4fr_1fr_6rem_6rem_auto]"
              >
                <span className="min-w-0">
                  <Link
                    to={`/courses/${booking.courseSlug}`}
                    className="block truncate text-sm font-medium underline-offset-4 hover:underline"
                  >
                    {booking.courseTitle}
                  </Link>
                  <span className="mt-0.5 flex items-center gap-1 text-[11px] text-muted-foreground sm:hidden">
                    <CalendarDays className="size-3" />
                    {booking.sessionStartsAt
                      ? formatSession(booking.sessionStartsAt)
                      : "session removed"}
                  </span>
                  {booking.sessionVenue && (
                    <span className="mt-0.5 block truncate text-[10px] text-muted-foreground/75 sm:hidden">
                      @ {booking.sessionVenue}
                    </span>
                  )}
                </span>
                <span className="hidden items-center gap-1.5 text-xs text-muted-foreground sm:flex">
                  <CalendarDays className="size-3.5 shrink-0" />
                  {booking.sessionStartsAt
                    ? formatSession(booking.sessionStartsAt)
                    : "session removed"}
                  {booking.sessionVenue && (
                    <span className="truncate text-[10px] text-muted-foreground/75">
                      @ {booking.sessionVenue}
                    </span>
                  )}
                </span>
                <span className="text-right text-xs text-muted-foreground">
                  {formatMoney(booking.amountCents)}
                </span>
                <span className="flex justify-end gap-1.5">
                  {booking.attendedAt && (
                    <span className="border border-term-green/40 bg-term-green/10 px-1.5 py-0.5 text-[10px] font-medium text-term-green">
                      ATTENDED
                    </span>
                  )}
                  <StatusBadge
                    status={booking.status}
                    paymentStatus={booking.paymentStatus}
                  />
                </span>
                <span className="flex w-16 justify-end">
                  {booking.status !== "cancelled" &&
                    booking.paymentStatus === "unpaid" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 px-2 text-[11px]"
                        disabled={cancellingId === booking._id}
                        onClick={() => handleCancel(booking._id)}
                      >
                        {cancellingId === booking._id ? (
                          <Loader2 className="size-3 animate-spin" />
                        ) : (
                          "cancel"
                        )}
                      </Button>
                    )}
                  {booking.status === "pending" && (
                    <Button
                      asChild
                      variant="default"
                      size="sm"
                      className="h-7 px-2 text-[11px]"
                    >
                      <Link to={`/booking/${booking._id}`}>pay</Link>
                    </Button>
                  )}
                  {booking.status === "confirmed" && (
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="h-7 px-2 text-[11px]"
                    >
                      <Link to={`/booking/${booking._id}`}>view</Link>
                    </Button>
                  )}
                </span>
              </div>
            ))}
        </div>

        {/* ── Waitlist ───────────────────────────────────────────── */}
        <div className="mt-8 flex items-center gap-2 text-sm">
          <span className="text-term-green">$</span>
          <span>ls waitlist/</span>
        </div>

        <div className="mt-3 border border-border bg-card">
          {waitlists === undefined && (
            <div className="space-y-2 p-4">
              <div className="h-4 animate-pulse bg-muted" />
            </div>
          )}
          {waitlists !== undefined && waitlists !== null && waitlists.length === 0 && (
            <div className="px-4 py-6 text-center text-xs text-muted-foreground">
              <p>
                <span className="text-term-green">[ok]</span> not on any
                waitlists. Full sessions accept waitlist entries on the course
                page.
              </p>
            </div>
          )}
          {waitlists !== undefined &&
            waitlists !== null &&
            waitlists.length > 0 &&
            waitlists.map((entry) => (
              <div
                key={entry._id}
                className="flex items-center justify-between gap-3 border-b border-border px-4 py-2.5 last:border-b-0 hover:bg-accent/30"
              >
                <span className="min-w-0">
                  <Link
                    to={`/courses/${entry.courseSlug}`}
                    className="block truncate text-sm font-medium underline-offset-4 hover:underline"
                  >
                    {entry.courseTitle}
                  </Link>
                  <span className="mt-0.5 flex items-center gap-1 text-[11px] text-muted-foreground">
                    <CalendarDays className="size-3" />
                    {entry.sessionStartsAt
                      ? formatSession(entry.sessionStartsAt)
                      : "session removed"}
                  </span>
                </span>
                <span className="flex shrink-0 items-center gap-3">
                  <span className="border border-term-amber/40 bg-term-amber/10 px-1.5 py-0.5 text-[10px] font-medium text-term-amber">
                    #{entry.position}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 gap-1 px-2 text-[11px]"
                    onClick={() => handleLeaveWaitlist(entry.sessionId)}
                  >
                    <ListMinus className="size-3" />
                    leave
                  </Button>
                </span>
              </div>
            ))}
        </div>

        {cancelError && (
          <p className="mt-3 border border-term-amber/40 bg-term-amber/[0.07] px-3 py-2 text-xs text-term-amber">
            {cancelError}
          </p>
        )}

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
          <p>
            <span className="text-term-green">[ok]</span>{" "}
            {bookings?.length ?? "…"} bookings ·{" "}
            {waitlists?.length ?? "…"} waitlists · synced live
          </p>
          <p>
            <span className="text-term-green">[ok]</span> freed seats go to the
            waitlist automatically
          </p>
        </div>
      </div>
    </main>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-card px-4 py-3">
      <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
        {icon}
        {label}
      </p>
      <p className="mt-1 font-mono text-xl font-semibold">{value}</p>
    </div>
  );
}

function StatusBadge({
  status,
  paymentStatus,
}: {
  status: string;
  paymentStatus: string;
}) {
  if (status === "confirmed") {
    return (
      <span className="border border-term-green/40 bg-term-green/10 px-2 py-0.5 text-[10px] font-medium text-term-green">
        {paymentStatus === "paid" ? "PAID" : "CONFIRMED"}
      </span>
    );
  }
  if (status === "pending") {
    return (
      <span className="border border-term-amber/40 bg-term-amber/10 px-2 py-0.5 text-[10px] font-medium text-term-amber">
        PENDING
      </span>
    );
  }
  return (
    <span className="border border-border bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
      CANCELLED
    </span>
  );
}
