/**
 * Course 28: Sustainable Pest Management
 * Based on SAGE teaching modules and OpenSourceAgriculture resources
 * Source: sustainableaged.org/teaching-resources/
 * Source: github.com/geezacoleman/OpenSourceAgriculture
 * Covers IPM, biological control, organic pesticides, and sustainable practices
 */

export const extraCourse28 = {
  title: "Sustainable Pest Management",
  slug: "sustainable-pest-management",
  description:
    "Master integrated pest management (IPM) using biological controls, cultural practices, and targeted treatments. Learn to identify pests, understand their life cycles, and implement sustainable control strategies that minimize environmental impact.",
  category: "Plant Health",
  priceCents: 0,
  durationMinutes: 360,
  published: true,
  order: 28,
  modules: [
    {
      title: "Pest Identification & Monitoring",
      description:
        "Learn to identify common agricultural pests, understand their life cycles, and implement effective monitoring strategies.",
      contentBlocks: [
        {
          type: "heading" as const,
          content: "Major Pest Categories",
        },
        {
          type: "paragraph" as const,
          content:
            "Agricultural pests fall into categories: (1) Chewing insects — caterpillars, beetles, grasshoppers that eat leaves, stems, and roots; (2) Sucking insects — aphids, whiteflies, thrips that pierce plant tissue and suck sap; (3) Soil pests — root maggots, wireworms, nematodes that attack underground; (4) Stored product pests — grain weevils, moths that infest harvested crops; (5) Vertebrate pests — birds, rodents, deer that damage crops.",
        },
        {
          type: "heading" as const,
          content: "Scouting Techniques",
        },
        {
          type: "paragraph" as const,
          content:
            "Effective scouting requires consistency: (1) Walk field patterns (W, X, or zigzag) to cover representative areas; (2) Check 5-10 plants per stop, examining upper and lower leaf surfaces; (3) Use sweep nets for flying insects; (4) Deploy sticky traps for monitoring; (5) Record counts per plant or per sweep; (6) Scout 2-3 times weekly during growing season; (7) Note environmental conditions (temperature, humidity, wind).",
        },
        {
          type: "heading" as const,
          content: "Economic Thresholds",
        },
        {
          type: "paragraph" as const,
          content:
            "Don't treat every pest — use economic thresholds: (1) Economic injury level (EIL) — pest density causing economic damage equal to control costs; (2) Economic threshold (ET) — pest density at which action should be taken to prevent reaching EIL; (3) Action threshold — the point where monitoring triggers a treatment decision. Treating below the threshold wastes money and disrupts beneficial insect populations.",
        },
        {
          type: "quiz" as const,
          quiz: {
            title: "Pest Identification",
            questions: [
              {
                question: "What is the economic threshold (ET) in pest management?",
                options: [
                  "The maximum number of pests allowed by law",
                  "The pest density at which action should be taken to prevent economic damage",
                  "The point where all plants are destroyed",
                  "The number of beneficial insects needed",
                ],
                correctIndex: 1,
                explanation:
                  "The economic threshold is the pest density at which control action should be taken to prevent the pest population from reaching the economic injury level.",
              },
              {
                question: "Which pests suck plant sap rather than chewing tissue?",
                options: [
                  "Caterpillars and beetles",
                  "Aphids, whiteflies, and thrips",
                  "Grasshoppers and locusts",
                  "Root maggots and wireworms",
                ],
                correctIndex: 1,
                explanation:
                  "Aphids, whiteflies, and thrips have piercing-sucking mouthparts that allow them to pierce plant tissue and suck out sap, causing wilting and disease transmission.",
              },
              {
                question: "How often should you scout fields during the growing season?",
                options: [
                  "Once a month",
                  "Once a week",
                  "2-3 times weekly",
                  "Only when damage is visible",
                ],
                correctIndex: 2,
                explanation:
                  "Regular scouting 2-3 times weekly during the growing season enables early pest detection and timely management decisions before populations reach economic thresholds.",
              },
            ],
          },
        },
      ],
    },
    {
      title: "Biological Control Methods",
      description:
        "Harness natural enemies — predators, parasitoids, and pathogens — to control pest populations sustainably.",
      contentBlocks: [
        {
          type: "heading" as const,
          content: "Types of Biological Control",
        },
        {
          type: "paragraph" as const,
          content:
            "Biological control uses living organisms to suppress pests: (1) Classical — introduce natural enemies from pest's native range; (2) Augmentative — release mass-reared natural enemies; (3) Conservation — enhance existing natural enemy populations through habitat management. Each approach has specific applications and success factors.",
        },
        {
          type: "heading" as const,
          content: "Key Beneficial Insects",
        },
        {
          type: "paragraph" as const,
          content:
            "Important natural enemies: (1) Ladybugs (lady beetles) — each larva consumes 400+ aphids during development; (2) Lacewings — larvae ('aphid lions') eat aphids, thrips, and small caterpillars; (3) Parasitic wasps — lay eggs inside pest insects (Trichogramma controls caterpillars); (4) Predatory mites — control spider mite populations; (5) Ground beetles — consume slugs, snails, and soil-dwelling pests; (6) Hoverflies — larvae eat aphids, adults pollinate flowers.",
        },
        {
          type: "heading" as const,
          content: "Microbial Biological Control",
        },
        {
          type: "paragraph" as const,
          content:
            "Microbial agents control specific pests: (1) Bacillus thuringiensis (Bt) — produces crystal proteins toxic to caterpillars, mosquito larvae, and beetle larvae; (2) Beauveria bassiana — fungus that infects and kills whiteflies, aphids, and beetles; (3) Trichoderma — soil fungus that suppresses plant pathogenic fungi; (4) Nucleopolyhedrosis virus (NPV) — virus specific to certain caterpillar pests; (5) Beneficial nematodes — attack soil-dwelling grubs and root weevils.",
        },
        {
          type: "heading" as const,
          content: "Attracting Beneficial Insects",
        },
        {
          type: "paragraph" as const,
          content:
            "Create habitats that support natural enemies: (1) Plant flowering borders with yarrow, fennel, and dill for adult parasitoids; (2) Maintain permanent grass strips as beetle habitat; (3) Provide water sources for beneficial insects; (4) Reduce broad-spectrum pesticide use; (5) Leave some pest populations as food sources — zero pests means zero beneficials; (6) Use companion planting to attract beneficials to crop areas.",
        },
        {
          type: "quiz" as const,
          quiz: {
            title: "Biological Control",
            questions: [
              {
                question: "How many aphids can a single ladybug larva consume?",
                options: ["10-50", "100-200", "400+", "1,000+"],
                correctIndex: 2,
                explanation:
                  "A single ladybug larva can consume over 400 aphids during its developmental period, making them extremely effective natural pest control agents.",
              },
              {
                question: "What does Bacillus thuringiensis (Bt) target?",
                options: [
                  "All insects equally",
                  "Aphids and whiteflies specifically",
                  "Caterpillars, mosquito larvae, and beetle larvae",
                  "Weeds and plant pathogens",
                ],
                correctIndex: 2,
                explanation:
                  "Bt produces crystal proteins that are specifically toxic to caterpillars, mosquito larvae, and certain beetle larvae when ingested.",
              },
              {
                question: "Why shouldn't you aim for zero pests in your field?",
                options: [
                  "It's impossible to achieve",
                  "Zero pests means no food for beneficial insects, causing their populations to crash",
                  "Pests are required for pollination",
                  "Pest-free fields attract more pests",
                ],
                correctIndex: 1,
                explanation:
                  "Maintaining small pest populations provides food for beneficial insects, keeping their populations established and ready to suppress pest outbreaks.",
              },
            ],
          },
        },
      ],
    },
    {
      title: "Cultural Control Practices",
      description:
        "Modify farming practices to make environments less favorable for pests and more supportive of natural enemies.",
      contentBlocks: [
        {
          type: "heading" as const,
          content: "Crop Rotation",
        },
        {
          type: "paragraph" as const,
          content:
            "Crop rotation disrupts pest cycles: (1) Many pests are host-specific — rotating to non-host crops starves them; (2) Corn rootworm larvae hatch expecting corn roots but find soybeans instead; (3) Potato cyst nematode populations decline dramatically with 3-4 year rotations; (4) Rotation also reduces disease pressure and improves soil health; (5) Plan rotations to alternate plant families, not just crops.",
        },
        {
          type: "heading" as const,
          content: "Sanitation Practices",
        },
        {
          type: "paragraph" as const,
          content:
            "Remove pest habitat: (1) Clear crop residues promptly — many pests overwinter in debris; (2) Remove volunteer plants that harbor pests between seasons; (3) Clean equipment between fields to prevent spread; (4) Dispose of infested material properly (composting at high temperatures); (5) Remove alternate host weeds that bridge pest populations.",
        },
        {
          type: "heading" as const,
          content: "Planting Time and Variety Selection",
        },
        {
          type: "paragraph" as const,
          content:
            "Timing affects pest pressure: (1) Early planting can avoid peak pest periods; (2) Late planting may escape certain pest generations; (3) Choose resistant varieties — the most effective cultural control; (4) Use trap crops to divert pests from main crops; (5) Interplanting confuses pests and attracts beneficials.",
        },
        {
          type: "heading" as const,
          content: "Physical and Mechanical Controls",
        },
        {
          type: "paragraph" as const,
          content:
            "Physical barriers and methods: (1) Row covers — floating fabric excludes flying insects; (2) Netting — protects fruit from birds and insects; (3) Copper tape — deters slugs and snails; (4) Sticky traps — monitor and reduce flying pest populations; (5) Water sprays — dislodge aphids and spider mites; (6) Hand-picking — effective for large, visible pests like hornworms and beetles.",
        },
        {
          type: "quiz" as const,
          quiz: {
            title: "Cultural Control",
            questions: [
              {
                question: "Why is crop rotation effective against corn rootworm?",
                options: [
                  "It adds nutrients to the soil",
                  "It changes the soil pH",
                  "Larvae hatch expecting corn roots but find non-host crops instead",
                  "It attracts more beneficial insects",
                ],
                correctIndex: 2,
                explanation:
                  "Corn rootworm eggs overwinter in soil and hatch in spring. If corn isn't planted, larvae find no suitable food source and die, breaking the pest cycle.",
              },
              {
                question: "What is the most effective cultural control method?",
                options: [
                  "Hand-picking pests",
                  "Using row covers",
                  "Planting resistant varieties",
                  "Spraying water on plants",
                ],
                correctIndex: 2,
                explanation:
                  "Planting disease and pest-resistant varieties is the most effective cultural control because it prevents pest damage at the genetic level without requiring ongoing intervention.",
              },
              {
                question: "How do trap crops work?",
                options: [
                  "They poison pests",
                  "They attract pests away from the main crop",
                  "They repel all insects",
                  "They attract beneficial insects only",
                ],
                correctIndex: 1,
                explanation:
                  "Trap crops are plants that are more attractive to pests than the main crop, diverting pest pressure away from valuable cash crops.",
              },
            ],
          },
        },
      ],
    },
    {
      title: "Botanical & Organic Pesticides",
      description:
        "Use naturally-derived pesticides responsibly as part of an integrated pest management program.",
      contentBlocks: [
        {
          type: "heading" as const,
          content: "Botanical Pesticides",
        },
        {
          type: "paragraph" as const,
          content:
            "Plant-derived pesticides: (1) Pyrethrin — from chrysanthemum flowers, quick knockdown but breaks down rapidly in sunlight; (2) Neem oil — from neem tree seeds, disrupts insect feeding, growth, and reproduction; (3) Rotenone — from tropical plant roots, broad-spectrum but toxic to fish; (4) Capsaicin — from hot peppers, deters feeding mammals and some insects; (5) Garlic spray — repellent properties against many pests.",
        },
        {
          type: "heading" as const,
          content: "Mineral-Based Organic Pesticides",
        },
        {
          type: "paragraph" as const,
          content:
            "Mineral-derived options: (1) Diatomaceous earth — fossilized algae that damage insect exoskeletons, causing dehydration; (2) Kaolin clay — particle film that deters feeding and egg-laying; (3) Sulfur — fungicide and mite control; (4) Copper — broad-spectrum fungicide/bactericide (use carefully to avoid soil accumulation); (5) Iron phosphate — slug and snail bait that breaks down into fertilizer.",
        },
        {
          type: "heading" as const,
          content: "Microbial Pesticides",
        },
        {
          type: "paragraph" as const,
          content:
            "Biological pesticides: (1) Bacillus thuringiensis (Bt) — crystal proteins toxic to specific insect groups; (2) Beauveria bassiana — entomopathogenic fungus; (3) Trichoderma — soil fungus suppressing plant pathogens; (4) Nucleopolyhedrosis virus (NPV) — species-specific caterpillar control; (5) Spinosad — fermentation product effective against thrips, leafminers, and caterpillars.",
        },
        {
          type: "heading" as const,
          content: "Responsible Pesticide Use",
        },
        {
          type: "paragraph" as const,
          content:
            "Even organic pesticides require responsibility: (1) Target specific pests — avoid broad-spectrum when possible; (2) Apply at the right time — when beneficials are least active; (3) Follow label rates — more is not better; (4) Rotate chemical classes to prevent resistance; (5) Protect water sources — avoid application before rain; (6) Support organic certification by using OMRI-listed products.",
        },
        {
          type: "quiz" as const,
          quiz: {
            title: "Organic Pesticides",
            questions: [
              {
                question: "What makes diatomaceous earth effective against insects?",
                options: [
                  "It's toxic when eaten",
                  "It damages insect exoskeletons, causing dehydration",
                  "It attracts beneficial insects",
                  "It repels insects with smell",
                ],
                correctIndex: 1,
                explanation:
                  "Diatomaceous earth consists of sharp fossilized algae particles that scratch insect exoskeletons, causing them to dehydrate and die.",
              },
              {
                question: "Why should broad-spectrum pesticides be avoided when possible?",
                options: [
                  "They're too expensive",
                  "They kill beneficial insects along with pests",
                  "They don't work well",
                  "They're illegal",
                ],
                correctIndex: 1,
                explanation:
                  "Broad-spectrum pesticides kill beneficial insects that naturally control pests, potentially causing pest populations to rebound even stronger without their natural enemies.",
              },
              {
                question: "What does OMRI certification mean for a pesticide?",
                options: [
                  "It's the strongest pesticide available",
                  "It's approved for use in organic farming systems",
                  "It's made from organic food waste",
                  "It's safe enough to drink",
                ],
                correctIndex: 1,
                explanation:
                  "OMRI (Organic Materials Review Institute) certification means a pesticide product has been reviewed and approved for use in certified organic farming systems.",
              },
            ],
          },
        },
      ],
    },
    {
      title: "Pest Resistance Management",
      description:
        "Prevent pest resistance to pesticides and control methods through integrated strategies and rotation.",
      contentBlocks: [
        {
          type: "heading" as const,
          content: "How Resistance Develops",
        },
        {
          type: "paragraph" as const,
          content:
            "Resistance evolves through natural selection: (1) Random genetic variation exists in pest populations; (2) Pesticide application kills susceptible individuals; (3) Resistant survivors reproduce; (4) Over generations, resistant genes become dominant; (5) The pesticide becomes ineffective. This can happen in 5-50 pest generations depending on the pest and pesticide.",
        },
        {
          type: "heading" as const,
          content: "Resistance Management Strategies",
        },
        {
          type: "paragraph" as const,
          content:
            "Delay resistance with these practices: (1) Rotate chemical classes with different modes of action; (2) Use pesticides only when economic thresholds are reached; (3) Apply full recommended rates — sub-lethal doses accelerate resistance; (4) Use integrated approaches — don't rely solely on chemicals; (5) Monitor for signs of reduced efficacy; (6) Use refuges — untreated areas where susceptible pests survive.",
        },
        {
          type: "heading" as const,
          content: "Pest Resistance to Biological Control",
        },
        {
          type: "paragraph" as const,
          content:
            "Even biological control can face resistance: (1) Some pests evolve tolerance to Bt toxins; (2) Refuge strategies help maintain susceptible pest populations; (3) Pyramiding multiple Bt genes in crops delays resistance; (4) Rotating biological and chemical controls reduces selection pressure; (5) Conservation biological control (habitat management) is harder for pests to adapt to.",
        },
        {
          type: "heading" as const,
          content: "Monitoring for Resistance",
        },
        {
          type: "paragraph" as const,
          content:
            "Early detection of resistance: (1) Track treatment efficacy over time; (2) Compare results with previous years; (3) Note areas where control fails repeatedly; (4) Submit samples for bioassay testing if resistance is suspected; (5) Share information with other farmers and extension services; (6) Keep detailed records of all treatments and outcomes.",
        },
        {
          type: "quiz" as const,
          quiz: {
            title: "Resistance Management",
            questions: [
              {
                question: "How quickly can pesticide resistance develop?",
                options: [
                  "Never",
                  "In 5-50 pest generations",
                  "Only after 100 years of use",
                  "Only in laboratory settings",
                ],
                correctIndex: 1,
                explanation:
                  "Pesticide resistance can develop in as few as 5-50 pest generations, depending on the pest species, pesticide type, and selection pressure applied.",
              },
              {
                question: "What is a 'refuge' in resistance management?",
                options: [
                  "A greenhouse for beneficial insects",
                  "An untreated area where susceptible pests survive and reproduce",
                  "A storage area for pesticides",
                  "A protected area for endangered species",
                ],
                correctIndex: 1,
                explanation:
                  "Refuges are untreated areas where susceptible pests survive and mate with resistant individuals from treated areas, diluting resistance genes in the population.",
              },
              {
                question: "Why should full pesticide rates be applied?",
                options: [
                  "To kill pests faster",
                  "Sub-lethal doses accelerate resistance development",
                  "It's required by law only",
                  "To save money",
                ],
                correctIndex: 1,
                explanation:
                  "Sub-lethal doses don't kill all susceptible individuals, allowing partially resistant survivors to reproduce and spread resistance genes more quickly.",
              },
            ],
          },
        },
      ],
    },
    {
      title: "Integrated Pest Management (IPM) Implementation",
      description:
        "Combine all pest management strategies into a comprehensive, sustainable IPM program for your farm.",
      contentBlocks: [
        {
          type: "heading" as const,
          content: "Developing an IPM Plan",
        },
        {
          type: "paragraph" as const,
          content:
            "A complete IPM plan includes: (1) Pest identification guide for your crops; (2) Monitoring protocols and schedules; (3) Economic thresholds for key pests; (4) Cultural prevention practices; (5) Biological control options; (6) Chemical control guidelines (last resort); (7) Record-keeping systems; (8) Review and adjustment schedule.",
        },
        {
          type: "heading" as const,
          content: "IPM Decision Flowchart",
        },
        {
          type: "paragraph" as const,
          content:
            "IPM decision process: (1) Scout and identify — what pest is present? (2) Assess damage level — is it above economic threshold? (3) Evaluate natural enemies — are beneficials already controlling the pest? (4) Consider cultural options — can timing or practice changes help? (5) Select targeted control — least disruptive option that's economically viable; (6) Monitor results — did the intervention work?",
        },
        {
          type: "heading" as const,
          content: "IPM for Specific Crop Systems",
        },
        {
          type: "paragraph" as const,
          content:
            "Tailor IPM to your crops: (1) Vegetable crops — focus on scouting, resistant varieties, and targeted sprays; (2) Fruit orchards — combine mating disruption, monitoring traps, and selective insecticides; (3) Field crops — emphasize rotation, resistant varieties, and threshold-based treatment; (4) Greenhouse systems — prioritize biological control and exclusion.",
        },
        {
          type: "heading" as const,
          content: "IPM Economics",
        },
        {
          type: "paragraph" as const,
          content:
            "IPM saves money: (1) Reduces pesticide costs by 50-70% through targeted application; (2) Preserves beneficial insect populations that provide free pest control; (3) Prevents resistance that would require more expensive alternatives; (4) Improves crop quality through reduced chemical residue; (5) May qualify for organic premium pricing; (6) Protects farmworker health and environmental quality.",
        },
        {
          type: "quiz" as const,
          quiz: {
            title: "IPM Implementation",
            questions: [
              {
                question: "In an IPM program, when should chemical pesticides be considered?",
                options: [
                  "As the first option",
                  "Only after cultural and biological controls have been evaluated",
                  "Only during emergencies",
                  "Never",
                ],
                correctIndex: 1,
                explanation:
                  "In IPM, chemical pesticides are a last resort, used only after cultural, physical, and biological controls have been evaluated and found insufficient to keep pests below economic thresholds.",
              },
              {
                question: "How much can IPM reduce pesticide costs compared to calendar-based spraying?",
                options: [
                  "10-20%",
                  "50-70%",
                  "90-100%",
                  "No reduction",
                ],
                correctIndex: 1,
                explanation:
                  "IPM typically reduces pesticide costs by 50-70% compared to calendar-based spraying because treatments are only applied when monitoring indicates they're economically justified.",
              },
              {
                question: "What is the first step in the IPM decision process?",
                options: [
                  "Apply pesticide",
                  "Scout and identify the pest",
                  "Call an extension agent",
                  "Remove all plants",
                ],
                correctIndex: 1,
                explanation:
                  "The first step in IPM is always proper identification — you must know what pest you're dealing with before selecting an appropriate management strategy.",
              },
            ],
          },
        },
      ],
    },
  ],
};
