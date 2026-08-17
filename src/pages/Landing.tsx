import { Button } from "@/components/ui/button";
import { useCatalog } from "@/hooks/use-catalog";
import { formatMoney } from "@/lib/format";
import { ArrowRight, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: "easeOut" as const },
};

function WindowDots() {
  return (
    <span className="flex items-center gap-1.5">
      <span className="size-2.5 rounded-full border border-border bg-muted" />
      <span className="size-2.5 rounded-full border border-border bg-muted" />
      <span className="size-2.5 rounded-full border border-border bg-muted" />
    </span>
  );
}

function Brand() {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <span className="inline-block size-3.5 bg-term-green" />
      <span className="text-sm font-semibold tracking-tight">
        AgriSkills
        <span className="ml-1 font-normal text-muted-foreground">Academy</span>
      </span>
      <span className="hidden text-xs text-muted-foreground sm:inline">
        v1.0
      </span>
    </Link>
  );
}

export default function Landing() {
  const courses = useCatalog();
  const published = courses?.filter((c) => c.published) ?? [];
  const categories = Array.from(
    new Map(published.map((c) => [c.category, c.category])).values(),
  );

  const totalMinutes =
    published.reduce((sum, c) => sum + c.durationMinutes, 0) ?? 0;
  const catalogRows = published.slice(0, 4);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── Top bar ─────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-sm">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <Brand />
          <nav className="hidden items-center gap-6 text-xs text-muted-foreground md:flex">
            <Link
              to="/courses"
              className="transition-colors hover:text-foreground"
            >
              ./catalog
            </Link>
            <Link
              to="/instructors"
              className="transition-colors hover:text-foreground"
            >
              ./instructors
            </Link>
            <a href="#how" className="transition-colors hover:text-foreground">
              ./how-it-works
            </a>
            <a
              href="#access"
              className="transition-colors hover:text-foreground"
            >
              ./access
            </a>
            <a
              href="#field-notes"
              className="transition-colors hover:text-foreground"
            >
              ./field-notes
            </a>
            <a href="#faq" className="transition-colors hover:text-foreground">
              ./faq
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm" className="text-xs">
              <Link to="/auth">
                <span className="text-term-green">$</span> sign_in
              </Link>
            </Button>
            <Button asChild size="sm" className="text-xs">
              <Link to="/courses">
                browse catalog <ArrowRight className="size-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="bg-grid-faint relative overflow-hidden border-b border-border">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:py-28">
          <motion.div {...fadeUp}>
            <p className="flex items-center gap-2 text-xs text-term-green">
              <span className="inline-block size-2 rounded-full bg-term-green-bright" />
              [ok] academy online — customer training open for enrollment
            </p>
            <h1 className="mt-5 text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.4rem]">
              Training for the people
              <br />
              who run your
              <br />
              <span className="text-term-green">operation.</span>
            </h1>
            <p className="mt-6 max-w-md text-sm leading-6 text-muted-foreground">
              AgriSkills Academy is the customer training program behind our
              products and services. A structured catalog of practical courses,
              live instructor sessions, and a booking flow built for working
              operations — not classrooms.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="gap-2 text-sm">
                <Link to="/courses">
                  browse catalog <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-sm">
                <Link to="/auth?returnTo=/courses">
                  <span className="text-term-green">$</span> create account
                </Link>
              </Button>
            </div>
            <p className="mt-6 text-xs text-muted-foreground">
              // customer access — sign in with email or continue as a guest
            </p>
          </motion.div>

          {/* terminal mockup */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
            className="border border-border bg-card shadow-[6px_6px_0_0_color-mix(in_oklch,var(--term-green)_12%,transparent)]"
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
              <span className="text-xs text-muted-foreground">
                agriskills — customer session
              </span>
              <WindowDots />
            </div>
            <div className="space-y-2.5 px-4 py-5 text-[13px] leading-5">
              <p>
                <span className="text-term-green">$</span>{" "}
                <span className="text-foreground">
                  agriskills init --customer
                </span>
              </p>
              <p className="text-term-green">
                [ok] account ready · welcome back
              </p>
              <p>
                <span className="text-term-green">$</span>{" "}
                <span className="text-foreground">
                  agriskills catalog ls --published
                </span>
              </p>
              <div className="border border-border">
                <div className="grid grid-cols-[2.5rem_1fr_auto_auto] gap-x-4 border-b border-border bg-muted px-3 py-1.5 text-[11px] uppercase tracking-wider text-muted-foreground">
                  <span>code</span>
                  <span>title</span>
                  <span className="text-right">time</span>
                  <span className="w-12 text-right">price</span>
                </div>
                {catalogRows.map((course) => (
                  <div
                    key={course._id}
                    className="grid grid-cols-[2.5rem_1fr_auto_auto] gap-x-4 border-b border-border px-3 py-1.5 last:border-b-0"
                  >
                    <span className="text-term-green">
                      {String(course.order).padStart(2, "0")}
                    </span>
                    <span className="truncate">{course.title}</span>
                    <span className="text-right text-muted-foreground">
                      {course.durationMinutes}m
                    </span>
                    <span className="w-12 text-right text-muted-foreground">
                      {formatMoney(course.priceCents)}
                    </span>
                  </div>
                ))}
              </div>
              <p>
                <span className="text-term-green">$</span>{" "}
                <span className="text-foreground">
                  agriskills book --next-session
                </span>
              </p>
              <p className="text-term-green">
                [ok] session found · seats available
              </p>
              <p>
                <span className="text-term-green">$</span>{" "}
                <span className="text-foreground">agriskills pay --secure</span>
              </p>
              <p className="text-term-green">
                [ok] checkout complete · booking confirmed
              </p>
              <p>
                <span className="text-term-green">$</span>{" "}
                <span className="inline-block h-4 w-2 translate-y-0.5 bg-foreground cursor-blink" />
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Stats ───────────────────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-2 divide-x divide-border border-x border-border lg:grid-cols-4">
          <div className="px-4 py-6 sm:px-6">
            <p className="text-2xl font-bold text-term-green">
              {published.length}
            </p>
            <p className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">
              courses live
            </p>
          </div>
          <div className="px-4 py-6 sm:px-6">
            <p className="text-2xl font-bold text-term-green">
              {categories.length}
            </p>
            <p className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">
              training tracks
            </p>
          </div>
          <div className="px-4 py-6 sm:px-6">
            <p className="text-2xl font-bold text-term-green">
              {totalMinutes} min
            </p>
            <p className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">
              total course load
            </p>
          </div>
          <div className="px-4 py-6 sm:px-6">
            <p className="text-2xl font-bold text-term-green">1 day</p>
            <p className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">
              support response
            </p>
          </div>
        </div>
      </section>

      {/* ── Catalog ─────────────────────────────────────────────── */}
      <section id="catalog" className="border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs text-term-green">// catalog</p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                {published.length} courses. {categories.length} tracks. One
                standard.
              </h2>
            </div>
            <p className="text-xs text-muted-foreground">
              total load ≈ {totalMinutes} min · follow each track top to bottom
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {categories.map((category, i) => {
              const categoryCourses = published.filter(
                (c) => c.category === category,
              );
              return (
                <div
                  key={category}
                  className="border border-border bg-card transition-colors hover:border-term-green/50"
                >
                  <div className="flex items-center justify-between border-b border-border bg-muted px-4 py-2.5">
                    <span className="text-xs font-semibold">
                      track/{String(i + 1).padStart(2, "0")} — {category}
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      {categoryCourses.length}{" "}
                      {categoryCourses.length === 1 ? "course" : "courses"}
                    </span>
                  </div>
                  <div className="p-2">
                    {categoryCourses.map((course, idx) => (
                      <Link
                        key={course._id}
                        to={`/courses/${course.slug}`}
                        className="group flex items-start gap-3 px-2 py-2.5 transition-colors hover:bg-accent/60"
                      >
                        <span className="mt-0.5 text-[11px] text-muted-foreground">
                          [{String(idx + 1).padStart(2, "0")}]
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[13px] font-medium group-hover:text-accent-foreground">
                            {course.title}
                          </span>
                          <span className="mt-0.5 block text-[11px] leading-4 text-muted-foreground">
                            {course.description}
                          </span>
                        </span>
                        <span className="flex shrink-0 items-center gap-2 text-[11px] text-muted-foreground">
                          <span>
                            {course.durationMinutes}m ·{" "}
                            {formatMoney(course.priceCents)}
                          </span>
                          <ChevronRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:text-term-green" />
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}

            {published.length === 0 && (
              <div className="border border-border bg-card p-8 text-sm text-muted-foreground lg:col-span-2">
                <p>
                  <span className="text-term-amber">[warn]</span> catalog is
                  being prepared — courses will appear here once the academy
                  finishes seeding.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── How it works ────────────────────────────────────────── */}
      <section id="how" className="border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <p className="text-xs text-term-green">// how-it-works</p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
            From catalog to confirmed seat in four steps.
          </h2>
          <div className="mt-10 border border-border">
            {[
              {
                id: "01",
                title: "Browse the catalog",
                body: "Search and filter the full catalog of courses. Every course states its duration, its price, and the session schedule up front.",
              },
              {
                id: "02",
                title: "Book a live session",
                body: "Each course runs on instructor-led sessions with real capacity. Pick the time that fits your season — seats are confirmed in real time.",
              },
              {
                id: "03",
                title: "Pay securely",
                body: "Checkout is handled by Stripe with a hosted payment page. Free courses are confirmed the moment you book.",
              },
              {
                id: "04",
                title: "Keep the conversation going",
                body: "Every course has a comments thread for questions between sessions. Our team replies within one business day.",
              },
            ].map((row, i) => (
              <div
                key={row.id}
                className={`grid gap-2 px-4 py-4 sm:grid-cols-[3.5rem_11rem_1fr] sm:gap-6 sm:px-6 ${
                  i !== 0 ? "border-t border-border" : ""
                } ${i % 2 === 1 ? "bg-card" : ""}`}
              >
                <span className="text-xs text-term-green">{row.id}</span>
                <span className="text-sm font-semibold">{row.title}</span>
                <span className="text-sm leading-6 text-muted-foreground">
                  {row.body}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ────────────────────────────────────────── */}
      <section id="field-notes" className="border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <p className="text-xs text-term-green">// field-notes</p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
            What customers say after a season of training.
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                quote:
                  "We put two operators through the equipment care course before harvest. The daily walkaround checklist alone paid for the training inside the first month.",
                name: "Dana Whitfield",
                role: "Operations Lead, Whitfield Family Farms",
              },
              {
                quote:
                  "The irrigation course replaced guesswork with a record we can actually defend. Our water log is now part of the weekly meeting, not a binder on a shelf.",
                name: "Marcus Bell",
                role: "Farm Manager, Bell & Sons",
              },
              {
                quote:
                  "Booking a session was the easiest part — the schedule is clear, the confirmation is instant, and moving a seat when our plans changed took one minute.",
                name: "Elena Navarro",
                role: "Training Coordinator, Navarro Orchards",
              },
            ].map((item, i) => (
              <figure
                key={item.name}
                className="flex flex-col border border-border bg-card"
              >
                <div className="flex items-center justify-between border-b border-border bg-muted px-4 py-2">
                  <span className="text-[11px] text-muted-foreground">
                    note_{String(i + 1).padStart(2, "0")}.txt
                  </span>
                  <WindowDots />
                </div>
                <blockquote className="flex-1 px-4 py-5 text-[13px] leading-6">
                  “{item.quote}”
                </blockquote>
                <figcaption className="border-t border-border px-4 py-3">
                  <p className="text-xs font-semibold">{item.name}</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">
                    {item.role}
                  </p>
                  <p className="mt-1 text-[10px] text-term-green">
                    [verified] enrolled customer
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────── */}
      <section id="faq" className="border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <p className="text-xs text-term-green">// faq</p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
            Questions customers ask before enrolling.
          </h2>
          <div className="mt-10 space-y-3">
            {[
              {
                q: "Do I need to pay before I can look at a course?",
                a: "No. The full catalog — including every course's material and its comments — is open to anyone with an account. Payment only happens when you book a live session for a paid course.",
              },
              {
                q: "What happens if a session is full?",
                a: "You can join that session's waitlist. When a seat opens up, it is offered to the waitlist in order, and you receive a booking you can settle at checkout.",
              },
              {
                q: "Can I move my booking to another time?",
                a: "Yes. Open the booking from your sessions page and choose reschedule. Any other upcoming session of the same course with a free seat is available.",
              },
              {
                q: "Is my payment secure?",
                a: "Checkout runs on Stripe's hosted payment pages, so card details never touch the academy's servers. You will receive a confirmation email the moment a payment clears.",
              },
              {
                q: "Who do I ask if I get stuck on a course?",
                a: "Every course has a comments thread answered by our team within one business day. For anything urgent, your account manager has the direct line.",
              },
            ].map((item, i) => (
              <details
                key={item.q}
                className="group border border-border bg-card open:border-term-green/50"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3.5 text-sm font-medium [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center gap-3">
                    <span className="text-[11px] text-term-green">
                      [{String(i + 1).padStart(2, "0")}]
                    </span>
                    {item.q}
                  </span>
                  <span className="text-xs text-muted-foreground transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="border-t border-border px-4 py-3.5 pl-[3.25rem] text-sm leading-6 text-muted-foreground">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Access CTA ──────────────────────────────────────────── */}
      <section id="access" className="border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <div className="border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
              <span className="text-xs text-muted-foreground">
                agriskills — enroll
              </span>
              <WindowDots />
            </div>
            <div className="flex flex-col items-start gap-6 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <div>
                <p className="text-sm">
                  <span className="text-term-green">$</span>{" "}
                  <span className="font-semibold">
                    agriskills enroll --now
                  </span>
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  // email verification or instant guest access — customers only
                </p>
              </div>
              <div className="flex w-full flex-wrap gap-3 sm:w-auto">
                <Button asChild className="gap-2 text-sm">
                  <Link to="/courses">
                    browse catalog <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="text-sm">
                  <Link to="/auth">sign in</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-10 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          <span className="text-term-green">agriskills_academy</span> © 2026 —
          customer training
        </p>
        <p>// courses, live sessions, and support for our customers.</p>
      </footer>
    </div>
  );
}
