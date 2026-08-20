import type { ExtraCourse } from "./schema";

export const extraCourse65: ExtraCourse = {
  title: "Natural Language Processing for Agriculture",
  description: "Build AI chatbots, multilingual crop advisors, and document analysis systems that make agricultural knowledge accessible to farmers in their own language.",
  category: "AI in Agriculture",
  duration: "8 weeks",
  difficulty: "Intermediate",
  priceCents: 0,
  durationMinutes: 2400,
  instructor: "Dr. Fatima Al-Hassan",
  instructorTitle: "NLP Researcher & AgTech Developer",
  tags: ["NLP", "Chatbot", "Multilingual", "Knowledge Base", "Farmer Support"],
  order: 65,
  modules: [
    {
      title: "NLP Fundamentals for Agricultural Applications",
      content: [
        { type: "paragraph", text: "Natural Language Processing enables computers to understand, interpret, and generate human language. In agriculture, NLP powers chatbots, voice assistants, document analysis, and multilingual knowledge systems that reach farmers worldwide." },
        { type: "paragraph", text: "Why NLP in Agriculture? 500 million smallholder farmers lack access to agricultural extension services. Most speak local languages not served by existing digital tools. NLP-powered voice and text interfaces can bridge this gap—delivering expert advice in Swahili, Hindi, Hausa, or Quechua." },
        { type: "paragraph", text: "NLP Task Types: (1) Text classification (categorize farmer questions), (2) Named entity recognition (extract crop names, locations, symptoms), (3) Question answering (provide specific answers), (4) Sentiment analysis (gauge farmer satisfaction), (5) Machine translation (multilingual support), (6) Text generation (create advisory content)." },
        { type: "paragraph", text: "Agricultural NLP Challenges: (1) Low-resource languages (limited training data), (2) Domain-specific terminology (pest names, variety names), (3) Noisy text (misspellings, dialects, code-switching), (4) Multimodal input (text + photos + voice), (5) Context-dependent advice (local conditions matter)." },
        { type: "paragraph", text: "Text Preprocessing: Tokenization → lowercasing → stop word removal → stemming/lemmatization → entity recognition. For agricultural text: domain-specific tokenizers that handle crop variety names, chemical compounds, and local terminology." },
        { type: "video", caption: "Watch: NLP for Farmer Support — How natural language processing can deliver agricultural advice to 500 million smallholder farmers in their own language.", url: "https://example.com/ag-nlp/introduction" },
        { type: "quiz", title: "Module Quiz", questions: [
          { question: "How many smallholder farmers globally lack access to agricultural extension services?", options: ["50 million", "100 million", "500 million", "1 billion"], answerIndex: 2, explanation: "Approximately 500 million smallholder farmers worldwide lack access to formal agricultural extension services—NLP-powered tools can bridge this gap." },
          { question: "What is a major NLP challenge for agricultural applications in developing countries?", options: ["Too much training data", "Low-resource languages with limited digital text", "Only English speakers use phones", "Farmers do not ask questions"], answerIndex: 1, explanation: "Many agricultural communities speak low-resource languages with limited digital text available for training NLP models, requiring specialized approaches like transfer learning and data augmentation." }
        ], passPercent: 70 }
      ]
    },
    {
      title: "Building Agricultural Chatbots",
      content: [
        { type: "paragraph", text: "Agricultural chatbots provide 24/7 farmer support, answering questions about crop management, pest control, weather, and market prices. This module covers building domain-specific chatbots for agriculture." },
        { type: "paragraph", text: "Chatbot Architectures: (1) Rule-based (intent matching, response templates—simple but limited), (2) Retrieval-based (select best response from knowledge base), (3) Generative (LLM generates responses—flexible but needs guardrails), (4) Hybrid (combination for reliability + flexibility)." },
        { type: "paragraph", text: "Knowledge Base Construction: Curate agricultural knowledge from: extension manuals, research papers, government guidelines, expert interviews, and farmer forums. Structure as FAQ pairs, decision trees, and fact sheets. Target: 5,000-10,000 Q&A pairs for comprehensive coverage." },
        { type: "paragraph", text: "Intent Classification: Categorize incoming messages: pest identification, disease diagnosis, fertilizer recommendation, weather query, market price, planting advice, irrigation guidance. Use fine-tuned BERT or DistilBERT for multi-label classification (85-95% accuracy)." },
        { type: "paragraph", text: "Entity Extraction: Extract key entities from farmer messages: crop type (maize, wheat, tomato), location (field, village, region), symptoms (yellow leaves, wilting, spots), time (this week, last month), and urgency level. spaCy NER models fine-tuned on agricultural text." },
        { type: "paragraph", text: "Response Generation: Template-based responses ensure accuracy for critical topics (chemical recommendations, safety warnings). LLM-enhanced responses provide conversational flexibility for general questions. Always include confidence scores and 'verify with local expert' disclaimers." },
        { type: "video", caption: "Watch: Building a Crop Disease Chatbot — From knowledge base creation through intent classification to farmer-facing conversation interface.", url: "https://example.com/ag-nlp/chatbots" },
        { type: "quiz", title: "Module Quiz", questions: [
          { question: "Which chatbot architecture provides the best balance of accuracy and flexibility for agriculture?", options: ["Pure rule-based", "Pure generative (LLM)", "Hybrid (template + LLM)", "Random responses"], answerIndex: 2, explanation: "Hybrid chatbots use templates for accuracy-critical topics (chemical recommendations) and LLMs for conversational flexibility, providing reliable yet natural interactions." },
          { question: "What is the recommended size of an agricultural knowledge base for comprehensive coverage?", options: ["100-500 Q&A pairs", "500-1,000 Q&A pairs", "5,000-10,000 Q&A pairs", "100,000+ Q&A pairs"], answerIndex: 2, explanation: "5,000-10,000 curated Q&A pairs provide comprehensive coverage across major crops, regions, and topics while remaining manageable to maintain and update." }
        ], passPercent: 70 }
      ]
    },
    {
      title: "Multilingual & Voice Interfaces",
      content: [
        { type: "paragraph", text: "Many farmers prefer voice interaction in their local language. This module covers building multilingual and voice-enabled agricultural AI systems." },
        { type: "paragraph", text: "Speech-to-Text (STT): Convert farmer voice messages to text. Models: Whisper (OpenAI, 99 languages), Google Speech-to-Text, Vosk (offline, open-source). Agricultural vocabulary fine-tuning improves accuracy for domain terms (pest names, variety names)." },
        { type: "paragraph", text: "Text-to-Speech (TTS): Convert text responses to spoken audio. Models: Bark, Coqui TTS, Google Wavenet. Critical for farmers with low literacy. Support for tonal languages (Yoruba, Mandarin) and agricultural pronunciation guides." },
        { type: "paragraph", text: "Machine Translation: Translate agricultural content across languages. Fine-tune NLLB (No Language Left Behind), mBART, or Google Translate API on agricultural parallel corpora. Domain adaptation improves translation quality by 15-25% over generic translation." },
        { type: "paragraph", text: "Low-Resource Language Strategies: (1) Transfer learning from high-resource languages, (2) Back-translation data augmentation, (3) Cross-lingual pre-trained models (XLM-R), (4) Active learning (prioritize labeling for highest-impact languages), (5) Community-driven data collection." },
        { type: "paragraph", text: "Voice Interface Design: WhatsApp integration (most common farmer platform in developing countries), USSD menus (feature phones), IVR (Interactive Voice Response), and mobile apps. Keep interactions short (<3 exchanges to answer), support voice messages, and handle noisy environments." },
        { type: "video", caption: "Watch: Multilingual Farmer AI — Building voice-enabled, multilingual agricultural chatbots using WhatsApp and low-bandwidth technologies.", url: "https://example.com/ag-nlp/multilingual" },
        { type: "quiz", title: "Module Quiz", questions: [
          { question: "Which speech-to-text model supports the most languages for agricultural applications?", options: ["Siri", "Whisper (99 languages)", "Alexa", "Cortana"], answerIndex: 1, explanation: "OpenAI's Whisper supports 99 languages with strong performance on low-resource languages, making it ideal for multilingual agricultural applications." },
          { question: "What is the most common farmer-facing platform in developing countries for chatbot deployment?", options: ["Twitter", "Facebook", "WhatsApp", "LinkedIn"], answerIndex: 2, explanation: "WhatsApp is the most widely used messaging platform among farmers in developing countries, with billions of users and voice message support." }
        ], passPercent: 70 }
      ]
    },
    {
      title: "Document Analysis & Knowledge Extraction",
      content: [
        { type: "paragraph", text: "Agricultural knowledge is locked in millions of PDFs, research papers, government documents, and extension manuals. NLP extracts and structures this knowledge for automated advisory systems." },
        { type: "paragraph", text: "PDF Document Processing: OCR (Tesseract, Google Vision) converts scanned documents to text. Layout analysis (LayoutLM, Donut) preserves document structure—tables, figures, headers. Agricultural documents often have complex tables of chemical rates and crop recommendations." },
        { type: "paragraph", text: "Information Extraction: NER (Named Entity Recognition) extracts: crop names, pest/disease names, chemical products, application rates, timing, and geographic references. Fine-tune BERT/RoBERTa on annotated agricultural text for 90%+ F1 scores." },
        { type: "paragraph", text: "Research Paper Analysis: Extract key findings from scientific papers: experimental conditions, crop varieties tested, yield results, and statistical significance. NLP pipeline: section segmentation → key information extraction → structured knowledge representation." },
        { type: "paragraph", text: "Knowledge Graph Construction: Connect extracted entities into a graph: (Crop) → susceptible_to → (Pest) → controlled_by → (Chemical) → applied_at → (Rate). Enables reasoning: 'What pests affect maize and what are the organic control options?'" },
        { type: "paragraph", text: "Retrieval-Augmented Generation (RAG): Combine LLMs with agricultural knowledge bases. Embed documents as vectors, retrieve relevant passages for each question, and generate answers grounded in specific sources. Reduces hallucination and provides citations." },
        { type: "video", caption: "Watch: Building an Agricultural Knowledge Graph — Extracting structured knowledge from research papers and extension documents for AI-powered advisory.", url: "https://example.com/ag-nlp/document-analysis" },
        { type: "quiz", title: "Module Quiz", questions: [
          { question: "What is Retrieval-Augmented Generation (RAG)?", options: ["Generating random agricultural content", "Combining LLMs with knowledge bases to provide source-grounded answers", "A farming technique", "A type of irrigation system"], answerIndex: 1, explanation: "RAG retrieves relevant passages from knowledge bases to augment LLM responses, providing answers grounded in specific agricultural sources with citations." },
          { question: "What does a knowledge graph connect in agricultural NLP?", options: ["Farmers to markets", "Crops, pests, chemicals, and application rates as connected entities", "Weather stations to apps", "Photos to text"], answerIndex: 1, explanation: "Agricultural knowledge graphs connect entities like crops, pests, diseases, chemicals, and application rates, enabling complex queries and reasoning across the knowledge base." }
        ], passPercent: 70 }
      ]
    },
    {
      title: "Sentiment Analysis & Farmer Feedback",
      content: [
        { type: "paragraph", text: "Understanding farmer opinions, satisfaction, and concerns through text analysis helps agricultural organizations improve services and identify emerging issues." },
        { type: "paragraph", text: "Sentiment Analysis Applications: (1) Monitor farmer satisfaction with products/services, (2) Detect emerging pest/disease outbreaks from farmer reports, (3) Identify market sentiment for crop pricing, (4) Evaluate extension program effectiveness, (5) Track adoption of new technologies." },
        { type: "paragraph", text: "Aspect-Based Sentiment Analysis: Extract sentiment toward specific aspects: 'The fertilizer worked well (positive) but was too expensive (negative).' Fine-tuned BERT models identify aspect terms and assign sentiment per aspect, providing nuanced feedback analysis." },
        { type: "paragraph", text: "Social Media Mining: Analyze farmer discussions on Twitter, Facebook groups, WhatsApp groups, and farming forums. Extract: trending concerns, regional pest outbreaks, product reviews, price complaints, and information gaps. Real-time dashboards for agricultural organizations." },
        { type: "paragraph", text: "Feedback Loop Integration: Channel farmer feedback from NLP analysis back into: chatbot improvement (add missing topics), extension prioritization (address common concerns), product development (solve farmer pain points), and policy advocacy (evidence-based recommendations)." },
        { type: "paragraph", text: "Misinformation Detection: Identify and flag false agricultural advice circulating on social media: fake product promotions, incorrect application rates, dangerous practices. NLP classifiers trained on verified vs. misleading agricultural content (85-90% accuracy)." },
        { type: "video", caption: "Watch: Farmer Sentiment Analytics — Using NLP to understand farmer opinions, detect outbreaks from social media, and combat agricultural misinformation.", url: "https://example.com/ag-nlp/sentiment" },
        { type: "quiz", title: "Module Quiz", questions: [
          { question: "What is aspect-based sentiment analysis?", options: ["Analyzing the overall tone of text", "Extracting sentiment toward specific topics/aspects within the same text", "Counting words", "Translating text"], answerIndex: 1, explanation: "Aspect-based sentiment analysis identifies sentiment toward specific aspects (price, quality, effectiveness) within the same piece of text, providing more nuanced insights than overall sentiment." },
          { question: "How can NLP help combat agricultural misinformation?", options: ["It can't", "By training classifiers to identify false or misleading agricultural advice on social media", "By censoring posts", "By only showing positive content"], answerIndex: 1, explanation: "NLP classifiers trained on verified vs. misleading agricultural content can automatically flag misinformation like fake product promotions or dangerous application rates." }
        ], passPercent: 70 }
      ]
    },
    {
      title: "Large Language Models in Agriculture",
      content: [
        { type: "paragraph", text: "Large Language Models (LLMs) like GPT-4, LLaMA, and agricultural fine-tuned models are revolutionizing agricultural advisory. This module covers how to leverage and customize LLMs for farming applications." },
        { type: "paragraph", text: "LLM Capabilities for Agriculture: Natural language crop advisory, research paper summarization, multi-step reasoning (diagnosis → treatment → prevention), code generation for data analysis, and translation of complex agronomy into farmer-friendly language." },
        { type: "paragraph", text: "Agricultural Fine-Tuning: Fine-tune open-source LLMs (LLaMA, Mistral, Gemma) on agricultural datasets: extension manuals, research papers, expert Q&A transcripts. Instruction tuning creates domain-specific models that provide more accurate and contextually appropriate advice." },
        { type: "paragraph", text: "Prompt Engineering for Agriculture: Design prompts that produce reliable agricultural advice. Include: location context, crop type, growth stage, current conditions, and safety constraints. Few-shot examples improve consistency. Chain-of-thought prompting enables multi-step diagnosis." },
        { type: "paragraph", text: "Safety Guardrails: LLMs can hallucinate incorrect chemical recommendations or dangerous advice. Implement: (1) Confidence thresholds (don't answer below 80% confidence), (2) Source citation requirements, (3) Human expert review loops for critical recommendations, (4) Safety classifiers that flag high-risk outputs." },
        { type: "paragraph", text: "Deployment: Local LLMs (LLaMA on cloud/VPS) for data privacy and offline capability. API-based (GPT-4, Claude) for highest quality with per-query costs. Edge deployment (Llama.cpp, llamafile) for offline farm use. Hybrid: edge for common questions, cloud for complex ones." },
        { type: "video", caption: "Watch: Deploying LLMs for Agricultural Advisory — Fine-tuning, prompt engineering, and safety guardrails for reliable farmer-facing AI systems.", url: "https://example.com/ag-nlp/llms-agriculture" },
        { type: "paragraph", text: "Impact Metrics: LLM-powered advisory systems achieve 85-95% farmer satisfaction, answer 10x more questions than human extension agents, operate 24/7 in 50+ languages, and cost $0.01-0.05 per interaction versus $5-20 for human consultation." },
        { type: "quiz", title: "Module Quiz", questions: [
          { question: "What is a critical safety requirement for agricultural LLM deployment?", options: ["Maximum response length", "Confidence thresholds to avoid dangerous recommendations", "Minimum word count", "Color-coded responses"], answerIndex: 1, explanation: "Confidence thresholds prevent LLMs from providing unreliable chemical or treatment recommendations. Below 80% confidence, the system should escalate to human experts." },
          { question: "What is the cost advantage of LLM advisory vs. human extension services?", options: ["$0.01-0.05 per interaction vs. $5-20 for human consultation", "Same cost", "LLM is more expensive", "Cost depends on electricity"], answerIndex: 0, explanation: "LLM interactions cost $0.01-0.05 each versus $5-20 for human extension consultations, making expert-level advice 100-400x more affordable at scale." }
        ], passPercent: 70 }
      ]
    }
  ]
};
