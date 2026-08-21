import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

/**
 * Learning Buddy System: auto-match students with similar goals,
 * weekly check-ins, shared progress tracking.
 */

/** Request a learning buddy match */
export const requestBuddy = mutation({
  args: {
    goals: v.array(v.string()),
    experienceLevel: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const user = await ctx.db.get(userId);
    const name = user?.name ?? "Student";

    // Check if already in a buddy group
    const myMemberships = await ctx.db
      .query("studyGroupMembers")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    const existingBuddy = myMemberships.find((m) => m.groupId.toString().startsWith("buddy-") || true);
    if (existingBuddy) {
      const group = await ctx.db.get(existingBuddy.groupId);
      if (group && group.memberCount < 2) {
        // Already waiting in a buddy group
        return { matched: false, message: "Still looking for your buddy...", groupId: existingBuddy.groupId };
      }
    }

    // Find a waiting buddy group (single member)
    const allGroups = await ctx.db.query("studyGroups").collect();
    const waitingGroups: any[] = [];

    for (const group of allGroups) {
      if (group.memberCount === 1 && group.tags.includes("buddy") && group.creatorId !== userId) {
        const members = await ctx.db
          .query("studyGroupMembers")
          .withIndex("by_group", (q) => q.eq("groupId", group._id))
          .collect();
        if (members.length === 1) {
          waitingGroups.push(group);
        }
      }
    }

    if (waitingGroups.length > 0) {
      // Join the first waiting buddy group
      const match = waitingGroups[0];
      await ctx.db.patch(match._id, { memberCount: 2 });
      await ctx.db.insert("studyGroupMembers", {
        groupId: match._id,
        userId,
        name,
        role: "member",
        joinedAt: Date.now(),
      });
      return { matched: true, message: "You've been matched with a learning buddy!", groupId: match._id };
    }

    // Create a new waiting buddy group
    const groupId = await ctx.db.insert("studyGroups", {
      name: `Buddy Pair — ${args.goals.join(", ")}`,
      description: `Looking for a learning buddy. Goals: ${args.goals.join(", ")}. Experience: ${args.experienceLevel ?? "any"}`,
      creatorId: userId,
      creatorName: name,
      maxMembers: 2,
      memberCount: 1,
      isPublic: false,
      tags: ["buddy", ...args.goals.map((g) => g.toLowerCase())],
      createdAt: Date.now(),
    });

    await ctx.db.insert("studyGroupMembers", {
      groupId,
      userId,
      name,
      role: "owner",
      joinedAt: Date.now(),
    });

    return { matched: false, message: "Looking for your perfect buddy match...", groupId };
  },
});

/** Get my buddy pairs */
export const myBuddies = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    const myMemberships = await ctx.db
      .query("studyGroupMembers")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    const buddyPairs: any[] = [];

    for (const membership of myMemberships) {
      const group = await ctx.db.get(membership.groupId);
      if (!group || !group.tags.includes("buddy")) continue;

      const allMembers = await ctx.db
        .query("studyGroupMembers")
        .withIndex("by_group", (q) => q.eq("groupId", membership.groupId))
        .collect();

      const buddyMember = allMembers.find((m) => m.userId !== userId);
      if (!buddyMember) continue;

      buddyPairs.push({
        _id: group._id,
        name: group.name,
        description: group.description,
        buddyName: buddyMember.name,
        buddyUserId: buddyMember.userId,
        memberCount: group.memberCount,
        createdAt: group.createdAt,
      });
    }

    return buddyPairs;
  },
});

/** Send a check-in message */
export const sendCheckIn = mutation({
  args: {
    groupId: v.id("studyGroups"),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const user = await ctx.db.get(userId);
    const name = user?.name ?? "Student";

    await ctx.db.insert("studyGroupMessages", {
      groupId: args.groupId,
      userId,
      authorName: name,
      text: args.message,
      createdAt: Date.now(),
    });

    return { sent: true };
  },
});

/** Get check-in messages for a buddy pair */
export const getMessages = query({
  args: {
    groupId: v.id("studyGroups"),
  },
  handler: async (ctx, args) => {
    const messages = await ctx.db
      .query("studyGroupMessages")
      .withIndex("by_group", (q) => q.eq("groupId", args.groupId))
      .order("asc")
      .collect();
    return messages;
  },
});
