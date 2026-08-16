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

// Structured content blocks that make up a course. Rendered by the course
// reader in a terminal style (headings, prose, code, lists, notes, video).
export const contentBlockValidator = v.union(
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
  v.object({
    type: v.literal("video"),
    url: v.string(),
    caption: v.optional(v.string()),
  }),
);
export type ContentBlock = Infer<typeof contentBlockValidator>;

export const bookingStatusValidator = v.union(
  v.literal("pending"),
  v.literal("confirmed"),
  v.literal("cancelled"),
);
export type BookingStatus = Infer<typeof bookingStatusValidator>;

export const paymentStatusValidator = v.union(
  v.literal("unpaid"),
  v.literal("paid"),
  v.literal("waived"),
);
export type PaymentStatus = Infer<typeof paymentStatusValidator>;

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

    // The training catalog. One course = one catalog item customers can
    // browse, book a session for, and pay to attend.
    courses: defineTable({
      category: v.string(), // catalog category, e.g. "Foundations"
      title: v.string(),
      slug: v.string(), // url-safe identifier for /courses/:slug
      description: v.string(),
      priceCents: v.number(), // 0 = free
      durationMinutes: v.number(),
      order: v.number(), // global sort order across the catalog
      published: v.boolean(), // visible in the student catalog
      content: v.array(contentBlockValidator), // ordered content blocks
      instructor: v.optional(v.string()), // instructor name shown on the course page
      instructorTitle: v.optional(v.string()), // instructor credentials / role
    })
      .index("by_slug", ["slug"])
      .index("by_order", ["order"]),

    // Live, bookable training sessions for a course.
    sessions: defineTable({
      courseId: v.id("courses"),
      startsAt: v.number(), // epoch ms
      durationMinutes: v.number(),
      capacity: v.number(),
      venue: v.optional(v.string()), // physical location, e.g. "Shed 4, Training Yard"
      joinUrl: v.optional(v.string()), // virtual meeting link for online sessions
      reminder24hSentAt: v.optional(v.number()), // when the 24h email went out
      reminder1hSentAt: v.optional(v.number()), // when the 1h email went out
    }).index("by_course_start", ["courseId", "startsAt"]),

    // A customer's booking for one session of one course.
    bookings: defineTable({
      userId: v.id("users"),
      courseId: v.id("courses"),
      sessionId: v.id("sessions"),
      amountCents: v.number(), // price at booking time
      status: bookingStatusValidator, // pending | confirmed | cancelled
      paymentStatus: paymentStatusValidator, // unpaid | paid | waived
      createdAt: v.number(),
      confirmationEmailSentAt: v.optional(v.number()), // when the confirm email went out
      couponCode: v.optional(v.string()), // applied discount code, if any
      discountCents: v.optional(v.number()), // amount discounted at checkout
      waitlistOfferEmailSentAt: v.optional(v.number()), // seat-offer email sent
      stripePaymentIntentId: v.optional(v.string()), // Stripe payment_intent id
      refundedAt: v.optional(v.number()), // when the admin refunded the booking
      refundId: v.optional(v.string()), // Stripe refund id
      attendedAt: v.optional(v.number()), // when the admin marked the student attended
    })
      .index("by_user", ["userId"])
      .index("by_session", ["sessionId"]),

    // Questions and comments attached to a course.
    comments: defineTable({
      courseId: v.id("courses"),
      userId: v.id("users"),
      authorName: v.string(),
      text: v.string(),
      visible: v.boolean(),
      createdAt: v.number(),
    }).index("by_course", ["courseId"]),

    // A student's self-tracked status for a course: started | completed.
    progress: defineTable({
      userId: v.id("users"),
      courseId: v.id("courses"),
      status: v.union(v.literal("started"), v.literal("completed")),
      note: v.optional(v.string()), // private study notes for this course
      updatedAt: v.number(),
    }).index("by_user_course", ["userId", "courseId"]),

    // Students waiting for a freed seat on a full session.
    waitlist: defineTable({
      sessionId: v.id("sessions"),
      userId: v.id("users"),
      createdAt: v.number(),
    })
      .index("by_session", ["sessionId"])
      .index("by_user", ["userId"]),

    // Post-course ratings from students who attended (1–5 stars + optional note).
    reviews: defineTable({
      courseId: v.id("courses"),
      userId: v.id("users"),
      rating: v.number(), // 1–5
      comment: v.optional(v.string()),
      createdAt: v.number(),
    })
      .index("by_course", ["courseId"])
      .index("by_user", ["userId"]),

    // Discount codes the academy can apply at checkout.
    coupons: defineTable({
      code: v.string(), // uppercase, e.g. "HARVEST15"
      percentOff: v.number(), // 1–99
      active: v.boolean(),
      maxUses: v.optional(v.number()), // optional usage cap; missing = unlimited
      usedCount: v.optional(v.number()), // how many paid bookings used it
      createdAt: v.number(),
    }).index("by_code", ["code"]),
  },
  {
    schemaValidation: false,
  },
);

export default schema;
