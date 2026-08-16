import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import type { LessonBlock } from "./schema";

/** All lessons, ordered as they appear in the curriculum. */
export const list = query({
  args: {},
  handler: async (ctx) => {
    return ctx.db
      .query("lessons")
      .withIndex("by_order")
      .order("asc")
      .collect();
  },
});

/** A single lesson by its url slug. Returns null when not found. */
export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    const lesson = await ctx.db
      .query("lessons")
      .withIndex("by_slug")
      .filter((q) => q.eq(q.field("slug"), slug))
      .first();
    return lesson ?? null;
  },
});

// ---------------------------------------------------------------------------
// Seed curriculum — version 1 hosts lessons for students, nothing else.
// ---------------------------------------------------------------------------

type SeedLesson = {
  module: string;
  title: string;
  slug: string;
  description: string;
  durationMinutes: number;
  order: number;
  content: LessonBlock[];
};

const seedCurriculum: SeedLesson[] = [
  {
    module: "01 · Getting Started",
    title: "Welcome to May Academy",
    slug: "welcome-to-may-academy",
    description:
      "Your first session: how the platform works and how to follow a lesson.",
    durationMinutes: 8,
    order: 1,
    content: [
      {
        type: "paragraph",
        text: "Welcome. May Academy hosts structured training lessons for students. This is version 1 of the platform, and its scope is intentionally small: lessons, in order, for students. Nothing else — no chat, no leaderboards, no noise.",
      },
      { type: "heading", text: "How this platform works" },
      {
        type: "list",
        items: [
          "Every lesson lives inside a curriculum module — start at module 01.",
          "Lessons are ordered. Follow them top to bottom; each one assumes the previous.",
          "Blocks like the one below show commands you can run or copy.",
          "Notes marked INFO give guidance, notes marked WARN tell you where students usually slip.",
        ],
      },
      {
        type: "code",
        prompt: true,
        text: "mayacademy start lesson-01\nmayacademy status --all\n[ok] session ready",
      },
      {
        type: "note",
        tone: "info",
        text: "You are signed in as a student. Your access in this version is limited to viewing lessons.",
      },
    ],
  },
  {
    module: "01 · Getting Started",
    title: "Your Learning Toolkit",
    slug: "your-learning-toolkit",
    description: "The tools and habits you need before the training begins.",
    durationMinutes: 10,
    order: 2,
    content: [
      {
        type: "paragraph",
        text: "Before the material, the setup. Training works best when your environment is as simple as a terminal: one task, one window, no tabs fighting for attention.",
      },
      { type: "heading", text: "Required tools" },
      {
        type: "list",
        items: [
          "A notebook or note-taking app — paper is fine, one file is fine.",
          "A quiet space and roughly one uninterrupted hour per lesson.",
          "A device that can reach this platform (that is all it needs to do).",
        ],
      },
      {
        type: "code",
        prompt: true,
        text: "mayacademy doctor\n[ok] environment ready\n[ok] tools detected 3/3\n[ok] focus window available",
      },
      {
        type: "note",
        tone: "warn",
        text: "Do not skip the practice steps in module 03. They are part of the lesson, not optional extras.",
      },
      { type: "heading", text: "What to expect" },
      {
        type: "paragraph",
        text: "Each lesson opens with a short framing paragraph, teaches one idea in the middle, and closes with something you do. Expect to write more than you read.",
      },
    ],
  },
  {
    module: "02 · Core Skills",
    title: "Reading Technical Material",
    slug: "reading-technical-material",
    description: "A reliable loop for reading technical material quickly and retaining it.",
    durationMinutes: 15,
    order: 3,
    content: [
      {
        type: "paragraph",
        text: "Technical lessons are dense. Reading them like a novel wastes time and buries the useful parts. Use a loop instead: scan, read, review.",
      },
      { type: "heading", text: "The scan → read → review loop" },
      {
        type: "list",
        items: [
          "Scan: read headings, code blocks, and summaries first. Build the map.",
          "Read: go section by section. Pause and take a note after each one.",
          "Review: close the lesson and re-explain each section in your own words.",
        ],
      },
      {
        type: "code",
        text: "scan()   -> read()  -> review()\nmap      -> notes    -> recall\n10% time -> 60% time -> 30% time",
      },
      {
        type: "note",
        tone: "info",
        text: "Most students lose focus between minutes 10 and 15. That is the perfect place to break: finish your current section, stand up, come back.",
      },
      {
        type: "paragraph",
        text: "The loop is deliberately mechanical. A habit does not need to be clever — it needs to run every time.",
      },
    ],
  },
  {
    module: "02 · Core Skills",
    title: "Structured Note-Taking",
    slug: "structured-note-taking",
    description: "A simple outline method that keeps your notes useful after class.",
    durationMinutes: 12,
    order: 4,
    content: [
      {
        type: "paragraph",
        text: "Notes exist for one reason: to be reviewed later. If you cannot find an idea in your notes two weeks from now, the note did not work.",
      },
      { type: "heading", text: "The outline method" },
      {
        type: "list",
        items: [
          "Main ideas sit at the top level — one line each.",
          "Details indent beneath the idea they belong to.",
          "Leave one blank line between topics so the structure stays visible.",
        ],
      },
      {
        type: "code",
        text: "NOTE_01\n  └─ main idea\n       └─ detail\n       └─ detail\n  └─ next idea",
      },
      {
        type: "note",
        tone: "warn",
        text: "Do not transcribe lessons verbatim. Paraphrase — your notes should end up shorter than the lesson, or they are a copy, not a summary.",
      },
      {
        type: "paragraph",
        text: "If a lesson fits on one page of notes, you understood it. If it fits on half a page, you understood it well.",
      },
    ],
  },
  {
    module: "03 · Practice & Assessment",
    title: "Hands-On Practice",
    slug: "hands-on-practice",
    description: "A structured protocol for turning lessons into skills.",
    durationMinutes: 20,
    order: 5,
    content: [
      {
        type: "paragraph",
        text: "Reading builds familiarity. Practice builds skill. This lesson gives you a repeatable protocol to run on any lesson in the curriculum.",
      },
      { type: "heading", text: "Practice protocol" },
      {
        type: "list",
        items: [
          "Re-read the lesson once, quickly — no notes.",
          "Close the lesson and do the task from memory.",
          "Compare your output against the reference in the lesson.",
          "Repeat once for anything you missed, then stop.",
        ],
      },
      {
        type: "code",
        prompt: true,
        text: "mayacademy practice lesson-05\n[run] attempt 1/3 — begin\n[done] output written, 0 diffs vs reference",
      },
      {
        type: "note",
        tone: "info",
        text: "Three attempts is the ceiling. Past that, re-read the lesson and try again tomorrow — your memory does the consolidation overnight.",
      },
      {
        type: "paragraph",
        text: "Deliberate practice is uncomfortable by design. If it feels easy, you are not practicing; you are repeating.",
      },
    ],
  },
  {
    module: "03 · Practice & Assessment",
    title: "Preparing for Assessment",
    slug: "preparing-for-assessment",
    description: "Final checks before your assessment window.",
    durationMinutes: 10,
    order: 6,
    content: [
      {
        type: "paragraph",
        text: "The assessment window measures what stuck. There is no trick to it — preparation is just making sure everything from the curriculum is done and reviewed.",
      },
      { type: "heading", text: "Checklist" },
      {
        type: "list",
        items: [
          "All lessons in modules 01 and 02 reviewed.",
          "Practice tasks completed without notes at least once.",
          "Notes rewritten once, in your own words.",
          "Environment ready: quiet space, 60 minutes, charged device.",
        ],
      },
      {
        type: "code",
        prompt: true,
        text: "mayacademy assess --preflight\n[ok] lessons reviewed    6/6\n[ok] practice completed  3/3\n[ok] notes up to date    yes\n[ok] ready",
      },
      {
        type: "note",
        tone: "warn",
        text: "Assessment windows open on the hour. Arrive early — late joins are not admitted.",
      },
      {
        type: "paragraph",
        text: "You are ready. The curriculum was designed to be finished in order, and you finished it in order. Run the preflight, take a breath, go.",
      },
    ],
  },
];

/**
 * Idempotent seed: inserts the starter curriculum only when the lessons table
 * is empty. Safe to call from any page on first load.
 */
export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("lessons").first();
    if (existing !== null) {
      return { seeded: false, count: 0 };
    }
    for (const lesson of seedCurriculum) {
      await ctx.db.insert("lessons", lesson);
    }
    return { seeded: true, count: seedCurriculum.length };
  },
});
