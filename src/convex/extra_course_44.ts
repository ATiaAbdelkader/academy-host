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

const extraCourse44: ExtraCourse = {
  title: "Aquaponics Systems",
  description:
    "Master the art of combining aquaculture and hydroponics in a symbiotic closed-loop system. Learn to design, build, and operate aquaponics setups that produce fish and vegetables simultaneously with 90% less water than traditional farming.",
  category: "Innovative Farming",
  duration: "8 weeks",
  difficulty: "Intermediate",
  priceCents: 0,
  durationMinutes: 2600,
  order: 44,
  instructor: "Prof. Carlos Mendez",
  tags: ["aquaponics", "hydroponics", "closed-loop", "sustainable", "food production"],
  modules: [
    {
      title: "Aquaponics Fundamentals",
      content: [
        {
          text: "What is Aquaponics?\nAquaponics is a food production system that combines aquaculture (raising fish) with hydroponics (growing plants without soil) in a symbiotic closed-loop environment.\n\nThe Core Cycle:\n1. Fish produce waste (ammonia-rich excrement)\n2. Beneficial bacteria (Nitrosomonas) convert ammonia → nitrite\n3. Second bacteria (Nitrobacter) convert nitrite → nitrate\n4. Plants absorb nitrate as fertilizer\n5. Clean water returns to the fish tank\n\nThis natural nitrogen cycle eliminates the need for chemical fertilizers for plants and water filtration for fish. The system uses 90% less water than traditional farming because water is recycled continuously.\n\nKey Benefits:\n- Dual output: Fish AND vegetables from one system\n- 90% water savings vs traditional agriculture\n- No soil needed (urban-friendly)\n- No chemical fertilizers\n- Year-round production\n- Organic by design\n- Can be set up anywhere: rooftops, basements, warehouses, backyards",
        },
        {
          text: "Types of Aquaponics Systems\n1. Media-Filled Bed (Beginner)\n- Grow beds filled with clay pebbles or gravel\n- Plants grow directly in the media\n- Simple, proven, low cost\n- Best for: Herbs, leafy greens, tomatoes\n\n2. Nutrient Film Technique (NFT)\n- Thin film of water flows through channels\n- Plants sit in net pots with roots in the water\n- Efficient, lightweight\n- Best for: Lettuce, herbs, strawberries\n\n3. Deep Water Culture (DWC)\n- Plants float on rafts over deep water (20-30cm)\n- Roots suspended in nutrient-rich water\n- High density, commercial scale\n- Best for: Lettuce, basil, water spinach\n\n4. Vertical Tower Systems\n- Stackable towers maximize space\n- Water trickles down through towers\n- Ideal for urban/indoor setups\n- Best for: Herbs, leafy greens\n\nSystem Size Options:\n- Home hobby: 100-500 liters (1-4 m²)\n- Small commercial: 2,000-10,000 liters (10-50 m²)\n- Commercial: 10,000-100,000+ liters (100-1,000+ m²)",
        },
      ],
      quiz: {
        questions: [
          {
            question: "How much water does aquaponics save compared to traditional farming?",
            options: ["30%", "50%", "70%", "90%"],
            correctIndex: 3,
            explanation: "Aquaponics uses approximately 90% less water than traditional farming because water is continuously recycled.",
          },
          {
            question: "What bacteria convert ammonia to nitrite in aquaponics?",
            options: ["Nitrobacter", "Nitrosomonas", "E. coli", "Lactobacillus"],
            correctIndex: 1,
            explanation: "Nitrosomonas bacteria convert ammonia to nitrite, while Nitrobacter then converts nitrite to nitrate.",
          },
          {
            question: "Which aquaponics system is best for beginners?",
            options: ["DWC", "NFT", "Media-Filled Bed", "Vertical Towers"],
            correctIndex: 2,
            explanation: "Media-Filled Bed systems are best for beginners because they are simple, proven, and low cost.",
          },
        ],
        passMark: 60,
      },
    },
    {
      title: "System Design & Construction",
      content: [
        {
          text: "Designing Your System\nStep 1: Choose Fish Species\n- Tilapia: Most popular, hardy, fast-growing\n- Trout: Cold water systems\n- Catfish: Hardy, tolerant of poor water quality\n- Ornamental fish: Koi, goldfish (for hobby systems)\n\nStep 2: Choose Plants\n- Beginner: Lettuce, herbs (basil, mint, cilantro)\n- Intermediate: Tomatoes, peppers, cucumbers\n- Advanced: Strawberries, beans, root vegetables\n\nStep 3: Size the System\n- Fish tank: 1,000 liters supports 50-80 fish (500g each)\n- Grow bed: 1:1 ratio with fish tank (media-filled)\n- Water volume: Total system volume = fish tank + grow beds\n- Pump capacity: Circulate full volume every 1-2 hours\n\nStep 4: Materials\n- Fish tank: IBC tanks (1,000L), ponds, or custom tanks\n- Grow beds: 30cm deep, food-safe plastic\n- Media: Expanded clay pebbles (LECA), gravel, or lava rock\n- Plumbing: PVC pipe, bulkhead fittings, valves\n- Pump: Submersible or external, sized to flow rate\n- Aeration: Air pump + air stones\n\nEstimated Costs:\n- Home system (1,000L): $500-1,500\n- Small commercial (10,000L): $5,000-15,000\n- Commercial (50,000L+): $25,000-100,000+",
        },
        {
          text: "Building a Media-Filled Bed System\nMaterials List:\n1. 1x IBC tank (1,000L) — cut in half: top = grow bed, bottom = fish tank\n2. 1x submersible pump (1,000-2,000 L/hour)\n3. 1x air pump + 2 air stones\n4. PVC pipe and fittings for plumbing\n5. 200L expanded clay pebbles\n6. Bulkhead fitting for grow bed drain\n7. Bell siphon or timer for flood-and-drain\n\nConstruction Steps:\n1. Cut IBC tank: Bottom half = fish tank, top half (inverted) = grow bed\n2. Drill hole in grow bed bottom for bulkhead fitting\n3. Install bell siphon for automatic flood-and-drain\n4. Connect pump from fish tank to grow bed top\n5. Grow bed drains back to fish tank via bell siphon\n6. Add air pump to fish tank for oxygenation\n7. Fill grow bed with clay pebbles\n8. Fill fish tank with dechlorinated water\n9. Run system for 1 week (cycling) before adding fish\n10. Add fish, then plants after 2-3 weeks",
        },
      ],
      quiz: {
        questions: [
          {
            question: "How many fish can a 1,000L fish tank support?",
            options: ["5-10", "20-30", "50-80", "150-200"],
            correctIndex: 2,
            explanation: "A 1,000L fish tank can support approximately 50-80 fish at 500g each.",
          },
          {
            question: "What media is recommended for beginner aquaponics grow beds?",
            options: ["Soil", "Sand", "Expanded clay pebbles (LECA)", "Perlite only"],
            correctIndex: 2,
            explanation: "Expanded clay pebbles (LECA) are the recommended media for aquaponics grow beds — they're lightweight, pH-neutral, and provide excellent surface area for beneficial bacteria.",
          },
          {
            question: "How long should a new aquaponics system cycle before adding fish?",
            options: ["Immediately", "1 week", "1 month", "3 months"],
            correctIndex: 1,
            explanation: "A new system should cycle for about 1 week to establish beneficial bacteria colonies before adding fish.",
          },
        ],
        passMark: 60,
      },
    },
    {
      title: "Water Chemistry & Biology",
      content: [
        {
          text: "The Nitrogen Cycle in Detail\nAmmonia (NH3/NH4+): Produced by fish excretion and decomposition\n- Source: Fish gills (primary), uneaten food, dead matter\n- Toxic above 0.02 mg/L (unionized NH3)\n- pH dependent: more toxic at higher pH\n\nNitrite (NO2-): Intermediate product\n- Produced by Nitrosomonas bacteria\n- Toxic above 1 mg/L\n- Causes 'brown blood disease' (methemoglobinemia)\n\nNitrate (NO3-): End product, plant food\n- Produced by Nitrobacter bacteria\n- Non-toxic up to 200 mg/L\n- Absorbed by plants as fertilizer\n- Target: 5-30 mg/L (plants' sweet spot)\n\npH Management:\n- Optimal: 6.8-7.2 (balance between fish and plant needs)\n- Fish prefer: 7.0-8.0\n- Plants prefer: 5.5-6.5\n- Bacteria prefer: 7.0-8.0\n- Compromise: 6.8-7.2 works for all three\n\nOther Parameters:\n- Dissolved Oxygen: >5 mg/L\n- Temperature: 22-28°C (tilapia optimal)\n- Carbonate Hardness (KH): 50-150 ppm (buffer)\n- Electrical Conductivity: <2,000 µS/cm",
        },
        {
          text: "Daily Management Routine\nMorning:\n1. Check water temperature\n2. Observe fish behavior (swimming, eating)\n3. Test ammonia and DO (first few weeks)\n4. Feed fish (observe appetite)\n5. Check water levels, top up if needed\n6. Inspect plants for pests/disease\n7. Check pump and aeration system\n\nEvening:\n1. Second fish feeding\n2. Observe fish behavior\n3. Check for dead fish or plant leaves\n\nWeekly:\n1. Full water test (pH, ammonia, nitrite, nitrate, KH)\n2. Trim plant roots if blocking pipes\n3. Clean pump intake filter\n4. Check for algae growth\n5. Harvest mature plants\n\nMonthly:\n1. Deep clean pump intake\n2. Check plumbing for leaks\n3. Test water from source\n4. Stock assessment (count/estimate fish weight)\n5. Adjust feeding rate based on growth",
        },
      ],
      quiz: {
        questions: [
          {
            question: "What is the optimal pH range for aquaponics?",
            options: ["5.0-5.5", "6.8-7.2", "8.0-8.5", "9.0-10.0"],
            correctIndex: 1,
            explanation: "The optimal pH for aquaponics is 6.8-7.2, which balances the needs of fish (prefer 7.0-8.0), plants (prefer 5.5-6.5), and bacteria (prefer 7.0-8.0).",
          },
          {
            question: "What causes 'brown blood disease' in fish?",
            options: ["High ammonia", "High nitrite", "Low pH", "High temperature"],
            correctIndex: 1,
            explanation: "Brown blood disease (methemoglobinemia) is caused by high nitrite levels above 1 mg/L, which interferes with oxygen transport in fish blood.",
          },
          {
            question: "What should the nitrate level be in a healthy aquaponics system?",
            options: ["0 mg/L", "5-30 mg/L", "100-150 mg/L", "200+ mg/L"],
            correctIndex: 1,
            explanation: "Nitrate levels of 5-30 mg/L are ideal — high enough to feed plants but low enough to maintain good water quality for fish.",
          },
        ],
        passMark: 60,
      },
    },
    {
      title: "Fish & Plant Management",
      content: [
        {
          text: "Fish Management\nStocking Density Guidelines:\n- Conservative: 1kg fish per 20 liters (low maintenance)\n- Moderate: 1kg per 10 liters (standard)\n- Intensive: 1kg per 5 liters (requires strong aeration)\n\nFeeding:\n- 1-2% of body weight per day (2-3 meals)\n- FCR target: 1.4-1.8\n- High-quality aquaculture feed (32-35% protein)\n- Don't overfeed — uneaten food degrades water quality\n\nFish Health Signs:\n✓ Active swimming, good appetite\n✓ Bright colors, no lesions\n✓ Normal gill movement\n✗ Gasping at surface (low DO)\n✗ White spots (Ich disease)\n✗ Fin erosion (bacterial infection)\n✗ Lethargy, loss of appetite\n\nGrowth Expectations:\n- Tilapia: 1-2g/day at optimal conditions\n- Reach 500g in 6-8 months\n- Harvest at 300-500g for home systems\n- Harvest at 500-800g for commercial",
        },
        {
          text: "Plant Management\nPlanting:\n- Start seedlings in rockwool or net pots\n- Transplant to grow bed when 2-3 true leaves appear\n- Space: 15-20cm for leafy greens, 30-40cm for fruiting plants\n\nBest Plants for Aquaponics:\nLeafy Greens (Easy):\n- Lettuce, spinach, kale, bok choy, watercress\n- Grow time: 30-45 days\n- Nutrient demand: Low\n\nHerbs (Easy):\n- Basil, cilantro, mint, parsley, chives\n- Grow time: 21-30 days\n- Nutrient demand: Low-Medium\n\nFruiting Plants (Intermediate):\n- Tomatoes, peppers, cucumbers, eggplant\n- Grow time: 60-90 days\n- Nutrient demand: High (need more fish)\n\nStrawberries (Advanced):\n- Year-round production possible\n- Nutrient demand: Medium\n- Need good light and temperature\n\nPlant Care:\n- Monitor for pests (aphids, whiteflies)\n- Use organic pest control (neem oil, ladybugs)\n- Prune for airflow and light penetration\n- Harvest regularly to promote growth\n- Remove dead leaves to prevent disease",
        },
      ],
      quiz: {
        questions: [
          {
            question: "What is the recommended feeding rate for aquaponics fish?",
            options: ["5-10% of body weight", "1-2% of body weight", "0.1% of body weight", "10-15% of body weight"],
            correctIndex: 1,
            explanation: "Fish should be fed 1-2% of their body weight per day, split into 2-3 meals, to maintain good water quality.",
          },
          {
            question: "Which plants are easiest for aquaponics beginners?",
            options: ["Tomatoes and peppers", "Lettuce and basil", "Strawberries", "Root vegetables"],
            correctIndex: 1,
            explanation: "Lettuce and basil are the easiest plants for aquaponics — they have low nutrient demands and grow quickly.",
          },
          {
            question: "What is the sign of low dissolved oxygen in fish?",
            options: ["Bright colors", "Gasping at the surface", "Active swimming", "Normal gill movement"],
            correctIndex: 1,
            explanation: "Fish gasping at the water surface is a classic sign of low dissolved oxygen levels.",
          },
        ],
        passMark: 60,
      },
    },
    {
      title: "Common Problems & Troubleshooting",
      content: [
        {
          text: "System Cycling Issues\nProblem: Ammonia spike after starting\nCause: Insufficient bacteria colony\nSolution: Dose with ammonia source (fish food, pure ammonia) to grow bacteria before adding fish. Test daily until ammonia → nitrite → nitrate conversion is established.\n\nProblem: pH crashing (dropping below 6.0)\nCause: Nitrification produces acid, consuming KH\nSolution: Add crushed coral or oyster shells to grow bed. Use potassium hydroxide or calcium hydroxide to raise pH.\n\nProblem: High ammonia despite cycling\nCause: Overfeeding, dead fish, filter clogging\nSolution: Reduce feeding, remove dead matter, clean filters, partial water change.\n\nProblem: Algae bloom (green water)\nCause: Excess light + nutrients in fish tank\nSolution: Cover fish tank to block light. Add floating plants. Accept some algae — it's natural.\n\nProblem: Plant nutrient deficiency\nCause: Insufficient fish waste for plant needs\nSolution: Add more fish, increase feeding, supplement with seaweed extract or chelated iron.",
        },
        {
          text: "Pest & Disease Management\nPlant Pests:\n1. Aphids: Spray with diluted neem oil or introduce ladybugs\n2. Whiteflies: Yellow sticky traps, neem oil\n3. Caterpillars: Hand-pick, BT (Bacillus thuringiensis) spray\n4. Fungus gnats: Reduce moisture on surface, BT dunks\n5. Spider mites: Increase humidity, neem oil\n\nFish Diseases:\n1. Ich (white spot): Raise temperature to 30°C, salt at 3 ppt\n2. Fin rot: Improve water quality, antibiotic bath\n3. Dropsy: Remove affected fish, reduce stocking\n4. Parasites: Praziquantel treatment\n\nPrevention > Treatment:\n- Quarantine new plants (dip in dilute hydrogen peroxide)\n- Don't use soil-based plants in aquaponics\n- Remove dead plant material promptly\n- Maintain stable water parameters\n- Don't overstock fish\n- Monitor daily",
        },
      ],
      quiz: {
        questions: [
          {
            question: "What causes pH to crash in aquaponics systems?",
            options: ["Too many plants", "Nitrification producing acid that consumes KH", "Too much light", "Cold water temperature"],
            correctIndex: 1,
            explanation: "Nitrification (converting ammonia to nitrate) produces acid, which consumes carbonate hardness (KH) and causes pH to drop over time.",
          },
          {
            question: "How should aphids be treated in aquaponics?",
            options: ["Chemical pesticides", "Neem oil or ladybugs", "Increase fish feeding", "Drain the system"],
            correctIndex: 1,
            explanation: "Aphids should be treated with organic methods like neem oil or biological control with ladybugs, since chemical pesticides would harm fish.",
          },
          {
            question: "What should be done before adding new plants to an aquaponics system?",
            options: ["Plant them immediately", "Quarantine and dip in dilute hydrogen peroxide", "Soil drench them", "Spray with chemical fungicide"],
            correctIndex: 1,
            explanation: "New plants should be quarantined and dipped in dilute hydrogen peroxide to prevent introducing pests or diseases into the aquaponics system.",
          },
        ],
        passMark: 60,
      },
    },
    {
      title: "Commercial Aquaponics & Business",
      content: [
        {
          text: "Scaling to Commercial Production\nCommercial aquaponics combines high-density fish production with intensive plant growing.\n\nSystem Design for Commercial:\n- Fish tanks: 10,000-50,000 liters each\n- Grow beds: DWC (raft) or NFT for maximum plant density\n- Greenhouse: Temperature control, extend growing season\n- RAS components: Drum filters, biofilters, UV sterilizers\n\nProduction Targets:\n- Fish: 20-40 kg/m³ (tilapia)\n- Leafy greens: 100-200 heads/m²/year\n- Herbs: 5-10 kg/m²/year\n- Revenue: $100-300/m²/year\n\nStartup Costs:\n- Small commercial (500m²): $30,000-80,000\n- Medium commercial (2,000m²): $100,000-300,000\n- Large commercial (5,000m²+): $500,000-2,000,000\n\nRevenue Model:\n- Fish sales: 40% of revenue\n- Vegetable sales: 50% of revenue\n- Educational tours: 10% of revenue",
        },
        {
          text: "Marketing & Sales\nDirect-to-Consumer:\n- Farmers markets: Premium prices, direct relationship\n- CSA (Community Supported Agriculture) boxes: Weekly subscriptions\n- Online ordering with local delivery\n\nB2B:\n- Restaurants: Fresh, local, pesticide-free = premium pricing\n- Hotels and resorts: Consistent supply contracts\n- Grocery stores: Branded, packaged greens\n- Schools and hospitals: Bulk supply\n\nValue Proposition:\n- 100% pesticide-free (aquaponics = organic by design)\n- Ultra-local (grew it in your neighborhood)\n- Year-round supply (greenhouse systems)\n- Traceable origin (know your farmer)\n- Sustainable (90% water savings)\n\nCertifications:\n- Organic: Some regions certify aquaponics as organic\n- GAP (Good Agricultural Practices)\n- Food safety certifications\n- Sustainability certifications",
        },
      ],
      quiz: {
        questions: [
          {
            question: "What is the expected revenue per square meter for commercial aquaponics?",
            options: ["$10-30/m²", "$50-80/m²", "$100-300/m²", "$500-1,000/m²"],
            correctIndex: 2,
            explanation: "Commercial aquaponics can generate $100-300 per square meter per year, combining fish and vegetable sales.",
          },
          {
            question: "What percentage of revenue typically comes from vegetable sales?",
            options: ["10%", "25%", "50%", "80%"],
            correctIndex: 2,
            explanation: "Vegetable sales typically account for approximately 50% of revenue in commercial aquaponics, with fish at 40% and education at 10%.",
          },
          {
            question: "What is the key marketing advantage of aquaponics produce?",
            options: ["Lowest price", "100% pesticide-free and ultra-local", "Longest shelf life", "Largest size"],
            correctIndex: 1,
            explanation: "Aquaponics produce is naturally pesticide-free and can be grown ultra-locally, providing a strong marketing advantage for premium sales.",
          },
        ],
        passMark: 60,
      },
    },
  ],
};

export default extraCourse44;
