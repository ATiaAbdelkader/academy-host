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

export const extraCourse21: ExtraCourse = {
  category: "Farm Operations",
  title: "Farm Equipment & Machinery Basics",
  description:
    "Select, operate, and maintain the machinery that multiplies your labor. From hand tools to tractors — the right equipment at the right scale.",
  priceCents: 5900,
  durationMinutes: 25,
  order: 21,
  instructor: "James Mwangi",
  instructorTitle: "Agricultural Mechanization Specialist",
  modules: [
    {
      title: "Right-sizing equipment to your farm",
      content: [
        {
          type: "paragraph",
          text: "The biggest equipment mistake is buying too much too soon. A 2-acre farm does not need a 100 HP tractor — it needs a two-wheel walk-behind and good hand tools. Match equipment to your scale, your crop, and your cash flow. Leasing and sharing are often smarter than owning.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=FgjqpWw9IbU",
          caption: "How to choose the right farm equipment for your scale.",
        },
        {
          type: "list",
          items: [
            "Under 1 acre: quality hand tools, broadfork, stirrup hoe.",
            "1–5 acres: two-wheel tractor (walk-behind) with attachments.",
            "5–20 acres: compact tractor (25–40 HP) with loader and PTO.",
            "20+ acres: utility tractor (50–80 HP) with full implement suite.",
            "Equipment sharing cooperatives reduce cost 40–60% for small farms.",
          ],
        },
        {
          type: "quiz",
          title: "Right-sizing",
          passPercent: 60,
          questions: [
            {
              question: "For a 2-acre farm, the most appropriate equipment is:",
              options: [
                "Two-wheel walk-behind tractor and hand tools",
                "100 HP tractor",
                "Combine harvester",
                "Helicopter",
              ],
              answerIndex: 0,
            },
            {
              question: "Equipment sharing cooperatives reduce cost by approximately:",
              options: [
                "40–60%",
                "0%",
                "90%",
                "100%",
              ],
              answerIndex: 0,
            },
            {
              question: "What is the biggest equipment mistake small farms make?",
              options: [
                "Buying too much too soon",
                "Using hand tools",
                "Not buying enough",
                "Maintaining equipment properly",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "Hand tools and manual equipment",
      content: [
        {
          type: "paragraph",
          text: "Hand tools are not primitive — they are precise. A sharp hoe in skilled hands outperforms a poorly used machine. The broadfork aerates without inverting soil layers. The stirrup hoe cuts weeds at the soil surface in one pass. Invest in quality; a cheap tool breaks when you need it most.",
        },
        {
          type: "list",
          items: [
            "Broadfork: deep aeration without tilling — preserves soil structure.",
            "Stirrup hoe: cuts weeds at the surface, fast and efficient.",
            "Wheel hoe: covers more ground with less fatigue — essential for row crops.",
            "Dibber: precise hole spacing for transplanting — saves time and seeds.",
            "Quality hand tools last 20+ years; cheap tools last one season.",
          ],
        },
        {
          type: "note",
          tone: "info",
          text: "A sharp tool is a safe tool. Dull blades require more force, leading to more injuries. Sharpen hand tools weekly during active use.",
        },
        {
          type: "quiz",
          title: "Hand tools",
          passPercent: 60,
          questions: [
            {
              question: "Which tool aerates soil without inverting layers?",
              options: [
                "Broadfork",
                "Rototiller",
                "Spade",
                "Shovel",
              ],
              answerIndex: 0,
            },
            {
              question: "How long do quality hand tools typically last?",
              options: [
                "20+ years",
                "1 week",
                "1 month",
                "1 day",
              ],
              answerIndex: 0,
            },
            {
              question: "Why is a sharp tool safer than a dull one?",
              options: [
                "Dull blades require more force, increasing injury risk",
                "Sharp tools weigh less",
                "Sharp tools are cheaper",
                "No difference in safety",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "Two-wheel tractors and walk-behind equipment",
      content: [
        {
          type: "paragraph",
          text: "The two-wheel tractor is the Swiss Army knife of small farms. One engine powers a rototiller, mower, plow, seeder, and wood chipper. For 1–5 acres, this single investment replaces 5 separate machines. European-made two-wheel tractors (BCS, Grillo) outlast cheap imports by 10×.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=Y8GZxJdPCpQ",
          caption: "Two-wheel tractor attachments and their uses.",
        },
        {
          type: "list",
          items: [
            "Rototiller attachment: bed preparation in one pass.",
            "Sickle bar mower: cuts hay, cover crops, and tall grass cleanly.",
            "Plow attachment: primary tillage for heavy clay soils.",
            "Seeder attachment: precision row planting for small seeds.",
            "PTO-driven: power wood chippers, flail mowers, and more.",
          ],
        },
        {
          type: "quiz",
          title: "Two-wheel tractors",
          passPercent: 60,
          questions: [
            {
              question: "What is the primary advantage of a two-wheel tractor?",
              options: [
                "One engine powers multiple attachments",
                "It looks impressive",
                "It requires no maintenance",
                "It is the fastest machine available",
              ],
              answerIndex: 0,
            },
            {
              question: "Which attachment cuts hay cleanly?",
              options: [
                "Sickle bar mower",
                "Rototiller",
                "Plow",
                "Seeder",
              ],
              answerIndex: 0,
            },
            {
              question: "European-made two-wheel tractors outlast cheap imports by approximately:",
              options: [
                "10×",
                "2×",
                "Same duration",
                "0.5×",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "Compact tractors and PTO implements",
      content: [
        {
          type: "paragraph",
          text: "A compact tractor (25–40 HP) is the workhorse of mid-scale farming. The Power Take-Off (PTO) transfers engine power to implements: mowers, tillers, post-hole diggers, and generators. The three-point hitch lifts and lowers implements. Hydraulics do the heavy lifting.",
        },
        {
          type: "list",
          items: [
            "25–40 HP compact tractors handle 90% of tasks on farms up to 20 acres.",
            "PTO speed: 540 RPM is standard for most implements.",
            "Three-point hitch: Category 1 for compact tractors, Category 2 for utility.",
            "Loader attachment: front-end loader moves soil, gravel, and feed efficiently.",
            "Ballast: add weight to the rear when using heavy front implements.",
          ],
        },
        {
          type: "code",
          prompt: true,
          text: "tractor-specs\n[HP]        25–40 HP — compact class\n[PTO]       540 RPM standard\n[hitch]     Category 1 three-point\n[loader]    front-end, bucket 1.2 m\n[ballast]   counterweight when using front implements",
        },
        {
          type: "quiz",
          title: "Tractor basics",
          passPercent: 60,
          questions: [
            {
              question: "Standard PTO speed for most implements is:",
              options: [
                "540 RPM",
                "100 RPM",
                "10,000 RPM",
                "10 RPM",
              ],
              answerIndex: 0,
            },
            {
              question: "What is a three-point hitch used for?",
              options: [
                "Lifting and lowering implements",
                "Starting the engine",
                "Holding fuel",
                "Nothing practical",
              ],
              answerIndex: 0,
            },
            {
              question: "When should you add ballast to a tractor?",
              options: [
                "When using heavy front implements",
                "Always, even when parked",
                "Never",
                "Only in winter",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "Equipment maintenance and safety",
      content: [
        {
          type: "paragraph",
          text: "Maintenance is cheaper than repair, and repair is cheaper than replacement. A 15-minute pre-operation check prevents most breakdowns. Change oil every 100–200 hours. Grease fittings weekly. Check tire pressure monthly. Clean air filters daily in dusty conditions.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=VAEfKyOCfXo",
          caption: "Basic tractor maintenance every farmer should know.",
        },
        {
          type: "list",
          items: [
            "Pre-operation check: oil, coolant, tire pressure, loose bolts, PTO shield.",
            "Oil change: every 100–200 hours or annually, whichever comes first.",
            "Grease all fittings weekly — dry bearings fail without warning.",
            "Air filter: clean daily in dusty conditions, replace every 300 hours.",
            "Safety: always shut off engine before servicing, disconnect PTO.",
          ],
        },
        {
          type: "note",
          tone: "warn",
          text: "Never operate a PTO without the master shield in place. PTO shafts spin at 540 RPM and can entangle clothing and limbs in a fraction of a second.",
        },
        {
          type: "quiz",
          title: "Maintenance and safety",
          passPercent: 60,
          questions: [
            {
              question: "How often should you change tractor oil?",
              options: [
                "Every 100–200 hours or annually",
                "Every 10,000 hours",
                "Never",
                "Daily",
              ],
              answerIndex: 0,
            },
            {
              question: "Why should you always shut off the engine before servicing?",
              options: [
                "To prevent accidental startup and injury",
                "To save fuel",
                "It is not necessary",
                "To clean the engine",
              ],
              answerIndex: 0,
            },
            {
              question: "What is the danger of an unshielded PTO shaft?",
              options: [
                "It can entangle clothing and limbs at 540 RPM",
                "It is just noisy",
                "No real danger",
                "It uses more fuel",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "Emerging technology: drones and precision tools",
      content: [
        {
          type: "paragraph",
          text: "Agricultural drones cost less than a good tractor and can do things no tractor can: aerial scouting, precise spray application, and crop health mapping. GPS-guided auto-steer reduces overlap and waste. The future of farm machinery is smart, not just big.",
        },
        {
          type: "list",
          items: [
            "Spray drones: $3,000–$15,000, apply 10–20 acres per hour.",
            "Scout drones: NDVI imaging reveals stress before it is visible.",
            "GPS auto-steer: reduces overlap from 10% to under 2%.",
            "Soil sensors: real-time moisture and nutrient data per zone.",
            "Phone-based tools: pH testing, pest identification, market prices.",
          ],
        },
        {
          type: "note",
          tone: "info",
          text: "Start with phone-based precision tools before investing in drones. A smartphone soil test kit costs $50 and gives actionable data immediately.",
        },
        {
          type: "quiz",
          title: "Emerging technology",
          passPercent: 60,
          questions: [
            {
              question: "How many acres per hour can a spray drone cover?",
              options: [
                "10–20 acres per hour",
                "1 acre per day",
                "100 acres per minute",
                "0.1 acres per hour",
              ],
              answerIndex: 0,
            },
            {
              question: "NDVI imaging from scout drones reveals:",
              options: [
                "Crop stress before it is visible to the eye",
                "Only the farm boundary",
                "Nothing useful",
                "Underground water only",
              ],
              answerIndex: 0,
            },
            {
              question: "What should you try before investing in expensive precision equipment?",
              options: [
                "Phone-based tools and smartphone soil test kits",
                "Nothing — buy the most expensive drone immediately",
                "Only hand tools",
                "Hire a consultant permanently",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
  ],
};
