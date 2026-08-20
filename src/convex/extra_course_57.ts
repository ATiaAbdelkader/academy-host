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

export const extraCourse57: ExtraCourse = {
  title: "AI-Powered Crop Monitoring",
  description: "Master the use of drones, satellite imagery, and computer vision to monitor crop health, detect stress early, and optimize field management using artificial intelligence.",
  category: "AI in Agriculture",
  priceCents: 0,
  durationMinutes: 2400,
  instructor: "Dr. Priya Sharma",
  instructorTitle: "Remote Sensing & AI Specialist",
  order: 57,
  modules: [
    {
      title: "Introduction to Crop Monitoring Technologies",
      content: [
        { type: "paragraph", text: "Crop monitoring has evolved from manual field walks to sophisticated AI-driven systems. This module introduces the evolution of monitoring technologies and why AI is transforming agricultural oversight." },
        { type: "paragraph", text: "Historical Context: Traditional crop monitoring relied on farmer experience and periodic field visits. The Green Revolution introduced chemical scouting, while the 1990s brought GPS-based mapping. Today, AI synthesizes data from satellites, drones, and ground sensors to provide real-time, field-level insights." },
        { type: "paragraph", text: "The AI Advantage: AI-powered monitoring can analyze millions of data points simultaneously—something impossible for human scouts. Machine learning models trained on spectral data can detect nutrient deficiencies 2-3 weeks before visible symptoms appear." },
        { type: "paragraph", text: "Key Technologies Overview: (1) Satellite multispectral imaging (Sentinel-2, Landsat), (2) UAV/drone-based RGB and multispectral cameras, (3) Ground-based IoT sensor networks, (4) AI/ML processing pipelines, (5) Decision support systems (DSS)." },
        { type: "paragraph", text: "Data Flow Architecture: Sensors collect raw data → Edge processing filters noise → Cloud AI analyzes patterns → Alerts and recommendations are generated → Farmer receives actionable insights via mobile app." },
        { type: "video", caption: "Watch: The Evolution of Precision Crop Monitoring — How technology transformed farming oversight from visual inspection to AI-powered systems.", url: "https://example.com/ai-crop-monitoring/intro-evolution" },
        { type: "paragraph", text: "Economic Impact: Studies show AI crop monitoring reduces input costs by 15-25% while increasing yields by 10-20%. Early stress detection alone can save $50-100/hectare in prevented crop losses." },
        { type: "quiz", title: "Module Quiz", questions: [
          { question: "What is the primary advantage of AI crop monitoring over traditional methods?", options: ["Lower cost", "Analyzes millions of data points simultaneously", "Requires no equipment", "Works in all weather"], answerIndex: 1, explanation: "AI systems can process vast amounts of data from multiple sources simultaneously, far exceeding human capacity." },
          { question: "How far ahead can AI detect nutrient deficiencies compared to visible symptoms?", options: ["1-2 days", "1-2 weeks", "2-3 weeks", "1 month"], answerIndex: 2, explanation: "ML models trained on spectral data can detect nutrient deficiencies 2-3 weeks before they become visible to the naked eye." }
        ], passPercent: 70 }
      ]
    },
    {
      title: "Satellite Imagery & Remote Sensing",
      content: [
        { type: "paragraph", text: "Satellite remote sensing provides large-scale, recurring views of agricultural land. Understanding spectral bands, resolution, and processing techniques is essential for AI-powered crop analysis." },
        { type: "paragraph", text: "Spectral Bands: Visible RGB (Red, Green, Blue), Near-Infrared (NIR), Short-Wave Infrared (SWIR), and Thermal bands each reveal different crop properties. NDVI (Normalized Difference Vegetation Index) uses Red and NIR to measure vegetation vigor." },
        { type: "paragraph", text: "Key Vegetation Indices: NDVI = (NIR - Red) / (NIR + Red), EVI (Enhanced Vegetation Index) corrects for atmospheric effects, SAVI (Soil-Adjusted Vegetation Index) minimizes soil background noise, NDRE (Red Edge) is more sensitive to chlorophyll changes." },
        { type: "paragraph", text: "Satellite Platforms: Sentinel-2 (free, 10m resolution, 5-day revisit), Landsat-8/9 (free, 30m, 16-day), Planet Labs (commercial, 3m, daily), MODIS (free, 250m, daily for large-scale monitoring)." },
        { type: "paragraph", text: "AI Processing Pipeline: Raw imagery → Atmospheric correction → Cloud masking → Vegetation index calculation → Time-series analysis → Anomaly detection → Classification maps → Alert generation." },
        { type: "paragraph", text: "Cloud Detection: One of the biggest challenges is cloud cover. AI models like s2cloudless and Sen2Cor automatically mask clouds and shadows, ensuring only clear pixels are analyzed. Temporal compositing fills gaps between cloud-free observations." },
        { type: "video", caption: "Watch: Reading Satellite Imagery for Crop Health — How to interpret multispectral data and vegetation indices for practical farming decisions.", url: "https://example.com/ai-crop-monitoring/satellite-imagery" },
        { type: "quiz", title: "Module Quiz", questions: [
          { question: "Which vegetation index uses Red and Near-Infrared bands to measure vegetation vigor?", options: ["SWVI", "NDVI", "NDWI", "PSRI"], answerIndex: 1, explanation: "NDVI = (NIR - Red) / (NIR + Red) is the most widely used vegetation index for assessing plant health." },
          { question: "What is the main advantage of Sentinel-2 for crop monitoring?", options: ["Highest resolution available", "Free data with 10m resolution and 5-day revisit", "Thermal imaging capability", "Real-time data streaming"], answerIndex: 1, explanation: "Sentinel-2 provides free multispectral data at 10m resolution with a 5-day revisit time, making it ideal for crop monitoring." }
        ], passPercent: 70 }
      ]
    },
    {
      title: "Drone-Based Monitoring Systems",
      content: [
        { type: "paragraph", text: "Unmanned Aerial Vehicles (UAVs) provide ultra-high-resolution imagery that satellites cannot match. This module covers drone types, sensor payloads, flight planning, and AI-powered image analysis." },
        { type: "paragraph", text: "Drone Types for Agriculture: Multirotor (quadcopter) for small areas, fixed-wing for large fields, VTOL hybrids combining both advantages. Selection depends on field size, required endurance, and sensor payload capacity." },
        { type: "paragraph", text: "Sensor Payloads: RGB cameras (standard imagery), multispectral cameras (5-10 bands like MicaSense RedEdge), hyperspectral cameras (hundreds of bands), thermal cameras (temperature mapping), LiDAR (3D terrain and canopy structure)." },
        { type: "paragraph", text: "Flight Planning: Overlap (70-80% front, 60-70% side), altitude (30-120m AGL), ground sampling distance (GSD), flight patterns (grid, double-grid, circular for orchards). Tools: Pix4Dfields, DroneDeploy, OpenDroneMap." },
        { type: "paragraph", text: "Image Processing Pipeline: Raw images → Geotagging → Orthomosaic generation → Point cloud → DSM/DTM → Vegetation index maps → AI classification. Processing time: 2-6 hours per 100 acres depending on hardware." },
        { type: "paragraph", text: "AI-Powered Analysis: Convolutional Neural Networks (CNNs) classify crop health zones, detect individual plant stress, count plants, measure canopy cover, and identify weed patches. Transfer learning from pre-trained models accelerates deployment." },
        { type: "video", caption: "Watch: Drone Mission Planning for Crop Surveys — Step-by-step guide to planning, flying, and processing drone data for agricultural insights.", url: "https://example.com/ai-crop-monitoring/drone-monitoring" },
        { type: "paragraph", text: "Cost-Benefit Analysis: Drone surveys cost $5-15/acre vs. $50-100/acre for manual scouting. A single drone flight over 200 acres generates data equivalent to 2 weeks of manual field walks, completed in 30 minutes of flight time." },
        { type: "quiz", title: "Module Quiz", questions: [
          { question: "What overlap is typically recommended for drone photogrammetry?", options: ["30-40%", "50-60%", "70-80% front, 60-70% side", "90-100%"], answerIndex: 2, explanation: "High overlap (70-80% front, 60-70% side) ensures accurate orthomosaic generation and 3D reconstruction." },
          { question: "Which sensor type measures canopy temperature for water stress detection?", options: ["RGB camera", "Multispectral camera", "Thermal camera", "LiDAR"], answerIndex: 2, explanation: "Thermal cameras detect canopy temperature, which increases when plants are water-stressed due to reduced transpiration." }
        ], passPercent: 70 }
      ]
    },
    {
      title: "Computer Vision for Crop Health Analysis",
      content: [
        { type: "paragraph", text: "Computer vision enables automated analysis of crop imagery at scale. This module covers the AI/ML techniques used to extract actionable insights from visual data." },
        { type: "paragraph", text: "Image Classification: CNNs categorize crop images into health classes (healthy, nutrient deficient, pest damaged, water stressed). Training requires labeled datasets of 1,000+ images per class. Transfer learning from ImageNet reduces data needs by 80%." },
        { type: "paragraph", text: "Object Detection: YOLO and Faster R-CNN models identify and count individual plants, detect weeds among crops, locate fruit for yield estimation, and identify pest/disease symptoms at leaf level. Real-time detection runs at 30+ FPS on edge devices." },
        { type: "paragraph", text: "Semantic Segmentation: Pixel-level classification maps every pixel in an image to a category (crop, soil, weed, shadow). U-Net and DeepLab architectures achieve 90%+ accuracy for field-level segmentation. Enables precise weed maps for spot spraying." },
        { type: "paragraph", text: "Hyperspectral Analysis: Hyperspectral images capture hundreds of narrow spectral bands. 1D-CNNs or 3D-CNNs process the spectral signature of each pixel to detect specific stresses (nitrogen deficiency, fungal infection, waterlogging) with 85-95% accuracy." },
        { type: "paragraph", text: "Edge Deployment: Models are optimized using quantization, pruning, and knowledge distillation to run on edge devices (NVIDIA Jetson, Raspberry Pi) for real-time field analysis without internet connectivity." },
        { type: "video", caption: "Watch: Building a Crop Disease Detector — Training a CNN model to identify 10 common crop diseases from leaf images using transfer learning.", url: "https://example.com/ai-crop-monitoring/computer-vision" },
        { type: "paragraph", text: "Data Augmentation: Rotations, flips, color jittering, cutout, and mixup increase training dataset diversity. Combined with transfer learning, these techniques enable robust models with only 500-1,000 labeled images per class." },
        { type: "quiz", title: "Module Quiz", questions: [
          { question: "Which architecture is commonly used for pixel-level crop/weed segmentation?", options: ["Linear Regression", "U-Net", "Random Forest", "K-Means"], answerIndex: 1, explanation: "U-Net is a convolutional neural network designed for semantic segmentation, achieving pixel-level classification of crop and weed areas." },
          { question: "How does transfer learning reduce data requirements for crop disease detection?", options: ["By using random weights", "By leveraging features learned from large general image datasets", "By reducing image resolution", "By eliminating the need for labeled data"], answerIndex: 1, explanation: "Transfer learning uses pre-trained models (e.g., trained on ImageNet) as feature extractors, requiring only 500-1,000 labeled images per class instead of tens of thousands." }
        ], passPercent: 70 }
      ]
    },
    {
      title: "Time-Series Analytics & Anomaly Detection",
      content: [
        { type: "paragraph", text: "Crop health is dynamic—monitoring it requires analyzing how vegetation indices change over time. This module covers time-series techniques for detecting anomalies and predicting crop trajectory." },
        { type: "paragraph", text: "Time-Series Data Construction: Stack satellite observations chronologically to build vegetation index profiles for each field or pixel. Sentinel-2 provides ~70 observations per year (clear sky permitting), creating rich temporal signatures." },
        { type: "paragraph", text: "Baseline Models: Establish 'normal' crop growth curves using multi-year historical data. Smooth curves using Savitzky-Golay or Whittaker smoothing. Compare current observations against baselines to detect deviations." },
        { type: "paragraph", text: "Anomaly Detection Methods: (1) Threshold-based (NDVI < mean - 2σ), (2) Z-score analysis, (3) Isolation Forest for multivariate anomalies, (4) LSTM autoencoders that learn normal temporal patterns and flag reconstructions with high error." },
        { type: "paragraph", text: "Change Detection: Compare before/after images to quantify crop damage from hail, flood, frost, or pest outbreaks. Post-classification comparison and image differencing techniques provide damage maps for insurance claims." },
        { type: "paragraph", text: "Predictive Modeling: LSTM and Transformer networks predict future NDVI curves based on current trajectory and weather forecasts. Early detection of yield-reducing trends enables corrective action 4-6 weeks before harvest." },
        { type: "video", caption: "Watch: Building Crop Health Time Series — Constructing and analyzing NDVI profiles to detect field anomalies and predict yield outcomes.", url: "https://example.com/ai-crop-monitoring/time-series" },
        { type: "paragraph", text: "Real-World Application: Brazilian soybean farmers using time-series NDVI analysis detected Asian rust infection 12 days before visual symptoms, enabling targeted fungicide application that saved $35/hectare in unnecessary spraying." },
        { type: "quiz", title: "Module Quiz", questions: [
          { question: "Why is time-series analysis important for crop monitoring?", options: ["It reduces data storage needs", "It detects how vegetation health changes over time", "It eliminates the need for satellite data", "It only works for one crop type"], answerIndex: 1, explanation: "Time-series analysis tracks vegetation index changes over time, enabling detection of anomalies, prediction of yields, and early identification of crop stress." },
          { question: "Which deep learning model is effective for learning normal temporal patterns in crop data?", options: ["Linear Regression", "Decision Tree", "LSTM Autoencoder", "K-Nearest Neighbors"], answerIndex: 2, explanation: "LSTM autoencoders learn to reconstruct normal temporal patterns; anomalies produce high reconstruction error, flagging potential problems." }
        ], passPercent: 70 }
      ]
    },
    {
      title: "Decision Support Systems & Field Deployment",
      content: [
        { type: "paragraph", text: "The final module brings everything together into a Decision Support System (DSS) that translates AI insights into actionable farming decisions. This is where data meets practice." },
        { type: "paragraph", text: "DSS Architecture: Data ingestion layer → AI processing engine → Knowledge base (crop models, agronomy rules) → User interface → Action recommendations. The system must handle uncertainty, provide confidence scores, and explain its reasoning." },
        { type: "paragraph", text: "Variable Rate Application (VRA): AI-generated health maps are converted to prescription maps for variable rate sprayers, seeders, and fertilizer applicators. Prescription maps use zones (manageable by equipment) rather than pixel-level recommendations." },
        { type: "paragraph", text: "Alert Systems: Configure threshold-based and ML-based alerts. Types: (1) Immediate (frost warning, disease outbreak), (2) Daily (irrigation needs, scouting priority), (3) Weekly (growth trajectory, input planning), (4) Seasonal (yield forecast, harvest timing)." },
        { type: "paragraph", text: "Integration with Farm Management: Export AI insights to John Deere Operations Center, Climate FieldView, Trimble Ag, or custom farm management software. Use standardized formats (Shapefile, GeoJSON, ISOXML) for compatibility." },
        { type: "paragraph", text: "Cost-Benefit Framework: Typical ROI analysis—System cost: $5,000-20,000/year for 500+ acres. Savings: 15-25% reduction in inputs ($20-40/acre), 10-20% yield increase ($30-60/acre). Net benefit: $50-100/acre, payback in first season." },
        { type: "video", caption: "Watch: From Data to Decision — Building a complete AI-powered crop monitoring workflow from data collection through actionable recommendations.", url: "https://example.com/ai-crop-monitoring/decision-support" },
        { type: "paragraph", text: "Future Trends: Federated learning for privacy-preserving model training across farms, foundation models for agriculture (like SatCLIP), real-time processing from next-gen satellites, and autonomous drones that adapt flight paths based on AI findings." },
        { type: "quiz", title: "Module Quiz", questions: [
          { question: "What is the typical payback period for an AI crop monitoring system?", options: ["5+ years", "3-5 years", "First season", "Never"], answerIndex: 2, explanation: "With savings of $50-100/acre from reduced inputs and increased yields, most systems pay for themselves in the first season." },
          { question: "What format is commonly used to export prescription maps to farm equipment?", options: ["PDF", "CSV", "Shapefile/GeoJSON/ISOXML", "JPEG"], answerIndex: 2, explanation: "Shapefile, GeoJSON, and ISOXML are standard geospatial formats that farm management software and equipment can import for variable rate applications." }
        ], passPercent: 70 }
      ]
    }
  ]
};
