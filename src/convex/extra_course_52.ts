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
  tags: string[];
  modules: CourseModule[];
};

const extraCourse52: ExtraCourse = {
  title: "Snail Farming (Heliculture)",
  description:
    "Learn to raise snails for profit — a low-cost, high-margin protein source. Master housing, breeding, feeding, harvesting, and marketing snails and snail products.",
  category: "Innovative Farming",
  duration: "6 weeks",
  difficulty: "Beginner",
  priceCents: 0,
  durationMinutes: 2000,
  order: 52,
  instructor: "Dr. Fatima Benali",
  tags: ["snails", "heliculture", "escargot", "protein", "low-cost"],
  modules: [
    {
      title: "Introduction to Heliculture",
      content: [
        {
          text: "Why Farm Snails?\nSnail farming (heliculture) is one of the lowest-cost livestock operations:\n- Startup cost: $200-2,000\n- Feed cost: Minimal (vegetable waste, leaves)\n- Space: Small (can start in backyard)\n- Labor: Low (1-2 hours/day)\n- Climate: Most regions (tropical to temperate)\n- Market: Growing demand globally\n\nSnail Products:\n1. Meat: Premium protein ($15-40/kg)\n2. Eggs (ttiéelles): Delicacy ($50-100/kg)\n3. Shell: Calcium supplement, crafts\n4. Slime: Cosmetics ingredient ($100-500/kg)\n5. Manure: Organic fertilizer\n\nSpecies:\n- Giant African Snail (Achatina fulica): Fastest growing, most common\n- Helix pomatia (Burgundy snail): European escargot, premium price\n- Helix aspersa (Petit-gris): Small, high demand\n- Archachatina marginata: Large, meaty\n\nGlobal Market:\n- $1.5 billion industry\n- Leading producers: Nigeria, Ghana, China, France\n- Growing demand in US, Europe, Asia\n- Premium pricing for organic/free-range",
        },
        {
          text: "Getting Started\nEquipment Needed:\n1. Enclosure: Mesh cage, greenhouse, or dedicated pen\n2. Substrate: Soil/leaf litter mix (5-10cm deep)\n3. Shelter: Coconut shells, tiles, or plastic hides\n4. Feeding trays: Shallow dishes\n5. Spray bottle: For humidity\n6. Thermometer/hygrometer\n7. Mesh/netting: predator protection\n\nSpace Requirements:\n- Starter (100 snails): 1-2m²\n- Small farm (1,000 snails): 5-10m²\n- Medium farm (10,000 snails): 50-100m²\n- Commercial (100,000+): 500m²+\n\nStartup Costs:\n- Starter kit: $200-500\n- Small farm: $1,000-5,000\n- Medium farm: $5,000-20,000\n- Commercial: $20,000-100,000\n\nClimate Requirements:\n- Temperature: 20-30°C (optimal)\n- Humidity: 70-90% RH\n- Rainfall: Adequate (or misting)\n- Shelter from direct sun\n- Protection from frost",
        },
      ],
      quiz: {
        questions: [
          {
            question: "What is the startup cost for a small snail farm?",
            options: ["$10-50", "$200-2,000", "$10,000-50,000", "$100,000+"],
            correctIndex: 1,
            explanation: "Snail farming has very low startup costs of $200-2,000, making it one of the most accessible livestock ventures.",
          },
          {
            question: "What humidity level do snails need?",
            options: ["30-40%", "50-60%", "70-90%", "95-100%"],
            correctIndex: 2,
            explanation: "Snails need 70-90% relative humidity to thrive, which can be maintained with regular misting.",
          },
          {
            question: "What is the most valuable snail product by weight?",
            options: ["Meat", "Shells", "Slime", "Manure"],
            correctIndex: 2,
            explanation: "Snail slime is the most valuable product at $100-500/kg, used in cosmetics for its skin-rejuvenating properties.",
          },
        ],
        passMark: 60,
      },
    },
    {
      title: "Housing & Environment",
      content: [
        {
          text: "Enclosure Design\n1. Indoor Pen (Best for control)\n   - Concrete or wooden enclosure\n   - 1m high walls with mesh top\n   - 10-50m² floor space\n   - Drainage system\n   - Misting system\n\n2. Greenhouse Pen\n   - Modified greenhouse structure\n   - Good temperature control\n   - Natural light\n   - Higher setup cost\n\n3. Outdoor Pen (Budget option)\n   - Fenced area with netting\n   - Natural vegetation\n   - Weather-dependent\n   - Predator risk higher\n\nSubstrate:\n- 5-10cm deep soil/leaf litter mix\n- 60% garden soil + 40% organic matter\n- Keep moist (not waterlogged)\n- Replace every 3-6 months\n- Add lime for calcium (egg production)\n\nShelter:\n- Coconut shells with entry hole\n- Terracotta tiles\n- PVC pipe sections\n- Plastic hides\n- Density: 1 shelter per 10-15 snails\n\nHumidity Management:\n- Misting: 2-3 times daily\n- Water features: Small shallow dishes\n- Wet burlap: draped over shelter\n- Automated misting: Timer-based\n- Target: 70-90% RH",
        },
        {
          text: "Temperature & Light\nTemperature:\n- Optimal: 20-30°C (68-86°F)\n- Below 15°C: Snails become dormant (estivation)\n- Above 35°C: Heat stress, death risk\n- Daily variation: ±5°C acceptable\n\nHeating (Cold Climates):\n- Heat mats under enclosure\n- Ceramic heat emitters\n- Greenhouse heating\n- Insulation for winter\n\nLight:\n- 12 hours light, 12 hours dark\n- Avoid direct sunlight ( overheating)\n- UVB light beneficial for calcium absorption\n- Natural light preferred\n\nSeasonal Management:\nSpring: Active feeding, breeding begins\nSummer: Peak activity, watch for heat\nAutumn: Increased feeding, egg laying\nWinter: Dormancy (estivation/hibernation)\n\nCold Climate Strategy:\n- Move indoors during winter\n- Or: Allow natural dormancy in insulated pen\n- Reduce feeding during dormancy\n- Mist occasionally to prevent dehydration",
        },
      ],
      quiz: {
        questions: [
          {
            question: "What happens to snails below 15°C?",
            options: ["They die immediately", "They become dormant (estivation)", "They breed faster", "They eat more"],
            correctIndex: 1,
            explanation: "Below 15°C, snails enter a dormant state called estivation, reducing their metabolic activity until conditions improve.",
          },
          {
            question: "How often should snail enclosures be misted?",
            options: ["Once daily", "2-3 times daily", "Once weekly", "Only when dry"],
            correctIndex: 1,
            explanation: "Snail enclosures should be misted 2-3 times daily to maintain the required 70-90% humidity.",
          },
          {
            question: "What is the recommended substrate depth for snail pens?",
            options: ["1-2cm", "5-10cm", "20-30cm", "50cm+"],
            correctIndex: 1,
            explanation: "Snail substrate should be 5-10cm deep, consisting of a mix of garden soil and organic matter.",
          },
        ],
        passMark: 60,
      },
    },
    {
      title: "Breeding & Hatchery",
      content: [
        {
          text: "Snail Breeding Basics\nSnails are hermaphrodites (have both male and female organs) but need a partner to reproduce.\n\nBreeding Conditions:\n- Age: 6-12 months old\n- Size: 5-8cm shell diameter\n- Temperature: 20-25°C (optimal)\n- Humidity: 80-90%\n- Nutrition: Calcium-rich diet\n- Photoperiod: 12 hours light\n\nMating Behavior:\n- Courtship: 2-6 hours of circling\n- Mating:互换 sperm packets\n- Egg laying: 1-2 weeks after mating\n- Each snail lays 100-500 eggs per clutch\n- 2-4 clutches per year\n\nEgg Laying:\n- Snails dig 2-5cm holes in soil\n- Lay eggs in clusters (100-500)\n- Cover eggs with soil\n- Eggs: White, round, 3-5mm diameter\n- Incubation: 14-28 days (species dependent)\n\nHatchling Care:\n- Tiny snails emerge (2-3mm)\n- Very fragile, need high humidity\n- Feed finely ground vegetables\n- Separate from adults (predation risk)\n- Grow rapidly in first 3 months",
        },
        {
          text: "Hatchery Management\nEgg Collection:\n- Check soil weekly for egg clusters\n- Carefully dig up eggs\n- Place in incubation container\n- Maintain 80% humidity, 25°C\n- Do not turn or disturb eggs\n\nIncubation:\n- Container: Plastic tub with soil\n- Depth: 3-5cm moist soil\n- Cover: Mesh lid for ventilation\n- Temperature: 25-28°C\n- Duration: 14-28 days\n\nHatchling Rearing:\n- Container: Small plastic tubs\n- Substrate: 2-3cm moist soil\n- Feed: Finely chopped vegetables\n- Density: 50-100 per tub\n- Growth rate: 1mm per week\n- Transfer to main pen at 2-3cm\n\nSurvival Rate:\n- Egg to hatchling: 70-90%\n- Hatchling to juvenile: 50-70%\n- Juvenile to adult: 80-90%\n- Overall: 30-60% (improves with experience)\n\nBreeding Stock Selection:\n- Select largest, fastest-growing snails\n- Healthy shell (no cracks, good color)\n- Active feeding behavior\n- Maintain 1:1 ratio (hermaphrodites)\n- Replace breeding stock every 2-3 years",
        },
      ],
      quiz: {
        questions: [
          {
            question: "How many eggs does a snail lay per clutch?",
            options: ["10-20", "50-100", "100-500", "1,000-2,000"],
            correctIndex: 2,
            explanation: "Each snail lays 100-500 eggs per clutch, with 2-4 clutches per year.",
          },
          {
            question: "How long does it take for snail eggs to hatch?",
            options: ["3-5 days", "7-10 days", "14-28 days", "60-90 days"],
            correctIndex: 2,
            explanation: "Snail eggs take 14-28 days to hatch depending on species and temperature.",
          },
          {
            question: "What is the overall survival rate from egg to adult?",
            options: ["5-10%", "30-60%", "80-90%", "95-100%"],
            correctIndex: 1,
            explanation: "The overall survival rate from egg to adult is 30-60%, which improves with experience and proper management.",
          },
        ],
        passMark: 60,
      },
    },
    {
      title: "Feeding & Nutrition",
      content: [
        {
          text: "Snail Diet\nSnails are herbivores with specific nutritional needs:\n\nFeed Types:\n1. Green Vegetables (Primary)\n   - Lettuce, cabbage, kale, spinach\n   - Cassava leaves, sweet potato leaves\n   - Moringa leaves (excellent nutrition)\n   - Banana leaves and peels\n\n2. Fruits (Supplementary)\n   - Banana, papaya, mango\n   - Watermelon rinds\n   - Citrus peels (limited)\n\n3. Calcium Sources (Critical)\n   - Crushed eggshells\n   - Oyster shell powder\n   - Limestone powder\n   - Bone meal\n   - Charcoal\n\n4. Protein (Occasional)\n   - Fish meal (small amounts)\n   - Soybean meal\n   - Chicken feed (limited)\n\nFeeding Schedule:\n- Feed once daily (evening preferred)\n- Amount: 10-15% of body weight\n- Remove uneaten food after 24 hours\n- Always provide fresh water (shallow dish)\n- Calcium source available at all times\n\nNutritional Requirements:\n- Protein: 12-15% of diet\n- Calcium: Critical for shell growth\n- Moisture: High (vegetables provide this)\n- Vitamins: A, D, E\n- Avoid: Salt, processed foods, onions",
        },
        {
          text: "Feed Management Tips\nCost-Effective Feeding:\n- Use farm waste: Vegetable trimmings, leaves\n- Grow moringa: Fast-growing, nutritious\n- Compost kitchen waste for feed\n- Seasonal abundance: Use what's available\n- Dry excess feed for storage\n\nFeed Preparation:\n- Wash vegetables thoroughly (remove pesticides)\n- Chop into manageable pieces\n- Calcium: Dust feed with crushed shell powder\n- Variety: Rotate feed types for balanced nutrition\n- Fresh water: Shallow dish, change daily\n\nSigns of Good Nutrition:\n✓ Active feeding and movement\n✓ Healthy shell growth (smooth, strong)\n✓ Regular egg laying\n✓ Good body color\n✓ Consistent growth rate\n\nSigns of Poor Nutrition:\n✗ Thin, brittle shells\n✗ Slow growth\n✗ Reduced egg production\n✗ Lethargy\n✗ Shell discoloration\n\nSeasonal Adjustments:\n- Summer: Increase water, provide shade\n- Winter: Reduce feeding (dormancy)\n- Rainy season: More leafy greens\n- Dry season: More water-rich vegetables",
        },
      ],
      quiz: {
        questions: [
          {
            question: "Why is calcium critical for snail farming?",
            options: [
              "For faster reproduction",
              "For healthy shell growth",
              "For better taste",
              "For disease prevention",
            ],
            correctIndex: 1,
            explanation: "Calcium is critical for healthy shell growth — without adequate calcium, shells become thin and brittle.",
          },
          {
            question: "How much should snails be fed daily?",
            options: ["1-2% of body weight", "10-15% of body weight", "30-40% of body weight", "50%+"],
            correctIndex: 1,
            explanation: "Snails should be fed 10-15% of their body weight daily in vegetables and greens.",
          },
          {
            question: "What is the best time of day to feed snails?",
            options: ["Morning", "Midday", "Evening", "Night"],
            correctIndex: 2,
            explanation: "Evening is the preferred feeding time because snails are most active during low-light conditions.",
          },
        ],
        passMark: 60,
      },
    },
    {
      title: "Harvesting & Processing",
      content: [
        {
          text: "Harvesting Methods\nWhen to Harvest:\n- Size: 5-8cm shell diameter\n- Age: 6-8 months from hatching\n- Weight: 30-50g per snail\n\nHarvesting:\n1. Selective Harvest: Pick largest snails, leave breeders\n2. Complete Harvest: Collect all market-size snails\n3. Timing: Early morning when snails are active\n4. Method: Hand-pick from surfaces and leaves\n\nPre-Harvest Preparation (Purging):\n- Stop feeding 3-5 days before harvest\n- Snails purge their digestive system\n- Results in cleaner, better-tasting meat\n- Provide clean water during purge\n- Keep in clean, empty container\n\nPost-Harvest:\n- Sort by size\n- Weigh and count\n- Process immediately OR\n- Store live in cool, humid conditions (7-14 days)\n- Live storage: 10-15°C, 80% humidity\n- Do not refrigerate below 5°C (kills snails)",
        },
        {
          text: "Processing & Products\n1. Fresh Snail Meat\n   - Remove from shell with fork/needle\n   - Wash thoroughly (3-4 times)\   - Cook or freeze\n   - Fresh shelf life: 2-3 days\n   - Frozen: 6-12 months\n\n2. Processed Snail Products\n   - Canned escargot: $15-30/can\n   - Frozen prepared: $20-40/kg\n   - Dried snail: $30-60/kg\n   - Snail paste/pâté: $25-50/kg\n\n3. Snail Eggs (ttiéelles)\n   - Delicacy in West Africa\n   - Price: $50-100/kg\n   - Harvest from soil before hatching\n   - Clean, sort, package\n\n4. Snail Slime\n   - Extract using salt/vinegar method\n   - Filter and purify\n   - Cosmetics ingredient\n   - Price: $100-500/kg\n\n5. Snail Shell\n   - Calcium supplement\n   - Craft material\n   - Animal feed additive\n   - Price: $5-15/kg\n\nMarketing:\n- Restaurants: Fresh/processed meat\n- Supermarkets: Packaged products\n- Cosmetics companies: Slime\n- Online: Dried products, supplements\n- Export: Live snails, processed",
        },
      ],
      quiz: {
        questions: [
          {
            question: "How long should snails be purged before harvest?",
            options: ["1 hour", "3-5 days", "2 weeks", "1 month"],
            correctIndex: 1,
            explanation: "Snails should be purged (fasted) for 3-5 days before harvest to clean their digestive system.",
          },
          {
            question: "At what size should snails be harvested?",
            options: ["1-2cm", "3-4cm", "5-8cm", "10-15cm"],
            correctIndex: 2,
            explanation: "Snails should be harvested when they reach 5-8cm shell diameter, typically at 6-8 months of age.",
          },
          {
            question: "What is the most valuable snail product?",
            options: ["Fresh meat", "Shells", "Snail slime", "Manure"],
            correctIndex: 2,
            explanation: "Snail slime is the most valuable at $100-500/kg, used in premium cosmetics for its skin-rejuvenating properties.",
          },
        ],
        passMark: 60,
      },
    },
    {
      title: "Business & Marketing",
      content: [
        {
          text: "Business Models\n1. Fresh Snail Sales\n   - Sell live or fresh meat\n   - Local restaurants and markets\n   - Revenue: $10-20/kg live, $15-40/kg meat\n   - Low processing requirements\n\n2. Processed Products\n   - Canned, frozen, dried\n   - Higher margin, wider market\n   - Revenue: $30-60/kg\n   - Requires processing equipment\n\n3. Premium Products\n   - Escargot (French style)\n   - Snail eggs\n   - Snail slime cosmetics\n   - Revenue: $50-500/kg\n   - Niche market, high margin\n\n4. Breeding Stock Sales\n   - Sell breeding stock to other farmers\n   - Revenue: $5-15/snail\n   - Recurring income\n   - Knowledge transfer included\n\n5. Snail Farm Tours\n   - Educational tourism\n   - Revenue: $20-50/visitor\n   - Good marketing channel\n   - Seasonal income\n\nRevenue Potential:\n- Small farm (1,000 snails): $5,000-15,000/year\n- Medium farm (10,000): $20,000-80,000/year\n- Commercial (100,000+): $100,000-500,000/year",
        },
        {
          text: "Marketing Strategies\nTarget Markets:\n1. Restaurants: French, Italian, African cuisine\n2. Supermarkets: Packaged snail products\n3. Export: Live snails to Europe, US\n4. Online: Specialty food customers\n5. Ethnic markets: African, Caribbean communities\n\nBranding:\n- 'Free-range' snails (premium)\n- 'Organic' (if using organic feed)\n- 'Locally farmed' (freshness)\n- 'Sustainable protein' (environmental)\n\nSales Channels:\n- Farmers markets: Direct, premium pricing\n- Restaurant supply: Consistent bulk orders\n- Online store: Dried, processed\n- Wholesale: Distributors, retailers\n- Export: International markets\n\nPricing Strategy:\n- Fresh live: $10-20/kg\n- Fresh meat: $15-40/kg\n- Processed: $30-60/kg\n- Premium: $50-500/kg\n- Wholesale: 30-40% discount\n\nChallenges:\n- Market education (some consumers unfamiliar)\n- Regulatory requirements\n- Processing infrastructure\n- Predator management\n- Climate control in cold regions",
        },
      ],
      quiz: {
        questions: [
          {
            question: "What is the expected annual revenue from a medium snail farm (10,000 snails)?",
            options: ["$500-1,000", "$5,000-15,000", "$20,000-80,000", "$200,000+"],
            correctIndex: 2,
            explanation: "A medium snail farm with 10,000 snails can generate $20,000-80,000 in annual revenue.",
          },
          {
            question: "What is the best way to market snails to unfamiliar consumers?",
            options: ["Lower prices aggressively", "Offer tasting samples and emphasize sustainability", "Only sell to ethnic markets", "Avoid consumer marketing"],
            correctIndex: 1,
            explanation: "Offering tasting samples and emphasizing sustainability are the best ways to introduce snails to unfamiliar consumers.",
          },
          {
            question: "What premium branding angle works best for snails?",
            options: [
              "Mass-produced",
              "Free-range and organic",
              "Imported",
              "Cheapest available",
            ],
            correctIndex: 1,
            explanation: "Free-range and organic branding commands premium prices and appeals to health-conscious, environmentally aware consumers.",
          },
        ],
        passMark: 60,
      },
    },
  ],
};

export default extraCourse52;
