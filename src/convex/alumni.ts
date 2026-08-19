import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

/** Create or update alumni profile */
export const upsertProfile = mutation({
  args: {
    userId: v.id("users"),
    name: v.string(),
    graduationYear: v.number(),
    completedCourses: v.array(v.string()),
    expertise: v.array(v.string()),
    bio: v.string(),
    availableForMentoring: v.boolean(),
    linkedinUrl: v.optional(v.string()),
    location: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query("alumniProfiles").withIndex("by_user", (q) => q.eq("userId", args.userId)).first();
    if (existing) {
      await ctx.db.patch(existing._id, args);
      return existing._id;
    }
    return await ctx.db.insert("alumniProfiles", { ...args, createdAt: Date.now() });
  },
});

/** Get alumni profile */
export const getProfile = query({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) =>
    ctx.db.query("alumniProfiles").withIndex("by_user", (q) => q.eq("userId", userId)).first(),
});

/** List alumni (public directory) */
export const directory = query({
  args: { year: v.optional(v.number()), availableOnly: v.optional(v.boolean()) },
  handler: async (ctx, { year, availableOnly }) => {
    let results = year
      ? await ctx.db.query("alumniProfiles").withIndex("by_year", (q) => q.eq("graduationYear", year)).collect()
      : await ctx.db.query("alumniProfiles").collect();
    if (availableOnly) results = results.filter((r) => r.availableForMentoring);
    return results;
  },
});
