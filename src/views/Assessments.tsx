import { useQuery, useMutation } from "@/lib/convex-react-safe";
import { api } from "../convex/_generated/api";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import { ClipboardCheck, Upload, CheckCircle2, Clock, Star, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export default function Assessments() {
  useAuth();
  const types = useQuery(api.assessments.listTypes);
  const mySubmissions = useQuery(api.assessments.mySubmissions);
  const submitAssessment = useMutation(api.assessments.submit);

  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", description: "", mediaUrl: "" });

  const handleSubmit = async () => {
    if (!form.title || !form.description || !selectedType) {
      toast.error("Please fill in all fields");
      return;
    }
    await submitAssessment({
      type: selectedType,
      title: form.title,
      description: form.description,
      mediaUrl: form.mediaUrl || undefined,
    });
    toast.success("Assessment submitted for review!");
    setSelectedType(null);
    setForm({ title: "", description: "", mediaUrl: "" });
  };

  const statusColor = (s: string) => {
    if (s === "graded") return "bg-green-100 text-green-800";
    if (s === "under_review") return "bg-amber-100 text-amber-800";
    return "bg-blue-100 text-blue-800";
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg,#fafaf8)] font-mono">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <ClipboardCheck className="w-6 h-6 text-[var(--color-primary,#16a34a)]" />
          <h1 className="text-2xl font-bold tracking-tight">Practical Skill Assessments</h1>
        </div>

        {selectedType ? (
          <div className="bg-white border border-gray-200 rounded-lg p-6 max-w-2xl">
            <button onClick={() => setSelectedType(null)} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4">
              <ArrowLeft className="w-4 h-4" /> Back to types
            </button>
            <h2 className="font-bold text-lg mb-4">Submit Assessment</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Title</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full border border-gray-200 rounded px-3 py-2 text-sm font-mono focus:outline-none focus:border-green-500"
                  placeholder="e.g. My Soil Test Results"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Description / Analysis</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full border border-gray-200 rounded px-3 py-2 text-sm font-mono h-32 focus:outline-none focus:border-green-500"
                  placeholder="Describe your findings, methodology, and conclusions..."
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Media URL (optional)</label>
                <input
                  value={form.mediaUrl}
                  onChange={(e) => setForm({ ...form, mediaUrl: e.target.value })}
                  className="w-full border border-gray-200 rounded px-3 py-2 text-sm font-mono focus:outline-none focus:border-green-500"
                  placeholder="https://..."
                />
              </div>
              <button
                onClick={handleSubmit}
                className="bg-[var(--color-primary,#16a34a)] text-white px-4 py-2 rounded text-sm font-bold hover:bg-green-700 transition-colors"
              >
                Submit for Review
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Assessment Types Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
              {types?.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedType(t.id)}
                  className="bg-white border border-gray-200 rounded-lg p-4 text-left hover:border-green-400 hover:shadow-sm transition-all"
                >
                  <div className="text-2xl mb-2">{t.icon}</div>
                  <div className="font-bold text-sm">{t.label}</div>
                  <div className="text-xs text-gray-500 mt-1">{t.description}</div>
                </button>
              ))}
            </div>

            {/* My Submissions */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                <h2 className="font-bold text-sm uppercase tracking-wider">My Submissions</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {mySubmissions && mySubmissions.length > 0 ? (
                  mySubmissions.map((s) => (
                    <div key={s._id} className="px-4 py-3 flex items-center gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm truncate">{s.title}</div>
                        <div className="text-xs text-gray-500">{new Date(s.createdAt).toLocaleDateString()}</div>
                      </div>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusColor(s.status)}`}>
                        {s.status}
                      </span>
                      {s.grade != null && (
                        <div className="flex items-center gap-1 text-sm font-bold text-amber-600">
                          <Star className="w-4 h-4" /> {s.grade}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-8 text-center text-gray-500 text-sm">
                    No submissions yet. Choose an assessment type above!
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
