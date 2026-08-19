import { useState } from "react";
import { Calculator, Calendar, Thermometer, Droplets, ArrowRightLeft, Beaker } from "lucide-react";

type Tool = "ph" | "calendar" | "units" | "weather";

const cropCalendar = {
  "Tomato": { start: "Feb-Mar", transplant: "Apr-May", harvest: "Jun-Sep", zones: "3-11" },
  "Corn": { start: "Apr-May", transplant: "Direct sow", harvest: "Jul-Sep", zones: "3-11" },
  "Lettuce": { start: "Mar-Apr", transplant: "Apr-May", harvest: "May-Jun", zones: "3-11" },
  "Peppers": { start: "Feb-Mar", transplant: "May-Jun", harvest: "Jul-Oct", zones: "3-11" },
  "Squash": { start: "May-Jun", transplant: "Direct sow", harvest: "Jul-Oct", zones: "3-11" },
  "Cabbage": { start: "Feb-Mar", transplant: "Mar-Apr", harvest: "May-Jul", zones: "1-9" },
  "Carrots": { start: "Mar-Apr", transplant: "Direct sow", harvest: "Jun-Oct", zones: "3-10" },
  "Beans": { start: "May-Jun", transplant: "Direct sow", harvest: "Jul-Sep", zones: "3-10" },
  "Potatoes": { start: "Mar-Apr", transplant: "Direct sow", harvest: "Jul-Oct", zones: "3-10" },
  "Onions": { start: "Jan-Feb", transplant: "Mar-Apr", harvest: "Jun-Aug", zones: "3-9" },
};

const unitConversions = [
  { from: "gallons/acre", to: "liters/hectare", factor: 9.354, label: "Irrigation Rate" },
  { from: "lbs/acre", to: "kg/hectare", factor: 1.121, label: "Application Rate" },
  { from: "bushels/acre", to: "tonnes/hectare", factor: 0.0673, label: "Yield" },
  { from: "inches", to: "centimeters", factor: 2.54, label: "Length" },
  { from: "°F", to: "°C", factor: null, label: "Temperature", special: true },
  { from: "ppm", to: "mg/L", factor: 1, label: "Concentration" },
  { from: "tons/acre", to: "tonnes/hectare", factor: 2.24, label: "Heavy Rate" },
  { from: "sq ft", to: "sq meters", factor: 0.0929, label: "Area" },
];

function PhCalculator() {
  const [ph, setPh] = useState(7);
  const [soilType, setSoilType] = useState("loam");
  const getRecommendation = () => {
    if (ph < 5.5) return { status: "Very Acidic", action: "Apply agricultural lime (2-4 tons/acre). Test annually.", color: "text-red-500" };
    if (ph < 6.0) return { status: "Acidic", action: "Apply lime (1-2 tons/acre). Good for blueberries, potatoes.", color: "text-orange-500" };
    if (ph < 6.5) return { status: "Slightly Acidic", action: "Ideal for most vegetables. Minimal amendments needed.", color: "text-green-600" };
    if (ph < 7.5) return { status: "Neutral", action: "Excellent for most crops. Maintain with cover cropping.", color: "text-green-600" };
    if (ph < 8.0) return { status: "Alkaline", action: "Apply sulfur (200-500 lbs/acre). Use acidifying fertilizers.", color: "text-orange-500" };
    return { status: "Very Alkaline", action: "Apply elemental sulfur (500+ lbs/acre) and organic matter.", color: "text-red-500" };
  };
  const rec = getRecommendation();
  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-mono text-muted-foreground mb-2 block">Soil pH Value: {ph.toFixed(1)}</label>
        <input type="range" min="0" max="14" step="0.1" value={ph} onChange={(e) => setPh(parseFloat(e.target.value))} className="w-full accent-green-600" />
        <div className="flex justify-between text-xs font-mono text-muted-foreground mt-1">
          <span>0 (Acidic)</span><span>7 (Neutral)</span><span>14 (Alkaline)</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className={`text-3xl font-bold font-mono ${rec.color}`}>{ph.toFixed(1)}</div>
        <div>
          <div className="font-semibold">{rec.status}</div>
          <div className="text-sm text-muted-foreground">{rec.action}</div>
        </div>
      </div>
      <div className="p-3 bg-muted/50 rounded text-xs font-mono">
        <div className="text-muted-foreground mb-1">pH Scale:</div>
        <div className="h-3 rounded-full" style={{background: "linear-gradient(to right, #ef4444, #f97316, #eab308, #22c55e, #22c55e, #3b82f6, #8b5cf6)"}} />
        <div className="flex justify-between mt-1 text-[10px]"><span>0</span><span>7</span><span>14</span></div>
      </div>
    </div>
  );
}

