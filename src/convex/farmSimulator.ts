import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Create a new virtual farm
export const createFarm = mutation({
  args: {
    userId: v.id("users"),
    farmName: v.string(),
    landSize: v.number(), // acres
    soilType: v.union(v.literal("sandy"), v.literal("loam"), v.literal("clay"), v.literal("silt"), v.literal("peat")),
    climateZone: v.string(),
    startingBudget: v.number(), // cents
    waterSource: v.union(v.literal("rainfed"), v.literal("irrigated"), v.literal("both")),
  },
  handler: async (ctx, args) => {
    const farmId = await ctx.db.insert("virtualFarms", {
      userId: args.userId,
      farmName: args.farmName,
      landSize: args.landSize,
      soilType: args.soilType,
      climateZone: args.climateZone,
      startingBudget: args.startingBudget,
      currentBudget: args.startingBudget,
      waterSource: args.waterSource,
      season: 1,
      year: 2026,
      month: 3, // March - planting season
      soilHealth: 70,
      soilMoisture: 60,
      pestPressure: 10,
      reputation: 50,
      totalEarnings: 0,
      totalSpent: 0,
      cropsHarvested: 0,
      activeCrop: undefined,
      cropStage: undefined,
      cropDays: 0,
      logs: [],
      createdAt: Date.now(),
    });
    return farmId;
  },
});

// Get user's farms
export const myFarms = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("virtualFarms")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();
  },
});

// Get single farm by ID
export const getFarm = query({
  args: { farmId: v.id("virtualFarms") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.farmId);
  },
});

// Plant a crop
export const plantCrop = mutation({
  args: {
    farmId: v.id("virtualFarms"),
    cropName: v.string(),
    seedCost: v.number(), // cents
    fertilizerCost: v.number(),
    laborCost: v.number(),
  },
  handler: async (ctx, args) => {
    const farm = await ctx.db.get(args.farmId);
    if (!farm) throw new Error("Farm not found");
    
    const totalCost = args.seedCost + args.fertilizerCost + args.laborCost;
    if (farm.currentBudget < totalCost) throw new Error("Insufficient budget");
    
    const seasonNames: Record<number, string> = {
      3: "Spring Planting", 4: "Spring Growing", 5: "Late Spring",
      6: "Early Summer", 7: "Summer", 8: "Late Summer",
      9: "Harvest Season", 10: "Fall", 11: "Late Fall",
      12: "Winter", 1: "Winter", 2: "Late Winter",
    };

    await ctx.db.patch(args.farmId, {
      currentBudget: farm.currentBudget - totalCost,
      totalSpent: farm.totalSpent + totalCost,
      activeCrop: args.cropName,
      cropStage: "seeded",
      cropDays: 0,
      logs: [
        ...farm.logs,
        {
          message: `Planted ${args.cropName}. Total cost: $${(totalCost / 100).toFixed(2)}`,
          date: Date.now(),
          type: "planting" as const,
        },
      ],
    });
    return true;
  },
});

// Advance time by 1 month
export const advanceMonth = mutation({
  args: { farmId: v.id("virtualFarms") },
  handler: async (ctx, args) => {
    const farm = await ctx.db.get(args.farmId);
    if (!farm) throw new Error("Farm not found");

    let newMonth = farm.month + 1;
    let newYear = farm.year;
    let newSeason = farm.season;
    if (newMonth > 12) { newMonth = 1; newYear += 1; }
    newSeason = farm.season + 1;
    if (newSeason > 4) newSeason = 1;

    // Crop growth simulation
    let activeCrop = farm.activeCrop;
    let cropStage = farm.cropStage;
    let cropDays = farm.cropDays + 30;
    let soilHealth = farm.soilHealth;
    let pestPressure = farm.pestPressure;
    let soilMoisture = farm.soilMoisture;
    let currentBudget = farm.currentBudget;
    let totalEarnings = farm.totalEarnings;
    let cropsHarvested = farm.cropsHarvested;
    const logs = [...farm.logs];

    if (activeCrop) {
      if (cropDays < 30) cropStage = "growing";
      else if (cropDays < 60) cropStage = "flowering";
      else if (cropDays < 90) cropStage = "mature";
      else if (cropDays >= 90) {
        // Harvest!
        const baseYield = farm.landSize * 150; // $150/acre average
        const healthBonus = (soilHealth / 100) * 0.5;
        const earnings = Math.round(baseYield * (1 + healthBonus) * 100);
        currentBudget += earnings;
        totalEarnings += earnings;
        cropsHarvested += 1;
        logs.push({
          message: `Harvested ${activeCrop}! Earned $${(earnings / 100).toFixed(2)}. Soil health boosted.`,
          date: Date.now(),
          type: "harvest" as const,
        });
        activeCrop = undefined;
        cropStage = undefined;
        cropDays = 0;
        soilHealth = Math.min(100, soilHealth + 5);
      }
    }

    // Weather effects
    const weatherRoll = Math.random();
    if (weatherRoll < 0.15) {
      pestPressure = Math.min(100, pestPressure + Math.floor(Math.random() * 20));
      logs.push({ message: "Pest pressure increased this month.", date: Date.now(), type: "event" as const });
    } else if (weatherRoll > 0.85) {
      soilMoisture = Math.min(100, soilMoisture + 20);
      logs.push({ message: "Good rainfall improved soil moisture.", date: Date.now(), type: "event" as const });
    }

    // Natural degradation
    soilMoisture = Math.max(0, soilMoisture - 5);
    soilHealth = Math.max(0, soilHealth - 2);

    await ctx.db.patch(args.farmId, {
      month: newMonth,
      year: newYear,
      season: newSeason,
      activeCrop,
      cropStage,
      cropDays,
      soilHealth,
      pestPressure,
      soilMoisture,
      currentBudget,
      totalEarnings,
      cropsHarvested,
      logs,
    });
    return true;
  },
});

