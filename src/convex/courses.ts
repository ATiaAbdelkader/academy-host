import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { contentBlockValidator, type ContentBlock } from "./schema";

export const DAY_MS = 24 * 60 * 60 * 1000;

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Full catalog, ordered as it appears. Students filter to published on the client. */
export const list = query({
  args: {},
  handler: async (ctx) => {
    return ctx.db.query("courses").withIndex("by_order").order("asc").collect();
  },
});

/** A single course by its url slug. Returns null when not found. */
export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    const course = await ctx.db
      .query("courses")
      .withIndex("by_slug")
      .filter((q) => q.eq(q.field("slug"), slug))
      .first();
    return course ?? null;
  },
});

// ---------------------------------------------------------------------------
// Seed catalog — customer training for AgriSkills Academy.
// ---------------------------------------------------------------------------

type SeedCourse = {
  category: string;
  title: string;
  description: string;
  priceCents: number;
  durationMinutes: number;
  order: number;
  instructor: string;
  instructorTitle: string;
  content: ContentBlock[];
};

const seedCatalog: SeedCourse[] = [
  {
    category: "Foundations",
    title: "Welcome to AgriSkills Academy",
    description:
      "A free introduction to the academy: how courses work, how sessions are booked, and how to get the most from your training.",
    priceCents: 0,
    durationMinutes: 8,
    order: 1,
    instructor: "Mara Ellison",
    instructorTitle: "Academy Lead",
    content: [
      {
        type: "paragraph",
        text: "Welcome. AgriSkills Academy is the training home for customers of our products and services. The purpose of this academy is straightforward: to make you confident with the tools, techniques, and practices that keep your operation running well — before, during, and after every season.",
      },
      { type: "heading", text: "How the academy works" },
      {
        type: "list",
        items: [
          "Every course belongs to a category — begin with Foundations.",
          "Courses are ordered. Later categories assume the earlier ones.",
          "Book a live session to train with an instructor, or work through the material on your own schedule.",
          "Comments stay open under every course; our team answers within one business day.",
        ],
      },
      {
        type: "code",
        prompt: true,
        text: "agriskills start welcome\nagriskills status --all\n[ok] account ready",
      },
      {
        type: "note",
        tone: "info",
        text: "This welcome course is free. Paid courses require a booking and checkout before you join a session.",
      },
    ],
  },
  {
    category: "Foundations",
    title: "Field Records & Data Logging with Your Products",
    description:
      "Get the most from your product's digital side — set up records, log events in the field, sync and export, and read the trend views.",
    priceCents: 0,
    durationMinutes: 12,
    order: 2,
    instructor: "Jules Carver",
    instructorTitle: "Technical Documentation Lead",
    content: [
      {
        type: "paragraph",
        text: "Your product ships with a digital records side — an app and a cloud account that are part of what you bought, not an afterthought. Its value is not the software; it is the log you build in it. This course gets you set up once, correctly, so every event this season lands in a record you can actually use.",
      },
      { type: "heading", text: "Set up once, in five minutes" },
      {
        type: "list",
        items: [
          "Create your operation and add your fields — each field gets its own record from day one.",
          "Link your product units so logged events attach to the right machine or sensor.",
          "Invite your team; records belong to the operation, not to one person's phone.",
        ],
      },
      {
        type: "code",
        prompt: true,
        text: "records setup --operation sunrise-farm\n[ok] operation   created\n[ok] field-01    added\n[ok] field-04    added\n[ok] unit        linked 2 devices\n[ok] team        3 members",
      },
      {
        type: "note",
        tone: "info",
        text: "Logs are most valuable when they are boring and consistent. Ten seconds of entry per event beats one perfect spreadsheet at harvest.",
      },
      { type: "heading", text: "The daily rhythm" },
      {
        type: "list",
        items: [
          "Log events as they happen — applications, irrigation, scouting runs, maintenance.",
          "Use the standard event types so exports stay clean; your own labels are fine, but keep them few.",
          "Sync before you leave the field — a log in the phone is not a record until it is in the cloud.",
        ],
      },
      {
        type: "paragraph",
        text: "Trend views turn the log into decisions: last season's irrigation history, this year's scouting counts, each field's fertility trend. The export puts the same data in your spreadsheet or your agronomist's inbox — the log you kept all season is the advantage you paid for.",
      },
      {
        type: "quiz",
        title: "Records knowledge check",
        instructions:
          "Answer all three questions. You need 70% or higher to pass.",
        passPercent: 70,
        questions: [
          {
            question: "Why should you log events as they happen?",
            options: [
              "A log made in the moment is complete; a log at harvest is a guess",
              "The app only stores fresh entries",
              "The cloud runs out of space by the end of the season",
              "It avoids a final sync",
            ],
            answerIndex: 0,
          },
          {
            question: "When does an event become a record?",
            options: [
              "When it is synced to the cloud",
              "When it is typed into the phone",
              "When the season ends",
              "When a team member sees it",
            ],
            answerIndex: 0,
          },
          {
            question: "What makes a log most valuable over a full season?",
            options: [
              "Consistency — ten seconds per event, every event",
              "One detailed spreadsheet at harvest",
              "Logging only the unusual events",
              "Photo attachments on everything",
            ],
            answerIndex: 0,
          },
        ],
      },
    ],
  },
  {
    category: "Foundations",
    title: "Reading Product & Field Guides",
    description:
      "A dependable method for reading guides, manuals, and technical material — and keeping the parts that matter.",
    priceCents: 2900,
    durationMinutes: 12,
    order: 3,
    instructor: "Jules Carver",
    instructorTitle: "Technical Documentation Lead",
    content: [
      {
        type: "paragraph",
        text: "Product and field guides are dense by design: they are reference documents, not novels. Reading them front to back wastes time and buries the useful parts. Use a loop instead — scan, read, review.",
      },
      { type: "heading", text: "The scan → read → review loop" },
      {
        type: "list",
        items: [
          "Scan: read headings, tables, and safety callouts first. Build the map of the document.",
          "Read: go section by section. Pause and note anything that applies to your equipment.",
          "Review: close the guide and re-explain each section in your own words.",
        ],
      },
      {
        type: "code",
        text: "scan()   -> read()  -> review()\nmap      -> notes    -> recall\n10% time -> 60% time -> 30% time",
      },
      {
        type: "note",
        tone: "warn",
        text: "Do not skim the safety sections. They exist because equipment failures are unforgiving.",
      },
      {
        type: "paragraph",
        text: "The loop is deliberately mechanical. A habit does not need to be clever — it needs to run every time you open a manual.",
      },
    ],
  },
  {
    category: "Core Skills",
    title: "Soil Health Essentials",
    description:
      "Understand the four indicators of soil health and how to track them consistently across your fields.",
    priceCents: 4900,
    durationMinutes: 18,
    order: 4,
    instructor: "Dr. Amara Osei",
    instructorTitle: "Senior Agronomist",
    content: [
      {
        type: "paragraph",
        text: "Soil health is the foundation of every other decision on the farm. This course gives you a practical, observable framework — four indicators you can track without laboratory equipment, at the same points, in the same way, every time.",
      },
      { type: "heading", text: "The four indicators we track" },
      {
        type: "list",
        items: [
          "Structure — how well aggregates hold together under pressure.",
          "Biology — the organisms doing the work below the surface.",
          "Chemistry — the availability of the nutrients your crop needs.",
          "Moisture — how the soil holds and drains water.",
        ],
      },
      {
        type: "code",
        prompt: true,
        text: "soil check --profile field-04\n[ok] structure    good\n[ok] biology     fair\n[ok] chemistry   good\n[ok] moisture    monitor",
      },
      {
        type: "video",
        url: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
        caption:
          "Field demonstration — watch how the four indicators play out together.",
      },
      {
        type: "note",
        tone: "info",
        text: "Sample the same three points in each field every time. Consistency is what makes the record comparable season to season.",
      },
      {
        type: "paragraph",
        text: "You are not looking for a perfect score. You are building a trend line — and the trend, not the snapshot, is what guides your decisions.",
      },
      {
        type: "quiz",
        title: "Soil health knowledge check",
        instructions:
          "Answer all three questions. You need 70% or higher to pass — you can retake as many times as you like.",
        passPercent: 70,
        questions: [
          {
            question: "Which four indicators does this course track?",
            options: [
              "Structure, biology, chemistry, and moisture",
              "Nitrogen, phosphorus, potassium, and sulfur",
              "Texture, color, slope, and drainage",
              "Tillage, seeding, harvest, and storage",
            ],
            answerIndex: 0,
          },
          {
            question:
              "Why does the course recommend sampling the same three points in each field every time?",
            options: [
              "It keeps the record comparable season to season",
              "It saves time during busy weeks",
              "It avoids disturbing the crop",
              "It is what the equipment supports",
            ],
            answerIndex: 0,
          },
          {
            question:
              "When you review your soil samples, what are you actually building?",
            options: [
              "A perfect score on every check",
              "A trend line that guides your decisions",
              "A bigger dataset than your neighbors",
              "A laboratory-grade report",
            ],
            answerIndex: 1,
          },
        ],
      },
    ],
  },
  {
    category: "Core Skills",
    title: "Reading Soil Tests & Building a Fertility Plan",
    description:
      "Turn a soil test report into a fertility plan you can defend — what to apply, how much, and how to record it.",
    priceCents: 4900,
    durationMinutes: 20,
    order: 5,
    instructor: "Dr. Amara Osei",
    instructorTitle: "Senior Agronomist",
    content: [
      {
        type: "paragraph",
        text: "A soil test is only as useful as the plan you build from it. This course takes the numbers from a lab report — the same report you receive from any accredited lab — and turns them into a fertility plan you can defend: what to apply, how much, and how to record it so next season's test actually means something.",
      },
      { type: "heading", text: "Start with the three numbers that matter" },
      {
        type: "list",
        items: [
          "pH — the master switch. Outside the 6.0–7.0 band, nutrients lock up no matter how much you apply.",
          "CEC — your soil's nutrient holding capacity. High-CEC soils forgive mistakes; low-CEC soils punish them.",
          "Macronutrient availability — N, P, K, and sulfur as the lab reports them, not as the marketing claims.",
        ],
      },
      {
        type: "code",
        prompt: true,
        text: "lab report --field-04 --spring\n[ok]  ph      6.4    target 6.2–6.8\n[ok]  cec     12.8   meq/100g — medium\n[ok]  p       34     ppm    target 25–40\n[warn] k       118    ppm    low — below 140\n[warn] mg      96     ppm    low — below 120\n[info] n       42     ppm    read with crop stage",
      },
      {
        type: "note",
        tone: "info",
        text: "The target ranges above are for a typical field crop on medium soil. Match your crop's specific targets — the ranges in your product guide supersede these defaults.",
      },
      { type: "heading", text: "Build the plan in three passes" },
      {
        type: "list",
        items: [
          "Correct pH first. Lime or sulfur changes everything downstream — apply it before anything else.",
          "Address the deficit that costs the most — usually potassium or magnesium when they read low. Apply at the recommended rate for your soil type.",
          "Hold nitrogen for the crop stage. Nitrogen is managed in-season, not dumped at planting.",
        ],
      },
      {
        type: "paragraph",
        text: "A plan written but not logged is a guess. After each application, record the product, rate, and date. The record is what makes next season's test comparable — and your decisions defensible.",
      },
      {
        type: "quiz",
        title: "Fertility plan knowledge check",
        instructions:
          "Answer all three questions against the sample report above. You need 70% or higher to pass.",
        passPercent: 70,
        questions: [
          {
            question: "When building a fertility plan, which correction comes first?",
            options: ["pH", "Phosphorus", "Nitrogen", "Potassium"],
            answerIndex: 0,
          },
          {
            question:
              "In the sample report for field-04, which nutrients are below target?",
            options: [
              "Potassium and magnesium",
              "Phosphorus and nitrogen",
              "pH and CEC",
              "Only potassium",
            ],
            answerIndex: 0,
          },
          {
            question:
              "Why does the course insist you log every application?",
            options: [
              "It keeps next season's test comparable and your decisions defensible",
              "The lab will not release results without a log",
              "Fertilizer suppliers require it",
              "It speeds up the soil test turnaround",
            ],
            answerIndex: 0,
          },
        ],
      },
    ],
  },
  {
    category: "Core Skills",
    title: "Seasonal Scouting: Pests, Disease & Thresholds",
    description:
      "A weekly field-scouting routine that replaces panic with data — what to look for, how to sample, and when damage crosses the economic threshold.",
    priceCents: 4900,
    durationMinutes: 18,
    order: 6,
    instructor: "Dr. Sana Kapoor",
    instructorTitle: "Crop Protection Specialist",
    content: [
      {
        type: "paragraph",
        text: "Most crop damage is discovered late, because most of us scout like it is an emergency response instead of a routine. This course installs a weekly loop — walk, count, log, decide — so you see the problem while it is still cheap to fix, and you have the numbers to prove the fix was necessary.",
      },
      { type: "heading", text: "The weekly loop" },
      {
        type: "list",
        items: [
          "Walk a fixed pattern — the same transect or W-shape every week, so your sightings are comparable.",
          "Sample the right spots — field edges, low areas, and the patches that were hot last season.",
          "Count, don't guess — record counts per plant or per trap, never 'a lot'.",
        ],
      },
      {
        type: "code",
        prompt: true,
        text: "scout run --field-04 --week-12\n[ok]  aphids     4 / plant   threshold 10\n[ok]  mildew     trace      threshold 5% leaf\n[warn] armyworm   6 / trap    threshold 8\n[info] record     logged",
      },
      {
        type: "note",
        tone: "warn",
        text: "A pest is not a problem until it crosses the economic threshold. Spraying below threshold costs money and kills the beneficials that do your work for free.",
      },
      { type: "heading", text: "Thresholds decide, not instincts" },
      {
        type: "list",
        items: [
          "Economic threshold — the population where the cost of treatment equals the value of the damage it prevents.",
          "Below it: do nothing but keep counting. Above it: act within the week.",
          "Weather changes thresholds — drought stress lowers them, vigorous crops raise them.",
        ],
      },
      {
        type: "paragraph",
        text: "The scouting log is the evidence for every spray decision. When you need support, the log is what lets our team give you a real answer instead of a guess.",
      },
      {
        type: "quiz",
        title: "Scouting knowledge check",
        instructions:
          "Answer all three questions against the sample log above. You need 70% or higher to pass.",
        passPercent: 70,
        questions: [
          {
            question: "Why should you walk the same pattern every week?",
            options: [
              "So sightings are comparable week to week",
              "It is faster than a random walk",
              "Pests follow fixed paths",
              "It covers the field evenly in one pass",
            ],
            answerIndex: 0,
          },
          {
            question:
              "In the sample log, which pest is closest to its threshold?",
            options: [
              "Armyworm — 6 of 8",
              "Aphids — 4 of 10",
              "Mildew — trace",
              "None of them",
            ],
            answerIndex: 0,
          },
          {
            question:
              "Below the economic threshold, the correct action is:",
            options: [
              "Keep counting and do nothing yet",
              "Spray immediately to be safe",
              "Double the scouting interval",
              "Skip the field next week",
            ],
            answerIndex: 0,
          },
        ],
      },
    ],
  },
  {
    category: "Core Skills",
    title: "Irrigation & Water Management",
    description:
      "Schedule irrigation by measurement instead of habit, and build a water record you can trust.",
    priceCents: 4900,
    durationMinutes: 20,
    order: 7,
    instructor: "Tomás Rivera",
    instructorTitle: "Water Systems Specialist",
    content: [
      {
        type: "paragraph",
        text: "Water is the input that most operations apply by habit rather than by measurement. This course replaces the calendar with a simple, defensible routine: measure, apply, log.",
      },
      { type: "heading", text: "Match application to need" },
      {
        type: "list",
        items: [
          "Measure before you schedule — soil moisture, not the calendar, decides timing.",
          "Apply at the right rate for your soil type; the same volume behaves differently in sand and clay.",
          "Log every event. Patterns beat opinions, and the log is your evidence.",
        ],
      },
      {
        type: "code",
        prompt: true,
        text: "irrigation plan --field field-04\n[ok] budget 42mm/week\n[ok] split 3 applications",
      },
      {
        type: "note",
        tone: "warn",
        text: "Overwatering is the most common customer error we see. It costs more than water — it costs root health and, in wet years, the crop itself.",
      },
      {
        type: "paragraph",
        text: "After three weeks of logged events you will have something no calendar can give you: a record of what your fields actually needed.",
      },
    ],
  },
  {
    category: "Practice & Safety",
    title: "Equipment Care & Safety",
    description:
      "A practical maintenance and safety protocol for keeping equipment ready — and operators safe.",
    priceCents: 7900,
    durationMinutes: 25,
    order: 8,
    instructor: "Ben Okonkwo",
    instructorTitle: "Field Operations Manager",
    content: [
      {
        type: "paragraph",
        text: "Most equipment failures are not sudden; they are the result of a check that was skipped once too often. This course installs a three-tier rhythm — daily, weekly, seasonal — that keeps machines ready and operators safe.",
      },
      { type: "heading", text: "Daily, weekly, seasonal" },
      {
        type: "list",
        items: [
          "Daily — a visual walkaround before the first start: fluids, tires, guards, and the ground under the machine.",
          "Weekly — filters, fluids, fasteners, and anything the daily pass does not cover.",
          "Seasonal — a deep service and a proper winterization before storage.",
        ],
      },
      {
        type: "code",
        prompt: true,
        text: "equipment check --pre-start\n[ok] fluids    ok\n[ok] tires     ok\n[ok] guards    fitted\n[ok] ready",
      },
      {
        type: "note",
        tone: "warn",
        text: "Never bypass a guard to save time. A ten-second shortcut can cost a season.",
      },
      {
        type: "paragraph",
        text: "The daily walkaround takes six minutes. It is the cheapest insurance in the operation, and it is the one step that is never optional.",
      },
    ],
  },
  {
    category: "Practice & Safety",
    title: "Harvest, Storage & Post-Harvest Basics",
    description:
      "Protect the value of your harvest with a disciplined storage routine from silo to sale.",
    priceCents: 9900,
    durationMinutes: 22,
    order: 9,
    instructor: "Priya Nair",
    instructorTitle: "Post-Harvest Specialist",
    content: [
      {
        type: "paragraph",
        text: "The crop is won in the field and lost in the shed. Post-harvest losses are quiet — no dramatic failure, just a value that erodes a little each week. This course closes that gap with a storage routine you can run on any facility.",
      },
      { type: "heading", text: "The storage checklist" },
      {
        type: "list",
        items: [
          "Dry the crop to specification before it enters storage — moisture is the master variable.",
          "Clean and treat the space before loading; old stock is a vector for new problems.",
          "Monitor temperature and moisture weekly, and calibrate your sensors before the season.",
          "Inspect closely for the first two weeks — that is when problems announce themselves.",
        ],
      },
      {
        type: "code",
        prompt: true,
        text: "storage preflight --silo-2\n[ok] clean      yes\n[ok] dry        within spec\n[ok] sensors    calibrated\n[ok] ready",
      },
      {
        type: "note",
        tone: "warn",
        text: "Quality is set in the first two weeks of storage. Watch that window closely — it decides what your crop is worth at the elevator.",
      },
      {
        type: "paragraph",
        text: "A disciplined routine costs a few hours a week. The value it protects is measured in the full price of your harvest.",
      },
    ],
  },
];

