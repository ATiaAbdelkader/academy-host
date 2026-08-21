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

export const extraCourse55: ExtraCourse = {
  title: "Bee Products & Apitherapy",
  description: "Go beyond honey — master beekeeping for profit with propolis, royal jelly, beeswax, pollen, and venom therapy. Learn hive management, product harvesting, and how to build a diversified bee business.",
  category: "Innovative Farming",
  duration: "6 weeks",
  difficulty: "Intermediate",
  priceCents: 0,
  durationMinutes: 2400,
  order: 55,
  instructor: "Dr. Hannah Weber",
  instructorTitle: "Academy Instructor",
  tags: ["beekeeping", "apiculture", "honey", "propolis", "pollination"],
  modules: [
    {
      title: "Introduction to Beekeeping",
      content: [
        {
          type: "paragraph",
          text: "Why Keep Bees?\nBeekeeping (apiculture) is one of the most rewarding and profitable agricultural ventures:\n\nProducts:\n1. Honey: $5-20/kg (raw/local)\n2. Beeswax: $10-30/kg\n3. Propolis: $100-300/kg\n4. Royal Jelly: $200-500/kg\n5. Bee Pollen: $30-100/kg\n6. Bee Venom: $50-100/gram (therapeutic)\n7. Pollination Services: $50-200/hive\n\nBenefits:\n- Start with 2-3 hives ($500-1,500)\n- Multiple revenue streams\n- Environmental impact (pollination)\n- Year-round products\n- Low land requirement\n- Scalable from hobby to commercial\n\nBee Biology:\n- Colony: 20,000-80,000 bees\n- Queen: 1 per colony, lays 1,500-2,000 eggs/day\n- Workers: Females, do all work (6 weeks lifespan)\n- Drones: Males, mate with queens (seasonal)\n- Colony lifespan: 5+ years (with management)\n\nGlobal Importance:\n- 75% of crops depend on bee pollination\n- $15 billion in pollination services annually\n- Bee populations declining (colony collapse)\n- Beekeeping helps reverse decline",
        },
        {
          type: "paragraph",
          text: "Getting Started\nEquipment Needed:\n1. Hive: Langstroth (most common), Top Bar, or Warre\n2. Bees: Package bees, nucleus colony, or swarm\n3. Protective gear: Suit, veil, gloves\n4. Smoker: Calms bees during inspection\n5. Hive tool: Pries apart frames\n6. Bee brush: Gently moves bees\n7. Extractor: For honey (can rent initially)\n\nSetup Costs:\n- Starter (2 hives): $500-1,500\n- Small apiary (10 hives): $3,000-8,000\n- Commercial (100+ hives): $30,000-100,000\n\nSpace Requirements:\n- 2-3 hives: Backyard (fenced area)\n- 10-50 hives: 0.5-2 hectares\n- 100+ hives: Migratory setup (trucks)\n\nClimate:\n- Most regions support beekeeping\n- Ensure 8+ months of forage\n- Protected from strong winds\n- Water source nearby\n- South-facing orientation preferred",
        },
      ],
    },
    {
      title: "Hive Management",
      content: [
        {
          type: "paragraph",
          text: "Seasonal Management\nSpring (March-May):\n- First inspection: Check queen, brood, food\n- Reverse brood boxes (encourage expansion)\n- Add supers as colony grows\n- Check for swarm cells\n- Feed if food stores low\n\nSummer (June-August):\n- Add honey supers\n- Monitor for swarm signs\n- Ensure adequate ventilation\n- Harvest honey (if ready)\n- Watch for varroa mites\n\nFall (September-November):\n- Harvest remaining honey\n- Treat for varroa mites\n- Feed if stores are low\n- Reduce entrance (prevent robbing)\n- Prepare for winter\n\nWinter (December-February):\n- Minimal disturbance\n- Ensure ventilation\n- Check food stores monthly\n- Remove snow from entrance\n- Plan for spring",
        },
        {
          type: "paragraph",
          text: "Hive Inspection\nWhat to Check:\n1. Queen Presence\n   - See her OR see eggs (fresh, white, in cell bottom)\n   - Marked queen easier to find\n\n2. Brood Pattern\n   - Solid pattern = healthy queen\n   - Spotty pattern = problem\n   - Eggs, larvae, capped brood present\n\n3. Food Stores\n   - Honey frames: 8-10 frames full for winter\n   - Pollen: Present for brood rearing\n   - Feed if low\n\n4. Population\n   - Strong colony: 6-8+ frames of bees\n   - Weak colony: <3 frames (needs help)\n\n5. Disease/Pests\n   - Varroa mites (sticky board test)\n   - Hive beetles\n   - Wax moths\n   - Foulbrood (check for smell)\n\nInspection Frequency:\n- Spring/Summer: Every 7-14 days\n- Fall: Monthly\n- Winter: Minimal (check food only)\n- Duration: 10-15 minutes per hive\n- Best time: Warm, sunny afternoon",
        },
      ],
    },
    {
      title: "Honey Production & Harvesting",
      content: [
        {
          type: "paragraph",
          text: "Honey Harvesting\nWhen to Harvest:\n- Frames are 80%+ capped (sealed with wax)\n- Typically: Late summer, early fall\n- Leave adequate stores for winter (8-10 frames)\n\nHarvesting Steps:\n1. Remove supers from hive\n2. Brush bees off frames (or use bee escape board)\n3. Transport frames to clean room\n4. Uncap wax seals with hot knife\n5. Place frames in extractor\n6. Spin (centrifugal force)\n7. Strain through sieve\n8. Let settle 24-48 hours\n9. Bottle in clean jars\n\nExtracting Methods:\n1. Manual Extractor: $100-300, for small apiaries\n2. Electric Extractor: $500-2,000, for larger operations\n3. Crush and Strain: $0, for top-bar hives\n4. Solar Wax Melter: For beeswax processing\n\nHoney Yield:\n- 1 hive: 15-30 kg/year (depending on location)\n- Strong hive in good area: 40-60 kg/year\n- Commercial: 25-40 kg per hive\n\nBottling:\n- Use clean, food-grade jars\n- Label with: Weight, source, date\n- Store in cool, dry place\n- Honey never spoils (properly sealed)",
        },
        {
          type: "paragraph",
          text: "Honey Varieties & Quality\nMonofloral Honey (Single Flower):\n- Clover: Mild, light, most common\n- Wildflower: Complex flavor, varies\n- Lavender: Floral, premium\n- Orange Blossom: Citrus, light\n- Manuka: Medicinal, premium ($50-200/kg)\n- Buckwheat: Dark, strong flavor\n\nQuality Factors:\n- Moisture: <18% (prevents fermentation)\n- Color: Light to dark (varies by source)\n- Flavor: Distinctive to floral source\n- Clarity: Clear vs crystallized\n- Purity: No additives\n\nTesting:\n- Moisture meter: Essential tool\n- HMF test: Freshness indicator\n- Pollen analysis: Source verification\n\nValue-Added Products:\n- Infused honey (ginger, cinnamon, chili)\n- Honeycomb (cut comb honey)\n- Honey vinegar\n- Honey mead (wine)\n- Honey candy\n- Honey skincare products\n\nPricing:\n- Bulk: $3-5/kg\n- Local/raw: $10-20/kg\n- Monofloral: $15-30/kg\n- Premium (Manuka): $50-200/kg",
        },
      ],
    },
    {
      title: "Bee Products & Apitherapy",
      content: [
        {
          type: "paragraph",
          text: "Bee Products Beyond Honey\n1. Propolis\n   - Bee glue (antibacterial resin)\n   - Harvest from propolis traps\n   - Use: Tinctures, supplements, skincare\n   - Price: $100-300/kg\n   - Properties: Antibacterial, antiviral, anti-inflammatory\n\n2. Royal Jelly\n   - Worker bee secretion for queen\n   - Harvest from queen cells\n   - Use: Supplements, cosmetics\n   - Price: $200-500/kg\n   - Properties: Antibacterial, growth factors, amino acids\n\n3. Bee Pollen\n   - Collected pollen granules\n   - Harvest from pollen traps at hive entrance\n   - Use: Supplements, food ingredient\n   - Price: $30-100/kg\n   - Properties: Protein (25%), vitamins, enzymes\n\n4. Beeswax\n   - Cappings from honey frames\n   - Melt and filter\n   - Use: Candles, cosmetics, food wraps, leather care\n   - Price: $10-30/kg\n\n5. Bee Venom\n   - Collected with electric stimulation\n   - Use: Apitherapy (arthritis, pain)\n   - Price: $50-100/gram\n   - Properties: Melittin (anti-inflammatory)",
        },
        {
          type: "paragraph",
          text: "Apitherapy\nWhat is Apitherapy?\nUsing bee products for health and healing:\n\nPropolis Uses:\n- Sore throat: Tincture gargle\n- Wound healing: Topical application\n- Oral health: Mouth rinse\n- Immune support: Daily supplement\n\nRoyal Jelly Uses:\n- Anti-aging: Skincare supplements\n- Energy: Daily tablespoon\n- Hormonal balance: Menopause support\n- Skin health: Topical cream\n\nBee Pollen Uses:\n- Protein supplement\n- Allergy relief (local pollen)\n- Energy boost\n- Athletic performance\n\nBee Venom Therapy:\n- Arthritis: Bee stings to joints\n- Multiple sclerosis: Venom injections\n- Chronic pain: Venom therapy\n- Must be done by trained practitioner\n- Risk: Allergic reactions\n\n⚠️ Warning: Apitherapy should be practiced under professional guidance. Bee stings can cause anaphylaxis in sensitive individuals.",
        },
      ],
    },
    {
      title: "Pollination Services",
      content: [
        {
          type: "paragraph",
          text: "Commercial Pollination\nPollination is the most lucrative bee product:\n\nHow It Works:\n1. Farmer contacts beekeeper\n2. Beekeeper moves hives to farm\n3. Hives are placed during bloom\n4. Bees pollinate crops\n5. Beekeeper collects rental fee\n6. Hives removed after bloom\n\nCrops Needing Pollination:\n- Almonds: 100% dependent on bees ($200/hive)\n- Apples: 80-90% ($150/hive)\n- Blueberries: 90% ($150/hive)\n- Cherries: 80-90% ($150/hive)\n- Cucumbers: 80-90% ($100/hive)\n- Watermelons: 80-90% ($100/hive)\n\nPollination Fees:\n- Almonds (California): $200-250/hive\n- Apples/Cherries: $100-180/hive\n- Blueberries: $75-150/hive\n- General crops: $50-100/hive\n\nMigratory Beekeeping:\n- Move hives across the country\n- Follow bloom calendar\n- Winter: California almonds\n- Spring: Southeast fruits\n- Summer: Northwest berries\n- Equipment: Trucks, pallets, forklifts\n- Revenue: $100,000-500,000+/year (1,000+ hives)",
        },
        {
          type: "paragraph",
          text: "Pollination Business\nGetting Started:\n1. Build strong, healthy colonies\n2. Establish relationships with farmers\n3. Join local beekeeping association\n4. Get liability insurance\n5. Invest in truck and pallet equipment\n\nContract Elements:\n- Number of hives\n- Colony strength requirement (6+ frames of bees)\n- Placement location\n- Duration of placement\n- Access for inspection\n- Payment terms\n- Liability clauses\n\nPreparing Hives for Pollination:\n- Ensure strong, queen-right colonies\n- Treat for varroa mites before moving\n- Feed if necessary\n- Check for diseases\n- Combine weak colonies\n\nLogistics:\n- Move hives at night (bees inside)\n- Stack hives on pallets (4 hives/pallet)\n- Secure for transport\n- Provide water at destination\n- Place hives in sun, facing southeast\n\nMaximizing Revenue:\n- Pollination + honey production\n- Multiple crop contracts per season\n- Diversify geographies\n- Build reputation for strong colonies\n- Offer year-round pollination services",
        },
      ],
    },
    {
      title: "Business & Marketing Bee Products",
      content: [
        {
          type: "paragraph",
          text: "Diversified Bee Business\nRevenue Streams:\n1. Honey Sales: $5,000-20,000/year (20 hives)\n2. Pollination: $10,000-50,000/year (50 hives)\n3. Beeswax Products: $2,000-10,000/year\n4. Propolis: $1,000-5,000/year\n5. Pollen: $500-2,000/year\n6. Nucleus Colonies: $3,000-10,000/year\n7. Bee Courses: $2,000-10,000/year\n8. Equipment Sales: $1,000-5,000/year\n\nTotal Potential (50 hives): $25,000-110,000/year\n\nBusiness Scaling:\nPhase 1: 2-10 hives (hobby → side income)\nPhase 2: 10-50 hives (part-time business)\nPhase 3: 50-200 hives (full-time business)\nPhase 4: 200+ hives (commercial operation)",
        },
        {
          type: "paragraph",
          text: "Marketing & Sales\nTarget Markets:\n- Farmers markets: Premium raw honey\n- Health food stores: Propolis, pollen, supplements\n- Restaurants: Specialty honey, honeycomb\n- Online: All products, nationwide shipping\n- Local shops: Gift sets, candles\n- Farmers: Pollination services, nucleus colonies\n\nBranding:\n- 'Raw' and 'unfiltered' honey\n- 'Local' (100-mile radius)\n- 'Treatment-free' (no chemicals)\n- 'Single-origin' (specific flower source)\n- 'Certified organic' (if applicable)\n\nValue-Added Products:\n- Infused honey (chili, lavender, citrus)\n- Honey gift sets\n- Beeswax candles\n- Beeswax food wraps\n- Honey skincare (lip balm, soap)\n- Propolis tincture\n- Pollen supplements\n- Mead (honey wine)\n\nPricing Strategy:\n- Direct: Full retail price\n- Wholesale: 40-50% discount\n- Bulk: 60-70% discount\n- Premium: Limited editions, monofloral\n\nRegulations:\n- Food safety certification\n- Labeling requirements\n- Organic certification (if claiming)\n- Cottage food laws (check local)\n- Insurance",
        },
      ],
    },
  ],
};

