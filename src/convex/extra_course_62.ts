import type { ExtraCourse } from "./schema";

export const extraCourse62: ExtraCourse = {
  title: "Robotics in Agriculture",
  description: "Explore autonomous farming robots, from self-driving tractors to harvesting robots and weeding bots, learning the AI that powers them and how to integrate them into farm operations.",
  category: "AI in Agriculture",
  duration: "8 weeks",
  difficulty: "Advanced",
  priceCents: 0,
  durationMinutes: 2400,
  instructor: "Dr. Tomoko Tanaka",
  instructorTitle: "Agricultural Robotics Engineer",
  tags: ["Robotics", "Autonomous Vehicles", "Navigation", "Manipulation", "AgTech"],
  order: 62,
  modules: [
    {
      title: "Introduction to Agricultural Robotics",
      content: [
        { type: "paragraph", text: "Agricultural robotics is transforming farming from labor-intensive manual work to precision automated operations. This module introduces the landscape of agricultural robots and their capabilities." },
        { type: "paragraph", text: "Why Robotics in Agriculture? Global labor shortages (30% deficit in agricultural workers), rising labor costs, demand for precision beyond human capability, 24/7 operation potential, and consistency that eliminates human error. Robotics addresses all four challenges simultaneously." },
        { type: "paragraph", text: "Types of Agricultural Robots: (1) Autonomous tractors and implements, (2) Weeding robots (mechanical, laser, targeted spray), (3) Harvesting robots (fruit picking, vegetable harvesting), (4) Seeding and planting robots, (5) Scouting and monitoring robots, (6) Milking and livestock robots." },
        { type: "paragraph", text: "Key Technologies: GPS/GNSSRTK positioning (cm-level accuracy), LiDAR (3D environment mapping), computer vision (object detection, segmentation), path planning algorithms, robotic manipulation (grippers, end effectors), and AI decision-making systems." },
        { type: "paragraph", text: "Market Landscape: Ag robotics market growing at 22% CAGR, reaching $20B by 2030. Key players: John Deere (autonomous tractors), Blue River Technology (See & Spray), Agrobot (strawberry picking), Naio Technologies (weeding), Lely (dairy robots)." },
        { type: "paragraph", text: "Adoption Challenges: High upfront cost ($100K-500K), connectivity requirements, regulatory uncertainty, farmer trust, and the need for farm infrastructure adaptation. Shared ownership models and Robotics-as-a-Service (RaaS) lower barriers to entry." },
        { type: "video", caption: "Watch: The Rise of Agricultural Robots — How autonomous machines are transforming farming operations worldwide.", url: "https://example.com/ag-robotics/introduction" },
        { type: "quiz", title: "Module Quiz", questions: [
          { question: "What is the primary driver of agricultural robotics adoption?", options: ["Farmer preference", "Global labor shortages and rising costs", "Government mandates", "Robot price decreases"], answerIndex: 1, explanation: "The 30% deficit in agricultural workers and rising labor costs are the primary economic drivers pushing adoption of agricultural robotics." },
          { question: "What does RTK GPS provide for autonomous farm vehicles?", options: ["1-meter accuracy", "Centimeter-level positioning accuracy", "1-kilometer accuracy", "Weather forecasting"], answerIndex: 1, explanation: "RTK (Real-Time Kinematic) GPS provides centimeter-level positioning accuracy, essential for precise row following, automated plowing, and targeted spraying." }
        ], passPercent: 70 }
      ]
    },
    {
      title: "Navigation & Path Planning",
      content: [
        { type: "paragraph", text: "Autonomous farm robots must navigate complex field environments safely and efficiently. This module covers localization, mapping, and path planning algorithms for agricultural settings." },
        { type: "paragraph", text: "Localization: RTK-GPS provides global position, but field obstacles require additional sensing. Visual-inertial odometry (VIO) fuses camera and IMU data for continuous localization. SLAM (Simultaneous Localization and Mapping) builds maps while navigating unknown areas." },
        { type: "paragraph", text: "Sensor Fusion for Navigation: Combine RTK-GPS (position), IMU (orientation, acceleration), LiDAR (3D obstacle detection), cameras (visual features, crop detection), wheel encoders (odometry). Extended Kalman Filter or factor graph optimization merge these sources optimally." },
        { type: "paragraph", text: "Field Coverage Path Planning: Optimal patterns for complete field coverage: (1) Boustrophedon (back-and-forth), (2) Spiral, (3) Contour following, (4) Sector decomposition. Optimization minimizes turning, overlap, and energy use. Headland management adds buffer zones." },
        { type: "paragraph", text: "Dynamic Obstacle Avoidance: Detecting and avoiding unexpected obstacles (rocks, animals, people, debris) using LiDAR point clouds and camera feeds. DWA (Dynamic Window Approach) and TEB (Timed Elastic Band) planners enable real-time path adjustment." },
        { type: "paragraph", text: "Multi-Robot Coordination: Coordinating multiple robots in the same field without collisions or work duplication. Task allocation algorithms (auction-based, market-based), communication protocols, and decentralized decision-making for scalable fleet management." },
        { type: "video", caption: "Watch: Robot Navigation in Farm Fields — How autonomous robots find their way through rows, around obstacles, and across entire fields.", url: "https://example.com/ag-robotics/navigation" },
        { type: "quiz", title: "Module Quiz", questions: [
          { question: "What does SLAM stand for in robot navigation?", options: ["Sensor-Laser Array Mapping", "Simultaneous Localization and Mapping", "System-Level Area Monitoring", "Standard Land Assessment Method"], answerIndex: 1, explanation: "SLAM (Simultaneous Localization and Mapping) enables robots to build a map of an unknown environment while simultaneously tracking their position within it." },
          { question: "Which path planning pattern is most common for field robots?", options: ["Random walk", "Boustrophedon (back-and-forth)", "Figure-8", "Spiral outward"], answerIndex: 1, explanation: "Boustrophedon (back-and-forth) paths provide complete coverage with minimal turning, making them the most efficient pattern for most field operations." }
        ], passPercent: 70 }
      ]
    },
    {
      title: "Robotic Manipulation & Harvesting",
      content: [
        { type: "paragraph", text: "Harvesting is the most challenging agricultural robotics task—requiring delicate handling of variable, irregularly-shaped produce. This module covers robotic manipulation technologies for crop harvesting." },
        { type: "paragraph", text: "Gripper Technologies: (1) Soft grippers (silicone fingers, gentle for delicate fruit), (2) Vacuum grippers (high-speed for uniform produce), (3) Mechanical grippers (adaptive fingers for varied shapes), (4) Magnetic/gecko adhesives (experimental), (5) Cutting mechanisms (for stem crops)." },
        { type: "paragraph", text: "Harvest Detection: Computer vision locates ripe produce using: color analysis (hue/saturation thresholds), shape detection (circularity, size), depth estimation (distance from camera), and spectral indices (sugar content estimation from reflectance). Accuracy: 90-98% for major fruit crops." },
        { type: "paragraph", text: "Motion Planning for Harvesting: Arm trajectory planning that avoids crop damage, neighboring fruit, and structural elements. RRT (Rapidly-exploring Random Tree) and CHOMP (Covariant Hamiltonian Optimization) planners generate collision-free paths." },
        { type: "paragraph", text: "Soft Robotics: Bio-inspired grippers that conform to fruit shape without bruising. Pneumatic soft actuators, jamming grippers (granular material stiffens around object), and tendon-driven fingers. Some achieve <5g bruising force—gentler than human hands." },
        { type: "paragraph", text: "Harvest Robot Platforms: Agrobot SW6010 (strawberry picking with 24 arms), Abundant Robotics (apple picking with vacuum), Octinion (tomato picking), Burroway (citrus). Speed: 1-5 seconds per fruit vs. 2-3 seconds for skilled human pickers." },
        { type: "video", caption: "Watch: Harvesting Robots in Action — From strawberry pickers to apple harvesters, how robots handle delicate produce with precision and care.", url: "https://example.com/ag-robotics/harvesting" },
        { type: "quiz", title: "Module Quiz", questions: [
          { question: "Which gripper technology is best for delicate berries?", options: ["Mechanical steel gripper", "Soft silicone pneumatic gripper", "Vacuum gripper", "Magnetic gripper"], answerIndex: 1, explanation: "Soft pneumatic grippers conform to berry shapes with gentle pressure (<5g force), preventing bruising while maintaining secure grip during picking." },
          { question: "How does computer vision determine fruit ripeness?", options: ["By weight", "Color analysis, shape detection, and spectral indices", "By smell", "By touch sensors"], answerIndex: 1, explanation: "Computer vision uses color (hue shifts during ripening), shape (size and circularity), and spectral reflectance (sugar content correlates with light absorption patterns)." }
        ], passPercent: 70 }
      ]
    },
    {
      title: "Weeding Robots & Precision Application",
      content: [
        { type: "paragraph", text: "Weeding robots eliminate the need for broadcast herbicide application by identifying and removing individual weeds. This module covers the technologies behind autonomous weeding systems." },
        { type: "paragraph", text: "Mechanical Weeding: Robots with cultivator attachments physically remove weeds between crop rows. Companies: Naio Technologies (Oz/Dino), FarmWise (Tillie), Carbon Robotics (LaserWeeder). Mechanical methods work without chemicals but require precise row following." },
        { type: "paragraph", text: "Laser Weeding: High-powered CO₂ lasers (150W) instantly kill weeds by disrupting cell membranes. Carbon Robotics' LaserWeeder processes 200,000 weeds/hour with <0.5% crop damage. Works day or night, in any weather, with zero chemical input." },
        { type: "paragraph", text: "Targeted Micro-Spraying: Blue River Technology (See & Spray) uses cameras to identify weeds in real-time and applies herbicide only to detected weeds. Reduces herbicide use by 77%. Individual nozzle control at 20Hz switching rate." },
        { type: "paragraph", text: "Weed Detection AI: Real-time semantic segmentation classifies each pixel as crop or weed. Challenges: early-season similarity between crop and weed seedlings, variable lighting, soil clods mimicking weeds. Models trained on 100K+ labeled images per crop-weed combination." },
        { type: "paragraph", text: "Integrated Weed Management: Robots combine multiple strategies: (1) Pre-emergence thermal treatment, (2) In-season mechanical/laser weeding, (3) Targeted micro-spraying as last resort, (4) Cover crop seeding for long-term suppression. Reduces herbicide dependence by 80-100%." },
        { type: "video", caption: "Watch: Laser Weeding Robots — How Carbon Robotics' LaserWeeder eliminates 200,000 weeds per hour without chemicals.", url: "https://example.com/ag-robotics/weeding-robots" },
        { type: "quiz", title: "Module Quiz", questions: [
          { question: "How many weeds per hour can the Carbon Robotics LaserWeeder process?", options: ["1,000", "10,000", "100,000", "200,000"], answerIndex: 3, explanation: "The LaserWeeder processes 200,000 weeds per hour using high-powered CO₂ lasers, making it significantly faster than manual weeding or traditional cultivation." },
          { question: "How much herbicide reduction does See & Spray technology achieve?", options: ["10-20%", "30-40%", "50-60%", "77%"], answerIndex: 3, explanation: "See & Spray applies herbicide only to detected weeds rather than broadcast spraying, reducing herbicide use by approximately 77%." }
        ], passPercent: 70 }
      ]
    },
    {
      title: "Livestock Robotics & Dairy Automation",
      content: [
        { type: "paragraph", text: "Robotic systems for livestock operations handle milking, feeding, health monitoring, and manure management. Dairy farming has been revolutionized by robotic milking—over 40,000 systems installed globally." },
        { type: "paragraph", text: "Robotic Milking Systems: Automated milking parlors (Lely Astronaut, DeLaval VMS) allow cows to be milked on demand 2-3 times daily. Robotic arms clean teats, attach cups, monitor milk quality (conductivity, color, flow), and detach when complete. Reduces labor by 50-70%." },
        { type: "paragraph", text: "Automated Feeding: Total Mixed Ration (TMR) robots (Lely Juno, Trioliet) distribute feed along barn alleys. Automatic push-up robots keep feed within cow reach. GPS-guided feed mixing wagons deliver precise rations to pasture-based systems." },
        { type: "paragraph", text: "Health Monitoring: Wearable sensors (collars, ear tags, leg bands) track activity, rumination, body temperature, and eating patterns. AI detects illness 24-48 hours before visible symptoms: mastitis, lameness, ketosis, displaced abomasum. Alert accuracy: 85-95%." },
        { type: "paragraph", text: "Dairy Farm Management AI: Systems integrate milking data (yield, quality, somatic cell count), feeding data, activity data, and reproductive status. Predict optimal insemination timing (90%+ accuracy), detect pregnancy, and forecast milk production 30-60 days ahead." },
        { type: "paragraph", text: "Manure Management Robots: Automated scrapers, solid-liquid separators, and composting systems. Biogas production from manure via anaerobic digesters. AI optimizes digester operation (feedstock mix, temperature, retention time) for maximum methane yield." },
        { type: "video", caption: "Watch: Robotic Dairy Farming — How Lely Astronaut milking robots and sensor networks transformed the modern dairy operation.", url: "https://example.com/ag-robotics/livestock-robots" },
        { type: "quiz", title: "Module Quiz", questions: [
          { question: "How much labor can robotic milking systems reduce?", options: ["10-20%", "30-40%", "50-70%", "90-100%"], answerIndex: 2, explanation: "Robotic milking systems reduce milking labor by 50-70%, allowing cows to milk voluntarily on demand while sensors monitor milk quality automatically." },
          { question: "How far in advance can health monitoring sensors detect cattle illness?", options: ["1-6 hours", "24-48 hours", "1-2 weeks", "1 month"], answerIndex: 1, explanation: "Wearable sensors detect behavioral changes (reduced rumination, altered activity) 24-48 hours before visible symptoms, enabling early treatment." }
        ], passPercent: 70 }
      ]
    },
    {
      title: "Future of Agricultural Robotics",
      content: [
        { type: "paragraph", text: "The final module explores emerging technologies and trends that will define the next generation of agricultural robots, from swarms of tiny bots to fully autonomous farms." },
        { type: "paragraph", text: "Swarm Robotics: Instead of one large tractor, deploy hundreds of small robots that work in parallel. Each robot weighs <100kg, reducing soil compaction. Coordinated by AI for task allocation. Examples: Small Robot Company's Tom, Dick, and Harry bots." },
        { type: "paragraph", text: "Under-canopy Robots: Small robots that operate beneath crop canopy in high-value crops (vegetables, vineyards, orchards). Navigate narrow spaces, monitor individual plants, and perform precision tasks that large equipment cannot reach." },
        { type: "paragraph", text: "Flying Robots (Agricultural Drones): Beyond monitoring—drones now perform targeted spraying (DJI Agras), pollination (Xoalotl), release beneficial insects, and plant seed pods (DroneSeed for reforestation). Heavy-lift drones carry 10-50kg payloads." },
        { type: "paragraph", text: "Autonomous Farm Systems: Fully autonomous operations from planting through harvest. John Deere's autonomous tractor, CNBC's autonomous sprayer, and emerging grain cart and harvest support robots. The 'dark farm' concept: farms that operate 24/7 with minimal human presence." },
        { type: "paragraph", text: "Regulatory & Ethical Landscape: Autonomous vehicle regulations, liability for robot-caused damage, data ownership, rural connectivity requirements, and workforce transition programs. Policy must evolve alongside technology to enable responsible adoption." },
        { type: "video", caption: "Watch: The Autonomous Farm of 2035 — Swarms of small robots, flying systems, and AI coordination working together to farm without human labor.", url: "https://example.com/ag-robotics/future-robots" },
        { type: "paragraph", text: "Getting Started: Begin with scouting robots (lowest cost, highest learning value), progress to weeding robots (immediate ROI from reduced inputs), then consider harvesting robots for high-value crops. RaaS models let you try before buying." },
        { type: "quiz", title: "Module Quiz", questions: [
          { question: "What is the key advantage of swarm robotics over single large robots?", options: ["Lower AI requirements", "Reduced soil compaction and parallel task execution", "Simpler mechanical design", "Better weather resistance"], answerIndex: 1, explanation: "Hundreds of small robots (<100kg each) reduce soil compaction dramatically while working in parallel, completing tasks faster than a single large machine." },
          { question: "What does 'RaaS' stand for in agricultural robotics?", options: ["Robotics as a Sensor", "Robotics as a Service", "Remote Access and Sync", "Robot Autonomous System"], answerIndex: 1, explanation: "Robotics as a Service (RaaS) allows farmers to rent or lease robots instead of purchasing, lowering upfront costs and enabling trial before commitment." }
        ], passPercent: 70 }
      ]
    }
  ]
};
