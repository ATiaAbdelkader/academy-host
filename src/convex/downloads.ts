import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Printable digital downloads — field guides, checklists, calendars, and
 * templates the academy sells or gives away as lead magnets (CourseLit-style).
 * Content is structured sections rendered as a clean printable document, so
 * no file storage is needed.
 */

type SeedDownload = {
  title: string;
  slug: string;
  description: string;
  docType: "guide" | "checklist" | "calendar" | "template";
  priceCents: number;
  popular: boolean;
  sections: {
    heading: string;
    body?: string;
    items?: string[];
  }[];
};

const SEED_DOWNLOADS: SeedDownload[] = [
  {
    title: "Soil Sampling Field Guide",
    slug: "soil-sampling-field-guide",
    description:
      "How to take representative soil samples: grid patterns, probe depth, avoiding contamination, and what the lab report numbers actually mean.",
    docType: "guide",
    priceCents: 0,
    popular: true,
    sections: [
      {
        heading: "When to sample",
        body: "Sample at the same time each year, ideally 2–3 months before planting so you have time to adjust lime and fertilizer plans.",
        items: [
          "Once per 1–3 hectares, depending on field uniformity",
          "After harvest or before the first rains",
          "Never within 3 weeks of fertilizer application",
        ],
      },
      {
        heading: "Taking the sample",
        items: [
          "Use a clean stainless-steel probe or spade, 0–20 cm depth",
          "Walk a W or zig-zag pattern, not the field edge",
          "Take 15–20 cores per composite sample",
          "Mix cores in a clean bucket; discard stones and roots",
        ],
      },
      {
        heading: "Reading the report",
        items: [
          "pH below 5.5 — lime is usually the first investment",
          "Available phosphorus and potassium — compare to the crop's target range",
          "Organic matter % — the anchor for long-term fertility",
          "CEC tells you how fast the soil responds to amendments",
        ],
      },
    ],
  },
  {
    title: "Irrigation Scheduling Checklist",
    slug: "irrigation-scheduling-checklist",
    description:
      "A weekly field checklist to time irrigations from soil feel to crop stage — cuts water use without risking yield.",
    docType: "checklist",
    priceCents: 0,
    popular: false,
    sections: [
      {
        heading: "Weekly routine",
        items: [
          "Check soil moisture at 10, 20 and 40 cm before deciding",
          "Record last rainfall and irrigation amount",
          "Adjust for crop stage: establishment, flowering, fruit fill",
          "Inspect emitters/drips for clogs and leaks",
          "Note signs of over-watering: yellowing lower leaves, standing water",
        ],
      },
      {
        heading: "Quick field feel test (sandy loam)",
        items: [
          "Forms a weak ball and breaks apart — irrigate soon",
          "Forms a strong ball that ribbons — hold off",
          "Water pools on the surface — check for compaction or over-irrigation",
        ],
      },
    ],
  },
  {
    title: "Seasonal Crop Calendar",
    slug: "seasonal-crop-calendar",
    description:
      "A 12-month planning calendar for maize, beans, tomato, and groundnut — planting windows, critical growth stages, and scouting triggers.",
    docType: "calendar",
    priceCents: 0,
    popular: true,
    sections: [
      {
        heading: "Maize",
        items: [
          "Plant at the reliable onset of rains (not the first shower)",
          "Top-dress nitrogen at 4–6 weeks, knee-high stage",
          "Scout for fall armyworm weekly from emergence to tassel",
          "Harvest at 15–20% grain moisture; dry on racks, not the ground",
        ],
      },
      {
        heading: "Beans",
        items: [
          "Sow 2–3 weeks into the rains to dodge early rots",
          "Keep fields weed-free until flowering (critical window)",
          "Harvest when pods rattle; thresh the same week",
        ],
      },
      {
        heading: "Tomato",
        items: [
          "Nursery 4–6 weeks before transplanting",
          "Stake and prune to two stems for airflow",
          "Spray for blight preventively once the canopy closes",
        ],
      },
      {
        heading: "Groundnut",
        items: [
          "Plant at 5–8 cm depth on ridges for easy harvest",
          "Stop irrigation 2–3 weeks before lifting",
          "Lift at 70–90% maturity, dry pods to 8% moisture to beat aflatoxin",
        ],
      },
    ],
  },
  {
    title: "Farm Record Keeping Template",
    slug: "farm-record-template",
    description:
      "A printable ledger for crop inputs, labor, sales, and weather — the raw material for next season's decisions and loan applications.",
    docType: "template",
    priceCents: 0,
    popular: false,
    sections: [
      {
        heading: "How to use this ledger",
        body: "Fill one page per field per season. Every bag of seed, liter of chemical, and hour of labor gets a line — the season-end summary is what pays.",
        items: [
          "Inputs: date, product, quantity, cost, supplier",
          "Labor: date, task, person/days, wage paid",
          "Harvest & sales: date, crop, units, price, buyer",
          "Weather notes: rainfall events, storms, heat stress",
        ],
      },
      {
        heading: "Season-end summary",
        items: [
          "Total input cost per hectare",
          "Gross revenue and net margin per crop",
          "Highest-cost activity — what to question next season",
          "Compare actual yields to your target: where was the gap?",
        ],
      },
    ],
  },
  {
    title: "Pest Scouting Pocket Guide",
    slug: "pest-scouting-pocket-guide",
    description:
      "Spot the difference between damage and disease: key pests for maize, beans, and tomato, with economic thresholds that tell you when to spray.",
    docType: "guide",
    priceCents: 0,
    popular: false,
    sections: [
      {
        heading: "Scouting basics",
        items: [
          "Walk a W pattern; check 20 plants at 5 stops",
          "Scout the underside of leaves — that's where they hide",
          "Record counts, not impressions: numbers drive the decision",
          "Spray only past the economic threshold — beneficial insects are free labor",
        ],
      },
      {
        heading: "Maize: fall armyworm",
        items: [
          "Look for window-pane feeding on new leaves and frass in whorls",
          "Threshold: 20–30% of plants with fresh damage at whorl stage",
          "Target the whorl at dusk when larvae are active",
        ],
      },
      {
        heading: "Tomato: whitefly & TYLCV",
        items: [
          "Whitefly on the underside of young leaves; sticky honeydew",
          "Tolerate low numbers — treat only if >10 per leaf on young plants",
          "Rogue infected plants fast; the virus has no cure",
        ],
      },
    ],
  },
  {
    title: "Post-Harvest Loss Checklist",
    slug: "post-harvest-loss-checklist",
    description:
      "The top ten causes of loss between field and market — and the cheap fixes that protect your harvest after the hard work is done.",
    docType: "checklist",
    priceCents: 0,
    popular: false,
    sections: [
      {
        heading: "Before harvest",
        items: [
          "Harvest at the right maturity — too early or too late both lose",
          "Cool the crop quickly; heat is the silent thief",
          "Sort damaged and diseased produce out before storage",
        ],
      },
      {
        heading: "In storage",
        items: [
          "Dry grain to 13% moisture before bagging",
          "Store off the ground on pallets, away from the wall",
          "Check weekly for moisture, weevils, and rodents",
          "Use hermetic bags for long-term grain storage",
        ],
      },
      {
        heading: "At the market",
        items: [
          "Pack to avoid bruising — cushion, don't pile",
          "Shade produce at the market; direct sun can cook it",
          "Sell the best quality first, then discount the rest",
        ],
      },
    ],
  },
];

