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
    const text = [
      "AgriSkills Academy",
      "",
      "Your booking is confirmed.",
      "",
      `  Course:   ${booking.courseTitle}`,
      `  Session:  ${sessionAt}`,
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
