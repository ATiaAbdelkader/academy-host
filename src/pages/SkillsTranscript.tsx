import { useQuery } from "@/lib/convex-react-safe";
import { api } from "../convex/_generated/api";
import { useAuth } from "@/hooks/use-auth";
import { Award, TrendingUp, Clock, Target, BookOpen, Zap } from "lucide-react";

const LEVEL_LABELS = ["", "Beginner", "Intermediate", "Advanced", "Expert", "Master"];

export default function SkillsTranscript() {
  const { user } = useAuth();
  const userId = user?._id;
  const matrix = useQuery(api.competencies.myMatrix, userId ? { userId } : "skip");
  const myCreds = useQuery(api.microCredentials.myCredentials, userId ? { userId } : "skip");
  const myProgress = useQuery(api.progress.myProgress, {});
  const allCourses = useQuery(api.courses.list, {});
  const myAttempts = useQuery(api.analytics.myAnalytics, {});

  const totalSkills = matrix?.length ?? 0;
  const totalLevel = matrix?.reduce((sum, m) => sum + m.level, 0) ?? 0;
  const maxLevel = totalSkills * 5;
  const proficiencyPct = maxLevel > 0 ? Math.round((totalLevel / maxLevel) * 100) : 0;
  const coursesStarted = myProgress?.length ?? 0;
  const coursesCompleted = myProgress?.filter((p) => p.status === "completed").length ?? 0;
  const avgScore = myAttempts?.summary?.overallAvgScore ?? 0;

  // Learning velocity
  const firstAttempt = matrix && matrix.length > 0
    ? Math.min(...matrix.map((m) => m.lastPracticedAt))
    : Date.now();
  const daysActive = Math.max(1, Math.floor((Date.now() - firstAttempt) / 86400000));
  const skillsPerDay = totalSkills > 0 ? (totalSkills / daysActive).toFixed(1) : "0";
  const predictedCompletion = coursesStarted > coursesCompleted
    ? `${Math.ceil(((coursesStarted - coursesCompleted) / Math.max(1, coursesCompleted)) * daysActive)} days`
    : "All done!";

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <p className="text-xs text-term-green font-mono">[ok] skills transcript & learning analytics</p>
          <h1 className="text-2xl font-bold mt-1">Learning Profile</h1>
          <p className="text-muted-foreground font-mono text-sm">Your verified skills, credentials, and learning trajectory</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {[
            { icon: <Target className="w-4 h-4 text-term-green" />, label: "Proficiency", value: `${proficiencyPct}%` },
            { icon: <Zap className="w-4 h-4 text-amber-500" />, label: "Avg Score", value: `${avgScore}%` },
            { icon: <BookOpen className="w-4 h-4 text-blue-500" />, label: "Courses", value: `${coursesCompleted}/${coursesStarted}` },
            { icon: <Award className="w-4 h-4 text-purple-500" />, label: "Credentials", value: myCreds?.length ?? 0 },
          ].map((kpi) => (
            <div key={kpi.label} className="border border-border bg-card px-4 py-3">
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">{kpi.icon}{kpi.label}</div>
              <div className="text-xl font-bold font-mono mt-1">{kpi.value}</div>
            </div>
          ))}
        </div>

        {/* Learning Velocity */}
        <div className="border border-border bg-card p-6 mb-6">
          <h2 className="text-sm font-semibold flex items-center gap-2 mb-4"><TrendingUp className="w-4 h-4" />Learning Velocity</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold font-mono text-term-green">{skillsPerDay}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Skills/day</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold font-mono">{daysActive}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Days active</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold font-mono text-amber-500">{predictedCompletion}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Est. completion</p>
            </div>
          </div>
        </div>

        {/* Skills Breakdown */}
        <div className="border border-border bg-card p-6 mb-6">
          <h2 className="text-sm font-semibold mb-4">Skills Proficiency</h2>
          {matrix && matrix.length > 0 ? (
            <div className="space-y-3">
              {matrix.map((m) => (
                <div key={m._id} className="flex items-center gap-3">
                  <div className="w-40 truncate text-sm font-medium">{m.competency?.name}</div>
                  <div className="flex-1 h-4 bg-muted overflow-hidden">
                    <div className="h-full bg-term-green transition-all" style={{ width: `${m.score}%` }} />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground w-20 text-right">{LEVEL_LABELS[m.level]}</span>
                  <span className="text-xs font-mono w-10 text-right">{m.score}%</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Start completing quizzes and labs to build your skills profile.</p>
          )}
        </div>

        {/* Credentials */}
        {myCreds && myCreds.length > 0 && (
          <div className="border border-border bg-card p-6 mb-6">
            <h2 className="text-sm font-semibold mb-4">Earned Credentials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {myCreds.map((c) => (
                <div key={c._id} className="border border-term-green/40 bg-term-green/5 p-4 flex items-center gap-3">
                  <span className="text-3xl">{c.credential?.icon}</span>
                  <div>
                    <h3 className="text-sm font-bold">{c.credential?.name}</h3>
                    <p className="text-[10px] text-muted-foreground font-mono">Earned {new Date(c.earnedAt).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Transcript-style summary */}
        <div className="border border-border bg-card p-6">
          <h2 className="text-sm font-semibold mb-4">Transcript Summary</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><span className="text-muted-foreground">Student:</span> <span className="font-medium">{user?.name ?? "—"}</span></div>
            <div><span className="text-muted-foreground">Program:</span> <span className="font-medium">AgriSkills Academy</span></div>
            <div><span className="text-muted-foreground">Courses Completed:</span> <span className="font-medium">{coursesCompleted}</span></div>
            <div><span className="text-muted-foreground">Overall Avg:</span> <span className="font-medium">{avgScore}%</span></div>
            <div><span className="text-muted-foreground">Skills Mastered:</span> <span className="font-medium">{matrix?.filter((m) => m.level >= 4).length ?? 0} / {totalSkills}</span></div>
            <div><span className="text-muted-foreground">Credentials Earned:</span> <span className="font-medium">{myCreds?.length ?? 0}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
