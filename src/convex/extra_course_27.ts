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
 * Course 27: Seed Science & Nursery Technology
 * Based on OpenFarm crop data (340 crops, CC0) and Plant Variety Database
 */

export const extraCourse27: ExtraCourse = {
  title: "Seed Science & Nursery Technology",
  description:
    "Master seed biology, germination optimization, nursery establishment, and transplanting techniques. Based on OpenFarm crop data covering 340 crop varieties.",
  category: "Horticulture",
  priceCents: 0,
  durationMinutes: 360,
  order: 27,
  instructor: "Jules Carver",
  instructorTitle: "Technical Documentation Lead",
  modules: [
    {
      title: "Seed Biology & Germination Science",
      content: [
        {
          type: "paragraph",
          text: "A seed contains three main parts: (1) Embryo — the baby plant with radicle (root), hypocotyl (stem), and cotyledons (seed leaves); (2) Endosperm — stored food for the embryo; (3) Seed coat — protective outer covering that controls water absorption and gas exchange.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=aXY7UiiWVuY",
          caption: "Seed anatomy and the science of germination.",
        },
        {
          type: "paragraph",
          text: "Seeds need four conditions to germinate: (1) Water — imbibition triggers metabolic activation; (2) Oxygen — needed for aerobic respiration; (3) Temperature — each species has optimal range (cool-season: 45-65°F, warm-season: 65-85°F); (4) Light — some seeds need light (lettuce, celery) or darkness (phlox) to germinate.",
        },
        {
          type: "list",
          items: [
            "Physical dormancy — hard seed coat prevents water absorption.",
            "Chemical dormancy — inhibitors in seed coat prevent germination.",
            "Cold stratification mimics winter to break physiological dormancy.",
            "Light-sensitive seeds contain phytochrome that triggers germination.",
          ],
        },
        {
          type: "quiz",
          title: "Seed Biology",
          passPercent: 60,
          questions: [
            {
              question: "What are the four conditions seeds need to germinate?",
              options: [
                "Sunlight, fertilizer, water, and wind",
                "Water, oxygen, temperature, and light (for some species)",
                "Soil, compost, mulch, and shade",
                "Heat, humidity, darkness, and pressure",
              ],
              answerIndex: 1,
            },
            {
              question: "What is physical seed dormancy?",
              options: [
                "The embryo is immature",
                "Inhibitors in the seed prevent germination",
                "A hard seed coat prevents water absorption",
                "The seed needs cold stratification",
              ],
              answerIndex: 2,
            },
            {
              question: "Why do some seeds need light to germinate?",
              options: [
                "They need light for photosynthesis immediately",
                "Light-sensitive chemicals (phytochrome) trigger germination",
                "Light warms the seed",
                "Light attracts beneficial bacteria",
              ],
              answerIndex: 1,
            },
          ],
        },
      ],
    },
    {
      title: "Seed Treatment & Preparation",
      content: [
        {
          type: "paragraph",
          text: "Scarification breaks physical dormancy: (1) Mechanical — nick or sand seed coat with sandpaper; (2) Hot water — soak seeds in 170-212°F water, let cool naturally; (3) Acid — soak in concentrated sulfuric acid for 15-60 minutes (professional use only); (4) Natural — freeze-thaw cycles or animal digestion in soil.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=E7CwqNHn_Ns",
          caption: "Seed treatment methods — scarification, stratification, and priming.",
        },
        {
          type: "paragraph",
          text: "Cold stratification mimics winter conditions: mix seeds with damp sand, place in refrigerator (35-40°F) for 1-12 weeks. Seed priming pre-germinates seeds partially for faster, more uniform emergence — primed seeds germinate 2-5 days faster. Legume seeds are inoculated with Rhizobium bacteria for nitrogen fixation in root nodules.",
        },
        {
          type: "list",
          items: [
            "Scarification breaks hard seed coats in legumes and nasturtiums.",
            "Cold stratification is needed for lavender, echinacea, and milkweed.",
            "Priming pre-germinates seeds for 2-5 day faster emergence.",
            "Inoculate legume seeds with Rhizobium for nitrogen fixation.",
          ],
        },
        {
          type: "quiz",
          title: "Seed Treatment",
          passPercent: 60,
          questions: [
            {
              question: "What is the purpose of cold stratification?",
              options: [
                "To kill seed-borne pathogens",
                "To break physical dormancy of hard seed coats",
                "To mimic winter conditions and break physiological dormancy",
                "To speed up germination in warm-season crops",
              ],
              answerIndex: 2,
            },
            {
              question: "What is seed priming?",
              options: [
                "Applying fertilizer to seeds",
                "Soaking seeds in pesticides",
                "Pre-germinating seeds partially for faster, more uniform emergence",
                "Painting seeds with colored coating",
              ],
              answerIndex: 2,
            },
            {
              question: "Why are legume seeds inoculated with Rhizobium?",
              options: [
                "To prevent fungal diseases",
                "To improve germination speed",
                "To enable nitrogen fixation in root nodules",
                "To increase seed size",
              ],
              answerIndex: 2,
            },
          ],
        },
      ],
    },
    {
      title: "Nursery Design & Management",
      content: [
        {
          type: "paragraph",
          text: "Essential nursery components: (1) Greenhouse or hoop house — protects seedlings; (2) Benches or raised tables — improve drainage; (3) Irrigation system — overhead, drip, or ebb-and-flow; (4) Shade structure — prevents overheating; (5) Tool cleaning station — prevents disease spread.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=Z-zNHHpXoMM",
          caption: "Setting up a professional nursery — infrastructure and growing media.",
        },
        {
          type: "paragraph",
          text: "Growing media replace garden soil in containers: peat moss retains moisture, coco coir is a sustainable alternative, perlite improves drainage, vermiculite retains nutrients. Most seed-starting mixes are 50-70% peat/coir with perlite. Bottom watering prevents leaf wetness and disease. Maintain pH 5.5-6.5 for irrigation water.",
        },
        {
          type: "list",
          items: [
            "Bottom watering prevents leaf wetness and reduces disease.",
            "Seed-starting mix: 50-70% peat/coir with perlite for drainage.",
            "Bottom heat (65-75°F) speeds germination for warm-season crops.",
            "Fans strengthen stems and prevent damping-off disease.",
          ],
        },
        {
          type: "quiz",
          title: "Nursery Design",
          passPercent: 60,
          questions: [
            {
              question: "What is the ideal pH range for nursery irrigation water?",
              options: ["4.0-5.0", "5.5-6.5", "7.0-8.0", "8.5-9.0"],
              answerIndex: 1,
            },
            {
              question: "Why is bottom watering preferred for seedlings?",
              options: [
                "It uses less water",
                "It prevents leaf wetness and reduces disease",
                "It's faster than overhead watering",
                "It requires no equipment",
              ],
              answerIndex: 1,
            },
            {
              question: "What provides bottom heat for seed germination?",
              options: [
                "Heating pads or cables under propagation benches",
                "Overhead heat lamps",
                "Insulated greenhouse walls",
                "Dark-colored containers",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "Propagation Techniques",
      content: [
        {
          type: "paragraph",
          text: "Vegetative propagation creates clones of parent plants: (1) Stem cuttings — most common method; (2) Leaf cuttings — for succulents and begonias; (3) Root cuttings — for blackberry and comfrey; (4) Division — splitting perennial clumps; (5) Layering — rooting stems while attached to parent plant.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=eVajQPuRmk8",
          caption: "Vegetative propagation — cuttings, division, and grafting basics.",
        },
        {
          type: "paragraph",
          text: "Successful cuttings require healthy parent material, 4-6 inch cuttings with 2-3 nodes, sharp clean cuts, rooting hormones (IBA), sterile moist medium, high humidity (85-95%), and bottom heat (70-75°F). Grafting joins two plants — aligning cambium layers is the key to success. Tissue culture produces thousands of identical, disease-free plants.",
        },
        {
          type: "list",
          items: [
            "Stem cuttings are the most common propagation method.",
            "Rooting hormones (IBA) increase cutting success rates.",
            "Grafting requires aligning cambium layers of scion and rootstock.",
            "Tissue culture produces thousands of identical plants from tiny explants.",
          ],
        },
        {
          type: "quiz",
          title: "Propagation Techniques",
          passPercent: 60,
          questions: [
            {
              question: "What is the key to successful grafting?",
              options: [
                "Using the same variety for scion and rootstock",
                "Aligning the cambium layers of scion and rootstock",
                "Grafting in full sun",
                "Using large scion pieces",
              ],
              answerIndex: 1,
            },
            {
              question: "What is the most common type of vegetative propagation?",
              options: ["Tissue culture", "Stem cuttings", "Root cuttings", "Grafting"],
              answerIndex: 1,
            },
            {
              question: "What is micropropagation used for commercially?",
              options: [
                "Growing giant plants",
                "Producing thousands of identical, disease-free plants",
                "Making plants grow faster in the field",
                "Creating new plant varieties",
              ],
              answerIndex: 1,
            },
          ],
        },
      ],
    },
    {
      title: "Transplanting & Field Establishment",
      content: [
        {
          type: "paragraph",
          text: "Hardening off gradually acclimates seedlings to outdoor conditions over 7-14 days: start with 1-2 hours in sheltered shade, gradually increase sun exposure and duration, and leave outdoors overnight once no frost is expected. This prevents transplant shock.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=Z-zNHHpXoMM",
          caption: "Hardening off, transplanting timing, and post-transplant care.",
        },
        {
          type: "paragraph",
          text: "Transplant in late afternoon or on cloudy days to reduce stress. Soil should be above 60°F for warm-season crops. Tomatoes should be planted deep (bury 2/3 of stem) because they develop roots along buried stems. Water thoroughly at planting, mulch immediately with 2-3 inches of organic mulch, and avoid fertilizing for 1-2 weeks.",
        },
        {
          type: "list",
          items: [
            "Hardening off takes 7-14 days of gradual exposure.",
            "Transplant in late afternoon or on cloudy days.",
            "Tomatoes: plant deep, burying 2/3 of the stem.",
            "Avoid fertilizing for 1-2 weeks after transplanting.",
          ],
        },
        {
          type: "quiz",
          title: "Transplanting",
          passPercent: 60,
          questions: [
            {
              question: "How long does the hardening off process typically take?",
              options: ["1-2 days", "7-14 days", "4-6 weeks", "1 month"],
              answerIndex: 1,
            },
            {
              question: "When is the best time to transplant seedlings?",
              options: [
                "Midday in full sun",
                "Late afternoon or on cloudy days",
                "Early morning on a hot day",
                "Any time is fine",
              ],
              answerIndex: 1,
            },
            {
              question: "How deep should tomato seedlings be planted?",
              options: [
                "Same depth as container",
                "Just below the surface",
                "Deep — bury 2/3 of the stem",
                "Only the roots should be buried",
              ],
              answerIndex: 2,
            },
          ],
        },
      ],
    },
    {
      title: "Nursery Business Management",
      content: [
        {
          type: "paragraph",
          text: "Nursery business options: (1) Wholesale — sell plugs and liners (high volume, lower margin); (2) Retail — sell finished plants directly (lower volume, higher margin); (3) Specialty niche — focus on heirlooms or native plants; (4) Contract growing — produce plants to order; (5) Mail order — ship bare-root plants nationwide.",
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=RLSwj690Tgc",
          caption: "Starting and managing a profitable nursery business.",
        },
        {
          type: "paragraph",
          text: "Track inventory accurately: tag every batch with variety, date sown, and source. Plan production calendar backward from target sales dates. Price products to cover costs plus profit — calculate cost per plug (seed + media + labor + overhead) and add margin for each growth stage. Use FIFO (First In, First Out) to sell oldest stock first.",
        },
        {
          type: "list",
          items: [
            "Wholesale has highest volume but lowest margin.",
            "Retail offers highest margins through direct sales.",
            "FIFO means sell oldest stock first.",
            "Plan production backward from target sales dates.",
          ],
        },
        {
          type: "quiz",
          title: "Nursery Business",
          passPercent: 60,
          questions: [
            {
              question: "What does FIFO mean in nursery inventory?",
              options: [
                "First In, First Out — sell oldest stock first",
                "First In, Finest Out — sell best quality first",
                "Fresh Inventory, Fresh Output — rotate stock",
                "Farm Input, Farm Output — track production",
              ],
              answerIndex: 0,
            },
            {
              question: "Which nursery model has the highest volume but lowest margin?",
              options: ["Retail sales", "Wholesale", "Mail order", "Contract growing"],
              answerIndex: 1,
            },
            {
              question: "Why plan production backward from sales dates?",
              options: [
                "To know when to harvest",
                "To ensure plants are ready when customers want to buy",
                "To avoid overwatering",
                "To plan employee schedules",
              ],
              answerIndex: 1,
            },
          ],
        },
      ],
    },
  ],
};
