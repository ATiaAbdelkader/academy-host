"use client";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCatalog } from "@/hooks/use-catalog";
import { formatMoney } from "@/lib/format";
import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  Leaf,
  Sprout,
  Zap,
  Sun,
  Droplets,
  Award,
  Users,
  TrendingUp,
  TreePine,
  Menu,
  X,
} from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" as const },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.08 } },
};

const item = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" as const },
};

function MobileLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <Link href={href}
      onClick={onClick}
      className="block rounded px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-accent/60 hover:text-foreground"
    >
      {children}
    </Link>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="border-b border-border bg-background px-4 pb-4 pt-2 md:hidden">
      <MobileLink href="/courses" onClick={onClose}>./catalog</MobileLink>
      <MobileLink href="/instructors" onClick={onClose}>./instructors</MobileLink>
      <MobileLink href="#features" onClick={onClose}>./features</MobileLink>
      <MobileLink href="#how" onClick={onClose}>./how-it-works</MobileLink>
      <MobileLink href="#testimonials" onClick={onClose}>./testimonials</MobileLink>
      <MobileLink href="#faq" onClick={onClose}>./faq</MobileLink>
    </div>
  );
}

function Brand() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <span className="flex size-7 items-center justify-center bg-term-green shadow-md glow-pulse">
        <Leaf className="size-4 text-white" />
      </span>
      <span className="text-sm font-bold tracking-tight">
        AgriSkills
        <span className="ml-1 font-normal text-muted-foreground">Academy</span>
      </span>
    </Link>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
  accent = "green",
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  accent?: "green" | "amber";
}) {
  const iconBorder = accent === "green"
    ? "border-term-green/30 bg-term-green/10 text-term-green"
    : "border-term-amber/30 bg-term-amber/10 text-term-amber";
  return (
    <div className="group relative overflow-hidden border border-border bg-card p-7 transition-all hover:border-term-green/40 hover:shadow-[4px_4px_0_0_color-mix(in_oklch,var(--term-green)_10%,transparent)]">
      <div className="pointer-events-none absolute -top-12 -right-12 size-32 rounded-full bg-agri-green/5 blur-2xl transition-all group-hover:bg-agri-green/10" />
      <div
        className={`mb-3 inline-flex items-center justify-center size-9 rounded-2xl border ${iconBorder}`}
      >
        <Icon className="size-5" />
      </div>
      <h3 className="text-sm font-semibold tracking-tight">{title}</h3>
      <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

export default function Landing() {
  const courses = useCatalog();
  const published = courses?.filter((c) => c.published) ?? [];
  const categories = Array.from(
    new Map(published.map((c) => [c.category, c.category])).values(),
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  const totalMinutes =
    published.reduce((sum, c) => sum + c.durationMinutes, 0) ?? 0;
  const catalogRows = published.slice(0, 5);
  const featuredCategories = categories.slice(0, 6);

  const statsData = [
    { icon: BookOpen, value: published.length, label: "courses live", color: "green" as const },
    { icon: TreePine, value: categories.length, label: "training tracks", color: "green" as const },
    { icon: Sun, value: `${Math.floor(totalMinutes / 60)}h+`, label: "total content", color: "amber" as const },
    { icon: Award, value: "100%", label: "certification", color: "green" as const },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── Top bar ─────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-border glass-header">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <Brand />
          <nav className="hidden items-center gap-1 text-xs text-muted-foreground md:flex">
            <Link href="/courses"
              className="rounded px-2.5 py-1.5 transition-colors hover:bg-accent/60 hover:text-foreground"
            >
              ./catalog
            </Link>
            <Link href="/instructors"
              className="rounded px-2.5 py-1.5 transition-colors hover:bg-accent/60 hover:text-foreground"
            >
              ./instructors
            </Link>
            <a
              href="#features"
              className="rounded px-2.5 py-1.5 transition-colors hover:bg-accent/60 hover:text-foreground"
            >
              ./features
            </a>
            <a
              href="#how"
              className="rounded px-2.5 py-1.5 transition-colors hover:bg-accent/60 hover:text-foreground"
            >
              ./how-it-works
            </a>
            <a
              href="#testimonials"
              className="rounded px-2.5 py-1.5 transition-colors hover:bg-accent/60 hover:text-foreground"
            >
              ./testimonials
            </a>
            <a
              href="#faq"
              className="rounded px-2.5 py-1.5 transition-colors hover:bg-accent/60 hover:text-foreground"
            >
              ./faq
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <button
              className="inline-flex items-center justify-center rounded p-2 text-muted-foreground transition-colors hover:bg-accent/60 hover:text-foreground md:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
            <Button asChild variant="ghost" size="sm" className="hidden text-xs sm:inline-flex">
              <Link href="/auth">
                <span className="text-term-green">$</span> sign_in
              </Link>
            </Button>
            <Button asChild size="sm" className="hidden text-xs gap-1.5 sm:inline-flex">
              <Link href="/courses">
                browse catalog <ArrowRight className="size-3.5" />
              </Link>
            </Button>
          </div>
        </div>
        <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
      </header>

      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-border bg-leaf-pattern noise-bg">
        {/* decorative top bar */}
        <div className="h-1 bg-gradient-to-r from-term-green/20 via-term-green to-term-green/20" />

        <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:py-28">
          <motion.div {...fadeUp}>
            <div className="mb-4 inline-flex items-center gap-2 border border-term-green/30 bg-term-green/10 px-3 py-1.5 text-xs text-term-green">
              <Zap className="size-3.5" />
              <span>[ok] enrollment open — new season</span>
            </div>
            <h1 className="text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              Grow your skills
              <br />
              from the
              <br />
              <span className="text-term-green">ground up.</span>
            </h1>
            <p className="mt-6 max-w-md text-sm leading-6 text-muted-foreground">
              AgriSkills Academy is a hands-on training platform for agriculture
              professionals. Practical courses on modern farming, AI-powered
              crop management, irrigation systems, and sustainable practices —
              built for people who work the land.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="gap-2 text-sm">
                <Link href="/courses">
                  explore courses <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-sm">
                <Link href="/auth?returnTo=/courses">
                  <span className="text-term-green">$</span> start learning
                </Link>
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-6 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="inline-block size-1.5 rounded-full bg-term-green" />
                {published.length}+ courses
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block size-1.5 rounded-full bg-term-green" />
                {categories.length} training tracks
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block size-1.5 rounded-full bg-term-amber" />
                certificate on completion
              </span>
            </div>
          </motion.div>

          {/* Terminal course preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15, ease: "easeOut" }}
            className="rounded-3xl glass-card border border-border bg-card shadow-[6px_6px_0_0_color-mix(in_oklch,var(--term-green)_12%,transparent)]"
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
              <div className="flex items-center gap-2">
                <Leaf className="size-3.5 text-term-green" />
                <span className="text-xs text-muted-foreground">
                  agriskills — course catalog
                </span>
              </div>
              <span className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full border border-border bg-muted" />
                <span className="size-2.5 rounded-full border border-border bg-muted" />
                <span className="size-2.5 rounded-full border border-border bg-muted" />
              </span>
            </div>
            <div className="space-y-2.5 px-4 py-5 text-[13px] leading-5">
              <p>
                <span className="text-term-green">$</span>{" "}
                <span className="text-foreground">
                  agriskills catalog ls --featured
                </span>
              </p>
              <p className="text-term-green">
                [ok] {published.length} courses live · {categories.length} tracks
              </p>
              <div className="border border-border">
                <div className="grid grid-cols-[2rem_1fr_auto] gap-x-3 border-b border-border bg-muted px-3 py-1.5 text-[11px] uppercase tracking-wider text-muted-foreground">
                  <span>#</span>
                  <span>title</span>
                  <span className="text-right">time</span>
                </div>
                {catalogRows.map((course) => (
                  <div
                    key={course._id}
                    className="grid grid-cols-[2rem_1fr_auto] gap-x-3 border-b border-border px-3 py-1.5 last:border-b-0"
                  >
                    <span className="text-term-green">
                      {String(course.order).padStart(2, "0")}
                    </span>
                    <span className="truncate">{course.title}</span>
                    <span className="text-right text-muted-foreground">
                      {course.durationMinutes}m
                    </span>
                  </div>
                ))}
              </div>
              <p>
                <span className="text-term-green">$</span>{" "}
                <span className="text-foreground">
                  agriskills enroll --season=2026
                </span>
              </p>
              <p className="text-term-green">
                [ok] enrollment open · welcome aboard
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
      <section className="border-b border-border bg-soil-gradient">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-2 divide-x divide-border border-x border-border lg:grid-cols-4">
          {statsData.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="px-4 py-7 sm:px-6"
            >
              <div className="flex items-center gap-2">
                <stat.icon className={`size-4 ${stat.color === "amber" ? "text-term-amber" : "text-term-green"}`} />
                <p className={`text-2xl font-bold ${stat.color === "amber" ? "text-term-amber" : "text-term-green"}`}>
                  {stat.value}
                </p>
              </div>
              <p className="mt-1.5 text-[11px] uppercase tracking-wider text-muted-foreground">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Features ────────────────────────────────────────────── */}
      <section id="features" className="border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <div className="text-center">
            <p className="text-xs text-term-green">// why-agriskills</p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
              Everything you need to master modern agriculture.
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
              From foundational soil science to AI-powered precision farming —
              our platform covers the full spectrum of agricultural knowledge.
            </p>
          </div>

          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-60px" }}
            className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            <motion.div variants={item}>
              <FeatureCard
                icon={Sprout}
                title="Practical Farming Courses"
                description="Hands-on training in crop management, soil health, irrigation, and sustainable farming techniques built for real-world application."
                accent="green"
              />
            </motion.div>
            <motion.div variants={item}>
              <FeatureCard
                icon={Leaf}
                title="AI & Precision Agriculture"
                description="Master AI-powered crop monitoring, drone-based pest detection, yield prediction models, and smart farm automation systems."
                accent="green"
              />
            </motion.div>
            <motion.div variants={item}>
              <FeatureCard
                icon={Droplets}
                title="Water & Irrigation Systems"
                description="Design and manage efficient water harvesting, drip irrigation, and moisture monitoring systems for any climate."
                accent="green"
              />
            </motion.div>
            <motion.div variants={item}>
              <FeatureCard
                icon={Award}
                title="Earn Certificates"
                description="Complete a course and earn a verified certificate. Share it with employers or add it to your agricultural professional portfolio."
                accent="amber"
              />
            </motion.div>
            <motion.div variants={item}>
              <FeatureCard
                icon={Users}
                title="Live Instructor Sessions"
                description="Book live training sessions with expert agricultural instructors. Ask questions, get feedback, and learn from working professionals."
                accent="green"
              />
            </motion.div>
            <motion.div variants={item}>
              <FeatureCard
                icon={TrendingUp}
                title="Track Your Progress"
                description="Monitor your learning journey with analytics, flashcards, study plans, and a competency passport that grows with you."
                accent="amber"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Training Tracks ─────────────────────────────────────── */}
      <section id="catalog" className="border-b border-border bg-soil-gradient">
        <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs text-term-green">// training tracks</p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                {published.length} courses across {categories.length}{" "}
                specialized tracks.
              </h2>
            </div>
            <p className="text-xs text-muted-foreground">
              total content ≈ {Math.floor(totalMinutes / 60)}h · follow each
              track top to bottom
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {featuredCategories.map((category, i) => {
              const categoryCourses = published.filter(
                (c) => c.category === category,
              );
              return (
                <div
                  key={String(category)}
                  className="border border-border bg-card transition-all hover:border-term-green/40 hover:shadow-[3px_3px_0_0_color-mix(in_oklch,var(--term-green)_8%,transparent)]"
                >
                  <div className="flex items-center justify-between border-b border-border bg-muted px-4 py-2.5">
                    <span className="flex items-center gap-2 text-xs font-semibold">
                      <Sprout className="size-3.5 text-term-green" />
                      track/{String(i + 1).padStart(2, "0")} — {String(category)}
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      {categoryCourses.length}{" "}
                      {categoryCourses.length === 1 ? "course" : "courses"}
                    </span>
                  </div>
                  <div className="p-1.5">
                    {categoryCourses.slice(0, 3).map((course, idx) => (
                      <Link
                        key={course._id}
                        href={`/courses/${course.slug}`}
                        className="group flex items-start gap-3 rounded px-2.5 py-2.5 transition-colors hover:bg-accent/60"
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
                    {categoryCourses.length > 3 && (
                      <Link href="/courses"
                        className="flex items-center justify-center gap-1 border-t border-border px-3 py-2 text-xs text-term-green transition-colors hover:bg-accent/40"
                      >
                        view all {categoryCourses.length} courses
                        <ArrowRight className="size-3" />
                      </Link>
                    )}
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

          {published.length > 0 && (
            <div className="mt-8 text-center">
              <Button asChild variant="outline" className="gap-2 text-sm">
                <Link href="/courses">
                  view full catalog <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* ── How it works ────────────────────────────────────────── */}
      <section id="how" className="border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <div className="text-center">
            <p className="text-xs text-term-green">// how-it-works</p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
              From first click to certified skill in four steps.
            </h2>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "01",
                title: "Choose your track",
                body: "Browse the catalog and pick a course. Every listing shows its duration, prerequisites, and what you'll learn.",
                icon: BookOpen,
              },
              {
                step: "02",
                title: "Start learning",
                body: "Read the modules, watch instructor notes, and take quizzes as you go. Progress is saved automatically.",
                icon: Sprout,
              },
              {
                step: "03",
                title: "Practice & apply",
                body: "Use flashcards, field journals, and virtual labs to apply what you've learned to real farming scenarios.",
                icon: Leaf,
              },
              {
                step: "04",
                title: "Earn your certificate",
                body: "Complete all modules and pass the final assessment. Your verified certificate is ready to share or print.",
                icon: Award,
              },
            ].map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="relative overflow-hidden border border-border bg-card p-5 transition-all hover:border-term-green/40"
              >
                <span className="pointer-events-none absolute -right-2 -top-4 text-[5rem] font-black text-agri-green/[0.04] leading-none">{step.step}</span>
                <div className="relative mb-3 flex items-center gap-3">
                  <span className="flex size-8 items-center justify-center border border-term-green/30 bg-term-green/10 font-mono text-xs font-bold text-term-green">
                    {step.step}
                  </span>
                  <step.icon className="size-4 text-term-green" />
                </div>
                <h3 className="relative text-sm font-semibold">{step.title}</h3>
                <p className="relative mt-1.5 text-xs leading-5 text-muted-foreground">
                  {step.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ────────────────────────────────────────── */}
      <section id="testimonials" className="border-b border-border bg-soil-gradient">
        <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <div className="text-center">
            <p className="text-xs text-term-green">// field-notes</p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
              What students say after a season of learning.
            </h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              {
                quote:
                  "The irrigation course replaced guesswork with a system we can actually track. Our water usage dropped 30% in the first season after applying what I learned here.",
                name: "Marcus Bell",
                role: "Farm Manager, Bell & Sons",
                icon: Droplets,
              },
              {
                quote:
                  "I went from knowing nothing about precision agriculture to confidently setting up our drone-based crop monitoring. The AI courses are genuinely practical, not just theory.",
                name: "Elena Navarro",
                role: "Operations Lead, Navarro Orchards",
                icon: Leaf,
              },
              {
                quote:
                  "The certificate I earned here got me promoted. My employer could verify my skills instantly through the platform — no paperwork, no delays.",
                name: "Dana Whitfield",
                role: "Agricultural Technician, Whitfield Farms",
                icon: Award,
              },
            ].map((testimonial, i) => (
              <motion.figure
                key={testimonial.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex flex-col overflow-hidden border border-border bg-card"
              >
                <div className="flex items-center justify-between border-b border-border bg-muted px-4 py-2">
                  <span className="flex items-center gap-2 text-[11px] text-muted-foreground">
                    <testimonial.icon className="size-3 text-term-green" />
                    note_{String(i + 1).padStart(2, "0")}.txt
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="size-2.5 rounded-full border border-border bg-muted" />
                    <span className="size-2.5 rounded-full border border-border bg-muted" />
                    <span className="size-2.5 rounded-full border border-border bg-muted" />
                  </span>
                </div>
                <blockquote className="flex-1 px-4 py-5 text-[13px] leading-6">
                  "{testimonial.quote}"
                </blockquote>
                <figcaption className="border-t border-border px-4 py-3">
                  <p className="text-xs font-semibold">{testimonial.name}</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">
                    {testimonial.role}
                  </p>
                  <p className="mt-1 flex items-center gap-1 text-[10px] text-term-green">
                    <span className="inline-block size-1 rounded-full bg-term-green" />
                    verified student
                  </p>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────── */}
      <section id="faq" className="border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <div className="text-center">
            <p className="text-xs text-term-green">// faq</p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
              Questions students ask before enrolling.
            </h2>
          </div>
          <div className="mx-auto mt-10 max-w-2xl space-y-3">
            {[
              {
                q: "Do I need farming experience to take a course?",
                a: "No. Our courses range from beginner to advanced. Each course page lists prerequisites so you can find the right starting point for your experience level.",
              },
              {
                q: "Are the certificates recognized?",
                a: "Every certificate includes a unique verification code that employers can check on our verify page. The certificates are backed by our instructor credentials and curriculum standards.",
              },
              {
                q: "Can I learn at my own pace?",
                a: "Yes. Course materials are available 24/7. Live instructor sessions are optional add-ons — you can complete every course entirely at your own pace.",
              },
              {
                q: "What if I get stuck on a module?",
                a: "Every course has a comments thread answered by our team within one business day. You can also join study groups or book a mentorship session for deeper support.",
              },
              {
                q: "Is my payment secure?",
                a: "Checkout runs on Stripe's hosted payment pages, so card details never touch our servers. Free courses require no payment at all.",
              },
            ].map((item, i) => (
              <motion.details
                key={item.q}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="group rounded-2xl border border-border/40 bg-card open:border-term-green/40"
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
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="noise-bg border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <div className="relative overflow-hidden border border-border bg-card shadow-2xl">
            <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-80 rounded-full bg-white/5 blur-3xl" />
            <div className="relative flex items-center justify-between border-b border-border px-4 py-2.5">
              <div className="flex items-center gap-2">
                <Leaf className="size-3.5 text-term-green" />
                <span className="text-xs text-muted-foreground">
                  agriskills — enroll
                </span>
              </div>
              <span className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full border border-border bg-muted" />
                <span className="size-2.5 rounded-full border border-border bg-muted" />
                <span className="size-2.5 rounded-full border border-border bg-muted" />
              </span>
            </div>
            <div className="relative flex flex-col items-start gap-6 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <div>
                <p className="text-sm">
                  <span className="text-term-green">$</span>{" "}
                  <span className="font-semibold">
                    agriskills enroll --now
                  </span>
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  // free courses available · certificate included · learn at
                  your pace
                </p>
              </div>
              <div className="flex w-full flex-wrap gap-3 sm:w-auto">
                <Button asChild className="gap-2 bg-white text-agri-green font-semibold shadow-xl hover:bg-white/90 hover:shadow-2xl transition-all text-sm">
                  <Link href="/courses">
                    explore courses <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="text-sm">
                  <Link href="/auth">sign in</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer className="bg-soil-gradient">
        <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="flex size-6 items-center justify-center bg-term-green">
                  <Leaf className="size-3.5 text-white" />
                </span>
                <span className="text-sm font-bold tracking-tight">
                  AgriSkills
                  <span className="ml-1 font-normal text-muted-foreground">
                    Academy
                  </span>
                </span>
              </div>
              <p className="mt-2 max-w-sm text-xs leading-5 text-muted-foreground">
                Practical training for agriculture professionals. Courses on
                farming, AI, irrigation, and sustainable practices — built for
                the people who work the land.
              </p>
            </div>
            <div className="flex gap-12 text-xs">
              <div>
                <p className="font-semibold text-foreground">Platform</p>
                <div className="mt-2 flex flex-col gap-1.5 text-muted-foreground">
                  <Link href="/courses" className="hover:text-foreground transition-colors">Course Catalog</Link>
                  <Link href="/instructors" className="hover:text-foreground transition-colors">Instructors</Link>
                  <Link href="/verify-credential" className="hover:text-foreground transition-colors">Verify Certificate</Link>
                </div>
              </div>
              <div>
                <p className="font-semibold text-foreground">Learn</p>
                <div className="mt-2 flex flex-col gap-1.5 text-muted-foreground">
                  <a href="#features" className="hover:text-foreground transition-colors">Features</a>
                  <a href="#how" className="hover:text-foreground transition-colors">How It Works</a>
                  <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-border/30 pt-6 text-xs text-muted-foreground sm:flex-row">
            <p>
              <span className="text-term-green">agriskills_academy</span> © 2026
              — agriculture training platform
            </p>
            <p>
              // courses, certificates, and hands-on learning
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
