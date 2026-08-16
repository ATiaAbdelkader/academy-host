import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

function normalizeCode(code: string): string {
  return code.trim().toUpperCase().replace(/\s+/g, "");
}

/** All coupons, newest first — admin console. */
export const adminList = query({
  args: {},
  handler: async (ctx) => {
    return ctx.db.query("coupons").order("desc").collect();
  },
});

/** Public lookup: returns the coupon only when it exists and is active. */
export const getByCode = query({
  args: { code: v.string() },
  handler: async (ctx, { code }) => {
    const normalized = normalizeCode(code);
    if (normalized.length === 0) {
      return null;
    }
    const coupon = await ctx.db
      .query("coupons")
      .withIndex("by_code")
      .filter((q) => q.eq(q.field("code"), normalized))
      .first();
    if (!coupon || !coupon.active) {
      return null;
    }
    return coupon;
  },
});

export const create = mutation({
  args: {
    code: v.string(),
    percentOff: v.number(),
  },
  handler: async (ctx, { code, percentOff }) => {
    const normalized = normalizeCode(code);
    if (normalized.length < 3) {
      throw new Error("Code must be at least 3 characters.");
    }
    const percent = Math.round(percentOff);
    if (percent < 1 || percent > 99) {
      throw new Error("Discount must be between 1 and 99 percent.");
    }
    const existing = await ctx.db
      .query("coupons")
      .withIndex("by_code")
      .filter((q) => q.eq(q.field("code"), normalized))
      .first();
    if (existing) {
      throw new Error(`Code ${normalized} already exists.`);
    }
    return ctx.db.insert("coupons", {
      code: normalized,
      percentOff: percent,
      active: true,
      createdAt: Date.now(),
    });
  },
});

export const setActive = mutation({
  args: {
    id: v.id("coupons"),
    active: v.boolean(),
  },
  handler: async (ctx, { id, active }) => {
    const coupon = await ctx.db.get(id);
    if (!coupon) {
      throw new Error("Coupon not found.");
    }
    await ctx.db.patch(id, { active });
    return id;
  },
});

export const remove = mutation({
  args: { id: v.id("coupons") },
  handler: async (ctx, { id }) => {
    const coupon = await ctx.db.get(id);
    if (!coupon) {
      throw new Error("Coupon not found.");
    }
    await ctx.db.delete(id);
    return id;
  },
});
