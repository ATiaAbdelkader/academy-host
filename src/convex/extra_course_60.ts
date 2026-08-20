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

export const extraCourse60: ExtraCourse = {
  title: "Computer Vision for Pest & Disease Detection",
  description: "Learn to build AI systems that identify crop pests and diseases from images using deep learning, enabling early detection and targeted treatment.",
  category: "AI in Agriculture",
  priceCents: 0,
  durationMinutes: 2400,
  instructor: "Dr. James Okafor",
  instructorTitle: "Computer Vision Researcher",
  order: 60,
  modules: [
    {
      title: "Introduction to Plant Disease & Pest Identification",
      content: [
        { type: "paragraph", text: "Crop diseases and pests cause 20-40% of global crop losses annually ($220 billion). Early detection is critical—diseases caught in the first week can be treated effectively, while late detection often means crop loss. AI-powered identification enables detection at the earliest possible stage." },
        { type: "paragraph", text: "Common Crop Diseases: Fungal (rust, powdery mildew, blight, wilt), Bacterial (bacterial spot, fire blight, bacterial wilt), Viral (TMV, mosaic virus, leaf curl), Physiological (nutrient deficiencies, salt stress, water stress). Each type has distinct visual symptoms." },
        { type: "paragraph", text: "Common Pests: Aphids, spider mites, whiteflies, thrips, corn borers, armyworms, fruit flies, nematodes (not visible but cause symptoms). Identification requires looking at the pest itself, feeding damage patterns, and frass (insect excrement)." },
        { type: "paragraph", text: "Visual Symptom Patterns: Fungal diseases often show circular lesions with concentric rings. Bacterial diseases produce water-soaked spots that turn necrotic. Viral diseases cause mosaic patterns, mottling, and leaf distortion. Pest damage shows chewing marks, stippling, or webbing." },
        { type: "paragraph", text: "Why AI? A trained plant pathologist can identify most diseases, but there aren't enough experts for every farm. AI democratizes expert-level identification through smartphone apps, achieving 90-99% accuracy for common diseases across major crops." },
        { type: "video", caption: "Watch: The Global Crop Disease Challenge — How crop diseases impact food security and why AI-powered detection is transformative for smallholder farmers.", url: "https://example.com/cv-pest/introduction" },
        { type: "quiz", title: "Module Quiz", questions: [
          { question: "What percentage of global crop losses are caused by diseases and pests annually?", options: ["5-10%", "20-40%", "50-60%", "70-80%"], answerIndex: 1 },
          { question: "Which disease type typically produces circular lesions with concentric rings?", options: ["Bacterial", "Viral", "Fungal", "Physiological"], answerIndex: 2 }
        ], passPercent: 70 }
      ]
    },
    {
      title: "Image Data Collection & Dataset Building",
      content: [
        { type: "paragraph", text: "High-quality, diverse training data is the foundation of accurate pest/disease detection. This module covers how to collect, label, and organize image datasets for agricultural AI." },
        { type: "paragraph", text: "Image Sources: (1) Field photography (smartphone cameras), (2) Research datasets (PlantVillage: 54,000 images, 38 classes), (3) Farmer-submitted images (citizen science), (4) Laboratory macro photography, (5) Drone-based canopy imaging." },
        { type: "paragraph", text: "Dataset Diversity Requirements: Images must vary in: lighting conditions (sunny, cloudy, shade), background (soil, other leaves, sky), camera angle, distance, crop variety, disease severity (early, moderate, severe), and geographic region. Model performance is only as good as the data variety." },
        { type: "paragraph", text: "Annotation Strategies: (1) Image-level labels (whole image classification), (2) Bounding boxes (localize individual lesions or pests), (3) Pixel-level segmentation (precise lesion boundaries), (4) Multi-label (multiple diseases on one leaf). Use tools: LabelImg, CVAT, Roboflow, Labelbox." },
        { type: "paragraph", text: "Data Augmentation: Critical for small agricultural datasets. Techniques: random rotation (0-360°), horizontal/vertical flip, color jittering (brightness, contrast, saturation), random crop, cutout, MixUp, CutMix, albumentations library. Can increase effective dataset size 10-50x." },
        { type: "paragraph", text: "Challenges: Class imbalance (healthy >> diseased), look-alike diseases (early blight vs. late blight), multi-pathogen infections, mixed pest-disease damage, background noise (soil particles mistaken for spots). Address with oversampling, class weighting, and hard negative mining." },
        { type: "video", caption: "Watch: Building a Plant Disease Dataset — From field photography through annotation to a training-ready dataset for deep learning models.", url: "https://example.com/cv-pest/dataset-building" },
        { type: "quiz", title: "Module Quiz", questions: [
          { question: "What is the minimum recommended image variety for robust pest/disease detection?", options: ["Same lighting and angle only", "Varying lighting, backgrounds, angles, disease severity, and crop varieties", "Only diseased images", "Only high-resolution images"], answerIndex: 1 },
          { question: "Which augmentation technique combines two images to create a blended training sample?", options: ["Random rotation", "Color jittering", "MixUp/CutMix", "Gaussian blur"], answerIndex: 2 }
        ], passPercent: 70 }
      ]
    },
    {
      title: "Deep Learning Models for Classification",
      content: [
        { type: "paragraph", text: "This module covers the deep learning architectures used for crop disease classification, from classic CNNs to modern Vision Transformers, and how to train them effectively." },
        { type: "paragraph", text: "CNN Fundamentals: Convolutional layers extract features (edges → textures → patterns → objects), pooling reduces spatial dimensions, fully connected layers classify. Key architectures: AlexNet, VGG, GoogLeNet, ResNet, EfficientNet." },
        { type: "paragraph", text: "Transfer Learning Strategy: Start with ImageNet pre-trained weights (ResNet-50, EfficientNet-B4). Replace final classification layer. Fine-tune last 2-3 layers on agricultural data. Benefits: 5-10x less training data needed, faster convergence, better generalization." },
        { type: "paragraph", text: "EfficientNet Architecture: Compound scaling balances network depth, width, and resolution. EfficientNet-B4 achieves 82.9% ImageNet accuracy with 19M parameters. Fine-tuned for plant disease, it reaches 98-99% accuracy on PlantVillage dataset." },
        { type: "paragraph", text: "Vision Transformers (ViT): Process images as sequences of patches. Self-attention captures global context (entire leaf patterns) that CNNs may miss. DeiT (Data-efficient Image Transformer) works well with smaller agricultural datasets. Swin Transformer adds hierarchical structure." },
        { type: "paragraph", text: "Training Best Practices: Learning rate scheduling (cosine annealing), label smoothing (prevent overconfidence), early stopping (prevent overfitting), mixup augmentation, class-balanced sampling, multi-scale training. Typical training: 50-100 epochs on GPU (2-8 hours)." },
        { type: "video", caption: "Watch: Training a Disease Classifier — Complete walkthrough from data loading through model training, evaluation, and optimization for plant disease detection.", url: "https://example.com/cv-pest/classification-models" },
        { type: "quiz", title: "Module Quiz", questions: [
          { question: "Why is transfer learning particularly effective for plant disease detection?", options: ["It doesn't need training data", "Pre-trained features (edges, textures) transfer well to leaf images", "It only works for one disease", "It requires special hardware"], answerIndex: 1 },
          { question: "What is the advantage of Vision Transformers over CNNs for disease detection?", options: ["They are faster to train", "Self-attention captures global context across the entire image", "They need less data", "They don't require GPUs"], answerIndex: 1 }
        ], passPercent: 70 }
      ]
    },
    {
      title: "Object Detection for Pests & Lesions",
      content: [
        { type: "paragraph", text: "Beyond classification (what disease?), object detection locates individual pests and lesions (where?). This module covers detection architectures and their application to agricultural pest monitoring." },
        { type: "paragraph", text: "Detection Architectures: (1) Two-stage: Faster R-CNN (high accuracy, slower), (2) One-stage: YOLO v8/v9 (fast, good accuracy), (3) Anchor-free: FCOS, CenterNet (simpler, fewer hyperparameters). YOLO is preferred for real-time field deployment." },
        { type: "paragraph", text: "YOLO for Pest Detection: YOLOv8-nano achieves 30+ FPS on mobile devices. Train with custom agricultural pest datasets. Input: 640×640 image → Output: bounding boxes + class labels + confidence scores. Detects 50+ pest species simultaneously." },
        { type: "paragraph", text: "Lesion Segmentation: Precise measurement of disease severity. U-Net and Mask R-CNN segment individual lesions from leaf images. Calculate lesion area as percentage of leaf area for quantitative severity scoring (0-100% leaf area affected)." },
        { type: "paragraph", text: "Instance Segmentation: Distinguish individual instances of the same pest class. Important for counting (how many aphids per leaf?), density estimation, and tracking individual pests over time. Mask R-CNN and YOLACT provide instance-level masks." },
        { type: "paragraph", text: "Small Object Detection: Many agricultural pests are tiny (aphids: 1-3mm). Techniques: image tiling (split large image into small patches), super-resolution preprocessing, feature pyramid networks (FPN), attention mechanisms focusing on fine details." },
        { type: "video", caption: "Watch: Building a Real-Time Pest Detector — Training YOLOv8 for field-deployable pest detection that runs on smartphones and edge devices.", url: "https://example.com/cv-pest/object-detection" },
        { type: "quiz", title: "Module Quiz", questions: [
          { question: "Why is YOLO preferred for field-deployable pest detection?", options: ["It has the highest accuracy", "It runs in real-time with good accuracy on mobile/edge devices", "It doesn't need training data", "It works without images"], answerIndex: 1 },
          { question: "What technique helps detect tiny pests like aphids in images?", options: ["Lowering resolution", "Image tiling with feature pyramid networks", "Using only grayscale images", "Reducing batch size"], answerIndex: 1 }
        ], passPercent: 70 }
      ]
    },
    {
      title: "Mobile & Edge Deployment",
      content: [
        { type: "paragraph", text: "The real value of AI pest detection is putting it in farmers' hands. This module covers optimizing and deploying models on smartphones, drones, and edge devices for field use." },
        { type: "paragraph", text: "Model Optimization: Quantization (FP32 → INT8, 4x smaller, 3-4x faster), pruning (remove 30-70% of weights with <1% accuracy loss), knowledge distillation (train small model to mimic large model), NAS (neural architecture search for optimal mobile architectures)." },
        { type: "paragraph", text: "Mobile Frameworks: TensorFlow Lite (Android/iOS), Core ML (iOS), ONNX Runtime Mobile, NCNN (Android), MNN (Alibaba). A quantized EfficientNet-B0 achieves 95%+ accuracy on PlantVillage at 5ms inference on a modern smartphone." },
        { type: "paragraph", text: "Edge Devices: NVIDIA Jetson Nano/Xavier (camera + GPU on drones/robots), Google Coral TPU (USB accelerator), Intel Neural Compute Stick, Raspberry Pi + accelerator HATs. Selection based on power budget, connectivity, and processing needs." },
        { type: "paragraph", text: "Mobile App Design: Camera integration with real-time inference overlay, offline capability (models embedded in app), results with confidence scores and treatment recommendations, image upload for expert verification, field mapping of disease hotspots." },
        { type: "paragraph", text: "Performance Optimization: Pre-processing optimization (camera frame → model input in <10ms), async inference (capture frame while processing previous), multi-model pipelines (fast detector → slow classifier), GPU/NPU acceleration, model caching." },
        { type: "video", caption: "Watch: Deploying Plant Disease Detection on Mobile — From PyTorch model to production-ready TensorFlow Lite app for Android and iOS.", url: "https://example.com/cv-pest/mobile-deployment" },
        { type: "quiz", title: "Module Quiz", questions: [
          { question: "How much smaller can INT8 quantization make a model compared to FP32?", options: ["1x (same size)", "2x smaller", "4x smaller", "10x smaller"], answerIndex: 2 },
          { question: "What enables offline pest detection in mobile apps?", options: ["Internet connection", "Models embedded directly in the app package", "Cloud-based processing", "Bluetooth sensors"], answerIndex: 1 }
        ], passPercent: 70 }
      ]
    },
    {
      title: "Integrated Pest Management with AI",
      content: [
        { type: "paragraph", text: "The final module places AI detection within the broader context of Integrated Pest Management (IPM)—a holistic approach that combines biological, cultural, mechanical, and chemical controls." },
        { type: "paragraph", text: "IPM Framework: (1) Prevention (crop rotation, resistant varieties), (2) Monitoring (AI-powered scouting), (3) Threshold-based action (economic thresholds, not calendar spraying), (4) Control (biological first, targeted chemical last), (5) Evaluation." },
        { type: "paragraph", text: "Economic Thresholds: The pest population level at which control costs are justified by prevented losses. AI helps calculate real-time thresholds by combining pest counts, crop value, growth stage, and treatment costs. Spraying below threshold wastes money and harms beneficial insects." },
        { type: "paragraph", text: "Biological Control Integration: AI identifies beneficial insects (predatory beetles, parasitic wasps, lacewings) alongside pests. Protecting beneficials while targeting pests requires accurate species-level identification. Camera traps + AI monitor beneficial insect populations." },
        { type: "paragraph", text: "Precision Spraying: AI-targeted spot spraying applies pesticides only where pests are detected. Reduces pesticide use by 60-90% compared to broadcast application. Technologies: individual nozzle control, laser-guided sprayers, drone-based precision spraying." },
        { type: "paragraph", text: "Resistance Management: Track pesticide applications and pest populations over time. AI models predict resistance development risk based on application frequency, mode of action, and genetic diversity. Recommend rotation strategies to slow resistance evolution." },
        { type: "video", caption: "Watch: AI-Powered IPM in Practice — How AI detection integrates with biological control, precision spraying, and resistance management for sustainable pest control.", url: "https://example.com/cv-pest/ipm-integration" },
        { type: "paragraph", text: "Future of AI Pest Management: Swarm robotics for autonomous pest monitoring, pheromone sensors combined with AI for moth pest detection, CRISPR-based biopesticides guided by AI diagnostics, and global pest surveillance networks using citizen science + AI." },
        { type: "quiz", title: "Module Quiz", questions: [
          { question: "What is the economic threshold in IPM?", options: ["The maximum number of pests allowed", "The pest level where control costs are justified by prevented losses", "When 50% of the crop is damaged", "The farmer's tolerance for pests"], answerIndex: 1 },
          { question: "How much can AI-targeted spot spraying reduce pesticide use compared to broadcast application?", options: ["5-10%", "20-30%", "40-50%", "60-90%"], answerIndex: 3 }
        ], passPercent: 70 }
      ]
    }
  ]
};
