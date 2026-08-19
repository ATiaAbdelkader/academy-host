import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import { BookOpen, CheckCircle, AlertTriangle, ChevronRight, Clock, Award } from "lucide-react";
import { toast } from "sonner";

export default function CaseStudies() {
  const { user } = useAuth();
  const userId = user?._id;
  const studies = useQuery(api.caseStudies.list, {});
  const myAttempts = useQuery(api.caseStudies.myAttempts, userId ? { userId } : "skip");
  const submitCase = useMutation(api.caseStudies.submit);

  const [selected, setSelected] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const activeStudy = studies?.find((s) => s._id === selected);
  const attemptMap = new Map(myAttempts?.map((a) => [a.caseStudyId, a]) ?? []);

  const handleSubmit = async () => {
    if (!activeStudy || !userId) return;
    const answerArray = activeStudy.questions.map((_, i) => answers[i] ?? -1);
    try {
      const result = await submitCase({ userId, caseStudyId: activeStudy._id, answers: answerArray });
      toast[result.passed ? "success" : "info"](
        result.passed ? `Passed! Score: ${result.score}%` : `Score: ${result.score}% — review the explanations`
      );
      setSelected(null);
      setAnswers({});
    } catch { toast.error("Submission failed"); }
  };

  const categories = [...new Set(studies?.map((s) => s.category) ?? [])];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <p className="text-xs text-term-green font-mono">[ok] case study challenges</p>
          <h1 className="text-2xl font-bold mt-1">Real-World Scenarios</h1>
          <p className="text-muted-foreground font-mono text-sm">Apply your knowledge to solve actual farming problems</p>
        </div>

        {selected && activeStudy ? (
          <div className="border border-border bg-card p-6">
            <button onClick={() => { setSelected(null); setAnswers({}); }} className="text-xs text-term-green font-mono mb-4 hover:underline">&larr; back to list</button>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold">{activeStudy.title}</h2>
                <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{activeStudy.estimatedMinutes} min</span>
                  <span className="px-2 py-0.5 bg-muted font-mono">{activeStudy.difficulty}</span>
                  <span className="flex items-center gap-1"><Award className="w-3 h-3 text-amber-500" />{activeStudy.pointsReward} pts</span>
                </div>
              </div>
            </div>

            <div className="border-l-2 border-term-green pl-4 mb-4">
              <h3 className="text-sm font-semibold mb-1">Scenario</h3>
              <p className="text-sm text-muted-foreground">{activeStudy.scenario}</p>
            </div>
            <div className="border-l-2 border-term-amber pl-4 mb-6">
              <h3 className="text-sm font-semibold mb-1">Context</h3>
              <p className="text-sm text-muted-foreground">{activeStudy.context}</p>
            </div>

            {activeStudy.questions.map((q, qi) => (
              <div key={qi} className="mb-4 border border-border p-4">
                <p className="text-sm font-semibold mb-2">{qi + 1}. {q.question}</p>
                <div className="space-y-1">
                  {q.options.map((opt, oi) => (
                    <label key={oi} className={`flex items-center gap-2 p-2 text-sm cursor-pointer transition-colors ${answers[qi] === oi ? "bg-term-green/10 border border-term-green/40" : "hover:bg-muted border border-transparent"}`}>
                      <input type="radio" name={`q${qi}`} checked={answers[qi] === oi} onChange={() => setAnswers((prev) => ({ ...prev, [qi]: oi }))} className="accent-green-600" />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>
            ))}

            <button onClick={handleSubmit} className="w-full py-3 bg-term-green text-white font-mono text-sm font-semibold hover:bg-term-green/90 transition-colors">
              Submit Analysis
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {categories.map((cat) => (
              <div key={cat}>
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">{cat}</h2>
                <div className="space-y-3">
                  {studies?.filter((s) => s.category === cat).map((cs) => {
                    const attempt = attemptMap.get(cs._id);
                    return (
                      <button key={cs._id} onClick={() => setSelected(cs._id)} className="w-full text-left border border-border bg-card p-4 hover:bg-accent/30 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <BookOpen className="w-4 h-4 text-term-green" />
                              <span className="text-sm font-semibold">{cs.title}</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">{cs.description}</p>
                            <div className="flex items-center gap-3 mt-2 text-[10px] text-muted-foreground font-mono">
                              <span>{cs.difficulty}</span>
                              <span>{cs.estimatedMinutes} min</span>
                              <span>{cs.pointsReward} pts</span>
                              <span>{cs.questions.length} questions</span>
                            </div>
                          </div>
                          {attempt ? (
                            <span className={`text-[10px] font-mono px-2 py-0.5 ${attempt.passed ? "bg-term-green/10 text-term-green" : "bg-term-amber/10 text-term-amber"}`}>
                              {attempt.passed ? "PASSED" : `${attempt.score}%`}
                            </span>
                          ) : (
                            <ChevronRight className="w-4 h-4 text-muted-foreground" />
                          )}
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
