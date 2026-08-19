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

const extraCourse47: ExtraCourse = {
  title: "Regenerative Agriculture",
  description:
    "Learn farming practices that restore soil health, sequester carbon, increase biodiversity, and build climate resilience. Master no-till, cover crops, composting, holistic grazing, and integrated pest management.",
  category: "Innovative Farming",
  duration: "8 weeks",
  difficulty: "Intermediate",
  priceCents: 0,
  durationMinutes: 2800,
  order: 47,
  instructor: "Dr. Sarah Lindholm",
  tags: ["regenerative", "soil health", "carbon sequestration", "no-till", "cover crops"],
  modules: [
    {
      title: "Regenerative Agriculture Principles",
      content: [
        {
          text: "What is Regenerative Agriculture?\nRegenerative agriculture is a system of farming principles that aims to rehabilitate and enhance the entire ecosystem of the farm. It focuses on soil health, water cycles, and biodiversity rather than just crop yields.\n\nCore Principles (Gabe Brown's 5 Principles):\n1. Minimize soil disturbance (no-till)\n2. Keep soil covered (mulch, cover crops)\n3. Maximize crop diversity (rotations, polycultures)\n4. Maintain living roots year-round\n5. Integrate livestock\n\nWhy It Matters:\n- 33% of global soils are degraded\n- Agriculture causes 25% of greenhouse gas emissions\n- Regenerative farms sequester 1-3 tons CO2/hectare/year\n- Can reverse climate change while feeding the world\n- Improves water retention (1% organic matter = 20,000 gallons more water/acre)\n- Reduces input costs 30-50% over time\n\nThe Difference from Conventional Farming:\nConventional: Take from soil → deplete → add chemicals → repeat\nRegenerative: Give to soil → build → self-sustaining → improve annually",
        },
        {
          text: "The Soil Food Web\nHealthy soil is a living ecosystem:\n\nOrganisms per teaspoon of healthy soil:\n- Bacteria: 100 million - 1 billion\n- Fungi: 1-10 meters of hyphae\n- Protozoa: 10,000 - 100,000\n- Nematodes: 10-50\n- Micro-arthropods: 10-50\n\nThe Carbon Cycle in Soil:\n1. Plants capture CO2 through photosynthesis\n2. 20-40% of carbon goes to roots as sugars (exudates)\n3. Root exudates feed soil bacteria and fungi\n4. Microbes decompose organic matter\n5. Fungal hyphae transport nutrients to plants\n6. Stable carbon (humus) stores in soil for decades\n\nSoil Health Indicators:\n- Organic matter content: >3% is good, >5% is excellent\n- Water infiltration: >2 inches/hour\n- Earthworm count: >10 per cubic foot\n- Soil respiration: CO2 production shows microbial activity\n- Aggregate stability: Soil clumps that hold together\n\nThe 1% Organic Matter Rule:\nEach 1% increase in soil organic matter:\n- Stores 20,000 gallons more water per acre\n- Adds 1,000 pounds of nitrogen per acre\n- Increases crop yields 10-15%",
        },
      ],
      quiz: {
        questions: [
          {
            question: "What are Gabe Brown's 5 core principles of regenerative agriculture?",
            options: [
              "Till, spray, monocrop, irrigate, harvest",
              "No-till, cover crops, diversity, living roots, livestock integration",
              "Organic only, no animals, hand tools",
              "Hydroponics, aeroponics, vertical farming",
            ],
            correctIndex: 1,
            explanation: "The 5 principles are: minimize soil disturbance (no-till), keep soil covered, maximize diversity, maintain living roots, and integrate livestock.",
          },
          {
            question: "How much more water does each 1% increase in soil organic matter store?",
            options: ["2,000 gallons/acre", "20,000 gallons/acre", "200,000 gallons/acre", "2 million gallons/acre"],
            correctIndex: 1,
            explanation: "Each 1% increase in organic matter stores approximately 20,000 additional gallons of water per acre.",
          },
          {
            question: "How much CO2 can regenerative farms sequester per hectare per year?",
            options: ["10-30 kg", "100-300 kg", "1-3 tons", "10-30 tons"],
            correctIndex: 2,
            explanation: "Regenerative farms can sequester 1-3 tons of CO2 per hectare per year through improved soil management.",
          },
        ],
        passMark: 60,
      },
    },
    {
      title: "No-Till Farming",
      content: [
        {
          text: "The Case Against Tillage\nTillage destroys soil structure:\n- Breaks up fungal networks (mycorrhizae)\n- Kills earthworms and soil organisms\n- Exposes soil carbon to oxidation (releases CO2)\n- Creates hardpan layers\n- Increases erosion 10-100x\n- Reduces water infiltration\n- Requires more herbicides (to replace mechanical weed control)\n\nNo-Till Benefits:\n- Preserves soil structure and biology\n- Reduces fuel costs 50-70%\n- Saves labor 30-50%\n- Improves water infiltration 2-5x\n- Builds organic matter over time\n- Sequesters carbon\n- Reduces erosion by 90%\n\nTransition Challenges:\n- Weed management changes (cover crops, roller-crimper)\n- Yields may dip 10-20% in first 2-3 years\n- Learning curve for equipment and timing\n- Need different planting equipment (no-till drill)\n- May need herbicides initially (reduce over time)",
        },
        {
          text: "No-Till Techniques\n1. Cover Crop-Based No-Till\n   - Grow cover crops to suppress weeds\n   - Roll/crimp cover crops to create mulch layer\n   - Plant cash crop through mulch\n   - No herbicides needed (organic approach)\n\n2. Mulch-Based No-Till\n   - Apply thick mulch (straw, wood chips, leaves)\n   - Plant through mulch\n   - Mulch suppresses weeds and retains moisture\n   - Best for gardens and small farms\n\n3. Chemical No-Till (Transitional)\n   - Use herbicides to manage weeds initially\n   - Gradually reduce as cover crop system establishes\n   - Most common transitional approach\n   - Controversial but widely used\n\nNo-Till Equipment:\n- No-Till Drill: Places seed directly into undisturbed soil\n- Planter with coulters: Cuts through residue\n- Roller-crimper: Terminates cover crops mechanically\n- Inter Seeder: Plants cover crops between rows\n\nKey Tips:\n- Start small (one field or section)\n- Be patient (3-5 year transition)\n- Focus on cover crops first\n- Monitor soil biology (earthworm counts)\n- Reduce inputs gradually as soil improves",
        },
      ],
      quiz: {
        questions: [
          {
            question: "How much does tillage increase erosion compared to no-till?",
            options: ["2x", "5x", "10-100x", "1000x"],
            correctIndex: 2,
            explanation: "Tillage increases soil erosion by 10-100 times compared to no-till farming.",
          },
          {
            question: "What is the primary tool for terminating cover crops in organic no-till?",
            options: ["Herbicide", "Roller-crimper", "Flail mower", "Plow"],
            correctIndex: 1,
            explanation: "A roller-crimper mechanically terminates cover crops by crimping the stems, creating a mulch layer without chemicals.",
          },
          {
            question: "How long does the full transition to no-till typically take?",
            options: ["1 month", "6 months", "3-5 years", "10+ years"],
            correctIndex: 2,
            explanation: "The full transition to no-till typically takes 3-5 years, with yields potentially dipping 10-20% in the first 2-3 years.",
          },
        ],
        passMark: 60,
      },
    },
    {
      title: "Cover Crops & Green Manures",
      content: [
        {
          text: "Why Cover Crops?\nCover crops are planted between cash crop seasons to:\n1. Prevent erosion\n2. Suppress weeds\n3. Add organic matter\n4. Fix nitrogen (legumes)\n5. Break pest cycles\n6. Improve soil structure\n7. Feed soil biology\n\nCover Crop Categories:\n\nLegumes (Nitrogen Fixers):\n- Crimson Clover: 70-150 lbs N/acre\n- Hairy Vetch: 100-200 lbs N/acre\n- Austrian Winter Peas: 80-150 lbs N/acre\n- Cowpeas: 100-150 lbs N/acre\n\nGrasses (Biomass Producers):\n- Cereal Rye: Most reliable, cold tolerant\n- Oats: Fast growing, winter-kills\n- Annual Ryegrass: Excellent root system\n- Sorghum-Sudan: Summer biomass champion\n\nBrassicas (Bio-drills):\n- Tillage Radish: Deep taproot breaks compaction\n- Mustard: Biofumigant properties\n- Turnips: Quick cover, livestock forage\n\nMixes (Recommended):\n- 3-5 species minimum\n- Combine legume + grass + brassica\n- Each fills a different niche\n- More resilient than monocultures",
        },
        {
          text: "Cover Crop Management\nTiming:\n- Plant immediately after cash crop harvest\n- Earlier = more biomass\n- Allow 4-8 weeks minimum before winter\n\nTermination Methods:\n1. Winter Kill: Plant species that die in frost (oats, radish)\n2. Roller-crimper: Roll at flowering stage (organic)\n3. Mowing: Cut at soil level (multiple cuts may be needed)\n4. Grazing: Livestock eat cover crops (dual purpose)\n5. Herbicide: Chemical termination (transitional)\n\nPlanting Methods:\n- Broadcast: Spread seed, work into soil\n- Drill: Precision planting with no-till drill\n- Aerial: Fly seed over standing crop (large farms)\n- Interseed: Plant between crop rows during season\n\nCover Crop Economics:\n- Seed cost: $15-40/acre\n- Expected return: $50-150/acre (reduced inputs + yield boost)\n- Break-even: 2-3 years\n- Long-term benefit: Improved soil = higher yields",
        },
      ],
      quiz: {
        questions: [
          {
            question: "Which cover crop category fixes nitrogen from the atmosphere?",
            options: ["Grasses", "Brassicas", "Legumes", "Sedges"],
            correctIndex: 2,
            explanation: "Legumes (clover, vetch, peas) fix nitrogen from the atmosphere through symbiotic bacteria in root nodules.",
          },
          {
            question: "What is a 'bio-drill' cover crop?",
            options: ["A powered planting tool", "Tillage radish with deep taproot that breaks compaction", "A drill modified for cover crops", "A seed coating technology"],
            correctIndex: 1,
            explanation: "Tillage radish and other brassicas are called 'bio-drills' because their deep taproots penetrate and break up compacted soil layers.",
          },
          {
            question: "What is the recommended minimum number of species in a cover crop mix?",
            options: ["1", "2", "3-5", "10+"],
            correctIndex: 2,
            explanation: "A minimum of 3-5 species is recommended in cover crop mixes, combining legumes, grasses, and brassicas for maximum benefit.",
          },
        ],
        passMark: 60,
      },
    },
    {
      title: "Composting & Soil Amendments",
      content: [
        {
          text: "Composting Methods\n1. Hot Composting (Thermophilic)\n   - Temperature: 55-70°C (130-160°F)\n   - C:N ratio: 25-30:1\n   - Turn every 3-5 days\n   - Ready in 4-8 weeks\n   - Kills weed seeds and pathogens\n   - Best for: Farm-scale, food waste\n\n2. Cold Composting (Passive)\n   - Pile materials and wait\n   - Takes 6-12 months\n   - No turning required\n   - Best for: Low-effort, garden-scale\n\n3. Vermicomposting (Worms)\n   - Red wiggler worms (Eisenia fetida)\n   - Process: 1-2 kg food waste/m²/day\n   - Produces worm castings (premium fertilizer)\n   - Ready in 3-4 months\n   - Best for: Kitchen waste, high-value product\n\n4. Bokashi Fermentation\n   - Anaerobic fermentation with effective microorganisms\n   - Ferments all food waste (including meat/dairy)\n   - 2-week fermentation, then bury in soil\n   - Best for: All food waste, apartments\n\n5. Compost Tea\n   - Steep compost in aerated water for 24-48 hours\n   - Extracts beneficial microbes\n   - Apply as foliar spray or soil drench\n   - Best for: Boosting soil biology",
        },
        {
          text: "Soil Amendments\nOrganic Amendments:\n- Compost: 5-10 tons/acre (general soil builder)\n- Worm castings: 1-2 tons/acre (premium biology)\n- Biochar: 1-5 tons/acre (long-term carbon storage)\n- Kelp meal: 100-200 lbs/acre (micronutrients, hormones)\n- Fish meal: 200-400 lbs/acre (nitrogen, phosphorus)\n- Bone meal: 200-500 lbs/acre (phosphorus, calcium)\n- Wood ash: 500-1,000 lbs/acre (potassium, raises pH)\n\nMineral Amendments:\n- Lime: Raises pH (calcium carbonate)\n- Gypsum: Adds calcium + sulfur without changing pH\n- Sulfur: Lowers pH (for acidic soils)\n- Rock phosphate: Slow-release phosphorus\n\nBiochar:\n- Charcoal produced by pyrolysis\n- Stores carbon for 100+ years\n- Increases water retention 20%\n- Provides habitat for soil microbes\n- Reduces fertilizer needs 20-30%\n- Application: 1-5 tons/acre, inoculate with compost tea\n\nApplication Rates:\n- Always soil test first\n- Start with recommended rates\n- Monitor soil biology (earthworms, respiration)\n- Adjust based on results",
        },
      ],
      quiz: {
        questions: [
          {
            question: "What is the optimal C:N ratio for hot composting?",
            options: ["10:1", "25-30:1", "50:1", "100:1"],
            correctIndex: 1,
            explanation: "The optimal carbon-to-nitrogen ratio for hot composting is 25-30:1, which provides the right balance for microbial activity.",
          },
          {
            question: "What is biochar's main long-term benefit?",
            options: ["Immediate nitrogen release", "Stores carbon for 100+ years", "Kills weeds", "Attracts pollinators"],
            correctIndex: 1,
            explanation: "Biochar stores carbon for 100+ years, making it one of the most effective long-term carbon sequestration tools.",
          },
          {
            question: "How much compost should be applied per acre?",
            options: ["50-100 lbs", "500-1,000 lbs", "5-10 tons", "50 tons"],
            correctIndex: 2,
            explanation: "A typical compost application rate is 5-10 tons per acre, depending on soil conditions and crop needs.",
          },
        ],
        passMark: 60,
      },
    },
    {
      title: "Holistic Grazing & Livestock Integration",
      content: [
        {
          text: "Holistic Planned Grazing\nHolistic management mimics how wild herds moved across landscapes:\n\nPrinciples:\n1. High density, short duration: Pack animals tightly, move quickly\n2. Long rest periods: 60-90 days for full recovery\n3. Multiple paddocks: 20-60 paddocks per herd\n4. Adapt to conditions: Adjust based on rainfall, season\n\nGrazing Impact:\n- Hooves break soil surface (seed-to-soil contact)\n- Manure and urine fertilize soil\n- Saliva stimulates plant regrowth\n- Trampling adds organic matter to soil\n- High density prevents selective grazing\n\nBenefits:\n- Increases soil organic matter 0.5-1% per year\n- Builds water-holding capacity\n- Sequesters 3-8 tons CO2/hectare/year\n- Increases biodiversity 50-100%\n- Reduces need for purchased feed\n- Eliminates need for synthetic fertilizer\n\nStocking Rate Calculation:\n- Start conservative (lower than conventional)\n- Monitor recovery time\n- Adjust for rainfall variability\n- Use adaptive management",
        },
        {
          text: "Integrating Livestock with Crops\nCrop-Livestock Integration:\n1. Cover Crop Grazing: Graze cover crops with cattle, sheep, or goats\n   - Reduces cover crop termination costs\n   - Livestock provide natural fertilizer\n   - Speeds nutrient cycling\n\n2. Crop Residue Grazing: Animals graze after harvest\n   - Utilizes waste biomass\n   - Reduces tillage needs\n   - Manure fertilizes next crop\n\n3. Silvopasture: Trees + pasture + livestock\n   - Provides shade for animals\n   - Diversifies income (timber + animals + forage)\n   - Sequesters 5-10x more carbon than open pasture\n\nAnimal Species for Regenerative Systems:\n- Cattle: Best for grasslands, biomass processing\n- Sheep: Best for weed control, brush management\n- Goats: Best for invasive species control\n- Poultry: Best for pest control, scratching\n- Pigs: Best for forest management, tillage\n\nStacking Enterprises:\n- Cattle graze → chickens follow (eat fly larvae in manure)\n- Sheep graze vineyards → reduce mowing costs\n- Goats clear brush → prepare land for planting\n- Ducks in rice paddies → eat pests, add fertilizer",
        },
      ],
      quiz: {
        questions: [
          {
            question: "How does holistic grazing differ from continuous grazing?",
            options: [
              "Animals graze the same area all year",
              "High density for short duration, then long rest periods",
              "No animals are used",
              "Animals are confined to barns",
            ],
            correctIndex: 1,
            explanation: "Holistic grazing uses high animal density for short durations (1-3 days) followed by long rest periods (60-90 days) for full recovery.",
          },
          {
            question: "How much more carbon does silvopasture sequester vs open pasture?",
            options: ["Same amount", "2-3x more", "5-10x more", "50x more"],
            correctIndex: 2,
            explanation: "Silvopasture (trees + pasture + livestock) sequesters 5-10x more carbon than open pasture alone.",
          },
          {
            question: "Which animal species is best for invasive species control?",
            options: ["Cattle", "Sheep", "Goats", "Chickens"],
            correctIndex: 2,
            explanation: "Goats are the best livestock for invasive species control because they browse on woody plants and brush that other animals avoid.",
          },
        ],
        passMark: 60,
      },
    },
    {
      title: "Economics & Transition to Regenerative",
      content: [
        {
          text: "Economic Benefits of Regenerative Farming\nInput Cost Reduction:\n- Fertilizer: 30-50% reduction (cover crops fix nitrogen)\n- Herbicide: 50-80% reduction (cover crops suppress weeds)\n- Pesticide: 30-50% reduction (beneficial insects)\n- Irrigation: 20-40% reduction (improved soil water holding)\n- Fuel: 50-70% reduction (no-till)\n\nRevenue Increases:\n- Premium pricing: Organic/regenerative certified products\n- Carbon credits: $15-30/ton CO2 sequestered\n- Improved yields: 10-30% increase after 3-5 years\n- Reduced crop insurance claims (drought resilience)\n\nFarm Business Case:\nYear 1-2: Costs similar to conventional (transition costs)\nYear 3-4: Input costs begin dropping 20-30%\nYear 5+: Input costs drop 40-60%, yields improve\n\nCarbon Credit Revenue:\n- 3 tons CO2/hectare/year × $20/ton = $60/hectare/year\n- 100-hectare farm = $6,000/year additional revenue\n- Growing market demand for carbon offsets\n\nRegenerative Certification:\n- Regenerative Organic Certified (ROC)\n- Land to Market (Savory Institute)\n- Regenified\n- Commonland Foundation",
        },
        {
          text: "Transition Planning\nPhase 1: Assessment (Year 0)\n- Soil test all fields\n- Baseline biodiversity survey\n- Document current practices and costs\n- Set goals and metrics\n- Create 5-year transition plan\n\nPhase 2: Implementation (Year 1-2)\n- Start cover crops on 20-30% of acres\n- Introduce no-till on most suitable fields\n- Begin compost application\n- Plant windbreaks and hedgerows\n- Start grazing plan\n\nPhase 3: Expansion (Year 3-4)\n- Expand cover crops to 70-100% of acres\n- Full no-till implementation\n- Integrate livestock\n- Pursue certification\n- Reduce inputs based on soil improvement\n\nPhase 4: Optimization (Year 5+)\n- Full regenerative system\n- Advanced techniques (compost tea, biochar)\n- Carbon credit revenue\n- Premium market access\n- Mentoring other farmers\n\nKey Success Factors:\n- Start small, learn, expand\n- Keep records (soil tests, yields, costs)\n- Join regenerative farming networks\n- Find a mentor\n- Be patient (soil takes time to rebuild)",
        },
      ],
      quiz: {
        questions: [
          {
            question: "How long does it typically take for regenerative farming to show economic benefits?",
            options: ["Immediately", "1-2 years", "3-5 years", "10+ years"],
            correctIndex: 2,
            explanation: "Regenerative farming typically shows significant economic benefits after 3-5 years, with input costs dropping 40-60% and yields improving.",
          },
          {
            question: "How much revenue can carbon credits generate per hectare per year?",
            options: ["$1-5", "$10-30", "$100-200", "$500-1,000"],
            correctIndex: 1,
            explanation: "Carbon credits can generate approximately $60/hectare/year at $20/ton for 3 tons CO2 sequestered per hectare.",
          },
          {
            question: "What should be the first step in transitioning to regenerative farming?",
            options: ["Buy all new equipment", "Soil test all fields and set goals", "Stop all farming immediately", "Hire a consultant"],
            correctIndex: 1,
            explanation: "The first step is soil testing all fields and setting clear goals, which creates a baseline for measuring improvement.",
          },
        ],
        passMark: 60,
      },
    },
  ],
};

export default extraCourse47;
