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

export const extraCourse16: ExtraCourse = {
  category: "Horticulture",
  title: "Garden Design & Layout",
  description:
    "Plan and build productive, beautiful gardens — from backyard beds to market-scale plots. Master spacing, companions, pathways, and seasonal layout strategies.",
  priceCents: 4900,
  durationMinutes: 25,
  order: 16,
  instructor: "Grace Njeri",
  instructorTitle: "Landscape & Permaculture Designer",
  modules: [
    {
      title: "Principles of garden design",
      content: [
        {
          type: "paragraph",
          text: "A garden is a system, not a decoration. Every layout decision — orientation, bed shape, path width — affects how much you grow, how easy it is to maintain, and how well plants perform. Design follows function; beauty follows function well executed.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=JCYL3yCyx3I",
          caption: "Garden design principles — form follows function.",
        },
        {
          type: "list",
          items: [
            "Start with the sun map: track light across your site through the day.",
            "Orient beds north–south for even light distribution.",
            "Make paths wide enough for a wheelbarrow — 60 cm minimum.",
            "Group plants by water needs to simplify irrigation.",
          ],
        },
        {
          type: "quiz",
          title: "Design basics",
          passPercent: 60,
          questions: [
            {
              question: "Why orient beds north–south?",
              options: [
                "Even light distribution across the bed",
                "It looks better",
                "Prevents wind damage",
                "Reduces pest pressure",
              ],
              answerIndex: 0,
            },
            {
              question: "Minimum recommended path width for a wheelbarrow is:",
              options: [
                "60 cm",
                "30 cm",
                "1 meter",
                "15 cm",
              ],
              answerIndex: 0,
            },
            {
              question: "Grouping plants by water needs:",
              options: [
                "Simplifies irrigation management",
                "Increases pest pressure",
                "Reduces soil quality",
                "Has no practical benefit",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "Site analysis and sun mapping",
      content: [
        {
          type: "paragraph",
          text: "Before you dig a single hole, read the site. Sun exposure changes through the season. Wind patterns affect transpiration and pest spread. Slope determines drainage. A half-day spent observing saves months of frustration.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=AjE1PYGKGHI",
          caption: "How to map sun and shade in your garden.",
        },
        {
          type: "note",
          tone: "warn",
          text: "Full sun means 6+ hours of direct light. Partial shade means 3–6 hours. Most vegetables need full sun; many herbs and greens tolerate partial shade.",
        },
        {
          type: "quiz",
          title: "Site analysis",
          passPercent: 60,
          questions: [
            {
              question: "\"Full sun\" means how many hours of direct light?",
              options: [
                "6+ hours",
                "2 hours",
                "All day without clouds",
                "1 hour",
              ],
              answerIndex: 0,
            },
            {
              question: "Wind patterns primarily affect:",
              options: [
                "Transpiration and pest spread",
                "Soil pH only",
                "Nothing meaningful",
                "Seed color",
              ],
              answerIndex: 0,
            },
            {
              question: "What should you do before digging any beds?",
              options: [
                "Spend a half-day observing the site",
                "Start planting immediately",
                "Build a fence",
                "Buy fertilizer",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "Bed shapes, sizes, and raised bed construction",
      content: [
        {
          type: "paragraph",
          text: "Raised beds warm faster, drain better, and keep soil from compacting under foot. Standard width is 1.2 meters — reach the center from either side without stepping on the soil. Depth of 20–30 cm handles most crops.",
        },
        {
          type: "list",
          items: [
            "1.2 m wide is the maximum — wider and you compact soil reaching the center.",
            "30 cm deep handles root crops like carrots and potatoes.",
            "Frame materials: untreated hardwood, concrete blocks, galvanized steel.",
            "Fill with 60% topsoil, 30% compost, 10% coarse material for drainage.",
          ],
        },
        {
          type: "code",
          prompt: true,
          text: "raised-bed-spec\n[plan] width:   1.2 m\n[plan] depth:   25–30 cm\n[plan] length:  2.4 m or 3.0 m\n[plan] path:    60 cm between beds\n[soil] 60% topsoil + 30% compost + 10% perlite",
        },
        {
          type: "quiz",
          title: "Bed construction",
          passPercent: 60,
          questions: [
            {
              question: "Why limit raised bed width to 1.2 m?",
              options: [
                "To avoid stepping on and compacting the soil",
                "To save money on lumber",
                "Because plants grow better in narrow beds",
                "No particular reason",
              ],
              answerIndex: 0,
            },
            {
              question: "A good raised bed fill ratio is:",
              options: [
                "60% topsoil, 30% compost, 10% coarse material",
                "100% sand",
                "50% clay, 50% manure",
                "Pure compost only",
              ],
              answerIndex: 0,
            },
            {
              question: "Recommended depth for root crops in raised beds:",
              options: [
                "20–30 cm",
                "5 cm",
                "1 meter",
                "10 cm",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "Companion planting and spatial planning",
      content: [
        {
          type: "paragraph",
          text: "Companion planting is not superstition — it is ecology. Basil near tomatoes repels certain fly pests. Marigolds exude compounds that suppress nematodes. Tall corn shades heat-sensitive lettuce. The right neighbors reduce chemical inputs.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=tGBcrGHJjLc",
          caption: "Companion planting strategies that actually work.",
        },
        {
          type: "list",
          items: [
            "Three Sisters: corn provides structure, beans fix nitrogen, squash shades soil.",
            "Marigolds planted in rows suppress root-knot nematodes.",
            "Avoid planting fennel near most crops — it inhibits growth.",
            "Interplant fast-growing radishes with slow-growing parsnips to mark rows.",
          ],
        },
        {
          type: "quiz",
          title: "Companion planting",
          passPercent: 60,
          questions: [
            {
              question: "The Three Sisters combination includes:",
              options: [
                "Corn, beans, and squash",
                "Tomatoes, peppers, and basil",
                "Carrots, onions, and potatoes",
                "Lettuce, spinach, and kale",
              ],
              answerIndex: 0,
            },
            {
              question: "Marigolds help suppress:",
              options: [
                "Root-knot nematodes",
                "Aphids only",
                "Bacterial wilt",
                "Nothing useful",
              ],
              answerIndex: 0,
            },
            {
              question: "Which plant should NOT be placed near most crops?",
              options: [
                "Fennel",
                "Basil",
                "Marigold",
                "Clover",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "Pathways, irrigation layout, and infrastructure",
      content: [
        {
          type: "paragraph",
          text: "Paths are not wasted space — they are infrastructure. A well-placed path becomes a mulch trail, a drip line guide, and a wheelbarrow access route. Layout your irrigation first, then build beds around the water source.",
        },
        {
          type: "list",
          items: [
            "Lay out irrigation lines before filling beds with soil.",
            "Gravel or wood chip paths suppress weeds and drain well.",
            "Locate compost bins upwind and downhill from the main garden.",
            "Install water access points every 10–15 m for hose reach.",
          ],
        },
        {
          type: "note",
          tone: "info",
          text: "Wood chip paths attract beneficial fungi. Leave them unturned to build fungal networks that benefit nearby plant roots.",
        },
        {
          type: "quiz",
          title: "Infrastructure layout",
          passPercent: 60,
          questions: [
            {
              question: "What should be laid out before filling beds with soil?",
              options: [
                "Irrigation lines",
                "Decorative stones",
                "Fencing",
                "Seeds",
              ],
              answerIndex: 0,
            },
            {
              question: "Recommended water access point spacing:",
              options: [
                "Every 10–15 m",
                "Every 100 m",
                "One per farm",
                "Every 1 m",
              ],
              answerIndex: 0,
            },
            {
              question: "Wood chip paths benefit nearby plants by:",
              options: [
                "Attracting beneficial fungi",
                "Releasing toxic chemicals",
                "Blocking all water flow",
                "Attracting pests",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "Seasonal planning and crop succession",
      content: [
        {
          type: "paragraph",
          text: "A garden that feeds you year-round is not an accident — it is a calendar. Succession planting means sowing the same crop at regular intervals so you harvest continuously instead of all at once. Seasonal planning turns a summer garden into a year-round pantry.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=mHfT3b8zCjU",
          caption: "Succession planting for continuous harvest.",
        },
        {
          type: "list",
          items: [
            "Plant lettuce every 2 weeks from early spring through fall.",
            "Follow spring peas with summer beans, then fall brassicas.",
            "Use a simple spreadsheet: crop, sow date, days to harvest, expected yield.",
            "Plan cover crops for any beds resting longer than 4 weeks.",
          ],
        },
        {
          type: "code",
          prompt: true,
          text: "succession-example\n[week 01] sow lettuce row A\n[week 03] sow lettuce row B\n[week 05] sow lettuce row C\n[week 07] harvest row A — repeat cycle",
        },
        {
          type: "quiz",
          title: "Seasonal planning",
          passPercent: 60,
          questions: [
            {
              question: "Succession planting means:",
              options: [
                "Sowing the same crop at regular intervals for continuous harvest",
                "Planting everything at once",
                "Only planting in spring",
                "Growing one crop per year",
              ],
              answerIndex: 0,
            },
            {
              question: "How often should you sow lettuce for continuous harvest?",
              options: [
                "Every 2 weeks",
                "Once per year",
                "Every month",
                "Only in summer",
              ],
              answerIndex: 0,
            },
            {
              question: "What should you plant in beds resting longer than 4 weeks?",
              options: [
                "Cover crops",
                "Nothing at all",
                "More of the same crop",
                "Trees",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
  ],
};
