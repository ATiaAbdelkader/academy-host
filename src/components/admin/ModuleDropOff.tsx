import { api } from "@/convex/_generated/api";
import { useQuery } from "@/lib/convex-react-safe";
import { TrendingDown } from "lucide-react";

/**
 * Admin metrics widget — module drop-off. For each course, shows how many
 * students reached each module (furthest-module bookmarks from the course
 * page reader). The first module where retention collapses is where students
 * quit, which flags lessons that need rewriting or a quiz that's too hard.
 */
export function ModuleDropOff() {
  const stats = useQuery(api.bookings.adminStats);
  const rows = stats?.moduleDropOff ?? [];
  const loading = stats === undefined;

  if (loading) {
    return (
      <div className="border border-border bg-card p-5 text-xs text-muted-foreground">
        <span className="text-term-green">$</span> cat module-drop-off.log…
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div className="border border-border bg-card px-5 py-6 text-xs text-muted-foreground">
        <p className="text-term-amber">[warn]</p>
        <p className="mt-1">
          No module progress yet. Drop-off tracking starts the moment students
          open a course — revisit this tab once lessons are being read.
        </p>
      </div>
    );
  }

  return (
    <div className="border border-border bg-card">
      <div className="flex items-center justify-between gap-3 border-b border-border bg-muted px-4 py-3">
        <div className="flex items-center gap-2">
          <TrendingDown className="size-4 text-term-amber" />
          <h3 className="text-sm font-semibold">module drop-off</h3>
        </div>
        <span className="font-mono text-[10px] text-muted-foreground">
          retention per module · {rows.length} courses
        </span>
      </div>

      <div className="divide-y divide-border">
        {rows.map((row) => {
          const biggestDrop = row.reached.reduce(
            (acc, cur, i) => {
              if (i === 0) return acc;
              const prev = row.reached[i - 1].students;
              const drop = prev - cur.students;
              return drop > acc.drop ? { at: i, drop } : acc;
            },
            { at: -1, drop: 0 },
          );
          return (
            <div key={row.courseId} className="px-4 py-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="text-sm font-medium">{row.title}</p>
                <p className="font-mono text-[10px] text-muted-foreground">
                  {row.totalStudents} students tracked
                </p>
              </div>

              <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {row.reached.map((m, i) => {
                  const pct = Math.round((m.students / row.totalStudents) * 100);
                  const color =
                    pct >= 70
                      ? "bg-term-green"
                      : pct >= 40
                        ? "bg-term-amber"
                        : "bg-muted-foreground/50";
                  const isDropPoint = biggestDrop.at === i && biggestDrop.drop > 0;
                  return (
                    <div
                      key={m.moduleIndex}
                      className={`border px-3 py-2 ${
                        isDropPoint
                          ? "border-term-amber/40 bg-term-amber/[0.06]"
                          : "border-border bg-background/40"
                      }`}
                      title={`${m.title} — ${m.students}/${row.totalStudents} students reached (${pct}%)`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-[11px] font-medium">
                          {i + 1}. {m.title}
                        </p>
                        {isDropPoint && (
                          <span className="flex shrink-0 items-center gap-1 text-[9px] font-medium uppercase tracking-wider text-term-amber">
                            <TrendingDown className="size-3" />
                            -{biggestDrop.drop}
                          </span>
                        )}
                      </div>
                      <div className="mt-1.5 flex items-center gap-2">
                        <div className="h-1.5 flex-1 bg-border">
                          <div
                            className={`h-1.5 ${color}`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="w-10 shrink-0 text-right font-mono text-[10px] text-muted-foreground">
                          {pct}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
