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
  Bell,
  CalendarDays,
  CalendarPlus,
  CheckCircle2,
  ChevronRight,
  Flame,
  Flag,
  Lightbulb,
  ListMinus,
  Loader2,
  ShieldCheck,
  Sparkles,
  Sprout,
  Trophy,
  Users,
  ClipboardList,
  Handshake,
  TrendingUp,
  Medal,
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
  const nudges = useQuery(api.nudges.myNudges);
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
      <AppHeader path="/dashboard" />

      <div className="mx-auto w-full max-w-5xl px-5 py-10 sm:px-8">
        {/* ── Header ────────────────────────────────────────────── */}
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Dashboard</h1>
              {user?.email && (
                <span className="rounded-full bg-agri-green/10 px-2.5 py-0.5 text-xs font-medium text-agri-green">
                  Signed in
                </span>
              )}
            </div>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Your courses, progress, bookings, and learning tools — all in one
              place.
            </p>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2 sm:mt-0">
            <Button asChild size="sm" className="rounded-xl text-sm">
              <Link to="/courses">Browse catalog</Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="rounded-xl text-sm">
              <Link to="/farm-hub">Farm dashboard</Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="rounded-xl text-sm">
              <Link to="/gamification">Gamification</Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="rounded-xl text-sm">
              <Link to="/ai-assistant">AI assistant</Link>
            </Button>
            {isAdmin && (
              <Button
                asChild
                variant="outline"
                size="sm"
                className="gap-1.5 rounded-xl text-sm"
              >
                <Link to="/admin">
                  <ShieldCheck className="size-4" />
                  Admin console
                </Link>
              </Button>
            )}
          </div>
        </div>

        {/* ── Quick Access to New Features */}
        <div className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-6">
          {[
            { to: "/nudges", label: "Nudges", icon: Bell },
            { to: "/assessments", label: "Assessments", icon: ClipboardList },
            { to: "/peer-teaching", label: "Peer Teach", icon: Handshake },
            { to: "/farm-progress", label: "Farm Progress", icon: TrendingUp },
            { to: "/buddies", label: "Buddies", icon: Users },
            { to: "/badges", label: "Badges", icon: Medal },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="group flex flex-col items-center gap-2 rounded-2xl border border-border/60 bg-card p-4 transition-colors hover:border-agri-green/40 card-hover"
            >
              <div className="flex size-10 items-center justify-center rounded-xl bg-agri-green/10 text-agri-green transition-colors group-hover:bg-agri-green/15">
                <item.icon className="size-5" />
              </div>
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          ))}
        </div>

        {/* ── Progress ───────────────────────────────────────────── */}
        <div className="mt-10">
          <SectionHeading icon={<Flag className="size-4" />} title="Progress" />

          <div className="mt-3 rounded-2xl border border-border/60 bg-card">
            <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="flex items-center gap-2 text-sm">
                  <span className="text-base font-semibold">
                    {completedCount} of {publishedCourses.length}
                  </span>
                  <span className="text-muted-foreground">courses completed</span>
                </p>
                {/* Modern progress bar */}
                <div className="mt-3 flex items-center gap-3">
                  <div className="h-2 flex-1 rounded-full bg-muted">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-agri-green to-agri-leaf transition-all"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-agri-green">{progressPct}%</span>
                </div>
                {completedCount > 0 && (
                  <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Award className="size-3.5 text-agri-green" />
                    Certified in {completedCount}{" "}
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
                  className="gap-1.5 rounded-xl text-sm"
                >
                  <Link to="/courses">
                    <Flag className="size-4" />
                    In-progress courses
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="gap-1.5 rounded-xl text-sm"
                >
                  <Link to="/certificates">
                    <CheckCircle2 className="size-4" />
                    Certificates
                  </Link>
                </Button>
              </div>
            </div>

            {progress !== undefined && progress.length > 0 && (
              <div className="border-t border-border/60">
                {progress.map((entry) => (
                  <div
                    key={entry._id}
                    className="flex items-center justify-between gap-3 border-b border-border/40 px-5 py-3 last:border-b-0 transition-colors hover:bg-accent/30"
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
                          className="flex items-center gap-1 text-xs text-agri-green underline-offset-4 hover:underline"
                        >
                          <Award className="size-3.5" />
                          Certificate
                        </Link>
                      )}
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          entry.status === "completed"
                            ? "bg-agri-green/10 text-agri-green"
                            : "bg-agri-amber/10 text-agri-amber"
                        }`}
                      >
                        {entry.status === "completed"
                          ? "Completed"
                          : "In Progress"}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            )}

            {progress !== undefined && progress.length === 0 && (
              <div className="border-t border-border/60 px-5 py-8 text-center">
                <div className="mx-auto mb-3 flex size-10 items-center justify-center rounded-xl bg-agri-green/10">
                  <CheckCircle2 className="size-5 text-agri-green" />
                </div>
                <p className="text-sm text-muted-foreground">
                  No progress yet — open any course and mark it started or
                  completed.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ── Resume learning ──────────────────────────────────── */}
        {resumeEntries.length > 0 && (
          <div className="mt-10">
            <SectionHeading icon={<Sprout className="size-4" />} title="Resume Learning" />
            <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {resumeEntries.map((entry) => (
                <Link
                  key={entry.courseId}
                  to={`/courses/${entry.courseSlug}?module=${entry.moduleIndex}`}
                  className="group rounded-2xl border border-border/60 bg-card p-5 transition-all hover:border-agri-green/40 card-hover"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="min-w-0 truncate text-sm font-semibold">
                      {entry.courseTitle}
                    </span>
                    <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                      {entry.moduleIndex + 1}/{entry.moduleCount}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <span className="min-w-0 truncate text-xs text-muted-foreground">
                      Next: {entry.moduleTitle || "keep reading"}
                    </span>
                    <span className="shrink-0 flex items-center gap-1 text-xs font-medium text-agri-green transition-transform group-hover:translate-x-0.5">
                      Resume <ChevronRight className="size-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ── Gamification ──────────────────────────────────────── */}
        <div className="mt-10">
          <SectionHeading icon={<Trophy className="size-4" />} title="Learner Profile" badge="Gamification" />

          <div className="mt-3 rounded-2xl border border-border/60 bg-card">
            <div className="grid gap-0 lg:grid-cols-[1.15fr_1fr]">
              <div className="border-b border-border/40 lg:border-b-0 lg:border-r">
                {myStats === undefined || myStats === null ? (
                  <div className="space-y-3 p-5">
                    <div className="h-5 w-3/4 animate-pulse rounded-lg bg-muted" />
                    <div className="h-5 w-1/2 animate-pulse rounded-lg bg-muted" />
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-3 p-5 sm:grid-cols-4">
                      <StatCard
                        icon={<Trophy className="size-5 text-agri-amber" />}
                        iconBg="bg-agri-amber/10"
                        label="Points"
                        value={String(myStats.points)}
                      />
                      <StatCard
                        icon={<Award className="size-5 text-agri-green" />}
                        iconBg="bg-agri-green/10"
                        label="Rank"
                        value={myStats.rank ? `#${myStats.rank}` : "—"}
                      />
                      <StatCard
                        icon={
                          <Flame
                            className={`size-5 ${
                              myStats.streakDays >= 3
                                ? "text-agri-amber"
                                : "text-muted-foreground"
                            }`}
                          />
                        }
                        iconBg={myStats.streakDays >= 3 ? "bg-agri-amber/10" : "bg-muted"}
                        label="Streak"
                        value={`${myStats.streakDays} ${myStats.streakDays === 1 ? "day" : "days"}`}
                      />
                      <StatCard
                        icon={<CheckCircle2 className="size-5 text-agri-green" />}
                        iconBg="bg-agri-green/10"
                        label="Courses done"
                        value={String(myStats.coursesCompleted)}
                      />
                    </div>
                    <div className="border-t border-border/40 px-5 py-4">
                      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Badges ({myStats.badges.length}/
                        {Object.keys(BADGE_DEFS).length})
                      </p>
                      <div className="mt-2.5 flex flex-wrap gap-2">
                        {Object.entries(BADGE_DEFS).map(([id, def]) => {
                          const earned = myStats.badges.includes(id);
                          return (
                            <span
                              key={id}
                              title={`${def.label} — ${def.blurb}`}
                              className={`rounded-lg px-2.5 py-1 text-xs font-medium ${
                                earned
                                  ? "bg-agri-green/10 text-agri-green"
                                  : "bg-muted text-muted-foreground/50"
                              }`}
                            >
                              {def.label}
                            </span>
                          );
                        })}
                      </div>
                      <p className="mt-3 text-xs text-muted-foreground">
                        +10 pass a module quiz · +50 complete a course · +20 attend a
                        session · +5 book · +5 review
                      </p>
                    </div>
                  </>
                )}
              </div>

              <div>
                <div className="border-b border-border/40 px-5 py-3">
                  <span className="text-sm font-semibold">Leaderboard</span>
                  <span className="ml-2 text-xs text-muted-foreground">
                    top students this season
                  </span>
                </div>
                {leaderboard === undefined && (
                  <div className="space-y-3 p-5">
                    <div className="h-5 w-3/4 animate-pulse rounded-lg bg-muted" />
                    <div className="h-5 w-1/2 animate-pulse rounded-lg bg-muted" />
                  </div>
                )}
                {leaderboard !== undefined && leaderboard.rows.length === 0 && (
                  <div className="px-5 py-8 text-center">
                    <div className="mx-auto mb-3 flex size-10 items-center justify-center rounded-xl bg-agri-green/10">
                      <Trophy className="size-5 text-agri-green" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      No points on the board yet — pass a quiz and start the
                      climb.
                    </p>
                  </div>
                )}
                {leaderboard !== undefined && leaderboard.rows.length > 0 && (
                  <div>
                    {leaderboard.rows.map((row) => (
                      <div
                        key={row.rank}
                        className="flex items-center justify-between gap-2 border-b border-border/40 px-5 py-2.5 text-sm last:border-b-0 transition-colors hover:bg-accent/30"
                      >
                        <span className="flex min-w-0 items-center gap-2">
                          <span className="w-7 shrink-0 font-semibold text-agri-green">
                            #{row.rank}
                          </span>
                          <span className="truncate font-medium">{row.name}</span>
                          {row.rank === 1 && (
                            <Trophy className="size-3.5 shrink-0 text-agri-amber" />
                          )}
                        </span>
                        <span className="flex shrink-0 items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            {row.points} pts
                          </span>
                          {row.streakDays >= 3 && (
                            <Flame className="size-3.5 text-agri-amber" />
                          )}
                        </span>
                      </div>
                    ))}
                    {leaderboard.myRank && (
                      <div className="flex items-center justify-between gap-2 border-t-2 border-agri-green/20 bg-agri-green/5 px-5 py-2.5 text-sm">
                        <span className="flex min-w-0 items-center gap-2">
                          <span className="w-7 shrink-0 font-semibold text-agri-green">
                            #{leaderboard.myRank}
                          </span>
                          <span className="truncate font-semibold">You</span>
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {leaderboard.myPoints} pts
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Smart Nudges ────────────────────────────────────── */}
        {nudges && nudges.length > 0 && (
          <div className="mt-10">
            <SectionHeading icon={<Bell className="size-4" />} title="Smart Nudges" />
            <div className="mt-3 space-y-3">
              {nudges.map((nudge) => (
                <Link
                  key={nudge.id}
                  to={nudge.actionLink}
                  className={`flex items-start gap-3 rounded-2xl border p-4 transition-colors hover:border-agri-green/40 ${
                    nudge.priority === "high"
                      ? "border-agri-amber/40 bg-agri-amber/[0.03]"
                      : "border-border/60 bg-card card-hover"
                  }`}
                >
                  <div className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${
                    nudge.priority === "high"
                      ? "bg-agri-amber/10 text-lg"
                      : "bg-agri-green/10 text-lg"
                  }`}>
                    {nudge.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold">{nudge.title}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                      {nudge.message}
                    </p>
                  </div>
                  <span className="shrink-0 flex items-center gap-1 text-xs font-medium text-agri-green">
                    {nudge.action} <ChevronRight className="size-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ── Learner insights ──────────────────────────────────── */}
        <div className="mt-10">
          <SectionHeading icon={<Lightbulb className="size-4" />} title="Learner Insights" badge="Quiz Review" />

          <div className="mt-3 rounded-2xl border border-border/60 bg-card">
            {insights === undefined && (
              <div className="space-y-3 p-5">
                <div className="h-5 w-3/4 animate-pulse rounded-lg bg-muted" />
                <div className="h-5 w-1/2 animate-pulse rounded-lg bg-muted" />
              </div>
            )}
            {insights !== undefined && insights !== null && insights.length === 0 && (
              <div className="px-5 py-10 text-center">
                <div className="mx-auto mb-3 flex size-10 items-center justify-center rounded-xl bg-agri-green/10">
                  <Lightbulb className="size-5 text-agri-green" />
                </div>
                <p className="text-sm text-muted-foreground">
                  No quiz data yet — take a module quiz and your review targets
                  show up here.
                </p>
              </div>
            )}
            {insights !== undefined && insights !== null && insights.length > 0 && (
              <div>
                <div className="grid grid-cols-[1fr_4rem_6rem_auto] items-center gap-3 border-b border-border/40 px-5 py-2.5 text-xs font-medium uppercase tracking-wider text-muted-foreground sm:grid-cols-[1fr_4rem_6rem_14rem_auto]">
                  <span>Course</span>
                  <span className="text-right">Best</span>
                  <span className="text-right">Attempts</span>
                  <span className="hidden text-right sm:block">Last 5 scores</span>
                  <span className="w-24 text-right">Review</span>
                </div>
                {insights.map((row) => (
                  <div
                    key={row.courseId}
                    className="border-b border-border/40 last:border-b-0"
                  >
                    <div className="grid grid-cols-[1fr_4rem_6rem_auto] items-center gap-3 px-5 py-3 sm:grid-cols-[1fr_4rem_6rem_14rem_auto]">
                      <Link
                        to={`/courses/${row.courseSlug}`}
                        className="min-w-0 truncate text-sm font-medium underline-offset-4 hover:underline"
                      >
                        {row.courseTitle}
                      </Link>
                      <span
                        className={`text-right text-sm font-semibold ${
                          row.bestScore >= 70
                            ? "text-agri-green"
                            : "text-agri-amber"
                        }`}
                      >
                        {row.bestScore}%
                      </span>
                      <span className="text-right text-sm text-muted-foreground">
                        {row.attempts}
                      </span>
                      <span className="hidden items-center justify-end gap-1.5 sm:flex">
                        {row.lastScores.map((score, index) => (
                          <span
                            key={`${score.createdAt}-${index}`}
                            title={`${score.score}% ${
                              score.passed ? "passed" : "failed"
                            }`}
                            className={`flex h-7 w-7 items-center justify-center rounded-lg text-xs font-medium ${
                              score.passed
                                ? "bg-agri-green/10 text-agri-green"
                                : "bg-agri-amber/10 text-agri-amber"
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
                            className="rounded-xl text-xs"
                            onClick={() => setReviewCourse(row.courseId)}
                          >
                            {reviewCourse === row.courseId
                              ? "Hide topics"
                              : `${row.weakTopics.length} to review`}
                          </Button>
                        ) : (
                          <span className="flex items-center gap-1 text-xs text-agri-green">
                            <CheckCircle2 className="size-3.5" />
                            None
                          </span>
                        )}
                      </span>
                    </div>
                    {reviewCourse === row.courseId && row.weakTopics.length > 0 && (
                      <div className="space-y-2 border-t border-border/40 bg-muted/30 px-5 py-4">
                        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                          Review these — questions you&apos;ve missed
                        </p>
                        {row.weakTopics.map((topic, index) => (
                          <div
                            key={`${topic.question}-${index}`}
                            className="flex items-start justify-between gap-3 rounded-xl border border-border/60 bg-card px-4 py-3"
                          >
                            <span className="min-w-0">
                              <span className="block text-sm font-medium">
                                {topic.question}
                              </span>
                              <span className="mt-0.5 block text-xs text-muted-foreground">
                                Quiz: {topic.moduleTitle}
                              </span>
                            </span>
                            <span className="shrink-0 text-xs font-medium text-agri-amber">
                              Missed {topic.timesWrong}{" "}
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
        </div>

        {/* ── Bookings ─────────────────────────────────────────── */}
        <div className="mt-10">
          <div className="flex items-center justify-between gap-3">
            <SectionHeading icon={<CalendarDays className="size-4" />} title="Bookings" />
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 rounded-xl text-sm"
              onClick={handleCalendarExport}
            >
              <CalendarPlus className="size-4" />
              Export calendar (.ics)
            </Button>
          </div>

          <div className="mt-3 rounded-2xl border border-border/60 bg-card">
            <div className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-3 border-b border-border/40 px-5 py-2.5 text-xs font-medium uppercase tracking-wider text-muted-foreground sm:grid-cols-[1.4fr_1fr_6rem_6rem_auto]">
              <span>Course</span>
              <span className="hidden sm:block">Session</span>
              <span className="text-right">Amount</span>
              <span className="text-right">Status</span>
              <span className="w-16 text-right">Action</span>
            </div>

            {bookings === undefined && (
              <div className="space-y-0">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-[1fr_auto] items-center gap-3 border-b border-border/40 px-5 py-4 last:border-b-0"
                  >
                    <div className="h-4 w-3/4 animate-pulse rounded-lg bg-muted" />
                    <div className="h-4 w-20 animate-pulse rounded-lg bg-muted" />
                  </div>
                ))}
              </div>
            )}

            {bookings !== undefined && bookings !== null && bookings.length === 0 && (
              <div className="px-5 py-12 text-center">
                <div className="mx-auto mb-3 flex size-10 items-center justify-center rounded-xl bg-agri-green/10">
                  <CalendarDays className="size-5 text-agri-green" />
                </div>
                <p className="text-sm text-muted-foreground">
                  No bookings yet — open the catalog and reserve your first
                  session.
                </p>
                <Button asChild variant="outline" size="sm" className="mt-4 rounded-xl text-sm">
                  <Link to="/courses">Browse catalog</Link>
                </Button>
              </div>
            )}

            {bookings !== undefined &&
              bookings !== null &&
              bookings.length > 0 &&
              bookings.map((booking) => (
                <div
                  key={booking._id}
                  className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-3 border-b border-border/40 px-5 py-3 last:border-b-0 transition-colors hover:bg-accent/30 sm:grid-cols-[1.4fr_1fr_6rem_6rem_auto]"
                >
                  <span className="min-w-0">
                    <Link
                      to={`/courses/${booking.courseSlug}`}
                      className="block truncate text-sm font-medium underline-offset-4 hover:underline"
                    >
                      {booking.courseTitle}
                    </Link>
                    <span className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground sm:hidden">
                      <CalendarDays className="size-3.5" />
                      {booking.sessionStartsAt
                        ? formatSession(booking.sessionStartsAt)
                        : "Session removed"}
                    </span>
                    {booking.sessionVenue && (
                      <span className="mt-0.5 block truncate text-xs text-muted-foreground/75 sm:hidden">
                        @ {booking.sessionVenue}
                      </span>
                    )}
                  </span>
                  <span className="hidden items-center gap-1.5 text-sm text-muted-foreground sm:flex">
                    <CalendarDays className="size-4 shrink-0" />
                    {booking.sessionStartsAt
                      ? formatSession(booking.sessionStartsAt)
                      : "Session removed"}
                    {booking.sessionVenue && (
                      <span className="truncate text-xs text-muted-foreground/75">
                        @ {booking.sessionVenue}
                      </span>
                    )}
                  </span>
                  <span className="text-right text-sm text-muted-foreground">
                    {formatMoney(booking.amountCents)}
                  </span>
                  <span className="flex justify-end gap-1.5">
                    {booking.attendedAt && (
                      <span className="rounded-full bg-agri-green/10 px-2 py-0.5 text-xs font-medium text-agri-green">
                        Attended
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
                          className="rounded-xl px-2.5 text-xs"
                          disabled={cancellingId === booking._id}
                          onClick={() => handleCancel(booking._id)}
                        >
                          {cancellingId === booking._id ? (
                            <Loader2 className="size-3.5 animate-spin" />
                          ) : (
                            "Cancel"
                          )}
                        </Button>
                      )}
                    {booking.status === "pending" && (
                      <Button
                        asChild
                        variant="default"
                        size="sm"
                        className="rounded-xl px-2.5 text-xs"
                      >
                        <Link to={`/booking/${booking._id}`}>Pay</Link>
                      </Button>
                    )}
                    {booking.status === "confirmed" && (
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="rounded-xl px-2.5 text-xs"
                      >
                        <Link to={`/booking/${booking._id}`}>View</Link>
                      </Button>
                    )}
                  </span>
                </div>
              ))}
          </div>
        </div>

        {/* ── Waitlist ───────────────────────────────────────────── */}
        <div className="mt-10">
          <SectionHeading icon={<Sparkles className="size-4" />} title="Waitlist" />

          <div className="mt-3 rounded-2xl border border-border/60 bg-card">
            {waitlists === undefined && (
              <div className="p-5">
                <div className="h-5 w-3/4 animate-pulse rounded-lg bg-muted" />
              </div>
            )}
            {waitlists !== undefined && waitlists !== null && waitlists.length === 0 && (
              <div className="px-5 py-8 text-center">
                <div className="mx-auto mb-3 flex size-10 items-center justify-center rounded-xl bg-agri-green/10">
                  <CheckCircle2 className="size-5 text-agri-green" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Not on any waitlists. Full sessions accept waitlist entries on
                  the course page.
                </p>
              </div>
            )}
            {waitlists !== undefined &&
              waitlists !== null &&
              waitlists.length > 0 &&
              waitlists.map((entry) => (
                <div
                  key={entry._id}
                  className="flex items-center justify-between gap-3 border-b border-border/40 px-5 py-3 last:border-b-0 transition-colors hover:bg-accent/30"
                >
                  <span className="min-w-0">
                    <Link
                      to={`/courses/${entry.courseSlug}`}
                      className="block truncate text-sm font-medium underline-offset-4 hover:underline"
                    >
                      {entry.courseTitle}
                    </Link>
                    <span className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                      <CalendarDays className="size-3.5" />
                      {entry.sessionStartsAt
                        ? formatSession(entry.sessionStartsAt)
                        : "Session removed"}
                    </span>
                  </span>
                  <span className="flex shrink-0 items-center gap-3">
                    <span className="rounded-full bg-agri-amber/10 px-2.5 py-0.5 text-xs font-medium text-agri-amber">
                      #{entry.position}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1 rounded-xl px-3 text-xs"
                      onClick={() => handleLeaveWaitlist(entry.sessionId)}
                    >
                      <ListMinus className="size-3.5" />
                      Leave
                    </Button>
                  </span>
                </div>
              ))}
          </div>
        </div>

        {cancelError && (
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-agri-amber/40 bg-agri-amber/[0.05] px-4 py-3 text-sm text-agri-amber">
            <span>⚠</span>
            {cancelError}
          </div>
        )}

        <div className="mt-6 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
          <p>
            {bookings?.length ?? "…"} bookings ·{" "}
            {waitlists?.length ?? "…"} waitlists · synced live
          </p>
          <p>Freed seats go to the waitlist automatically</p>
        </div>
      </div>
    </main>
  );
}

/* ── Helper components ────────────────────────────────────────── */

function SectionHeading({
  icon,
  title,
  badge,
}: {
  icon: ReactNode;
  title: string;
  badge?: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex size-8 items-center justify-center rounded-lg bg-agri-green/10 text-agri-green">
        {icon}
      </div>
      <h2 className="text-base font-semibold">{title}</h2>
      {badge && (
        <span className="rounded-full bg-agri-green/10 px-2.5 py-0.5 text-xs font-medium text-agri-green">
          {badge}
        </span>
      )}
    </div>
  );
}

function StatCard({
  icon,
  iconBg,
  label,
  value,
}: {
  icon: ReactNode;
  iconBg: string;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-muted/50 p-4">
      <div className={`mb-2.5 flex size-9 items-center justify-center rounded-xl ${iconBg}`}>
        {icon}
      </div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-0.5 text-xl font-semibold">{value}</p>
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
      <span className="rounded-full bg-agri-green/10 px-2.5 py-0.5 text-xs font-medium text-agri-green">
        {paymentStatus === "paid" ? "Paid" : "Confirmed"}
      </span>
    );
  }
  if (status === "pending") {
    return (
      <span className="rounded-full bg-agri-amber/10 px-2.5 py-0.5 text-xs font-medium text-agri-amber">
        Pending
      </span>
    );
  }
  return (
    <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
      Cancelled
    </span>
  );
}
