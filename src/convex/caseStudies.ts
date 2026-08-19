import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

/** List all active case studies */
export const list = query({
  args: { category: v.optional(v.string()) },
  handler: async (ctx, { category }) => {
    let q = ctx.db.query("caseStudies").withIndex("by_active", (q) => q.eq("active", true));
    if (category) q = q.filter((q) => q.eq(q.field("category"), category));
    return await q.collect();
  },
});

/** Get a single case study */
export const get = query({
  args: { id: v.id("caseStudies") },
  handler: async (ctx, { id }) => await ctx.db.get(id),
});

/** Submit a case study attempt */
export const submit = mutation({
  args: {
    userId: v.id("users"),
    caseStudyId: v.id("caseStudies"),
    answers: v.array(v.number()),
    reflection: v.optional(v.string()),
  },
  handler: async (ctx, { userId, caseStudyId, answers, reflection }) => {
    const cs = await ctx.db.get(caseStudyId);
    if (!cs) throw new Error("Case study not found");

    let correct = 0;
    for (let i = 0; i < cs.questions.length; i++) {
      if (answers[i] === cs.questions[i].answerIndex) correct++;
    }
    const score = Math.round((correct / cs.questions.length) * 100);
    const passed = score >= 70;

    const id = await ctx.db.insert("caseStudyAttempts", {
      userId,
      caseStudyId,
      answers,
      correct,
      total: cs.questions.length,
      score,
      passed,
      reflection,
      createdAt: Date.now(),
    });

    // Award points
    if (passed) {
      const stats = await ctx.db.query("userStats").withIndex("by_user", (q) => q.eq("userId", userId)).first();
      if (stats) {
        await ctx.db.patch(stats._id, { points: stats.points + cs.pointsReward, updatedAt: Date.now() });
      }
    }

    return { id, score, correct, total: cs.questions.length, passed };
  },
});

/** My attempts */
export const myAttempts = query({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    const attempts = await ctx.db.query("caseStudyAttempts").withIndex("by_user", (q) => q.eq("userId", userId)).collect();
    const caseIds = [...new Set(attempts.map((a) => a.caseStudyId))];
    const cases = await Promise.all(caseIds.map((id) => ctx.db.get(id)));
    const caseMap = new Map(cases.filter(Boolean).map((c) => [c!._id, c!]));
    return attempts.map((a) => ({ ...a, caseStudy: caseMap.get(a.caseStudyId) }));
  },
});

