/**
 * Course 24: Plant Disease Identification & Management
 * Based on the PlantVillage Dataset (54,306 images of healthy/diseased leaves)
 * Source: github.com/spmohanty/PlantVillage-Dataset
 * Covers 14 crop species and 26 diseases with visual identification.
 */

export const extraCourse24 = {
  title: "Plant Disease Identification & Management",
  slug: "plant-disease-identification",
  description:
    "Learn to identify and manage 26 plant diseases across 14 crop species using visual diagnosis, integrated pest management, and organic solutions. Based on the PlantVillage dataset of 54,306 plant leaf images.",
  category: "Plant Health",
  priceCents: 0,
  durationMinutes: 360,
  published: true,
  order: 24,
  modules: [
    {
      title: "Introduction to Plant Pathology",
      description:
        "Understand the disease triangle, how plant diseases develop, and the difference between biotic and abiotic disorders.",
      contentBlocks: [
        {
          type: "heading" as const,
          content: "The Disease Triangle",
        },
        {
          type: "paragraph" as const,
          content:
            "Plant disease requires three conditions to occur simultaneously: (1) A susceptible host plant, (2) A virulent pathogen, and (3) A favorable environment. Remove any one element, and disease cannot develop. Understanding this triangle is the foundation of disease management.",
        },
        {
          type: "heading" as const,
          content: "Biotic vs Abiotic Disorders",
        },
        {
          type: "paragraph" as const,
          content:
            "Biotic diseases are caused by living organisms: fungi (most common), bacteria, viruses, and nematodes. Abiotic disorders are caused by environmental factors: nutrient deficiencies, water stress, temperature extremes, chemical damage, and physical injury. Proper diagnosis requires distinguishing between these two categories.",
        },
        {
          type: "heading" as const,
          content: "Disease Progression Stages",
        },
        {
          type: "paragraph" as const,
          content:
            "Disease progresses through stages: (1) Incubation — pathogen establishes but no symptoms visible; (2) Infection — visible symptoms appear; (3) Sporulation — pathogen produces reproductive structures; (4) Dispersal — pathogen spreads to new hosts. Early detection during incubation or early infection gives the best chance of successful management.",
        },
        {
          type: "quiz" as const,
          quiz: {
            title: "Plant Pathology Basics",
            questions: [
              {
                question: "What are the three components of the disease triangle?",
                options: [
                  "Sun, water, and soil",
                  "Susceptible host, virulent pathogen, favorable environment",
                  "Fungus, bacteria, virus",
                  "Roots, stems, leaves",
                ],
                correctIndex: 1,
                explanation:
                  "The disease triangle consists of a susceptible host, a virulent pathogen, and favorable environmental conditions. All three must be present for disease to occur.",
              },
              {
                question: "Which is the most common type of biotic plant pathogen?",
                options: [
                  "Bacteria",
                  "Viruses",
                  "Fungi",
                  "Nematodes",
                ],
                correctIndex: 2,
                explanation:
                  "Fungi are the most common cause of plant diseases, responsible for approximately 70-80% of all plant diseases.",
              },
              {
                question: "When is the best time to detect and manage plant disease?",
                options: [
                  "After harvest",
                  "During the incubation or early infection stage",
                  "When plants are dying",
                  "Only when fruit is affected",
                ],
                correctIndex: 1,
                explanation:
                  "Early detection during incubation or early infection gives the best chance of successful management before the pathogen spreads.",
              },
            ],
          },
        },
      ],
    },
    {
      title: "Visual Disease Diagnosis",
      description:
        "Master the art of visual diagnosis using symptom patterns, lesion types, and the PlantVillage identification framework covering 14 crop species.",
      contentBlocks: [
        {
          type: "heading" as const,
          content: "Symptom Categories",
        },
        {
          type: "paragraph" as const,
          content:
            "Plant disease symptoms fall into categories: (1) Spots — localized dead tissue (leaf spots, fruit spots); (2) Blight — rapid, widespread tissue death; (3) Wilt — loss of turgor due to vascular infection; (4) Rot — soft, decaying tissue; (5) Mildew — powdery or downy fungal growth on surfaces; (6) Gall — abnormal tissue growth; (7) mosaic — mottled light/dark green patterns from viral infection.",
        },
        {
          type: "heading" as const,
          content: "The 14 Major Crop Species",
        },
        {
          type: "paragraph" as const,
          content:
            "The PlantVillage dataset covers disease identification across 14 crops: Apple, Blueberry, Cherry, Corn, Grape, Orange, Peach, Pepper, Potato, Raspberry, Soybean, Squash, Strawberry, and Tomato. Each species has characteristic disease patterns that trained observers can recognize.",
        },
        {
          type: "heading" as const,
          content: "Lesion Pattern Recognition",
        },
        {
          type: "paragraph" as const,
          content:
            "Lesion patterns are key to diagnosis: Concentric rings suggest Alternaria (early blight); irregular brown patches indicate bacterial infection; white powdery coating is powdery mildew; yellow halos around spots often indicate bacterial pathogens; target-like spots suggest Frogeye leaf spot.",
        },
        {
          type: "heading" as const,
          content: "Healthy vs Diseased Comparison",
        },
        {
          type: "paragraph" as const,
          content:
            "The PlantVillage dataset contains 54,306 images organized into healthy and diseased categories. Training with these images builds visual recognition skills. Key differences: healthy leaves have uniform color, intact margins, and consistent texture; diseased leaves show discoloration, spots, wilting, or abnormal growth.",
        },
        {
          type: "quiz" as const,
          quiz: {
            title: "Visual Diagnosis",
            questions: [
              {
                question: "What does a white powdery coating on leaves typically indicate?",
                options: [
                  "Bacterial infection",
                  "Powdery mildew (fungal)",
                  "Viral mosaic",
                  "Nutrient deficiency",
                ],
                correctIndex: 1,
                explanation:
                  "White powdery coating on leaf surfaces is the classic symptom of powdery mildew, a fungal disease caused by various Erysiphales species.",
              },
              {
                question: "How many crop species does the PlantVillage dataset cover?",
                options: ["5", "10", "14", "20"],
                correctIndex: 2,
                explanation:
                  "The PlantVillage dataset covers 14 major crop species: Apple, Blueberry, Cherry, Corn, Grape, Orange, Peach, Pepper, Potato, Raspberry, Soybean, Squash, Strawberry, and Tomato.",
              },
              {
                question: "What does a mosaic pattern on leaves usually indicate?",
                options: [
                  "Fungal infection",
                  "Bacterial wilt",
                  "Viral infection",
                  "Chemical burn",
                ],
                correctIndex: 2,
                explanation:
                  "Mosaic patterns — mottled light and dark green areas — are characteristic symptoms of viral infections in plants.",
              },
            ],
          },
        },
      ],
    },
    {
      title: "Fungal Diseases: Identification & Control",
      description:
        "Deep dive into the most common fungal diseases affecting crops, from early blight to root rot, with organic and chemical control methods.",
      contentBlocks: [
        {
          type: "heading" as const,
          content: "Major Fungal Diseases",
        },
        {
          type: "paragraph" as const,
          content:
            "Fungal diseases account for 70-80% of plant diseases. Key fungal pathogens include: (1) Alternaria — causes early blight with concentric ring spots; (2) Phytophthora — causes late blight with dark, water-soaked lesions; (3) Fusarium — causes wilt and root rot; (4) Septoria — causes leaf spot with small, dark-bordered lesions; (5) Botrytis — causes gray mold on fruits and flowers.",
        },
        {
          type: "heading" as const,
          content: "Fungal Disease Life Cycles",
        },
        {
          type: "paragraph" as const,
          content:
            "Understanding fungal life cycles enables targeted control. Most fungi overwinter in soil or plant debris, release spores in spring, and infect through wounds or natural openings. Some require wet conditions (late blight needs 6+ hours of leaf wetness), while others thrive in dry conditions (powdery mildew).",
        },
        {
          type: "heading" as const,
          content: "Organic Fungal Control",
        },
        {
          type: "paragraph" as const,
          content:
            "Organic approaches include: (1) Copper-based fungicides — effective against many fungal and bacterial diseases; (2) Neem oil — disrupts fungal cell membranes; (3) Bacillus subtilis — beneficial bacteria that outcompete pathogens; (4) Sulfur — classic fungicide for powdery mildew; (5) Crop rotation — breaks disease cycles; (6) Resistant varieties — the most effective long-term strategy.",
        },
        {
          type: "heading" as const,
          content: "Cultural Practices for Fungal Prevention",
        },
        {
          type: "paragraph" as const,
          content:
            "Prevention is better than cure: (1) Ensure good air circulation through proper spacing; (2) Water at the base of plants, not overhead; (3) Mulch to prevent soil splash; (4) Remove and destroy infected plant material; (5) Clean tools between plants; (6) Rotate crops on a 3-4 year cycle.",
        },
        {
          type: "quiz" as const,
          quiz: {
            title: "Fungal Diseases",
            questions: [
              {
                question: "What percentage of plant diseases are caused by fungi?",
                options: [
                  "10-20%",
                  "30-40%",
                  "50-60%",
                  "70-80%",
                ],
                correctIndex: 3,
                explanation:
                  "Fungi are responsible for approximately 70-80% of all plant diseases, making them the most significant group of plant pathogens.",
              },
              {
                question: "Which organic treatment is most effective against powdery mildew?",
                options: [
                  "Copper spray",
                  "Sulfur",
                  "Neem oil",
                  "Bacillus subtilis",
                ],
                correctIndex: 1,
                explanation:
                  "Sulfur is the classic and most effective organic treatment for powdery mildew. It disrupts fungal spore germination.",
              },
              {
                question: "What is the most effective long-term strategy for managing fungal diseases?",
                options: [
                  "Weekly fungicide sprays",
                  "Resistant varieties",
                  "Increasing irrigation",
                  "Planting monocultures",
                ],
                correctIndex: 1,
                explanation:
                  "Planting disease-resistant varieties is the most effective, economical, and environmentally friendly long-term strategy for disease management.",
              },
            ],
          },
        },
      ],
    },
    {
      title: "Bacterial & Viral Diseases",
      description:
        "Identify and manage bacterial and viral plant diseases, which are often more challenging to treat than fungal infections.",
      contentBlocks: [
        {
          type: "heading" as const,
          content: "Bacterial Disease Identification",
        },
        {
          type: "paragraph" as const,
          content:
            "Bacterial diseases often present as: (1) Water-soaked spots that expand rapidly; (2) Angular leaf spots bounded by leaf veins; (3) Bacterial wilt — sudden wilting without yellowing; (4) Soft rot — mushy, foul-smelling tissue; (5) Crown gall — tumor-like growths at the soil line. Key bacterial pathogens include Pseudomonas, Xanthomonas, Erwinia, and Agrobacterium.",
        },
        {
          type: "heading" as const,
          content: "Viral Disease Symptoms",
        },
        {
          type: "paragraph" as const,
          content:
            "Viral diseases cause: (1) Mosaic patterns — mottled light/dark green; (2) Leaf curling and distortion; (3) Stunting and reduced vigor; (4) Yellowing (chlorosis); (5) Ring spots on leaves or fruit. Viruses are spread by vectors (aphids, whiteflies, thrips) or through contaminated tools and handling.",
        },
        {
          type: "heading" as const,
          content: "Managing Bacterial Diseases",
        },
        {
          type: "paragraph" as const,
          content:
            "Bacterial diseases are harder to treat than fungal: (1) Copper-based sprays provide some control; (2) Certified disease-free seed and transplants; (3) Avoid working with wet plants (spreads bacteria); (4) Remove and destroy infected plants; (5) Use drip irrigation to keep foliage dry; (6) Rotate crops to reduce soil-borne bacteria.",
        },
        {
          type: "heading" as const,
          content: "Viral Disease Management",
        },
        {
          type: "paragraph" as const,
          content:
            "No cure exists for viral infections — management focuses on prevention: (1) Control insect vectors with insecticidal soap or neem; (2) Remove infected plants immediately; (3) Use virus-free certified seed; (4) Disinfect tools between plants; (5) Plant resistant varieties; (6) Remove weed hosts that harbor viruses.",
        },
        {
          type: "quiz" as const,
          quiz: {
            title: "Bacterial & Viral Diseases",
            questions: [
              {
                question: "Why are bacterial diseases harder to manage than fungal diseases?",
                options: [
                  "Bacteria are smaller",
                  "Fewer effective treatments exist and they spread rapidly",
                  "Bacteria only affect roots",
                  "Fungicides also kill bacteria",
                ],
                correctIndex: 1,
                explanation:
                  "Bacterial diseases are harder to manage because there are fewer effective treatments (mainly copper-based), bacteria multiply rapidly, and they spread easily through water and handling.",
              },
              {
                question: "What is the primary way viral plant diseases are spread?",
                options: [
                  "Wind only",
                  "Water splash only",
                  "Insect vectors (aphids, whiteflies) and contaminated tools",
                  "Soil contact only",
                ],
                correctIndex: 2,
                explanation:
                  "Viral diseases are primarily spread by insect vectors (aphids, whiteflies, thrips) and through contaminated tools, hands, or planting material.",
              },
              {
                question: "Can viral plant diseases be cured once a plant is infected?",
                options: [
                  "Yes, with antibiotics",
                  "Yes, with fungicides",
                  "No — prevention and removal are the only options",
                  "Yes, with antiviral drugs",
                ],
                correctIndex: 2,
                explanation:
                  "There is no cure for viral infections in plants. The only management strategy is prevention through vector control, removing infected plants, and using virus-free planting material.",
              },
            ],
          },
        },
      ],
    },
    {
      title: "Integrated Pest Management (IPM)",
      description:
        "Learn a holistic approach combining biological, cultural, physical, and chemical controls for sustainable disease management.",
      contentBlocks: [
        {
          type: "heading" as const,
          content: "The IPM Pyramid",
        },
        {
          type: "paragraph" as const,
          content:
            "IPM uses a tiered approach: (1) Prevention — resistant varieties, crop rotation, sanitation (foundation); (2) Monitoring — regular scouting, trapping, weather monitoring; (3) Biological control — beneficial insects, microbial agents; (4) Cultural control — timing, spacing, irrigation management; (5) Chemical control — targeted, least-toxic options as last resort.",
        },
        {
          type: "heading" as const,
          content: "Biological Control Agents",
        },
        {
          type: "paragraph" as const,
          content:
            "Beneficial organisms that suppress pathogens and pests: (1) Trichoderma fungi — attack disease-causing fungi in soil; (2) Bacillus thuringiensis (Bt) — controls caterpillars; (3) Predatory mites — control spider mites; (4) Ladybugs and lacewings — consume aphids; (5) Parasitic wasps — control whiteflies and aphids.",
        },
        {
          type: "heading" as const,
          content: "Scouting and Monitoring",
        },
        {
          type: "paragraph" as const,
          content:
            "Regular monitoring is essential: Walk fields 2-3 times per week during the growing season. Check lower leaves first (where diseases often start). Use yellow sticky traps for flying insects. Keep records of disease incidence, location, and environmental conditions. Use the '10% threshold' — begin treatment when 10% of plants show symptoms.",
        },
        {
          type: "heading" as const,
          content: "Record Keeping and Analysis",
        },
        {
          type: "paragraph" as const,
          content:
            "Good records enable better decisions: Track planting dates, variety performance, disease occurrences, weather conditions, and treatments applied. Over time, patterns emerge that guide future variety selection, planting timing, and management strategies.",
        },
        {
          type: "quiz" as const,
          quiz: {
            title: "Integrated Pest Management",
            questions: [
              {
                question: "What is the foundation of the IPM pyramid?",
                options: [
                  "Chemical pesticides",
                  "Biological control",
                  "Prevention through resistant varieties, rotation, and sanitation",
                  "Regular scouting",
                ],
                correctIndex: 2,
                explanation:
                  "Prevention is the foundation of IPM. Using resistant varieties, crop rotation, and good sanitation practices prevents problems before they start.",
              },
              {
                question: "At what disease incidence threshold should you begin treatment in IPM?",
                options: ["1%", "5%", "10%", "25%"],
                correctIndex: 2,
                explanation:
                  "The 10% threshold is a common IPM guideline — begin treatment when approximately 10% of plants show disease symptoms to prevent widespread infection.",
              },
              {
                question: "Which biological control agent attacks disease-causing fungi in soil?",
                options: [
                  "Ladybugs",
                  "Bacillus thuringiensis",
                  "Trichoderma fungi",
                  "Parasitic wasps",
                ],
                correctIndex: 2,
                explanation:
                  "Trichoderma is a beneficial fungus that colonizes the rhizosphere and attacks pathogenic fungi through competition, antibiosis, and mycoparasitism.",
              },
            ],
          },
        },
      ],
    },
    {
      title: "Disease-Resistant Variety Selection",
      description:
        "Use data on disease resistance to select the best varieties for your climate and disease pressure.",
      contentBlocks: [
        {
          type: "heading" as const,
          content: "Understanding Disease Resistance",
        },
        {
          type: "paragraph" as const,
          content:
            "Disease resistance varies by variety. The Plant Variety Database includes disease_resistance data for each cultivar. Resistance can be: (1) Complete — variety is immune to the pathogen; (2) Partial — variety shows reduced symptoms but can still be infected; (3) Tolerance — variety gets infected but maintains yield; (4) Field resistance — effective under field conditions but not in controlled tests.",
        },
        {
          type: "heading" as const,
          content: "Matching Resistance to Your Needs",
        },
        {
          type: "paragraph" as const,
          content:
            "Identify the diseases most common in your area, then select varieties with resistance to those specific pathogens. A variety resistant to late blight may not resist early blight. Prioritize resistance to the 2-3 diseases that cause the most problems on your farm.",
        },
        {
          type: "heading" as const,
          content: "Common Disease Resistance Genes",
        },
        {
          type: "paragraph" as const,
          content:
            "Many resistance genes are named: (1) Vf — apple scab resistance; (2) Ph — potato late blight; (3) Tm-2 — tomato mosaic virus; (4) Bt — bacterial wilt resistance; (5) Pl — downy mildew resistance. Understanding these genes helps predict which diseases a variety can resist.",
        },
        {
          type: "heading" as const,
          content: "Building a Disease-Resistant Garden",
        },
        {
          type: "paragraph" as const,
          content:
            "Combine multiple strategies: (1) Choose resistant varieties as the first line of defense; (2) Rotate crops to prevent soil-borne disease buildup; (3) Practice good sanitation to reduce inoculum; (4) Monitor regularly for early detection; (5) Use targeted treatments only when necessary. This layered approach minimizes disease impact while reducing chemical inputs.",
        },
        {
          type: "quiz" as const,
          quiz: {
            title: "Disease Resistance",
            questions: [
              {
                question: "What does 'partial resistance' mean in a plant variety?",
                options: [
                  "The variety is immune to all diseases",
                  "The variety shows reduced symptoms but can still be infected",
                  "The variety has no resistance at all",
                  "The variety is only resistant when young",
                ],
                correctIndex: 1,
                explanation:
                  "Partial resistance means the variety shows reduced disease symptoms compared to susceptible varieties, but can still be infected by the pathogen.",
              },
              {
                question: "Why is it important to match resistance to diseases in YOUR area?",
                options: [
                  "All diseases are the same everywhere",
                  "Resistance is universal across all pathogens",
                  "Different regions have different disease pressures",
                  "Resistance genes work the same in all climates",
                ],
                correctIndex: 2,
                explanation:
                  "Different regions have different dominant diseases due to climate, soil, and local pathogen populations. Matching resistance to local disease pressure is most effective.",
              },
              {
                question: "What does the 'Vf' resistance gene protect against?",
                options: [
                  "Late blight in potatoes",
                  "Apple scab",
                  "Tomato mosaic virus",
                  "Bacterial wilt",
                ],
                correctIndex: 1,
                explanation:
                  "The Vf gene, derived from Malus floribana, provides resistance to apple scab caused by the fungus Venturia inaequalis.",
              },
            ],
          },
        },
      ],
    },
  ],
};
