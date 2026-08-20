import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Seasonal advice database by climate zone
const advisoryTips: Record<string, Array<{ month: number; advice: string; category: string }>> = {
  tropical: [
    { month: 1, advice: "Dry season peak. Irrigate deeply. Plant drought-tolerant crops.", category: "irrigation" },
    { month: 2, advice: "Prepare beds for early rains. Start seedlings in nurseries.", category: "planting" },
    { month: 3, advice: "Early rains begin. Transplant seedlings. Apply mulch heavily.", category: "planting" },
    { month: 4, advice: "Mid-rains. Monitor for fungal diseases. Ensure drainage.", category: "pest" },
    { month: 5, advice: "Peak rainfall. Watch for flooding and root rot.", category: "pest" },
    { month: 6, advice: "Late rains. Apply post-emergence weed control.", category: "general" },
    { month: 7, advice: "Harvest early-season crops. Begin planning for dry season.", category: "harvest" },
    { month: 8, advice: "Dry season starts. Plant onions, peppers, tomatoes.", category: "planting" },
    { month: 9, advice: "Dry season. Irrigate morning only. Monitor pest pressure.", category: "irrigation" },
    { month: 10, advice: "Peak dry season. Deep irrigation every 3 days. Apply organic mulch.", category: "irrigation" },
    { month: 11, advice: "Prepare for early rains. Service irrigation equipment.", category: "general" },
    { month: 12, advice: "Transition period. Start nursery seedlings for next cycle.", category: "planting" },
  ],
  temperate: [
    { month: 1, advice: "Winter dormancy. Plan crop rotation. Order seeds early.", category: "general" },
    { month: 2, advice: "Start seeds indoors (tomatoes, peppers). Prune fruit trees.", category: "planting" },
    { month: 3, advice: "Soil warming. Test pH and nutrients. Prepare raised beds.", category: "soil" },
    { month: 4, advice: "Direct sow cool-season crops (lettuce, peas, spinach).", category: "planting" },
    { month: 5, advice: "Transplant warm-season seedlings after last frost.", category: "planting" },
    { month: 6, advice: "Mulch deeply. Monitor for Japanese beetles and aphids.", category: "pest" },
    { month: 7, advice: "Peak summer heat. Irrigate early morning. Harvest garlic.", category: "irrigation" },
    { month: 8, advice: "Plant fall crops (kale, broccoli, carrots). Succession plant.", category: "planting" },
    { month: 9, advice: "Harvest summer crops. Apply cover crops to empty beds.", category: "harvest" },
    { month: 10, advice: "Final harvests. Protect tender crops from early frost.", category: "harvest" },
    { month: 11, advice: "Clean up garden. Apply compost. Mulch perennials.", category: "general" },
    { month: 12, advice: "Review season results. Order seed catalogs. Rest the soil.", category: "general" },
  ],
  arid: [
    { month: 1, advice: "Cool season. Plant root vegetables and leafy greens.", category: "planting" },
    { month: 2, advice: "Last cool-month planting window. Prepare drip irrigation.", category: "irrigation" },
    { month: 3, advice: "Temperatures rising. Mulch heavily. Shift to drip irrigation.", category: "irrigation" },
    { month: 4, advice: "Extreme heat approaching. Shade structures needed.", category: "general" },
    { month: 5, advice: "Peak heat. Only irrigate pre-dawn. Harvest heat-tolerant crops.", category: "irrigation" },
    { month: 6, advice: "Minimal field work. Focus on record-keeping and planning.", category: "general" },
    { month: 7, advice: "Hottest month. Deep mulch. Accept reduced production.", category: "general" },
    { month: 8, advice: "Late summer. Begin fall preparation. Order cover crop seed.", category: "planting" },
    { month: 9, advice: "Cooling begins. Plant cool-season crops immediately.", category: "planting" },
    { month: 10, advice: "Prime growing season. Maximize planting density.", category: "planting" },
    { month: 11, advice: "Harvest peak. Prepare storage for root vegetables.", category: "harvest" },
    { month: 12, advice: "Winter growing season. Maintain irrigation schedule.", category: "irrigation" },
  ],
  equatorial: [
    { month: 1, advice: "Short dry spell. Plant beans and maize. Maintain compost.", category: "planting" },
    { month: 2, advice: "Transplant seedlings. Apply organic fertilizer.", category: "planting" },
    { month: 3, advice: "Main rains start. Monitor drainage channels.", category: "pest" },
    { month: 4, advice: "Heavy rains. Watch for blight and mildew.", category: "pest" },
    { month: 5, advice: "Mid-rains. Apply fungicide preventively.", category: "pest" },
    { month: 6, advice: "Harvest early crops. Plant succession crops.", category: "harvest" },
    { month: 7, advice: "Short dry season. Deep-plant root crops.", category: "planting" },
    { month: 8, advice: "Cool period. Plant brassicas and root vegetables.", category: "planting" },
    { month: 9, advice: "Second rains begin. Transplant and fertilize.", category: "planting" },
    { month: 10, advice: "Peak rainfall. Monitor for waterlogging.", category: "pest" },
    { month: 11, advice: "Harvest second-season crops. Prepare for dry spell.", category: "harvest" },
    { month: 12, advice: "Dry spell. Irrigate and plan next year.", category: "irrigation" },
  ],
};

