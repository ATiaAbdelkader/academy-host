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

export const extraCourse11: ExtraCourse = {
  category: "Core Skills",
  title: "Greenhouse & Protected Cropping",
  description:
    "Run a greenhouse like a control system: climate, water, light and pests under one roof — and a plan for each.",
  priceCents: 7900,
  durationMinutes: 24,
  order: 11,
  instructor: "Dr. Nia Okonkwo",
  instructorTitle: "Protected Cropping Specialist",
  modules: [
    {
      title: "Why grow under cover",
      content: [
        {
          type: "paragraph",
          text: "A greenhouse is a machine for making the season longer and the weather smaller. Structure, covering, vents, heating and irrigation work as one system — and the operator is the control loop. Understand the system, and every module after this one is a dial you can turn.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=peKuQovaL2E",
          caption: "Why greenhouse growers automate climate — JM Fortier.",
        },
        {
          type: "list",
          items: [
            "Protected cropping extends the growing season.",
            "Everything — climate, water, light — is one system.",
            "The operator is the control loop.",
            "Small mistakes under cover compound faster than outside.",
          ],
        },
        {
          type: "quiz",
          title: "Under cover",
          passPercent: 60,
          questions: [
            {
              question: "What does a greenhouse fundamentally do?",
              options: [
                "Makes the season longer and the weather smaller",
                "Replaces the sun",
                "Removes all pests",
                "Grows plants without water",
              ],
              answerIndex: 0,
            },
            {
              question: "Who is the control loop in a greenhouse?",
              options: [
                "The operator",
                "The thermostat alone",
                "The crop",
                "No one",
              ],
              answerIndex: 0,
            },
            {
              question: "Why do small mistakes compound under cover?",
              options: [
                "The system concentrates conditions",
                "They do not",
                "Greenhouses are forgiving",
                "Only in winter",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "Temperature & humidity",
      content: [
        {
          type: "paragraph",
          text: "Plants transpire, and transpiration fills the air with water. Temperature and humidity move together: heat the air and humidity drops, vent and it drops further. Keep the two in balance — hot and humid is the fastest route to disease under cover.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=mjuNOhciJ1Q",
          caption: "Greenhouse climate controls: temperature and humidity.",
        },
        {
          type: "note",
          tone: "warn",
          text: "Hot plus humid is the disease recipe. If condensation forms on the covering at dawn, yesterday's ventilation was not enough.",
        },
        {
          type: "quiz",
          title: "Climate",
          passPercent: 60,
          questions: [
            {
              question: "What happens to humidity when you heat the air?",
              options: ["It drops", "It rises", "Nothing", "It becomes dew"],
              answerIndex: 0,
            },
            {
              question: "What is the fastest route to disease under cover?",
              options: [
                "Hot and humid",
                "Cold and dry",
                "Bright and airy",
                "Dark and cool",
              ],
              answerIndex: 0,
            },
            {
              question: "Condensation on the covering at dawn means:",
              options: [
                "Yesterday's ventilation was not enough",
                "The crop is healthy",
                "Heating is perfect",
                "Nothing at all",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "Water & fertigation",
      content: [
        {
          type: "paragraph",
          text: "Under cover, every drop is scheduled. Drip lines deliver water and nutrients together — fertigation — and the crop reads the EC and pH of that mix all day long. Measure EC and pH of the feed at least daily, and flush the lines when salts climb.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=9515Gge54qg",
          caption: "Automating the environment — the control loop behind watering and feeding.",
        },
        {
          type: "code",
          prompt: true,
          text: "fertigation --bay-2 --morning\n[ok] ec      1.8 mS/cm (target 1.6–2.0)\n[ok] ph      6.1     (target 5.8–6.3)\n[ok] feed    04:00–06:30 · drip\n[warn] ec rising — flush lines tonight",
        },
        {
          type: "quiz",
          title: "Fertigation",
          passPercent: 60,
          questions: [
            {
              question: "What does fertigation deliver?",
              options: [
                "Water and nutrients together",
                "Only water",
                "Only light",
                "Carbon dioxide",
              ],
              answerIndex: 0,
            },
            {
              question: "The sample readout flags:",
              options: [
                "Rising EC — flush the lines",
                "Low pH",
                "A broken pump",
                "Nothing at all",
              ],
              answerIndex: 0,
            },
            {
              question: "When salts climb in the root zone, you should:",
              options: [
                "Flush the lines",
                "Add more fertilizer",
                "Raise the temperature",
                "Ignore it",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "Light & season planning",
      content: [
        {
          type: "paragraph",
          text: "Light drives everything: photosynthesis, temperature, and what the crop is willing to flower or fruit. Plan the season around the light curve, not the calendar — sow for the light that will arrive, and shade or screen when summer light tops what the crop can use.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=y_INtqeIRtc",
          caption: "Walking through a full greenhouse climate setup.",
        },
        {
          type: "list",
          items: [
            "Light, not the calendar, sets the real season.",
            "Sow for the light that will arrive at flowering.",
            "Summer light above the crop's capacity needs shading.",
            "Long-day and short-day crops respond to day length.",
          ],
        },
        {
          type: "quiz",
          title: "Light",
          passPercent: 60,
          questions: [
            {
              question: "What drives photosynthesis and flowering under cover?",
              options: [
                "Light",
                "The calendar",
                "The fan speed",
                "Fertilizer colour",
              ],
              answerIndex: 0,
            },
            {
              question: "When summer light tops what the crop can use:",
              options: [
                "Shade or screen",
                "Remove the covering",
                "Add more fertilizer",
                "Do nothing",
              ],
              answerIndex: 0,
            },
            {
              question: "Why plan around the light curve?",
              options: [
                "Sow for the light that will arrive",
                "The calendar is always wrong",
                "Light does not matter",
                "To confuse the plants",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "Pests & disease under cover",
      content: [
        {
          type: "paragraph",
          text: "Under cover, a pest population doubles faster than outside — warmth and no rain give it a head start. Walk the crop twice a week, check the undersides of leaves, and act on the first hotspot. Integrated pest management means beneficials first, sprays only when thresholds say so.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=lIzh9ua1iVk",
          caption: "IPM — how integrated pest management works under cover.",
        },
        {
          type: "list",
          items: [
            "Warmth and shelter let pests multiply faster under cover.",
            "Walk twice a week and check leaf undersides.",
            "Act on the first hotspot — do not wait for the whole house.",
            "Beneficials first; sprays only when thresholds say so.",
          ],
        },
        {
          type: "quiz",
          title: "Pests under cover",
          passPercent: 60,
          questions: [
            {
              question: "Why do pests multiply faster under cover?",
              options: [
                "Warmth and no rain",
                "They like plastic",
                "They do not",
                "The lights confuse them",
              ],
              answerIndex: 0,
            },
            {
              question: "How often should you walk the crop?",
              options: [
                "Twice a week",
                "Once a season",
                "Only when plants look sick",
                "Never",
              ],
              answerIndex: 0,
            },
            {
              question: "What is the first move on a pest hotspot?",
              options: [
                "Act on it immediately",
                "Wait for the whole house",
                "Remove the whole crop",
                "Stop watering",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "Structures & maintenance",
      content: [
        {
          type: "paragraph",
          text: "The structure is the climate machine's housing, and it needs a routine. Clean the covering for light, check vents and fans, calibrate sensors, and fix small leaks before they become big ones. A well-maintained house is cheaper to run and easier to control.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=NtnV_gviDfY",
          caption: "Know your structures: the components of a smart greenhouse.",
        },
        {
          type: "note",
          tone: "info",
          text: "Calibrate sensors at least twice a season — a drifting temperature sensor quietly rewrites your whole climate strategy.",
        },
        {
          type: "quiz",
          title: "Maintenance",
          passPercent: 60,
          questions: [
            {
              question: "Why clean the covering?",
              options: [
                "Light transmission drops with dirt",
                "It looks better",
                "Birds nest in it",
                "No reason",
              ],
              answerIndex: 0,
            },
            {
              question: "What does a drifting sensor do?",
              options: [
                "Silently rewrites your climate strategy",
                "Beeps loudly",
                "Fixes itself",
                "Only matters in winter",
              ],
              answerIndex: 0,
            },
            {
              question: "Sensors should be calibrated:",
              options: [
                "At least twice a season",
                "Once a decade",
                "Never",
                "Only after a crop failure",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
  ],
};
