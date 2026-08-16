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
    title: "Reading Product & Field Guides",
    description:
      "A dependable method for reading guides, manuals, and technical material — and keeping the parts that matter.",
    priceCents: 2900,
    durationMinutes: 12,
    order: 2,
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
    order: 3,
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
    ],
  },
  {
    category: "Core Skills",
    title: "Irrigation & Water Management",
    description:
      "Schedule irrigation by measurement instead of habit, and build a water record you can trust.",
    priceCents: 4900,
    durationMinutes: 20,
    order: 4,
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
    order: 5,
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
    order: 6,
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
 * Idempotent seed: inserts the starter catalog and a few weeks of bookable
 * sessions only when the courses table is empty. Safe to call on first load.
 */
export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("courses").first();
    if (existing !== null) {
      return { seeded: false, count: 0, sessions: 0 };
    }

    let sessions = 0;
    for (const course of seedCatalog) {
      const courseId = await ctx.db.insert("courses", {
        ...course,
        slug: slugify(course.title),
        published: true,
      });
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
    return { seeded: true, count: seedCatalog.length, sessions };
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
