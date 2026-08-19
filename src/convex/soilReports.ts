import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

/** Create a soil test report */
export const create = mutation({
  args: {
    userId: v.id("users"),
    fieldName: v.string(),
    location: v.string(),
    soilType: v.string(),
    ph: v.number(),
    nitrogen: v.number(),
    phosphorus: v.number(),
    potassium: v.number(),
    organicMatter: v.number(),
    moisture: v.number(),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { ph, nitrogen, phosphorus, potassium, organicMatter, moisture, soilType } = args;
    
    const recs: string[] = [];
    if (ph < 6.0) recs.push(`pH is acidic (${ph}). Apply agricultural lime at 2-4 tons/acre to raise pH to 6.0-6.5.`);
    else if (ph > 7.5) recs.push(`pH is alkaline (${ph}). Apply eleite sulfur or acidifying fertilizer to lower pH.`);
    else recs.push(`pH is optimal (${ph}). No amendment needed.`);
    
    if (nitrogen < 20) recs.push(`Nitrogen is low (${nitrogen} ppm). Apply 80-120 lbs N/acre. Consider legume cover crops.`);
    else if (nitrogen > 60) recs.push(`Nitrogen is high (${nitrogen} ppm). Reduce application. Excess N causes leaching and lodging.`);
    else recs.push(`Nitrogen is adequate (${nitrogen} ppm). Maintain current levels.`);
    
    if (phosphorus < 15) recs.push(`Phosphorus is deficient (${phosphorus} ppm). Apply rock phosphate or bone meal at 40-60 lbs P₂O₅/acre.`);
    else if (phosphorus > 50) recs.push(`Phosphorus is excessive (${phosphorus} ppm). Reduce P fertilization. Excess P causes runoff pollution.`);
    else recs.push(`Phosphorus is adequate (${phosphorus} ppm).`);
    
    if (potassium < 100) recs.push(`Potassium is low (${potassium} ppm). Apply muriate of potash at 60-80 lbs K₂O/acre.`);
    else if (potassium > 300) recs.push(`Potassium is high (${potassium} ppm). Skip K fertilization this season.`);
    else recs.push(`Potassium is adequate (${potassium} ppm).`);
    
    if (organicMatter < 2) recs.push(`Organic matter is low (${organicMatter}%). Add compost (2-4 tons/acre) and use cover crops.`);
    else if (organicMatter > 5) recs.push(`Organic matter is excellent (${organicMatter}%). Maintain with crop residue management.`);
    else recs.push(`Organic matter is moderate (${organicMatter}%). Build with cover crops and reduced tillage.`);
    
    if (moisture < 15) recs.push(`Soil moisture is low (${moisture}%). Increase irrigation frequency or add organic matter to improve water retention.`);
    else if (moisture > 40) recs.push(`Soil moisture is high (${moisture}%). Improve drainage or reduce irrigation. Risk of root diseases.`);

    if (soilType === "Sandy") recs.push("Sandy soil drains quickly. Add organic matter annually and use mulch to retain moisture.");
    else if (soilType === "Clay") recs.push("Clay soil retains water. Add gypsum and organic matter to improve drainage and structure.");

    return await ctx.db.insert("soilReports", {
      ...args,
      recommendations: JSON.stringify(recs),
      createdAt: Date.now(),
    });
  },
});

/** Get user's soil reports */
export const myReports = query({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) =>
    ctx.db.query("soilReports").withIndex("by_user", (q) => q.eq("userId", userId)).collect(),
});