// Common crop calendar
const cropCalendar: Record<string, { plantMonths: number[]; harvestMonths: number[]; daysToHarvest: number; waterNeeds: string }> = {
  tomato: { plantMonths: [3, 4, 5], harvestMonths: [7, 8, 9], daysToHarvest: 80, waterNeeds: "High - 1-2 inches/week" },
  maize: { plantMonths: [3, 4], harvestMonths: [8, 9], daysToHarvest: 90, waterNeeds: "Medium - 1 inch/week" },
  beans: { plantMonths: [3, 4, 6, 7], harvestMonths: [6, 7, 9, 10], daysToHarvest: 60, waterNeeds: "Low-Medium - 0.5 inch/week" },
  lettuce: { plantMonths: [2, 3, 8, 9], harvestMonths: [4, 5, 10, 11], daysToHarvest: 45, waterNeeds: "High - 1 inch/week" },
  potato: { plantMonths: [2, 3], harvestMonths: [6, 7], daysToHarvest: 100, waterNeeds: "Medium - 1 inch/week" },
  cassava: { plantMonths: [3, 4, 5], harvestMonths: [12, 1, 2], daysToHarvest: 300, waterNeeds: "Low - drought tolerant" },
  rice: { plantMonths: [3, 4], harvestMonths: [9, 10], daysToHarvest: 150, waterNeeds: "Very High - flooded" },
  cabbage: { plantMonths: [2, 3, 8, 9], harvestMonths: [5, 6, 11, 12], daysToHarvest: 75, waterNeeds: "Medium - 1 inch/week" },
};

// Get advisory tips for user's location
export const getAdvisories = query({
  args: {
    userId: v.id("users"),
    climateZone: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const zone = args.climateZone || "tropical";
    const tips = advisoryTips[zone] || advisoryTips.tropical;
    
    // Get current month's tips + next month preview
    const currentTips = tips.filter((t) => t.month === currentMonth);
    const nextTips = tips.filter((t) => t.month === ((currentMonth % 12) + 1));
    
    return {
      currentMonth,
      zone,
      currentTips,
      nextTips,
      cropCalendar,
    };
  },
});

// Get crop calendar
export const getCropCalendar = query({
  args: { cropType: v.optional(v.string()) },
  handler: async (_ctx, args) => {
    if (args.cropType && cropCalendar[args.cropType]) {
      return { [args.cropType]: cropCalendar[args.cropType] };
    }
    return cropCalendar;
  },
});

// Save user's location preference
export const saveLocation = mutation({
  args: {
    userId: v.id("users"),
    location: v.string(),
    latitude: v.optional(v.number()),
    longitude: v.optional(v.number()),
    climateZone: v.union(
      v.literal("tropical"),
      v.literal("temperate"),
      v.literal("arid"),
      v.literal("equatorial"),
    ),
    soilType: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Upsert the user's advisory profile
    const existing = await ctx.db
      .query("farmProfiles")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .first();
    
    if (existing) {
      await ctx.db.patch(existing._id, {
        location: args.location,
        latitude: args.latitude,
        longitude: args.longitude,
        climateZone: args.climateZone,
        soilType: args.soilType,
        updatedAt: Date.now(),
      });
      return existing._id;
    }
    
    return await ctx.db.insert("farmProfiles", {
      userId: args.userId,
      location: args.location,
      latitude: args.latitude,
      longitude: args.longitude,
      climateZone: args.climateZone,
      soilType: args.soilType,
      farmSize: undefined,
      primaryCrops: [],
      updatedAt: Date.now(),
    });
  },
});

// Get user's advisory profile
export const myProfile = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("farmProfiles")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .first();
  },
});