function atHour(dayOffset: number, hour: number): number {
  const now = new Date();
  const start = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + dayOffset,
    hour,
    0,
    0,
  );
  return start.getTime();
}

const sessionPlans: Array<{ offset: number; hour: number; capacity: number }> = [
  { offset: 2, hour: 9, capacity: 12 },
  { offset: 5, hour: 14, capacity: 16 },
  { offset: 9, hour: 9, capacity: 12 },
];

/**
 * Idempotent seed: inserts any seed-catalog course that is missing (with a few
 * weeks of bookable sessions) and restores the canonical catalog order. Safe
 * to call on every load — existing courses are never duplicated or rewritten.
 */
export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    let insertedCourses = 0;
    let sessions = 0;
    for (const course of seedCatalog) {
      const slug = slugify(course.title);
      const existing = await ctx.db
        .query("courses")
        .withIndex("by_slug")
        .filter((q) => q.eq(q.field("slug"), slug))
        .first();
      if (existing) {
        // New catalog additions land at the end; restore the canonical order.
        if (existing.order !== course.order) {
          await ctx.db.patch(existing._id, { order: course.order });
        }
        continue;
      }
      const courseId = await ctx.db.insert("courses", {
        ...course,
        slug,
        published: true,
      });
      insertedCourses += 1;
      for (const plan of sessionPlans) {
        await ctx.db.insert("sessions", {
          courseId,
          startsAt: atHour(plan.offset, plan.hour),
          durationMinutes: course.durationMinutes,
          capacity: plan.capacity,
        });
        sessions += 1;
      }
    }
    return { seeded: insertedCourses > 0, count: insertedCourses, sessions };
  },
});

