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

export const extraCourse37: ExtraCourse = {
  title: "Agricultural Economics & Market Analysis",
  description:
    "Master the economics of farming: market analysis, commodity pricing, value chains, farm financial management, and strategies for maximizing profitability.",
  category: "Agricultural Science",
  duration: "6 weeks",
  difficulty: "Intermediate",
  priceCents: 0,
  durationMinutes: 1800,
  order: 37,
  instructor: "Dr. Economic Fields",
  instructorTitle: "Agricultural Economist",
  modules: [
    {
      title: "Introduction to Agricultural Economics",
      content: [
        { type: "heading", text: "Understanding Farm Economics" },
        {
          type: "paragraph",
          text: "Agricultural economics applies economic theory to the production and distribution of food and fiber. Understanding these principles helps farmers make better business decisions, from what to grow to when to sell.",
        },
        {
          type: "list",
          items: [
            "Supply and demand dynamics in agriculture",
            "Price elasticity of agricultural products",
            "The role of government policy in farm economics",
            "Market structures: perfect competition vs. oligopoly",
            "International trade and global food markets",
          ],
        },
        {
          type: "paragraph",
          text: "Unlike other industries, agriculture faces unique economic challenges: perishable products, weather-dependent supply, seasonal production cycles, and biological growth periods that cannot be accelerated.",
        },
        {
          type: "note",
          tone: "info",
          text: "The FAO reports that global food demand will increase by 60% by 2050, creating enormous economic opportunities for efficient producers.",
        },
        {
          type: "quiz",
          title: "Agricultural Economics Basics",
          passPercent: 70,
          questions: [
            {
              question: "What makes agricultural economics unique compared to other industries?",
              options: [
                "Government involvement",
                "Perishable products, weather-dependent supply, and seasonal cycles",
                "High profit margins",
                "Low labor requirements",
              ],
              answerIndex: 1,
            },
            {
              question: "By what year is global food demand expected to increase by 60%?",
              options: ["2030", "2040", "2050", "2060"],
              answerIndex: 2,
            },
          ],
        },
      ],
    },
    {
      title: "Commodity Markets & Pricing",
      content: [
        { type: "heading", text: "How Commodity Prices Are Set" },
        {
          type: "paragraph",
          text: "Commodity markets determine the prices farmers receive for their products. Understanding how these markets work — including futures contracts, options, and spot markets — is essential for managing price risk.",
        },
        {
          type: "list",
          items: [
            "Spot markets vs. futures markets",
            "How futures contracts hedge price risk",
            "Options trading for agricultural commodities",
            "Basis risk and its impact on hedging",
            "Price discovery through auction systems",
          ],
        },
        {
          type: "paragraph",
          text: "Major commodity exchanges include the Chicago Board of Trade (CBOT) for grains, the Intercontinental Exchange (ICE) for cotton and coffee, and local markets that set regional prices based on supply-demand conditions.",
        },
        {
          type: "note",
          tone: "warn",
          text: "Never speculate with money you cannot afford to lose. Futures trading can amplify both gains and losses.",
        },
        {
          type: "quiz",
          title: "Commodity Markets Quiz",
          passPercent: 70,
          questions: [
            {
              question: "What is a futures contract?",
              options: [
                "A promise to grow crops in the future",
                "An agreement to buy/sell a commodity at a set price on a future date",
                "A loan for farming equipment",
                "An insurance policy for crops",
              ],
              answerIndex: 1,
            },
            {
              question: "What is 'basis risk'?",
              options: [
                "The risk of crop failure",
                "The difference between futures and spot prices",
                "Currency exchange risk",
                "Soil degradation risk",
              ],
              answerIndex: 1,
            },
          ],
        },
      ],
    },
    {
      title: "Farm Financial Management",
      content: [
        { type: "heading", text: "Managing Your Farm's Finances" },
        {
          type: "paragraph",
          text: "Sound financial management is the backbone of a successful farming operation. This module covers budgeting, cash flow management, record-keeping, and financial analysis tools every farmer needs.",
        },
        {
          type: "list",
          items: [
            "Creating an annual farm budget",
            "Cash flow forecasting and management",
            "Balance sheets and income statements for farms",
            "Break-even analysis for different crops",
            "Working capital and debt management",
          ],
        },
        {
          type: "code",
          text: `Break-Even Price = Total Costs / Expected Yield\n\nExample:\nTotal Costs: $5,000/acre\nExpected Yield: 180 bushels/acre\nBreak-Even Price: $5,000 / 180 = $27.78/bushel\n\nIf market price > $27.78, you profit.\nIf market price < $27.78, you lose money.`,
        },
        {
          type: "quiz",
          title: "Farm Finance Quiz",
          passPercent: 70,
          questions: [
            {
              question: "If total costs are $8,000/acre and expected yield is 200 bushels/acre, what is the break-even price?",
              options: ["$25/bushel", "$30/bushel", "$40/bushel", "$50/bushel"],
              answerIndex: 2,
            },
            {
              question: "Which financial statement shows a farm's assets and liabilities at a point in time?",
              options: [
                "Income statement",
                "Cash flow statement",
                "Balance sheet",
                "Tax return",
              ],
              answerIndex: 2,
            },
          ],
        },
      ],
    },
    {
      title: "Value Chain Analysis",
      content: [
        { type: "heading", text: "From Farm to Fork: The Value Chain" },
        {
          type: "paragraph",
          text: "The agricultural value chain encompasses every step from input supply to final consumer sale. Understanding where value is created — and captured — helps farmers negotiate better prices and identify new business opportunities.",
        },
        {
          type: "list",
          items: [
            "Input suppliers (seeds, fertilizer, equipment)",
            "Production (the farm itself)",
            "Post-harvest handling and storage",
            "Processing and manufacturing",
            "Distribution and retail",
            "Consumer markets",
          ],
        },
        {
          type: "paragraph",
          text: "Farmers typically receive only 15-30% of the final retail price of food. By adding value through processing, packaging, or direct marketing, producers can capture a larger share of the consumer dollar.",
        },
        {
          type: "note",
          tone: "info",
          text: "Community Supported Agriculture (CSA) models allow farmers to capture 100% of the retail price by selling directly to consumers.",
        },
        {
          type: "quiz",
          title: "Value Chain Quiz",
          passPercent: 70,
          questions: [
            {
              question: "What percentage of the retail food price do farmers typically receive?",
              options: ["50-70%", "30-50%", "15-30%", "5-10%"],
              answerIndex: 2,
            },
            {
              question: "Which strategy lets farmers capture more of the consumer dollar?",
              options: [
                "Growing more commodity crops",
                "Adding value through processing or direct marketing",
                "Reducing farm labor",
                "Using more pesticides",
              ],
              answerIndex: 1,
            },
          ],
        },
      ],
    },
    {
      title: "Agricultural Policy & Subsidies",
      content: [
        { type: "heading", text: "Government Policies Affecting Farm Income" },
        {
          type: "paragraph",
          text: "Government agricultural policies — from price supports and subsidies to trade agreements and environmental regulations — profoundly impact farm profitability. Understanding these policies helps farmers plan strategically.",
        },
        {
          type: "list",
          items: [
            "Direct payments vs. price support programs",
            "Crop insurance programs (subsidized premiums)",
            "Conservation reserve programs and payments",
            "Trade agreements and tariff impacts",
            "Environmental regulations and compliance costs",
          ],
        },
        {
          type: "paragraph",
          text: "In the US, the Farm Bill (renewed every 5 years) governs agricultural policy, allocating billions in subsidies, crop insurance, nutrition programs, and conservation initiatives.",
        },
        {
          type: "quiz",
          title: "Agricultural Policy Quiz",
          passPercent: 70,
          questions: [
            {
              question: "How often is the US Farm Bill renewed?",
              options: ["Every 2 years", "Every 5 years", "Every 10 years", "Every year"],
              answerIndex: 1,
            },
            {
              question: "Which program pays farmers to take land out of production for conservation?",
              options: [
                "Price support program",
                "Crop insurance",
                "Conservation Reserve Program",
                "Trade adjustment assistance",
              ],
              answerIndex: 2,
            },
          ],
        },
      ],
    },
    {
      title: "Building a Profitable Farm Business",
      content: [
        { type: "heading", text: "Strategies for Long-Term Profitability" },
        {
          type: "paragraph",
          text: "This final module brings everything together: how to build a farm business plan, diversify income streams, leverage technology for efficiency, and plan for succession and growth.",
        },
        {
          type: "list",
          items: [
            "Writing a comprehensive farm business plan",
            "Diversifying income: agritourism, value-added products, services",
            "Leveraging precision agriculture for cost savings",
            "Accessing capital: loans, grants, investor funding",
            "Succession planning and farm transfer",
            "Building relationships with buyers and processors",
          ],
        },
        {
          type: "paragraph",
          text: "The most profitable farms treat farming as a business, not a hobby. This means keeping accurate records, setting measurable goals, investing strategically, and continuously learning about market opportunities.",
        },
        {
          type: "note",
          tone: "info",
          text: "USDA's Beginning Farmer and Rancher Development Program provides grants and training for new farmers. Check if similar programs exist in your country.",
        },
        {
          type: "quiz",
          title: "Farm Business Quiz",
          passPercent: 70,
          questions: [
            {
              question: "Which is NOT a recommended strategy for diversifying farm income?",
              options: [
                "Agritourism",
                "Value-added products",
                "Ignoring market trends",
                "Offering farm services",
              ],
              answerIndex: 2,
            },
            {
              question: "What should be the foundation of every farm business decision?",
              options: [
                "Tradition",
                "Government subsidies",
                "Accurate records and measurable goals",
                "What neighbors are doing",
              ],
              answerIndex: 2,
            },
          ],
        },
      ],
    },
  ],
};
