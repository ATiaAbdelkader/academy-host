"use node";

import { action } from "./_generated/server";
import { api } from "./_generated/api";
import { v } from "convex/values";
import { vly } from "../lib/vly-integrations";

/**
 * Sends the student a booking-confirmation email. Idempotent: skips bookings
 * that already have a confirmationEmailSentAt timestamp, so callers (client
 * after booking, Stripe verification, admin confirmation) can fire it safely.
 */
export const sendBookingConfirmation = action({
  args: {
    bookingId: v.id("bookings"),
    origin: v.optional(v.string()),
  },
  handler: async (ctx, { bookingId, origin }) => {
    if (!process.env.VLY_INTEGRATION_KEY) {
      return { ok: false as const, error: "EMAIL_NOT_CONFIGURED" };
    }
    const booking = await ctx.runQuery(api.bookings.getBooking, { bookingId });
    if (!booking) {
      return { ok: false as const, error: "Booking not found." };
    }
    if (booking.confirmationEmailSentAt) {
      return { ok: false as const, error: "Already sent." };
    }
    if (booking.status !== "confirmed") {
      return { ok: false as const, error: "Booking is not confirmed yet." };
    }
    if (!booking.email) {
      return { ok: false as const, error: "No email on account." };
    }

    const base = origin ?? process.env.SITE_URL ?? "";
    const bookingUrl = `${base}/booking/${bookingId}`;
    const courseUrl = booking.courseSlug
      ? `${base}/courses/${booking.courseSlug}`
      : base;
    const sessionAt = booking.sessionStartsAt
      ? new Date(booking.sessionStartsAt).toLocaleString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
        })
      : "to be announced";
    const amount =
      booking.amountCents === 0
        ? "Free"
        : `$${(booking.amountCents / 100).toFixed(2)}`;

    const subject = `Booking confirmed — ${booking.courseTitle}`;
    const venueParts = [booking.sessionVenue, booking.sessionJoinUrl].filter(
      Boolean,
    );
    const venueLine = venueParts.length
      ? `  Venue:    ${venueParts.join(" · ")}`
      : null;
    const text = [
      "AgriSkills Academy",
      "",
      "Your booking is confirmed.",
      "",
      `  Course:   ${booking.courseTitle}`,
      `  Session:  ${sessionAt}`,
      ...(venueLine ? [venueLine] : []),
      `  Amount:   ${amount}`,
      "",
      `Manage your booking: ${bookingUrl}`,
      `View the course: ${courseUrl}`,
    ].join("\n");
    const html = [
      `<div style="font-family:ui-monospace,Menlo,Consolas,monospace;font-size:14px;line-height:1.6;color:#1d1d1d;max-width:520px;margin:0 auto;">`,
      `<p style="margin:0 0 16px;"><strong>AgriSkills Academy</strong></p>`,
      `<p style="margin:0 0 16px;">Your booking is confirmed.</p>`,
      `<table style="border-collapse:collapse;border:1px solid #ddd;width:100%;">`,
      `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#666;">Course</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">${booking.courseTitle}</td></tr>`,
      `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#666;">Session</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">${sessionAt}</td></tr>`,
      ...(venueParts.length
        ? [
            `<tr><td style="padding:8px 12px;color:#666;">Venue</td><td style="padding:8px 12px;">${venueParts.join(" · ")}</td></tr>`,
          ]
        : []),
      `<tr><td style="padding:8px 12px;color:#666;">Amount</td><td style="padding:8px 12px;">${amount}</td></tr>`,
      `</table>`,
      `<p style="margin:16px 0 0;"><a href="${bookingUrl}" style="color:#1a6b3c;">Manage your booking</a> · <a href="${courseUrl}" style="color:#1a6b3c;">View the course</a></p>`,
      `</div>`,
    ].join("");

    let result;
    try {
      result = await vly.email.send({ to: booking.email, subject, text, html });
    } catch (error) {
      return {
        ok: false as const,
        error: error instanceof Error ? error.message : "Email send failed.",
      };
    }
    if (result.success) {
      await ctx.runMutation(api.bookings.markBookingEmailed, { bookingId });
      return { ok: true as const };
    }
    return { ok: false as const, error: result.error ?? "Email send failed." };
  },
});

