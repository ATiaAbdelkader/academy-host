import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

/** Create an ROI calculation */
export const create = mutation({
  args: {
    userId: v.id("users"),
    cropType: v.string(),
    acreage: v.number(),
    seedCost: v.number(),
    fertilizerCost: v.number(),
    laborCost: v.number(),
    equipmentCost: v.number(),
    irrigationCost: v.number(),
    otherCosts: v.number(),
    expectedYield: v.number(),
    pricePerUnit: v.number(),
  },
  handler: async (ctx, args) => {
    const { acreage, seedCost, fertilizerCost, laborCost, equipmentCost, irrigationCost, otherCosts, expectedYield, pricePerUnit } = args;
    const totalCost = seedCost + fertilizerCost + laborCost + equipmentCost + irrigationCost + otherCosts;
    const totalRevenue = acreage * expectedYield * pricePerUnit;
    const netProfit = totalRevenue - totalCost;
    const roi = totalCost > 0 ? (netProfit / totalCost) * 100 : 0;
    const breakEvenYield = pricePerUnit > 0 ? totalCost / (acreage * pricePerUnit) : 0;
    const costPerAcre = totalCost / acreage;
    const revenuePerAcre = totalRevenue / acreage;
    const profitPerAcre = netProfit / acreage;
    const costPerUnit = expectedYield > 0 ? costPerAcre / expectedYield : 0;

    const result = JSON.stringify({
      totalCost: totalCost / 100,
      totalRevenue: totalRevenue / 100,
      netProfit: netProfit / 100,
      roi: Math.round(roi * 10) / 10,
      breakEvenYield: Math.round(breakEvenYield * 100) / 100,
      costPerAcre: costPerAcre / 100,
      revenuePerAcre: revenuePerAcre / 100,
      profitPerAcre: profitPerAcre / 100,
      costPerUnit: costPerUnit / 100,
      profitability: netProfit > 0 ? "Profitable" : "Not profitable at current rates",
      recommendation: roi > 20 ? "Strong ROI — consider scaling" : roi > 0 ? "Moderate ROI — optimize costs" : "Negative ROI — revise plan or negotiate higher prices",
    });

    return await ctx.db.insert("roiCalculations", { ...args, result, createdAt: Date.now() });
  },
});

/** Get user's ROI calculations */
export const myCalculations = query({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) =>
    ctx.db.query("roiCalculations").withIndex("by_user", (q) => q.eq("userId", userId)).collect(),
});
