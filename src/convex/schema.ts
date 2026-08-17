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
  v.object({
    type: v.literal("quiz"),
    title: v.string(),
    instructions: v.optional(v.string()),
    passPercent: v.number(), // e.g. 70 = pass at 70%
    questions: v.array(
      v.object({
        question: v.string(),
        options: v.array(v.string()),
        answerIndex: v.number(), // index of the correct option
        open: v.optional(v.boolean()), // true = short-answer, graded by an instructor
        modelAnswer: v.optional(v.string()), // reference answer shown to the grader
      }),
    ),
  }),
);
export type ContentBlock = Infer<typeof contentBlockValidator>;

// One module of a course: a titled section of content that ends (by
// convention) with a quiz whose pass unlocks the next module.
export const courseModuleValidator = v.object({
  title: v.string(),
  content: v.array(contentBlockValidator),
});
export type CourseModule = Infer<typeof courseModuleValidator>;

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
      content: v.array(contentBlockValidator), // flat blocks (legacy / fallback)
      modules: v.optional(v.array(courseModuleValidator)), // ordered modules; each ends with a quiz
      contentVersion: v.optional(v.number()), // seed content version for upgrades
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
      stripeReceiptUrl: v.optional(v.string()), // Stripe hosted receipt link
      refundedAt: v.optional(v.number()), // when the admin refunded the booking
      refundId: v.optional(v.string()), // Stripe refund id
      refundEmailSentAt: v.optional(v.number()), // refund notice email sent
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
      lastModuleIndex: v.optional(v.number()), // furthest module reached (resume + drop-off)
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

    // A student's graded attempt at one quiz block inside a course.
    quizAttempts: defineTable({
      userId: v.id("users"),
      courseId: v.id("courses"),
      quizIndex: v.number(), // which quiz block in the course (0-based)
      correct: v.number(),
      total: v.number(),
      passed: v.boolean(),
      answers: v.optional(v.array(v.number())), // chosen option per question
      textAnswers: v.optional(v.array(v.string())), // open-question answers (aligned to questions)
      openGrades: v.optional(v.array(v.union(v.boolean(), v.null()))), // instructor verdict per open question, null = not graded yet
      pendingReview: v.optional(v.boolean()), // true while open answers await grading
      createdAt: v.number(),
    }).index("by_user_course", ["userId", "courseId"]),

    // In-app notifications for students (booking confirmed, seat offered, refunded).
    notifications: defineTable({
      userId: v.id("users"),
      kind: v.union(
        v.literal("booking_confirmed"),
        v.literal("seat_offered"),
        v.literal("refunded"),
      ),
      title: v.string(),
      body: v.string(),
      link: v.optional(v.string()),
      readAt: v.optional(v.number()),
      createdAt: v.number(),
    }).index("by_user", ["userId"]),

    // Discount codes the academy can apply at checkout.
    coupons: defineTable({
      code: v.string(), // uppercase, e.g. "HARVEST15"
      percentOff: v.number(), // 1–99
      active: v.boolean(),
      maxUses: v.optional(v.number()), // optional usage cap; missing = unlimited
      usedCount: v.optional(v.number()), // how many paid bookings used it
      createdAt: v.number(),
    }).index("by_code", ["code"]),

    // Per-user gamification stats: points, streaks, and lifetime counters
    // used to derive badges. One row per user, upserted on activity.
    userStats: defineTable({
      userId: v.id("users"),
      points: v.number(),
      streakDays: v.number(), // current consecutive-day streak
      bestStreak: v.number(),
      lastActiveDate: v.optional(v.string()), // "YYYY-MM-DD" (UTC)
      quizPasses: v.number(), // distinct module quizzes first-passed
      coursesCompleted: v.number(),
      bookingsCount: v.number(),
      attendedCount: v.number(),
      reviewsCount: v.number(),
      badges: v.array(v.string()),
      updatedAt: v.number(),
    }).index("by_user", ["userId"]),

    // A student's scheduled study plan for one course. Tasks (one lesson +
    // one quiz per module, then a review) unfold day by day.
    studyPlans: defineTable({
      userId: v.id("users"),
      courseId: v.id("courses"),
      title: v.string(),
      startDate: v.number(), // epoch ms of the plan's first day
      completed: v.boolean(),
      completedAt: v.optional(v.number()),
      createdAt: v.number(),
    }).index("by_user", ["userId"]),

    // Individual study tasks inside a plan.
    studyTasks: defineTable({
      planId: v.id("studyPlans"),
      day: v.number(), // day offset from the plan start (0-based)
      title: v.string(),
      kind: v.union(v.literal("lesson"), v.literal("quiz"), v.literal("review")),
      done: v.boolean(),
      doneAt: v.optional(v.number()),
    }).index("by_plan", ["planId"]),

    // Chat history for the AI study assistant.
    aiMessages: defineTable({
      userId: v.id("users"),
      role: v.union(v.literal("user"), v.literal("assistant")),
      content: v.string(),
      courseId: v.optional(v.id("courses")),
      createdAt: v.number(),
    }).index("by_user", ["userId"]),

    // Curated course packs sold at a bundled price. Enrollment happens through
    // the normal booking flow: each bundle carries its own coupon code, and
    // booking any included course with that code applies the bundle discount.
    bundles: defineTable({
      title: v.string(),
      slug: v.string(), // url-safe identifier for /bundles/:slug
      description: v.string(),
      priceCents: v.number(), // bundle price (what the pack costs together)
      regularCents: v.number(), // sum of included courses booked separately
      courseSlugs: v.array(v.string()), // included courses, in display order
      couponCode: v.string(), // coupon that unlocks the bundle discount
      published: v.boolean(),
      order: v.number(),
    })
      .index("by_slug", ["slug"])
      .index("by_order", ["order"]),
  },
  {
    schemaValidation: false,
  },
);

export default schema;
