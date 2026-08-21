import type { CourseModule } from "./schema";

type ExtraCourse = {
  category: string;
  title: string;
  description: string;
  priceCents: number;
  durationMinutes: number;
  order: number;
  instructor: string;
  instructorTitle: string;
  modules: CourseModule[];
};

export const extraCourse22: ExtraCourse = {
  category: "Water Management",
  title: "Water Harvesting & Irrigation Systems",
  description:
    "Capture, store, and deliver water efficiently. From rainwater harvesting to drip irrigation — reduce water use by 50% while boosting yields.",
  priceCents: 5900,
  durationMinutes: 28,
  order: 22,
  instructor: "Fatima Osman",
  instructorTitle: "Irrigation & Water Systems Engineer",
  modules: [
    {
      title: "Water harvesting fundamentals",
      content: [
        {
          type: "paragraph",
          text: "Every raindrop that hits your roof, driveway, or bare ground is a resource waiting to be captured. A 100 m² roof in a 500 mm rainfall zone collects 50,000 liters per year — enough to irrigate a significant garden. Water harvesting is the cheapest irrigation source available.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=HGCJt4lkcEQ",
          caption: "Rainwater harvesting basics for small farms.",
        },
        {
          type: "list",
          items: [
            "Catchment area × rainfall = potential harvest (m² × mm = liters).",
            "Roof runoff coefficient: 0.8 for metal, 0.6 for tile, 0.4 for thatch.",
            "First flush diverter: discards the first 1–2 liters per m² to clean debris.",
            "Storage: ferro-cement tanks, plastic tanks, or lined earthen dams.",
            "Legal: check local regulations — some areas restrict rainwater harvesting.",
          ],
        },
        {
          type: "quiz",
          title: "Harvesting basics",
          passPercent: 60,
          questions: [
            {
              question: "How much water does a 100 m² metal roof collect in 500 mm rainfall?",
              options: [
                "40,000 liters (100 × 500 × 0.8)",
                "100 liters",
                "10,000 liters",
                "1 liter",
              ],
              answerIndex: 0,
            },
            {
              question: "What does a first flush diverter do?",
              options: [
                "Discards the first 1–2 liters per m² to clean debris",
                "Adds chemicals to the water",
                "Heats the water",
                "Removes all water",
              ],
              answerIndex: 0,
            },
            {
              question: "Which roof material has the highest runoff coefficient?",
              options: [
                "Metal (0.8)",
                "Tile (0.6)",
                "Thatch (0.4)",
                "Grass (0.1)",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "Tank and dam construction",
      content: [
        {
          type: "paragraph",
          text: "Storage is the bridge between when rain falls and when plants need water. Above-ground plastic tanks are cheapest for under 10,000 liters. Ferro-cement tanks hold 10,000–100,000 liters at half the cost of plastic. Earthen dams with clay liners work for larger volumes.",
        },
        {
          type: "list",
          items: [
            "Plastic tanks: $0.30–$0.50 per liter capacity, last 15–20 years.",
            "Ferro-cement: $0.10–$0.20 per liter, needs skilled labor but lasts 30+ years.",
            "Earthen dam with clay liner: lowest cost per liter for volumes above 100,000 L.",
            "All tanks need: overflow pipe, outlet valve, sediment trap, and mosquito screen.",
            "Position tanks higher than the irrigated area for gravity-fed distribution.",
          ],
        },
        {
          type: "code",
          prompt: true,
          text: "storage-comparison\n[plastic]   $0.30–$0.50/L   <10,000 L   15–20 year life\n[ferro-cement] $0.10–$0.20/L  10,000–100,000 L  30+ years\n[earthen]  lowest cost/L    >100,000 L  clay liner required",
        },
        {
          type: "quiz",
          title: "Storage systems",
          passPercent: 60,
          questions: [
            {
              question: "Which storage option is cheapest per liter for volumes above 100,000 L?",
              options: [
                "Earthen dam with clay liner",
                "Plastic tank",
                "Ferro-cement tank",
                "Bottle",
              ],
              answerIndex: 0,
            },
            {
              question: "Ferro-cement tanks typically last:",
              options: [
                "30+ years",
                "1 year",
                "5 years",
                "6 months",
              ],
              answerIndex: 0,
            },
            {
              question: "Why position tanks higher than the irrigated area?",
              options: [
                "For gravity-fed distribution without pumps",
                "For better aesthetics",
                "No reason",
                "To keep them cooler",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "Drip irrigation design and installation",
      content: [
        {
          type: "paragraph",
          text: "Drip irrigation delivers water directly to the root zone — drop by drop. It uses 30–50% less water than overhead sprinklers and reduces foliar disease by keeping leaves dry. The key components: filter, pressure regulator, mainline, sub-main, laterals, and emitters.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=g8dQ7eBnCqU",
          caption: "Drip irrigation installation step by step.",
        },
        {
          type: "list",
          items: [
            "Filter: 150-mesh minimum — clogged emitters are the #1 drip system failure.",
            "Pressure regulator: most drip systems run at 0.5–1.5 bar (7–22 PSI).",
            "Mainline: 25–50 mm polyethylene pipe from the tank to the field.",
            "Laterals: 16 mm drip tape or tubing along each crop row.",
            "Emitter spacing: 20–30 cm for row crops, 1 per plant for trees.",
          ],
        },
        {
          type: "code",
          prompt: true,
          text: "drip-system-spec\n[filter]   150-mesh — clean water before emitters\n[pressure] 0.5–1.5 bar (7–22 PSI)\n[main]     25–50 mm PE pipe from tank\n[laterals] 16 mm drip tape per row\n[emitter]  20–30 cm spacing — row crops",
        },
        {
          type: "quiz",
          title: "Drip irrigation",
          passPercent: 60,
          questions: [
            {
              question: "How much less water does drip irrigation use compared to overhead sprinklers?",
              options: [
                "30–50% less",
                "10% less",
                "Same amount",
                "100% more",
              ],
              answerIndex: 0,
            },
            {
              question: "The #1 cause of drip system failure is:",
              options: [
                "Clogged emitters",
                "Too much water",
                "Leaking tank",
                "Wrong pipe color",
              ],
              answerIndex: 0,
            },
            {
              question: "Recommended drip pressure range is:",
              options: [
                "0.5–1.5 bar (7–22 PSI)",
                "100 bar",
                "0 bar",
                "50 bar",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "Sprinkler and micro-sprinkler systems",
      content: [
        {
          type: "paragraph",
          text: "Sprinklers mimic rainfall — good for lawns, cover crops, and大面积 vegetable production. Micro-sprinklers bridge the gap between drip and sprinkler: they deliver 20–80 liters per hour in a small radius, perfect for orchards and nurseries.",
        },
        {
          type: "list",
          items: [
            "Impact sprinklers: throw 10–25 m, good for large open areas.",
            "Rotary sprinklers: uniform coverage, 5–10 m radius.",
            "Micro-sprinklers: 20–80 L/hr, 1–5 m radius — ideal for tree canopies.",
            "Pop-up sprinklers: flush-mounted, ideal for permanent lawn installations.",
            "Always match precipitation rate to soil infiltration rate to prevent runoff.",
          ],
        },
        {
          type: "note",
          tone: "warn",
          text: "Sprinklers on clay soil must run at low precipitation rates — if water arrives faster than soil absorbs it, runoff carries topsoil downhill.",
        },
        {
          type: "quiz",
          title: "Sprinkler systems",
          passPercent: 60,
          questions: [
            {
              question: "Micro-sprinklers deliver how many liters per hour?",
              options: [
                "20–80 L/hr",
                "1 L/hr",
                "1000 L/hr",
                "0.01 L/hr",
              ],
              answerIndex: 0,
            },
            {
              question: "Why match precipitation rate to soil infiltration rate?",
              options: [
                "To prevent runoff and topsoil erosion",
                "Because it looks better",
                "No practical reason",
                "To use more water",
              ],
              answerIndex: 0,
            },
            {
              question: "Which sprinkler type is flush-mounted for permanent lawns?",
              options: [
                "Pop-up sprinklers",
                "Impact sprinklers",
                "Hand-held hose",
                "Fire hose",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "Scheduling and water efficiency",
      content: [
        {
          type: "paragraph",
          text: "How much to irrigate and when — that is the question. Over-watering wastes water, leaches nutrients, and promotes root disease. Under-watering stresses plants and reduces yields. Soil moisture monitoring replaces guessing with data.",
        },
        {
          type: "list",
          items: [
            "Soil moisture meter: $20–$50, insert into root zone, read instantly.",
            "Tensiometer: measures soil water tension — the most accurate irrigation trigger.",
            "Water before dawn: less evaporation, less disease, better absorption.",
            "Deep and infrequent: one deep watering beats three shallow ones.",
            "Mulch reduces evaporation 50–70% — the cheapest water-saving tool.",
          ],
        },
        {
          type: "code",
          prompt: true,
          text: "irrigation-scheduling\n[meter]     soil moisture meter — check at 15 cm depth\n[timing]    water before dawn — lowest evaporation\n[frequency] deep and infrequent — not shallow daily\n[mulch]     5–8 cm layer — reduces evaporation 50–70%",
        },
        {
          type: "quiz",
          title: "Scheduling",
          passPercent: 60,
          questions: [
            {
              question: "When is the best time to irrigate?",
              options: [
                "Before dawn",
                "At noon",
                "In the evening",
                "It doesn't matter",
              ],
              answerIndex: 0,
            },
            {
              question: "How much does mulch reduce evaporation?",
              options: [
                "50–70%",
                "0%",
                "100%",
                "10%",
              ],
              answerIndex: 0,
            },
            {
              question: "Which irrigation strategy is better: deep and infrequent or shallow and daily?",
              options: [
                "Deep and infrequent",
                "Shallow and daily",
                "Both are equal",
                "Neither — don't water",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "Greywater recycling and water conservation",
      content: [
        {
          type: "paragraph",
          text: "Greywater — from sinks, showers, and laundry — can irrigate non-edible plants and, with basic filtration, fruit trees and vegetables. It extends your water supply by 30–40% at near-zero cost. The rule: use biodegradable soaps, irrigate below the canopy, and never store greywater more than 24 hours.",
        },
        {
          type: "list",
          items: [
            "Greywater is 50–80% of household wastewater — a resource, not waste.",
            "Use only biodegradable, phosphate-free soaps for greywater irrigation.",
            "Branching drain systems direct greywater to garden without pumps.",
            "Never store greywater — use it within 24 hours to prevent bacterial growth.",
            "Greywater reduces fresh water demand for landscaping by 30–40%.",
          ],
        },
        {
          type: "note",
          tone: "warn",
          text: "Never use greywater on root vegetables that contact the soil directly (carrots, radishes). Use only on fruit trees, ornamentals, or surface-drip on raised beds.",
        },
        {
          type: "quiz",
          title: "Greywater and conservation",
          passPercent: 60,
          questions: [
            {
              question: "What percentage of household wastewater is greywater?",
              options: [
                "50–80%",
                "5%",
                "100%",
                "0%",
              ],
              answerIndex: 0,
            },
            {
              question: "Why must greywater be used within 24 hours?",
              options: [
                "To prevent bacterial growth",
                "It evaporates instantly",
                "No reason — it can be stored indefinitely",
                "To keep it warm",
              ],
              answerIndex: 0,
            },
            {
              question: "Which crops should NOT be irrigated with greywater?",
              options: [
                "Root vegetables that contact soil directly",
                "Fruit trees",
                "Ornamental plants",
                "None — greywater is safe for all crops",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
  ],
};
