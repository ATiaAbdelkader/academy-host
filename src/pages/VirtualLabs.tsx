import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import { FlaskConical, Calculator, Play, Award, CheckCircle } from "lucide-react";
import { toast } from "sonner";

function calculateLab(type: string, inputs: Record<string, number | string | boolean>): string {
  if (type === "lime") {
    const phDiff = Math.abs(Number(inputs.currentPh) - Number(inputs.targetPh));
    const soilFactor = inputs.soilType === "Clay" ? 1.5 : inputs.soilType === "Sandy" ? 0.8 : 1.0;
    const tonsPerAcre = (phDiff * 2 * soilFactor).toFixed(1);
    const totalTons = (Number(tonsPerAcre) * Number(inputs.acreage)).toFixed(1);
    const cost = (Number(totalTons) * 45).toFixed(0);
    return JSON.stringify({ tonsPerAcre, totalTons, cost, schedule: phDiff > 1.5 ? "Split into 2 applications: fall and spring" : "Single fall application recommended", limeType: phDiff > 2 ? "Dolomitic lime (adds Mg)" : "Calcitic lime" });
  }
  if (type === "rotation") {
    const rotations: Record<string, string[]> = {
      "Profit Maximization": ["Corn", "Soybeans", "Corn", "Soybeans"],
      "Soil Building": ["Corn", "Soybeans", "Cover Crop Mix", "Wheat + Clover"],
      "Diversity": ["Tomatoes", "Beans", "Corn", "Winter Squash"],
      "Sustainability": ["Legumes", "Grains", "Root Vegetables", "Cover Crop + Green Manure"],
    };
    const rotation = rotations[inputs.goal as string] ?? rotations["Profit Maximization"];
    return JSON.stringify({ rotation, yearPlan: rotation.map((crop, i) => `Year ${i + 1}: ${crop}`), nitrogenCredits: "Legume years add 40-80 lbs N/acre", pestBreak: "Rotation breaks pest and disease cycles" });
  }
  if (type === "irrigation") {
    const cropNeeds: Record<string, number> = { Corn: 25, Soybeans: 20, Tomatoes: 30, Lettuce: 15, Wheat: 18, Cotton: 22 };
    const need = cropNeeds[inputs.cropType as string] ?? 20;
    const soilFactor = inputs.soilType === "Sandy" ? 1.3 : inputs.soilType === "Clay" ? 0.8 : 1.0;
    const weeklyNeed = (need * soilFactor).toFixed(1);
    const deficitNum = Math.max(0, Number(weeklyNeed) - Number(inputs.rainfall));
    const deficit = deficitNum.toFixed(1);
    const gallonsPerAcre = Math.round(deficitNum * 27154);
    const totalGallons = gallonsPerAcre * Number(inputs.acreage);
    return JSON.stringify({ weeklyNeedInches: weeklyNeed, deficitInches: deficit, gallonsPerAcre, totalGallons, schedule: deficitNum > 2 ? "Split into 3-4 applications" : "2 applications per week" });
  }
  if (type === "fertilizer") {
    const cropNeeds: Record<string, { n: number; p: number; k: number }> = {
      Corn: { n: 150, p: 60, k: 80 }, Soybeans: { n: 20, p: 40, k: 60 }, Wheat: { n: 100, p: 45, k: 50 },
      Tomatoes: { n: 120, p: 80, k: 100 }, Potatoes: { n: 180, p: 70, k: 120 },
    };
    const need = cropNeeds[inputs.cropType as string] ?? cropNeeds.Corn;
    const nDef = Math.max(0, need.n - Number(inputs.nitrogen));
    const pDef = Math.max(0, need.p - Number(inputs.phosphorus));
    const kDef = Math.max(0, need.k - Number(inputs.potassium));
    const nRec = Math.round(nDef * 1.2);
    const pRec = Math.round(pDef * 1.5);
    const kRec = Math.round(kDef * 1.1);
    return JSON.stringify({ nDeficiency: nDef, pDeficiency: pDef, kDeficiency: kDef, nRecommendation: `${nRec} lbs N/acre`, pRecommendation: `${pRec} lbs P₂O₅/acre`, kRecommendation: `${kRec} lbs K₂O/acre`, totalFert: `${Math.round(nRec * 0.46)} lbs urea + ${Math.round(pRec * 0.46)} lbs DAP + ${Math.round(kRec * 0.6)} lbs KCl` });
  }
  return JSON.stringify({ result: "Calculation complete" });
}

