import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const dashboard = query({
  args: {},
  handler: async (ctx) => {
    const bookings = await ctx.db.query("bookings").collect();
    const paidBookings = bookings.filter((b) => b.paymentStatus === "paid");

    const totalRevenue = paidBookings.reduce((sum, b) => sum + b.amountCents, 0);
    const totalEnrollments = bookings.length;
    const completedBookings = paidBookings.filter((b) => b.status === "confirmed").length;

    // Refunds
    const refunds = bookings.filter((b) => b.refundedAt);
    const totalRefunds = refunds.reduce((sum, b) => sum + b.amountCents, 0);

    // Unique students
    const uniqueStudents = new Set(bookings.map((b) => b.userId)).size;

    // Course popularity
    const courseCounts: Record<string, number> = {};
    for (const b of paidBookings) {
      const cid = b.courseId;
      courseCounts[cid] = (courseCounts[cid] || 0) + 1;
    }
    const topCourses = Object.entries(courseCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    const topCourseDetails = await Promise.all(
      topCourses.map(async ([courseId, count]) => {
        const course = await ctx.db.get(courseId as any as any);
        return {
          title: (course as any)?.title ?? "Unknown",
          enrollments: count,
          revenue: paidBookings
            .filter((b) => (b.courseId as string) === courseId)
            .reduce((s, b) => s + b.amountCents, 0),
        };
      })
    );

    // Recent activity (last 30 days)
    const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
    const recentBookings = paidBookings.filter((b) => b.createdAt >= thirtyDaysAgo);
    const recentRevenue = recentBookings.reduce((s, b) => s + b.amountCents, 0);

    return {
      totalRevenue,
      totalEnrollments,
      completedBookings,
      totalRefunds,
      uniqueStudents,
      recentRevenue,
      recentEnrollments: recentBookings.length,
      topCourses: topCourseDetails,
      netRevenue: totalRevenue - totalRefunds,
    };
  },
});

export const monthlyTrend = query({
  args: {},
  handler: async (ctx) => {
    const bookings = await ctx.db.query("bookings").collect();
    const paidBookings = bookings.filter((b) => b.paymentStatus === "paid");

    const months: Record<string, { revenue: number; enrollments: number }> = {};
    for (const b of paidBookings) {
      const d = new Date(b.createdAt);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      if (!months[key]) months[key] = { revenue: 0, enrollments: 0 };
      months[key].revenue += b.amountCents;
      months[key].enrollments += 1;
    }

    return Object.entries(months)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .slice(-12)
      .map(([month, data]) => ({ month, ...data }));
  },
});

export const dailyTrend = query({
  args: { days: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const days = args.days ?? 30;
    const since = Date.now() - days * 24 * 60 * 60 * 1000;
    const bookings = await ctx.db.query("bookings").collect();
    const recent = bookings.filter((b) => b.createdAt >= since);

    const daily: Record<string, { revenue: number; enrollments: number; refunds: number }> = {};
    for (const b of recent) {
      const d = new Date(b.createdAt).toISOString().slice(0, 10);
      if (!daily[d]) daily[d] = { revenue: 0, enrollments: 0, refunds: 0 };
      if (b.paymentStatus === "paid") {
        daily[d].revenue += b.amountCents;
        daily[d].enrollments += 1;
      }
      if (b.refundedAt) daily[d].refunds += b.amountCents;
    }

    return Object.entries(daily)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([date, data]) => ({ date, ...data }));
  },
});
