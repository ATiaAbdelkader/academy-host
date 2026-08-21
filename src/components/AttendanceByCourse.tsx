import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts";

const attendanceChartConfig = {
  rate: { label: "attendance rate", color: "var(--term-green)" },
} satisfies ChartConfig;

type AttendanceRow = {
  title: string;
  confirmed: number;
  attended: number;
  rate: number;
};

/**
 * Admin metrics widget: attendance rate per course. Rendered as a bar chart
 * (green at/above 70%, amber below) with a compact table underneath. Fed by
 * `api.bookings.adminStats.attendanceByCourse`.
 */
export function AttendanceByCourse({
  stats,
}: {
  stats: { attendanceByCourse: AttendanceRow[] } | undefined;
}) {
  return (
    <div className="border border-border bg-card">
      <div className="border-b border-border bg-muted px-4 py-2 text-[11px] uppercase tracking-wider text-muted-foreground">
        attendance by course
      </div>
      {stats === undefined && (
        <div className="space-y-2 p-4">
          <div className="h-4 animate-pulse bg-muted" />
          <div className="h-4 animate-pulse bg-muted" />
        </div>
      )}
      {stats !== undefined && stats.attendanceByCourse.length === 0 && (
        <div className="px-4 py-8 text-center text-xs text-muted-foreground">
          <p>
            <span className="text-term-green">[ok]</span> no confirmed seats yet
            — attendance rates appear here once sessions are booked and marked
            attended.
          </p>
        </div>
      )}
      {stats !== undefined && stats.attendanceByCourse.length > 0 && (
        <>
          <div className="border-b border-border p-4">
            <ChartContainer
              config={attendanceChartConfig}
              className="aspect-auto h-56 w-full"
            >
              <BarChart
                data={stats.attendanceByCourse}
                margin={{ left: -16, right: 8, top: 4 }}
              >
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                  dataKey="title"
                  tickLine={false}
                  axisLine={false}
                  interval={0}
                  angle={-18}
                  textAnchor="end"
                  height={52}
                  tick={{ fontSize: 10 }}
                />
                <YAxis
                  domain={[0, 100]}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 10 }}
                />
                <ChartTooltip
                  cursor={{ fill: "var(--muted)" }}
                  content={<ChartTooltipContent />}
                />
                <Bar dataKey="rate" radius={[2, 2, 0, 0]} maxBarSize={48}>
                  {stats.attendanceByCourse.map((row) => (
                    <Cell
                      key={row.title}
                      fill={
                        row.rate >= 70
                          ? "var(--term-green)"
                          : "var(--term-amber)"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </div>
          <div className="grid grid-cols-[1fr_5rem_5rem_5rem] items-center gap-3 border-b border-border bg-muted px-4 py-2 text-[11px] uppercase tracking-wider text-muted-foreground">
            <span>course</span>
            <span className="text-right">confirmed</span>
            <span className="text-right">attended</span>
            <span className="text-right">rate</span>
          </div>
          {stats.attendanceByCourse.map((row) => (
            <div
              key={row.title}
              className="grid grid-cols-[1fr_5rem_5rem_5rem] items-center gap-3 border-b border-border px-4 py-2.5 last:border-b-0"
            >
              <span className="min-w-0 truncate text-sm">{row.title}</span>
              <span className="text-right text-xs text-muted-foreground">
                {row.confirmed}
              </span>
              <span className="text-right text-xs text-muted-foreground">
                {row.attended}
              </span>
              <span
                className={`text-right text-xs font-semibold ${
                  row.rate >= 70 ? "text-term-green" : "text-term-amber"
                }`}
              >
                {row.rate}%
              </span>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
