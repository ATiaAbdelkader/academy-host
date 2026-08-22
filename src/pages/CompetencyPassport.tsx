"use client";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { useAuth } from "@/hooks/use-auth";
import { Award, Shield, Star, BookOpen } from "lucide-react";

const LEVEL_LABELS = ["None", "Beginner", "Intermediate", "Advanced", "Expert", "Master"];
const LEVEL_TEXT_COLORS = ["text-gray-600", "text-blue-600", "text-green-600", "text-amber-600", "text-purple-600", "text-term-green"];

export default function CompetencyPassport() {
  const { user } = useAuth();
  const userId = user?._id;

  // myMatrix returns an array of userCompetency rows with .competency attached
  const matrix = useQuery(api.competencies.myMatrix, userId ? { userId } : "skip");
  // myCredentials returns array of userMicroCredential rows with .credential attached
  const credentials = useQuery(api.microCredentials.myCredentials, userId ? { userId } : "skip");
  // list returns all active micro-credentials
  const allCredentials = useQuery(api.microCredentials.list, {});
  const stats = useQuery(api.gamification.myStats);
  const progress = useQuery(api.progress.myProgress);

  const completedCount = progress?.filter((p) => p.status === "completed").length || 0;

  // Group competencies by category
  const grouped: Record<string, Array<{ name: string; level: number; score: number }>> = {};
  if (matrix) {
    for (const entry of matrix) {
      const cat = entry.competency?.category || "General";
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push({
        name: entry.competency?.name || "Unknown",
        level: entry.level,
        score: entry.score,
      });
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <p className="text-xs text-term-green font-mono">[passport] competency passport</p>
          <h1 className="text-2xl font-bold mt-1">Competency Passport</h1>
          <p className="text-muted-foreground font-mono text-sm">Your verified skills and credentials</p>
        </div>

        {/* Passport Header Card */}
        <div className="border-2 border-term-green bg-card p-6 mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-term-green/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-term-green/10 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-term-green" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-mono">{user?.name || "Student"}</h2>
              <p className="text-xs text-muted-foreground font-mono">Agriculture Academy Passport</p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: "Points", value: stats?.points || 0 },
              { label: "Courses", value: completedCount },
              { label: "Quizzes Passed", value: stats?.quizPasses || 0 },
              { label: "Badges", value: stats?.badges?.length || 0 },
            ].map((s) => (
              <div key={s.label} className="bg-term-green/5 p-2 text-center">
                <p className="text-lg font-mono font-bold text-term-green">{s.value}</p>
                <span className="text-[10px] text-muted-foreground font-mono">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Micro-Credentials Earned */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold flex items-center gap-2 mb-3"><Award className="w-4 h-4" />Earned Credentials</h2>
          {credentials && credentials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {credentials.map((cred) => (
                <div key={cred._id} className="border border-term-green bg-card p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-term-green/10 rounded flex items-center justify-center">
                      <Award className="w-5 h-5 text-term-green" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold font-mono">{cred.credential?.name || "Credential"}</h3>
                      <p className="text-[10px] text-muted-foreground font-mono">{cred.credential?.category} · Earned {new Date(cred.earnedAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  {cred.verified && (
                    <div className="mt-2 text-[10px] font-mono text-term-green flex items-center gap-1">
                      <Shield className="w-3 h-3" /> Verified
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="border border-border bg-card p-6 text-center">
              <Award className="w-10 h-10 mx-auto text-muted-foreground/30 mb-2" />
              <p className="text-xs text-muted-foreground font-mono">Complete courses and quizzes to earn micro-credentials.</p>
              <Link href="/courses" className="text-xs font-mono text-term-green hover:underline mt-2 inline-block">Browse courses →</Link>
            </div>
          )}
        </div>

        {/* Competency Matrix */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold flex items-center gap-2 mb-3"><Star className="w-4 h-4" />Skills Matrix</h2>
          {Object.keys(grouped).length > 0 ? (
            <div className="space-y-4">
              {Object.entries(grouped).map(([category, competencies]) => (
                <div key={category} className="border border-border bg-card p-4">
                  <h3 className="text-sm font-bold font-mono mb-3">{category}</h3>
                  <div className="space-y-2">
                    {competencies.map((comp) => (
                      <div key={comp.name} className="flex items-center gap-3">
                        <span className="text-xs font-mono w-32 truncate">{comp.name}</span>
                        <div className="flex-1 bg-muted h-2 rounded">
                          <div className="bg-term-green h-2 rounded" style={{ width: `${comp.score}%` }} />
                        </div>
                        <span className={`text-[10px] font-mono px-1.5 py-0.5 ${LEVEL_TEXT_COLORS[comp.level] || "text-gray-600"}`}>
                          {LEVEL_LABELS[comp.level] || "None"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="border border-border bg-card p-6 text-center">
              <BookOpen className="w-10 h-10 mx-auto text-muted-foreground/30 mb-2" />
              <p className="text-xs text-muted-foreground font-mono">Start courses to build your competency matrix.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