/** Idempotent seed: inserts only downloads whose slug is missing. */
export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("downloads").collect();
    const slugs = new Set(existing.map((d) => d.slug));
    let inserted = 0;
    for (const d of SEED_DOWNLOADS) {
      if (slugs.has(d.slug)) continue;
      await ctx.db.insert("downloads", { ...d, createdAt: Date.now() });
      inserted += 1;
    }
    return { inserted };
  },
});

/** Public catalog of downloads, free ones first. */
export const list = query({
  args: {},
  handler: async (ctx) => {
    return (await ctx.db.query("downloads").collect()).sort((a, b) => {
      if (a.priceCents !== b.priceCents) return a.priceCents - b.priceCents;
      return Number(b.popular) - Number(a.popular);
    });
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    return (
      (await ctx.db
        .query("downloads")
        .withIndex("by_slug", (q) => q.eq("slug", slug))
        .first()) ?? null
    );
  },
});

/**
 * Unlock a download for the signed-in student. Free resources unlock
 * immediately (paid). Paid ones start "pending" until the academy settles
 * them — mirrors the session waive flow; a Stripe checkout can be layered on
 * later without schema changes.
 */
export const purchase = mutation({
  args: { downloadId: v.id("downloads") },
  handler: async (ctx, { downloadId }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Sign in to download resources.");
    }
    const download = await ctx.db.get(downloadId);
    if (!download) {
      throw new Error("Resource not found.");
    }
    const existing = await ctx.db
      .query("downloadPurchases")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("downloadId"), downloadId))
      .first();
    if (existing) {
      return { ok: true as const, unlocked: existing.paymentStatus !== "pending" };
    }
    const paymentStatus = download.priceCents === 0 ? "paid" : "pending";
    await ctx.db.insert("downloadPurchases", {
      userId,
      downloadId,
      paymentStatus,
      createdAt: Date.now(),
    });
    return {
      ok: true as const,
      unlocked: paymentStatus !== "pending",
      pendingPayment: paymentStatus === "pending",
    };
  },
});

/** The downloads the signed-in student has unlocked, with unlock status. */
export const myPurchases = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];
    const purchases = await ctx.db
      .query("downloadPurchases")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();
    return Promise.all(
      purchases.map(async (p) => ({
        purchase: p,
        download: await ctx.db.get(p.downloadId),
      })),
    );
  },
});
