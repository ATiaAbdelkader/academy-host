import { mutation, query, type QueryCtx } from "./_generated/server";
import { v } from "convex/values";
import type { Doc } from "./_generated/dataModel";

type SeedBundle = {
  title: string;
  description: string;
  priceCents: number;
  regularCents: number;
  courseSlugs: string[];
  couponCode: string;
  order: number;
};

// Curated packs. `priceCents` is what the pack costs together; `regularCents`
// is the sum of the included courses booked separately. Booking any included
// course with the bundle's coupon code applies the discount at checkout.
const seedBundles: SeedBundle[] = [
  {
    title: "Business Track",
    description:
      "Run the farm like a business: agribusiness fundamentals, a working Business Model Canvas, and project management for agriculture from scope to handover.",
    priceCents: 15900,
    regularCents: 18700,
    courseSlugs: [
      "agribusiness-fundamentals",
      "business-model-canvas-in-agriculture",
      "managing-an-agriculture-project",
    ],
    couponCode: "BUSINESS15",
    order: 1,
  },
  {
    title: "Crop Care Core",
    description:
      "The three courses every field decision rests on: soil health, reading your soil tests, and scouting pests with real thresholds.",
    priceCents: 12500,
    regularCents: 14700,
    courseSlugs: [
      "soil-health-essentials",
      "reading-soil-tests-and-building-a-fertility-plan",
      "seasonal-scouting-pests-disease-and-thresholds",
    ],
    couponCode: "CROPCARE15",
    order: 2,
  },
];

/** Published bundles with their included courses joined and resolved. */
async function withCourses(ctx: QueryCtx, bundle: Doc<"bundles">) {
  const courses = await ctx.db.query("courses").collect();
  const bySlug = new Map(courses.map((c) => [c.slug, c]));
  return {
    ...bundle,
    courses: bundle.courseSlugs
      .map((slug) => bySlug.get(slug))
      .filter((course): course is Doc<"courses"> => course !== undefined),
  };
}

export const list = query({
  args: {},
  handler: async (ctx) => {
    const bundles = await ctx.db
      .query("bundles")
      .withIndex("by_order")
      .order("asc")
      .collect();
    const visible = bundles.filter((b) => b.published);
    return Promise.all(visible.map((bundle) => withCourses(ctx, bundle)));
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    const bundle = await ctx.db
      .query("bundles")
      .withIndex("by_slug")
      .filter((q) => q.eq(q.field("slug"), slug))
      .first();
    if (!bundle || !bundle.published) {
      return null;
    }
    return withCourses(ctx, bundle);
  },
});

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Idempotent seed: inserts any missing bundle without touching existing rows. */
export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    let inserted = 0;
    for (const bundle of seedBundles) {
      const slug = slugify(bundle.title);
      const existing = await ctx.db
        .query("bundles")
        .withIndex("by_slug")
        .filter((q) => q.eq(q.field("slug"), slug))
        .first();
      if (existing) {
        continue;
      }
      await ctx.db.insert("bundles", {
        ...bundle,
        slug,
        published: true,
      });
      inserted += 1;
    }
    return { seeded: inserted > 0, count: inserted };
  },
});

// ---------------------------------------------------------------------------
// Admin — bundle management
// ---------------------------------------------------------------------------

export const create = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    priceCents: v.number(),
    courseSlugs: v.array(v.string()),
    couponCode: v.string(),
  },
  handler: async (ctx, args) => {
    const count = await ctx.db.query("bundles").collect();
    const courses = await ctx.db.query("courses").collect();
    const bySlug = new Map(courses.map((c) => [c.slug, c]));
    const regularCents = args.courseSlugs.reduce(
      (sum, slug) => sum + (bySlug.get(slug)?.priceCents ?? 0),
      0,
    );
    return ctx.db.insert("bundles", {
      ...args,
      slug: slugify(args.title),
      regularCents,
      published: false,
      order: count.length + 1,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("bundles"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    priceCents: v.optional(v.number()),
    courseSlugs: v.optional(v.array(v.string())),
    couponCode: v.optional(v.string()),
    published: v.optional(v.boolean()),
  },
  handler: async (ctx, { id, ...patch }) => {
    const bundle = await ctx.db.get(id);
    if (!bundle) {
      throw new Error("Bundle not found.");
    }
    const fields: Record<string, unknown> = {};
    if (patch.title !== undefined) {
      fields.title = patch.title;
      fields.slug = slugify(patch.title);
    }
    if (patch.description !== undefined) fields.description = patch.description;
    if (patch.priceCents !== undefined) fields.priceCents = patch.priceCents;
    if (patch.courseSlugs !== undefined) {
      fields.courseSlugs = patch.courseSlugs;
      const courses = await ctx.db.query("courses").collect();
      const bySlug = new Map(courses.map((c) => [c.slug, c]));
      fields.regularCents = patch.courseSlugs.reduce(
        (sum, slug) => sum + (bySlug.get(slug)?.priceCents ?? 0),
        0,
      );
    }
    if (patch.couponCode !== undefined) fields.couponCode = patch.couponCode;
    if (patch.published !== undefined) fields.published = patch.published;
    await ctx.db.patch(id, fields);
    return id;
  },
});

export const remove = mutation({
  args: { id: v.id("bundles") },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id);
    return id;
  },
});
