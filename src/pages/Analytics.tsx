"use client";
import Link from "next/link";
import { api } from "@/convex/_generated/api";
import { AppHeader } from "@/components/AppHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { BADGE_DEFS } from "@/lib/badges";
import { useQuery } from "convex/react";
import {
  Award,
  BookOpen,
  Flame,
  Target,
  TrendingUp,
  Trophy,
  Zap,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

const scoreChartConfig: ChartConfig = {
  score: { label: "Score %", color: "oklch(0.46 0.105 152)" },
  passLine: { label: "Pass Line", color: "oklch(0.58 0.125 68)" },
};

const activityChartConfig: ChartConfig = {
  quizzes: { label: "Quizzes Taken", color: "oklch(0.46 0.105 152)" },
};

const categoryChartConfig: ChartConfig = {
  accuracy: { label: "Accuracy %", color: "oklch(0.46 0.105 152)" },
};

export default function Analytics() {
  const analytics = useQuery(api.analytics.myAnalytics);

  if (analytics === undefined) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <AppHeader path="~/analytics" />
        <div className="mx-auto flex min-h-[60vh] w-full max-w-5xl items-center justify-center px-4">
          <div className="animate-pulse text-sm text-muted-foreground">
            loading analytics…
          </div>
        </div>
      </main>
    );
  }

  if (analytics === null) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <AppHeader path="~/analytics" />
        <div className="mx-auto flex min-h-[60vh] w-full max-w-5xl flex-col items-center justify-center px-4 text-center">
          <Target className="size-8 text-muted-foreground" />
          <p className="mt-4 text-sm">
            <span className="text-term-green">[ok]</span> sign in to view your
            learning analytics.
          </p>
          <Button asChild variant="outline" size="sm" className="mt-4 text-xs">
            <Link href="/auth?returnTo=/analytics">sign in</Link>
          </Button>
        </div>
      </main>
    );
  }

  const { summary, scoreHistory, courseBreakdown, categories, activityTimeline } =
    analytics;

  // Prepare score trend data with a rolling average
  const scoreData = scoreHistory.map((entry, i) => {
    const last5 = scoreHistory.slice(Math.max(0, i - 4), i + 1);
    const rollingAvg = Math.round(
      last5.reduce((s, e) => s + e.score, 0) / last5.length,
    );
    return {
      date: new Date(entry.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      score: entry.score,
      rollingAvg,
      passed: entry.passed,
    };
  });

  // Prepare activity data (last 30 days)
  const activityData = activityTimeline.map((day) => ({
    date: new Date(day.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    quizzes: day.quizzes,
  }));

  return (
    <main className="min-h-screen bg-background text-foreground">
      <AppHeader path="~/analytics" />

      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        <p className="text-xs text-term-green">
          [ok] learning analytics — performance dashboard
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">
          My Analytics
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Track your quiz scores, course progress, and learning patterns across
          AgriSkills Academy.
        </p>

        {/* ── Summary stats ──────────────────────────────────────── */}
        <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatCard
            icon={<TrendingUp className="size-3.5 text-term-green" />}
            label="avg score"
            value={`${summary.overallAvgScore}%`}
            accent={summary.overallAvgScore >= 70}
          />
          <StatCard
            icon={<Target className="size-3.5 text-term-green" />}
            label="pass rate"
            value={`${summary.overallPassRate}%`}
            accent={summary.overallPassRate >= 70}
          />
          <StatCard
            icon={<BookOpen className="size-3.5 text-term-amber" />}
            label="courses done"
            value={`${summary.coursesCompleted}/${summary.coursesStarted || 0}`}
          />
          <StatCard
            icon={<Flame className="size-3.5 text-term-amber" />}
            label="streak"
            value={`${summary.streakDays}d`}
            accent={summary.streakDays >= 3}
          />
        </div>

        {/* ── Points & badges row ────────────────────────────────── */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 border border-border bg-card px-4 py-2">
            <Trophy className="size-3.5 text-term-amber" />
            <span className="text-sm font-semibold">{summary.points}</span>
            <span className="text-xs text-muted-foreground">points</span>
          </div>
          <div className="flex items-center gap-2 border border-border bg-card px-4 py-2">
            <Award className="size-3.5 text-term-green" />
            <span className="text-sm font-semibold">
              {summary.badges.length}
            </span>
            <span className="text-xs text-muted-foreground">
              / {Object.keys(BADGE_DEFS).length} badges
            </span>
          </div>
          <div className="flex items-center gap-2 border border-border bg-card px-4 py-2">
            <Zap className="size-3.5 text-term-amber" />
            <span className="text-sm font-semibold">
              {summary.bestStreak}
            </span>
            <span className="text-xs text-muted-foreground">
              best streak (days)
            </span>
          </div>
        </div>

        {/* ── Score trend chart ──────────────────────────────────── */}
        {scoreData.length > 0 && (
          <div className="mt-8 border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border bg-muted px-4 py-2.5">
              <span className="text-xs font-semibold">
                quiz score trend
              </span>
              <span className="text-[11px] text-muted-foreground">
                {scoreData.length} quiz{scoreData.length !== 1 ? "zes" : ""}{" "}
                taken — green line = rolling avg
              </span>
            </div>
            <div className="p-4">
              <ChartContainer
                config={scoreChartConfig}
                className="h-[220px] w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={scoreData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="stroke-border/50"
                    />
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 10 }}
                      className="fill-muted-foreground"
                    />
                    <YAxis
                      domain={[0, 100]}
                      tick={{ fontSize: 10 }}
                      className="fill-muted-foreground"
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="var(--color-score)"
                      strokeWidth={1.5}
                      dot={{ r: 3, strokeWidth: 0 }}
                      name="score"
                    />
                    <Line
                      type="monotone"
                      dataKey="rollingAvg"
                      stroke="oklch(0.45 0.1 152)"
                      strokeWidth={2.5}
                      dot={false}
                      strokeDasharray="0"
                      name="rolling avg"
                    />
                    {/* Pass line at 70% */}
                    <CartesianGrid
                      horizontalCoordinatesGenerator={() => []}
                      verticalCoordinatesGenerator={() => []}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </div>
        )}

        {scoreData.length === 0 && (
          <div className="mt-8 border border-border bg-card">
            <div className="border-b border-border bg-muted px-4 py-2.5">
              <span className="text-xs font-semibold">
                quiz score trend
              </span>
            </div>
            <div className="px-4 py-10 text-center text-xs text-muted-foreground">
              <p>
                <span className="text-term-green">[ok]</span> no quiz attempts
                yet — take a module quiz and your trend appears here.
              </p>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="mt-4 text-xs"
              >
                <Link href="/courses">browse catalog</Link>
              </Button>
            </div>
          </div>
        )}

        {/* ── Study activity (last 30 days) ──────────────────────── */}
        {activityData.some((d) => d.quizzes > 0) && (
          <div className="mt-6 border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border bg-muted px-4 py-2.5">
              <span className="text-xs font-semibold">
                study activity — last 30 days
              </span>
              <span className="text-[11px] text-muted-foreground">
                quizzes taken per day
              </span>
            </div>
            <div className="p-4">
              <ChartContainer
                config={activityChartConfig}
                className="h-[180px] w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={activityData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="stroke-border/50"
                    />
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 9 }}
                      className="fill-muted-foreground"
                      interval="preserveStartEnd"
                    />
                    <YAxis
                      tick={{ fontSize: 10 }}
                      className="fill-muted-foreground"
                      allowDecimals={false}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar
                      dataKey="quizzes"
                      fill="var(--color-quizzes)"
                      radius={[2, 2, 0, 0]}
                      name="quizzes"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </div>
        )}

        {/* ── Category accuracy ──────────────────────────────────── */}
        {categories.length > 0 && (
          <div className="mt-6 border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border bg-muted px-4 py-2.5">
              <span className="text-xs font-semibold">
                accuracy by category
              </span>
              <span className="text-[11px] text-muted-foreground">
                percentage of correct answers
              </span>
            </div>
            <div className="p-4">
              <ChartContainer
                config={categoryChartConfig}
                className="h-[200px] w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={categories.map((c) => ({
                      category: c.category,
                      accuracy: c.accuracy,
                    }))}
                    layout="vertical"
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="stroke-border/50"
                    />
                    <XAxis
                      type="number"
                      domain={[0, 100]}
                      tick={{ fontSize: 10 }}
                      className="fill-muted-foreground"
                    />
                    <YAxis
                      type="category"
                      dataKey="category"
                      tick={{ fontSize: 10 }}
                      className="fill-muted-foreground"
                      width={100}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar
                      dataKey="accuracy"
                      fill="var(--color-accuracy)"
                      radius={[0, 4, 4, 0]}
                      name="accuracy"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </div>
        )}

        {categories.length === 0 && (
          <div className="mt-6 border border-border bg-card">
            <div className="border-b border-border bg-muted px-4 py-2.5">
              <span className="text-xs font-semibold">
                accuracy by category
              </span>
            </div>
            <div className="px-4 py-8 text-center text-xs text-muted-foreground">
              <p>
                <span className="text-term-green">[ok]</span> complete some
                quizzes and your category strengths show up here.
              </p>
            </div>
          </div>
        )}

        {/* ── Course progress table ──────────────────────────────── */}
        <div className="mt-6 border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border bg-muted px-4 py-2.5">
            <span className="text-xs font-semibold">course progress</span>
            <span className="text-[11px] text-muted-foreground">
              {courseBreakdown.length} course
              {courseBreakdown.length !== 1 ? "s" : ""} enrolled
            </span>
          </div>
          {courseBreakdown.length === 0 ? (
            <div className="px-4 py-10 text-center text-sm text-muted-foreground">
              <p>
                <span className="text-term-green">[ok]</span> no courses
                enrolled yet.
              </p>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="mt-4 text-xs"
              >
                <Link href="/courses">browse catalog</Link>
              </Button>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-[1fr_6rem_5rem_5rem_5rem_6rem] items-center gap-3 border-b border-border bg-muted px-4 py-2 text-[11px] uppercase tracking-wider text-muted-foreground">
                <span>course</span>
                <span className="hidden text-right sm:block">quizzes</span>
                <span className="text-right">best</span>
                <span className="text-right">avg</span>
                <span className="text-right">attempts</span>
                <span className="text-right">status</span>
              </div>
              {courseBreakdown.map((course) => (
                <div
                  key={course.courseId}
                  className="grid grid-cols-[1fr_6rem_5rem_5rem_5rem_6rem] items-center gap-3 border-b border-border px-4 py-2.5 last:border-b-0 hover:bg-accent/30"
                >
                  <span className="min-w-0">
                    <Link href={`/courses/${course.slug}`}
                      className="block truncate text-sm font-medium underline-offset-4 hover:underline"
                    >
                      {course.title}
                    </Link>
                    <span className="block text-[11px] text-muted-foreground">
                      {course.category} · module {course.lastModuleIndex + 1}/
                      {course.totalModules || "?"}
                    </span>
                  </span>
                  <span className="hidden text-right text-xs text-muted-foreground sm:block">
                    {course.passedQuizzes}/{course.totalModules || "?"}
                  </span>
                  <span
                    className={`text-right text-xs font-semibold ${
                      course.bestScore >= 70
                        ? "text-term-green"
                        : course.bestScore > 0
                          ? "text-term-amber"
                          : "text-muted-foreground"
                    }`}
                  >
                    {course.bestScore > 0 ? `${course.bestScore}%` : "—"}
                  </span>
                  <span
                    className={`text-right text-xs ${
                      course.avgScore >= 70
                        ? "text-term-green"
                        : course.avgScore > 0
                          ? "text-term-amber"
                          : "text-muted-foreground"
                    }`}
                  >
                    {course.avgScore > 0 ? `${course.avgScore}%` : "—"}
                  </span>
                  <span className="text-right text-xs text-muted-foreground">
                    {course.totalAttempts}
                  </span>
                  <span className="flex justify-end">
                    <StatusBadge status={course.status} />
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Weak areas ─────────────────────────────────────────── */}
        {categories.length > 0 && (
          <div className="mt-6 border border-border bg-card">
            <div className="border-b border-border bg-muted px-4 py-2.5">
              <span className="text-xs font-semibold">
                areas to improve
              </span>
            </div>
            {categories
              .filter((c) => c.accuracy < 70)
              .map((cat) => (
                <div
                  key={cat.category}
                  className="flex items-center justify-between gap-3 border-b border-border px-4 py-2.5 last:border-b-0"
                >
                  <span className="text-sm font-medium">{cat.category}</span>
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-32 overflow-hidden bg-muted">
                      <div
                        className="h-full bg-term-amber transition-all"
                        style={{ width: `${cat.accuracy}%` }}
                      />
                    </div>
                    <span className="w-12 text-right text-xs font-semibold text-term-amber">
                      {cat.accuracy}%
                    </span>
                  </div>
                </div>
              ))}
            {categories.filter((c) => c.accuracy < 70).length === 0 && (
              <div className="px-4 py-6 text-center text-xs text-muted-foreground">
                <p>
                  <span className="text-term-green">[ok]</span> all categories
                  above 70% — great work!
                </p>
              </div>
            )}
          </div>
        )}

        <p className="mt-6 text-xs text-muted-foreground">
          <span className="text-term-green">[ok]</span> analytics synced live —
          scores update as you complete quizzes
        </p>
      </div>
    </main>
  );
}

function StatCard({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="border border-border bg-card px-4 py-4">
      <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
        {icon}
        {label}
      </p>
      <p
        className={`mt-2 text-2xl font-bold ${
          accent ? "text-term-green" : ""
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`border px-1.5 py-0.5 text-[10px] font-medium ${
        status === "completed"
          ? "border-term-green/40 bg-term-green/10 text-term-green"
          : "border-term-amber/40 bg-term-amber/10 text-term-amber"
      }`}
    >
      {status === "completed" ? "DONE" : "IN PROGRESS"}
    </span>
  );
}
