/**
 * Course 27: Seed Science & Nursery Technology
 * Based on OpenFarm crop data and plant variety knowledge
 * Source: github.com/thefullnacho/openfarm-crops-rescue (340 crops, CC0)
 * Source: github.com/bripatch/plant-variety-database (1,972 varieties)
 * Covers seed biology, germination, nursery setup, transplanting, and propagation
 */

export const extraCourse27 = {
  title: "Seed Science & Nursery Technology",
  slug: "seed-science-nursery-tech",
  description:
    "Master seed biology, germination optimization, nursery establishment, and transplanting techniques. Based on OpenFarm crop data covering 340 crop varieties with sowing methods, spacing, and growing requirements.",
  category: "Horticulture",
  priceCents: 0,
  durationMinutes: 360,
  published: true,
  order: 27,
  modules: [
    {
      title: "Seed Biology & Germination Science",
      description:
        "Understand seed anatomy, dormancy mechanisms, and the environmental triggers that initiate germination.",
      contentBlocks: [
        {
          type: "heading" as const,
          content: "Seed Anatomy",
        },
        {
          type: "paragraph" as const,
          content:
            "A seed contains three main parts: (1) Embryo — the baby plant with radicle (root), hypocotyl (stem), and cotyledons (seed leaves); (2) Endosperm — stored food for the embryo (in monocots) or absorbed into cotyledons (in dicots); (3) Seed coat — protective outer covering that controls water absorption and gas exchange. Understanding anatomy helps troubleshoot germination problems.",
        },
        {
          type: "heading" as const,
          content: "Seed Dormancy Types",
        },
        {
          type: "paragraph" as const,
          content:
            "Seeds may be dormant due to: (1) Physical dormancy — hard seed coat prevents water absorption (legumes, morning glory); (2) Chemical dormancy — inhibitors in seed coat or embryo prevent germination (tomato, citrus); (3) Morphological dormancy — embryo is immature at seed dispersal (ginseng, carrot); (4) Physiological dormancy — embryo needs specific temperature/light cues (many perennials).",
        },
        {
          type: "heading" as const,
          content: "Germination Requirements",
        },
        {
          type: "paragraph" as const,
          content:
            "Seeds need four conditions to germinate: (1) Water — imbibition triggers metabolic activation; (2) Oxygen — needed for aerobic respiration; (3) Temperature — each species has optimal range (cool-season: 45-65°F, warm-season: 65-85°F); (4) Light — some seeds need light (lettuce, celery) or darkness (phlox, calendula) to germinate. The OpenFarm data includes sowing methods for 282+ crop varieties.",
        },
        {
          type: "quiz" as const,
          quiz: {
            title: "Seed Biology",
            questions: [
              {
                question: "What are the four conditions seeds need to germinate?",
                options: [
                  "Sunlight, fertilizer, water, and wind",
                  "Water, oxygen, temperature, and light (for some species)",
                  "Soil, compost, mulch, and shade",
                  "Heat, humidity, darkness, and pressure",
                ],
                correctIndex: 1,
                explanation:
                  "Seeds need water (imbibition), oxygen (aeration), appropriate temperature, and sometimes light to germinate successfully.",
              },
              {
                question: "What is physical seed dormancy?",
                options: [
                  "The embryo is immature",
                  "Inhibitors in the seed prevent germination",
                  "A hard seed coat prevents water absorption",
                  "The seed needs cold stratification",
                ],
                correctIndex: 2,
                explanation:
                  "Physical dormancy occurs when a hard, impermeable seed coat prevents water from entering the seed, requiring scarification (nicking, soaking, or acid treatment) to break dormancy.",
              },
              {
                question: "Why do some seeds need light to germinate?",
                options: [
                  "They need light for photosynthesis immediately",
                  "Light-sensitive chemicals in the seed trigger germination",
                  "Light warms the seed",
                  "Light attracts beneficial bacteria",
                ],
                correctIndex: 1,
                explanation:
                  "Light-sensitive seeds contain phytochrome, a protein that detects light quality and triggers germination when conditions are favorable for the seedling to reach the surface.",
              },
            ],
          },
        },
      ],
    },
    {
      title: "Seed Treatment & Preparation",
      description:
        "Learn seed treatment methods including scarification, stratification, priming, and coating to improve germination rates.",
      contentBlocks: [
        {
          type: "heading" as const,
          content: "Scarification Techniques",
        },
        {
          type: "paragraph" as const,
          content:
            "Scarification breaks physical dormancy: (1) Mechanical — nick or sand seed coat with sandpaper; (2) Hot water — soak seeds in 170-212°F water, let cool naturally; (3) Acid — soak in concentrated sulfuric acid for 15-60 minutes (professional use only); (4) Natural — freeze-thaw cycles, animal digestion, or microbial action in soil. Use scarification for hard-seeded crops like beans, peas, and nasturtiums.",
        },
        {
          type: "heading" as const,
          content: "Cold Stratification",
        },
        {
          type: "paragraph" as const,
          content:
            "Cold stratification mimics winter conditions for seeds that need cold exposure: (1) Mix seeds with damp sand or vermiculite; (2) Place in sealed bag in refrigerator (35-40°F); (3) Keep for 1-12 weeks depending on species; (4) Check periodically for moisture and germination. Commonly needed for: lavender, echinacea, milkweed, many native perennials.",
        },
        {
          type: "heading" as const,
          content: "Seed Priming",
        },
        {
          type: "paragraph" as const,
          content:
            "Priming pre-germinates seeds partially for faster, more uniform emergence: (1) Soak seeds in water for specified time; (2) Dry back to original moisture content; (3) Store until planting. Primed seeds germinate 2-5 days faster than untreated seeds. Commercial priming treatments include osmopriming (PEG solutions) and hydropriming (controlled hydration).",
        },
        {
          type: "heading" as const,
          content: "Seed Coating and Inoculation",
        },
        {
          type: "paragraph" as const,
          content:
            "Seed coatings add value: (1) Pelleting — coating irregular seeds (lettuce, carrot) into uniform spheres for mechanical planting; (2) Film coating — thin polymer layer containing fungicides, insecticides, or micronutrients; (3) Inoculation — coating legume seeds with Rhizobium bacteria for nitrogen fixation; (4) Priming agents — vitamins, biostimulants, or mycorrhizal fungi.",
        },
        {
          type: "quiz" as const,
          quiz: {
            title: "Seed Treatment",
            questions: [
              {
                question: "What is the purpose of cold stratification?",
                options: [
                  "To kill seed-borne pathogens",
                  "To break physical dormancy of hard seed coats",
                  "To mimic winter conditions and break physiological dormancy",
                  "To speed up germination in warm-season crops",
                ],
                correctIndex: 2,
                explanation:
                  "Cold stratification mimics winter conditions (cold, moist) to break physiological dormancy in seeds that require cold exposure before germination.",
              },
              {
                question: "What is seed priming?",
                options: [
                  "Applying fertilizer to seeds",
                  "Soaking seeds in pesticides",
                  "Pre-germinating seeds partially for faster, more uniform emergence",
                  "Painting seeds with colored coating",
                ],
                correctIndex: 2,
                explanation:
                  "Seed priming partially hydrates seeds to initiate germination, then dries them back. This results in faster, more uniform emergence when planted.",
              },
              {
                question: "Why are legume seeds inoculated with Rhizobium?",
                options: [
                  "To prevent fungal diseases",
                  "To improve germination speed",
                  "To enable nitrogen fixation in root nodules",
                  "To increase seed size",
                ],
                correctIndex: 2,
                explanation:
                  "Rhizobium bacteria form nodules on legume roots and convert atmospheric nitrogen into plant-available forms, reducing the need for nitrogen fertilizer.",
              },
            ],
          },
        },
      ],
    },
    {
      title: "Nursery Design & Management",
      description:
        "Set up and manage a professional nursery with proper infrastructure, growing media, irrigation, and environmental control.",
      contentBlocks: [
        {
          type: "heading" as const,
          content: "Nursery Infrastructure",
        },
        {
          type: "paragraph" as const,
          content:
            "Essential nursery components: (1) Greenhouse or hoop house — protects seedlings from weather; (2) Benches or raised tables — improve drainage and reduce soil-borne disease; (3) Irrigation system — overhead sprinklers, drip, or ebb-and-flow; (4) Shade structure — prevents overheating in summer; (5) Storage area — for media, pots, and supplies; (6) Tool cleaning station — prevents disease spread between batches.",
        },
        {
          type: "heading" as const,
          content: "Growing Media Selection",
        },
        {
          type: "paragraph" as const,
          content:
            "Growing media replace garden soil in containers: (1) Peat moss — retains moisture, acidic pH; (2) Coco coir — sustainable alternative to peat, neutral pH; (3) Perlite — improves drainage and aeration; (4) Vermiculite — retains moisture and nutrients; (5) Compost — adds nutrients and beneficial microbes; (6) Pine bark — improves drainage and structure. Most seed-starting mixes are 50-70% peat/coir with perlite for drainage.",
        },
        {
          type: "heading" as const,          content: "Environmental Control",
        },
        {
          type: "paragraph" as const,
          content:
            "Nursery environment affects seedling quality: (1) Temperature — bottom heat (65-75°F) speeds germination for warm-season crops; (2) Humidity — domes or mist systems maintain 70-90% humidity for germination; (3) Light — fluorescent or LED grow lights at 12-16 hours daily prevent leggy growth; (4) Air circulation — fans strengthen stems and prevent damping-off disease; (5) Ventilation — prevents heat buildup in enclosed structures.",
        },
        {
          type: "heading" as const,
          content: "Irrigation Best Practices",
        },
        {
          type: "paragraph" as const,
          content:
            "Proper nursery irrigation: (1) Bottom watering — prevents leaf wetness and disease; (2) Misting — fine spray for germination阶段; (3) Drip irrigation — precise, water-efficient delivery; (4) Ebb-and-flow — flood benches for uniform moisture; (5) Timing — water early morning to reduce disease; (6) Water quality — test pH (5.5-6.5 ideal) and EC; (7) Fertigation — dilute fertilizer through irrigation system.",
        },
        {
          type: "quiz" as const,
          quiz: {
            title: "Nursery Design",
            questions: [
              {
                question: "What is the ideal pH range for nursery irrigation water?",
                options: [
                  "4.0-5.0",
                  "5.5-6.5",
                  "7.0-8.0",
                  "8.5-9.0",
                ],
                correctIndex: 1,
                explanation:
                  "Nursery irrigation water should have a pH of 5.5-6.5, which matches the slightly acidic growing media that most seedlings prefer.",
              },
              {
                question: "Why is bottom watering preferred for seedlings?",
                options: [
                  "It uses less water",
                  "It prevents leaf wetness and reduces disease",
                  "It's faster than overhead watering",
                  "It requires no equipment",
                ],
                correctIndex: 1,
                explanation:
                  "Bottom watering keeps foliage dry, reducing the risk of fungal diseases like damping-off that thrive on wet leaves and stems.",
              },
              {
                question: "What provides bottom heat for seed germination?",
                options: [
                  "Heating pads or cables under propagation benches",
                  "Overhead heat lamps",
                  "Insulated greenhouse walls",
                  "Dark-colored containers",
                ],
                correctIndex: 0,
                explanation:
                  "Heating pads or cables placed under propagation benches provide consistent bottom heat (65-75°F) that speeds germination for warm-season crops.",
              },
            ],
          },
        },
      ],
    },
    {
      title: "Propagation Techniques",
      description:
        "Master both sexual (seed) and asexual (vegetative) propagation methods including cuttings, division, layering, and grafting.",
      contentBlocks: [
        {
          type: "heading" as const,
          content: "Vegetative Propagation Methods",
        },
        {
          type: "paragraph" as const,
          content:
            "Vegetative propagation creates clones of parent plants: (1) Stem cuttings — most common method for herbs, shrubs, and many crops; (2) Leaf cuttings — for succulents, begonias, African violets; (3) Root cuttings — for blackberry, comfrey, oriental poppy; (4) Division — splitting perennial clumps (daylilies, hostas); (5) Layering — rooting stems while attached to parent plant.",
        },
        {
          type: "heading" as const,
          content: "Cutting Propagation",
        },
        {
          type: "paragraph" as const,
          content:
            "Successful cuttings require: (1) Healthy, disease-free parent material; (2) Proper cutting size — 4-6 inches with 2-3 nodes; (3) Sharp, clean cuts — reduces tissue damage; (4) Hormone treatment — rooting hormones (IBA) increase success rates; (5) Sterile, moist medium — perlite, vermiculite, or sand; (6) High humidity — 85-95% until roots form; (7) Bottom heat — 70-75°F accelerates rooting.",
        },
        {
          type: "heading" as const,
          content: "Grafting Basics",
        },
        {
          type: "paragraph" as const,
          content:
            "Grafting joins two plants into one: (1) Scion — the desired variety (top); (2) Rootstock — provides root system and disease resistance (bottom); (3) Key to success — aligning cambium layers; (4) Common methods: whip and tongue, cleft, bark, and bud grafting; (5) Timing — typically done in late winter/early spring when bark slips easily; (6) Healing — maintain high humidity and temperature for 2-3 weeks.",
        },
        {
          type: "heading" as const,
          content: "Tissue Culture (Micropropagation)",
        },
        {
          type: "paragraph" as const,
          content:
            "Tissue culture produces thousands of identical plants from tiny explants: (1) Sterilize plant tissue; (2) Place on nutrient agar with hormones; (3) Induce callus formation; (4) Differentiate shoots and roots; (5) Acclimate to soil conditions. Used commercially for bananas, orchids, strawberries, and disease-free planting stock. Lab setup costs $5,000-50,000 but can produce millions of plants annually.",
        },
        {
          type: "quiz" as const,
          quiz: {
            title: "Propagation Techniques",
            questions: [
              {
                question: "What is the key to successful grafting?",
                options: [
                  "Using the same variety for scion and rootstock",
                  "Aligning the cambium layers of scion and rootstock",
                  "Grafting in full sun",
                  "Using large scion pieces",
                ],
                correctIndex: 1,
                explanation:
                  "Successful grafting requires aligning the cambium layers (the thin green layer between bark and wood) of scion and rootstock so vascular tissues connect.",
              },
              {
                question: "What is the most common type of vegetative propagation?",
                options: [
                  "Tissue culture",
                  "Stem cuttings",
                  "Root cuttings",
                  "Grafting",
                ],
                correctIndex: 1,
                explanation:
                  "Stem cuttings are the most common vegetative propagation method because they're simple, require minimal equipment, and work for a wide range of plant species.",
              },
              {
                question: "What is micropropagation used for commercially?",
                options: [
                  "Growing giant plants",
                  "Producing thousands of identical, disease-free plants",
                  "Making plants grow faster in the field",
                  "Creating new plant varieties",
                ],
                correctIndex: 1,
                explanation:
                  "Micropropagation (tissue culture) produces thousands of identical, disease-free plants from tiny tissue samples, used commercially for bananas, orchids, and strawberries.",
              },
            ],
          },
        },
      ],
    },
    {
      title: "Transplanting & Field Establishment",
      description:
        "Successfully move seedlings from nursery to field with proper hardening, timing, spacing, and post-transplant care.",
      contentBlocks: [
        {
          type: "heading" as const,
          content: "Hardening Off",
        },
        {
          type: "paragraph" as const,
          content:
            "Hardening off gradually acclimates seedlings to outdoor conditions: (1) Day 1-2 — 1-2 hours in sheltered shade; (2) Day 3-4 — 3-4 hours with some direct sun; (3) Day 5-6 — 5-6 hours with full sun exposure; (4) Day 7 — full day outdoors, bring in at night; (5) Day 8-10 — leave out overnight if no frost expected. This process takes 7-14 days and prevents transplant shock.",
        },
        {
          type: "heading" as const,
          content: "Transplanting Timing",
        },
        {
          type: "paragraph" as const,
          content:
            "Timing is critical: (1) Soil temperature — warm-season crops need soil above 60°F; (2) Frost danger — wait until last frost date has passed; (3) Time of day — transplant in late afternoon or on cloudy days to reduce stress; (4) Weather forecast — avoid transplanting before heat waves or cold snaps; (5) Seedling size — 4-6 true leaves is ideal for most vegetables.",
        },
        {
          type: "heading" as const,
          content: "Spacing and Planting Depth",
        },
        {
          type: "paragraph" as const,
          content:
            "Proper spacing ensures healthy growth: (1) The Plant Variety Database includes row spacing for 245+ varieties — use these data-driven recommendations; (2) Tomatoes — 18-24 inches apart, plant deep (bury 2/3 of stem); (3) Peppers — 18-24 inches, plant at same depth as container; (4) Lettuce — 8-12 inches; (5) Squash — 36-48 inches (they need room to vine).",
        },
        {
          type: "heading" as const,
          content: "Post-Transplant Care",
        },
        {
          type: "paragraph" as const,
          content:
            "Critical first 72 hours after transplanting: (1) Water thoroughly at planting — settle soil around roots; (2) Mulch immediately — 2-3 inches of organic mulch to conserve moisture and suppress weeds; (3) Shade if hot — temporary shade cloth reduces stress; (4) Monitor for wilting — some wilting is normal, severe wilting needs intervention; (5) Avoid fertilizing for 1-2 weeks — let roots establish first.",
        },
        {
          type: "quiz" as const,
          quiz: {
            title: "Transplanting",
            questions: [
              {
                question: "How long does the hardening off process typically take?",
                options: [
                  "1-2 days",
                  "7-14 days",
                  "4-6 weeks",
                  "1 month",
                ],
                correctIndex: 1,
                explanation:
                  "Hardening off typically takes 7-14 days, gradually exposing seedlings to outdoor conditions over this period to prevent transplant shock.",
              },
              {
                question: "When is the best time to transplant seedlings?",
                options: [
                  "Midday in full sun",
                  "Late afternoon or on cloudy days",
                  "Early morning on a hot day",
                  "Any time is fine",
                ],
                correctIndex: 1,
                explanation:
                  "Transplanting in late afternoon or on cloudy days reduces transplant shock because seedlings have less immediate heat and light stress while they establish.",
              },
              {
                question: "How deep should tomato seedlings be planted?",
                options: [
                  "Same depth as container",
                  "Just below the surface",
                  "Deep — bury 2/3 of the stem",
                  "Only the roots should be buried",
                ],
                correctIndex: 2,
                explanation:
                  "Tomatoes should be planted deep, burying 2/3 of the stem. Tomatoes develop roots along buried stems, creating a stronger root system.",
              },
            ],
          },
        },
      ],
    },
    {
      title: "Nursery Business Management",
      description:
        "Start and manage a profitable nursery business with inventory management, pricing, marketing, and customer service.",
      contentBlocks: [
        {
          type: "heading" as const,
          content: "Nursery Business Models",
        },
        {
          type: "paragraph" as const,
          content:
            "Nursery business options: (1) Wholesale — sell plugs and liners to other nurseries or landscapers (high volume, lower margin); (2) Retail — sell finished plants directly to consumers (lower volume, higher margin); (3) Specialty niche — focus on heirlooms, native plants, or organic transplants; (4) Contract growing — produce plants to order for garden centers; (5) Mail order — ship bare-root or small plants nationwide.",
        },
        {
          type: "heading" as const,
          content: "Inventory Management",
        },
        {
          type: "paragraph" as const,
          content:
            "Track nursery inventory accurately: (1) Tag every batch with variety, date sown, and source; (2) Use spreadsheet or nursery software to track quantities; (3) Monitor growth rates and grade plants by size; (4) Plan production calendar backward from target sales dates; (5) Track losses and adjust production quantities; (6) FIFO (First In, First Out) — sell oldest stock first.",
        },
        {
          type: "heading" as const,
          content: "Pricing Strategy",
        },
        {
          "type": "paragraph" as const,
          content:
            "Price nursery products to cover costs and profit: (1) Calculate cost per plug (seed + media + labor + overhead); (2) Add margin for each growth stage (plug → liner → finish); (3) Research local market prices; (4) Premium pricing for specialty varieties; (5) Volume discounts for wholesale orders; (6) Seasonal pricing — higher prices in spring peak season.",
        },
        {
          type: "heading" as const,
          content: "Marketing and Sales",
        },
        {
          type: "paragraph" as const,
          content:
            "Market your nursery effectively: (1) Website with plant catalog and online ordering; (2) Social media showing production process and new arrivals; (3) Farmers market presence for direct sales; (4) Partnerships with local garden centers and landscapers; (5) Educational workshops to attract customers; (6) Email newsletter with seasonal availability and planting tips.",
        },
        {
          type: "quiz" as const,
          quiz: {
            title: "Nursery Business",
            questions: [
              {
                question: "What does FIFO mean in nursery inventory management?",
                options: [
                  "First In, First Out — sell oldest stock first",
                  "First In, Finest Out — sell best quality first",
                  "Fresh Inventory, Fresh Output — rotate stock",
                  "Farm Input, Farm Output — track production",
                ],
                correctIndex: 0,
                explanation:
                  "FIFO (First In, First Out) ensures oldest plants are sold first, preventing them from becoming rootbound or declining in quality.",
              },
              {
                question: "Which nursery business model has the highest volume but lowest margin?",
                options: [
                  "Retail sales",
                  "Wholesale",
                  "Mail order",
                  "Contract growing",
                ],
                correctIndex: 1,
                explanation:
                  "Wholesale nursery operations sell high volumes of plugs and liners at lower margins to other nurseries, landscapers, and garden centers.",
              },
              {
                question: "Why should you calculate production costs backward from sales dates?",
                options: [
                  "To know when to harvest",
                  "To ensure plants are ready when customers want to buy",
                  "To avoid overwatering",
                  "To plan employee schedules",
                ],
                correctIndex: 1,
                explanation:
                  "Planning backward from sales dates ensures plants reach the desired size and quality at the right time for customer demand, especially the spring peak season.",
              },
            ],
          },
        },
      ],
    },
  ],
};