// ---------------------------------------------------------------------------
// Admin — catalog management.
// ---------------------------------------------------------------------------

export const create = mutation({
  args: {
    title: v.string(),
    category: v.string(),
    description: v.string(),
    priceCents: v.number(),
    durationMinutes: v.number(),
    instructor: v.optional(v.string()),
    instructorTitle: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const count = await ctx.db.query("courses").collect();
    const courseId = await ctx.db.insert("courses", {
      ...args,
      slug: slugify(args.title),
      order: count.length + 1,
      published: false,
      content: [
        {
          type: "paragraph",
          text: "Course material is being prepared. Check back shortly — if you have questions, leave a comment below and our team will respond.",
        },
      ],
    });
    return courseId;
  },
});

export const update = mutation({
  args: {
    id: v.id("courses"),
    title: v.optional(v.string()),
    category: v.optional(v.string()),
    description: v.optional(v.string()),
    priceCents: v.optional(v.number()),
    durationMinutes: v.optional(v.number()),
    published: v.optional(v.boolean()),
    content: v.optional(v.array(contentBlockValidator)),
    instructor: v.optional(v.string()),
    instructorTitle: v.optional(v.string()),
  },
  handler: async (ctx, { id, ...patch }) => {
    const course = await ctx.db.get(id);
    if (!course) {
      throw new Error("Course not found.");
    }
    const fields: Record<string, unknown> = {};
    if (patch.title !== undefined) fields.title = patch.title;
    if (patch.category !== undefined) fields.category = patch.category;
    if (patch.description !== undefined) fields.description = patch.description;
    if (patch.priceCents !== undefined) fields.priceCents = patch.priceCents;
    if (patch.durationMinutes !== undefined)
      fields.durationMinutes = patch.durationMinutes;
    if (patch.published !== undefined) fields.published = patch.published;
    if (patch.content !== undefined) fields.content = patch.content;
    if (patch.instructor !== undefined) fields.instructor = patch.instructor;
    if (patch.instructorTitle !== undefined)
      fields.instructorTitle = patch.instructorTitle;
    if (patch.title !== undefined) fields.slug = slugify(patch.title);
    await ctx.db.patch(id, fields);
    return id;
  },
});

export const remove = mutation({
  args: { id: v.id("courses") },
  handler: async (ctx, { id }) => {
    const sessions = await ctx.db
      .query("sessions")
      .withIndex("by_course_start", (q) => q.eq("courseId", id))
      .collect();
    for (const session of sessions) {
      await ctx.db.delete(session._id);
    }
    const comments = await ctx.db
      .query("comments")
      .withIndex("by_course", (q) => q.eq("courseId", id))
      .collect();
    for (const comment of comments) {
      await ctx.db.delete(comment._id);
    }
    await ctx.db.delete(id);
    return id;
  },
});
