import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

/** Get user's competency matrix */
export const myMatrix = query({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    const userComps = await ctx.db
      .query("userCompetencies")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();
    
    const allComps = await ctx.db.query("competencies").collect();
    const compMap = new Map(allComps.map((c) => [c._id, c]));
    
    return userComps.map((uc) => ({
      ...uc,
      competency: compMap.get(uc.competencyId),
    }));
  },
});

/** Get all competencies grouped by category */
export const allCompetencies = query({
  args: {},
  handler: async (ctx) => {
    const comps = await ctx.db.query("competencies").collect();
    const grouped: Record<string, typeof comps> = {};
    for (const c of comps) {
      (grouped[c.category] ??= []).push(c);
    }
    return grouped;
  },
});

/** Update or create a user competency */
export const updateCompetency = mutation({
  args: {
    userId: v.id("users"),
    competencyId: v.id("competencies"),
    score: v.number(),
  },
  handler: async (ctx, { userId, competencyId, score }) => {
    const existing = await ctx.db
      .query("userCompetencies")
      .withIndex("by_user_competency", (q) =>
        q.eq("userId", userId).eq("competencyId", competencyId)
      )
      .first();

    const level = score >= 95 ? 5 : score >= 80 ? 4 : score >= 65 ? 3 : score >= 45 ? 2 : score > 0 ? 1 : 0;

    if (existing) {
      await ctx.db.patch(existing._id, {
        level,
        score: Math.max(existing.score, score),
        bestScore: Math.max(existing.bestScore, score),
        quizzesTaken: existing.quizzesTaken + 1,
        lastPracticedAt: Date.now(),
        updatedAt: Date.now(),
      });
      return existing._id;
    }

    return await ctx.db.insert("userCompetencies", {
      userId,
      competencyId,
      level,
      score,
      quizzesTaken: 1,
      bestScore: score,
      lastPracticedAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

/** Seed initial competencies */
export const seedCompetencies = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("competencies").collect();
    if (existing.length > 0) return { seeded: false };

    const comps = [
      { name: "Soil Analysis", category: "Foundations", description: "Understanding soil composition, pH, nutrients, and amendments" },
      { name: "Crop Selection", category: "Foundations", description: "Choosing the right crops for climate, soil, and market" },
      { name: "Plant Nutrition", category: "Foundations", description: "NPK, micronutrients, and fertilization strategies" },
      { name: "Pest Identification", category: "Plant Health", description: "Recognizing common agricultural pests and diseases" },
      { name: "Integrated Pest Management", category: "Plant Health", description: "Biological, cultural, and chemical pest control" },
      { name: "Irrigation Systems", category: "Water Management", description: "Designing and managing efficient irrigation" },
      { name: "Water Conservation", category: "Water Management", description: "Drought management and water-saving techniques" },
      { name: "Farm Machinery", category: "Operations", description: "Equipment selection, operation, and maintenance" },
      { name: "Post-Harvest Handling", category: "Operations", description: "Storage, processing, and quality preservation" },
      { name: "Market Analysis", category: "Business", description: "Understanding commodity markets and pricing" },
      { name: "Farm Financial Planning", category: "Business", description: "Budgeting, cash flow, and profitability analysis" },
      { name: "Sustainable Practices", category: "Sustainability", description: "Organic methods, conservation, and environmental stewardship" },
      { name: "IoT & Sensors", category: "AgTech", description: "Deploying and reading farm sensor networks" },
      { name: "Data Analysis", category: "AgTech", description: "Interpreting agricultural data for decision-making" },
      { name: "AI & Machine Learning", category: "AgTech", description: "Applying ML models to farming problems" },
      { name: "Drone Operations", category: "AgTech", description: "Aerial surveying, spraying, and crop monitoring" },
      { name: "Livestock Management", category: "Animal Science", description: "Animal husbandry, nutrition, and health" },
      { name: "Composting", category: "Sustainability", description: "Organic waste recycling and soil enrichment" },
      { name: "Greenhouse Management", category: "Horticulture", description: "Controlled environment agriculture" },
      { name: "Agricultural Biotechnology", category: "Advanced", description: "GMOs, gene editing, and biotech applications" },
    ];

    for (const c of comps) {
      await ctx.db.insert("competencies", c);
    }
    return { seeded: true, count: comps.length };
  },
});