// Apply farm action (irrigate, pest control, fertilize, etc.)
export const applyAction = mutation({
  args: {
    farmId: v.id("virtualFarms"),
    action: v.union(
      v.literal("irrigate"),
      v.literal("pest_control"),
      v.literal("fertilize"),
      v.literal("soil_amendment"),
      v.literal("mulch"),
      v.literal("harvest"),
    ),
    cost: v.number(),
  },
  handler: async (ctx, args) => {
    const farm = await ctx.db.get(args.farmId);
    if (!farm) throw new Error("Farm not found");
    if (farm.currentBudget < args.cost) throw new Error("Insufficient budget");

    let soilHealth = farm.soilHealth;
    let soilMoisture = farm.soilMoisture;
    let pestPressure = farm.pestPressure;
    const logs = [...farm.logs];

    switch (args.action) {
      case "irrigate":
        soilMoisture = Math.min(100, soilMoisture + 25);
        logs.push({ message: "Irrigation applied. Soil moisture improved.", date: Date.now(), type: "action" as const });
        break;
      case "pest_control":
        pestPressure = Math.max(0, pestPressure - 30);
        logs.push({ message: "Pest control applied. Pest pressure reduced.", date: Date.now(), type: "action" as const });
        break;
      case "fertilize":
        soilHealth = Math.min(100, soilHealth + 10);
        logs.push({ message: "Fertilizer applied. Soil health improved.", date: Date.now(), type: "action" as const });
        break;
      case "soil_amendment":
        soilHealth = Math.min(100, soilHealth + 15);
        logs.push({ message: "Soil amendment applied. Long-term fertility improved.", date: Date.now(), type: "action" as const });
        break;
      case "mulch":
        soilMoisture = Math.min(100, soilMoisture + 10);
        soilHealth = Math.min(100, soilHealth + 5);
        logs.push({ message: "Mulch applied. Moisture retention and soil health improved.", date: Date.now(), type: "action" as const });
        break;
      case "harvest":
        if (!farm.activeCrop || farm.cropDays < 90) {
          throw new Error("Nothing ready to harvest yet");
        }
        const baseYield = farm.landSize * 150;
        const healthBonus = (soilHealth / 100) * 0.5;
        const earnings = Math.round(baseYield * (1 + healthBonus) * 100);
        logs.push({ message: `Harvested ${farm.activeCrop}! Earned $${(earnings / 100).toFixed(2)}.`, date: Date.now(), type: "harvest" as const });
        soilHealth = Math.min(100, soilHealth + 5);
        await ctx.db.patch(args.farmId, {
          currentBudget: farm.currentBudget - args.cost + earnings,
          totalEarnings: farm.totalEarnings + earnings,
          cropsHarvested: farm.cropsHarvested + 1,
          activeCrop: undefined,
          cropStage: undefined,
          cropDays: 0,
          soilHealth,
          soilMoisture,
          pestPressure,
          logs,
        });
        return true;
    }

    await ctx.db.patch(args.farmId, {
      currentBudget: farm.currentBudget - args.cost,
      totalSpent: farm.totalSpent + args.cost,
      soilHealth,
      soilMoisture,
      pestPressure,
      logs,
    });
    return true;
  },
});
