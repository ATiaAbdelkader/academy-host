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

export const extraCourse36: ExtraCourse = {
  title: "Drone Technology in Agriculture",
  description:
    "Learn to use agricultural drones for crop monitoring, precision spraying, field mapping, and yield estimation. From flight planning to data analysis, master the tools that are transforming modern farming.",
  category: "AgTech",
  duration: "6 weeks",
  difficulty: "Intermediate",
  priceCents: 6900,
  durationMinutes: 360,
  order: 36,
  instructor: "Capt. David Okonkwo",
  instructorTitle: "UAV Operations & Precision Agriculture",
  modules: [
    {
      title: "Introduction to Agricultural Drones",
      content: [
        {
          type: "paragraph",
          text: "Agricultural drones (UAVs) are unmanned aerial vehicles designed for farm operations. They range from small multi-rotor drones for scouting to large fixed-wing platforms for mapping hundreds of hectares in a single flight. Drones bridge the gap between satellite imagery and ground-level observation.",
        },
        {
          type: "paragraph",
          text: "Key applications include: crop health monitoring via NDVI (Normalized Difference Vegetation Index), precision spraying of pesticides and fertilizers, field boundary mapping, irrigation management, livestock monitoring, and post-harvest damage assessment.",
        },
        {
          type: "paragraph",
          text: "The agricultural drone market is growing at 30% annually because drones reduce input costs by 20-30%, improve crop yields by 5-15%, and provide data that was previously only available from expensive manned aircraft flights.",
        },
        {
          type: "quiz",
          title: "Drone Fundamentals",
          passPercent: 60,
          questions: [
            {
              question: "What does NDVI measure in agriculture?",
              options: [
                "Crop health and vigor using light reflection",
                "Soil moisture content",
                "Air temperature",
                "Wind speed",
              ],
              answerIndex: 0,
            },
            {
              question: "How much can drones reduce input costs?",
              options: [
                "20-30%",
                "Less than 1%",
                "50-60%",
                "Drones increase costs",
              ],
              answerIndex: 0,
            },
            {
              question: "What is the main advantage of drones over satellite imagery?",
              options: [
                "Higher resolution and on-demand availability",
                "Drones are always cheaper",
                "Satellites cannot see farms",
                "Drones fly higher",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "Drone Types & Selection",
      content: [
        {
          type: "paragraph",
          text: "Multi-rotor drones (quadcopters, hexacopters) are ideal for precision spraying and targeted scouting. They hover in place, fly slowly, and carry spray payloads. Fixed-wing drones cover large areas quickly — up to 400 hectares per flight — making them perfect for field mapping and NDVI surveys.",
        },
        {
          type: "paragraph",
          text: "Key specifications to compare: flight time (20-60 minutes), payload capacity (2-20 kg), camera resolution (multispectral is essential for crop health), GPS accuracy (RTK厘米级精度 for precision agriculture), and spray width (for spraying drones).",
        },
        {
          type: "paragraph",
          text: "Consider your specific needs: small farms under 50 hectares benefit from multi-rotor versatility. Large operations over 200 hectares need fixed-wing efficiency. Hybrid VTOL (Vertical Take-Off and Landing) drones combine both capabilities but at higher cost.",
        },
        {
          type: "quiz",
          title: "Drone Selection",
          passPercent: 60,
          questions: [
            {
              question: "Which drone type is best for covering large fields quickly?",
              options: [
                "Fixed-wing drones",
                "Quadcopter drones",
                "Toy drones",
                "Helicopter drones only",
              ],
              answerIndex: 0,
            },
            {
              question: "What camera capability is essential for crop health monitoring?",
              options: [
                "Multispectral imaging",
                "Selfie camera",
                "4K video only",
                "Infrared only",
              ],
              answerIndex: 0,
            },
            {
              question: "For a 300-hectare farm, which drone type is most efficient?",
              options: [
                "Fixed-wing or hybrid VTOL",
                "Small quadcopter",
                "No drone needed",
                "A toy drone",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "Flight Planning & Regulations",
      content: [
        {
          type: "paragraph",
          text: "Safe drone operations require flight planning software that maps field boundaries, calculates optimal flight paths, sets altitude and overlap parameters, and accounts for airspace restrictions. Popular apps include DJI Ground Station, Pix4Dcapture, and DroneDeploy.",
        },
        {
          type: "paragraph",
          text: "Agricultural drone regulations vary by country but generally require: pilot certification, drone registration, operational limits (visual line of sight, maximum altitude), insurance, and sometimes agricultural spraying permits. Always check local aviation authority rules before flying.",
        },
        {
          type: "paragraph",
          text: "Safety essentials: pre-flight checklist (battery, propellers, GPS lock, wind speed), maintaining safe distances from people and structures, no-fly zones near airports, weather minimums (wind under 15 km/h, no rain), and emergency procedures for signal loss or mechanical failure.",
        },
        {
          type: "quiz",
          title: "Flight Planning",
          passPercent: 60,
          questions: [
            {
              question: "What is the maximum recommended wind speed for safe drone flight?",
              options: [
                "Under 15 km/h",
                "Under 50 km/h",
                "Wind does not matter",
                "Only in calm weather",
              ],
              answerIndex: 0,
            },
            {
              question: "What should a pre-flight checklist include?",
              options: [
                "Battery, propellers, GPS lock, and wind speed",
                "Just the battery level",
                "Nothing, just take off",
                "Only the camera settings",
              ],
              answerIndex: 0,
            },
            {
              question: "Why is visual line of sight typically required?",
              options: [
                "To maintain safe operations and avoid obstacles",
                "It is not required anywhere",
                "To make flights shorter",
                "To reduce battery usage",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "Crop Health Monitoring & NDVI",
      content: [
        {
          type: "paragraph",
          text: "NDVI (Normalized Difference Vegetation Index) is the most widely used remote sensing metric for crop health. It measures the difference between near-infrared (which healthy vegetation reflects strongly) and red light (which healthy vegetation absorbs). NDVI values range from -1 to +1, with healthy crops typically above 0.6.",
        },
        {
          type: "paragraph",
          text: "Multispectral cameras capture light in specific wavelengths: Red, Green, Blue, Red Edge, and Near-Infrared. Each wavelength reveals different plant information. Red Edge is particularly sensitive to chlorophyll content and nitrogen status, making it invaluable for fertilizer management.",
        },
        {
          type: "paragraph",
          text: "NDVI maps reveal patterns invisible to the naked eye: early pest infestations, nutrient deficiencies, water stress zones, and drainage problems. These maps become actionable when combined with GPS-guided variable-rate application equipment for targeted input placement.",
        },
        {
          type: "quiz",
          title: "NDVI & Crop Health",
          passPercent: 60,
          questions: [
            {
              question: "What does NDVI measure?",
              options: [
                "Difference between near-infrared and red light reflection",
                "Soil temperature",
                "Wind direction",
                "Humidity levels",
              ],
              answerIndex: 0,
            },
            {
              question: "What NDVI value typically indicates healthy crops?",
              options: [
                "Above 0.6",
                "Below 0.2",
                "Exactly 0",
                "Below -0.5",
              ],
              answerIndex: 0,
            },
            {
              question: "Why is the Red Edge wavelength important?",
              options: [
                "It reveals chlorophyll content and nitrogen status",
                "It shows soil moisture only",
                "It detects rocks in the field",
                "It measures wind speed",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "Precision Spraying & Application",
      content: [
        {
          type: "paragraph",
          text: "Agricultural spray drones can reduce pesticide use by 30-50% compared to blanket application. They target only affected areas identified by scouting or NDVI maps, apply precise doses, and operate at heights that ensure uniform coverage with minimal drift.",
        },
        {
          type: "paragraph",
          text: "Key spray parameters: flight speed (4-8 km/h for fine droplets), height above canopy (2-3 meters), nozzle type (deflector or fan), droplet size (150-300 microns), and swath width (3-8 meters depending on rotor configuration).",
        },
        {
          type: "paragraph",
          text: "Variable-rate spraying uses prescription maps generated from NDVI data. High-NDVI areas receive lower doses (healthy crop, less pest pressure), while low-NDVI zones receive targeted higher doses. This precision saves chemicals, reduces environmental impact, and improves efficacy.",
        },
        {
          type: "quiz",
          title: "Precision Spraying",
          passPercent: 60,
          questions: [
            {
              question: "How much can spray drones reduce pesticide use?",
              options: [
                "30-50% compared to blanket application",
                "Less than 5%",
                "They use more pesticides",
                "No reduction possible",
              ],
              answerIndex: 0,
            },
            {
              question: "What is variable-rate spraying?",
              options: [
                "Using prescription maps to apply different doses to different zones",
                "Spraying the same amount everywhere",
                "Using only water instead of chemicals",
                "Spraying at night only",
              ],
              answerIndex: 0,
            },
            {
              question: "What height should spray drones fly above the canopy?",
              options: [
                "2-3 meters",
                "50 meters",
                "100 meters",
                "Ground level",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
    {
      title: "Data Processing & Actionable Insights",
      content: [
        {
          type: "paragraph",
          text: "Raw drone data is useless without processing. Orthomosaic stitching combines hundreds of images into seamless field maps. Point cloud generation creates 3D terrain models. Plant counting algorithms estimate stand counts and detect gaps.",
        },
        {
          type: "paragraph",
          text: "Processing software (Pix4D, DroneDeploy, OpenDroneMap) generates georeferenced outputs: NDVI maps, elevation models, orthomosaics, and prescription maps. These outputs integrate with farm management software and GPS-guided equipment for seamless precision agriculture workflows.",
        },
        {
          type: "paragraph",
          text: "The key workflow: Fly → Process → Analyze → Act. After processing, analyze maps for problem zones, export prescription maps, and load them into variable-rate applicators. Track changes over time by comparing sequential flights to measure crop response to interventions.",
        },
        {
          type: "quiz",
          title: "Data Processing",
          passPercent: 60,
          questions: [
            {
              question: "What does orthomosaic stitching do?",
              options: [
                "Combines hundreds of images into seamless field maps",
                "Deletes unnecessary photos",
                "Increases drone speed",
                "Reduces image resolution",
              ],
              answerIndex: 0,
            },
            {
              question: "What is the key drone data workflow?",
              options: [
                "Fly, Process, Analyze, Act",
                "Buy, Fly, Forget",
                "Plan, Pause, Wait",
                "Download, Delete, Repeat",
              ],
              answerIndex: 0,
            },
            {
              question: "How do you measure crop response to interventions?",
              options: [
                "Compare sequential drone flights over time",
                "Ask neighbors",
                "Guess based on weather",
                "It cannot be measured",
              ],
              answerIndex: 0,
            },
          ],
        },
      ],
    },
  ],
};
