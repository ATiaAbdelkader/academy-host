import type { CourseModule } from "./schema";

export type ExtraCourse = {
  title: string;
  description: string;
  category: string;
  duration: string;
  difficulty: string;
  priceCents: number;
  durationMinutes: number;
  order: number;
  instructor: string;
  instructorTitle: string;
  modules: CourseModule[];
};

export const extraCourse38: ExtraCourse = {
  title: "Livestock Nutrition & Feed Science",
  description:
    "Learn animal nutrition fundamentals, feed formulation, pasture management, and feeding strategies for cattle, poultry, goats, and pigs to optimize health and production.",
  category: "Livestock",
  duration: "6 weeks",
  difficulty: "Intermediate",
  priceCents: 0,
  durationMinutes: 1800,
  order: 38,
  instructor: "Dr. Feed Balance",
  instructorTitle: "Animal Nutritionist",
  modules: [
    {
      title: "Animal Nutrition Fundamentals",
      content: [
        { type: "heading", text: "The Science of Animal Feeding" },
        {
          type: "paragraph",
          text: "Animal nutrition is the science of feeding livestock to meet their physiological needs for maintenance, growth, reproduction, and production. Understanding nutrient requirements is the foundation of profitable livestock farming.",
        },
        {
          type: "list",
          items: [
            "Macronutrients: carbohydrates, proteins, and fats",
            "Micronutrients: vitamins and minerals",
            "Water requirements by species and production stage",
            "Energy metabolism and digestible energy",
            "Protein quality and amino acid profiles",
          ],
        },
        {
          type: "paragraph",
          text: "Each species and production stage has unique nutritional requirements. A lactating dairy cow needs far more energy than a dry cow, and a broiler chicken has different needs than a laying hen.",
        },
        {
          type: "quiz",
          title: "Nutrition Fundamentals",
          passPercent: 70,
          questions: [
            {
              question: "Which macronutrient provides the most energy per gram?",
              options: ["Protein", "Carbohydrates", "Fats", "Vitamins"],
              answerIndex: 2,
            },
            {
              question: "Why do lactating animals need higher energy diets?",
              options: [
                "They exercise more",
                "Milk production requires significant energy",
                "They eat less",
                "They absorb nutrients less efficiently",
              ],
              answerIndex: 1,
            },
          ],
        },
      ],
    },
    {
      title: "Feed Types & Quality Assessment",
      content: [
        { type: "heading", text: "Understanding Feed Ingredients" },
        {
          type: "paragraph",
          text: "Feed quality directly impacts animal health and productivity. Learning to assess, source, and store feed ingredients is essential for every livestock farmer.",
        },
        {
          type: "list",
          items: [
            "Concentrates: grains, oilseed meals, by-products",
            "Roughages: hay, silage, straw, pasture",
            "Mineral supplements and salt licks",
            "Feed testing and laboratory analysis",
            "Reading a feed tag and guaranteed analysis",
            "Storage and shelf life management",
          ],
        },
        {
          type: "code",
          text: `Feed Tag Analysis:\nCrude Protein (CP): minimum percentage\nCrude Fat: minimum percentage\nCrude Fiber: maximum percentage\n\nExample: A 20% CP cattle supplement means\nat least 20% of the feed is protein.`,
        },
        {
          type: "quiz",
          title: "Feed Quality Quiz",
          passPercent: 70,
          questions: [
            {
              question: "Which feed type is primarily used for ruminant animals?",
              options: ["Concentrates", "Roughages", "Mineral supplements", "Vitamins"],
              answerIndex: 1,
            },
            {
              question: "What does 'Crude Protein' on a feed tag represent?",
              options: [
                "The weight of the feed",
                "The minimum percentage of protein",
                "The maximum fiber content",
                "The energy value",
              ],
              answerIndex: 1,
            },
          ],
        },
      ],
    },
    {
      title: "Feed Formulation & Ration Balancing",
      content: [
        { type: "heading", text: "Creating Balanced Rations" },
        {
          type: "paragraph",
          text: "Feed formulation is the process of combining ingredients in the right proportions to meet an animal's nutritional requirements at the lowest cost. This is where economics meets nutrition science.",
        },
        {
          type: "list",
          items: [
            "Setting nutritional targets by species and stage",
            "Using Pearson Square for simple ration balancing",
            "Linear programming for cost minimization",
            "Feed mixing and total mixed rations (TMR)",
            "Adjusting rations seasonally based on forage quality",
          ],
        },
        {
          type: "code",
          text: `Pearson Square Example:\nTarget: 16% CP ration\n\nCorn (9% CP)  |  Soybean Meal (44% CP)\n           |           |\n           28 parts  |  7 parts\n           |           |\n           35 total parts\n\nCorn: 28/35 = 80%\nSBM: 7/35 = 20%`,
        },
        {
          type: "quiz",
          title: "Feed Formulation Quiz",
          passPercent: 70,
          questions: [
            {
              question: "What is a Total Mixed Ration (TMR)?",
              options: [
                "Feeding only one type of feed",
                "A ration mixed to provide uniform nutrition in every bite",
                "Feeding animals at total random",
                "A ration with only minerals",
              ],
              answerIndex: 1,
            },
            {
              question: "The Pearson Square method is used for:",
              options: [
                "Measuring animal weight",
                "Balancing simple two-ingredient rations",
                "Calculating feed costs",
                "Testing feed quality",
              ],
              answerIndex: 1,
            },
          ],
        },
      ],
    },
    {
      title: "Pasture Management & Grazing Systems",
      content: [
        { type: "heading", text: "Maximizing Pasture Productivity" },
        {
          type: "paragraph",
          text: "Good pasture management is the most cost-effective way to feed ruminant livestock. Proper grazing systems improve pasture productivity, soil health, and animal performance while reducing feed costs.",
        },
        {
          type: "list",
          items: [
            "Continuous vs. rotational grazing",
            "Management-intensive grazing (MIG)",
            "Rest periods and grazing height management",
            "Forage species selection and overseeding",
            "Stocking rate calculations",
            "Seasonal pasture management strategies",
          ],
        },
        {
          type: "paragraph",
          text: "Rotational grazing divides pastures into paddocks, moving animals frequently to fresh grass. This allows grazed areas to recover, maintaining higher forage quality and extending the grazing season.",
        },
        {
          type: "note",
          tone: "info",
          text: "Well-managed rotational grazing can increase pasture productivity by 30-70% compared to continuous grazing.",
        },
        {
          type: "quiz",
          title: "Pasture Management Quiz",
          passPercent: 70,
          questions: [
            {
              question: "What is the main advantage of rotational over continuous grazing?",
              options: [
                "Less fencing needed",
                "Pastures have time to recover and regrow",
                "Animals gain less weight",
                "It requires fewer animals",
              ],
              answerIndex: 1,
            },
            {
              question: "How much can rotational grazing increase pasture productivity?",
              options: ["5-10%", "10-20%", "30-70%", "100-200%"],
              answerIndex: 2,
            },
          ],
        },
      ],
    },
    {
      title: "Species-Specific Feeding Programs",
      content: [
        { type: "heading", text: "Feeding Cattle, Poultry, Goats, and Pigs" },
        {
          type: "paragraph",
          text: "Different livestock species have vastly different digestive systems and nutritional needs. This module covers practical feeding programs for the four most common farm animals.",
        },
        {
          type: "list",
          items: [
            "Cattle: rumen nutrition, creep feeding, finishing diets",
            "Poultry: starter-grower-finisher programs, layer nutrition",
            "Goats: browser nutrition, browse vs. pasture, seasonal needs",
            "Pigs: nursery through finishing, amino acid requirements",
            "Supplementation strategies for each species",
          ],
        },
        {
          type: "paragraph",
          text: "Ruminants (cattle, goats) can digest fiber thanks to rumen microorganisms, while monogastrics (pigs, poultry) need more easily digestible, energy-dense diets.",
        },
        {
          type: "quiz",
          title: "Species-Specific Feeding Quiz",
          passPercent: 70,
          questions: [
            {
              question: "What makes ruminants different from monogastrics in digestion?",
              options: [
                "They eat more",
                "They have a rumen with microorganisms that digest fiber",
                "They need less protein",
                "They don't need water",
              ],
              answerIndex: 1,
            },
            {
              question: "Poultry feeding programs typically follow which progression?",
              options: [
                "Finisher → Grower → Starter",
                "Layer → Broiler → Starter",
                "Starter → Grower → Finisher",
                "Hay → Grain → Finisher",
              ],
              answerIndex: 2,
            },
          ],
        },
      ],
    },
    {
      title: "Feed Costs & Economic Optimization",
      content: [
        { type: "heading", text: "Minimizing Feed Costs While Maximizing Returns" },
        {
          type: "paragraph",
          text: "Feed typically represents 60-70% of livestock production costs. Optimizing feed efficiency and cost is the single most impactful way to improve farm profitability.",
        },
        {
          type: "list",
          items: [
            "Feed cost per unit of gain calculation",
            "Feed conversion ratios by species",
            "Using by-products and alternative feeds",
            "Seasonal purchasing strategies",
            "On-farm feed production vs. purchasing",
            "Record-keeping for feed efficiency tracking",
          ],
        },
        {
          type: "code",
          text: `Feed Conversion Ratio (FCR):\nFCR = Feed Intake / Weight Gain\n\nExample:\n1000 lbs feed / 200 lbs gain = 5.0 FCR\n(lower is better)\n\nFeed Cost per Pound of Gain:\n$200 feed cost / 200 lbs gain = $1.00/lb`,
        },
        {
          type: "quiz",
          title: "Feed Economics Quiz",
          passPercent: 70,
          questions: [
            {
              question: "What percentage of livestock production costs do feed costs typically represent?",
              options: ["20-30%", "40-50%", "60-70%", "80-90%"],
              answerIndex: 2,
            },
            {
              question: "A lower Feed Conversion Ratio (FCR) means:",
              options: [
                "The animal is less efficient",
                "The animal is more efficient at converting feed to gain",
                "Feed costs are higher",
                "The animal eats less total feed",
              ],
              answerIndex: 1,
            },
          ],
        },
      ],
    },
  ],
};
