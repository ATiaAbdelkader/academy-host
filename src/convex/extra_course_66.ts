import type { ExtraCourse } from "./schema";

export const extraCourse66: ExtraCourse = {
  title: "AI-Driven Climate Adaptation for Agriculture",
  description: "Use AI to predict droughts, floods, and extreme weather impacts on crops, enabling climate-smart farming decisions and building resilient agricultural systems.",
  category: "AI in Agriculture",
  duration: "8 weeks",
  difficulty: "Advanced",
  priceCents: 0,
  durationMinutes: 2400,
  instructor: "Dr. Amara Diallo",
  instructorTitle: "Climate Scientist & Agroecologist",
  tags: ["Climate", "Adaptation", "Drought", "Resilience", "Weather Prediction"],
  order: 66,
  modules: [
    {
      title: "Climate Change & Agricultural Impact",
      content: [
        { type: "paragraph", text: "Climate change is the greatest threat to global food security. Rising temperatures, shifting rainfall patterns, and increasing extreme weather events are already reducing crop yields. AI provides the tools to predict, adapt, and build resilience." },
        { type: "paragraph", text: "Current Impacts: Global crop yields declining 2-6% per decade due to climate change. Each 1°C increase reduces wheat yields by 6%, rice by 3.2%, maize by 7.4%, and soybeans by 3.1%. These losses compound with extreme events." },
        { type: "paragraph", text: "Extreme Weather Events: Increased frequency and intensity of droughts, floods, heat waves, cold snaps, hailstorms, and cyclones. Agricultural losses from extreme weather: $5 billion/year and rising. AI helps predict and prepare for these events." },
        { type: "paragraph", text: "Climate Projections (IPCC AR6): By 2050: +1.5-2.5°C global warming, 10-30% change in precipitation patterns, sea level rise threatening coastal farmland, more frequent El Niño/La Niña events. Regional impacts vary—some areas gain, most lose." },
        { type: "paragraph", text: "Adaptation vs. Mitigation: Adaptation = adjusting farming to survive changed conditions (this course). Mitigation = reducing agriculture's greenhouse gas emissions (cover crops, reduced tillage, efficient inputs). Both are essential." },
        { type: "paragraph", text: "AI's Role: (1) Predict climate impacts at field scale, (2) Recommend adaptation strategies, (3) Optimize water and input use under stress, (4) Model crop-climate interactions, (5) Support climate-smart agriculture decision-making." },
        { type: "video", caption: "Watch: Agriculture in a Changing Climate — Understanding how climate change affects crops and why AI-powered adaptation is essential for food security.", url: "https://example.com/ai-climate/introduction" },
        { type: "quiz", title: "Module Quiz", questions: [
          { question: "By how much does each 1°C temperature increase reduce wheat yields?", options: ["1-2%", "3-4%", "6%", "10-15%"], answerIndex: 2, explanation: "Research shows each 1°C increase reduces wheat yields by approximately 6%, with maize losses even higher at 7.4%." },
          { question: "What is the difference between climate adaptation and mitigation?", options: ["They are the same thing", "Adaptation adjusts farming to survive changes; mitigation reduces agriculture's greenhouse gas emissions", "Mitigation is more important", "Adaptation only applies to animals"], answerIndex: 1, explanation: "Adaptation focuses on adjusting farming practices to survive changing conditions, while mitigation focuses on reducing agriculture's contribution to greenhouse gas emissions. Both are essential." }
        ], passPercent: 70 }
      ]
    },
    {
      title: "AI Weather Prediction for Agriculture",
      content: [
        { type: "paragraph", text: "Accurate weather prediction at field scale is essential for climate adaptation. AI weather models now outperform traditional numerical weather prediction for specific agricultural applications." },
        { type: "paragraph", text: "AI Weather Models: Google DeepMind's GenCast, Huawei's Pangu-Weather, NVIDIA's FourCastNet, and ECMWF's AIFS. These ML models predict global weather patterns 10x faster than traditional models with comparable or better accuracy for 1-10 day forecasts." },
        { type: "paragraph", text: "Agricultural Weather Needs: (1) High resolution (1km or less, not 25km), (2) Microclimate prediction (field-level shelter, slope, aspect effects), (3) Growing degree day forecasts, (4) Frost risk prediction, (5) Disease-conducive weather windows, (6) Evapotranspiration forecasts." },
        { type: "paragraph", text: "Downscaling: Global models (10-25km resolution) → regional models (1-5km) → field-scale estimates (100m-1km). AI statistical downscaling uses terrain, land use, and local station data to create hyper-local forecasts. Critical for field-specific decisions." },
        { type: "paragraph", text: "Seasonal Forecasting: Extended outlooks (1-6 months) using climate models, ocean temperatures (ENSO, IOD), and ML pattern recognition. Seasonal forecasts guide: crop selection, planting timing, water allocation, and input purchasing decisions months in advance." },
        { type: "paragraph", text: "Frost Prediction: AI models combining temperature, humidity, wind, cloud cover, and terrain data predict frost probability at field level. Alert systems with 6-12 hour lead time enable protective measures: irrigation, covers, smudge pots, wind machines." },
        { type: "video", caption: "Watch: AI Weather for Farms — How machine learning weather models provide field-scale forecasts that guide critical farming decisions.", url: "https://example.com/ai-climate/weather-prediction" },
        { type: "quiz", title: "Module Quiz", questions: [
          { question: "How much faster are AI weather models compared to traditional numerical weather prediction?", options: ["2x faster", "5x faster", "10x faster", "100x faster"], answerIndex: 2, explanation: "AI weather models like GenCast and Pangu-Weather generate forecasts approximately 10x faster than traditional numerical weather prediction while achieving comparable or better accuracy." },
          { question: "Why is downscaling important for agricultural weather forecasting?", options: ["It makes forecasts cheaper", "Global models have 10-25km resolution, but farming decisions need field-level (1km or less) resolution", "It's required by regulation", "It only works for rain forecasts"], answerIndex: 1, explanation: "Global weather models operate at 10-25km resolution, too coarse for field-level decisions. AI downscaling uses terrain and local data to create 1km or finer resolution forecasts for agriculture." }
        ], passPercent: 70 }
      ]
    },
    {
      title: "Drought Prediction & Water Management",
      content: [
        { type: "paragraph", text: "Drought is the most damaging climate hazard for agriculture. AI-powered drought prediction and water management help farmers prepare, adapt, and minimize losses during water scarcity." },
        { type: "paragraph", text: "Drought Indices: SPI (Standardized Precipitation Index), SPEI (Standardized Precipitation-Evapotranspiration Index), PDSI (Palmer Drought Severity Index), soil moisture deficit indices. AI combines these with satellite data for comprehensive drought assessment." },
        { type: "paragraph", text: "Early Warning Systems: AI monitors multiple drought precursors: declining soil moisture, reduced snowpack, ocean temperature patterns (ENSO, PDO), vegetation stress (NDVI anomalies), and groundwater levels. Provides 2-6 month drought forecasts." },
        { type: "paragraph", text: "Drought-Resilient Crop Selection: AI recommends crop varieties with specific drought tolerance traits based on: expected drought severity, timing, soil water-holding capacity, and available irrigation. Dynamic variety recommendations that change with seasonal forecasts." },
        { type: "paragraph", text: "Deficit Irrigation Strategy: During drought, AI optimizes limited water allocation: prioritize highest-value crops, target critical growth stages, schedule irrigation for minimum evaporation loss (night/early morning), and implement regulated deficit irrigation." },
        { type: "paragraph", text: "Water Banking: AI identifies opportunities for underground water storage during wet periods (managed aquifer recharge) and optimal extraction timing during dry periods. Models balance current needs with long-term aquifer sustainability." },
        { type: "video", caption: "Watch: AI Drought Management — Predicting, preparing for, and managing drought conditions with AI-powered water optimization.", url: "https://example.com/ai-climate/drought-management" },
        { type: "quiz", title: "Module Quiz", questions: [
          { question: "What lead time can AI drought early warning systems provide?", options: ["1-2 days", "1-2 weeks", "2-6 months", "1-2 years"], answerIndex: 2, explanation: "AI drought early warning systems monitor precursors (soil moisture, ocean temperatures, vegetation stress) to provide 2-6 month forecasts, giving farmers time to adjust plans." },
          { question: "When is the optimal time to irrigate during drought conditions to minimize water loss?", options: ["Midday", "Afternoon", "Night or early morning", "Evening"], answerIndex: 2, explanation: "Night and early morning irrigation minimizes evaporative loss when temperatures are lowest, humidity is highest, and wind speeds are typically lowest." }
        ], passPercent: 70 }
      ]
    },
    {
      title: "Flood Risk Assessment & Management",
      content: [
        { type: "paragraph", text: "Flooding causes $5 billion in agricultural losses annually. AI predicts flood risk, models inundation extent, and recommends adaptation strategies for flood-prone agricultural areas." },
        { type: "paragraph", text: "Flood Prediction: AI models combining rainfall forecasts, terrain analysis (DEM), soil saturation, river levels, and land use data to predict flood probability at field scale. Random Forest and LSTM models achieve 85-95% accuracy for 24-72 hour flood forecasts." },
        { type: "paragraph", text: "Inundation Modeling: Hydrological models (HEC-RAS, SWAT) enhanced with AI predict which fields will flood, water depth, duration, and recession timing. Critical for: emergency harvest decisions, post-flood damage assessment, and insurance claims." },
        { type: "paragraph", text: "Flood-Resilient Practices: (1) Raised bed farming, (2) Flood-tolerant crop varieties (Sub1 rice survives 2 weeks submerged), (3) Controlled drainage, (4) Constructed wetlands for water retention, (5) Agroforestry buffers along waterways." },
        { type: "paragraph", text: "Post-Flood Recovery: AI assesses crop damage from satellite imagery (NDVI drop analysis), recommends salvage operations (emergency harvesting, replanting), estimates economic losses for insurance, and plans soil recovery (compaction remediation, nutrient replenishment)." },
        { type: "paragraph", text: "Climate-Smart Drainage: AI optimizes drainage system design for changing precipitation patterns. Models balance drainage speed (flood prevention) with water retention (drought buffer). Controlled drainage structures adjust outlet levels based on AI recommendations." },
        { type: "video", caption: "Watch: AI Flood Management — Predicting agricultural flood risk, modeling inundation, and implementing flood-resilient farming practices.", url: "https://example.com/ai-climate/flood-management" },
        { type: "quiz", title: "Module Quiz", questions: [
          { question: "What is the Sub1 rice variety?", options: ["A fast-growing variety", "A flood-tolerant variety that survives 2 weeks submerged", "An organic variety", "A cold-tolerant variety"], answerIndex: 1, explanation: "Sub1 rice is a flood-tolerant variety that can survive complete submersion for up to 2 weeks, developed through molecular breeding for climate-resilient agriculture." },
          { question: "How do AI flood models achieve prediction accuracy?", options: ["By tracking individual raindrops", "By combining rainfall forecasts, terrain analysis, soil saturation, and river levels with ML algorithms", "By counting clouds", "By measuring wind speed only"], answerIndex: 1, explanation: "AI flood models integrate multiple data sources—rainfall, terrain, soil moisture, river levels—using ML algorithms to predict flood probability with 85-95% accuracy at 24-72 hour lead times." }
        ], passPercent: 70 }
      ]
    },
    {
      title: "Heat Stress Management with AI",
      content: [
        { type: "paragraph", text: "Extreme heat events are increasing in frequency and intensity. AI helps predict heat stress impacts on crops and livestock and recommends protective strategies." },
        { type: "paragraph", text: "Heat Stress Impacts: Above critical thresholds, crops suffer: pollen sterility (corn above 35°C during tasseling), reduced photosynthesis, accelerated senescence, and fruit drop. Each heat day during flowering can reduce yield by 1-3%." },
        { type: "paragraph", text: "Heat Prediction: AI combines weather forecasts, historical heat patterns, urban heat island effects, and terrain data to predict field-level heat stress events 3-7 days in advance. Critical threshold alerts trigger protective action planning." },
        { type: "paragraph", text: "Protective Strategies: (1) Overhead irrigation for evaporative cooling (5-8°C reduction), (2) Kaolin particle film application (reflects sunlight), (3) Shade structures for high-value crops, (4) Adjusted planting dates to avoid peak heat, (5) Heat-tolerant variety selection." },
        { type: "paragraph", text: "Livestock Heat Stress: Temperature-Humidity Index (THI) above 72 causes stress in dairy cattle. AI monitors barn conditions, recommends ventilation adjustments, and triggers cooling systems (fans, misters). Reduces heat-related mortality and maintains milk production." },
        { type: "paragraph", text: "Night Temperature Importance: High nighttime temperatures (above 20°C for rice, 25°C for corn) increase respiration, reducing grain fill. AI models that predict nighttime temperature minima help farmers optimize irrigation timing for evaporative cooling during critical nights." },
        { type: "video", caption: "Watch: AI Heat Stress Management — Predicting extreme heat events and implementing protective strategies for crops and livestock.", url: "https://example.com/ai-climate/heat-stress" },
        { type: "quiz", title: "Module Quiz", questions: [
          { question: "How much can overhead irrigation reduce canopy temperature during heat events?", options: ["1-2°C", "3-4°C", "5-8°C", "15-20°C"], answerIndex: 2, explanation: "Overhead irrigation provides evaporative cooling that can reduce canopy temperature by 5-8°C, often preventing the crop from crossing critical heat stress thresholds." },
          { question: "Why do high nighttime temperatures reduce grain fill?", options: ["They prevent pollination", "Increased respiration at night consumes stored carbohydrates that would go to grain", "They attract pests", "They reduce soil moisture"], answerIndex: 1, explanation: "High nighttime temperatures increase plant respiration rates, consuming carbohydrates that would otherwise be stored in the grain, reducing overall yield." }
        ], passPercent: 70 }
      ]
    },
    {
      title: "Building Climate-Resilient Farming Systems",
      content: [
        { type: "paragraph", text: "This final module integrates AI tools into comprehensive climate resilience strategies—building farming systems that can withstand and adapt to changing climate conditions." },
        { type: "paragraph", text: "Climate-Smart Agriculture (CSA) Framework: (1) Sustainably increase productivity, (2) Enhance resilience to climate shocks, (3) Reduce greenhouse gas emissions where possible. AI supports all three pillars through precision management and decision support." },
        { type: "paragraph", text: "Diversification Strategies: AI recommends optimal crop mixes, intercropping combinations, and agroforestry layouts that spread climate risk. Models simulate 30-year climate scenarios to identify resilient farming system designs for specific locations." },
        { type: "paragraph", text: "Carbon Farming: AI measures and verifies soil carbon sequestration through: cover cropping, reduced tillage, agroforestry, and compost application. Supports carbon credit market participation ($20-50/ton CO₂e) that provides additional income while building soil resilience." },
        { type: "paragraph", text: "Climate-Smart Variety Selection: AI matches crop varieties to projected future conditions. Models consider: heat tolerance, drought resistance, flood tolerance, disease resistance under warmer conditions, and yield stability across variable weather." },
        { type: "paragraph", text: "Financial Resilience: AI optimizes farm financial planning under climate uncertainty: insurance product selection, forward contracting strategies, diversified income streams, and contingency fund management. Monte Carlo simulations model 1000+ weather scenarios." },
        { type: "paragraph", text: "Community Resilience: AI-powered early warning systems serve farming communities, not just individual farms. Shared infrastructure (community weather stations, cooperative water management), knowledge sharing networks, and collective insurance schemes all benefit from AI coordination." },
        { type: "video", caption: "Watch: Building Climate-Resilient Farms — Integrating AI tools into comprehensive climate adaptation strategies for long-term farming sustainability.", url: "https://example.com/ai-climate/resilient-systems" },
        { type: "paragraph", text: "The Path Forward: AI alone won't solve climate change in agriculture. It must be combined with policy support (subsidies for adaptation, climate insurance), infrastructure investment (irrigation, storage, connectivity), farmer training, and equitable technology access. AI is a tool—people make the difference." },
        { type: "quiz", title: "Module Quiz", questions: [
          { question: "What are the three pillars of Climate-Smart Agriculture (CSA)?", options: ["Profit, productivity, popularity", "Increase productivity, enhance resilience, reduce emissions", "Soil, water, air", "Seeds, fertilizer, water"], answerIndex: 1, explanation: "CSA has three pillars: (1) sustainably increase productivity, (2) enhance resilience to climate shocks, and (3) reduce greenhouse gas emissions where possible. AI supports all three." },
          { question: "How much can carbon credits earn farmers through climate-smart practices?", options: ["$1-5/ton", "$10-15/ton", "$20-50/ton CO₂e", "$100+/ton"], answerIndex: 2, explanation: "Carbon credits from soil carbon sequestration through practices like cover cropping and reduced tillage currently earn farmers $20-50 per ton of CO₂ equivalent, providing additional income while building soil resilience." }
        ], passPercent: 70 }
      ]
    }
  ]
};
