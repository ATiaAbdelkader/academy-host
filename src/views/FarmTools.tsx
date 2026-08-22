import { useQuery, useMutation } from "@/lib/convex-react-safe";
import { api } from "../convex/_generated/api";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import { FileText, FlaskConical, Calculator, DollarSign, Plus } from "lucide-react";
import { toast } from "sonner";

type Tab = "plans" | "soil" | "roi";

export default function FarmTools() {
  const { user } = useAuth();
  const userId = user?._id;
  const [tab, setTab] = useState<Tab>("plans");

  const plans = useQuery(api.businessPlans.myPlans, userId ? { userId } : "skip");
  const soilReports = useQuery(api.soilReports.myReports, userId ? { userId } : "skip");
  const roiCalcs = useQuery(api.roiCalculator.myCalculations, userId ? { userId } : "skip");
  const createPlan = useMutation(api.businessPlans.create);
  const createSoilReport = useMutation(api.soilReports.create);
  const createRoi = useMutation(api.roiCalculator.create);

  // Forms
  const [planForm, setPlanForm] = useState({ farmName: "", farmType: "crop", acreage: 50, location: "", crops: "Corn, Soybeans", goals: "Profitability", budget: 50000, timeline: "3 years" });
  const [soilForm, setSoilForm] = useState({ fieldName: "", location: "", soilType: "Loam", ph: 6.5, nitrogen: 40, phosphorus: 30, potassium: 150, organicMatter: 3, moisture: 25 });
  const [roiForm, setRoiForm] = useState({ cropType: "Corn", acreage: 100, seedCost: 12000, fertilizerCost: 8000, laborCost: 5000, equipmentCost: 3000, irrigationCost: 2000, otherCosts: 1000, expectedYield: 180, pricePerUnit: 450 });

  const handleCreatePlan = async () => {
    if (!userId || !planForm.farmName || !planForm.location) return toast.error("Fill in all fields");
    await createPlan({ userId, ...planForm, crops: planForm.crops.split(",").map((c) => c.trim()) });
    toast.success("Business plan generated!");
  };

  const handleCreateSoil = async () => {
    if (!userId || !soilForm.fieldName || !soilForm.location) return toast.error("Fill in all fields");
    await createSoilReport({ userId, ...soilForm });
    toast.success("Soil report generated!");
  };

  const handleCreateRoi = async () => {
    if (!userId) return;
    await createRoi({ userId, ...roiForm });
    toast.success("ROI calculation saved!");
  };

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: "plans", label: "Business Plans", icon: <FileText className="w-4 h-4" /> },
    { key: "soil", label: "Soil Reports", icon: <FlaskConical className="w-4 h-4" /> },
    { key: "roi", label: "ROI Calculator", icon: <Calculator className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <p className="text-xs text-term-green font-mono">[ok] farm planning tools</p>
          <h1 className="text-2xl font-bold mt-1">Farm Tools</h1>
          <p className="text-muted-foreground font-mono text-sm">Plan your operation, analyze soil, and calculate returns</p>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto">
          {tabs.map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)} className={`flex items-center gap-1.5 px-4 py-2 text-xs font-mono whitespace-nowrap border transition-colors ${tab === t.key ? "border-term-green bg-term-green/5 text-term-green" : "border-border hover:bg-muted"}`}>
              {t.icon}{t.label}
            </button>
          ))}
        </div>

        {tab === "plans" && (
          <div>
            <div className="border border-border bg-card p-4 mb-6">
              <h2 className="text-sm font-semibold flex items-center gap-2 mb-4"><Plus className="w-4 h-4" />New Business Plan</h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { key: "farmName", label: "Farm Name", type: "text", placeholder: "Green Valley Farm" },
                  { key: "location", label: "Location", type: "text", placeholder: "Central Iowa" },
                  { key: "acreage", label: "Acreage", type: "number", placeholder: "50" },
                  { key: "budget", label: "Budget ($)", type: "number", placeholder: "50000" },
                  { key: "crops", label: "Crops (comma-separated)", type: "text", placeholder: "Corn, Soybeans" },
                  { key: "timeline", label: "Timeline", type: "text", placeholder: "3 years" },
                ].map((f) => (
                  <div key={f.key}>
                    <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1">{f.label}</label>
                    <input type={f.type} placeholder={f.placeholder} value={String((planForm as Record<string, unknown>)[f.key] ?? "")} onChange={(e) => setPlanForm((p) => ({ ...p, [f.key]: f.type === "number" ? Number(e.target.value) : e.target.value }))} className="w-full border border-border bg-background px-3 py-2 text-sm font-mono" />
                  </div>
                ))}
              </div>
              <button onClick={handleCreatePlan} className="mt-4 w-full py-2 bg-term-green text-white text-sm font-mono font-semibold hover:bg-term-green/90">Generate Plan</button>
            </div>
            {plans?.map((p) => (
              <div key={p._id} className="border border-border bg-card p-4 mb-3">
                <h3 className="text-sm font-bold">{p.farmName}</h3>
                <p className="text-xs text-muted-foreground font-mono mt-1">{p.farmType} · {p.acreage} acres · {p.location}</p>
                <pre className="mt-3 text-xs font-mono bg-muted/50 p-3 overflow-x-auto whitespace-pre-wrap">{JSON.stringify(JSON.parse(p.generatedPlan), null, 2)}</pre>
              </div>
            ))}
          </div>
        )}

        {tab === "soil" && (
          <div>
            <div className="border border-border bg-card p-4 mb-6">
              <h2 className="text-sm font-semibold flex items-center gap-2 mb-4"><FlaskConical className="w-4 h-4" />New Soil Test Report</h2>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { key: "fieldName", label: "Field Name", type: "text" }, { key: "location", label: "Location", type: "text" },
                  { key: "soilType", label: "Soil Type", type: "select", options: ["Sandy", "Loam", "Clay", "Silt"] },
                  { key: "ph", label: "pH", type: "number" }, { key: "nitrogen", label: "N (ppm)", type: "number" },
                  { key: "phosphorus", label: "P (ppm)", type: "number" }, { key: "potassium", label: "K (ppm)", type: "number" },
                  { key: "organicMatter", label: "OM %", type: "number" }, { key: "moisture", label: "Moisture %", type: "number" },
                ].map((f) => (
                  <div key={f.key}>
                    <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1">{f.label}</label>
                    {f.type === "select" ? (
                      <select value={String((soilForm as Record<string, unknown>)[f.key] ?? "")} onChange={(e) => setSoilForm((p) => ({ ...p, [f.key]: e.target.value }))} className="w-full border border-border bg-background px-3 py-2 text-sm font-mono">
                        {f.options?.map((o) => <option key={o} value={o}>{o}</option>)}
                      </select>
                    ) : (
                      <input type={f.type} value={String((soilForm as Record<string, unknown>)[f.key] ?? "")} onChange={(e) => setSoilForm((p) => ({ ...p, [f.key]: Number(e.target.value) || 0 }))} className="w-full border border-border bg-background px-3 py-2 text-sm font-mono" />
                    )}
                  </div>
                ))}
              </div>
              <button onClick={handleCreateSoil} className="mt-4 w-full py-2 bg-term-green text-white text-sm font-mono font-semibold hover:bg-term-green/90">Generate Report</button>
            </div>
            {soilReports?.map((r) => (
              <div key={r._id} className="border border-border bg-card p-4 mb-3">
                <h3 className="text-sm font-bold">{r.fieldName}</h3>
                <p className="text-xs text-muted-foreground font-mono mt-1">pH {r.ph} · N:{r.nitrogen} · P:{r.phosphorus} · K:{r.potassium} · OM:{r.organicMatter}%</p>
                <div className="mt-3 space-y-1">
                  {JSON.parse(r.recommendations).map((rec: string, i: number) => (
                    <p key={i} className="text-xs text-muted-foreground border-l-2 border-term-green pl-2">{rec}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "roi" && (
          <div>
            <div className="border border-border bg-card p-4 mb-6">
              <h2 className="text-sm font-semibold flex items-center gap-2 mb-4"><DollarSign className="w-4 h-4" />ROI Calculator</h2>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { key: "cropType", label: "Crop", type: "select", options: ["Corn", "Soybeans", "Wheat", "Tomatoes", "Cotton"] },
                  { key: "acreage", label: "Acreage" }, { key: "seedCost", label: "Seed ($)" },
                  { key: "fertilizerCost", label: "Fertilizer ($)" }, { key: "laborCost", label: "Labor ($)" },
                  { key: "equipmentCost", label: "Equipment ($)" }, { key: "irrigationCost", label: "Irrigation ($)" },
                  { key: "otherCosts", label: "Other ($)" }, { key: "expectedYield", label: "Yield (bu/acre)" },
                  { key: "pricePerUnit", label: "Price (¢/bu)" },
                ].map((f) => (
                  <div key={f.key}>
                    <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1">{f.label}</label>
                    {f.type === "select" ? (
                      <select value={String((roiForm as Record<string, unknown>)[f.key] ?? "")} onChange={(e) => setRoiForm((p) => ({ ...p, [f.key]: e.target.value }))} className="w-full border border-border bg-background px-3 py-2 text-sm font-mono">
                        {f.options?.map((o) => <option key={o} value={o}>{o}</option>)}
                      </select>
                    ) : (
                      <input type="number" value={String((roiForm as Record<string, unknown>)[f.key] ?? "")} onChange={(e) => setRoiForm((p) => ({ ...p, [f.key]: Number(e.target.value) || 0 }))} className="w-full border border-border bg-background px-3 py-2 text-sm font-mono" />
                    )}
                  </div>
                ))}
              </div>
              <button onClick={handleCreateRoi} className="mt-4 w-full py-2 bg-term-green text-white text-sm font-mono font-semibold hover:bg-term-green/90">Calculate ROI</button>
            </div>
            {roiCalcs?.map((r) => {
              const res = JSON.parse(r.result);
              return (
                <div key={r._id} className="border border-border bg-card p-4 mb-3">
                  <h3 className="text-sm font-bold">{r.cropType} · {r.acreage} acres</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3">
                    {[
                      { label: "Total Cost", value: `$${res.totalCost?.toFixed(0)}`, color: "text-red-500" },
                      { label: "Revenue", value: `$${res.totalRevenue?.toFixed(0)}`, color: "text-term-green" },
                      { label: "Net Profit", value: `$${res.netProfit?.toFixed(0)}`, color: res.netProfit > 0 ? "text-term-green" : "text-red-500" },
                      { label: "ROI", value: `${res.roi}%`, color: res.roi > 0 ? "text-term-green" : "text-red-500" },
                    ].map((kpi) => (
                      <div key={kpi.label} className="bg-muted/50 p-2">
                        <span className="text-[10px] text-muted-foreground">{kpi.label}</span>
                        <p className={`text-sm font-mono font-bold ${kpi.color}`}>{kpi.value}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 font-mono">{res.recommendation}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
