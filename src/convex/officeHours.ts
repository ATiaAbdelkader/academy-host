import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

/** List available office hours */
export const listAvailable = query({
  args: { courseId: v.optional(v.id("courses")) },
  handler: async (ctx, { courseId }) => {
    let q = ctx.db.query("officeHours").withIndex("by_status", (q) => q.eq("status", "scheduled"));
    if (courseId) q = q.filter((q) => q.eq(q.field("courseId"), courseId));
    return await q.collect();
  },
});

/** Book an office hour slot */
export const book = mutation({
  args: {
    officeHourId: v.id("officeHours"),
    userId: v.id("users"),
    studentName: v.string(),
    topic: v.optional(v.string()),
  },
  handler: async (ctx, { officeHourId, userId, studentName, topic }) => {
    const oh = await ctx.db.get(officeHourId);
    if (!oh) throw new Error("Office hour not found");

    const existing = await ctx.db.query("officeHourBookings")
      .withIndex("by_officeHour", (q) => q.eq("officeHourId", officeHourId))
      .collect();
    
    if (existing.length >= oh.maxStudents) throw new Error("Session is full");
    if (existing.some((b) => b.userId === userId)) throw new Error("Already booked");

    return await ctx.db.insert("officeHourBookings", {
      officeHourId,
      userId,
      studentName,
      topic,
      status: "registered",
      createdAt: Date.now(),
    });
  },
});

/** My bookings */
export const myBookings = query({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    const bookings = await ctx.db.query("officeHourBookings")
      .withIndex("by_user", (q) => q.eq("userId", userId)).collect();
    const ohIds = [...new Set(bookings.map((b) => b.officeHourId))];
    const ohs = await Promise.all(ohIds.map((id) => ctx.db.get(id)));
    const ohMap = new Map(ohs.filter(Boolean).map((o) => [o!._id, o!]));
    return bookings.map((b) => ({ ...b, officeHour: ohMap.get(b.officeHourId) }));
  },
});

/** Seed office hours */
export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("officeHours").take(1);
    if (existing.length > 0) return { seeded: false };

    const admins = await ctx.db.query("users").collect();
    const adminId = admins[0]?._id;
    if (!adminId) return { seeded: false };

    const sessions = [
      { title: "Soil Science Q&A", description: "Bring your soil test results for personalized advice", courseId: undefined, startsAt: Date.now() + 86400000 * 2, durationMinutes: 30, maxStudents: 5 },
      { title: "Farm Business Planning", description: "Get help with your business plan or financial projections", courseId: undefined, startsAt: Date.now() + 86400000 * 4, durationMinutes: 45, maxStudents: 4 },
      { title: "Pest Identification Help", description: "Bring photos of unidentified pests for expert diagnosis", courseId: undefined, startsAt: Date.now() + 86400000 * 6, durationMinutes: 30, maxStudents: 6 },
    ];

    for (const s of sessions) {
      await ctx.db.insert("officeHours", {
        instructorId: adminId,
        instructorName: "Academy Instructor",
        ...s,
        status: "scheduled",
        createdAt: Date.now(),
      });
    }
    return { seeded: true, count: sessions.length };
  },
});