function CropCalendar() {
  const [selectedCrop, setSelectedCrop] = useState("Tomato");
  const crop = cropCalendar[selectedCrop as keyof typeof cropCalendar];
  return (
    <div className="space-y-4">
      <select value={selectedCrop} onChange={(e) => setSelectedCrop(e.target.value)} className="w-full p-2 bg-muted border border-border rounded font-mono text-sm">
        {Object.keys(cropCalendar).map((c) => <option key={c}>{c}</option>)}
      </select>
      {crop && (
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Start Seeds", value: crop.start },
            { label: "Transplant", value: crop.transplant },
            { label: "Harvest", value: crop.harvest },
            { label: "Zones", value: `USDA ${crop.zones}` },
          ].map((item) => (
            <div key={item.label} className="p-3 bg-muted/50 rounded">
              <div className="text-xs text-muted-foreground font-mono">{item.label}</div>
              <div className="text-sm font-semibold mt-1">{item.value}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function UnitConverter() {
  const [selected, setSelected] = useState(0);
  const [inputVal, setInputVal] = useState(1);
  const conv = unitConversions[selected];
  const result = conv.special
    ? conv.from === "°F"
      ? ((inputVal - 32) * 5 / 9).toFixed(2)
      : ((inputVal * 9 / 5) + 32).toFixed(2)
    : (inputVal * (conv.factor ?? 1)).toFixed(4);
  return (
    <div className="space-y-4">
      <select value={selected} onChange={(e) => setSelected(parseInt(e.target.value))} className="w-full p-2 bg-muted border border-border rounded font-mono text-sm">
        {unitConversions.map((c, i) => <option key={i}>{c.label}: {c.from} → {c.to}</option>)}
      </select>
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <label className="text-xs font-mono text-muted-foreground">{conv.from}</label>
          <input type="number" value={inputVal} onChange={(e) => setInputVal(parseFloat(e.target.value) || 0)} className="w-full p-2 bg-muted border border-border rounded font-mono mt-1" />
        </div>
        <ArrowRightLeft className="w-5 h-5 text-muted-foreground mt-5" />
        <div className="flex-1">
          <label className="text-xs font-mono text-muted-foreground">{conv.to}</label>
          <div className="p-2 bg-green-500/10 border border-green-500/30 rounded font-mono mt-1 text-green-600 font-bold">{result}</div>
        </div>
      </div>
    </div>
  );
}

export default function Tools() {
  const [active, setActive] = useState<Tool>("ph");
  const tabs: { id: Tool; label: string; icon: React.ReactNode }[] = [
    { id: "ph", label: "Soil pH", icon: <Beaker className="w-4 h-4" /> },
    { id: "calendar", label: "Crop Calendar", icon: <Calendar className="w-4 h-4" /> },
    { id: "units", label: "Unit Converter", icon: <ArrowRightLeft className="w-4 h-4" /> },
    { id: "weather", label: "Weather Guide", icon: <Thermometer className="w-4 h-4" /> },
  ];
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-2">Farm Tools</h1>
        <p className="text-muted-foreground mb-6 font-mono text-sm">Interactive calculators and references for agriculture</p>
        <div className="flex gap-2 mb-6 flex-wrap">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setActive(t.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-mono transition-colors ${
                active === t.id ? "bg-green-600 text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}>
              {t.icon}{t.label}
            </button>
          ))}
        </div>
        <div className="border border-border rounded-lg p-6 bg-card">
          {active === "ph" && <PhCalculator />}
          {active === "calendar" && <CropCalendar />}
          {active === "units" && <UnitConverter />}
          {active === "weather" && (
            <div className="space-y-4">
              <h3 className="font-semibold">Weather-Based Farming Guide</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { temp: "Below 32°F / 0°C", action: "Frost warning: Cover tender crops, drain irrigation lines, protect livestock water", icon: "🥶" },
                  { temp: "32-50°F / 0-10°C", action: "Cold season: Plan cool-season crops, prune dormant trees, soil testing", icon: "❄️" },
                  { temp: "50-70°F / 10-21°C", action: "Growing season: Plant, transplant, direct sow. Ideal for most fieldwork", icon: "🌱" },
                  { temp: "70-85°F / 21-29°C", action: "Peak season: Monitor irrigation, watch for pests, harvest early crops", icon: "☀️" },
                  { temp: "85-95°F / 29-35°C", action: "Heat stress: Increase irrigation, shade tender crops, early morning work", icon: "🌡️" },
                  { temp: "Above 95°F / 35°C", action: "Extreme heat: Max irrigation, avoid transplanting, protect workers", icon: "🔥" },
                ].map((w) => (
                  <div key={w.temp} className="p-3 bg-muted/50 rounded">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{w.icon}</span>
                      <span className="font-mono text-sm font-semibold">{w.temp}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">{w.action}</p>
                  </div>
                ))}
              </div>
              <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded text-sm">
                <strong>💡 Tip:</strong> For real-time weather data, integrate OpenWeatherMap API by adding your API key to the Keys tab.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
