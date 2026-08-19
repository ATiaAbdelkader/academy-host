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
  modules: CourseModule[];
};

export const extraCourse39: ExtraCourse = {
  title: "Climate-Smart Agriculture",
  description:
    "Learn climate adaptation and mitigation strategies for farming: carbon farming, climate-resilient crops, water management, greenhouse gas reduction, and building farm resilience.",
  category: "Sustainable Agriculture",
  duration: "6 weeks",
  difficulty: "Advanced",
  priceCents: 0,
  durationMinutes: 1800,
  order: 39,
  instructor: "Dr. Climate Harvest",
  instructorTitle: "Climate Agriculture Specialist",
  modules: [
    {
      title: "Climate Change & Agriculture",
      content: [
        { type: "heading", text: "Understanding the Climate-Agriculture Nexus" },
        {
          type: "paragraph",
          text: "Agriculture is both a contributor to and a victim of climate change. The sector accounts for 10-12% of global greenhouse gas emissions, while simultaneously being one of the most vulnerable industries to shifting weather patterns.",
        },
        {
          type: "list",
          items: [
            "How rising temperatures affect crop yields",
            "Changing precipitation patterns and water availability",
            "Increased frequency of extreme weather events",
            "Shifting pest and disease ranges",
            "CO2 fertilization effects on crop growth",
          ],
        },
        {
          type: "note",
          tone: "warn",
          text: "The IPCC estimates that climate change could reduce global crop yields by 2-6% per decade, while demand is projected to increase 14% per decade.",
        },
        {
          type: "quiz",
          title: "Climate & Agriculture Quiz",
          passPercent: 70,
          questions: [
            {
              question: "What percentage of global GHG emissions does agriculture account for?",
              options: ["1-5%", "10-12%", "25-30%", "40-50%"],
              answerIndex: 1,
            },
            {
              question: "Which is NOT an impact of climate change on agriculture?",
              options: [
                "Rising temperatures",
                "Changing precipitation patterns",
                "Increased soil fertility everywhere",
                "Shifting pest ranges",
              ],
              answerIndex: 2,
            },
          ],
        },
      ],
    },
    {
      title: "Carbon Farming & Soil Carbon",
      content: [
        { type: "heading", text: "Using Farms as Carbon Sinks" },
        {
          type: "paragraph",
          text: "Carbon farming involves practices that sequester atmospheric carbon dioxide into the soil. Healthy soils with high organic carbon are more fertile, hold more water, and produce better crops — making carbon farming both an environmental and economic strategy.",
        },
        {
          type: "list",
          items: [
            "No-till and reduced tillage practices",
            "Cover cropping for carbon sequestration",
            "Biochar application to lock carbon in soil",
            "Agroforestry and tree integration",
            "Managed grazing to build soil carbon",
            "Carbon credit markets and payment systems",
          ],
        },
        {
          type: "paragraph",
          text: "Soil can store 2,000-5,000 tonnes of carbon per hectare in its deepest layers. Well-managed agricultural soils can sequester 0.2-0.5 tonnes of CO2 per hectare per year.",
        },
        {
          type: "quiz",
          title: "Carbon Farming Quiz",
          passPercent: 70,
          questions: [
            {
              question: "Which practice directly adds carbon to soil in a stable form?",
              options: ["Plowing", "Biochar application", "Burning residue", "Monoculture"],
              answerIndex: 1,
            },
            {
              question: "How much CO2 can well-managed soils sequester per hectare per year?",
              options: [
                "0.01-0.05 tonnes",
                "0.2-0.5 tonnes",
                "5-10 tonnes",
                "50-100 tonnes",
              ],
              answerIndex: 1,
            },
          ],
        },
      ],
    },
    {
      title: "Climate-Resilient Crop Varieties",
      content: [
        { type: "heading", text: "Choosing Crops That Survive and Thrive" },
        {
          type: "paragraph",
          text: "Climate-resilient crop varieties are bred or selected to withstand drought, heat, flooding, and disease pressure. Selecting the right varieties is the first line of defense against climate impacts.",
        },
        {
          type: "list",
          items: [
            "Drought-tolerant maize, wheat, and sorghum varieties",
            "Flood-tolerant rice (Sub1 gene)",
            "Heat-tolerant vegetables and legumes",
            "Salt-tolerant crops for irrigated areas",
            "Traditional and heirloom varieties with natural resilience",
            "Seed banks and genetic diversity preservation",
          ],
        },
        {
          type: "paragraph",
          text: "The International Rice Research Institute (IRRI) developed Sub1 rice varieties that can survive 2+ weeks of complete submergence, protecting millions of farmers in flood-prone regions.",
        },
        {
          type: "quiz",
          title: "Resilient Varieties Quiz",
          passPercent: 70,
          questions: [
            {
              question: "What makes Sub1 rice varieties special?",
              options: [
                "They grow faster",
                "They can survive 2+ weeks of complete submergence",
                "They need no water",
                "They produce more grain per plant",
              ],
              answerIndex: 1,
            },
            {
              question: "Why is genetic diversity important for climate resilience?",
              options: [
                "It makes farming easier",
                "It provides varieties adapted to different conditions",
                "It reduces seed costs",
                "It eliminates the need for pest control",
              ],
              answerIndex: 1,
            },
          ],
        },
      ],
    },
    {
      title: "Water Management Under Climate Change",
      content: [
        { type: "heading", text: "Smarter Water Use in a Changing Climate" },
        {
          type: "paragraph",
          text: "Water scarcity is projected to become the defining challenge for agriculture in the coming decades. Climate-smart water management combines efficiency, conservation, and diversification of water sources.",
        },
        {
          type: "list",
          items: [
            "Deficit irrigation strategies",
            "Mulching to reduce evaporation",
            "Rainwater harvesting systems",
            "Drip irrigation for maximum efficiency",
            "Wastewater recycling for irrigation",
            "Water pricing and allocation policies",
          ],
        },
        {
          type: "paragraph",
          text: "Drip irrigation can reduce water use by 30-60% compared to flood irrigation while maintaining or improving yields. It delivers water directly to the root zone, minimizing waste.",
        },
        {
          type: "quiz",
          title: "Water Management Quiz",
          passPercent: 70,
          questions: [
            {
              question: "How much water can drip irrigation save compared to flood irrigation?",
              options: ["5-10%", "15-20%", "30-60%", "80-90%"],
              answerIndex: 2,
            },
            {
              question: "What is deficit irrigation?",
              options: [
                "Using no irrigation at all",
                "Applying less water than full crop requirement at strategic growth stages",
                "Flooding fields briefly",
                "Using contaminated water",
              ],
              answerIndex: 1,
            },
          ],
        },
      ],
    },
    {
      title: "Reducing Farm Greenhouse Gas Emissions",
      content: [
        { type: "heading", text: "Lowering Your Farm's Carbon Footprint" },
        {
          type: "paragraph",
          text: "Beyond carbon sequestration, farms can directly reduce their greenhouse gas emissions through efficiency improvements, renewable energy adoption, and better management of methane and nitrous oxide sources.",
        },
        {
          type: "list",
          items: [
            "Methane capture from livestock manure (biogas)",
            "Precision nitrogen application to reduce N2O",
            "Renewable energy: solar, wind, biomass",
            "Electric and solar-powered farm equipment",
            "Improved feed to reduce enteric methane in cattle",
            "Renewable diesel and biodiesel for machinery",
          ],
        },
        {
          type: "paragraph",
          text: "Anaerobic digesters can convert livestock manure into biogas (methane), which is then burned for electricity. This simultaneously reduces methane emissions and generates renewable energy.",
        },
        {
          type: "quiz",
          title: "GHG Reduction Quiz",
          passPercent: 70,
          questions: [
            {
              question: "What is an anaerobic digester used for on farms?",
              options: [
                "Drying crops",
                "Converting manure into biogas for energy",
                "Irrigating fields",
                "Storing grain",
              ],
              answerIndex: 1,
            },
            {
              question: "How can precision nitrogen application help the climate?",
              options: [
                "It increases crop yields only",
                "It reduces nitrous oxide (N2O) emissions",
                "It eliminates the need for fertilizer",
                "It increases methane emissions",
              ],
              answerIndex: 1,
            },
          ],
        },
      ],
    },
    {
      title: "Building Climate-Resilient Farm Systems",
      content: [
        { type: "heading", text: "Whole-Farm Climate Adaptation Strategies" },
        {
          type: "paragraph",
          text: "Climate-smart agriculture isn't just about individual practices — it's about designing resilient whole-farm systems that can absorb climate shocks while maintaining productivity and profitability.",
        },
        {
          type: "list",
          items: [
            "Diversification: multiple crops, livestock, and income streams",
            "Agroforestry for windbreaks, shade, and carbon",
            "Insurance and financial risk management",
            "Early warning systems and climate information services",
            "Community-based adaptation and knowledge sharing",
            "Long-term planning: 5-10 year farm climate strategy",
          ],
        },
        {
          type: "paragraph",
          text: "The most resilient farms are diverse. A farm with crops, livestock, trees, and agritourism can absorb shocks that would devastate a monoculture operation. Diversity is the ultimate climate insurance.",
        },
        {
          type: "note",
          tone: "info",
          text: "Consider joining a farmer cooperative or climate adaptation network to share knowledge, resources, and risk with other producers in your region.",
        },
        {
          type: "quiz",
          title: "Farm Resilience Quiz",
          passPercent: 70,
          questions: [
            {
              question: "Why is farm diversification considered the best climate insurance?",
              options: [
                "It reduces paperwork",
                "Diverse operations absorb shocks that devastate monocultures",
                "It requires less land",
                "Government requires it",
              ],
              answerIndex: 1,
            },
            {
              question: "What is agroforestry?",
              options: [
                "Deforestation for farming",
                "Integrating trees with crops and/or livestock",
                "Growing only trees",
                "Clearing all trees from farmland",
              ],
              answerIndex: 1,
            },
          ],
        },
      ],
    },
  ],
};
