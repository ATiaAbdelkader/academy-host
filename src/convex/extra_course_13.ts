import type { CourseModule } from "./schema";

type ExtraCourse = {
  category: string;
  title: string;
  description: string;
  priceCents: number;
  durationMinutes: number;
  order: number;
  instructor: string;
  instructorTitle: string;
  modules: CourseModule[];
};

export const extraCourse13: ExtraCourse = {
  category: "Business & Management",
  title: "Agribusiness Fundamentals",
  description:
    "Run the farm like a business: value chains, markets, enterprise budgets, risk, and the finance that lets an operation grow on purpose.",
  priceCents: 5900,
  durationMinutes: 24,
  order: 13,
  instructor: "Grace Mensah",
  instructorTitle: "Agribusiness Development Lead",
  modules: [
    {
      title: "What agribusiness really is",
      content: [
        {
          type: "paragraph",
          text: "Agribusiness is not just farming. It is the whole chain that turns a seed into a product a customer pays for: input supply, production, processing, storage, distribution, and retail. The farm sits in the middle of that chain — and the strongest farms understand the links on both sides of them.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=LpY8Ttez6AQ",
          caption: "What agribusiness actually covers — inputs, production, and distribution.",
        },
        {
          type: "list",
          items: [
            "Input supply — seed, fertilizer, feed, machinery, and credit.",
            "Production — the crop or livestock enterprise itself.",
            "Post-harvest — handling, storage, processing, and packaging.",
            "Distribution & retail — transport, wholesale, and the final sale.",
          ],
        },
        {
          type: "quiz",
          title: "Agribusiness basics",
          passPercent: 60,
          questions: [
            {
              question: "What does agribusiness include beyond the farm gate?",
              options: [
                "Only crop production",
                "The full chain from inputs to retail",
                "Only processing plants",
                "Just the farm machinery",
              ],
              answerIndex: 1,
            },
            {
              question: "Where does the farm sit in the agribusiness chain?",
              options: [
                "At the very end",
                "At the very start",
                "In the middle of the chain",
                "Outside the chain entirely",
              ],
              answerIndex: 2,
            },
            {
              question: "Which of these is an upstream link from the farm?",
              options: [
                "The retail store",
                "The transport company",
                "The input supplier",
                "The wholesale market",
              ],
              answerIndex: 2,
            },
          ],
        },
      ],
    },
    {
      title: "The value chain",
      content: [
        {
          type: "paragraph",
          text: "Every step from field to customer adds value — and every step also adds cost and risk. Map your product's chain, write down who does each step, and see where the margin actually sits. Most operations discover that the biggest margins are earned off the farm, not on it.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=3mx1574r6zs",
          caption: "Why agricultural value chains create jobs — and where the margin sits.",
        },
        {
          type: "code",
          prompt: true,
          text: "chain map --crop maize --field-02\n[ok] production     12.4 ha · cost $2,180\n[ok] harvest & haul  cost $640\n[ok] storage         cost $310\n[ok] sale           revenue $4,900\n[ok] farm margin    $1,770 — 36% of sale price",
        },
        {
          type: "quiz",
          title: "Value chain",
          passPercent: 60,
          questions: [
            {
              question: "Each step in the value chain adds what?",
              options: [
                "Value, cost, and risk",
                "Only value",
                "Only cost",
                "Only paperwork",
              ],
              answerIndex: 0,
            },
            {
              question: "Where are the biggest margins usually earned?",
              options: [
                "On the farm",
                "Off the farm, in later stages",
                "Equally everywhere",
                "At the input supplier",
              ],
              answerIndex: 1,
            },
            {
              question: "The sample chain for maize shows a farm margin of:",
              options: [
                "$1,770 — 36% of sale price",
                "$4,900 — 100% of sale price",
                "$640 — 13% of sale price",
                "A loss",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "Markets, customers & pricing",
      content: [
        {
          type: "paragraph",
          text: "A crop with no buyer is a cost, not a revenue. Decide who you sell to before you plant: the spot market, a processor with a contract, a cooperative, or direct to consumers. Each buyer has different requirements — grade, timing, volume — and different prices. Price is set by the buyer's alternatives, not by your costs.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=JD3iMr9N0rQ",
          caption: "Marketing fundamentals for farm businesses — markets, customers, and pricing.",
        },
        {
          type: "note",
          tone: "info",
          text: "A contract that guarantees a floor price is often worth more than a higher spot price with no floor. Certainty is part of the price.",
        },
        {
          type: "quiz",
          title: "Markets & pricing",
          passPercent: 60,
          questions: [
            {
              question: "When should you decide who you sell to?",
              options: [
                "After harvest",
                "Before you plant",
                "At the elevator",
                "Never — buyers find you",
              ],
              answerIndex: 1,
            },
            {
              question: "What really sets the price you can charge?",
              options: [
                "The buyer's alternatives",
                "Your total costs",
                "How hard you worked",
                "The size of your farm",
              ],
              answerIndex: 0,
            },
            {
              question: "Why can a contract with a floor price beat the spot market?",
              options: [
                "It guarantees a minimum return",
                "It is always higher",
                "It removes all costs",
                "It replaces storage",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "The farm as a business",
      content: [
        {
          type: "paragraph",
          text: "Treat each enterprise as its own business unit. An enterprise budget lists the revenue, the variable costs, and the fixed costs of one enterprise — and shows whether it earns its keep. Break-even is the point where revenue covers costs; anything below it is a loss even if the crop is 'fine'.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=gONtCgANgAs",
          caption: "Enterprise and crop budgets in real farm decision-making.",
        },
        {
          type: "list",
          items: [
            "Separate each enterprise's revenue and costs — never blend them.",
            "Know your break-even yield and break-even price.",
            "Fixed costs are shared across enterprises; allocate them honestly.",
            "Revisit the budget every season with real numbers, not estimates.",
          ],
        },
        {
          type: "quiz",
          title: "Enterprise budgets",
          passPercent: 60,
          questions: [
            {
              question: "What does an enterprise budget show?",
              options: [
                "Whether one enterprise earns its keep",
                "The total farm debt",
                "The weather forecast",
                "The market price history",
              ],
              answerIndex: 0,
            },
            {
              question: "Break-even is the point where:",
              options: [
                "Revenue equals costs",
                "Revenue doubles costs",
                "Costs are zero",
                "The loan is repaid",
              ],
              answerIndex: 0,
            },
            {
              question: "How should shared fixed costs be handled?",
              options: [
                "Allocated honestly across enterprises",
                "Ignored entirely",
                "Given to the largest enterprise only",
                "Doubled to be safe",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "Risk & resilience",
      content: [
        {
          type: "paragraph",
          text: "Farming is a risk business: prices move, weather breaks, pests arrive. The answer is not to avoid risk — it is to spread it. Diversify enterprises, stagger planting dates, lock in prices when they are good, and carry a cash buffer. The resilient farm is the one that survives the bad year, not the one that peaks in the good one.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=pCtmKxp1JY8",
          caption: "Navigating growth, risk, and accountability in agribusiness.",
        },
        {
          type: "code",
          prompt: true,
          text: "risk audit --farm\n[ok] price risk    high — single buyer, no contract\n[ok] weather risk  medium — irrigation covers 60%\n[ok] pest risk     low — rotation in place\n[warn] action      add a second buyer this season",
        },
        {
          type: "quiz",
          title: "Risk management",
          passPercent: 60,
          questions: [
            {
              question: "What is the goal of managing farm risk?",
              options: [
                "Spread it across enterprises and time",
                "Eliminate all risk",
                "Ignore it until a bad year",
                "Buy more inputs",
              ],
              answerIndex: 0,
            },
            {
              question: "The risk audit flagged which area as high?",
              options: [
                "Price risk — a single buyer",
                "Weather risk",
                "Pest risk",
                "Labour risk",
              ],
              answerIndex: 0,
            },
            {
              question: "A cash buffer helps you survive:",
              options: [
                "The bad year",
                "Only the good year",
                "Only pest outbreaks",
                "Nothing at all",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "Growth, finance & partnerships",
      content: [
        {
          type: "paragraph",
          text: "Growth is a decision, not a wish. Reinvest profits first, then borrow only when the enterprise budget says the expansion pays for itself. Match the loan to the asset: long-term loans for land and equipment, short-term credit for inputs and working capital. Partnerships and cooperatives can buy the scale no single farm can afford.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=heTxEsrPVdQ",
          caption: "From start to scale — a step-by-step farm business guide.",
        },
        {
          type: "list",
          items: [
            "Reinvest profits before taking on debt.",
            "Match loan terms to the life of the asset.",
            "A cooperative can unlock volume discounts and shared infrastructure.",
            "Say no to expansion that the numbers do not support.",
          ],
        },
        {
          type: "quiz",
          title: "Growth & finance",
          passPercent: 60,
          questions: [
            {
              question: "What should come before borrowing for expansion?",
              options: [
                "Reinvesting profits",
                "Buying new equipment",
                "Adding land",
                "Hiring more staff",
              ],
              answerIndex: 0,
            },
            {
              question: "A long-term loan should fund:",
              options: [
                "Land and equipment",
                "This season's seed",
                "Weekly wages",
                "The water bill",
              ],
              answerIndex: 0,
            },
            {
              question: "What can a cooperative give a small farm?",
              options: [
                "Scale it cannot afford alone",
                "Guaranteed profits",
                "Free land",
                "A fixed buyer forever",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
  ],
};
