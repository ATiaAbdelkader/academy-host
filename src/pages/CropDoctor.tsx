"use client";
import Link from "next/link";
import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import { Camera, Search, AlertTriangle, CheckCircle, BookOpen, Stethoscope } from "lucide-react";
import { toast } from "sonner";

export default function CropDoctor() {
  const { user } = useAuth();
  const userId = user?._id;
  const [symptoms, setSymptoms] = useState("");
  const [cropType, setCropType] = useState("tomato");
  const [diagnosing, setDiagnosing] = useState(false);

  const quickCheck = useQuery(api.cropDoctor.quickCheck, symptoms.length > 10 ? { symptoms } : "skip");
  const diagnose = useMutation(api.cropDoctor.diagnose);
  const history = useQuery(api.cropDoctor.myDiagnoses, userId ? { userId } : "skip");

  const [result, setResult] = useState<null | { diagnosis: string; confidence: number; severity: string; treatment: string; relatedCourseSlug: string }>(null);

  const handleDiagnose = async () => {
    if (!userId || !symptoms) return toast.error("Describe the symptoms first");
    setDiagnosing(true);
    try {
      const res = await diagnose({ userId, cropType, symptoms });
      if (res) {
        setResult({
          diagnosis: res.diagnosis,
          confidence: res.confidence,
          severity: res.severity,
          treatment: res.treatment,
          relatedCourseSlug: res.relatedCourseSlug,
        });
        toast.success("Diagnosis complete!");
      }
    } catch {
      toast.error("Diagnosis failed. Try again.");
    }
    setDiagnosing(false);
  };

  const severityColors = { low: "text-amber-600 bg-amber-50 border-amber-200", medium: "text-orange-600 bg-orange-50 border-orange-200", high: "text-red-600 bg-red-50 border-red-200", info: "text-blue-600 bg-blue-50 border-blue-200" };
  const severityIcons = { low: AlertTriangle, medium: AlertTriangle, high: AlertTriangle, info: Search };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <p className="text-xs text-term-green font-mono">[ai] crop doctor</p>
          <h1 className="text-2xl font-bold mt-1">AI Crop Doctor</h1>
          <p className="text-muted-foreground font-mono text-sm">Describe symptoms or upload a photo for instant diagnosis</p>
        </div>

        {/* Diagnosis Form */}
        <div className="border border-border bg-card p-4 mb-6">
          <h2 className="text-sm font-semibold flex items-center gap-2 mb-4"><Stethoscope className="w-4 h-4" />New Diagnosis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Crop Type</label>
              <select value={cropType} onChange={(e) => setCropType(e.target.value)} className="w-full border border-border bg-background px-3 py-2 text-sm font-mono">
                {["tomato", "maize", "beans", "potato", "cabbage", "rice", "cassava", "lettuce", "other"].map((c) => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Photo (optional)</label>
              <div className="w-full border border-dashed border-border bg-background px-3 py-2 text-sm font-mono text-muted-foreground flex items-center gap-2">
                <Camera className="w-4 h-4" />Upload photo (coming soon)
              </div>
            </div>
          </div>
          <div className="mb-3">
            <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Describe Symptoms</label>
            <textarea value={symptoms} onChange={(e) => setSymptoms(e.target.value)} rows={3} placeholder="e.g. Dark spots on lower leaves, yellowing around spots, leaf curling..." className="w-full border border-border bg-background px-3 py-2 text-sm font-mono resize-none" />
          </div>
          <button onClick={handleDiagnose} disabled={!symptoms || diagnosing} className="w-full py-2 bg-term-green text-white text-sm font-mono font-semibold hover:bg-term-green/90 disabled:opacity-50">
            {diagnosing ? "Diagnosing..." : "Diagnose Now"}
          </button>
        </div>

        {/* Real-time quick check */}
        {quickCheck && symptoms.length > 10 && (
          <div className="border border-border bg-card p-4 mb-6">
            <h2 className="text-sm font-semibold flex items-center gap-2 mb-3"><Search className="w-4 h-4" />Quick Check Results</h2>
            <div className="space-y-2">
              {quickCheck.map((match, i) => {
                const SevIcon = severityIcons[match.severity as keyof typeof severityIcons] || AlertTriangle;
                return (
                  <div key={i} className={`border p-3 ${severityColors[match.severity as keyof typeof severityColors] || "border-border bg-card"}`}>
                    <div className="flex items-center gap-2">
                      <SevIcon className="w-4 h-4" />
                      <span className="text-sm font-bold font-mono">{match.name}</span>
                      <span className="text-[10px] font-mono uppercase">({match.severity})</span>
                    </div>
                    <p className="text-xs font-mono mt-1">{match.treatment}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="border border-border bg-card p-4 mb-6">
            <h2 className="text-sm font-semibold flex items-center gap-2 mb-3"><CheckCircle className="w-4 h-4 text-term-green" />Diagnosis Result</h2>
            <div className={`border p-4 ${severityColors[result.severity as keyof typeof severityColors] || "border-border"}`}>
              <div className="flex items-center gap-2 mb-2">
                <Stethoscope className="w-5 h-5" />
                <span className="text-lg font-bold font-mono">{result.diagnosis}</span>
              </div>
              <div className="flex gap-3 mb-3">
                <span className="text-xs font-mono">Confidence: {result.confidence}%</span>
                <span className="text-xs font-mono uppercase">Severity: {result.severity}</span>
              </div>
              <div className="bg-white/50 p-3 rounded">
                <h3 className="text-xs font-bold font-mono mb-1">Treatment</h3>
                <p className="text-sm font-mono">{result.treatment}</p>
              </div>
              {result.relatedCourseSlug && (
                <Link href={`/courses/${result.relatedCourseSlug}`} className="inline-flex items-center gap-1 mt-3 text-xs font-mono text-term-green hover:underline">
                  <BookOpen className="w-3 h-3" />Learn more in the related course
                </Link>
              )}
            </div>
          </div>
        )}

        {/* History */}
        <div className="border border-border bg-card p-4">
          <h2 className="text-sm font-semibold flex items-center gap-2 mb-3"><Camera className="w-4 h-4" />Recent Diagnoses</h2>
          {(!history || history.length === 0) ? (
            <p className="text-xs text-muted-foreground font-mono">No diagnoses yet. Describe your first plant problem above.</p>
          ) : (
            <div className="space-y-2">
              {history.map((d) => (
                <div key={d._id} className="border border-border p-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold font-mono">{d.diagnosis}</p>
                    <p className="text-[10px] text-muted-foreground font-mono">{d.cropType} · {d.confidence}% confidence · {new Date(d.createdAt).toLocaleDateString()}</p>
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 border ${severityColors[d.severity as keyof typeof severityColors] || "border-border"}`}>{d.severity}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
