import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatMoney, formatSession } from "@/lib/format";
import { useQuery } from "convex/react";
import {
  Award,
  CalendarDays,
  CheckCircle2,
  Flame,
  Loader2,
  MessageSquare,
  Star,
  Trophy,
} from "lucide-react";
import { Link } from "react-router";

function StatBox({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: string | number;
  tone?: "default" | "green" | "amber";
}) {
  return (
    <div className="border border-border bg-card px-3 py-3">
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p
        className={`mt-1 text-lg font-bold ${
          tone === "green"
            ? "text-term-green"
            : tone === "amber"
              ? "text-term-amber"
              : ""
        }`}
      >
        {value}
      </p>
    </div>
  );
}

/**
 * Admin per-student drill-down. Given a user id it loads the student's full
 * training record (via api.admin.studentHistory) and renders it in a dialog:
 * profile + gamification stats up top, then bookings, quiz attempts, progress,
 * reviews, and waitlists.
 */
export function StudentProfileDialog({
  userId,
  onClose,
}: {
  userId: Id<"users"> | null;
  onClose: () => void;
}) {
  const history = useQuery(
    api.admin.studentHistory,
    userId ? { userId } : "skip",
  );

  const user = history?.user;
  const name =
    user?.name?.trim() || (user?.email ? user.email.split("@")[0] : "Student");
  const completedCount = (history?.progress ?? []).filter(
    (p) => p.status === "completed",
  ).length;

  return (
    <Dialog open={userId !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base">
            <span className="font-mono text-xs text-term-green">$</span>
            cat student/{name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.log
          </DialogTitle>
        </DialogHeader>

        {userId && history === undefined && (
          <div className="py-10 text-center">
            <Loader2 className="mx-auto size-6 animate-spin text-term-green" />
            <p className="mt-3 text-xs text-muted-foreground">
              loading student record…
            </p>
          </div>
        )}

        {userId && history === null && (
          <div className="py-10 text-center text-sm text-muted-foreground">
            <span className="text-term-amber">[warn]</span> student not found.
          </div>
        )}

        {history && (
          <div className="space-y-5">
            {/* Profile header */}
            <div className="border border-border bg-card">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-muted px-4 py-3">
                <div>
                  <p className="text-sm font-semibold">{name}</p>
                  <p className="text-xs text-muted-foreground">
                    {user?.email ?? "no email"}
                  </p>
                </div>
                <span className="flex items-center gap-1.5 text-[11px]">
                  {history.stats ? (
                    <>
                      <Trophy className="size-3.5 text-term-amber" />
                      <span className="font-semibold text-term-green">
                        {history.stats.points} pts
                      </span>
                      <Flame className="ml-1 size-3.5 text-term-amber" />
                      <span>{history.stats.streakDays} day streak</span>
                    </>
                  ) : (
                    <span className="text-muted-foreground">no activity yet</span>
                  )}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 p-4 sm:grid-cols-4">
                <StatBox
                  label="bookings"
                  value={history.bookings.length}
                />
                <StatBox
                  label="attended"
                  value={
                    history.bookings.filter((b) => b.attendedAt).length
                  }
                  tone="green"
                />
                <StatBox
                  label="quiz attempts"
                  value={history.quizAttempts.length}
                />
                <StatBox
                  label="certificates"
                  value={completedCount}
                  tone="green"
                />
              </div>
              {history.stats && history.stats.badges.length > 0 && (
                <div className="flex flex-wrap gap-1.5 border-t border-border px-4 py-3">
                  {history.stats.badges.map((badge) => (
                    <span
                      key={badge}
                      className="border border-term-green/40 bg-term-green/10 px-1.5 py-0.5 text-[10px] font-medium text-term-green"
                    >
                      {badge.replace(/_/g, " ")}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Bookings */}
            <div className="border border-border bg-card">
              <div className="border-b border-border bg-muted px-4 py-2 text-[11px] uppercase tracking-wider text-muted-foreground">
                bookings ({history.bookings.length})
              </div>
              {history.bookings.length === 0 && (
                <p className="px-4 py-4 text-xs text-muted-foreground">
                  <span className="text-term-green">[ok]</span> no bookings.
                </p>
              )}
              {history.bookings.map((booking) => (
                <div
                  key={booking._id}
                  className="flex items-center justify-between gap-3 border-b border-border px-4 py-2 text-xs last:border-b-0"
                >
                  <span className="min-w-0 truncate">
                    <Link
                      to={`/courses/${booking.courseSlug}`}
                      className="font-medium underline-offset-4 hover:underline"
                    >
                      {booking.courseTitle}
                    </Link>
                    <span className="ml-2 flex items-center gap-1 text-[10px] text-muted-foreground">
                      <CalendarDays className="size-3" />
                      {booking.sessionStartsAt
                        ? formatSession(booking.sessionStartsAt)
                        : "—"}
                    </span>
                  </span>
                  <span className="flex shrink-0 items-center gap-2">
                    <span className="text-muted-foreground">
                      {formatMoney(booking.amountCents)}
                    </span>
                    {booking.attendedAt ? (
                      <span className="flex items-center gap-1 text-[10px] text-term-green">
                        <CheckCircle2 className="size-3" /> attended
                      </span>
                    ) : (
                      <span className="text-[10px] text-muted-foreground">
                        {booking.status} · {booking.paymentStatus}
                      </span>
                    )}
                  </span>
                </div>
              ))}
            </div>

            {/* Quiz attempts */}
            <div className="border border-border bg-card">
              <div className="border-b border-border bg-muted px-4 py-2 text-[11px] uppercase tracking-wider text-muted-foreground">
                quiz attempts ({history.quizAttempts.length})
              </div>
              {history.quizAttempts.length === 0 && (
                <p className="px-4 py-4 text-xs text-muted-foreground">
                  <span className="text-term-green">[ok]</span> no quiz attempts.
                </p>
              )}
              {history.quizAttempts.map((attempt) => (
                <div
                  key={attempt._id}
                  className="flex items-center justify-between gap-3 border-b border-border px-4 py-2 text-xs last:border-b-0"
                >
                  <span className="min-w-0 truncate font-medium">
                    {attempt.courseTitle}
                    <span className="ml-2 text-[10px] font-normal text-muted-foreground">
                      quiz #{attempt.quizIndex + 1}
                    </span>
                  </span>
                  <span className="flex shrink-0 items-center gap-2">
                    <span className="font-mono">
                      {attempt.correct}/{attempt.total}
                    </span>
                    <span
                      className={`border px-1.5 py-0.5 text-[10px] font-medium ${
                        attempt.passed
                          ? "border-term-green/40 bg-term-green/10 text-term-green"
                          : "border-term-amber/40 bg-term-amber/10 text-term-amber"
                      }`}
                    >
                      {attempt.passed ? "PASS" : "FAIL"}
                    </span>
                  </span>
                </div>
              ))}
            </div>

            {/* Progress */}
            <div className="border border-border bg-card">
              <div className="border-b border-border bg-muted px-4 py-2 text-[11px] uppercase tracking-wider text-muted-foreground">
                progress ({history.progress.length})
              </div>
              {history.progress.length === 0 && (
                <p className="px-4 py-4 text-xs text-muted-foreground">
                  <span className="text-term-green">[ok]</span> no progress
                  tracked.
                </p>
              )}
              {history.progress.map((entry) => (
                <div
                  key={entry._id}
                  className="flex items-center justify-between gap-3 border-b border-border px-4 py-2 text-xs last:border-b-0"
                >
                  <Link
                    to={`/courses/${entry.courseSlug}`}
                    className="min-w-0 truncate font-medium underline-offset-4 hover:underline"
                  >
                    {entry.courseTitle}
                  </Link>
                  <span
                    className={`shrink-0 border px-1.5 py-0.5 text-[10px] font-medium ${
                      entry.status === "completed"
                        ? "border-term-green/40 bg-term-green/10 text-term-green"
                        : "border-term-amber/40 bg-term-amber/10 text-term-amber"
                    }`}
                  >
                    {entry.status === "completed" ? (
                      <span className="flex items-center gap-1">
                        <Award className="size-3" /> CERTIFIED
                      </span>
                    ) : (
                      "IN PROGRESS"
                    )}
                  </span>
                </div>
              ))}
            </div>

            {/* Reviews + waitlists */}
            {(history.reviews.length > 0 || history.waitlists.length > 0) && (
              <div className="grid gap-3 sm:grid-cols-2">
                {history.reviews.length > 0 && (
                  <div className="border border-border bg-card">
                    <div className="flex items-center gap-1.5 border-b border-border bg-muted px-4 py-2 text-[11px] uppercase tracking-wider text-muted-foreground">
                      <Star className="size-3 text-term-amber" />
                      reviews ({history.reviews.length})
                    </div>
                    {history.reviews.map((review) => (
                      <div
                        key={review._id}
                        className="border-b border-border px-4 py-2 text-[11px] last:border-b-0"
                      >
                        <p className="flex items-center gap-1 font-medium">
                          <Star className="size-3 fill-term-amber text-term-amber" />
                          {review.rating}/5 — {review.courseTitle}
                        </p>
                        {review.comment && (
                          <p className="mt-0.5 text-muted-foreground">
                            {review.comment}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                {history.waitlists.length > 0 && (
                  <div className="border border-border bg-card">
                    <div className="flex items-center gap-1.5 border-b border-border bg-muted px-4 py-2 text-[11px] uppercase tracking-wider text-muted-foreground">
                      <MessageSquare className="size-3" />
                      waitlists ({history.waitlists.length})
                    </div>
                    {history.waitlists.map((entry) => (
                      <div
                        key={entry._id}
                        className="border-b border-border px-4 py-2 text-[11px] last:border-b-0"
                      >
                        <p className="font-medium">{entry.courseTitle}</p>
                        <p className="text-muted-foreground">
                          {entry.sessionStartsAt
                            ? formatSession(entry.sessionStartsAt)
                            : "—"}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-end">
              <Button variant="outline" size="sm" onClick={onClose}>
                close
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
