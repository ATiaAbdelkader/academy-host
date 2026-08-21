import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const listItems = query({
  args: { category: v.optional(v.string()) },
  handler: async (ctx, args) => {
    let items = await ctx.db.query("storeItems").collect();
    if (args.category) {
      items = items.filter((i) => i.category === args.category && i.active);
    } else {
      items = items.filter((i) => i.active);
    }
    return items.sort((a, b) => a.order - b.order);
  },
});

export const myPurchases = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("storePurchases")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();
  },
});

export const purchase = mutation({
  args: { userId: v.id("users"), itemId: v.id("storeItems") },
  handler: async (ctx, args) => {
    const item = await ctx.db.get(args.itemId);
    if (!item || !item.active) throw new Error("Item not found");

    const stats = await ctx.db
      .query("userStats")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .first();
    if (!stats || stats.points < item.pricePoints) {
      throw new Error("Not enough points");
    }

    const alreadyOwned = await ctx.db
      .query("storePurchases")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();
    if (alreadyOwned.some((p) => p.itemId === args.itemId)) {
      throw new Error("Already purchased");
    }

    await ctx.db.patch(stats._id, { points: stats.points - item.pricePoints });
    return await ctx.db.insert("storePurchases", {
      userId: args.userId,
      itemId: args.itemId,
      pointsSpent: item.pricePoints,
      createdAt: Date.now(),
    });
  },
});

// Seed store items
export const seedStore = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("storeItems").first();
    if (existing) return "already seeded";

    const items = [
      { title: "Scholar Badge", description: "Awarded for academic excellence", category: "badge" as const, pricePoints: 100, icon: "🏆", active: true, order: 1 },
      { title: "Nature Theme", description: "Green nature-inspired UI theme", category: "theme" as const, pricePoints: 200, icon: "🌿", active: true, order: 2 },
      { title: "Advanced Course Unlock", description: "Unlock any one advanced course early", category: "unlock" as const, pricePoints: 500, icon: "🔓", active: true, order: 3 },
      { title: "Farm Explorer Avatar", description: "Exclusive farming avatar frame", category: "avatar" as const, pricePoints: 150, icon: "👨‍🌾", active: true, order: 4 },
      { title: "Master Farmer Title", description: "Show \"Master Farmer\" next to your name", category: "title" as const, pricePoints: 750, icon: "⭐", active: true, order: 5 },
      { title: "Night Owl Badge", description: "Completed 10 late-night study sessions", category: "badge" as const, pricePoints: 75, icon: "🦉", active: true, order: 6 },
      { title: "Soil Theme", description: "Warm earth-tone UI theme", category: "theme" as const, pricePoints: 200, icon: "🌍", active: true, order: 7 },
      { title: "Quiz Champion Title", description: "Show \"Quiz Champion\" next to your name", category: "title" as const, pricePoints: 500, icon: "🎯", active: true, order: 8 },
    ];

    for (const item of items) {
      await ctx.db.insert("storeItems", item);
    }
    return "seeded";
  },
});
