import type { ExtraCourse } from "./schema";

export const extraCourse63: ExtraCourse = {
  title: "AI for Supply Chain & Post-Harvest",
  description: "Apply AI to reduce food waste, optimize supply chains, predict demand, and manage post-harvest quality—from farm gate to consumer table.",
  category: "AI in Agriculture",
  duration: "8 weeks",
  difficulty: "Intermediate",
  priceCents: 0,
  durationMinutes: 2400,
  instructor: "Dr. Michael Oduor",
  instructorTitle: "Supply Chain Analytics Expert",
  tags: ["Supply Chain", "Post-Harvest", "Food Waste", "Logistics", "Demand Forecasting"],
  order: 63,
  modules: [
    {
      title: "The Agricultural Supply Chain",
      content: [
        { type: "paragraph", text: "The agricultural supply chain connects farms to consumers through processing, storage, distribution, and retail. AI optimizes every link, reducing the 30-40% of food lost between harvest and consumption globally." },
        { type: "paragraph", text: "Supply Chain Stages: (1) Farm gate (harvest, initial sorting, cooling), (2) Aggregation (collection points, cooperatives), (3) Processing (washing, packaging, transformation), (4) Cold storage (controlled atmosphere, refrigeration), (5) Distribution (transportation, logistics), (6) Retail (display, inventory), (7) Consumer (consumption, waste)." },
        { type: "paragraph", text: "Food Loss Hotspots: Developing countries lose 40-50% of perishables in post-harvest handling. Developed countries lose 20-30% at retail and consumer level. Total: 1.3 billion tons/year worth $1 trillion. AI targets the highest-loss stages for maximum impact." },
        { type: "paragraph", text: "Cold Chain Integrity: Temperature control from farm to fork is critical for perishables. Every 1°C above optimal reduces shelf life by 10-15%. IoT sensors + AI monitoring ensure cold chain compliance and predict remaining shelf life in real-time." },
        { type: "paragraph", text: "Traceability Requirements: Food safety regulations (FSMA, EU Food Safety) require end-to-end traceability. Blockchain + AI provides immutable records with anomaly detection. Recall time reduced from weeks to minutes." },
        { type: "paragraph", text: "Economic Impact: Reducing food loss by 25% would feed 870 million hungry people, reduce greenhouse gas emissions by 4.4 Gt CO₂e, and generate $150 billion in economic value annually." },
        { type: "video", caption: "Watch: The Global Food Loss Challenge — Understanding where and why food is lost across the supply chain and how AI provides solutions.", url: "https://example.com/ai-supply/introduction" },
        { type: "quiz", title: "Module Quiz", questions: [
          { question: "What percentage of food is lost between harvest and consumption globally?", options: ["10-15%", "20-25%", "30-40%", "50-60%"], answerIndex: 2, explanation: "Globally, 30-40% of food produced is lost between harvest and consumption, amounting to approximately 1.3 billion tons and $1 trillion annually." },
          { question: "How does each 1°C above optimal temperature affect perishable shelf life?", options: ["No effect", "Reduces by 1-5%", "Reduces by 10-15%", "Reduces by 50%"], answerIndex: 2, explanation: "Every 1°C above the optimal storage temperature reduces perishable shelf life by 10-15%, making cold chain management critical." }
        ], passPercent: 70 }
      ]
    },
    {
      title: "Post-Harvest Quality Monitoring with AI",
      content: [
        { type: "paragraph", text: "AI-powered quality monitoring assesses produce condition at every stage—from harvest through retail—enabling sorting, grading, and spoilage prediction that minimizes waste." },
        { type: "paragraph", text: "Computer Vision Grading: Cameras + AI sort produce by size, color, shape, and external defects. Processing speed: 10-20 items/second. Grading accuracy: 95-99% for major defects. Applications: apples (bruise detection), tomatoes (ripeness grading), potatoes (blemish sorting)." },
        { type: "paragraph", text: "Hyperspectral Quality Assessment: Non-destructive internal quality testing. Detects: internal browning in apples, dry matter content in mangoes, sugar content (Brix) in melons, disease infection invisible externally. NIR spectroscopy + ML achieves 90-95% accuracy." },
        { type: "paragraph", text: "Shelf Life Prediction: ML models predict remaining shelf life from current quality measurements, storage conditions, and time since harvest. Input: temperature history + gas composition + visual state → Output: predicted days of remaining quality. Accuracy: ±1-2 days." },
        { type: "paragraph", text: "Ethylene Monitoring: Ethylene gas triggers ripening and spoilage. AI-controlled storage manages ethylene through ventilation, scrubbing (potassium permanganate), or catalytic oxidation. Predictive models time ethylene exposure for optimal ripening before retail." },
        { type: "paragraph", text: "Automated Sorting Systems: Robotic arms with suction cups pick and sort produce at 120+ items/minute. Computer vision guides pick points for gentle handling. Color sorters using multispectral sensors separate by ripeness for staggered market release." },
        { type: "video", caption: "Watch: AI Quality Grading Systems — How computer vision and hyperspectral imaging sort and grade produce at commercial scale.", url: "https://example.com/ai-supply/quality-monitoring" },
        { type: "quiz", title: "Module Quiz", questions: [
          { question: "What does hyperspectral imaging detect that cameras cannot?", options: ["Size and shape", "Internal quality attributes like browning and sugar content", "Weight", "Smell"], answerIndex: 1, explanation: "Hyperspectral imaging penetrates fruit tissue to detect internal defects (browning, rot), chemical composition (sugar content, dry matter), and quality invisible to external cameras." },
          { question: "How accurate is AI shelf life prediction for perishables?", options: ["±1 week", "±1-2 days", "±1 month", "±1 hour"], answerIndex: 1, explanation: "ML models predict remaining shelf life with ±1-2 day accuracy using temperature history, gas composition, and current quality measurements." }
        ], passPercent: 70 }
      ]
    },
    {
      title: "Demand Forecasting & Inventory Management",
      content: [
        { type: "paragraph", text: "Accurate demand forecasting prevents both stockouts (lost sales) and overstock (food waste). AI models capture complex demand patterns that traditional methods miss." },
        { type: "paragraph", text: "Demand Signal Sources: (1) Historical sales data, (2) Weather forecasts, (3) Calendar effects (holidays, seasons, events), (4) Promotions and pricing, (5) Social media trends, (6) Competitor actions, (7) Economic indicators. AI models automatically learn which signals matter for each product." },
        { type: "paragraph", text: "Forecasting Models: ARIMA (classical time series), Prophet (Facebook, handles seasonality and holidays), LSTM/GRU (deep learning for complex patterns), Gradient Boosting (XGBoost/LightGBM with rich features), Temporal Fusion Transformer (state-of-the-art, handles many covariates)." },
        { type: "paragraph", text: "Fresh Produce Challenges: Perishability means forecasting errors are more costly. Short shelf life (3-14 days) requires daily forecast updates. Weather sensitivity creates spikes. Promotional effects are nonlinear. AI models specifically designed for perishables outperform generic retail forecasting." },
        { type: "paragraph", text: "Inventory Optimization: AI determines optimal stock levels considering demand uncertainty, shelf life constraints, storage costs, and stockout penalties. Dynamic safety stock calculations adjust automatically. Perishable inventory models (FIFO optimization) minimize age-based waste." },
        { type: "paragraph", text: "Automated Replenishment: AI systems generate purchase orders automatically based on forecasts, current inventory, lead times, and minimum order quantities. Reduce manual ordering errors by 60-80% and out-of-stock events by 30-50%." },
        { type: "video", caption: "Watch: AI Demand Forecasting for Fresh Produce — Building models that account for perishability, weather, and seasonal patterns to reduce food waste.", url: "https://example.com/ai-supply/demand-forecasting" },
        { type: "quiz", title: "Module Quiz", questions: [
          { question: "Which forecasting model is specifically designed to handle holidays and seasonal effects?", options: ["Linear Regression", "Prophet", "K-Means", "Naive Bayes"], answerIndex: 1, explanation: "Facebook Prophet is specifically designed for business time series with strong seasonal patterns and holiday effects, making it well-suited for agricultural demand forecasting." },
          { question: "How much can automated AI replenishment reduce out-of-stock events?", options: ["5-10%", "10-20%", "30-50%", "70-90%"], answerIndex: 2, explanation: "AI automated replenishment reduces out-of-stock events by 30-50% while simultaneously reducing overstock waste through dynamic inventory optimization." }
        ], passPercent: 70 }
      ]
    },
    {
      title: "Logistics Optimization with AI",
      content: [
        { type: "paragraph", text: "Transportation logistics account for 15-25% of food costs and significantly impact freshness. AI optimizes routing, load planning, and cold chain management for perishable goods." },
        { type: "paragraph", text: "Route Optimization: AI solves the Vehicle Routing Problem (VRP) considering time windows, vehicle capacity, temperature requirements, and traffic. Meta-heuristics (genetic algorithms, ant colony optimization) find near-optimal routes for 100+ delivery points. Fuel savings: 10-20%." },
        { type: "paragraph", text: "Cold Chain Monitoring: IoT temperature/humidity sensors on every pallet, truck, and container. AI analyzes data in real-time, detecting deviations before spoilage occurs. Predictive models estimate remaining shelf life based on actual temperature exposure (not just expiration dates)." },
        { type: "paragraph", text: "Load Optimization: 3D bin packing algorithms maximize truck utilization. AI considers weight distribution, temperature zones (refrigerated + ambient in same truck), delivery order (LIFO for multi-stop), and product fragility. Improve load factor from 70% to 90%+." },
        { type: "paragraph", text: "Last-Mile Delivery: The most expensive and time-sensitive segment. AI optimizes delivery windows, consolidates orders, predicts traffic patterns, and coordinates with customers for successful delivery. Drone and autonomous vehicle delivery emerging for last-mile efficiency." },
        { type: "paragraph", text: "Carbon Footprint Optimization: AI minimizes transportation emissions by consolidating loads, optimizing routes, selecting appropriate vehicle types, and planning deliveries to minimize empty return trips. Reduce logistics carbon footprint by 15-30%." },
        { type: "video", caption: "Watch: AI Logistics for Perishables — Optimizing cold chain transportation from farm to retail with real-time monitoring and smart routing.", url: "https://example.com/ai-supply/logistics" },
        { type: "quiz", title: "Module Quiz", questions: [
          { question: "What percentage of food costs does transportation logistics typically account for?", options: ["1-5%", "15-25%", "35-45%", "50-60%"], answerIndex: 1, explanation: "Transportation logistics account for 15-25% of total food costs, making optimization through AI a significant cost reduction opportunity." },
          { question: "How much can load optimization improve truck utilization?", options: ["From 50% to 70%", "From 70% to 90%+", "From 90% to 100%", "No improvement"], answerIndex: 1, explanation: "3D bin packing algorithms improve truck utilization from a typical 70% to 90%+, reducing the number of trips needed and associated costs and emissions." }
        ], passPercent: 70 }
      ]
    },
    {
      title: "Food Safety & Traceability Systems",
      content: [
        { type: "paragraph", text: "AI-powered food safety systems detect contamination risks, ensure regulatory compliance, and enable rapid traceability. These systems protect consumers and reduce the economic impact of recalls." },
        { type: "paragraph", text: "Contamination Detection: AI analyzes sensor data (temperature, humidity, pH, gas composition) to predict contamination risk. Time-temperature indicator (TTI) models predict pathogen growth rates. Early warning systems alert before contamination reaches dangerous levels." },
        { type: "paragraph", text: "Blockchain Traceability: Immutable records of every supply chain event. From seed origin → field conditions → harvest date → processing parameters → transport conditions → retail receipt. Smart contracts automate compliance verification. Recall tracing: weeks → minutes." },
        { type: "paragraph", text: "Predictive Shelf Life Models: Dynamic shelf life prediction based on actual conditions experienced, not static expiration dates. AI recalculates remaining quality at each supply chain node using cumulative temperature exposure, humidity history, and ethylene levels." },
        { type: "paragraph", text: "Regulatory Compliance: AI automates HACCP (Hazard Analysis Critical Control Points) monitoring, FSMA documentation, and organic/safety certification tracking. Natural language processing extracts requirements from regulations and maps them to operational controls." },
        { type: "paragraph", text: "Recall Optimization: When contamination is detected, AI identifies affected products precisely (not entire production runs), estimates consumer exposure, optimizes recall logistics, and predicts recall effectiveness. Reduces recall scope by 40-70% compared to traditional methods." },
        { type: "video", caption: "Watch: Blockchain + AI Food Safety — From farm to fork traceability and predictive contamination prevention systems.", url: "https://example.com/ai-supply/food-safety" },
        { type: "quiz", title: "Module Quiz", questions: [
          { question: "How does blockchain improve food safety recalls?", options: ["It prevents all contamination", "Reduces recall tracing from weeks to minutes by providing immutable records of every supply chain event", "Eliminates the need for recalls", "Only works for organic products"], answerIndex: 1, explanation: "Blockchain provides an immutable, transparent record of every supply chain event, enabling precise identification of affected products in minutes rather than the weeks required with traditional paper-based traceability." },
          { question: "What does HACCP stand for?", options: ["Hazard Analysis Critical Control Points", "Health and Crop Control Protocol", "Harvest Assessment and Certification Program", "High Accuracy Crop Classification Process"], answerIndex: 0, explanation: "HACCP (Hazard Analysis Critical Control Points) is a systematic approach to food safety that identifies and controls biological, chemical, and physical hazards throughout production." }
        ], passPercent: 70 }
      ]
    },
    {
      title: "Reducing Food Waste with AI",
      content: [
        { type: "paragraph", text: "This final module focuses specifically on AI applications that reduce food waste—from farm-level loss reduction through consumer-facing solutions." },
        { type: "paragraph", text: "Dynamic Pricing: AI-powered markdown optimization for perishables approaching expiration. Adjusts prices in real-time based on remaining shelf life, demand, and inventory levels. Reduce waste by 30-40% while maintaining revenue through optimized pricing curves." },
        { type: "paragraph", text: "Surplus Redistribution: AI matches surplus food with demand. Platforms like Too Good To Go, Flashfood, and Karma use ML to predict which items will be surplus and connect them with nearby consumers at discounted prices. Redirect 10-20% of retail waste." },
        { type: "paragraph", text: "Smart Packaging: AI-integrated packaging with freshness sensors (color-changing labels), temperature indicators, and NFC chips that provide real-time freshness data to consumers. Extends usable life by enabling informed consumption timing." },
        { type: "paragraph", text: "Ugly Produce Marketplace: AI grading identifies produce that is cosmetically imperfect but nutritionally equivalent. Connects farmers with retailers and consumers willing to buy 'ugly' produce at a discount. Misfits Market, Imperfect Foods reduce farm-level waste by 15-25%." },
        { type: "paragraph", text: "Waste Analytics: Computer vision in waste bins and on conveyor belts quantifies food waste by type, source, and stage. Provides actionable insights: which products waste most, which suppliers have quality issues, which processes generate waste. Continuous improvement through data." },
        { type: "video", caption: "Watch: AI Solutions for Food Waste — Dynamic pricing, surplus redistribution, and smart packaging technologies reducing waste across the supply chain.", url: "https://example.com/ai-supply/food-waste" },
        { type: "paragraph", text: "Impact Potential: If AI food waste solutions achieved full adoption, they could: prevent 1.3 billion tons of food waste annually, save $600 billion in economic value, feed 2 billion people, and reduce food-related greenhouse gas emissions by 20%." },
        { type: "quiz", title: "Module Quiz", questions: [
          { question: "How much can dynamic AI pricing reduce retail food waste?", options: ["5-10%", "15-20%", "30-40%", "60-70%"], answerIndex: 2, explanation: "Dynamic markdown pricing adjusts prices in real-time based on remaining shelf life and demand, reducing waste by 30-40% while maintaining revenue through optimized pricing." },
          { question: "What is the global economic value of food that could be saved with AI solutions?", options: ["$50 billion", "$150 billion", "$600 billion", "$1 trillion"], answerIndex: 2, explanation: "AI food waste solutions at full adoption could save approximately $600 billion in economic value annually by preventing the waste of 1.3 billion tons of food." }
        ], passPercent: 70 }
      ]
    }
  ]
};
