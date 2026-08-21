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

export const extraCourse35: ExtraCourse = {
  title: "AI Prompt Writing for Agriculture",
  description:
    "Master the art of writing effective AI prompts for farming decisions — from crop recommendation queries to soil analysis requests. Learn structured prompt frameworks that get precise, actionable answers from AI tools.",
  category: "AgTech",
  duration: "4 weeks",
  difficulty: "Beginner",
  priceCents: 4900,
  durationMinutes: 240,
  order: 35,
  instructor: "Dr. Priya Sharma",
  instructorTitle: "AI & Precision Agriculture Specialist",
  modules: [
    {
      title: "Why Prompt Quality Matters in Agriculture",
      content: [
        {
          type: "paragraph",
          text: "Every AI tool — ChatGPT, Claude, Gemini, specialized agronomy AI — is only as good as the prompt you give it. A vague prompt like 'help with my crops' gets a vague answer. A structured prompt with soil data, location, crop type, and growth stage gets a precise recommendation.",
        },
        {
          type: "paragraph",
          text: "The key insight from prompt engineering research is: 'The best prompt is not the longest. It is the one where every word is load-bearing.' Most farmers waste AI interactions by being too general. This course teaches you to be specific, structured, and effective.",
        },
        {
          type: "paragraph",
          text: "Agricultural decisions are complex — they depend on soil type, climate zone, water availability, pest pressure, market conditions, and timing. AI can help with all of these, but only if you provide the right context in your prompt.",
        },
        {
          type: "quiz",
          title: "Prompt Quality Basics",
          passPercent: 60,
          questions: [
            {
              question: "Why do most farmers get poor results from AI tools?",
              options: [
                "Their prompts are too vague and lack context",
                "AI tools cannot help with farming",
                "AI tools only work for programmers",
                "Farmers need expensive AI subscriptions",
              ],
              answerIndex: 0,
            },
            {
              question: "What makes a prompt effective?",
              options: [
                "Every word changes the output meaning",
                "The longer the prompt, the better",
                "Using technical jargon exclusively",
                "Asking multiple questions at once",
              ],
              answerIndex: 0,
            },
            {
              question: "Which information is most critical in an agricultural prompt?",
              options: [
                "Location, soil type, crop, and current conditions",
                "Your name and farm size",
                "The AI tool you are using",
                "The time of day you are asking",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "The 9-Dimension Intent Framework",
      content: [
        {
          type: "paragraph",
          text: "Professional prompt engineers use a structured framework to extract maximum value from AI. The 9-Dimension Intent Framework covers: Task, Input, Output format, Constraints, Context, Audience, Memory/prior knowledge, Success criteria, and Examples.",
        },
        {
          type: "paragraph",
          text: "For agriculture, this translates to: What farming problem? (Task), What data do you have? (Input), What format do you want the answer in? (Output), What are your limitations like budget and equipment? (Constraints), What is your location, season, and soil type? (Context).",
        },
        {
          type: "paragraph",
          text: "Example: Instead of 'What fertilizer should I use?', try: 'I am a smallholder farmer in [location] growing maize on clay soil with pH 5.8. My last soil test showed low nitrogen and adequate phosphorus. Budget is limited. Recommend a fertilization plan for the upcoming rainy season, formatted as a weekly schedule with quantities per hectare.'",
        },
        {
          type: "quiz",
          title: "Intent Framework",
          passPercent: 60,
          questions: [
            {
              question: "How many dimensions does the Intent Framework cover?",
              options: [
                "9 dimensions",
                "5 dimensions",
                "3 dimensions",
                "12 dimensions",
              ],
              answerIndex: 0,
            },
            {
              question: "Which dimension asks 'what format do you want the answer in?'",
              options: [
                "Output format",
                "Task",
                "Constraints",
                "Memory",
              ],
              answerIndex: 0,
            },
            {
              question: "What makes the maize fertilization prompt effective?",
              options: [
                "It includes location, soil data, budget, and desired output format",
                "It is written in all caps",
                "It asks multiple unrelated questions",
                "It mentions the AI tool name",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "Crop Recommendation Prompts",
      content: [
        {
          type: "paragraph",
          text: "Crop recommendation is one of the most powerful AI use cases in agriculture. The key is providing environmental parameters: soil NPK levels, pH, temperature range, rainfall, altitude, and sunlight hours. AI models like those in the AgroAI system use these features to recommend optimal crops.",
        },
        {
          type: "paragraph",
          text: "A strong crop recommendation prompt includes: soil composition (N, P, K values), temperature range (min/max), humidity percentage, rainfall in mm, pH level, and sunlight hours. The more precise your data, the better the recommendation.",
        },
        {
          type: "paragraph",
          text: "Always ask for reasoning alongside the recommendation. A good AI response will explain WHY a crop suits your conditions — nutrient match, climate tolerance, market potential, and water requirements. This helps you evaluate the suggestion critically.",
        },
        {
          type: "quiz",
          title: "Crop Recommendation Prompts",
          passPercent: 60,
          questions: [
            {
              question: "What soil data is essential for AI crop recommendations?",
              options: [
                "NPK levels, pH, temperature, rainfall, and sunlight",
                "Just the soil color",
                "Only the soil depth",
                "The farm owner's name",
              ],
              answerIndex: 0,
            },
            {
              question: "Why should you ask for reasoning alongside recommendations?",
              options: [
                "To evaluate the suggestion critically",
                "To make the response longer",
                "AI reasoning is always wrong",
                "It does not matter",
              ],
              answerIndex: 0,
            },
            {
              question: "What does NPK stand for in soil science?",
              options: [
                "Nitrogen, Phosphorus, Potassium",
                "Natural Product Knowledge",
                "New Plant Kit",
                "Nutrient Processing Key",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "Plant Disease Diagnosis Prompts",
      content: [
        {
          type: "paragraph",
          text: "AI-powered plant disease detection uses image analysis and symptom description to identify problems. When using text-based AI, your prompt must describe symptoms precisely: leaf discoloration pattern, affected plant parts, progression timeline, and environmental conditions.",
        },
        {
          type: "paragraph",
          text: "Structure a disease diagnosis prompt with: Crop species and variety, affected part (leaf/stem/root/fruit), symptom description (spots, wilting, discoloration, growth abnormality), when symptoms appeared, recent weather conditions, and any treatments already applied.",
        },
        {
          type: "paragraph",
          text: "For image-based AI tools, include high-quality photos showing both affected and healthy tissue, close-up and full-plant views, and photos taken in natural light. The prompt should ask for: diagnosis confidence level, distinguishing similar diseases, and organic and chemical treatment options.",
        },
        {
          type: "quiz",
          title: "Disease Diagnosis Prompts",
          passPercent: 60,
          questions: [
            {
              question: "What information is critical for text-based disease diagnosis?",
              options: [
                "Crop species, affected parts, symptoms, and conditions",
                "Only the crop name",
                "The size of the farm",
                "Your annual income",
              ],
              answerIndex: 0,
            },
            {
              question: "For image-based AI, what photos should you provide?",
              options: [
                "Both affected and healthy tissue, close-up and full-plant views",
                "Only one blurry photo",
                "Photos taken at night",
                "Only photos of healthy plants",
              ],
              answerIndex: 0,
            },
            {
              question: "Why ask for diagnosis confidence level?",
              options: [
                "To know how certain the AI is about its identification",
                "To make the response longer",
                "Confidence levels are not useful",
                "AI is always 100% confident",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "Soil Analysis & Fertilization Prompts",
      content: [
        {
          type: "paragraph",
          text: "Soil analysis prompts should include raw test data and ask for specific interpretations. Instead of 'Is my soil good?', provide your lab results and ask: 'Interpret these soil test results for maize production. Identify deficiencies, excesses, and recommend amendments with exact application rates.'",
        },
        {
          type: "paragraph",
          text: "The feature engineering approach from machine learning applies to prompts too. Include derived parameters: NPK ratios, organic matter percentage, cation exchange capacity (CEC), and micronutrient levels. AI can calculate optimal amendment blends when given complete data.",
        },
        {
          type: "paragraph",
          text: "Always specify your cropping system, rotation plans, and sustainability goals. A prompt that asks for both productivity and soil health will generate balanced recommendations. Ask for short-term fixes AND long-term soil building strategies.",
        },
        {
          type: "quiz",
          title: "Soil Analysis Prompts",
          passPercent: 60,
          questions: [
            {
              question: "What makes a soil analysis prompt effective?",
              options: [
                "Providing raw lab data and asking for specific interpretations",
                "Asking 'is my soil good?'",
                "Not sharing any data",
                "Using the most complex terms possible",
              ],
              answerIndex: 0,
            },
            {
              question: "What are derived soil parameters?",
              options: [
                "Calculated values like NPK ratios, CEC, and organic matter percentage",
                "The color of the soil",
                "The weight of the soil sample",
                "The depth of the soil",
              ],
              answerIndex: 0,
            },
            {
              question: "Why specify your cropping system and sustainability goals?",
              options: [
                "To get recommendations that match your specific situation",
                "It does not affect the recommendation",
                "AI does not understand farming goals",
                "To make the prompt shorter",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "Advanced Prompt Techniques for Farmers",
      content: [
        {
          type: "paragraph",
          text: "Advanced techniques include few-shot prompting (showing AI an example of the output you want), chain-of-thought prompting (asking AI to reason step by step), and role assignment (telling AI to act as an experienced agronomist). These dramatically improve response quality.",
        },
        {
          type: "paragraph",
          text: "Role assignment is powerful: 'You are an experienced tropical agronomist with 20 years of experience in East African farming systems.' This frames the AI's knowledge and communication style. Chain-of-thought works for complex decisions: 'Walk me through your reasoning step by step before recommending.'",
        },
        {
          type: "paragraph",
          text: "Finally, use negative prompts to avoid unwanted advice: 'Do not recommend synthetic pesticides. Focus on integrated pest management approaches.' And always request output in a format you can act on — tables, schedules, checklists, or field-ready instructions.",
        },
        {
          type: "quiz",
          title: "Advanced Techniques",
          passPercent: 60,
          questions: [
            {
              question: "What is few-shot prompting?",
              options: [
                "Showing AI an example of the output you want",
                "Asking AI to guess the answer",
                "Using only one word in your prompt",
                "Avoiding all examples",
              ],
              answerIndex: 0,
            },
            {
              question: "What does role assignment do?",
              options: [
                "Frames the AI's knowledge and communication style",
                "Changes the AI model being used",
                "Has no effect on responses",
                "Only works for coding tasks",
              ],
              answerIndex: 0,
            },
            {
              question: "Why use negative prompts?",
              options: [
                "To specify what you do NOT want in the response",
                "To make prompts shorter",
                "Negative prompts are not useful",
                "To confuse the AI",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
  ],
};
