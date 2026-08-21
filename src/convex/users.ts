import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query, QueryCtx } from "./_generated/server";
import { v } from "convex/values";

/**
 * Get the current signed in user. Returns null if the user is not signed in.
 * Usage: const signedInUser = await ctx.runQuery(api.authHelpers.currentUser);
 * THIS FUNCTION IS READ-ONLY. DO NOT MODIFY.
 */
export const currentUser = query({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);

    if (user === null) {
      return null;
    }

    return user;
  },
});

/**
 * Use this function internally to get the current user data. Remember to handle the null user case.
 * @param ctx
 * @returns
 */
export const getCurrentUser = async (ctx: QueryCtx) => {
  const userId = await getAuthUserId(ctx);
  if (userId === null) {
    return null;
  }
  return await ctx.db.get(userId);
};

/** Role of the signed-in user, or null when signed out. */
export const role = query({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);
    return user?.role ?? null;
  },
});

/**
 * Promotes the signed-in user to admin when no admin exists yet. The first
 * account to reach the admin area claims it; afterwards, admins are managed
 * by an existing admin.
 */
/** All student accounts with active booking counts — admin console. */
export const adminListUsers = query({
  args: {},
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();
    return Promise.all(
      users.map(async (user) => {
        const active = await ctx.db
          .query("bookings")
          .withIndex("by_user", (q) => q.eq("userId", user._id))
          .filter((q) => q.neq(q.field("status"), "cancelled"))
          .collect();
        return { ...user, activeBookings: active.length };
      }),
    );
  },
});

/** Set another account's role. Only an existing admin can call this. */
export const setRole = mutation({
  args: {
    userId: v.id("users"),
    role: v.union(v.literal("admin"), v.literal("user"), v.literal("member"), v.null()),
  },
  handler: async (ctx, { userId, role }) => {
    const callerId = await getAuthUserId(ctx);
    if (callerId === null) {
      throw new Error("Not signed in.");
    }
    const caller = await ctx.db.get(callerId);
    if (caller?.role !== "admin") {
      throw new Error("Administrator access required.");
    }
    const target = await ctx.db.get(userId);
    if (!target) {
      throw new Error("User not found.");
    }
    await ctx.db.patch(userId, { role: role ?? undefined });
    return userId;
  },
});

/** Update the signed-in account's display name. */
export const updateProfile = mutation({
  args: { name: v.string() },
  handler: async (ctx, { name }) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("Not signed in.");
    }
    const trimmed = name.trim();
    if (trimmed.length > 60) {
      throw new Error("Keep the display name under 60 characters.");
    }
    await ctx.db.patch(userId, { name: trimmed || undefined });
    return userId;
  },
});

export const claimFirstAdmin = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return false;
    }
    const existingAdmin = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("role"), "admin"))
      .first();
    if (existingAdmin !== null) {
      return false;
    }
    await ctx.db.patch(userId, { role: "admin" });
    return true;
  },
});
