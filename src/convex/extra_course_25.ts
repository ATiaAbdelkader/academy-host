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

/**
 * Course 25: Organic Agriculture Practices
 * Based on SAGE (Sustainable Agriculture Education Association) modules
 * Source: sustainableaged.org/teaching-resources/
 */

export const extraCourse25: ExtraCourse = {
  title: "Organic Agriculture Practices",
  description:
    "Master certified organic farming methods from history and philosophy to practical techniques for soil fertility, pest management, livestock integration, marketing, and organic certification. Based on USDA-funded SAGE teaching modules.",
  category: "Sustainable Agriculture",
  priceCents: 0,
  durationMinutes: 360,
  order: 25,
  instructor: "Dr. Amara Osei",
  instructorTitle: "Senior Agronomist",
  modules: [
    {
      title: "History & Philosophy of Organic Agriculture",
      content: [
        {
          type: "paragraph",
          text: "Modern organic agriculture traces to Sir Albert Howard's 'An Agricultural Testament' (1943), which documented traditional Indian farming practices emphasizing composting, crop rotation, and biological diversity. In the US, J.I. Rodale founded the Rodale Institute in 1947, pioneering organic research and popularizing the term 'organic' for chemical-free farming.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=6l4JPsCUWug",
          caption: "The history and philosophy of organic farming movements.",
        },
        {
          type: "list",
          items: [
            "The four pillars: Health, Ecology, Fairness, and Care.",
            "Organic farming emphasizes soil health and biological fertility over synthetic inputs.",
            "Required crop rotations and restricted non-organic inputs.",
            "Annual certification and inspection by USDA-accredited agents.",
          ],
        },
        {
          type: "note",
          tone: "info",
          text: "Organic farming differs from conventional in: no synthetic pesticides or fertilizers, emphasis on soil biology, required crop rotations, and annual certification.",
        },
        {
          type: "quiz",
          title: "Organic History & Philosophy",
          passPercent: 60,
          questions: [
            {
              question: "Who wrote 'An Agricultural Testament', the foundational text of modern organic farming?",
              options: [
                "J.I. Rodale",
                "Sir Albert Howard",
                "Rudolf Steiner",
                "Masanobu Fukuoka",
              ],
              answerIndex: 1,
            },
            {
              question: "Which of these is NOT one of the four pillars of organic agriculture?",
              options: ["Health", "Ecology", "Profit", "Fairness"],
              answerIndex: 2,
            },
            {
              question: "What is required annually for organic certification?",
              options: [
                "A written exam",
                "Inspection and documentation review",
                "A farm redesign",
                "Soil replacement",
              ],
              answerIndex: 1,
            },
          ],
        },
      ],
    },
    {
      title: "Organic Soil Fertility Management",
      content: [
        {
          type: "paragraph",
          text: "Healthy soil is a living ecosystem containing billions of microorganisms per gram. A teaspoon of healthy soil contains more bacteria than people on Earth. These organisms cycle nutrients, decompose organic matter, form soil aggregates, and suppress diseases. Organic farming focuses on feeding the soil biology rather than directly feeding plants.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=aXY7UiiWVuY",
          caption: "Building soil fertility through composting, cover cropping, and biological methods.",
        },
        {
          type: "paragraph",
          text: "Organic fertility starts with compost: (1) Hot composting (130-160°F) — fast decomposition that kills weed seeds; (2) Cold composting — slower but less labor-intensive; (3) Vermicomposting — worm castings are the richest organic fertilizer; (4) Bokashi — anaerobic fermentation of kitchen scraps. Cover crops protect and improve soil between seasons.",
        },
        {
          type: "list",
          items: [
            "Legumes (clover, vetch) fix atmospheric nitrogen — 50-200 lbs/acre.",
            "Grasses (rye, oats) add organic matter and suppress weeds.",
            "Hot composting at 130-160°F kills weed seeds and pathogens.",
            "Mycorrhizal fungi networks extend root nutrient access.",
          ],
        },
        {
          type: "quiz",
          title: "Organic Soil Fertility",
          passPercent: 60,
          questions: [
            {
              question: "What temperature range is required for hot composting to kill weed seeds?",
              options: ["80-100°F", "100-120°F", "130-160°F", "200°F+"],
              answerIndex: 2,
            },
            {
              question: "Which cover crop family fixes atmospheric nitrogen?",
              options: [
                "Grasses (rye, oats)",
                "Brassicas (mustard, radish)",
                "Legumes (clover, vetch)",
                "All cover crops fix nitrogen",
              ],
              answerIndex: 2,
            },
            {
              question: "Why is vermicomposting valued in organic farming?",
              options: [
                "It's the fastest composting method",
                "Worm castings are the richest organic fertilizer",
                "It requires no maintenance",
                "It only works indoors",
              ],
              answerIndex: 1,
            },
          ],
        },
      ],
    },
    {
      title: "Organic Seed Selection & Saving",
      content: [
        {
          type: "paragraph",
          text: "Certified organic farms must use organic seeds when commercially available (USDA NOP requirement). Heirloom varieties (typically 50+ years old) are open-pollinated and breed true from seed, making them ideal for seed saving. Hybrids (F1) don't breed true — offspring revert to parent types.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=E7CwqNHn_Ns",
          caption: "Seed saving techniques for organic farms — dry seeds, wet seeds, and storage.",
        },
        {
          type: "paragraph",
          text: "Different crops require different seed saving methods: (1) Dry seeds (beans, peas, lettuce) — allow pods to dry on plant, then thresh and winnow; (2) Wet seeds (tomatoes, cucumbers) — ferment in water for 2-3 days to remove gel coating; (3) Root crops — overwinter plants for second-year seed production. Store seeds in cool, dark, dry conditions (35-50°F).",
        },
        {
          type: "list",
          items: [
            "Always save from your best, healthiest plants.",
            "Store seeds in airtight containers at 35-50°F.",
            "Most vegetable seeds remain viable 2-5 years.",
            "Tomato seeds must be fermented to remove germination inhibitors.",
          ],
        },
        {
          type: "quiz",
          title: "Organic Seed Selection & Saving",
          passPercent: 60,
          questions: [
            {
              question: "Why can't you save seeds from hybrid (F1) varieties?",
              options: [
                "They don't produce seeds",
                "They don't breed true — offspring revert to parent types",
                "Hybrid seeds are sterile",
                "It's illegal",
              ],
              answerIndex: 1,
            },
            {
              question: "How should you store seeds for maximum viability?",
              options: [
                "In a warm, sunny location",
                "In airtight containers in cool, dark, dry conditions",
                "In the refrigerator with water",
                "In paper bags at room temperature",
              ],
              answerIndex: 1,
            },
            {
              question: "When saving tomato seeds, why must you ferment them first?",
              options: [
                "To kill bacteria",
                "To remove the gel coating that contains germination inhibitors",
                "To change their color",
                "To make them grow faster",
              ],
              answerIndex: 1,
            },
          ],
        },
      ],
    },
    {
      title: "Organic Pest & Disease Management",
      content: [
        {
          type: "paragraph",
          text: "OMRI-listed (Organic Materials Review Institute) pest controls include: (1) Neem oil — disrupts insect feeding and reproduction; (2) Pyrethrin — derived from chrysanthemums; (3) Bacillus thuringiensis (Bt) — targets caterpillars; (4) Insecticidal soap — disrupts soft-bodied insect cell membranes; (5) Diatomaceous earth — damages insect exoskeletons.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=tGBcrGHJjLc",
          caption: "Organic pest control — biological, cultural, and botanical methods.",
        },
        {
          type: "paragraph",
          text: "Organic farms leverage natural enemies: release ladybugs for aphid control, attract parasitic wasps with flowering borders, use predatory mites for spider mite control, encourage ground beetles with mulch. Prevention through interplanting, trap cropping, and timing to avoid peak pest periods is the first line of defense.",
        },
        {
          type: "list",
          items: [
            "Bt (Bacillus thuringiensis) specifically targets caterpillars.",
            "Interplanting mixes crops to confuse pests.",
            "Resistant varieties are the first and best defense against disease.",
            "Copper and sulfur sprays are approved for organic disease control.",
          ],
        },
        {
          type: "quiz",
          title: "Organic Pest & Disease Management",
          passPercent: 60,
          questions: [
            {
              question: "What does OMRI stand for in organic pest control?",
              options: [
                "Organic Material Research Institute",
                "Organic Materials Review Institute",
                "Organic Management and Regulation International",
                "Open Market Research Institute",
              ],
              answerIndex: 1,
            },
            {
              question: "Which organic pest control specifically targets caterpillars?",
              options: [
                "Neem oil",
                "Diatomaceous earth",
                "Bacillus thuringiensis (Bt)",
                "Insecticidal soap",
              ],
              answerIndex: 2,
            },
            {
              question: "What is the first line of defense in organic pest management?",
              options: [
                "Chemical sprays",
                "Biological control",
                "Prevention through resistant varieties and cultural practices",
                "Physical barriers",
              ],
              answerIndex: 2,
            },
          ],
        },
      ],
    },
    {
      title: "Organic Marketing & Premium Pricing",
      content: [
        {
          type: "paragraph",
          text: "The organic food market has grown 10-15% annually for two decades. Consumers pay 20-100% premiums for certified organic products. Key market drivers include health concerns, environmental awareness, food safety, and taste preferences.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=Z-zNHHpXoMM",
          caption: "Marketing organic products — direct-to-consumer channels and brand building.",
        },
        {
          type: "paragraph",
          text: "Organic farms maximize profits through direct sales: (1) Farmers markets — highest margins, direct customer relationships; (2) CSA (Community Supported Agriculture) — upfront payments guarantee cash flow; (3) Farm stands — low overhead; (4) Online sales — expanding reach; (5) Restaurant partnerships — consistent bulk orders. Tell your farming story to build trust.",
        },
        {
          type: "list",
          items: [
            "Farmers markets typically offer the highest margins.",
            "CSA subscriptions provide guaranteed upfront cash flow.",
            "Consumers pay 20-100% premiums for certified organic.",
            "Don't underprice — premium prices signal quality.",
          ],
        },
        {
          type: "quiz",
          title: "Organic Marketing",
          passPercent: 60,
          questions: [
            {
              question: "What is a CSA in organic farming?",
              options: [
                "Certified Sustainable Agriculture",
                "Community Supported Agriculture",
                "Commercial Soil Amendment",
                "Certified Seed Association",
              ],
              answerIndex: 1,
            },
            {
              question: "What premium do consumers typically pay for certified organic?",
              options: ["5-10%", "20-100%", "200-300%", "No premium"],
              answerIndex: 1,
            },
            {
              question: "Which channel typically offers the highest margins?",
              options: [
                "Wholesale to grocery stores",
                "Farmers markets",
                "Export sales",
                "Online marketplaces",
              ],
              answerIndex: 1,
            },
          ],
        },
      ],
    },
    {
      title: "Organic Certification Process",
      content: [
        {
          type: "paragraph",
          text: "The USDA NOP establishes standards for organic production, handling, and labeling. To use the 'USDA Organic' seal, farms must be certified by a USDA-accredited certifying agent. The process involves an organic system plan, annual inspections, and detailed record-keeping.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=eVajQPuRmk8",
          caption: "Navigating the organic certification process — from application to approval.",
        },
        {
          type: "paragraph",
          text: "Steps to certification: (1) Develop an Organic System Plan (OSP); (2) Submit application to a USDA-accredited certifier; (3) Pay application and inspection fees ($500-2,000/year); (4) Undergo annual on-site inspection; (5) Review and approval — typically 3-6 months. New farms must undergo a 3-year transition period before products can be sold as certified organic.",
        },
        {
          type: "list",
          items: [
            "The transition period is 3 years before organic certification.",
            "Records must be retained for 5 years.",
            "Annual inspection by a USDA-accredited certifying agent.",
            "All inputs must be OMRI-listed or approved.",
          ],
        },
        {
          type: "note",
          tone: "warn",
          text: "During the 3-year transition period, farms follow all organic practices but cannot sell products as certified organic. Some states offer transitional organic labels.",
        },
        {
          type: "quiz",
          title: "Organic Certification",
          passPercent: 60,
          questions: [
            {
              question: "How long is the transition period before organic certification?",
              options: ["1 year", "2 years", "3 years", "5 years"],
              answerIndex: 2,
            },
            {
              question: "How long must organic farms retain their records?",
              options: ["1 year", "3 years", "5 years", "10 years"],
              answerIndex: 2,
            },
            {
              question: "What is an Organic System Plan (OSP)?",
              options: [
                "A computer software for organic farms",
                "A written description of organic practices, inputs, and monitoring",
                "A blueprint for farm buildings",
                "A marketing plan for organic products",
              ],
              answerIndex: 1,
            },
          ],
        },
      ],
    },
  ],
};
