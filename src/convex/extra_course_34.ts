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

export const extraCourse34: ExtraCourse = {
  title: "Machine Learning Pipeline for Agriculture",
  description:
    "Build end-to-end ML pipelines for agricultural applications. Covers data preprocessing, feature engineering, model selection, hyperparameter tuning with Optuna, evaluation methodology, production inference, and continuous retraining.",
  category: "AgTech",
  duration: "8 weeks",
  difficulty: "Advanced",
  priceCents: 9900,
  durationMinutes: 480,
  order: 34,
  instructor: "Dr. Aniket Asawale",
  instructorTitle: "Machine Learning Engineer & Agricultural Data Scientist",
  modules: [
    {
      title: "ML Pipeline Overview for Agriculture",
      content: [
        { type: "paragraph", text: "A production ML pipeline for agriculture connects raw sensor data to actionable farmer recommendations through automated stages: data ingestion, preprocessing, feature engineering, model training, evaluation, deployment, and monitoring." },
        { type: "paragraph", text: "The AgroAI ML pipeline processes data from IoT sensors and weather stations through 6 stages: (1) Raw CSV ingestion, (2) Preprocessing with missing value handling, (3) Feature engineering with 8 interaction features, (4) Model training with 4+ algorithms, (5) Temporal and geographic validation, (6) Deployment via FastAPI with confidence thresholds." },
        { type: "paragraph", text: "Key principles: reproducibility (fixed random seeds, versioned datasets), modularity (swap models without changing preprocessing), monitoring (track prediction quality over time), and automation (retrain on schedule or when performance degrades)." },
        { type: "quiz", title: "ML Pipeline Basics", passPercent: 60, questions: [
          { question: "What are the 6 stages of the AgroAI ML pipeline?", options: ["Data → Code → Model → Output", "Ingestion → Preprocessing → Feature Engineering → Training → Evaluation → Deployment", "Collect → Store → Display", "Plan → Build → Test"], answerIndex: 1 },
          { question: "Why is reproducibility critical in agricultural ML?", options: ["It makes code shorter", "Farmers need consistent, trustworthy recommendations across seasons", "It reduces server costs", "It is required by programming languages"], answerIndex: 1 },
          { question: "What challenge does seasonal variation present?", options: ["Models run slower in summer", "Training data from one season may not generalize to another", "Seasons are too short", "There is no seasonal variation"], answerIndex: 1 },
          { question: "Why should ML pipelines be modular?", options: ["To make them harder to understand", "To swap models without changing preprocessing", "To reduce features", "Modularity is not important"], answerIndex: 1 },
        ]},
      ],
    },
    {
      title: "Data Preprocessing & Quality",
      content: [
        { type: "paragraph", text: "Agricultural data is inherently noisy — sensors drift, get damaged, and produce anomalous readings during extreme weather. Preprocessing must handle missing values, outliers, inconsistent formats, and temporal gaps." },
        { type: "paragraph", text: "The AgroAI preprocessing pipeline includes: data type validation, range checking (N: 0-500 mg/kg, pH: 3.0-10.0), missing value imputation (median for numeric, mode for categorical), duplicate removal, and temporal alignment." },
        { type: "paragraph", text: "The preprocessing report documents every transformation: rows removed, values imputed, outliers detected, and feature distributions before/after cleaning. This audit trail is essential for debugging model issues." },
        { type: "quiz", title: "Data Preprocessing", passPercent: 60, questions: [
          { question: "Why is agricultural sensor data inherently noisy?", options: ["Sensors are always perfect", "Sensors drift, get damaged, and produce anomalous readings", "Farmers intentionally corrupt data", "Agriculture data is cleaner than other domains"], answerIndex: 1 },
          { question: "What is the purpose of range checking?", options: ["To make data look better", "To catch physically impossible sensor readings", "To reduce features", "To speed up training"], answerIndex: 1 },
          { question: "Why is a preprocessing audit trail important?", options: ["It is not important", "To trace model errors back through preprocessing to raw data", "To make reports look professional", "To reduce code complexity"], answerIndex: 1 },
          { question: "How does AgroAI handle missing values?", options: ["Delete all rows with missing data", "Impute with median for numeric and mode for categorical", "Replace with zeros", "Ignore missing values entirely"], answerIndex: 1 },
        ]},
      ],
    },
    {
      title: "Model Selection & Comparison",
      content: [
        { type: "paragraph", text: "No single ML algorithm is best for all agricultural problems. AgroAI benchmarks: Random Forest (robust, interpretable), XGBoost (high accuracy, handles missing data), SVM (good for small datasets), KNN (simple baseline), and ANNs (complex patterns)." },
        { type: "paragraph", text: "Model comparison uses macro-F1 score, which handles class imbalance better than accuracy. If a dataset has 1000 rice samples but only 50 cashew samples, accuracy is misleading — a model that always predicts rice gets 95% accuracy but is useless for cashew." },
        { type: "paragraph", text: "The model selection process: (1) Train all candidates with default hyperparameters, (2) Compare on validation set using macro-F1, (3) Select top 3 for hyperparameter tuning, (4) Apply anti-overfitting gates (max 6% train-val gap, max 4% val-test gap), (5) Benchmark ensembles, (6) Deploy the winner." },
        { type: "quiz", title: "Model Selection", passPercent: 60, questions: [
          { question: "Why is macro-F1 preferred over accuracy?", options: ["It is faster to compute", "It handles class imbalance by averaging F1 across all classes equally", "It always gives higher values", "It requires less memory"], answerIndex: 1 },
          { question: "If a model always predicts rice with 1000 rice and 50 cashew samples, what problem occurs?", options: ["The model is too slow", "High accuracy but completely fails on minority classes", "The model overfits", "The model uses too much memory"], answerIndex: 1 },
          { question: "What are the anti-overfitting gates?", options: ["Firewall rules", "Max 6% train-val gap and max 4% val-test gap", "Speed requirements", "Memory limits"], answerIndex: 1 },
          { question: "Which model handles missing data gracefully?", options: ["Linear Regression", "XGBoost", "K-Nearest Neighbors", "Naive Bayes"], answerIndex: 1 },
        ]},
      ],
    },
    {
      title: "Hyperparameter Tuning with Optuna",
      content: [
        { type: "paragraph", text: "Hyperparameter tuning searches for the optimal model configuration. AgroAI uses Optuna with 30 trials and 3-fold cross-validation. Optuna uses Bayesian optimization — it learns from previous trials to suggest better hyperparameters." },
        { type: "paragraph", text: "Key hyperparameters: Random Forest (n_estimators, max_depth, min_samples_split), XGBoost (learning_rate, max_depth, subsample), SVM (C, kernel, gamma), and Neural Network (hidden_layers, learning_rate, dropout)." },
        { type: "paragraph", text: "Best practices: use a fixed random seed for reproducibility, set early stopping trials, log all trial results, and use the validation set consistently (never tune on test data)." },
        { type: "quiz", title: "Hyperparameter Tuning", passPercent: 60, questions: [
          { question: "How does Optuna's Bayesian optimization differ from random search?", options: ["It tries every combination", "It learns from previous trials to suggest better hyperparameters", "It uses no prior information", "It always finds the global optimum"], answerIndex: 1 },
          { question: "Why never tune on the test set?", options: ["It is faster to skip the test set", "The test set must remain unseen for unbiased final evaluation", "Test sets are too small", "It doesn't matter"], answerIndex: 1 },
          { question: "What does 'learning_rate' control in XGBoost?", options: ["How fast the computer runs", "How much each tree contributes to the final prediction", "The number of features", "The training dataset size"], answerIndex: 1 },
          { question: "Why is early stopping important during tuning?", options: ["To save disk space", "To prune unpromising trials and focus resources on promising ones", "To increase accuracy", "It is not important"], answerIndex: 1 },
        ]},
      ],
    },
    {
      title: "Temporal & Geographic Validation",
      content: [
        { type: "paragraph", text: "Standard random train-test splits can be misleading for agricultural ML because nearby locations and consecutive time periods are correlated. AgroAI uses grouped-by-location splits and temporal validation for honest performance estimates." },
        { type: "paragraph", text: "Geographic grouping ensures all rows from a given location land in exactly one split. With 300 locations: 45 to test, 45 to validation, 210 to training. This prevents geographic leakage." },
        { type: "paragraph", text: "Temporal validation uses 2023-2024 data for training and 2025 for testing. This simulates real-world deployment where the model must predict for future growing seasons." },
        { type: "quiz", title: "Validation Strategy", passPercent: 60, questions: [
          { question: "Why can standard random splits overestimate performance?", options: ["Random splits are always wrong", "Nearby locations and consecutive periods are correlated, causing data leakage", "Random splits are too slow", "Random splits use too much memory"], answerIndex: 1 },
          { question: "What does geographic grouping prevent?", options: ["Overfitting to weather patterns", "Geographic leakage where model memorizes location-specific patterns", "Model training entirely", "Data collection"], answerIndex: 1 },
          { question: "In temporal validation, which years are used for training vs testing?", options: ["2025 training, 2023 testing", "2023-2024 training, 2025 testing", "All years for both", "Only the most recent year"], answerIndex: 1 },
          { question: "What does temporal validation reveal?", options: ["How fast the model trains", "Whether the model captures stable relationships or overfits to weather patterns", "The model's memory usage", "The number of parameters"], answerIndex: 1 },
        ]},
      ],
    },
    {
      title: "Production Inference & Monitoring",
      content: [
        { type: "paragraph", text: "Production inference: validates input bounds → applies feature engineering → runs ensemble prediction → calibrates probabilities → checks OOD conditions → returns recommendations with confidence scores. Each step is logged for debugging." },
        { type: "paragraph", text: "Confidence-based responses: high (>75%) shows single recommendation, medium (60-75%) shows top-3, low (<60%) triggers expert consultation warning. This graduated response respects model uncertainty." },
        { type: "paragraph", text: "Monitoring tracks: prediction distribution, confidence score distribution, input feature distributions, and feedback loops (do farmers report good outcomes?). Model drift detection triggers automatic retraining." },
        { type: "quiz", title: "Production Inference", passPercent: 60, questions: [
          { question: "What does AgroAI do at medium confidence (60-75%)?", options: ["Returns no recommendation", "Shows top-3 options so the farmer can choose", "Always recommends rice", "Shuts down the service"], answerIndex: 1 },
          { question: "Why monitor prediction distribution in production?", options: ["It is not important", "To detect if the model is becoming biased toward certain crops", "To reduce server costs", "To make the dashboard look better"], answerIndex: 1 },
          { question: "What triggers automatic model retraining?", options: ["A fixed daily schedule only", "Performance degradation detected through monitoring", "When the farmer asks", "Never — models are trained once"], answerIndex: 1 },
          { question: "What is a feedback loop in agricultural ML?", options: ["Data flowing from sensor to database", "Collecting farmer reports on recommendation quality to improve models", "Running the model twice", "Storing data in two databases"], answerIndex: 1 },
        ]},
      ],
    },
  ],
};
