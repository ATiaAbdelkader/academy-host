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

const extraCourse53: ExtraCourse = {
  title: "Rabbit Farming (Cuniculture)",
  description:
    "Master efficient rabbit meat and fiber production. Learn housing, breeding, feeding, health management, and how to build a profitable rabbitry from backyard to commercial scale.",
  category: "Innovative Farming",
  duration: "6 weeks",
  difficulty: "Beginner",
  priceCents: 0,
  durationMinutes: 2200,
  order: 53,
  instructor: "Dr. Pierre Dubois",
  tags: ["rabbits", "cuniculture", "meat", "fiber", "breeding"],
  modules: [
    {
      title: "Introduction to Rabbit Farming",
      content: [
        {
          text: "Why Farm Rabbits?\nRabbit farming is one of the most efficient livestock operations:\n\nEfficiency:\n- Convert 4 lbs feed to 1 lb meat (best FCR of any livestock)\n- Mature at 5-6 months\n- Gestation: 31 days (shortest of any mammal)\n- Litter size: 8-12 kits\n- 4-5 litters per year per doe\n- One buck serves 10 does\n- High protein, low fat meat\n- Hypoallergenic fur\n\nSpace Requirements:\n- 1 cage: 0.5m² (fits 2-3 rabbits)\n- 100 rabbits: 20-30m² total\n- Minimal land needed\n- Can raise in urban/suburban areas\n\nStartup Costs:\n- Starter (10 rabbits): $200-500\n- Small farm (50 rabbits): $1,000-3,000\n- Commercial (500+): $10,000-50,000\n\nMarket:\n- Meat: $8-15/kg (higher in specialty markets)\n- Fur/wool: $10-30/kg\n- Breeding stock: $20-100/rabbit\n- Manure: $5-10/bag\n- Growing demand for 'sustainable protein'",
        },
        {
          text: "Rabbit Breeds for Farming\nMeat Breeds:\n1. California White: 3.5-4.5 kg, white with dark points\n2. New Zealand White: 4-5 kg, all white, fast growing\n3. Champagne d'Argent: 4-5 kg, silver-grey, hardy\n4. Rex: 3.5-4.5 kg, velvety fur, good meat\n\nFiber Breeds:\n1. Angora: 3-4 kg, produces long wool\n2. English Angora: Finest fiber\n3. German Angora: Highest yield\n\nDual Purpose (Meat + Fiber):\n1. Rex: Good meat, velvety fur\n2.Silver Fox: Good meat, silver fur\n\nPet/Show:\n1. Holland Lop\n2. Mini Rex\n3. Lionhead\n\nSelection Criteria:\n- Growth rate: Weight at 8 weeks\n- Litter size: Average kits per litter\n- Feed conversion: Meat produced per feed\n- Mothering ability: Kit survival rate\n- Disease resistance\n- Temperament\n\nRecommended for Beginners:\n- New Zealand White: Most popular, proven performer\n- California White: Excellent meat quality",
        },
      ],
      quiz: {
        questions: [
          {
            question: "What is the feed conversion ratio (FCR) for rabbits?",
            options: ["2:1", "4:1", "8:1", "15:1"],
            correctIndex: 1,
            explanation: "Rabbits convert 4 lbs of feed to 1 lb of meat, making them one of the most feed-efficient livestock species.",
          },
          {
            question: "How long is a rabbit's gestation period?",
            options: ["21 days", "31 days", "60 days", "90 days"],
            correctIndex: 1,
            explanation: "Rabbits have the shortest gestation period of any mammal at just 31 days.",
          },
          {
            question: "Which rabbit breed is best for beginners?",
            options: ["Angora", "Holland Lop", "New Zealand White", "Lionhead"],
            correctIndex: 2,
            explanation: "New Zealand White is the most popular and proven performer for meat production, making it ideal for beginners.",
          },
        ],
        passMark: 60,
      },
    },
    {
      title: "Housing & Equipment",
      content: [
        {
          text: "Cage Design\nWire Cages (Most Common):\n- Size: 0.9m x 0.6m x 0.5m (for 2-3 rabbits)\n- Wire mesh: 14-16 gauge, 1.9cm x 1.9cm openings\n- Floor: Wire mesh (allows waste to fall through)\n- Solid resting board or mat\n- Removable tray for cleaning\n\nHutch Systems:\n- Wooden structure with wire mesh\n- More shelter, harder to clean\n- Better for cold climates\n- 1m x 0.6m per rabbit\n\nColony Systems:\n- Multiple rabbits in shared space\n- More natural behavior\n- Harder to manage breeding\n- Disease spread risk higher\n\nNesting Boxes:\n- For does with kits\n- Size: 30cm x 30cm x 25cm\n- Material: Wood or wire\n- Fill with straw/hay\n- Provide 1 week before due date\n\nEquipment:\n- Water bottles or nipple drinkers\n- Feeders (prevent waste)\n- Hay racks\n- Nesting boxes\n- Scale (for weighing)\n- Record keeping sheets",
        },
        {
          text: "Facility Design\nOutdoor Rabbitry:\n- Shelter from rain, wind, sun\n- Well-drained location\n- Predator-proof (dogs, cats, raccoons)\n- Easy to clean\n- Good ventilation\n\nIndoor Rabbitry:\n- Temperature: 15-25°C (59-77°F)\n- Ventilation: Fresh air without drafts\n- Lighting: 8-12 hours light\n- Humidity: 50-70%\n- Odor management: ventilation + cleaning\n\nCommercial Facility:\n- Rows of cages with central aisle\n- Manure collection system\n- Feed storage area\n- Processing area\n- Freezer storage\n- Office/record keeping space\n\nClimate Considerations:\n- Hot climates: Shade, misting, frozen water bottles\n- Cold climates: Insulation, deep bedding, wind protection\n- Humidity: Avoid dampness (causes respiratory disease)\n\nSpace per Rabbit:\n- Growing kits: 0.1m² each\n- Does with kits: 0.5m² + nesting box\n- Bucks: 0.3m² each\n- Meat rabbits: 0.2m² each",
        },
      ],
      quiz: {
        questions: [
          {
            question: "What is the recommended cage size for 2-3 rabbits?",
            options: ["0.3m x 0.3m", "0.9m x 0.6m", "1.5m x 1.5m", "2m x 2m"],
            correctIndex: 1,
            explanation: "A cage of 0.9m x 0.6m x 0.5m is recommended for 2-3 rabbits, providing adequate space for movement.",
          },
          {
            question: "What is the ideal temperature range for indoor rabbit housing?",
            options: ["5-10°C", "15-25°C", "30-35°C", "40-45°C"],
            correctIndex: 1,
            explanation: "Rabbits thrive at 15-25°C (59-77°F). They are very sensitive to heat stress above 30°C.",
          },
          {
            question: "When should nesting boxes be provided to pregnant does?",
            options: ["At breeding", "1 week before due date", "After kits are born", "Never"],
            correctIndex: 1,
            explanation: "Nesting boxes should be provided 1 week before the expected due date so the doe can prepare her nest.",
          },
        ],
        passMark: 60,
      },
    },
    {
      title: "Breeding & Reproduction",
      content: [
        {
          text: "Breeding Management\nMating System:\n- Buck-to-doe mating (most controlled)\n- Bring doe to buck's cage (does are territorial)\n- Observe mating (1-3 minutes)\n- Return doe to her cage\n- Record breeding date\n\nBreeding Schedule:\n- Age: First breeding at 5-6 months\n- Weight: At least 80% of adult weight\n- Frequency: Breed every 3-4 months\n- Litters per year: 4-5 per doe\n\nGestation:\n- Duration: 31 days\n- Nest building: Day 28-30\n- Provide nesting box: Day 24\n- Litter size: 8-12 kits\n- Birth weight: 35-50g each\n\nDoe Management:\n- Rest between litters: 2-3 months\n- Maximum breeding life: 3-4 years\n- Monitor body condition\n- Provide extra calcium during pregnancy\n- Check for milk production at day 10\n\nBuck Management:\n- One buck serves 10 does\n- Rest period: 1 week between breedings\n- Rotate bucks to prevent inbreeding\n- Monitor body condition\n- Max breeding life: 3-5 years",
        },
        {
          text: "Kit Rearing\nBirth to Week 1:\n- Kits are blind, hairless, helpless\n- Do not disturb for first 24 hours\n- Check kit count day 2 (remove dead)\n- Ensure doe is nursing (check belly fullness)\n- Maintain nest temperature (30-33°C)\n\nWeek 2:\n- Kits grow rapidly\n- Eyes open around day 10\n- Start nibbling hay/vegetables\n- Check for mastitis in doe\n\nWeek 3:\n- Kits become active\n- Begin exploring cage\n- Continue nursing\n- Provide unlimited hay\n\nWeek 4:\n- Weaning begins\n- Reduce nursing by separating doe\n- Provide grower feed\n- Monitor weight gain\n\nWeek 6-8:\n- Complete weaning\n- Separate by sex (prevent unwanted breeding)\n- Transfer to grower cages\n- Expected weight: 1-1.5 kg\n\nMortality Management:\n- Kit mortality: 10-30% (normal)\n- Common causes: Cold, starvation, mastitis\n- Monitor: Daily checks\n- Record: Litter size, birth weight, survival",
        },
      ],
      quiz: {
        questions: [
          {
            question: "How many litters can a doe produce per year?",
            options: ["1-2", "4-5", "8-10", "12+"],
            correctIndex: 1,
            explanation: "A healthy doe can produce 4-5 litters per year, with 8-12 kits per litter.",
          },
          {
            question: "When do rabbit kits open their eyes?",
            options: ["Day 1", "Day 5", "Day 10", "Day 21"],
            correctIndex: 2,
            explanation: "Rabbit kits open their eyes around day 10, which is when they begin to become more active.",
          },
          {
            question: "How many does can one buck serve?",
            options: ["2-3", "5-7", "10", "20+"],
            correctIndex: 2,
            explanation: "One buck can serve approximately 10 does, making rabbit breeding very efficient.",
          },
        ],
        passMark: 60,
      },
    },
    {
      title: "Feeding & Nutrition",
      content: [
        {
          text: "Rabbit Nutrition Basics\nRabbits are herbivores with specific needs:\n\nDiet Components:\n1. Hay (Unlimited)\n   - Timothy hay: Best for adults\n   - Alfalfa hay: Best for growing kits and pregnant does\n   - Should be 80% of diet\n   - Essential for dental health and digestion\n\n2. Pellets (Measured)\n   - 1/4 cup per 2.7 kg body weight\n   - 16-18% protein for adults\n   - 18-20% protein for growing kits\n   - Fresh, store in cool/dry place\n\n3. Fresh Vegetables (Daily)\n   - Leafy greens: Romaine, kale, parsley\n   - Carrots, bell peppers (limited)\n   - Introduce new foods gradually\n   - Amount: 1-2 cups per 2.7 kg body weight\n\n4. Treats (Limited)\n   - Fruits: Apple, banana (small pieces)\n   - Occasional only\n   - Limit: 1 tablespoon per day\n\nFeeding Schedule:\n- Hay: Available 24/7\n- Pellets: Once or twice daily\n- Vegetables: Once daily\n- Fresh water: Always available\n- Treats: Once daily (small amount)",
        },
        {
          text: "Special Needs\nGrowing Kits (0-8 weeks):\n- Milk: First 3 weeks (from doe)\n- Hay: Start at 2 weeks\n- Pellets: Start at 3 weeks\n- Vegetables: Start at 4 weeks\n- Protein: 18-20%\n\nBreeding Does:\n- Increase pellets during pregnancy\n- Alfalfa hay preferred\n- Extra calcium: Oyster shell\n- Increase feed 25% last week of pregnancy\n- Nursing does: Unlimited pellets\n\nBucks:\n- Standard adult diet\n- Maintain lean body condition\n- Avoid obesity (reduces fertility)\n\nSenior Rabbits (5+ years):\n- Monitor weight closely\n- Dental checks (molar spurs)\n- Adjust pellet amount\n- Continue unlimited hay\n\nFoods to Avoid:\n✗ Iceberg lettuce (causes diarrhea)\n✗ Potatoes\n✗ Corn\n✗ Chocolate\n✗ Avocado\n✗ Rhubarb\n✗ Onions/garlic",
        },
      ],
      quiz: {
        questions: [
          {
            question: "What percentage of a rabbit's diet should be hay?",
            options: ["30%", "50%", "80%", "95%"],
            correctIndex: 2,
            explanation: "Hay should make up approximately 80% of a rabbit's diet, essential for dental health and digestion.",
          },
          {
            question: "What protein level do growing kits need?",
            options: ["10-12%", "14-16%", "18-20%", "25-30%"],
            correctIndex: 2,
            explanation: "Growing kits need 18-20% protein in their diet for proper growth and development.",
          },
          {
            question: "Which food should be avoided for rabbits?",
            options: ["Romaine lettuce", "Timothy hay", "Iceberg lettuce", "Carrots"],
            correctIndex: 2,
            explanation: "Iceberg lettuce should be avoided as it contains lactucarium which can cause diarrhea in rabbits.",
          },
        ],
        passMark: 60,
      },
    },
    {
      title: "Health & Disease Management",
      content: [
        {
          text: "Common Rabbit Diseases\n1. Pasteurella (Snuffles)\n   - Symptoms: Nasal discharge, sneezing, eye mucus\n   - Treatment: Antibiotics (veterinary prescribed)\n   - Prevention: Good ventilation, low stress\n\n2. Coccidiosis\n   - Symptoms: Diarrhea, weight loss, dehydration\n   - Treatment: Toltrazuril or sulfa drugs\n   - Prevention: Clean cages, dry conditions\n\n3. Myxomatosis\n   - Symptoms: Swelling around eyes/ears, fever\n   - Treatment: Supportive care (often fatal)\n   - Prevention: Vaccination, mosquito control\n\n4. Ear Mites\n   - Symptoms: Head shaking, dark ear crusts\n   - Treatment: Ivermectin drops\n   - Prevention: Regular cleaning, quarantine new rabbits\n\n5. Sore Hocks (Pododermatitis)\n   - Symptoms: Redness, sores on bottom of feet\n   - Treatment: Soft resting surface, antiseptic\n   - Prevention: Wire mesh size correct, solid resting board\n\n6. GI Stasis\n   - Symptoms: No droppings, bloating, lethargy\n   - Treatment: Fluids, pain relief, gut motility drugs\n   - Prevention: Unlimited hay, exercise, low stress",
        },
        {
          text: "Preventive Health Care\nDaily:\n- Observe behavior and appetite\n- Check droppings (should be round, dry)\n- Clean water bottles\n- Remove uneaten fresh food\n\nWeekly:\n- Clean and sanitize cages\n- Check weight\n- Inspect teeth (overgrowth?)\n- Check ears for mites\n- Trim nails if needed\n\nMonthly:\n- Deep clean facility\n- Check breeding stock condition\n- Review health records\n- Rotate feed stock\n\nQuarterly:\n- Worming (if needed)\n- Dental checks\n- Full health assessment\n\nBiosecurity:\n- Quarantine new rabbits 2 weeks\n- Limit visitor access\n- Change clothes between facilities\n- Wash hands before handling\n- Separate sick rabbits immediately\n\nWhen to Call a Vet:\n- Nasal discharge lasting >3 days\n- Diarrhea not resolved in 24 hours\n- Not eating for >24 hours\n- Difficulty breathing\n- Swelling or lumps",
        },
      ],
      quiz: {
        questions: [
          {
            question: "What is the most common cause of death in young rabbits?",
            options: ["Predators", "Coccidiosis", "Heat stroke", "Old age"],
            correctIndex: 1,
            explanation: "Coccidiosis is the most common cause of death in young rabbits, caused by parasites in contaminated environments.",
          },
          {
            question: "How often should rabbit cages be cleaned?",
            options: ["Daily", "Weekly", "Monthly", "Yearly"],
            correctIndex: 1,
            explanation: "Rabbit cages should be cleaned and sanitized weekly to prevent disease and maintain hygiene.",
          },
          {
            question: "What is the first sign of GI stasis in rabbits?",
            options: [
              "Increased appetite",
              "No droppings and lethargy",
              "Excessive thirst",
              "Hyperactivity",
            ],
            correctIndex: 1,
            explanation: "The first sign of GI stasis is typically no droppings and lethargy, which requires immediate veterinary attention.",
          },
        ],
        passMark: 60,
      },
    },
    {
      title: "Harvesting & Marketing",
      content: [
        {
          text: "Meat Production Harvesting\nWhen to Harvest:\n- Age: 8-12 weeks (fryers)\n- Weight: 1.8-2.5 kg live weight\n- Fast: 12-24 hours before harvest\n- Clean water available\n\nHarvesting Methods:\n1. Cervical Dislocation (Small Scale)\n   - Quick, humane when done correctly\n   - Requires training\n   - Most common small-farm method\n\n2. Electrical stunning + exsanguination\n   - More humane for larger operations\n   - Requires equipment\n   - Approved method in most countries\n\n3. CO2 stunning\n   - Humane, stress-free\n   - Requires CO2 supply\n   - Commercial standard\n\nPost-Harvest Processing:\n1. Skinning or fur-on processing\n2. Evisceration (remove organs)\n3. Rinse thoroughly\n4. Chill rapidly (0-4°C)\n5. Age 24-48 hours (tenderize)\n6. Cut into portions or sell whole\n7. Package and label\n8. Freeze for storage (-18°C, 6-12 months)\n\nYield:\n- Live to dressed: 50-55%\n- 2.5 kg live → 1.3 kg dressed meat",
        },
        {
          text: "Marketing & Sales\nProducts:\n1. Fresh rabbit meat\n   - Whole: $8-12/kg\n   - Cut portions: $15-25/kg\n   - Premium/organic: $20-35/kg\n\n2. Processed products\n   - Sausages: $20-30/kg\n   - Smoked: $25-40/kg\n   - Jerky: $30-50/kg\n\n3. Fur/wool\n   - Raw fur: $10-20/pelt\n   - Processed: $20-50/pelt\n   - Angora wool: $30-60/kg\n\n4. Breeding stock\n   - Pet quality: $20-50\n   - Show quality: $50-200\n   - Breeding pairs: $100-300\n\n5. Manure\n   - Bagged: $5-10/bag\n   - Excellent fertilizer\n   - Can sell to gardeners\n\nTarget Customers:\n- Restaurants: French, Italian, Asian cuisine\n- Health-conscious consumers\n- Ethnic communities\n- Pet food manufacturers\n- Fur/craft markets\n\nMarketing Tips:\n- Emphasize 'sustainable protein'\n- Highlight feed efficiency\n- Offer tasting events\n- Build restaurant relationships\n- Use social media",
        },
      ],
      quiz: {
        questions: [
          {
            question: "At what age should meat rabbits be harvested?",
            options: ["4-6 weeks", "8-12 weeks", "6 months", "1 year"],
            correctIndex: 1,
            explanation: "Meat rabbits should be harvested at 8-12 weeks when they reach 1.8-2.5 kg live weight for optimal meat quality.",
          },
          {
            question: "What is the live-to-dressed weight ratio?",
            options: ["70-80%", "50-55%", "30-40%", "20-25%"],
            correctIndex: 1,
            explanation: "The live-to-dressed weight ratio is approximately 50-55%, meaning a 2.5 kg rabbit yields about 1.3 kg of meat.",
          },
          {
            question: "What is the premium price range for organic rabbit meat?",
            options: ["$5-8/kg", "$15-25/kg", "$30-50/kg", "$100+/kg"],
            correctIndex: 1,
            explanation: "Premium/organic rabbit meat sells for $20-35/kg, significantly higher than conventional meat.",
          },
        ],
        passMark: 60,
      },
    },
  ],
};

export default extraCourse53;