/**
 * Tells a waitlisted student that a seat opened up and their booking is ready
 * to settle. Idempotent via waitlistOfferEmailSentAt.
 */
export const sendWaitlistOffer = action({
  args: {
    bookingId: v.id("bookings"),
    origin: v.optional(v.string()),
  },
  handler: async (
    ctx,
    { bookingId, origin },
  ): Promise<{ ok: true } | { ok: false; error: string }> => {
    if (!process.env.VLY_INTEGRATION_KEY) {
      return { ok: false as const, error: "EMAIL_NOT_CONFIGURED" };
    }
    const booking = await ctx.runQuery(api.bookings.getBooking, { bookingId });
    if (!booking) {
      return { ok: false as const, error: "Booking not found." };
    }
    if (booking.waitlistOfferEmailSentAt) {
      return { ok: false as const, error: "Already sent." };
    }
    if (!booking.email) {
      return { ok: false as const, error: "No email on account." };
    }
    // Free courses confirm instantly on auto-fill — route those through the
    // standard confirmation email instead of a "settle payment" offer.
    if (booking.paymentStatus !== "unpaid") {
      return ctx.runAction(api.notifications.sendBookingConfirmation, {
        bookingId,
        origin,
      });
    }

    const base = origin ?? process.env.SITE_URL ?? "";
    const bookingUrl = `${base}/booking/${bookingId}`;
    const sessionAt = booking.sessionStartsAt
      ? new Date(booking.sessionStartsAt).toLocaleString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
        })
      : "to be announced";
    const subject = `A seat opened up — ${booking.courseTitle}`;
    const text = [
      "AgriSkills Academy",
      "",
      "Good news: a seat opened up on a session you were waiting for.",
      "",
      `  Course:   ${booking.courseTitle}`,
      `  Session:  ${sessionAt}`,
      `  Amount:   $${(booking.amountCents / 100).toFixed(2)}`,
      "",
      `Your booking is ready. Settle payment to confirm your seat: ${bookingUrl}`,
      "",
      "If you no longer need the seat, you can cancel it from that page.",
    ].join("\n");
    const html = [
      `<div style="font-family:ui-monospace,Menlo,Consolas,monospace;font-size:14px;line-height:1.6;color:#1d1d1d;max-width:520px;margin:0 auto;">`,
      `<p style="margin:0 0 16px;"><strong>AgriSkills Academy</strong></p>`,
      `<p style="margin:0 0 16px;">Good news: a seat opened up on a session you were waiting for.</p>`,
      `<table style="border-collapse:collapse;border:1px solid #ddd;width:100%;">`,
      `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#666;">Course</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">${booking.courseTitle}</td></tr>`,
      `<tr><td style="padding:8px 12px;color:#666;">Session</td><td style="padding:8px 12px;">${sessionAt}</td></tr>`,
      `</table>`,
      `<p style="margin:16px 0 0;"><a href="${bookingUrl}" style="color:#1a6b3c;">Settle payment to confirm your seat</a></p>`,
      `<p style="margin:8px 0 0;color:#666;font-size:13px;">If you no longer need the seat, you can cancel it from that page.</p>`,
      `</div>`,
    ].join("");

    let result;
    try {
      result = await vly.email.send({ to: booking.email, subject, text, html });
    } catch (error) {
      return {
        ok: false as const,
        error: error instanceof Error ? error.message : "Email send failed.",
      };
    }
    if (result.success) {
      await ctx.runMutation(api.bookings.markWaitlistOfferEmailed, { bookingId });
      return { ok: true as const };
    }
    return { ok: false as const, error: result.error ?? "Email send failed." };
  },
});

/**
 * Emails the student that their booking was refunded. Idempotent via
 * refundEmailSentAt.
 */
