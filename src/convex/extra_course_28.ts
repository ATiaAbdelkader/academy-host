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
 * Course 28: Sustainable Pest Management
 * Based on SAGE teaching modules and OpenSourceAgriculture resources
 */

export const extraCourse28: ExtraCourse = {
  title: "Sustainable Pest Management",
  description:
    "Master integrated pest management using biological controls, cultural practices, and targeted treatments to minimize environmental impact.",
  category: "Plant Health",
  priceCents: 0,
  durationMinutes: 360,
  order: 28,
  instructor: "Dr. Amara Osei",
  instructorTitle: "Senior Agronomist",
  modules: [
    {
      title: "Pest Identification & Monitoring",
      content: [
        {
          type: "paragraph",
          text: "Agricultural pests fall into categories: (1) Chewing insects — caterpillars, beetles, grasshoppers; (2) Sucking insects — aphids, whiteflies, thrips; (3) Soil pests — root maggots, wireworms, nematodes; (4) Stored product pests — grain weevils, moths; (5) Vertebrate pests — birds, rodents, deer.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=aXY7UiiWVuY",
          caption: "Pest identification and scouting techniques for integrated management.",
        },
        {
          type: "paragraph",
          text: "Effective scouting: walk field patterns (W, X, or zigzag), check 5-10 plants per stop, use sweep nets for flying insects, deploy sticky traps, scout 2-3 times weekly. Use economic thresholds — the pest density at which action should be taken to prevent economic damage. Treating below the threshold wastes money and disrupts beneficial insects.",
        },
        {
          type: "list",
          items: [
            "Scout 2-3 times weekly during the growing season.",
            "Check both upper and lower leaf surfaces.",
            "Economic threshold is the pest density requiring action.",
            "Treating below the threshold wastes money and harms beneficials.",
          ],
        },
        {
          type: "quiz",
          title: "Pest Identification",
          passPercent: 60,
          questions: [
            {
              question: "What is the economic threshold in pest management?",
              options: [
                "The maximum number of pests allowed by law",
                "The pest density at which action should be taken to prevent economic damage",
                "The point where all plants are destroyed",
                "The number of beneficial insects needed",
              ],
              answerIndex: 1,
            },
            {
              question: "Which pests suck plant sap rather than chewing tissue?",
              options: [
                "Caterpillars and beetles",
                "Aphids, whiteflies, and thrips",
                "Grasshoppers and locusts",
                "Root maggots and wireworms",
              ],
              answerIndex: 1,
            },
            {
              question: "How often should you scout fields during the growing season?",
              options: [
                "Once a month",
                "Once a week",
                "2-3 times weekly",
                "Only when damage is visible",
              ],
              answerIndex: 2,
            },
          ],
        },
      ],
    },
    {
      title: "Biological Control Methods",
      content: [
        {
          type: "paragraph",
          text: "Biological control uses living organisms to suppress pests: (1) Classical — introduce natural enemies from pest's native range; (2) Augmentative — release mass-reared natural enemies; (3) Conservation — enhance existing natural enemy populations through habitat management.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=tGBcrGHJjLc",
          caption: "Biological control — predators, parasitoids, and microbial agents.",
        },
        {
          type: "paragraph",
          text: "Key beneficial insects: Ladybugs — each larva consumes 400+ aphids; Lacewings — larvae eat aphids, thrips, and small caterpillars; Parasitic wasps — lay eggs inside pest insects; Predatory mites — control spider mite populations. Microbial agents: Bt targets caterpillars; Beauveria bassiana infects whiteflies and beetles; Trichoderma suppresses soil pathogens.",
        },
        {
          type: "list",
          items: [
            "A single ladybug larva consumes 400+ aphids during development.",
            "Bt (Bacillus thuringiensis) specifically targets caterpillars.",
            "Plant flowering borders to attract beneficial insects.",
            "Don't aim for zero pests — beneficials need food sources.",
          ],
        },
        {
          type: "quiz",
          title: "Biological Control",
          passPercent: 60,
          questions: [
            {
              question: "How many aphids can a single ladybug larva consume?",
              options: ["10-50", "100-200", "400+", "1,000+"],
              answerIndex: 2,
            },
            {
              question: "What does Bacillus thuringiensis (Bt) target?",
              options: [
                "All insects equally",
                "Aphids and whiteflies specifically",
                "Caterpillars, mosquito larvae, and beetle larvae",
                "Weeds and plant pathogens",
              ],
              answerIndex: 2,
            },
            {
              question: "Why shouldn't you aim for zero pests in your field?",
              options: [
                "It's impossible to achieve",
                "Zero pests means no food for beneficial insects, causing their populations to crash",
                "Pests are required for pollination",
                "Pest-free fields attract more pests",
              ],
              answerIndex: 1,
            },
          ],
        },
      ],
    },
    {
      title: "Cultural Control Practices",
      content: [
        {
          type: "paragraph",
          text: "Crop rotation disrupts pest cycles: many pests are host-specific, so rotating to non-host crops starves them. Corn rootworm larvae hatch expecting corn roots but find soybeans instead. Potato cyst nematode populations decline with 3-4 year rotations. Plan rotations to alternate plant families, not just crops.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=eVajQPuRmk8",
          caption: "Cultural control — rotation, sanitation, timing, and physical barriers.",
        },
        {
          type: "paragraph",
          text: "Physical barriers and methods: (1) Row covers — floating fabric excludes flying insects; (2) Netting — protects fruit from birds and insects; (3) Copper tape — deters slugs and snails; (4) Sticky traps — monitor and reduce flying pests; (5) Water sprays — dislodge aphids and spider mites; (6) Hand-picking — effective for large, visible pests.",
        },
        {
          type: "list",
          items: [
            "Crop rotation breaks pest cycles by starving host-specific pests.",
            "Resistant varieties are the most effective cultural control.",
            "Row covers exclude flying insects without chemicals.",
            "Trap crops divert pests from the main cash crop.",
          ],
        },
        {
          type: "quiz",
          title: "Cultural Control",
          passPercent: 60,
          questions: [
            {
              question: "Why is crop rotation effective against corn rootworm?",
              options: [
                "It adds nutrients to the soil",
                "It changes the soil pH",
                "Larvae hatch expecting corn roots but find non-host crops instead",
                "It attracts more beneficial insects",
              ],
              answerIndex: 2,
            },
            {
              question: "What is the most effective cultural control method?",
              options: [
                "Hand-picking pests",
                "Using row covers",
                "Planting resistant varieties",
                "Spraying water on plants",
              ],
              answerIndex: 2,
            },
            {
              question: "How do trap crops work?",
              options: [
                "They poison pests",
                "They attract pests away from the main crop",
                "They repel all insects",
                "They attract beneficial insects only",
              ],
              answerIndex: 1,
            },
          ],
        },
      ],
    },
    {
      title: "Botanical & Organic Pesticides",
      content: [
        {
          type: "paragraph",
          text: "Plant-derived pesticides: (1) Pyrethrin — from chrysanthemums, quick knockdown but breaks down rapidly in sunlight; (2) Neem oil — disrupts insect feeding, growth, and reproduction; (3) Capsaicin — from hot peppers, deters mammals and some insects; (4) Garlic spray — repellent properties against many pests.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=Z-zNHHpXoMM",
          caption: "Botanical and mineral-based organic pesticides — responsible use.",
        },
        {
          type: "paragraph",
          text: "Mineral-derived options: Diatomaceous earth damages insect exoskeletons causing dehydration; Kaolin clay deters feeding and egg-laying; Sulfur is a fungicide and mite control; Copper is a broad-spectrum fungicide/bactericide. Even organic pesticides require responsibility: target specific pests, apply when beneficials are least active, follow label rates, and rotate chemical classes.",
        },
        {
          type: "list",
          items: [
            "Diatomaceous earth damages insect exoskeletons, causing dehydration.",
            "Even organic pesticides require responsible use.",
            "Avoid broad-spectrum pesticides that kill beneficial insects.",
            "Rotate chemical classes to prevent pest resistance.",
          ],
        },
        {
          type: "quiz",
          title: "Organic Pesticides",
          passPercent: 60,
          questions: [
            {
              question: "What makes diatomaceous earth effective against insects?",
              options: [
                "It's toxic when eaten",
                "It damages insect exoskeletons, causing dehydration",
                "It attracts beneficial insects",
                "It repels insects with smell",
              ],
              answerIndex: 1,
            },
            {
              question: "Why should broad-spectrum pesticides be avoided when possible?",
              options: [
                "They're too expensive",
                "They kill beneficial insects along with pests",
                "They don't work well",
                "They're illegal",
              ],
              answerIndex: 1,
            },
            {
              question: "What does OMRI certification mean for a pesticide?",
              options: [
                "It's the strongest pesticide available",
                "It's approved for use in organic farming systems",
                "It's made from organic food waste",
                "It's safe enough to drink",
              ],
              answerIndex: 1,
            },
          ],
        },
      ],
    },
    {
      title: "Pest Resistance Management",
      content: [
        {
          type: "paragraph",
          text: "Resistance evolves through natural selection: pesticide application kills susceptible individuals, resistant survivors reproduce, and over 5-50 generations, resistant genes become dominant. Delay resistance by rotating chemical classes, using pesticides only at economic thresholds, applying full recommended rates, and using refuges (untreated areas).",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=RLSwj690Tgc",
          caption: "Preventing pest resistance through integrated strategies.",
        },
        {
          type: "paragraph",
          text: "Refuges are untreated areas where susceptible pests survive and mate with resistant individuals from treated areas, diluting resistance genes. Pyramiding multiple Bt genes in crops delays resistance. Even biological control can face resistance — some pests evolve tolerance to Bt toxins. Monitor for reduced efficacy and keep detailed records of all treatments and outcomes.",
        },
        {
          type: "list",
          items: [
            "Resistance can develop in 5-50 pest generations.",
            "Refuges maintain susceptible pest populations to dilute resistance.",
            "Apply full recommended rates — sub-lethal doses accelerate resistance.",
            "Rotate chemical classes with different modes of action.",
          ],
        },
        {
          type: "quiz",
          title: "Resistance Management",
          passPercent: 60,
          questions: [
            {
              question: "How quickly can pesticide resistance develop?",
              options: [
                "Never",
                "In 5-50 pest generations",
                "Only after 100 years of use",
                "Only in laboratory settings",
              ],
              answerIndex: 1,
            },
            {
              question: "What is a 'refuge' in resistance management?",
              options: [
                "A greenhouse for beneficial insects",
                "An untreated area where susceptible pests survive and reproduce",
                "A storage area for pesticides",
                "A protected area for endangered species",
              ],
              answerIndex: 1,
            },
            {
              question: "Why should full pesticide rates be applied?",
              options: [
                "To kill pests faster",
                "Sub-lethal doses accelerate resistance development",
                "It's required by law only",
                "To save money",
              ],
              answerIndex: 1,
            },
          ],
        },
      ],
    },
    {
      title: "Integrated Pest Management (IPM) Implementation",
      content: [
        {
          type: "paragraph",
          text: "A complete IPM plan includes: pest identification guide, monitoring protocols, economic thresholds, cultural prevention practices, biological control options, chemical control guidelines (last resort), record-keeping systems, and a review schedule. IPM typically reduces pesticide costs by 50-70% compared to calendar-based spraying.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=LP2K7tVXzYg",
          caption: "Building a comprehensive IPM program for your farm.",
        },
        {
          type: "paragraph",
          text: "IPM decision process: (1) Scout and identify — what pest is present? (2) Assess damage level — is it above economic threshold? (3) Evaluate natural enemies — are beneficials already controlling it? (4) Consider cultural options — can timing changes help? (5) Select targeted control — least disruptive option; (6) Monitor results. Chemical pesticides are a last resort, used only after other options are evaluated.",
        },
        {
          type: "list",
          items: [
            "IPM reduces pesticide costs by 50-70%.",
            "Chemical pesticides are a last resort in IPM.",
            "First step: always scout and properly identify the pest.",
            "IPM preserves beneficial insect populations for free pest control.",
          ],
        },
        {
          type: "quiz",
          title: "IPM Implementation",
          passPercent: 60,
          questions: [
            {
              question: "In an IPM program, when should chemical pesticides be considered?",
              options: [
                "As the first option",
                "Only after cultural and biological controls have been evaluated",
                "Only during emergencies",
                "Never",
              ],
              answerIndex: 1,
            },
            {
              question: "How much can IPM reduce pesticide costs?",
              options: ["10-20%", "50-70%", "90-100%", "No reduction"],
              answerIndex: 1,
            },
            {
              question: "What is the first step in the IPM decision process?",
              options: [
                "Apply pesticide",
                "Scout and identify the pest",
                "Call an extension agent",
                "Remove all plants",
              ],
              answerIndex: 1,
            },
          ],
        },
      ],
    },
  ],
};
