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
 * Course 23: Crop Science & Variety Selection
 * Based on data from the Plant Variety Database (CC BY 4.0)
 * Source: github.com/bripatch/plant-variety-database
 */

export const extraCourse23: ExtraCourse = {
  title: "Crop Science & Variety Selection",
  description:
    "Master the science of choosing the right crop varieties for your climate, soil, and goals. Based on USDA hardiness zone data covering 1,972 plant varieties with planting calendars, companion planting, and nutrition profiles.",
  category: "Crop Science",
  priceCents: 0,
  durationMinutes: 360,
  order: 23,
  instructor: "Dr. Amara Osei",
  instructorTitle: "Senior Agronomist",
  modules: [
    {
      title: "Understanding Plant Varieties & Cultivars",
      content: [
        {
          type: "paragraph",
          text: "A plant species (e.g., Solanum lycopersicum) is the broadest classification. Within a species, varieties are naturally occurring or bred subgroups with distinct characteristics. Cultivars (cultivated varieties) are specifically developed by plant breeders for desirable traits like disease resistance, flavor, or yield.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=6l4JPsCUWug",
          caption: "Understanding plant varieties — species, cultivars, and hybrids.",
        },
        {
          type: "paragraph",
          text: "When selecting varieties, consider: (1) Days to harvest — how long from planting to productive yield; (2) USDA Hardiness Zone — your minimum winter temperature determines which perennials survive; (3) Sun requirements — full sun (6+ hours), partial sun (4-6 hours), or shade (less than 4 hours); (4) Water needs — low, medium, or high; (5) Soil type and pH preferences.",
        },
        {
          type: "paragraph",
          text: "Heirloom varieties are open-pollinated, passed down through generations, and valued for flavor and genetic diversity. Hybrids (F1) are crosses between two parent varieties, offering hybrid vigor, disease resistance, and uniformity. Neither is inherently better — heirlooms offer flavor and seed-saving potential, while hybrids offer reliability and disease resistance.",
        },
        {
          type: "list",
          items: [
            "Species is the broadest classification; varieties and cultivars are subgroups.",
            "Cultivars are specifically bred for desirable traits by plant breeders.",
            "Heirlooms offer flavor and seed-saving; hybrids offer reliability and disease resistance.",
            "F1 on a seed packet means first-generation hybrid.",
          ],
        },
        {
          type: "quiz",
          title: "Variety Selection Basics",
          passPercent: 60,
          questions: [
            {
              question: "What is the primary difference between a variety and a cultivar?",
              options: [
                "Varieties occur naturally; cultivars are bred by humans",
                "Cultivars are organic; varieties are conventional",
                "Varieties are for vegetables; cultivars are for flowers",
                "There is no difference",
              ],
              answerIndex: 0,
            },
            {
              question: "Which factor is MOST important when selecting a variety for your farm?",
              options: [
                "The variety's color",
                "Your USDA hardiness zone and days to harvest",
                "The price of seeds",
                "What your neighbor is growing",
              ],
              answerIndex: 1,
            },
            {
              question: "What does 'F1' mean on a seed packet?",
              options: [
                "First harvest",
                "Fertilizer type 1",
                "First-generation hybrid",
                "Field-ready variety",
              ],
              answerIndex: 2,
            },
          ],
        },
      ],
    },
    {
      title: "USDA Hardiness Zones & Climate Adaptation",
      content: [
        {
          type: "paragraph",
          text: "The USDA Plant Hardiness Zone Map divides North America into 13 zones based on average annual minimum winter temperature. Zone 1 is the coldest (below -50°F), Zone 13 is the warmest (above 60°F). Each zone spans 10°F, with subzones (a and b) spanning 5°F. Your zone determines which perennial plants can survive winter in your location.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=E7CwqNHn_Ns",
          caption: "USDA hardiness zones — how climate data guides variety selection.",
        },
        {
          type: "paragraph",
          text: "Beyond minimum temperature, growing season length (days between last spring frost and first fall frost) determines which crops can mature. Cool-season crops (lettuce, spinach, kale) thrive in 40-60°F, warm-season crops (tomatoes, peppers, squash) need 60-85°F, and tropical crops require year-round warmth.",
        },
        {
          type: "list",
          items: [
            "There are 13 USDA hardiness zones based on minimum winter temperatures.",
            "Cool-season crops thrive in 40-60°F; warm-season crops need 60-85°F.",
            "Succession planting maximizes short seasons by sowing at regular intervals.",
            "Disease-resistant varieties are essential for humid climates.",
          ],
        },
        {
          type: "note",
          tone: "info",
          text: "The Plant Variety Database provides 20,728 variety × zone planting calendar entries, specifying indoor sow start, outdoor transplant start, direct sow, and harvest windows for each variety in each zone.",
        },
        {
          type: "quiz",
          title: "Hardiness Zones & Climate",
          passPercent: 60,
          questions: [
            {
              question: "How many USDA hardiness zones are there?",
              options: ["5", "10", "13", "20"],
              answerIndex: 2,
            },
            {
              question: "Which crops are best suited for cool-season growing (40-60°F)?",
              options: [
                "Tomatoes and peppers",
                "Lettuce, spinach, and kale",
                "Corn and watermelon",
                "Bananas and mangoes",
              ],
              answerIndex: 1,
            },
            {
              question: "What is succession planting?",
              options: [
                "Planting the same crop every year",
                "Planting at different times to extend harvest",
                "Planting in rows",
                "Planting cover crops",
              ],
              answerIndex: 1,
            },
          ],
        },
      ],
    },
    {
      title: "Companion Planting Science",
      content: [
        {
          type: "paragraph",
          text: "Companion planting is the practice of growing certain plants together for mutual benefit. The Plant Variety Database contains 21,880 companion plant pairings with relationship types and reasons. Benefits include pest deterrence, pollinator attraction, shade provision, soil improvement, and space optimization.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=tGBcrGHJjLc",
          caption: "Companion planting science — which plants help each other.",
        },
        {
          type: "paragraph",
          text: "Corn, beans, and squash planted together form the 'Three Sisters' — a Native American polyculture system. Corn provides a trellis for beans; beans fix nitrogen in the soil; squash leaves shade the ground, suppressing weeds and retaining moisture. This is companion planting at its finest.",
        },
        {
          type: "list",
          items: [
            "Trap cropping uses sacrificial plants to attract pests away from main crops.",
            "Allelopathy — some plants release chemicals that inhibit nearby weeds.",
            "Legumes host Rhizobium bacteria that convert atmospheric N₂ to plant-available forms.",
            "Flowers like marigolds and nasturtiums attract pollinators and predatory insects.",
          ],
        },
        {
          type: "quiz",
          title: "Companion Planting",
          passPercent: 60,
          questions: [
            {
              question: "What are the 'Three Sisters' in companion planting?",
              options: [
                "Tomatoes, basil, and peppers",
                "Corn, beans, and squash",
                "Carrots, onions, and lettuce",
                "Roses, lavender, and sunflowers",
              ],
              answerIndex: 1,
            },
            {
              question: "How do legumes benefit companion plants?",
              options: [
                "They repel insects",
                "They provide shade",
                "They fix nitrogen in the soil",
                "They attract pollinators",
              ],
              answerIndex: 2,
            },
            {
              question: "What is trap cropping?",
              options: [
                "Planting crops in traps",
                "Using sacrificial plants to attract pests away from main crops",
                "Catching beneficial insects",
                "Building physical traps for rodents",
              ],
              answerIndex: 1,
            },
          ],
        },
      ],
    },
    {
      title: "Plant Nutrition & Soil Requirements",
      content: [
        {
          type: "paragraph",
          text: "Soil pH affects nutrient availability. Most vegetables thrive in pH 6.0-7.0 (slightly acidic to neutral). Blueberries prefer pH 4.5-5.5, while asparagus tolerates pH 7.0-8.0. The Plant Variety Database includes soil pH preferences for each variety, enabling precise matching to your soil conditions.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=7gHOOZcpXbs",
          caption: "Plant nutrition — essential nutrients and soil requirements.",
        },
        {
          type: "paragraph",
          text: "Plants need 17 essential nutrients. Macronutrients (N-P-K): Nitrogen for leaf growth, Phosphorus for roots and flowers, Potassium for overall health. Secondary nutrients: Calcium, Magnesium, Sulfur. Micronutrients: Iron, Manganese, Zinc, Copper, Boron, Molybdenum, Chlorine, Nickel.",
        },
        {
          type: "paragraph",
          text: "The Plant Variety Database joins 1,036 USDA FoodData Central nutrition records to growable varieties. This enables growing decisions based on nutritional goals — for example, selecting high-vitamin-K leafy greens that grow in your zone, or choosing high-protein legumes suited to your climate.",
        },
        {
          type: "list",
          items: [
            "Most vegetables thrive in soil pH 6.0-7.0.",
            "Nitrogen (N) drives leaf growth; Phosphorus (P) drives roots and flowers.",
            "Test your soil before selecting varieties.",
            "Amend soil with lime (raise pH), sulfur (lower pH), or compost (improve structure).",
          ],
        },
        {
          type: "quiz",
          title: "Nutrition & Soil",
          passPercent: 60,
          questions: [
            {
              question: "What pH range do most vegetables prefer?",
              options: [
                "4.0-5.0 (strongly acidic)",
                "5.0-6.0 (moderately acidic)",
                "6.0-7.0 (slightly acidic to neutral)",
                "7.5-8.5 (alkaline)",
              ],
              answerIndex: 2,
            },
            {
              question: "Which macronutrient is primarily responsible for leaf growth?",
              options: [
                "Phosphorus (P)",
                "Potassium (K)",
                "Nitrogen (N)",
                "Calcium (Ca)",
              ],
              answerIndex: 2,
            },
            {
              question: "How many essential plant nutrients are there?",
              options: ["6", "12", "17", "24"],
              answerIndex: 2,
            },
          ],
        },
      ],
    },
    {
      title: "Container Gardening & Small-Space Farming",
      content: [
        {
          type: "paragraph",
          text: "Not all varieties perform well in containers. The Plant Variety Database flags container-friendly varieties, which are bred for compact growth, shallow root systems, and productivity in confined spaces. Look for determinate tomatoes, bush beans, dwarf peppers, and compact herbs.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=Z-zNHHpXoMM",
          caption: "Container gardening — selecting and growing varieties in small spaces.",
        },
        {
          type: "paragraph",
          text: "Match container size to plant needs: (1) Small (6-8 inches): herbs, lettuce, radishes; (2) Medium (10-14 inches): peppers, bush beans, carrots; (3) Large (16-20 inches): tomatoes, squash, cucumbers; (4) Extra-large (24+ inches): fruit trees, large squash varieties. Always ensure drainage holes.",
        },
        {
          type: "list",
          items: [
            "Determinate (bush) tomatoes are best for containers.",
            "Container soil mix: 1/3 peat moss, 1/3 perlite, 1/3 compost.",
            "Use trellises for vining crops to maximize vertical space.",
            "Add slow-release fertilizer at planting time.",
          ],
        },
        {
          type: "quiz",
          title: "Container Gardening",
          passPercent: 60,
          questions: [
            {
              question: "Which tomato type is best for containers?",
              options: [
                "Indeterminate (vining)",
                "Determinate (bush)",
                "Cherry only",
                "Any type works equally",
              ],
              answerIndex: 1,
            },
            {
              question: "What is the recommended container size for growing peppers?",
              options: ["6-8 inches", "10-14 inches", "16-20 inches", "24+ inches"],
              answerIndex: 1,
            },
            {
              question: "What is the key component for drainage in container soil mix?",
              options: [
                "Peat moss",
                "Compost",
                "Perlite or vermiculite",
                "Sand only",
              ],
              answerIndex: 2,
            },
          ],
        },
      ],
    },
    {
      title: "Season Extension & Climate Control",
      content: [
        {
          type: "paragraph",
          text: "Cold frames are bottomless boxes with transparent lids that trap solar heat, extending the growing season by 4-8 weeks. Place them against south-facing walls for maximum sun exposure. Hotbeds add a layer of decomposing manure beneath the soil for bottom heat, enabling early seedling starts.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=eVajQPuRmk8",
          caption: "Season extension techniques — cold frames, row covers, and microclimates.",
        },
        {
          type: "paragraph",
          text: "Floating row covers (lightweight fabric) protect crops from frost while allowing light and water through. Heavy-weight covers provide 4-8°F of frost protection. Low tunnels (hoops with plastic or fabric) create miniature greenhouses over beds, extending the season cost-effectively.",
        },
        {
          type: "list",
          items: [
            "Cold frames extend the growing season by 4-8 weeks at each end.",
            "Heavy-weight row covers provide 4-8°F of frost protection.",
            "South-facing slopes are warmer; valleys collect cold air.",
            "With season extension, grow varieties rated 1-2 zones warmer than yours.",
          ],
        },
        {
          type: "note",
          tone: "info",
          text: "Every farm has microclimates — areas that are warmer, cooler, windier, or more sheltered. Map your microclimates and site crops accordingly.",
        },
        {
          type: "quiz",
          title: "Season Extension",
          passPercent: 60,
          questions: [
            {
              question: "How much frost protection does a heavy-weight row cover provide?",
              options: ["1-2°F", "4-8°F", "15-20°F", "25-30°F"],
              answerIndex: 1,
            },
            {
              question: "Where should you place a cold frame for maximum effectiveness?",
              options: [
                "North-facing slope",
                "Against a south-facing wall",
                "In a valley",
                "Under a tree canopy",
              ],
              answerIndex: 1,
            },
            {
              question: "How many weeks can cold frames typically extend the growing season?",
              options: ["1-2 weeks", "4-8 weeks", "12-16 weeks", "Year-round"],
              answerIndex: 1,
            },
          ],
        },
      ],
    },
  ],
};
