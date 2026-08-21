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
  instructorTitle: string;
  tags: string[];
  modules: CourseModule[];
};

export const extraCourse51: ExtraCourse = {
  title: "Seaweed & Algae Farming",
  description: "Master ocean and freshwater farming of seaweed and microalgae. Learn cultivation techniques, harvesting, processing, and how to build a profitable aquafarming business with zero freshwater or fertilizer inputs.",
  category: "Innovative Farming",
  duration: "6 weeks",
  difficulty: "Beginner",
  priceCents: 0,
  durationMinutes: 2400,
  order: 51,
  instructor: "Dr. Kai Nakamura",
  instructorTitle: "Academy Instructor",
  tags: ["seaweed", "algae", "aquaculture", "ocean farming", "blue economy"],
  modules: [
    {
      title: "Introduction to Seaweed Farming",
      content: [
        {
          type: "paragraph",
          text: "Why Seaweed Farming?\nSeaweed is one of the fastest-growing and most sustainable food sources on Earth:\n- Grows 30-60cm per day\n- No freshwater needed\n- No fertilizer needed (absorbs ocean nutrients)\n- No land required\n- Absorbs CO2 and ocean acidification\n- Provides habitat for marine life\n- Can be harvested 3-6 times per year\n\nGlobal Market:\n- $16 billion industry (2023)\n- Growing 8-10% annually\n- Dominated by Asia (China, Indonesia, South Korea)\n- Rapid growth in Americas and Europe\n\nApplications:\n1. Food: Snacks, noodles, seasonings, salads\n2. Animal Feed: Nutritional supplement for livestock\n3. Fertilizer: Biostimulant, soil conditioner\n4. Cosmetics: skincare, haircare ingredients\n5. Bioplastics: Biodegradable packaging\n6. Biofuel: Third-generation biofuel\n7. Pharmaceuticals: Bioactive compounds\n8. Thickening agents: Carrageenan, alginate\n\nSpecies:\n- Kelp (Saccharina, Laminaria): Largest, most common\n- Nori (Porphyra): Sushi wraps, highest food value\n- Gracilaria: Agar production\n- Sargassum: Animal feed, fertilizer\n- Spirulina (microalgae): Superfood supplement",
        },
        {
          type: "paragraph",
          text: "Getting Started in Seaweed Farming\nMinimal Equipment Needed:\n1. Longline system: Ropes anchored to seabed\n2. Seed rope: Spore-seeded twine\n3. Anchors: Concrete blocks or screw anchors\n4. Buoy markers: Surface floats\n5. Harvesting tools: Knives, scissors, boats\n\nSpace Requirements:\n- Small scale: 100m² of ocean surface\n- Medium scale: 1,000-10,000m²\n- Commercial: 10,000m²+\n\nStartup Costs:\n- Small scale: $1,000-5,000\n- Medium scale: $10,000-50,000\n- Commercial: $50,000-500,000\n\nClimate Requirements:\n- Water temperature: 5-20°C (most species)\n- Salinity: 25-35 ppt\n- Light: Adequate for photosynthesis\n- Currents: Moderate (brings nutrients)\n- Depth: 5-30 meters\n\nLocation Considerations:\n- Clean water (远离 pollution)\n- Protected from storms\n- Access to boats and dock\n- Regulatory approval\n- Market access",
        },
      ],
    },
    {
      title: "Cultivation Techniques",
      content: [
        {
          type: "paragraph",
          text: "Seaweed Cultivation Methods\n1. Longline Cultivation (Most Common)\n   - Horizontal ropes suspended from buoys\n   - Seed ropes attached at intervals\n   - Anchored to seabed\n   - Easy to install and harvest\n   - Best for: Kelp, Gracilaria\n\n2. Floating Raft System\n   - Bamboo or plastic rafts\n   - Seedlings attached to hanging lines\n   - Popular in Asia\n   - Best for: Nori, Gracilaria\n\n3. Off-Bottom Cultivation\n   - Ropes attached directly to seabed\n   - Short vertical lines\n   - Suitable for shallow water\n   - Best for: Small-scale operations\n\n4. Tank/Aquarium System\n   - Land-based tanks with seawater\n   - Controlled environment\n   - Year-round production\n   - Best for: Microalgae, high-value species\n\nSeed Production:\n- Collect wild spores OR buy seed rope\n- Attach spores to twine using sticky solution\n- Grow in nursery until 10-30cm\n- Transfer to ocean farm\n- Seed rope cost: $1-3/meter",
        },
        {
          type: "paragraph",
          text: "Farm Management\nGrowing Season:\n- Plant: Fall (September-November)\n- Harvest: Spring (March-May)\n- Duration: 4-6 months\n- Growth: 1-3 meters per plant\n\nMaintenance:\n- Check lines weekly\n- Remove fouling organisms (barnacles, etc.)\n- Adjust depth for light/temperature\n- Replace broken ropes\n- Monitor for disease\n\nWater Quality Monitoring:\n- Temperature: Weekly\n- Salinity: Monthly\n- Nutrient levels: Monthly\n- Water clarity: Monthly\n- Pollution testing: Quarterly\n\nCommon Issues:\n- Storm damage: Use strong anchors, redundant lines\n- Grazing (sea urchins): Exclude from farm area\n- Fouling: Regular cleaning, anti-fouling measures\n- Disease: Remove affected plants, improve circulation\n- Temperature stress: Adjust depth, harvest early",
        },
      ],
    },
    {
      title: "Harvesting & Processing",
      content: [
        {
          type: "paragraph",
          text: "Harvesting Methods\n1. Manual Harvesting\n   - Cut seaweed from lines by hand\n   - Use sharp knives or scissors\n   - Small-scale: 50-100 kg/day\n   - Labor-intensive but precise\n\n2. Mechanical Harvesting\n   - Specialized cutting machines\n   - Mounted on boats\n   - Large-scale: 5-20 tons/day\n   - Faster but less selective\n\n3. Whole-Line Harvesting\n   - Remove entire rope from water\n   - Process on shore\n   - Good for small farms\n   - Less disturbance to seabed\n\nHarvest Timing:\n- Optimal: When fronds are 1-2 meters long\n- Before reproductive structures form\n- Before fouling organisms dominate\n- Before summer dieback\n\nPost-Harvest Handling:\n1. Rinse with clean seawater\n2. Sort by quality and species\n3. Process immediately (within 24 hours)\n4. Or: Dry for storage\n\nFresh Shelf Life:\n- Refrigerated (4°C): 5-7 days\n- Frozen (-18°C): 6-12 months\n- Dried: 1-2 years",
        },
        {
          type: "paragraph",
          text: "Processing Methods\n1. Fresh Sale\n   - Wash, package, deliver within 24 hours\n   - Premium price, limited shelf life\n   - Best for: Local restaurants, markets\n\n2. Drying\n   - Sun drying: 2-5 days (weather dependent)\n   - Dehydrator: 6-12 hours at 40-60°C\n   - Freeze-drying: Best quality, highest cost\n   - Reduce weight 80-90%\n   - Shelf life: 1-2 years\n\n3. Processing Products\n   - Seaweed snacks (seasoned, roasted)\n   - Nori sheets (sushi wraps)\n   - Seaweed flakes (seasoning)\n   - Seaweed powder (supplement)\n   - Agar agar (thickening agent)\n   - Carrageenan (food additive)\n   - Alginate (bioplastics)\n\nValue Chain:\n- Raw material: $1-3/kg (fresh)\n- Dried: $5-15/kg\n- Processed food: $20-50/kg\n- Specialty ingredients: $50-200/kg\n- Cosmetics/pharma: $100-1,000/kg\n\nQuality Standards:\n- Food safety certification\n- Heavy metal testing\n- Microbial testing\n- Moisture content (<12% for dried)\n- Pesticide-free verification",
        },
      ],
    },
    {
      title: "Microalgae Cultivation",
      content: [
        {
          type: "paragraph",
          text: "Introduction to Microalgae\nMicroalgae are microscopic photosynthetic organisms:\n\nTop Microalgae Species:\n1. Spirulina: Protein (60-70%), superfood\n2. Chlorella: Protein, chlorophyll, detox\n3. Dunaliella: Beta-carotene, vitamin A\n4. Haematococcus: Astaxanthin (antioxidant)\n5. Nannochloropsis: Omega-3, aquaculture feed\n\nApplications:\n- Nutritional supplements: $50-500/kg\n- Animal feed additives: $10-30/kg\n- Cosmetics ingredients: $100-1,000/kg\n- Biofuels: $1-5/liter (emerging)\n- Water treatment: Bioremediation\n\nCultivation Systems:\n1. Open Ponds (Raceways)\n   - Shallow channels (15-30cm deep)\n   - Paddle wheels for circulation\n   - Cost: $50-100/m²\n   - Best for: Spirulina, Chlorella\n\n2. Photobioreactors (PBR)\n   - Closed tubes or panels\n   - Controlled environment\n   - Cost: $200-500/m²\n   - Best for: High-value species\n\n3. Fermentation Tanks\n   - Heterotrophic (no light needed)\n   - Uses sugar as carbon source\n   - Cost: $100-300/m²\n   - Best for: Large-scale production",
        },
        {
          type: "paragraph",
          text: "Microalgae Production Process\n1. Culture Preparation\n   - Start with pure culture from supplier\n   - Grow in small flask (1-5 liters)\n   - Scale up to bucket (10-50 liters)\n   - Transfer to pond or PBR\n\n2. Growth Conditions\n   - Temperature: 20-30°C\n   - Light: 12-16 hours/day (or artificial)\n   - pH: 7-9 (species dependent)\n   - CO2: Enrich to 2-5% for faster growth\n   - Nutrients: Nitrogen, phosphorus, trace elements\n\n3. Harvesting\n   - Flocculation: Add flocculant, algae clumps settle\n   - Centrifugation: Spin to separate (fast, expensive)\n   - Filtration: Membrane filters (moderate cost)\n   - Sun drying: Lowest cost, slowest\n\n4. Processing\n   - Spray drying: Powder form\n   - Freeze drying: Premium quality\n   - Cell disruption: For intracellular products\n   - Extraction: For specific compounds\n\nProduction Rates:\n- Open pond: 10-20 g/m²/day\n- PBR: 20-50 g/m²/day\n- Fermentation: 50-100 g/m²/day equivalent",
        },
      ],
    },
    {
      title: "Business & Marketing",
      content: [
        {
          type: "paragraph",
          text: "Business Models\n1. Raw Material Sales\n   - Sell fresh/dried seaweed to processors\n   - Revenue: $1-5/kg fresh, $5-15/kg dried\n   - Volume-dependent\n   - Lowest risk, lowest margin\n\n2. Value-Added Products\n   - Seaweed snacks, seasonings, supplements\n   - Revenue: $20-100/kg\n   - Requires processing equipment\n   - Higher margin, more complexity\n\n3. Ingredient Supply\n   - Supply to food, cosmetics, pharma industries\n   - Revenue: $50-500/kg\n   - Requires certifications\n   - Highest margin, highest barriers\n\n4. Agritourism\n   - Farm tours, workshops, experiences\n   - Revenue: $50-200/visitor\n   - Supplementary income\n   - Good marketing channel\n\n5. Ecosystem Services\n   - Carbon credits: $10-30/ton\n   - Water quality improvement payments\n   - Biodiversity credits\n   - Emerging revenue streams\n\nStartup Budget:\n- Small farm (100m²): $5,000-15,000\n- Medium farm (1,000m²): $20,000-80,000\n- Commercial (10,000m²+): $100,000-500,000",
        },
        {
          type: "paragraph",
          text: "Marketing Channels\nDirect Sales:\n- Farmers markets: Fresh seaweed\n- Restaurants: Chef partnerships\n- Online: Dried products, supplements\n- CSA boxes: Weekly seaweed shares\n\nB2B Sales:\n- Food manufacturers: Ingredients\n- Cosmetic companies: Extracts\n- Animal feed mills: Supplements\n- Fertilizer companies: Biostimulants\n\nCertifications:\n- Organic certification\n- Food safety (HACCP, SQF)\n- Marine organic (ASC-MSC)\n- Sustainability certifications\n\nMarketing Tips:\n- Emphasize sustainability story\n- Highlight nutritional benefits\n- Offer tasting samples\n- Partner with chefs\n- Use social media (ocean content)\n- Attend seafood trade shows\n\nChallenges:\n- Weather dependency\n- Regulatory hurdles\n- Market education (some consumers unfamiliar)\n- Processing infrastructure\n- Seasonal production",
        },
      ],
    },
    {
      title: "Environmental Impact & Sustainability",
      content: [
        {
          type: "paragraph",
          text: "Environmental Benefits of Seaweed Farming\n1. Carbon Sequestration\n   - Absorbs CO2 during growth\n   - When sank to deep ocean, carbon stored for centuries\n   - Potential to offset 5% of global emissions\n   - Carbon credits available\n\n2. Ocean Deacidification\n   - Absorbs CO2, locally reduces ocean acidity\n   - Helps protect coral reefs and shellfish\n   - Creates local pH buffer zones\n\n3. Water Quality Improvement\n   - Absorbs excess nitrogen and phosphorus\n   - Reduces eutrophication\n   - Filters pollutants\n   - Improves water clarity\n\n4. Habitat Creation\n   - Provides shelter for fish and invertebrates\n   - Increases local biodiversity\n   - Nursery habitat for juvenile fish\n   - Reduces pressure on wild stocks\n\n5. No Freshwater/Fertilizer\n   - Uses ocean nutrients (no agricultural runoff)\n   - Zero freshwater consumption\n   - No land use change\n   - Minimal carbon footprint",
        },
        {
          type: "paragraph",
          text: "Regenerative Ocean Farming\nThe Vision: farms that restore ocean ecosystems while producing food.\n\nIntegrated Multi-Trophic Aquaculture (IMTA):\n- Combine seaweed with shellfish and finfish\n- Seaweed absorbs waste nutrients from fish\n- Shellfish filter particles\n- Creates balanced ecosystem\n\nExample IMTA System:\n- Salmon farm (produces waste nutrients)\n- Mussel lines (filter particles)\n- Kelp lines (absorb dissolved nutrients)\n- Result: Clean water, multiple products, restored ecosystem\n\nScalability:\n- Global ocean area: 361 million km²\n- 0.01% ocean farmed = 36,000 km²\n- Potential production: 1 billion tons/year\n- Could replace all land-based animal feed\n- Could sequester 5% of global CO2\n\nChallenges:\n- Regulatory frameworks still developing\n- Storm and weather risks\n- Market development needed\n- Processing infrastructure gaps\n- Knowledge transfer from Asia\n\nThe Blue Economy:\n- Seaweed farming is the foundation of ocean-based sustainable economy\n- Creates jobs in coastal communities\n- Provides food security without land use\n- Helps combat climate change\n- Restores ocean health",
        },
      ],
    },
  ],
};

