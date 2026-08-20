import type { ExtraCourse } from "./schema";

export const extraCourse61: ExtraCourse = {
  title: "AI-Based Soil Analysis",
  description: "Use AI and spectroscopic analysis to assess soil health, predict nutrient availability, and generate precision management recommendations without traditional lab testing.",
  category: "AI in Agriculture",
  duration: "8 weeks",
  difficulty: "Intermediate",
  priceCents: 0,
  durationMinutes: 2400,
  instructor: "Dr. Sarah Kim",
  instructorTitle: "Soil Scientist & Spectroscopist",
  tags: ["AI", "Soil Analysis", "Spectroscopy", "NIR", "Precision Agriculture"],
  order: 61,
  modules: [
    {
      title: "Soil Science Fundamentals for AI",
      content: [
        { type: "paragraph", text: "Understanding soil science is essential for building meaningful AI soil analysis systems. This module covers the soil properties that AI models predict and why they matter for crop production." },
        { type: "paragraph", text: "Soil Physical Properties: Texture (sand/silt/clay percentages), structure (aggregates, pores), bulk density, porosity, water-holding capacity, infiltration rate. These determine root growth, water retention, and aeration. AI predicts texture class and hydraulic properties from spectral data." },
        { type: "paragraph", text: "Soil Chemical Properties: pH (nutrient availability), cation exchange capacity (CEC, nutrient holding), organic matter (carbon storage, biology), macronutrients (N, P, K, Ca, Mg, S), micronutrients (Fe, Mn, Zn, Cu, B, Mo). AI models predict these from NIR/MIR spectra." },
        { type: "paragraph", text: "Soil Biological Properties: Microbial biomass, enzyme activity, organic carbon, respiration rate, mycorrhizal colonization. Biological health drives nutrient cycling. Emerging AI tools predict biological activity from spectral and environmental data." },
        { type: "paragraph", text: "Soil-Plant Interactions: Nutrient uptake follows Michaelis-Menten kinetics. Root architecture determines exploration volume. Mycorrhizal networks extend nutrient access. AI models that incorporate these biological mechanisms outperform purely statistical approaches." },
        { type: "paragraph", text: "Soil Classification Systems: USDA Soil Taxonomy (12 orders), WRB (World Reference Base), local classification systems. Understanding classification helps AI models generalize across regions—soils in the same class share behavioral patterns." },
        { type: "video", caption: "Watch: Soil Properties That Matter for AI Analysis — Understanding the physical, chemical, and biological properties that AI models predict from spectral data.", url: "https://example.com/ai-soil/soil-fundamentals" },
        { type: "quiz", title: "Module Quiz", questions: [
          { question: "What does CEC (Cation Exchange Capacity) measure?", options: ["Soil temperature", "Soil's ability to hold and exchange nutrients", "Soil water content", "Soil depth"], answerIndex: 1, explanation: "CEC measures the soil's capacity to hold positively charged nutrient ions (cations) on clay and organic matter surfaces, directly affecting nutrient availability." },
          { question: "Which soil property most directly affects nutrient availability?", options: ["Bulk density", "Soil pH", "Sand content", "Infiltration rate"], answerIndex: 1, explanation: "Soil pH controls the chemical form and solubility of nutrients. Most nutrients are optimally available between pH 6.0-7.5. Extreme pH locks up nutrients regardless of total supply." }
        ], passPercent: 70 }
      ]
    },
    {
      title: "Spectroscopic Soil Sensing",
      content: [
        { type: "paragraph", text: "Spectroscopic sensors measure how soil interacts with light across different wavelengths. AI models learn to translate these spectral signatures into soil property predictions—instantly and at near-zero marginal cost per sample." },
        { type: "paragraph", text: "Near-Infrared (NIR) Spectroscopy: Wavelength range 780-2500nm. Sensitive to O-H, C-H, and N-H bonds—detects organic matter, moisture, nitrogen, and some minerals. Low-cost portable instruments ($2,000-10,000) make field deployment practical." },
        { type: "paragraph", text: "Mid-Infrared (MIR) Spectroscopy: Wavelength range 2500-25,000nm (4000-400 cm⁻¹). Richer spectral information—captures molecular vibrations of organic and mineral components. Higher prediction accuracy but requires laboratory instruments or expensive field sensors." },
        { type: "paragraph", text: "Visible-NIR (Vis-NIR): 350-2500nm range. Combines color information (organic matter darkening) with NIR chemical information. Most versatile for field use. Instruments: ASD FieldSpec, ASD TerraSpec, handheld SCiO, Meters SoilCares." },
        { type: "paragraph", text: "Hyperspectral Imaging: Spectral cameras capture 100-300+ narrow bands. Applied to soil cores, field surfaces, or through drone platforms. Combines spatial and spectral information for soil mapping at unprecedented resolution." },
        { type: "paragraph", text: "Spectral Preprocessing: Raw spectra require preprocessing before AI analysis: (1) Savitzky-Golay smoothing, (2) Standard Normal Variate (SNV) correction, (3) Multiplicative Scatter Correction (MSC), (4) First/second derivative transformation, (5) continuum removal." },
        { type: "video", caption: "Watch: Spectroscopic Soil Sensing in Practice — From handheld NIR devices to laboratory MIR analysis, how spectral data captures soil properties.", url: "https://example.com/ai-soil/spectroscopic-sensing" },
        { type: "quiz", title: "Module Quiz", questions: [
          { question: "Why is NIR spectroscopy useful for soil analysis?", options: ["It measures soil temperature", "It detects chemical bonds (O-H, C-H, N-H) related to organic matter and nutrients", "It measures soil depth", "It counts soil organisms"], answerIndex: 1, explanation: "NIR spectroscopy detects vibrations of chemical bonds in soil components—O-H (water, clay minerals), C-H (organic compounds), and N-H (nitrogen compounds)—enabling prediction of multiple soil properties simultaneously." },
          { question: "What is the purpose of Savitzky-Golay smoothing in spectral preprocessing?", options: ["To increase spectral resolution", "To reduce noise while preserving spectral features", "To change the wavelength range", "To calibrate the instrument"], answerIndex: 1, explanation: "Savitzky-Golay smoothing reduces random noise in spectral data while preserving the shape and position of important absorption features." }
        ], passPercent: 70 }
      ]
    },
    {
      title: "Machine Learning for Soil Property Prediction",
      content: [
        { type: "paragraph", text: "This module covers the ML algorithms that translate spectral data into soil property predictions, from classical chemometrics to modern deep learning approaches." },
        { type: "paragraph", text: "Classical Chemometrics: Partial Least Squares Regression (PLSR) is the gold standard. Decomposes spectra into latent variables that best predict soil properties. Interpretable, robust, works with small datasets (50-200 samples). First choice for new soil laboratories." },
        { type: "paragraph", text: "Machine Learning Methods: Random Forest (handles non-linear relationships, feature importance), Support Vector Regression (good with high-dimensional spectra), Gradient Boosting (XGBoost, LightGBM—state-of-the-art for tabular spectral data)." },
        { type: "paragraph", text: "Deep Learning: 1D-CNN processes spectra as sequences, learning hierarchical features automatically. Autoencoders reduce spectral dimensionality while preserving information. Deep learning outperforms PLSR when training datasets exceed 500 samples." },
        { type: "paragraph", text: "Model Validation: Cross-validation (leave-one-out, k-fold), independent test sets from different regions/seasons, standard metrics (RPD = SD/SEP, R², RMSE). RPD > 2.0 indicates excellent prediction, 1.5-2.0 is good, < 1.5 needs improvement." },
        { type: "paragraph", text: "Transfer Learning for Soils: Models trained on soils from one region can be adapted to new regions with relatively few calibration samples. Domain adaptation techniques (CORAL, DAN) align spectral distributions between source and target regions." },
        { type: "video", caption: "Watch: Building Soil Property Prediction Models — From PLSR to deep learning, comparing algorithms for spectral soil analysis.", url: "https://example.com/ai-soil/ml-prediction" },
        { type: "quiz", title: "Module Quiz", questions: [
          { question: "What does RPD > 2.0 indicate in soil spectral prediction?", options: ["Poor prediction", "Good prediction", "Excellent prediction", "No prediction possible"], answerIndex: 2, explanation: "RPD (Ratio of Performance to Deviation) > 2.0 indicates the model's prediction error is less than half the standard deviation of the reference values—considered excellent for most applications." },
          { question: "Which algorithm is the recommended first choice for new soil spectroscopy laboratories?", options: ["Deep Neural Network", "PLSR (Partial Least Squares Regression)", "K-Means Clustering", "Linear Regression"], answerIndex: 1, explanation: "PLSR is the gold standard for new laboratories because it's interpretable, robust, works well with small datasets, and has decades of proven performance in soil spectroscopy." }
        ], passPercent: 70 }
      ]
    },
    {
      title: "Digital Soil Mapping",
      content: [
        { type: "paragraph", text: "Digital Soil Mapping (DSM) combines spectral analysis with spatial data to create continuous soil property maps across landscapes. AI enables mapping at unprecedented resolution and accuracy." },
        { type: "paragraph", text: "Spatial Prediction Methods: (1) Regression with environmental covariates (terrain, climate, vegetation indices), (2) Kriging (geostatistical interpolation), (3) Random Forest spatial prediction, (4) Deep learning with spatial features. RF-kriging hybrid combines ML prediction with spatial autocorrelation." },
        { type: "paragraph", text: "Environmental Covariates: DEM-derived (elevation, slope, aspect, curvature, TWI), climate (rainfall, temperature), vegetation (NDVI, land use), geological maps. These provide spatial context that correlates with soil properties across the landscape." },
        { type: "paragraph", text: "Sampling Strategies: (1) Grid sampling (systematic), (2) Random sampling, (3) Stratified random (by soil type/land use), (4) Adaptive sampling (more samples in high-variability areas). 1 sample per 1-5 hectares is typical for precision agriculture." },
        { type: "paragraph", text: "Accuracy Assessment: Spatial cross-validation prevents data leakage from spatial autocorrelation. Block cross-validation uses spatial blocks instead of random points. Prediction maps include uncertainty layers showing confidence at each location." },
        { type: "paragraph", text: "Web Soil Map Integration: Combine field-level spectral data with regional soil maps (Web Soil Survey, SoilGrids) for seamless prediction. Local calibration improves regional maps; regional context fills gaps between field samples." },
        { type: "video", caption: "Watch: Digital Soil Mapping Workflow — From field sampling through spatial prediction to continuous soil property maps for precision agriculture.", url: "https://example.com/ai-soil/digital-mapping" },
        { type: "quiz", title: "Module Quiz", questions: [
          { question: "Why is spatial cross-validation important for digital soil mapping?", options: ["It's faster than random validation", "Nearby soil samples are correlated, so random splits cause data leakage", "It requires fewer samples", "It only works for clay soils"], answerIndex: 1, explanation: "Soil properties exhibit spatial autocorrelation—nearby samples are similar. Random validation would put correlated samples in both train and test sets, overestimating accuracy." },
          { question: "What does TWI (Topographic Wetness Index) help predict in soil mapping?", options: ["Soil color", "Water accumulation zones that affect soil moisture", "Soil temperature", "Root depth"], answerIndex: 1, explanation: "TWI combines slope and contributing area to predict where water accumulates in the landscape, helping map soil moisture patterns and hydric soil conditions." }
        ], passPercent: 70 }
      ]
    },
    {
      title: "Real-Time Soil Monitoring & IoT",
      content: [
        { type: "paragraph", text: "Real-time soil monitoring combines continuous sensors with AI analysis for dynamic soil management. This module covers in-situ sensor networks and AI-powered interpretation." },
        { type: "paragraph", text: "In-Situ Sensors: TDR/FDR soil moisture probes, EC (electrical conductivity) sensors, pH sensors, dissolved oxygen sensors, ion-selective electrodes (ISE) for nutrients. Continuous data streams provide temporal dynamics that periodic sampling misses." },
        { type: "paragraph", text: "Sensor Fusion: Combining multiple sensor types with spectral and weather data creates a comprehensive soil health picture. Kalman filters and Bayesian methods optimally combine measurements with different accuracies and time resolutions." },
        { type: "paragraph", text: "AI for Sensor Interpretation: ML models learn relationships between sensor readings and actual soil conditions. Correct for sensor drift, temperature effects, and soil type differences. Predict unmeasured properties from correlated sensor combinations." },
        { type: "paragraph", text: "Nutrient Recommendation Engines: AI takes soil test results + crop requirements + economic factors + environmental constraints → generates variable rate fertilizer prescriptions. Optimizes for yield, profit, or environmental impact based on farmer goals." },
        { type: "paragraph", text: "Soil Health Scoring: Composite indices combining physical (aggregate stability, infiltration), chemical (pH, nutrients, CEC), and biological (organic matter, respiration) indicators. AI weights indicators based on their predictive power for crop performance in specific regions." },
        { type: "video", caption: "Watch: Building a Real-Time Soil Monitoring System — IoT sensors, AI interpretation, and automated nutrient recommendations for precision soil management.", url: "https://example.com/ai-soil/real-time-monitoring" },
        { type: "quiz", title: "Module Quiz", questions: [
          { question: "Why is sensor fusion important for soil monitoring?", options: ["It reduces the number of sensors needed", "It combines measurements with different accuracies and resolutions into a comprehensive picture", "It eliminates the need for calibration", "It only works for moisture monitoring"], answerIndex: 1, explanation: "Different sensors measure different properties with different accuracies and time resolutions. Sensor fusion optimally combines these diverse data sources for a more complete and accurate soil health picture." },
          { question: "What factors does a AI nutrient recommendation engine consider?", options: ["Only soil test results", "Soil tests + crop requirements + economics + environmental constraints", "Only crop type", "Only fertilizer price"], answerIndex: 1, explanation: "AI recommendation engines integrate soil test results, crop nutrient requirements, economic factors (fertilizer cost, crop value), and environmental constraints (runoff risk, regulatory limits) for optimal prescriptions." }
        ], passPercent: 70 }
      ]
    },
    {
      title: "Advanced Soil AI & Future Technologies",
      content: [
        { type: "paragraph", text: "This final module explores cutting-edge AI-soil technologies and future directions that will reshape how we understand and manage agricultural soils." },
        { type: "paragraph", text: "Foundation Models for Soil: Large pre-trained models (like Prithvi for Earth observation) learn general soil-landscape patterns from massive datasets. Fine-tuning these models for specific soil properties requires minimal local calibration data." },
        { type: "paragraph", text: "Soil Carbon Monitoring: AI + remote sensing enables monitoring soil organic carbon stocks at scale. Critical for carbon credit markets. Combines spectroscopic measurements, satellite vegetation data, and process-based carbon models for accurate SOC estimation." },
        { type: "paragraph", text: "Soil Microbiome AI: Metagenomic sequencing reveals soil microbial communities. ML models predict functional capabilities from taxonomic profiles, identify beneficial microbes, and recommend microbial inoculants for specific crops and soils." },
        { type: "paragraph", text: "Digital Twin Soils: Virtual soil models that simulate physical, chemical, and biological processes in real-time. Combined with AI, they enable scenario testing: 'What happens to my soil if I switch to no-till for 5 years?' before committing resources." },
        { type: "paragraph", text: "Autonomous Soil Robots: Small robots (TerraSentia, FarmWise) autonomously collect soil data, take samples, and perform field operations. AI coordinates fleet operations, optimizes sampling paths, and generates continuous soil property maps." },
        { type: "video", caption: "Watch: The Future of AI Soil Science — From foundation models to digital twins to autonomous soil robots, the technologies that will transform soil management.", url: "https://example.com/ai-soil/future-technologies" },
        { type: "paragraph", text: "Global Soil Health Initiative: The UNs 4 per 1000 initiative aims to increase soil organic carbon by 0.4% annually - reversing climate change while improving food security. AI-powered soil monitoring is essential for tracking progress at global scale." },
        { type: "quiz", title: "Module Quiz", questions: [
          { question: "What is a 'Digital Twin' of soil?", options: ["A photograph of soil", "A virtual model that simulates soil physical, chemical, and biological processes in real-time", "A soil museum exhibit", "A digital soil classification system"], answerIndex: 1, explanation: "A Digital Twin is a virtual model that mirrors real soil behavior, enabling scenario testing and prediction of soil responses to different management practices before implementation." },
          { question: "How does the '4 per 1000' initiative relate to AI soil monitoring?", options: ["It doesn't", "AI monitoring tracks global progress toward the goal of increasing soil organic carbon by 0.4% annually", "It's an AI company", "It's about soil temperature"], answerIndex: 1, explanation: "The 4 per 1000 initiative aims to increase global soil organic carbon by 0.4% per year. AI-powered monitoring at scale is essential for tracking progress toward this climate and food security goal." }
        ], passPercent: 70 }
      ]
    }
  ]
};
