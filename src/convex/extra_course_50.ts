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

export const extraCourse50: ExtraCourse = {
  title: "Carbon Farming & Climate Markets",
  description: "Learn to earn money from carbon sequestration. Master soil carbon measurement, carbon credit protocols, verification processes, and how to build a profitable carbon farming business.",
  category: "Innovative Farming",
  duration: "6 weeks",
  difficulty: "Advanced",
  priceCents: 0,
  durationMinutes: 2200,
  order: 50,
  instructor: "Dr. Elena Rodriguez",
  instructorTitle: "Academy Instructor",
  tags: ["carbon credits", "climate", "sequestration", "trading", "soil carbon"],
  modules: [
    {
      title: "Carbon Farming Fundamentals",
      content: [
        {
          type: "paragraph",
          text: "What is Carbon Farming?\nCarbon farming is agricultural management specifically designed to sequester atmospheric carbon dioxide into soil and biomass. Farmers earn carbon credits for verified carbon sequestration.\n\nThe Carbon Market:\n- Voluntary Carbon Market (VCM): $2B (2023) → projected $50B by 2030\n- Compliance markets: EU ETS, California cap-and-trade\n- Agriculture is the fastest-growing carbon credit sector\n\nHow Carbon Credits Work:\n1. Farm adopts carbon-sequestering practices\n2. Carbon sequestration is measured/verified\n3. Each ton of CO2 sequestered = 1 carbon credit\n4. Credits sold to buyers (companies offsetting emissions)\n5. Buyer claims carbon neutrality\n\nCarbon Farming Practices:\n- No-till/reduced tillage\n- Cover cropping\n- Composting and biochar application\n- Agroforestry and silvopasture\n- Improved grazing management\n- Nutrient management\n- Wetland restoration\n\nRevenue Potential:\n- $15-30 per carbon credit (voluntary market)\n- $50-100 per credit (premium/verified)\n- Average farm: 1-5 tons CO2/hectare/year\n- 100-hectare farm: $15,000-150,000/year",
        },
        {
          type: "paragraph",
          text: "Soil Carbon Science\nHow Carbon Gets Into Soil:\n1. Photosynthesis: Plants capture CO2 from atmosphere\n2. Root exudates: 20-40% of plant carbon goes to roots\n3. Microbial processing: Bacteria and fungi transform carbon\n4. Humification: Stable carbon compounds form\n5. Aggregation: Carbon protected inside soil aggregates\n\nCarbon Pools in Soil:\n- Labile carbon: 1-5 year turnover (active)\n- Slow carbon: 5-100 year turnover (semi-stable)\n- Passive carbon: 100-1,000+ year turnover (stable)\n- Total soil carbon: 2-10% of soil weight\n\nFactors Affecting Carbon Storage:\n- Climate: Cooler = more storage\n- Soil type: Clay soils store more carbon\n- Vegetation: More biomass = more carbon input\n- Management: Regenerative practices increase storage\n- Time: Carbon builds over 5-20 years\n\nSaturation Point:\n- Soils have a maximum carbon capacity\n- Sandy soils: 30-50 tons C/hectare\n- Clay soils: 80-150 tons C/hectare\n- Carbon accumulation slows as saturation approaches\n- Important for accurate credit calculations",
        },
      ],
    },
    {
      title: "Carbon Credit Protocols",
      content: [
        {
          type: "paragraph",
          text: "Major Carbon Credit Standards\n1. Verra VCS (Verified Carbon Standard)\n   - Largest voluntary standard\n   - Agriculture methodologies available\n   - Verification required every 5 years\n   - Credits: VCUs (Voluntary Carbon Units)\n   - Price: $10-30/credit\n\n2. Gold Standard\n   - Premium pricing ($20-50/credit)\n   - Focus on co-benefits (SDGs)\n   - Agriculture methodology available\n   - Higher verification requirements\n\n3. American Carbon Registry (ACR)\n   - US-focused\n   - Soil Enrichment Protocol\n   - Price: $15-25/credit\n   - Good for US farmers\n\n4. Climate Action Reserve (CAR)\n   - US and international\n   - Livestock and agriculture protocols\n   - Price: $15-30/credit\n\n5. Indigo Ag Carbon Program\n   - Farmer-friendly platform\n   - Lower barriers to entry\n   - Premium credits ($20-40/credit)\n   - 10-year contracts\n\nChoosing a Program:\n- Consider: Price, requirements, timeline, support\n- Start with: Indigo Ag or ACR (easier entry)\n- Premium: Gold Standard (higher price)\n- Scale: Verra VCS (largest market)",
        },
        {
          type: "paragraph",
          text: "Credit Pricing & Markets\nCarbon Credit Pricing:\n- Baseline: $10-15/credit (standard agriculture)\n- Premium: $20-40/credit (verified, co-benefits)\n- High-quality: $50-100/credit (Gold Standard + co-benefits)\n\nPrice Factors:\n- Verification quality\n- Co-benefits (biodiversity, water quality)\n- Permanence guarantee\n- Additionality (would it have happened anyway?)\n- Vintage (year of sequestration)\n- Buyer type (corporate vs individual)\n\nMarketplaces:\n- CBL Markets: Largest platform\n- ACX (AirCarbon Exchange)\n- Toucan Protocol\n- KlimaDAO\n- Direct sales to companies\n\nBuyer Types:\n1. Corporations: Net-zero commitments (Microsoft, Google)\n2. Airlines: Carbon offset requirements\n3. Governments: Climate commitments\n4. Individuals: Personal carbon neutrality\n5. Financial institutions: ESG portfolio requirements\n\nTrends:\n- Prices rising 10-20% annually\n- Demand outpacing supply\n- Quality premiums increasing\n- Technology reducing verification costs",
        },
      ],
    },
    {
      title: "Measurement & Verification",
      content: [
        {
          type: "paragraph",
          text: "Measuring Soil Carbon\nMethods:\n1. Direct Soil Sampling\n   - Collect cores at 0-30cm and 30-100cm depth\n   - Send to lab for organic carbon analysis\n   - Cost: $20-50 per sample\n   - Gold standard for verification\n\n2. Spectroscopic Methods\n   - Near-infrared (NIR) spectroscopy\n   - Mid-infrared (MIR) spectroscopy\n   - Faster, cheaper than lab analysis\n   - Cost: $5-15 per sample\n\n3. Modeling (COMET-Farm)\n   - USDA tool for carbon estimation\n   - Uses climate, soil, and management data\n   - Free to use\n   - Good for baseline estimation\n\n4. Remote Sensing\n   - Satellite imagery analysis\n   - NDVI for biomass estimation\n   - Emerging technology\n   - Less accurate for soil carbon\n\n5. Eddy Covariance\n   - Measures actual CO2 flux\n   - Very accurate but expensive\n   - Cost: $100,000+ installation\n   - Research-grade equipment\n\nSampling Protocol:\n- Baseline: Sample before changing practices\n- Grid sampling: 1 sample per 2-5 hectares\n- Depth: At least 30cm, ideally 100cm\n- Frequency: Every 3-5 years for verification\n- GPS coordinates: Record exact locations",
        },
        {
          type: "paragraph",
          text: "Verification Process\nStep 1: Project Design\n- Define project boundary\n- Select carbon credit standard\n- Develop monitoring plan\n- Calculate expected sequestration\n- Submit project design document\n\nStep 2: Baseline Establishment\n- Sample soil carbon at multiple locations\n- Document current management practices\n- Establish reference scenario\n- Third-party validation\n\nStep 3: Monitoring\n- Regular soil sampling (every 3-5 years)\n- Document all management changes\n- Track inputs and outputs\n- Maintain detailed records\n\nStep 4: Verification\n- Independent third-party auditor\n- Reviews data and methodology\n- Confirms carbon sequestration\n- Issues verified carbon credits\n- Verification cost: $5,000-20,000 per project\n\nStep 5: Credit Issuance\n- Credits issued to project registry\n- Credits can be sold on marketplace\n- Unique serial numbers prevent double-counting\n- Credits retire when buyer uses them\n\nTimeline:\n- Project registration: 3-6 months\n- Baseline establishment: 1 year\n- First credit issuance: 2-3 years\n- Ongoing: 5-year verification cycles",
        },
      ],
    },
    {
      title: "Carbon Farming Practices",
      content: [
        {
          type: "paragraph",
          text: "High-Impact Carbon Practices\n1. Cover Cropping\n   - Adds 0.3-0.5 tons CO2/hectare/year\n   - Increases soil organic matter\n   - Reduces erosion and nutrient leaching\n   - Cost: $15-40/acre for seed\n\n2. No-Till/Reduced Tillage\n   - Saves 0.5-1.0 tons CO2/hectare/year\n   - Reduces fuel use 50-70%\n   - Preserves soil structure\n   - Requires weed management changes\n\n3. Compost Application\n   - Adds 0.5-1.5 tons CO2/hectare/year\n   - Improves soil biology\n   - Increases water retention\n   - Cost: $50-100/ton applied\n\n4. Biochar Application\n   - Stores 1-3 tons CO2/hectare/year\n   - Long-term carbon storage (100+ years)\n   - Improves soil fertility\n   - Cost: $200-500/ton applied\n\n5. Agroforestry\n   - Sequesters 3-10 tons CO2/hectare/year\n   - Multiple income streams\n   - Biodiversity benefits\n   - Long-term investment\n\n6. Improved Grazing\n   - Sequesters 1-3 tons CO2/hectare/year\n   - Mimics natural grassland dynamics\n   - Builds soil carbon\n   - Reduces methane intensity",
        },
        {
          type: "paragraph",
          text: "Stacking Practices for Maximum Impact\nThe Power of Combining:\nPractice Stack (100-hectare farm):\n\nCover crops: +0.4 tons CO2/ha/year = 40 tons\nNo-till: +0.7 tons CO2/ha/year = 70 tons\nCompost: +1.0 tons CO2/ha/year = 100 tons\nAgroforestry: +5.0 tons CO2/ha/year = 500 tons\n\nTotal: 710 tons CO2/year\nAt $25/credit = $17,750/year\n\nPriority Ranking (Best ROI):\n1. Cover crops (lowest cost, immediate benefit)\n2. No-till (saves fuel + sequesters carbon)\n3. Compost (moderate cost, high impact)\n4. Improved grazing (if livestock present)\n5. Agroforestry (highest impact, longest timeline)\n6. Biochar (highest impact, highest cost)\n\nImplementation Strategy:\nYear 1: Cover crops + no-till (low cost, quick start)\nYear 2: Add compost application\nYear 3: Begin agroforestry planting\nYear 4: Consider biochar if budget allows\nYear 5: First verification and credit issuance",
        },
      ],
    },
    {
      title: "Building a Carbon Farming Business",
      content: [
        {
          type: "paragraph",
          text: "Business Planning\nRevenue Model:\n- Carbon credits: $15-50/credit\n- Premium pricing for co-benefits\n- Long-term contracts (5-20 years)\n- Growing demand from corporations\n\nStartup Costs:\n- Soil testing: $2,000-5,000\n- Practice implementation: $10-50/hectare\n- Registration fees: $5,000-15,000\n- Monitoring equipment: $2,000-10,000\n- Total: $20,000-80,000 for 100-hectare farm\n\nROI Timeline:\n- Year 1-2: Investment phase (costs > revenue)\n- Year 3-4: First credit issuance\n- Year 5+: Profitable carbon revenue\n- 10-year NPV: $100,000-500,000 per 100 hectares\n\nRisk Management:\n- Climate variability affects sequestration rates\n- Market price fluctuations\n- Policy changes\n- Verification failures\n\nMitigation:\n- Diversify practices (stack multiple methods)\n- Long-term contracts with fixed prices\n- Regular monitoring and adaptive management\n- Build relationships with buyers",
        },
        {
          type: "paragraph",
          text: "Marketing & Sales\nSelling Carbon Credits:\n\n1. Through Aggregators\n   - Platforms: Indigo Ag, Nori, CIBO\n   - They handle verification and sales\n   - Lower price (platform takes 20-40%)\n   - Easiest entry point\n\n2. Direct to Buyers\n   - Approach corporations with net-zero goals\n   - Build relationships\n   - Higher price (no middleman)\n   - Requires more effort\n\n3. Through Brokers\n   - Carbon credit brokers\n   - Connect buyers and sellers\n   - Commission: 5-15%\n   - Good for larger volumes\n\nBuyer Outreach:\n- Target: Companies with public climate commitments\n- Approach: Sustainability departments\n- Offer: Verified, premium credits with co-benefits\n- Package: Carbon + biodiversity + water quality\n\nCertification Marketing:\n- 'Carbon-neutral product' label\n- 'Regenerative' certification\n- 'Climate-smart' branding\n- Story of the farm's carbon journey\n\nBuilding Premium Value:\n- Document biodiversity co-benefits\n- Water quality improvements\n- Community benefits\n- Photographic evidence\n- Annual impact reports",
        },
      ],
    },
    {
      title: "Future of Carbon Markets",
      content: [
        {
          type: "paragraph",
          text: "Market Evolution\nShort-term (2024-2027):\n- Prices rising to $30-50/credit\n- Corporate demand increasing\n- Technology reducing verification costs\n- More farmers entering the market\n- Standardization improving\n\nMedium-term (2027-2030):\n- Prices reaching $50-100/credit\n- Mandatory carbon reporting for companies\n- Carbon border taxes (EU CBAM)\n- Blockchain verification\n- AI-powered monitoring\n\nLong-term (2030+):\n- Prices potentially $100-200/credit\n- Carbon as standard farm revenue\n- Integrated with financial markets\n- Real-time verification\n- Climate-positive farming (net carbon removal)\n\nPolicy Trends:\n- More countries implementing carbon pricing\n- Agricultural carbon programs expanding\n- Cross-border carbon trading\n- Increased verification requirements\n- Integration with sustainable finance",
        },
        {
          type: "paragraph",
          text: "Technology Innovations\n1. Digital MRV (Measurement, Reporting, Verification)\n   - Satellite-based soil carbon monitoring\n   - AI algorithms for carbon estimation\n   - Continuous monitoring vs periodic sampling\n   - Reduced costs 50-80%\n\n2. Blockchain Verification\n   - Transparent, immutable records\n   - Prevents double-counting\n   - Smart contracts for automatic payments\n   - Increased buyer confidence\n\n3. Direct Air Capture + Storage\n   - Technology to capture CO2 directly from air\n   - Store in soil or underground\n   - Higher credit prices ($100-600/ton)\n   - Emerging technology\n\n4. Enhanced Weathering\n   - Crushed rock absorbs CO2\n   - Applied to agricultural land\n   - Co-benefits: improved soil fertility\n   - Measured and verified alongside soil carbon\n\n5. Methane Reduction Credits\n   - Rice paddies, livestock, manure management\n   - Complementary to carbon credits\n   - Growing market demand\n   - Different protocols and pricing\n\nThe Future Vision:\n- Every farm is a carbon farm\n- Real-time carbon accounting\n- Carbon credits integrated into farm business\n- Climate-positive agriculture\n- Global carbon removal at scale",
        },
      ],
    },
  ],
};

