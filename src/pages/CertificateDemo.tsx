import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Award, BadgeCheck, Printer } from "lucide-react";
import { useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router";

/**
 * Demo certificate — shows the full certificate design with sample data.
 * Accessible at /certificate-demo without needing course completion.
 */

const DEMO = {
  studentName: "Sarah Okonkwo",
  courseTitle: "AI-Powered Crop Monitoring",
  category: "AI in Agriculture",
  durationMinutes: 360,
  moduleCount: 6,
  instructor: "Dr. James Mwangi",
  instructorTitle: "Senior Agronomist & AI Researcher",
  completedAt: new Date("2025-07-15"),
  certId: "AGS-7X4K-8B2M",
  year: 2025,
  expiresAt: new Date("2027-07-15"),
};

function formatShort(d: Date) {
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function CertificateDemo() {
  const [searchParams] = useSearchParams();
  const autoPrint = searchParams.get("print") === "1";
  const printedRef = useRef(false);

  useEffect(() => {
    if (!autoPrint || printedRef.current) return;
    printedRef.current = true;
    const timer = window.setTimeout(() => window.print(), 200);
    return () => window.clearTimeout(timer);
  }, [autoPrint]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <AppHeader path="~/certificate-demo" />

      <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <p className="text-xs text-term-green">
            [ok] certificate preview — demo data
          </p>
          <div className="flex gap-2">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="gap-1.5 text-xs"
            >
              <Link to="/verify-credential">
                <BadgeCheck className="size-3.5" />
                verify online
              </Link>
            </Button>
            <Button
              onClick={() => window.print()}
              size="sm"
              className="gap-1.5 text-xs"
            >
              <Printer className="size-3.5" />
              print / save pdf
            </Button>
          </div>
        </div>

        <p className="mb-6 text-xs text-muted-foreground print:hidden">
          This is a live preview of the certificate students receive after
          completing a course. Click <strong>print / save pdf</strong> to export
          it as a PDF.
        </p>

        {/* ── Print styles ────────────────────────────────────────── */}
        <style>{`
          @media print {
            * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            body { background: #ffffff !important; }
            body * { visibility: hidden; }
            #certificate-demo, #certificate-demo * { visibility: visible; }
            #certificate-demo {
              position: absolute; left: 0; top: 0; width: 100%;
              margin: 0; border: none !important;
            }
          }
        `}</style>

        {/* ── Certificate body ────────────────────────────────────── */}
        <div
          id="certificate-demo"
          className="border-2 border-double border-border bg-card shadow-[6px_6px_0_0_color-mix(in_oklch,var(--term-green)_12%,transparent)]"
        >
          <div className="m-3 border border-border/60">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border/60 bg-muted/40 px-6 py-3">
              <span className="text-sm font-bold tracking-tight">
                AgriSkills
                <span className="ml-1 font-normal text-muted-foreground">
                  Academy
                </span>
              </span>
              <span className="font-mono text-[10px] text-muted-foreground">
                doc. {DEMO.certId}
              </span>
            </div>

            {/* Body */}
            <div className="px-8 py-12 text-center sm:px-16">
              {/* Seal */}
              <div className="mx-auto flex size-16 items-center justify-center rounded-full border-2 border-term-green/50 bg-term-green/5">
                <Award className="size-7 text-term-green" />
              </div>

              <p className="mt-6 text-[11px] uppercase tracking-[0.35em] text-term-green">
                certificate of completion
              </p>

              {/* Student name */}
              <div className="mx-auto mt-8 max-w-md border-y border-dashed border-border/70 py-6">
                <p className="text-xs text-muted-foreground">
                  this certifies that
                </p>
                <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                  {DEMO.studentName}
                </p>
                <p className="mt-2 font-mono text-[11px] text-term-green">
                  [ok] verified — {DEMO.moduleCount} modules completed
                </p>
              </div>

              {/* Course info */}
              <p className="mt-8 text-xs text-muted-foreground">
                has successfully completed the course
              </p>
              <p className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
                {DEMO.courseTitle}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                {DEMO.category} track · {DEMO.durationMinutes} minutes ·{" "}
                {DEMO.moduleCount} modules
              </p>

              {/* Details grid */}
              <div className="mx-auto mt-10 grid max-w-lg grid-cols-3 gap-6 text-left">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    completed
                  </p>
                  <p className="mt-1 text-sm font-medium">
                    {formatShort(DEMO.completedAt)}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    valid through {formatShort(DEMO.expiresAt)}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    issued by
                  </p>
                  <p className="mt-1 text-sm font-medium">
                    {DEMO.instructor}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {DEMO.instructorTitle}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    certificate no.
                  </p>
                  <p className="mt-1 font-mono text-sm font-medium">
                    {DEMO.certId}
                  </p>
                </div>
              </div>

              {/* Signature */}
              <div className="mx-auto mt-12 max-w-lg">
                <div className="border-t-2 border-border pt-2">
                  <p className="font-mono text-sm">{DEMO.instructor}</p>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    instructor signature
                  </p>
                </div>
              </div>

              {/* Footer */}
              <p className="mt-10 font-mono text-[10px] text-muted-foreground">
                issued by AgriSkills Academy · {DEMO.year} · valid through{" "}
                {formatShort(DEMO.expiresAt)}
              </p>
            </div>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground print:hidden">
          <span className="text-term-green">[ok]</span> this certificate
          design is exactly what students receive — personalized with their name,
          course, and completion date.
        </p>
      </div>
    </main>
  );
}
