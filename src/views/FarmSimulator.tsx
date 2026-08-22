import { useQuery, useMutation } from "@/lib/convex-react-safe";
import { api } from "../convex/_generated/api";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import { Tractor, Sprout, Droplets, Bug, Sun, CloudRain, TrendingUp, DollarSign, Plus, ChevronRight } from "lucide-react";
import { toast } from "sonner";

type Tab = "overview" | "farm" | "actions" | "logs";

const CROPS = [
  { name: "Tomatoes", seedCost: 500, fertCost: 300, laborCost: 200, season: "Warm" },
  { name: "Maize", seedCost: 300, fertCost: 400, laborCost: 150, season: "Warm" },
  { name: "Beans", seedCost: 200, fertCost: 200, laborCost: 100, season: "Any" },
  { name: "Lettuce", seedCost: 400, fertCost: 150, laborCost: 150, season: "Cool" },
  { name: "Potatoes", seedCost: 600, fertCost: 350, laborCost: 250, season: "Cool" },
  { name: "Cassava", seedCost: 150, fertCost: 100, laborCost: 100, season: "Tropical" },
  { name: "Rice", seedCost: 500, fertCost: 500, laborCost: 300, season: "Wet" },
  { name: "Cabbage", seedCost: 350, fertCost: 250, laborCost: 200, season: "Cool" },
];

const ACTIONS = [
  { id: "irrigate", name: "Irrigate", icon: Droplets, cost: 200, desc: "Add water to fields" },
  { id: "pest_control", name: "Pest Control", icon: Bug, cost: 500, desc: "Spray for pests" },
  { id: "fertilize", name: "Fertilize", icon: Sprout, cost: 400, desc: "Boost soil nutrients" },
  { id: "soil_amendment", name: "Soil Amendment", icon: TrendingUp, cost: 600, desc: "Improve soil structure" },
  { id: "mulch", name: "Mulch", icon: Sun, cost: 150, desc: "Retain moisture & suppress weeds" },
  { id: "harvest", name: "Harvest", icon: DollarSign, cost: 0, desc: "Collect mature crops" },
];

const MONTHS = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const SEASONS = ["", "Spring", "Summer", "Autumn", "Winter"];

