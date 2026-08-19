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

export const extraCourse43: ExtraCourse = {
  title: "Tilapia Aquaculture",
  description: "Complete guide to farming the world's most popular farmed fish. Learn pond management, breeding, feed formulation, water quality, harvesting, and how to build a profitable tilapia operation from backyard to commercial scale.",
  category: "Innovative Farming",
  duration: "8 weeks",
  difficulty: "Intermediate",
  priceCents: 0,
  durationMinutes: 2800,
  order: 43,
  instructor: "Dr. Amara Osei",
  instructorTitle: "Academy Instructor",
  tags: ["aquaculture", "tilapia", "fish farming", "pond management", "protein"],
  modules: [
    {
      title: "Introduction to Tilapia Farming",
      content: [
        {
          type: "paragraph",
          text: "Why Tilapia?\nTilapia is the second most farmed fish in the world (after carp), with global production exceeding 6 million tons annually. It's called the 'aquatic chicken' because of its adaptability, fast growth, and mild taste.\n\nKey Advantages:\n1. Fast Growth: Fingerlings reach 500g in 6-8 months\n2. Hardy: Tolerates wide temperature (16-35°C) and salinity ranges\n3. Omnivorous: Eats plants, algae, and commercial feed — no need for expensive fishmeal\n4. Breeds Easily: Females lay 1,000-2,000 eggs every 4-6 weeks\n5. Disease Resistant: Fewer disease problems than salmon or shrimp\n6. Low Capital: Can start in small ponds, tanks, or cages\n7. High Demand: Popular across Africa, Asia, Americas, and growing in Europe\n\nTilapia Species:\n- Nile Tilapia (O. niloticus): Most common, fastest growing\n- Mozambique Tilapia (O. mossambicus): Hardy but slower growing\n- Blue Tilapia (O. aureus): Cold tolerant\n- Genetically Improved Strains: GIFT, Aquafin, Genetically Super Tilapia",
        },
        {
          type: "paragraph",
          text: "Global Tilapia Industry\nTop Producing Countries:\n1. China: 1.8 million tons\n2. Indonesia: 1.2 million tons\n3. Egypt: 800,000 tons\n4. Bangladesh: 350,000 tons\n5. Philippines: 300,000 tons\n\nMarket Value:\n- Global market: $12+ billion annually\n- Export market: $8 billion (frozen fillets, whole fish)\n- Growing 5-7% annually\n\nFarming Systems:\n1. Pond Culture: Most common, low-cost\n2. Cage Culture: In rivers, lakes, reservoirs\n3. Tank Systems: Indoor, high-density\n4. RAS (Recirculating Aquaculture Systems): High-tech, water-efficient\n5. Rice-Fish Culture: Integrated with rice paddies\n\nCareer Opportunities:\n- Small-scale pond farming ($5K-20K startup)\n- Medium-scale commercial ($50K-200K)\n- Hatchery operations ($20K-100K)\n- Feed production ($100K+)\n- Processing and export ($500K+)",
        },
      ],
    },
    {
      title: "Pond Construction & Preparation",
      content: [
        {
          type: "paragraph",
          text: "Pond Design for Tilapia\nPond Types:\n1. Earthen Ponds: Most common, low-cost ($0.50-2/m²)\n- Size: 500-5,000m² per pond\n- Depth: 1-1.5m at center, 0.5m at edges\n- Slope: 3:1 (horizontal:vertical)\n\n2. Lined Ponds: For areas with poor soil ($3-8/m²)\n- HDPE or PVC liner (0.5-1mm thick)\n- Prevents water seepage\n- Essential for sandy/rocky soils\n\n3. Concrete Tanks: Urban/small spaces ($20-50/m²)\n- 10-100m² per tank\n- Easy to clean and manage\n- Higher stocking density\n\nEssential Components:\n- Water inlet: Clean water supply (borehole, river, rainwater)\n- Water outlet/overflow: Maintain water level\n- Drain: Complete drain for harvesting\n- Aeration: Paddle wheel or air pump\n- Embankments: 1m above max water level\n- Walkways: For feeding and monitoring\n\nSite Selection:\n- Clay soil (holds water)\n- Near clean water source\n- Away from pollution\n- Flat or gently sloping\n- Access to roads and markets\n- Electricity available",
        },
        {
          type: "paragraph",
          text: "Pond Preparation Protocol\nBefore stocking:\n\nStep 1: Drain & Dry (2-4 weeks)\n- Drain all water\n- Allow bottom to dry completely\n- Crack the dried bottom with a rake\n- Sun exposure kills parasites and pathogens\n\nStep 2: Lime the Bottom\n- Apply agricultural lime (calcium carbonate)\n- Rate: 500-1,000 kg/hectare\n- Neutralizes acidity, improves soil\n- Wait 7 days before filling\n\nStep 3: Fill with Water\n- Fill to 80-100cm depth\n- Filter incoming water (2mm mesh screen)\n- Allow 3-5 days for natural plankton bloom\n\nStep 4: Test Water Quality\n- pH: 6.5-8.5 (optimal 7.0-8.0)\n- Dissolved Oxygen: >4 mg/L\n- Ammonia: <0.5 mg/L\n- Temperature: 25-30°C\n- Turbidity: 30-50cm Secchi disk\n\nStep 5: Stock\n- Stock fingerlings when plankton bloom is visible (green water)\n- Fingerling size: 2-5g (5-8cm)\n- Stocking density: 3-5 fingerlings/m² (earthen), 20-50/m² (tanks)",
        },
      ],
    },
    {
      title: "Tilapia Breeding & Hatchery",
      content: [
        {
          type: "paragraph",
          text: "Natural Breeding System\nTilapia are mouthbrooders: females incubate eggs in their mouths for 10-14 days.\n\nBreeding Setup:\n- 50-200m² breeding ponds\n- Stock ratio: 1 male : 2-3 females\n- Density: 2-3 fish/m²\n- Provide nesting sites: shallow areas (20-30cm) with flat stones\n- Water temperature: 25-28°C\n- Feed: 2-3% body weight/day, high-protein (32-35%)\n\nBreeding Cycle:\n1. Males establish territories and dig nests\n2. Females approach nests, release eggs\n3. Males fertilize eggs\n4. Female picks up eggs in her mouth\n5. Incubation: 10-14 days (female doesn't eat)\n6. Fry released: 1-2mm, free-swimming\n7. Female re-collects fry when threatened\n8. Females breed every 4-6 weeks\n\nYield: Each breeding cycle produces 100-500 fry per female. A 200m² pond with 100 females can produce 20,000-50,000 fry per cycle.",
        },
        {
          type: "paragraph",
          text: "Hatchery Operations\nFor consistent fry supply, use a hatchery system:\n\n1. hapas (Net Enclosures)\n- Fine-mesh nets (1-2mm) suspended in ponds\n- 1m x 1m x 1m size\n- Stock 10-15 breeding pairs per hapa\n- Collect fry through the net mesh\n- Higher survival than open ponds (80-90%)\n\n2. Indoor Hatchery\n- 10-50 liter plastic tanks\n- Aeration and temperature control\n- Stock 20-30 pairs per tank\n- Collect fry daily\n- Highest control and survival (90-95%)\n\n3. Sex Reversal (All-Male Production)\n- Male tilapia grow 40-60% faster than females\n- Feed fry with 17α-methyltestosterone (MT) treated feed\n- 60mg MT per kg of feed\n- Feed for 21-28 days from first feeding\n- Produces 95-99% male population\n- Essential for commercial efficiency\n\nFry Management:\n- First 2 weeks: Feed finely ground high-protein feed (45-50%)\n- Weeks 3-4: Transition to 38-42% protein crumble\n- Weeks 5+: Standard fry feed (32-35% protein)\n- Grow to 5-10g before transfer to grow-out ponds",
        },
      ],
    },
    {
      title: "Feed Management & Nutrition",
      content: [
        {
          type: "paragraph",
          text: "Tilapia Nutritional Requirements\nTilapia are omnivorous but require balanced nutrition for optimal growth:\n\nProtein Requirements:\n- Fry (0-1g): 45-50%\n- Fingerling (1-10g): 35-40%\n- Grow-out (10-500g): 28-32%\n- Market size (500g+): 25-28%\n\nKey Nutrients:\n- Protein: Essential amino acids (lysine, methionine)\n- Lipids: 6-10% for energy\n- Carbohydrates: 25-40% (tilapia efficiently digest plant-based carbs)\n- Vitamins: A, D, E, K, B-complex\n- Minerals: Calcium, phosphorus, trace elements\n\nFeed Conversion Ratio (FCR):\n- Optimal: 1.5-1.8 kg feed per 1 kg fish\n- Good: 1.8-2.0\n- Poor: >2.5 (indicates waste or disease)\n\nFeed Types:\n1. Commercial Pellets: Convenient, balanced, $0.50-1.00/kg\n2. Farm-Made Feed: Lower cost, requires expertise\n3. Natural Feed: Algae, plants, insects (supplement only)\n4. Alternative Feed: BSF larvae, duckweed, cassava leaf",
        },
        {
          type: "paragraph",
          text: "Feeding Management\nFeeding Strategies:\n\n1. Fixed Rate Feeding\n- Feed 2-5% of total fish body weight per day\n- Split into 2-3 meals\n- Adjust monthly based on growth\n- Simple but may over/underfeed\n\n2. Feeding Tray Method\n- Place feeding trays at pond bottom\n- Check consumption after 30 minutes\n- Feed only what fish consume\n- Reduces waste, monitors appetite\n\n3. Demand Feeding\n- Use demand feeders (float-based)\n- Fish eat when hungry\n- Natural behavior, efficient\n- Best for cage culture\n\nFeeding Schedule by Size:\n- <1g (fry): 5-8x daily, finely ground feed\n- 1-10g: 3-4x daily, small crumble\n- 10-100g: 2-3x daily, 2mm pellet\n- 100-300g: 2x daily, 3mm pellet\n- 300g+: 2x daily, 4-5mm pellet\n\nTips:\n- Feed at same time each day\n- Avoid overfeeding (pollutes water)\n- Reduce feeding in cold weather (<20°C)\n- Increase feeding during warm months",
        },
      ],
    },
    {
      title: "Water Quality & Disease Management",
      content: [
        {
          type: "paragraph",
          text: "Water Quality Parameters\nMaintaining good water quality is the single most important factor in tilapia farming:\n\nCritical Parameters:\n1. Dissolved Oxygen (DO): >4 mg/L (critical)\n   - Below 2 mg/L: fish gasping at surface\n   - Below 1 mg/L: fish kills\n   - Aerate if DO drops\n\n2. pH: 6.5-8.5 (optimal 7.0-8.0)\n   - Below 6: stress, reduced growth\n   - Above 9: ammonia becomes toxic\n\n3. Ammonia (NH3): <0.5 mg/L\n   - Produced by fish waste and uneaten feed\n   - Toxic above 1 mg/L\n   - Reduce by: water exchange, aeration, plants\n\n4. Nitrite (NO2-): <1 mg/L\n   - Intermediate in nitrogen cycle\n   - Can cause 'brown blood disease'\n\n5. Temperature: 25-30°C (optimal)\n   - Below 18°C: reduced feeding\n   - Below 12°C: can be lethal\n   - Above 35°C: heat stress\n\n6. Turbidity: 30-50cm Secchi disk\n   - Too clear: algae bloom may crash\n   - Too murky: reduced photosynthesis\n\nMonitoring Schedule:\n- Daily: Temperature, DO, visual observation\n- Weekly: pH, ammonia, alkalinity\n- Monthly: Full water test panel",
        },
        {
          type: "paragraph",
          text: "Common Tilapia Diseases\n1. Aeromonas Infection\n   - Symptoms: Ulcers, fin rot, dropsy\n   - Treatment: Antibiotics (oxytetracycline), improve water quality\n   - Prevention: Good husbandry, avoid overcrowding\n\n2. Columnaris (Flexibacter)\n   - Symptoms: White patches on skin, fin erosion\n   - Treatment: Salt baths (3-5 ppt), copper sulfate\n   - Prevention: Avoid stress, maintain temperature\n\n3. Ichthyophthirius (Ich)\n   - Symptoms: White spots on body and fins\n   - Treatment: Salt (5 ppt), formalin, temperature increase\n   - Prevention: Quarantine new stock\n\n4. Aeromonas Hydrophila\n   - Symptoms: Hemorrhages, bloating\n   - Treatment: Antibiotics, improve water quality\n   - Prevention: Reduce stocking density\n\n5. Parasites (Gyrodactylus, Dactylogyrus)\n   - Symptoms: Flashing, mucus, lethargy\n   - Treatment: Praziquantel, salt baths\n   - Prevention: Clean water, proper stocking\n\nDisease Prevention Best Practices:\n- Stock healthy fingerlings from certified hatcheries\n- Maintain proper stocking density\n- Ensure good water quality\n- Don't overfeed\n- Remove dead fish immediately\n- Quarantine new stock for 2 weeks\n- Vaccinate for common diseases",
        },
      ],
    },
    {
      title: "Harvesting, Processing & Marketing",
      content: [
        {
          type: "paragraph",
          text: "Harvesting Methods\nWhen tilapia reach market size (300-600g), harvest:\n\n1. Complete Harvest\n- Drain pond completely\n- Collect fish with nets or by hand\n- Sort by size\n- Best for small ponds, allows pond preparation for next cycle\n\n2. Selective Harvest (Grading)\n- Use seine nets to catch larger fish\n- Return smaller fish to grow further\n- Can harvest 30-50% of stock per grading\n- Monthly grading maximizes revenue\n\n3. Cage Harvest\n- Lift cage from water\n- Transfer fish to holding tanks or directly to market\n- Simplest method\n\nHarvest Timing:\n- Morning: Lower stress, better flesh quality\n- Cool weather preferred\n- Reduce feeding 24 hours before harvest\n- Harvest before water temperature exceeds 28°C\n\nYield Expectations:\n- Earthen ponds: 4-8 tons/hectare/cycle\n- Intensive systems: 20-50 tons/hectare/cycle\n- Cages: 30-60 kg/m³\n- RAS: 50-100 kg/m³",
        },
        {
          type: "paragraph",
          text: "Post-Harvest Handling & Marketing\nProcessing Options:\n1. Whole Fish: Most common, minimal processing\n   - Chill on ice immediately (0-4°C)\n   - Store in ice slurry for 24-48 hours\n   - Transport in insulated containers\n\n2. Filleting: Higher value product\n   - Gut, scale, and fillet\n   - Vacuum pack for freshness\n   - Can be frozen (-18°C for 6-12 months)\n\n3. Smoked Fish: Preserved product\n   - Traditional smoking in kilns\n   - Extends shelf life to 3-6 months\n   - Popular in Africa and Caribbean\n\n4. Value-Added Products:\n   - Fish cakes and nuggets\n   - Fish sausages\n   - Marinated fillets\n   - Fish jerky\n\nMarketing Channels:\n- Local markets: Direct to consumers\n- Restaurants and hotels: Fresh fillets\n- Supermarkets: Packaged whole fish or fillets\n- Export: Frozen fillets to international markets\n- Processing plants: Bulk sales\n\nPricing (approximate):\n- Fresh whole: $2-4/kg\n- Fresh fillet: $6-10/kg\n- Frozen fillet: $4-8/kg\n- Smoked: $5-8/kg",
        },
      ],
    },
  ],
};

