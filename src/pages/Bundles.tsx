"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { formatMoney } from "@/lib/format";
import { useQuery } from "convex/react";
import { ArrowLeft, ChevronRight, Package, Tag } from "lucide-react";

export default function Bundles() {
  const { slug } = useParams<{ slug: string }>();
  const bundles = useQuery(api.bundles.list);

  if (slug) {
    return <BundleDetail slug={slug} />;
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <AppHeader path="~/bundles" />

      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        <p className="text-xs text-term-green">[ok] packs open — bundle pricing</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">Course Bundles</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Curated course packs at a bundled price. Booking any included course
          with the bundle's code applies the discount automatically — no
          cart needed.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {bundles === undefined &&
            Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="border border-border bg-card p-6">
                <div className="h-5 w-2/3 animate-pulse bg-muted" />
                <div className="mt-3 h-3 w-full animate-pulse bg-muted" />
                <div className="mt-2 h-3 w-4/5 animate-pulse bg-muted" />
              </div>
            ))}
          {bundles !== undefined && bundles.length === 0 && (
            <div className="border border-border bg-card px-6 py-12 text-center sm:col-span-2">
              <p className="text-sm text-muted-foreground">
                <span className="text-term-green">[ok]</span> no bundles on
                offer right now — check back soon.
              </p>
            </div>
          )}
          {bundles?.map((bundle) => {
            const savings = bundle.regularCents - bundle.priceCents;
            return (
              <Link
                key={bundle._id}
                to={`/bundles/${bundle.slug}`}
                className="group flex flex-col border border-border bg-card transition-colors hover:border-term-green/50"
              >
                <div className="flex items-start justify-between gap-3 border-b border-border bg-muted px-5 py-4">
                  <span className="flex items-center gap-2 text-sm font-semibold">
                    <Package className="size-4 text-term-green" />
                    {bundle.title}
                  </span>
                  <span className="border border-term-green/40 bg-term-green/10 px-1.5 py-0.5 text-[10px] font-medium text-term-green">
                    {bundle.courses.length} courses
                  </span>
                </div>
                <div className="flex flex-1 flex-col px-5 py-4">
                  <p className="text-xs leading-5 text-muted-foreground">
                    {bundle.description}
                  </p>
                  <p className="mt-3 text-[11px] text-muted-foreground">
                    {bundle.courses.map((c) => c.title).join(" · ")}
                  </p>
                  <div className="mt-4 flex items-end justify-between gap-3">
                    <div>
                      <p className="flex items-center gap-2">
                        <span className="text-lg font-bold text-term-green">
                          {formatMoney(bundle.priceCents)}
                        </span>
                        <span className="text-xs text-muted-foreground line-through">
                          {formatMoney(bundle.regularCents)}
                        </span>
                      </p>
                      <p className="mt-0.5 text-[11px] text-term-green">
                        save {formatMoney(savings)}
                      </p>
                    </div>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground transition-colors group-hover:text-term-green">
                      view bundle
                      <ChevronRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}

function BundleDetail({ slug }: { slug: string }) {
  const bundle = useQuery(api.bundles.getBySlug, { slug });
  if (bundle === undefined) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <AppHeader path="~/bundles/…" />
        <div className="mx-auto w-full max-w-3xl px-4 py-10">
          <div className="border border-border bg-card p-10 text-center text-sm text-muted-foreground">
            loading bundle…
          </div>
        </div>
      </main>
    );
  }

  if (bundle === null) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <AppHeader path="~/bundles/?" />
        <div className="mx-auto w-full max-w-3xl px-4 py-10">
          <div className="border border-border bg-card px-6 py-12 text-center">
            <p className="text-sm text-term-amber">[warn] bundle not found</p>
            <Button asChild variant="outline" size="sm" className="mt-5 text-xs">
              <Link href="/bundles">view all bundles</Link>
            </Button>
          </div>
        </div>
      </main>
    );
  }

  const savings = bundle.regularCents - bundle.priceCents;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <AppHeader path={`~/bundles/${bundle.slug}`} />

      <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
        <Link href="/bundles"
          className="group inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-term-green"
        >
          <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
          ../bundles
        </Link>

        <div className="mt-6 border border-border bg-card">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border bg-muted px-6 py-5">
            <div>
              <p className="flex items-center gap-2 text-lg font-bold">
                <Package className="size-5 text-term-green" />
                {bundle.title}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {bundle.courses.length} courses · {formatMoney(bundle.regularCents)}{" "}
                separately
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-term-green">
                {formatMoney(bundle.priceCents)}
              </p>
              <p className="text-[11px] text-term-green">
                save {formatMoney(savings)} with code{" "}
                <span className="font-mono">{bundle.couponCode}</span>
              </p>
            </div>
          </div>

          <div className="px-6 py-5">
            <p className="text-sm leading-6 text-muted-foreground">
              {bundle.description}
            </p>
          </div>

          <div className="border-t border-border">
            <div className="grid grid-cols-[1fr_5rem_auto] items-center gap-3 border-b border-border bg-muted px-4 py-2 text-[11px] uppercase tracking-wider text-muted-foreground sm:grid-cols-[1fr_5rem_9rem_auto]">
              <span>included course</span>
              <span className="text-right">time</span>
              <span className="hidden text-right sm:block">price</span>
              <span className="w-40 text-right">book</span>
            </div>
            {bundle.courses.map((course) => (
              <div
                key={course._id}
                className="grid grid-cols-[1fr_5rem_auto] items-center gap-3 border-b border-border px-4 py-3 last:border-b-0 hover:bg-accent/30 sm:grid-cols-[1fr_5rem_9rem_auto]"
              >
                <Link href={`/courses/${course.slug}`}
                  className="min-w-0 truncate text-sm font-medium underline-offset-4 hover:underline"
                >
                  {course.title}
                </Link>
                <span className="text-right text-xs text-muted-foreground">
                  {course.durationMinutes}m
                </span>
                <span className="hidden text-right text-xs text-muted-foreground sm:block">
                  {formatMoney(course.priceCents)}
                </span>
                <span className="flex w-40 justify-end">
                  <Button
                    asChild
                    size="sm"
                    className="gap-1.5 text-[11px]"
                  >
                    <Link href={`/courses/${course.slug}?coupon=${bundle.couponCode}`}>
                      <Tag className="size-3" />
                      book with discount
                    </Link>
                  </Button>
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-border bg-muted/40 px-6 py-3 text-[11px] text-muted-foreground">
            <span className="text-term-green">[ok]</span> how it works: book
            each course as usual — the bundle code is pre-applied, so you pay{" "}
            {formatMoney(bundle.priceCents)} total instead of{" "}
            {formatMoney(bundle.regularCents)}.
          </div>
        </div>
      </div>
    </main>
  );
}
