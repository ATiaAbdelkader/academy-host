import { useQuery, useMutation } from "@/lib/convex-react-safe";
import { api } from "../convex/_generated/api";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import { TrendingUp, Plus, Calendar, Wheat, DollarSign, MapPin, ArrowLeft, BarChart3 } from "lucide-react";
import { toast } from "sonner";

export default function FarmProgress() {
  const { user } = useAuth();
  const timeline = useQuery(api.farmProgress.myTimeline);
  const summary = useQuery(api.farmProgress.mySummary);
  const logEntry = useMutation(api.farmProgress.logEntry);

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    season: "Spring 2025",
    crop: "",
    fieldSize: "",
    notes: "",
    location: "",
    soilType: "",
    outcome: "",
    yieldKg: "",
    revenue: "",
    coursesApplied: "",
    weather: "",
  });

  const handleLog = async () => {
    if (!form.crop || !form.notes) {
      toast.error("Crop and notes are required");
      return;
    }
    await logEntry({
      season: form.season,
      crop: form.crop,
      fieldSize: form.fieldSize,
      notes: form.notes,
      location: form.location || undefined,
      soilType: form.soilType || undefined,
      outcome: form.outcome || undefined,
      yieldKg: form.yieldKg ? parseFloat(form.yieldKg) : undefined,
      revenue: form.revenue ? parseFloat(form.revenue) : undefined,
      coursesApplied: form.coursesApplied ? form.coursesApplied.split(",").map((s) => s.trim()) : undefined,
      weather: form.weather || undefined,
    });
    toast.success("Progress logged!");
    setShowForm(false);
    setForm({ season: "Spring 2025", crop: "", fieldSize: "", notes: "", location: "", soilType: "", outcome: "", yieldKg: "", revenue: "", coursesApplied: "", weather: "" });
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg,#fafaf8)] font-mono">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-6 h-6 text-[var(--color-primary,#16a34a)]" />
          <h1 className="text-2xl font-bold tracking-tight">Farm Progress Tracker</h1>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <Calendar className="w-5 h-5 text-blue-500 mx-auto mb-1" />
            <div className="text-xl font-bold">{summary?.totalEntries ?? 0}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">Entries</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <BarChart3 className="w-5 h-5 text-purple-500 mx-auto mb-1" />
            <div className="text-xl font-bold">{summary?.seasons ?? 0}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">Seasons</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <Wheat className="w-5 h-5 text-amber-500 mx-auto mb-1" />
            <div className="text-xl font-bold">{summary?.totalYield ?? 0}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">Yield (kg)</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <DollarSign className="w-5 h-5 text-green-500 mx-auto mb-1" />
            <div className="text-xl font-bold">${summary?.totalRevenue ?? 0}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">Revenue</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <MapPin className="w-5 h-5 text-red-500 mx-auto mb-1" />
            <div className="text-xl font-bold">{summary?.crops?.length ?? 0}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">Crops</div>
          </div>
        </div>

        {/* Log Entry Button */}
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-[var(--color-primary,#16a34a)] text-white px-4 py-2 rounded text-sm font-bold hover:bg-green-700 transition-colors mb-4"
        >
          <Plus className="w-4 h-4 inline mr-1" /> Log Farm Progress
        </button>

        {showForm && (
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Season</label>
                <input value={form.season} onChange={(e) => setForm({ ...form, season: e.target.value })} className="w-full border border-gray-200 rounded px-3 py-2 text-sm font-mono focus:outline-none focus:border-green-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Crop *</label>
                <input value={form.crop} onChange={(e) => setForm({ ...form, crop: e.target.value })} className="w-full border border-gray-200 rounded px-3 py-2 text-sm font-mono focus:outline-none focus:border-green-500" placeholder="e.g. Maize" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Field Size</label>
                <input value={form.fieldSize} onChange={(e) => setForm({ ...form, fieldSize: e.target.value })} className="w-full border border-gray-200 rounded px-3 py-2 text-sm font-mono focus:outline-none focus:border-green-500" placeholder="e.g. 2 acres" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Yield (kg)</label>
                <input value={form.yieldKg} onChange={(e) => setForm({ ...form, yieldKg: e.target.value })} className="w-full border border-gray-200 rounded px-3 py-2 text-sm font-mono focus:outline-none focus:border-green-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Revenue ($)</label>
                <input value={form.revenue} onChange={(e) => setForm({ ...form, revenue: e.target.value })} className="w-full border border-gray-200 rounded px-3 py-2 text-sm font-mono focus:outline-none focus:border-green-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Courses Applied</label>
                <input value={form.coursesApplied} onChange={(e) => setForm({ ...form, coursesApplied: e.target.value })} className="w-full border border-gray-200 rounded px-3 py-2 text-sm font-mono focus:outline-none focus:border-green-500" placeholder="Comma-separated" />
              </div>
            </div>
            <div className="mb-3">
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Notes *</label>
              <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="w-full border border-gray-200 rounded px-3 py-2 text-sm font-mono h-24 focus:outline-none focus:border-green-500" placeholder="What happened this season?" />
            </div>
            <button onClick={handleLog} className="bg-green-600 text-white px-4 py-2 rounded text-sm font-bold hover:bg-green-700">
              Save Progress
            </button>
          </div>
        )}

        {/* Timeline */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
            <h2 className="font-bold text-sm uppercase tracking-wider">Progress Timeline</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {timeline && timeline.length > 0 ? (
              timeline.map((entry) => (
                <div key={entry._id} className="px-4 py-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-sm">{entry.crop}</span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">{entry.season}</span>
                    {entry.yieldKg && <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">{entry.yieldKg} kg</span>}
                    {entry.revenue && <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">${entry.revenue}</span>}
                  </div>
                  <div className="text-xs text-gray-500 mb-1">{new Date(entry.date).toLocaleDateString()} · {entry.fieldSize}</div>
                  <div className="text-sm text-gray-700">{entry.notes}</div>
                  {entry.coursesApplied && entry.coursesApplied.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {entry.coursesApplied.map((c, i) => (
                        <span key={i} className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">{c}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="px-4 py-8 text-center text-gray-500 text-sm">
                No entries yet. Log your first farm progress above!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
