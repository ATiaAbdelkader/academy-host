import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getActive = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("certificateTemplates")
      .withIndex("by_active", (q) => q.eq("active", true))
      .first();
  },
});

export const listAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("certificateTemplates").collect();
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    primaryColor: v.string(),
    accentColor: v.string(),
    logoUrl: v.optional(v.string()),
    borderStyle: v.union(
      v.literal("classic"),
      v.literal("modern"),
      v.literal("botanical"),
      v.literal("minimal")
    ),
    fontFamily: v.string(),
  },
  handler: async (ctx, args) => {
    // Deactivate all existing templates first
    const existing = await ctx.db.query("certificateTemplates").collect();
    for (const t of existing) {
      await ctx.db.patch(t._id, { active: false });
    }
    return await ctx.db.insert("certificateTemplates", {
      ...args,
      active: true,
    });
  },
});

export const update = mutation({
  args: {
    templateId: v.id("certificateTemplates"),
    name: v.optional(v.string()),
    primaryColor: v.optional(v.string()),
    accentColor: v.optional(v.string()),
    logoUrl: v.optional(v.string()),
    borderStyle: v.optional(
      v.union(
        v.literal("classic"),
        v.literal("modern"),
        v.literal("botanical"),
        v.literal("minimal")
      )
    ),
    fontFamily: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { templateId, ...fields } = args;
    const filtered = Object.fromEntries(
      Object.entries(fields).filter(([, v]) => v !== undefined)
    );
    await ctx.db.patch(templateId, filtered);
  },
});

// Seed default template
export const seedTemplate = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("certificateTemplates").first();
    if (existing) return "already seeded";
    return await ctx.db.insert("certificateTemplates", {
      name: "Classic Green",
      primaryColor: "#2d5016",
      accentColor: "#8bc34a",
      borderStyle: "classic",
      fontFamily: "serif",
      active: true,
    });
  },
});
