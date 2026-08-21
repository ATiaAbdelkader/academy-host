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

export const extraCourse45: ExtraCourse = {
  title: "Mushroom Cultivation & Mycology",
  description: "Learn to grow high-value mushrooms from substrate preparation to harvest. Covers oyster, shiitake, lion's mane, and medicinal mushrooms with low-space, high-profit cultivation techniques.",
  category: "Innovative Farming",
  duration: "6 weeks",
  difficulty: "Beginner",
  priceCents: 0,
  durationMinutes: 2400,
  order: 45,
  instructor: "Dr. Lena Kovacs",
  instructorTitle: "Academy Instructor",
  tags: ["mushrooms", "mycology", "substrate", "spawn", "fungiculture"],
  modules: [
    {
      title: "Introduction to Mushroom Cultivation",
      content: [
        {
          type: "paragraph",
          text: "Why Grow Mushrooms?\nMushroom farming is one of the most accessible and profitable agricultural ventures:\n- Low startup cost ($200-2,000)\n- Grows in small spaces (closets, basements, garages)\n- No soil or sunlight required\n- Harvests in 2-6 weeks\n- High value per kg ($10-50/kg)\n- Year-round production\n- Uses agricultural waste as substrate\n\nTop Market Mushrooms:\n1. Oyster Mushrooms: Easiest to grow, fast (10-14 days), $8-15/kg\n2. Shiitake: High value, grow on logs ($15-30/kg)\n3. Lion's Mane: Premium medicinal, unique ($20-40/kg)\n4. Reishi: Medicinal, dried product ($30-60/kg)\n5. King Oyster: Meaty texture, chef favorite ($12-25/kg)\n6. Button/White: Most common, supermarket staple ($4-8/kg)\n\nThe Mushroom Life Cycle:\nSpore → Mycelium → Inoculation → Colonization → Fruiting → Harvest\nThis cycle takes 4-8 weeks from start to harvest.",
        },
        {
          type: "paragraph",
          text: "Getting Started\nEquipment Needed:\n1. Pressure cooker or autoclave (15-23 qt)\n2. Still air box or laminar flow hood\n3. Mushroom spawn (grain or sawdust)\n4. Substrate materials (straw, sawdust, coffee grounds)\n5. Growing bags or containers\n6. Spray bottle for misting\n7. Thermometer and hygrometer\n8. Alcohol sanitizer and gloves\n\nSpace Requirements:\n- Home scale: 1-5m² (closet, shelf)\n- Small commercial: 20-100m²\n- Commercial: 500m²+\n\nKey Concepts:\n- Sterilization: Kill competing organisms\n- Inoculation: Introduce mushroom spawn to substrate\n- Colonization: Mycelium grows through substrate\n- Fruiting: Environmental triggers cause mushroom formation\n- Harvest: Pick at optimal size for quality",
        },
      ],
    },
    {
      title: "Substrate Preparation",
      content: [
        {
          type: "paragraph",
          text: "Understanding Substrate\nSubstrate is the food source for mushrooms. Different species prefer different substrates:\n\nOyster Mushrooms:\n- Straw (wheat, barley, oat) — most common\n- Coffee grounds (free from cafes!)\n- Cardboard\n- Cotton waste\n- Soybean hulls\n\nShiitake:\n- Hardwood sawdust (oak, maple, beech)\n- Supplemented sawdust blocks\n- Hardwood logs (outdoor cultivation)\n\nLion's Mane:\n- Hardwood sawdust\n- Supplemented blocks with wheat bran\n\nReishi:\n- Hardwood sawdust\n- Supplemented with rice bran\n\nSubstrate Preparation Methods:\n1. Pasteurization (60-80°C for 1-2 hours)\n   - Straw: Soak in hot water or lime bath\n   - Kills competitors, preserves beneficial microbes\n   - Low tech, low cost\n\n2. Sterilization (121°C for 2 hours)\n   - Sawdust blocks in pressure cooker\n   - Kills everything, requires clean inoculation\n   - Higher success rate\n\n3. Cold Pasteurization (lime bath)\n   - Soak straw in calcium hydroxide solution (pH 12)\n   - 18-24 hours\n   - No heating required",
        },
        {
          type: "paragraph",
          text: "Step-by-Step: Straw Substrate\n1. Cut straw into 5-10cm pieces (use weed whacker in bucket)\n2. Pasteurize: Soak in 65-70°C water for 2 hours\n   OR Cold method: Soak in lime water (2% calcium hydroxide) for 18 hours\n3. Drain straw until dripping but not pooling\n4. Fill growing bags or buckets\n5. Add spawn: Mix 5-10% spawn by weight into straw\n6. Seal bags with filter patches (for gas exchange)\n7. Label with date and species\n8. Store in colonization room (20-25°C, dark)\n\nStep-by-Step: Sawdust Blocks\n1. Mix: 80% hardwood sawdust + 20% wheat bran\n2. Add water to 60-65% moisture (squeeze test: 1-2 drops)\n3. Fill autoclavable bags (2-3 kg each)\n4. Fold and seal with autoclave tape\n5. Pressure cook at 15 PSI for 2 hours\n6. Cool overnight (don't open!)\n7. Inoculate in front of still air box or flow hood\n8. Seal and label\n9. Colonize at 20-25°C for 14-21 days",
        },
      ],
    },
    {
      title: "Spawn Production & Inoculation",
      content: [
        {
          type: "paragraph",
          text: "What is Spawn?\nSpawn is mushroom mycelium grown on a carrier material (grain, sawdust, plugs). It's the 'seed' of the mushroom world.\n\nSpawn Types:\n1. Grain Spawn (Best for beginners)\n   - Rye, wheat, or millet grain colonized with mycelium\n   - Easy to break apart and distribute\n   - Colonizes substrate quickly\n   - Shelf life: 2-3 months refrigerated\n\n2. Sawdust Spawn\n   - Hardwood sawdust with grain supplement\n   - Better for logs and supplemented blocks\n   - Slower colonization but more vigorous\n\n3. Plug Spawn\n   - Wooden dowels colonized with mycelium\n   - Used specifically for log cultivation\n   - Insert into drilled holes in logs\n\n4. Liquid Spawn\n   - Mycelium suspended in nutrient broth\n   - Fastest colonization\n   - Requires sterile technique\n   - Best for advanced growers\n\nBuying vs Making Spawn:\n- Buy from reputable suppliers: North Spore, Field & Forest, Fungi Perfecti\n- Cost: $10-30 per bag\n- Making your own: Requires still air box/flow hood, grain, pressure cooker\n- Saving: 70-80% cost reduction at scale",
        },
        {
          type: "paragraph",
          text: "Inoculation Techniques\nStill Air Box (SAB) Method (Budget):\n1. Clear plastic storage tub, cut arm holes\n2. Spray interior with alcohol, wipe clean\n3. Place all materials inside\n4. Spray hands and gloves with 70% isopropyl alcohol\n5. Work quickly and deliberately\n6. Minimize air movement\n7. Break spawn into small pieces\n8. Mix evenly into cooled substrate\n9. Seal bag/container immediately\n\nLaminar Flow Hood Method (Professional):\n1. HEPA-filtered air blows across workspace\n2. Sterile air prevents contamination\n3. Place materials in the sterile zone\n4. Work efficiently but calmly\n5. Higher success rate (95%+)\n\nCritical Rules:\n- Never open bags in unclean air\n- Always work near a flame (alcohol lamp)\n- Wear gloves, sanitize frequently\n- Work in draft-free room\n- If in doubt, throw it out (contaminated bags)",
        },
      ],
    },
    {
      title: "Colonization & Fruiting",
      content: [
        {
          type: "paragraph",
          text: "Colonization Phase\nAfter inoculation, mycelium colonizes the substrate:\n\nDuration:\n- Straw: 10-14 days\n- Sawdust blocks: 14-21 days\n- Logs: 6-12 months\n\nConditions:\n- Temperature: 20-25°C (68-77°F)\n- Darkness: Mycelium doesn't need light during colonization\n- Humidity: Bag maintains moisture (sealed)\n- Air exchange: Filter patches allow gas exchange\n\nSigns of Healthy Colonization:\n✓ White, fuzzy mycelium spreading outward\n✓ Even growth pattern\n✓ No discoloration\n✓ No foul smell\n\nSigns of Contamination:\n✗ Green mold (Trichoderma) — most common\n✗ Black or orange spots\n✗ Sour or sweet smell\n✗ Mycelium stops growing\n✗ Slimy texture\n\nAction on Contamination:\n- Remove from growing area immediately\n- Do not open bag (prevents spore release)\n- Dispose in outdoor compost or trash\n- Clean growing area with bleach\n- Investigate cause (technique, substrate, spawn quality)",
        },
        {
          type: "paragraph",
          text: "Fruiting Phase\nOnce substrate is fully colonized, trigger fruiting:\n\nFruiting Triggers:\n1. Temperature drop: Reduce by 5-10°C\n2. Fresh air: Increase ventilation (higher O2, lower CO2)\n3. Light: 12 hours indirect light per day\n4. Humidity: 85-95% relative humidity\n5. Physical shock: Gentle tapping can stimulate pinning\n\nFruiting Chamber Setup:\n- Plastic storage tub with holes (DIY fruiting chamber)\n- Perlite on bottom for humidity\n- Spray walls 3-4 times daily\n- Or use: Martha tent (greenhouse shelving + plastic)\n- Or automated: Fruiting room with humidifier + fan\n\nFruiting Timeline:\n- Pinning: 3-7 days after fruiting conditions\n- Small pins form (baby mushrooms)\n- Growth: Pins double in size every 24-48 hours\n- Harvest: 5-10 days after pinning\n\nMultiple Flushes:\n- First flush: Largest yield\n- Soak substrate 12-24 hours between flushes\n- 2-3 flushes per substrate block\n- Yields decrease 30-50% per flush\n- Total yield: 1-1.5 kg per 3kg block",
        },
      ],
    },
    {
      title: "Harvesting & Processing",
      content: [
        {
          type: "paragraph",
          text: "When to Harvest\nHarvest timing is critical for quality:\n\nOyster Mushrooms:\n- Harvest when caps are 5-10cm diameter\n- Edges still slightly curled under\n- Before caps flatten completely\n- Before edges curl upward\n- Twist and pull from substrate\n\nShiitake:\n- Harvest when cap is 5-8cm\n- Before edges crack (unless 'flower shiitake' desired)\n- Cut at base with clean knife\n\nLion's Mane:\n- Harvest when spines are 1-2cm long\n- Before turning yellow/brown\n- Cut at base with knife\n\nGeneral Rules:\n- Harvest in morning (higher moisture)\n- Handle gently (bruises easily)\n- Don't wash with water (reduces shelf life)\n- Use clean knife or twist off\n- Harvest all mushrooms from same flush at once",
        },
        {
          type: "paragraph",
          text: "Post-Harvest Handling\nFresh Mushrooms:\n- Do NOT refrigerate until dry (condensation causes decay)\n- Store in paper bag in fridge: 5-10 days\n- Or: Brown paper bag at 2-4°C\n- Never use plastic bags (traps moisture)\n\nDrying:\n- Dehydrator at 35-40°C for 8-12 hours\n- Or air dry in well-ventilated room\n- Store dried in airtight containers\n- Shelf life: 1-2 years\n- Rehydrate before cooking\n\nValue-Added Products:\n1. Mushroom Powder: Dried → ground → supplement\n2. Mushroom Tea: Dried → hot water extract\n3. Mushroom Tincture: Alcohol extraction (medicinal)\n4. Pickled Mushrooms: Vinegar preservation\n5. Mushroom Jerky: Marinated and dried\n\nMarket Prices (Fresh):\n- Oyster: $8-15/kg\n- Shiitake: $15-30/kg\n- Lion's Mane: $20-40/kg\n- Reishi (dried): $30-60/kg\n- Button: $4-8/kg\n\nDried premium: 8-10x fresh price",
        },
      ],
    },
    {
      title: "Mushroom Business & Marketing",
      content: [
        {
          type: "paragraph",
          text: "Business Models\n1. Small-Scale Fresh Sales\n   - Farmers markets, local restaurants\n   - Start: $500-2,000 investment\n   - Revenue: $500-3,000/month\n   - Focus on fresh, local, gourmet varieties\n\n2. Value-Added Products\n   - Dried mushrooms, powders, teas, tinctures\n   - Higher margins, longer shelf life\n   - Can sell online (Etsy, website)\n   - Revenue: $1,000-5,000/month\n\n3. Spawn Production\n   - Produce and sell spawn to other growers\n   - Higher technical skill required\n   - Revenue: $2,000-10,000/month\n\n4. Mushroom Growing Kits\n   - Pre-inoculated blocks for home growers\n   - Retail: $20-35 per kit\n   - Wholesale to garden centers\n   - Revenue: $3,000-15,000/month\n\n5. Commercial Farming\n   - Large-scale fresh supply to restaurants/grocers\n   - Investment: $10,000-100,000+\n   - Revenue: $5,000-50,000/month",
        },
        {
          type: "paragraph",
          text: "Marketing Strategies\nTarget Customers:\n- Restaurants and chefs (gourmet varieties)\n- Health food stores (medicinal mushrooms)\n- Farmers market shoppers (fresh, local)\n- Online customers (dried, supplements)\n- Other growers (spawn, kits)\n\nBranding Tips:\n- Emphasize 'local', 'fresh', 'organic'\n- Share your growing story\n- Offer samples to restaurants\n- Use social media (Instagram is great for mushrooms)\n- Partner with local food influencers\n\nSales Channels:\n- Farmers market: Direct, premium pricing\n- Restaurant supply: Consistent bulk orders\n- Online store: Dried, supplements, kits\n- Wholesale: Grocery stores, co-ops\n- CSA boxes: Weekly subscriptions\n\nPricing Strategy:\n- Premium for fresh, local, gourmet\n- Wholesale: 30-40% discount from retail\n- Volume discounts for restaurants\n- Subscription discounts for regulars\n\nCertifications:\n- Organic certification (if using organic substrates)\n- Food safety (HACCP, GAP)\n- Insurance for food production",
        },
      ],
    },
  ],
};

