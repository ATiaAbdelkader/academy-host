import type { ExtraCourse } from "./schema";

export const extraCourse58: ExtraCourse = {
  title: "Machine Learning for Yield Prediction",
  description: "Learn to build ML models that predict crop yields using weather data, soil sensors, satellite imagery, and historical records—enabling better planning and risk management.",
  category: "AI in Agriculture",
  duration: "8 weeks",
  difficulty: "Intermediate",
  priceCents: 0,
  durationMinutes: 2400,
  instructor: "Dr. Marcus Chen",
  instructorTitle: "Agricultural Data Scientist",
  tags: ["Machine Learning", "Yield Prediction", "Weather", "Data Science", "Statistics"],
  order: 58,
  modules: [
    {
      title: "Foundations of Yield Prediction",
      content: [
        { type: "paragraph", text: "Yield prediction is one of the most valuable applications of ML in agriculture. Accurate forecasts enable farmers to plan storage, negotiate contracts, manage finances, and allocate labor. This module introduces the fundamentals." },
        { type: "paragraph", text: "Why Predict Yield? Farmers face uncertainty from weather, pests, and market conditions. Accurate yield prediction (within 10% of actual) enables: better marketing decisions, improved cash flow planning, optimized input purchasing, and more accurate insurance coverage." },
        { type: "paragraph", text: "Data Sources: (1) Historical yield records (field-level, county-level), (2) Weather data (temperature, precipitation, solar radiation, humidity), (3) Soil data (texture, pH, organic matter, nutrients), (4) Remote sensing (NDVI time series), (5) Management records (planting date, varieties, inputs)." },
        { type: "paragraph", text: "Modeling Approaches: Statistical (regression, ANOVA), Process-based (crop simulation models like DSSAT, APSIM), Machine Learning (Random Forest, XGBoost, Neural Networks), Hybrid (ML + crop models). ML approaches increasingly outperform traditional methods." },
        { type: "paragraph", text: "Key Metrics: RMSE (Root Mean Square Error), MAE (Mean Absolute Error), R² (coefficient of determination), MAPE (Mean Absolute Percentage Error). A good yield prediction model achieves MAPE < 10% at field level." },
        { type: "video", caption: "Watch: Why Yield Prediction Matters — The economic impact of accurate yield forecasting for farm planning and risk management.", url: "https://example.com/ml-yield/foundations" },
        { type: "quiz", title: "Module Quiz", questions: [
          { question: "What is a good target MAPE for field-level yield prediction?", options: ["Less than 1%", "Less than 10%", "Less than 30%", "Less than 50%"], answerIndex: 1, explanation: "A MAPE under 10% is considered accurate for field-level yield prediction and enables actionable decision-making." },
          { question: "Which of these is NOT a common data source for ML yield prediction?", options: ["Weather data", "Satellite imagery", "Social media posts", "Soil sensor data"], answerIndex: 2, explanation: "Social media posts are not a standard data source for yield prediction. Weather, satellite imagery, and soil data are primary inputs." }
        ], passPercent: 70 }
      ]
    },
    {
      title: "Weather Data & Climate Features",
      content: [
        { type: "paragraph", text: "Weather is the single largest factor affecting crop yield. Understanding how to collect, process, and engineer weather features for ML models is critical for accurate predictions." },
        { type: "paragraph", text: "Essential Weather Variables: Maximum/minimum temperature, precipitation amount and frequency, solar radiation (MJ/m²/day), relative humidity, wind speed, growing degree days (GDD), reference evapotranspiration (ET₀)." },
        { type: "paragraph", text: "Growing Degree Days (GDD): GDD = Σ(max(0, (Tmax + Tmin)/2 - Tbase)). Base temperature varies by crop (10°C for wheat, 10°C for corn, 10°C for soybeans). GDD accumulations track crop development stages more accurately than calendar days." },
        { type: "paragraph", text: "Critical Period Analysis: Different growth stages have different weather sensitivities. Corn yield is most sensitive to weather during tasseling/silking (V14-R2). Soybeans are most sensitive during pod fill (R3-R6). Feature engineering should weight weather during critical windows." },
        { type: "paragraph", text: "Weather Feature Engineering: (1) Cumulative GDD at each growth stage, (2) Drought stress index (potential ET - actual precipitation), (3) Frost days during sensitive periods, (4) Days above/below threshold temperatures, (5) Wet/dry spell lengths, (6) Weather variability within months." },
        { type: "video", caption: "Watch: Weather Feature Engineering for Yield Models — Transforming raw weather data into predictive features that capture crop-weather relationships.", url: "https://example.com/ml-yield/weather-features" },
        { type: "paragraph", text: "Data Sources: NOAA (US), ERA5 (global reanalysis), Open-Meteo (free API), NASA POWER, national meteorological services. Resolution matters—point weather stations may miss spatial variation across large fields." },
        { type: "quiz", title: "Module Quiz", questions: [
          { question: "What is Growing Degree Days (GDD) used for?", options: ["Measuring rainfall", "Tracking crop development based on temperature accumulation", "Calculating fertilizer needs", "Predicting market prices"], answerIndex: 1, explanation: "GDD accumulates daily heat units above a base temperature, providing a more accurate measure of crop development than calendar days." },
          { question: "For corn, which growth stage is MOST sensitive to weather stress?", options: ["Emergence (VE)", "Tasseling/Silking (V14-R2)", "Maturity (R6)", "Leaf development (V6)"], answerIndex: 1, explanation: "Tasseling and silking is the most critical period—drought stress during pollination can reduce yields by 40-80%." }
        ], passPercent: 70 }
      ]
    },
    {
      title: "Soil Data & Field Characteristics",
      content: [
        { type: "paragraph", text: "Soil properties provide the baseline context for yield potential. This module covers soil data collection, processing, and integration into ML yield prediction models." },
        { type: "paragraph", text: "Key Soil Properties: Texture (sand/silt/clay %), organic matter content, pH, cation exchange capacity (CEC), bulk density, water-holding capacity, drainage class, nutrient levels (N, P, K, micronutrients)." },
        { type: "paragraph", text: "Soil Data Sources: USDA Soil Survey (SSURGO/gSSURGO), ISRIC SoilGrids (global, 250m resolution), EC (electrical conductivity) surveys, laboratory analysis of soil samples, proximal soil sensing (NIR spectroscopy)." },
        { type: "paragraph", text: "Spatial Variability: Soil properties vary across a single field. Within-field variability can exceed between-field variability. High-resolution soil maps (EC mapping, grid sampling) capture this variation for site-specific yield prediction." },
        { type: "paragraph", text: "Soil-Weather Interaction: Soil water-holding capacity determines how crops respond to rainfall timing. Sandy soils need frequent rain; clay soils buffer short droughts but may waterlog. Modeling soil-water-weather interactions improves prediction accuracy." },
        { type: "paragraph", text: "Feature Engineering from Soil Data: (1) Available water capacity (AWC), (2) Root zone depth, (3) Soil fertility index (combined NPK/pH), (4) Drainage score, (5) Organic matter trend (increasing/decreasing), (6) Soil health indicators." },
        { type: "video", caption: "Watch: Integrating Soil Data into Yield Models — How soil properties interact with weather and management to determine crop yield potential.", url: "https://example.com/ml-yield/soil-data" },
        { type: "quiz", title: "Module Quiz", questions: [
          { question: "Why is within-field soil variability important for yield prediction?", options: ["It isn't important", "Different parts of a field have different yield potentials based on soil properties", "It makes predictions less accurate", "Only texture varies within fields"], answerIndex: 1, explanation: "Within-field soil variability can exceed between-field variability. Capturing this variation through spatial soil data improves site-specific yield predictions." },
          { question: "What does Available Water Capacity (AWC) represent?", options: ["Total water in the soil", "Plant-available water between field capacity and wilting point", "Annual rainfall", "Irrigation water applied"], answerIndex: 1, explanation: "AWC is the amount of water held between field capacity and permanent wilting point—the water plants can actually extract from the soil." }
        ], passPercent: 70 }
      ]
    },
    {
      title: "Remote Sensing Features for Yield Models",
      content: [
        { type: "paragraph", text: "Satellite and drone imagery provides spatially explicit crop health data throughout the season. This module covers how to extract and engineer remote sensing features for yield prediction." },
        { type: "paragraph", text: "Vegetation Index Time Series: NDVI, EVI, SAVI trajectories over the growing season capture crop growth dynamics. Key features: (1) Maximum NDVI value, (2) Rate of green-up, (3) Peak timing, (4) Rate of senescence, (5) Area under the NDVI curve." },
        { type: "paragraph", text: "Seasonal Decomposition: Break NDVI time series into trend, seasonal, and residual components. The trend captures overall vigor, seasonal component captures normal growth pattern, residuals reveal anomalies (stress events)." },
        { type: "paragraph", text: "Critical Window Features: Extract NDVI statistics during agronomically critical periods: (1) Vegetative growth (V6-V12), (2) Reproductive stage (R1-R3), (3) Grain fill (R3-R5). NDVI during reproductive stage often has highest correlation with final yield." },
        { type: "paragraph", text: "Texture Features from Imagery: Gray-Level Co-occurrence Matrix (GLCM) features (contrast, correlation, entropy, homogeneity) capture canopy structure variations that indicate plant density, health, and stress patterns." },
        { type: "paragraph", text: "Multi-Source Fusion: Combine satellite (large area, lower resolution), drone (small area, high resolution), and ground sensor (point data, high accuracy) data using late fusion or attention-based fusion architectures for optimal predictions." },
        { type: "video", caption: "Watch: Engineering Remote Sensing Features — Transforming satellite imagery into predictive variables for crop yield models.", url: "https://example.com/ml-yield/remote-sensing" },
        { type: "quiz", title: "Module Quiz", questions: [
          { question: "Which NDVI feature often has the highest correlation with final yield?", options: ["NDVI at planting", "Maximum NDVI during vegetative stage", "NDVI during reproductive stage", "NDVI after harvest"], answerIndex: 2, explanation: "NDVI during the reproductive stage (flowering, pollination, grain fill) has the strongest relationship with final yield because this is when yield is determined." },
          { question: "What is the benefit of fusing satellite and drone imagery?", options: ["Reduces cost", "Combines large area coverage with high resolution detail", "Eliminates the need for ground truth", "Works in all weather"], answerIndex: 1, explanation: "Satellite imagery provides broad coverage while drone imagery adds detailed resolution in key areas. Fusion captures both spatial extent and local detail." }
        ], passPercent: 70 }
      ]
    },
    {
      title: "Building ML Yield Prediction Models",
      content: [
        { type: "paragraph", text: "This module covers the practical implementation of ML models for yield prediction, from data preparation through model selection, training, validation, and deployment." },
        { type: "paragraph", text: "Data Preparation: (1) Merge weather, soil, remote sensing, and management data by location and time, (2) Handle missing values (imputation vs. removal), (3) Normalize/standardize features, (4) Create train/validation/test splits (temporal splits for time-dependent data)." },
        { type: "paragraph", text: "Model Selection: Random Forest (robust, interpretable, handles non-linearity), XGBoost/LightGBM (state-of-the-art for tabular data, fast training), Neural Networks (captures complex interactions, needs more data), Ensemble methods (combining multiple models for robustness)." },
        { type: "paragraph", text: "Hyperparameter Tuning: Grid search, random search, or Bayesian optimization for key parameters. Random Forest: number of trees (100-500), max depth (5-20), min samples per leaf (5-50). XGBoost: learning rate (0.01-0.3), max depth (3-10), subsample ratio (0.6-1.0)." },
        { type: "paragraph", text: "Validation Strategy: Time-series cross-validation (train on years 1-N, test on year N+1), leave-one-year-out, leave-one-field-out. Spatial cross-validation prevents data leakage from spatial autocorrelation. Never use random splits for temporal or spatial data." },
        { type: "paragraph", text: "Interpretability: SHAP (SHapley Additive exPlanations) values show feature importance and direction. LIME provides local explanations. Understanding WHY the model predicts high/low yield builds farmer trust and reveals agronomic insights." },
        { type: "video", caption: "Watch: Building Your First Yield Prediction Model — End-to-end walkthrough from data loading to model deployment using Python and scikit-learn.", url: "https://example.com/ml-yield/building-models" },
        { type: "paragraph", text: "Deployment: Package models as REST APIs (Flask/FastAPI), schedule batch predictions, integrate with farm management software, create farmer-facing dashboards with prediction confidence intervals. Monitor model performance over time—retrain annually with new data." },
        { type: "quiz", title: "Module Quiz", questions: [
          { question: "Why should you never use random train/test splits for yield prediction?", options: ["It's too slow", "Temporal or spatial autocorrelation causes data leakage", "Random splits use more memory", "Models don't work with random splits"], answerIndex: 1, explanation: "Adjacent years and nearby fields have correlated yields. Random splits would put correlated data in both train and test sets, overestimating model performance." },
          { question: "What tool explains individual predictions by showing feature contributions?", options: ["Pandas", "NumPy", "SHAP", "Matplotlib"], answerIndex: 2, explanation: "SHAP (SHapley Additive exPlanations) values decompose each prediction into contributions from each feature, explaining why the model predicted a specific yield." }
        ], passPercent: 70 }
      ]
    },
    {
      title: "Advanced Techniques & Real-World Deployment",
      content: [
        { type: "paragraph", text: "This final module covers advanced modeling techniques, real-world deployment challenges, and emerging trends in ML-based yield prediction." },
        { type: "paragraph", text: "Deep Learning for Yield: LSTM networks process NDVI time series directly, learning temporal patterns without manual feature engineering. Convolutional LSTMs handle spatio-temporal satellite data. Vision Transformers (ViT) process satellite image patches." },
        { type: "paragraph", text: "Transfer Learning: Pre-trained models on large agricultural datasets (e.g., Wheat dataset, CropHarvest) transfer knowledge to regions with limited data. Few-shot learning enables accurate predictions with only 10-20 labeled fields." },
        { type: "paragraph", text: "Uncertainty Quantification: Predictions should include confidence intervals. Techniques: Bayesian neural networks, Monte Carlo dropout, quantile regression, ensemble disagreement. Farmers need to know not just predicted yield but the range of likely outcomes." },
        { type: "paragraph", text: "Multi-Crop and Multi-Region Models: Single models that predict yields for multiple crops and regions. Architecture: shared feature extraction layers + crop-specific/regional heads. Benefits: better generalization, reduced training cost, cross-crop insights." },
        { type: "paragraph", text: "Production Deployment: Data pipelines (Airflow, Prefect), model serving (TensorFlow Serving, ONNX Runtime), monitoring (data drift detection, performance degradation alerts), A/B testing of model versions, farmer feedback loops." },
        { type: "video", caption: "Watch: Production ML for Yield Prediction — Deploying, monitoring, and maintaining yield prediction models at scale in real agricultural operations.", url: "https://example.com/ml-yield/advanced-deployment" },
        { type: "paragraph", text: "Emerging Trends: Foundation models for agriculture (SatCLIP, Prithvi), federated learning across farms for privacy, self-supervised pre-training on unlabeled satellite data, integration with climate models for long-range forecasting, real-time yield updates during the season." },
        { type: "quiz", title: "Module Quiz", questions: [
          { question: "Why is uncertainty quantification important for yield prediction?", options: ["It makes models faster", "Farmers need to know the range of likely outcomes, not just a single number", "It reduces training data requirements", "It eliminates the need for validation"], answerIndex: 1, explanation: "Farmers make financial decisions based on yield forecasts. Knowing the confidence range helps them plan for best-case and worst-case scenarios." },
          { question: "What is a key advantage of transfer learning for yield prediction?", options: ["It eliminates the need for data", "It enables accurate predictions in data-scarce regions by leveraging knowledge from data-rich areas", "It only works for one crop type", "It requires no computing resources"], answerIndex: 1, explanation: "Transfer learning allows models trained on data-rich regions to provide accurate predictions in areas with limited historical data, dramatically expanding coverage." }
        ], passPercent: 70 }
      ]
    }
  ]
};
