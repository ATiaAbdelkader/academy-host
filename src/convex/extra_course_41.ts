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

export const extraCourse41: ExtraCourse = {
  title: "Irrigation Engineering & Design",
  description:
    "Design and implement efficient irrigation systems: drip, sprinkler, surface, and smart systems. Learn hydraulics, system sizing, scheduling, and water-use efficiency for any scale.",
  category: "Water Management",
  duration: "6 weeks",
  difficulty: "Advanced",
  priceCents: 0,
  durationMinutes: 1800,
  order: 41,
  instructor: "Eng. Water Flow",
  instructorTitle: "Irrigation Engineer",
  modules: [
    {
      title: "Irrigation Principles & Water Requirements",
      content: [
        { type: "heading", text: "Understanding Crop Water Needs" },
        {
          type: "paragraph",
          text: "Effective irrigation meets crop water requirements with maximum efficiency. This starts with understanding evapotranspiration (ET) — the combined water loss from soil evaporation and plant transpiration.",
        },
        {
          type: "list",
          items: [
            "Reference evapotranspiration (ET0) and crop coefficients (Kc)",
            "Crop water requirements by growth stage",
            "Soil water-holding capacity and management",
            "Allowable depletion and irrigation scheduling",
            "Water balance approach to irrigation management",
          ],
        },
        {
          type: "code",
          text: `Crop Water Requirement (ETc):\nETc = ET0 × Kc\n\nExample (mid-season corn):\nET0 = 6 mm/day (hot climate)\nKc = 1.15 (mid-season corn coefficient)\nETc = 6 × 1.15 = 6.9 mm/day\n\nFor 1 hectare = 69,000 liters/day`,
        },
        {
          type: "quiz",
          title: "Irrigation Principles Quiz",
          passPercent: 70,
          questions: [
            {
              question: "What does evapotranspiration (ET) represent?",
              options: [
                "Water added to soil",
                "Combined water loss from soil evaporation and plant transpiration",
                "Water flowing through pipes",
                "Rainfall measurements",
              ],
              answerIndex: 1,
            },
            {
              question: "If ET0 is 5 mm/day and Kc is 1.2, what is the crop water requirement?",
              options: ["4.2 mm/day", "5 mm/day", "6 mm/day", "7.2 mm/day"],
              answerIndex: 2,
            },
          ],
        },
      ],
    },
    {
      title: "Drip Irrigation Design",
      content: [
        { type: "heading", text: "Precision Water Delivery" },
        {
          type: "paragraph",
          text: "Drip irrigation delivers water directly to the plant root zone through emitters, minimizing waste. It's the most efficient irrigation method, achieving 90-95% water use efficiency when properly designed and maintained.",
        },
        {
          type: "list",
          items: [
            "Emitter types: pressure-compensating vs. non-compensating",
            "Mainline, sub-main, and lateral pipe sizing",
            "Hydraulic calculations and friction losses",
            "Filtration requirements by water source",
            "Flushing and maintenance schedules",
            "Fertigation through drip systems",
          ],
        },
        {
          type: "code",
          text: `Drip System Sizing:\n\nFlow rate per emitter: 2 L/hr\nEmitters per plant: 2\nPlants per row: 100\nRows per zone: 10\n\nZone flow = 2 × 2 × 100 × 10 = 4,000 L/hr\nPump capacity needed: 4,000 ÷ 0.85 (efficiency) = 4,706 L/hr`,
        },
        {
          type: "quiz",
          title: "Drip Irrigation Quiz",
          passPercent: 70,
          questions: [
            {
              question: "What is the water use efficiency of a well-designed drip system?",
              options: ["50-60%", "65-75%", "80-85%", "90-95%"],
              answerIndex: 3,
            },
            {
              question: "Why are pressure-compensating emitters preferred on sloped fields?",
              options: [
                "They cost less",
                "They deliver uniform flow regardless of pressure variations",
                "They need no filtration",
                "They last longer in sunlight",
              ],
              answerIndex: 1,
            },
          ],
        },
      ],
    },
    {
      title: "Sprinkler & Micro-Irrigation Systems",
      content: [
        { type: "heading", text: "Overhead and Micro-Sprinkler Solutions" },
        {
          type: "paragraph",
          text: "Sprinkler systems simulate rainfall, spraying water over crops from above. They're ideal for large areas, turf, and crops that benefit from overhead water. Micro-sprinklers bridge the gap between sprinklers and drip.",
        },
        {
          type: "list",
          items: [
            "Center pivot systems for large fields",
            "Traveling gun and hose-reel systems",
            "Solid-set sprinkler layouts",
            "Micro-sprinklers for orchards and nurseries",
            "Impact vs. rotary vs. fixed spray heads",
            "Wind effects and precipitation uniformity",
          ],
        },
        {
          type: "paragraph",
          text: "Center pivot irrigation covers 50+ million acres worldwide and can irrigate up to 500 acres per system. Modern pivots with GPS guidance create precision application maps for variable-rate irrigation.",
        },
        {
          type: "quiz",
          title: "Sprinkler Systems Quiz",
          passPercent: 70,
          questions: [
            {
              question: "How many acres can a single center pivot system cover?",
              options: ["5-10 acres", "20-30 acres", "50+ acres", "500+ acres"],
              answerIndex: 2,
            },
            {
              question: "What is the main advantage of micro-sprinklers over traditional sprinklers?",
              options: [
                "They cover more area",
                "They use less water and provide targeted irrigation",
                "They need no electricity",
                "They never clog",
              ],
              answerIndex: 1,
            },
          ],
        },
      ],
    },
    {
      title: "Surface Irrigation & Water Harvesting",
      content: [
        { type: "heading", text: "Traditional Methods & Rainwater Capture" },
        {
          type: "paragraph",
          text: "Surface irrigation (flood, furrow, basin) remains the most widely used method globally. Combined with water harvesting techniques, these low-cost systems can be highly effective for smallholder farmers.",
        },
        {
          type: "list",
          items: [
            "Basin irrigation for rice and level fields",
            "Furrow irrigation design and management",
            "Border strip irrigation for flat land",
            "Contour banking for sloped fields",
            "Rainwater harvesting: rooftops, farm ponds, check dams",
            "Sub-surface dam construction",
          ],
        },
        {
          type: "paragraph",
          text: "A 1,000 square meter roof in a region receiving 600mm annual rainfall can harvest up to 480,000 liters per year (after accounting for losses) — enough to irrigate a significant garden plot.",
        },
        {
          type: "quiz",
          title: "Surface Irrigation Quiz",
          passPercent: 70,
          questions: [
            {
              question: "How much water can a 1,000 m² roof harvest in a 600mm rainfall region?",
              options: [
                "60,000 liters",
                "480,000 liters",
                "1,000,000 liters",
                "600 liters",
              ],
              answerIndex: 1,
            },
            {
              question: "What is furrow irrigation?",
              options: [
                "Flooding entire fields",
                "Channeling water through small parallel channels between crop rows",
                "Spraying water from above",
                "Dripping water at plant roots",
              ],
              answerIndex: 1,
            },
          ],
        },
      ],
    },
    {
      title: "Smart Irrigation & Automation",
      content: [
        { type: "heading", text: "Technology-Driven Water Management" },
        {
          type: "paragraph",
          text: "Smart irrigation uses sensors, weather data, and automation to apply the right amount of water at the right time. This precision approach can reduce water use by 20-40% while improving crop yields.",
        },
        {
          type: "list",
          items: [
            "Soil moisture sensors: capacitance, tensiometer, TDR",
            "Weather-based irrigation controllers (ET controllers)",
            "IoT-connected valve and pump automation",
            "Remote monitoring and smartphone control",
            "Machine learning for irrigation scheduling",
            "Integration with farm management systems",
          ],
        },
        {
          type: "paragraph",
          text: "Smart irrigation systems typically pay for themselves within 1-2 seasons through water savings alone, with additional benefits from reduced energy costs and improved crop quality.",
        },
        {
          type: "note",
          tone: "info",
          text: "The USDA offers EQIP (Environmental Quality Incentives Program) cost-share payments of up to 75% for installing smart irrigation systems in the US.",
        },
        {
          type: "quiz",
          title: "Smart Irrigation Quiz",
          passPercent: 70,
          questions: [
            {
              question: "How much can smart irrigation reduce water use?",
              options: ["5-10%", "10-15%", "20-40%", "60-80%"],
              answerIndex: 2,
            },
            {
              question: "What is the typical payback period for a smart irrigation system?",
              options: [
                "5-10 years",
                "3-5 years",
                "1-2 seasons",
                "Never pays back",
              ],
              answerIndex: 2,
            },
          ],
        },
      ],
    },
    {
      title: "System Maintenance & Troubleshooting",
      content: [
        { type: "heading", text: "Keeping Your System Running" },
        {
          type: "paragraph",
          text: "An irrigation system is only as good as its maintenance. Regular care prevents clogs, leaks, and inefficiencies that waste water and money. This module covers the essential maintenance routines and troubleshooting skills every irrigator needs.",
        },
        {
          type: "list",
          items: [
            "Filter cleaning and replacement schedules",
            "Emitter flushing and acid treatment",
            "Leak detection and repair",
            "Pump maintenance and efficiency checks",
            "Winterization and freeze protection",
            "Water quality testing and treatment",
            "Seasonal system inspections",
          ],
        },
        {
          type: "paragraph",
          text: "Clogged emitters are the #1 cause of drip system failure. Regular flushing (every 2-4 weeks) and acid treatment (monthly in hard water areas) prevent buildup and maintain uniform water distribution.",
        },
        {
          type: "code",
          text: `Maintenance Schedule:\n\nWeekly:  Check pressure gauges, visual inspection\nBi-weekly: Flush mainlines and laterals\nMonthly:  Acid treatment (pH 2-3, 30 min)\nQuarterly: Full system audit, check uniformity\nAnnually: Pump service, replace worn filters\n\nWater Quality Thresholds:\nTurbidity: < 2 NTU (for drip)\npH: 5.5-7.0\nIron: < 0.3 mg/L\nManganese: < 0.1 mg/L`,
        },
        {
          type: "quiz",
          title: "System Maintenance Quiz",
          passPercent: 70,
          questions: [
            {
              question: "What is the #1 cause of drip irrigation system failure?",
              options: [
                "Pump breakdown",
                "Clogged emitters",
                "Pipe burst",
                "Power outage",
              ],
              answerIndex: 1,
            },
            {
              question: "How often should drip systems be flushed?",
              options: ["Daily", "Every 2-4 weeks", "Once a year", "Never"],
              answerIndex: 1,
            },
          ],
        },
      ],
    },
  ],
};
