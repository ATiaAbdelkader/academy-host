import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

/** Assessment types students can submit */
export const ASSESSMENT_TYPES = [
  { id: "soil-test", label: "Soil Test Analysis", icon: "🧪", description: "Upload a photo of your soil test results and explain the readings" },
  { id: "crop-plan", label: "Crop Rotation Plan", icon: "🔄", description: "Submit a seasonal crop rotation plan for your farm" },
  { id: "pest-id", label: "Pest Identification", icon: "🐛", description: "Photograph a pest or disease and identify treatment" },
  { id: "irrigation-plan", label: "Irrigation Design", icon: "💧", description: "Design an irrigation layout for a given field size" },
  { id: "business-plan", label: "Farm Business Plan", icon: "📊", description: "Create a 1-year business plan for a farm enterprise" },
  { id: "harvest-log", label: "Harvest Quality Log", icon: "🌾", description: "Document harvest quality metrics and post-harvest handling" },
] as const;

/** List available assessment types */
export const listTypes = query({
  args: {},
  handler: async () => {
    return ASSESSMENT_TYPES;
  },
});

/** Submit a new assessment */
export const submit = mutation({
  args: {
    type: v.string(),
    title: v.string(),
    description: v.string(),
    mediaUrl: v.optional(v.string()),
    courseId: v.optional(v.id("courses")),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const user = await ctx.db.get(userId);
    const name = user?.name ?? "Student";

    const id = await ctx.db.insert("peerReviews", {
      authorId: userId,
      authorName: name,
      courseId: args.courseId ?? (await ctx.db.query("courses").first())!._id,
      moduleId: 0,
      title: `[${args.type}] ${args.title}`,
      content: args.description + (args.mediaUrl ? `\n\nMedia: ${args.mediaUrl}` : ""),
      status: "submitted",
      createdAt: Date.now(),
    });

    return id;
  },
});

/** Get my submitted assessments */
export const mySubmissions = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    const reviews = await ctx.db
      .query("peerReviews")
      .withIndex("by_author", (q) => q.eq("authorId", userId))
      .collect();

    return reviews
      .filter((r) => r.title.startsWith("["))
      .map((r) => {
        const match = r.title.match(/^\[(.+?)\] (.+)$/);
        const mediaMatch = r.content.match(/\n\nMedia: (.+)$/);
        return {
          _id: r._id,
          type: match?.[1] ?? "unknown",
          title: match?.[2] ?? r.title,
          description: r.content.replace(/\n\nMedia: .+$/, ""),
          mediaUrl: mediaMatch?.[1],
          status: r.status,
          grade: r.grade,
          feedback: r.feedback,
          createdAt: r.createdAt,
        };
      });
  },
});

/** Get all assessments (admin) */
export const allSubmissions = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const reviews = await ctx.db.query("peerReviews").collect();
    return reviews
      .filter((r) => r.title.startsWith("["))
      .map((r) => {
        const match = r.title.match(/^\[(.+?)\] (.+)$/);
        return {
          _id: r._id,
          authorId: r.authorId,
          authorName: r.authorName,
          type: match?.[1] ?? "unknown",
          title: match?.[2] ?? r.title,
          description: r.content,
          status: r.status,
          grade: r.grade,
          feedback: r.feedback,
          createdAt: r.createdAt,
        };
      });
  },
});

/** Grade an assessment (admin) */
export const grade = mutation({
  args: {
    reviewId: v.id("peerReviews"),
    grade: v.number(),
    feedback: v.optional(v.string()),
    status: v.union(v.literal("under_review"), v.literal("graded")),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.reviewId, {
      grade: args.grade,
      feedback: args.feedback,
      status: args.status,
      reviewedAt: Date.now(),
    });
    return { graded: true };
  },
});
