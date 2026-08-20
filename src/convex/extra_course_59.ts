import type { ExtraCourse } from "./schema";

export const extraCourse59: ExtraCourse = {
  title: "Smart Irrigation with IoT & AI",
  description: "Design and implement intelligent irrigation systems using IoT sensors, weather data, and AI algorithms to optimize water usage, reduce costs, and improve crop health.",
  category: "AI in Agriculture",
  duration: "8 weeks",
  difficulty: "Intermediate",
  priceCents: 0,
  durationMinutes: 2400,
  instructor: "Dr. Elena Rodriguez",
  instructorTitle: "Agricultural IoT Engineer",
  tags: ["IoT", "Smart Irrigation", "Water Management", "AI", "Sensors"],
  order: 59,
  modules: [
    {
      title: "Fundamentals of Agricultural Irrigation",
      content: [
        { type: "paragraph", text: "Irrigation accounts for 70% of global freshwater use. Smart irrigation with AI can reduce water consumption by 20-40% while maintaining or improving yields. This module establishes the fundamentals of agricultural irrigation." },
        { type: "paragraph", text: "Irrigation Methods: Surface (flood/furrow), Sprinkler (impact, rotary, pivot), Drip (inline, micro-sprinkler), Subsurface. Each has different efficiency rates: flood (40-60%), sprinkler (60-80%), drip (90-98%). Smart systems enhance any method." },
        { type: "paragraph", text: "Crop Water Requirements: Reference evapotranspiration (ET₀) × Crop coefficient (Kc) = Crop ET (ETc). FAO Penman-Monteith equation calculates ET₀ from weather data. Kc varies by crop and growth stage (e.g., corn: 0.3 at emergence → 1.2 at peak → 0.5 at maturity)." },
        { type: "paragraph", text: "Water Balance: Soil Water Balance = Previous Water + Irrigation + Rain - ET - Deep Percolation - Runoff. Maintaining this balance within the Managed Allowable Depletion (MAD) range (typically 30-50% of available water) is the goal of smart irrigation." },
        { type: "paragraph", text: "Water Stress Indicators: Stomatal closure (reduced transpiration), leaf temperature increase, canopy spectral changes (NDWI, CWSI), soil water potential decline, turgor pressure loss. AI detects these stress indicators before visible wilting." },
        { type: "video", caption: "Watch: The Science of Crop Water Needs — Understanding evapotranspiration, crop coefficients, and water balance for precision irrigation.", url: "https://example.com/smart-irrigation/fundamentals" },
        { type: "quiz", title: "Module Quiz", questions: [
          { question: "What is the typical water efficiency of drip irrigation?", options: ["40-60%", "60-80%", "90-98%", "100%"], answerIndex: 2, explanation: "Drip irrigation delivers water directly to root zones with 90-98% efficiency, minimizing evaporation and runoff losses." },
          { question: "How is crop water requirement calculated?", options: ["Rainfall × crop height", "Reference ET × crop coefficient (Kc)", "Soil moisture × temperature", "Farmer experience only"], answerIndex: 1, explanation: "Crop ET = Reference ET₀ × Kc. The crop coefficient adjusts for crop type, growth stage, and canopy cover." }
        ], passPercent: 70 }
      ]
    },
    {
      title: "IoT Sensors for Water Management",
      content: [
        { type: "paragraph", text: "IoT sensors form the backbone of smart irrigation systems. This module covers the types of sensors, their placement, data collection, and communication protocols." },
        { type: "paragraph", text: "Soil Moisture Sensors: (1) Capacitance sensors (measure dielectric constant), (2) Tensiometers (measure soil water tension), (3) TDR/FDR (time/frequency domain reflectometry), (4) Granular matrix sensors. Accuracy ranges ±1-3% volumetric water content." },
        { type: "paragraph", text: "Sensor Placement: Depth matters—typically at 3 depths per station: 15cm (shallow root zone), 30cm (main root zone), 60cm (deep drainage). Place in representative areas, avoid edges, slopes, and atypical spots. Minimum 1 station per 5-10 acres for uniform fields." },
        { type: "paragraph", text: "Weather Stations: On-farm weather stations measure temperature, humidity, wind speed, solar radiation, and rainfall. Data feeds ET₀ calculations. Cost: $500-5,000 depending on accuracy. Complement with nearby reference stations for redundancy." },
        { type: "paragraph", text: "Communication Protocols: LoRaWAN (long range, low power, 2-10km), NB-IoT (cellular, wide coverage), Zigbee (short range, mesh networking), WiFi (high bandwidth, limited range), Bluetooth LE (very low power, short range). Selection depends on field size and infrastructure." },
        { type: "paragraph", text: "Edge Computing: Process sensor data locally at the field edge before sending to cloud. Benefits: reduced bandwidth (send anomalies instead of all data), faster response (irrigation decisions in seconds, not minutes), offline operation (works when connectivity drops)." },
        { type: "video", caption: "Watch: Setting Up an IoT Irrigation Sensor Network — Sensor selection, placement strategies, and communication architecture for field monitoring.", url: "https://example.com/smart-irrigation/iot-sensors" },
        { type: "quiz", title: "Module Quiz", questions: [
          { question: "How many soil moisture depths are typically monitored per station?", options: ["1", "2", "3", "5"], answerIndex: 2, explanation: "Three depths (15cm, 30cm, 60cm) capture shallow root activity, main root zone moisture, and deep drainage patterns." },
          { question: "Which communication protocol is best for large farms with sensors kilometers apart?", options: ["WiFi", "Bluetooth LE", "LoRaWAN", "Zigbee"], answerIndex: 2, explanation: "LoRaWAN provides 2-10km range with very low power consumption, making it ideal for large agricultural fields where sensors are spread far apart." }
        ], passPercent: 70 }
      ]
    },
    {
      title: "AI Algorithms for Irrigation Scheduling",
      content: [
        { type: "paragraph", text: "AI transforms raw sensor data into intelligent irrigation decisions. This module covers the algorithms that determine when, where, and how much to irrigate." },
        { type: "paragraph", text: "Rule-Based Systems: Simple threshold triggers (irrigate when soil moisture < 50% MAD). Easy to implement but don't account for forecasts, crop stage changes, or system interactions. Good baseline for comparison." },
        { type: "paragraph", text: "Machine Learning Models: Random Forest and XGBoost predict crop water stress from soil moisture, weather, and growth stage data. Train on historical irrigation records and yield outcomes to learn optimal irrigation timing." },
        { type: "paragraph", text: "Reinforcement Learning (RL): RL agents learn irrigation policies by maximizing a reward function (yield + water savings). The agent observes current state (soil moisture, weather forecast, crop stage), decides irrigation action, and observes the outcome. Over many episodes, it learns optimal strategies." },
        { type: "paragraph", text: "Model Predictive Control (MPC): Uses weather forecasts (7-day) + crop model + soil water model to optimize irrigation schedules over a planning horizon. Minimizes water use while keeping soil moisture within target range. Industry standard for advanced systems." },
        { type: "paragraph", text: "Fuzzy Logic: Handles imprecise inputs ('somewhat dry', 'hot tomorrow') using membership functions and rule bases. Particularly useful for farmer expertise integration—can encode expert knowledge as fuzzy rules alongside data-driven models." },
        { type: "video", caption: "Watch: AI Irrigation Decision Algorithms — Comparing rule-based, ML, reinforcement learning, and MPC approaches for water optimization.", url: "https://example.com/smart-irrigation/ai-algorithms" },
        { type: "paragraph", text: "Hybrid Approach: The most effective systems combine physics-based crop/soil water models with ML. Physics provides generalization (works for new conditions), ML provides accuracy (captures field-specific patterns the physics model misses)." },
        { type: "quiz", title: "Module Quiz", questions: [
          { question: "Which AI approach uses weather forecasts to optimize irrigation over a planning horizon?", options: ["Threshold-based", "Reinforcement Learning", "Model Predictive Control", "Fuzzy Logic"], answerIndex: 2, explanation: "MPC uses weather forecasts combined with crop and soil models to optimize irrigation decisions over a multi-day planning horizon." },
          { question: "Why are hybrid physics-ML models effective for irrigation?", options: ["They are simpler to implement", "Physics provides generalization, ML captures field-specific patterns", "They don't need training data", "They work offline"], answerIndex: 1, explanation: "Physics-based models generalize to new conditions while ML models learn field-specific patterns that the general model misses, combining the strengths of both approaches." }
        ], passPercent: 70 }
      ]
    },
    {
      title: "Variable Rate Irrigation Systems",
      content: [
        { type: "paragraph", text: "Variable Rate Irrigation (VRI) applies different amounts of water to different zones within a field. Combined with AI, VRI ensures each zone gets exactly what it needs—no more, no less." },
        { type: "paragraph", text: "VRI Technologies: (1) Center pivot VRI (individual sprinkler control), (2) Lateral move VRI, (3) Drip system VRI (zone valves or pressure regulation), (4) Sprinkler systems with individual nozzle control. Resolution varies from 5m to 50m zones." },
        { type: "paragraph", text: "Prescription Maps: AI generates zone-specific irrigation prescriptions based on: soil type zones, topography (low spots accumulate water), crop health maps, historical yield zones, and sensor readings. Maps are formatted for controller import (ISOXML, ESRI shapefile)." },
        { type: "paragraph", text: "Zone Delineation: Use EC (electrical conductivity) mapping, topographic analysis (DEM from LiDAR), satellite imagery clustering, or k-means clustering of sensor data to define management zones. Aim for 3-8 zones per field for practical management." },
        { type: "paragraph", text: "Calibration and Validation: Verify actual application uniformity using catch can tests. Calibrate flow meters and pressure sensors. Validate AI recommendations against soil moisture sensor responses. Iterate on zone definitions based on multi-season data." },
        { type: "paragraph", text: "ROI of VRI: Water savings of 15-30% compared to uniform irrigation. Energy savings of 10-20% (less pumping). Yield increase of 5-15% in previously over/under-watered zones. Typical payback: 2-4 years depending on field variability." },
        { type: "video", caption: "Watch: Variable Rate Irrigation in Practice — From soil mapping to prescription maps to system calibration for precision water application.", url: "https://example.com/smart-irrigation/vri-systems" },
        { type: "quiz", title: "Module Quiz", questions: [
          { question: "How many management zones per field is practical for VRI?", options: ["1-2", "3-8", "20-50", "100+"], answerIndex: 1, explanation: "3-8 zones balance precision with practical manageability. Too many zones increase complexity without proportional benefit." },
          { question: "What is the typical water savings from VRI compared to uniform irrigation?", options: ["1-5%", "15-30%", "50-70%", "90%+"], answerIndex: 1, explanation: "VRI typically saves 15-30% water by applying more to dry zones and less to wet zones compared to uniform application." }
        ], passPercent: 70 }
      ]
    },
    {
      title: "Water Quality Monitoring with AI",
      content: [
        { type: "paragraph", text: "Smart irrigation extends beyond water quantity to water quality. AI-powered sensors monitor water quality parameters that affect crop health, soil condition, and system longevity." },
        { type: "paragraph", text: "Key Water Quality Parameters: pH (optimal 5.5-7.0 for most crops), electrical conductivity/salinity (EC), dissolved oxygen, turbidity, temperature, nutrient concentrations (N, P, K), heavy metals, bacterial contamination." },
        { type: "paragraph", text: "Sensor Technology: Multi-parameter water quality sondes, inline EC/pH sensors, optical dissolved oxygen sensors, turbidity sensors, spectrophotometric nutrient analyzers. Continuous monitoring vs. periodic sampling trade-offs." },
        { type: "paragraph", text: "AI for Quality Prediction: ML models predict water quality changes based on source, season, and upstream conditions. Time-series anomaly detection identifies contamination events. Classification models determine water suitability for different crops." },
        { type: "paragraph", text: "Salinity Management: AI monitors soil EC to detect salt accumulation. Models predict salinity buildup from irrigation water quality and evapotranspiration rates. Automated recommendations for leaching fractions and drainage management." },
        { type: "paragraph", text: "Fertigation Optimization: AI-controlled fertigation injects nutrients based on real-time soil sensor data, crop growth stage, and nutrient uptake models. Saves 20-40% fertilizer compared to calendar-based applications while improving nutrient use efficiency." },
        { type: "video", caption: "Watch: AI Water Quality Monitoring — Using sensors and machine learning to ensure irrigation water quality and optimize fertigation programs.", url: "https://example.com/smart-irrigation/water-quality" },
        { type: "quiz", title: "Module Quiz", questions: [
          { question: "What is the optimal pH range for most crops?", options: ["3.0-4.0", "5.5-7.0", "8.0-9.0", "10.0-12.0"], answerIndex: 1, explanation: "Most crops thrive in slightly acidic to neutral soil (pH 5.5-7.0), which optimizes nutrient availability." },
          { question: "How much fertilizer can AI-controlled fertigation save compared to calendar-based methods?", options: ["1-5%", "10-15%", "20-40%", "50-70%"], answerIndex: 2, explanation: "AI fertigation delivers nutrients precisely when and where crops need them, reducing waste by 20-40% compared to fixed-schedule applications." }
        ], passPercent: 70 }
      ]
    },
    {
      title: "System Integration & Water Conservation",
      content: [
        { type: "paragraph", text: "The final module integrates all components into a complete smart irrigation system and explores advanced water conservation strategies powered by AI." },
        { type: "paragraph", text: "System Architecture: Field sensors → Edge gateway → Cloud platform → AI engine → Irrigation controller → Valves/pumps. Feedback loop: apply water → measure response → adjust model → optimize next irrigation. Closed-loop automation reduces human error." },
        { type: "paragraph", text: "Cloud Platforms: AWS IoT Core, Google Cloud IoT, Azure IoT Hub, or open-source alternatives (ThingsBoard, Mainflux). These provide device management, data storage, rule engines, and integration points for AI services." },
        { type: "paragraph", text: "Water Budgeting with AI: Multi-field water allocation optimization across a farm with limited water rights. AI considers crop value, growth stage, soil conditions, and water availability to maximize farm-wide return per unit of water." },
        { type: "paragraph", text: "Deficit Irrigation Strategies: AI-identified critical growth periods receive full irrigation; non-critical periods receive reduced water. Regulated Deficit Irrigation (RDI) saves 20-40% water with minimal yield impact in many fruit and nut crops." },
        { type: "paragraph", text: "Integration with Water Markets: In regions with water trading, AI can optimize the decision between using water on crops vs. selling water rights. Dynamic optimization based on crop value, water price, and alternative use value." },
        { type: "video", caption: "Watch: Building a Complete Smart Irrigation System — End-to-end integration from sensors through AI to automated water application with conservation strategies.", url: "https://example.com/smart-irrigation/system-integration" },
        { type: "paragraph", text: "Global Impact: If smart irrigation were adopted on 30% of irrigated farmland globally, it would save approximately 48 billion cubic meters of water annually—enough to supply 1.8 billion people with drinking water." },
        { type: "quiz", title: "Module Quiz", questions: [
          { question: "What is Regulated Deficit Irrigation (RDI)?", options: ["Irrigating at maximum capacity at all times", "Reducing water during non-critical growth periods while maintaining full irrigation during critical stages", "Never irrigating", "Only irrigating during droughts"], answerIndex: 1, explanation: "RDI strategically reduces water during non-critical periods, saving 20-40% water with minimal yield impact while maintaining full irrigation during the most sensitive growth stages." },
          { question: "What enables closed-loop automation in smart irrigation?", options: ["Manual farmer input", "The feedback loop of apply → measure → adjust → optimize", "Fixed timer schedules", "Weather almanacs"], answerIndex: 1, explanation: "Closed-loop automation continuously monitors soil moisture response to irrigation and adjusts future applications, creating a self-correcting system." }
        ], passPercent: 70 }
      ]
    }
  ]
};
