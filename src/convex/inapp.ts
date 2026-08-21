import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import type { GenericMutationCtx } from "convex/server";
import type { DataModel, Id } from "./_generated/dataModel";

/** Insert an in-app notification for a user (used by other mutations). */
export async function notifyUser(
  ctx: { db: GenericMutationCtx<DataModel>["db"] },
  args: {
    userId: Id<"users">;
    kind: "booking_confirmed" | "seat_offered" | "refunded";
    title: string;
    body: string;
    link?: string;
  },
): Promise<void> {
  await ctx.db.insert("notifications", {
    userId: args.userId,
    kind: args.kind,
    title: args.title,
    body: args.body,
    link: args.link,
    createdAt: Date.now(),
  });
}

/** The signed-in student's notifications, newest first. */
export const myNotifications = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return null;
    }
    const notifications = await ctx.db
      .query("notifications")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();
    const unread = notifications.filter((n) => !n.readAt).length;
    return { notifications, unread };
  },
});

/** Mark a single notification as read. */
export const markRead = mutation({
  args: { id: v.id("notifications") },
  handler: async (ctx, { id }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not signed in.");
    }
    const notification = await ctx.db.get(id);
    if (!notification || notification.userId !== userId) {
      throw new Error("Notification not found.");
    }
    if (!notification.readAt) {
      await ctx.db.patch(id, { readAt: Date.now() });
    }
    return id;
  },
});

/** Mark every notification for the signed-in user as read. */
export const markAllRead = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not signed in.");
    }
    const notifications = await ctx.db
      .query("notifications")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();
    let marked = 0;
    for (const notification of notifications) {
      if (!notification.readAt) {
        await ctx.db.patch(notification._id, { readAt: Date.now() });
        marked += 1;
      }
    }
    return marked;
  },
});
