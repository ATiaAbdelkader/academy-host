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

const extraCourse46: ExtraCourse = {
  title: "Vertical Farming & Controlled Environment Agriculture",
  description:
    "Master indoor farming technology — grow crops in stacked layers with LED lighting, hydroponics, and climate control. Learn to design, build, and operate vertical farms for year-round production.",
  category: "Innovative Farming",
  duration: "8 weeks",
  difficulty: "Advanced",
  priceCents: 0,
  durationMinutes: 3000,
  order: 46,
  instructor: "Dr. Aiden Park",
  tags: ["vertical farming", "hydroponics", "LED", "CEA", "indoor farming"],
  modules: [
    {
      title: "Vertical Farming Fundamentals",
      content: [
        {
          text: "What is Vertical Farming?\nVertical farming grows crops in vertically stacked layers, typically indoors, using controlled environment agriculture (CEA) technology. It's the most space-efficient farming method available.\n\nCore Components:\n1. Growing Structure: Racking/shelving systems (4-20 tiers high)\n2. Lighting: LED grow lights (energy-efficient, spectrum-tunable)\n3. Growing System: Hydroponics (NFT, DWC, drip) or aeroponics\n4. Climate Control: HVAC, dehumidification, CO2 enrichment\n5. Automation: Environmental sensors, fertigation, monitoring software\n\nAdvantages:\n- 100-390x higher yield per m² vs field farming\n- 95% less water than traditional agriculture\n- No pesticides needed (sealed environment)\n- Year-round production (365 days)\n- Grows anywhere: cities, deserts, Arctic\n- Short harvest cycles (25-35 days for lettuce)\n- Reduced food miles (grow in the city)\n\nMarket Growth:\n- Global market: $5.7B (2023) → projected $20B by 2030\n- CAGR: 25.5%\n- Major companies: AeroFarms, Plenty, Bowery, AppHarvest",
        },
        {
          text: "Types of Vertical Farms\n1. Container Farms\n   - Modified shipping containers (40ft)\n   - Self-contained, plug-and-play\n   - Cost: $50,000-150,000\n   - Production: 50-100 kg/week\n   - Best for: Restaurants, small operations, R&D\n\n2. Warehouse Farms\n   - Converted warehouses (500-5,000m²)\   - Multi-tier racking systems\n   - Cost: $500,000-5,000,000\n   - Production: 500-5,000 kg/week\n   - Best for: Commercial supply to retailers\n\n3. Purpose-Built Facilities\n   - Custom-designed for vertical farming\n   - Optimized layout, maximum efficiency\n   - Cost: $5,000,000-50,000,000+\n   - Production: 10,000+ kg/week\n   - Best for: Large-scale commercial operations\n\n4. Modular Systems\n   - Stackable, expandable units\n   - Start small, scale as needed\n   - Cost: $10,000-50,000 per module\n   - Best for: Scalable startups, distributed farming",
        },
      ],
      quiz: {
        questions: [
          {
            question: "How much more yield does vertical farming produce per m² vs field farming?",
            options: ["2-5x", "10-20x", "100-390x", "1000x"],
            correctIndex: 2,
            explanation: "Vertical farming can produce 100-390x higher yield per m² compared to traditional field farming.",
          },
          {
            question: "What is the global vertical farming market projected to reach by 2030?",
            options: ["$5 billion", "$20 billion", "$50 billion", "$100 billion"],
            correctIndex: 1,
            explanation: "The global vertical farming market is projected to grow from $5.7B (2023) to $20B by 2030.",
          },
          {
            question: "What type of vertical farm costs $50,000-150,000?",
            options: ["Warehouse farm", "Purpose-built facility", "Container farm", "Modular system"],
            correctIndex: 2,
            explanation: "Container farms are the most affordable vertical farming option at $50,000-150,000 for a self-contained 40ft unit.",
          },
        ],
        passMark: 60,
      },
    },
    {
      title: "LED Lighting & Energy",
      content: [
        {
          text: "LED Lighting for Vertical Farming\nLEDs are the foundation of vertical farming — they provide the light energy that replaces the sun.\n\nSpectrum:\n- Red (620-660nm): Drives photosynthesis, promotes flowering\n- Blue (440-470nm): Promotes vegetative growth, compact plants\n- Far-red (720-740nm): Promotes stem elongation, flowering\n- White: Full spectrum, good for general growing\n\nLight Intensity (PPFD):\n- Leafy greens: 150-250 µmol/m²/s\n- Herbs: 200-300 µmol/m²/s\n- Tomatoes/peppers: 400-600 µmol/m²/s\n- Strawberries: 300-500 µmol/m²/s\n\nPhotoperiod (Hours of Light):\n- Leafy greens: 16-18 hours/day\n- Herbs: 14-16 hours/day\n- Fruiting crops: 12-14 hours/day\n\nDaily Light Integral (DLI):\n- Leafy greens: 12-17 mol/m²/day\n- Herbs: 12-20 mol/m²/day\n- Fruiting crops: 20-30 mol/m²/day\n\nEnergy Costs:\n- LED efficiency: 2.5-3.5 µmol/J (modern)\n- Electricity: 60-70% of operating costs\n- Target: <$0.10/kWh for commercial viability\n- LED lifespan: 50,000+ hours",
        },
        {
          text: "Energy Management\nEnergy is the #1 operating cost in vertical farming:\n\nEnergy Breakdown:\n- Lighting: 60-70%\n- HVAC (cooling/heating): 20-25%\n- Pumps and automation: 5-10%\n- Other: 5%\n\nEnergy Reduction Strategies:\n1. High-efficiency LEDs: Latest generation (3.0+ µmol/J)\n2. Light recipe optimization: Right spectrum, right intensity, right duration\n3. Dimming: Reduce light during cloudy grid periods\n4. Off-peak scheduling: Run high-energy tasks at night\n5. Heat recovery: Use LED waste heat for building heating\n6. Solar panels: Offset grid electricity\n7. Battery storage: Store cheap off-peak energy\n\nRenewable Integration:\n- Solar PV: 5-10 kW per 100m² of vertical farm\n- Wind: Complementary for larger operations\n- Geothermal: Efficient heating/cooling\n- Target: 50-100% renewable energy for sustainability\n\nROI on Energy Investments:\n- LED upgrade: 12-18 month payback\n- Solar panels: 3-5 year payback\n- Heat recovery: 2-3 year payback",
        },
      ],
      quiz: {
        questions: [
          {
            question: "What percentage of vertical farm operating costs come from electricity?",
            options: ["10-20%", "30-40%", "60-70%", "90%+"],
            correctIndex: 2,
            explanation: "Electricity accounts for 60-70% of vertical farm operating costs, making energy management critical for profitability.",
          },
          {
            question: "What PPFD range is needed for leafy greens?",
            options: ["50-100 µmol/m²/s", "150-250 µmol/m²/s", "400-600 µmol/m²/s", "800-1000 µmol/m²/s"],
            correctIndex: 1,
            explanation: "Leafy greens need 150-250 µmol/m²/s of PPFD, while fruiting crops need 400-600 µmol/m²/s.",
          },
          {
            question: "What is the target electricity price for commercial vertical farming viability?",
            options: ["$0.01/kWh", "$0.05/kWh", "$0.10/kWh", "$0.50/kWh"],
            correctIndex: 2,
            explanation: "Vertical farming is commercially viable when electricity costs are below $0.10/kWh.",
          },
        ],
        passMark: 60,
      },
    },
    {
      title: "Hydroponic Systems for Vertical Farms",
      content: [
        {
          text: "Hydroponic Growing Systems\nVertical farms use soilless growing methods:\n\n1. Nutrient Film Technique (NFT)\n- Thin film of nutrient solution flows through channels\n- Plant roots sit in the flowing water\n- Lightweight, efficient, easy to clean\n- Best for: Lettuce, herbs, strawberries\n- Flow rate: 1-2 liters/minute per channel\n\n2. Deep Water Culture (DWC)\n- Plants float on 20-30cm of nutrient solution\n- Air stones provide oxygenation\n- Simple, reliable, good for leafy greens\n- Best for: Lettuce, watercress, bok choy\n- Density: 25-35 plants/m²\n\n3. Drip Systems\n- Nutrient solution dripped onto each plant\n- Precise delivery, minimal waste\n- Best for: Tomatoes, peppers, cucumbers\n- Flow rate: 1-3 liters/hour per plant\n\n4. Aeroponics\n- Roots suspended in air, misted with nutrients\n- Highest oxygen exposure\n- 95% less water than soil farming\n- Best for: High-value crops, R&D\n- Mist cycle: 5 seconds on, 5 minutes off\n\n5. Wicking Systems (Simple)\n- Passive capillary action draws water up\n- No pumps needed\n- Best for: Home systems, herbs\n- Limitations: Not scalable commercially",
        },
        {
          text: "Nutrient Management\nHydroponic Nutrients:\n- Macro: N, P, K, Ca, Mg, S\n- Micro: Fe, Mn, Zn, Cu, B, Mo, Cl\n- Pre-mixed solutions available (A+B formula)\n- Or: Mix from individual salts (advanced)\n\npH Management:\n- Optimal: 5.5-6.5 (most crops)\n- Monitor daily\n- Adjust with pH up/down solutions\n- Drifts naturally over time\n\nEC (Electrical Conductivity):\n- Measures nutrient strength\n- Leafy greens: 1.0-1.6 mS/cm\n- Herbs: 1.2-1.8 mS/cm\n- Tomatoes: 2.0-5.0 mS/cm\n- Monitor daily, adjust with water or nutrients\n\nWater Quality:\n- Source: Reverse osmosis preferred\n- Target EC: <0.3 mS/cm (pure water)\n- Chlorine: <0.5 ppm\n- Hardness: <100 ppm\n- Temperature: 18-22°C (nutrient solution)\n\nFertigation Schedule:\n- Automated dosing systems (Priva, Netafim)\n- pH and EC sensors with automatic correction\n- Data logging for optimization\n- Remote monitoring via phone app",
        },
      ],
      quiz: {
        questions: [
          {
            question: "What is the optimal pH range for most hydroponic crops?",
            options: ["4.0-5.0", "5.5-6.5", "7.0-8.0", "8.5-9.5"],
            correctIndex: 1,
            explanation: "Most hydroponic crops grow best at pH 5.5-6.5, which allows optimal nutrient uptake.",
          },
          {
            question: "Which hydroponic system uses the least water?",
            options: ["NFT", "DWC", "Drip", "Aeroponics"],
            correctIndex: 3,
            explanation: "Aeroponics uses the least water — 95% less than soil farming — by misting roots with nutrient solution.",
          },
          {
            question: "What EC range is recommended for leafy greens?",
            options: ["0.1-0.5 mS/cm", "1.0-1.6 mS/cm", "3.0-4.0 mS/cm", "5.0-6.0 mS/cm"],
            correctIndex: 1,
            explanation: "Leafy greens grow optimally at an EC of 1.0-1.6 mS/cm, which measures nutrient solution strength.",
          },
        ],
        passMark: 60,
      },
    },
    {
      title: "Climate Control & Automation",
      content: [
        {
          text: "Climate Control Systems\nTemperature:\n- Leafy greens: 18-22°C (day), 15-18°C (night)\n- Herbs: 20-25°C (day), 18-20°C (night)\n- Fruiting crops: 22-28°C (day), 18-22°C (night)\n- HVAC sizing: 1 kW per 10-15m² of growing area\n\nHumidity:\n- Target: 55-75% RH\n- Too high (>80%): Fungal disease, reduced transpiration\n- Too low (<50%): Plant stress, tip burn\n- Dehumidifiers: Essential in sealed environments\n- Humidifiers: For dry climates or startup\n\nCO2 Enrichment:\n- Ambient: 400 ppm\n- Optimal: 800-1,200 ppm (3x ambient)\n- Increases growth rate 20-30%\n- Source: CO2 tanks, combustion, fermentation\n- Monitor with CO2 sensors\n\nAirflow:\n- Horizontal airflow fans for canopy mixing\n- Prevents microclimates and mold\n- Air changes: 1-2 per minute\n- Fresh air exchange for CO2 replenishment",
        },
        {
          text: "Automation & Monitoring\nSensors:\n- Temperature (air and water)\n- Humidity (RH%)\n- pH and EC (nutrient solution)\n- Dissolved oxygen\n- CO2 levels\n- Light intensity (PAR meter)\n- Water flow rate\n\nAutomation Systems:\n1. Environmental Controllers\n   - Priva, Argus, Ridder (professional)\n   - Arduino/Raspberry Pi (DIY)\n   - Cloud-based monitoring\n\n2. Fertigation Systems\n   - Automated dosing pumps\n   - pH/EC correction\n   - Water temperature control\n   - Recipe management (per crop)\n\n3. Lighting Controls\n   - Timer-based or PPFD-responsive\n   - Dimming for energy savings\n   - Spectrum adjustment per growth stage\n\n4. Harvest Automation\n   - Conveyor systems\n   - Robotic harvesting (advanced)\n   - Packaging lines\n\nSoftware:\n- Farm management: CropKing, Autogrow, Manna\n- Data analytics: Track yields, costs, efficiency\n- Remote monitoring: Phone/tablet alerts\n- Integration: Connect all systems to one dashboard",
        },
      ],
      quiz: {
        questions: [
          {
            question: "What CO2 level increases plant growth by 20-30%?",
            options: ["400 ppm", "600 ppm", "800-1,200 ppm", "2,000 ppm"],
            correctIndex: 2,
            explanation: "Enriching CO2 to 800-1,200 ppm (3x ambient) can increase plant growth rate by 20-30%.",
          },
          {
            question: "What is the target humidity range for vertical farming?",
            options: ["30-40%", "55-75%", "80-90%", "95-100%"],
            correctIndex: 1,
            explanation: "Target humidity should be 55-75% RH — too high causes fungal disease, too low causes plant stress.",
          },
          {
            question: "What percentage of vertical farm operating costs come from lighting and HVAC?",
            options: ["20-30%", "40-50%", "80-95%", "100%"],
            correctIndex: 2,
            explanation: "Lighting (60-70%) and HVAC (20-25%) together account for 80-95% of vertical farm operating costs.",
          },
        ],
        passMark: 60,
      },
    },
    {
      title: "Crop Selection & Production Planning",
      content: [
        {
          text: "Best Crops for Vertical Farming\nTier 1: Proven Profitability\n1. Lettuce (all varieties)\n   - Harvest: 25-35 days\n   - Yield: 30-50 kg/m²/month\n   - Price: $4-8/kg\n   - Most profitable for beginners\n\n2. Herbs (basil, cilantro, mint, parsley)\n   - Harvest: 21-30 days\n   - Yield: 10-20 kg/m²/month\n   - Price: $15-30/kg\n   - Highest value per kg\n\n3. Microgreens\n   - Harvest: 7-14 days\n   - Yield: 3-5 kg/m²/cycle\n   - Price: $30-100/kg\n   - Fastest ROI\n\nTier 2: Growing Markets\n4. Strawberries\n   - Harvest: 60-90 days (then continuous)\n   - Yield: 5-10 kg/m²/month\n   - Price: $8-15/kg\n\n5. Baby leaf greens (spinach, arugula)\n   - Harvest: 21-28 days\n   - Yield: 15-25 kg/m²/month\n   - Price: $8-15/kg\n\nTier 3: Experimental\n6. Tomatoes, peppers (compact varieties)\n7. Edible flowers\n8. CBD/hemp (where legal)\n9. Saffron (high value, low volume)",
        },
        {
          text: "Production Planning\nCrop Rotation Strategy:\n- Continuous planting: Seed new trays daily\n- Staggered harvest: Daily or weekly picks\n- Multiple crops: Mix high-value herbs with volume lettuce\n\nAnnual Production Targets (1,000m² farm):\n- Lettuce: 360,000 heads/year ($1.4M revenue)\n- Herbs: 120,000 bunches/year ($1.8M revenue)\n- Microgreens: 200,000 trays/year ($2.0M revenue)\n\nSpace Utilization:\n- Growing area: 60% of floor space\n- Walkways: 20%\n- Propagation: 10%\n- Post-harvest: 10%\n\nGrowth Cycle Management:\n- Day 1-7: Germination (propagation area)\n- Day 8-14: Transplant to growing system\n- Day 15-25: Main growth phase\n- Day 26-35: Harvest\n- Day 36: Clean, sanitize, replant\n\nKey Metrics to Track:\n- grams/m²/day (growth rate)\n- grams per kWh (energy efficiency)\n- Cost per head (production cost)\n- Days to harvest\n- Survival rate (>95% target)",
        },
      ],
      quiz: {
        questions: [
          {
            question: "Which crop has the fastest ROI in vertical farming?",
            options: ["Tomatoes", "Strawberries", "Microgreens", "Lettuce"],
            correctIndex: 2,
            explanation: "Microgreens have the fastest ROI with 7-14 day harvest cycles and prices of $30-100/kg.",
          },
          {
            question: "What is the expected yield for lettuce in vertical farming?",
            options: ["5-10 kg/m²/month", "30-50 kg/m²/month", "100-150 kg/m²/month", "200+ kg/m²/month"],
            correctIndex: 1,
            explanation: "Lettuce in vertical farming can yield 30-50 kg per m² per month, which is 100-390x more than field farming.",
          },
          {
            question: "What percentage of floor space should be dedicated to growing?",
            options: ["30%", "60%", "90%", "100%"],
            correctIndex: 1,
            explanation: "About 60% of floor space should be growing area, with the rest for walkways, propagation, and post-harvest processing.",
          },
        ],
        passMark: 60,
      },
    },
    {
      title: "Business & Economics of Vertical Farming",
      content: [
        {
          text: "Financial Modeling\nStartup Costs:\n- Container farm: $50K-150K\n- Small warehouse (500m²): $500K-2M\n- Large facility (5,000m²): $5M-20M\n\nOperating Costs (per m²/year):\n- Energy: $200-400\n- Labor: $300-600\n- Seeds/substrate: $50-100\n- Nutrients: $30-60\n- Packaging: $50-100\n- Rent/lease: $100-300\n- Maintenance: $50-100\n- Total: $800-1,700/m²/year\n\nRevenue Targets:\n- Lettuce: $200-400/m²/year\n- Herbs: $400-800/m²/year\n- Microgreens: $600-1,500/m²/year\n- Mixed crops: $500-1,000/m²/year\n\nProfitability Timeline:\n- Break-even: 18-36 months\n- ROI: 20-40% annually (once optimized)\n- Payback period: 3-5 years\n\nKey Success Factors:\n1. Location (near customers, cheap energy)\n2. Crop selection (high-value, fast-growing)\n3. Energy efficiency (LEDs, HVAC optimization)\n4. Automation (reduce labor costs)\n5. Market access (restaurants, retailers)",
        },
        {
          text: "Scaling & Market Strategy\nMarket Channels:\n1. Restaurants: Premium pricing, consistent quality\n2. Retailers: Supermarkets, grocery stores\n3. Direct-to-consumer: Farmers markets, subscriptions\n4. Food service: Hospitals, schools, corporate cafeterias\n5. Online: E-commerce with local delivery\n\nPartnership Opportunities:\n- Grocery chains: Long-term supply agreements\n- Restaurant groups: Exclusive supplier contracts\n- Real estate developers: On-site vertical farms\n- Tech companies: Sustainability partnerships\n- Government: Urban agriculture programs\n\nScaling Strategy:\n1. Prove concept: Single container or small room\n2. Optimize: Dial in production, reduce costs\n3. Replicate: Multiple containers or expand facility\n4. Franchise: License model to other locations\n5. Integrate: Connect with supply chain partners\n\nRisks & Mitigation:\n- Energy cost spikes → Solar panels, efficiency\n- Equipment failure → Redundancy, maintenance\n- Market saturation → Differentiation, premium quality\n- Regulatory issues → Compliance, lobbying",
        },
      ],
      quiz: {
        questions: [
          {
            question: "What is the typical break-even timeline for a vertical farm?",
            options: ["3-6 months", "6-12 months", "18-36 months", "5+ years"],
            correctIndex: 2,
            explanation: "Vertical farms typically break even in 18-36 months once operations are optimized and market channels established.",
          },
          {
            question: "What is the most important factor for vertical farm profitability?",
            options: ["Location only", "Energy cost and efficiency", "Crop variety", "Farm size"],
            correctIndex: 1,
            explanation: "Energy cost and efficiency is the most critical factor since electricity represents 60-70% of operating costs.",
          },
          {
            question: "What is the recommended first step to start a vertical farming business?",
            options: ["Build a $5M facility", "Prove the concept with a container or small room", "Buy the most expensive equipment", "Hire 50 employees"],
            correctIndex: 1,
            explanation: "Start with a container or small room to prove the concept, optimize production, and learn before scaling.",
          },
        ],
        passMark: 60,
      },
    },
  ],
};

export default extraCourse46;
