import { api } from "@/convex/_generated/api";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery } from "convex/react";
import { Award, BadgeCheck, Loader2, Search, XCircle } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router";

export default function Verify() {
  const [searchParams] = useSearchParams();
  const [code, setCode] = useState(searchParams.get("code") ?? "");
  const [submitted, setSubmitted] = useState<string | null>(
    searchParams.get("code") ?? null,
  );
  const result = useQuery(
    api.certificates.verify,
    submitted ? { code: submitted } : "skip",
  );
  const expired = result?.valid ? result.expiresAt <= Date.now() : false;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitted(code.trim());
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <AppHeader path="~/verify-certificate" />

      <div className="mx-auto w-full max-w-xl px-4 py-10 sm:px-6">
        <p className="text-xs text-term-green">[ok] public ledger — no sign-in required</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">
          Verify a Certificate
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Employers and buyers can confirm any AgriSkills certificate is
          genuine. Enter the certificate number from the document — it looks
          like <span className="font-mono text-xs">AGS-XXXX-YYYY</span>.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 flex items-center gap-2"
        >
          <span className="font-mono text-xs text-term-green">$</span>
          <Input
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="AGS-XXXX-YYYY"
            className="font-mono uppercase"
            maxLength={14}
          />
          <Button type="submit" className="gap-1.5 text-xs" disabled={!code.trim()}>
            <Search className="size-3.5" />
            verify
          </Button>
        </form>

        {submitted && result === undefined && (
          <div className="mt-8 border border-border bg-card p-10 text-center">
            <Loader2 className="mx-auto size-6 animate-spin text-term-green" />
            <p className="mt-3 text-sm text-muted-foreground">
              checking certificate…
            </p>
          </div>
        )}

        {submitted && result === null && (
          <div className="mt-8 border border-term-amber/40 bg-term-amber/[0.07] px-6 py-10 text-center">
            <XCircle className="mx-auto size-8 text-term-amber" />
            <p className="mt-3 text-sm font-medium text-term-amber">
              [warn] certificate not found
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              No completed course matches this number. Double-check the
              certificate — codes look like AGS-XXXX-YYYY and are case
              insensitive.
            </p>
          </div>
        )}

        {result?.valid && (
          <div className="mt-8 border-2 border-double border-term-green/40 bg-card shadow-[6px_6px_0_0_color-mix(in_oklch,var(--term-green)_12%,transparent)]">
            <div className="flex items-center justify-between border-b border-border/60 bg-muted/40 px-5 py-3">
              <span className="flex items-center gap-2 text-sm font-bold">
                <BadgeCheck className="size-4 text-term-green" />
                verified
                <span className="font-normal text-muted-foreground">
                  genuine certificate
                </span>
              </span>
              <span className="font-mono text-[10px] text-muted-foreground">
                {result.certId}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 px-5 py-6 sm:grid-cols-3">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  issued to
                </p>
                <p className="mt-1 text-sm font-semibold">
                  {result.studentName}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  course
                </p>
                <p className="mt-1 text-sm font-medium">{result.courseTitle}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  completed
                </p>
                <p className="mt-1 text-sm font-medium">
                  {new Date(result.completedAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  valid through
                </p>
                <p className="mt-1 text-sm font-medium">
                  {new Date(result.expiresAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                {expired && (
                  <p className="mt-0.5 text-[10px] font-medium text-term-amber">
                    [warn] expired
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-border/60 bg-muted/40 px-5 py-2.5">
              <span className="flex items-center gap-1.5 text-[11px] text-term-green">
                <Award className="size-3.5" />
                [ok] issued by AgriSkills Academy
              </span>
              <span className="text-[11px] text-muted-foreground">
                {result.category} track
              </span>
            </div>
            {expired && (
              <p className="border-t border-border/60 px-5 py-3 text-[11px] text-term-amber">
                [warn] this certificate lapsed{" "}
                {new Date(result.expiresAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
                . AgriSkills certificates are valid for 24 months from
                completion — ask the holder to refresh the course.
              </p>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
