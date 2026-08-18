/**
 * Course 26: Smart Farming & Data-Driven Agriculture
 * Based on GrowNextGen "Smart Farming: Using Data to Make Decisions" curriculum
 * Source: grownextgen.org/curriculum
 * Covers IoT sensors, GPS technology, drones, data analytics, and precision agriculture
 */

export const extraCourse26 = {
  title: "Smart Farming & Data-Driven Agriculture",
  slug: "smart-farming-data-driven",
  description:
    "Master precision agriculture technologies including IoT sensors, GPS guidance, drone monitoring, data analytics, and decision support systems. Learn to use data to optimize every aspect of farm operations.",
  category: "AgTech",
  priceCents: 0,
  durationMinutes: 360,
  published: true,
  order: 26,
  modules: [
    {
      title: "Introduction to Smart Farming",
      description:
        "Understand how technology is transforming agriculture from traditional farming to precision data-driven operations.",
      contentBlocks: [
        {
          type: "heading" as const,
          content: "What is Smart Farming?",
        },
        {
          type: "paragraph" as const,
          content:
            "Smart farming (precision agriculture) uses technology to observe, measure, and respond to variability in crops and fields. The goal is to optimize inputs (water, fertilizer, pesticides) for maximum output while minimizing environmental impact. Smart farming answers: 'What is happening in my field right now, and what should I do about it?'",
        },
        {
          type: "heading" as const,
          content: "The Four Pillars of Smart Farming",
        },
        {
          type: "paragraph" as const,
          content:
            "Smart farming rests on four pillars: (1) Sensing — collecting data from soil, weather, and crop sensors; (2) Computing — processing data into actionable insights; (3) Acting — applying variable-rate treatments with precision equipment; (4) Tracking — monitoring results and adjusting strategies. This cycle of sense-compute-act-track drives continuous improvement.",
        },
        {
          type: "heading" as const,
          content: "From Data to Decisions",
        },
        {
          type: "paragraph" as const,
          content:
            "The farm data pipeline: Raw data (sensor readings, satellite imagery, weather records) → Processed information (soil maps, crop health indices, yield predictions) → Decision support (fertilizer recommendations, irrigation schedules, harvest timing) → Action (variable-rate application, targeted spraying, precision planting).",
        },
        {
          type: "quiz" as const,
          quiz: {
            title: "Smart Farming Basics",
            questions: [
              {
                question: "What is the primary goal of smart farming?",
                options: [
                  "Replace all human labor with robots",
                  "Optimize inputs for maximum output while minimizing environmental impact",
                  "Grow more crops in less space",
                  "Reduce the number of crops grown",
                ],
                correctIndex: 1,
                explanation:
                  "Smart farming aims to optimize inputs (water, fertilizer, pesticides) for maximum output while minimizing environmental impact through precision technology.",
              },
              {
                question: "What are the four pillars of smart farming?",
                options: [
                  "Water, Soil, Seeds, Sunlight",
                  "Sensing, Computing, Acting, Tracking",
                  "Planting, Growing, Harvesting, Selling",
                  "Hardware, Software, Data, Network",
                ],
                correctIndex: 1,
                explanation:
                  "The four pillars are Sensing (data collection), Computing (data processing), Acting (precision application), and Tracking (monitoring results).",
              },
              {
                question: "What does the farm data pipeline produce?",
                options: [
                  "Raw sensor data only",
                  "Weather reports",
                  "Decision support for farm operations",
                  "Social media content",
                ],
                correctIndex: 2,
                explanation:
                  "The farm data pipeline transforms raw data into decision support that guides farm operations like fertilizer application, irrigation, and harvest timing.",
              },
            ],
          },
        },
      ],
    },
    {
      title: "IoT Sensors & Data Collection",
      description:
        "Deploy and manage Internet of Things sensors for soil moisture, temperature, humidity, and nutrient monitoring across your farm.",
      contentBlocks: [
        {
          type: "heading" as const,
          content: "Types of Farm IoT Sensors",
        },
        {
          type: "paragraph" as const,
          content:
            "Essential farm sensors include: (1) Soil moisture sensors — measure water content at root depth; (2) Temperature sensors — track air and soil temperature; (3) Humidity sensors — monitor relative humidity for disease prediction; (4) Light sensors — measure photosynthetically active radiation (PAR); (5) EC sensors — measure soil electrical conductivity for salinity; (6) pH sensors — monitor soil or water acidity.",
        },
        {
          type: "heading" as const,
          content: "Sensor Networks & Connectivity",
        },
        {
          type: "paragraph" as const,
          content:
            "Connect sensors to create a farm-wide monitoring network: (1) LoRaWAN — long-range, low-power wireless for remote sensors (up to 15km); (2) Zigbee — short-range mesh networks for dense sensor deployments; (3) Cellular (4G/5G) — high-bandwidth for camera and video sensors; (4) Bluetooth Low Energy — for close-range sensor-to-gateway communication.",
        },
        {
          type: "heading" as const,
          content: "Data Logging & Cloud Storage",
        },
        {
          type: "paragraph" as const,
          content:
            "Sensor data needs reliable storage and access: (1) Edge computing — process data locally for immediate decisions; (2) Cloud platforms — store historical data for trend analysis; (3) Mobile apps — view real-time data from anywhere; (4) API integration — connect sensor data with farm management software. Popular platforms include ThingsBoard, FarmLogs, and custom MQTT brokers.",
        },
        {
          type: "heading" as const,
          content: "Affordable Sensor Solutions",
        },
        {
          type: "paragraph" as const,
          content:
            "Smart farming doesn't require expensive equipment: (1) Arduino/Raspberry Pi based sensors — DIY solutions under $50; (2) Commercial soil probes — $100-300 per station; (3) Weather stations — $200-1,000 for complete units; (4) Open-source firmware — free software for custom sensor builds. The open-source agriculture community provides extensive documentation and support.",
        },
        {
          type: "quiz" as const,
          quiz: {
            title: "IoT Sensors & Data Collection",
            questions: [
              {
                question: "Which wireless technology is best for long-range, low-power farm sensors?",
                options: [
                  "Bluetooth",
                  "WiFi",
                  "LoRaWAN",
                  "NFC",
                ],
                correctIndex: 2,
                explanation:
                  "LoRaWAN (Long Range Wide Area Network) is ideal for farm sensors because it provides long-range communication (up to 15km) with very low power consumption, enabling battery-powered sensors to operate for years.",
              },
              {
                question: "What does a soil EC sensor measure?",
                options: [
                  "Soil temperature",
                  "Soil electrical conductivity (salinity)",
                  "Soil moisture content",
                  "Soil organic matter",
                ],
                correctIndex: 1,
                explanation:
                  "EC (Electrical Conductivity) sensors measure soil salinity levels, which affect plant nutrient uptake and can indicate salt buildup that needs management.",
              },
              {
                question: "What is edge computing in farm IoT?",
                options: [
                  "Processing data on remote cloud servers",
                  "Processing data locally at the sensor for immediate decisions",
                  "Using edge-shaped solar panels",
                  "Computing on the edge of the field",
                ],
                correctIndex: 1,
                explanation:
                  "Edge computing processes data locally at or near the sensor, enabling real-time decisions without requiring internet connectivity for every data point.",
              },
            ],
          },
        },
      ],
    },
    {
      title: "GPS Technology & Auto-Steer Systems",
      description:
        "Implement GPS-guided precision planting, variable-rate application, and auto-steer tractor systems for efficient field operations.",
      contentBlocks: [
        {
          type: "heading" as const,
          content: "GPS in Agriculture",
        },
        {
          type: "paragraph" as const,
          content:
            "GPS (Global Positioning System) enables centimeter-level accuracy in field operations. RTK (Real-Time Kinematic) GPS provides sub-inch accuracy by using a base station to correct satellite signal errors. This precision enables: (1) Exact planting rows with minimal overlap; (2) Controlled traffic farming to reduce soil compaction; (3) Variable-rate application based on field maps; (4) Geofenced field boundaries for record-keeping.",
        },
        {
          type: "heading" as const,
          content: "Auto-Steer Systems",
        },
        {
          type: "paragraph" as const,
          content:
            "Auto-steer technology takes over steering during field operations: (1) Basic systems use GPS to follow guidance lines, reducing overlap and skips; (2) Advanced systems combine RTK GPS with gyroscopes and wheel sensors for sub-inch accuracy; (3) Implement guidance controls planter, sprayer, and spreader operations. Benefits include reduced operator fatigue, straighter rows, less overlap (saving seed and chemicals), and the ability to work at night.",
        },
        {
          type: "heading" as const,
          content: "Variable-Rate Technology (VRT)",
        },
        {
          type: "paragraph" as const,
          content:
            "VRT applies inputs at different rates across a field based on prescription maps: (1) Variable-rate seeding — more seeds in fertile areas, fewer in poor zones; (2) Variable-rate fertilization — apply nutrients where needed most; (3) Variable-rate irrigation — water different zones based on soil moisture; (4) Section control — automatically turn sections on/off to prevent double-application on headlands.",
        },
        {
          type: "heading" as const,
          content: "Open-Source GPS Solutions",
        },
        {
          type: "paragraph" as const,
          content:
            "The open-source community offers affordable precision agriculture tools: (1) AgOpenGPS — free open-source auto-steer system using RTK GPS; (2) Simplesteer — RTK GPS tractor autosteer with web interface; (3) AgStack — open-source digital infrastructure for agriculture; (4) Farm-Data-Relay-System — using ESP-NOW and LoRa for sensor data transport. These projects make precision farming accessible to small-scale farmers.",
        },
        {
          type: "quiz" as const,
          quiz: {
            title: "GPS & Auto-Steer",
            questions: [
              {
                question: "What accuracy does RTK GPS provide for farming operations?",
                options: [
                  "10 feet",
                  "1 meter",
                  "Sub-inch (centimeter-level)",
                  "10 meters",
                ],
                correctIndex: 2,
                explanation:
                  "RTK (Real-Time Kinematic) GPS provides sub-inch (centimeter-level) accuracy by using a base station to correct satellite signal errors.",
              },
              {
                question: "What is variable-rate technology (VRT)?",
                options: [
                  "Changing tractor speed automatically",
                  "Applying inputs at different rates across a field based on prescription maps",
                  "Variable fuel injection in engines",
                  "Changing GPS satellite frequency",
                ],
                correctIndex: 1,
                explanation:
                  "VRT applies inputs (seeds, fertilizer, water) at different rates across a field based on prescription maps created from sensor and soil data.",
              },
              {
                question: "What is AgOpenGPS?",
                options: [
                  "A commercial GPS receiver",
                  "A free open-source auto-steer system",
                  "A satellite navigation protocol",
                  "A farming game",
                ],
                correctIndex: 1,
                explanation:
                  "AgOpenGPS is a free, open-source auto-steer system that uses RTK GPS to provide precision steering for tractors at a fraction of commercial system costs.",
              },
            ],
          },
        },
      ],
    },
    {
      title: "Drone Technology in Agriculture",
      description:
        "Use UAVs for crop scouting, mapping, spraying, and aerial imaging to monitor field health and identify problems early.",
      contentBlocks: [
        {
          type: "heading" as const,
          content: "Agricultural Drone Applications",
        },
        {
          type: "paragraph" as const,
          content:
            "Drones (UAVs) serve multiple farm functions: (1) Crop scouting — fly over fields to check crop health, stand counts, and pest pressure; (2) Mapping — create high-resolution orthomosaic maps of entire fields; (3) NDVI imaging — use multispectral cameras to assess plant health; (4) Spraying — apply pesticides or fertilizers precisely to affected areas; (5) Irrigation monitoring — detect wet spots, leaks, and drainage issues.",
        },
        {
          type: "heading" as const,
          content: "Drone Types and Specifications",
        },
        {
          type: "paragraph" as const,
          content:
            "Farm drones come in two main types: (1) Multi-rotor (quadcopter) — best for small fields, hovering, and spot spraying; range 1-5km, flight time 20-40 minutes; (2) Fixed-wing — best for large fields and mapping; range 10-50km, flight time 45-90 minutes. Agricultural spray drones can carry 10-50 liters of liquid and cover 5-15 acres per flight.",
        },
        {
          type: "heading" as const,
          content: "NDVI and Multispectral Imaging",
        },
        {
          type: "paragraph" as const,
          content:
            "NDVI (Normalized Difference Vegetation Index) measures plant health by comparing near-infrared and red light reflectance. Healthy plants reflect more near-infrared light. NDVI maps reveal: (1) Nutrient deficiencies — areas with low NDVI; (2) Water stress — drought-affected zones; (3) Pest/disease pressure — infected areas show reduced NDVI; (4) Growth variability — differences in plant vigor across the field.",
        },
        {
          type: "heading" as const,
          content: "Drone Regulations and Safety",
        },
        {
          type: "paragraph" as const,
          content:
            "Agricultural drone operation requires compliance with regulations: (1) Register your drone with aviation authority; (2) Obtain pilot certification if required; (3) Maintain visual line of sight; (4) Respect altitude limits (typically 400 feet AGL); (5) Avoid flying over people or near airports; (6) For commercial operations, obtain appropriate licenses. Always check local regulations before flying.",
        },
        {
          type: "quiz" as const,
          quiz: {
            title: "Drone Technology",
            questions: [
              {
                question: "What does NDVI measure?",
                options: [
                  "Soil moisture levels",
                  "Air temperature",
                  "Plant health through light reflectance",
                  "Pest population density",
                ],
                correctIndex: 2,
                explanation:
                  "NDVI (Normalized Difference Vegetation Index) measures plant health by comparing near-infrared and red light reflectance from plant leaves.",
              },
              {
                question: "Which drone type is best for mapping large fields?",
                options: [
                  "Multi-rotor (quadcopter)",
                  "Fixed-wing",
                  "Helicopter",
                  "Toy drone",
                ],
                correctIndex: 1,
                explanation:
                  "Fixed-wing drones are best for large field mapping because they can fly longer (45-90 minutes) and cover more area per flight than multi-rotor drones.",
              },
              {
                question: "What is a key benefit of drone spraying over traditional methods?",
                options: [
                  "It's always cheaper",
                  "It can be done at night only",
                  "Precision application to affected areas only",
                  "It covers more area than ground equipment",
                ],
                correctIndex: 2,
                explanation:
                  "Drone spraying enables precision application to affected areas only, reducing chemical use and environmental impact compared to blanket spraying.",
              },
            ],
          },
        },
      ],
    },
    {
      title: "Data Analytics & Decision Support",
      description:
        "Analyze farm data using software tools to make informed decisions about planting, irrigation, fertilization, and harvesting.",
      contentBlocks: [
        {
          type: "heading" as const,
          content: "Farm Data Sources",
        },
        {
          type: "paragraph" as const,
          content:
            "Modern farms generate data from many sources: (1) Soil sensors — moisture, temperature, nutrients; (2) Weather stations — rainfall, humidity, wind; (3) GPS equipment — planting, harvest, and application records; (4) Yield monitors — actual crop yield data; (5) Satellite imagery — field-level vegetation indices; (6) Drone imagery — high-resolution crop health maps; (7) Financial records — input costs and revenue.",
        },
        {
          type: "heading" as const,
          content: "Analysis Tools and Software",
        },
        {
          type: "paragraph" as const,
          content:
            "Farm management software helps analyze data: (1) QGIS — free open-source GIS for mapping and spatial analysis; (2) R/Python — statistical analysis for researchers; (3) Farm management platforms — commercial tools like Climate FieldView, Granular; (4) Spreadsheets — basic analysis for small operations; (5) Custom dashboards — combine multiple data sources into visual interfaces.",
        },
        {
          type: "heading" as const,
          content: "Prescription Map Creation",
        },
        {
          type: "paragraph" as const,
          content:
            "Create variable-rate prescription maps from data: (1) Collect yield data from harvest; (2) Overlay with soil maps and sensor data; (3) Identify management zones — areas with similar characteristics; (4) Assign application rates to each zone; (5) Export as shapefile or ISO-XML for VRT equipment. Management zones typically show 3-8 distinct areas within a field.",
        },
        {
          type: "heading" as const,
          content: "Machine Learning in Agriculture",
        },
        {
          type: "paragraph" as const,
          content:
            "Machine learning applications in farming: (1) Crop yield prediction — forecast harvest using historical data and weather; (2) Disease detection — identify diseases from leaf images (PlantVillage dataset: 54,306 images); (3) Weed detection — distinguish crops from weeds for targeted spraying; (4) Soil analysis — predict soil properties from sensor data; (5) Market prediction — forecast commodity prices for marketing decisions.",
        },
        {
          type: "quiz" as const,
          quiz: {
            title: "Data Analytics & Decision Support",
            questions: [
              {
                question: "What is a prescription map in precision agriculture?",
                options: [
                  "A doctor's prescription for farm chemicals",
                  "A map showing variable-rate application rates for different field zones",
                  "A weather forecast map",
                  "A map of farm property boundaries",
                ],
                correctIndex: 1,
                explanation:
                  "A prescription map defines variable-rate application rates for different zones within a field, guiding precision equipment to apply the right amount of input in each area.",
              },
              {
                question: "Which free software is commonly used for GIS mapping in agriculture?",
                options: [
                  "Adobe Photoshop",
                  "Microsoft Excel",
                  "QGIS",
                  "AutoCAD",
                ],
                correctIndex: 2,
                explanation:
                  "QGIS is a free, open-source Geographic Information System (GIS) widely used in agriculture for mapping, spatial analysis, and prescription map creation.",
              },
              {
                question: "How many images does the PlantVillage dataset contain for disease detection?",
                options: ["1,000", "10,000", "54,306", "100,000"],
                correctIndex: 2,
                explanation:
                  "The PlantVillage dataset contains 54,306 images of healthy and diseased plant leaves across 14 crop species and 26 diseases.",
              },
            ],
          },
        },
      ],
    },
    {
      title: "Sustainable Technology Implementation",
      description:
        "Plan and implement smart farming technology on your operation, considering costs, training, and long-term sustainability.",
      contentBlocks: [
        {
          type: "heading" as const,
          content: "Starting Small with Smart Farming",
        },
        {
          type: "paragraph" as const,
          content:
            "Begin your smart farming journey incrementally: (1) Start with a weather station and soil moisture sensors — lowest cost, highest immediate impact; (2) Add GPS guidance if you don't have it — reduces overlap and saves input costs; (3) Invest in yield monitoring — understand field variability; (4) Expand to drone scouting for large fields. Each step builds on the previous one.",
        },
        {
          type: "heading" as const,
          content: "Cost-Benefit Analysis",
        },
        {
          type: "paragraph" as const,
          content:
            "Smart farming investments typically pay off: (1) GPS auto-steer saves 5-10% on seed, fertilizer, and chemical by reducing overlap; (2) Variable-rate fertilization saves 10-20% on fertilizer while maintaining yields; (3) Drone scouting can replace physical field walking, saving time and catching problems earlier; (4) Soil moisture sensors reduce water use by 20-30% while maintaining yields.",
        },
        {
          type: "heading" as const,
          content: "Open-Source Hardware and Software",
        },
        {
          type: "paragraph" as const,
          content:
            "The open-source agriculture movement makes smart farming accessible: (1) AgOpenGPS — free auto-steer system; (2) OpenWeedLocator — open-source weed detection device; (3) Farm-Data-Relay-System — ESP-NOW/LoRa sensor networks; (4) Simplesteer — RTK GPS autosteer with web interface; (5) OpenMinder — rootzone monitoring with Raspberry Pi. These projects dramatically reduce the cost of precision agriculture.",
        },
        {
          type: "heading" as const,
          content: "Data Privacy and Ownership",
        },
        {
          type: "paragraph" as const,
          content:
            "As farms become more connected, data ownership matters: (1) Know who owns your farm data — read platform terms of service; (2) Choose platforms that allow data export; (3) Be cautious about sharing data with input suppliers; (4) Consider local/cloud storage options that give you control; (5) The Open Ag Data Alliance promotes interoperability and farmer data rights.",
        },
        {
          type: "quiz" as const,
          quiz: {
            title: "Sustainable Implementation",
            questions: [
              {
                question: "What is the recommended first step in adopting smart farming technology?",
                options: [
                  "Buy a $100,000 drone",
                  "Install GPS auto-steer on all equipment",
                  "Start with a weather station and soil moisture sensors",
                  "Hire a data scientist",
                ],
                correctIndex: 2,
                explanation:
                  "Starting with weather and soil sensors provides the highest immediate impact at the lowest cost, and the data collected guides future technology investments.",
              },
              {
                question: "How much can variable-rate fertilization save on fertilizer costs?",
                options: [
                  "1-5%",
                  "10-20%",
                  "50-75%",
                  "No savings",
                ],
                correctIndex: 1,
                explanation:
                  "Variable-rate fertilization typically saves 10-20% on fertilizer costs by applying nutrients only where needed, while maintaining or improving yields.",
              },
              {
                question: "Why is data ownership important for smart farms?",
                options: [
                  "It's not important",
                  "To sell data to the highest bidder",
                  "To maintain control over who accesses farm information",
                  "To comply with social media requirements",
                ],
                correctIndex: 2,
                explanation:
                  "Data ownership ensures farmers control who accesses their farm information, preventing misuse by third parties and maintaining competitive advantage.",
              },
            ],
          },
        },
      ],
    },
  ],
};
