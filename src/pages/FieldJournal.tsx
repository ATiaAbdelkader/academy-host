import { useState } from "react";
import { useQuery, useMutation } from "@/lib/convex-react-safe";
import { api } from "@/convex/_generated/api";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import {
  Plus,
  MapPin,
  Droplets,
  Thermometer,
  Leaf,
  Cloud,
  Trash2,
  Edit3,
  X,
} from "lucide-react";

export default function FieldJournal() {
  const entries = useQuery(api.fieldJournal.myEntries);
  const createEntry = useMutation(api.fieldJournal.create);
  const updateEntry = useMutation(api.fieldJournal.update);
  const deleteEntry = useMutation(api.fieldJournal.remove);

  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    location: "",
    date: Date.now(),
    soilType: "",
    moisture: "" as string | number,
    temperature: "" as string | number,
    ph: "" as string | number,
    notes: "",
    cropStage: "",
    weather: "",
    actions: [] as string[],
  });
  const [newAction, setNewAction] = useState("");

  const resetForm = () => {
    setForm({
      title: "",
      location: "",
      date: Date.now(),
      soilType: "",
      moisture: "",
      temperature: "",
      ph: "",
      notes: "",
      cropStage: "",
      weather: "",
      actions: [],
    });
    setIsCreating(false);
    setEditingId(null);
  };

  const handleCreate = async () => {
    if (!form.title || !form.location || !form.notes) return;
    await createEntry({
      title: form.title,
      location: form.location,
      date: form.date,
      soilType: form.soilType || undefined,
      moisture: form.moisture !== "" ? Number(form.moisture) : undefined,
      temperature:
        form.temperature !== "" ? Number(form.temperature) : undefined,
      ph: form.ph !== "" ? Number(form.ph) : undefined,
      notes: form.notes,
      cropStage: form.cropStage || undefined,
      weather: form.weather || undefined,
      actions: form.actions.length > 0 ? form.actions : undefined,
    });
    resetForm();
  };

  const handleUpdate = async () => {
    if (!editingId || !form.title || !form.location || !form.notes) return;
    await updateEntry({
      entryId: editingId as any,
      title: form.title,
      location: form.location,
      date: form.date,
      soilType: form.soilType || undefined,
      moisture: form.moisture !== "" ? Number(form.moisture) : undefined,
      temperature:
        form.temperature !== "" ? Number(form.temperature) : undefined,
      ph: form.ph !== "" ? Number(form.ph) : undefined,
      notes: form.notes,
      cropStage: form.cropStage || undefined,
      weather: form.weather || undefined,
      actions: form.actions.length > 0 ? form.actions : undefined,
    });
    resetForm();
  };

  const startEdit = (entry: any) => {
    setForm({
      title: entry.title,
      location: entry.location,
      date: entry.date,
      soilType: entry.soilType ?? "",
      moisture: entry.moisture ?? "",
      temperature: entry.temperature ?? "",
      ph: entry.ph ?? "",
      notes: entry.notes,
      cropStage: entry.cropStage ?? "",
      weather: entry.weather ?? "",
      actions: entry.actions ?? [],
    });
    setEditingId(entry._id);
    setIsCreating(true);
  };

  const addAction = () => {
    if (newAction.trim()) {
      setForm((f) => ({ ...f, actions: [...f.actions, newAction.trim()] }));
      setNewAction("");
    }
  };

  const soilTypes = [
    "Sandy",
    "Clay",
    "Loam",
    "Silt",
    "Peat",
    "Chalk",
    "Red",
    "Black",
    "Alluvial",
  ];
  const cropStages = [
    "Seedling",
    "Vegetative",
    "Flowering",
    "Fruiting",
    "Maturity",
    "Harvest",
    "Dormant",
  ];
  const weatherOptions = [
    "Sunny",
    "Partly Cloudy",
    "Cloudy",
    "Rainy",
    "Stormy",
    "Windy",
    "Foggy",
    "Hot",
    "Cold",
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <AppHeader path="~/field-journal" />
      <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
        <p className="text-xs text-term-green">
          [ok] field journal — agricultural observation log
        </p>
        <div className="mt-3 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Field Journal</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Log soil readings, crop conditions, and field observations. Build
              a personal knowledge base from your practical experience.
            </p>
          </div>
          <Button
            onClick={() => {
              resetForm();
              setIsCreating(true);
            }}
            className="gap-2"
          >
            <Plus className="size-4" />
            New Entry
          </Button>
        </div>

        {isCreating && (
          <div className="mt-6 border border-border bg-card p-6">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h2 className="text-sm font-semibold">
                {editingId ? "Edit Entry" : "New Field Observation"}
              </h2>
              <Button variant="ghost" size="sm" onClick={resetForm}>
                <X className="size-4" />
              </Button>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="text-xs text-muted-foreground">
                  Title *
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, title: e.target.value }))
                  }
                  placeholder="e.g., Soil pH test in North Field"
                  className="mt-1 w-full border border-border bg-background px-3 py-2 text-sm font-mono"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">
                  Location *
                </label>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, location: e.target.value }))
                  }
                  placeholder="e.g., North Field, Plot A"
                  className="mt-1 w-full border border-border bg-background px-3 py-2 text-sm font-mono"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Date</label>
                <input
                  type="date"
                  value={new Date(form.date).toISOString().split("T")[0]}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      date: new Date(e.target.value).getTime(),
                    }))
                  }
                  className="mt-1 w-full border border-border bg-background px-3 py-2 text-sm font-mono"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">
                  Soil Type
                </label>
                <select
                  value={form.soilType}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, soilType: e.target.value }))
                  }
                  className="mt-1 w-full border border-border bg-background px-3 py-2 text-sm font-mono"
                >
                  <option value="">Select...</option>
                  {soilTypes.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">
                  Moisture (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={form.moisture}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, moisture: e.target.value }))
                  }
                  placeholder="0-100"
                  className="mt-1 w-full border border-border bg-background px-3 py-2 text-sm font-mono"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">
                  Temperature (°C)
                </label>
                <input
                  type="number"
                  value={form.temperature}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, temperature: e.target.value }))
                  }
                  placeholder="e.g., 25"
                  className="mt-1 w-full border border-border bg-background px-3 py-2 text-sm font-mono"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">
                  Soil pH
                </label>
                <input
                  type="number"
                  min="0"
                  max="14"
                  step="0.1"
                  value={form.ph}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, ph: e.target.value }))
                  }
                  placeholder="0-14"
                  className="mt-1 w-full border border-border bg-background px-3 py-2 text-sm font-mono"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">
                  Weather
                </label>
                <select
                  value={form.weather}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, weather: e.target.value }))
                  }
                  className="mt-1 w-full border border-border bg-background px-3 py-2 text-sm font-mono"
                >
                  <option value="">Select...</option>
                  {weatherOptions.map((w) => (
                    <option key={w} value={w}>
                      {w}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">
                  Crop Stage
                </label>
                <select
                  value={form.cropStage}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, cropStage: e.target.value }))
                  }
                  className="mt-1 w-full border border-border bg-background px-3 py-2 text-sm font-mono"
                >
                  <option value="">Select...</option>
                  {cropStages.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="text-xs text-muted-foreground">
                  Observations *
                </label>
                <textarea
                  value={form.notes}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, notes: e.target.value }))
                  }
                  placeholder="Describe what you observed in the field..."
                  rows={3}
                  className="mt-1 w-full border border-border bg-background px-3 py-2 text-sm font-mono"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-xs text-muted-foreground">
                  Action Items
                </label>
                <div className="mt-1 flex gap-2">
                  <input
                    type="text"
                    value={newAction}
                    onChange={(e) => setNewAction(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addAction())
                    }
                    placeholder="Add action item..."
                    className="flex-1 border border-border bg-background px-3 py-2 text-sm font-mono"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addAction}
                  >
                    Add
                  </Button>
                </div>
                {form.actions.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {form.actions.map((a, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 border border-border bg-muted px-2 py-0.5 text-xs"
                      >
                        {a}
                        <button
                          onClick={() =>
                            setForm((f) => ({
                              ...f,
                              actions: f.actions.filter((_, j) => j !== i),
                            }))
                          }
                          className="ml-1 text-muted-foreground hover:text-foreground"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <Button variant="outline" onClick={resetForm}>
                Cancel
              </Button>
              <Button onClick={editingId ? handleUpdate : handleCreate}>
                {editingId ? "Update Entry" : "Save Entry"}
              </Button>
            </div>
          </div>
        )}

        <div className="mt-6 space-y-3">
          {entries === undefined && (
            <div className="border border-border bg-card p-8 text-center text-sm text-muted-foreground">
              Loading journal entries...
            </div>
          )}
          {entries?.length === 0 && !isCreating && (
            <div className="border border-border bg-card p-12 text-center">
              <Leaf className="mx-auto size-8 text-muted-foreground" />
              <p className="mt-4 text-sm">No field observations yet.</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Start logging your field observations to build a practical
                knowledge base.
              </p>
              <Button
                className="mt-4 gap-2"
                onClick={() => {
                  resetForm();
                  setIsCreating(true);
                }}
              >
                <Plus className="size-4" />
                Create First Entry
              </Button>
            </div>
          )}
          {entries?.map((entry) => (
            <div
              key={entry._id}
              className="border border-border bg-card p-4 transition-colors hover:bg-accent/30"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold">{entry.title}</h3>
                    <span className="border border-border bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
                      {new Date(entry.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="size-3" />
                      {entry.location}
                    </span>
                    {entry.weather && (
                      <span className="flex items-center gap-1">
                        <Cloud className="size-3" />
                        {entry.weather}
                      </span>
                    )}
                    {entry.cropStage && (
                      <span className="flex items-center gap-1">
                        <Leaf className="size-3" />
                        {entry.cropStage}
                      </span>
                    )}
                  </div>
                  {(entry.moisture != null ||
                    entry.temperature != null ||
                    entry.ph != null) && (
                    <div className="mt-2 flex gap-3">
                      {entry.moisture != null && (
                        <span className="flex items-center gap-1 text-xs">
                          <Droplets className="size-3 text-blue-500" />
                          {entry.moisture}%
                        </span>
                      )}
                      {entry.temperature != null && (
                        <span className="flex items-center gap-1 text-xs">
                          <Thermometer className="size-3 text-red-500" />
                          {entry.temperature}°C
                        </span>
                      )}
                      {entry.ph != null && (
                        <span className="text-xs font-mono">
                          pH {entry.ph}
                        </span>
                      )}
                    </div>
                  )}
                  <p className="mt-2 text-sm text-muted-foreground">
                    {entry.notes}
                  </p>
                  {entry.actions && entry.actions.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {entry.actions.map((a, i) => (
                        <span
                          key={i}
                          className="border border-term-amber/30 bg-term-amber/10 px-1.5 py-0.5 text-[10px] text-term-amber"
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => startEdit(entry)}
                    className="h-7 w-7 p-0"
                  >
                    <Edit3 className="size-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      deleteEntry({ entryId: entry._id as any })
                    }
                    className="h-7 w-7 p-0 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="size-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          [ok] {entries?.length ?? 0} observation
          {(entries?.length ?? 0) !== 1 ? "s" : ""} logged — keep building
          your field knowledge base
        </p>
      </div>
    </main>
  );
}