export default function VirtualLabs() {
  const { user } = useAuth();
  const userId = user?._id;
  const labs = useQuery(api.virtualLabs.list, {});
  const mySubs = useQuery(api.virtualLabs.mySubmissions, userId ? { userId } : "skip");
  const submitLab = useMutation(api.virtualLabs.submit);

  const [selected, setSelected] = useState<string | null>(null);
  const [inputs, setInputs] = useState<Record<string, number | string | boolean>>({});
  const [result, setResult] = useState<string | null>(null);

  const activeLab = labs?.find((l) => l._id === selected);

  const handleCalculate = () => {
    if (!activeLab) return;
    const r = calculateLab(activeLab.calculationType, inputs);
    setResult(r);
  };

  const handleSubmit = async () => {
    if (!activeLab || !userId || !result) return;
    try {
      await submitLab({ userId, labId: activeLab._id, inputs: JSON.stringify(inputs), result });
      toast.success(`Lab complete! +${activeLab.pointsReward} points`);
      setSelected(null);
      setInputs({});
      setResult(null);
    } catch { toast.error("Submission failed"); }
  };

  const categories = [...new Set(labs?.map((l) => l.category) ?? [])];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <p className="text-xs text-term-green font-mono">[ok] virtual lab simulations</p>
          <h1 className="text-2xl font-bold mt-1">Interactive Labs</h1>
          <p className="text-muted-foreground font-mono text-sm">Practice real calculations with hands-on simulations</p>
        </div>

        {selected && activeLab ? (
          <div className="border border-border bg-card p-6">
            <button onClick={() => { setSelected(null); setInputs({}); setResult(null); }} className="text-xs text-term-green font-mono mb-4 hover:underline">&larr; back to labs</button>
            <h2 className="text-lg font-bold flex items-center gap-2"><FlaskConical className="w-5 h-5 text-term-green" />{activeLab.title}</h2>
            <p className="text-sm text-muted-foreground mt-1">{activeLab.description}</p>
            <div className="text-xs text-muted-foreground font-mono mt-2 flex items-center gap-2">
              <span className="px-2 py-0.5 bg-muted">{activeLab.category}</span>
              <span className="flex items-center gap-1"><Award className="w-3 h-3 text-amber-500" />{activeLab.pointsReward} pts</span>
            </div>

            <div className="border-l-2 border-term-green pl-4 mt-4 mb-6">
              <p className="text-sm text-muted-foreground">{activeLab.instructions}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {activeLab.parameters.map((p) => (
                <div key={p.name}>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">{p.label}</label>
                  {p.type === "number" ? (
                    <input type="number" min={p.min} max={p.max} step={p.step} value={String(inputs[p.name] ?? p.default)} onChange={(e) => setInputs((prev) => ({ ...prev, [p.name]: parseFloat(e.target.value) || 0 }))} className="w-full border border-border bg-background px-3 py-2 text-sm font-mono" />
                  ) : p.type === "select" ? (
                    <select value={String(inputs[p.name] ?? p.default)} onChange={(e) => setInputs((prev) => ({ ...prev, [p.name]: e.target.value }))} className="w-full border border-border bg-background px-3 py-2 text-sm font-mono">
                      {p.options?.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  ) : (
                    <label className="flex items-center gap-2 px-3 py-2 border border-border">
                      <input type="checkbox" checked={Boolean(inputs[p.name] ?? p.default)} onChange={(e) => setInputs((prev) => ({ ...prev, [p.name]: e.target.checked }))} className="accent-green-600" />
                      <span className="text-sm">Enable</span>
                    </label>
                  )}
                </div>
              ))}
            </div>

            <button onClick={handleCalculate} className="w-full py-3 border border-term-green text-term-green font-mono text-sm font-semibold hover:bg-term-green/5 transition-colors flex items-center justify-center gap-2">
              <Calculator className="w-4 h-4" />Run Calculation
            </button>

            {result && (
              <div className="mt-4 border border-term-green/40 bg-term-green/5 p-4">
                <h3 className="text-sm font-semibold text-term-green mb-3 font-mono">Results</h3>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(JSON.parse(result)).map(([key, val]) => (
                    <div key={key} className="bg-card border border-border p-3">
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{key.replace(/([A-Z])/g, " $1")}</span>
                      <p className="text-sm font-mono mt-1">{String(val)}</p>
                    </div>
                  ))}
                </div>
                <button onClick={handleSubmit} className="w-full mt-4 py-3 bg-term-green text-white font-mono text-sm font-semibold hover:bg-term-green/90 transition-colors">
                  Save & Earn {activeLab.pointsReward} Points
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {categories.map((cat) => (
              <div key={cat}>
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">{cat}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {labs?.filter((l) => l.category === cat).map((lab) => {
                    const completed = mySubs?.some((s) => s.labId === lab._id);
                    return (
                      <button key={lab._id} onClick={() => { setSelected(lab._id); setInputs(Object.fromEntries(lab.parameters.map((p) => [p.name, p.default]))); }} className="text-left border border-border bg-card p-4 hover:bg-accent/30 transition-colors">
                        <div className="flex items-center gap-2">
                          <FlaskConical className="w-4 h-4 text-term-green" />
                          <span className="text-sm font-semibold">{lab.title}</span>
                          {completed && <CheckCircle className="w-3.5 h-3.5 text-term-green ml-auto" />}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{lab.description}</p>
                        <div className="flex items-center gap-2 mt-2 text-[10px] text-muted-foreground font-mono">
                          <span>{lab.parameters.length} inputs</span>
                          <span>{lab.pointsReward} pts</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
