import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

/** List all active virtual labs */
export const list = query({
  args: { category: v.optional(v.string()) },
  handler: async (ctx, { category }) => {
    let q = ctx.db.query("virtualLabs").withIndex("by_active", (q) => q.eq("active", true));
    if (category) q = q.filter((q) => q.eq(q.field("category"), category));
    return await q.collect();
  },
});

/** Submit a lab exercise */
export const submit = mutation({
  args: {
    userId: v.id("users"),
    labId: v.id("virtualLabs"),
    inputs: v.string(),
    result: v.string(),
    reflection: v.optional(v.string()),
  },
  handler: async (ctx, { userId, labId, inputs, result, reflection }) => {
    const lab = await ctx.db.get(labId);
    if (!lab) throw new Error("Lab not found");

    const id = await ctx.db.insert("labSubmissions", {
      userId,
      labId,
      inputs,
      result,
      reflection,
      pointsEarned: lab.pointsReward,
      createdAt: Date.now(),
    });

    const stats = await ctx.db.query("userStats").withIndex("by_user", (q) => q.eq("userId", userId)).first();
    if (stats) {
      await ctx.db.patch(stats._id, { points: stats.points + lab.pointsReward, updatedAt: Date.now() });
    }

    return { id, pointsEarned: lab.pointsReward };
  },
});

/** My lab submissions */
export const mySubmissions = query({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    const subs = await ctx.db.query("labSubmissions").withIndex("by_user", (q) => q.eq("userId", userId)).collect();
    const labIds = [...new Set(subs.map((s) => s.labId))];
    const labs = await Promise.all(labIds.map((id) => ctx.db.get(id)));
    const labMap = new Map(labs.filter(Boolean).map((l) => [l!._id, l!]));
    return subs.map((s) => ({ ...s, lab: labMap.get(s.labId) }));
  },
});

/** Seed virtual labs */
export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("virtualLabs").take(1);
    if (existing.length > 0) return { seeded: false };

    const labs = [
      {
        title: "Soil pH & Lime Calculator",
        description: "Input your soil test results and calculate the exact lime needed to reach target pH.",
        category: "Soil Testing",
        instructions: "Enter your current pH, target pH, soil type, and field size. The calculator will determine lime type, rate, and application schedule.",
        parameters: [
          { name: "currentPh", label: "Current Soil pH", type: "number" as const, min: 3, max: 9, step: 0.1, default: 5.5 },
          { name: "targetPh", label: "Target pH", type: "number" as const, min: 5, max: 8, step: 0.1, default: 6.5 },
          { name: "soilType", label: "Soil Type", type: "select" as const, options: ["Sandy", "Loam", "Clay", "Silt"], default: "Loam" },
          { name: "acreage", label: "Field Size (acres)", type: "number" as const, min: 0.1, max: 1000, step: 0.1, default: 10 },
        ],
        calculationType: "lime",
        pointsReward: 25,
        active: true,
        createdAt: Date.now(),
      },
      {
        title: "Crop Rotation Planner",
        description: "Plan a 4-year rotation based on your field size, soil type, and market goals.",
        category: "Crop Planning",
        instructions: "Select your soil type, climate zone, and primary market goal. The planner generates a rotation that balances soil nutrients and pest cycles.",
        parameters: [
          { name: "soilType", label: "Soil Type", type: "select" as const, options: ["Sandy", "Loam", "Clay", "Peat"], default: "Loam" },
          { name: "climate", label: "Climate Zone", type: "select" as const, options: ["Temperate", "Tropical", "Arid", "Continental"], default: "Temperate" },
          { name: "goal", label: "Primary Goal", type: "select" as const, options: ["Profit Maximization", "Soil Building", "Diversity", "Sustainability"], default: "Profit Maximization" },
          { name: "acreage", label: "Total Acreage", type: "number" as const, min: 1, max: 500, step: 1, default: 50 },
        ],
        calculationType: "rotation",
        pointsReward: 30,
        active: true,
        createdAt: Date.now(),
      },
      {
        title: "Irrigation Water Budget",
        description: "Calculate water requirements and design an efficient irrigation schedule.",
        category: "Water Management",
        instructions: "Input crop type, acreage, soil type, and rainfall data to determine irrigation needs and optimal scheduling.",
        parameters: [
          { name: "cropType", label: "Primary Crop", type: "select" as const, options: ["Corn", "Soybeans", "Tomatoes", "Lettuce", "Wheat", "Cotton"], default: "Corn" },
          { name: "acreage", label: "Acreage", type: "number" as const, min: 1, max: 500, step: 1, default: 25 },
          { name: "rainfall", label: "Average Weekly Rainfall (inches)", type: "number" as const, min: 0, max: 5, step: 0.1, default: 1 },
          { name: "soilType", label: "Soil Type", type: "select" as const, options: ["Sandy", "Loam", "Clay"], default: "Loam" },
        ],
        calculationType: "irrigation",
        pointsReward: 25,
        active: true,
        createdAt: Date.now(),
      },
      {
        title: "Fertilizer Rate Calculator",
        description: "Calculate optimal NPK application rates based on soil tests and crop needs.",
        category: "Soil Testing",
        instructions: "Enter current soil nutrient levels and target crop to get precise fertilizer recommendations.",
        parameters: [
          { name: "nitrogen", label: "Soil Nitrogen (ppm)", type: "number" as const, min: 0, max: 200, step: 1, default: 30 },
          { name: "phosphorus", label: "Soil Phosphorus (ppm)", type: "number" as const, min: 0, max: 100, step: 1, default: 25 },
          { name: "potassium", label: "Soil Potassium (ppm)", type: "number" as const, min: 0, max: 500, step: 1, default: 150 },
          { name: "cropType", label: "Target Crop", type: "select" as const, options: ["Corn", "Soybeans", "Wheat", "Tomatoes", "Potatoes"], default: "Corn" },
        ],
        calculationType: "fertilizer",
        pointsReward: 30,
        active: true,
        createdAt: Date.now(),
      },
    ];

    for (const l of labs) {
      await ctx.db.insert("virtualLabs", l);
    }
    return { seeded: true, count: labs.length };
  },
});
