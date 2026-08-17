import { api } from "@/convex/_generated/api";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "convex/react";
import { Award, Download, Eye, Loader2, Lock, RefreshCcw } from "lucide-react";
import { Link } from "react-router";
import { certificateExpiry, formatShortDate } from "@/lib/format";

function certIdOf(courseId: string, userId: string): string {
  return `AGS-${courseId.slice(-4).toUpperCase()}-${userId
    .slice(-4)
    .toUpperCase()}`;
}

/** Narrows an entry to those with a resolved course document. */
function hasCourse<T extends { course: unknown }>(
  entry: T,
): entry is T & { course: NonNullable<T["course"]> } {
  return entry.course !== undefined;
}

export default function Certificates() {
  const { user } = useAuth();
  const progress = useQuery(api.progress.myProgress);
  const courses = useQuery(api.courses.list);

  const loading = progress === undefined || courses === undefined;
  const byId = new Map((courses ?? []).map((c) => [c._id, c]));

  const earned = (progress ?? [])
    .filter((p) => p.status === "completed")
    .map((p) => ({ progress: p, course: byId.get(p.courseId) }))
    .filter(hasCourse);

  const inProgress = (progress ?? [])
    .filter((p) => p.status !== "completed")
    .map((p) => ({ progress: p, course: byId.get(p.courseId) }))
    .filter(hasCourse);

  const studentName =
    user?.name?.trim() || (user?.email ? user.email.split("@")[0] : "Student");

  return (
    <main className="min-h-screen bg-background text-foreground">
      <AppHeader path="~/certificates" />

      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        <p className="text-xs text-term-green">[ok] certificates on file</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">Certificates</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Every course you complete issues a certificate. Open one to view it
          or save it as a PDF — certificates stay attached to your account
          forever.
        </p>

        {loading && (
          <div className="mt-8 border border-border bg-card p-10 text-center">
            <Loader2 className="mx-auto size-6 animate-spin text-term-green" />
            <p className="mt-3 text-sm text-muted-foreground">
              loading certificates…
            </p>
          </div>
        )}

        {!loading && earned.length === 0 && inProgress.length === 0 && (
          <div className="mt-8 border border-border bg-card px-6 py-12 text-center">
            <Award className="mx-auto size-8 text-term-amber" />
            <p className="mt-3 text-sm">
              <span className="text-term-amber">[warn]</span> no certificates
              yet
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Complete all six modules of any course — pass each module quiz —
              and your certificate will appear here.
            </p>
            <Button asChild size="sm" className="mt-5 text-xs">
              <Link to="/courses">browse catalog</Link>
            </Button>
          </div>
        )}

        {!loading && earned.length > 0 && (
          <>
            <div className="mt-8 flex items-center gap-2 text-sm">
              <span className="text-term-green">$</span>
              <span>
                ls certificates/ --earned ({earned.length})
              </span>
              <span className="inline-block h-4 w-2 bg-foreground cursor-blink" />
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {earned.map(({ progress: entry, course }) => {
                const expiry = certificateExpiry(entry.updatedAt);
                return (
                <div
                  key={entry.courseId}
                  className="flex flex-col border border-border bg-card"
                >
                  <div className="flex items-start justify-between gap-3 border-b border-border bg-muted px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <span className="flex size-9 items-center justify-center border border-term-green/50 bg-term-green/10">
                        <Award className="size-4 text-term-green" />
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold">
                          {course.title}
                        </span>
                        <span className="block text-[10px] text-muted-foreground">
                          {course.category} track
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-3 px-4 py-4">
                    <div className="grid grid-cols-2 gap-3 text-[11px]">
                      <div>
                        <p className="uppercase tracking-wider text-muted-foreground">
                          completed
                        </p>
                        <p className="mt-1 font-medium">
                          {entry.updatedAt ? formatShortDate(entry.updatedAt) : "—"}
                        </p>
                      </div>
                      <div>
                        <p className="uppercase tracking-wider text-muted-foreground">
                          certificate no.
                        </p>
                        <p className="mt-1 font-mono font-medium">
                          {user
                            ? certIdOf(entry.courseId, user._id)
                            : "—"}
                        </p>
                      </div>
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      valid through{" "}
                      <span className="font-medium text-foreground">
                        {formatShortDate(expiry.expiresAt)}
                      </span>
                    </p>
                    {expiry.expired && (
                      <p className="border border-term-amber/40 bg-term-amber/[0.07] px-2.5 py-1.5 text-[11px] text-term-amber">
                        [warn] expired — certificates are valid for 24 months.
                        Retake the course to refresh this one.
                      </p>
                    )}
                    <p className="text-[11px] text-muted-foreground">
                      issued to{" "}
                      <span className="font-medium text-foreground">
                        {studentName}
                      </span>
                    </p>
                    <div className="mt-auto flex gap-2">
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="flex-1 gap-1.5 text-xs"
                      >
                        <Link to={`/certificate/${entry.courseId}`}>
                          <Eye className="size-3.5" />
                          view
                        </Link>
                      </Button>
                      <Button
                        asChild
                        size="sm"
                        className="flex-1 gap-1.5 text-xs"
                      >
                        <Link to={`/certificate/${entry.courseId}?print=1`}>
                          <Download className="size-3.5" />
                          save pdf
                        </Link>
                      </Button>
                    </div>
                    {expiry.expired && (
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="w-full gap-1.5 border-term-amber/40 text-term-amber hover:text-term-amber text-xs"
                      >
                        <Link to={`/courses/${course.slug}`}>
                          <RefreshCcw className="size-3.5" />
                          refresh certificate
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
                );
              })}
            </div>
          </>
        )}

        {!loading && inProgress.length > 0 && (
          <>
            <div className="mt-8 flex items-center gap-2 text-sm">
              <span className="text-term-green">$</span>
              <span>
                ls certificates/ --in-progress ({inProgress.length})
              </span>
            </div>
            <div className="mt-4 border border-border bg-card">
              {inProgress.map(({ progress: entry, course }) => (
                <Link
                  key={entry.courseId}
                  to={`/courses/${course.slug}`}
                  className="flex items-center justify-between gap-3 border-b border-border px-4 py-3 last:border-b-0 hover:bg-accent/30"
                >
                  <span className="flex min-w-0 items-center gap-2.5">
                    <Lock className="size-3.5 shrink-0 text-term-amber" />
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium">
                        {course.title}
                      </span>
                      <span className="block text-[11px] text-muted-foreground">
                        {course.modules?.length ?? 0} modules · finish the
                        course to earn your certificate
                      </span>
                    </span>
                  </span>
                  <span className="shrink-0 border border-term-amber/40 bg-term-amber/10 px-1.5 py-0.5 text-[10px] font-medium text-term-amber">
                    IN PROGRESS
                  </span>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
