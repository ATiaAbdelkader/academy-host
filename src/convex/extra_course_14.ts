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

export const extraCourse14: ExtraCourse = {
  category: "Business & Management",
  title: "Business Model Canvas in Agriculture",
  description:
    "Put any agri project on one page: customers, value, channels, revenue, costs, and the partners who make it work — then test it before you spend.",
  priceCents: 5900,
  durationMinutes: 22,
  order: 14,
  instructor: "Imani Wanjiku",
  instructorTitle: "Business Model Strategist",
  modules: [
    {
      title: "Why the canvas works",
      content: [
        {
          type: "paragraph",
          text: "A business plan is a document; the Business Model Canvas is a thinking tool. Nine blocks on one page force you to answer who you serve, what you give them, how you reach them, and how the money flows — before you write a single detailed plan. For an agri project, it turns a good idea into a testable model.",
        },
        {
          type: "list",
          items: [
            "One page — everyone can see the whole model at once.",
            "Nine blocks cover customers, value, delivery, and money.",
            "The canvas is a draft to test, not a promise to defend.",
            "Start with the customer side, not with your product.",
          ],
        },
        {
          type: "quiz",
          title: "Canvas basics",
          passPercent: 60,
          questions: [
            {
              question: "What is the canvas best used for?",
              options: [
                "Writing a legal contract",
                "Thinking through the whole model on one page",
                "Keeping tax records",
                "Publishing a crop report",
              ],
              answerIndex: 1,
            },
            {
              question: "Where should you start when filling the canvas?",
              options: [
                "With the customer side",
                "With your product features",
                "With the logo",
                "With the cost block",
              ],
              answerIndex: 0,
            },
            {
              question: "A completed canvas is best treated as:",
              options: [
                "A draft to test and change",
                "A final binding plan",
                "A marketing brochure",
                "A bank requirement only",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "Customer segments & value propositions",
      content: [
        {
          type: "paragraph",
          text: "Who actually pays, and why would they switch to you? Customer segments are distinct groups with different needs — a processor buying volume is not the same customer as a supermarket shelf or a family at the market. The value proposition is the concrete reason each segment chooses you: fresher, cheaper, more reliable, traceable, or available when others are not.",
        },
        {
          type: "code",
          prompt: true,
          text: "canvas --block customers --project avocado-grove\n[ok] segment A   exporter — needs volume + traceability\n[ok] segment B   local hotels — needs weekly delivery\n[ok] segment C   market stall — needs small lots, credit\n[warn] pick one primary segment for season one",
        },
        {
          type: "quiz",
          title: "Customers & value",
          passPercent: 60,
          questions: [
            {
              question: "Why split customers into segments?",
              options: [
                "Each group has different needs and buying behaviour",
                "To make the canvas look fuller",
                "Because banks require it",
                "It lowers production costs",
              ],
              answerIndex: 0,
            },
            {
              question: "What is a value proposition?",
              options: [
                "The concrete reason a segment chooses you",
                "The price of your product",
                "The size of your farm",
                "Your company slogan",
              ],
              answerIndex: 0,
            },
            {
              question: "The canvas exercise recommends for season one:",
              options: [
                "Picking one primary segment",
                "Serving all three equally",
                "Skipping segments",
                "Only selling to exporters",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "Channels & customer relationships",
      content: [
        {
          type: "paragraph",
          text: "Channels are how you reach and deliver to each segment — direct at a market stall, through a cooperative, or via a contract with a processor. Relationships are how you keep them: a standing weekly order, a membership, a loyalty price, or simply reliable delivery. The cheapest channel is not always the best one; the best channel is the one your segment already uses.",
        },
        {
          type: "note",
          tone: "info",
          text: "Sell where your customer already buys. Building a new market from zero is a project of its own — and it should be on the canvas, not assumed.",
        },
        {
          type: "quiz",
          title: "Channels & relationships",
          passPercent: 60,
          questions: [
            {
              question: "What are channels?",
              options: [
                "How you reach and deliver to each segment",
                "The irrigation pipes",
                "The payment terms",
                "The storage sheds",
              ],
              answerIndex: 0,
            },
            {
              question: "Which channel is usually best?",
              options: [
                "The one your segment already uses",
                "The cheapest one, always",
                "The most modern one",
                "The one your neighbour uses",
              ],
              answerIndex: 0,
            },
            {
              question: "A standing weekly order is an example of:",
              options: [
                "A customer relationship",
                "A cost structure",
                "A key resource",
                "A revenue stream",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "Revenue streams & cost structure",
      content: [
        {
          type: "paragraph",
          text: "The money side has two blocks. Revenue streams are every way money comes in: product sales, premiums for quality or timing, fees for services, or leases of equipment. Cost structure is what it takes to deliver: inputs, labour, fuel, storage, and overhead. The model only works when the streams cover the costs — and the canvas makes that arithmetic visible.",
        },
        {
          type: "list",
          items: [
            "List every revenue stream, not just the main one.",
            "Separate fixed costs from variable costs.",
            "Premiums (early season, certified, organic) are real revenue.",
            "If costs exceed revenue on paper, fix the model — do not ignore it.",
          ],
        },
        {
          type: "quiz",
          title: "Money blocks",
          passPercent: 60,
          questions: [
            {
              question: "A premium for early-season delivery is what?",
              options: [
                "A revenue stream",
                "A cost structure",
                "A key partner",
                "A channel",
              ],
              answerIndex: 0,
            },
            {
              question: "Why separate fixed and variable costs?",
              options: [
                "To see what changes with volume",
                "To make the plan longer",
                "Banks ignore fixed costs",
                "It is a tax requirement",
              ],
              answerIndex: 0,
            },
            {
              question: "If the canvas shows costs above revenue, you should:",
              options: [
                "Fix the model before spending",
                "Ignore the numbers",
                "Raise prices without checking",
                "Abandon planning entirely",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "Key resources, activities & partners",
      content: [
        {
          type: "paragraph",
          text: "What must you own or control — land, water rights, cold storage, licences, skilled labour — and what must you do repeatedly, like planting, harvesting, cooling, and delivering? Partners supply what you should not build yourself: a packhouse, a transporter, an agronomist, or a lender. The canvas asks what you truly need versus what you can rent, buy, or borrow.",
        },
        {
          type: "code",
          prompt: true,
          text: "canvas --block resources --project avocado-grove\n[ok] key resources   land, drip irrigation, cold room\n[ok] key activities  orchard care, harvest, cooling, dispatch\n[ok] key partners    packhouse, trucking co-op, agronomist\n[ok] check           cold room — rent vs build? build = $48k",
        },
        {
          type: "quiz",
          title: "Resources & partners",
          passPercent: 60,
          questions: [
            {
              question: "What are key resources?",
              options: [
                "What you must own or control to deliver value",
                "Only the bank loan",
                "The customers",
                "The price list",
              ],
              answerIndex: 0,
            },
            {
              question: "Why use partners at all?",
              options: [
                "They supply what you should not build yourself",
                "They always cost less",
                "To share your secrets",
                "Partners are never needed",
              ],
              answerIndex: 0,
            },
            {
              question: "The canvas check on the cold room asked:",
              options: [
                "Rent versus build — and what build costs",
                "Whether customers like cold rooms",
                "How to hide the cost",
                "Nothing at all",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "Filling & validating your canvas",
      content: [
        {
          type: "paragraph",
          text: "The canvas is finished when it is wrong in the cheapest way possible. Test the riskiest assumption first — usually that someone will actually pay. Talk to buyers before you build, run a small pilot, and update the canvas with what you learn. A validated canvas is the strongest pitch you can carry to a lender, a partner, or your own family meeting.",
        },
        {
          type: "note",
          tone: "info",
          text: "Spend the least money that tests the biggest assumption. A conversation costs nothing; a pilot costs little; a full build costs everything — test in that order.",
        },
        {
          type: "quiz",
          title: "Validation",
          passPercent: 60,
          questions: [
            {
              question: "Which assumption should you test first?",
              options: [
                "That someone will actually pay",
                "The colour of the packaging",
                "The storage layout",
                "The loan interest rate",
              ],
              answerIndex: 0,
            },
            {
              question: "What is the cheapest test that matters?",
              options: [
                "Talking to buyers",
                "Building the full facility",
                "Buying all the equipment",
                "Hiring a full team",
              ],
              answerIndex: 0,
            },
            {
              question: "A validated canvas is most useful for:",
              options: [
                "Pitching to lenders and partners",
                "Replacing your farm records",
                "Setting crop rotation",
                "Nothing — it is decorative",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
  ],
};
