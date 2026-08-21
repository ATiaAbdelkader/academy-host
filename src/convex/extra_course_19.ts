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

export const extraCourse19: ExtraCourse = {
  category: "Livestock & Pollinators",
  title: "Beekeeping & Pollination Services",
  description:
    "Start a beekeeping operation and offer pollination services to neighboring farms. From hive setup to honey extraction and colony management.",
  priceCents: 6900,
  durationMinutes: 30,
  order: 19,
  instructor: "Samuel Otieno",
  instructorTitle: "Apiarist & Pollination Consultant",
  modules: [
    {
      title: "The hive and its inhabitants",
      content: [
        {
          type: "paragraph",
          text: "A honeybee colony is a superorganism: the queen lays eggs, workers build comb and forage, drones mate with new queens. Understanding the caste system is the foundation of beekeeping — you are managing a society, not individual insects.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=YqYRJ5jhjTQ",
          caption: "Inside the hive — roles of queen, worker, and drone.",
        },
        {
          type: "list",
          items: [
            "Queen: one per colony, lays up to 2,000 eggs per day in peak season.",
            "Workers: female, do all foraging, brood care, and defense. Live 6 weeks in summer.",
            "Drones: male, live to mate with a queen from another colony. Evicted in autumn.",
            "A strong colony has 40,000–60,000 bees at peak population.",
          ],
        },
        {
          type: "quiz",
          title: "Hive roles",
          passPercent: 60,
          questions: [
            {
              question: "How many eggs can a healthy queen lay per day in peak season?",
              options: [
                "Up to 2,000",
                "10",
                "100",
                "50,000",
              ],
              answerIndex: 0,
            },
            {
              question: "What do worker bees do?",
              options: [
                "All foraging, brood care, and defense",
                "Only lay eggs",
                "Nothing — they rest",
                "Only fight predators",
              ],
              answerIndex: 0,
            },
            {
              question: "How many bees are in a strong colony at peak?",
              options: [
                "40,000–60,000",
                "100",
                "10",
                "1 million",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "Equipment and hive setup",
      content: [
        {
          type: "paragraph",
          text: "The Langstroth hive is the standard: stacked boxes with movable frames. Start with two deep brood boxes and two medium honey supers. A smoker, hive tool, and protective veil are the three essential tools. Total startup cost is $200–$400 per hive.",
        },
        {
          type: "list",
          items: [
            "Langstroth hive: 10-frame deep boxes for brood, medium boxes for honey.",
            "Smoker: calms bees with cool smoke — use pine needles or burlap.",
            "Hive tool: prying apart propolis-sealed frames.",
            "Veil and gloves: minimum protection; full suit for aggressive colonies.",
            "Location: face hive entrance south or east, elevated 45–90 cm off the ground.",
          ],
        },
        {
          type: "code",
          prompt: true,
          text: "hive-setup-check\n[hive]    2 deep brood boxes + 2 medium supers\n[tools]   smoker + hive tool + veil\n[location] south-facing, elevated 45–90 cm\n[cost]    $200–$400 per hive startup",
        },
        {
          type: "quiz",
          title: "Equipment",
          passPercent: 60,
          questions: [
            {
              question: "Which hive type is the standard for commercial beekeeping?",
              options: [
                "Langstroth",
                "Log hive",
                "Top bar only",
                "Cardboard box",
              ],
              answerIndex: 0,
            },
            {
              question: "What should a smoker use for fuel?",
              options: [
                "Pine needles or burlap",
                "Gasoline",
                "Paper with ink",
                "Plastic",
              ],
              answerIndex: 0,
            },
            {
              question: "Hive entrance should face which direction?",
              options: [
                "South or east",
                "North",
                "Underground",
                "West only",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "Installing a package and establishing a colony",
      content: [
        {
          type: "paragraph",
          text: "A package contains 3 lbs of bees (about 10,000) and a caged queen. Shake them into the hive, release the queen after 3 days, and feed 1:1 sugar syrup until natural nectar flows. The first 6 weeks are critical — the colony must build comb and raise brood before winter.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=Loe2MH8D6Mg",
          caption: "Installing a package of bees — step by step.",
        },
        {
          type: "list",
          items: [
            "Feed 1:1 sugar syrup continuously until natural nectar is available.",
            "Queen release: wait 3 days so bees accept her scent before opening the cage.",
            "First inspection: check for eggs after 7 days — confirms queen is laying.",
            "Do not harvest honey in the first year — let the colony build reserves.",
          ],
        },
        {
          type: "quiz",
          title: "Colony establishment",
          passPercent: 60,
          questions: [
            {
              question: "How long should you wait before releasing the queen from her cage?",
              options: [
                "3 days",
                "Immediately",
                "30 days",
                "1 hour",
              ],
              answerIndex: 0,
            },
            {
              question: "When should you first check for eggs after installing bees?",
              options: [
                "After 7 days",
                "After 1 year",
                "Immediately",
                "Never",
              ],
              answerIndex: 0,
            },
            {
              question: "Should you harvest honey in the first year?",
              options: [
                "No — let the colony build reserves",
                "Yes — take all of it",
                "Only in winter",
                "Only if the queen is dead",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "Seasonal management and swarm prevention",
      content: [
        {
          type: "paragraph",
          text: "Swarming is the colony's natural reproduction — half the bees leave with the old queen to start a new hive. Swarm prevention means giving bees enough space, managing the brood nest, and recognizing queen cells before they cap. A swarm costs you 50% of your workforce and your honey crop.",
        },
        {
          type: "list",
          items: [
            "Add honey supers before the colony fills the last box — congestion triggers swarming.",
            "Inspect every 7–10 days in spring for queen cells.",
            "Clip the queen's wing on one side — if she tries to swarm, she falls and returns.",
            "Split strong colonies in spring: remove frames of brood to make new hives.",
          ],
        },
        {
          type: "note",
          tone: "warn",
          text: "By the time you see a capped queen cell, swarming may be imminent. Inspect weekly in spring — you cannot prevent a swarm from cells that are already capped.",
        },
        {
          type: "quiz",
          title: "Swarm prevention",
          passPercent: 60,
          questions: [
            {
              question: "What triggers swarming in a colony?",
              options: [
                "Congestion and lack of space",
                "Too much honey",
                "Cold weather",
                "Too many drones",
              ],
              answerIndex: 0,
            },
            {
              question: "How often should you inspect for queen cells in spring?",
              options: [
                "Every 7–10 days",
                "Once per year",
                "Never",
                "Every hour",
              ],
              answerIndex: 0,
            },
            {
              question: "What does clipping the queen's wing do?",
              options: [
                "If she tries to swarm, she falls and returns to the hive",
                "Kills the queen",
                "Makes honey faster",
                "Prevents egg laying",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "Honey extraction and processing",
      content: [
        {
          type: "paragraph",
          text: "Harvest when frames are at least 80% capped — uncapped honey has too much moisture and will ferment. Remove bees with a bee escape or fume board, uncap cells with a heated knife, and spin in an extractor. Filter, bottle, and store below 20°C to prevent granulation.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=nHMaJRQGGeE",
          caption: "Honey extraction — from comb to bottle.",
        },
        {
          type: "list",
          items: [
            "Only harvest from frames that are 80%+ capped.",
            "Bee escape boards clear bees from supers in 24 hours — no chemicals.",
            "Heated uncapping knife slices off wax caps cleanly.",
            "Extracted honey must be filtered through 400-micron mesh minimum.",
            "Store honey below 20°C to slow granulation.",
          ],
        },
        {
          type: "quiz",
          title: "Harvesting honey",
          passPercent: 60,
          questions: [
            {
              question: "What percentage of cells should be capped before harvesting?",
              options: [
                "80%+",
                "10%",
                "100% always",
                "50%",
              ],
              answerIndex: 0,
            },
            {
              question: "What does a bee escape board do?",
              options: [
                "Clears bees from supers in 24 hours without chemicals",
                "Kills all bees",
                "Attracts more bees",
                "Produces wax",
              ],
              answerIndex: 0,
            },
            {
              question: "At what temperature should extracted honey be stored?",
              options: [
                "Below 20°C",
                "Above 40°C",
                "Room temperature always",
                "Frozen",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "Pollination services and farm contracts",
      content: [
        {
          type: "paragraph",
          text: "Pollination services are the highest-value output of beekeeping — farmers pay $50–$150 per hive for crop pollination. Almonds, apples, blueberries, and cucumbers all depend on managed pollination. A single pollination contract can exceed an entire season's honey revenue.",
        },
        {
          type: "list",
          items: [
            "Almond pollination in California: $50–$200 per hive per season.",
            "Contract early: pollination agreements are signed 6+ months in advance.",
            "Strong colonies of 8+ frames of bees are the minimum for pollination.",
            "Diversify: pollination services, honey production, queen rearing, and beeswax products.",
          ],
        },
        {
          type: "note",
          tone: "info",
          text: "Transport hives at night when all bees are inside. Move hives early morning or after dark to avoid losing foragers who fly home to the old location.",
        },
        {
          type: "quiz",
          title: "Pollination business",
          passPercent: 60,
          questions: [
            {
              question: "How much can farmers pay per hive for almond pollination?",
              options: [
                "$50–$200 per season",
                "$1 per season",
                "Nothing — pollination is free",
                "$1,000 per day",
              ],
              answerIndex: 0,
            },
            {
              question: "How far in advance are pollination contracts typically signed?",
              options: [
                "6+ months",
                "The day before",
                "Never — they are informal",
                "2 years",
              ],
              answerIndex: 0,
            },
            {
              question: "When should you transport hives?",
              options: [
                "At night when all bees are inside",
                "During midday",
                "During rush hour",
                "It doesn't matter",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
  ],
};