/** Seed initial case studies */
export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("caseStudies").collect();
    if (existing.length > 0) return { seeded: false };

    const studies = [
      {
        title: "Declining Yields on Farm X",
        description: "A 200-acre corn farm has seen a 30% yield decline over 3 years. Diagnose the cause.",
        category: "Soil Science",
        difficulty: "intermediate" as const,
        scenario: "Farm X is a 200-acre corn operation in central Iowa. Over the past 3 growing seasons, yields have dropped from 180 bu/acre to 125 bu/acre. The farmer has increased fertilizer application but yields continue to decline. Soil tests show pH has dropped from 6.8 to 5.2.",
        context: "The farm uses conventional tillage, applied 150 lbs N/acre last season, and has a 4-year corn-soybean rotation. No cover crops are used. Neighboring farms with similar soil types are maintaining yields.",
        questions: [
          { question: "What is the most likely primary cause of yield decline?", options: ["Soil acidification reducing nutrient availability", "Insufficient nitrogen fertilizer", "Corn rootworm resistance", "Herbicide carryover from soybeans"], answerIndex: 0, explanation: "The pH drop from 6.8 to 5.2 is severe. At pH 5.2, many nutrients become unavailable and aluminum toxicity increases." },
          { question: "What should be the first corrective action?", options: ["Apply lime to raise pH to 6.0-6.5", "Double the nitrogen rate", "Switch to no-till immediately", "Plant cover crops"], answerIndex: 0, explanation: "Correcting pH is the foundation — no other amendment will work properly until pH is in range." },
          { question: "How much lime would typically be needed?", options: ["2-4 tons/acre to raise pH by 1.0 point", "50 lbs/acre", "No lime needed, use acid-tolerant varieties", "10 tons/acre"], answerIndex: 0, explanation: "General rule: 2-4 tons of agricultural lime per acre raises pH by approximately 1 point, depending on buffer pH and lime quality." },
        ],
        pointsReward: 50,
        estimatedMinutes: 20,
        tags: ["soil", "diagnostics", "corn"],
        active: true,
        createdAt: Date.now(),
      },
      {
        title: "Greenhouse Pest Outbreak",
        description: "A tomato greenhouse has a sudden aphid infestation. Design an IPM response.",
        category: "Plant Health",
        difficulty: "beginner" as const,
        scenario: "A 10,000 sq ft greenhouse growing indeterminate tomatoes has discovered heavy aphid populations on 40% of plants. The grower wants to avoid pesticides due to organic certification.",
        context: "The greenhouse operates year-round. Beneficial insects were released 3 months ago but population has declined. Temperature averages 75°F. No sticky traps are currently deployed.",
        questions: [
          { question: "What is the most immediate action?", options: ["Release ladybugs and lacewings at 10x the normal rate", "Spray neem oil immediately", "Remove all affected plants", "Close the greenhouse vents"], answerIndex: 0, explanation: "A rapid beneficial insect release provides immediate biological control without chemicals." },
          { question: "Why might the original beneficial insect population have declined?", options: ["Predator-prey cycle imbalance or pesticide drift", "Temperatures too high", "Aphids are resistant to beneficial insects", "The greenhouse is too small"], answerIndex: 0, explanation: "Beneficial insect populations naturally cycle. Without sustained releases and monitoring, they can crash while pests rebound." },
          { question: "What monitoring should be added immediately?", options: ["Yellow sticky traps and weekly scouting", "Soil pH testing", "Leaf tissue analysis", "Wind speed monitoring"], answerIndex: 0, explanation: "Sticky traps catch flying aphids and early detection. Weekly scouting quantifies populations for action thresholds." },
        ],
        pointsReward: 30,
        estimatedMinutes: 15,
        tags: ["greenhouse", "pest-management", "tomato"],
        active: true,
        createdAt: Date.now(),
      },
      {
        title: "Drip Irrigation Design Challenge",
        description: "Design a drip system for a 5-acre vegetable farm on a slope.",
        category: "Water Management",
        difficulty: "advanced" as const,
        scenario: "A 5-acre mixed vegetable farm on a 5% slope needs a new drip irrigation system. Water source is a well with 20 GPM capacity. Crops include tomatoes, peppers, lettuce, and herbs.",
        context: "Soil is sandy loam with moderate drainage. The farmer wants to reduce water use by 40% compared to overhead sprinklers. Budget is $8,000. Previous sprinkler system applied 1 inch/week.",
        questions: [
          { question: "What emitter spacing is appropriate for sandy loam with vegetables?", options: ["8-12 inches", "24-36 inches", "4-6 inches", "48 inches"], answerIndex: 0, explanation: "Sandy loam has moderate lateral water movement. 8-12 inch spacing ensures overlap of wetting patterns without excessive water use." },
          { question: "How should the slope be managed in the drip system design?", options: ["Use pressure-compensating emitters and zone by elevation", "Run lines straight down the slope", "Use larger diameter tubing", "Install a higher pressure pump"], answerIndex: 0, explanation: "Pressure-compensating emitters maintain uniform flow regardless of elevation changes. Zoning prevents gravity from causing uneven distribution." },
          { question: "What filtration is needed for drip irrigation from a well?", options: ["150-mesh filter minimum, preferably 200-mesh", "No filter needed from a well", "50-mesh is sufficient", "Only a screen filter"], answerIndex: 0, explanation: "Drip emitters have tiny openings that clog easily. 150-200 mesh filtration removes fine sediment common in well water." },
        ],
        pointsReward: 60,
        estimatedMinutes: 25,
        tags: ["irrigation", "design", "water-management"],
        active: true,
        createdAt: Date.now(),
      },
    ];

    for (const s of studies) {
      await ctx.db.insert("caseStudies", s);
    }
    return { seeded: true, count: studies.length };
  },
});
