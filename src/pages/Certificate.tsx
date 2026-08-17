import { api } from "@/convex/_generated/api";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "convex/react";
import { Award, BadgeCheck, Loader2, Printer } from "lucide-react";
import { useEffect, useRef } from "react";
import { Link, useParams, useSearchParams } from "react-router";

export default function Certificate() {
  const { courseId } = useParams<{ courseId: string }>();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const progress = useQuery(api.progress.myProgress);
  const courses = useQuery(api.courses.list);

  const entry = courseId
    ? progress?.find((p) => p.courseId === courseId)
    : undefined;
  const course = courseId
    ? courses?.find((c) => c._id === courseId)
    : undefined;

  const loading = progress === undefined || courses === undefined;
  const eligible = entry?.status === "completed";
  const completedAt = entry?.updatedAt;
  const certId =
    courseId && user
      ? `AGS-${courseId.slice(-4).toUpperCase()}-${user._id
          .slice(-4)
          .toUpperCase()}`
      : "";
  const studentName =
    user?.name?.trim() || (user?.email ? user.email.split("@")[0] : "Student");
  const moduleCount = course?.modules?.length ?? (course ? 1 : 0);

  // One-click "save pdf" from the certificates gallery: ?print=1 opens the
  // print dialog automatically once the certificate has painted.
  const autoPrint = searchParams.get("print") === "1";
  const printedRef = useRef(false);
  useEffect(() => {
    if (!autoPrint || !eligible || !course || printedRef.current) return;
    printedRef.current = true;
    const timer = window.setTimeout(() => window.print(), 150);
    return () => window.clearTimeout(timer);
  }, [autoPrint, eligible, course]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <AppHeader path={`~/certificate/${courseId}`} />

      <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
        {loading && (
          <div className="border border-border bg-card p-10 text-center">
            <Loader2 className="mx-auto size-6 animate-spin text-term-green" />
            <p className="mt-3 text-sm text-muted-foreground">
              loading certificate…
            </p>
          </div>
        )}

        {!loading && !eligible && (
          <div className="border border-border bg-card px-6 py-12 text-center">
            <Award className="mx-auto size-8 text-term-amber" />
            <p className="mt-3 text-sm">
              <span className="text-term-amber">[warn]</span> certificate
              unavailable
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Certificates are issued once you mark this course as completed on
              the course page.
            </p>
            <div className="mt-5 flex justify-center gap-2">
              <Button asChild variant="outline" size="sm" className="text-xs">
                <Link to={`/courses/${course?.slug ?? ""}`}>view course</Link>
              </Button>
              <Button asChild size="sm" className="text-xs">
                <Link to="/dashboard">my sessions</Link>
              </Button>
            </div>
          </div>
        )}

        {!loading && eligible && course && (
          <>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-term-green">
                [ok] certificate issued — printable below
              </p>
              <div className="flex gap-2">
                <Button asChild variant="outline" size="sm" className="gap-1.5 text-xs print:hidden">
                  <Link to={`/verify?code=${encodeURIComponent(certId)}`}>
                    <BadgeCheck className="size-3.5" />
                    verify online
                  </Link>
                </Button>
                <Button
                  onClick={() => window.print()}
                  size="sm"
                  className="gap-1.5 text-xs print:hidden"
                >
                  <Printer className="size-3.5" />
                  print / save pdf
                </Button>
              </div>
            </div>

            <style>{`
              @media print {
                * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                body { background: #ffffff !important; }
                body * { visibility: hidden; }
                #certificate, #certificate * { visibility: visible; }
                #certificate {
                  position: absolute; left: 0; top: 0; width: 100%;
                  margin: 0; border: none !important;
                }
              }
            `}</style>

            <div
              id="certificate"
              className="border-2 border-double border-border bg-card shadow-[6px_6px_0_0_color-mix(in_oklch,var(--term-green)_12%,transparent)]"
            >
              <div className="m-3 border border-border/60">
                <div className="flex items-center justify-between border-b border-border/60 bg-muted/40 px-6 py-3">
                  <span className="text-sm font-bold tracking-tight">
                    AgriSkills
                    <span className="ml-1 font-normal text-muted-foreground">
                      Academy
                    </span>
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground">
                    doc. {certId}
                  </span>
                </div>

                <div className="px-8 py-12 text-center sm:px-16">
                  <div className="mx-auto flex size-16 items-center justify-center rounded-full border-2 border-term-green/50">
                    <Award className="size-7 text-term-green" />
                  </div>
                  <p className="mt-6 text-[11px] uppercase tracking-[0.35em] text-term-green">
                    certificate of completion
                  </p>

                  <div className="mx-auto mt-8 max-w-md border-y border-dashed border-border/70 py-6">
                    <p className="text-xs text-muted-foreground">
                      this certifies that
                    </p>
                    <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                      {studentName}
                    </p>
                    <p className="mt-2 font-mono text-[11px] text-term-green">
                      [ok] verified — {moduleCount} modules completed
                    </p>
                  </div>

                  <p className="mt-8 text-xs text-muted-foreground">
                    has successfully completed the course
                  </p>
                  <p className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
                    {course.title}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {course.category} track · {course.durationMinutes} minutes ·
                    {moduleCount} modules
                  </p>

                <div className="mx-auto mt-10 grid max-w-lg grid-cols-3 gap-6 text-left">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      completed
                    </p>
                    <p className="mt-1 text-sm font-medium">
                      {completedAt
                        ? new Date(completedAt).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      issued by
                    </p>
                    <p className="mt-1 text-sm font-medium">
                      {course.instructor ?? "AgriSkills Academy"}
                    </p>
                    {course.instructorTitle && (
                      <p className="text-[10px] text-muted-foreground">
                        {course.instructorTitle}
                      </p>
                    )}
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      certificate no.
                    </p>
                    <p className="mt-1 font-mono text-sm font-medium">
                      {certId}
                    </p>
                  </div>
                </div>

                <div className="mx-auto mt-12 max-w-lg">
                  <div className="border-t-2 border-border pt-2">
                    <p className="font-mono text-sm">
                      {course.instructor ?? "Academy Faculty"}
                    </p>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      instructor signature
                    </p>
                  </div>
                </div>

                <p className="mt-10 font-mono text-[10px] text-muted-foreground">
                  issued by AgriSkills Academy · {new Date().getFullYear()}
                </p>
              </div>
            </div>
          </div>

            <p className="mt-4 text-center text-xs text-muted-foreground print:hidden">
              <span className="text-term-green">[ok]</span> this certificate is
              tied to your account and the course completion date above.
            </p>
          </>
        )}
      </div>
    </main>
  );
}
