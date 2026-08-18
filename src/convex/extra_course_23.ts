/**
 * Course 23: Crop Science & Variety Selection
 * Based on data from the Plant Variety Database (CC BY 4.0)
 * Source: github.com/bripatch/plant-variety-database
 * 1,972 plant varieties with USDA hardiness zones, planting calendars,
 * companion plants, and nutrition data.
 */

export const extraCourse23 = {
  title: "Crop Science & Variety Selection",
  slug: "crop-science-variety-selection",
  description:
    "Master the science of choosing the right crop varieties for your climate, soil, and goals. Based on USDA hardiness zone data covering 1,972 plant varieties with planting calendars, companion planting, and nutrition profiles.",
  category: "Crop Science",
  priceCents: 0,
  durationMinutes: 360,
  published: true,
  order: 23,
  modules: [
    {
      title: "Understanding Plant Varieties & Cultivars",
      description:
        "Learn the difference between species, varieties, and cultivars. Understand how plant breeding creates varieties suited to specific conditions.",
      contentBlocks: [
        {
          type: "heading" as const,
          content: "Species vs Varieties vs Cultivars",
        },
        {
          type: "paragraph" as const,
          content:
            "A plant species (e.g., Solanum lycopersicum) is the broadest classification. Within a species, varieties are naturally occurring or bred subgroups with distinct characteristics. Cultivars (cultivated varieties) are specifically developed by plant breeders for desirable traits like disease resistance, flavor, or yield.",
        },
        {
          type: "heading" as const,
          content: "Key Selection Criteria",
        },
        {
          type: "paragraph" as const,
          content:
            "When selecting varieties, consider: (1) Days to harvest — how long from planting to productive yield; (2) USDA Hardiness Zone — your minimum winter temperature determines which perennials survive; (3) Sun requirements — full sun (6+ hours), partial sun (4-6 hours), or shade (less than 4 hours); (4) Water needs — low, medium, or high; (5) Soil type and pH preferences.",
        },
        {
          type: "heading" as const,
          content: "Heirloom vs Hybrid Varieties",
        },
        {
          type: "paragraph" as const,
          content:
            "Heirloom varieties are open-pollinated, passed down through generations, and valued for flavor and genetic diversity. Hybrids (F1) are crosses between two parent varieties, offering hybrid vigor, disease resistance, and uniformity. Neither is inherently better — heirlooms offer flavor and seed-saving potential, while hybrids offer reliability and disease resistance.",
        },
        {
          type: "heading" as const,
          content: "Data-Driven Variety Selection",
        },
        {
          type: "paragraph" as const,
          content:
            "Modern agriculture uses databases like the Plant Variety Database (1,972 varieties) to match cultivars to specific growing conditions. Each variety record includes days to harvest, plant height, spacing requirements, sun/water/soil needs, USDA zones, disease resistance, and companion plant data.",
        },
        {
          type: "quiz" as const,
          quiz: {
            title: "Variety Selection Basics",
            questions: [
              {
                question: "What is the primary difference between a variety and a cultivar?",
                options: [
                  "Varieties occur naturally; cultivars are bred by humans",
                  "Cultivars are organic; varieties are conventional",
                  "Varieties are for vegetables; cultivars are for flowers",
                  "There is no difference",
                ],
                correctIndex: 0,
                explanation:
                  "Varieties are naturally occurring or traditionally bred subgroups, while cultivars are specifically developed by plant breeders for desirable traits.",
              },
              {
                question: "Which factor is MOST important when selecting a variety for your farm?",
                options: [
                  "The variety's color",
                  "Your USDA hardiness zone and days to harvest",
                  "The price of seeds",
                  "What your neighbor is growing",
                ],
                correctIndex: 1,
                explanation:
                  "Your hardiness zone determines which plants can survive your climate, and days to harvest determines if the crop can mature in your growing season.",
              },
              {
                question: "What does 'F1' mean on a seed packet?",
                options: [
                  "First harvest",
                  "Fertilizer type 1",
                  "First-generation hybrid",
                  "Field-ready variety",
                ],
                correctIndex: 2,
                explanation:
                  "F1 indicates a first-generation hybrid, created by crossing two distinct parent varieties to combine desirable traits.",
              },
            ],
          },
        },
      ],
    },
    {
      title: "USDA Hardiness Zones & Climate Adaptation",
      description:
        "Navigate the 13 USDA hardiness zones and understand how climate data guides variety selection and planting schedules.",
      contentBlocks: [
        {
          type: "heading" as const,
          content: "The USDA Hardiness Zone System",
        },
        {
          type: "paragraph" as const,
          content:
            "The USDA Plant Hardiness Zone Map divides North America into 13 zones based on average annual minimum winter temperature. Zone 1 is the coldest (below -50°F), Zone 13 is the warmest (above 60°F). Each zone spans 10°F, with subzones (a and b) spanning 5°F. Your zone determines which perennial plants can survive winter in your location.",
        },
        {
          type: "heading" as const,
          content: "Growing Season Length",
        },
        {
          type: "paragraph" as const,
          content:
            "Beyond minimum temperature, growing season length (days between last spring frost and first fall frost) determines which crops can mature. The Plant Variety Database includes growing season data: cool-season crops (lettuce, spinach, kale) thrive in 40-60°F, warm-season crops (tomatoes, peppers, squash) need 60-85°F, and tropical crops require year-round warmth.",
        },
        {
          type: "heading" as const,
          content: "Climate Adaptation Strategies",
        },
        {
          type: "paragraph" as const,
          content:
            "Adapt to your climate by: (1) Selecting varieties bred for your zone range; (2) Using season extension (cold frames, row covers) to push boundaries; (3) Succession planting to maximize short seasons; (4) Choosing disease-resistant varieties for humid climates; (5) Selecting drought-tolerant varieties for arid regions.",
        },
        {
          type: "heading" as const,
          content: "Zone-by-Zone Planting Calendars",
        },
        {
          type: "paragraph" as const,
          content:
            "The Plant Variety Database provides 20,728 variety × zone planting calendar entries, specifying indoor sow start, outdoor transplant start, direct sow, and harvest windows for each variety in each zone. This data enables precise, zone-specific planting schedules.",
        },
        {
          type: "quiz" as const,
          quiz: {
            title: "Hardiness Zones & Climate",
            questions: [
              {
                question: "How many USDA hardiness zones are there?",
                options: ["5", "10", "13", "20"],
                correctIndex: 2,
                explanation:
                  "The USDA divides North America into 13 hardiness zones based on average annual minimum winter temperatures.",
              },
              {
                question: "Which crops are best suited for cool-season growing (40-60°F)?",
                options: [
                  "Tomatoes and peppers",
                  "Lettuce, spinach, and kale",
                  "Corn and watermelon",
                  "Bananas and mangoes",
                ],
                correctIndex: 1,
                explanation:
                  "Cool-season crops like lettuce, spinach, and kale thrive in temperatures between 40-60°F and can tolerate light frost.",
              },
              {
                question: "What is succession planting?",
                options: [
                  "Planting the same crop every year",
                  "Planting at different times to extend harvest",
                  "Planting in rows",
                  "Planting cover crops",
                ],
                correctIndex: 1,
                explanation:
                  "Succession planting involves sowing the same crop at regular intervals (e.g., every 2 weeks) to extend the harvest period and avoid a single large harvest.",
              },
            ],
          },
        },
      ],
    },
    {
      title: "Companion Planting Science",
      description:
        "Explore the 21,880 companion plant pairings from research data. Learn which plants help each other and which should be kept apart.",
      contentBlocks: [
        {
          type: "heading" as const,
          content: "What is Companion Planting?",
        },
        {
          type: "paragraph" as const,
          content:
            "Companion planting is the practice of growing certain plants together for mutual benefit. The Plant Variety Database contains 21,880 companion plant pairings with relationship types and reasons. Benefits include pest deterrence, pollinator attraction, shade provision, soil improvement, and space optimization.",
        },
        {
          type: "heading" as const,
          content: "The Three Sisters: A Classic Example",
        },
        {
          type: "paragraph" as const,
          content:
            "Corn, beans, and squash planted together form the 'Three Sisters' — a Native American polyculture system. Corn provides a trellis for beans; beans fix nitrogen in the soil; squash leaves shade the ground, suppressing weeds and retaining moisture. This is companion planting at its finest.",
        },
        {
          type: "heading" as const,
          content: "Scientific Mechanisms Behind Companion Planting",
        },
        {
          type: "paragraph" as const,
          content:
            "Companion planting works through: (1) Trap cropping — sacrificial plants attract pests away from main crops; (2) Allelopathy — some plants release chemicals that inhibit nearby weeds; (3) Nitrogen fixation — legumes host Rhizobium bacteria that convert atmospheric N₂ to plant-available forms; (4) Beneficial insect attraction — flowers like marigolds and nasturtiums attract pollinators and predatory insects.",
        },
        {
          type: "heading" as const,
          content: "Data-Driven Companion Selection",
        },
        {
          type: "paragraph" as const,
          content:
            "Use companion planting databases to make informed decisions. Each pairing includes the relationship type (beneficial, harmful, or neutral) and the specific mechanism. For example, basil planted near tomatoes repels aphids and may improve flavor, while fennel should be kept away from most vegetables due to allelopathic effects.",
        },
        {
          type: "quiz" as const,
          quiz: {
            title: "Companion Planting",
            questions: [
              {
                question: "What are the 'Three Sisters' in companion planting?",
                options: [
                  "Tomatoes, basil, and peppers",
                  "Corn, beans, and squash",
                  "Carrots, onions, and lettuce",
                  "Roses, lavender, and sunflowers",
                ],
                correctIndex: 1,
                explanation:
                  "The Three Sisters is a Native American polyculture of corn (trellis), beans (nitrogen fixation), and squash (ground cover).",
              },
              {
                question: "How do legumes benefit companion plants?",
                options: [
                  "They repel insects",
                  "They provide shade",
                  "They fix nitrogen in the soil",
                  "They attract pollinators",
                ],
                correctIndex: 2,
                explanation:
                  "Legumes host Rhizobium bacteria in their root nodules, converting atmospheric nitrogen into plant-available forms that benefit neighboring plants.",
              },
              {
                question: "What is trap cropping?",
                options: [
                  "Planting crops in traps",
                  "Using sacrificial plants to attract pests away from main crops",
                  "Catching beneficial insects",
                  "Building physical traps for rodents",
                ],
                correctIndex: 1,
                explanation:
                  "Trap cropping uses sacrificial plants that are more attractive to pests, drawing them away from the main crop.",
              },
            ],
          },
        },
      ],
    },
    {
      title: "Plant Nutrition & Soil Requirements",
      description:
        "Understand soil pH, nutrition profiles, and how to match varieties to your soil conditions using USDA FoodData Central nutrition data.",
      contentBlocks: [
        {
          type: "heading" as const,
          content: "Soil pH and Variety Selection",
        },
        {
          type: "paragraph" as const,
          content:
            "Soil pH affects nutrient availability. Most vegetables thrive in pH 6.0-7.0 (slightly acidic to neutral). Blueberries prefer pH 4.5-5.5, while asparagus tolerates pH 7.0-8.0. The Plant Variety Database includes soil pH preferences for each variety, enabling precise matching to your soil conditions.",
        },
        {
          type: "heading" as const,
          content: "Essential Plant Nutrients",
        },
        {
          type: "paragraph" as const,
          content:
            "Plants need 17 essential nutrients. Macronutrients (N-P-K): Nitrogen for leaf growth, Phosphorus for roots and flowers, Potassium for overall health. Secondary nutrients: Calcium, Magnesium, Sulfur. Micronutrients: Iron, Manganese, Zinc, Copper, Boron, Molybdenum, Chlorine, Nickel.",
        },
        {
          type: "heading" as const,
          content: "Nutrition Data for Informed Growing",
        },
        {
          type: "paragraph" as const,
          content:
            "The Plant Variety Database joins 1,036 USDA FoodData Central nutrition records to growable varieties. This enables growing decisions based on nutritional goals — for example, selecting high-vitamin-K leafy greens that grow in your zone, or choosing high-protein legumes suited to your climate.",
        },
        {
          type: "heading" as const,
          content: "Soil Testing and Amendment",
        },
        {
          type: "paragraph" as const,
          content:
            "Test your soil before selecting varieties. A soil test reveals pH, organic matter content, nutrient levels, and texture. Amend soil based on results: lime raises pH, sulfur lowers it, compost improves structure and organic matter, and targeted fertilizers address specific deficiencies.",
        },
        {
          type: "quiz" as const,
          quiz: {
            title: "Nutrition & Soil",
            questions: [
              {
                question: "What pH range do most vegetables prefer?",
                options: [
                  "4.0-5.0 (strongly acidic)",
                  "5.0-6.0 (moderately acidic)",
                  "6.0-7.0 (slightly acidic to neutral)",
                  "7.5-8.5 (alkaline)",
                ],
                correctIndex: 2,
                explanation:
                  "Most vegetables thrive in slightly acidic to neutral soil (pH 6.0-7.0), where nutrient availability is optimal.",
              },
              {
                question: "Which macronutrient is primarily responsible for leaf growth?",
                options: [
                  "Phosphorus (P)",
                  "Potassium (K)",
                  "Nitrogen (N)",
                  "Calcium (Ca)",
                ],
                correctIndex: 2,
                explanation:
                  "Nitrogen is the primary macronutrient for vegetative/leaf growth. It's a key component of chlorophyll and amino acids.",
              },
              {
                question: "How many essential plant nutrients are there?",
                options: ["6", "12", "17", "24"],
                correctIndex: 2,
                explanation:
                  "Plants need 17 essential nutrients: 6 macronutrients, 3 secondary nutrients, and 8 micronutrients.",
              },
            ],
          },
        },
      ],
    },
    {
      title: "Container Gardening & Small-Space Farming",
      description:
        "Learn to select and grow varieties optimized for containers, raised beds, and urban farming environments.",
      contentBlocks: [
        {
          type: "heading" as const,
          content: "Container-Friendly Varieties",
        },
        {
          type: "paragraph" as const,
          content:
            "Not all varieties perform well in containers. The Plant Variety Database flags container-friendly varieties, which are bred for compact growth, shallow root systems, and productivity in confined spaces. Look for determinate tomatoes, bush beans, dwarf peppers, and compact herbs.",
        },
        {
          type: "heading" as const,
          content: "Container Sizing Guide",
        },
        {
          type: "paragraph" as const,
          content:
            "Match container size to plant needs: (1) Small (6-8 inches): herbs, lettuce, radishes; (2) Medium (10-14 inches): peppers, bush beans, carrots; (3) Large (16-20 inches): tomatoes, squash, cucumbers; (4) Extra-large (24+ inches): fruit trees, large squash varieties. Always ensure drainage holes.",
        },
        {
          type: "heading" as const,
          content: "Soil Mix for Containers",
        },
        {
          type: "paragraph" as const,
          content:
            "Container plants need well-draining, nutrient-rich soil. A standard mix is: 1/3 peat moss or coco coir (moisture retention), 1/3 perlite or vermiculite (drainage and aeration), and 1/3 compost (nutrients). Add slow-release fertilizer at planting time.",
        },
        {
          type: "heading" as const,
          content: "Vertical Gardening and Trellising",
        },
        {
          type: "paragraph" as const,
          content:
            "Maximize small spaces with vertical growing. Use trellises for vining crops (cucumbers, peas, pole beans), wall-mounted planters for herbs, hanging baskets for cherry tomatoes and strawberries, and tiered shelves for seedlings. The Plant Variety Database includes plant height data to help plan vertical structures.",
        },
        {
          type: "quiz" as const,
          quiz: {
            title: "Container Gardening",
            questions: [
              {
                question: "Which tomato type is best for containers?",
                options: [
                  "Indeterminate (vining)",
                  "Determinate (bush)",
                  "Cherry only",
                  "Any type works equally",
                ],
                correctIndex: 1,
                explanation:
                  "Determinate (bush) tomatoes are bred for compact growth and are ideal for containers. Indeterminate varieties continue growing and need large supports.",
              },
              {
                question: "What is the recommended container size for growing peppers?",
                options: [
                  "6-8 inches",
                  "10-14 inches",
                  "16-20 inches",
                  "24+ inches",
                ],
                correctIndex: 1,
                explanation:
                  "Peppers do well in medium containers (10-14 inches diameter), which provide adequate root space for their compact root system.",
              },
              {
                question: "What is the key component for drainage in container soil mix?",
                options: [
                  "Peat moss",
                  "Compost",
                  "Perlite or vermiculite",
                  "Sand only",
                ],
                correctIndex: 2,
                explanation:
                  "Perlite or vermiculite provides essential drainage and aeration in container soil mixes, preventing waterlogging and root rot.",
              },
            ],
          },
        },
      ],
    },
    {
      title: "Season Extension & Climate Control",
      description:
        "Master techniques to extend growing seasons using cold frames, row covers, greenhouses, and microclimate management.",
      contentBlocks: [
        {
          type: "heading" as const,
          content: "Cold Frames and Hotbeds",
        },
        {
          type: "paragraph" as const,
          content:
            "Cold frames are bottomless boxes with transparent lids that trap solar heat, extending the growing season by 4-8 weeks. Place them against south-facing walls for maximum sun exposure. Hotbeds add a layer of decomposing manure beneath the soil for bottom heat, enabling early seedling starts.",
        },
        {
          type: "heading" as const,
          content: "Row Covers and Low Tunnels",
        },
        {
          type: "paragraph" as const,
          content:
            "Floating row covers (lightweight fabric) protect crops from frost while allowing light and water through. Heavy-weight covers provide 4-8°F of frost protection. Low tunnels (hoops with plastic or fabric) create miniature greenhouses over beds, extending the season cost-effectively.",
        },
        {
          type: "heading" as const,
          content: "Microclimate Management",
        },
        {
          type: "paragraph" as const,
          content:
            "Every farm has microclimates — areas that are warmer, cooler, windier, or more sheltered. South-facing slopes are warmer; valleys collect cold air; walls radiate stored heat; water features moderate temperature swings. Map your microclimates and site crops accordingly.",
        },
        {
          type: "heading" as const,
          content: "Pushing Zone Boundaries",
        },
        {
          type: "paragraph" as const,
          content:
            "With season extension, you can grow varieties rated for 1-2 zones warmer than yours. For example, a Zone 6 grower can successfully grow Zone 7-8 varieties of peppers and tomatoes using cold frames and row covers. The Plant Variety Database zone ranges help identify which varieties are within reach.",
        },
        {
          type: "quiz" as const,
          quiz: {
            title: "Season Extension",
            questions: [
              {
                question: "How much frost protection does a heavy-weight row cover provide?",
                options: [
                  "1-2°F",
                  "4-8°F",
                  "15-20°F",
                  "25-30°F",
                ],
                correctIndex: 1,
                explanation:
                  "Heavy-weight floating row covers provide 4-8°F of frost protection while still allowing light and water penetration.",
              },
              {
                question: "Where should you place a cold frame for maximum effectiveness?",
                options: [
                  "North-facing slope",
                  "Against a south-facing wall",
                  "In a valley",
                  "Under a tree canopy",
                ],
                correctIndex: 1,
                explanation:
                  "South-facing walls reflect stored heat and maximize sun exposure, making them ideal locations for cold frames.",
              },
              {
                question: "How many weeks can cold frames typically extend the growing season?",
                options: ["1-2 weeks", "4-8 weeks", "12-16 weeks", "Year-round"],
                correctIndex: 1,
                explanation:
                  "Cold frames typically extend the growing season by 4-8 weeks at each end, enabling earlier spring planting and later fall harvests.",
              },
            ],
          },
        },
      ],
    },
  ],
};
