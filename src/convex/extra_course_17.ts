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

export const extraCourse17: ExtraCourse = {
  category: "Horticulture",
  title: "Plant Propagation & Nursery Management",
  description:
    "Multiply your stock and cut costs: master seeds, cuttings, grafting, and nursery setup. From kitchen table to commercial nursery.",
  priceCents: 5900,
  durationMinutes: 28,
  order: 17,
  instructor: "David Kamau",
  instructorTitle: "Nursery Production Manager",
  modules: [
    {
      title: "Propagation methods overview",
      content: [
        {
          type: "paragraph",
          text: "Propagation is multiplication — the ability to turn one parent plant into dozens, hundreds, or thousands of identical copies. Sexual propagation (seeds) introduces variation. Asexual propagation (cuttings, division, grafting) preserves exact genetics. Choose the method based on what you need.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=EHRn1hBG3pg",
          caption: "Seed vs. vegetative propagation — when to use each.",
        },
        {
          type: "list",
          items: [
            "Seeds: cheapest, best for large quantities, introduces genetic variation.",
            "Cuttings: fast, preserves parent genetics, needs moisture control.",
            "Division: ideal for perennials and clumping grasses.",
            "Grafting: combines rootstock vigor with scion fruit quality.",
          ],
        },
        {
          type: "quiz",
          title: "Propagation methods",
          passPercent: 60,
          questions: [
            {
              question: "Sexual propagation (seeds) introduces:",
              options: [
                "Genetic variation",
                "Exact genetic copies",
                "No change at all",
                "Disease resistance only",
              ],
              answerIndex: 0,
            },
            {
              question: "Which method preserves exact parent genetics?",
              options: [
                "Cuttings",
                "Seeds",
                "Both equally",
                "Neither",
              ],
              answerIndex: 0,
            },
            {
              question: "Grafting is primarily used to:",
              options: [
                "Combine rootstock vigor with scion fruit quality",
                "Produce seeds faster",
                "Kill unwanted plants",
                "Improve soil drainage",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "Seed starting and germination",
      content: [
        {
          type: "paragraph",
          text: "Seed starting is controlled germination: the right temperature, moisture, and oxygen at the right time. Most seeds need three things — warmth, moisture, and air. Some need light to germinate; others need darkness. Know your seed before you sow.",
        },
        {
          type: "code",
          prompt: true,
          text: "germination-checklist\n[temp]   check species requirements (20–30°C typical)\n[moist]  pre-soak hard seeds 12–24h\n[air]    do not oversaturate — seeds need oxygen\n[light]  surface-sow small seeds, bury large ones\n[depth]  2× seed diameter for most species",
        },
        {
          type: "note",
          tone: "warn",
          text: "Never use garden soil for seed starting — it compacts, drains poorly, and may contain pathogens. Use sterile seed-starting mix.",
        },
        {
          type: "quiz",
          title: "Seed germination",
          passPercent: 60,
          questions: [
            {
              question: "Most seeds need which three conditions to germinate?",
              options: [
                "Warmth, moisture, and air",
                "Light, fertilizer, and wind",
                "Cold, darkness, and salt",
                "Heat, drought, and shade",
              ],
              answerIndex: 0,
            },
            {
              question: "Planting depth for most seeds should be:",
              options: [
                "2× the seed diameter",
                "1 meter deep",
                "On the surface always",
                "30 cm deep",
              ],
              answerIndex: 0,
            },
            {
              question: "Why avoid garden soil for seed starting?",
              options: [
                "It compacts, drains poorly, and may contain pathogens",
                "It is too expensive",
                "Plants prefer hydroponics",
                "Garden soil has too much light",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "Vegetative propagation: cuttings and division",
      content: [
        {
          type: "paragraph",
          text: "A cutting is a piece of plant that grows its own roots. Hardwood cuttings take longer but are more resilient. Softwood cuttings root fast but need high humidity. The node — where leaves attach — is where roots emerge. Always cut just below a node.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=v2gBZJMP5uE",
          caption: "Taking and rooting stem cuttings step by step.",
        },
        {
          type: "list",
          items: [
            "Hardwood cuttings: taken in winter, 15–30 cm, slow to root but hardy.",
            "Softwood cuttings: taken in spring, 10–15 cm, root in 2–4 weeks.",
            "Always cut just below a node — that is where roots form.",
            "Rooting hormone (IBA) increases success rate by 30–50%.",
            "Division works for clumping plants: dig, split, replant immediately.",
          ],
        },
        {
          type: "quiz",
          title: "Cuttings and division",
          passPercent: 60,
          questions: [
            {
              question: "Where do roots emerge on a cutting?",
              options: [
                "At the node",
                "At the tip",
                "Anywhere randomly",
                "Only on leaves",
              ],
              answerIndex: 0,
            },
            {
              question: "Rooting hormone increases success rate by approximately:",
              options: [
                "30–50%",
                "1%",
                "100%",
                "0%",
              ],
              answerIndex: 0,
            },
            {
              question: "When are hardwood cuttings typically taken?",
              options: [
                "In winter",
                "In summer",
                "During harvest",
                "Year-round equally",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "Grafting techniques and rootstock selection",
      content: [
        {
          type: "paragraph",
          text: "Grafting joins two plants into one functional unit. The rootstock provides roots and disease resistance. The scion provides the fruit, flower, or foliage you want. The cambium layers must align for the graft to take.",
        },
        {
          type: "list",
          items: [
            "Whip and tongue: strongest graft for young rootstock under 1 cm diameter.",
            "Cleft graft: used for top-working established trees.",
            "Bud grafting: uses a single bud — efficient for large-scale nursery production.",
            "Rootstock choice determines tree size, disease resistance, and soil adaptability.",
          ],
        },
        {
          type: "note",
          tone: "info",
          text: "Grafting is not possible across unrelated plant families. Tomatoes can be grafted to other Solanaceae. Apple to pear works. Apple to citrus does not.",
        },
        {
          type: "quiz",
          title: "Grafting",
          passPercent: 60,
          questions: [
            {
              question: "The rootstock provides:",
              options: [
                "Roots and disease resistance",
                "Fruit and flowers",
                "Nothing — it is decorative",
                "Seeds",
              ],
              answerIndex: 0,
            },
            {
              question: "Which layers must align for a graft to take?",
              options: [
                "Cambium layers",
                "Outer bark only",
                "Leaf layers",
                "Root layers",
              ],
              answerIndex: 0,
            },
            {
              question: "Can an apple tree be grafted to a citrus rootstock?",
              options: [
                "No — they are unrelated families",
                "Yes — any plant can graft to any other",
                "Only in tropical climates",
                "Only with special glue",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "Nursery setup and growing media",
      content: [
        {
          type: "paragraph",
          text: "A nursery is a production system: input (seeds, cuttings), process (germination, rooting, hardening), and output (sellable plants). Even a small nursery needs clean water, shade structure, and pest management. Start small, perfect the process, then scale.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=Iv4VJqG9_Yc",
          caption: "Setting up a small-scale plant nursery.",
        },
        {
          type: "list",
          items: [
            "Shade structure: 50–70% shade cloth protects young plants from scorch.",
            "Growing media: mix peat, perlite, and vermiculite in equal parts for general use.",
            "Trays and pots: 84-cell trays for seedlings, 1 L pots for transplants.",
            "Irrigation: mist system for propagation area, drip for established plants.",
          ],
        },
        {
          type: "code",
          prompt: true,
          text: "nursery-setup-budget\n[shade]  50% shade cloth — 50 m²     $150\n[media]  peat + perlite + vermiculite  $80\n[trays]  84-cell trays × 50            $120\n[irrig]  mist nozzles + timer           $90\n[total]  starter kit                   $440",
        },
        {
          type: "quiz",
          title: "Nursery management",
          passPercent: 60,
          questions: [
            {
              question: "Recommended shade cloth percentage for young plants:",
              options: [
                "50–70%",
                "100%",
                "0%",
                "10%",
              ],
              answerIndex: 0,
            },
            {
              question: "A general-purpose growing media mix includes:",
              options: [
                "Peat, perlite, and vermiculite in equal parts",
                "Sand only",
                "Pure clay",
                "100% compost",
              ],
              answerIndex: 0,
            },
            {
              question: "Mist systems are best used in which nursery area?",
              options: [
                "Propagation area",
                "Parking lot",
                "Office",
                "Sales floor",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "Hardening off and transplanting",
      content: [
        {
          type: "paragraph",
          text: "Hardening off is the gradual transition from protected nursery conditions to field or garden conditions. Move plants outdoors for increasing periods over 7–14 days. Skip this step and you lose plants to transplant shock, wind damage, or sunburn.",
        },
        {
          type: "list",
          items: [
            "Day 1–3: 2 hours outdoors in full shade, return to shelter.",
            "Day 4–7: 4–6 hours with morning sun, shade in afternoon.",
            "Day 8–10: Full day outdoors, shelter only at night.",
            "Day 11–14: Leave outdoors overnight (if no frost risk).",
            "Transplant on a cloudy day or in the evening to reduce stress.",
          ],
        },
        {
          type: "note",
          tone: "warn",
          text: "Never transplant root-bound plants without loosening the root ball. Circling roots will continue to grow in a circle, strangling the plant.",
        },
        {
          type: "quiz",
          title: "Hardening off",
          passPercent: 60,
          questions: [
            {
              question: "How long does the hardening off process typically take?",
              options: [
                "7–14 days",
                "1 day",
                "3 months",
                "1 year",
              ],
              answerIndex: 0,
            },
            {
              question: "Best time to transplant into the field:",
              options: [
                "On a cloudy day or in the evening",
                "During midday sun",
                "In a heatwave",
                "During heavy rain",
              ],
              answerIndex: 0,
            },
            {
              question: "What happens if you skip hardening off?",
              options: [
                "Plants suffer transplant shock, wind damage, or sunburn",
                "Nothing — plants don't notice",
                "Plants grow faster",
                "Fruit quality improves",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
  ],
};
