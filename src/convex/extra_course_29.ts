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

/**
 * Course 29: Agricultural Biotechnology & GMOs
 * Based on GrowNextGen curriculum
 */

export const extraCourse29: ExtraCourse = {
  title: "Agricultural Biotechnology & GMOs",
  description:
    "Understand the science behind genetic engineering, GMO crops, and modern agricultural biotechnology. Explore evidence-based benefits and risks, regulatory frameworks, and future technologies.",
  category: "Agricultural Science",
  priceCents: 0,
  durationMinutes: 360,
  order: 29,
  instructor: "Dr. Amara Osei",
  instructorTitle: "Senior Agronomist",
  modules: [
    {
      title: "Introduction to Genetics & Biotechnology",
      content: [
        {
          type: "paragraph",
          text: "Genetics has evolved dramatically: Mendel (1866) discovered inheritance patterns; Watson and Crick (1953) described DNA's double helix; PCR technology (1983) enabled DNA amplification; CRISPR-Cas9 (2012) revolutionized gene editing. Each breakthrough built on previous discoveries.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=6l4JPsCUWug",
          caption: "From Mendel to CRISPR — the evolution of agricultural genetics.",
        },
        {
          type: "paragraph",
          text: "Both traditional breeding and genetic engineering modify plant genetics, but differ in precision: traditional breeding crosses thousands of genes randomly over 5-15 years; genetic engineering transfers specific genes between species in 2-5 years; CRISPR gene editing modifies existing genes without introducing foreign DNA in 1-3 years.",
        },
        {
          type: "list",
          items: [
            "Traditional breeding: crosses thousands of genes randomly, 5-15 years.",
            "Genetic engineering: transfers specific genes with precision, 2-5 years.",
            "CRISPR: edits existing genes without foreign DNA, 1-3 years.",
            "All three are tools; the difference is precision and speed.",
          ],
        },
        {
          type: "quiz",
          title: "Genetics Basics",
          passPercent: 60,
          questions: [
            {
              question: "What is the key difference between traditional breeding and genetic engineering?",
              options: [
                "Traditional breeding is always organic",
                "Traditional breeding crosses thousands of genes randomly; genetic engineering transfers specific genes with precision",
                "Genetic engineering is always cheaper",
                "There is no meaningful difference",
              ],
              answerIndex: 1,
            },
            {
              question: "What does CRISPR-Cas9 do?",
              options: [
                "Sequences DNA in the field",
                "Amplifies DNA samples",
                "Edits genes precisely without introducing foreign DNA",
                "Crosses two plant varieties",
              ],
              answerIndex: 2,
            },
            {
              question: "How long does traditional breeding typically take?",
              options: ["1-2 years", "5-15 years", "20-30 years", "It's instantaneous"],
              answerIndex: 1,
            },
          ],
        },
      ],
    },
    {
      title: "GMO Crops: Development & Science",
      content: [
        {
          type: "paragraph",
          text: "GMO development: (1) Identify a beneficial gene; (2) Isolate and clone it; (3) Build a gene construct; (4) Transform plant cells using Agrobacterium or gene gun; (5) Regenerate whole plants; (6) Select successful transformants; (7) Backcross into elite varieties; (8) Field trials and regulatory review. This takes 10-15 years from lab to market.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=E7CwqNHn_Ns",
          caption: "How GMO crops are developed — from gene isolation to commercial release.",
        },
        {
          type: "paragraph",
          text: "Major GMO traits: (1) Herbicide tolerance — Roundup Ready crops survive glyphosate; (2) Insect resistance — Bt crops produce proteins toxic to specific pests; (3) Disease resistance — papaya resistant to ringspot virus saved Hawaii's industry; (4) Drought tolerance — reduces water needs; (5) Nutritional enhancement — Golden Rice contains beta-carotene.",
        },
        {
          type: "list",
          items: [
            "Bt crops produce proteins toxic only to insects with specific gut receptors.",
            "Humans lack the gut receptors that Bt proteins target — they're safe for consumption.",
            "GMOs undergo more safety testing than any other food.",
            "Golden Rice addresses vitamin A deficiency in developing countries.",
          ],
        },
        {
          type: "quiz",
          title: "GMO Science",
          passPercent: 60,
          questions: [
            {
              question: "Why are Bt crops safe for human consumption?",
              options: [
                "They don't contain any modified proteins",
                "The Bt protein is specific to certain insect gut receptors that humans lack",
                "The protein is removed before harvest",
                "Only organic Bt crops are safe",
              ],
              answerIndex: 1,
            },
            {
              question: "How long does it take from lab to market for a new GMO crop?",
              options: ["1-2 years", "5-7 years", "10-15 years", "It's immediate"],
              answerIndex: 2,
            },
            {
              question: "What trait saved Hawaii's papaya industry?",
              options: [
                "Herbicide tolerance",
                "Insect resistance",
                "Disease resistance to ringspot virus",
                "Drought tolerance",
              ],
              answerIndex: 2,
            },
          ],
        },
      ],
    },
    {
      title: "Benefits and Risks of GMO Technology",
      content: [
        {
          type: "paragraph",
          text: "GMO benefits: (1) Increased yields — 20-30% average for Bt crops; (2) Reduced pesticide use — 37% reduction globally since 1996; (3) Less tillage — herbicide-tolerant crops enable no-till farming; (4) Improved farmer income — $150+ billion cumulative benefit; (5) Nutritional improvement — Golden Rice.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=Z-zNHHpXoMM",
          caption: "Evidence-based benefits and legitimate concerns about GMO technology.",
        },
        {
          type: "paragraph",
          text: "Legitimate concerns: (1) Herbicide-resistant weeds from over-reliance on glyphosate; (2) Corporate consolidation in the seed industry; (3) Farmer dependency on patented seeds; (4) Potential gene flow to wild relatives; (5) Monoculture risks. Scientific consensus: over 3,000 studies find no evidence that approved GMOs cause harm to humans.",
        },
        {
          type: "list",
          items: [
            "Bt crops provide 20-30% yield increase on average.",
            "Global pesticide use reduced 37% since 1996 with GMOs.",
            "Herbicide-resistant weeds are a genuine concern from over-reliance.",
            "Major scientific organizations conclude approved GMOs are safe for consumption.",
          ],
        },
        {
          type: "quiz",
          title: "Benefits & Risks",
          passPercent: 60,
          questions: [
            {
              question: "What is the global average yield increase from Bt crops?",
              options: ["5-10%", "20-30%", "50-70%", "100%+"],
              answerIndex: 1,
            },
            {
              question: "What is a legitimate concern about GMO technology?",
              options: [
                "They contain unsafe proteins",
                "They cause immediate health problems",
                "Herbicide-resistant weeds from over-reliance on glyphosate",
                "They make soil infertile",
              ],
              answerIndex: 2,
            },
            {
              question: "What does scientific consensus say about GMO safety?",
              options: [
                "GMOs are proven dangerous",
                "Approved GMOs are as safe as conventional foods",
                "More research is needed before any conclusion",
                "GMOs are healthier than organic food",
              ],
              answerIndex: 1,
            },
          ],
        },
      ],
    },
    {
      title: "Gene Editing & CRISPR Technology",
      content: [
        {
          type: "paragraph",
          text: "CRISPR-Cas9 is a revolutionary gene editing tool adapted from a natural bacterial immune system. A guide RNA directs the Cas9 enzyme to the target gene, makes a precise cut, and the cell's natural repair system enables gene deletion, insertion, or modification. Think of it as molecular scissors with a GPS navigator.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=eVajQPuRmk8",
          caption: "CRISPR-Cas9 explained — how gene editing is revolutionizing agriculture.",
        },
        {
          type: "paragraph",
          text: "CRISPR vs traditional GMO: CRISPR edits existing genes; GMO inserts foreign genes. CRISPR costs $100-1,000 vs $100M+ for GMO. Some countries regulate CRISPR differently from traditional GMOs. Applications include disease resistance, drought tolerance, nutritional improvement, herbicide tolerance, shelf life extension, and yield improvement.",
        },
        {
          type: "list",
          items: [
            "CRISPR costs $100-1,000 vs $100M+ for traditional GMO development.",
            "CRISPR can make edits without introducing foreign DNA.",
            "US does not regulate gene-edited crops without foreign DNA as GMOs.",
            "CRISPR enables rapid development of disease-resistant crop varieties.",
          ],
        },
        {
          type: "quiz",
          title: "CRISPR Technology",
          passPercent: 60,
          questions: [
            {
              question: "How does CRISPR-Cas9 edit genes?",
              options: [
                "It replaces entire chromosomes",
                "A guide RNA directs Cas9 enzyme to cut DNA at a specific location",
                "It uses radiation to mutate genes randomly",
                "It crosses two organisms together",
              ],
              answerIndex: 1,
            },
            {
              question: "What is a key advantage of CRISPR over traditional GMO?",
              options: [
                "CRISPR is always more effective",
                "CRISPR can edit genes without introducing foreign DNA",
                "CRISPR is approved in all countries",
                "CRISPR costs more but produces better results",
              ],
              answerIndex: 1,
            },
            {
              question: "How much does CRISPR cost compared to traditional GMO development?",
              options: [
                "The same cost",
                "CRISPR is 100x more expensive",
                "CRISPR is $100-1,000 vs $100M+ for GMO",
                "CRISPR is free",
              ],
              answerIndex: 2,
            },
          ],
        },
      ],
    },
    {
      title: "Future of Agricultural Biotechnology",
      content: [
        {
          type: "paragraph",
          text: "Emerging technologies: (1) Synthetic biology — designing new biological systems from scratch; (2) Gene drives — spreading traits through wild populations (with major ethical considerations); (3) RNA interference (RNAi) — silencing specific genes for pest control; (4) Speed breeding — using controlled environments to accelerate generation times.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=BggoEriIKLo",
          caption: "The future of agricultural biotechnology — from synthetic biology to speed breeding.",
        },
        {
          type: "paragraph",
          text: "Climate adaptation biotechnology: SUB1 gene enables rice to survive 2 weeks underwater; drought-tolerant maize for sub-Saharan Africa; heat-tolerant wheat varieties; salt-tolerant crops for degraded soils. Indoor farming drives compact growth habits, optimized light response, and enhanced flavor for controlled environments.",
        },
        {
          type: "list",
          items: [
            "The SUB1 gene enables rice to survive 2 weeks underwater.",
            "Engineering nitrogen fixation in non-legumes would reduce fertilizer needs.",
            "Ensuring small farmers benefit from biotechnology is a key ethical priority.",
            "Speed breeding uses controlled environments to accelerate generation times.",
          ],
        },
        {
          type: "quiz",
          title: "Future Biotechnology",
          passPercent: 60,
          questions: [
            {
              question: "What is the SUB1 gene in rice?",
              options: [
                "A gene for increased yield",
                "A gene enabling rice to survive 2 weeks underwater",
                "A gene for herbicide tolerance",
                "A gene for vitamin enhancement",
              ],
              answerIndex: 1,
            },
            {
              question: "What is a key goal of synthetic biology in agriculture?",
              options: [
                "Making all crops GMOs",
                "Engineering nitrogen fixation in non-legume crops",
                "Eliminating all pests",
                "Creating artificial sunlight",
              ],
              answerIndex: 1,
            },
            {
              question: "Why is access an important ethical consideration?",
              options: [
                "Technology should be free",
                "Small farmers need to benefit, not just large corporations",
                "Everyone should grow the same crops",
                "Biotechnology should only be used in wealthy countries",
              ],
              answerIndex: 1,
            },
          ],
        },
      ],
    },
  ],
};
