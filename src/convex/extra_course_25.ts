/**
 * Course 25: Organic Agriculture Practices
 * Based on SAGE (Sustainable Agriculture Education Association) modules
 * Source: sustainableaged.org/teaching-resources/
 * Covers organic history, seed, pest management, livestock, marketing, certification
 */

export const extraCourse25 = {
  title: "Organic Agriculture Practices",
  slug: "organic-agriculture-practices",
  description:
    "Master certified organic farming methods from history and philosophy to practical techniques for soil fertility, pest management, livestock integration, marketing, and organic certification. Based on USDA-funded SAGE teaching modules.",
  category: "Sustainable Agriculture",
  priceCents: 0,
  durationMinutes: 360,
  published: true,
  order: 25,
  modules: [
    {
      title: "History & Philosophy of Organic Agriculture",
      description:
        "Trace the origins of organic farming from Sir Albert Howard's foundational work to modern certification systems and the organic movement's core principles.",
      contentBlocks: [
        {
          type: "heading" as const,
          content: "Origins of the Organic Movement",
        },
        {
          type: "paragraph" as const,
          content:
            "Modern organic agriculture traces to Sir Albert Howard's 'An Agricultural Testament' (1943), which documented traditional Indian farming practices emphasizing composting, crop rotation, and biological diversity. In the US, J.I. Rodale founded the Rodale Institute in 1947, pioneering organic research and popularizing the term 'organic' for chemical-free farming.",
        },
        {
          type: "heading" as const,
          content: "Core Principles of Organic Agriculture",
        },
        {
          type: "paragraph" as const,
          content:
            "The four pillars of organic farming: (1) Health — soil, plant, animal, and human health are interconnected; (2) Ecology — work with natural cycles and local ecosystems; (3) Fairness — equitable relationships for all stakeholders; (4) Care — precautionary approach to new technologies. These principles guide every decision on an organic farm.",
        },
        {
          type: "heading" as const,
          content: "Organic vs Conventional: The Key Differences",
        },
        {
          type: "paragraph" as const,
          content:
            "Organic farming differs from conventional in: (1) No synthetic pesticides or fertilizers; (2) Emphasis on soil health and biological fertility; (3) Required crop rotations; (4) Restricted non-organic inputs; (5) Annual certification and inspection; (6) Higher prices but potentially lower yields. The goal is sustainable production that maintains long-term soil productivity.",
        },
        {
          type: "quiz" as const,
          quiz: {
            title: "Organic History & Philosophy",
            questions: [
              {
                question: "Who wrote 'An Agricultural Testament', considered the foundational text of modern organic farming?",
                options: [
                  "J.I. Rodale",
                  "Sir Albert Howard",
                  "Rudolf Steiner",
                  "Masanobu Fukuoka",
                ],
                correctIndex: 1,
                explanation:
                  "Sir Albert Howard's 'An Agricultural Testament' (1943) documented traditional composting and biological farming practices, becoming the foundational text of the modern organic movement.",
              },
              {
                question: "Which of these is NOT one of the four pillars of organic agriculture?",
                options: [
                  "Health",
                  "Ecology",
                  "Profit",
                  "Fairness",
                ],
                correctIndex: 2,
                explanation:
                  "The four pillars are Health, Ecology, Fairness, and Care. While profitability is important for farm viability, it is not one of the philosophical pillars.",
              },
              {
                question: "What is required annually for organic certification?",
                options: [
                  "A written exam",
                  "Inspection and documentation review",
                  "A farm redesign",
                  "Soil replacement",
                ],
                correctIndex: 1,
                explanation:
                  "Organic certification requires annual inspection by a USDA-accredited certifying agent, along with detailed documentation of all inputs and practices.",
              },
            ],
          },
        },
      ],
    },
    {
      title: "Organic Soil Fertility Management",
      description:
        "Build soil health through composting, cover cropping, green manures, and biological fertility without synthetic fertilizers.",
      contentBlocks: [
        {
          type: "heading" as const,
          content: "The Living Soil",
        },
        {
          type: "paragraph" as const,
          content:
            "Healthy soil is a living ecosystem containing billions of microorganisms per gram. A teaspoon of healthy soil contains more bacteria than people on Earth. These organisms cycle nutrients, decompose organic matter, form soil aggregates, and suppress diseases. Organic farming focuses on feeding the soil biology rather than directly feeding plants.",
        },
        {
          type: "heading" as const,
          content: "Composting Methods",
        },
        {
          type: "paragraph" as const,
          content:
            "Organic fertility starts with compost: (1) Hot composting (130-160°F) — fast decomposition that kills weed seeds and pathogens; (2) Cold composting — slower but less labor-intensive; (3) Vermicomposting — using red wigglers to produce worm castings, the richest organic fertilizer; (4) Bokashi — anaerobic fermentation of kitchen scraps. Each method produces different nutrient profiles.",
        },
        {
          type: "heading" as const,
          content: "Cover Cropping and Green Manures",
        },
        {
          type: "paragraph" as const,
            content:
              "Cover crops protect and improve soil between cash crop seasons: (1) Legumes (clover, vetch, peas) fix atmospheric nitrogen; (2) Grasses (rye, oats, barley) add organic matter and suppress weeds; (3) Brassicas (mustard, radish) break up compacted soil; (4) Mixtures combine multiple benefits. Terminated cover crops release nutrients slowly as they decompose.",
        },
        {
          type: "heading" as const,
          content: "Nutrient Cycling on the Organic Farm",
        },
        {
          type: "paragraph" as const,
          content:
            "Organic farms cycle nutrients through: (1) Crop residues returning to soil; (2) Compost from livestock and crop waste; (3) Cover crop decomposition; (4) Mycorrhizal fungi networks extending root nutrient access; (5) Mineral amendments (rock phosphate, kelp, lime) for specific deficiencies. The goal is a closed-loop system where nutrients cycle continuously.",
        },
        {
          type: "quiz" as const,
          quiz: {
            title: "Organic Soil Fertility",
            questions: [
              {
                question: "What temperature range is required for hot composting to kill weed seeds?",
                options: [
                  "80-100°F",
                  "100-120°F",
                  "130-160°F",
                  "200°F+",
                ],
                correctIndex: 2,
                explanation:
                  "Hot composting requires temperatures of 130-160°F (55-70°C) sustained for several days to effectively kill weed seeds, pathogens, and harmful bacteria.",
              },
              {
                question: "Which cover crop family fixes atmospheric nitrogen?",
                options: [
                  "Grasses (rye, oats)",
                  "Brassicas (mustard, radish)",
                  "Legumes (clover, vetch)",
                  "All cover crops fix nitrogen",
                ],
                correctIndex: 2,
                explanation:
                  "Legumes host Rhizobium bacteria in root nodules that convert atmospheric nitrogen into plant-available forms, adding 50-200 lbs of N per acre.",
              },
              {
                question: "Why is vermicomposting valued in organic farming?",
                options: [
                  "It's the fastest composting method",
                  "Worm castings are the richest organic fertilizer",
                  "It requires no maintenance",
                  "It only works indoors",
                ],
                correctIndex: 1,
                explanation:
                  "Vermicompost (worm castings) is considered the richest organic fertilizer, containing high levels of beneficial microbes, plant growth hormones, and available nutrients.",
              },
            ],
          },
        },
      ],
    },
    {
      title: "Organic Seed Selection & Saving",
      description:
        "Learn about organic seed sources, heirloom varieties, and the art and science of saving seeds for future planting seasons.",
      contentBlocks: [
        {
          type: "heading" as const,
          content: "Organic Seed Requirements",
        },
        {
          type: "paragraph" as const,
          content:
            "Certified organic farms must use organic seeds when commercially available (USDA NOP requirement). Organic seeds are produced without synthetic pesticides or fertilizers. Sources include: (1) Specialized organic seed companies (Johnny's, High Mounding, Seed Savers Exchange); (2) On-farm seed saving; (3) Seed libraries and swaps.",
        },
        {
          type: "heading" as const,
          content: "Heirloom vs Open-Pollinated vs Hybrid",
        },
        {
          type: "paragraph" as const,
          content:
            "Heirloom varieties (typically 50+ years old) are open-pollinated, meaning they breed true from seed. This makes them ideal for seed saving. Hybrids (F1) don't breed true — offspring revert to parent types. For organic seed saving, stick with open-pollinated and heirloom varieties.",
        },
        {
          type: "heading" as const,
          content: "Seed Saving Techniques",
        },
        {
          type: "paragraph" as const,
          content:
            "Different crops require different seed saving methods: (1) Dry seeds (beans, peas, lettuce) — allow pods to dry on plant, then thresh and winnow; (2) Wet seeds (tomatoes, cucumbers) — ferment in water for 2-3 days to remove gel coating, then dry; (3) Root crops (carrots, beets) — overwinter plants, allow second-year flowering and seed production. Always save from your best, healthiest plants.",
        },
        {
          type: "heading" as const,
          content: "Seed Storage and Viability",
        },
        {
          type: "paragraph" as const,
          content:
            "Proper storage extends seed life: (1) Dry seeds thoroughly before storage (below 8% moisture); (2) Store in cool, dark, dry conditions (35-50°F ideal); (3) Use airtight containers with desiccant; (4) Label with variety and date. Most vegetable seeds remain viable 2-5 years; onion and parsnip seeds 1 year maximum.",
        },
        {
          type: "quiz" as const,
          quiz: {
            title: "Organic Seed Selection & Saving",
            questions: [
              {
                question: "Why can't you save seeds from hybrid (F1) varieties?",
                options: [
                  "They don't produce seeds",
                  "They don't breed true — offspring revert to parent types",
                  "Hybrid seeds are sterile",
                  "It's illegal",
                ],
                correctIndex: 1,
                explanation:
                  "F1 hybrid seeds don't breed true because their offspring segregate into different genetic combinations, producing plants with unpredictable traits.",
              },
              {
                question: "How should you store seeds for maximum viability?",
                options: [
                  "In a warm, sunny location",
                  "In airtight containers in cool, dark, dry conditions",
                  "In the refrigerator with water",
                  "In paper bags at room temperature",
                ],
                correctIndex: 1,
                explanation:
                  "Seeds should be stored in airtight containers in cool (35-50°F), dark, dry conditions to minimize metabolic activity and maintain viability.",
              },
              {
                question: "When saving tomato seeds, why must you ferment them first?",
                options: [
                  "To kill bacteria",
                  "To remove the gel coating that contains germination inhibitors",
                  "To change their color",
                  "To make them grow faster",
                ],
                correctIndex: 1,
                explanation:
                  "Tomato seeds are embedded in a gel that contains germination inhibitors. Fermentation breaks down this gel and also kills seed-borne diseases.",
              },
            ],
          },
        },
      ],
    },
    {
      title: "Organic Pest & Disease Management",
      description:
        "Manage pests and diseases using organic-approved methods including biological control, botanical pesticides, and cultural practices.",
      contentBlocks: [
        {
          type: "heading" as const,
          content: "Organic-Approved Pest Controls",
        },
        {
          type: "paragraph" as const,
          content:
            "OMRI-listed (Organic Materials Review Institute) pest controls include: (1) Neem oil — disrupts insect feeding and reproduction; (2) Pyrethrin — derived from chrysanthemums, kills insects on contact; (3) Bacillus thuringiensis (Bt) — targets caterpillars specifically; (4) Insecticidal soap — disrupts soft-bodied insect cell membranes; (5) Diatomaceous earth — physical barrier that damages insect exoskeletons.",
        },
        {
          type: "heading" as const,
          content: "Biological Control in Organic Systems",
        },
        {
          type: "paragraph" as const,
          content:
            "Organic farms leverage natural enemies: (1) Release ladybugs for aphid control; (2) Attract parasitic wasps with flowering borders; (3) Use predatory mites for spider mite control; (4) Encourage ground beetles with mulch; (5) Install bat houses and bird boxes for pest consumption. A single bat can eat 1,000 mosquitoes per hour.",
        },
        {
          type: "heading" as const,
          content: "Cultural Practices for Pest Prevention",
        },
        {
          type: "paragraph" as const,
          content:
            "Prevention through cultural practices: (1) Interplanting — mixing crops confuses pests; (2) Trap cropping — sacrificial plants attract pests away; (3) Timing — plant to avoid peak pest periods; (4) Sanitation — remove crop debris that harbors pests; (5) Physical barriers — row covers, netting, copper tape for slugs.",
        },
        {
          type: "heading" as const,
          content: "Organic Disease Management",
        },
        {
          type: "paragraph" as const,
          content:
            "Organic disease control relies on: (1) Resistant varieties — the first and best defense; (2) Crop rotation — 3-4 year cycles prevent soil-borne disease buildup; (3) Compost teas — beneficial microorganisms suppress pathogens; (4) Copper and sulfur sprays — approved for organic use; (5) Proper spacing and airflow — reduces fungal disease pressure.",
        },
        {
          type: "quiz" as const,
          quiz: {
            title: "Organic Pest & Disease Management",
            questions: [
              {
                question: "What does OMRI stand for in organic pest control?",
                options: [
                  "Organic Material Research Institute",
                  "Organic Materials Review Institute",
                  "Organic Management and Regulation International",
                  "Open Market Research Institute",
                ],
                correctIndex: 1,
                explanation:
                  "OMRI (Organic Materials Review Institute) reviews products to determine if they are allowed under organic certification standards.",
              },
              {
                question: "Which organic pest control specifically targets caterpillars?",
                options: [
                  "Neem oil",
                  "Diatomaceous earth",
                  "Bacillus thuringiensis (Bt)",
                  "Insecticidal soap",
                ],
                correctIndex: 2,
                explanation:
                  "Bacillus thuringiensis (Bt) produces a protein that is toxic specifically to caterpillars when ingested, making it a targeted organic control.",
              },
              {
                question: "How many mosquitoes can a single bat eat per hour?",
                options: ["100", "500", "1,000", "5,000"],
                correctIndex: 2,
                explanation:
                  "A single bat can consume approximately 1,000 mosquitoes per hour, making them valuable biological control agents in organic farming systems.",
              },
            ],
          },
        },
      ],
    },
    {
      title: "Organic Marketing & Premium Pricing",
      description:
        "Learn to market organic products effectively, build customer relationships, and command premium prices through direct-to-consumer channels.",
      contentBlocks: [
        {
          type: "heading" as const,
          content: "Understanding the Organic Market",
        },
        {
          type: "paragraph" as const,
          content:
            "The organic food market has grown 10-15% annually for two decades. Consumers pay 20-100% premiums for certified organic products. Key market drivers include health concerns, environmental awareness, food safety, and taste preferences. Understanding what motivates your customers is essential for effective marketing.",
        },
        {
          type: "heading" as const,
          content: "Direct-to-Consumer Channels",
        },
        {
          type: "paragraph" as const,
          content:
            "Organic farms maximize profits through direct sales: (1) Farmers markets — highest margins, direct customer relationships; (2) CSA (Community Supported Agriculture) — upfront payments guarantee cash flow; (3) Farm stands — low overhead, convenient for customers; (4) Online sales — expanding reach beyond local area; (5) Restaurant partnerships — consistent bulk orders.",
        },
        {
          type: "heading" as const,
          content: "Building Your Brand",
        },
        {
          type: "paragraph" as const,
          content:
            "Effective organic marketing tells your story: (1) Share your farming practices transparently; (2) Use social media to show daily farm life; (3) Offer farm tours and tasting events; (4) Certify organic and display the seal prominently; (5) Build relationships through consistent quality and reliability. Customers buy from farmers they trust.",
        },
        {
          type: "heading" as const,
          content: "Pricing Strategies",
        },
        {
          type: "paragraph" as const,
          content:
            "Price organic products to reflect true costs: (1) Calculate all inputs, labor, and overhead; (2) Research local market rates; (3) Consider value-added products (jams, pickles, dried herbs) for higher margins; (4) OfferCSA subscriptions for guaranteed sales; (5) Don't underprice — premium prices signal quality and support sustainable practices.",
        },
        {
          type: "quiz" as const,
          quiz: {
            title: "Organic Marketing",
            questions: [
              {
                question: "What is a CSA in organic farming?",
                options: [
                  "Certified Sustainable Agriculture",
                  "Community Supported Agriculture",
                  "Commercial Soil Amendment",
                  "Certified Seed Association",
                ],
                correctIndex: 1,
                explanation:
                  "CSA (Community Supported Agriculture) is a model where customers buy shares of a farm's harvest upfront, providing guaranteed income for farmers and fresh produce for members.",
              },
              {
                question: "What premium do consumers typically pay for certified organic products?",
                options: [
                  "5-10%",
                  "20-100%",
                  "200-300%",
                  "No premium",
                ],
                correctIndex: 1,
                explanation:
                  "Consumers typically pay 20-100% premiums for certified organic products, depending on the product type, market, and direct vs retail sales.",
              },
              {
                question: "Which sales channel typically offers the highest margins for organic farms?",
                options: [
                  "Wholesale to grocery stores",
                  "Farmers markets",
                  "Export sales",
                  "Online marketplaces",
                ],
                correctIndex: 1,
                explanation:
                  "Farmers markets typically offer the highest margins because farmers sell directly to consumers without middlemen, capturing the full retail price.",
              },
            ],
          },
        },
      ],
    },
    {
      title: "Organic Certification Process",
      description:
        "Navigate the USDA National Organic Program certification process, including documentation, inspection, and maintaining organic integrity.",
      contentBlocks: [
        {
          type: "heading" as const,
          content: "The USDA National Organic Program (NOP)",
        },
        {
          type: "paragraph" as const,
          content:
            "The USDA NOP establishes standards for organic production, handling, and labeling. To use the 'USDA Organic' seal, farms must be certified by a USDA-accredited certifying agent. The process involves an organic system plan, annual inspections, and detailed record-keeping.",
        },
        {
          type: "heading" as const,
          content: "The Certification Process",
        },
        {
          type: "paragraph" as const,
          content:
            "Steps to certification: (1) Develop an Organic System Plan (OSP) describing practices, inputs, and monitoring; (2) Submit application to a USDA-accredited certifier; (3) Pay application and inspection fees ($500-2,000/year); (4) undergo annual on-site inspection; (5) Review and approval — typically takes 3-6 months; (6) Annual renewal with updated OSP and inspection.",
        },
        {
          type: "heading" as const,
          content: "Record-Keeping Requirements",
        },
        {
          type: "paragraph" as const,
          content:
            "Organic farms must maintain detailed records: (1) Input records — all fertilizers, pest controls, and amendments with OMRI listings; (2) Seed records — variety, source, organic status; (3) Harvest records — quantities, destinations; (4) Sales records — who bought what and when; (5) Field history — crops grown, rotations, cover crops. Records must be retained for 5 years.",
        },
        {
          type: "heading" as const,
          content: "The 3-Year Transition Period",
        },
        {
          type: "paragraph" as const,
          content:
            "New organic farms must undergo a 3-year transition period where they follow all organic practices but cannot sell products as certified organic. During transition, crops can be sold at conventional prices. Some states offer transitional organic labels or premium programs to support farmers during this period.",
        },
        {
          type: "quiz" as const,
          quiz: {
            title: "Organic Certification",
            questions: [
              {
                question: "How long is the transition period before a farm can be certified organic?",
                options: ["1 year", "2 years", "3 years", "5 years"],
                correctIndex: 2,
                explanation:
                  "The USDA NOP requires a 3-year transition period where the farm follows all organic practices before products can be sold as certified organic.",
              },
              {
                question: "How long must organic farms retain their records?",
                options: ["1 year", "3 years", "5 years", "10 years"],
                correctIndex: 2,
                explanation:
                  "Organic farms must retain all records for a minimum of 5 years to demonstrate ongoing compliance during inspections.",
              },
              {
                question: "What is an Organic System Plan (OSP)?",
                options: [
                  "A computer software for organic farms",
                  "A written description of organic practices, inputs, and monitoring",
                  "A blueprint for farm buildings",
                  "A marketing plan for organic products",
                ],
                correctIndex: 1,
                explanation:
                  "An OSP is a detailed written document describing the farm's organic practices, approved inputs, monitoring procedures, and record-keeping systems.",
              },
            ],
          },
        },
      ],
    },
  ],
};
