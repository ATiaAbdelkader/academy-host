import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import {
  contentBlockValidator,
  courseModuleValidator,
  type ContentBlock,
  type CourseModule,
} from "./schema";
import { extraCourse10 } from "./extra_course_10";
import { extraCourse11 } from "./extra_course_11";
import { extraCourse12 } from "./extra_course_12";
import { extraCourse13 } from "./extra_course_13";
import { extraCourse14 } from "./extra_course_14";
import { extraCourse15 } from "./extra_course_15";
import { extraCourse16 } from "./extra_course_16";
import { extraCourse17 } from "./extra_course_17";
import { extraCourse18 } from "./extra_course_18";
import { extraCourse19 } from "./extra_course_19";
import { extraCourse20 } from "./extra_course_20";
import { extraCourse21 } from "./extra_course_21";
import { extraCourse22 } from "./extra_course_22";
import { extraCourse23 } from "./extra_course_23";
import { extraCourse24 } from "./extra_course_24";
import { extraCourse25 } from "./extra_course_25";
import { extraCourse26 } from "./extra_course_26";
import { extraCourse27 } from "./extra_course_27";
import { extraCourse28 } from "./extra_course_28";
import { extraCourse29 } from "./extra_course_29";
import { extraCourse30 } from "./extra_course_30";
import { extraCourse31 } from "./extra_course_31";
import { extraCourse32 } from "./extra_course_32";
import { extraCourse33 } from "./extra_course_33";
import { extraCourse34 } from "./extra_course_34";
import { extraCourse35 } from "./extra_course_35";
import { extraCourse36 } from "./extra_course_36";
import { extraCourse37 } from "./extra_course_37";
import { extraCourse38 } from "./extra_course_38";
import { extraCourse39 } from "./extra_course_39";
import { extraCourse40 } from "./extra_course_40";
import { extraCourse41 } from "./extra_course_41";
import { extraCourse42 } from "./extra_course_42";
import { extraCourse43 } from "./extra_course_43";
import { extraCourse44 } from "./extra_course_44";
import { extraCourse45 } from "./extra_course_45";
import { extraCourse46 } from "./extra_course_46";
import { extraCourse47 } from "./extra_course_47";
import { extraCourse48 } from "./extra_course_48";
import { extraCourse49 } from "./extra_course_49";
import { extraCourse50 } from "./extra_course_50";
import { extraCourse51 } from "./extra_course_51";
import { extraCourse52 } from "./extra_course_52";
import { extraCourse53 } from "./extra_course_53";
import { extraCourse54 } from "./extra_course_54";
import { extraCourse55 } from "./extra_course_55";
import { extraCourse56 } from "./extra_course_56";
import { extraCourse57 } from "./extra_course_57";
import { extraCourse58 } from "./extra_course_58";
import { extraCourse59 } from "./extra_course_59";
import { extraCourse60 } from "./extra_course_60";
import { extraCourse61 } from "./extra_course_61";
import { extraCourse62 } from "./extra_course_62";
import { extraCourse63 } from "./extra_course_63";
import { extraCourse64 } from "./extra_course_64";
import { extraCourse65 } from "./extra_course_65";
import { extraCourse66 } from "./extra_course_66";

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

/** A single course by id. Returns null when not found. */
export const getById = query({
  args: { courseId: v.id("courses") },
  handler: async (ctx, { courseId }) => {
    return (await ctx.db.get(courseId)) ?? null;
  },
});

/**
 * Instructor directory built from the published catalog. Groups courses by
 * instructor name and attaches each instructor's credential title (the title
 * most courses attribute to them), so the public /instructors page can render
 * profiles without a separate table.
 */
