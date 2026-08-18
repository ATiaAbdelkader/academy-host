import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

/** List all journal entries for the current user, newest first. */
export const myEntries = query({
  args: {},
  handler: async (ctx) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) return [];
    const userId = user.subject as any;
    return await ctx.db
      .query("fieldJournal")
      .withIndex("by_user_date", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();
  },
});

/** Get a single journal entry by ID. */
export const get = query({
  args: { entryId: v.id("fieldJournal") },
  handler: async (ctx, { entryId }) => {
    return (await ctx.db.get(entryId)) ?? null;
  },
});

/** Create a new field journal entry. */
export const create = mutation({
  args: {
    title: v.string(),
    location: v.string(),
    date: v.number(),
    soilType: v.optional(v.string()),
    moisture: v.optional(v.number()),
    temperature: v.optional(v.number()),
    ph: v.optional(v.number()),
    notes: v.string(),
    cropStage: v.optional(v.string()),
    weather: v.optional(v.string()),
    actions: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new Error("Must be signed in");
    const userId = user.subject as any;
    return await ctx.db.insert("fieldJournal", {
      userId,
      ...args,
      createdAt: Date.now(),
    });
  },
});

/** Update an existing journal entry. */
export const update = mutation({
  args: {
    entryId: v.id("fieldJournal"),
    title: v.optional(v.string()),
    location: v.optional(v.string()),
    date: v.optional(v.number()),
    soilType: v.optional(v.string()),
    moisture: v.optional(v.number()),
    temperature: v.optional(v.number()),
    ph: v.optional(v.number()),
    notes: v.optional(v.string()),
    cropStage: v.optional(v.string()),
    weather: v.optional(v.string()),
    actions: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new Error("Must be signed in");
    const { entryId, ...updates } = args;
    const entry = await ctx.db.get(entryId);
    if (!entry) throw new Error("Entry not found");
    if (entry.userId !== (user.subject as any))
      throw new Error("Not authorized");
    // Filter out undefined values
    const patch: Record<string, any> = {};
    for (const [k, v] of Object.entries(updates)) {
      if (v !== undefined) patch[k] = v;
    }
    if (Object.keys(patch).length > 0) {
      await ctx.db.patch(entryId, patch);
    }
    return entryId;
  },
});

/** Delete a journal entry. */
export const remove = mutation({
  args: { entryId: v.id("fieldJournal") },
  handler: async (ctx, { entryId }) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new Error("Must be signed in");
    const entry = await ctx.db.get(entryId);
    if (!entry) throw new Error("Entry not found");
    if (entry.userId !== (user.subject as any))
      throw new Error("Not authorized");
    await ctx.db.delete(entryId);
  },
});
