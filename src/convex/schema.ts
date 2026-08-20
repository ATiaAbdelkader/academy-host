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

    // Printable resources (field guides, checklists, calendars) sold or given
    // away as digital downloads — CourseLit-style. Content lives in
    // structured sections rendered as a clean printable document, so no file
    // storage is needed.
    downloads: defineTable({
      title: v.string(),
      slug: v.string(),
      description: v.string(),
      docType: v.union(
        v.literal("guide"),
        v.literal("checklist"),
        v.literal("calendar"),
        v.literal("template"),
      ),
      priceCents: v.number(), // 0 = free lead magnet
      popular: v.boolean(),
      sections: v.array(
        v.object({
          heading: v.string(),
          body: v.optional(v.string()),
          items: v.optional(v.array(v.string())), // checklist lines
        }),
      ),
      createdAt: v.number(),
    }).index("by_slug", ["slug"]),

    // Who unlocked a download. Free downloads are paid immediately; paid ones
    // start "pending" until the academy settles them (mirrors the session
    // waive flow — extend with Stripe later).
    downloadPurchases: defineTable({
      userId: v.id("users"),
      downloadId: v.id("downloads"),
      paymentStatus: v.union(
        v.literal("paid"),
        v.literal("waived"),
        v.literal("pending"),
      ),
      createdAt: v.number(),
    })
      .index("by_user", ["userId"])
      .index("by_download", ["downloadId"]),

    // Spaced-repetition review cards (FSRS). Auto-created for quiz questions
    // answered wrong; the review page schedules the next repetition.
    fieldJournal: defineTable({
      userId: v.id("users"),
      title: v.string(),
      location: v.string(),
      date: v.number(),
      soilType: v.optional(v.string()),
      moisture: v.optional(v.number()),
      temperature: v.optional(v.number()),
      ph: v.optional(v.number()),
      notes: v.string(),
      cropStage: v.optional(v.string()),
      weather: v.optional(v.string()),
      actions: v.optional(v.array(v.string())),
      createdAt: v.number(),
    }).index("by_user_date", ["userId", "date"]),
    leaderboard: defineTable({
      userId: v.id("users"),
      name: v.string(),
      points: v.number(),
      coursesCompleted: v.number(),
      quizzesPassed: v.number(),
      streak: v.number(),
      badges: v.array(v.string()),
      updatedAt: v.number(),
    }).index("by_points", ["points"]),
    reviewCards: defineTable({
      userId: v.id("users"),
      courseId: v.id("courses"),
      courseTitle: v.string(),
      courseSlug: v.string(),
      moduleTitle: v.string(),
      question: v.string(),
      options: v.array(v.string()),
      answerIndex: v.number(),
      due: v.number(), // epoch ms the card is next reviewable
      state: v.object({
        difficulty: v.number(),
        stability: v.number(),
        elapsedDays: v.number(),
        scheduledDays: v.number(),
        reps: v.number(),
        lapses: v.number(),
        lastReview: v.number(),
      }),
      createdAt: v.number(),
    }).index("by_user_due", ["userId", "due"]),

    // ── Live Sessions / Webinars ──
    liveSessions: defineTable({
      courseId: v.id("courses"),
      title: v.string(),
      description: v.optional(v.string()),
      instructorId: v.id("users"),
      instructorName: v.string(),
      startsAt: v.number(), // epoch ms
      durationMinutes: v.number(),
      capacity: v.number(),
      meetingUrl: v.optional(v.string()),
      recordingUrl: v.optional(v.string()),
      status: v.union(v.literal("scheduled"), v.literal("live"), v.literal("ended"), v.literal("cancelled")),
      tags: v.array(v.string()),
      createdAt: v.number(),
    })
      .index("by_course", ["courseId"])
      .index("by_status", ["status"])
      .index("by_startsAt", ["startsAt"]),

    liveSessionRsvps: defineTable({
      sessionId: v.id("liveSessions"),
      userId: v.id("users"),
      status: v.union(v.literal("registered"), v.literal("attended"), v.literal("missed")),
      createdAt: v.number(),
    })
      .index("by_session", ["sessionId"])
      .index("by_user", ["userId"]),

    // ── Mentorship Matching ──
    mentors: defineTable({
      userId: v.id("users"),
      name: v.string(),
      bio: v.string(),
      expertise: v.array(v.string()),
      maxMentees: v.number(),
      available: v.boolean(),
      rating: v.number(),
      menteeCount: v.number(),
      createdAt: v.number(),
    })
      .index("by_user", ["userId"])
      .index("by_available", ["available"]),

    mentorships: defineTable({
      mentorId: v.id("mentors"),
      menteeId: v.id("users"),
      courseId: v.optional(v.id("courses")),
      status: v.union(v.literal("pending"), v.literal("active"), v.literal("completed"), v.literal("cancelled")),
      goals: v.optional(v.string()),
      notes: v.optional(v.string()),
      startedAt: v.optional(v.number()),
      completedAt: v.optional(v.number()),
      createdAt: v.number(),
    })
      .index("by_mentor", ["mentorId"])
      .index("by_mentee", ["menteeId"]),

    // ── Peer Review Assignments ──
    peerReviews: defineTable({
      authorId: v.id("users"),
      authorName: v.string(),
      courseId: v.id("courses"),
      moduleId: v.number(),
      title: v.string(),
      content: v.string(),
      status: v.union(v.literal("submitted"), v.literal("under_review"), v.literal("graded")),
      grade: v.optional(v.number()), // 0-100
      feedback: v.optional(v.string()),
      reviewerId: v.optional(v.id("users")),
      reviewerName: v.optional(v.string()),
      createdAt: v.number(),
      reviewedAt: v.optional(v.number()),
    })
      .index("by_course", ["courseId"])
      .index("by_author", ["authorId"])
      .index("by_status", ["status"]),

    // ── Gamification Store ──
    storeItems: defineTable({
      title: v.string(),
      description: v.string(),
      category: v.union(v.literal("badge"), v.literal("theme"), v.literal("unlock"), v.literal("avatar"), v.literal("title")),
      pricePoints: v.number(),
      icon: v.string(),
      preview: v.optional(v.string()),
      active: v.boolean(),
      order: v.number(),
    })
      .index("by_category", ["category"])
      .index("by_order", ["order"]),

    storePurchases: defineTable({
      userId: v.id("users"),
      itemId: v.id("storeItems"),
      pointsSpent: v.number(),
      createdAt: v.number(),
    })
      .index("by_user", ["userId"])
      .index("by_item", ["itemId"]),

    // ── Study Groups ──
    studyGroups: defineTable({
      name: v.string(),
      description: v.string(),
      courseId: v.optional(v.id("courses")),
      creatorId: v.id("users"),
      creatorName: v.string(),
      maxMembers: v.number(),
      memberCount: v.number(),
      isPublic: v.boolean(),
      tags: v.array(v.string()),
      createdAt: v.number(),
    })
      .index("by_course", ["courseId"])
      .index("by_creator", ["creatorId"]),

    studyGroupMembers: defineTable({
      groupId: v.id("studyGroups"),
      userId: v.id("users"),
      name: v.string(),
      role: v.union(v.literal("owner"), v.literal("admin"), v.literal("member")),
      joinedAt: v.number(),
    })
      .index("by_group", ["groupId"])
      .index("by_user", ["userId"]),

    studyGroupMessages: defineTable({
      groupId: v.id("studyGroups"),
      userId: v.id("users"),
      authorName: v.string(),
      text: v.string(),
      createdAt: v.number(),
    })
      .index("by_group", ["groupId"]),

    // ── Weekly Challenges ──
    weeklyChallenges: defineTable({
      title: v.string(),
      description: v.string(),
      type: v.union(v.literal("quiz"), v.literal("journal"), v.literal("streak"), v.literal("review"), v.literal("quizComp")),
      targetValue: v.number(), // e.g. pass 3 quizzes, journal 5 entries
      pointsReward: v.number(),
      badgeReward: v.optional(v.string()),
      startDate: v.number(),
      endDate: v.number(),
      active: v.boolean(),
      createdAt: v.number(),
    })
      .index("by_active", ["active"])  
      .index("by_dates", ["startDate", "endDate"]),

    challengeParticipations: defineTable({
      challengeId: v.id("weeklyChallenges"),
      userId: v.id("users"),
      progress: v.number(), // current count towards target
      completed: v.boolean(),
      claimed: v.boolean(),
      createdAt: v.number(),
      completedAt: v.optional(v.number()),
    })
      .index("by_challenge", ["challengeId"])
      .index("by_user_challenge", ["userId", "challengeId"]),

    // ── Course Wishlists ──
    wishlists: defineTable({
      userId: v.id("users"),
      courseId: v.id("courses"),
      createdAt: v.number(),
    })
      .index("by_user", ["userId"])
      .index("by_course", ["courseId"]),

    // ── Module Q&A Discussions ──
    moduleDiscussions: defineTable({
      courseId: v.id("courses"),
      moduleIndex: v.number(),
      userId: v.id("users"),
      authorName: v.string(),
      question: v.string(),
      parentReplyId: v.optional(v.id("moduleDiscussions")),
      upvotes: v.number(),
      answerCount: v.number(),
      resolved: v.boolean(),
      createdAt: v.number(),
    })
      .index("by_course_module", ["courseId", "moduleIndex"])
      .index("by_user", ["userId"]),

    // ── Referral Program ──
    referrals: defineTable({
      referrerId: v.id("users"),
      refereeId: v.optional(v.id("users")),
      code: v.string(), // unique referral code
      uses: v.number(),
      rewardPointsEarned: v.number(),
      active: v.boolean(),
      createdAt: v.number(),
    })
      .index("by_code", ["code"])
      .index("by_referrer", ["referrerId"]),

    // ── Custom Certificates ──
    certificateTemplates: defineTable({
      name: v.string(),
      primaryColor: v.string(),
      accentColor: v.string(),
      logoUrl: v.optional(v.string()),
      borderStyle: v.union(v.literal("classic"), v.literal("modern"), v.literal("botanical"), v.literal("minimal")),
      fontFamily: v.string(),
      active: v.boolean(),
    })
      .index("by_active", ["active"]),

    // ── Revenue / Admin Analytics ──
    revenueSnapshots: defineTable({
      date: v.string(), // YYYY-MM-DD
      totalRevenue: v.number(),
      enrollments: v.number(),
      activeUsers: v.number(),
      newUsers: v.number(),
      completedCourses: v.number(),
      topCourseId: v.optional(v.id("courses")),
      topCourseRevenue: v.number(),
      createdAt: v.number(),
    })
      .index("by_date", ["date"]),

    // ── Competency Skills Matrix ──
    competencies: defineTable({
      name: v.string(), // e.g. "Soil Analysis", "Pest Identification"
      category: v.string(), // e.g. "Foundations", "AgTech"
      description: v.string(),
      icon: v.optional(v.string()),
    }).index("by_category", ["category"]),

    userCompetencies: defineTable({
      userId: v.id("users"),
      competencyId: v.id("competencies"),
      level: v.number(), // 0-5 (0=none, 1=beginner, 2=intermediate, 3=advanced, 4=expert, 5=master)
      score: v.number(), // 0-100
      quizzesTaken: v.number(),
      bestScore: v.number(),
      lastPracticedAt: v.number(),
      updatedAt: v.number(),
    })
      .index("by_user", ["userId"])
      .index("by_user_competency", ["userId", "competencyId"]),

    // ── Case Study Challenges ──
    caseStudies: defineTable({
      title: v.string(),
      description: v.string(),
      category: v.string(),
      difficulty: v.union(v.literal("beginner"), v.literal("intermediate"), v.literal("advanced")),
      scenario: v.string(), // the problem statement
      context: v.string(), // background data
      questions: v.array(v.object({
        question: v.string(),
        options: v.array(v.string()),
        answerIndex: v.number(),
        explanation: v.string(),
      })),
      pointsReward: v.number(),
      estimatedMinutes: v.number(),
      tags: v.array(v.string()),
      active: v.boolean(),
      createdAt: v.number(),
    }).index("by_category", ["category"]).index("by_active", ["active"]),

    caseStudyAttempts: defineTable({
      userId: v.id("users"),
      caseStudyId: v.id("caseStudies"),
      answers: v.array(v.number()),
      correct: v.number(),
      total: v.number(),
      score: v.number(), // 0-100
      passed: v.boolean(),
      reflection: v.optional(v.string()), // student's written analysis
      createdAt: v.number(),
    }).index("by_user", ["userId"]).index("by_case", ["caseStudyId"]),

    // ── Virtual Lab Simulations ──
    virtualLabs: defineTable({
      title: v.string(),
      description: v.string(),
      category: v.string(), // e.g. "Soil Testing", "Crop Planning"
      instructions: v.string(),
      parameters: v.array(v.object({
        name: v.string(),
        label: v.string(),
        type: v.union(v.literal("number"), v.literal("select"), v.literal("boolean")),
        min: v.optional(v.number()),
        max: v.optional(v.number()),
        step: v.optional(v.number()),
        options: v.optional(v.array(v.string())),
        default: v.union(v.number(), v.string(), v.boolean()),
      })),
      calculationType: v.string(), // determines which formula to use
      pointsReward: v.number(),
      active: v.boolean(),
      createdAt: v.number(),
    }).index("by_category", ["category"]).index("by_active", ["active"]),

    labSubmissions: defineTable({
      userId: v.id("users"),
      labId: v.id("virtualLabs"),
      inputs: v.string(), // JSON of parameter values
      result: v.string(), // JSON of calculation output
      reflection: v.optional(v.string()),
      pointsEarned: v.number(),
      createdAt: v.number(),
    }).index("by_user", ["userId"]).index("by_lab", ["labId"]),

    // ── Daily Micro-Lessons ──
    microLessons: defineTable({
      title: v.string(),
      tip: v.string(), // the 1-2 sentence lesson
      category: v.string(),
      difficulty: v.union(v.literal("basic"), v.literal("intermediate"), v.literal("advanced")),
      date: v.string(), // YYYY-MM-DD — one per day per category
      tags: v.array(v.string()),
      createdAt: v.number(),
    }).index("by_date", ["date"]).index("by_category", ["category"]),

    microLessonViews: defineTable({
      userId: v.id("users"),
      lessonId: v.id("microLessons"),
      viewedAt: v.number(),
    }).index("by_user", ["userId"]).index("by_lesson", ["lessonId"]),

    // ── Farm Business Plans ──
    businessPlans: defineTable({
      userId: v.id("users"),
      farmName: v.string(),
      farmType: v.string(), // e.g. "crop", "livestock", "mixed", "hydroponic"
      acreage: v.number(),
      location: v.string(),
      crops: v.array(v.string()),
      goals: v.string(),
      budget: v.number(), // in cents
      timeline: v.string(), // e.g. "3 years"
      generatedPlan: v.string(), // JSON of the full plan
      createdAt: v.number(),
    }).index("by_user", ["userId"]),

    // ── Soil Test Reports ──
    soilReports: defineTable({
      userId: v.id("users"),
      fieldName: v.string(),
      location: v.string(),
      soilType: v.string(),
      ph: v.number(),
      nitrogen: v.number(), // ppm
      phosphorus: v.number(), // ppm
      potassium: v.number(), // ppm
      organicMatter: v.number(), // percentage
      moisture: v.number(), // percentage
      notes: v.optional(v.string()),
      recommendations: v.string(), // JSON of generated recommendations
      createdAt: v.number(),
    }).index("by_user", ["userId"]),

    // ── Crop ROI Calculations ──
    roiCalculations: defineTable({
      userId: v.id("users"),
      cropType: v.string(),
      acreage: v.number(),
      seedCost: v.number(), // cents
      fertilizerCost: v.number(),
      laborCost: v.number(),
      equipmentCost: v.number(),
      irrigationCost: v.number(),
      otherCosts: v.number(),
      expectedYield: v.number(), // tons per acre
      pricePerUnit: v.number(), // cents per ton
      result: v.string(), // JSON with ROI, profit, break-even etc
      createdAt: v.number(),
    }).index("by_user", ["userId"]),

    // ── Office Hours / 1-on-1 Scheduling ──
    officeHours: defineTable({
      instructorId: v.id("users"),
      instructorName: v.string(),
      courseId: v.optional(v.id("courses")),
      title: v.string(),
      description: v.optional(v.string()),
      startsAt: v.number(),
      durationMinutes: v.number(),
      maxStudents: v.number(),
      meetingUrl: v.optional(v.string()),
      status: v.union(v.literal("scheduled"), v.literal("live"), v.literal("ended"), v.literal("cancelled")),
      createdAt: v.number(),
    }).index("by_instructor", ["instructorId"]).index("by_status", ["status"]),

    officeHourBookings: defineTable({
      officeHourId: v.id("officeHours"),
      userId: v.id("users"),
      studentName: v.string(),
      topic: v.optional(v.string()),
      status: v.union(v.literal("registered"), v.literal("attended"), v.literal("missed")),
      createdAt: v.number(),
    }).index("by_officeHour", ["officeHourId"]).index("by_user", ["userId"]),

    // ── Peer Teaching Answers ──
    peerTeachingAnswers: defineTable({
      userId: v.id("users"),
      authorName: v.string(),
      courseId: v.id("courses"),
      questionText: v.string(),
      answerText: v.string(),
      upvotes: v.number(),
      verified: v.boolean(), // marked correct by instructor
      pointsEarned: v.number(),
      createdAt: v.number(),
    }).index("by_course", ["courseId"]).index("by_user", ["userId"]),

    // ── Alumni Network ──
    alumniProfiles: defineTable({
      userId: v.id("users"),
      name: v.string(),
      graduationYear: v.number(),
      completedCourses: v.array(v.string()),
      expertise: v.array(v.string()),
      bio: v.string(),
      availableForMentoring: v.boolean(),
      linkedinUrl: v.optional(v.string()),
      location: v.optional(v.string()),
      createdAt: v.number(),
    }).index("by_user", ["userId"]).index("by_year", ["graduationYear"]),

    // ── Micro-Credentials ──
    microCredentials: defineTable({
      name: v.string(), // e.g. "Soil Science Specialist"
      description: v.string(),
      category: v.string(),
      requiredCompetencies: v.array(v.id("competencies")),
      requiredLevel: v.number(), // minimum level for each competency
      icon: v.string(),
      color: v.string(),
      active: v.boolean(),
      createdAt: v.number(),
    }).index("by_category", ["category"]).index("by_active", ["active"]),

    userMicroCredentials: defineTable({
      userId: v.id("users"),
      credentialId: v.id("microCredentials"),
      earnedAt: v.number(),
      verified: v.boolean(),
    }).index("by_user", ["userId"]).index("by_credential", ["credentialId"]),

    // ── Virtual Farm Simulator ──
    virtualFarms: defineTable({
      userId: v.id("users"),
      farmName: v.string(),
      landSize: v.number(), // acres
      soilType: v.union(v.literal("sandy"), v.literal("loam"), v.literal("clay"), v.literal("silt"), v.literal("peat")),
      climateZone: v.string(),
      startingBudget: v.number(), // cents
      currentBudget: v.number(),
      waterSource: v.union(v.literal("rainfed"), v.literal("irrigated"), v.literal("both")),
      season: v.number(),
      year: v.number(),
      month: v.number(),
      soilHealth: v.number(), // 0-100
      soilMoisture: v.number(), // 0-100
      pestPressure: v.number(), // 0-100
      reputation: v.number(), // 0-100
      totalEarnings: v.number(),
      totalSpent: v.number(),
      cropsHarvested: v.number(),
      activeCrop: v.optional(v.string()),
      cropStage: v.optional(v.string()),
      cropDays: v.number(),
      logs: v.array(v.object({
        message: v.string(),
        date: v.number(),
        type: v.union(v.literal("planting"), v.literal("harvest"), v.literal("action"), v.literal("event"), v.literal("weather")),
      })),
      createdAt: v.number(),
    }).index("by_user", ["userId"]),

    // ── AI Crop Doctor ──
    cropDiagnoses: defineTable({
      userId: v.id("users"),
      cropType: v.string(),
      reportedSymptoms: v.string(),
      photoUrl: v.optional(v.string()),
      diagnosis: v.string(),
      confidence: v.number(), // 0-100
      severity: v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
      treatment: v.string(),
      relatedCourseSlug: v.string(),
      createdAt: v.number(),
    }).index("by_user", ["userId"]),

    // ── Farm Advisory Profile ──
    farmProfiles: defineTable({
      userId: v.id("users"),
      location: v.string(),
      latitude: v.optional(v.number()),
      longitude: v.optional(v.number()),
      climateZone: v.union(v.literal("tropical"), v.literal("temperate"), v.literal("arid"), v.literal("equatorial")),
      soilType: v.optional(v.string()),
      farmSize: v.optional(v.number()),
      primaryCrops: v.array(v.string()),
      updatedAt: v.number(),
    }).index("by_user", ["userId"]),
  },
  {
    schemaValidation: false,
  },
);

export default schema;
