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

export const extraCourse30: ExtraCourse = {
  title: "IoT Soil Sensing & Smart Data Collection",
  description:
    "Master the fundamentals of IoT-based soil monitoring using sensors, Modbus protocols, and real-time data pipelines. Learn to deploy sensor networks, collect soil parameters (NPK, pH, moisture, EC, temperature), and build dashboards for precision agriculture.",
  category: "AgTech",
  duration: "6 weeks",
  difficulty: "Intermediate",
  priceCents: 7900,
  durationMinutes: 360,
  order: 30,
  instructor: "Dr. Aniket Asawale",
  instructorTitle: "IoT & Smart Agriculture Researcher",
  modules: [
    {
      title: "Introduction to IoT in Agriculture",
      content: [
        {
          type: "paragraph",
          text: "The Internet of Things (IoT) is revolutionizing agriculture by enabling real-time monitoring of soil, weather, and crop conditions. IoT sensor networks allow farmers to make data-driven decisions instead of relying on intuition alone.",
        },
        {
          type: "paragraph",
          text: "Key concepts include: sensor nodes, gateway devices, cloud connectivity, and data visualization. An IoT agriculture system typically consists of field-deployed sensors that measure soil and environmental parameters, communicate wirelessly to a gateway, which forwards data to a cloud platform for analysis and dashboard display.",
        },
        {
          type: "paragraph",
          text: "The AgroAI framework demonstrates a complete IoT agriculture ecosystem with real-time soil sensors communicating via Modbus protocol to a PostgreSQL-backed API. This modular architecture separates concerns — sensing, data storage, recommendation, and visualization — making it scalable and maintainable.",
        },
        {
          type: "quiz",
          title: "IoT in Agriculture Basics",
          passPercent: 60,
          questions: [
            {
              question: "What protocol does the AgroAI sensor module use for soil sensor communication?",
              options: ["HTTP REST", "Modbus", "MQTT", "WebSocket"],
              answerIndex: 1,
            },
            {
              question: "Which of these is NOT a typical soil parameter measured by IoT sensors?",
              options: ["Soil moisture", "Soil color", "Soil pH", "Electrical conductivity"],
              answerIndex: 1,
            },
            {
              question: "What is the primary advantage of IoT-based soil monitoring over manual sampling?",
              options: [
                "It is cheaper",
                "It provides real-time, continuous data",
                "It requires no calibration",
                "It works without internet",
              ],
              answerIndex: 1,
            },
            {
              question: "In a typical agricultural IoT architecture, what sits between field sensors and the cloud?",
              options: ["A drone", "A gateway device", "A solar panel", "A soil auger"],
              answerIndex: 1,
            },
          ],
        },
      ],
    },
    {
      title: "Soil Sensor Types & Measurements",
      content: [
        {
          type: "paragraph",
          text: "Soil sensors come in many varieties, each designed to measure specific parameters critical for crop growth. Understanding sensor types is essential for building an effective monitoring system. The main categories include chemical sensors (pH, EC, NPK), physical sensors (moisture, temperature, compaction), and biological sensors (organic carbon, microbial activity).",
        },
        {
          type: "paragraph",
          text: "The AgroAI system measures nitrogen (N), phosphorus (P), potassium (K), temperature, moisture, electrical conductivity (EC), and pH. These seven parameters form the foundation of precision soil analysis. NPK levels directly influence fertilizer recommendations, while EC indicates salinity stress. pH determines nutrient availability — most crops thrive in pH 6.0-7.5.",
        },
        {
          type: "paragraph",
          text: "Sensor accuracy depends on calibration, soil type, and installation depth. Capacitive moisture sensors are popular for their durability and low cost, but require soil-type-specific calibration. Ion-selective electrodes for NPK measurement are more expensive but provide direct nutrient readings.",
        },
        {
          type: "quiz",
          title: "Soil Sensors & Measurements",
          passPercent: 60,
          questions: [
            {
              question: "What does electrical conductivity (EC) primarily indicate in soil?",
              options: [
                "Soil compaction",
                "Salinity and dissolved nutrient levels",
                "Organic matter content",
                "Root depth",
              ],
              answerIndex: 1,
            },
            {
              question: "At what pH range do most crops have optimal nutrient availability?",
              options: ["4.0 - 5.0", "6.0 - 7.5", "8.5 - 9.5", "10.0 - 12.0"],
              answerIndex: 1,
            },
            {
              question: "Which type of moisture sensor is most commonly used in agriculture?",
              options: ["Tensiometer", "Capacitive sensor", "Neutron probe", "TDR sensor"],
              answerIndex: 1,
            },
            {
              question: "Why do capacitive moisture sensors require soil-type-specific calibration?",
              options: [
                "They degrade over time",
                "Different soils have different dielectric properties",
                "They only work in wet soil",
                "They are temperature-dependent only",
              ],
              answerIndex: 1,
            },
          ],
        },
      ],
    },
    {
      title: "Modbus Communication Protocol",
      content: [
        {
          type: "paragraph",
          text: "Modbus is the industry-standard communication protocol for industrial and agricultural sensors. It uses a master-slave architecture where a central controller (master) queries field devices (slaves) for sensor readings. Modbus RTU operates over RS-485 serial connections, making it ideal for long-distance field wiring.",
        },
        {
          type: "paragraph",
          text: "In the AgroAI AgroSensor module, Modbus connects soil sensor probes to the data acquisition system. Each sensor has a unique slave ID, and the master polls them in sequence using function codes. Function code 03 reads holding registers (sensor values), while function code 06 writes configuration parameters.",
        },
        {
          type: "paragraph",
          text: "Key Modbus concepts include: register maps (memory layout of sensor data), baud rate (communication speed, typically 9600 or 19200), parity checking (for error detection), and polling intervals (how often sensors are read). Understanding register maps is crucial — each sensor stores its readings at specific register addresses.",
        },
        {
          type: "quiz",
          title: "Modbus Communication",
          passPercent: 60,
          questions: [
            {
              question: "What communication architecture does Modbus use?",
              options: [
                "Peer-to-peer",
                "Master-slave (client-server)",
                "Broadcast only",
                "Mesh networking",
              ],
              answerIndex: 1,
            },
            {
              question: "Which Modbus function code is used to read sensor values from holding registers?",
              options: ["Function code 01", "Function code 03", "Function code 05", "Function code 15"],
              answerIndex: 1,
            },
            {
              question: "Why is Modbus RTU well-suited for agricultural field installations?",
              options: [
                "It uses WiFi exclusively",
                "RS-485 supports long-distance wiring in harsh environments",
                "It requires no wiring",
                "It only works underground",
              ],
              answerIndex: 1,
            },
            {
              question: "What is a 'register map' in Modbus?",
              options: [
                "A map of the farm layout",
                "The memory layout showing where sensor data is stored",
                "A list of all connected devices",
                "The network topology diagram",
              ],
              answerIndex: 1,
            },
          ],
        },
      ],
    },
    {
      title: "Data Acquisition & Storage Pipelines",
      content: [
        {
          type: "paragraph",
          text: "Raw sensor data must be collected, validated, cleaned, and stored in a structured format before it can be used for analysis. A robust data pipeline handles sensor drift detection, outlier filtering, missing data interpolation, and timestamp alignment. The AgroAI system uses PostgreSQL as its time-series data store.",
        },
        {
          type: "paragraph",
          text: "Data quality is a major challenge in field-deployed sensors. Environmental factors like temperature extremes, moisture ingress, and power fluctuations can cause sensor readings to drift or produce anomalous values. Statistical methods like Z-score filtering, rolling median smoothing, and interquartile range (IQR) detection help identify and handle bad data points.",
        },
        {
          type: "paragraph",
          text: "The pipeline architecture follows a standard pattern: Sensors → Modbus Gateway → Data Acquisition Service → Validation & Cleaning → PostgreSQL Database → API Layer → Dashboard/ML Models. Each stage adds value — the acquisition service handles timing and retries, validation ensures data quality, and the API layer makes clean data available to downstream consumers.",
        },
        {
          type: "quiz",
          title: "Data Pipelines",
          passPercent: 60,
          questions: [
            {
              question: "What is the first step after raw sensor data is collected?",
              options: [
                "Display on dashboard",
                "Data validation and cleaning",
                "Machine learning analysis",
                "Share with other farmers",
              ],
              answerIndex: 1,
            },
            {
              question: "Which statistical method uses the distance from the mean in standard deviation units to detect outliers?",
              options: ["Rolling median", "Z-score filtering", "Linear regression", "K-means clustering"],
              answerIndex: 1,
            },
            {
              question: "Why is missing data interpolation important in agricultural sensor data?",
              options: [
                "It makes the database smaller",
                "Sensors may skip readings due to power or communication failures",
                "It increases sensor accuracy",
                "It reduces storage costs",
              ],
              answerIndex: 1,
            },
            {
              question: "In the AgroAI pipeline, where does clean data go after validation?",
              options: [
                "Directly to the farmer's phone",
                "PostgreSQL database",
                "A CSV file on a USB drive",
                "The sensor itself",
              ],
              answerIndex: 1,
            },
          ],
        },
      ],
    },
    {
      title: "Real-Time Dashboards & Visualization",
      content: [
        {
          type: "paragraph",
          text: "Real-time dashboards transform raw sensor data into actionable insights for farmers. Effective dashboards show current soil conditions, historical trends, threshold alerts, and spatial maps of field variability. The AgroAI system includes a real-time dashboard that displays live sensor readings alongside weather data.",
        },
        {
          type: "paragraph",
          text: "Key dashboard components include: gauge charts for current readings (NPK, pH, moisture), line charts for historical trends, heat maps for spatial soil variability, and alert panels for threshold violations. Time-series visualization helps farmers identify patterns — seasonal nutrient depletion, moisture stress periods, and optimal planting windows.",
        },
        {
          type: "paragraph",
          text: "Alert systems are critical for timely intervention. When soil moisture drops below a crop-specific threshold, or EC rises indicating salt buildup, the dashboard triggers visual and push notification alerts. Configurable thresholds allow farmers to customize alerts based on crop stage, soil type, and management preferences.",
        },
        {
          type: "quiz",
          title: "Dashboards & Visualization",
          passPercent: 60,
          questions: [
            {
              question: "Which chart type is best for showing real-time sensor readings with historical context?",
              options: ["Pie chart", "Line chart with time axis", "Scatter plot", "Word cloud"],
              answerIndex: 1,
            },
            {
              question: "What visualization shows spatial soil variability across a field?",
              options: ["Bar chart", "Heat map", "Gauge chart", "Text table"],
              answerIndex: 1,
            },
            {
              question: "Why are configurable threshold alerts important for farmers?",
              options: [
                "They look nice on the dashboard",
                "Different crops and soil types need different trigger levels",
                "They reduce data storage needs",
                "They speed up sensor communication",
              ],
              answerIndex: 1,
            },
            {
              question: "What pattern can historical soil moisture trends reveal?",
              options: [
                "The color of the soil",
                "Seasonal stress periods and optimal irrigation timing",
                "The farmer's name",
                "The GPS coordinates of the sensor",
              ],
              answerIndex: 1,
            },
          ],
        },
      ],
    },
    {
      title: "Deploying Field Sensor Networks",
      content: [
        {
          type: "paragraph",
          text: "Deploying IoT sensor networks in the field requires careful planning around sensor placement, power supply, connectivity, and weatherproofing. Sensor locations should represent the spatial variability of the field — avoid placing all sensors in the best or worst spot. Grid-based or zone-based placement strategies ensure representative coverage.",
        },
        {
          type: "paragraph",
          text: "Power management is a major challenge for remote field deployments. Solar panels with battery backup are the standard solution for off-grid locations. Low-power sensor nodes can operate for months on a single battery charge by using duty-cycling — sleeping between measurement intervals.",
        },
        {
          type: "paragraph",
          text: "Environmental protection is essential. Sensor enclosures must be IP67-rated or higher to withstand rain, flooding, and soil contact. Cable management prevents rodent damage and water ingress at connection points. Regular maintenance schedules should include sensor calibration checks, battery replacement, and data quality audits.",
        },
        {
          type: "quiz",
          title: "Field Deployment",
          passPercent: 60,
          questions: [
            {
              question: "Why should sensors be placed to represent field variability rather than just the best spots?",
              options: [
                "It looks better on a map",
                "To get representative data for the whole field",
                "Sensors are cheaper in bad spots",
                "It doesn't matter where sensors are placed",
              ],
              answerIndex: 1,
            },
            {
              question: "What is the standard power solution for remote off-grid sensor deployments?",
              options: [
                "Grid electricity only",
                "Solar panels with battery backup",
                "Wind turbines exclusively",
                "Diesel generators",
              ],
              answerIndex: 1,
            },
            {
              question: "What does duty-cycling mean for field sensors?",
              options: [
                "Cycling through different soil types",
                "Sleeping between measurement intervals to save power",
                "Calibrating sensors on a daily schedule",
                "Moving sensors to different locations",
              ],
              answerIndex: 1,
            },
            {
              question: "What IP rating should sensor enclosures have for outdoor agricultural use?",
              options: ["IP20 (indoor only)", "IP67 or higher (waterproof)", "IP00 (no protection)", "IP10 (splash proof)"],
              answerIndex: 1,
            },
          ],
        },
      ],
    },
  ],
};
