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
  tags: string[];
  modules: CourseModule[];
};

const extraCourse56: ExtraCourse = {
  title: "Milk & Dairy Processing",
  description:
    "Master the art and science of dairy processing. Learn pasteurization, cheese making, yogurt, butter, ice cream, and how to build a profitable artisan dairy business.",
  category: "Innovative Farming",
  duration: "8 weeks",
  difficulty: "Intermediate",
  priceCents: 0,
  durationMinutes: 2800,
  order: 56,
  instructor: "Dr. Isabella Rossi",
  tags: ["dairy", "cheese", "yogurt", "butter", "processing"],
  modules: [
    {
      title: "Introduction to Dairy Processing",
      content: [
        {
          text: "Why Dairy Processing?\nDairy processing transforms raw milk into high-value products:\n\nValue Addition:\n- Raw milk: $0.50-1.00/liter\n- Pasteurized milk: $1.00-2.00/liter\n- Yogurt: $3-8/kg\n- Cheese: $10-50/kg\n- Artisan cheese: $30-100/kg\n- Butter: $8-20/kg\n- Ice cream: $5-15/kg\n\nThe Farm-to-Table Opportunity:\n- Own the entire value chain\n- Higher margins than commodity milk\n- Direct customer relationships\n- Premium pricing for artisan products\n- Year-round income (vs seasonal production)\n\nDairy Products:\n1. Fluid Milk: Pasturized, flavored, raw (where legal)\n2. Yogurt: Set, stirred, Greek, drinkable\n3. Cheese: Fresh, soft, semi-hard, hard, blue\n4. Butter: Salted, unsalted, cultured, clarified\n5. Ice Cream: Premium, gelato, sorbet\n6. Whey Products: Protein powder, ricotta\n7. Fermented: Kefir, buttermilk, sour cream\n\nGlobal Dairy Market:\n- $800+ billion industry\n- Growing 3-4% annually\n- Strong demand for artisan/premium products\n- Plant-based alternatives creating niche opportunities",
        },
        {
          text: "Getting Started in Dairy Processing\nEquipment Needed (Basic):\n1. Pasteurizer: Pot-in-pot or commercial ($200-5,000)\n2. Thermometer: Digital, accurate to 0.5°C ($20-50)\n3. Stainless steel pots: Various sizes ($100-300)\n4. Cheese mold and press: For cheese ($50-200)\n5. Cheese cloth and muslin: For straining ($10-20)\n6. Cultures: Mesophilic, thermophilic, rennet ($30-100)\n7. pH meter: Essential for quality control ($100-300)\n8. Scale: Accurate to 1g ($30-50)\n9. Aging space: Cool, humid area\n\nStartup Costs:\n- Home kitchen: $500-2,000\n- Small commercial: $10,000-50,000\n- Artisan creamery: $50,000-200,000\n- Commercial facility: $200,000-1,000,000+\n\nRegulations:\n- Food safety certification (HACCP)\n- Dairy license/permit\n- Inspection requirements\n- Labeling regulations\n- Milk source requirements\n\nMilk Sources:\n- Own herd (cows, goats, sheep)\n- Local dairy farms\n- Milk cooperatives\n- Organic suppliers",
        },
      ],
      quiz: {
        questions: [
          {
            question: "How much value can cheese making add to raw milk?",
            options: ["10-20% more", "50-100% more", "10-50x more value", "No added value"],
            correctIndex: 2,
            explanation: "Cheese making can add 10-50x more value to raw milk — turning $1/liter milk into $10-50/kg of cheese.",
          },
          {
            question: "What is the minimum essential equipment for starting dairy processing?",
            options: ["$50,000 facility", "Pasteurizer, thermometer, cultures, and stainless pots", "Only a refrigerator", "Just a cow"],
            correctIndex: 1,
            explanation: "The minimum essential equipment includes a pasteurizer, thermometer, cultures, and stainless steel pots ($500-2,000).",
          },
          {
            question: "What is the first step in dairy processing?",
            options: ["Add flavors", "Pasteurize the milk", "Package the product", "Sell at market"],
            correctIndex: 1,
            explanation: "Pasteurization is typically the first step in dairy processing, killing harmful bacteria while preserving milk quality.",
          },
        ],
        passMark: 60,
      },
    },
    {
      title: "Milk Science & Pasteurization",
      content: [
        {
          text: "Milk Composition\nCow's Milk (Average):\n- Water: 87%\n- Fat: 3.5-4.5%\n- Protein: 3.2-3.5%\n- Lactose: 4.6-4.8%\n- Minerals: 0.7%\n- Vitamins: A, D, B12, riboflavin\n\nMilk Quality Factors:\n- Bacteria count: <100,000 CFU/mL (fresh)\n- Somatic cell count: <200,000/mL\n- Temperature: Cool to 4°C within 2 hours\n- Cleanliness: Critical for quality\n\nFat Content Varieties:\n- Whole milk: 3.25-4%\n- Reduced fat: 2%\n- Low fat: 1%\n- Skim: <0.5%\n\nFor Cheese Making:\n- Higher fat = creamier cheese\n- Cow: 3.5-4% fat\n- Goat: 3.5-4.5% fat\n- Sheep: 6-8% fat (richest)\n- Buffalo: 7-8% fat\n\nMilk Testing:\n- Fat test: Gerber method or electronic\n- Protein test: Kjeldahl or infrared\n- Bacteria count: Plate count or electronic\n- Antibiotic test: ELISA\n- Freezing point: Detects adulteration",
        },
        {
          text: "Pasteurization Methods\n1. Batch (Vat) Pasteurization\n   - Heat milk to 63°C (145°F)\n   - Hold for 30 minutes\n   - Cool rapidly\n   - Simple, low equipment cost\n   - Best for: Small operations, artisan cheese\n\n2. HTST (High Temperature Short Time)\n   - Heat to 72°C (161°F)\n   - Hold for 15 seconds\n   - Continuous flow system\n   - Standard commercial method\n   - Equipment: $5,000-50,000\n\n3. UHT (Ultra High Temperature)\n   - Heat to 135-150°C (275-300°F)\n   - Hold for 2-5 seconds\n   - Shelf-stable (no refrigeration needed)\n   - Changes flavor and nutrition\n   - Not for artisan products\n\n4. Low-Temperature Long Time (LTLT)\n   - Heat to 57°C (135°F)\n   - Hold for 25-30 minutes\n   - Gentler on milk\n   - Better for sensitive products\n\nPasteurization Importance:\n- Kills pathogens (E. coli, Salmonella, Listeria)\n- Extends shelf life\n- Required by law in most countries\n- Ensures food safety\n- Minimal nutrient loss",
        },
      ],
      quiz: {
        questions: [
          {
            question: "What is the standard HTST pasteurization temperature and time?",
            options: ["63°C for 30 minutes", "72°C for 15 seconds", "100°C for 5 minutes", "135°C for 2 seconds"],
            correctIndex: 1,
            explanation: "HTST (High Temperature Short Time) pasteurization heats milk to 72°C (161°F) for 15 seconds.",
          },
          {
            question: "Which animal milk has the highest fat content?",
            options: ["Cow", "Goat", "Sheep", "Buffalo"],
            correctIndex: 3,
            explanation: "Buffalo milk has the highest fat content at 7-8%, followed by sheep (6-8%), goat (3.5-4.5%), and cow (3.5-4.5%).",
          },
          {
            question: "Why is pasteurization required by law?",
            options: [
              "To improve taste",
              "To kill harmful pathogens and ensure food safety",
              "To increase shelf life only",
              "To change the color",
            ],
            correctIndex: 1,
            explanation: "Pasteurization is required by law to kill harmful pathogens (E. coli, Salmonella, Listeria) and ensure food safety.",
          },
        ],
        passMark: 60,
      },
    },
    {
      title: "Cheese Making",
      content: [
        {
          text: "Cheese Making Fundamentals\nThe Basic Process:\n1. Warm milk to target temperature (30-37°C)\n2. Add starter culture (mesophilic or thermophilic)\n3. Add rennet (liquid or tablets)\n4. Wait for curd formation (30-60 minutes)\n5. Cut curds (size affects cheese type)\n6. Cook curds (if needed)\n7. Drain whey\n8. Press curds (if needed)\n9. Salt (dry or brine)\n10. Age (if needed)\n\nCheese Types by Moisture:\n- Fresh: 60-80% moisture (mozzarella, ricotta, goat cheese)\n- Soft-ripened: 50-60% (brie, camembert)\n- Semi-hard: 40-50% (cheddar, gouda)\n- Hard: 30-40% (parmesan, manchego)\n- Blue: 40-50% (roquefort, gorgonzola)\n\nCheese Yield:\n- 10 liters milk → 1 kg fresh cheese\n- 10 liters milk → 1 kg semi-hard cheese\n- 10 liters milk → 0.8 kg hard cheese\n- Fat content affects yield\n\nStarter Cultures:\n- Mesophilic: 20-35°C (cheddar, goat cheese)\n- Thermophilic: 38-45°C (mozzarella, parmesan)\n- Propionic: For Swiss-style (eyes)",
        },
        {
          text: "Cheese Recipes\nFresh Goat Cheese (Chevre):\n1. Heat 10L goat milk to 22°C\n2. Add mesophilic culture, stir gently\n3. Add rennet (1/4 tsp), stir, cover\n4. Let set 12 hours (no cutting)\n5. Ladle into cheesecloth-lined molds\n6. Drain 12-24 hours\n7. Unmold, salt lightly\n8. Eat fresh or age 1 week\n\nSimple Cheddar:\n1. Heat 20L cow milk to 31°C\n2. Add mesophilic culture, ripen 45 min\n3. Add rennet, set 45 min\n4. Cut into 1cm cubes\n5. Cook to 38°C over 30 min (stir)\n6. Drain whey, stack curds (cheddaring)\n7. Mill, salt (2% by weight)\n8. Press at 20kg for 24 hours\n9. Wrap, age at 10°C for 2-12 months\n\nMozzarella:\n1. Heat 10L milk to 33°C\n2. Add thermophilic culture + rennet\n3. Set 45 min, cut into 2cm cubes\n4. Cook to 42°C, hold 30 min\n5. Drain whey, heat curds in hot water (75°C)\n6. Stretch and pull like taffy\n7. Form into balls\n8. Store in brine or whey\n9. Eat within 1 week",
        },
      ],
      quiz: {
        questions: [
          {
            question: "How many liters of milk does it take to make 1 kg of fresh cheese?",
            options: ["2-3 liters", "5-7 liters", "10 liters", "20 liters"],
            correctIndex: 2,
            explanation: "It takes approximately 10 liters of milk to produce 1 kg of fresh cheese, with the ratio increasing for harder cheeses.",
          },
          {
            question: "What temperature should mesophilic cultures be used at?",
            options: ["5-10°C", "20-35°C", "40-50°C", "60-70°C"],
            correctIndex: 1,
            explanation: "Mesophilic cultures work at moderate temperatures of 20-35°C (68-95°F), suitable for cheddar and goat cheese.",
          },
          {
            question: "What is the key difference between fresh and hard cheese?",
            options: [
              "Different milk types",
              "Moisture content — fresh has 60-80%, hard has 30-40%",
              "Different cultures used",
              "Hard cheese requires no aging",
            ],
            correctIndex: 1,
            explanation: "The key difference is moisture content — fresh cheese has 60-80% moisture while hard cheese has 30-40% moisture.",
          },
        ],
        passMark: 60,
      },
    },
    {
      title: "Yogurt & Fermented Products",
      content: [
        {
          text: "Yogurt Making\nBasic Yogurt:\n1. Heat 4L milk to 85°C (hold 5 minutes)\n   - Denatures proteins for thicker texture\n2. Cool to 43-46°C\n3. Add 2-4 tablespoons live culture\n4. Incubate at 43°C for 6-12 hours\n5. Refrigerate to stop fermentation\n6. Flavor or eat plain\n\nYogurt Types:\n- Set Yogurt: Fermented in final container\n- Stirred Yogurt: Fermented in bulk, stirred\n- Strained (Greek): Remove whey for thickness\n- Drinkable: Thinner consistency\n- Frozen: Yogurt ice cream\n\nGreek Yogurt:\n- Regular yogurt strained through cheesecloth\n- Remove 50-70% whey\n- 2-3x protein of regular yogurt\n- Thicker, creamier texture\n- Premium pricing ($8-15/kg)\n\nKefir:\n- Fermented milk drink\n- Kefir grains (symbiotic culture)\n- Ferment 12-24 hours at room temperature\n- Tangy, slightly effervescent\n- Probiotic-rich\n\nOther Fermented Dairy:\n- Buttermilk: Cultured, thick\n- Sour cream: Cultured cream\n- Crème fraîche: Cultured heavy cream\n- Labneh: Strained yogurt (Middle Eastern)",
        },
        {
          text: "Fermentation Science\nThe Bacteria:\n- Lactobacillus bulgaricus: Produces lactic acid\n- Streptococcus thermophilus: Works with L. bulgaricus\n- Lactobacillus acidophilus: Probiotic\n- Bifidobacterium: Probiotic\n- Lactococcus: Mesophilic cultures\n\nFermentation Process:\n1. Bacteria consume lactose (milk sugar)\n2. Produce lactic acid\n3. Acid causes protein to coagulate\n4. Texture becomes thick and creamy\n5. Flavor becomes tangy\n\nTemperature Control:\n- Too cold: Slow fermentation, thin yogurt\n- Too hot: Kills bacteria, no fermentation\n- Optimal: 42-46°C for thermophilic\n- Time: 6-12 hours (longer = tangier)\n\nTroubleshooting:\n- Grainy: Overheated, or stirred too much\n- Thin: Under-fermented, or wrong culture\n- Watery: Over-fermented, or temperature too high\n- Sour: Over-fermented\n- No setting: Dead culture, or temperature too low\n\nProbiotics:\n- Live active cultures = probiotic benefit\n- Check label: 'live and active cultures'\n- Refrigeration preserves probiotics\n- Heat kills probiotics\n- Health benefits: Digestive health, immunity",
        },
      ],
      quiz: {
        questions: [
          {
            question: "What temperature should yogurt be incubated at?",
            options: ["20°C", "35°C", "43°C", "60°C"],
            correctIndex: 2,
            explanation: "Yogurt should be incubated at 43°C (110°F) for 6-12 hours to allow the thermophilic bacteria to ferment the lactose.",
          },
          {
            question: "What makes Greek yogurt thicker than regular yogurt?",
            options: [
              "More milk",
              "Straining to remove 50-70% whey",
              "Adding gelatin",
              "Higher fermentation temperature",
            ],
            correctIndex: 1,
            explanation: "Greek yogurt is thicker because it's strained to remove 50-70% of the whey, concentrating the protein and creating a creamier texture.",
          },
          {
            question: "What happens if yogurt is fermented at too high a temperature?",
            options: [
              "It becomes thicker",
              "Bacteria are killed and no fermentation occurs",
              "It becomes sweeter",
              "Nothing changes",
            ],
            correctIndex: 1,
            explanation: "If the temperature is too high, the bacteria are killed and fermentation cannot occur, resulting in thin, unset yogurt.",
          },
        ],
        passMark: 60,
      },
    },
    {
      title: "Butter, Ice Cream & Value-Added",
      content: [
        {
          text: "Butter Making\nChurning Butter:\n1. Start with heavy cream (35-40% fat)\n2. Warm to 15-18°C (room temperature)\n3. Churn: 20-30 minutes (or shake in jar)\n4. Butter separates from buttermilk\n5. Wash butter with cold water (3-4 times)\n6. Knead to remove remaining buttermilk\n7. Salt if desired (1-2% by weight)\n8. Shape and refrigerate\n\nButter Varieties:\n- Unsalted: Pure cream flavor\n- Salted: Preserved, longer shelf life\n- Cultured: Made from ripened cream (richer flavor)\n- Clarified/Ghee: Milk solids removed (high smoke point)\n- Compound: Mixed with herbs, garlic, etc.\n\nButter Yield:\n- 4L cream → 1 kg butter\n- Buttermilk is a byproduct (use for baking)\n\nButter Pricing:\n- Homemade: $15-25/kg\n- Artisan: $20-40/kg\n- Premium/cultured: $30-60/kg\n- Flavored: $25-50/kg",
        },
        {
          text: "Ice Cream Making\nBasic Ice Cream Recipe:\n1. Heat 2L cream + 1L milk + sugar\n2. Add stabilizers (optional: guar gum)\n3. Temper 4 egg yolks into hot mixture\n4. Cook to 82°C (coating back of spoon)\n5. Strain and cool rapidly\n6. Add flavors (vanilla, chocolate, fruit)\n7. Age in fridge 4-12 hours\n8. Churn in ice cream maker\n9. Freeze at -18°C\n\nIce Cream Styles:\n- American: 10-16% fat, light and fluffy\n- French (Custard): Egg-based, rich and creamy\n- Italian (Gelato): Less fat, more dense\n- Sorbet: Dairy-free, fruit-based\n\nValue-Added Dairy Products:\n1. Flavored Milk: Chocolate, strawberry\n2. Cream Cheese: Soft, spreadable\n3. Sour Cream: Cultured cream\n4. Ghee: Clarified butter\n5. Whey Protein: From cheese making waste\n6. Milk Powder: Dehydrated milk\n\nPackaging:\n- Glass jars (premium look)\n- Recyclable plastic\n- Paper cartons (milk)\n- Labels with: ingredients, date, farm name\n- UPC codes for retail",
        },
      ],
      quiz: {
        questions: [
          {
            question: "How much cream does it take to make 1 kg of butter?",
            options: ["1 liter", "2 liters", "4 liters", "10 liters"],
            correctIndex: 2,
            explanation: "It takes approximately 4 liters of heavy cream to produce 1 kg of butter.",
          },
          {
            question: "What temperature should ice cream base be cooked to?",
            options: ["60°C", "72°C", "82°C", "100°C"],
            correctIndex: 2,
            explanation: "Ice cream base should be cooked to 82°C (coating the back of a spoon) to properly cook the egg yolks and thicken the mixture.",
          },
          {
            question: "What is ghee?",
            options: [
              "A type of yogurt",
              "Clarified butter with milk solids removed",
              "Indian ice cream",
              "A cheese variety",
            ],
            correctIndex: 1,
            explanation: "Ghee is clarified butter where all milk solids are removed, resulting in a high smoke point, shelf-stable product popular in Indian cuisine.",
          },
        ],
        passMark: 60,
      },
    },
    {
      title: "Quality Control & Food Safety",
      content: [
        {
          text: "Dairy Safety Standards\nCritical Control Points (HACCP):\n1. Raw milk receiving: Test temperature, bacteria\n2. Pasteurization: Verify time/temperature\n3. Cooling: Rapid cooling post-pasteurization\n4. Fermentation: Monitor temperature and pH\n5. Packaging: Clean, sealed containers\n6. Storage: Proper temperature\n7. Distribution: Cold chain maintained\n\nTesting Requirements:\n- Bacteria count: Before and after pasteurization\n- Somatic cell count: Animal health indicator\n- Antibiotic residue: Zero tolerance\n- pH monitoring: Fermentation control\n- Temperature logging: Continuous\n\nRecord Keeping:\n- Batch logs: Every production run\n- Temperature logs: Continuous\n- Cleaning logs: Daily/weekly\n- Supplier verification\n- Customer complaints\n\nAllergen Management:\n- Milk is a major allergen\n- Label all dairy products clearly\n- Prevent cross-contamination\n- Train staff on allergen protocols",
        },
        {
          text: "Shelf Life & Storage\nProduct Shelf Life:\n- Raw milk: 3-5 days (4°C)\n- Pasteurized milk: 2-3 weeks (4°C)\n- Yogurt: 2-4 weeks (4°C)\n- Fresh cheese: 1-2 weeks (4°C)\n- Hard cheese: 2-6 months (10°C)\n- Butter: 2-4 weeks (4°C)\n- Ice cream: 6-12 months (-18°C)\n\nStorage Temperatures:\n- Refrigerated: 0-4°C\n- Frozen: -18°C or below\n- Aging room: 10-14°C (85-90% humidity)\n\nQuality Indicators:\n✓ Proper color and appearance\n✓ Correct texture and consistency\n✓ Expected flavor (not off-flavors)\n✓ Clean, sealed packaging\n✓ Correct date labels\n✗ Off-odors\n✗ Discoloration\n✗ Gas bubbles (unwanted)\n✗ Slimy texture\n✗ Mold growth\n\nWhen in Doubt:\n- Throw it out\n- Investigate cause\n- Report to supervisor\n- Document incident\n- Implement corrective action",
        },
      ],
      quiz: {
        questions: [
          {
            question: "What is the critical control point for pasteurization?",
            options: [
              "Adding culture",
              "Verifying time and temperature during heating",
              "Packaging the product",
              "Storing in refrigerator",
            ],
            correctIndex: 1,
            explanation: "The critical control point for pasteurization is verifying that the correct time and temperature are maintained during heating to ensure pathogen elimination.",
          },
          {
            question: "How long does pasteurized milk typically last in the refrigerator?",
            options: ["1-3 days", "2-3 weeks", "2-3 months", "6 months"],
            correctIndex: 1,
            explanation: "Pasteurized milk typically lasts 2-3 weeks when stored properly at 4°C (39°F).",
          },
          {
            question: "What should be done if a dairy product shows off-odors or discoloration?",
            options: [
              "Sell it at a discount",
              "Throw it out and investigate",
              "Mix it with fresh product",
              "Ignore it if it tastes okay",
            ],
            correctIndex: 1,
            explanation: "If a dairy product shows off-odors or discoloration, it should be thrown out immediately and the cause investigated.",
          },
        ],
        passMark: 60,
      },
    },
    {
      title: "Dairy Business & Marketing",
      content: [
        {
          text: "Business Models\n1. Home Kitchen (Cottage Food)\n   - Make cheese, yogurt, butter at home\n   - Sell directly to consumers\n   - Revenue: $5,000-15,000/year\n   - Low startup cost\n   - Check local cottage food laws\n\n2. Small Creamery\n   - Dedicated processing space\n   - 5-20 products\n   - Revenue: $20,000-100,000/year\n   - Farmers market + direct sales\n\n3. Artisan Creamery\n   - Specialized cheese making\n   - Award-winning products\n   - Revenue: $100,000-500,000/year\n   - Restaurant and specialty store supply\n\n4. Commercial Dairy\n   - Large-scale processing\n   - Multiple product lines\n   - Revenue: $500,000-5,000,000+/year\n   - Wholesale and retail\n\nPricing:\n- Fresh cheese: $10-20/kg\n- Aged cheese: $20-50/kg\n- Artisan/premium: $50-100/kg\n- Yogurt: $5-10/kg\n- Greek yogurt: $8-15/kg\n- Butter: $10-25/kg\n- Ice cream: $8-20/kg",
        },
        {
          text: "Marketing & Sales\nDirect Marketing:\n- Farmers market: Premium, direct customer\n- Farm stand: On-farm sales\n- CSA: Weekly dairy shares\n- Online: Regional delivery\n- Restaurant supply: Chef partnerships\n\nBranding:\n- 'Artisan' or 'Handcrafted'\n- 'Small-batch'\n- 'Raw' (where legal)\n- 'Grass-fed' (higher omega-3)\n- 'Organic' (certification required)\n- 'Local' (within 100 miles)\n\nPackaging:\n- Glass jars (premium)\n- Recyclable containers\n- Eco-friendly wrapping\n- Clear labels: ingredients, date, origin\n- Attractive design\n\nSales Channels:\n- Farmers market: Direct, premium\n- Specialty stores: Consistent volume\n- Restaurants: Bulk, ongoing contracts\n- Online: Wider reach\n- Gift baskets: Seasonal\n\nRegulations:\n- Dairy processing license\n- Facility inspection\n- Labeling compliance\n- Insurance requirements\n- Traceability systems",
        },
      ],
      quiz: {
        questions: [
          {
            question: "What is the premium price range for artisan aged cheese?",
            options: ["$5-10/kg", "$20-50/kg", "$100-200/kg", "$500+/kg"],
            correctIndex: 1,
            explanation: "Artisan aged cheese commands premium prices of $50-100/kg, with rare varieties potentially exceeding that.",
          },
          {
            question: "What branding term appeals most to quality-conscious consumers?",
            options: [
              "Mass-produced",
              "Artisan, small-batch, and local",
              "Imported",
              "Lowest price",
            ],
            correctIndex: 1,
            explanation: "'Artisan', 'small-batch', and 'local' branding appeals most to quality-conscious consumers willing to pay premium prices.",
          },
          {
            question: "What is the first legal requirement for selling dairy products?",
            options: [
              "Business license only",
              "Dairy processing license and facility inspection",
              "Insurance only",
              "No requirements",
            ],
            correctIndex: 1,
            explanation: "A dairy processing license and facility inspection are the first legal requirements before selling any dairy products.",
          },
        ],
        passMark: 60,
      },
    },
  ],
};

export default extraCourse56;
