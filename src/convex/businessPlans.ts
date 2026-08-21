import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

/** Create a business plan */
export const create = mutation({
  args: {
    userId: v.id("users"),
    farmName: v.string(),
    farmType: v.string(),
    acreage: v.number(),
    location: v.string(),
    crops: v.array(v.string()),
    goals: v.string(),
    budget: v.number(),
    timeline: v.string(),
  },
  handler: async (ctx, args) => {
    const { userId, farmName, farmType, acreage, location, crops, goals, budget, timeline } = args;
    
    // Generate plan
    const budgetAcres = budget / 100 / acreage; // budget in cents, per acre
    const cropList = crops.join(", ");
    const plan = JSON.stringify({
      executive_summary: `${farmName} is a ${acreage}-acre ${farmType} operation in ${location} focused on ${cropList}. Budget: $${(budget/100).toFixed(0)} over ${timeline}.`,
      year_1: {
        phase: "Establishment",
        investments: [`Land preparation: $${(budgetAcres * 0.3).toFixed(0)}/acre`, `Seeds/starts: $${(budgetAcres * 0.15).toFixed(0)}/acre`, `Equipment: $${(budgetAcres * 0.2).toFixed(0)}/acre`],
        focus: "Soil building, infrastructure setup, initial planting",
        risk_mitigation: "Start small, test on 20% of acreage first",
      },
      year_2: {
        phase: "Growth",
        focus: "Scale production, build market relationships, refine practices",
        target_yield: "80% of full potential",
        revenue_target: `$${(budget * 0.8 / 100).toFixed(0)}`,
      },
      year_3: {
        phase: "Optimization",
        focus: "Full production, diversify revenue streams, evaluate profitability",
        target_yield: "100% of full potential",
        revenue_target: `$${(budget * 1.5 / 100).toFixed(0)}`,
      },
      financials: {
        startup_cost: `$${(budget/100).toFixed(0)}`,
        annual_operating: `$${(budget * 0.4 / 100).toFixed(0)}`,
        break_even_point: "Year 2-3",
        projected_roi: "15-25% annually after establishment",
      },
      recommendations: [
        "Start with cover crops to build soil health",
        "Diversify revenue with value-added products",
        "Join local farmer co-op for bulk purchasing",
        "Consider crop insurance for risk management",
        "Invest in soil testing and record-keeping",
      ],
      goals,
    });

    return await ctx.db.insert("businessPlans", { ...args, generatedPlan: plan, createdAt: Date.now() });
  },
});

/** Get user's business plans */
export const myPlans = query({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) =>
    ctx.db.query("businessPlans").withIndex("by_user", (q) => q.eq("userId", userId)).collect(),
});