export default function FarmSimulator() {
  const { user } = useAuth();
  const userId = user?._id;
  const [tab, setTab] = useState<Tab>("overview");
  const [showCreate, setShowCreate] = useState(false);

  const farms = useQuery(api.farmSimulator.myFarms, userId ? { userId } : "skip");
  const activeFarmId = farms?.[0]?._id;
  const farm = useQuery(api.farmSimulator.getFarm, activeFarmId ? { farmId: activeFarmId } : "skip");

  const createFarm = useMutation(api.farmSimulator.createFarm);
  const plantCrop = useMutation(api.farmSimulator.plantCrop);
  const advanceMonth = useMutation(api.farmSimulator.advanceMonth);
  const applyAction = useMutation(api.farmSimulator.applyAction);

  const [createForm, setCreateForm] = useState({
    farmName: "My Farm", landSize: 10, soilType: "loam" as const, climateZone: "tropical", startingBudget: 500000, waterSource: "rainfed" as const,
  });

  const handleCreate = async () => {
    if (!userId) return;
    await createFarm({ userId, ...createForm });
    toast.success("Farm created! Start planting.");
    setShowCreate(false);
  };

  const handlePlant = async (crop: typeof CROPS[0]) => {
    if (!activeFarmId) return;
    await plantCrop({ farmId: activeFarmId, cropName: crop.name, seedCost: crop.seedCost, fertilizerCost: crop.fertCost, laborCost: crop.laborCost });
    toast.success(`Planted ${crop.name}!`);
  };

  const handleAdvance = async () => {
    if (!activeFarmId) return;
    await advanceMonth({ farmId: activeFarmId });
    toast.success("Time advanced by 1 month!");
  };

  const handleAction = async (actionId: string, cost: number) => {
    if (!activeFarmId) return;
    try {
      await applyAction({ farmId: activeFarmId, action: actionId as "irrigate" | "pest_control" | "fertilize" | "soil_amendment" | "mulch" | "harvest", cost });
      toast.success("Action applied!");
    } catch (e: unknown) {
      toast.error((e as Error).message);
    }
  };

  if (!farms || farms.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-6">
            <p className="text-xs text-term-green font-mono">[system] virtual farm simulator</p>
            <h1 className="text-2xl font-bold mt-1">Farm Simulator</h1>
            <p className="text-muted-foreground font-mono text-sm">Manage a realistic virtual farm through seasons</p>
          </div>

          <div className="border border-border bg-card p-8 text-center">
            <Tractor className="w-16 h-16 mx-auto text-term-green/40 mb-4" />
            <h2 className="text-lg font-bold mb-2">No Farm Yet</h2>
            <p className="text-sm text-muted-foreground mb-6 font-mono">Create your virtual farm and start learning by doing.</p>
            
            {showCreate ? (
              <div className="max-w-md mx-auto text-left space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Farm Name</label>
                    <input value={createForm.farmName} onChange={(e) => setCreateForm((p) => ({ ...p, farmName: e.target.value }))} className="w-full border border-border bg-background px-3 py-2 text-sm font-mono" />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Land (acres)</label>
                    <input type="number" value={createForm.landSize} onChange={(e) => setCreateForm((p) => ({ ...p, landSize: Number(e.target.value) }))} className="w-full border border-border bg-background px-3 py-2 text-sm font-mono" />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Soil Type</label>
                    <select value={createForm.soilType} onChange={(e) => setCreateForm((p) => ({ ...p, soilType: e.target.value as typeof p.soilType }))} className="w-full border border-border bg-background px-3 py-2 text-sm font-mono">
                      <option value="loam">Loam</option><option value="sandy">Sandy</option><option value="clay">Clay</option><option value="silt">Silt</option><option value="peat">Peat</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Climate</label>
                    <select value={createForm.climateZone} onChange={(e) => setCreateForm((p) => ({ ...p, climateZone: e.target.value }))} className="w-full border border-border bg-background px-3 py-2 text-sm font-mono">
                      <option value="tropical">Tropical</option><option value="temperate">Temperate</option><option value="arid">Arid</option><option value="equatorial">Equatorial</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={handleCreate} className="flex-1 py-2 bg-term-green text-white text-sm font-mono font-semibold hover:bg-term-green/90">Create Farm</button>
                  <button onClick={() => setShowCreate(false)} className="px-4 py-2 border border-border text-sm font-mono hover:bg-muted">Cancel</button>
                </div>
              </div>
            ) : (
              <button onClick={() => setShowCreate(true)} className="px-6 py-3 bg-term-green text-white text-sm font-mono font-semibold hover:bg-term-green/90">
                <Plus className="w-4 h-4 inline mr-2" />Create Your Farm
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs text-term-green font-mono">[system] virtual farm simulator</p>
            <h1 className="text-2xl font-bold mt-1">{farm?.farmName || "My Farm"}</h1>
          </div>
          <button onClick={handleAdvance} className="flex items-center gap-1.5 px-4 py-2 bg-amber-500/10 border border-amber-500/30 text-amber-700 text-xs font-mono font-semibold hover:bg-amber-500/20">
            <ChevronRight className="w-4 h-4" />Advance Month
          </button>
        </div>

        {/* Status Bar */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2 mb-6">
          {[
            { label: "Month", value: `${MONTHS[farm?.month || 1]} ${farm?.year || 2026}`, icon: Sun },
            { label: "Season", value: SEASONS[farm?.season || 1], icon: CloudRain },
            { label: "Budget", value: `$${((farm?.currentBudget || 0) / 100).toFixed(0)}`, icon: DollarSign },
            { label: "Soil Health", value: `${farm?.soilHealth || 0}%`, icon: Sprout },
            { label: "Crop", value: farm?.activeCrop || "None", icon: Tractor },
            { label: "Stage", value: farm?.cropStage || "Idle", icon: TrendingUp },
          ].map((s) => (
            <div key={s.label} className="border border-border bg-card p-2.5">
              <div className="flex items-center gap-1.5">
                <s.icon className="w-3 h-3 text-term-green" />
                <span className="text-[10px] text-muted-foreground font-mono">{s.label}</span>
              </div>
              <p className="text-sm font-mono font-bold mt-0.5">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {([
            { key: "overview", label: "Overview" },
            { key: "farm", label: "Plant Crops" },
            { key: "actions", label: "Farm Actions" },
            { key: "logs", label: "Activity Log" },
          ] as { key: Tab; label: string }[]).map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)} className={`px-4 py-2 text-xs font-mono whitespace-nowrap border transition-colors ${tab === t.key ? "border-term-green bg-term-green/5 text-term-green" : "border-border hover:bg-muted"}`}>{t.label}</button>
          ))}
        </div>

        {tab === "overview" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "Total Earned", value: `$${((farm?.totalEarnings || 0) / 100).toFixed(0)}`, color: "text-term-green" },
                { label: "Total Spent", value: `$${((farm?.totalSpent || 0) / 100).toFixed(0)}`, color: "text-red-500" },
                { label: "Crops Harvested", value: String(farm?.cropsHarvested || 0), color: "text-term-green" },
                { label: "Reputation", value: String(farm?.reputation || 0), color: "text-amber-600" },
              ].map((kpi) => (
                <div key={kpi.label} className="border border-border bg-card p-3">
                  <span className="text-[10px] text-muted-foreground font-mono">{kpi.label}</span>
                  <p className={`text-lg font-mono font-bold mt-1 ${kpi.color}`}>{kpi.value}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="border border-border bg-card p-3">
                <span className="text-[10px] text-muted-foreground font-mono">Soil Moisture</span>
                <div className="w-full bg-muted h-2 mt-2 rounded"><div className="bg-blue-500 h-2 rounded" style={{ width: `${farm?.soilMoisture || 0}%` }} /></div>
                <span className="text-xs font-mono">{farm?.soilMoisture || 0}%</span>
              </div>
              <div className="border border-border bg-card p-3">
                <span className="text-[10px] text-muted-foreground font-mono">Pest Pressure</span>
                <div className="w-full bg-muted h-2 mt-2 rounded"><div className="bg-red-500 h-2 rounded" style={{ width: `${farm?.pestPressure || 0}%` }} /></div>
                <span className="text-xs font-mono">{farm?.pestPressure || 0}%</span>
              </div>
            </div>
          </div>
        )}

        {tab === "farm" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {CROPS.map((crop) => (
              <div key={crop.name} className="border border-border bg-card p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold font-mono">{crop.name}</h3>
                    <p className="text-[10px] text-muted-foreground font-mono mt-1">Season: {crop.season}</p>
                    <p className="text-[10px] text-muted-foreground font-mono">Cost: ${((crop.seedCost + crop.fertCost + crop.laborCost) / 100).toFixed(2)}</p>
                  </div>
                  <button onClick={() => handlePlant(crop)} disabled={!!farm?.activeCrop} className="px-3 py-1.5 bg-term-green text-white text-xs font-mono font-semibold hover:bg-term-green/90 disabled:opacity-50 disabled:cursor-not-allowed">
                    Plant
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "actions" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {ACTIONS.map((action) => (
              <div key={action.id} className="border border-border bg-card p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <action.icon className="w-5 h-5 text-term-green" />
                    <div>
                      <h3 className="text-sm font-bold font-mono">{action.name}</h3>
                      <p className="text-[10px] text-muted-foreground font-mono">{action.desc}</p>
                    </div>
                  </div>
                  <button onClick={() => handleAction(action.id, action.cost)} disabled={action.cost > (farm?.currentBudget || 0)} className="px-3 py-1.5 bg-term-green text-white text-xs font-mono font-semibold hover:bg-term-green/90 disabled:opacity-50">
                    ${action.cost > 0 ? (action.cost / 100).toFixed(2) : "Free"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "logs" && (
          <div className="space-y-2">
            {(farm?.logs || []).slice().reverse().map((log, i) => (
              <div key={i} className="border border-border bg-card p-3 flex items-start gap-3">
                <div className={`w-2 h-2 mt-1.5 rounded-full flex-shrink-0 ${log.type === "harvest" ? "bg-term-green" : log.type === "planting" ? "bg-blue-500" : log.type === "action" ? "bg-amber-500" : "bg-gray-400"}`} />
                <div>
                  <p className="text-sm font-mono">{log.message}</p>
                  <p className="text-[10px] text-muted-foreground font-mono">{new Date(log.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
