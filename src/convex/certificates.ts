import { query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Public certificate verification. A certificate number looks like
 * AGS-XXXX-YYYY (course-id suffix + user-id suffix, upper-case). Anyone can
 * look one up — the result shows the holder's name, course, and completion
 * date, which is enough for an employer or buyer to confirm the document is
 * genuine, without exposing emails or other account details.
 *
 * Returns null when the code is malformed or doesn't match any completed
 * course, and a `valid` result otherwise.
 */
export const verify = query({
  args: { code: v.string() },
  handler: async (ctx, { code }) => {
    const normalized = code.trim().toUpperCase();
    const match = normalized.match(/^AGS-([A-Z0-9]{4})-([A-Z0-9]{4})$/);
    if (!match) {
      return null;
    }
    const [, courseSuffix, userSuffix] = match;

    const completed = await ctx.db
      .query("progress")
      .filter((q) => q.eq(q.field("status"), "completed"))
      .collect();

    for (const entry of completed) {
      if (entry.courseId.slice(-4).toUpperCase() !== courseSuffix) continue;
      if (entry.userId.slice(-4).toUpperCase() !== userSuffix) continue;
      const course = await ctx.db.get(entry.courseId);
      const user = await ctx.db.get(entry.userId);
      return {
        valid: true as const,
        certId: `AGS-${courseSuffix}-${userSuffix}`,
        studentName:
          user?.name?.trim() ||
          (user?.email ? user.email.split("@")[0] : "Student"),
        courseTitle: course?.title ?? "Course removed",
        category: course?.category ?? "",
        completedAt: entry.updatedAt,
      };
    }
    return null;
  },
});
