import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { downloadCsv } from "@/lib/csv";
import { useQuery } from "@/lib/convex-react-safe";
import { Download } from "lucide-react";

/**
 * CSV exports for the metrics tab: revenue by course and attendance by
 * course, downloaded straight from the browser. (A full bookings export
 * already lives in the Bookings tab.)
 */
export function MetricsExports() {
  const stats = useQuery(api.bookings.adminStats);

  const handleExportRevenue = () => {
    if (!stats) return;
    const rows = stats.revenueByCourse.map((row) => ({
      course: row.title,
      bookings: row.count,
      revenue_usd: (row.revenueCents / 100).toFixed(2),
    }));
    rows.push({
      course: "TOTAL",
      bookings: stats.confirmed + stats.pending,
      revenue_usd: (stats.paidRevenueCents / 100).toFixed(2),
    });
    downloadCsv(
      `agriskills-revenue-${new Date().toISOString().slice(0, 10)}.csv`,
      rows,
    );
  };

  const handleExportAttendance = () => {
    if (!stats) return;
    downloadCsv(
      `agriskills-attendance-${new Date().toISOString().slice(0, 10)}.csv`,
      stats.attendanceByCourse.map((row) => ({
        course: row.title,
        confirmed: row.confirmed,
        attended: row.attended,
        attendance_rate_percent: row.rate,
      })),
    );
  };

  return (
    <div className="border border-border bg-card">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-muted px-4 py-2 text-[11px] uppercase tracking-wider text-muted-foreground">
        <span>csv exports</span>
        <span className="normal-case text-[10px]">
          for accounting / spreadsheets
        </span>
      </div>
      <div className="flex flex-wrap gap-2 px-4 py-3">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-7 gap-1.5 text-[11px]"
          disabled={!stats}
          onClick={handleExportRevenue}
        >
          <Download className="size-3" />
          revenue by course
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-7 gap-1.5 text-[11px]"
          disabled={!stats}
          onClick={handleExportAttendance}
        >
          <Download className="size-3" />
          attendance by course
        </Button>
        <span className="text-[10px] leading-7 text-muted-foreground">
          bookings export lives in the bookings tab
        </span>
      </div>
    </div>
  );
}
