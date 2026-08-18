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

export const extraCourse32: ExtraCourse = {
  title: "Plant Disease Detection with Deep Learning",
  description:
    "Master the use of deep learning for automated plant disease identification from leaf images. Covers CNN architectures, transfer learning with EfficientNet, PyTorch implementation, and Gradio deployment.",
  category: "AgTech",
  duration: "8 weeks",
  difficulty: "Advanced",
  priceCents: 9900,
  durationMinutes: 480,
  order: 32,
  instructor: "Dr. Aniket Asawale",
  instructorTitle: "Deep Learning & Computer Vision Researcher",
  modules: [
    {
      title: "Introduction to Plant Disease Detection",
      content: [
        { type: "paragraph", text: "Plant diseases cause 20-40% of global crop losses annually, costing billions of dollars and threatening food security. Early detection is critical — diseases spread rapidly in field conditions." },
        { type: "paragraph", text: "The AgroAI Plant Disease Detection module uses deep learning to classify leaf images into healthy and diseased categories. The system employs PyTorch with EfficientNet architecture, achieving high accuracy across multiple crop species." },
        { type: "paragraph", text: "Key plant diseases include: leaf spots (bacterial and fungal), powdery mildew, rust, blight, mosaic viruses, nutrient deficiencies, and pest damage. Each disease produces distinct visual patterns that deep learning models can learn to identify reliably." },
        { type: "quiz", title: "Plant Disease Detection Basics", passPercent: 60, questions: [
          { question: "What percentage of global crop losses do plant diseases cause annually?", options: ["1-5%", "20-40%", "60-80%", "90-100%"], answerIndex: 1 },
          { question: "What deep learning architecture does AgroAI use for disease detection?", options: ["Linear regression", "EfficientNet with PyTorch", "Decision trees", "K-means clustering"], answerIndex: 1 },
          { question: "Why is early detection of plant diseases critical?", options: ["It makes farmers look knowledgeable", "Diseases spread rapidly and delays can cause total crop loss", "It reduces the need for fertilizers", "It improves soil quality"], answerIndex: 1 },
          { question: "What visual patterns do plant diseases produce?", options: ["Only color changes", "Color changes, spot shapes, lesion distributions, and texture alterations", "Only leaf size changes", "Only plant height changes"], answerIndex: 1 },
        ]},
      ],
    },
    {
      title: "Convolutional Neural Networks for Images",
      content: [
        { type: "paragraph", text: "Convolutional Neural Networks (CNNs) are the foundation of image-based plant disease detection. Unlike fully connected networks, CNNs use convolutional filters that slide across the image to detect local patterns — edges, textures, shapes, and disease-specific features." },
        { type: "paragraph", text: "A CNN architecture for plant disease detection typically consists of: convolutional layers (feature extraction), pooling layers (spatial reduction), batch normalization (training stability), and fully connected layers (classification)." },
        { type: "paragraph", text: "Key CNN concepts for plant pathology include: receptive field (region of input that influences a feature map), feature maps (activated patterns detected by filters), and spatial hierarchy (early layers detect edges, middle layers detect textures, deep layers detect disease-specific shapes)." },
        { type: "quiz", title: "CNN Fundamentals", passPercent: 60, questions: [
          { question: "What makes CNNs different from fully connected networks for images?", options: ["CNNs use more neurons", "CNNs use convolutional filters that detect local spatial patterns", "CNNs work only on text data", "CNNs require no training"], answerIndex: 1 },
          { question: "What do deep layers in a CNN typically detect?", options: ["Simple edges", "Complex disease-specific shapes and patterns", "Raw pixel values", "Image dimensions"], answerIndex: 1 },
          { question: "What is the purpose of pooling layers?", options: ["Adding more features", "Reducing spatial dimensions while preserving important features", "Increasing image resolution", "Color correction"], answerIndex: 1 },
          { question: "What is a 'receptive field' in CNN terminology?", options: ["The total number of parameters", "The region of input that influences a particular feature map", "The output classification", "The training dataset size"], answerIndex: 1 },
        ]},
      ],
    },
    {
      title: "Transfer Learning with EfficientNet",
      content: [
        { type: "paragraph", text: "Transfer learning reuses a model pre-trained on ImageNet and fine-tunes it for plant disease classification. EfficientNet is particularly effective because it balances network depth, width, and resolution through compound scaling." },
        { type: "paragraph", text: "The AgroAI system uses EfficientNet as the backbone. Pre-trained early layers detect universal visual features. By replacing the final classification layer and fine-tuning on plant disease images, the model quickly learns disease-specific patterns." },
        { type: "paragraph", text: "Practical transfer learning steps: (1) Load pre-trained EfficientNet weights, (2) Replace the final fully connected layer, (3) Freeze early layers initially, (4) Gradually unfreeze deeper layers with lower learning rates, (5) Apply data augmentation (rotation, flipping, color jitter)." },
        { type: "quiz", title: "Transfer Learning", passPercent: 60, questions: [
          { question: "What is transfer learning?", options: ["Training a model from scratch", "Reusing a pre-trained model and fine-tuning it for a specific task", "Transferring data between databases", "Moving models between servers"], answerIndex: 1 },
          { question: "Why is EfficientNet effective for disease detection?", options: ["It is the smallest model", "It balances depth, width, and resolution through compound scaling", "It requires no training data", "It only works on grayscale images"], answerIndex: 1 },
          { question: "Why freeze early layers during transfer learning?", options: ["To save disk space", "Early layers already detect universal visual features", "To make training faster", "Because they are broken"], answerIndex: 1 },
          { question: "What data augmentation helps prevent overfitting?", options: ["Only color changes", "Rotation, flipping, and color jitter", "Cropping only", "No augmentation needed"], answerIndex: 1 },
        ]},
      ],
    },
    {
      title: "Training Pipeline in PyTorch",
      content: [
        { type: "paragraph", text: "PyTorch provides a flexible framework for building plant disease detection models. The training pipeline includes: data loading with custom datasets, image preprocessing, model definition, loss function selection, optimizer configuration, and training loop with validation." },
        { type: "paragraph", text: "For plant disease classification: CrossEntropyLoss (multi-class), Adam optimizer with learning rate scheduling, and data augmentation (RandomHorizontalFlip, RandomRotation, ColorJitter). Batch size of 32-64 works well. Training typically converges in 20-50 epochs with early stopping." },
        { type: "paragraph", text: "Key PyTorch components: DataLoader (efficient batching and parallel loading), transforms (preprocessing pipeline), nn.Module (model definition), and torch.optim (optimizer). The AgroAI system packages the trained model with a Gradio interface for web deployment." },
        { type: "quiz", title: "PyTorch Training", passPercent: 60, questions: [
          { question: "What loss function is standard for multi-class disease classification?", options: ["Mean Squared Error", "CrossEntropyLoss", "Binary Cross Entropy", "Hinge Loss"], answerIndex: 1 },
          { question: "What does the DataLoader do in PyTorch?", options: ["Saving trained models", "Efficient batching and parallel data loading", "Visualizing results", "Hyperparameter tuning"], answerIndex: 1 },
          { question: "What does early stopping prevent?", options: ["The model from being saved", "Overfitting by stopping when validation performance degrades", "Data loading errors", "GPU memory overflow"], answerIndex: 1 },
          { question: "What is the purpose of ColorJitter in data augmentation?", options: ["To make images smaller", "To simulate variations in lighting conditions in the field", "To add watermarks", "To convert images to grayscale"], answerIndex: 1 },
        ]},
      ],
    },
    {
      title: "Model Evaluation & Deployment",
      content: [
        { type: "paragraph", text: "Evaluating plant disease detection models requires metrics beyond simple accuracy. Confusion matrices reveal which diseases are confused. Precision and recall per class are critical — missing a disease (low recall) is more dangerous than a false alarm (low precision)." },
        { type: "paragraph", text: "The AgroAI system deploys via a Gradio web interface and a FastAPI endpoint. Gradio provides an instant demo where farmers upload leaf photos. The API endpoint integrates with the mobile application for field use." },
        { type: "paragraph", text: "Production considerations: model optimization (quantization, ONNX export), latency requirements (<500ms for real-time), edge deployment (running on mobile devices without internet), and continuous monitoring (tracking prediction accuracy over time)." },
        { type: "quiz", title: "Evaluation & Deployment", passPercent: 60, questions: [
          { question: "Why is recall more important than precision for disease detection?", options: ["Recall is faster to compute", "Missing a real disease is more dangerous than a false alarm", "Precision requires more data", "They are equally important"], answerIndex: 1 },
          { question: "What does a confusion matrix reveal?", options: ["The model's training time", "Which diseases are commonly confused with each other", "The total number of parameters", "The GPU memory usage"], answerIndex: 1 },
          { question: "What is the target latency for real-time field diagnosis?", options: ["10 seconds", "Less than 500ms", "1 minute", "No latency requirement"], answerIndex: 1 },
          { question: "Why is edge deployment important for agriculture?", options: ["It is more accurate than cloud", "Farmers often have no internet in remote fields", "It uses less battery", "It requires no model training"], answerIndex: 1 },
        ]},
      ],
    },
    {
      title: "Advanced Disease Detection Techniques",
      content: [
        { type: "paragraph", text: "Beyond basic classification, attention mechanisms highlight the specific leaf regions that triggered the diagnosis. Grad-CAM (Gradient-weighted Class Activation Mapping) generates heatmaps showing which pixels most influenced the prediction." },
        { type: "paragraph", text: "Multi-task learning simultaneously detects disease type, severity level, and affected plant part. This provides richer diagnostic information — a farmer needs not just 'leaf rust' but 'moderate leaf rust on upper leaves' for treatment decisions." },
        { type: "paragraph", text: "Future directions include: few-shot learning for rare diseases, domain adaptation across crop varieties and camera types, temporal disease tracking, and integration with IoT sensor data for more accurate diagnosis." },
        { type: "quiz", title: "Advanced Techniques", passPercent: 60, questions: [
          { question: "What does Grad-CAM produce?", options: ["A text description only", "Heatmaps showing which leaf regions triggered the diagnosis", "A treatment prescription", "Soil analysis results"], answerIndex: 1 },
          { question: "What does multi-task learning provide?", options: ["Faster training only", "Disease type, severity level, and affected plant part simultaneously", "Higher resolution images", "More training data"], answerIndex: 1 },
          { question: "What is few-shot learning useful for?", options: ["Training faster on large datasets", "Detecting rare diseases with very few labeled examples", "Reducing model size", "Improving image quality"], answerIndex: 1 },
          { question: "How can IoT sensor data improve disease detection?", options: ["By providing GPS coordinates only", "By combining environmental conditions with visual symptoms", "By replacing visual analysis entirely", "By reducing the need for images"], answerIndex: 1 },
        ]},
      ],
    },
  ],
};
