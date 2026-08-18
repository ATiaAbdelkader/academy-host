/**
 * Course 29: Agricultural Biotechnology & GMOs
 * Based on GrowNextGen curriculum (GMOs: What do you know? Breakout)
 * Source: grownextgen.org/curriculum
 * Covers genetic engineering, GMO science, benefits/risks, regulations, and future technologies
 */

export const extraCourse29 = {
  title: "Agricultural Biotechnology & GMOs",
  slug: "agricultural-biotechnology-gmos",
  description:
    "Understand the science behind genetic engineering, GMO crops, and modern agricultural biotechnology. Explore the evidence-based benefits and risks, regulatory frameworks, and future technologies shaping agriculture.",
  category: "Agricultural Science",
  priceCents: 0,
  durationMinutes: 360,
  published: true,
  order: 29,
  modules: [
    {
      title: "Introduction to Genetics & Biotechnology",
      description:
        "Build a foundation in genetics and understand how modern biotechnology tools enable precise modifications to crop plants.",
      contentBlocks: [
        {
          type: "heading" as const,
          content: "From Mendel to Molecular Biology",
        },
        {
          type: "paragraph" as const,
          content:
            "Genetics has evolved dramatically: (1) Gregor Mendel (1866) discovered inheritance patterns through pea plant experiments; (2) Watson and Crick (1953) described DNA's double helix structure; (3) PCR technology (1983) enabled DNA amplification; (4) Gene sequencing (1990s-2000s) mapped crop genomes; (5) CRISPR-Cas9 (2012) revolutionized gene editing. Each breakthrough built on previous discoveries.",
        },
        {
          type: "heading" as const,
          content: "Traditional Breeding vs Biotechnology",
        },
        {
          type: "paragraph" as const,
          content:
            "Both modify plant genetics, but differ in precision: (1) Traditional breeding — crosses thousands of genes randomly, selecting desired traits over many generations (5-15 years); (2) Genetic engineering — transfers specific genes between species with precision (2-5 years); (3) Gene editing (CRISPR) — modifies existing genes without introducing foreign DNA (1-3 years). All three are tools; the difference is precision and speed.",
        },
        {
          type: "heading" as const,
          content: "Key Biotechnology Tools",
        },
        {
          type: "paragraph" as const,
          content:
            "Modern agricultural biotechnology tools: (1) PCR — amplifies specific DNA sequences for analysis; (2) Gel electrophoresis — separates DNA fragments by size; (3) Gene guns — shoot DNA-coated gold particles into plant cells; (4) Agrobacterium — natural bacteria that transfers DNA into plants; (5) CRISPR-Cas9 — molecular scissors that edit genes precisely; (6) Marker-assisted selection — uses DNA markers to accelerate breeding.",
        },
        {
          type: "quiz" as const,
          quiz: {
            title: "Genetics Basics",
            questions: [
              {
                question: "What is the key difference between traditional breeding and genetic engineering?",
                options: [
                  "Traditional breeding is always organic",
                  "Traditional breeding crosses thousands of genes randomly; genetic engineering transfers specific genes with precision",
                  "Genetic engineering is always cheaper",
                  "There is no meaningful difference",
                ],
                correctIndex: 1,
                explanation:
                  "Traditional breeding crosses entire genomes randomly, while genetic engineering transfers specific genes with precision, making the process faster and more targeted.",
              },
              {
                question: "What does CRISPR-Cas9 do?",
                options: [
                  "Sequences DNA in the field",
                  "Amplifies DNA samples",
                  "Edits genes precisely without introducing foreign DNA",
                  "Crosses two plant varieties",
                ],
                correctIndex: 2,
                explanation:
                  "CRISPR-Cas9 is a gene editing tool that acts like molecular scissors, allowing precise modifications to existing genes without necessarily introducing foreign DNA.",
              },
              {
                question: "How long does traditional breeding typically take to develop a new variety?",
                options: [
                  "1-2 years",
                  "5-15 years",
                  "20-30 years",
                  "It's instantaneous",
                ],
                correctIndex: 1,
                explanation:
                  "Traditional breeding typically takes 5-15 years because it requires multiple generations of crossing and selection to stabilize desired traits.",
              },
            ],
          },
        },
      ],
    },
    {
      title: "GMO Crops: Development & Science",
      description:
        "Understand how GMO crops are developed, the science behind trait selection, and the regulatory approval process.",
      contentBlocks: [
        {
          type: "heading" as const,
          content: "How GMO Crops Are Made",
        },
        {
          type: "paragraph" as const,
          content:
            "GMO development follows steps: (1) Identify a beneficial gene in another organism; (2) Isolate and clone the gene; (3) Build a gene construct with promoter and marker; (4) Transform plant cells using Agrobacterium or gene gun; (5) Regenerate whole plants from transformed cells; (6) Select and verify successful transformants; (7) Backcross into elite varieties; (8) Field trials and regulatory review. This process takes 10-15 years from lab to market.",
        },
        {
          type: "heading" as const,
          content: "Common GMO Traits",
        },
        {
          type: "paragraph" as const,
          content:
            "Major GMO traits in commercial use: (1) Herbicide tolerance — Roundup Ready crops survive glyphosate application, enabling weed control without tillage; (2) Insect resistance — Bt crops produce proteins toxic to specific pests (corn rootworm, cotton bollworm); (3) Disease resistance — papaya resistant to ringspot virus saved Hawaii's papaya industry; (4) Drought tolerance — DroughtGoy reduces water needs; (5) Nutritional enhancement — Golden Rice contains beta-carotene for vitamin A.",
        },
        {
          type: "heading" as const,
          content: "Bt Crops: How They Work",
        },
        {
          type: "paragraph" as const,
          content:
            "Bt crops produce insecticidal proteins from Bacillus thuringiensis: (1) The Bt gene is inserted into the plant's genome; (2) Plant cells produce crystal (Cry) proteins; (3) When target insects eat the plant, proteins bind to their gut receptors; (4) Pores form in the gut wall, killing the insect; (5) Non-target insects are unaffected because they lack the specific gut receptors. This is highly targeted — only pests with the right receptors are affected.",
        },
        {
          type: "heading" as const,
          content: "Safety Testing and Regulation",
        },
        {
          type: "paragraph" as const,
          content:
            "GMO safety testing is extensive: (1) Molecular characterization — confirm gene insertion and expression; (2) Allergenicity testing — compare protein to known allergens; (3) Toxicology studies — animal feeding trials; (4) Compositional analysis — compare nutrients to conventional counterparts; (5) Environmental risk assessment — gene flow, non-target effects; (6) Multi-agency review (USDA, EPA, FDA in US; EFSA in Europe). GMOs undergo more safety testing than any other food.",
        },
        {
          type: "quiz" as const,
          quiz: {
            title: "GMO Science",
            questions: [
              {
                question: "Why are Bt crops safe for human consumption?",
                options: [
                  "They don't contain any modified proteins",
                  "The Bt protein is specific to certain insect gut receptors that humans lack",
                  "The protein is removed before harvest",
                  "Only organic Bt crops are safe",
                ],
                correctIndex: 1,
                explanation:
                  "Bt proteins only affect insects with specific gut receptors. Humans and other mammals lack these receptors, so the proteins pass through our digestive system harmlessly.",
              },
              {
                question: "How long does it take from lab to market for a new GMO crop?",
                options: [
                  "1-2 years",
                  "5-7 years",
                  "10-15 years",
                  "It's immediate",
                ],
                correctIndex: 2,
                explanation:
                  "GMO crop development takes 10-15 years because of extensive safety testing, regulatory review, and field trials required before commercial approval.",
              },
              {
                question: "What trait saved Hawaii's papaya industry?",
                options: [
                  "Herbicide tolerance",
                  "Insect resistance",
                  "Disease resistance to ringspot virus",
                  "Drought tolerance",
                ],
                correctIndex: 2,
                explanation:
                  "Rainbow papaya was engineered to be resistant to papaya ringspot virus, which had devastated Hawaii's papaya industry in the 1990s.",
              },
            ],
          },
        },
      ],
    },
    {
      title: "Benefits and Risks of GMO Technology",
      description:
        "Examine the evidence-based benefits and potential risks of GMO crops for farmers, consumers, and the environment.",
      contentBlocks: [
        {
          type: "heading" as const,
          content: "Documented Benefits",
        },
        {
          type: "paragraph" as const,
          content:
            "GMO benefits supported by scientific evidence: (1) Increased yields — 20-30% average increase for Bt crops; (2) Reduced pesticide use — 37% reduction globally since 1996; (3) Less tillage — herbicide-tolerant crops enable no-till farming, reducing soil erosion; (4) Improved farmer income — $150+ billion cumulative benefit to farmers worldwide; (5) Environmental benefits — less insecticide spray, reduced carbon footprint; (6) Nutritional improvement — Golden Rice addresses vitamin A deficiency.",
        },
        {
          type: "heading" as const,
          content: "Documented Concerns",
        },
        {
          type: "paragraph" as const,
          content:
            "Legitimate concerns requiring attention: (1) Herbicide-resistant weeds — over-reliance on glyphosate created resistant weed populations; (2) Corporate consolidation — seed industry dominated by few companies; (3) Farmer dependency — patented seeds cannot be saved; (4) Gene flow — potential transfer to wild relatives; (5) Monoculture risks — over-reliance on few varieties; (6) Access and equity — technology benefits large farms disproportionately.",
        },
        {
          type: "heading" as const,
          content: "Common Misconceptions",
        },
        {
          type: "paragraph" as const,
          content:
            "Scientific consensus addresses many fears: (1) 'GMOs cause cancer' — over 3,000 studies find no evidence; (2) 'GMOs harm pollinators' — Bt crops target specific pests, not pollinators; (3) 'GMOs are not tested' — they undergo more safety testing than any other food; (4) 'GMOs reduce biodiversity' — no-till farming enabled by GMOs actually increases soil biodiversity; (5) 'Organic is always safer' — both systems have valid safety records.",
        },
        {
          type: "heading" as const,
          content: "Balanced Assessment",
        },
        {
          type: "paragraph" as const,
          content:
            "A nuanced view recognizes both benefits and risks: (1) GMO technology is a tool — its impact depends on how it's used; (2) Regulatory oversight is essential — safety testing protects consumers; (3) Farmer choice matters — access to both GMO and non-GMO options is important; (4) Integrated approaches work best — combining GMO traits with IPM and good agronomy; (5) Continuous monitoring — track long-term effects and adapt management.",
        },
        {
          type: "quiz" as const,
          quiz: {
            title: "Benefits & Risks",
            questions: [
              {
                question: "What is the global average yield increase from Bt crops?",
                options: ["5-10%", "20-30%", "50-70%", "100%+"],
                correctIndex: 1,
                explanation:
                  "Bt crops provide an average yield increase of 20-30% by reducing crop damage from target insect pests.",
              },
              {
                question: "What is a legitimate concern about GMO technology?",
                options: [
                  "They contain unsafe proteins",
                  "They cause immediate health problems",
                  "Herbicide-resistant weeds from over-reliance on glyphosate",
                  "They make soil infertile",
                ],
                correctIndex: 2,
                explanation:
                  "Herbicide-resistant weeds are a genuine concern — over-reliance on glyphosate with herbicide-tolerant crops has selected for resistant weed populations that require alternative management.",
              },
              {
                question: "What does scientific consensus say about GMO safety for human consumption?",
                options: [
                  "GMOs are proven dangerous",
                  "GMOs are as safe as conventional foods",
                  "More research is needed before any conclusion",
                  "GMOs are healthier than organic food",
                ],
                correctIndex: 1,
                explanation:
                  "Major scientific organizations worldwide (WHO, National Academies, AMA) have concluded that approved GMO foods are as safe for human consumption as their conventional counterparts.",
              },
            ],
          },
        },
      ],
    },
    {
      title: "Gene Editing & CRISPR Technology",
      description:
        "Explore the revolutionary CRISPR-Cas9 gene editing system and its applications in crop improvement without introducing foreign DNA.",
      contentBlocks: [
        {
          type: "heading" as const,
          content: "CRISPR-Cas9 Explained",
        },
        {
          type: "paragraph" as const,
          content:
            "CRISPR-Cas9 is a revolutionary gene editing tool: (1) CRISPR (Clustered Regularly Interspaced Short Palindromic Repeats) is a natural bacterial immune system; (2) Scientists adapted it to edit genes in any organism; (3) A guide RNA directs the Cas9 enzyme to the target gene; (4) Cas9 makes a precise cut in the DNA; (5) The cell's natural repair system fixes the cut, enabling gene deletion, insertion, or modification. Think of it as molecular scissors with a GPS navigator.",
        },
        {
          type: "heading" as const,
          content: "CRISPR vs Traditional GMO",
        },
        {
          type: "paragraph" as const,
          content:
            "Key differences: (1) CRISPR edits existing genes; GMO inserts foreign genes; (2) CRISPR can make tiny changes; GMO often adds large gene cassettes; (3) CRISPR products may not contain foreign DNA; GMO products contain DNA from other species; (4) CRISPR is faster and cheaper ($100-1,000 vs $100M+ for GMO); (5) Regulatory treatment differs — some countries regulate CRISPR differently from traditional GMOs.",
        },
        {
          type: "heading" as const,
          content: "CRISPR Applications in Agriculture",
        },
        {
          type: "paragraph" as const,
          content:
            "Current and near-term applications: (1) Disease resistance — editing susceptibility genes (wheat powdery mildew); (2) Drought tolerance — modifying stress response genes; (3) Nutritional improvement — enhancing vitamin and mineral content; (4) Herbicide tolerance — creating resistance through gene modification; (5) Shelf life — preventing browning in apples and mushrooms; (6) Yield improvement — optimizing plant architecture and growth.",
        },
        {
          type: "heading" as const,
          content: "Regulatory Landscape for Gene Editing",
        },
        {
          type: "paragraph" as const,
          content:
            "Regulations vary by country: (1) US — gene-edited crops without foreign DNA are not regulated as GMOs; (2) EU — currently regulates gene editing as GMO (under review); (3) Japan — gene-edited crops evaluated case-by-case; (4) Argentina — pioneered product-based (not process-based) regulation; (5) International — Codex Alimentarius developing guidance. This evolving landscape affects global trade and technology adoption.",
        },
        {
          type: "quiz" as const,
          quiz: {
            title: "CRISPR Technology",
            questions: [
              {
                question: "How does CRISPR-Cas9 edit genes?",
                options: [
                  "It replaces entire chromosomes",
                  "A guide RNA directs Cas9 enzyme to cut DNA at a specific location",
                  "It uses radiation to mutate genes randomly",
                  "It crosses two organisms together",
                ],
                correctIndex: 1,
                explanation:
                  "CRISPR-Cas9 uses a guide RNA that matches the target DNA sequence, directing the Cas9 enzyme to make a precise cut at that location, enabling targeted gene editing.",
              },
              {
                question: "What is a key advantage of CRISPR over traditional GMO technology?",
                options: [
                  "CRISPR is always more effective",
                  "CRISPR can edit genes without introducing foreign DNA",
                  "CRISPR is approved in all countries",
                  "CRISPR costs more but produces better results",
                ],
                correctIndex: 1,
                explanation:
                  "CRISPR can make precise edits to existing genes without introducing foreign DNA from other species, which may result in different regulatory treatment in some countries.",
              },
              {
                question: "How much does CRISPR gene editing cost compared to traditional GMO development?",
                options: [
                  "The same cost",
                  "CRISPR is 100x more expensive",
                  "CRISPR is $100-1,000 vs $100M+ for GMO",
                  "CRISPR is free",
                ],
                correctIndex: 2,
                explanation:
                  "CRISPR gene editing costs $100-1,000, making it dramatically cheaper than traditional GMO development, which can cost over $100 million and take 10-15 years.",
              },
            ],
          },
        },
      ],
    },
    {
      title: "Future of Agricultural Biotechnology",
      description:
        "Explore emerging technologies including synthetic biology, vertical farming genetics, and climate-resilient crop development.",
      contentBlocks: [
        {
          type: "heading" as const,
          content: "Climate-Resilient Crops",
        },
        {
          type: "paragraph" as const,
          content:
            "Biotechnology addresses climate change impacts: (1) Drought tolerance — genes that help plants survive water stress; (2) Heat tolerance — maintaining yield under temperature extremes; (3) Salinity tolerance — enabling farming in salt-affected soils; (4) Flood tolerance — SUB1 gene in rice survives 2 weeks underwater; (5) Nitrogen efficiency — reducing fertilizer needs while maintaining yield.",
        },
        {
          type: "heading" as const,
          content: "Synthetic Biology in Agriculture",
        },
        {
          type: "paragraph" as const,
          content:
            "Synthetic biology goes beyond gene editing: (1) Designing metabolic pathways for enhanced nutrition; (2) Engineering nitrogen fixation in non-legume crops; (3) Creating plants that produce pharmaceutical compounds; (4) Developing biological alternatives to chemical fertilizers; (5) Building biosensors that detect plant stress in real-time.",
        },
        {
          type: "heading" as const,
          content: "Vertical Farming & Indoor Agriculture Genetics",
        },
        {
          type: "paragraph" as const,
          content:
            "Indoor farming drives new crop development: (1) Compact growth habits for shelf farming; (2) Optimized light response for LED environments; (3) Enhanced flavor profiles for controlled environment agriculture; (4) Extended shelf life for supply chain efficiency; (5) Stacked canopy architectures for multi-layer growing.",
        },
        {
          type: "heading" as const,
          content: "Ethics and Future Considerations",
        },
        {
          type: "paragraph" as const,
          content:
            "Important questions for the future: (1) Access — ensuring small farmers benefit from biotechnology; (2) Intellectual property — balancing innovation incentives with food security; (3) Biodiversity — preserving genetic diversity while improving varieties; (4) Consumer choice — labeling and transparency; (5) Global governance — international coordination on safety standards; (6) Environmental stewardship — using technology to restore, not just exploit, natural systems.",
        },
        {
          type: "quiz" as const,
          quiz: {
            title: "Future Biotechnology",
            questions: [
              {
                question: "What is the SUB1 gene in rice?",
                options: [
                  "A gene for increased yield",
                  "A gene enabling rice to survive 2 weeks underwater",
                  "A gene for herbicide tolerance",
                  "A gene for vitamin enhancement",
                ],
                correctIndex: 1,
                explanation:
                  "The SUB1 gene enables rice plants to survive complete submersion for up to 2 weeks, a critical trait for flood-prone rice growing regions affected by climate change.",
              },
              {
                question: "What is a key goal of synthetic biology in agriculture?",
                options: [
                  "Making all crops GMOs",
                  "Engineering nitrogen fixation in non-legume crops",
                  "Eliminating all pests",
                  "Creating artificial sunlight",
                ],
                correctIndex: 1,
                explanation:
                  "Engineering nitrogen fixation in non-legume crops would reduce fertilizer needs and environmental impact, as nitrogen fertilizer production is energy-intensive and causes pollution.",
              },
              {
                question: "Why is access an important ethical consideration for agricultural biotechnology?",
                options: [
                  "Technology should be free",
                  "Small farmers need to benefit, not just large corporations",
                  "Everyone should grow the same crops",
                  "Biotechnology should only be used in wealthy countries",
                ],
                correctIndex: 1,
                explanation:
                  "Ensuring small farmers and developing countries can access biotechnology benefits is crucial for global food security and equitable agricultural development.",
              },
            ],
          },
        },
      ],
    },
  ],
};
