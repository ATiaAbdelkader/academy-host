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

export const extraCourse64: ExtraCourse = {
  title: "Precision Agriculture with GIS & AI",
  description: "Master Geographic Information Systems combined with AI for spatial analysis, zone management, variable rate application, and data-driven field management decisions.",
  category: "AI in Agriculture",
  priceCents: 0,
  durationMinutes: 2400,
  instructor: "Dr. Anton Petrov",
  instructorTitle: "GIS & Spatial Analytics Specialist",
  order: 64,
  modules: [
    {
      title: "GIS Fundamentals for Agriculture",
      content: [
        { type: "paragraph", text: "Geographic Information Systems (GIS) are the backbone of precision agriculture—enabling farmers to analyze spatial variability, create management zones, and apply inputs precisely where needed. This module covers GIS fundamentals for agricultural applications." },
        { type: "paragraph", text: "Data Models: Vector (points, lines, polygons) represents discrete features—field boundaries, sampling locations, buildings. Raster (grid cells) represents continuous data—elevation, soil properties, yield maps, satellite imagery. Both are essential for agricultural GIS." },
        { type: "paragraph", text: "Coordinate Reference Systems: WGS84 (GPS standard, lat/long), UTM (metric grid, good for local analysis), state plane (high accuracy for specific regions). Choosing the right CRS ensures accurate distance and area measurements—critical for application rate calculations." },
        { type: "paragraph", text: "Essential GIS Layers: Field boundaries, soil maps, topography (DEM/DTM), yield history, satellite imagery, EC (electrical conductivity) maps, drainage networks, infrastructure (roads, buildings, waterways), management zones, and application records." },
        { type: "paragraph", text: "Open-Source GIS Tools: QGIS (desktop GIS, powerful and free), GRASS GIS (raster analysis), GDAL/OGR (data conversion), GeoPandas/Python (scripting), PostGIS (spatial databases). Commercial alternatives: ArcGIS, Trimble Ag Software." },
        { type: "paragraph", text: "Spatial Data Formats: Shapefile (legacy but universal), GeoJSON (web-friendly), GeoTIFF (raster with georeference), KML (Google Earth), ISOXML (agricultural equipment standard). Understanding format compatibility ensures data flows between farm systems." },
        { type: "video", caption: "Watch: GIS for Precision Farming — Understanding spatial data, coordinate systems, and essential map layers for data-driven agriculture.", url: "https://example.com/precision-gis/fundamentals" },
        { type: "quiz", title: "Module Quiz", questions: [
          { question: "What does vector data represent in agricultural GIS?", options: ["Continuous surfaces like elevation", "Discrete features like field boundaries and sampling points", "Weather patterns", "Time series data"], answerIndex: 1 },
          { question: "Which open-source GIS tool is most commonly used for agricultural spatial analysis?", options: ["Microsoft Excel", "QGIS", "Photoshop", "AutoCAD"], answerIndex: 1 }
        ], passPercent: 70 }
      ]
    },
    {
      title: "Yield Mapping & Variability Analysis",
      content: [
        { type: "paragraph", text: "Yield maps are the foundation of precision agriculture—they reveal how productivity varies across a field, guiding all subsequent management decisions. This module covers yield data collection, processing, and analysis." },
        { type: "paragraph", text: "Yield Monitor Data: Modern combines and harvesters record yield continuously using mass flow sensors (impact plate, optical) and moisture sensors. GPS tags each data point. Raw data: 1-2 readings/second at 5-10 mph = 1 reading per 2-4 meters." },
        { type: "paragraph", text: "Data Cleaning: Raw yield data contains errors: (1) Start/end of row artifacts, (2) Gap filling during header turns, (3) Moisture sensor drift, (4) GPS errors, (5) Equipment stops. AI-assisted cleaning removes outliers while preserving real spatial variation." },
        { type: "paragraph", text: "Variability Analysis Methods: (1) Simple statistics (mean, CV, range), (2) Voronoi polygon maps, (3) Heatmaps with inverse distance weighting (IDW), (4) Kriging interpolation, (5) NDVI correlation analysis. Multi-year averaging reveals consistent patterns vs. year-to-year noise." },
        { type: "paragraph", text: "Spatial Statistics: Moran's I (spatial autocorrelation), semivariograms (spatial structure), Getis-Ord Gi* (hot spot analysis). These identify whether yield patterns are random, clustered, or systematically distributed—guiding zone management decisions." },
        { type: "paragraph", text: "Multi-Year Analysis: Overlaying 3-5 years of yield data reveals 'management zones'—areas with consistent high, medium, or low productivity. These zones often correlate with soil type, topography, and drainage. Zone stability determines whether management changes are worthwhile." },
        { type: "video", caption: "Watch: Creating and Analyzing Yield Maps — From combine sensor data to actionable spatial variability insights for field management.", url: "https://example.com/precision-gis/yield-mapping" },
        { type: "quiz", title: "Module Quiz", questions: [
          { question: "Why is multi-year yield averaging important?", options: ["It saves data storage", "It separates consistent productivity patterns from year-to-year weather variation", "It's required by law", "It increases GPS accuracy"], answerIndex: 1 },
          { question: "What does Moran's I measure in yield analysis?", options: ["Total yield", "Spatial autocorrelation in yield patterns", "Soil pH", "Rainfall amount"], answerIndex: 1 }
        ], passPercent: 70 }
      ]
    },
    {
      title: "Management Zone Delineation",
      content: [
        { type: "paragraph", text: "Management zones divide fields into areas of similar characteristics for site-specific management. AI enhances traditional zone delineation by finding patterns invisible to manual analysis." },
        { type: "paragraph", text: "Zone Delineation Methods: (1) Soil map units (traditional), (2) Yield history clustering, (3) EC (electrical conductivity) mapping, (4) Remote sensing indices, (5) Topographic position, (6) Multi-layer AI clustering. Combining multiple data sources creates more accurate zones." },
        { type: "paragraph", text: "Unsupervised Clustering: K-means, fuzzy c-means, and self-organizing maps (SOM) group field areas by similarity across multiple variables (yield, EC, elevation, NDVI). Optimal cluster number determined by silhouette analysis, gap statistic, or domain knowledge." },
        { type: "paragraph", text: "Supervised Classification: When ground truth data is available (soil samples, yield zones), supervised methods (Random Forest, SVM) classify entire fields based on training data. Higher accuracy when training data is representative." },
        { type: "paragraph", text: "Zone Optimization: Too many zones create management complexity; too few lose precision. Optimal: 3-6 zones per field (balancing precision vs. practicality). Zone size should be compatible with equipment capabilities (minimum controllable unit)." },
        { type: "paragraph", text: "Zone Validation: Collect soil samples from each zone to verify zone homogeneity. Check that within-zone variability is significantly less than between-zone variability. Adjust zone boundaries based on ground truth. Re-evaluate every 3-5 years." },
        { type: "video", caption: "Watch: AI-Powered Management Zone Creation — Using clustering algorithms and multi-layer analysis to define optimal management zones.", url: "https://example.com/precision-gis/management-zones" },
        { type: "quiz", title: "Module Quiz", questions: [
          { question: "What is the recommended number of management zones per field?", options: ["1-2", "3-6", "10-15", "20-30"], answerIndex: 1 },
          { question: "How often should management zones be re-evaluated?", options: ["Every year", "Every 3-5 years", "Every 10-15 years", "Never"], answerIndex: 1 }
        ], passPercent: 70 }
      ]
    },
    {
      title: "Variable Rate Technology (VRT)",
      content: [
        { type: "paragraph", text: "Variable Rate Technology applies different input rates across a field based on management zones and prescription maps. VRT turns precision analysis into precision action." },
        { type: "paragraph", text: "VRT Systems: (1) Controller-based (individual rate changes per zone), (2) Map-based (pre-loaded prescription maps), (3) Sensor-based (real-time adjustments). Map-based is most common for fertilizer and lime; sensor-based for spraying and irrigation." },
        { type: "paragraph", text: "Prescription Map Creation: Zone map + target rates per zone → Prescription map. Format: ISOXML, Shapefile, or proprietary (John Deere, AGCO). AI optimizes rates considering: soil test results, yield targets, crop requirements, environmental constraints, and economics." },
        { type: "paragraph", text: "VRT Seeding: Variable rate seeding adjusts plant population based on yield potential—higher populations in high-productivity zones, lower in drought-prone or low-fertility zones. Optimize populations at $5-15/acre savings through reduced seed waste." },
        { type: "paragraph", text: "VRT Fertilizer: Nitrogen, phosphorus, and potassium applied at zone-specific rates. AI models consider: soil test levels, yield removal, crop growth stage, weather forecast, and economic optimization. Save 15-30% on fertilizer while maintaining or improving yield." },
        { type: "paragraph", text: "VRT Lime: pH correction varies across zones based on soil buffering capacity and current pH. Variable rate lime application saves 20-40% compared to uniform rates while ensuring all zones reach optimal pH. Results visible in 1-2 seasons." },
        { type: "video", caption: "Watch: Variable Rate Application in Practice — Creating prescription maps and calibrating VRT equipment for precision input application.", url: "https://example.com/precision-gis/vrt-practice" },
        { type: "quiz", title: "Module Quiz", questions: [
          { question: "How much can VRT nitrogen application save compared to uniform rates?", options: ["1-5%", "5-10%", "15-30%", "50-70%"], answerIndex: 2 },
          { question: "What is the difference between map-based and sensor-based VRT?", options: ["No difference", "Map-based uses pre-loaded prescription maps; sensor-based makes real-time adjustments", "Map-based is more expensive", "Sensor-based only works for seeding"], answerIndex: 1 }
        ], passPercent: 70 }
      ]
    },
    {
      title: "Spatial Data Integration & Analysis",
      content: [
        { type: "paragraph", text: "The power of GIS in agriculture comes from integrating multiple spatial data layers. This module covers how to combine diverse datasets for comprehensive field analysis." },
        { type: "paragraph", text: "Layer Integration: Overlay yield maps, soil maps, topography, drainage, satellite imagery, and management records. Spatial joins connect data across layers. AI finds correlations between layers that explain yield patterns." },
        { type: "paragraph", text: "Terrain Analysis: From Digital Elevation Models (DEM): slope, aspect, curvature, topographic wetness index (TWI), stream power index. Terrain strongly influences water flow, soil development, and microclimate. AI uses terrain features as predictors for soil properties and yield." },
        { type: "paragraph", text: "Drainage Analysis: Flow accumulation, flow direction, and watershed delineation from DEMs. Identify wet spots, erosion-prone areas, and potential drainage improvements. AI combines terrain with soil and yield data to prioritize drainage investments." },
        { type: "paragraph", text: "Proximity Analysis: Distance to waterways (buffer zones), distance to field edges, proximity to trees/windbreaks (shading, competition), distance from roads (compaction). These spatial relationships influence crop performance and guide management." },
        { type: "paragraph", text: "Time-Series Spatial Analysis: Track how spatial patterns change over years. Detect expanding problem areas (salinity, compaction, erosion), shrinking high-yield zones, and the effects of management changes. Change detection algorithms quantify spatial trends." },
        { type: "video", caption: "Watch: Multi-Layer Spatial Analysis — Integrating terrain, soil, yield, and satellite data for comprehensive field understanding.", url: "https://example.com/precision-gis/spatial-integration" },
        { type: "quiz", title: "Module Quiz", questions: [
          { question: "What does the Topographic Wetness Index (TWI) predict?", options: ["Soil temperature", "Where water accumulates in the landscape", "Wind speed", "Crop height"], answerIndex: 1 },
          { question: "Why is time-series spatial analysis important?", options: ["It creates prettier maps", "It reveals how spatial patterns change over years, detecting expanding problems or management effects", "It reduces data storage", "It's required for certification"], answerIndex: 1 }
        ], passPercent: 70 }
      ]
    },
    {
      title: "AI-Powered Decision Support & Precision Management",
      content: [
        { type: "paragraph", text: "The final module brings GIS analysis together with AI decision support to create comprehensive precision management systems." },
        { type: "paragraph", text: "Spatial AI Models: Geographically Weighted Regression (GWR) captures spatially varying relationships (e.g., the effect of rainfall on yield differs between hilltops and valleys). Random Forest with spatial features outperforms non-spatial models by 10-20%." },
        { type: "paragraph", text: "Real-Time Spatial Decision Support: Combine field sensor data, weather radar, and satellite imagery in real-time. AI generates spatially explicit alerts: irrigation needs by zone, disease risk by area, harvest readiness by section. Delivered via mobile app with interactive maps." },
        { type: "paragraph", text: "Precision Nutrient Management: AI-driven 4R approach (Right source, Right rate, Right time, Right place) using spatial analysis. Maps show nutrient availability at 10m resolution. Recommendations update based on weather forecasts, crop stage, and economic optimization." },
        { type: "paragraph", text: "Equipment Integration: ISOXML prescription maps feed directly to John Deere Operations Center, AGCO Fuse, CNH Industrial AFS, and Trimble Ag. Data flows from GIS analysis → prescription map → equipment controller → application. Seamless digital workflow." },
        { type: "paragraph", text: "ROI Measurement: Compare precision management areas against control strips. Measure: input savings (seed, fertilizer, chemical), yield changes, environmental metrics (nutrient runoff reduction), and labor efficiency. Document ROI for continuous improvement and technology investment decisions." },
        { type: "video", caption: "Watch: From Analysis to Action — How AI-powered GIS creates precision management recommendations that integrate directly with farm equipment.", url: "https://example.com/precision-gis/decision-support" },
        { type: "paragraph", text: "Future Directions: Real-time AI analysis of drone imagery for in-season adjustments, digital twin field simulations for scenario planning, autonomous equipment integration, and carbon credit verification through spatial monitoring." },
        { type: "quiz", title: "Module Quiz", questions: [
          { question: "What does the 4R nutrient management approach stand for?", options: ["Right seed, Right water, Right sun, Right soil", "Right source, Right rate, Right time, Right place", "Right field, Right farmer, Right market, Right price", "Right pH, Right NPK, Right organic matter, Right moisture"], answerIndex: 1 },
          { question: "How much can spatial AI models outperform non-spatial models?", options: ["1-2%", "5-10%", "10-20%", "30-50%"], answerIndex: 2 }
        ], passPercent: 70 }
      ]
    }
  ]
};