export const instructors = query({
  args: {},
  handler: async (ctx) => {
    const courses = await ctx.db
      .query("courses")
      .withIndex("by_order")
      .order("asc")
      .collect();
    const published = courses.filter((c) => c.published);

    const byName = new Map<
      string,
      {
        title: string;
        courses: Array<{
          courseId: string;
          slug: string;
          title: string;
          category: string;
          durationMinutes: number;
          priceCents: number;
        }>;
      }
    >();

    for (const course of published) {
      const name = course.instructor?.trim();
      if (!name) continue;
      const entry = byName.get(name) ?? { title: "", courses: [] };
      // Prefer the credential title most courses carry for this instructor.
      if (course.instructorTitle && !entry.title) {
        entry.title = course.instructorTitle;
      }
      entry.courses.push({
        courseId: course._id,
        slug: course.slug,
        title: course.title,
        category: course.category,
        durationMinutes: course.durationMinutes,
        priceCents: course.priceCents,
      });
      byName.set(name, entry);
    }

    return Array.from(byName.entries())
      .map(([name, entry]) => ({
        name,
        title: entry.title,
        courseCount: entry.courses.length,
        categories: Array.from(
          new Set(entry.courses.map((c) => c.category)),
        ),
        courses: entry.courses.sort(
          (a, b) =>
            a.category.localeCompare(b.category) ||
            a.title.localeCompare(b.title),
        ),
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  },
});

// ---------------------------------------------------------------------------
// Seed catalog — customer training for AgriSkills Academy. Every course is a
// sequence of modules; each module ends with a quiz whose pass unlocks the
// next module, and the final quiz unlocks the course certificate.
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
  modules: CourseModule[];
};

// Bump when seed course content changes so existing deployments upgrade.
const SEED_CONTENT_VERSION = 7;

const seedCatalog: SeedCourse[] = [
  // Extended catalog — newest tracks first in source; canonical ordering is
  // restored by each course's explicit `order` field.
  extraCourse10,
  extraCourse11,
  extraCourse12,
  extraCourse13,
  extraCourse14,
  extraCourse15,
  extraCourse16,
  extraCourse17,
  extraCourse18,
  extraCourse19,
  extraCourse20,
  extraCourse21,
  extraCourse22,
  extraCourse23,
  extraCourse24,
  extraCourse25,
  extraCourse26,
  extraCourse27,
  extraCourse28,
  extraCourse29,
  extraCourse30,
  extraCourse31,
  extraCourse32,
  extraCourse33,
  extraCourse34,
  extraCourse35,
  extraCourse36,
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
    modules: [
      {
        title: "How the academy works",
        content: [
          {
            type: "paragraph",
            text: "AgriSkills Academy is the training home for customers of our products and services. Every course is a sequence of modules, and each module ends with a short quiz. You pass a module's quiz to unlock the next one — and you pass the last one to earn your certificate.",
          },
          {
            type: "video",
            url: "https://www.youtube.com/watch?v=vS3L4kemR6s",
            caption: "How certificate courses work: lessons, quizzes, and your certificate.",
          },
          {
            type: "list",
            items: [
              "Every course belongs to a category — begin with Foundations.",
              "Courses are ordered. Later categories assume the earlier ones.",
              "Each module ends with a quiz. Pass it to move on; retakes are free.",
              "Finish every module quiz and the course is yours to certify.",
            ],
          },
          {
            type: "quiz",
            title: "Academy basics",
            passPercent: 60,
            questions: [
              {
                question: "How do you move from one module to the next?",
                options: [
                  "Pass the previous module's quiz",
                  "Book a session",
                  "Ask an instructor to unlock it",
                  "Wait until the next season",
                ],
                answerIndex: 0,
              },
              {
                question: "What do you earn by passing every module quiz?",
                options: [
                  "A course certificate",
                  "A discount code",
                  "A free product",
                  "Priority support",
                ],
                answerIndex: 0,
              },
              {
                question: "Where should a new student begin?",
                options: [
                  "The Foundations category",
                  "The most expensive course",
                  "Anywhere, order does not matter",
                  "The certificate page",
                ],
                answerIndex: 0,
              },
            ],
          },
        ],
      },
      {
        title: "Your account & profile",
        content: [
          {
            type: "paragraph",
            text: "Your account carries your progress, bookings, comments, and certificates. Keep your display name current — it is what appears on your certificate and on every comment you leave.",
          },
          {
            type: "video",
            url: "https://www.youtube.com/watch?v=E7CwqNHn_Ns",
            caption: "Set up your study toolkit — notes, review, and your progress tracker.",
          },
          {
            type: "list",
            items: [
              "Your name appears on certificates — update it in settings.",
              "Progress and quiz results are saved automatically.",
              "Comments and reviews post under your display name.",
            ],
          },
          {
            type: "quiz",
            title: "Account basics",
            passPercent: 60,
            questions: [
              {
                question: "Where does your display name appear?",
                options: [
                  "On certificates and comments",
                  "Only on your login page",
                  "Nowhere public",
                  "On your bank statement",
                ],
                answerIndex: 0,
              },
              {
                question: "Where do you change your display name?",
                options: [
                  "In account settings",
                  "On the course page",
                  "By emailing support",
                  "You cannot change it",
                ],
                answerIndex: 0,
              },
              {
                question: "What happens to your progress between visits?",
                options: [
                  "It is saved automatically",
                  "It resets each session",
                  "It only saves on paid courses",
                  "It must be exported manually",
                ],
                answerIndex: 0,
              },
            ],
          },
        ],
      },
      {
        title: "Booking your first session",
        content: [
          {
            type: "paragraph",
            text: "Live sessions are how you train with an instructor. Pick an upcoming session on the course page, book it, and — for paid courses — settle checkout to confirm your seat.",
          },
          {
            type: "video",
            url: "https://www.youtube.com/watch?v=Z-zNHHpXoMM",
            caption: "Schedule your sessions like you schedule your studying: at regular intervals.",
          },
          {
            type: "code",
            prompt: true,
            text: "course open soil-health-essentials\n[ok] session  Sat 09:00 · 12 seats\n[ok] booked · checkout pending\n[ok] confirmed",
          },
          {
            type: "quiz",
            title: "Booking basics",
            passPercent: 60,
            questions: [
              {
                question: "What confirms a paid booking?",
                options: [
                  "Settling checkout",
                  "Selecting the session",
                  "Leaving a comment",
                  "Passing a quiz",
                ],
                answerIndex: 0,
              },
              {
                question: "Where do you find upcoming sessions?",
                options: [
                  "On the course page",
                  "On the landing page",
                  "In your email only",
                  "By calling the office",
                ],
                answerIndex: 0,
              },
              {
                question: "A session shows 'full — waitlist open'. What can you do?",
                options: [
                  "Join the waitlist for the next freed seat",
                  "Book it anyway",
                  "Nothing, ever",
                  "Pay double to skip the queue",
                ],
                answerIndex: 0,
              },
            ],
          },
        ],
      },
      {
        title: "Working through the material",
        content: [
          {
            type: "paragraph",
            text: "Read, watch, and practice in order. Take notes — every course has a private notes panel attached to your progress. The quizzes test what the module actually taught, not trivia.",
          },
          {
            type: "video",
            url: "https://www.youtube.com/watch?v=eVajQPuRmk8",
            caption: "Active recall — the technique behind our module quizzes.",
          },
          {
            type: "note",
            tone: "info",
            text: "You can retake any quiz as many times as you like. The point is mastery, not a perfect first try.",
          },
          {
            type: "quiz",
            title: "Study flow",
            passPercent: 60,
            questions: [
              {
                question: "Where are your private study notes kept?",
                options: [
                  "In the progress panel on the course page",
                  "On the public catalog",
                  "In the session booking form",
                  "Notes are not supported",
                ],
                answerIndex: 0,
              },
              {
                question: "How many times can you retake a quiz?",
                options: [
                  "As many as you need",
                  "Once",
                  "Three times per course",
                  "Only after support approves",
                ],
                answerIndex: 0,
              },
              {
                question: "What do the quizzes test?",
                options: [
                  "What the module actually taught",
                  "Random facts from other courses",
                  "Your booking history",
                  "Nothing — they are decorative",
                ],
                answerIndex: 0,
              },
            ],
          },
        ],
      },
      {
        title: "Getting help & support",
        content: [
          {
            type: "paragraph",
            text: "Comments stay open under every course, and our team answers within one business day. When you need help, the more context you give — course, module, what you tried — the faster the answer is useful.",
          },
          {
            type: "video",
            url: "https://www.youtube.com/watch?v=RLSwj690Tgc",
            caption: "When to revisit material — and when to ask for help.",
          },
          {
            type: "list",
            items: [
              "Leave questions under the course they belong to.",
              "Reference the module and quiz by name.",
              "For billing or booking issues, use the booking page first.",
            ],
          },
          {
            type: "quiz",
            title: "Support basics",
            passPercent: 60,
            questions: [
              {
                question: "Where should you ask a question about a course?",
                options: [
                  "In the comments under that course",
                  "In a private email to an instructor",
                  "On the landing page",
                  "In the certificate preview",
                ],
                answerIndex: 0,
              },
              {
                question: "How quickly does the team answer?",
                options: [
                  "Within one business day",
                  "Within one month",
                  "Only during harvest season",
                  "Never — comments are decorative",
                ],
                answerIndex: 0,
              },
              {
                question: "What makes a support question faster to answer?",
                options: [
                  "Naming the course, module, and what you tried",
                  "Asking in all capital letters",
                  "Repeating the question in every course",
                  "No context at all",
                ],
                answerIndex: 0,
              },
            ],
          },
        ],
      },
      {
        title: "Your learning record & certificates",
        content: [
          {
            type: "paragraph",
            text: "Your dashboard tracks every course you start or complete. Complete a course by passing all its module quizzes, and you unlock a certificate you can print or save as a PDF from the certificate page.",
          },
          {
            type: "video",
            url: "https://www.youtube.com/watch?v=cVf38y07cfk",
            caption: "How review schedules build your learning record — and your certificate.",
          },
          {
            type: "list",
            items: [
              "The dashboard shows progress per course and your certified count.",
              "Certificates name the course, your display name, and a unique number.",
              "Print or save as PDF directly from the certificate page.",
            ],
          },
          {
            type: "quiz",
            title: "Certificates",
            passPercent: 60,
            questions: [
              {
                question: "What unlocks a course certificate?",
                options: [
                  "Passing every module quiz",
                  "Booking a session",
                  "Leaving a review",
                  "Paying for the course only",
                ],
                answerIndex: 0,
              },
              {
                question: "How do you get a PDF of your certificate?",
                options: [
                  "Open the certificate page and print / save as PDF",
                  "Email support and wait a week",
                  "It is mailed to your address",
                  "Certificates cannot be exported",
                ],
                answerIndex: 0,
              },
              {
                question: "Where does your overall progress live?",
                options: [
                  "On the dashboard",
                  "On the landing page",
                  "In the course comments",
                  "It is not stored anywhere",
                ],
                answerIndex: 0,
              },
            ],
          },
        ],
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
    modules: [
      {
        title: "Setting up your operation",
        content: [
          {
            type: "paragraph",
            text: "Your product ships with a digital records side — an app and a cloud account that are part of what you bought. The value is not the software; it is the log you build in it. Set up once, correctly, and every event this season lands in a record you can use.",
          },
          {
            type: "video",
            url: "https://www.youtube.com/watch?v=AQ_jQ8t3dRo",
            caption: "Start with structure: operations, fields, and units in one place.",
          },
          {
            type: "code",
            prompt: true,
            text: "records setup --operation sunrise-farm\n[ok] operation   created\n[ok] field-01    added\n[ok] field-04    added\n[ok] unit        linked 2 devices\n[ok] team        3 members",
          },
          {
            type: "quiz",
            title: "Setup check",
            passPercent: 60,
            questions: [
              {
                question: "What should you create first in the records app?",
                options: [
                  "Your operation and its fields",
                  "A certificate",
                  "A coupon code",
                  "A session booking",
                ],
                answerIndex: 0,
              },
              {
                question: "Why does each field get its own record?",
                options: [
                  "So events attach to the right place and stay comparable",
                  "Because the app requires exactly one field",
                  "To make the setup take longer",
                  "Fields cannot be recorded",
                ],
                answerIndex: 0,
              },
              {
                question: "Who should be invited to the operation?",
                options: [
                  "Your whole team — records belong to the operation",
                  "Nobody, ever",
                  "Only the accountant",
                  "Only people who own devices",
                ],
                answerIndex: 0,
              },
            ],
          },
        ],
      },
      {
        title: "Linking your products",
        content: [
          {
            type: "paragraph",
            text: "Linked product units make every log richer: an application logged from a linked unit carries the machine, the rate, and the time automatically. Link each unit once, under the field it works most.",
          },
          {
            type: "video",
            url: "https://www.youtube.com/watch?v=82ti-m7uHU4",
            caption: "Digital tools that connect your machines to your records.",
          },
          {
            type: "list",
            items: [
              "Link each product unit to the operation once.",
              "Units attach their own readings to the events you log.",
              "Rename units so the log reads clearly (e.g. 'sprayer-02').",
            ],
          },
          {
            type: "quiz",
            title: "Linked units",
            passPercent: 60,
            questions: [
              {
                question: "What does a linked product unit add to a log?",
                options: [
                  "Machine, rate, and time automatically",
                  "The field's soil type",
                  "Weather history",
                  "Nothing — linking is cosmetic",
                ],
                answerIndex: 0,
              },
              {
                question: "When should you link a unit?",
                options: [
                  "Once, during setup",
                  "Every single day",
                  "Only after a fault",
                  "Only in winter",
                ],
                answerIndex: 0,
              },
              {
                question: "Why rename units?",
                options: [
                  "So the log reads clearly later",
                  "Because the app requires it",
                  "To confuse your team",
                  "Names are fixed and cannot change",
                ],
                answerIndex: 0,
              },
            ],
          },
        ],
      },
      {
        title: "The daily logging rhythm",
        content: [
          {
            type: "paragraph",
            text: "Logs are most valuable when they are boring and consistent. Ten seconds of entry per event beats one perfect spreadsheet at harvest. Make logging part of the task itself — before you leave the field, the event is in.",
          },
          {
            type: "video",
            url: "https://www.youtube.com/watch?v=sDpm3zjRLFI",
            caption: "The habit of logging as you go — before you leave the field.",
          },
          {
            type: "note",
            tone: "info",
            text: "A log in the phone is not a record until it is synced to the cloud. Sync before you leave the field.",
          },
          {
            type: "quiz",
            title: "Daily rhythm",
            passPercent: 60,
            questions: [
              {
                question: "When should an event be logged?",
                options: [
                  "As it happens, before leaving the field",
                  "At the end of the season",
                  "Whenever there is free time",
                  "Only if it is unusual",
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
                question: "What makes a log most valuable over a season?",
                options: [
                  "Consistency — ten seconds per event, every event",
                  "One detailed spreadsheet at harvest",
                  "Logging only unusual events",
                  "Photo attachments on everything",
                ],
                answerIndex: 0,
              },
            ],
          },
        ],
      },
      {
        title: "Event types & clean data",
        content: [
          {
            type: "paragraph",
            text: "Standard event types keep exports clean: applications, irrigation, scouting runs, maintenance. Your own labels are fine — keep them few, spell them the same way every time, and the trend views stay trustworthy.",
          },
          {
            type: "video",
            url: "https://www.youtube.com/watch?v=LP2K7tVXzYg",
            caption: "Consistent records make clean exports.",
          },
          {
            type: "code",
            prompt: true,
            text: "records log --field-04 --type application\n[ok] product    fert-12-12-12\n[ok] rate       180 kg/ha\n[ok] unit       spreader-01\n[ok] synced",
          },
          {
            type: "quiz",
            title: "Clean data",
            passPercent: 60,
            questions: [
              {
                question: "Why use the standard event types?",
                options: [
                  "So exports and trend views stay clean",
                  "Because free text is banned",
                  "To reduce the number of events",
                  "Standard types are slower to log",
                ],
                answerIndex: 0,
              },
              {
                question: "If you add your own labels, what matters?",
                options: [
                  "Keep them few and spell them the same way every time",
                  "Make them as creative as possible",
                  "Change them each week",
                  "Never use them at all",
                ],
                answerIndex: 0,
              },
              {
                question: "What should a logged application include?",
                options: [
                  "Product, rate, and unit",
                  "Only the date",
                  "Only the field name",
                  "A photo of the operator",
                ],
                answerIndex: 0,
              },
            ],
          },
        ],
      },
      {
        title: "Syncing & exporting",
        content: [
          {
            type: "paragraph",
            text: "Sync keeps the cloud record current and safe. Export hands the same data to your spreadsheet or your agronomist's inbox — the export is the moment the log earns its keep.",
          },
          {
            type: "video",
            url: "https://www.youtube.com/watch?v=aa9fTVCWR90",
            caption: "Sync and export strategies that keep compliance easy.",
          },
          {
            type: "list",
            items: [
              "Sync before leaving the field and again at the end of the day.",
              "Exports carry every event type for the fields you select.",
              "The exported file is plain data — no special reader needed.",
            ],
          },
          {
            type: "quiz",
            title: "Sync & export",
            passPercent: 60,
            questions: [
              {
                question: "When should you sync?",
                options: [
                  "Before leaving the field and at day's end",
                  "Once a month",
                  "Only when the app asks",
                  "Never — it happens by itself",
                ],
                answerIndex: 0,
              },
              {
                question: "What do exports contain?",
                options: [
                  "Every event type for the fields you select",
                  "Only payment history",
                  "Only team member names",
                  "Nothing — exports are decorative",
                ],
                answerIndex: 0,
              },
              {
                question: "Who can open an exported file?",
                options: [
                  "Anyone with a spreadsheet — no special reader",
                  "Only AgriSkills staff",
                  "Only the operation owner",
                  "Nobody; it is encrypted forever",
                ],
                answerIndex: 0,
              },
            ],
          },
        ],
      },
      {
        title: "Reading trend views",
        content: [
          {
            type: "paragraph",
            text: "Trend views turn the log into decisions: last season's irrigation history, this year's scouting counts, each field's fertility line. The snapshot is a moment; the trend is the story — and the story is what you paid for.",
          },
          {
            type: "video",
            url: "https://www.youtube.com/watch?v=h0uuIDtT2xU",
            caption: "Turning logged data into decisions.",
          },
          {
            type: "code",
            prompt: true,
            text: "records trend --field-04 --water\n[ok] week 20   34mm\n[ok] week 21   28mm\n[ok] week 22   41mm\n[ok] season  avg 34mm — within plan",
          },
          {
            type: "quiz",
            title: "Trend views",
            passPercent: 60,
            questions: [
              {
                question: "What do trend views turn the log into?",
                options: [
                  "Decisions",
                  "New passwords",
                  "Coupon codes",
                  "Session bookings",
                ],
                answerIndex: 0,
              },
              {
                question: "Why does a trend beat a single snapshot?",
                options: [
                  "The trend shows direction; a snapshot only shows a moment",
                  "Snapshots are always wrong",
                  "Trends are easier to screenshot",
                  "Trends do not need data",
                ],
                answerIndex: 0,
              },
              {
                question: "The sample trend shows field-04 averaging 34mm — what is it?",
                options: [
                  "Within plan",
                  "Over plan by half",
                  "Under plan completely",
                  "Not measurable",
                ],
                answerIndex: 0,
              },
            ],
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
    modules: [
      {
        title: "Why guides are reference documents",
        content: [
          {
            type: "paragraph",
            text: "Product and field guides are dense by design: they are reference documents, not novels. Reading them front to back wastes time and buries the useful parts. Treat them as a map to query, not a story to consume.",
          },
          {
            type: "video",
            url: "https://www.youtube.com/watch?v=6l4JPsCUWug",
            caption: "Two purposes, safety and maintenance — the manual is the map.",
          },
          {
            type: "list",
            items: [
              "Guides answer questions; they do not entertain.",
              "The structure (headings, tables, callouts) is the navigation.",
              "Your job is to extract what applies to your equipment.",
            ],
          },
          {
            type: "quiz",
            title: "Reference mindset",
            passPercent: 60,
            questions: [
              {
                question: "How should you treat a field guide?",
                options: [
                  "As a reference document to query",
                  "As a novel to read cover to cover",
                  "As decoration for the shelf",
                  "As a legal contract to sign",
                ],
                answerIndex: 0,
              },
              {
                question: "What is the guide's navigation?",
                options: [
                  "Headings, tables, and callouts",
                  "The page numbers only",
                  "The cover artwork",
                  "Its weight",
                ],
                answerIndex: 0,
              },
              {
                question: "What should you extract from a guide?",
                options: [
                  "What applies to your equipment",
                  "Every word, in order",
                  "Only the warranty terms",
                  "Nothing — read it all anyway",
                ],
                answerIndex: 0,
              },
            ],
          },
        ],
      },
      {
        title: "The scan → read → review loop",
        content: [
          {
            type: "paragraph",
            text: "Use a loop instead of a front-to-back pass: scan, read, review. Scan builds the map, read pulls the details, review makes them stick — and each pass takes a fraction of the time of reading cold.",
          },
          {
            type: "video",
            url: "https://www.youtube.com/watch?v=E7CwqNHn_Ns",
            caption: "A note-taking method that works on any technical document.",
          },
          {
            type: "code",
            prompt: true,
            text: "scan()   -> read()  -> review()\nmap      -> notes    -> recall\n10% time -> 60% time -> 30% time",
          },
          {
            type: "quiz",
            title: "The loop",
            passPercent: 60,
            questions: [
              {
                question: "What is the first pass of the loop?",
                options: [
                  "Scan — build the map of the document",
                  "Read every section in order",
                  "Review the glossary",
                  "Test the equipment",
                ],
                answerIndex: 0,
              },
              {
                question: "What does the review pass do?",
                options: [
                  "Re-explain each section in your own words",
                  "Copy the whole guide verbatim",
                  "Skip the hard parts",
                  "Delete your notes",
                ],
                answerIndex: 0,
              },
              {
                question: "Which pass takes the most time?",
                options: [
                  "Read",
                  "Scan",
                  "Review",
                  "All are equal",
                ],
                answerIndex: 0,
              },
            ],
          },
        ],
      },
      {
        title: "Reading safety sections first",
        content: [
          {
            type: "paragraph",
            text: "Do not skim the safety sections. They exist because equipment failures are unforgiving. Read them before anything else, and re-read them before any task you have not done recently.",
          },
          {
            type: "video",
            url: "https://www.youtube.com/watch?v=6Y_VT14aYSE",
            caption: "How manufacturers turn safety sections into checklists.",
          },
          {
            type: "note",
            tone: "warn",
            text: "Safety callouts are not suggestions. When a guide says lock out, lock out.",
          },
          {
            type: "quiz",
            title: "Safety first",
            passPercent: 60,
            questions: [
              {
                question: "When should you read the safety sections?",
                options: [
                  "Before everything else, every time",
                  "Only when the machine is new",
                  "Only in an emergency",
                  "Never — they are boilerplate",
                ],
                answerIndex: 0,
              },
              {
                question: "Safety callouts should be treated as:",
                options: [
                  "Requirements",
                  "Suggestions",
                  "Marketing copy",
                  "Optional reading",
                ],
                answerIndex: 0,
              },
              {
                question: "When should you re-read a safety section?",
                options: [
                  "Before any task you have not done recently",
                  "Once, at purchase",
                  "Only after an accident",
                  "Never",
                ],
                answerIndex: 0,
              },
            ],
          },
        ],
      },
      {
        title: "Tables, diagrams & specs",
        content: [
          {
            type: "paragraph",
            text: "Tables and diagrams carry most of the real information in a guide: clearances, torques, capacities, and flow paths. Read the caption, find your model, and trace the row — do not read a table like prose.",
          },
          {
            type: "video",
            url: "https://www.youtube.com/watch?v=BggoEriIKLo",
            caption: "Reading spec tables: find your machine, trace the row.",
          },
          {
            type: "code",
            prompt: true,
            text: "spec --model m-400 --clearance\n[ok] front   110 cm\n[ok] rear    95 cm\n[ok] note    check with attachment fitted",
          },
          {
            type: "quiz",
            title: "Tables & specs",
            passPercent: 60,
            questions: [
              {
                question: "How do you read a spec table?",
                options: [
                  "Find your model and trace the row",
                  "Read every cell left to right",
                  "Memorize the whole table",
                  "Skip tables entirely",
                ],
                answerIndex: 0,
              },
              {
                question: "What carries most of the real information in a guide?",
                options: [
                  "Tables and diagrams",
                  "The cover letter",
                  "The index page numbers",
                  "The binding",
                ],
                answerIndex: 0,
              },
              {
                question: "The sample spec for model m-400 shows a front clearance of:",
                options: [
                  "110 cm",
                  "95 cm",
                  "140 cm",
                  "Not listed",
                ],
                answerIndex: 0,
              },
            ],
          },
        ],
      },
      {
        title: "Keeping a personal field manual",
        content: [
          {
            type: "paragraph",
            text: "The parts of a guide that apply to you are a small fraction of the whole. Collect them into a personal field manual — your equipment, your settings, your numbers — and the manufacturer's guide becomes a reference you rarely need to reopen.",
          },
          {
            type: "video",
            url: "https://www.youtube.com/watch?v=V6MXP0NK9hA",
            caption: "Build your own field manual from the parts that apply to your kit.",
          },
          {
            type: "list",
            items: [
              "Write down settings that apply to your machines.",
              "Record service intervals with dates, not just mileages.",
              "Update the manual when a task reveals something new.",
            ],
          },
          {
            type: "quiz",
            title: "Field manual",
            passPercent: 60,
            questions: [
              {
                question: "What belongs in a personal field manual?",
                options: [
                  "The settings and numbers that apply to your equipment",
                  "The full text of every guide you own",
                  "Only the safety pages",
                  "The marketing brochure",
                ],
                answerIndex: 0,
              },
              {
                question: "When should the manual be updated?",
                options: [
                  "Whenever a task reveals something new",
                  "Once, when you buy the machine",
                  "Every five years",
                  "Never — it is static",
                ],
                answerIndex: 0,
              },
              {
                question: "A good field manual makes the manufacturer's guide:",
                options: [
                  "Something you rarely need to reopen",
                  "Worthless and obsolete",
                  "Legally binding",
                  "Longer",
                ],
                answerIndex: 0,
              },
            ],
          },
        ],
      },
      {
        title: "Applying the loop for real",
        content: [
          {
            type: "paragraph",
            text: "The loop is deliberately mechanical. A habit does not need to be clever — it needs to run every time you open a manual. Next guide you open: scan it, read the sections that apply, review what you learned, and file one line in your field manual.",
          },
          {
            type: "video",
            url: "https://www.youtube.com/watch?v=XIZcC_NRoOE",
            caption: "The loop in action on real equipment.",
          },
          {
            type: "note",
            tone: "info",
            text: "Ten minutes of loop beats an hour of cold reading — every time.",
          },
          {
            type: "quiz",
            title: "Putting it together",
            passPercent: 60,
            questions: [
              {
                question: "A habit only needs to be one thing. What?",
                options: [
                  "It needs to run every time you open a manual",
                  "It needs to be clever",
                  "It needs to be fast",
                  "It needs to be impressive",
                ],
                answerIndex: 0,
              },
              {
                question: "After reading a section that applies, what should you file?",
                options: [
                  "One line in your field manual",
                  "The whole section, copied out",
                  "Nothing",
                  "A photo of the page",
                ],
                answerIndex: 0,
              },
              {
                question: "Ten minutes of loop versus an hour of cold reading:",
                options: [
                  "The loop wins every time",
                  "Cold reading always wins",
                  "They are identical",
                  "It depends on the weather",
                ],
                answerIndex: 0,
              },
            ],
          },
        ],
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
    modules: [
      {
        title: "Why soil health comes first",
        content: [
          {
            type: "paragraph",
            text: "Soil health is the foundation of every other decision on the farm. Water, nutrients, and root depth all report to the soil. Fix the soil and the rest of the system has a chance; ignore it and no input spends well.",
          },
          {
            type: "video",
            url: "https://www.youtube.com/watch?v=aXY7UiiWVuY",
            caption: "Soil health principles — composition, organic matter, and structure.",
          },
          {
            type: "list",
            items: [
              "Every input passes through the soil first.",
              "Healthy soil holds water and nutrients longer.",
              "Soil problems show up as crop problems one season later.",
            ],
          },
          {
            type: "quiz",
            title: "Foundations of soil health",
            passPercent: 60,
            questions: [
              {
                question: "Why does soil health come first?",
                options: [
                  "Every other decision on the farm depends on it",
                  "It is the cheapest input",
                  "It only matters on sandy fields",
                  "It matters only in wet years",
                ],
                answerIndex: 0,
              },
              {
                question: "What does healthy soil do for water and nutrients?",
                options: [
                  "Holds them longer",
                  "Rejects them",
                  "Converts them to salt",
                  "Nothing measurable",
                ],
                answerIndex: 0,
              },
              {
                question: "Soil problems typically show up as crop problems:",
                options: [
                  "A season later",
                  "The same day",
                  "Never",
                  "Only in the lab report",
                ],
                answerIndex: 0,
              },
            ],
          },
        ],
      },
      {
        title: "The four indicators",
        content: [
          {
            type: "paragraph",
            text: "You do not need laboratory equipment to track soil health. Four observable indicators — structure, biology, chemistry, and moisture — give you a practical framework you can check at the same points, in the same way, every time.",
          },
          {
            type: "video",
            url: "https://www.youtube.com/watch?v=7gHOOZcpXbs",
            caption: "Moisture, the fourth indicator, managed properly.",
          },
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
            type: "quiz",
            title: "The four indicators",
            passPercent: 60,
            questions: [
              {
                question: "Which of these is one of the four indicators?",
                options: [
                  "Structure",
                  "Texture",
                  "Slope",
                  "Elevation",
                ],
                answerIndex: 0,
              },
              {
                question: "What does the chemistry indicator track?",
                options: [
                  "Availability of the nutrients your crop needs",
                  "The number of earthworms",
                  "How fast water drains",
                  "How deep the roots grow",
                ],
                answerIndex: 0,
              },
              {
                question: "How many indicators does the course track?",
                options: [
                  "Four",
                  "Two",
                  "Seven",
                  "Twelve",
                ],
                answerIndex: 0,
              },
            ],
          },
        ],
      },
      {
        title: "Structure & biology",
        content: [
          {
            type: "paragraph",
            text: "Structure is how aggregates hold together under pressure — crumbly but cohesive, with pore space for air and roots. Biology is the organisms doing the work: bacteria, fungi, and the earthworms that are the visible proof of a functioning soil food web.",
          },
          {
            type: "video",
            url: "https://www.youtube.com/watch?v=xJrGeLd-iy8",
            caption: "Carbon fuels the biology that builds structure.",
          },
          {
            type: "code",
            prompt: true,
            text: "soil check --profile field-04\n[ok] structure    good — crumbly, holds shape\n[ok] biology     fair — worms at 3 points\n[ok] note        add organic matter this fall",
          },
          {
            type: "quiz",
            title: "Structure & biology",
            passPercent: 60,
            questions: [
              {
                question: "What does good structure look like in your hand?",
                options: [
                  "Crumbly but cohesive, with pore space",
                  "Hard and solid",
                  "Dusty and loose",
                  "Slick and greasy",
                ],
                answerIndex: 0,
              },
              {
                question: "What is the visible proof of a working soil food web?",
                options: [
                  "Earthworms",
                  "Dry crust",
                  "Standing water",
                  "Bare ground",
                ],
                answerIndex: 0,
              },
              {
                question: "The sample check marked biology as 'fair' — what does the note suggest?",
                options: [
                  "Add organic matter this fall",
                  "Add more fertilizer now",
                  "Tillage the field deeper",
                  "Do nothing",
                ],
                answerIndex: 0,
              },
            ],
          },
        ],
      },
      {
        title: "Chemistry & moisture",
        content: [
          {
            type: "paragraph",
            text: "Chemistry is nutrient availability — the part of the soil you can move with a fertilizer plan, and the reason soil tests exist. Moisture is how the soil holds and drains water: too tight drowns roots, too loose loses every drop.",
          },
          {
            type: "video",
            url: "https://www.youtube.com/watch?v=qcH9aYIbgF4",
            caption: "Home chemistry checks: pH and nutrients in practice.",
          },
          {
            type: "note",
            tone: "info",
            text: "Moisture is the indicator that changes fastest. Check it the same day of the week, and note the weather since the last check.",
          },
          {
            type: "quiz",
            title: "Chemistry & moisture",
            passPercent: 60,
            questions: [
              {
                question: "Which indicator can you move with a fertilizer plan?",
                options: [
                  "Chemistry",
                  "Biology",
                  "Structure",
                  "Moisture",
                ],
                answerIndex: 0,
              },
              {
                question: "What happens when soil holds water too tightly?",
                options: [
                  "Roots drown",
                  "Roots grow faster",
                  "Nutrients double",
                  "Nothing",
                ],
                answerIndex: 0,
              },
              {
                question: "How should moisture checks be scheduled?",
                options: [
                  "The same day each week, noting the weather since",
                  "Only after rain",
                  "Only in drought",
                  "Randomly",
                ],
                answerIndex: 0,
              },
            ],
          },
        ],
      },
      {
        title: "Sampling the same way every time",
        content: [
          {
            type: "paragraph",
            text: "Sample the same three points in each field every time. Consistency is what makes the record comparable season to season — a change between checks means something only if the method did not change between checks.",
          },
          {
            type: "video",
            url: "https://www.youtube.com/watch?v=np9RbtHX6mA",
            caption: "Sampling technique — the same way, every time.",
          },
          {
            type: "list",
            items: [
              "Mark the three points; do not eyeball them each week.",
              "Sample at the same depth and the same stage of the day.",
              "Record the weather since the last check with every entry.",
            ],
          },
          {
            type: "quiz",
            title: "Consistent sampling",
            passPercent: 60,
            questions: [
              {
                question: "How many points should you sample per field?",
                options: [
                  "The same three points every time",
                  "A new random point each week",
                  "One point, wherever is easiest",
                  "As many as the weather allows",
                ],
                answerIndex: 0,
              },
              {
                question: "Why must the method stay identical?",
                options: [
                  "So changes mean something and records stay comparable",
                  "Because the lab requires it",
                  "To save time",
                  "It does not matter",
                ],
                answerIndex: 0,
              },
              {
                question: "What should accompany every moisture entry?",
                options: [
                  "The weather since the last check",
                  "A photo of the sky",
                  "The soil test date",
                  "Nothing extra",
                ],
                answerIndex: 0,
              },
            ],
          },
        ],
      },
      {
        title: "Reading your trend line",
        content: [
          {
            type: "paragraph",
            text: "You are not looking for a perfect score. You are building a trend line — and the trend, not the snapshot, is what guides your decisions. A fair biology reading that improves across three seasons is worth more than one perfect reading.",
          },
          {
            type: "video",
            url: "https://www.youtube.com/watch?v=HYrkcfE62Pg",
            caption: "Interpreting the report so the trend guides the decision.",
          },
          {
            type: "code",
            prompt: true,
            text: "soil trend --field-04\n[ok] 2023  structure fair  biology low\n[ok] 2024  structure good biology fair\n[ok] 2025  structure good biology fair\n[ok] trend  improving — keep the routine",
          },
          {
            type: "quiz",
            title: "The trend line",
            passPercent: 60,
            questions: [
              {
                question: "What should you be building across samples?",
                options: [
                  "A trend line that guides decisions",
                  "A perfect score on every check",
                  "A larger dataset than your neighbors",
                  "A laboratory-grade report",
                ],
                answerIndex: 0,
              },
              {
                question: "Which is worth more?",
                options: [
                  "A fair reading that improves across seasons",
                  "One perfect reading that never repeats",
                  "The lab report alone",
                  "The highest single score",
                ],
                answerIndex: 0,
              },
              {
                question: "The sample trend for field-04 is:",
                options: [
                  "Improving — keep the routine",
                  "Declining",
                  "Flat",
                  "Not measurable",
                ],
                answerIndex: 0,
              },
            ],
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
    modules: [
      {
        title: "What a soil test is for",
        content: [
          {
            type: "paragraph",
            text: "A soil test is only as useful as the plan you build from it. The report is a snapshot of availability at one moment; the plan turns that snapshot into actions — what to apply, how much, and how to record it so next season's test means something.",
          },
          {
            type: "video",
            url: "https://www.youtube.com/watch?v=np9RbtHX6mA",
            caption: "What a soil test measures — and what the report means.",
          },
          {
            type: "list",
            items: [
              "The report measures availability, not total nutrients.",
              "The plan decides what changes, and in what order.",
              "The record makes next season's report comparable.",
            ],
          },
          {
            type: "quiz",
            title: "Purpose of the test",
            passPercent: 60,
            questions: [
              {
                question: "What does a soil test actually measure?",
                options: [
                  "Nutrient availability at one moment",
                  "Total nutrient content forever",
                  "Crop yield potential",
                  "The weather forecast",
                ],
                answerIndex: 0,
              },
              {
                question: "What turns a report into action?",
                options: [
                  "A fertility plan",
                  "Reading it twice",
                  "Filing it away",
                  "Sending it to a neighbor",
                ],
                answerIndex: 0,
              },
              {
                question: "Why keep the record of what you applied?",
                options: [
                  "So next season's test is comparable",
                  "Because the lab requires it",
                  "For the tax office only",
                  "No reason",
                ],
                answerIndex: 0,
              },
            ],
          },
        ],
      },
      {
        title: "pH — the master switch",
        content: [
          {
            type: "paragraph",
            text: "pH is the master switch. Outside the 6.0–7.0 band, nutrients lock up no matter how much you apply. Read it first, correct it first, and re-test before spending a cent on the rest of the plan.",
          },
          {
            type: "video",
            url: "https://www.youtube.com/watch?v=qcH9aYIbgF4",
            caption: "Testing pH — the master switch in practice.",
          },
          {
            type: "note",
            tone: "warn",
            text: "Lime takes months to work. Correct pH a season ahead of the crop that needs it.",
          },
          {
            type: "quiz",
            title: "pH basics",
            passPercent: 60,
            questions: [
              {
                question: "Why is pH called the master switch?",
                options: [
                  "Outside the 6.0–7.0 band, nutrients lock up",
                  "It controls the price of fertilizer",
                  "It decides the crop variety",
                  "It never changes",
                ],
                answerIndex: 0,
              },
              {
                question: "What corrects low pH?",
                options: [
                  "Lime",
                  "More nitrogen",
                  "More irrigation",
                  "Deeper tillage",
                ],
                answerIndex: 0,
              },
              {
                question: "Why correct pH a season ahead?",
                options: [
                  "Lime takes months to work",
                  "It is cheaper that way",
                  "The lab requires it",
                  "It does not matter when",
                ],
                answerIndex: 0,
              },
            ],
          },
        ],
      },
      {
        title: "CEC & holding capacity",
        content: [
          {
            type: "paragraph",
            text: "CEC is your soil's nutrient holding capacity. High-CEC soils forgive mistakes — they hold what you apply and release it slowly. Low-CEC soils punish them: every application is a race against leaching.",
          },
          {
            type: "video",
            url: "https://www.youtube.com/watch?v=vgLJ_u4GtpY",
            caption: "CEC, organic matter, pH, and buffer index on a real report.",
          },
          {
            type: "code",
            prompt: true,
            text: "lab report --field-04 --spring\n[ok] ph      6.4    target 6.2–6.8\n[ok] cec     12.8   meq/100g — medium\n[ok] p       34     ppm    target 25–40\n[warn] k       118    ppm    low — below 140",
          },
          {
            type: "quiz",
            title: "CEC",
            passPercent: 60,
            questions: [
              {
                question: "What does CEC measure?",
                options: [
                  "Nutrient holding capacity",
                  "Crop growth rate",
                  "Drainage speed",
                  "Soil temperature",
                ],
                answerIndex: 0,
              },
              {
                question: "On a low-CEC soil, applications:",
                options: [
                  "Race against leaching",
                  "Last forever",
                  "Never need repeating",
                  "Become unnecessary",
                ],
                answerIndex: 0,
              },
              {
                question: "The sample report lists CEC at 12.8 meq/100g. How is it rated?",
                options: [
                  "Medium",
                  "High",
                  "Very high",
                  "Not rated",
                ],
                answerIndex: 0,
              },
            ],
          },
        ],
      },
      {
        title: "Reading macronutrients",
        content: [
          {
            type: "paragraph",
            text: "Nitrogen, phosphorus, potassium, and sulfur are reported as availability, not truth. Compare each against the target for your crop and soil type — the report's 'low / medium / high' banding does the first pass for you.",
          },
          {
            type: "video",
            url: "https://www.youtube.com/watch?v=HYrkcfE62Pg",
            caption: "Interpreting your soil test results line by line.",
          },
          {
            type: "list",
            items: [
              "P and K are soil-borne — the report reflects your field.",
              "N is mobile — read it with the crop stage in mind.",
              "A 'low' band means a plan action, not a panic.",
            ],
          },
          {
            type: "quiz",
            title: "Macronutrients",
            passPercent: 60,
            questions: [
              {
                question: "In the sample report, which nutrients are below target?",
                options: [
                  "Potassium and magnesium",
                  "Phosphorus and nitrogen",
                  "pH and CEC",
                  "Only phosphorus",
                ],
                answerIndex: 0,
              },
              {
                question: "How should nitrogen be read?",
                options: [
                  "With the crop stage in mind",
                  "As a fixed soil number",
                  "Only in spring",
                  "It is never reported",
                ],
                answerIndex: 0,
              },
              {
                question: "A 'low' band in the report means:",
                options: [
                  "A plan action, not a panic",
                  "The field is ruined",
                  "Skip the field this year",
                  "Nothing at all",
                ],
                answerIndex: 0,
              },
            ],
          },
        ],
      },
      {
        title: "Building the plan in three passes",
        content: [
          {
            type: "paragraph",
            text: "Correct pH first — lime or sulfur changes everything downstream. Then address the deficit that costs the most, usually potassium or magnesium when they read low. Hold nitrogen for the crop stage; it is managed in-season, not dumped at planting.",
          },
          {
            type: "video",
            url: "https://www.youtube.com/watch?v=aa9fTVCWR90",
            caption: "Recordkeeping strategies for defensible fertility decisions.",
          },
          {
            type: "list",
            items: [
              "Pass one: correct pH before anything else.",
              "Pass two: fix the deficit that costs the most, at the recommended rate.",
              "Pass three: stage nitrogen to the crop, not to the calendar.",
            ],
          },
          {
            type: "quiz",
            title: "Three passes",
            passPercent: 60,
            questions: [
              {
                question: "Which correction comes first in a fertility plan?",
                options: [
                  "pH",
                  "Phosphorus",
                  "Nitrogen",
                  "Potassium",
                ],
                answerIndex: 0,
              },
              {
                question: "In pass two, what do you fix first?",
                options: [
                  "The deficit that costs the most",
                  "The cheapest product",
                  "Whatever is on sale",
                  "The smallest deficiency",
                ],
                answerIndex: 0,
              },
              {
                question: "How should nitrogen be applied?",
                options: [
                  "Staged to the crop, in-season",
                  "All at planting",
                  "All at harvest",
                  "Never",
                ],
                answerIndex: 0,
              },
            ],
          },
        ],
      },
      {
        title: "Logging & defensible decisions",
        content: [
          {
            type: "paragraph",
            text: "A plan written but not logged is a guess. After each application, record the product, rate, and date. The record is what makes next season's test comparable — and your decisions defensible when anyone asks why you did what you did.",
          },
          {
            type: "video",
            url: "https://www.youtube.com/watch?v=LP2K7tVXzYg",
            caption: "The application log that makes your decisions defensible.",
          },
          {
            type: "code",
            prompt: true,
            text: "application log --field-04 --spring\n[ok] product   lime, 2 t/ha\n[ok] product   k-mag, 150 kg/ha\n[ok] date      14 mar\n[ok] recorded  by j. brennan",
          },
          {
            type: "quiz",
            title: "The record",
            passPercent: 60,
            questions: [
              {
                question: "What should every logged application include?",
                options: [
                  "Product, rate, and date",
                  "Only the date",
                  "Only the field",
                  "A photo of the truck",
                ],
                answerIndex: 0,
              },
              {
                question: "A plan that is written but not logged is:",
                options: [
                  "A guess",
                  "A contract",
                  "A record",
                  "A report",
                ],
                answerIndex: 0,
              },
              {
                question: "What does the log make your decisions?",
                options: [
                  "Defensible",
                  "Secret",
                  "Automatic",
                  "Obsolete",
                ],
                answerIndex: 0,
              },
            ],
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
    modules: [
      {
        title: "Why routine beats response",
        content: [
          {
            type: "paragraph",
            text: "Most crop damage is discovered late, because most of us scout like it is an emergency response instead of a routine. A weekly loop — walk, count, log, decide — shows you the problem while it is still cheap to fix, and gives you the numbers to prove the fix was necessary.",
          },
          {
            type: "video",
            url: "https://www.youtube.com/watch?v=lIzh9ua1iVk",
            caption: "IPM is a routine, not a response — the foundations.",
          },
          {
            type: "list",
            items: [
              "Response scouting finds problems late and expensive.",
              "Routine scouting finds them early and cheap.",
              "The log turns sightings into evidence.",
            ],
          },
          {
            type: "quiz",
            title: "Routine vs response",
            passPercent: 60,
            questions: [
              {
                question: "Why does routine beat response?",
                options: [
                  "Problems are found early, while they are cheap to fix",
                  "Routine takes less time overall",
                  "Response never works at all",
                  "Routine replaces the need to think",
                ],
                answerIndex: 0,
              },
              {
                question: "The weekly loop is:",
                options: [
                  "Walk, count, log, decide",
                  "Spray, wait, spray again",
                  "Call, guess, hope",
                  "Skip, skip, skip",
                ],
                answerIndex: 0,
              },
              {
                question: "What does the log turn sightings into?",
                options: [
                  "Evidence",
                  "Rumors",
                  "Marketing",
                  "Guesses",
                ],
                answerIndex: 0,
              },
            ],
          },
        ],
      },
      {
        title: "The weekly loop",
        content: [
          {
            type: "paragraph",
            text: "Walk a fixed pattern — the same transect or W-shape every week, so sightings are comparable. Sample the right spots: field edges, low areas, and the patches that were hot last season. Count, don't guess — record counts per plant or per trap, never 'a lot'.",
          },
          {
            type: "video",
            url: "https://www.youtube.com/watch?v=mY80cEx15H0",
            caption: "Scouting as the foundation of your weekly IPM loop.",
          },
          {
            type: "code",
            prompt: true,
            text: "scout run --field-04 --week-12\n[ok] aphids     4 / plant   threshold 10\n[ok] mildew     trace      threshold 5% leaf\n[warn] armyworm   6 / trap    threshold 8\n[info] record     logged",
          },
          {
            type: "quiz",
            title: "The loop in practice",
            passPercent: 60,
            questions: [
              {
                question: "Why walk the same pattern every week?",
                options: [
                  "So sightings are comparable week to week",
                  "It is faster than a random walk",
                  "Pests follow fixed paths",
                  "It covers the field evenly in one pass",
                ],
                answerIndex: 0,
              },
              {
                question: "Which spots should you sample?",
                options: [
                  "Edges, low areas, and last season's hot patches",
                  "Only the middle of the field",
                  "Only the highest ground",
                  "Wherever the truck stops",
                ],
                answerIndex: 0,
              },
              {
                question: "In the sample log, which pest is closest to its threshold?",
                options: [
                  "Armyworm — 6 of 8",
                  "Aphids — 4 of 10",
                  "Mildew — trace",
                  "None of them",
                ],
                answerIndex: 0,
              },
            ],
          },
        ],
      },
      {
        title: "Where and how to sample",
        content: [
          {
            type: "paragraph",
            text: "Pests arrive at edges first. Sample the perimeter and the low, sheltered corners where humidity and pest pressure build, then sample the interior for comparison. The same number of stops, the same stops, every week.",
          },
          {
            type: "video",
            url: "https://www.youtube.com/watch?v=F_MAHfhBf60",
            caption: "Where to look and how to sample for pests.",
          },
          {
            type: "list",
            items: [
              "Walk the edges first — that is where pests arrive.",
              "Sample low and sheltered corners every week.",
              "Keep the stop count and positions identical.",
            ],
          },
          {
            type: "quiz",
            title: "Sampling method",
            passPercent: 60,
            questions: [
              {
                question: "Where do pests typically arrive first?",
                options: [
                  "Field edges",
                  "The exact center",
                  "The highest point",
                  "Under the fence posts only",
                ],
                answerIndex: 0,
              },
              {
                question: "Why sample low, sheltered corners?",
                options: [
                  "Humidity and pest pressure build there",
                  "They are easier to reach",
                  "The soil is always better there",
                  "They never matter",
                ],
                answerIndex: 0,
              },
              {
                question: "The stop count and positions should be:",
                options: [
                  "Identical every week",
                  "Different each week",
                  "Doubled after rain",
                  "Optional",
                ],
                answerIndex: 0,
              },
            ],
          },
        ],
      },
      {
        title: "Counting without guessing",
        content: [
          {
            type: "paragraph",
            text: "'A lot' is not data. Count per plant or per trap, record the number, and let the threshold decide. A count that surprises you is either a real problem or a method change — the log tells you which.",
          },
          {
            type: "video",
            url: "https://www.youtube.com/watch?v=vPjViVjHAgA",
            caption: "Scouting and management that reduce pesticide dependence.",
          },
          {
            type: "note",
            tone: "info",
            text: "If a count jumps, re-check your method before you re-check your sprayer.",
          },
          {
            type: "quiz",
            title: "Counting",
            passPercent: 60,
            questions: [
              {
                question: "What is the minimum acceptable record?",
                options: [
                  "A count per plant or per trap",
                  "'A lot'",
                  "A general impression",
                  "A photo of the field",
                ],
                answerIndex: 0,
              },
              {
                question: "A surprising jump in a count means:",
                options: [
                  "A real problem or a method change — the log tells which",
                  "Always spray immediately",
                  "The field is lost",
                  "Ignore it until next week",
                ],
                answerIndex: 0,
              },
              {
                question: "Before re-checking your sprayer after a jump, re-check:",
                options: [
                  "Your method",
                  "Your schedule",
                  "The weather app",
                  "The price of fuel",
                ],
                answerIndex: 0,
              },
            ],
          },
        ],
      },
      {
        title: "Economic thresholds",
        content: [
          {
            type: "paragraph",
            text: "A pest is not a problem until it crosses the economic threshold — the population where the cost of treatment equals the value of the damage it prevents. Below it: do nothing but keep counting. Above it: act within the week.",
          },
          {
            type: "video",
            url: "https://www.youtube.com/watch?v=stX3_9ou91c",
            caption: "Economic injury levels and thresholds, explained by an entomologist.",
          },
          {
            type: "note",
            tone: "warn",
            text: "Spraying below threshold costs money and kills the beneficials doing your work for free.",
          },
          {
            type: "quiz",
            title: "Thresholds",
            passPercent: 60,
            questions: [
              {
                question: "What is the economic threshold?",
                options: [
                  "Where treatment cost equals prevented damage value",
                  "The first pest you see",
                  "The highest count of the year",
                  "A number set by the sprayer",
                ],
                answerIndex: 0,
              },
              {
                question: "Below the threshold, the correct action is:",
                options: [
                  "Keep counting and do nothing yet",
                  "Spray immediately to be safe",
                  "Double the scouting interval",
                  "Skip the field next week",
                ],
                answerIndex: 0,
              },
              {
                question: "What does spraying below threshold waste besides money?",
                options: [
                  "The beneficials doing your work for free",
                  "The fuel in the sprayer",
                  "The operator's time only",
                  "Nothing at all",
                ],
                answerIndex: 0,
              },
            ],
          },
        ],
      },
      {
        title: "Your scouting log as evidence",
        content: [
          {
            type: "paragraph",
            text: "The scouting log is the evidence for every spray decision — and the record that shows restraint. When you need support, the log is what lets our team give you a real answer instead of a guess.",
          },
          {
            type: "code",
            prompt: true,
            text: "scout trend --field-04 --armyworm\n[ok] week 11   2 / trap\n[ok] week 12   6 / trap\n[ok] week 13   9 / trap — threshold crossed\n[ok] action    spray, week 13",
          },
          {
            type: "quiz",
            title: "The log as evidence",
            passPercent: 60,
            questions: [
              {
                question: "What is the scouting log evidence for?",
                options: [
                  "Every spray decision — and every decision not to spray",
                  "The price of chemicals",
                  "The size of the crop",
                  "Nothing",
                ],
                answerIndex: 0,
              },
              {
                question: "In the trend, when did armyworm cross threshold?",
                options: [
                  "Week 13",
                  "Week 11",
                  "Week 12",
                  "Never",
                ],
                answerIndex: 0,
              },
              {
                question: "When you contact support about a pest, the log lets the team:",
                options: [
                  "Give a real answer instead of a guess",
                  "Refuse to respond",
                  "Send a generic reply",
                  "Charge you extra",
                ],
                answerIndex: 0,
              },
            ],
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
    modules: [
      {
        title: "Measure, apply, log",
        content: [
          {
            type: "paragraph",
            text: "Water is the input that most operations apply by habit rather than by measurement. This course replaces the calendar with a simple, defensible routine: measure, apply, log — in that order, every time.",
          },
          {
            type: "list",
            items: [
              "Measure soil moisture, not the date, to decide timing.",
              "Apply at the rate your soil type needs.",
              "Log every event; patterns beat opinions.",
            ],
          },
          {
            type: "quiz",
            title: "The routine",
            passPercent: 60,
            questions: [
              {
                question: "What decides irrigation timing?",
                options: [
                  "Soil moisture measurement",
                  "The calendar date",
                  "The neighbor's schedule",
                  "The forecast alone",
                ],
                answerIndex: 0,
              },
              {
                question: "The routine, in order, is:",
                options: [
                  "Measure, apply, log",
                  "Apply, log, measure",
                  "Log, apply, measure",
                  "Guess, apply, forget",
                ],
                answerIndex: 0,
              },
              {
                question: "What beats opinions when scheduling water?",
                options: [
                  "The logged record",
                  "The oldest operator",
                  "The newest equipment",
                  "The market price",
                ],
                answerIndex: 0,
              },
            ],
          },
        ],
      },
      {
        title: "Matching application to need",
        content: [
          {
            type: "paragraph",
            text: "The same volume behaves differently in sand and clay. Sand drains fast and needs small, frequent applications; clay holds longer and needs larger, less frequent ones. Match the rate to the soil, not to the previous field.",
          },
          {
            type: "code",
            prompt: true,
            text: "irrigation plan --field-04\n[ok] soil      clay loam\n[ok] budget    42 mm/week\n[ok] split     3 applications\n[ok] trigger   moisture < 60% available",
          },
          {
            type: "quiz",
            title: "Matching need",
            passPercent: 60,
            questions: [
              {
                question: "How does sand behave under irrigation?",
                options: [
                  "Drains fast — needs small, frequent applications",
                  "Holds water forever",
                  "Needs no water at all",
                  "Behaves exactly like clay",
                ],
                answerIndex: 0,
              },
              {
                question: "Match the rate to:",
                options: [
                  "The soil type",
                  "The previous field",
                  "The tank size",
                  "The time of day",
                ],
                answerIndex: 0,
              },
              {
                question: "The sample plan for a clay loam field sets a trigger of:",
                options: [
                  "Moisture below 60% available",
                  "Every Friday",
                  "When the leaves wilt",
                  "When the neighbor irrigates",
                ],
                answerIndex: 0,
              },
            ],
          },
        ],
      },
      {
        title: "Soil types & water behavior",
        content: [
          {
            type: "paragraph",
            text: "Know your field's soil type and its available water capacity — the band between field capacity and wilting point. Irrigation only counts inside that band; everything above is lost, everything below is stress.",
          },
          {
            type: "list",
            items: [
              "Field capacity — how much the soil holds after drainage.",
              "Wilting point — where the crop can no longer extract water.",
              "Available water — the useful band between them.",
            ],
          },
          {
            type: "quiz",
            title: "Water behavior",
            passPercent: 60,
            questions: [
              {
                question: "The useful band for irrigation is:",
                options: [
                  "Between field capacity and wilting point",
                  "Everything above field capacity",
                  "Everything below wilting point",
                  "The full tank volume",
                ],
                answerIndex: 0,
              },
              {
                question: "Water applied above field capacity:",
                options: [
                  "Is lost",
                  "Is stored for later",
                  "Doubles the crop",
                  "Improves the soil",
                ],
                answerIndex: 0,
              },
              {
                question: "Below wilting point, the crop:",
                options: [
                  "Can no longer extract water",
                  "Grows fastest",
                  "Stores water in its roots",
                  "Is unaffected",
                ],
                answerIndex: 0,
              },
            ],
          },
        ],
      },
      {
        title: "Splitting applications",
        content: [
          {
            type: "paragraph",
            text: "A big weekly application on light soil runs straight through the root zone. Split the same budget into two or three passes a week — the crop gets a steady supply, and the record shows why.",
          },
          {
            type: "note",
            tone: "info",
            text: "Splitting is not extra water; it is the same water, timed better.",
          },
          {
            type: "quiz",
            title: "Splitting",
            passPercent: 60,
            questions: [
              {
                question: "Why split a weekly application?",
                options: [
                  "Light soil cannot hold it in one pass",
                  "It doubles the water budget",
                  "It saves fuel",
                  "The pump requires it",
                ],
                answerIndex: 0,
              },
              {
                question: "Splitting means:",
                options: [
                  "The same water, timed better",
                  "More water overall",
                  "Less water overall",
                  "Watering at night only",
                ],
                answerIndex: 0,
              },
              {
                question: "The sample plan splits the 42mm budget into:",
                options: [
                  "3 applications",
                  "1 application",
                  "6 applications",
                  "10 applications",
                ],
                answerIndex: 0,
              },
            ],
          },
        ],
      },
      {
        title: "The water record",
        content: [
          {
            type: "paragraph",
            text: "After three weeks of logged events you have something no calendar can give you: a record of what your fields actually needed. The water record answers the two questions that matter — did we apply enough, and did we waste any?",
          },
          {
            type: "code",
            prompt: true,
            text: "water log --field-04\n[ok] 21 jun   14 mm\n[ok] 24 jun   14 mm\n[ok] 27 jun   14 mm\n[ok] season   42 mm/week — within budget",
          },
          {
            type: "quiz",
            title: "The record",
            passPercent: 60,
            questions: [
              {
                question: "What does a water record let you answer?",
                options: [
                  "Did we apply enough, and did we waste any",
                  "How much the pump costs",
                  "Which brand of pipe to buy",
                  "Nothing",
                ],
                answerIndex: 0,
              },
              {
                question: "The sample log shows field-04 is:",
                options: [
                  "Within budget",
                  "Over budget by half",
                  "Under budget completely",
                  "Not measurable",
                ],
                answerIndex: 0,
              },
              {
                question: "Three weeks of logging gives you:",
                options: [
                  "A record of what the fields actually needed",
                  "A reason to stop logging",
                  "A full season forecast",
                  "An automatic sprinkler",
                ],
                answerIndex: 0,
              },
            ],
          },
        ],
      },
      {
        title: "Seasonal adjustments",
        content: [
          {
            type: "paragraph",
            text: "Crop water use climbs with growth and temperature, then falls at maturity. Adjust the weekly budget with the season — a fixed calendar schedule under-waters the peak and wastes water at the edges.",
          },
          {
            type: "list",
            items: [
              "Raise the budget through the growth peak.",
              "Cut it back as the crop matures.",
              "Review the whole season's log before next year's plan.",
            ],
          },
          {
            type: "quiz",
            title: "Seasonal planning",
            passPercent: 60,
            questions: [
              {
                question: "How does crop water use move through the season?",
                options: [
                  "Climbs with growth, falls at maturity",
                  "Stays perfectly flat",
                  "Falls, then climbs",
                  "Only depends on rain",
                ],
                answerIndex: 0,
              },
              {
                question: "A fixed calendar schedule:",
                options: [
                  "Under-waters the peak and wastes at the edges",
                  "Is the most accurate method",
                  "Needs no adjustments ever",
                  "Saves the most water",
                ],
                answerIndex: 0,
              },
              {
                question: "When should you review the season's log?",
                options: [
                  "Before next year's plan",
                  "Never",
                  "Only in a drought",
                  "At every single irrigation",
                ],
                answerIndex: 0,
              },
            ],
          },
        ],
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
    modules: [
      {
        title: "Most failures are skipped checks",
        content: [
          {
            type: "paragraph",
            text: "Most equipment failures are not sudden; they are the result of a check that was skipped once too often. This course installs a three-tier rhythm — daily, weekly, seasonal — that keeps machines ready and operators safe.",
          },
          {
            type: "list",
            items: [
              "Daily — the visual walkaround before first start.",
              "Weekly — filters, fluids, fasteners.",
              "Seasonal — deep service and proper storage.",
            ],
          },
          {
            type: "quiz",
            title: "The three tiers",
            passPercent: 60,
            questions: [
              {
                question: "Most equipment failures are caused by:",
                options: [
                  "A check skipped once too often",
                  "A single dramatic event",
                  "Bad luck",
                  "The operator's age",
                ],
                answerIndex: 0,
              },
              {
                question: "What is the daily tier?",
                options: [
                  "A visual walkaround before first start",
                  "A full engine rebuild",
                  "A seasonal deep service",
                  "Nothing",
                ],
                answerIndex: 0,
              },
              {
                question: "The three tiers, in order, are:",
                options: [
                  "Daily, weekly, seasonal",
                  "Weekly, daily, seasonal",
                  "Seasonal, daily, weekly",
                  "Monthly, yearly, never",
                ],
                answerIndex: 0,
              },
            ],
          },
        ],
      },
      {
        title: "The daily walkaround",
        content: [
          {
            type: "paragraph",
            text: "Before the first start: fluids, tires, guards, and the ground under the machine. Six minutes, no tools, no shortcuts. It is the cheapest insurance in the operation, and it is the one step that is never optional.",
          },
          {
            type: "code",
            prompt: true,
            text: "equipment check --pre-start\n[ok] fluids    ok\n[ok] tires     ok\n[ok] guards    fitted\n[ok] ground    clean\n[ok] ready",
          },
          {
            type: "quiz",
            title: "Walkaround",
            passPercent: 60,
            questions: [
              {
                question: "The daily walkaround takes about:",
                options: [
                  "Six minutes",
                  "An hour",
                  "A full day",
                  "It has no fixed time",
                ],
                answerIndex: 0,
              },
              {
                question: "What should you check under the machine?",
                options: [
                  "The ground — for leaks and debris",
                  "Nothing",
                  "The shadow it casts",
                  "The paint condition",
                ],
                answerIndex: 0,
              },
              {
                question: "The walkaround is:",
                options: [
                  "Never optional",
                  "Optional on busy days",
                  "Only for new machines",
                  "Only for old machines",
                ],
                answerIndex: 0,
              },
            ],
          },
        ],
      },
      {
        title: "Weekly checks",
        content: [
          {
            type: "paragraph",
            text: "Once a week, go beyond the walkaround: filters, fluids, fasteners, and anything the daily pass does not cover. The weekly pass is where small problems announce themselves while they are still cheap.",
          },
          {
            type: "list",
            items: [
              "Change or clean filters on schedule, not on sight.",
              "Top up fluids and record consumption — consumption tells stories.",
              "Check fasteners on anything that vibrates.",
            ],
          },
          {
            type: "quiz",
            title: "Weekly checks",
            passPercent: 60,
            questions: [
              {
                question: "The weekly pass covers:",
                options: [
                  "Filters, fluids, fasteners, and more",
                  "Only the tires",
                  "Only the cab interior",
                  "Nothing beyond the walkaround",
                ],
                answerIndex: 0,
              },
              {
                question: "Fluid consumption records tell you:",
                options: [
                  "Stories — trends point to real problems",
                  "The price of oil",
                  "The date of purchase",
                  "Nothing useful",
                ],
                answerIndex: 0,
              },
              {
                question: "Fasteners on vibrating parts should be checked:",
                options: [
                  "Weekly",
                  "Yearly",
                  "Only after a failure",
                  "Never",
                ],
                answerIndex: 0,
              },
            ],
          },
        ],
      },
      {
        title: "Seasonal service & storage",
        content: [
          {
            type: "paragraph",
            text: "The seasonal pass is a deep service and a proper winterization before storage. Clean it, protect it, and store it where the weather cannot undo a year of good care — a machine stored well starts the season ready.",
          },
          {
            type: "note",
            tone: "info",
            text: "Winterization is not optional either. A machine that freezes is a machine that fails in spring.",
          },
          {
            type: "quiz",
            title: "Seasonal service",
            passPercent: 60,
            questions: [
              {
                question: "The seasonal pass is:",
                options: [
                  "A deep service and proper winterization",
                  "A quick oil check",
                  "A wash and wax",
                  "Optional",
                ],
                answerIndex: 0,
              },
              {
                question: "A machine stored well:",
                options: [
                  "Starts the season ready",
                  "Needs a rebuild every spring",
                  "Loses value faster",
                  "Is indistinguishable from a stored one",
                ],
                answerIndex: 0,
              },
              {
                question: "A machine that freezes in storage:",
                options: [
                  "Fails in spring",
                  "Works better",
                  "Needs only a paint touch-up",
                  "Is protected by the warranty",
                ],
                answerIndex: 0,
              },
            ],
          },
        ],
      },
      {
        title: "Safety: guards & never-options",
        content: [
          {
            type: "paragraph",
            text: "Never bypass a guard to save time. A ten-second shortcut can cost a season — or an operator. The never-options are not maintenance advice; they are the line between a routine day and a bad one.",
          },
          {
            type: "note",
            tone: "warn",
            text: "No guard removed, no lock bypassed, no speed that the manual does not allow. Ever.",
          },
          {
            type: "quiz",
            title: "Safety rules",
            passPercent: 60,
            questions: [
              {
                question: "A guard removed to save time:",
                options: [
                  "Can cost a season or an operator",
                  "Is fine on busy days",
                  "Only matters on old machines",
                  "Is recommended by the manual",
                ],
                answerIndex: 0,
              },
              {
                question: "The never-options are:",
                options: [
                  "The line between a routine day and a bad one",
                  "Maintenance advice",
                  "Optional best practices",
                  "Suggestions for new operators",
                ],
                answerIndex: 0,
              },
              {
                question: "A lockout bypass is:",
                options: [
                  "Never allowed",
                  "Fine when you are in a hurry",
                  "Required for experienced operators",
                  "Only for supervisors",
                ],
                answerIndex: 0,
              },
            ],
          },
        ],
      },
      {
        title: "Building the maintenance habit",
        content: [
          {
            type: "paragraph",
            text: "The daily walkaround takes six minutes. The weekly pass takes an hour. The seasonal pass takes a day. None of them are optional, and all of them are cheaper than the failure they prevent. A maintenance log makes the habit visible — and the gaps obvious.",
          },
          {
            type: "code",
            prompt: true,
            text: "maintenance log --spreader-02\n[ok] 01 mar   walkaround\n[ok] 08 mar   weekly pass\n[ok] 15 mar   walkaround\n[warn] gap    22 mar — none logged\n[info] habit   tighten it back up",
          },
          {
            type: "quiz",
            title: "The habit",
            passPercent: 60,
            questions: [
              {
                question: "What makes the maintenance habit visible?",
                options: [
                  "The maintenance log",
                  "The machine's paint",
                  "The operator's memory",
                  "Nothing",
                ],
                answerIndex: 0,
              },
              {
                question: "In the sample log, what does the gap on 22 mar show?",
                options: [
                  "A skipped check — tighten the habit",
                  "A successful season",
                  "A machine failure",
                  "Nothing at all",
                ],
                answerIndex: 0,
              },
              {
                question: "The weekly pass takes about:",
                options: [
                  "An hour",
                  "Six minutes",
                  "A full day",
                  "A full week",
                ],
                answerIndex: 0,
              },
            ],
          },
        ],
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
    modules: [
      {
        title: "The crop is won in the field, lost in the shed",
        content: [
          {
            type: "paragraph",
            text: "Post-harvest losses are quiet — no dramatic failure, just a value that erodes a little each week. This course closes that gap with a storage routine you can run on any facility, from a single silo to a full yard.",
          },
          {
            type: "list",
            items: [
              "The crop is won in the field and lost in the shed.",
              "Loss is quiet — a little value eroding each week.",
              "A routine closes the gap that time opens.",
            ],
          },
          {
            type: "quiz",
            title: "Where value is lost",
            passPercent: 60,
            questions: [
              {
                question: "Where is most post-harvest value lost?",
                options: [
                  "In the shed, quietly, week by week",
                  "In the field, dramatically",
                  "At the elevator, instantly",
                  "Nowhere — value is stable",
                ],
                answerIndex: 0,
              },
              {
                question: "Post-harvest loss is:",
                options: [
                  "Quiet erosion, not a dramatic failure",
                  "Always a sudden collapse",
                  "Always visible to the eye",
                  "Impossible to prevent",
                ],
                answerIndex: 0,
              },
              {
                question: "What closes the gap that time opens?",
                options: [
                  "A storage routine run consistently",
                  "A bigger facility",
                  "A newer loader",
                  "Nothing",
                ],
                answerIndex: 0,
              },
            ],
          },
        ],
      },
      {
        title: "Drying to specification",
        content: [
          {
            type: "paragraph",
            text: "Dry the crop to specification before it enters storage — moisture is the master variable. Every other risk in the shed is managed or multiplied by the moisture you let through the door.",
          },
          {
            type: "code",
            prompt: true,
            text: "storage preflight --silo-2\n[ok] clean      yes\n[ok] dry        within spec\n[ok] sensors    calibrated\n[ok] ready",
          },
          {
            type: "quiz",
            title: "Drying",
            passPercent: 60,
            questions: [
              {
                question: "What is the master variable in storage?",
                options: [
                  "Moisture",
                  "Bin color",
                  "Time of day",
                  "Bin age",
                ],
                answerIndex: 0,
              },
              {
                question: "When should the crop be dried to spec?",
                options: [
                  "Before it enters storage",
                  "After the first month",
                  "Only at sale",
                  "Never — it dries itself",
                ],
                answerIndex: 0,
              },
              {
                question: "The preflight checks dry as:",
                options: [
                  "Within spec",
                  "Too wet",
                  "Too dry",
                  "Unmeasured",
                ],
                answerIndex: 0,
              },
            ],
          },
        ],
      },
      {
        title: "Cleaning & treating the space",
        content: [
          {
            type: "paragraph",
            text: "Clean and treat the space before loading. Old stock is a vector for new problems — insects and mold carry over in the dust and debris left behind. An empty bin is not a clean bin.",
          },
          {
            type: "list",
            items: [
              "Sweep and vacuum before every load, without exception.",
              "Treat empty space per the label before filling.",
              "Inspect the structure — seals, vents, and floor.",
            ],
          },
          {
            type: "quiz",
            title: "Cleaning",
            passPercent: 60,
            questions: [
              {
                question: "Why clean before loading?",
                options: [
                  "Old stock is a vector for new problems",
                  "The inspector requires photos",
                  "It makes the bin look better",
                  "Cleaning is optional",
                ],
                answerIndex: 0,
              },
              {
                question: "An empty bin is:",
                options: [
                  "Not necessarily a clean bin",
                  "Always ready to load",
                  "Safe from all pests",
                  "Free of moisture risk",
                ],
                answerIndex: 0,
              },
              {
                question: "When should treatment be applied?",
                options: [
                  "Before filling, per the label",
                  "After the bin is full",
                  "Only at harvest",
                  "Never",
                ],
                answerIndex: 0,
              },
            ],
          },
        ],
      },
      {
        title: "Monitoring temperature & moisture",
        content: [
          {
            type: "paragraph",
            text: "Monitor temperature and moisture weekly, and calibrate your sensors before the season. A thermometer you cannot trust is worse than none — it tells you the bin is fine while it is not.",
          },
          {
            type: "code",
            prompt: true,
            text: "storage monitor --silo-2 --week-2\n[ok] temp      14°C — stable\n[ok] moisture  13.8% — within spec\n[ok] sensors   calibrated 1 mar\n[ok] status    holding",
          },
          {
            type: "quiz",
            title: "Monitoring",
            passPercent: 60,
            questions: [
              {
                question: "How often should temperature and moisture be checked?",
                options: [
                  "Weekly",
                  "Yearly",
                  "Only at the end of storage",
                  "Only when there is a smell",
                ],
                answerIndex: 0,
              },
              {
                question: "A sensor you cannot trust is:",
                options: [
                  "Worse than none",
                  "Fine, if it is digital",
                  "Better than none",
                  "A minor inconvenience",
                ],
                answerIndex: 0,
              },
              {
                question: "When should sensors be calibrated?",
                options: [
                  "Before the season",
                  "Never — they are self-calibrating",
                  "Only after a problem",
                  "At harvest only",
                ],
                answerIndex: 0,
              },
            ],
          },
        ],
      },
      {
        title: "The first two weeks",
        content: [
          {
            type: "paragraph",
            text: "Quality is set in the first two weeks of storage. That is when problems announce themselves — inspect closely, weekly, and act on the first sign. The first two weeks decide what the crop is worth at the elevator.",
          },
          {
            type: "note",
            tone: "warn",
            text: "Watch that window closely. It decides what your crop is worth at the elevator.",
          },
          {
            type: "quiz",
            title: "The first two weeks",
            passPercent: 60,
            questions: [
              {
                question: "When is storage quality mostly set?",
                options: [
                  "In the first two weeks",
                  "In the final two weeks",
                  "Evenly across the season",
                  "It is never set — it always changes",
                ],
                answerIndex: 0,
              },
              {
                question: "Problems in the first two weeks:",
                options: [
                  "Announce themselves — inspect closely",
                  "Stay hidden until spring",
                  "Are always visible without checking",
                  "Do not happen",
                ],
                answerIndex: 0,
              },
              {
                question: "The first two weeks decide:",
                options: [
                  "What the crop is worth at the elevator",
                  "The price of next year's seed",
                  "The size of next year's crop",
                  "Nothing important",
                ],
                answerIndex: 0,
              },
            ],
          },
        ],
      },
      {
        title: "The storage routine as a habit",
        content: [
          {
            type: "paragraph",
            text: "A disciplined routine costs a few hours a week. The value it protects is measured in the full price of your harvest. Preflight, monitor, log — the same three steps, every week, and the record is your proof that the crop was handled right.",
          },
          {
            type: "list",
            items: [
              "Preflight the space before every load.",
              "Monitor temperature and moisture weekly.",
              "Log every check — the record is your proof.",
            ],
          },
          {
            type: "quiz",
            title: "The routine",
            passPercent: 60,
            questions: [
              {
                question: "The weekly routine is:",
                options: [
                  "Preflight, monitor, log",
                  "Monitor, ignore, forget",
                  "Load, seal, leave",
                  "Clean once, never again",
                ],
                answerIndex: 0,
              },
              {
                question: "A few hours a week protects:",
                options: [
                  "The full price of your harvest",
                  "Only the bin's paint",
                  "Nothing measurable",
                  "The elevator's schedule",
                ],
                answerIndex: 0,
              },
              {
                question: "What is your proof that the crop was handled right?",
                options: [
                  "The logged record",
                  "The handshake at the elevator",
                  "The bin's serial number",
                  "Nothing",
                ],
                answerIndex: 0,
              },
            ],
          },
        ],
      },
    ],
  },
  { ...extraCourse37 },
  { ...extraCourse38 },
  { ...extraCourse39 },
  { ...extraCourse40 },
  { ...extraCourse41 },
  { ...extraCourse42 },
  { ...extraCourse43 },
  { ...extraCourse44 },
  { ...extraCourse45 },
  { ...extraCourse46 },
  { ...extraCourse47 },
  { ...extraCourse48 },
  { ...extraCourse49 },
  { ...extraCourse50 },
  { ...extraCourse51 },
  { ...extraCourse52 },
  { ...extraCourse53 },
  { ...extraCourse54 },
  { ...extraCourse55 },
  { ...extraCourse56 },
  { ...extraCourse57 },
  { ...extraCourse58 },
  { ...extraCourse59 },
  { ...extraCourse60 },
  { ...extraCourse61 },
  { ...extraCourse62 },
  { ...extraCourse63 },
  { ...extraCourse64 },
  { ...extraCourse65 },
  { ...extraCourse66 },
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
 * Idempotent, versioned seed. Inserts any missing seed course (with bookable
 * sessions), restores the canonical catalog order, and upgrades course content
 * to the current seed version — so existing deployments pick up new modules
 * without wiping admin-created courses. Never duplicates or rewrites the
 * content of courses that are already current.
 */
export const seed = mutation({
  args: { batch: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const batchIndex = args.batch ?? 0;
    const start = batchIndex * 10;
    const batch = seedCatalog.slice(start, start + 10);
    let insertedCourses = 0;
    let upgradedCourses = 0;
    let sessions = 0;
    for (const course of batch) {
      const slug = slugify(course.title);
      const existing = await ctx.db
        .query("courses")
        .withIndex("by_slug")
        .filter((q) => q.eq(q.field("slug"), slug))
        .first();
      const stale = (existing?.contentVersion ?? 0) < SEED_CONTENT_VERSION;
      if (existing) {
        if (existing.order !== course.order || stale) {
          await ctx.db.patch(existing._id, {
            order: course.order,
            ...(stale
              ? {
                  modules: course.modules,
                  content: course.modules.flatMap((m) => m.content),
                  contentVersion: SEED_CONTENT_VERSION,
                }
              : {}),
          });
          if (stale) {
            upgradedCourses += 1;
          }
        }
        continue;
      }
      const courseId = await ctx.db.insert("courses", {
        ...course,
        slug,
        published: true,
        content: course.modules.flatMap((m) => m.content),
        contentVersion: SEED_CONTENT_VERSION,
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
    const totalBatches = Math.ceil(seedCatalog.length / 10);
    return {
      seeded: insertedCourses > 0,
      count: insertedCourses,
      upgraded: upgradedCourses,
      sessions,
      batch: batchIndex,
      totalBatches,
      done: batchIndex >= totalBatches - 1,
    };
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
    const placeholder: ContentBlock[] = [
      {
        type: "paragraph",
        text: "Course material is being prepared. Check back shortly — if you have questions, leave a comment below and our team will respond.",
      },
    ];
    const courseId = await ctx.db.insert("courses", {
      ...args,
      slug: slugify(args.title),
      order: count.length + 1,
      published: false,
      content: placeholder,
      modules: [
        {
          title: "Module 1 — getting started",
          content: placeholder,
        },
      ],
      contentVersion: SEED_CONTENT_VERSION,
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
    modules: v.optional(v.array(courseModuleValidator)),
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
    if (patch.modules !== undefined) {
      fields.modules = patch.modules;
      fields.content = patch.modules.flatMap((m) => m.content);
    }
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
