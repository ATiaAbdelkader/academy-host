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
 * Course 26: Smart Farming & Data-Driven Agriculture
 * Based on GrowNextGen curriculum
 */

export const extraCourse26: ExtraCourse = {
  title: "Smart Farming & Data-Driven Agriculture",
  description:
    "Master precision agriculture technologies including IoT sensors, GPS guidance, drone monitoring, data analytics, and decision support systems.",
  category: "AgTech",
  priceCents: 0,
  durationMinutes: 360,
  order: 26,
  instructor: "Rafael Mwangi",
  instructorTitle: "Application Technology Specialist",
  modules: [
    {
      title: "Introduction to Smart Farming",
      content: [
        {
          type: "paragraph",
          text: "Smart farming (precision agriculture) uses technology to observe, measure, and respond to variability in crops and fields. The goal is to optimize inputs (water, fertilizer, pesticides) for maximum output while minimizing environmental impact. Smart farming rests on four pillars: Sensing, Computing, Acting, and Tracking.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=82ti-m7uHU4",
          caption: "How technology is transforming modern agriculture.",
        },
        {
          type: "list",
          items: [
            "Sensing — collect data from soil, weather, and crop sensors.",
            "Computing — process data into actionable insights.",
            "Acting — apply variable-rate treatments with precision equipment.",
            "Tracking — monitor results and adjust strategies continuously.",
          ],
        },
        {
          type: "quiz",
          title: "Smart Farming Basics",
          passPercent: 60,
          questions: [
            {
              question: "What is the primary goal of smart farming?",
              options: [
                "Replace all human labor with robots",
                "Optimize inputs for maximum output while minimizing environmental impact",
                "Grow more crops in less space",
                "Reduce the number of crops grown",
              ],
              answerIndex: 1,
            },
            {
              question: "What are the four pillars of smart farming?",
              options: [
                "Water, Soil, Seeds, Sunlight",
                "Sensing, Computing, Acting, Tracking",
                "Planting, Growing, Harvesting, Selling",
                "Hardware, Software, Data, Network",
              ],
              answerIndex: 1,
            },
            {
              question: "What does the farm data pipeline produce?",
              options: [
                "Raw sensor data only",
                "Weather reports",
                "Decision support for farm operations",
                "Social media content",
              ],
              answerIndex: 2,
            },
          ],
        },
      ],
    },
    {
      title: "IoT Sensors & Data Collection",
      content: [
        {
          type: "paragraph",
          text: "Essential farm sensors include: (1) Soil moisture sensors — measure water content at root depth; (2) Temperature sensors — track air and soil temperature; (3) Humidity sensors — monitor relative humidity for disease prediction; (4) Light sensors — measure photosynthetically active radiation (PAR); (5) EC sensors — measure soil electrical conductivity for salinity.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=AQ_jQ8t3dRo",
          caption: "IoT sensors for farm monitoring — affordable and effective.",
        },
        {
          type: "paragraph",
          text: "Connect sensors to create a farm-wide monitoring network: (1) LoRaWAN — long-range, low-power wireless (up to 15km); (2) Zigbee — short-range mesh networks; (3) Cellular (4G/5G) — high-bandwidth for cameras; (4) Bluetooth Low Energy — close-range communication. Smart farming doesn't require expensive equipment — Arduino/Raspberry Pi solutions cost under $50.",
        },
        {
          type: "list",
          items: [
            "LoRaWAN is ideal for long-range, low-power farm sensors.",
            "Edge computing processes data locally for immediate decisions.",
            "Arduino/Raspberry Pi sensors cost under $50 for DIY solutions.",
            "Commercial soil probes cost $100-300 per station.",
          ],
        },
        {
          type: "quiz",
          title: "IoT Sensors & Data Collection",
          passPercent: 60,
          questions: [
            {
              question: "Which wireless technology is best for long-range, low-power farm sensors?",
              options: ["Bluetooth", "WiFi", "LoRaWAN", "NFC"],
              answerIndex: 2,
            },
            {
              question: "What does a soil EC sensor measure?",
              options: [
                "Soil temperature",
                "Soil electrical conductivity (salinity)",
                "Soil moisture content",
                "Soil organic matter",
              ],
              answerIndex: 1,
            },
            {
              question: "What is edge computing in farm IoT?",
              options: [
                "Processing data on remote cloud servers",
                "Processing data locally at the sensor for immediate decisions",
                "Using edge-shaped solar panels",
                "Computing on the edge of the field",
              ],
              answerIndex: 1,
            },
          ],
        },
      ],
    },
    {
      title: "GPS Technology & Auto-Steer Systems",
      content: [
        {
          type: "paragraph",
          text: "GPS (Global Positioning System) enables centimeter-level accuracy in field operations. RTK (Real-Time Kinematic) GPS provides sub-inch accuracy by using a base station to correct satellite signal errors. This precision enables exact planting rows, controlled traffic farming, variable-rate application, and geofenced field boundaries.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=sDpm3zjRLFI",
          caption: "GPS-guided precision farming and auto-steer systems.",
        },
        {
          type: "paragraph",
          text: "Variable-Rate Technology (VRT) applies inputs at different rates across a field: (1) Variable-rate seeding — more seeds in fertile areas; (2) Variable-rate fertilization — apply nutrients where needed most; (3) Section control — automatically turn sections on/off to prevent double-application on headlands. Open-source solutions like AgOpenGPS make precision farming accessible to small-scale farmers.",
        },
        {
          type: "list",
          items: [
            "RTK GPS provides sub-inch (centimeter-level) accuracy.",
            "Auto-steer reduces overlap, saving seed and chemicals.",
            "VRT applies inputs at different rates based on prescription maps.",
            "AgOpenGPS is a free open-source auto-steer system.",
          ],
        },
        {
          type: "quiz",
          title: "GPS & Auto-Steer",
          passPercent: 60,
          questions: [
            {
              question: "What accuracy does RTK GPS provide for farming?",
              options: ["10 feet", "1 meter", "Sub-inch (centimeter-level)", "10 meters"],
              answerIndex: 2,
            },
            {
              question: "What is variable-rate technology (VRT)?",
              options: [
                "Changing tractor speed automatically",
                "Applying inputs at different rates across a field based on prescription maps",
                "Variable fuel injection in engines",
                "Changing GPS satellite frequency",
              ],
              answerIndex: 1,
            },
            {
              question: "What is AgOpenGPS?",
              options: [
                "A commercial GPS receiver",
                "A free open-source auto-steer system",
                "A satellite navigation protocol",
                "A farming game",
              ],
              answerIndex: 1,
            },
          ],
        },
      ],
    },
    {
      title: "Drone Technology in Agriculture",
      content: [
        {
          type: "paragraph",
          text: "Drones (UAVs) serve multiple farm functions: (1) Crop scouting — fly over fields to check crop health; (2) Mapping — create high-resolution orthomosaic maps; (3) NDVI imaging — use multispectral cameras to assess plant health; (4) Spraying — apply pesticides or fertilizers precisely; (5) Irrigation monitoring — detect wet spots and drainage issues.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=BggoEriIKLo",
          caption: "Agricultural drones — mapping, scouting, and spraying.",
        },
        {
          type: "paragraph",
          text: "NDVI (Normalized Difference Vegetation Index) measures plant health by comparing near-infrared and red light reflectance. Healthy plants reflect more near-infrared light. NDVI maps reveal nutrient deficiencies, water stress, pest/disease pressure, and growth variability. Fixed-wing drones are best for large field mapping (45-90 min flight); multi-rotors for small fields and spot spraying.",
        },
        {
          type: "list",
          items: [
            "NDVI measures plant health through light reflectance.",
            "Fixed-wing drones are best for mapping large fields.",
            "Drone spraying enables precision application to affected areas only.",
            "Always check local regulations before flying agricultural drones.",
          ],
        },
        {
          type: "quiz",
          title: "Drone Technology",
          passPercent: 60,
          questions: [
            {
              question: "What does NDVI measure?",
              options: [
                "Soil moisture levels",
                "Air temperature",
                "Plant health through light reflectance",
                "Pest population density",
              ],
              answerIndex: 2,
            },
            {
              question: "Which drone type is best for mapping large fields?",
              options: [
                "Multi-rotor (quadcopter)",
                "Fixed-wing",
                "Helicopter",
                "Toy drone",
              ],
              answerIndex: 1,
            },
            {
              question: "What is a key benefit of drone spraying?",
              options: [
                "It's always cheaper",
                "It can be done at night only",
                "Precision application to affected areas only",
                "It covers more area than ground equipment",
              ],
              answerIndex: 2,
            },
          ],
        },
      ],
    },
    {
      title: "Data Analytics & Decision Support",
      content: [
        {
          type: "paragraph",
          text: "Modern farms generate data from soil sensors, weather stations, GPS equipment, yield monitors, satellite imagery, drone imagery, and financial records. Farm management software helps analyze this data. QGIS is free open-source GIS for mapping; R/Python for statistical analysis; spreadsheets for basic analysis.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=h0uuIDtT2xU",
          caption: "Turning farm data into actionable decisions.",
        },
        {
          type: "paragraph",
          text: "Create variable-rate prescription maps: collect yield data from harvest, overlay with soil maps and sensor data, identify management zones, assign application rates to each zone, export as shapefile for VRT equipment. Machine learning applications include crop yield prediction, disease detection (PlantVillage: 54,306 images), weed detection, and market prediction.",
        },
        {
          type: "list",
          items: [
            "QGIS is free open-source GIS for mapping and spatial analysis.",
            "Prescription maps define variable-rate application rates for field zones.",
            "The PlantVillage dataset contains 54,306 plant leaf images.",
            "Management zones typically show 3-8 distinct areas within a field.",
          ],
        },
        {
          type: "quiz",
          title: "Data Analytics",
          passPercent: 60,
          questions: [
            {
              question: "What is a prescription map in precision agriculture?",
              options: [
                "A doctor's prescription for farm chemicals",
                "A map showing variable-rate application rates for different field zones",
                "A weather forecast map",
                "A map of farm property boundaries",
              ],
              answerIndex: 1,
            },
            {
              question: "Which free software is commonly used for GIS mapping in agriculture?",
              options: ["Adobe Photoshop", "Microsoft Excel", "QGIS", "AutoCAD"],
              answerIndex: 2,
            },
            {
              question: "How many images does the PlantVillage dataset contain?",
              options: ["1,000", "10,000", "54,306", "100,000"],
              answerIndex: 2,
            },
          ],
        },
      ],
    },
    {
      title: "Sustainable Technology Implementation",
      content: [
        {
          type: "paragraph",
          text: "Begin your smart farming journey incrementally: (1) Start with a weather station and soil moisture sensors — lowest cost, highest immediate impact; (2) Add GPS guidance — reduces overlap and saves 5-10% on inputs; (3) Invest in yield monitoring — understand field variability; (4) Expand to drone scouting for large fields. Each step builds on the previous one.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=LP2K7tVXzYg",
          caption: "Planning and implementing smart farming technology on your operation.",
        },
        {
          type: "paragraph",
          text: "Smart farming investments typically pay off: GPS auto-steer saves 5-10% on seed, fertilizer, and chemical by reducing overlap. Variable-rate fertilization saves 10-20% on fertilizer while maintaining yields. Soil moisture sensors reduce water use by 20-30%. The open-source agriculture community provides free tools like AgOpenGPS, OpenWeedLocator, and Farm-Data-Relay-System.",
        },
        {
          type: "list",
          items: [
            "GPS auto-steer saves 5-10% on seed, fertilizer, and chemical.",
            "Variable-rate fertilization saves 10-20% while maintaining yields.",
            "Soil moisture sensors reduce water use by 20-30%.",
            "Open-source tools make precision farming accessible to all scales.",
          ],
        },
        {
          type: "quiz",
          title: "Technology Implementation",
          passPercent: 60,
          questions: [
            {
              question: "Where should you start with smart farming technology?",
              options: [
                "Buy the most expensive equipment first",
                "Start with a weather station and soil moisture sensors",
                "Immediately install auto-steer on all equipment",
                "Hire a data scientist",
              ],
              answerIndex: 1,
            },
            {
              question: "How much can GPS auto-steer save on inputs?",
              options: ["1-2%", "5-10%", "20-30%", "50%"],
              answerIndex: 1,
            },
            {
              question: "What is the key advantage of open-source farm technology?",
              options: [
                "It's always more reliable than commercial",
                "It makes precision farming accessible to small-scale farmers",
                "It requires no technical knowledge",
                "It comes with free equipment",
              ],
              answerIndex: 1,
            },
          ],
        },
      ],
    },
  ],
};
