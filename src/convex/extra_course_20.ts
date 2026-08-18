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

export const extraCourse20: ExtraCourse = {
  category: "Post-Harvest",
  title: "Post-Harvest Handling & Storage",
  description:
    "What you do after harvest determines what you earn. Master cooling, curing, packaging, and storage systems that preserve quality and extend shelf life.",
  priceCents: 5900,
  durationMinutes: 26,
  order: 20,
  instructor: "Patricia Wanjiku",
  instructorTitle: "Post-Harvest Technologist",
  modules: [
    {
      title: "The post-harvest chain",
      content: [
        {
          type: "paragraph",
          text: "Harvest is not the finish line — it is the start of a new race. Every hour between field and consumer is a hour of deterioration. Respiration, moisture loss, microbial growth, and physical damage all begin at harvest. The goal is to slow every one of them.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=RvH1m8_fHMY",
          caption: "Understanding post-harvest losses — where your money goes.",
        },
        {
          type: "list",
          items: [
            "30–40% of food is lost between farm and fork in developing countries.",
            "Field heat removal is the single most important post-harvest step.",
            "Every 10°C drop in temperature halves respiration rate.",
            "Physical damage (bruises, cuts) accelerates spoilage by 3–5×.",
          ],
        },
        {
          type: "quiz",
          title: "Post-harvest basics",
          passPercent: 60,
          questions: [
            {
              question: "What percentage of food is lost between farm and fork in developing countries?",
              options: [
                "30–40%",
                "1–2%",
                "90%",
                "0%",
              ],
              answerIndex: 0,
            },
            {
              question: "The most important post-harvest step is:",
              options: [
                "Field heat removal",
                "Painting the storage room",
                "Adding fertilizer",
                "Watering crops",
              ],
              answerIndex: 0,
            },
            {
              question: "How does a 10°C temperature drop affect respiration rate?",
              options: [
                "Halves it",
                "Doubles it",
                "No effect",
                "Triples it",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "Cooling methods and cold chain",
      content: [
        {
          type: "paragraph",
          text: "The cold chain is a continuous temperature-controlled path from harvest to consumer. Break it once and quality drops permanently. Forced-air cooling is 10× faster than room cooling. For smallholders, evaporative cooling (zero-energy) can extend shelf life by 3–5 days.",
        },
        {
          type: "list",
          items: [
            "Room cooling: cheapest, slowest — take 12–24 hours to remove field heat.",
            "Forced-air cooling: pulls cold air through packed produce — 1–2 hours.",
            "Ice cooling: direct contact — best for leafy greens and fish.",
            "Evaporative cooling (zeer pot): zero energy, extends shelf life 3–5 days.",
            "Target temperatures: leafy greens 0–2°C, tropicals 10–13°C, roots 0–4°C.",
          ],
        },
        {
          type: "code",
          prompt: true,
          text: "cooling-targets\n[leafy greens]   0–2°C   harvest → cool within 1 hour\n[tropical fruit] 10–13°C  chill-sensitive — no below 10°C\n[root crops]     0–4°C    curing first, then cold storage\n[bananas]        13–14°C  ripening room at 15–20°C",
        },
        {
          type: "quiz",
          title: "Cooling methods",
          passPercent: 60,
          questions: [
            {
              question: "How much faster is forced-air cooling compared to room cooling?",
              options: [
                "10× faster",
                "Same speed",
                "Slower",
                "2× faster",
              ],
              answerIndex: 0,
            },
            {
              question: "What is the target temperature for leafy greens?",
              options: [
                "0–2°C",
                "30°C",
                "50°C",
                "10–13°C",
              ],
              answerIndex: 0,
            },
            {
              question: "A zeer pot (evaporative cooler) extends shelf life by:",
              options: [
                "3–5 days",
                "No effect",
                "1 year",
                "1 hour",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "Curing and preparation for storage",
      content: [
        {
          type: "paragraph",
          text: "Curing is the controlled drying and skin-hardening that prepares root crops and alliums for long-term storage. Potatoes need 2 weeks at 15–20°C and high humidity to heal harvest wounds. Skip curing and they rot within days.",
        },
        {
          type: "list",
          items: [
            "Potatoes: cure 10–14 days at 15–20°C, 85–90% humidity, in darkness.",
            "Onions and garlic: cure 2–4 weeks in a dry, ventilated space until necks are papery.",
            "Sweet potatoes: cure at 29–33°C for 4–7 days to convert starch to sugar.",
            "Never wash root crops before storage — moisture promotes rot.",
          ],
        },
        {
          type: "note",
          tone: "warn",
          text: "Potatoes exposed to light develop solanine — a toxic green compound. Store in complete darkness.",
        },
        {
          type: "quiz",
          title: "Curing",
          passPercent: 60,
          questions: [
            {
              question: "How long should potatoes cure before storage?",
              options: [
                "10–14 days",
                "1 hour",
                "1 minute",
                "6 months",
              ],
              answerIndex: 0,
            },
            {
              question: "Why cure sweet potatoes at 29–33°C?",
              options: [
                "To convert starch to sugar for better flavor",
                "To kill pests",
                "To dry them out completely",
                "Curing is not needed for sweet potatoes",
              ],
              answerIndex: 0,
            },
            {
              question: "Why should you never wash root crops before storage?",
              options: [
                "Moisture promotes rot",
                "Water wastes money",
                "Crops don't need washing",
                "It changes the color",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "Packaging for protection and marketing",
      content: [
        {
          type: "paragraph",
          text: "Packaging does three jobs: protects produce from physical damage, creates a controlled micro-atmosphere, and sells the product. The right package reduces losses by 20–50% and commands a higher price at market.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=0SF3yHvnJMg",
          caption: "Packaging solutions for smallholder farmers.",
        },
        {
          type: "list",
          items: [
            "Rigid crates prevent crushing — plastic or wood, never bags for fragile produce.",
            "Ventilated packaging allows airflow — reduces condensation and mold.",
            "Modified atmosphere packaging (MAP) slows ripening for high-value crops.",
            "Label with origin, variety, and harvest date — builds buyer trust.",
          ],
        },
        {
          type: "quiz",
          title: "Packaging",
          passPercent: 60,
          questions: [
            {
              question: "The three jobs of packaging are:",
              options: [
                "Protect, create micro-atmosphere, and sell",
                "Only look pretty",
                "Just hold water",
                "Only store seeds",
              ],
              answerIndex: 0,
            },
            {
              question: "Why use ventilated packaging?",
              options: [
                "Allows airflow and reduces condensation",
                "Looks professional only",
                "Keeps all air out",
                "Blocks light completely",
              ],
              answerIndex: 0,
            },
            {
              question: "How much can proper packaging reduce produce losses?",
              options: [
                "20–50%",
                "0%",
                "100%",
                "5%",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "Storage systems and pest management",
      content: [
        {
          type: "paragraph",
          text: "Storage is the pause button — if done right. Hermetic storage (airtight bags or metal silos) kills insects by depleting oxygen. Cool, dry conditions slow mold. Rodent-proof containers protect grain. Match the storage method to the crop and the climate.",
        },
        {
          type: "list",
          items: [
            "Hermetic bags (PICS bags): airtight, kills insects in 2 weeks without chemicals.",
            "Metal silos: long-term grain storage, rodent-proof, lasts 15+ years.",
            "Cool storage: 0–5°C extends shelf life of most vegetables to 2–4 weeks.",
            "Freeze storage: for high-value produce — jams, dried fruits, frozen vegetables.",
          ],
        },
        {
          type: "code",
          prompt: true,
          text: "storage-methods\n[grain]      hermetic bags or metal silos — airtight\n[vegetables] cool, dark, ventilated — 0–5°C\n[roots]      root cellar — 0–4°C, 85–95% humidity\n[fruits]     ethylene-separated — bananas away from apples",
        },
        {
          type: "quiz",
          title: "Storage systems",
          passPercent: 60,
          questions: [
            {
              question: "How do hermetic bags control insects?",
              options: [
                "Airtight seal depletes oxygen, killing insects in 2 weeks",
                "They spray chemicals",
                "They attract predators",
                "They heat up the grain",
              ],
              answerIndex: 0,
            },
            {
              question: "How long do metal silos typically last?",
              options: [
                "15+ years",
                "1 month",
                "1 week",
                "1 day",
              ],
              answerIndex: 0,
            },
            {
              question: "Why separate bananas from apples in storage?",
              options: [
                "Bananas release ethylene that ripens other fruits faster",
                "They look different",
                "Apples are heavier",
                "No reason — they can be stored together",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "Market preparation and value addition",
      content: [
        {
          type: "paragraph",
          text: "The highest-value produce is clean, graded, and attractively packaged. Sorting by size and quality lets you charge premium prices for top grades while selling lower grades to processors. Drying, juicing, and fermentation add 200–500% to raw material value.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=iWLPJCPHG3I",
          caption: "Value addition: from raw produce to premium products.",
        },
        {
          type: "list",
          items: [
            "Grading: sort by size, color, and blemish-free quality.",
            "Drying: solar dryers extend shelf life to 6–12 months for herbs and fruits.",
            "Juicing and bottling: fresh juice commands 5–10× the raw fruit price.",
            "Fermentation: pickles, kimchi, sauerkraut — shelf-stable, high margin.",
          ],
        },
        {
          type: "quiz",
          title: "Market preparation",
          passPercent: 60,
          questions: [
            {
              question: "How much value can drying, juicing, and fermentation add?",
              options: [
                "200–500%",
                "0%",
                "10%",
                "10,000%",
              ],
              answerIndex: 0,
            },
            {
              question: "What does grading produce by size and quality enable?",
              options: [
                "Premium pricing for top grades",
                "Nothing — all produce sells for the same price",
                "Faster spoilage",
                "Lower buyer trust",
              ],
              answerIndex: 0,
            },
            {
              question: "How long can solar-dried herbs last?",
              options: [
                "6–12 months",
                "1 day",
                "1 week",
                "1 hour",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
  ],
};
