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

export const extraCourse40: ExtraCourse = {
  title: "Urban Farming & Hydroponics",
  description:
    "Master soilless farming: hydroponic systems, container farms, vertical agriculture, aeroponics, and running a profitable urban farm business in any space.",
  category: "Horticulture",
  duration: "6 weeks",
  difficulty: "Intermediate",
  priceCents: 0,
  durationMinutes: 1800,
  order: 40,
  instructor: "Dr. Urban Roots",
  instructorTitle: "Urban Agriculture Expert",
  modules: [
    {
      title: "Introduction to Urban Farming",
      content: [
        { type: "heading", text: "Farming Without Farmland" },
        {
          type: "paragraph",
          text: "Urban farming brings food production into cities — rooftops, balconies, warehouses, and unused lots. It reduces food miles, creates green jobs, and provides fresh produce to communities that lack access to quality food.",
        },
        {
          type: "list",
          items: [
            "Types of urban farming: container, rooftop, vertical, aquaponic",
            "Food deserts and food justice",
            "Zoning regulations and permits",
            "Space assessment and site selection",
            "Water access and infrastructure requirements",
          ],
        },
        {
          type: "paragraph",
          text: "The global urban farming market is projected to reach $24.8 billion by 2030, growing at 9.5% annually. Cities like Singapore aim to produce 30% of their food locally by 2030.",
        },
        {
          type: "quiz",
          title: "Urban Farming Basics",
          passPercent: 70,
          questions: [
            {
              question: "What is a 'food desert'?",
              options: [
                "A desert where food grows naturally",
                "An area with limited access to affordable, nutritious food",
                "A type of hydroponic system",
                "A farming technique for arid regions",
              ],
              answerIndex: 1,
            },
            {
              question: "What is Singapore's food production goal by 2030?",
              options: [
                "10% local production",
                "30% local production",
                "50% local production",
                "100% local production",
              ],
              answerIndex: 1,
            },
          ],
        },
      ],
    },
    {
      title: "Hydroponic Systems",
      content: [
        { type: "heading", text: "Growing Without Soil" },
        {
          type: "paragraph",
          text: "Hydroponics grows plants in nutrient-rich water solutions instead of soil. This technique uses 90% less water than field farming, produces higher yields per square meter, and can be deployed anywhere with electricity and water.",
        },
        {
          type: "list",
          items: [
            "Deep Water Culture (DWC) — simplest system",
            "Nutrient Film Technique (NFT) — thin film of nutrients",
            "Ebb and Flow — flood and drain cycles",
            "Drip systems — targeted nutrient delivery",
            "Kratky method — passive, no-pump hydroponics",
            "Hybrid and aquaponic systems",
          ],
        },
        {
          type: "code",
          text: `Basic Hydroponic Nutrient Solution (per gallon):\n- Calcium Nitrate: 3-4 grams\n- Potassium Nitrate: 2-3 grams\n- Monopotassium Phosphate: 1 gram\n- Magnesium Sulfate: 2 grams\n- Micro-nutrient mix: per label\n\nTarget pH: 5.5-6.5\nTarget EC: 1.2-2.0 mS/cm`,
        },
        {
          type: "quiz",
          title: "Hydroponic Systems Quiz",
          passPercent: 70,
          questions: [
            {
              question: "How much water does hydroponics save compared to field farming?",
              options: ["10-20%", "30-40%", "60-70%", "90%"],
              answerIndex: 3,
            },
            {
              question: "What is the Kratky method?",
              options: [
                "A soil-based method",
                "A passive hydroponic system with no pump",
                "A vertical farming technique",
                "A fish farming method",
              ],
              answerIndex: 1,
            },
          ],
        },
      ],
    },
    {
      title: "Vertical Farming & Container Farms",
      content: [
        { type: "heading", text: "Stacking Production to Maximize Space" },
        {
          type: "paragraph",
          text: "Vertical farming stacks growing layers on top of each other, controlled by LED lighting and automated systems. Container farms repurpose shipping containers as self-contained growing environments.",
        },
        {
          type: "list",
          items: [
            "LED lighting: spectrum, intensity, and photoperiod",
            "Climate control: temperature, humidity, CO2",
            "Automated nutrient delivery and pH monitoring",
            "Container farm configurations and layouts",
            "Energy efficiency and renewable integration",
            "Crop selection for vertical systems",
          ],
        },
        {
          type: "paragraph",
          text: "Leafy greens, herbs, microgreens, and strawberries are the most profitable vertical farm crops because they grow quickly, have shallow roots, and command premium prices at farmers markets and restaurants.",
        },
        {
          type: "quiz",
          title: "Vertical Farming Quiz",
          passPercent: 70,
          questions: [
            {
              question: "Which crops are most profitable in vertical farms?",
              options: [
                "Wheat and corn",
                "Leafy greens, herbs, microgreens, and strawberries",
                "Potatoes and onions",
                "Corn and soybeans",
              ],
              answerIndex: 1,
            },
            {
              question: "What does LED lighting in vertical farming primarily control?",
              options: [
                "Soil temperature",
                "Light spectrum, intensity, and photoperiod for photosynthesis",
                "Wind speed",
                "Water pH",
              ],
              answerIndex: 1,
            },
          ],
        },
      ],
    },
    {
      title: "Aeroponics & Advanced Techniques",
      content: [
        { type: "heading", text: "Next-Generation Growing Methods" },
        {
          type: "paragraph",
          text: "Aeroponics suspends plant roots in air and mists them with nutrient solution. It uses even less water than hydroponics and produces faster growth. Combined with AI monitoring, it represents the cutting edge of urban farming.",
        },
        {
          type: "list",
          items: [
            "Aeroponic systems: tower gardens, air-dome designs",
            "Nutrient misting: droplet size and frequency",
            "AI-powered environmental monitoring",
            "Computer vision for plant health assessment",
            "Automated harvesting and packaging",
            "Integration with IoT sensors for real-time data",
          ],
        },
        {
          type: "paragraph",
          text: "NASA research shows aeroponic systems use 98% less water than field farming and grow plants up to 3x faster. The technology was originally developed for growing food in space.",
        },
        {
          type: "quiz",
          title: "Aeroponics Quiz",
          passPercent: 70,
          questions: [
            {
              question: "How much less water does aeroponics use compared to field farming?",
              options: ["50%", "75%", "98%", "99.9%"],
              answerIndex: 2,
            },
            {
              question: "Who originally developed aeroponic technology?",
              options: [
                "Farmers",
                "NASA for growing food in space",
                "The military",
                "Chemical companies",
              ],
              answerIndex: 1,
            },
          ],
        },
      ],
    },
    {
      title: "Urban Farm Business Models",
      content: [
        { type: "heading", text: "Making Money from City Farming" },
        {
          type: "paragraph",
          text: "A successful urban farm needs a solid business model. From direct-to-consumer sales to restaurant supply contracts, there are many revenue streams available to urban producers.",
        },
        {
          type: "list",
          items: [
            "CSA (Community Supported Agriculture) in the city",
            "Restaurant and chef partnerships",
            "Farmers market and online sales",
            "Subscription box services",
            "Farm tours and educational workshops",
            "Value-added products: pesto, dried herbs, sauces",
            "Corporate wellness partnerships",
          ],
        },
        {
          type: "paragraph",
          text: "Premium urban-grown produce can sell for 2-3x the price of conventional farm produce because of freshness, local sourcing, and the story behind the food.",
        },
        {
          type: "quiz",
          title: "Urban Farm Business Quiz",
          passPercent: 70,
          questions: [
            {
              question: "Why can urban-grown produce command premium prices?",
              options: [
                "It uses more pesticides",
                "Freshness, local sourcing, and the story behind the food",
                "It grows faster",
                "It has more calories",
              ],
              answerIndex: 1,
            },
            {
              question: "Which is NOT a common urban farm revenue stream?",
              options: [
                "Restaurant partnerships",
                "Farm tours",
                "Bulk commodity export",
                "Subscription boxes",
              ],
              answerIndex: 2,
            },
          ],
        },
      ],
    },
    {
      title: "Designing Your Urban Farm",
      content: [
        { type: "heading", text: "Putting It All Together" },
        {
          type: "paragraph",
          text: "This final module guides you through designing your own urban farm — from site assessment to system selection, business planning to first harvest. You'll create a complete plan for your urban farming venture.",
        },
        {
          type: "list",
          items: [
            "Site assessment: space, light, water, power, zoning",
            "System selection based on goals and budget",
            "Startup cost estimation and financing",
            "First crop selection and growing schedule",
            "Marketing and customer acquisition plan",
            "Scaling from hobby to full business",
          ],
        },
        {
          type: "code",
          text: `Urban Farm Startup Budget Example:\n\nSmall Hydroponic Setup (100 sq ft):\n- Growing system: $500-2,000\n- Nutrients (6 months): $100-200\n- Lighting (LED): $300-800\n- Seeds/seedlings: $50-100\n- pH/EC meter: $50-150\n- Miscellaneous: $200-500\n\nTotal: $1,200-3,750\nExpected ROI: 6-12 months`,
        },
        {
          type: "note",
          tone: "info",
          text: "Start small, prove the concept, then scale. A 100 sq ft hydroponic setup can generate $2,000-5,000/year in revenue.",
        },
        {
          type: "quiz",
          title: "Design Your Urban Farm",
          passPercent: 70,
          questions: [
            {
              question: "What is the recommended approach for starting an urban farm?",
              options: [
                "Invest everything at once",
                "Start small, prove the concept, then scale",
                "Wait for perfect conditions",
                "Copy exactly what others are doing",
              ],
              answerIndex: 1,
            },
            {
              question: "How much revenue can a 100 sq ft hydroponic setup generate annually?",
              options: ["$100-500", "$500-1,000", "$2,000-5,000", "$50,000-100,000"],
              answerIndex: 2,
            },
          ],
        },
      ],
    },
  ],
};
