import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: { courseId: v.optional(v.id("courses")) },
  handler: async (ctx, args) => {
    if (args.courseId) {
      return await ctx.db
        .query("studyGroups")
        .withIndex("by_course", (q) => q.eq("courseId", args.courseId))
        .collect();
    }
    return await ctx.db.query("studyGroups").collect();
  },
});

export const myGroups = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const memberships = await ctx.db
      .query("studyGroupMembers")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();
    const groups = await Promise.all(
      memberships.map((m) => ctx.db.get(m.groupId))
    );
    return groups.filter(Boolean);
  },
});

export const getMessages = query({
  args: { groupId: v.id("studyGroups") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("studyGroupMessages")
      .withIndex("by_group", (q) => q.eq("groupId", args.groupId))
      .order("desc")
      .take(100);
  },
});

export const create = mutation({
  args: {
    creatorId: v.id("users"),
    creatorName: v.string(),
    name: v.string(),
    description: v.string(),
    courseId: v.optional(v.id("courses")),
    maxMembers: v.number(),
    isPublic: v.boolean(),
    tags: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const groupId = await ctx.db.insert("studyGroups", {
      ...args,
      memberCount: 1,
      createdAt: Date.now(),
    });
    await ctx.db.insert("studyGroupMembers", {
      groupId,
      userId: args.creatorId,
      name: args.creatorName,
      role: "owner",
      joinedAt: Date.now(),
    });
    return groupId;
  },
});

export const join = mutation({
  args: {
    groupId: v.id("studyGroups"),
    userId: v.id("users"),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const group = await ctx.db.get(args.groupId);
    if (!group) throw new Error("Group not found");
    if (group.memberCount >= group.maxMembers) throw new Error("Group is full");

    const existing = await ctx.db
      .query("studyGroupMembers")
      .withIndex("by_group", (q) => q.eq("groupId", args.groupId))
      .collect();
    if (existing.some((m) => m.userId === args.userId)) {
      throw new Error("Already a member");
    }

    await ctx.db.insert("studyGroupMembers", {
      groupId: args.groupId,
      userId: args.userId,
      name: args.name,
      role: "member",
      joinedAt: Date.now(),
    });
    await ctx.db.patch(args.groupId, { memberCount: group.memberCount + 1 });
  },
});

export const sendMessage = mutation({
  args: {
    groupId: v.id("studyGroups"),
    userId: v.id("users"),
    authorName: v.string(),
    text: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("studyGroupMessages", {
      groupId: args.groupId,
      userId: args.userId,
      authorName: args.authorName,
      text: args.text,
      createdAt: Date.now(),
    });
  },
});
