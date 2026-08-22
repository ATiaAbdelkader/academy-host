import { useQuery } from "@/lib/convex-react-safe";
import { api } from "../convex/_generated/api";
import { DollarSign, TrendingUp, Users, BookOpen, ArrowUpRight, BarChart3 } from "lucide-react";

export default function Revenue() {
  const dashboard = useQuery(api.revenue.dashboard, {});
  const monthly = useQuery(api.revenue.monthlyTrend, {});
  const daily = useQuery(api.revenue.dailyTrend, { days: 30 });

  const maxMonthly = Math.max(...(monthly?.map((m) => m.revenue) ?? [1]));

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Revenue Dashboard</h1>
          <p className="text-muted-foreground font-mono text-sm">Academy financial overview</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Revenue", value: `$${((dashboard?.totalRevenue ?? 0) / 100).toFixed(2)}`, icon: <DollarSign className="w-5 h-5 text-green-600" />, bg: "bg-green-500/10" },
            { label: "Net Revenue", value: `$${((dashboard?.netRevenue ?? 0) / 100).toFixed(2)}`, icon: <TrendingUp className="w-5 h-5 text-blue-500" />, bg: "bg-blue-500/10" },
            { label: "Enrollments", value: dashboard?.totalEnrollments ?? 0, icon: <Users className="w-5 h-5 text-purple-500" />, bg: "bg-purple-500/10" },
            { label: "Unique Students", value: dashboard?.uniqueStudents ?? 0, icon: <BookOpen className="w-5 h-5 text-amber-500" />, bg: "bg-amber-500/10" },
          ].map((kpi) => (
            <div key={kpi.label} className={`p-4 rounded-lg ${kpi.bg} border border-border`}>
              <div className="flex items-center gap-2 mb-2">{kpi.icon}<span className="text-xs font-mono text-muted-foreground">{kpi.label}</span></div>
              <div className="text-2xl font-bold font-mono">{kpi.value}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Trend */}
          <div className="border border-border rounded-lg p-6 bg-card">
            <h2 className="font-semibold mb-4 flex items-center gap-2"><BarChart3 className="w-4 h-4" /> Monthly Revenue</h2>
            <div className="space-y-2">
              {monthly?.map((m) => (
                <div key={m.month} className="flex items-center gap-3">
                  <span className="text-xs font-mono text-muted-foreground w-16">{m.month}</span>
                  <div className="flex-1 h-6 bg-muted rounded overflow-hidden">
                    <div className="h-full bg-green-600 rounded" style={{ width: `${(m.revenue / maxMonthly) * 100}%` }} />
                  </div>
                  <span className="text-xs font-mono w-16 text-right">${(m.revenue / 100).toFixed(0)}</span>
                </div>
              ))}
              {monthly?.length === 0 && <p className="text-muted-foreground font-mono text-sm text-center py-4">No data yet</p>}
            </div>
          </div>

          {/* Top Courses */}
          <div className="border border-border rounded-lg p-6 bg-card">
            <h2 className="font-semibold mb-4">Top Courses</h2>
            <div className="space-y-3">
              {dashboard?.topCourses.map((c, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded">
                  <div>
                    <div className="text-sm font-semibold">{c.title}</div>
                    <div className="text-xs text-muted-foreground font-mono">{c.enrollments} enrollments</div>
                  </div>
                  <span className="text-sm font-mono text-green-600">${(c.revenue / 100).toFixed(2)}</span>
                </div>
              ))}
              {dashboard?.topCourses.length === 0 && <p className="text-muted-foreground font-mono text-sm text-center py-4">No data yet</p>}
            </div>
          </div>
        </div>

        {/* Recent Stats */}
        <div className="mt-6 p-4 border border-border rounded-lg bg-card">
          <h2 className="font-semibold mb-3">Last 30 Days</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-xl font-bold font-mono">${((dashboard?.recentRevenue ?? 0) / 100).toFixed(2)}</div>
              <div className="text-xs text-muted-foreground font-mono">Revenue</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold font-mono">{dashboard?.recentEnrollments ?? 0}</div>
              <div className="text-xs text-muted-foreground font-mono">Enrollments</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold font-mono">${((dashboard?.totalRefunds ?? 0) / 100).toFixed(2)}</div>
              <div className="text-xs text-muted-foreground font-mono">Refunds</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
