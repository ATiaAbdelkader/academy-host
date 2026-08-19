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

export const extraCourse48: ExtraCourse = {
  title: "Silvopasture & Agroforestry",
  description: "Design and manage farming systems that combine trees, livestock, and crops on the same land. Learn tree selection, pasture management, timber production, and how to build multi-layered productive landscapes.",
  category: "Innovative Farming",
  duration: "8 weeks",
  difficulty: "Intermediate",
  priceCents: 0,
  durationMinutes: 2600,
  order: 48,
  instructor: "Dr. James Whitfield",
  instructorTitle: "Academy Instructor",
  tags: ["silvopasture", "agroforestry", "trees", "livestock", "timber"],
  modules: [
    {
      title: "Agroforestry Systems Overview",
      content: [
        {
          type: "paragraph",
          text: "What is Agroforestry?\nAgroforestry is the intentional integration of trees and shrubs with crops and/or livestock on the same land. It's a traditional practice that's being rediscovered for its environmental and economic benefits.\n\nFive Main Agroforestry Systems:\n1. Silvopasture: Trees + pasture + livestock\n2. Alley Cropping: Rows of trees with crops between alleys\n3. Forest Farming: Cultivating crops under existing forest canopy\n4. Riparian Buffers: Trees along waterways for filtration\n5. Windbreaks/Shelterbelts: Tree rows for wind protection\n\nWhy Agroforestry?\n- 2-5x more productive than single-system farming\n- Diversified income (timber + crops + livestock)\n- Carbon sequestration: 5-10 tons CO2/ha/year\n- Biodiversity habitat\n- Soil erosion reduction 50-90%\n- Water quality improvement\n- Climate resilience\n\nGlobal Adoption:\n- 1 billion+ hectares worldwide\n- Growing rapidly in Africa, Asia, Americas\n- Carbon credit programs incentivizing adoption\n- USDA NRCS provides cost-share funding",
        },
        {
          type: "paragraph",
          text: "Silvopasture Deep Dive\nSilvopasture = Trees + Forage + Livestock\n\nThe most productive agroforestry system:\n- Trees provide shade → animals more productive\n- Animals manage understory → reduces mowing\n- Nutrient cycling → manure fertilizes trees\n- Diversified income → timber + meat/milk + carbon\n\nBenefits for Livestock:\n- 10-20% weight gain improvement in shade\n- Reduced heat stress → better reproduction\n- Wind protection in winter\n- Improved welfare → premium pricing\n\nBenefits for Trees:\n- Natural weed control (animals eat competing vegetation)\n- Fertilization from manure\n- Reduced mowing costs\n- Carbon sequestration incentive payments\n\nTree Density Guidelines:\n- Open silvopasture: 40-100 trees/hectare\n- Moderate: 100-200 trees/hectare\n- Dense: 200+ trees/hectare (gradually thin)\n- Start sparse, add trees as system matures",
        },
      ],
    },
    {
      title: "Tree Selection & Planting",
      content: [
        {
          type: "paragraph",
          text: "Selecting Trees for Silvopasture\nCriteria:\n1. Fast growth: Reach canopy in 5-10 years\n2. Wide canopy: Maximum shade coverage\n3. Deep roots: Don't compete with pasture\n4. Nut/drop products: Additional income stream\n5. Timber value: Long-term income\n6. Nitrogen fixation: Pair with nitrogen-fixing trees\n7. Leaf litter: Moderate (not too acidic)\n\nTop Silvopasture Tree Species:\n\nTemperate:\n- Black Walnut: Timber + nuts ($50-200/tree at maturity)\n- Honey Locust: Gleditsia pods for feed, nitrogen fixer\n- Pin Oak: Fast shade, good timber\n- Kentucky Coffee Tree: Hardy, unique pods\n- Chestnuts: Nuts for livestock feed + human market\n\nTropical:\n- Leucaena: Nitrogen fixer, fodder tree\n- Gliricidia: Shade + nitrogen + firewood\n- Moringa: Nutritious leaves for livestock\n- Banana: Quick shade + fruit\n- Papaya: Fast income while trees establish\n\nPlanting Guidelines:\n- Plant during rainy season\n- Use quality seedlings from nursery\n- Protect with tree guards (from livestock damage)\n- Space based on target density\n- Water during establishment (first 2 years)\n- Mulch around base (keep mulch away from trunk)",
        },
        {
          type: "paragraph",
          text: "Establishment & Maintenance\nYear 0: Planning\n- Soil test site\n- Select species based on climate, soil, goals\n- Design layout (rows, spacing, access paths)\n- Order seedlings (6 months in advance)\n\nYear 1: Planting\n- Plant seedlings (bare root or containerized)\n- Install tree guards (deer, livestock protection)\n- Mulch 1m radius around each tree\n- Water weekly during dry periods\n- Keep grass/weeds away from tree base\n\nYears 1-3: Establishment\n- Prune lower branches for trunk development\n- Monitor for disease, pests\n- Replace dead trees (10-20% mortality expected)\n- Begin grazing BETWEEN tree rows after year 2\n- Don't graze around young trees until protected\n\nYears 4-10: Development\n- Canopy begins closing\n- Shade benefits become apparent\n- Thin if too dense\n- Prune for timber quality\n- Monitor understory forage growth\n\nYears 10+: Mature System\n- Full canopy development\n- Maximum ecosystem benefits\n- Begin timber harvest (if applicable)\n- Nut harvest begins\n- Full integration with livestock",
        },
      ],
    },
    {
      title: "Pasture Management in Agroforestry",
      content: [
        {
          type: "paragraph",
          text: "Understory Forage Management\nLight conditions change as trees grow:\n\nEarly Years (Full Sun):\n- Warm-season grasses: Bermuda, bahiagrass, switchgrass\n- Cool-season grasses: Tall fescue, orchardgrass\n- Legumes: White clover, red clover, alfalfa\n- Full sun = full pasture productivity\n\nMid-Transition (Partial Shade):\n- Shade-tolerant grasses dominate\n- Tall fescue performs well in shade\n- White clover tolerates partial shade\n- Reduce stocking rate as shade increases\n\nMature System (Dappled Shade):\n- 40-60% shade coverage\n- Shade-tolerant species: Tall fescue, Kentucky bluegrass\n- Ferns and native understory plants\n- Reduced forage yield but higher quality\n\nForage Species for Shaded Conditions:\n- Tall fescue: Most shade-tolerant grass\n- Kentucky bluegrass: Tolerates moderate shade\n- White clover: Excellent in partial shade\n- Chicory: Deep-rooted, shade-tolerant legume\n- Plantain: Medicinal properties, shade-tolerant\n\nGrazing Management:\n- Shorter grazing periods in shade (avoid overgrazing)\n- Longer rest periods (slower regrowth in shade)\n- Monitor forage height before grazing\n- Supplement hay during low-production periods",
        },
        {
          type: "paragraph",
          text: "Alley Cropping Management\nAlley Cropping: Rows of trees with crops grown between the alleys.\n\nAlley Width Guidelines:\n- Narrow (8-12m): Small grains, hay, cover crops\n- Medium (12-20m): Row crops (corn, soybeans)\n- Wide (20-30m): Equipment-friendly, diverse crops\n\nTree Row Management:\n- Prune lower branches for equipment access\n- Maintain clear row middle (mowed or grazed)\n- Manage leaf litter (beneficial or problematic)\n- Control competing vegetation near trees\n\nCrop Selection for Alleys:\n- Small grains: Wheat, oats, barley (low competition)\n- Hay: Alfalfa, timothy, orchardgrass\n- Row crops: Corn, soybeans (if alleys wide enough)\n- Vegetables: High-value crops in early years\n- Cover crops: Always maintain cover between trees\n\nProgression Over Time:\nYears 1-5: Full crop production between young trees\nYears 5-15: Partial shade, reduce to shade-tolerant crops\nYears 15+: Full canopy, transition to hay or silvopasture",
        },
      ],
    },
    {
      title: "Economics & Carbon Markets",
      content: [
        {
          type: "paragraph",
          text: "Revenue Streams in Agroforestry\n1. Timber (Long-term)\n   - Plantation timber: $10,000-100,000/hectare at harvest\n   - Harvest cycle: 15-40 years depending on species\n   - High-value species: Black walnut, teak, mahogany\n\n2. Nuts & Fruits (Annual)\n   - Chestnuts: $3,000-8,000/hectare/year at maturity\n   - Walnuts: $2,000-5,000/hectare/year\n   - Persimmons, pawpaws: $1,000-3,000/hectare/year\n\n3. Livestock (Annual)\n   - Cattle: $500-1,500/hectare/year\n   - Sheep: $300-1,000/hectare/year\n   - Poultry: $1,000-3,000/hectare/year\n\n4. Carbon Credits (Annual)\n   - 5-10 tons CO2/hectare/year\n   - $15-30/ton\n   - $75-300/hectare/year\n\n5. Ecosystem Services\n   - Water quality credits\n   - Biodiversity offsets\n   - Pollinator habitat payments\n\n6. Value-Added Products\n   - Craft lumber\n   - Specialty nuts\n   - Maple syrup\n   - Mushroom cultivation under trees",
        },
        {
          type: "paragraph",
          text: "Carbon Market Opportunities\nAgroforestry is one of the highest carbon-sequestering land uses:\n\nCarbon Sequestration Rates:\n- Silvopasture: 3-10 tons CO2/ha/year\n- Alley cropping: 2-5 tons CO2/ha/year\n- Riparian buffers: 5-15 tons CO2/ha/year\n- Windbreaks: 1-3 tons CO2/ha/year\n\nCarbon Credit Programs:\n1. Verra VCS: International standard\n2. Gold Standard: Premium pricing\n3. American Carbon Registry: US-focused\n4. Climate Action Reserve: US agriculture\n5. Indigo Ag: Farmer-friendly platform\n\nCarbon Credit Revenue Example:\n- 100-hectare silvopasture farm\n- 5 tons CO2/ha/year × $25/ton\n= $12,500/year additional revenue\n- 20-year contract = $250,000 total\n\nGetting Started:\n1. Baseline soil carbon measurement\n2. Implement regenerative practices\n3. Document changes (photos, soil tests)\n4. Enroll in carbon program\n5. Annual verification and payment\n\nChallenges:\n- Measurement complexity\n- Long-term commitment required\n- Verification costs\n- Market price volatility",
        },
      ],
    },
    {
      title: "Design & Implementation",
      content: [
        {
          type: "paragraph",
          text: "Site Assessment\nBefore designing your agroforestry system:\n\n1. Soil Analysis\n- Soil type (clay, sand, loam)\n- Drainage capacity\n- pH and nutrients\n- Depth to bedrock or water table\n\n2. Climate Assessment\n- Hardiness zone\n- Annual rainfall\n- Frost dates\n- Wind patterns\n- Sun exposure\n\n3. Topography\n- Slope and aspect\n- Erosion risk\n- Water flow patterns\n\n4. Existing Conditions\n- Current land use\n- Existing vegetation\n- Wildlife presence\n- Infrastructure (fences, roads, water)\n\n5. Goals & Resources\n- Primary income goal\n- Available labor\n- Capital budget\n- Timeline\n- Market access",
        },
        {
          type: "paragraph",
          text: "Design Principles\n1. Start with the end in mind\n   - What will this look like in 20 years?\n   - Design mature system, implement incrementally\n\n2. Match species to site\n   - Trees suited to soil and climate\n   - Pasture suited to shade level\n   - Livestock suited to forage type\n\n3. Plan for infrastructure\n   - Fencing between tree rows\n   - Water access points\n   - Equipment lanes\n   - Handling facilities\n\n4. Manage edges\n   - Hedgerows for biodiversity\n   - Windbreaks for protection\n   - Riparian buffers for water quality\n\n5. Build in redundancy\n   - Multiple tree species\n   - Multiple income streams\n   - Multiple grazing options\n\nImplementation Checklist:\n□ Complete site assessment\n□ Develop design plan\n□ Order tree seedlings (6 months ahead)\n□ Install fencing\n□ Plant trees (rainy season)\n□ Install tree guards\n□ Begin pasture establishment\n□ Monitor and adapt annually",
        },
      ],
    },
    {
      title: "Management & Long-Term Success",
      content: [
        {
          type: "paragraph",
          text: "Annual Management Calendar\nSpring:\n- Assess winter damage\n- Prune dead/damaged branches\n- Soil test (every 2-3 years)\n- Begin grazing when pasture reaches 15cm\n- Monitor tree growth, replace failures\n\nSummer:\n- Monitor water availability\n- Graze according to plan\n- Watch for pests and disease\n- Harvest early-season nuts/fruits\n- Mow tree rows if needed\n\nFall:\n- Harvest nuts and fruits\n- Collect seed for nursery\n- Apply compost if needed\n- Reduce grazing as growth slows\n- Plan next year's improvements\n\nWinter:\n- Major pruning (dormant season)\n- Equipment maintenance\n- Marketing and sales planning\n- Record keeping and analysis\n- Attend workshops and conferences\n\nLong-Term Monitoring:\n- Tree growth (DBH measurement)\n- Forage production (clip and weigh)\n- Soil organic matter (annual test)\n- Wildlife observation\n- Financial tracking",
        },
        {
          type: "paragraph",
          text: "Troubleshooting Common Issues\nProblem: Trees dying from livestock damage\nSolution: Install robust tree guards, fence off young trees, reduce stocking rate\n\nProblem: Too much shade, pasture dying\nSolution: Thin trees, prune canopy, switch to shade-tolerant forage, reduce stocking\n\nProblem: Invasive species taking over\nSolution: Targeted grazing (goats for brush), mechanical removal, judicious herbicide use\n\nProblem: Poor tree growth\nSolution: Check soil conditions, ensure adequate water, protect from competition\n\nProblem: Predator issues with livestock\nSolution: Guardian animals (dogs, donkeys), secure night housing, fladry (flagging)\n\nProblem: Market access for products\nSolution: Direct marketing, CSA, farmers markets, online sales, value-added processing\n\nBuilding Resilience:\n- Diversify species (trees + crops + animals)\n- Multiple income streams\n- Climate-adapted varieties\n- Water harvesting and storage\n- Community partnerships\n- Continuous learning and adaptation",
        },
      ],
    },
  ],
};

