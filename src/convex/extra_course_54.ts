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

const extraCourse54: ExtraCourse = {
  title: "Poultry Science & Egg Production",
  description:
    "From backyard chickens to commercial egg production. Master breed selection, housing, nutrition, egg quality, flock management, and how to build a profitable poultry operation.",
  category: "Innovative Farming",
  duration: "8 weeks",
  difficulty: "Beginner",
  priceCents: 0,
  durationMinutes: 2600,
  order: 54,
  instructor: "Dr. Margaret Okonkwo",
  tags: ["poultry", "chickens", "eggs", "layers", "backyard"],
  modules: [
    {
      title: "Introduction to Poultry Farming",
      content: [
        {
          text: "Why Poultry Farming?\nPoultry is the most popular and accessible form of animal agriculture:\n\nAdvantages:\n- Small space: 10 chickens need 4-10m²\n- Quick returns: First eggs at 18-20 weeks\n- Daily income: Eggs every day\n- Dual purpose: Meat + eggs\n- Low startup cost: $200-1,000 for backyard\n- Self-sustaining: Hatching your own replacement stock\n- Pest control: Chickens eat insects\n- Fertilizer: Excellent manure\n\nPoultry Types:\n1. Layers (Egg Production)\n   - Production: 250-320 eggs/year\n   - Peak: First 2 years\n   - Breeds: ISA Brown, Lohmann, Hy-Line\n\n2. Broilers (Meat Production)\n   - Harvest: 6-8 weeks\n   - Weight: 2-3 kg\n   - Breeds: Cornish Cross, Ross, Cobb\n\n3. Dual Purpose\n   - Good for eggs AND meat\n   - Breeds: Rhode Island Red, Australorp, Orpington\n\n4. Heritage Breeds\n   - Rare breeds, conservation\n   - Lower production, higher value\n   - Breeds: Sussex, Plymouth Rock, Wyandotte",
        },
        {
          text: "Getting Started with Backyard Chickens\nEquipment Needed:\n1. Coop: 0.4m² per bird (indoor), 1m² per bird (outdoor)\n2. Nesting boxes: 1 per 3-4 hens\n3. Roosts: 20-30cm per bird\n4. Feeders: 1 per 5-10 birds\n5. Waterers: 1 per 10-15 birds\n6. Grit container\n7. Dust bath area\n\nSpace Requirements:\n- Backyard (6-12 chickens): 10-30m² total\n- Small farm (50-100): 200-500m²\n- Commercial (1,000+): Specialized housing\n\nStartup Costs:\n- Backyard: $200-1,000\n- Small farm: $5,000-20,000\n- Commercial: $50,000-500,000+\n\nClimate Considerations:\n- Hot: Shade, ventilation, frozen water\n- Cold: Insulation, deep litter, wind protection\n- Rainy: Covered run, drainage\n- Humidity: Ventilation critical",
        },
      ],
      quiz: {
        questions: [
          {
            question: "How many eggs can a good laying hen produce per year?",
            options: ["100-150", "250-320", "400-500", "500+"],
            correctIndex: 1,
            explanation: "Good laying hens produce 250-320 eggs per year, with peak production in the first 2 years.",
          },
          {
            question: "How much space does one chicken need indoors?",
            options: ["0.1m²", "0.4m²", "1m²", "2m²"],
            correctIndex: 1,
            explanation: "Chickens need approximately 0.4m² of indoor space per bird for healthy, comfortable living.",
          },
          {
            question: "What is the most important consideration for hot climates?",
            options: ["More feed", "Shade and ventilation", "More nesting boxes", "Heating"],
            correctIndex: 1,
            explanation: "In hot climates, shade and ventilation are critical to prevent heat stress and maintain egg production.",
          },
        ],
        passMark: 60,
      },
    },
    {
      title: "Housing & Infrastructure",
      content: [
        {
          text: "Coop Design\nSmall Backyard Coop:\n- Size: 1.2m x 1.2m for 4-6 hens\n- Height: 1.5-2m (human access)\n- Nesting boxes: 30cm x 30cm x 30cm\n- Roosts: 15-20cm above highest nesting box\n- Ventilation: Windows or vents near roof\n- Door: Predator-proof latch\n\nRun Design:\n- Attached to coop\n- Wire mesh (hardware cloth, not chicken wire)\n- Dig barrier: 30cm underground\n- Roof: For predator protection\n- Size: Minimum 1m² per bird\n\nCommercial Layer House:\n- Cage-free: 0.07m² per bird (floor)\n- Enriched colony: 0.075m² per bird\n- Free-range: 4m² per bird outdoor\n- Multi-tier aviary systems\n- Automated egg collection\n- Feed and water systems\n\nVentilation:\n- Cross-ventilation: Windows on opposite sides\n- Ridge vent: Hot air escape\n- Fan systems: For large houses\n- Target: 1-2 air changes per hour\n\nPredator Protection:\n- Hardware cloth (not chicken wire)\n- Secure latches (predators can open simple locks)\n- Underground dig barrier\n- Secure coop at night",
        },
        {
          text: "Equipment\nFeeders:\n- Hanging feeders: Reduce waste\n- Trough feeders: For larger flocks\n- Capacity: 1 bird = 150g feed/day\n- Clean daily\n\nWaterers:\n- Nipple drinkers: Most hygienic\n- Bell waterers: Simple, effective\n- Capacity: 1 bird = 500ml water/day\n- Clean weekly\n- Freeze protection in winter\n\nNesting Boxes:\n- Size: 30cm x 30cm x 30cm\n- 1 box per 3-4 hens\n- Bedding: Straw, wood shavings\n- Dark, private location\n- Collect eggs 2-3 times daily\n\nRoosts:\n- Height: 30-60cm above floor\n- Width: 10-15cm per bird\n- Material: 2x4 lumber (2-inch side up)\n- Spacing: 30cm between roosts\n\nLighting:\n- Layers need 14-16 hours light\n- Use timer for consistent light\n- Natural light supplemented in winter\n- Avoid sudden light changes",
        },
      ],
      quiz: {
        questions: [
          {
            question: "How much feed does one laying hen consume daily?",
            options: ["50g", "150g", "300g", "500g"],
            correctIndex: 1,
            explanation: "One laying hen consumes approximately 150g of feed per day.",
          },
          {
            question: "What type of wire should be used for predator protection?",
            options: ["Chicken wire", "Hardware cloth", "Barbed wire", "Electric fence"],
            correctIndex: 1,
            explanation: "Hardware cloth (welded wire mesh) should be used instead of chicken wire, which predators can easily break through.",
          },
          {
            question: "How many hours of light do laying hens need?",
            options: ["8-10 hours", "14-16 hours", "20-22 hours", "24 hours"],
            correctIndex: 1,
            explanation: "Laying hens need 14-16 hours of light per day to maintain consistent egg production.",
          },
        ],
        passMark: 60,
      },
    },
    {
      title: "Nutrition & Feeding",
      content: [
        {
          text: "Poultry Nutrition\nLayer Feed Requirements:\n- Protein: 16-18% (for layers)\n- Calcium: 3.5-4.5% (for shell formation)\n- Phosphorus: 0.3-0.4%\n- Methionine: 0.3-0.4%\n- Energy: 2,700-2,900 kcal/kg\n\nFeed Types:\n1. Starter Feed (0-8 weeks)\n   - 20-22% protein\n   - Crumble form\n   - Medicated or non-medicated\n\n2. Grower Feed (8-18 weeks)\n   - 16-18% protein\n   - Pellet or crumble form\n\n3. Layer Feed (18+ weeks)\n   - 16-18% protein\n   - High calcium (3.5-4.5%)\n   - Pellet or mash form\n\n4. Scratch Grains (Treats)\n   - Corn, wheat, oats\n   - Maximum 10% of diet\n   - Scatter on ground for activity\n\nCalcium Supplement:\n- Oyster shell: Available free choice\n- Critical for strong eggshells\n- Provide in separate container\n- Never mix with feed (too much calcium)",
        },
        {
          text: "Feeding Management\nFree-Choice Feeding:\n- Feed available all day\n- Simple, low labor\n- May lead to waste and obesity\n- Best for: Backyard flocks\n\nRestricted Feeding:\n- Set amount at set times\n- Better weight control\n- Less waste\n- Best for: Commercial layers\n\nFeeding Schedule:\n- Morning: Feed immediately at light\n- Midday: Check water, observe flock\n- Evening: Top up if needed\n- Night: Remove wet/spoiled food\n\nFeed Conversion:\n- Layer: 2 kg feed per dozen eggs\n- Broiler: 1.8-2.0 kg feed per 1 kg gain\n- Target FCR: Lower = more efficient\n\nWater:\n- Always available\n- 2x feed intake (500ml per bird/day)\n- Clean daily\n- Add electrolytes in heat stress\n- Apple cider vinegar: 1 tbsp/gallon (optional)\n\nSeasonal Adjustments:\n- Summer: Increase water, add electrolytes\n- Winter: Increase feed 10-15% (energy for warmth)\n- Molting: Increase protein to 20%",
        },
      ],
      quiz: {
        questions: [
          {
            question: "What protein level do layer hens need?",
            options: ["10-12%", "16-18%", "22-25%", "30%+"],
            correctIndex: 1,
            explanation: "Layer hens need 16-18% protein in their diet for optimal egg production.",
          },
          {
            question: "How much calcium should layer feed contain?",
            options: ["1-2%", "3.5-4.5%", "6-8%", "10%+"],
            correctIndex: 1,
            explanation: "Layer feed should contain 3.5-4.5% calcium for strong eggshell formation.",
          },
          {
            question: "How much water does one laying hen need per day?",
            options: ["100ml", "250ml", "500ml", "1 liter"],
            correctIndex: 2,
            explanation: "One laying hen needs approximately 500ml of water per day, which is about twice the feed intake.",
          },
        ],
        passMark: 60,
      },
    },
    {
      title: "Egg Production & Quality",
      content: [
        {
          text: "Egg Production Cycle\nThe Egg-Laying Process:\n1. Ovary releases yolk (25 hours before lay)\n2. Yolk travels through oviduct (20-22 hours)\n3. Albumen (egg white) added\n4. Membranes formed\n5. Shell deposited (20 hours)\n6. Pigment applied (if colored)\n7. Egg laid\n\nProduction Timeline:\n- Pullets start laying: 18-22 weeks\n- Peak production: 25-45 weeks\n- Production rate: 90-95% at peak\n- Declining: 5% per year after peak\n- End of lay: 72-80 weeks (commercial)\n\nEgg Size Development:\n- Small (S): 43-50g (first 2 weeks)\n- Medium (M): 50-57g\n- Large (L): 57-64g\n- Extra Large (XL): 64-71g\n- Jumbo (J): 71g+\n\nFactors Affecting Production:\n- Light: 14-16 hours required\n- Nutrition: Balanced layer feed\n- Health: Disease-free flock\n- Stress: Minimize disturbances\n- Age: Peak in first year\n- Breed: Genetics play major role",
        },
        {
          text: "Egg Quality & Grading\nEgg Quality Factors:\n1. Shell Quality\n   - Smooth, clean, no cracks\n   - Thick shells = good calcium nutrition\n   - Avoid thin-shelled eggs\n\n2. Albumen Quality\n   - Thick, stands up around yolk\n   - Indicates freshness\n   - Thin/runny = old egg\n\n3. Yolk Quality\n   - Bright orange/yellow\n   - Round, stands up\n   - Centered in egg\n   - Color from feed (marigold, corn)\n\n4. Blood Spots\n   - Small red spots on yolk\n   - Normal, safe to eat\n   - Cause: Small blood vessel rupture\n\nEgg Grading (US):\n- AA: Highest quality, thick albumen\n- A: Good quality, normal albumen\n- B: Acceptable, thinner albumen\n\nCandling:\n- Hold egg up to bright light\n- Check for cracks, blood spots, freshness\n- Air cell size indicates age\n- Fresh: Small air cell\n- Old: Large air cell\n\nStorage:\n- Temperature: 4-7°C (refrigerator)\n- Humidity: 70-80%\n- Pointy end down\n- Don't wash (removes bloom)\n- Shelf life: 4-5 weeks refrigerated",
        },
      ],
      quiz: {
        questions: [
          {
            question: "When do pullets start laying eggs?",
            options: ["8-10 weeks", "12-14 weeks", "18-22 weeks", "30+ weeks"],
            correctIndex: 2,
            explanation: "Pullets (young hens) typically start laying eggs at 18-22 weeks of age.",
          },
          {
            question: "What does a small air cell indicate when candling an egg?",
            options: ["The egg is old", "The egg is fresh", "The egg is spoiled", "The egg has a blood spot"],
            correctIndex: 1,
            explanation: "A small air cell indicates the egg is fresh — the air cell grows larger as the egg ages.",
          },
          {
            question: "How should eggs be stored?",
            options: [
              "At room temperature",
              "Refrigerated at 4-7°C, pointy end down",
              "In direct sunlight",
              "Washed and then stored",
            ],
            correctIndex: 1,
            explanation: "Eggs should be refrigerated at 4-7°C with the pointy end down, and should not be washed (removes protective bloom).",
          },
        ],
        passMark: 60,
      },
    },
    {
      title: "Health & Disease Management",
      content: [
        {
          text: "Common Poultry Diseases\n1. Marek's Disease\n   - Symptoms: Paralysis, tumors\n   - Treatment: None (viral)\n   - Prevention: Vaccination at hatchery\n\n2. Newcastle Disease\n   - Symptoms: Respiratory distress, diarrhea\n   - Treatment: Supportive care\n   - Prevention: Vaccination\n\n3. Coccidiosis\n   - Symptoms: Bloody droppings, lethargy\n   - Treatment: Amprolium in water\n   - Prevention: Clean litter, medicated feed\n\n4. Bumblefoot\n   - Symptoms: Swollen foot pad, lameness\n   - Treatment: Antibiotics, foot soak\n   - Prevention: Soft roosts, clean flooring\n\n5. Egg Binding\n   - Symptoms: Straining, lethargy, no eggs\n   - Treatment: Calcium, warmth, vet help\n   - Prevention: Good nutrition, exercise\n\n6. Respiratory Infections\n   - Symptoms: Sneezing, nasal discharge\n   - Treatment: Antibiotics (bacterial)\n   - Prevention: Ventilation, low dust",
        },
        {
          text: "Preventive Health Management\nDaily:\n- Observe flock behavior\n- Check water and feed\n- Collect eggs\n- Look for sick birds\n\nWeekly:\n- Clean feeders and waterers\n- Check for parasites\n- Monitor egg production\n- Remove dead/dying birds\n\nMonthly:\n- Deep clean coop\n- Check ventilation\n- Review health records\n- Dust bath availability\n\nVaccination Schedule:\n- Day 1: Marek's disease\n- Week 1: Newcastle + Bronchitis\n- Week 8: Fowl pox\n- Week 16: Newcastle booster\n- Annual: Boosters as needed\n\nBiosecurity:\n- Limit visitors\n- Change clothes/shoes\n- Quarantine new birds (2 weeks)\n- Separate sick birds\n- Clean equipment between flocks\n\nParasite Control:\n- Internal: Deworm every 3-6 months\n- External: Dust bath, diatomaceous earth\n- Mites: Treat coop with permethrin",
        },
      ],
      quiz: {
        questions: [
          {
            question: "What is the most important preventive measure for poultry diseases?",
            options: ["Antibiotics", "Vaccination and biosecurity", "More feed", "More space"],
            correctIndex: 1,
            explanation: "Vaccination and biosecurity are the most important preventive measures for poultry diseases.",
          },
          {
            question: "What causes coccidiosis in chickens?",
            options: [
              "Bacteria",
              "Parasites in contaminated environment",
              "Virus",
              "Poor ventilation",
            ],
            correctIndex: 1,
            explanation: "Coccidiosis is caused by parasites (coccidia) in contaminated environments, particularly wet litter.",
          },
          {
            question: "How long should new birds be quarantined?",
            options: ["1 day", "1 week", "2 weeks", "2 months"],
            correctIndex: 2,
            explanation: "New birds should be quarantined for 2 weeks to ensure they are healthy before introducing to the existing flock.",
          },
        ],
        passMark: 60,
      },
    },
    {
      title: "Business & Marketing",
      content: [
        {
          text: "Business Models\n1. Backyard Egg Sales\n   - 6-12 hens, sell extras\n   - Revenue: $2,000-5,000/year\n   - Direct to neighbors, farmers market\n   - Low cost, low labor\n\n2. Small Farm Egg Production\n   - 50-200 hens\n   - Revenue: $10,000-40,000/year\n   - Farmers market, restaurants, CSA\n   - Part-time operation\n\n3. Pasture-Raised Egg Business\n   - 500-2,000 hens on pasture\n   - Revenue: $50,000-200,000/year\n   - Premium pricing ($6-12/dozen)\n   - Full-time operation\n\n4. Commercial Egg Production\n   - 5,000+ hens\n   - Revenue: $200,000-1,000,000+/year\n   - Wholesale and retail\n   - Full-time, employees\n\n5. Hatching Egg Business\n   - Sell fertile eggs for incubation\n   - Revenue: $3-10/egg\n   - Heritage breeds command premium\n   - Online sales\n\nPricing:\n- Conventional: $2-4/dozen\n- Free-range: $4-6/dozen\n- Pasture-raised: $6-12/dozen\n- Organic: $8-15/dozen\n- Heritage/rare: $10-20/dozen",
        },
        {
          text: "Marketing Strategies\nDirect Marketing:\n- Farm stand: On-farm sales\n- Farmers market: Premium prices\n- CSA: Weekly egg subscriptions\n- Door-to-door delivery\n- Online ordering\n\nB2B:\n- Restaurants: Consistent supply\n- Bakeries: Wholesale eggs\n- Grocery stores: Branded cartons\n- Food co-ops: Community sales\n\nBranding:\n- 'Pasture-raised' (highest premium)\n- 'Free-range' (good premium)\n- 'Organic' (certification required)\n- 'Heritage breed' (unique selling point)\n- 'Local' (freshness advantage)\n\nPackaging:\n- Cartons: 6, 12, or 18 count\n- Labels: Farm name, date, breed\n- Freshness date: 30 days from lay\n- Organic certification logos\n\nRegulations:\n- Check local egg laws\n- Egg grading (if selling wholesale)\n- Food safety requirements\n- Labeling requirements\n- Farm name and address on carton",
        },
      ],
      quiz: {
        questions: [
          {
            question: "What is the premium price range for pasture-raised eggs?",
            options: ["$1-2/dozen", "$3-4/dozen", "$6-12/dozen", "$20+/dozen"],
            correctIndex: 2,
            explanation: "Pasture-raised eggs command premium prices of $6-12 per dozen due to higher production costs and consumer demand.",
          },
          {
            question: "What is the best marketing channel for small egg farms?",
            options: ["Wholesale to supermarkets", "Farmers markets and direct sales", "Online only", "Export"],
            correctIndex: 1,
            explanation: "Farmers markets and direct sales are the best channels for small egg farms, providing premium prices and customer relationships.",
          },
          {
            question: "What labeling is required for selling eggs?",
            options: [
              "No labeling needed",
              "Farm name, address, and freshness date",
              "Only a price sticker",
              "Nutritional information only",
            ],
            correctIndex: 1,
            explanation: "Egg cartons must include the farm name, address, and freshness date, along with any applicable certification logos.",
          },
        ],
        passMark: 60,
      },
    },
  ],
};

export default extraCourse54;
