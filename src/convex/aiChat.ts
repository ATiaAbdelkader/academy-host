import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import type { Id } from "./_generated/dataModel";

// With Convex Auth, the users table's id is the auth subject.
function userIdOf(subject: string): Id<"users"> {
  return subject as Id<"users">;
}

/** Store one exchange (question + answer) in the student's chat history. */
export const recordExchange = mutation({
  args: {
    courseId: v.optional(v.id("courses")),
    userMessage: v.string(),
    assistantMessage: v.string(),
  },
  handler: async (ctx, { courseId, userMessage, assistantMessage }) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new Error("Sign in to chat with the assistant.");
    }
    const now = Date.now();
    const userId = userIdOf(user.subject);
    await ctx.db.insert("aiMessages", {
      userId,
      role: "user",
      content: userMessage,
      courseId,
      createdAt: now,
    });
    await ctx.db.insert("aiMessages", {
      userId,
      role: "assistant",
      content: assistantMessage,
      courseId,
      createdAt: now + 1,
    });
  },
});

/** The signed-in student's recent assistant conversation, oldest first. */
export const myMessages = query({
  args: {},
  handler: async (ctx) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      return null;
    }
    const messages = await ctx.db
      .query("aiMessages")
      .withIndex("by_user", (q) => q.eq("userId", userIdOf(user.subject)))
      .order("desc")
      .take(60);
    return messages.reverse();
  },
});
