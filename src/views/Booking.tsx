"use client";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { formatMoney, formatSession } from "@/lib/format";
import { useAction, useMutation, useQuery } from "@/lib/convex-react-safe";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  Loader2,
  TriangleAlert,
  XCircle,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

function WindowDots() {
  return (
    <span className="flex items-center gap-1.5">
      <span className="size-2.5 rounded-full border border-border bg-muted" />
      <span className="size-2.5 rounded-full border border-border bg-muted" />
      <span className="size-2.5 rounded-full border border-border bg-muted" />
    </span>
  );
}

export default function Booking() {
  const params = useParams<{ bookingId: string }>();
  const bookingId = params?.bookingId;
  const searchParams = useSearchParams() ?? new URLSearchParams();
  const sessionId = searchParams.get("session_id");
  const checkoutCancelled = searchParams.get("cancelled") === "1";

  const { user } = useAuth();
  const booking = useQuery(
    api.bookings.getBooking,
    bookingId ? { bookingId: bookingId as Id<"bookings"> } : "skip",
  );

  const createCheckout = useAction(api.bookings.createCheckoutSession);
  const verifyCheckout = useAction(api.bookings.verifyCheckout);
  const cancelBooking = useMutation(api.bookings.cancelBooking);
  const rescheduleBooking = useMutation(api.bookings.rescheduleBooking);
  const applyCoupon = useMutation(api.bookings.applyCoupon);
  const sendWaitlistOffer = useAction(api.notifications.sendWaitlistOffer);
  const alternativeSessions = useQuery(
    api.bookings.listSessionsForCourse,
    booking ? { courseId: booking.courseId } : "skip",
  );

  const [checkingOut, setCheckingOut] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [couponInput, setCouponInput] = useState("");
  const [applyingCoupon, setApplyingCoupon] = useState(false);
  const [couponMessage, setCouponMessage] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(sessionId !== null);
  const [error, setError] = useState<string | null>(null);
  const [showReschedule, setShowReschedule] = useState(false);
  const [reschedulingId, setReschedulingId] = useState<Id<"sessions"> | null>(
    null,
  );
  const [rescheduleError, setRescheduleError] = useState<string | null>(null);
  const [rescheduledTo, setRescheduledTo] = useState<Id<"sessions"> | null>(
    null,
  );
  const verified = useRef(false);

  // Verify a completed Stripe session exactly once after redirect.
  useEffect(() => {
    if (!sessionId || !bookingId || verified.current) return;
    verified.current = true;
    setVerifying(true);
    void verifyCheckout({
      bookingId: bookingId as Id<"bookings">,
      sessionId,
      origin: window.location.origin,
    })
      .then((result) => {
        if (!result.ok) {
          setError(result.error);
        }
      })
      .catch((err: unknown) => {
        setError(
          err instanceof Error ? err.message : "Could not verify payment.",
        );
      })
      .finally(() => setVerifying(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId, bookingId]);

  const handleCheckout = async () => {
    if (!booking) return;
    setCheckingOut(true);
    setError(null);
    const origin = window.location.origin;
    const result = await createCheckout({
      bookingId: booking._id,
      origin,
    });
    if (!result.ok) {
      setError(result.error);
      setCheckingOut(false);
      return;
    }
    if (result.url) {
      window.location.href = result.url;
    }
  };

  const handleCancel = async () => {
    if (!booking) return;
    setCancelling(true);
    setError(null);
    try {
      const result = await cancelBooking({ bookingId: booking._id });
      // If a waitlisted student was offered the freed seat, notify them.
      if (result.offeredBookingId) {
        void sendWaitlistOffer({
          bookingId: result.offeredBookingId,
          origin: window.location.origin,
        }).catch(() => {});
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not cancel.");
      setCancelling(false);
    }
  };

  const handleApplyCoupon = async (code: string) => {
    if (!booking) return;
    setApplyingCoupon(true);
    setCouponMessage(null);
    try {
      const result = await applyCoupon({ bookingId: booking._id, code });
      if (!result.ok) {
        setCouponMessage(result.error);
      } else if (result.percentOff > 0) {
        setCouponMessage(`Code applied — ${result.percentOff}% off.`);
        setCouponInput("");
      } else {
        setCouponMessage("Coupon removed.");
      }
    } catch (err) {
      setCouponMessage(
        err instanceof Error ? err.message : "Could not apply the code.",
      );
    } finally {
      setApplyingCoupon(false);
    }
  };

  // Bundle flow: a coupon code arrives as ?coupon=CODE from the bundle page;
  // apply it once the booking is loaded (unless one is already applied).
  const couponParam = searchParams.get("coupon");
  useEffect(() => {
    if (!booking || !couponParam || booking.couponCode) return;
    void handleApplyCoupon(couponParam);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [booking, couponParam]);

  const handleReschedule = async (sessionId: Id<"sessions">) => {
    if (!booking) return;
    setReschedulingId(sessionId);
    setRescheduleError(null);
    setRescheduledTo(null);
    try {
      await rescheduleBooking({
        bookingId: booking._id,
        newSessionId: sessionId,
      });
      setRescheduledTo(sessionId);
      setShowReschedule(false);
    } catch (err) {
      setRescheduleError(
        err instanceof Error ? err.message : "Could not reschedule.",
      );
    } finally {
      setReschedulingId(null);
    }
  };

  const isOwner = booking ? user?._id === booking.userId : true;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <AppHeader path={`~/booking/${bookingId}`} />

      <div className="mx-auto w-full max-w-2xl px-4 py-10 sm:px-6">
        <Link href="/dashboard"
          className="group inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-term-green"
        >
          <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
          ../my-sessions
        </Link>

        {booking === undefined && (
          <div className="mt-6 space-y-4 border border-border bg-card p-8">
            <div className="h-6 w-1/2 animate-pulse bg-muted" />
            <div className="h-4 w-full animate-pulse bg-muted" />
            <div className="h-24 animate-pulse bg-muted" />
          </div>
        )}

        {booking === null && (
          <div className="mt-6 border border-border bg-card px-6 py-12 text-center">
            <XCircle className="mx-auto size-8 text-term-amber" />
            <p className="mt-3 text-sm">
              <span className="text-term-amber">error:</span> booking not found
            </p>
            <Button asChild variant="outline" size="sm" className="mt-5 text-xs">
              <Link href="/dashboard">back to my sessions</Link>
            </Button>
          </div>
        )}

        {booking && !isOwner && (
          <div className="mt-6 border border-border bg-card px-6 py-12 text-center">
            <XCircle className="mx-auto size-8 text-term-amber" />
            <p className="mt-3 text-sm">
              This booking belongs to another account.
            </p>
            <Button asChild variant="outline" size="sm" className="mt-5 text-xs">
              <Link href="/dashboard">back to my sessions</Link>
            </Button>
          </div>
        )}

        {booking && isOwner && (
          <div className="mt-6 border border-border bg-card shadow-[6px_6px_0_0_color-mix(in_oklch,var(--term-green)_10%,transparent)]">
            <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
              <span className="truncate text-xs text-muted-foreground">
                agriskills — booking #{bookingId?.slice(0, 8)}
              </span>
              <WindowDots />
            </div>

            <div className="px-4 py-6 sm:px-6">
              {verifying && (
                <div className="flex items-center gap-2 border border-term-amber/40 bg-term-amber/[0.07] px-4 py-3 text-sm">
                  <Loader2 className="size-4 animate-spin text-term-amber" />
                  verifying payment with Stripe…
                </div>
              )}

              {checkoutCancelled && !bookingConfirmed(booking.status) && (
                <div className="border border-term-amber/40 bg-term-amber/[0.07] px-4 py-3 text-sm">
                  <p className="flex items-center gap-2 font-semibold text-term-amber">
                    <TriangleAlert className="size-4" />
                    checkout cancelled
                  </p>
                  <p className="mt-1 text-xs text-foreground/75">
                    No charge was made. You can retry payment below or choose a
                    different session.
                  </p>
                </div>
              )}

              {error && (
                <div className="border border-term-amber/40 bg-term-amber/[0.07] px-4 py-3 text-sm">
                  <p className="flex items-center gap-2 font-semibold text-term-amber">
                    <TriangleAlert className="size-4" />
                    payment not completed
                  </p>
                  <p className="mt-1 text-xs text-foreground/75">{error}</p>
                </div>
              )}

              {error === "STRIPE_KEY_MISSING" && (
                <div className="mt-3 border border-term-amber/40 bg-term-amber/[0.07] px-4 py-3 text-xs text-foreground/75">
                  <p className="font-semibold text-term-amber">
                    &gt; setup required
                  </p>
                  <p className="mt-1">
                    The academy has not added its Stripe secret key yet. Add{" "}
                    <code className="bg-muted px-1">STRIPE_SECRET_KEY</code> in
                    the project Keys to enable online payments.
                  </p>
                </div>
              )}

              {rescheduledTo && booking.sessionStartsAt > 0 && (
                <div className="mt-4 flex items-center gap-2 border border-term-green/40 bg-term-green/[0.07] px-4 py-3 text-sm">
                  <CheckCircle2 className="size-4 shrink-0 text-term-green" />
                  <span>
                    session moved to{" "}
                    <span className="font-medium">
                      {formatSession(booking.sessionStartsAt)}
                    </span>
                  </span>
                </div>
              )}

              {/* summary */}
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex items-start justify-between gap-4">
                  <dt className="text-muted-foreground">course</dt>
                  <dd className="text-right font-medium">
                    <Link href={`/courses/${booking.courseSlug}`}
                      className="underline-offset-4 hover:underline"
                    >
                      {booking.courseTitle}
                    </Link>
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <dt className="text-muted-foreground">session</dt>
                  <dd className="flex items-center gap-1.5 text-right">
                    <CalendarDays className="size-3.5 shrink-0 text-term-green" />
                    {booking.sessionStartsAt
                      ? formatSession(booking.sessionStartsAt)
                      : "session removed"}
                  </dd>
                </div>
                {(booking.sessionVenue || booking.sessionJoinUrl) && (
                  <div className="flex items-start justify-between gap-4">
                    <dt className="text-muted-foreground">venue</dt>
                    <dd className="text-right">
                      {booking.sessionVenue && (
                        <span className="block">{booking.sessionVenue}</span>
                      )}
                      {booking.sessionJoinUrl && (
                        <a
                          href={booking.sessionJoinUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-term-green underline-offset-4 hover:underline"
                        >
                          join online session ↗
                        </a>
                      )}
                    </dd>
                  </div>
                )}
                <div className="flex items-start justify-between gap-4">
                  <dt className="text-muted-foreground">amount</dt>
                  <dd className="text-right font-semibold">
                    {booking.discountCents ? (
                      <>
                        <span className="mr-1.5 text-xs font-normal text-muted-foreground line-through">
                          {formatMoney(booking.amountCents)}
                        </span>
                        {formatMoney(
                          booking.amountCents - booking.discountCents,
                        )}
                        <span className="ml-1.5 border border-term-green/40 bg-term-green/10 px-1 text-[10px] font-medium text-term-green">
                          {booking.couponCode}
                        </span>
                      </>
                    ) : (
                      formatMoney(booking.amountCents)
                    )}
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <dt className="text-muted-foreground">status</dt>
                  <dd className="flex items-center gap-2">
                    <StatusBadge
                      status={booking.status}
                      paymentStatus={booking.paymentStatus}
                    />
                  </dd>
                </div>
              </dl>

              {/* actions */}
              <div className="mt-6 space-y-3">
                {booking.status === "pending" &&
                  booking.paymentStatus === "unpaid" && (
                    <>
                      <div className="space-y-2 border border-border bg-muted/30 px-3 py-2.5">
                        {booking.couponCode ? (
                          <div className="flex items-center justify-between gap-2 text-xs">
                            <span className="text-term-green">
                              code applied:{" "}
                              <span className="font-semibold">
                                {booking.couponCode}
                              </span>
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 px-2 text-[11px] text-muted-foreground"
                              disabled={applyingCoupon}
                              onClick={() => void handleApplyCoupon("")}
                            >
                              remove
                            </Button>
                          </div>
                        ) : (
                          <div className="flex gap-2">
                            <Input
                              value={couponInput}
                              onChange={(e) =>
                                setCouponInput(e.target.value.toUpperCase())
                              }
                              placeholder="discount code"
                              className="h-9 font-mono text-xs uppercase"
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-9 shrink-0 text-xs"
                              disabled={applyingCoupon}
                              onClick={() => void handleApplyCoupon(couponInput)}
                            >
                              {applyingCoupon ? (
                                <Loader2 className="size-3.5 animate-spin" />
                              ) : (
                                "apply"
                              )}
                            </Button>
                          </div>
                        )}
                        {couponMessage && (
                          <p className="text-[11px] text-term-amber">
                            {couponMessage}
                          </p>
                        )}
                      </div>
                      <Button
                        onClick={handleCheckout}
                        disabled={checkingOut}
                        className="w-full gap-2 text-sm"
                      >
                        {checkingOut ? (
                          <>
                            <Loader2 className="size-4 animate-spin" />
                            opening secure checkout…
                          </>
                        ) : (
                          <>
                            <CreditCard className="size-4" />
                            pay{" "}
                            {formatMoney(
                              booking.amountCents - (booking.discountCents ?? 0),
                            )}{" "}
                            now
                          </>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleCancel}
                        disabled={cancelling}
                        className="w-full text-xs"
                      >
                        {cancelling ? "cancelling…" : "cancel booking"}
                      </Button>
                    </>
                  )}

                {booking.status === "confirmed" && (
                  <div className="border border-term-green/40 border-l-2 border-l-term-green bg-term-green/[0.07] px-4 py-3">
                    <p className="flex items-center gap-2 text-sm font-semibold text-term-green">
                      <CheckCircle2 className="size-4" />
                      {booking.paymentStatus === "paid"
                        ? "payment received — you are booked"
                        : "you are booked"}
                    </p>
                    <p className="mt-1 text-xs text-foreground/75">
                      {booking.paymentStatus === "paid"
                        ? "Your seat is confirmed. Your instructor will see you at the session."
                        : "This free course is confirmed. Your instructor will see you at the session."}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {booking.sessionJoinUrl && (
                        <a
                          href={booking.sessionJoinUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-block border border-term-green/40 bg-term-green/10 px-3 py-1.5 text-xs font-medium text-term-green hover:bg-term-green/20"
                        >
                          join session ↗
                        </a>
                      )}
                      {booking.stripeReceiptUrl && (
                        <a
                          href={booking.stripeReceiptUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-block border border-border px-3 py-1.5 text-xs font-medium text-foreground/80 hover:bg-accent"
                        >
                          view receipt ↗
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {booking.status === "cancelled" && (
                  <div className="border border-border bg-muted/50 px-4 py-3 text-xs text-muted-foreground">
                    This booking has been cancelled.
                  </div>
                )}

                {booking.status !== "cancelled" && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowReschedule((v) => !v);
                      setRescheduleError(null);
                    }}
                    className="w-full text-xs"
                  >
                    {showReschedule
                      ? "close reschedule"
                      : "reschedule session"}
                  </Button>
                )}
              </div>

              {showReschedule && booking.status !== "cancelled" && (
                <div className="mt-4 border border-border bg-muted/30 px-4 py-3">
                  <p className="text-xs font-semibold text-foreground/80">
                    pick a new time
                  </p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">
                    Your seat moves to the session you choose. Full sessions are
                    disabled.
                  </p>
                  <div className="mt-3 space-y-2">
                    {alternativeSessions === undefined && (
                      <div className="h-8 animate-pulse bg-muted" />
                    )}
                    {alternativeSessions !== undefined &&
                      alternativeSessions
                        .filter((s) => s._id !== booking.sessionId)
                        .map((s) => {
                          const full = s.bookedCount >= s.capacity;
                          const busy = reschedulingId === s._id;
                          return (
                            <div
                              key={s._id}
                              className="flex items-center justify-between gap-3 border border-border bg-card px-3 py-2"
                            >
                              <div>
                                <p className="text-xs font-medium">
                                  {formatSession(s.startsAt)}
                                </p>
                                <p className="text-[11px] text-muted-foreground">
                                  {s.bookedCount}/{s.capacity} booked ·{" "}
                                  {s.durationMinutes} min
                                </p>
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                                disabled={full || busy}
                                onClick={() => void handleReschedule(s._id)}
                                className="shrink-0 text-[11px]"
                              >
                                {busy ? "moving…" : full ? "full" : "move here"}
                              </Button>
                            </div>
                          );
                        })}
                    {alternativeSessions !== undefined &&
                      alternativeSessions.filter(
                        (s) => s._id !== booking.sessionId,
                      ).length === 0 && (
                        <p className="text-[11px] text-muted-foreground">
                          No other upcoming sessions for this course right now.
                        </p>
                      )}
                  </div>
                  {rescheduleError && (
                    <p className="mt-2 text-[11px] text-term-amber">
                      {rescheduleError}
                    </p>
                  )}
                </div>
              )}

              <div className="mt-6 flex flex-wrap gap-4 border-t border-border pt-4 text-xs">
                <Button asChild variant="outline" size="sm" className="text-xs">
                  <Link href={`/courses/${booking.courseSlug}`}>
                    view course
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm" className="text-xs">
                  <Link href="/dashboard">my sessions</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

function bookingConfirmed(status: string): boolean {
  return status === "confirmed";
}

function StatusBadge({
  status,
  paymentStatus,
}: {
  status: string;
  paymentStatus: string;
}) {
  if (status === "confirmed" && paymentStatus === "paid") {
    return (
      <span className="border border-term-green/40 bg-term-green/10 px-2 py-0.5 text-[10px] font-medium text-term-green">
        CONFIRMED · PAID
      </span>
    );
  }
  if (status === "confirmed") {
    return (
      <span className="border border-term-green/40 bg-term-green/10 px-2 py-0.5 text-[10px] font-medium text-term-green">
        CONFIRMED
      </span>
    );
  }
  if (status === "pending") {
    return (
      <span className="border border-term-amber/40 bg-term-amber/10 px-2 py-0.5 text-[10px] font-medium text-term-amber">
        PENDING PAYMENT
      </span>
    );
  }
  return (
    <span className="border border-border bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
      CANCELLED
    </span>
  );
}
