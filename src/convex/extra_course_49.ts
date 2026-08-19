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

const extraCourse49: ExtraCourse = {
  title: "Agrivoltaics (Solar Farming)",
  description:
    "Learn to combine solar energy production with agriculture on the same land. Master panel design, crop selection, livestock integration, and how to build dual-income solar farms.",
  category: "Innovative Farming",
  duration: "6 weeks",
  difficulty: "Intermediate",
  priceCents: 0,
  durationMinutes: 2400,
  order: 49,
  instructor: "Dr. Maria Santos",
  tags: ["agrivoltaics", "solar", "renewable energy", "dual-use", "sustainable"],
  modules: [
    {
      title: "Agrivoltaics Fundamentals",
      content: [
        {
          text: "What is Agrivoltaics?\nAgrivoltaics (also called solar farming, dual-use solar, or co-location) is the practice of installing solar panels on agricultural land while continuing to farm the same area. It's a win-win: clean energy + food production on the same land.\n\nHow It Works:\n- Solar panels are mounted 2-4 meters above ground\n- Panels are spaced to allow light and rain to reach crops\n- Crops grow underneath and between panel rows\n- Livestock can graze under panels\n- Electricity is generated while food is produced\n\nBenefits:\n1. Dual Income: Farm revenue + electricity sales/credits\n2. Land Efficiency: 60-70% less land use than separate solar + farm\n3. Water Savings: 15-30% less evaporation under panels\n4. Crop Protection: Shade reduces heat stress, frost damage\n5. Microclimate: Panels create favorable growing conditions\n6. Revenue Diversification: Reduces farming risk\n\nMarket Growth:\n- Global agrivoltaics market: $3.5B (2023) → $8B by 2030\n- Leading countries: Germany, Japan, France, US, India\n- Policy support growing rapidly\n- Technology costs declining 10% annually",
        },
        {
          text: "Types of Agrivoltaic Systems\n1. Fixed-Tilt Panels\n   - Panels at fixed angle (20-35°)\n   - Simple, low maintenance\n   - Lower energy yield\n   - Cost: $0.80-1.20/watt\n   - Best for: Small farms, beginners\n\n2. Single-Axis Tracking\n   - Panels follow sun east-to-west\n   - 15-25% more energy than fixed\n   - Moderate complexity\n   - Cost: $1.00-1.50/watt\n   - Best for: Medium-scale commercial\n\n3. Dual-Axis Tracking\n   - Panels follow sun in all directions\n   - 30-40% more energy than fixed\n   - Highest complexity and cost\n   - Cost: $1.50-2.50/watt\n   - Best for: Maximum energy production\n\n4. Vertical Bifacial Panels\n   - Panels installed vertically (north-south rows)\n   - Light reaches crops from both sides\n   - Panels generate light reflected from ground\n   - Cost: $0.70-1.00/watt\n   - Best for: Crop-focused systems\n\n5. Elevated Platforms\n   - Panels on tall structures (3-5m)\n   - Full agricultural use underneath\n   - Higher structural cost\n   - Best for: Livestock, tall crops",
        },
      ],
      quiz: {
        questions: [
          {
            question: "How much less land does agrivoltaics use compared to separate solar + farm?",
            options: ["10-20%", "30-40%", "60-70%", "90%"],
            correctIndex: 2,
            explanation: "Agrivoltaics uses 60-70% less land than building separate solar farms and agricultural operations.",
          },
          {
            question: "Which panel type provides the most energy production?",
            options: ["Fixed-tilt", "Single-axis tracking", "Dual-axis tracking", "Vertical bifacial"],
            correctIndex: 2,
            explanation: "Dual-axis tracking panels produce 30-40% more energy than fixed-tilt by following the sun in all directions.",
          },
          {
            question: "What is the global agrivoltaics market projected to reach by 2030?",
            options: ["$1 billion", "$3 billion", "$8 billion", "$20 billion"],
            correctIndex: 2,
            explanation: "The global agrivoltaics market is projected to grow from $3.5B (2023) to $8B by 2030.",
          },
        ],
        passMark: 60,
      },
    },
    {
      title: "System Design & Installation",
      content: [
        {
          text: "Designing an Agrivoltaic System\nStep 1: Site Assessment\n- Solar resource: 4-6 peak sun hours/day minimum\n- Soil quality: Good agricultural potential\n- Slope: <15° preferred\n- Grid access: Within 1km of transmission line\n- Water access: For both crops and panel cleaning\n\nStep 2: System Sizing\n- Panel height: 2-4m above ground (crop dependent)\n- Row spacing: 4-8m (allows light and equipment)\n- Panel tilt: 20-35° (latitude dependent)\n- Ground coverage ratio (GCR): 30-60%\n\nStep 3: Structural Design\n- Foundation: Ground screws or concrete footings\n- Racking: Galvanized steel or aluminum\n- Height: Must allow equipment access (tractors)\n- Wind load: Design for local wind speeds\n- Snow load: Account for regional snowfall\n\nStep 4: Electrical Design\n- Inverters: String inverters or microinverters\n- Wiring: Underground or elevated conduit\n- Grid connection: Utility interconnection agreement\n- Metering: Net metering or feed-in tariff\n- Monitoring: Performance tracking system",
        },
        {
          text: "Installation Process\nTimeline: 3-6 months from permitting to operation\n\nPhase 1: Permitting (1-3 months)\n- Zoning approval\n- Building permits\n- Electrical permits\n- Utility interconnection application\n- Environmental review (if required)\n\nPhase 2: Construction (1-2 months)\n- Site preparation (minimal disturbance)\n- Foundation installation\n- Racking assembly\n- Panel installation\n- Electrical wiring\n- Inverter installation\n- Grid connection\n\nPhase 3: Commissioning (1-2 weeks)\n- System testing\n- Performance verification\n- Utility inspection\n- Permission to operate\n\nCost Breakdown (per kW installed):\n- Panels: $200-400\n- Racking: $100-200\n- Inverter: $50-100\n- Installation: $100-200\n- Permitting: $20-50\n- Total: $0.80-1.50/watt\n\nROI Timeline:\n- Payback: 5-8 years\n- System life: 25-30 years\n- Annual return: 10-15% after payback",
        },
      ],
      quiz: {
        questions: [
          {
            question: "What is the recommended panel height above ground for crop systems?",
            options: ["0.5-1m", "2-4m", "8-10m", "15-20m"],
            correctIndex: 1,
            explanation: "Panels should be mounted 2-4 meters above ground to allow crop growth and equipment access underneath.",
          },
          {
            question: "What ground coverage ratio (GCR) is typical for agrivoltaics?",
            options: ["10-20%", "30-60%", "70-80%", "90-100%"],
            correctIndex: 1,
            explanation: "A ground coverage ratio of 30-60% balances energy production with adequate light reaching crops below.",
          },
          {
            question: "What is the typical payback period for an agrivoltaic system?",
            options: ["1-2 years", "5-8 years", "15-20 years", "25+ years"],
            correctIndex: 1,
            explanation: "Agrivoltaic systems typically pay for themselves in 5-8 years, then generate profit for 15-20+ more years.",
          },
        ],
        passMark: 60,
      },
    },
    {
      title: "Crop Selection & Management",
      content: [
        {
          text: "Crops That Thrive Under Solar Panels\nShade-Tolerant Crops (Best Performance):\n1. Leafy Greens: Lettuce, spinach, kale, arugula\n   - Often perform BETTER under panels (less heat stress)\n   - Yield increase: 10-30% in hot climates\n\n2. Root Vegetables: Potatoes, carrots, beets, radishes\n   - Cool soil temperatures improve quality\n   - Reduced water needs 15-25%\n\n3. Berries: Strawberries, blueberries, raspberries\n   - Shade reduces sunscald\n   - Extended harvest season\n\n4. Herbs: Basil, cilantro, parsley, mint\n   - Premium prices\n   - Shade prevents bolting\n\n5. Legumes: Beans, peas, clover\n   - Fix nitrogen (benefits soil)\n   - Tolerate partial shade\n\nCrops to Avoid Under Panels:\n- Full-sun crops: Corn, wheat, sunflowers\n- Tall crops: Tree fruits, corn\n- Heat-loving: Tomatoes, peppers (need full sun)\n\nThe Agrivoltaic Advantage:\n- 15-30% water savings (reduced evaporation)\n- 10-30% yield increase for shade-tolerant crops\n- Extended growing season (cooler temperatures)\n- Reduced pest pressure (some insects avoid shade)\n- Premium pricing for 'solar-grown' produce",
        },
        {
          text: "Crop Management Under Panels\nPlanting Strategies:\n- Plant between panel rows for maximum light\n- Use drip irrigation under panels\n- Mulch to retain moisture\n- Choose varieties adapted to partial shade\n\nIrrigation:\n- Panels reduce evaporation 15-30%\n- Rain shadow effect (panels divert some rain)\n- Install drip lines under panels\n- Monitor soil moisture closely\n\nSoil Management:\n- Compaction risk from construction\n- Deeper soil preparation before installation\n- Cover crops to improve soil structure\n- Regular soil testing\n\nPest Management:\n- Some pests avoid shade (reduced pest pressure)\n- Beneficial insects may increase\n- Monitor for new pest patterns\n- Use integrated pest management\n\nHarvest Considerations:\n- Equipment access between rows\n- Narrow equipment may be needed\n- Manual harvest for some crops\n- Plan harvest routes around panel structures",
        },
      ],
      quiz: {
        questions: [
          {
            question: "Which crops typically perform BETTER under solar panels?",
            options: ["Corn and wheat", "Leafy greens and root vegetables", "Sunflowers", "Tropical fruits"],
            correctIndex: 1,
            explanation: "Shade-tolerant crops like leafy greens and root vegetables often perform better under panels due to reduced heat stress.",
          },
          {
            question: "How much water can agrivoltaics save compared to open-field farming?",
            options: ["1-5%", "15-30%", "50-70%", "90%+"],
            correctIndex: 1,
            explanation: "Agrivoltaics can save 15-30% water due to reduced evaporation under the panel shade.",
          },
          {
            question: "Which crops should be AVOIDED under solar panels?",
            options: ["Lettuce", "Spinach", "Corn and sunflowers", "Potatoes"],
            correctIndex: 2,
            explanation: "Full-sun crops like corn, wheat, and sunflowers should be avoided as they need direct sunlight for optimal growth.",
          },
        ],
        passMark: 60,
      },
    },
    {
      title: "Livestock Integration",
      content: [
        {
          text: "Grazing Under Solar Panels\nSheep are the most common livestock for agrivoltaic grazing:\n\nWhy Sheep?\n- Don't damage panels or wiring\n- Graze effectively under structures\n- Manage vegetation naturally\n- Low maintenance\n- Dual income: wool/lamb + solar\n\nSheep Management Under Panels:\n- Stocking rate: 15-25 sheep/hectare\n- Rotation: Move every 3-7 days\n- Shelter: Panels provide shade and rain protection\n- Water: Install troughs along panel rows\n- Fencing: Perimeter + internal paddocks\n- Monitoring: Check for panel damage regularly\n\nBenefits of Grazing Under Panels:\n- Eliminates mowing costs ($50-100/hectare/year)\n- Natural vegetation management\n- Fertilization from manure\n- Reduced fire risk (short vegetation)\n- Improved animal welfare (shade)\n- Higher weight gain (10-20% improvement)\n\nOther Livestock Options:\n- Goats: Brush control, but may climb structures\n- Cattle: Only with elevated structures (3m+)\n- Chickens: Pest control, nitrogen addition\n- Ducks: In rice paddies under panels",
        },
        {
          text: "Dual-Income Economics\nRevenue Model (100-hectare farm):\n\nSolar Revenue:\n- System: 1 MW capacity\n- Generation: 1,200-1,500 MWh/year\n- Price: $0.05-0.10/kWh\n- Revenue: $60,000-150,000/year\n\nAgricultural Revenue:\n- Crop production: $2,000-5,000/hectare/year\n- Livestock: $500-1,500/hectare/year\n- Combined: $2,500-6,500/hectare/year\n- Total farm revenue: $250,000-650,000/year\n\nCombined Revenue:\n- Solar: $60,000-150,000\n- Agriculture: $250,000-650,000\n- Total: $310,000-800,000/year\n\nCompared to:\n- Solar only: $60,000-150,000\n- Farm only: $250,000-650,000\n- Combined advantage: 20-40% more total revenue\n\nCost Savings:\n- No separate land purchase for solar\n- Shared infrastructure costs\n- Reduced mowing costs\n- Lower water costs\n- Tax benefits (depreciation + agricultural exemptions)",
        },
      ],
      quiz: {
        questions: [
          {
            question: "Why are sheep the preferred livestock for agrivoltaic grazing?",
            options: [
              "They are the cheapest livestock",
              "They don't damage panels or wiring and graze effectively under structures",
              "They produce the most meat",
              "They are the easiest to handle",
            ],
            correctIndex: 1,
            explanation: "Sheep are preferred because they don't damage panels or wiring, graze effectively under structures, and provide dual income.",
          },
          {
            question: "How much can agrivoltaic grazing improve livestock weight gain?",
            options: ["1-3%", "5-8%", "10-20%", "30-50%"],
            correctIndex: 2,
            explanation: "Grazing under solar panels can improve livestock weight gain by 10-20% due to shade reducing heat stress.",
          },
          {
            question: "What is the total revenue advantage of combined solar + farming vs separate operations?",
            options: ["5-10% more", "20-40% more", "100% more", "No advantage"],
            correctIndex: 1,
            explanation: "Combined solar + farming generates 20-40% more total revenue than separate operations due to shared infrastructure and dual income streams.",
          },
        ],
        passMark: 60,
      },
    },
    {
      title: "Policy & Incentives",
      content: [
        {
          text: "Government Incentives\nFederal (US):\n- Investment Tax Credit (ITC): 30% of system cost\n- USDA REAP: Grants up to 50% of project cost\n- MACRS Depreciation: 5-year accelerated depreciation\n- USDA EQIP: Conservation practice payments\n\nState Programs:\n- Net metering: Sell excess electricity back to grid\n- SRECs (Solar Renewable Energy Credits): $10-300/MWh\n- Property tax exemptions\n- Sales tax exemptions\n- Agricultural preservation incentives\n\nInternational:\n- Germany: Feed-in tariff + agricultural subsidies\n- Japan: FIT (Feed-in Tariff) + agrivoltaic subsidies\n- France: TNDM tender for agrivoltaic projects\n- India: PM-KUSUM scheme for solar pumps\n- EU: Common Agricultural Policy integration\n\nPolicy Advocacy:\n- Support agrivoltaic-friendly zoning\n- Push for dual-use land classifications\n- Advocate for agricultural solar incentives\n- Join industry associations",
        },
        {
          text: "Permitting & Regulations\nZoning:\n- Most rural zones allow agriculture + solar\n- Some areas require special permits\n- Check setback requirements\n- Height restrictions may apply\n- Visual screening requirements\n\nEnvironmental:\n- NEPA review (federal land)\n- State environmental review\n- Wetland restrictions\n- Endangered species considerations\n- Historical preservation\n\nUtility Interconnection:\n- Application to local utility\n- System size limits (varies by utility)\n- Net metering agreements\n- Time-of-use rate structures\n- Grid upgrade requirements (if needed)\n\nAgricultural Exemptions:\n- Many states exempt solar from property tax if on farmland\n- Agricultural use classification preserved\n- No change in farm assessment\n- Conservation easement compatibility",
        },
      ],
      quiz: {
        questions: [
          {
            question: "What is the federal Investment Tax Credit (ITC) for solar?",
            options: ["10%", "20%", "30%", "50%"],
            correctIndex: 2,
            explanation: "The federal Investment Tax Credit (ITC) covers 30% of solar system costs, significantly reducing the upfront investment.",
          },
          {
            question: "What is a SREC (Solar Renewable Energy Credit)?",
            options: [
              "A type of solar panel",
              "A certificate for each MWh of solar electricity generated",
              "A government grant",
              "A solar installation permit",
            ],
            correctIndex: 1,
            explanation: "SRECs are certificates representing each megawatt-hour of solar electricity generated, which can be sold for $10-300/MWh.",
          },
          {
            question: "Which USDA program provides grants up to 50% of project cost?",
            options: ["EQIP", "REAP", "CRP", "ARC"],
            correctIndex: 1,
            explanation: "The USDA REAP (Rural Energy for America Program) provides grants up to 50% of project cost for renewable energy projects.",
          },
        ],
        passMark: 60,
      },
    },
    {
      title: "Future Trends & Advanced Applications",
      content: [
        {
          text: "Emerging Technologies\n1. Bifacial Panels\n   - Capture light from both sides\n   - Ground-reflected light increases yield 10-20%\n   - Perfect for agrivoltaics (reflective crop canopy)\n   - Cost premium decreasing rapidly\n\n2. Transparent Solar Panels\n   - Allow more light to reach crops\n   - Lower energy yield but better agriculture\n   - Emerging technology, higher cost\n   - Greenhouse integration potential\n\n3. Floating Agrivoltaics\n   - Solar panels on floating structures over water\n   - Combine aquaculture with solar\n   - Reduce water evaporation 70-80%\n   - Cool panels for higher efficiency\n\n4. AI-Optimized Systems\n   - Machine learning for panel angle optimization\n   - Real-time crop monitoring under panels\n   - Predictive maintenance\n   - Automated irrigation control\n\n5. Vertical Agrivoltaics\n   - Panels on vertical structures\n   - Maximum crop area underneath\n   - Wind turbine integration possible\n   - Urban building integration",
        },
        {
          text: "Scaling Agrivoltaics\nFrom Small to Large:\n\n1. Demonstration (1-5 hectares)\n   - Prove concept on your farm\n   - Learn crop-panel interactions\n   - Document yields and energy production\n   - Build case study for expansion\n\n2. Commercial (5-50 hectares)\n   - Scale successful crops\n   - Optimize panel layout\n   - Establish market channels\n   - Pursue financing and incentives\n\n3. Utility-Scale (50-500+ hectares)\n   - Partner with solar developers\n   - Long-term land lease agreements\n   - Community benefit agreements\n   - Grid-scale electricity production\n\nBusiness Models:\n- Owner-operated: You own both farm and solar\n- Lease model: Solar developer leases your land\n- Partnership: Joint venture with energy company\n- Community solar: Shared ownership model\n\nFuture Vision:\n- Agrivoltaics becomes standard practice\n- Smart grids integrate farm energy\n- AI optimizes crop-panel combinations\n- Policy mandates dual-use on public land\n- Carbon credits incentivize adoption\n- Global food + energy security",
        },
      ],
      quiz: {
        questions: [
          {
            question: "What are bifacial solar panels?",
            options: [
              "Panels with two sides",
              "Panels that capture light from both front and back sides",
              "Panels that produce two types of energy",
              "Panels with double the lifespan",
            ],
            correctIndex: 1,
            explanation: "Bifacial panels capture light from both the front (direct sunlight) and back (ground-reflected light), increasing yield 10-20%.",
          },
          {
            question: "How much can floating agrivoltaics reduce water evaporation?",
            options: ["10-20%", "30-40%", "50-60%", "70-80%"],
            correctIndex: 3,
            explanation: "Floating agrivoltaics can reduce water evaporation by 70-80% while generating solar energy and supporting aquaculture.",
          },
          {
            question: "What is the recommended first step to start agrivoltaics?",
            options: [
              "Build a 100-hectare solar farm",
              "Prove the concept with a 1-5 hectare demonstration",
              "Buy the most expensive equipment",
              "Wait for government mandates",
            ],
            correctIndex: 1,
            explanation: "Start with a 1-5 hectare demonstration to prove the concept, learn crop-panel interactions, and build a case for expansion.",
          },
        ],
        passMark: 60,
      },
    },
  ],
};

export default extraCourse49;