export const sendRefundNotice = action({
  args: {
    bookingId: v.id("bookings"),
    origin: v.optional(v.string()),
  },
  handler: async (ctx, { bookingId, origin }) => {
    if (!process.env.VLY_INTEGRATION_KEY) {
      return { ok: false as const, error: "EMAIL_NOT_CONFIGURED" };
    }
    const booking = await ctx.runQuery(api.bookings.getBooking, { bookingId });
    if (!booking) {
      return { ok: false as const, error: "Booking not found." };
    }
    if (booking.refundEmailSentAt) {
      return { ok: false as const, error: "Already sent." };
    }
    if (!booking.email) {
      return { ok: false as const, error: "No email on account." };
    }
    if (!booking.refundedAt) {
      return { ok: false as const, error: "Booking is not refunded." };
    }
    const amount =
      booking.amountCents === 0
        ? "$0.00"
        : `$${(booking.amountCents / 100).toFixed(2)}`;
    const base = origin ?? process.env.SITE_URL ?? "";
    const bookingUrl = `${base}/booking/${bookingId}`;
    const subject = `Refund issued — ${booking.courseTitle}`;
    const text = [
      "AgriSkills Academy",
      "",
      "Your payment has been refunded.",
      "",
      `  Course:   ${booking.courseTitle}`,
      `  Amount:   ${amount}`,
      `  Refund:   $${(booking.amountCents / 100).toFixed(2)}`,
      "",
      "The refund goes back to your original payment method. It can take 5–10 business days to appear, depending on your bank.",
      "",
      `View your booking: ${bookingUrl}`,
    ].join("\n");
    let result;
    try {
      result = await vly.email.send({
        to: booking.email,
        subject,
        text,
        html: text.replace(/\n/g, "<br/>"),
      });
    } catch (error) {
      return {
        ok: false as const,
        error: error instanceof Error ? error.message : "Email send failed.",
      };
    }
    if (result.success) {
      await ctx.runMutation(api.bookings.markRefundEmailed, { bookingId });
      return { ok: true as const };
    }
    return { ok: false as const, error: result.error ?? "Email send failed." };
  },
});

/**
 * Cron target: sends the 24-hour and 1-hour session reminders. Each session's
 * bookings are emailed once per reminder; markers prevent duplicate sends.
 */
export const sendSessionReminders = action({
  args: {},
  handler: async (ctx) => {
    if (!process.env.VLY_INTEGRATION_KEY) {
      return { sent: 0 };
    }
    const now = Date.now();
    const sessions = await ctx.runQuery(api.admin.reminderSessions, { now });

    let sent = 0;
    for (const session of sessions) {
      const hoursUntil = (session.startsAt - now) / (60 * 60 * 1000);
      const needs24h =
        hoursUntil >= 20 && hoursUntil <= 26 && !session.reminder24hSentAt;
      const needs1h =
        hoursUntil >= 0.5 && hoursUntil <= 2 && !session.reminder1hSentAt;
      if (!needs24h && !needs1h) {
        continue;
      }
      const kind: "24h" | "1h" = needs24h ? "24h" : "1h";
      const bookings = await ctx.runQuery(api.admin.reminderBookings, {
        sessionId: session._id,
      });
      for (const booking of bookings) {
        if (!booking.email) continue;
        const sessionAt = new Date(session.startsAt).toLocaleString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
        });
        const subject =
          kind === "24h"
            ? `Tomorrow: ${session.title} session`
            : `Starting soon: ${session.title} session`;
        const venueParts = [session.venue, session.joinUrl].filter(Boolean);
        const venueLine = venueParts.length
          ? `  Venue:    ${venueParts.join(" · ")}`
          : null;
        const text = [
          "AgriSkills Academy",
          "",
          kind === "24h"
            ? "Your session is tomorrow. Here is everything you need:"
            : "Your session starts within the hour. Join on time:",
          "",
          `  Course:   ${session.title}`,
          `  Session:  ${sessionAt}`,
          `  Duration: ${session.durationMinutes} min`,
          ...(venueLine ? [venueLine] : []),
          "",
          `View the course: ${process.env.SITE_URL ?? ""}/courses/${session.slug}`,
        ].join("\n");
        try {
          const result = await vly.email.send({
            to: booking.email,
            subject,
            text,
            html: text.replace(/\n/g, "<br/>"),
          });
          if (result.success) sent += 1;
        } catch {
          // Never let one failed send block the rest of the batch.
        }
      }
      await ctx.runMutation(api.bookings.markReminderSent, {
        sessionId: session._id,
        kind,
      });
    }
    return { sent };
  },
});
