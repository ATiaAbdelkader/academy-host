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

export const extraCourse10: ExtraCourse = {
  category: "Practice & Safety",
  title: "Sprayer Calibration & Safe Application",
  description:
    "Calibrate before you spray: nozzles, speed, and the math that keep every application on target — and every operator out of the drift.",
  priceCents: 5900,
  durationMinutes: 20,
  order: 10,
  instructor: "Rafael Mwangi",
  instructorTitle: "Application Technology Specialist",
  modules: [
    {
      title: "Why calibration comes first",
      content: [
        {
          type: "paragraph",
          text: "An uncalibrated sprayer is a guess you pay for twice: once in wasted product, once in crop damage or failed control. Ten minutes of calibration before the season saves hours of fixing after it — and keeps every label rate honest.",
        },
        {
          type: "list",
          items: [
            "Calibration is part of every application, not optional maintenance.",
            "Under-dosing means failed control and a second pass.",
            "Over-dosing wastes money and risks crop damage or residues.",
            "Calibrate once per season, and again after any nozzle or speed change.",
          ],
        },
        {
          type: "quiz",
          title: "Calibration mindset",
          passPercent: 60,
          questions: [
            {
              question: "An uncalibrated sprayer is best described as:",
              options: [
                "A guess you pay for twice",
                "A minor inconvenience",
                "Only a problem on large farms",
                "Not a real concern",
              ],
              answerIndex: 0,
            },
            {
              question: "What does under-dosing usually cause?",
              options: [
                "Failed control and a second pass",
                "Nothing at all",
                "Faster coverage",
                "Higher yields",
              ],
              answerIndex: 0,
            },
            {
              question: "When should you calibrate again?",
              options: [
                "After any nozzle or speed change",
                "Only at the start of the season",
                "Never",
                "Every five years",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "The calibration math",
      content: [
        {
          type: "paragraph",
          text: "The goal is output per area: how many litres you apply per hectare at your actual field speed. Measure each nozzle's output into a jug for thirty seconds at spraying pressure, convert to litres per minute, and work out the boom's total output for the area it covers per minute.",
        },
        {
          type: "code",
          prompt: true,
          text: "sprayer check --boom-18m --speed-8kph\n[ok] nozzle output  1.1 L/min (target 1.0–1.2)\n[ok] boom width     18 m\n[ok] speed          8 kph\n[info] application rate ≈ 92 L/ha\n[warn] re-check at field speed — GPS may differ",
        },
        {
          type: "quiz",
          title: "Calibration math",
          passPercent: 60,
          questions: [
            {
              question: "What does calibration measure?",
              options: [
                "Output per area at your actual speed",
                "The colour of the product",
                "Tank size only",
                "The weather forecast",
              ],
              answerIndex: 0,
            },
            {
              question: "The sample readout shows an application rate of about:",
              options: ["92 L/ha", "8 L/ha", "18 L/ha", "1.1 L/ha"],
              answerIndex: 0,
            },
            {
              question: "Why measure nozzle output at spraying pressure?",
              options: [
                "Output changes with pressure",
                "It looks professional",
                "The jug needs filling",
                "Pressure is irrelevant",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "Nozzle selection & wear",
      content: [
        {
          type: "paragraph",
          text: "Nozzles decide droplet size, and droplet size decides coverage and drift. Flat-fan nozzles give broad even coverage; air-induction nozzles are the choice when drift matters. A worn nozzle can over-deliver by ten percent or more — replace them as a set, never one at a time.",
        },
        {
          type: "list",
          items: [
            "Air-induction nozzles cut drift with larger droplets.",
            "Flat fans suit broad, even coverage.",
            "Replace nozzles as a set — mixed ages spray unevenly.",
            "Check for wear when output rises ten percent above spec.",
          ],
        },
        {
          type: "quiz",
          title: "Nozzles",
          passPercent: 60,
          questions: [
            {
              question: "When drift is the concern, which nozzle helps most?",
              options: [
                "Air-induction",
                "The oldest one on the boom",
                "Whatever is on the shelf",
                "A high-pressure flat fan",
              ],
              answerIndex: 0,
            },
            {
              question: "Why replace nozzles as a set?",
              options: [
                "Mixed ages spray unevenly",
                "Sets are cheaper",
                "The label requires it",
                "There is no reason",
              ],
              answerIndex: 0,
            },
            {
              question: "A nozzle is considered worn when its output rises above spec by:",
              options: [
                "Ten percent",
                "One percent",
                "Fifty percent",
                "It never wears out",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "Drift & the weather",
      content: [
        {
          type: "paragraph",
          text: "Drift is a wind problem before it is a nozzle problem. Wind over about fifteen kilometres an hour — or a temperature inversion — pushes product where it does not belong. Check the weather at the field, not at the house, and hold a buffer from water and neighbours.",
        },
        {
          type: "note",
          tone: "warn",
          text: "A temperature inversion can hold fine droplets in a low layer and carry them sideways for kilometres. If the air feels still but haze hangs low, that is a red flag — wait.",
        },
        {
          type: "quiz",
          title: "Drift",
          passPercent: 60,
          questions: [
            {
              question: "Wind above roughly what speed means stop and wait?",
              options: ["15 km/h", "50 km/h", "1 km/h", "Any breeze is fine"],
              answerIndex: 0,
            },
            {
              question: "What is the typical sign of a temperature inversion?",
              options: [
                "Still air with low haze",
                "Strong gusts",
                "Clear blue sky",
                "Heavy rain",
              ],
              answerIndex: 0,
            },
            {
              question: "Where should you check the wind before spraying?",
              options: [
                "At the field",
                "At the house",
                "On yesterday's forecast",
                "Nowhere — it never matters",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "PPE & mixing safely",
      content: [
        {
          type: "paragraph",
          text: "Read the label's PPE section before you open the container, not after. Gloves, eye protection and the listed coverings are the difference between a routine job and a clinic visit. Mix in the order the label gives, on a contained pad, and keep clean water nearby for spills and rinsing.",
        },
        {
          type: "list",
          items: [
            "Check the label's PPE list before opening the product.",
            "Mix on a contained pad — never beside a drain or waterway.",
            "Add products in the order the label says.",
            "Rinse containers and add the rinsate to the tank.",
          ],
        },
        {
          type: "quiz",
          title: "Safe mixing",
          passPercent: 60,
          questions: [
            {
              question: "When should you check the label's PPE list?",
              options: [
                "Before opening the product",
                "After the first symptoms",
                "At the end of the season",
                "Only for unfamiliar products",
              ],
              answerIndex: 0,
            },
            {
              question: "Where should mixing happen?",
              options: [
                "On a contained pad",
                "Beside a drain",
                "In the truck bed",
                "Near the creek",
              ],
              answerIndex: 0,
            },
            {
              question: "Why add products in the label's order?",
              options: [
                "Mixing order prevents reactions",
                "It is faster",
                "The order is optional",
                "Order never matters",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "Record keeping & verification",
      content: [
        {
          type: "paragraph",
          text: "An application you did not record is an application you cannot defend. Log the product, rate, area, weather, nozzles and operator for every pass — and verify the boom pattern before you trust the whole season to it.",
        },
        {
          type: "code",
          prompt: true,
          text: "app log --field-07 --date\n[ok] product   label rate 1.5 L/ha\n[ok] area      12.4 ha\n[ok] wind      8 km/h · fine\n[ok] nozzles   AI110-04 · new\n[ok] operator  R. Mwangi — logged",
        },
        {
          type: "quiz",
          title: "Records",
          passPercent: 60,
          questions: [
            {
              question: "What does a good application record prove?",
              options: [
                "What you applied, where, and how",
                "That you were busy",
                "Nothing at all",
                "Only the invoice",
              ],
              answerIndex: 0,
            },
            {
              question: "The sample log lists wind at:",
              options: ["8 km/h", "80 km/h", "0 km/h", "Wind is not logged"],
              answerIndex: 0,
            },
            {
              question: "When should you check the boom pattern?",
              options: [
                "Before you trust the season to it",
                "Only when it rains",
                "After the crop fails",
                "Never",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
  ],
};
