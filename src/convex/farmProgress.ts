import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

/**
 * Farm Progress Tracker: connects learning to real-world outcomes over seasons.
 * Uses the fieldJournal table with a special "[FarmProgress]" tag in notes.
 */

/** Log a farm progress entry connecting learning to real outcomes */
export const logEntry = mutation({
  args: {
    season: v.string(),
    crop: v.string(),
    fieldSize: v.string(),
    notes: v.string(),
    location: v.optional(v.string()),
    soilType: v.optional(v.string()),
    outcome: v.optional(v.string()),
    yieldKg: v.optional(v.number()),
    revenue: v.optional(v.number()),
    coursesApplied: v.optional(v.array(v.string())),
    actions: v.optional(v.array(v.string())),
    weather: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const id = await ctx.db.insert("fieldJournal", {
      userId,
      title: `[FarmProgress] ${args.season} — ${args.crop}`,
      location: args.location ?? "",
      date: Date.now(),
      soilType: args.soilType,
      notes: `${args.notes}${args.outcome ? `\n\nOutcome: ${args.outcome}` : ""}${args.yieldKg ? `\nYield: ${args.yieldKg} kg` : ""}${args.revenue ? `\nRevenue: $${args.revenue}` : ""}${args.coursesApplied?.length ? `\nCourses Applied: ${args.coursesApplied.join(", ")}` : ""}`,
      cropStage: args.crop,
      weather: args.weather,
      actions: args.actions,
      createdAt: Date.now(),
    });

    return id;
  },
});

/** Get my farm progress timeline */
export const myTimeline = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    const entries = await ctx.db
      .query("fieldJournal")
      .withIndex("by_user_date", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();

    return entries
      .filter((e) => e.title.startsWith("[FarmProgress]"))
      .map((e) => {
        const headerMatch = e.title.match(/^\[FarmProgress\] (.+?) — (.+)$/);
        const content = e.notes;
        const outcomeMatch = content.match(/Outcome: (.+)/);
        const yieldMatch = content.match(/Yield: ([\d.]+)/);
        const revenueMatch = content.match(/Revenue: \$?([\d.]+)/);
        const coursesMatch = content.match(/Courses Applied: (.+)/);

        return {
          _id: e._id,
          season: headerMatch?.[1] ?? "Unknown",
          crop: headerMatch?.[2] ?? "Unknown",
          fieldSize: e.location || "Unknown",
          notes: content.replace(/Outcome: .+/, "").replace(/Yield: .+/, "").replace(/Revenue: .+/, "").replace(/Courses Applied: .+/, "").trim(),
          outcome: outcomeMatch?.[1],
          yieldKg: yieldMatch?.[1] ? parseFloat(yieldMatch[1]) : undefined,
          revenue: revenueMatch?.[1] ? parseFloat(revenueMatch[1].replace("$", "")) : undefined,
          coursesApplied: coursesMatch?.[1]?.split(", "),
          weather: e.weather,
          date: e.date,
        };
      });
  },
});

/** Get farm progress summary stats */
export const mySummary = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return { totalEntries: 0, seasons: 0, totalYield: 0, totalRevenue: 0, crops: [] as string[] };

    const entries = await ctx.db
      .query("fieldJournal")
      .withIndex("by_user_date", (q) => q.eq("userId", userId))
      .collect();

    const progressEntries = entries.filter((e) => e.title.startsWith("[FarmProgress]"));
    const seasons = new Set<string>();
    const crops = new Set<string>();
    let totalYield = 0;
    let totalRevenue = 0;

    for (const e of progressEntries) {
      const headerMatch = e.title.match(/^\[FarmProgress\] (.+?) — (.+)$/);
      const yieldMatch = e.notes.match(/Yield: ([\d.]+)/);
      const revenueMatch = e.notes.match(/Revenue: \$?([\d.]+)/);
      if (headerMatch?.[1]) seasons.add(headerMatch[1]);
      if (headerMatch?.[2]) crops.add(headerMatch[2]);
      if (yieldMatch) totalYield += parseFloat(yieldMatch[1]);
      if (revenueMatch) totalRevenue += parseFloat(revenueMatch[1]);
    }

    return {
      totalEntries: progressEntries.length,
      seasons: seasons.size,
      totalYield,
      totalRevenue,
      crops: Array.from(crops),
    };
  },
});
