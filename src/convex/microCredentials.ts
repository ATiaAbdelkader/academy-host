import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

/** Get all available micro-credentials */
export const list = query({
  args: {},
  handler: async (ctx) => {
    const creds = await ctx.db.query("microCredentials").withIndex("by_active", (q) => q.eq("active", true)).collect();
    const allComps = await ctx.db.query("competencies").collect();
    const compMap = new Map(allComps.map((c) => [c._id, c.name]));
    return creds.map((c) => ({
      ...c,
      competencyNames: c.requiredCompetencies.map((id) => compMap.get(id) ?? "Unknown"),
    }));
  },
});

/** Check if user has earned a micro-credential */
export const myCredentials = query({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    const earned = await ctx.db.query("userMicroCredentials").withIndex("by_user", (q) => q.eq("userId", userId)).collect();
    const credIds = earned.map((e) => e.credentialId);
    const creds = await Promise.all(credIds.map((id) => ctx.db.get(id)));
    return earned.map((e, i) => ({ ...e, credential: creds[i] }));
  },
});

/** Auto-check and award micro-credentials */
export const checkAndAward = mutation({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    const creds = await ctx.db.query("microCredentials").withIndex("by_active", (q) => q.eq("active", true)).collect();
    const userComps = await ctx.db.query("userCompetencies").withIndex("by_user", (q) => q.eq("userId", userId)).collect();
    const compLevelMap = new Map(userComps.map((uc) => [uc.competencyId, uc.level]));
    const alreadyEarned = await ctx.db.query("userMicroCredentials").withIndex("by_user", (q) => q.eq("userId", userId)).collect();
    const earnedSet = new Set(alreadyEarned.map((e) => e.credentialId));
    const newAwards: string[] = [];

    for (const cred of creds) {
      if (earnedSet.has(cred._id)) continue;
      const meetsAll = cred.requiredCompetencies.every(
        (compId) => (compLevelMap.get(compId) ?? 0) >= cred.requiredLevel
      );
      if (meetsAll) {
        await ctx.db.insert("userMicroCredentials", {
          userId,
          credentialId: cred._id,
          earnedAt: Date.now(),
          verified: true,
        });
        newAwards.push(cred.name);
        // Bonus points
        const stats = await ctx.db.query("userStats").withIndex("by_user", (q) => q.eq("userId", userId)).first();
        if (stats) await ctx.db.patch(stats._id, { points: stats.points + 100, updatedAt: Date.now() });
      }
    }
    return { newAwards };
  },
});

/** Seed micro-credentials */
export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("microCredentials").take(1);
    if (existing.length > 0) return { seeded: false };

    const allComps = await ctx.db.query("competencies").collect();
    const compByName = new Map(allComps.map((c) => [c.name, c._id]));

    const creds = [
      { name: "Soil Science Specialist", description: "Demonstrated expertise in soil analysis and management", category: "Foundations", requiredCompetencies: [compByName.get("Soil Analysis")!].filter(Boolean), requiredLevel: 3, icon: "🔬", color: "#166534" },
      { name: "Plant Health Expert", description: "Advanced knowledge of pest identification and management", category: "Plant Health", requiredCompetencies: [compByName.get("Pest Identification")!, compByName.get("Integrated Pest Management")!].filter(Boolean), requiredLevel: 3, icon: "🛡️", color: "#166534" },
      { name: "AgTech Pioneer", description: "Proficiency in IoT, data analysis, and AI applications in farming", category: "AgTech", requiredCompetencies: [compByName.get("IoT & Sensors")!, compByName.get("Data Analysis")!, compByName.get("AI & Machine Learning")!].filter(Boolean), requiredLevel: 2, icon: "🤖", color: "#166534" },
      { name: "Farm Business Pro", description: "Strong skills in market analysis and financial planning", category: "Business", requiredCompetencies: [compByName.get("Market Analysis")!, compByName.get("Farm Financial Planning")!].filter(Boolean), requiredLevel: 3, icon: "📊", color: "#166534" },
      { name: "Water Wizard", description: "Expert in irrigation systems and water conservation", category: "Water Management", requiredCompetencies: [compByName.get("Irrigation Systems")!, compByName.get("Water Conservation")!].filter(Boolean), requiredLevel: 3, icon: "💧", color: "#166534" },
      { name: "Sustainability Champion", description: "Committed to sustainable farming practices", category: "Sustainability", requiredCompetencies: [compByName.get("Sustainable Practices")!, compByName.get("Composting")!].filter(Boolean), requiredLevel: 3, icon: "🌱", color: "#166534" },
    ];

    for (const c of creds) {
      if (c.requiredCompetencies.length > 0) {
        await ctx.db.insert("microCredentials", { ...c, active: true, createdAt: Date.now() });
      }
    }
    return { seeded: true };
  },
});
