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

export const extraCourse12: ExtraCourse = {
  category: "Core Skills",
  title: "Compost, Cover Crops & Building Soil Biology",
  description:
    "Feed the living part of your soil: make compost that works, choose cover crops on purpose, and measure the biology you are building.",
  priceCents: 4900,
  durationMinutes: 18,
  order: 12,
  instructor: "Dr. Amara Osei",
  instructorTitle: "Senior Agronomist",
  modules: [
    {
      title: "Why biology comes first",
      content: [
        {
          type: "paragraph",
          text: "Soil health is a living system, and the chemistry you read in a lab report is the output of that system. Worms, fungi and bacteria build structure, recycle nutrients and suppress disease. Feed them, and the chemistry follows; starve them, and no amount of fertilizer replaces them.",
        },
        {
          type: "list",
          items: [
            "Soil biology builds the structure chemistry depends on.",
            "Microbes recycle nutrients into plant-available forms.",
            "Biological activity suppresses disease pressure.",
            "Fertilizer feeds the crop; compost and residue feed the system.",
          ],
        },
        {
          type: "quiz",
          title: "Biology first",
          passPercent: 60,
          questions: [
            {
              question: "What do microbes do with nutrients?",
              options: [
                "Recycle them into plant-available forms",
                "Destroy them",
                "Nothing at all",
                "Store them forever",
              ],
              answerIndex: 0,
            },
            {
              question: "Fertilizer feeds the crop. What feeds the system?",
              options: [
                "Compost and residue",
                "More fertilizer",
                "Herbicide",
                "Nothing",
              ],
              answerIndex: 0,
            },
            {
              question: "Healthy biology helps suppress:",
              options: [
                "Disease pressure",
                "Crop growth",
                "Water infiltration",
                "Root depth",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "Making compost that works",
      content: [
        {
          type: "paragraph",
          text: "Compost is a recipe, not a pile of leftovers. Aim for roughly twenty-five to thirty parts carbon to one part nitrogen, keep the pile as wet as a wrung-out sponge, and turn it when the core cools. A working pile heats, steams and shrinks — those are the signs the biology is doing its job.",
        },
        {
          type: "note",
          tone: "warn",
          text: "A cold, wet, slimy pile is starving for air or carbon. If it smells like ammonia, add carbon; if it smells rotten, turn it.",
        },
        {
          type: "quiz",
          title: "Making compost",
          passPercent: 60,
          questions: [
            {
              question: "The working carbon-to-nitrogen range is about:",
              options: ["25–30 to 1", "1 to 100", "50 to 50", "Any ratio works"],
              answerIndex: 0,
            },
            {
              question: "Moisture should feel like:",
              options: [
                "A wrung-out sponge",
                "A swimming pool",
                "Bone dry",
                "Steam",
              ],
              answerIndex: 0,
            },
            {
              question: "An ammonia smell means the pile needs:",
              options: [
                "More carbon",
                "More nitrogen",
                "More water",
                "Less turning",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "Using compost well",
      content: [
        {
          type: "paragraph",
          text: "Compost improves soil over years, not days. Apply it at the right rate — usually a few centimetres or tonnes per hectare, not a mountain — and work it where the roots live. Its job is to feed the biology and buffer the soil, not to replace fertilizer this season.",
        },
        {
          type: "list",
          items: [
            "Compost is a long-term soil investment, not a quick fix.",
            "Rates are modest — match the crop and soil, not the trailer.",
            "Place it where roots and microbes meet.",
            "It buffers soil and feeds biology; fertilizer still feeds the crop.",
          ],
        },
        {
          type: "quiz",
          title: "Using compost",
          passPercent: 60,
          questions: [
            {
              question: "Compost improves soil over:",
              options: ["Years, not days", "Hours", "A single watering", "Never"],
              answerIndex: 0,
            },
            {
              question: "A good application rate is:",
              options: [
                "Modest and matched to the soil",
                "As much as the trailer holds",
                "None — it is useless",
                "Any amount, always",
              ],
              answerIndex: 0,
            },
            {
              question: "Compost's main job is:",
              options: [
                "Feeding biology and buffering soil",
                "Replacing all fertilizer",
                "Killing weeds",
                "Raising pH instantly",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "Choosing & planting cover crops",
      content: [
        {
          type: "paragraph",
          text: "A cover crop is planted for what it does after the main crop, not for harvest. Grasses build organic matter fast, legumes fix nitrogen, and deep taproots break compaction. Choose by the goal — then plant early enough that the cover actually establishes before winter.",
        },
        {
          type: "code",
          prompt: true,
          text: "cover plan --field-12\n[ok] goal      nitrogen + organic matter\n[ok] species   vetch + oats mix\n[ok] seed      55 kg/ha\n[ok] window    plant by Sep 20 · before first frost\n[ok] terminate spring · before flowering",
        },
        {
          type: "quiz",
          title: "Cover crops",
          passPercent: 60,
          questions: [
            {
              question: "What are cover crops planted for?",
              options: [
                "What they do after the main crop",
                "Harvest",
                "Decoration",
                "Shade",
              ],
              answerIndex: 0,
            },
            {
              question: "Which cover crop fixes nitrogen?",
              options: ["Legumes", "Grasses", "Weeds", "None of them"],
              answerIndex: 0,
            },
            {
              question: "The sample plan schedules termination:",
              options: [
                "In spring, before flowering",
                "In winter",
                "Never",
                "At harvest",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "The rotation effect",
      content: [
        {
          type: "paragraph",
          text: "Rotation is how you make biology work for you across the whole year. Different root systems feed different microbial communities, residue from one crop feeds the next, and breaking pest cycles beats fighting them. The sequence matters more than any single practice.",
        },
        {
          type: "list",
          items: [
            "Different roots feed different microbial communities.",
            "Residue from one crop feeds the next.",
            "Rotation breaks pest and disease cycles.",
            "The sequence matters more than any single practice.",
          ],
        },
        {
          type: "quiz",
          title: "Rotation",
          passPercent: 60,
          questions: [
            {
              question: "Different root systems:",
              options: [
                "Feed different microbial communities",
                "All do the same thing",
                "Kill microbes",
                "Only matter underground",
              ],
              answerIndex: 0,
            },
            {
              question: "Rotation breaks:",
              options: [
                "Pest and disease cycles",
                "The weather",
                "Fertilizer",
                "Nothing at all",
              ],
              answerIndex: 0,
            },
            {
              question: "What matters most in a rotation?",
              options: [
                "The sequence",
                "The field shape",
                "The fence line",
                "Nothing",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "Measuring progress",
      content: [
        {
          type: "paragraph",
          text: "Biology is slower than chemistry, so measure what you can see and keep records. Earthworm counts, infiltration rate, residue cover and how fast a test strip of cloth or cotton breaks down are all cheap indicators. Year over year, the trend — not the snapshot — is the truth.",
        },
        {
          type: "code",
          prompt: true,
          text: "soil check --field-12 --autumn\n[ok] earthworms   9 per shovel · up from 4\n[ok] infiltration 4.2 cm/min · up from 2.1\n[ok] residue      78% cover · target > 70%\n[ok] cotton strip 45% gone in 30 days\n[info] trend improving — keep the rotation",
        },
        {
          type: "quiz",
          title: "Measuring",
          passPercent: 60,
          questions: [
            {
              question: "Which are cheap indicators of soil biology?",
              options: [
                "Earthworms, infiltration, residue cover",
                "Only lab DNA tests",
                "Crop height",
                "Fertilizer price",
              ],
              answerIndex: 0,
            },
            {
              question: "What is the truth about soil biology over time?",
              options: [
                "The trend, not the snapshot",
                "The snapshot, always",
                "The lab bill",
                "Nothing",
              ],
              answerIndex: 0,
            },
            {
              question: "The sample check shows earthworms:",
              options: [
                "Up from 4 to 9 per shovel",
                "Down to zero",
                "Never counted",
                "Holding at 2",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
  ],
};
