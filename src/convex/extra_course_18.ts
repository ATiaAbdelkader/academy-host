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

export const extraCourse18: ExtraCourse = {
  category: "Soil Science",
  title: "Composting & Soil Amendments",
  description:
    "Turn waste into fertility. Master hot composting, vermicomposting, bokashi, and the science of soil amendments that rebuild degraded land.",
  priceCents: 4900,
  durationMinutes: 22,
  order: 18,
  instructor: "Amina Hassan",
  instructorTitle: "Soil Health Specialist",
  modules: [
    {
      title: "Why composting matters",
      content: [
        {
          type: "paragraph",
          text: "Composting is controlled decomposition — you are managing billions of microorganisms to break organic waste into stable humus. Every ton of compost replaces synthetic fertilizer, builds soil structure, and sequesters carbon. It is the cheapest soil builder on the planet.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=E_pqHjl7zCM",
          caption: "How composting works — the biology behind the pile.",
        },
        {
          type: "list",
          items: [
            "Compost replaces 25–50% of synthetic fertilizer needs.",
            "It improves water retention in sandy soils and drainage in clay soils.",
            "Finished compost suppresses soil-borne pathogens.",
            "Composting diverts 30% of household waste from landfills.",
          ],
        },
        {
          type: "quiz",
          title: "Composting basics",
          passPercent: 60,
          questions: [
            {
              question: "Compost can replace what percentage of synthetic fertilizer?",
              options: [
                "25–50%",
                "0%",
                "100%",
                "10%",
              ],
              answerIndex: 0,
            },
            {
              question: "Composting diverts approximately what percentage of household waste?",
              options: [
                "30%",
                "5%",
                "90%",
                "1%",
              ],
              answerIndex: 0,
            },
            {
              question: "Finished compost helps with:",
              options: [
                "Suppressing soil-borne pathogens",
                "Increasing pest populations",
                "Raising soil pH excessively",
                "Nothing practical",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "Hot composting: the fast method",
      content: [
        {
          type: "paragraph",
          text: "Hot composting uses sustained temperatures of 55–70°C to break down materials in 4–8 weeks. The key is the carbon-to-nitrogen ratio (30:1), moisture at 50–60%, and regular turning to maintain oxygen. A pile that reaches 60°C for 3 days kills most weed seeds and pathogens.",
        },
        {
          type: "code",
          prompt: true,
          text: "hot-compost-recipe\n[brown] dry leaves, straw, cardboard     3 parts\n[green] food scraps, fresh grass, manure  1 part\n[moist] squeeze test — drip but not stream\n[size]  minimum 1 m × 1 m × 1 m\n[temp]  55–70°C — turn when drops below 50°C",
        },
        {
          type: "note",
          tone: "warn",
          text: "Meat, dairy, and oily food should NOT go in hot compost — they attract pests and slow decomposition.",
        },
        {
          type: "quiz",
          title: "Hot composting",
          passPercent: 60,
          questions: [
            {
              question: "The ideal carbon-to-nitrogen ratio for hot composting is:",
              options: [
                "30:1",
                "1:1",
                "100:1",
                "5:1",
              ],
              answerIndex: 0,
            },
            {
              question: "At what temperature does hot composting kill weed seeds?",
              options: [
                "60°C for 3 days",
                "30°C for 1 day",
                "100°C for 1 hour",
                "0°C for 1 week",
              ],
              answerIndex: 0,
            },
            {
              question: "Which materials should NOT go in a hot compost pile?",
              options: [
                "Meat, dairy, and oily food",
                "Dry leaves",
                "Fresh grass clippings",
                "Vegetable scraps",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "Vermicomposting and bokashi",
      content: [
        {
          type: "paragraph",
          text: "Vermicomposting uses red wiggler worms (Eisenia fetida) to convert food waste into castings — the richest natural fertilizer. Bokashi is anaerobic fermentation using Effective Microorganisms, perfect for meat and dairy that hot compost cannot handle.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=UwW6aIy-XN4",
          caption: "Vermicomposting setup and worm care.",
        },
        {
          type: "list",
          items: [
            "Red wigglers eat half their body weight per day.",
            "Bedding: shredded newspaper, coconut coir, or cardboard.",
            "Bokashi produces fermented pickled waste — bury it in soil 2 weeks before planting.",
            "Vermicastings are 5× richer in nitrogen than the original waste.",
          ],
        },
        {
          type: "quiz",
          title: "Vermicomposting and bokashi",
          passPercent: 60,
          questions: [
            {
              question: "Red wiggler worms eat approximately how much per day?",
              options: [
                "Half their body weight",
                "1 gram only",
                "Their full body weight",
                "Nothing — they are decorative",
              ],
              answerIndex: 0,
            },
            {
              question: "Vermicastings are how much richer in nitrogen than the original waste?",
              options: [
                "5× richer",
                "2× richer",
                "Same amount",
                "Less rich",
              ],
              answerIndex: 0,
            },
            {
              question: "Bokashi fermentation can handle which materials hot compost cannot?",
              options: [
                "Meat and dairy",
                "Dry leaves",
                "Wood chips",
                "Sand",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "Soil testing and interpretation",
      content: [
        {
          type: "paragraph",
          text: "You cannot fix what you do not measure. A soil test tells you pH, nutrient levels, organic matter content, and cation exchange capacity. Test before amending — otherwise you are guessing, and guessing costs money.",
        },
        {
          type: "list",
          items: [
            "Test soil once per year, at the same time, in the same spot.",
            "pH 6.0–7.0 is optimal for most crops.",
            "Low organic matter: add compost at 2–5 kg per m².",
            "High phosphorus: stop adding manure or bone meal.",
          ],
        },
        {
          type: "code",
          prompt: true,
          text: "soil-test-interpretation\n[pH]    6.0–7.0 — ideal for most vegetables\n[OM]    <2% — needs compost addition\n[N]     low — add legume cover crop or compost\n[P]     high — stop adding phosphorus amendments\n[K]     test and adjust annually",
        },
        {
          type: "quiz",
          title: "Soil testing",
          passPercent: 60,
          questions: [
            {
              question: "Optimal pH range for most vegetables is:",
              options: [
                "6.0–7.0",
                "3.0–4.0",
                "9.0–10.0",
                "0.0–1.0",
              ],
              answerIndex: 0,
            },
            {
              question: "If organic matter is below 2%, you should:",
              options: [
                "Add compost at 2–5 kg per m²",
                "Add more salt",
                "Do nothing",
                "Remove all organic material",
              ],
              answerIndex: 0,
            },
            {
              question: "How often should you test soil?",
              options: [
                "Once per year, same time and spot",
                "Daily",
                "Never",
                "Every 10 years",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "Organic amendments: lime, gypsum, and rock minerals",
      content: [
        {
          type: "paragraph",
          text: "Compost builds organic matter; mineral amendments correct specific deficiencies. Lime raises pH in acidic soils. Gypsum adds calcium without changing pH. Rock phosphate and glacial rock dust provide slow-release micronutrients. Match the amendment to the test result.",
        },
        {
          type: "list",
          items: [
            "Agricultural lime: raises pH, apply 2–4 kg per 10 m² in autumn.",
            "Gypsum: adds calcium and sulfur, safe for all pH levels.",
            "Rock phosphate: slow-release phosphorus for 4+ years.",
            "Epsom salt (magnesium sulfate): use only if magnesium is confirmed low.",
          ],
        },
        {
          type: "note",
          tone: "info",
          text: "More is not better with amendments. Over-liming can push pH too high, locking out iron and manganese. Always test first.",
        },
        {
          type: "quiz",
          title: "Mineral amendments",
          passPercent: 60,
          questions: [
            {
              question: "Which amendment raises soil pH?",
              options: [
                "Agricultural lime",
                "Gypsum",
                "Rock phosphate",
                "Epsom salt",
              ],
              answerIndex: 0,
            },
            {
              question: "Gypsum adds which nutrients without changing pH?",
              options: [
                "Calcium and sulfur",
                "Nitrogen and phosphorus",
                "Iron and manganese",
                "Sodium and chlorine",
              ],
              answerIndex: 0,
            },
            {
              question: "Why should you test before applying lime?",
              options: [
                "Over-liming can lock out iron and manganese",
                "Lime is expensive",
                "Lime only works in winter",
                "Testing is required by law",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "Compost application rates and timing",
      content: [
        {
          type: "paragraph",
          text: "Timing matters as much as quantity. Apply compost in autumn so it integrates before spring planting. For established gardens, 2–5 cm per year maintains fertility. For degraded land, heavier applications of 5–10 cm in the first year can jumpstart recovery.",
        },
        {
          type: "list",
          items: [
            "Autumn application: compost breaks down over winter, ready for spring.",
            "2–5 cm annually for established gardens.",
            "5–10 cm first year for degraded or compacted soil.",
            "Top-dress lawns with 1 cm of fine compost — do not bury the grass.",
            "Never mix fresh compost directly with seed — it can burn germinating roots.",
          ],
        },
        {
          type: "code",
          prompt: true,
          text: "application-rates\n[established]  2–5 cm per year — annual top-dress\n[degraded]      5–10 cm first year, then 2–5 cm\n[lawn]          1 cm fine compost — top-dress only\n[timing]        autumn preferred — integrates over winter",
        },
        {
          type: "quiz",
          title: "Application timing",
          passPercent: 60,
          questions: [
            {
              question: "Why apply compost in autumn?",
              options: [
                "It integrates over winter, ready for spring planting",
                "It looks better in autumn",
                "Compost only works in cold weather",
                "Pests are less active",
              ],
              answerIndex: 0,
            },
            {
              question: "How much compost for a degraded or compacted soil in year one?",
              options: [
                "5–10 cm",
                "1 mm",
                "50 cm",
                "None — compost cannot help degraded soil",
              ],
              answerIndex: 0,
            },
            {
              question: "Why not mix fresh compost directly with seed?",
              options: [
                "It can burn germinating roots",
                "It is too heavy",
                "Seeds don't need nutrients",
                "Compost repels water",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
  ],
};
