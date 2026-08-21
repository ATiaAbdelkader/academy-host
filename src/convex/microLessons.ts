import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

/** Get today's micro-lesson */
export const today = query({
  args: { category: v.optional(v.string()) },
  handler: async (ctx, { category }) => {
    const today = new Date().toISOString().split("T")[0];
    let q = ctx.db.query("microLessons").withIndex("by_date", (q) => q.eq("date", today));
    if (category) q = q.filter((q) => q.eq(q.field("category"), category));
    return await q.collect();
  },
});

/** Get recent micro-lessons */
export const recent = query({
  args: { limit: v.optional(v.number()), userId: v.id("users") },
  handler: async (ctx, { limit, userId }) => {
    const lessons = await ctx.db.query("microLessons").order("desc").take(limit ?? 14);
    const views = await ctx.db.query("microLessonViews").withIndex("by_user", (q) => q.eq("userId", userId)).collect();
    const viewedSet = new Set(views.map((v) => v.lessonId));
    return lessons.map((l) => ({ ...l, viewed: viewedSet.has(l._id) }));
  },
});

/** Mark a lesson as viewed */
export const markViewed = mutation({
  args: { userId: v.id("users"), lessonId: v.id("microLessons") },
  handler: async (ctx, { userId, lessonId }) => {
    const existing = await ctx.db
      .query("microLessonViews")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("lessonId"), lessonId))
      .first();
    if (existing) return;
    
    await ctx.db.insert("microLessonViews", { userId, lessonId, viewedAt: Date.now() });
    const stats = await ctx.db.query("userStats").withIndex("by_user", (q) => q.eq("userId", userId)).first();
    if (stats) await ctx.db.patch(stats._id, { points: stats.points + 2, updatedAt: Date.now() });
  },
});

/** Seed micro-lessons */
export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("microLessons").take(1);
    if (existing.length > 0) return { seeded: false };

    const tips = [
      { title: "Test Soil Before Planting", tip: "Always test soil 4-6 weeks before planting season. pH and nutrient levels guide all fertilizer decisions — guessing wastes money and harms yields.", category: "Soil Science", difficulty: "basic" as const, tags: ["soil", "planning"] },
      { title: "Cover Crop Benefits", tip: "Winter cover crops prevent erosion, fix nitrogen, and improve soil structure. Crimson clover and winter rye are excellent choices for most climates.", category: "Sustainability", difficulty: "basic" as const, tags: ["cover-crops", "soil-health"] },
      { title: "Water Deeply, Less Often", tip: "Shallow, frequent watering encourages weak surface roots. Deep watering 1-2 times per week forces roots to grow deeper, making plants more drought-resilient.", category: "Water Management", difficulty: "basic" as const, tags: ["irrigation", "roots"] },
      { title: "Scout for Pests Weekly", tip: "Walk your fields weekly and examine 20 plants per section. Early detection of pest populations prevents costly outbreaks later in the season.", category: "Plant Health", difficulty: "basic" as const, tags: ["pest-management", "monitoring"] },
      { title: "Micronutrients Matter", tip: "Zinc, manganese, and boron are often overlooked. Deficiency symptoms appear as yellowing between leaf veins. Foliar application provides quick correction.", category: "Plant Nutrition", difficulty: "intermediate" as const, tags: ["nutrients", "diagnostics"] },
      { title: "No-Till Saves Soil", tip: "Conventional tillage loses 5-10 tons of topsoil per acre annually. No-till farming preserves soil biology, saves fuel, and builds organic matter over time.", category: "Sustainability", difficulty: "intermediate" as const, tags: ["no-till", "conservation"] },
      { title: "Conductivity Sensors", tip: "EC sensors measure dissolved salts in soil. High EC in dry climates signals salt buildup — a major yield inhibitor. Leach with excess water to flush salts.", category: "AgTech", difficulty: "advanced" as const, tags: ["sensors", "soil-testing"] },
      { title: "Vapor Pressure Deficit", tip: "VPD (kPa) measures the drying power of air. Greenhouse growers target 0.8-1.2 kPa for optimal transpiration. Above 1.6 kPa, plants close stomata and stop growing.", category: "AgTech", difficulty: "advanced" as const, tags: ["greenhouse", "climate"] },
    ];

    const now = Date.now();
    const today = new Date();
    for (let i = 0; i < tips.length; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];
      await ctx.db.insert("microLessons", { ...tips[i], date: dateStr, createdAt: now });
    }
    return { seeded: true, count: tips.length };
  },
});
