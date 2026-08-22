import { useQuery, useMutation } from "@/lib/convex-react-safe";
import { api } from "../convex/_generated/api";
import { useAuth } from "@/hooks/use-auth";
import { useEffect } from "react";
import { Target, Award, TrendingUp, Star } from "lucide-react";

const LEVEL_LABELS = ["", "Beginner", "Intermediate", "Advanced", "Expert", "Master"];
const LEVEL_COLORS = ["bg-muted", "bg-amber-500/20 text-amber-700", "bg-blue-500/20 text-blue-700", "bg-green-500/20 text-green-700", "bg-purple-500/20 text-purple-700", "bg-red-500/20 text-red-700"];

export default function Competencies() {
  const { user } = useAuth();
  const userId = user?._id;
  const matrix = useQuery(api.competencies.myMatrix, userId ? { userId } : "skip");
  const allComps = useQuery(api.competencies.allCompetencies, {});
  const seedComps = useMutation(api.competencies.seedCompetencies);
  const checkCreds = useMutation(api.microCredentials.checkAndAward);

  useEffect(() => { seedComps({}); }, [seedComps]);

  const compMap = new Map(matrix?.map((m) => [m.competencyId, m]) ?? []);

  const totalLevel = matrix?.reduce((sum, m) => sum + m.level, 0) ?? 0;
  const avgScore = matrix && matrix.length > 0
    ? Math.round(matrix.reduce((sum, m) => sum + m.score, 0) / matrix.length)
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <p className="text-xs text-term-green font-mono">[ok] competency skills matrix</p>
          <h1 className="text-2xl font-bold mt-1">My Skills</h1>
          <p className="text-muted-foreground font-mono text-sm">Track proficiency across all agriculture disciplines</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {[
            { icon: <Target className="w-4 h-4 text-term-green" />, label: "Skills Tracked", value: matrix?.length ?? 0 },
            { icon: <TrendingUp className="w-4 h-4 text-blue-500" />, label: "Avg Score", value: `${avgScore}%` },
            { icon: <Star className="w-4 h-4 text-amber-500" />, label: "Total Level", value: totalLevel },
            { icon: <Award className="w-4 h-4 text-purple-500" />, label: "Mastered", value: matrix?.filter((m) => m.level >= 4).length ?? 0 },
          ].map((kpi) => (
            <div key={kpi.label} className="border border-border bg-card px-4 py-3">
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">{kpi.icon}{kpi.label}</div>
              <div className="text-xl font-bold font-mono mt-1">{kpi.value}</div>
            </div>
          ))}
        </div>

        {allComps && Object.entries(allComps as any).map(([category, comps]: [string, any]) => (
          <div key={category} className="mb-6">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {comps.map((comp) => {
                const userComp: any = compMap.get(comp._id);
                const level = userComp?.level ?? 0;
                const score = userComp?.score ?? 0;
                return (
                  <div key={comp._id} className="border border-border bg-card p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold">{comp.name}</span>
                      {level > 0 ? (
                        <span className={`text-[10px] font-mono px-2 py-0.5 ${LEVEL_COLORS[level]}`}>
                          Lv.{level} {LEVEL_LABELS[level]}
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono text-muted-foreground px-2 py-0.5 bg-muted">Not started</span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{comp.description}</p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-muted overflow-hidden">
                        <div className="h-full bg-term-green transition-all" style={{ width: `${score}%` }} />
                      </div>
                      <span className="text-xs font-mono text-muted-foreground w-10 text-right">{score}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <p className="text-xs text-muted-foreground mt-6">
          <span className="text-term-green">[ok]</span> skills update as you complete quizzes and exercises
        </p>
      </div>
    </div>
  );
}
