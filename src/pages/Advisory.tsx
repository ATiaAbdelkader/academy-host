import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import { MapPin, Calendar, Sprout, Droplets, Bug, Sun, Cloud, ChevronRight } from "lucide-react";
import { toast } from "sonner";

const MONTHS = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function Advisory() {
  const { user } = useAuth();
  const userId = user?._id;
  const [showSetup, setShowSetup] = useState(false);
  const [locationForm, setLocationForm] = useState({ location: "", climateZone: "tropical" as const, soilType: "loam" });

  const profile = useQuery(api.farmAdvisory.myProfile, userId ? { userId } : "skip");
  const advisories = useQuery(api.farmAdvisory.getAdvisories, userId ? { userId, climateZone: profile?.climateZone } : "skip");
  const cropCalendar = useQuery(api.farmAdvisory.getCropCalendar, {});
  const saveLocation = useMutation(api.farmAdvisory.saveLocation);

  const handleSave = async () => {
    if (!userId || !locationForm.location) return;
    await saveLocation({ userId, ...locationForm });
    toast.success("Location saved!");
    setShowSetup(false);
  };

  const categoryIcons: Record<string, React.ReactNode> = {
    irrigation: <Droplets className="w-4 h-4 text-blue-500" />,
    planting: <Sprout className="w-4 h-4 text-term-green" />,
    pest: <Bug className="w-4 h-4 text-red-500" />,
    harvest: <Sun className="w-4 h-4 text-amber-500" />,
    soil: <Cloud className="w-4 h-4 text-amber-600" />,
    general: <Calendar className="w-4 h-4 text-gray-500" />,
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-6">
          <p className="text-xs text-term-green font-mono">[ai] hyperlocal advisory</p>
          <h1 className="text-2xl font-bold mt-1">Farm Advisory</h1>
          <p className="text-muted-foreground font-mono text-sm">Personalized advice based on your location and climate zone</p>
        </div>

        {/* Location Card */}
        <div className="border border-border bg-card p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-term-green" />
              <div>
                <p className="text-sm font-bold font-mono">{profile?.location || "No location set"}</p>
                <p className="text-[10px] text-muted-foreground font-mono uppercase">{profile?.climateZone || "Set your climate zone for personalized advice"}</p>
              </div>
            </div>
            <button onClick={() => setShowSetup(!showSetup)} className="px-3 py-1.5 border border-border text-xs font-mono hover:bg-muted">{showSetup ? "Cancel" : "Update"}</button>
          </div>

          {showSetup && (
            <div className="mt-4 pt-4 border-t border-border grid grid-cols-3 gap-3">
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Location</label>
                <input value={locationForm.location} onChange={(e) => setLocationForm((p) => ({ ...p, location: e.target.value }))} placeholder="e.g. Kampala, Uganda" className="w-full border border-border bg-background px-3 py-2 text-sm font-mono" />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Climate Zone</label>
                <select value={locationForm.climateZone} onChange={(e) => setLocationForm((p) => ({ ...p, climateZone: e.target.value as typeof p.climateZone }))} className="w-full border border-border bg-background px-3 py-2 text-sm font-mono">
                  <option value="tropical">Tropical</option><option value="temperate">Temperate</option><option value="arid">Arid</option><option value="equatorial">Equatorial</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Soil Type</label>
                <select value={locationForm.soilType} onChange={(e) => setLocationForm((p) => ({ ...p, soilType: e.target.value }))} className="w-full border border-border bg-background px-3 py-2 text-sm font-mono">
                  <option value="loam">Loam</option><option value="sandy">Sandy</option><option value="clay">Clay</option><option value="silt">Silt</option>
                </select>
              </div>
              <button onClick={handleSave} className="col-span-3 py-2 bg-term-green text-white text-sm font-mono font-semibold hover:bg-term-green/90">Save Location</button>
            </div>
          )}
        </div>

        {/* Current Month Tips */}
        {advisories && (
          <>
            <div className="mb-6">
              <h2 className="text-sm font-semibold flex items-center gap-2 mb-3">
                <Calendar className="w-4 h-4" />
                {MONTHS[advisories.currentMonth]} Advisory — {advisories.zone.charAt(0).toUpperCase() + advisories.zone.slice(1)} Zone
              </h2>
              <div className="space-y-2">
                {advisories.currentTips.map((tip, i) => (
                  <div key={i} className="border border-border bg-card p-3 flex items-start gap-3">
                    {categoryIcons[tip.category] || categoryIcons.general}
                    <div>
                      <span className="text-[10px] font-mono uppercase text-muted-foreground">{tip.category}</span>
                      <p className="text-sm font-mono mt-0.5">{tip.advice}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Month Preview */}
            <div className="mb-6">
              <h2 className="text-sm font-semibold flex items-center gap-2 mb-3">
                <ChevronRight className="w-4 h-4" />
                {MONTHS[((advisories.currentMonth % 12) + 1)]} Preview
              </h2>
              <div className="space-y-2">
                {advisories.nextTips.map((tip, i) => (
                  <div key={i} className="border border-border/50 bg-card/50 p-3 flex items-start gap-3">
                    {categoryIcons[tip.category] || categoryIcons.general}
                    <div>
                      <span className="text-[10px] font-mono uppercase text-muted-foreground">{tip.category}</span>
                      <p className="text-sm font-mono mt-0.5">{tip.advice}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Crop Calendar */}
        {cropCalendar && (
          <div className="border border-border bg-card p-4">
            <h2 className="text-sm font-semibold flex items-center gap-2 mb-3"><Sprout className="w-4 h-4" />Crop Calendar</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono">
                <thead>
                  <tr className="text-muted-foreground">
                    <th className="text-left p-2">Crop</th>
                    <th className="text-left p-2">Plant</th>
                    <th className="text-left p-2">Harvest</th>
                    <th className="text-left p-2">Days</th>
                    <th className="text-left p-2">Water</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(cropCalendar).map(([crop, info]) => (
                    <tr key={crop} className="border-t border-border/50">
                      <td className="p-2 font-bold capitalize">{crop}</td>
                      <td className="p-2">{info.plantMonths.map((m) => MONTHS[m]?.slice(0, 3)).join(", ")}</td>
                      <td className="p-2">{info.harvestMonths.map((m) => MONTHS[m]?.slice(0, 3)).join(", ")}</td>
                      <td className="p-2">{info.daysToHarvest}d</td>
                      <td className="p-2">{info.waterNeeds}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
