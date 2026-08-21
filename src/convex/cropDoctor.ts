import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Crop disease knowledge base (simulated AI diagnosis)
const diseaseDB: Record<string, { symptoms: string[]; treatment: string; severity: "low" | "medium" | "high"; relatedCourse: string }> = {
  "early_blight": {
    symptoms: ["Dark spots with concentric rings on lower leaves", "Yellowing around spots", "Leaf drop starting from bottom"],
    treatment: "Remove affected leaves. Apply copper fungicide. Improve air circulation. Mulch to prevent soil splash.",
    severity: "medium",
    relatedCourse: "crop-protection",
  },
  "late_blight": {
    symptoms: ["Water-soaked lesions on leaves", "White fuzzy growth on leaf undersides", "Dark brown spots on stems and tubers"],
    treatment: "Remove and destroy affected plants immediately. Apply chlorothalonil or mancozeb. Plant resistant varieties next season.",
    severity: "high",
    relatedCourse: "crop-protection",
  },
  "aphid_infestation": {
    symptoms: ["Curled and distorted new growth", "Sticky honeydew on leaves", "Small green/black insects clustered on stems"],
    treatment: "Spray with strong water jet to dislodge. Apply neem oil or insecticidal soap. Introduce ladybugs as natural predators.",
    severity: "low",
    relatedCourse: "pest-management",
  },
  "nitrogen_deficiency": {
    symptoms: ["Pale green to yellow leaves starting from older leaves", "Stunted growth", "Reduced fruit development"],
    treatment: "Apply nitrogen-rich fertilizer (urea or ammonium sulfate). Add compost or manure. Plant nitrogen-fixing cover crops.",
    severity: "medium",
    relatedCourse: "soil-science",
  },
  "root_rot": {
    symptoms: ["Wilting despite adequate moisture", "Brown/black roots when pulled", "Stunted growth and yellowing"],
    treatment: "Improve drainage immediately. Reduce irrigation. Apply fungicide drench. Consider raised beds for future planting.",
    severity: "high",
    relatedCourse: "soil-health",
  },
  "powdery_mildew": {
    symptoms: ["White powdery coating on leaves", "Yellowing and browning of affected tissue", "Leaf curling and premature drop"],
    treatment: "Apply neem oil or potassium bicarbonate spray. Improve air circulation. Avoid overhead watering. Plant resistant varieties.",
    severity: "medium",
    relatedCourse: "crop-protection",
  },
  "blossom_end_rot": {
    symptoms: ["Dark sunken spot on bottom of tomato/pepper fruits", "Firm leathery texture at the blossom end"],
    treatment: "Maintain consistent watering. Apply calcium spray. Add lime to soil if pH is low. Mulch to regulate moisture.",
    severity: "medium",
    relatedCourse: "crop-protection",
  },
  "fusarium_wilt": {
    symptoms: ["Yellowing on one side of plant or leaf", "Vascular browning when stem is cut", "Progressive wilting and plant death"],
    treatment: "Remove and destroy infected plants. Do not compost. Rotate crops for 3-4 years. Plant resistant varieties. Solarize soil.",
    severity: "high",
    relatedCourse: "crop-protection",
  },
  "leaf_curl": {
    symptoms: ["Upward curling of leaf edges", "Thickened, leathery leaf texture", "Stunted new growth"],
    treatment: "Check for whitefly (vector for leaf curl virus). Control insect population. Remove infected plants. Use reflective mulches.",
    severity: "medium",
    relatedCourse: "pest-management",
  },
  "mosaic_virus": {
    symptoms: ["Mottled light/dark green pattern on leaves", "Distorted leaf shape", "Stunted growth and reduced yield"],
    treatment: "Remove infected plants (no cure). Control aphid vectors. Wash hands and tools between plants. Plant resistant varieties.",
    severity: "high",
    relatedCourse: "crop-protection",
  },
};

// Submit a crop diagnosis
export const diagnose = mutation({
  args: {
    userId: v.id("users"),
    cropType: v.string(),
    symptoms: v.string(), // free text from the user
    photoUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Simple keyword matching to simulate AI diagnosis
    const symptomLower = args.symptoms.toLowerCase();
    const cropLower = args.cropType.toLowerCase();
    
    let bestMatch = "";
    let bestScore = 0;
    
    for (const [disease, info] of Object.entries(diseaseDB)) {
      let score = 0;
      for (const symptom of info.symptoms) {
        const words = symptom.toLowerCase().split(" ");
        for (const word of words) {
          if (symptomLower.includes(word) && word.length > 3) score++;
        }
      }
      if (cropLower.includes("tomato") && (disease.includes("blight") || disease === "blossom_end_rot" || disease === "mosaic_virus")) score += 2;
      if (cropLower.includes("potato") && disease.includes("blight")) score += 2;
      if (score > bestScore) { bestScore = score; bestMatch = disease; }
    }
    
    // Default to a general diagnosis if no good match
    if (bestScore < 2) bestMatch = "nitrogen_deficiency";
    
    const diagnosis = diseaseDB[bestMatch];
    
    const diagId = await ctx.db.insert("cropDiagnoses", {
      userId: args.userId,
      cropType: args.cropType,
      reportedSymptoms: args.symptoms,
      photoUrl: args.photoUrl,
      diagnosis: bestMatch.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      confidence: Math.min(95, 60 + bestScore * 8),
      severity: diagnosis.severity,
      treatment: diagnosis.treatment,
      relatedCourseSlug: diagnosis.relatedCourse,
      createdAt: Date.now(),
    });
    
    return await ctx.db.get(diagId);
  },
});

// Get user's past diagnoses
export const myDiagnoses = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("cropDiagnoses")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .take(20);
  },
});

// Quick symptom checker (no persist)
export const quickCheck = query({
  args: { symptoms: v.string() },
  handler: async (_ctx, args) => {
    const symptomLower = args.symptoms.toLowerCase();
    const matches: Array<{ name: string; severity: string; treatment: string }> = [];
    
    for (const [disease, info] of Object.entries(diseaseDB)) {
      let score = 0;
      for (const symptom of info.symptoms) {
        const words = symptom.toLowerCase().split(" ");
        for (const word of words) {
          if (symptomLower.includes(word) && word.length > 3) score++;
        }
      }
      if (score >= 2) {
        matches.push({
          name: disease.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
          severity: info.severity,
          treatment: info.treatment,
        });
      }
    }
    
    return matches.length > 0 ? matches : [{
      name: "Unable to diagnose from symptoms provided",
      severity: "info" as string,
      treatment: "Please provide more specific symptoms or use the full diagnosis form with a photo.",
    }];
  },
});
