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

const extraCourse50: ExtraCourse = {
  title: "Carbon Farming & Climate Markets",
  description:
    "Learn to earn money from carbon sequestration. Master soil carbon measurement, carbon credit protocols, verification processes, and how to build a profitable carbon farming business.",
  category: "Innovative Farming",
  duration: "6 weeks",
  difficulty: "Advanced",
  priceCents: 0,
  durationMinutes: 2200,
  order: 50,
  instructor: "Dr. Elena Rodriguez",
  tags: ["carbon credits", "climate", "sequestration", "trading", "soil carbon"],
  modules: [
    {
      title: "Carbon Farming Fundamentals",
      content: [
        {
          text: "What is Carbon Farming?\nCarbon farming is agricultural management specifically designed to sequester atmospheric carbon dioxide into soil and biomass. Farmers earn carbon credits for verified carbon sequestration.\n\nThe Carbon Market:\n- Voluntary Carbon Market (VCM): $2B (2023) → projected $50B by 2030\n- Compliance markets: EU ETS, California cap-and-trade\n- Agriculture is the fastest-growing carbon credit sector\n\nHow Carbon Credits Work:\n1. Farm adopts carbon-sequestering practices\n2. Carbon sequestration is measured/verified\n3. Each ton of CO2 sequestered = 1 carbon credit\n4. Credits sold to buyers (companies offsetting emissions)\n5. Buyer claims carbon neutrality\n\nCarbon Farming Practices:\n- No-till/reduced tillage\n- Cover cropping\n- Composting and biochar application\n- Agroforestry and silvopasture\n- Improved grazing management\n- Nutrient management\n- Wetland restoration\n\nRevenue Potential:\n- $15-30 per carbon credit (voluntary market)\n- $50-100 per credit (premium/verified)\n- Average farm: 1-5 tons CO2/hectare/year\n- 100-hectare farm: $15,000-150,000/year",
        },
        {
          text: "Soil Carbon Science\nHow Carbon Gets Into Soil:\n1. Photosynthesis: Plants capture CO2 from atmosphere\n2. Root exudates: 20-40% of plant carbon goes to roots\n3. Microbial processing: Bacteria and fungi transform carbon\n4. Humification: Stable carbon compounds form\n5. Aggregation: Carbon protected inside soil aggregates\n\nCarbon Pools in Soil:\n- Labile carbon: 1-5 year turnover (active)\n- Slow carbon: 5-100 year turnover (semi-stable)\n- Passive carbon: 100-1,000+ year turnover (stable)\n- Total soil carbon: 2-10% of soil weight\n\nFactors Affecting Carbon Storage:\n- Climate: Cooler = more storage\n- Soil type: Clay soils store more carbon\n- Vegetation: More biomass = more carbon input\n- Management: Regenerative practices increase storage\n- Time: Carbon builds over 5-20 years\n\nSaturation Point:\n- Soils have a maximum carbon capacity\n- Sandy soils: 30-50 tons C/hectare\n- Clay soils: 80-150 tons C/hectare\n- Carbon accumulation slows as saturation approaches\n- Important for accurate credit calculations",
        },
      ],
      quiz: {
        questions: [
          {
            question: "What is the projected size of the voluntary carbon market by 2030?",
            options: ["$5 billion", "$20 billion", "$50 billion", "$100 billion"],
            correctIndex: 2,
            explanation: "The voluntary carbon market is projected to grow from $2B (2023) to $50B by 2030.",
          },
          {
            question: "What percentage of plant carbon goes to root exudates?",
            options: ["5-10%", "10-15%", "20-40%", "60-80%"],
            correctIndex: 2,
            explanation: "20-40% of plant carbon goes to root exudates, which feed soil microorganisms and build soil carbon.",
          },
          {
            question: "Which soil type stores more carbon?",
            options: ["Sandy soil", "Clay soil", "Gravel", "Rock"],
            correctIndex: 1,
            explanation: "Clay soils store more carbon (80-150 tons C/hectare) than sandy soils (30-50 tons C/hectare) due to better carbon protection.",
          },
        ],
        passMark: 60,
      },
    },
    {
      title: "Carbon Credit Protocols",
      content: [
        {
          text: "Major Carbon Credit Standards\n1. Verra VCS (Verified Carbon Standard)\n   - Largest voluntary standard\n   - Agriculture methodologies available\n   - Verification required every 5 years\n   - Credits: VCUs (Voluntary Carbon Units)\n   - Price: $10-30/credit\n\n2. Gold Standard\n   - Premium pricing ($20-50/credit)\n   - Focus on co-benefits (SDGs)\n   - Agriculture methodology available\n   - Higher verification requirements\n\n3. American Carbon Registry (ACR)\n   - US-focused\n   - Soil Enrichment Protocol\n   - Price: $15-25/credit\n   - Good for US farmers\n\n4. Climate Action Reserve (CAR)\n   - US and international\n   - Livestock and agriculture protocols\n   - Price: $15-30/credit\n\n5. Indigo Ag Carbon Program\n   - Farmer-friendly platform\n   - Lower barriers to entry\n   - Premium credits ($20-40/credit)\n   - 10-year contracts\n\nChoosing a Program:\n- Consider: Price, requirements, timeline, support\n- Start with: Indigo Ag or ACR (easier entry)\n- Premium: Gold Standard (higher price)\n- Scale: Verra VCS (largest market)",
        },
        {
          text: "Credit Pricing & Markets\nCarbon Credit Pricing:\n- Baseline: $10-15/credit (standard agriculture)\n- Premium: $20-40/credit (verified, co-benefits)\n- High-quality: $50-100/credit (Gold Standard + co-benefits)\n\nPrice Factors:\n- Verification quality\n- Co-benefits (biodiversity, water quality)\n- Permanence guarantee\n- Additionality (would it have happened anyway?)\n- Vintage (year of sequestration)\n- Buyer type (corporate vs individual)\n\nMarketplaces:\n- CBL Markets: Largest platform\n- ACX (AirCarbon Exchange)\n- Toucan Protocol\n- KlimaDAO\n- Direct sales to companies\n\nBuyer Types:\n1. Corporations: Net-zero commitments (Microsoft, Google)\n2. Airlines: Carbon offset requirements\n3. Governments: Climate commitments\n4. Individuals: Personal carbon neutrality\n5. Financial institutions: ESG portfolio requirements\n\nTrends:\n- Prices rising 10-20% annually\n- Demand outpacing supply\n- Quality premiums increasing\n- Technology reducing verification costs",
        },
      ],
      quiz: {
        questions: [
          {
            question: "Which carbon credit standard offers the highest prices?",
            options: ["Verra VCS", "Gold Standard", "American Carbon Registry", "Climate Action Reserve"],
            correctIndex: 1,
            explanation: "Gold Standard offers the highest prices ($20-50/credit) due to premium verification and focus on co-benefits.",
          },
          {
            question: "What is the typical price range for high-quality carbon credits?",
            options: ["$1-5", "$10-15", "$50-100", "$200-500"],
            correctIndex: 2,
            explanation: "High-quality carbon credits (Gold Standard + co-benefits) sell for $50-100 per credit.",
          },
          {
            question: "What is 'additionality' in carbon credits?",
            options: [
              "Adding more carbon to the soil",
              "Proving the sequestration wouldn't have happened without the credit program",
              "Adding extra verification steps",
              "Increasing the credit price",
            ],
            correctIndex: 1,
            explanation: "Additionality requires proving that the carbon sequestration wouldn't have happened without the financial incentive from carbon credits.",
          },
        ],
        passMark: 60,
      },
    },
    {
      title: "Measurement & Verification",
      content: [
        {
          text: "Measuring Soil Carbon\nMethods:\n1. Direct Soil Sampling\n   - Collect cores at 0-30cm and 30-100cm depth\n   - Send to lab for organic carbon analysis\n   - Cost: $20-50 per sample\n   - Gold standard for verification\n\n2. Spectroscopic Methods\n   - Near-infrared (NIR) spectroscopy\n   - Mid-infrared (MIR) spectroscopy\n   - Faster, cheaper than lab analysis\n   - Cost: $5-15 per sample\n\n3. Modeling (COMET-Farm)\n   - USDA tool for carbon estimation\n   - Uses climate, soil, and management data\n   - Free to use\n   - Good for baseline estimation\n\n4. Remote Sensing\n   - Satellite imagery analysis\n   - NDVI for biomass estimation\n   - Emerging technology\n   - Less accurate for soil carbon\n\n5. Eddy Covariance\n   - Measures actual CO2 flux\n   - Very accurate but expensive\n   - Cost: $100,000+ installation\n   - Research-grade equipment\n\nSampling Protocol:\n- Baseline: Sample before changing practices\n- Grid sampling: 1 sample per 2-5 hectares\n- Depth: At least 30cm, ideally 100cm\n- Frequency: Every 3-5 years for verification\n- GPS coordinates: Record exact locations",
        },
        {
          text: "Verification Process\nStep 1: Project Design\n- Define project boundary\n- Select carbon credit standard\n- Develop monitoring plan\n- Calculate expected sequestration\n- Submit project design document\n\nStep 2: Baseline Establishment\n- Sample soil carbon at multiple locations\n- Document current management practices\n- Establish reference scenario\n- Third-party validation\n\nStep 3: Monitoring\n- Regular soil sampling (every 3-5 years)\n- Document all management changes\n- Track inputs and outputs\n- Maintain detailed records\n\nStep 4: Verification\n- Independent third-party auditor\n- Reviews data and methodology\n- Confirms carbon sequestration\n- Issues verified carbon credits\n- Verification cost: $5,000-20,000 per project\n\nStep 5: Credit Issuance\n- Credits issued to project registry\n- Credits can be sold on marketplace\n- Unique serial numbers prevent double-counting\n- Credits retire when buyer uses them\n\nTimeline:\n- Project registration: 3-6 months\n- Baseline establishment: 1 year\n- First credit issuance: 2-3 years\n- Ongoing: 5-year verification cycles",
        },
      ],
      quiz: {
        questions: [
          {
            question: "What is the most accurate method for measuring soil carbon?",
            options: ["Remote sensing", "Modeling", "Direct soil sampling and lab analysis", "Visual inspection"],
            correctIndex: 2,
            explanation: "Direct soil sampling and lab analysis is the gold standard for measuring soil carbon, though it's more expensive than other methods.",
          },
          {
            question: "How often should soil carbon be verified for carbon credits?",
            options: ["Every year", "Every 3-5 years", "Every 10 years", "Once at the beginning"],
            correctIndex: 1,
            explanation: "Soil carbon should be verified every 3-5 years for carbon credit programs to confirm continued sequestration.",
          },
          {
            question: "What is the typical cost of third-party carbon verification?",
            options: ["$500-1,000", "$5,000-20,000", "$50,000-100,000", "$500,000+"],
            correctIndex: 1,
            explanation: "Third-party carbon verification typically costs $5,000-20,000 per project, depending on size and complexity.",
          },
        ],
        passMark: 60,
      },
    },
    {
      title: "Carbon Farming Practices",
      content: [
        {
          text: "High-Impact Carbon Practices\n1. Cover Cropping\n   - Adds 0.3-0.5 tons CO2/hectare/year\n   - Increases soil organic matter\n   - Reduces erosion and nutrient leaching\n   - Cost: $15-40/acre for seed\n\n2. No-Till/Reduced Tillage\n   - Saves 0.5-1.0 tons CO2/hectare/year\n   - Reduces fuel use 50-70%\n   - Preserves soil structure\n   - Requires weed management changes\n\n3. Compost Application\n   - Adds 0.5-1.5 tons CO2/hectare/year\n   - Improves soil biology\n   - Increases water retention\n   - Cost: $50-100/ton applied\n\n4. Biochar Application\n   - Stores 1-3 tons CO2/hectare/year\n   - Long-term carbon storage (100+ years)\n   - Improves soil fertility\n   - Cost: $200-500/ton applied\n\n5. Agroforestry\n   - Sequesters 3-10 tons CO2/hectare/year\n   - Multiple income streams\n   - Biodiversity benefits\n   - Long-term investment\n\n6. Improved Grazing\n   - Sequesters 1-3 tons CO2/hectare/year\n   - Mimics natural grassland dynamics\n   - Builds soil carbon\n   - Reduces methane intensity",
        },
        {
          text: "Stacking Practices for Maximum Impact\nThe Power of Combining:\nPractice Stack (100-hectare farm):\n\nCover crops: +0.4 tons CO2/ha/year = 40 tons\nNo-till: +0.7 tons CO2/ha/year = 70 tons\nCompost: +1.0 tons CO2/ha/year = 100 tons\nAgroforestry: +5.0 tons CO2/ha/year = 500 tons\n\nTotal: 710 tons CO2/year\nAt $25/credit = $17,750/year\n\nPriority Ranking (Best ROI):\n1. Cover crops (lowest cost, immediate benefit)\n2. No-till (saves fuel + sequesters carbon)\n3. Compost (moderate cost, high impact)\n4. Improved grazing (if livestock present)\n5. Agroforestry (highest impact, longest timeline)\n6. Biochar (highest impact, highest cost)\n\nImplementation Strategy:\nYear 1: Cover crops + no-till (low cost, quick start)\nYear 2: Add compost application\nYear 3: Begin agroforestry planting\nYear 4: Consider biochar if budget allows\nYear 5: First verification and credit issuance",
        },
      ],
      quiz: {
        questions: [
          {
            question: "Which carbon farming practice has the lowest cost barrier?",
            options: ["Biochar application", "Agroforestry planting", "Cover cropping", "Compost application"],
            correctIndex: 2,
            explanation: "Cover cropping has the lowest cost barrier at $15-40/acre for seed, making it the best starting point.",
          },
          {
            question: "How much CO2 can agroforestry sequester per hectare per year?",
            options: ["0.1-0.5 tons", "1-3 tons", "3-10 tons", "20-50 tons"],
            correctIndex: 2,
            explanation: "Agroforestry can sequester 3-10 tons of CO2 per hectare per year, making it one of the highest-impact practices.",
          },
          {
            question: "What is the recommended implementation strategy for carbon farming?",
            options: [
              "Start with the most expensive practice",
              "Start with cover crops and no-till, then add practices over 3-5 years",
              "Implement everything at once",
              "Wait for government funding first",
            ],
            correctIndex: 1,
            explanation: "Start with low-cost practices (cover crops, no-till) and add more practices over 3-5 years as you learn and earn credits.",
          },
        ],
        passMark: 60,
      },
    },
    {
      title: "Building a Carbon Farming Business",
      content: [
        {
          text: "Business Planning\nRevenue Model:\n- Carbon credits: $15-50/credit\n- Premium pricing for co-benefits\n- Long-term contracts (5-20 years)\n- Growing demand from corporations\n\nStartup Costs:\n- Soil testing: $2,000-5,000\n- Practice implementation: $10-50/hectare\n- Registration fees: $5,000-15,000\n- Monitoring equipment: $2,000-10,000\n- Total: $20,000-80,000 for 100-hectare farm\n\nROI Timeline:\n- Year 1-2: Investment phase (costs > revenue)\n- Year 3-4: First credit issuance\n- Year 5+: Profitable carbon revenue\n- 10-year NPV: $100,000-500,000 per 100 hectares\n\nRisk Management:\n- Climate variability affects sequestration rates\n- Market price fluctuations\n- Policy changes\n- Verification failures\n\nMitigation:\n- Diversify practices (stack multiple methods)\n- Long-term contracts with fixed prices\n- Regular monitoring and adaptive management\n- Build relationships with buyers",
        },
        {
          text: "Marketing & Sales\nSelling Carbon Credits:\n\n1. Through Aggregators\n   - Platforms: Indigo Ag, Nori, CIBO\n   - They handle verification and sales\n   - Lower price (platform takes 20-40%)\n   - Easiest entry point\n\n2. Direct to Buyers\n   - Approach corporations with net-zero goals\n   - Build relationships\n   - Higher price (no middleman)\n   - Requires more effort\n\n3. Through Brokers\n   - Carbon credit brokers\n   - Connect buyers and sellers\n   - Commission: 5-15%\n   - Good for larger volumes\n\nBuyer Outreach:\n- Target: Companies with public climate commitments\n- Approach: Sustainability departments\n- Offer: Verified, premium credits with co-benefits\n- Package: Carbon + biodiversity + water quality\n\nCertification Marketing:\n- 'Carbon-neutral product' label\n- 'Regenerative' certification\n- 'Climate-smart' branding\n- Story of the farm's carbon journey\n\nBuilding Premium Value:\n- Document biodiversity co-benefits\n- Water quality improvements\n- Community benefits\n- Photographic evidence\n- Annual impact reports",
        },
      ],
      quiz: {
        questions: [
          {
            question: "What is the typical platform fee for selling carbon credits through aggregators?",
            options: ["1-5%", "20-40%", "50-70%", "No fee"],
            correctIndex: 1,
            explanation: "Carbon credit aggregators typically take 20-40% of the sale price as their fee for handling verification and sales.",
          },
          {
            question: "When does a carbon farming business typically become profitable?",
            options: ["Immediately", "Year 1", "Year 3-4", "Year 10+"],
            correctIndex: 2,
            explanation: "Carbon farming businesses typically become profitable in Year 3-4 after the first credit issuance.",
          },
          {
            question: "What is the best way to enter the carbon credit market?",
            options: [
              "Build your own verification system",
              "Use an aggregator platform like Indigo Ag or Nori",
              "Sell directly to Microsoft",
              "Wait for government payment",
            ],
            correctIndex: 1,
            explanation: "Using an aggregator platform is the easiest entry point — they handle verification and sales while you focus on farming.",
          },
        ],
        passMark: 60,
      },
    },
    {
      title: "Future of Carbon Markets",
      content: [
        {
          text: "Market Evolution\nShort-term (2024-2027):\n- Prices rising to $30-50/credit\n- Corporate demand increasing\n- Technology reducing verification costs\n- More farmers entering the market\n- Standardization improving\n\nMedium-term (2027-2030):\n- Prices reaching $50-100/credit\n- Mandatory carbon reporting for companies\n- Carbon border taxes (EU CBAM)\n- Blockchain verification\n- AI-powered monitoring\n\nLong-term (2030+):\n- Prices potentially $100-200/credit\n- Carbon as standard farm revenue\n- Integrated with financial markets\n- Real-time verification\n- Climate-positive farming (net carbon removal)\n\nPolicy Trends:\n- More countries implementing carbon pricing\n- Agricultural carbon programs expanding\n- Cross-border carbon trading\n- Increased verification requirements\n- Integration with sustainable finance",
        },
        {
          text: "Technology Innovations\n1. Digital MRV (Measurement, Reporting, Verification)\n   - Satellite-based soil carbon monitoring\n   - AI algorithms for carbon estimation\n   - Continuous monitoring vs periodic sampling\n   - Reduced costs 50-80%\n\n2. Blockchain Verification\n   - Transparent, immutable records\n   - Prevents double-counting\n   - Smart contracts for automatic payments\n   - Increased buyer confidence\n\n3. Direct Air Capture + Storage\n   - Technology to capture CO2 directly from air\n   - Store in soil or underground\n   - Higher credit prices ($100-600/ton)\n   - Emerging technology\n\n4. Enhanced Weathering\n   - Crushed rock absorbs CO2\n   - Applied to agricultural land\n   - Co-benefits: improved soil fertility\n   - Measured and verified alongside soil carbon\n\n5. Methane Reduction Credits\n   - Rice paddies, livestock, manure management\n   - Complementary to carbon credits\n   - Growing market demand\n   - Different protocols and pricing\n\nThe Future Vision:\n- Every farm is a carbon farm\n- Real-time carbon accounting\n- Carbon credits integrated into farm business\n- Climate-positive agriculture\n- Global carbon removal at scale",
        },
      ],
      quiz: {
        questions: [
          {
            question: "What technology can reduce carbon verification costs by 50-80%?",
            options: ["Blockchain", "Digital MRV with satellite and AI", "Drones", "Blockchain"],
            correctIndex: 1,
            explanation: "Digital MRV using satellite imagery and AI algorithms can reduce verification costs by 50-80% compared to traditional soil sampling.",
          },
          {
            question: "What is the EU CBAM?",
            options: [
              "A new type of carbon credit",
              "Carbon Border Adjustment Mechanism — taxes on carbon-intensive imports",
              "A farming subsidy",
              "A verification standard",
            ],
            correctIndex: 1,
            explanation: "The EU CBAM (Carbon Border Adjustment Mechanism) taxes carbon-intensive imports, incentivizing carbon farming globally.",
          },
          {
            question: "What is the projected carbon credit price by 2030+?",
            options: ["$5-10", "$15-25", "$50-100", "$100-200"],
            correctIndex: 3,
            explanation: "Carbon credit prices are projected to reach $100-200 per credit by 2030+ as demand outpaces supply.",
          },
        ],
        passMark: 60,
      },
    },
  ],
};

export default extraCourse50;
