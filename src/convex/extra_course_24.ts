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

/**
 * Course 24: Plant Disease Identification & Management
 * Based on the PlantVillage Dataset (54,306 images of healthy/diseased leaves)
 * Source: github.com/spmohanty/PlantVillage-Dataset
 * Covers 14 crop species and 26 diseases with visual identification.
 */

export const extraCourse24: ExtraCourse = {
  title: "Plant Disease Identification & Management",
  description:
    "Learn to identify and manage 26 plant diseases across 14 crop species using visual diagnosis, integrated pest management, and organic solutions. Based on the PlantVillage dataset of 54,306 plant leaf images.",
  category: "Plant Health",
  priceCents: 0,
  durationMinutes: 360,
  order: 24,
  instructor: "Dr. Amara Osei",
  instructorTitle: "Senior Agronomist",
  modules: [
    {
      title: "Introduction to Plant Pathology",
      content: [
        {
          type: "paragraph",
          text: "Plant disease requires three conditions to occur simultaneously: (1) A susceptible host plant, (2) A virulent pathogen, and (3) A favorable environment. Remove any one element, and disease cannot develop. Understanding this triangle is the foundation of disease management.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=aXY7UiiWVuY",
          caption: "The disease triangle — host, pathogen, and environment.",
        },
        {
          type: "list",
          items: [
            "Biotic diseases are caused by living organisms: fungi, bacteria, viruses, and nematodes.",
            "Abiotic disorders are caused by environmental factors: nutrients, water, temperature.",
            "Fungi are the most common plant pathogen, responsible for 70-80% of diseases.",
            "Early detection during incubation or early infection gives the best management chance.",
          ],
        },
        {
          type: "quiz",
          title: "Plant Pathology Basics",
          passPercent: 60,
          questions: [
            {
              question: "What are the three components of the disease triangle?",
              options: [
                "Sun, water, and soil",
                "Susceptible host, virulent pathogen, favorable environment",
                "Fungus, bacteria, virus",
                "Roots, stems, leaves",
              ],
              answerIndex: 1,
            },
            {
              question: "Which is the most common type of biotic plant pathogen?",
              options: ["Bacteria", "Viruses", "Fungi", "Nematodes"],
              answerIndex: 2,
            },
            {
              question: "When is the best time to detect and manage plant disease?",
              options: [
                "After harvest",
                "During the incubation or early infection stage",
                "When plants are dying",
                "Only when fruit is affected",
              ],
              answerIndex: 1,
            },
          ],
        },
      ],
    },
    {
      title: "Visual Disease Diagnosis",
      content: [
        {
          type: "paragraph",
          text: "Plant disease symptoms fall into categories: (1) Spots — localized dead tissue; (2) Blight — rapid, widespread tissue death; (3) Wilt — loss of turgor due to vascular infection; (4) Rot — soft, decaying tissue; (5) Mildew — powdery or downy fungal growth on surfaces; (6) Mosaic — mottled light/dark green patterns from viral infection.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=7gHOOZcpXbs",
          caption: "Visual diagnosis — recognizing symptom patterns in the field.",
        },
        {
          type: "paragraph",
          text: "The PlantVillage dataset covers disease identification across 14 crops: Apple, Blueberry, Cherry, Corn, Grape, Orange, Peach, Pepper, Potato, Raspberry, Soybean, Squash, Strawberry, and Tomato. Lesion patterns are key to diagnosis: concentric rings suggest Alternaria; white powdery coating is powdery mildew; mosaic patterns indicate viral infection.",
        },
        {
          type: "list",
          items: [
            "Concentric ring spots suggest Alternaria (early blight).",
            "White powdery coating on leaves indicates powdery mildew.",
            "Mosaic patterns — mottled light and dark green — signal viral infection.",
            "Yellow halos around spots often indicate bacterial pathogens.",
          ],
        },
        {
          type: "quiz",
          title: "Visual Diagnosis",
          passPercent: 60,
          questions: [
            {
              question: "What does a white powdery coating on leaves typically indicate?",
              options: [
                "Bacterial infection",
                "Powdery mildew (fungal)",
                "Viral mosaic",
                "Nutrient deficiency",
              ],
              answerIndex: 1,
            },
            {
              question: "How many crop species does the PlantVillage dataset cover?",
              options: ["5", "10", "14", "20"],
              answerIndex: 2,
            },
            {
              question: "What does a mosaic pattern on leaves usually indicate?",
              options: [
                "Fungal infection",
                "Bacterial wilt",
                "Viral infection",
                "Chemical burn",
              ],
              answerIndex: 2,
            },
          ],
        },
      ],
    },
    {
      title: "Fungal Diseases: Identification & Control",
      content: [
        {
          type: "paragraph",
          text: "Fungal diseases account for 70-80% of plant diseases. Key fungal pathogens include: (1) Alternaria — causes early blight with concentric ring spots; (2) Phytophthora — causes late blight with dark, water-soaked lesions; (3) Fusarium — causes wilt and root rot; (4) Septoria — causes leaf spot; (5) Botrytis — causes gray mold on fruits and flowers.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=xJrGeLd-iy8",
          caption: "Fungal disease life cycles and organic control methods.",
        },
        {
          type: "paragraph",
          text: "Organic approaches include: (1) Copper-based fungicides; (2) Neem oil — disrupts fungal cell membranes; (3) Bacillus subtilis — beneficial bacteria that outcompete pathogens; (4) Sulfur — classic fungicide for powdery mildew; (5) Crop rotation — breaks disease cycles; (6) Resistant varieties — the most effective long-term strategy.",
        },
        {
          type: "list",
          items: [
            "Ensure good air circulation through proper spacing.",
            "Water at the base of plants, not overhead.",
            "Remove and destroy infected plant material.",
            "Rotate crops on a 3-4 year cycle to break disease cycles.",
          ],
        },
        {
          type: "quiz",
          title: "Fungal Diseases",
          passPercent: 60,
          questions: [
            {
              question: "What percentage of plant diseases are caused by fungi?",
              options: ["10-20%", "30-40%", "50-60%", "70-80%"],
              answerIndex: 3,
            },
            {
              question: "Which organic treatment is most effective against powdery mildew?",
              options: ["Copper spray", "Sulfur", "Neem oil", "Bacillus subtilis"],
              answerIndex: 1,
            },
            {
              question: "What is the most effective long-term strategy for fungal diseases?",
              options: [
                "Weekly fungicide sprays",
                "Resistant varieties",
                "Increasing irrigation",
                "Planting monocultures",
              ],
              answerIndex: 1,
            },
          ],
        },
      ],
    },
    {
      title: "Bacterial & Viral Diseases",
      content: [
        {
          type: "paragraph",
          text: "Bacterial diseases often present as water-soaked spots, angular leaf spots bounded by veins, sudden wilting, or soft rot. Key bacterial pathogens include Pseudomonas, Xanthomonas, Erwinia, and Agrobacterium. Bacterial diseases are harder to treat than fungal — copper-based sprays provide some control.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=Z-zNHHpXoMM",
          caption: "Identifying and managing bacterial and viral plant diseases.",
        },
        {
          type: "paragraph",
          text: "Viral diseases cause mosaic patterns, leaf curling, stunting, and ring spots. No cure exists for viral infections — management focuses on prevention: control insect vectors, remove infected plants immediately, use virus-free certified seed, and disinfect tools between plants.",
        },
        {
          type: "list",
          items: [
            "No cure exists for viral infections in plants — prevention is the only option.",
            "Viruses are spread by insect vectors (aphids, whiteflies) and contaminated tools.",
            "Use drip irrigation to keep foliage dry and reduce bacterial spread.",
            "Remove and destroy infected plants immediately to prevent spread.",
          ],
        },
        {
          type: "quiz",
          title: "Bacterial & Viral Diseases",
          passPercent: 60,
          questions: [
            {
              question: "Why are bacterial diseases harder to manage than fungal diseases?",
              options: [
                "Bacteria are smaller",
                "Fewer effective treatments exist and they spread rapidly",
                "Bacteria only affect roots",
                "Fungicides also kill bacteria",
              ],
              answerIndex: 1,
            },
            {
              question: "What is the primary way viral plant diseases are spread?",
              options: [
                "Wind only",
                "Water splash only",
                "Insect vectors (aphids, whiteflies) and contaminated tools",
                "Soil contact only",
              ],
              answerIndex: 2,
            },
            {
              question: "Can viral plant diseases be cured once a plant is infected?",
              options: [
                "Yes, with antibiotics",
                "Yes, with fungicides",
                "No — prevention and removal are the only options",
                "Yes, with antiviral drugs",
              ],
              answerIndex: 2,
            },
          ],
        },
      ],
    },
    {
      title: "Integrated Pest Management (IPM)",
      content: [
        {
          type: "paragraph",
          text: "IPM uses a tiered approach: (1) Prevention — resistant varieties, crop rotation, sanitation (foundation); (2) Monitoring — regular scouting, trapping, weather monitoring; (3) Biological control — beneficial insects, microbial agents; (4) Cultural control — timing, spacing, irrigation management; (5) Chemical control — targeted, least-toxic options as last resort.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=eVajQPuRmk8",
          caption: "Integrated Pest Management — a holistic approach to crop protection.",
        },
        {
          type: "paragraph",
          text: "Beneficial organisms that suppress pathogens and pests: Trichoderma fungi attack disease-causing fungi in soil; Bacillus thuringiensis (Bt) controls caterpillars; predatory mites control spider mites; ladybugs and lacewings consume aphids. Walk fields 2-3 times per week and begin treatment when 10% of plants show symptoms.",
        },
        {
          type: "list",
          items: [
            "Prevention is the foundation of IPM — resistant varieties and crop rotation.",
            "Begin treatment when 10% of plants show disease symptoms.",
            "Trichoderma fungi attack disease-causing pathogens in soil.",
            "Keep records of disease incidence, location, and weather conditions.",
          ],
        },
        {
          type: "quiz",
          title: "Integrated Pest Management",
          passPercent: 60,
          questions: [
            {
              question: "What is the foundation of the IPM pyramid?",
              options: [
                "Chemical pesticides",
                "Biological control",
                "Prevention through resistant varieties, rotation, and sanitation",
                "Regular scouting",
              ],
              answerIndex: 2,
            },
            {
              question: "At what disease incidence threshold should you begin treatment?",
              options: ["1%", "5%", "10%", "25%"],
              answerIndex: 2,
            },
            {
              question: "Which biological control agent attacks disease-causing fungi in soil?",
              options: [
                "Ladybugs",
                "Bacillus thuringiensis",
                "Trichoderma fungi",
                "Parasitic wasps",
              ],
              answerIndex: 2,
            },
          ],
        },
      ],
    },
    {
      title: "Disease-Resistant Variety Selection",
      content: [
        {
          type: "paragraph",
          text: "Disease resistance varies by variety. Resistance can be: (1) Complete — variety is immune; (2) Partial — reduced symptoms but still infected; (3) Tolerance — infected but maintains yield; (4) Field resistance — effective under field conditions but not in controlled tests.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=BggoEriIKLo",
          caption: "Using disease resistance data to select the best varieties for your farm.",
        },
        {
          type: "paragraph",
          text: "Identify the diseases most common in your area, then select varieties with resistance to those specific pathogens. Many resistance genes are named: Vf protects against apple scab; Ph protects against potato late blight; Tm-2 protects against tomato mosaic virus. Combine resistant varieties with crop rotation and good sanitation for a layered defense.",
        },
        {
          type: "list",
          items: [
            "Choose resistant varieties as the first line of defense.",
            "Match resistance to the 2-3 diseases most common in YOUR area.",
            "A variety resistant to late blight may not resist early blight.",
            "Combine resistance with crop rotation and good sanitation.",
          ],
        },
        {
          type: "quiz",
          title: "Disease Resistance",
          passPercent: 60,
          questions: [
            {
              question: "What does 'partial resistance' mean in a plant variety?",
              options: [
                "The variety is immune to all diseases",
                "The variety shows reduced symptoms but can still be infected",
                "The variety has no resistance at all",
                "The variety is only resistant when young",
              ],
              answerIndex: 1,
            },
            {
              question: "Why is it important to match resistance to diseases in YOUR area?",
              options: [
                "All diseases are the same everywhere",
                "Resistance is universal across all pathogens",
                "Different regions have different disease pressures",
                "Resistance genes work the same in all climates",
              ],
              answerIndex: 2,
            },
            {
              question: "What does the 'Vf' resistance gene protect against?",
              options: [
                "Late blight in potatoes",
                "Apple scab",
                "Tomato mosaic virus",
                "Bacterial wilt",
              ],
              answerIndex: 1,
            },
          ],
        },
      ],
    },
  ],
};
