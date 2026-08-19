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

const extraCourse42: ExtraCourse = {
  title: "Black Soldier Fly Farming",
  description:
    "Master the fastest-growing protein source in agriculture. Learn BSF lifecycle, waste-to-feed conversion, larval rearing, and how to build a profitable BSF farm for animal feed and waste management.",
  category: "Innovative Farming",
  duration: "8 weeks",
  difficulty: "Intermediate",
  priceCents: 0,
  durationMinutes: 2700,
  order: 42,
  instructor: "Dr. Kezia Mwangi",
  tags: ["BSF", "insects", "protein", "waste-to-feed", "livestock feed"],
  modules: [
    {
      title: "Introduction to Black Soldier Fly",
      content: [
        {
          type: "paragraph",
          text: "What is the Black Soldier Fly?\nThe Black Soldier Fly (Hermetia illucens) is a non-pest fly species that has revolutionized sustainable agriculture. Unlike houseflies, BSF do not spread disease, do not bite, and do not carry pathogens. Their larvae are nature's most efficient decomposers, converting organic waste into high-quality protein and fat in just 14 days.\n\nBSF farming is one of the most exciting innovations in agriculture because it solves two problems at once: organic waste management and animal feed production. A single BSF colony can process tons of waste while producing protein-rich larvae that replace expensive fishmeal and soy in animal diets.\n\nThe global BSF market is projected to reach $8 billion by 2030, driven by demand for sustainable protein sources and waste management solutions. Countries like Vietnam, Kenya, South Korea, and the Netherlands are leading BSF commercialization.",
        },
        {
          text: "Why BSF Farming Matters\n1. Waste Reduction: BSF larvae reduce organic waste volume by 70-80%\n2. Protein Production: Larvae contain 40-45% protein and 15-35% fat\n3. Carbon Footprint: 100x lower greenhouse gas emissions than traditional livestock feed\n4. Water Efficiency: Requires minimal water compared to crop-based feeds\n5. Land Use: Vertical farming systems need 1/100th the land of soy production\n6. Nutrient Cycling: Frass (residual material) is excellent organic fertilizer\n\nThe waste-to-feed cycle: Organic waste → BSF larvae consume → Larvae become animal feed → Frass becomes fertilizer → Crops grow → Food waste begins the cycle again.\n\nThis circular economy model is what makes BSF farming so powerful for sustainable agriculture.",
        },
      ],
      quiz: {
        questions: [
          {
            question:
              "What percentage of protein do Black Soldier Fly larvae contain?",
            options: ["10-15%", "20-25%", "40-45%", "60-65%"],
            correctIndex: 2,
            explanation:
              "BSF larvae contain 40-45% protein, making them an excellent protein source for animal feed.",
          },
          {
            question:
              "How much organic waste volume do BSF larvae reduce?",
            options: ["10-20%", "30-40%", "50-60%", "70-80%"],
            correctIndex: 3,
            explanation:
              "BSF larvae reduce organic waste volume by 70-80%, making them highly efficient decomposers.",
          },
          {
            question: "Why don't BSF spread disease?",
            options: [
              "They are too small",
              "They are not pests — they don't bite or carry pathogens",
              "They only eat clean food",
              "They live in sealed environments",
            ],
            correctIndex: 1,
            explanation:
              "Unlike houseflies, BSF are non-pest insects that don't bite, don't carry pathogens, and don't spread disease.",
          },
        ],
        passMark: 60,
      },
    },
    {
      title: "BSF Biology & Lifecycle",
      content: [
        {
          text: "The Complete BSF Lifecycle\nThe BSF lifecycle from egg to harvest takes approximately 45 days:\n\n1. Egg Stage (4 days): Adult females lay 500-900 eggs in crevices near organic matter. Eggs are tiny, rice-shaped, and cream-colored.\n2. Early Instar (1-3 days): Newly hatched larvae are microscopic and begin feeding on microorganisms on the waste surface.\n3. Feeding Instar (14-18 days): Rapid growth phase where larvae consume 2-3x their body weight daily. This is the primary waste-processing stage.\n4. Pre-Pupa Stage (14 days): Larvae stop eating, turn dark brown, and develop a tough exoskeleton. They seek dry, dark areas to pupate.\n5. Pupa Stage (10-14 days): Metamorphosis occurs inside the pupal case.\n6. Adult Stage (5-8 days): Adults emerge, mate, and the cycle restarts. Adults do not eat — their only purpose is reproduction.\n\nThe harvest window is critical: larvae should be harvested at the late feeding/early pre-pupa stage when protein and fat content are highest.",
        },
        {
          text: "Optimal Environmental Conditions\nTemperature: Larvae thrive at 27-30°C (80-86°F). Below 15°C, development stops. Above 35°C, mortality increases.\nHumidity: 60-70% relative humidity is ideal for larvae. Adults need 70-80% for mating.\nLight: Adults require 12-14 hours of light for mating. Larvae prefer darkness.\nSubstrate Moisture: Waste should be 60-70% moisture. Too wet = anaerobic conditions. Too dry = slow processing.\n\nGrowth Rate Comparison:\n- Day 1: 1mg\n- Day 7: 50mg\n- Day 14: 1,500mg (1.5g)\n- Day 21: 2,000mg (2g) — optimal harvest\n- Pre-pupa: 2,500mg (2.5g)\n\nA single female can lay 600-900 eggs per clutch, with 2-3 clutches in her lifetime. A small colony of 1,000 females can produce millions of larvae monthly.",
        },
      ],
      quiz: {
        questions: [
          {
            question:
              "How long does the complete BSF lifecycle take?",
            options: ["14 days", "30 days", "45 days", "90 days"],
            correctIndex: 2,
            explanation:
              "The complete BSF lifecycle from egg to adult takes approximately 45 days.",
          },
          {
            question:
              "When should BSF larvae be harvested for maximum nutrition?",
            options: [
              "Day 7",
              "Day 14 (late feeding/early pre-pupa)",
              "Day 30",
              "After pupation",
            ],
            correctIndex: 1,
            explanation:
              "Larvae should be harvested at late feeding/early pre-pupa stage when protein and fat content are highest.",
          },
          {
            question:
              "What is the optimal temperature range for BSF larvae?",
            options: ["15-20°C", "20-25°C", "27-30°C", "35-40°C"],
            correctIndex: 2,
            explanation:
              "BSF larvae thrive at 27-30°C (80-86°F). Below 15°C development stops, above 35°C mortality increases.",
          },
        ],
        passMark: 60,
      },
    },
    {
      title: "Setting Up a BSF Farm",
      content: [
        {
          text: "Small-Scale BSF Farm Setup\nStarting a BSF farm requires minimal investment compared to traditional livestock:\n\nEquipment Needed:\n1. Rearing bins: 100L plastic containers with drainage holes (start with 10-20)\n2. Breeding cage: Mesh enclosure (1m x 1m x 1.5m) for adult flies\n3. Egg collection stations: Corrugated cardboard strips in crevices\n4. Organic waste source: Kitchen waste, fruit/vegetable processing waste, brewery waste\n5. Heating system: For cold climates (heat mats or incubator)\n6. Moisture management: Spray bottles, drainage trays\n\nSpace Requirements:\n- Small scale (100kg waste/day): 20-30m²\n- Medium scale (1 ton/day): 100-200m²\n- Commercial (10+ tons/day): 1,000m²+\n\nInitial Investment Estimate:\n- Small scale: $2,000-5,000\n- Medium scale: $15,000-30,000\n- Commercial: $100,000+",
        },
        {
          text: "Waste Stream Management\nNot all waste is suitable for BSF. The best substrates include:\n\nIdeal Feedstocks:\n- Fruit and vegetable waste (optimal)\n- Brewery/spent grain\n- Bakery waste\n- Coffee grounds\n- Market waste\n- Restaurant pre-consumer waste\n\nAvoid:\n- Meat and dairy (attracts pests, creates odor)\n- Citrus (too acidic)\n- Onions and garlic (repellent properties)\n- Oily/greasy food\n- Dog/cat feces\n\nFeedstock Preparation:\n1. Shred or blend waste to 1-2cm particle size\n2. Mix with carbon source (bran, sawdust) at 3:1 ratio\n3. Target 60-70% moisture content\n4. Pre-ferment for 24-48 hours to develop microbial colonies\n\nFeed Rate: Each larvae colony processes approximately 1kg of waste per 1,000 larvae per day. Scale your colony size to match your waste stream.",
        },
      ],
      quiz: {
        questions: [
          {
            question:
              "Which waste type is IDEAL for BSF larvae feeding?",
            options: [
              "Meat scraps",
              "Fruit and vegetable waste",
              "Citrus peels",
              "Dog feces",
            ],
            correctIndex: 1,
            explanation:
              "Fruit and vegetable waste is the ideal feedstock for BSF larvae. Meat, citrus, and pet waste should be avoided.",
          },
          {
            question:
              "How much space is needed for a small-scale BSF farm processing 100kg waste/day?",
            options: ["5-10m²", "20-30m²", "50-100m²", "200m²+"],
            correctIndex: 1,
            explanation:
              "A small-scale BSF farm processing 100kg of waste per day needs approximately 20-30m² of space.",
          },
          {
            question:
              "What should feedstock be mixed with to balance moisture?",
            options: [
              "More water",
              "Carbon source like bran or sawdust",
              "Chemical additives",
              "Nothing — use raw waste",
            ],
            correctIndex: 1,
            explanation:
              "Feedstock should be mixed with a carbon source (bran, sawdust) at 3:1 ratio to achieve optimal 60-70% moisture content.",
          },
        ],
        passMark: 60,
      },
    },
    {
      title: "Larval Rearing & Feeding",
      content: [
        {
          text: "Larval Rearing Systems\nThere are two main rearing approaches:\n\n1. Tray System (Small-Medium Scale)\n- Stackable plastic trays (60cm x 40cm x 15cm)\n- Fill with 5-10kg prepared substrate\n- Add 1,000-5,000 newly hatched larvae per tray\n- Stack 5-10 trays high\n- Monitor moisture daily, add feed every 2-3 days\n- Harvest after 14-18 days\n\n2. Flow-Through System (Commercial)\n- Continuous conveyor or channel system\n- Fresh substrate enters at one end\n- Mature larvae self-harvest at the other end (they seek dry areas)\n- Automated feeding and moisture control\n- Higher throughput, lower labor per kg\n\nFeeding Protocol:\n- Week 1: Fine-ground substrate, high moisture (70%)\n- Week 2: Coarser substrate, standard moisture (60-65%)\n- Week 3: Reduce feeding, allow gut clearing before harvest\n- Final 24 hours: No feed — allows gut purge for cleaner protein",
        },
        {
          text: "Disease & Pest Management\nBSF colonies are remarkably resilient, but issues can occur:\n\nCommon Problems:\n1. Mites: Tiny white mites compete for food. Solution: Reduce moisture, remove affected trays.\n2. House Flies: Compete with BSF. Solution: Maintain proper BSF density, seal breeding areas.\n3. Ants: Attack eggs and small larvae. Solution: Raised legs on bins (oil barriers), sealed egg collection.\n4. Mold: Overly wet substrate. Solution: Improve drainage, add more carbon source.\n5. Cannibalism: Overcrowding or starvation. Solution: Proper stocking density, adequate feed.\n\nBiosecurity:\n- Inspect incoming waste for chemicals/pesticides\n- Quarantine new colony additions\n- Clean equipment between batches\n- Maintain separate breeding and rearing areas\n- Record mortality rates weekly",
        },
      ],
      quiz: {
        questions: [
          {
            question:
              "Why should larvae be gut-purged for 24 hours before harvest?",
            options: [
              "To make them bigger",
              "To allow gut clearing for cleaner protein",
              "To kill parasites",
              "To increase fat content",
            ],
            correctIndex: 1,
            explanation:
              "A 24-hour gut purge before harvest allows larvae to clear their digestive tract, producing cleaner protein for animal feed.",
          },
          {
            question:
              "What is the primary cause of mold in BSF rearing systems?",
            options: [
              "Too much feed",
              "Overly wet substrate",
              "Too many larvae",
              "High temperature",
            ],
            correctIndex: 1,
            explanation:
              "Mold is primarily caused by overly wet substrate. The solution is to improve drainage and add more carbon source to reduce moisture.",
          },
          {
            question:
              "What is the self-harvesting mechanism in flow-through systems?",
            options: [
              "Workers manually pick larvae",
              "Larvae self-harvest by seeking dry areas at the end of the channel",
              "Automated air jets blow larvae out",
              "Larvae are attracted to light traps",
            ],
            correctIndex: 1,
            explanation:
              "In flow-through systems, mature larvae naturally self-harvest by seeking dry areas at the discharge end of the channel.",
          },
        ],
        passMark: 60,
      },
    },
    {
      title: "Harvesting & Processing",
      content: [
        {
          text: "Harvesting Methods\n1. Manual Harvesting (Small Scale)\n- Dump tray contents into a tub\n- Larvae will migrate to the bottom (away from light)\n- Collect larvae from the top layer of frass\n- Sieve through 2-3mm mesh to separate\n\n2. Self-Harvesting (Medium-Large Scale)\n- Install ramps at the edge of rearing containers\n- Pre-pupa larvae naturally climb out\n- Collect in bins placed at ramp ends\n- Can harvest 80-90% of larvae without manual labor\n\n3. Light-Based Harvesting\n- Larvae are photophobic (avoid light)\n- Shine bright light on one side of the container\n- Larvae migrate to the dark side\n- Remove frass from the lit side\n- Repeat until mostly larvae remain\n\nPost-Harvest Processing:\n1. Rinse larvae in clean water\n2. Gut purge: 24 hours without feed\n3. Kill by freezing (-18°C for 24 hours) or blanching (80°C for 3 minutes)\n4. Dry using dehydrator (70°C for 8-12 hours) or oven (60°C for 12 hours)\n5. Store dried larvae in airtight containers",
        },
        {
          text: "Value-Added Products\nFresh Larvae: Sell directly as animal feed (poultry, aquaculture, pets)\nDried Larvae: Shelf-stable protein (6-12 months storage)\nBSF Protein Meal: Ground dried larvae (replaces fishmeal/soy)\nBSF Oil: Extracted fat (biofuel, cosmetics, animal feed additive)\nFrass Fertilizer: Nutrient-rich organic fertilizer (NPK + beneficial microbes)\n\nNutritional Composition of Dried Larvae:\n- Crude Protein: 40-45%\n- Crude Fat: 30-35%\n- Fiber: 8-10%\n- Calcium: 5-8%\n- Phosphorus: 0.5-1%\n\nMarket Prices (approximate):\n- Fresh larvae: $0.50-1.00/kg\n- Dried larvae: $3-6/kg\n- Protein meal: $800-1,200/ton\n- BSF oil: $1,000-1,500/ton\n- Frass: $200-400/ton",
        },
      ],
      quiz: {
        questions: [
          {
            question:
              "What is the most efficient harvesting method for medium-large scale BSF farms?",
            options: [
              "Manual sorting by hand",
              "Self-harvesting using ramps for pre-pupae",
              "Chemical killing agents",
              "Water flushing",
            ],
            correctIndex: 1,
            explanation:
              "Self-harvesting using ramps is most efficient for medium-large scale farms, collecting 80-90% of larvae without manual labor.",
          },
          {
            question:
              "What is the approximate protein content of dried BSF larvae?",
            options: ["10-15%", "25-30%", "40-45%", "55-60%"],
            correctIndex: 2,
            explanation:
              "Dried BSF larvae contain 40-45% crude protein, making them an excellent replacement for fishmeal and soy.",
          },
          {
            question:
              "What is BSF frass used for?",
            options: [
              "Animal feed supplement",
              "Organic fertilizer with NPK and beneficial microbes",
              "Biofuel production",
              "Construction material",
            ],
            correctIndex: 1,
            explanation:
              "BSF frass is the residual material after larval processing, used as a nutrient-rich organic fertilizer containing NPK and beneficial microbes.",
          },
        ],
        passMark: 60,
      },
    },
    {
      title: "Business & Marketing BSF Products",
      content: [
        {
          text: "Business Models for BSF Farming\n1. Waste Processing Service\n- Charge businesses to collect their organic waste\n- Revenue: $50-100/ton of waste processed\n- Clients: Restaurants, food processors, markets, breweries\n- Additional revenue from selling larvae and frass\n\n2. Animal Feed Production\n- Produce dried larvae or protein meal for poultry, aquaculture, or pet food\n- Revenue: $800-1,200/ton of protein meal\n- Target customers: Poultry farmers, fish farms, pet food manufacturers\n\n3. Integrated Model (Recommended)\n- Combine waste processing + feed production + fertilizer sales\n- Multiple revenue streams from single operation\n- Strongest value proposition for investors\n\n4. Franchise/License Model\n- Develop successful systems, then license to others\n- Revenue: Franchise fees + ongoing royalties\n- Scalable across regions and countries\n\nStartup Costs & ROI:\n- Small scale ($5K investment): Break-even in 6-12 months\n- Medium scale ($30K): Break-even in 12-18 months\n- Commercial ($100K+): Break-even in 18-24 months",
        },
        {
          text: "Marketing & Sales Channels\nTarget Markets:\n1. Poultry Farmers: Replace soy/fishmeal in layer and broiler diets (10-20% inclusion rate)\n2. Aquaculture Farms: Replace fishmeal in tilapia, catfish, shrimp feeds\n3. Pet Food Industry: Premium insect-based dog and cat treats\n4. Organic Farmers: BSF frass as certified organic fertilizer\n5. Composting Operations: Pre-processing with BSF before traditional composting\n\nSales Strategies:\n- Direct to farmers: Build relationships at agricultural shows\n- Online B2B: List on agricultural supply platforms\n- Wholesale: Supply to feed mills and distributors\n- Subscription model: Regular delivery contracts\n- Value-added branding: Organic, sustainable, local\n\nCertifications to Pursue:\n- Organic certification (for frass)\n- Feed safety certification (ISO 22000)\n- HACCP for food safety\n- Carbon credit verification",
        },
      ],
      quiz: {
        questions: [
          {
            question:
              "What is the recommended BSF business model for maximum revenue?",
            options: [
              "Waste processing only",
              "Animal feed production only",
              "Integrated model combining waste processing + feed + fertilizer",
              "Franchise model from day one",
            ],
            correctIndex: 2,
            explanation:
              "The integrated model is recommended as it combines multiple revenue streams from a single operation, providing the strongest value proposition.",
          },
          {
            question:
              "At what inclusion rate can BSF larvae replace soy/fishmeal in poultry diets?",
            options: ["1-5%", "10-20%", "50-75%", "100%"],
            correctIndex: 1,
            explanation:
              "BSF larvae can replace 10-20% of soy/fishmeal in poultry layer and broiler diets without affecting performance.",
          },
          {
            question:
              "What is the approximate break-even time for a small-scale BSF farm ($5K investment)?",
            options: ["1-3 months", "6-12 months", "2-3 years", "5+ years"],
            correctIndex: 1,
            explanation:
              "A small-scale BSF farm with $5K investment typically breaks even in 6-12 months.",
          },
        ],
        passMark: 60,
      },
    },
  ],
};

export default extraCourse42;
