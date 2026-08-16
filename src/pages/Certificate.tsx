import { api } from "@/convex/_generated/api";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "convex/react";
import { Award, Loader2, Printer } from "lucide-react";
import { Link, useParams } from "react-router";

export default function Certificate() {
  const { courseId } = useParams<{ courseId: string }>();
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
  const completedAt = entry?.updatedAt ?? Date.now();
  const certId =
    courseId && user
      ? `AGS-${courseId.slice(-4).toUpperCase()}-${user._id
          .slice(-4)
          .toUpperCase()}`
      : "";
  const studentName =
    user?.name?.trim() || (user?.email ? user.email.split("@")[0] : "Student");

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
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs text-term-green">
                [ok] certificate issued — printable below
              </p>
              <Button
                onClick={() => window.print()}
                size="sm"
                className="gap-1.5 text-xs print:hidden"
              >
                <Printer className="size-3.5" />
                print / save pdf
              </Button>
            </div>

            <style>{`
              @media print {
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
              className="border border-border bg-card shadow-[6px_6px_0_0_color-mix(in_oklch,var(--term-green)_12%,transparent)]"
            >
              <div className="flex items-center justify-between border-b-2 border-double border-border bg-muted px-5 py-3">
                <span className="text-xs font-semibold tracking-tight">
                  AgriSkills
                  <span className="ml-1 font-normal text-muted-foreground">
                    Academy
                  </span>
                </span>
                <span className="text-[10px] text-muted-foreground">
                  certificate · {certId}
                </span>
              </div>

              <div className="px-8 py-12 text-center sm:px-14">
                <p className="text-[11px] uppercase tracking-[0.3em] text-term-green">
                  certificate of completion
                </p>
                <p className="mt-6 text-xs text-muted-foreground">
                  this certifies that
                </p>
                <p className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                  {studentName}
                </p>
                <p className="mt-6 text-xs text-muted-foreground">
                  has successfully completed the course
                </p>
                <p className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
                  {course.title}
                </p>
                <p className="mt-3 text-xs leading-5 text-muted-foreground">
                  {course.category} · {course.durationMinutes} minutes of
                  training
                </p>

                <div className="mx-auto mt-10 grid max-w-md grid-cols-2 gap-6 text-left">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      completed
                    </p>
                    <p className="mt-1 text-sm font-medium">
                      {new Date(completedAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      issued by
                    </p>
                    <p className="mt-1 text-sm font-medium">
                      {course.instructor ?? "AgriSkills Academy"}
                      {course.instructor && course.instructorTitle
                        ? ` · ${course.instructorTitle}`
                        : ""}
                    </p>
                  </div>
                </div>

                <div className="mx-auto mt-10 flex max-w-md items-end justify-between border-t border-border pt-4 text-[10px] text-muted-foreground">
                  <span className="max-w-[45%]">
                    certificate no. {certId} — verify at the academy office
                  </span>
                  <span>
                    issued by AgriSkills Academy · {new Date().getFullYear()}
                  </span>
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
