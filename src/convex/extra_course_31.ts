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

export const extraCourse31: ExtraCourse = {
  title: "AI Crop Recommendation Systems",
  description:
    "Learn to build ML systems that recommend optimal crops based on soil parameters, weather data, and geographic conditions. Covers feature engineering, ensemble methods, conformal prediction, and deployment using the AgroAI Crop Recommendation Engine.",
  category: "AgTech",
  duration: "8 weeks",
  difficulty: "Advanced",
  priceCents: 9900,
  durationMinutes: 480,
  order: 31,
  instructor: "Dr. Aniket Asawale",
  instructorTitle: "ML & Precision Agriculture Researcher",
  modules: [
    {
      title: "Introduction to Crop Recommendation AI",
      content: [
        {
          type: "paragraph",
          text: "Crop recommendation is one of the most impactful applications of AI in agriculture. By analyzing soil nutrients (NPK), pH, moisture, electrical conductivity, temperature, humidity, rainfall, and geographic features, ML models can predict which crops will thrive in a given field condition.",
        },
        {
          type: "paragraph",
          text: "The AgroAI Crop Recommendation Engine uses a multi-model approach: baseline classifiers (Random Forest, XGBoost, SVM), neural networks, and stacked ensembles. It processes both sensor data and weather data along with geographic features to make recommendations.",
        },
        {
          type: "paragraph",
          text: "Key challenges include: class imbalance (some crops have more training data), geographic bias (models trained in one region may not generalize), temporal variation (seasonal effects), and uncertainty quantification (knowing when the model is unsure).",
        },
        {
          type: "quiz",
          title: "Crop Recommendation Basics",
          passPercent: 60,
          questions: [
            {
              question: "Which soil parameters are most critical for crop recommendation?",
              options: [
                "Soil color and texture only",
                "NPK levels, pH, moisture, and EC",
                "Soil depth and rock content",
                "Soil temperature only",
              ],
              answerIndex: 1,
            },
            {
              question: "Why is class imbalance a problem in crop recommendation models?",
              options: [
                "It makes training faster",
                "Crops with more training data dominate predictions",
                "It improves accuracy",
                "It reduces model size",
              ],
              answerIndex: 1,
            },
            {
              question: "What technique does AgroAI use to address class imbalance?",
              options: [
                "Deleting minority class samples",
                "SMOTE (Synthetic Minority Over-sampling)",
                "Adding more features",
                "Using a smaller model",
              ],
              answerIndex: 1,
            },
            {
              question: "What does conformal prediction provide that standard classification does not?",
              options: [
                "Faster predictions",
                "Confidence intervals and uncertainty estimates",
                "Better graphics",
                "Lower memory usage",
              ],
              answerIndex: 1,
            },
          ],
        },
      ],
    },
    {
      title: "Feature Engineering for Agriculture",
      content: [
        {
          type: "paragraph",
          text: "Feature engineering transforms raw sensor and weather data into informative inputs for ML models. The AgroAI system creates 8 agronomic interaction features: N×P, N×K, P×K (NPK cross-products), temperature×moisture, temperature×humidity, rainfall×humidity, pH×EC, and moisture-rain ratio.",
        },
        {
          type: "paragraph",
          text: "Categorical features like soil type (Sandy, Laterite, Red, Alluvial, Black) and season (Kharif, Rabi, Zaid) must be encoded. The system uses one-hot encoding for soil types and label encoding for drainage ordinal values.",
        },
        {
          type: "paragraph",
          text: "Input jitter augmentation adds controlled noise to continuous features (3.5% of the range per feature) to improve model robustness. Interaction features are recomputed after jittering to maintain physical consistency.",
        },
        {
          type: "quiz",
          title: "Feature Engineering",
          passPercent: 60,
          questions: [
            {
              question: "What is the purpose of NPK cross-product features?",
              options: [
                "To reduce the number of features",
                "To capture non-linear nutrient interactions",
                "To make the model smaller",
                "To encode soil type",
              ],
              answerIndex: 1,
            },
            {
              question: "Why are interaction features recomputed after input jitter augmentation?",
              options: [
                "To save computation time",
                "To maintain physical consistency between raw and derived values",
                "Because the original values are deleted",
                "To increase the number of features",
              ],
              answerIndex: 1,
            },
            {
              question: "What does the moisture-rain ratio feature represent?",
              options: [
                "Total water in the field",
                "Soil moisture relative to recent rainfall",
                "The speed of irrigation",
                "The depth of the water table",
              ],
              answerIndex: 1,
            },
            {
              question: "How does soil drainage mapping help in crop recommendation?",
              options: [
                "It maps GPS coordinates",
                "It links soil texture to drainage speed for better feature representation",
                "It measures water flow rate",
                "It predicts rainfall",
              ],
              answerIndex: 1,
            },
          ],
        },
      ],
    },
    {
      title: "Model Training & Evaluation",
      content: [
        {
          type: "paragraph",
          text: "The AgroAI system trains multiple model families and selects the best performer. Baseline models include Random Forest, XGBoost, Support Vector Machines, and K-Nearest Neighbors. A neural network provides a deep learning alternative. Model comparison uses macro-F1 score as the primary metric.",
        },
        {
          type: "paragraph",
          text: "Hyperparameter tuning uses Optuna with 30 trials and 3-fold cross-validation. The system enforces anti-overfitting gates: the training-validation accuracy gap must be ≤6%, and the validation-test gap must be ≤4%.",
        },
        {
          type: "paragraph",
          text: "Model calibration using isotonic regression ensures predicted probabilities match actual frequencies. A model that says '75% confident about rice' should be correct about 75% of the time. Uncalibrated models tend to be overconfident.",
        },
        {
          type: "quiz",
          title: "Model Training & Evaluation",
          passPercent: 60,
          questions: [
            {
              question: "Why is macro-F1 score preferred over accuracy for crop recommendation?",
              options: [
                "It is faster to compute",
                "It handles class imbalance better",
                "It always gives higher values",
                "It requires less memory",
              ],
              answerIndex: 1,
            },
            {
              question: "What is the maximum allowed training-validation gap in AgroAI?",
              options: ["15%", "6%", "1%", "25%"],
              answerIndex: 1,
            },
            {
              question: "What does isotonic calibration ensure?",
              options: [
                "Faster model training",
                "Predicted probabilities match actual frequencies",
                "Higher accuracy on training data",
                "Smaller model file size",
              ],
              answerIndex: 1,
            },
            {
              question: "Why is overconfidence dangerous in crop recommendation?",
              options: [
                "It makes the model too slow",
                "Farmers make expensive planting decisions based on predictions",
                "It uses more memory",
                "It requires more features",
              ],
              answerIndex: 1,
            },
          ],
        },
      ],
    },
    {
      title: "Ensemble Methods & Stacking",
      content: [
        {
          type: "paragraph",
          text: "Ensemble methods combine multiple models to produce better predictions than any single model. The AgroAI system uses stacking (meta-learner on base model predictions) and hierarchical classification (predict crop family first, then specific crop).",
        },
        {
          type: "paragraph",
          text: "The stacking architecture uses Random Forest, XGBoost, and SVM as base learners, with a logistic regression meta-learner on top. Stacking is adopted only if it improves validation accuracy by at least 0.5% over the best base model.",
        },
        {
          type: "paragraph",
          text: "Hierarchical classification first predicts a crop family (cereals, legumes, fruits, vegetables) and then predicts the specific crop. This mirrors how agronomists think — narrow down the category first, then recommend specific varieties.",
        },
        {
          type: "quiz",
          title: "Ensemble Methods",
          passPercent: 60,
          questions: [
            {
              question: "How does stacking improve over individual models?",
              options: [
                "By running models in parallel",
                "By training a meta-learner on base model predictions",
                "By using more training data",
                "By reducing model complexity",
              ],
              answerIndex: 1,
            },
            {
              question: "What is the minimum accuracy gain required to adopt stacking?",
              options: ["0.1%", "0.5%", "5%", "10%"],
              answerIndex: 1,
            },
            {
              question: "How does hierarchical classification work?",
              options: [
                "It uses a single model for all crops",
                "It first predicts crop family, then specific crop within that family",
                "It trains models on different servers",
                "It uses different algorithms for different data types",
              ],
              answerIndex: 1,
            },
            {
              question: "Why does hierarchical classification improve accuracy?",
              options: [
                "It uses more features",
                "It reduces the number of classes at each decision point",
                "It requires less training data",
                "It runs faster",
              ],
              answerIndex: 1,
            },
          ],
        },
      ],
    },
    {
      title: "Out-of-Distribution Detection",
      content: [
        {
          type: "paragraph",
          text: "Out-of-distribution (OOD) detection identifies when input data falls outside the model's training distribution. In agriculture, this happens when a farmer queries conditions from a region the model was never trained on, or when sensor malfunctions produce impossible readings.",
        },
        {
          type: "paragraph",
          text: "AgroAI uses two OOD detection methods: Mahalanobis distance (measures distance from training distribution) and ensemble disagreement (measures variance across Random Forest trees). Both flag uncertain predictions before they reach farmers.",
        },
        {
          type: "paragraph",
          text: "The system uses conformal prediction to provide coverage guarantees. With α=0.10, the prediction sets are guaranteed to contain the true crop with at least 90% probability. When the prediction set is large, the model is expressing uncertainty.",
        },
        {
          type: "quiz",
          title: "OOD Detection & Uncertainty",
          passPercent: 60,
          questions: [
            {
              question: "When does out-of-distribution (OOD) occur in crop recommendation?",
              options: [
                "When the model is fast",
                "When input data falls outside the training distribution",
                "When the model has many features",
                "When training data is abundant",
              ],
              answerIndex: 1,
            },
            {
              question: "What does Mahalanobis distance measure?",
              options: [
                "The speed of model inference",
                "How far a sample is from the training distribution",
                "The number of features used",
                "The model's training time",
              ],
              answerIndex: 1,
            },
            {
              question: "With conformal prediction at α=0.10, what coverage guarantee is provided?",
              options: [
                "100% accuracy",
                "At least 90% probability the true crop is in the prediction set",
                "10% error rate guaranteed",
                "No uncertainty information",
              ],
              answerIndex: 1,
            },
            {
              question: "Why is a large prediction set more useful than a single overconfident prediction?",
              options: [
                "It takes less computation",
                "It honestly communicates model uncertainty to the farmer",
                "It always includes the correct answer",
                "It requires fewer features",
              ],
              answerIndex: 1,
            },
          ],
        },
      ],
    },
    {
      title: "Deploying Crop Recommendation Models",
      content: [
        {
          type: "paragraph",
          text: "Deploying ML models in production agriculture requires handling real-time sensor input, model versioning, performance monitoring, and graceful degradation. The AgroAI system exposes the crop recommendation model via a FastAPI endpoint behind an API gateway.",
        },
        {
          type: "paragraph",
          text: "The inference pipeline validates inputs against physical bounds, applies feature engineering, runs the model ensemble, calibrates probabilities, checks for OOD conditions, and returns recommendations with confidence scores. High confidence shows a single recommendation; medium shows top-3; low triggers a warning.",
        },
        {
          type: "paragraph",
          text: "Model retraining is scheduled quarterly as new sensor data accumulates. The temporal validation framework ensures models generalize across seasons, and geographic grouping prevents data leakage.",
        },
        {
          type: "quiz",
          title: "Model Deployment",
          passPercent: 60,
          questions: [
            {
              question: "What happens when the AgroAI model has low confidence (<60%)?",
              options: [
                "It returns the top prediction anyway",
                "It triggers a warning and may suggest consulting an expert",
                "It crashes the system",
                "It returns a random crop",
              ],
              answerIndex: 1,
            },
            {
              question: "Why are input bounds validated before inference?",
              options: [
                "To make the model faster",
                "To prevent impossible sensor readings from causing wrong recommendations",
                "To reduce memory usage",
                "To improve training speed",
              ],
              answerIndex: 1,
            },
            {
              question: "Why does the system use geographic grouping during train-test splits?",
              options: [
                "To make training faster",
                "To prevent nearby locations from appearing in both train and test sets",
                "To reduce the number of features",
                "To improve model accuracy on paper",
              ],
              answerIndex: 1,
            },
            {
              question: "How often should crop recommendation models be retrained?",
              options: [
                "Every day",
                "Quarterly as new data accumulates",
                "Never after initial training",
                "Only when the model breaks",
              ],
              answerIndex: 1,
            },
          ],
        },
      ],
    },
  ],
};
