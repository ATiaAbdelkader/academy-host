import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useCatalog } from "@/hooks/use-catalog";
import { formatMoney, formatSession } from "@/lib/format";
import { useMutation, useQuery } from "convex/react";
import {
  CalendarDays,
  CheckCircle2,
  Flag,
  ListMinus,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

export default function Dashboard() {
  const { user } = useAuth();
  const bookings = useQuery(api.bookings.myBookings);
  const progressQuery = useQuery(api.progress.myProgress);
  const waitlists = useQuery(api.waitlist.myWaitlists);
  const progress = progressQuery ?? [];
  const courses = useCatalog();
  const cancelBooking = useMutation(api.bookings.cancelBooking);
  const leaveWaitlist = useMutation(api.waitlist.leave);

  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [cancelError, setCancelError] = useState<string | null>(null);

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
      await cancelBooking({ bookingId });
      toast.success("Booking cancelled.");
    } catch (err) {
      setCancelError(
        err instanceof Error ? err.message : "Could not cancel the booking.",
      );
    } finally {
      setCancellingId(null);
    }
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
                <Link to="/courses">
                  <CheckCircle2 className="size-3.5" />
                  completed
                </Link>
              </Button>
            </div>
          </div>

          {progress !== undefined && progress.length > 0 && (
            <div className="border-t border-border">
              {progress.map((entry) => (
                <Link
                  key={entry._id}
                  to={`/courses/${entry.courseSlug}`}
                  className="flex items-center justify-between gap-3 border-b border-border px-4 py-2.5 last:border-b-0 hover:bg-accent/30"
                >
                  <span className="min-w-0 truncate text-sm">
                    {entry.courseTitle}
                  </span>
                  <span
                    className={`shrink-0 border px-1.5 py-0.5 text-[10px] font-medium ${
                      entry.status === "completed"
                        ? "border-term-green/40 bg-term-green/10 text-term-green"
                        : "border-term-amber/40 bg-term-amber/10 text-term-amber"
                    }`}
                  >
                    {entry.status === "completed" ? "COMPLETED" : "IN PROGRESS"}
                  </span>
                </Link>
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

        {/* ── Bookings ───────────────────────────────────────────── */}
        <div className="mt-8 flex items-center gap-2 text-sm">
          <span className="text-term-green">$</span>
          <span>ls bookings/</span>
          <span className="inline-block h-4 w-2 bg-foreground cursor-blink" />
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
                </span>
                <span className="hidden items-center gap-1.5 text-xs text-muted-foreground sm:flex">
                  <CalendarDays className="size-3.5 shrink-0" />
                  {booking.sessionStartsAt
                    ? formatSession(booking.sessionStartsAt)
                    : "session removed"}
                </span>
                <span className="text-right text-xs text-muted-foreground">
                  {formatMoney(booking.amountCents)}
                </span>
                <span className="flex justify-end">
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
