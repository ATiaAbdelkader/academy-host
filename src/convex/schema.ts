import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { Infer, v } from "convex/values";

// default user roles. can add / remove based on the project as needed
export const ROLES = {
  ADMIN: "admin",
  USER: "user",
  MEMBER: "member",
} as const;

export const roleValidator = v.union(
  v.literal(ROLES.ADMIN),
  v.literal(ROLES.USER),
  v.literal(ROLES.MEMBER),
);
export type Role = Infer<typeof roleValidator>;

// Structured content blocks that make up a lesson. Rendered by the lesson
// reader in a terminal style (headings, prose, code, lists, notes).
export const lessonBlockValidator = v.union(
  v.object({ type: v.literal("heading"), text: v.string() }),
  v.object({ type: v.literal("paragraph"), text: v.string() }),
  v.object({
    type: v.literal("code"),
    text: v.string(),
    prompt: v.optional(v.boolean()),
  }),
  v.object({ type: v.literal("list"), items: v.array(v.string()) }),
  v.object({
    type: v.literal("note"),
    text: v.string(),
    tone: v.union(v.literal("info"), v.literal("warn")),
  }),
);
export type LessonBlock = Infer<typeof lessonBlockValidator>;

const schema = defineSchema(
  {
    // default auth tables using convex auth.
    ...authTables, // do not remove or modify

    // the users table is the default users table that is brought in by the authTables
    users: defineTable({
      name: v.optional(v.string()), // name of the user. do not remove
      image: v.optional(v.string()), // image of the user. do not remove
      email: v.optional(v.string()), // email of the user. do not remove
      emailVerificationTime: v.optional(v.number()), // email verification time. do not remove
      isAnonymous: v.optional(v.boolean()), // is the user anonymous. do not remove

      role: v.optional(roleValidator), // role of the user. do not remove
    }).index("email", ["email"]), // index for the email. do not remove or modify

    // Lessons hosted for students (version 1 scope).
    lessons: defineTable({
      module: v.string(), // curriculum module label, e.g. "01 · Getting Started"
      title: v.string(),
      slug: v.string(), // url-safe identifier for /lessons/:slug
      description: v.string(),
      durationMinutes: v.number(),
      order: v.number(), // global sort order across modules
      content: v.array(lessonBlockValidator), // ordered content blocks
    })
      .index("by_slug", ["slug"])
      .index("by_order", ["order"]),
  },
  {
    schemaValidation: false,
  },
);

export default schema;
