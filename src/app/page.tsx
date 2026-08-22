"use client";

import { useState } from "react";
import Link from "next/link";

import {
  ArrowRight,
  BookOpen,
  Leaf,
  Sprout,
  Zap,
  Sun,
  Droplets,
  Award,
  Users,
  TreePine,
  Menu,
  X,
  TrendingUp,
  ChevronDown,
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

const features = [
  { icon: BookOpen, title: "Expert-Led Courses", desc: "Learn from agronomists and soil scientists with real-world farming experience.", accent: "green" as const },
  { icon: Sprout, title: "Crop Diagnostics", desc: "AI-powered crop disease identification and treatment recommendations.", accent: "green" as const },
  { icon: Zap, title: "Farm Simulator", desc: "Practice planting, irrigation, and harvesting decisions risk-free.", accent: "amber" as const },
  { icon: Sun, title: "Seasonal Planning", desc: "Align your farming calendar with weather patterns and market cycles.", accent: "amber" as const },
  { icon: Droplets, title: "Irrigation Mastery", desc: "Optimize water usage with precision agriculture techniques.", accent: "green" as const },
  { icon: Award, title: "Certifications", desc: "Earn recognized credentials that demonstrate your expertise.", accent: "green" as const },
];

const statsData = [
  { icon: BookOpen, value: "60+", label: "courses live", color: "green" as const },
  { icon: TreePine, value: "12", label: "training tracks", color: "green" as const },
  { icon: Sun, value: "200h+", label: "total content", color: "amber" as const },
  { icon: Award, value: "100%", label: "certification", color: "green" as const },
];

const steps = [
  { num: "01", title: "Browse & Enroll", desc: "Explore our catalog of agriculture courses and enroll in what fits your goals." },
  { num: "02", title: "Learn & Practice", desc: "Watch expert video lessons, complete hands-on exercises, and use farm tools." },
  { num: "03", title: "Get Certified", desc: "Pass assessments, earn badges, and receive certificates recognized by employers." },
];

const testimonials = [
  { name: "Fatima B.", role: "Smallholder Farmer, Algeria", text: "The crop diagnostics tool saved my tomato harvest. I identified blight early and took action." },
  { name: "Mohammed K.", role: "Agricultural Engineer, Egypt", text: "The irrigation mastery course helped me reduce water usage by 30% on our family farm." },
  { name: "Amina T.", role: "Agri-Business Owner, Morocco", text: "I earned my certification and now supply three supermarkets with organic produce." },
];

const faqs = [
  { q: "Is the platform free?", a: "Yes! Many courses are free. Premium courses with certifications are available with affordable pricing plans." },
  { q: "Do I need farming experience?", a: "Not at all. We have courses for complete beginners and advanced practitioners alike." },
  { q: "Are certificates recognized?", a: "Our certificates are verified digitally and can be shared with employers through our credential verification portal." },
  { q: "Can I learn on my phone?", a: "Absolutely. The platform is fully responsive and works great on any device, including offline access for downloaded content." },
];

const sampleCourses = [
  { title: "Soil Science Fundamentals", category: "Soil & Nutrients", duration: "4h 30m", level: "Beginner" },
  { title: "Organic Farming Mastery", category: "Farming Methods", duration: "6h 15m", level: "Intermediate" },
  { title: "Crop Disease Identification", category: "Plant Health", duration: "3h 45m", level: "Beginner" },
  { title: "Precision Irrigation Techniques", category: "Water Management", duration: "5h 00m", level: "Advanced" },
  { title: "Sustainable Agriculture Practices", category: "Sustainability", duration: "4h 00m", level: "Intermediate" },
];

export default function Page() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border glass-header">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex size-7 items-center justify-center bg-term-green shadow-md glow-pulse">
              <Leaf className="size-4 text-white" />
            </span>
            <span className="text-sm font-bold tracking-tight">
              AgriSkills
              <span className="ml-1 font-normal text-muted-foreground">Academy</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-1 text-xs text-muted-foreground md:flex">
            <Link href="/courses" className="rounded px-2.5 py-1.5 transition-colors hover:bg-accent/60 hover:text-foreground">./catalog</Link>
            <Link href="/instructors" className="rounded px-2.5 py-1.5 transition-colors hover:bg-accent/60 hover:text-foreground">./instructors</Link>
            <a href="#features" className="rounded px-2.5 py-1.5 transition-colors hover:bg-accent/60 hover:text-foreground">./features</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/auth" className="hidden rounded-xl border border-border px-3.5 py-1.5 text-xs font-medium transition-all hover:border-term-green/40 hover:bg-term-green/5 sm:inline-flex">
              Sign in
            </Link>
            <Link href="/courses" className="hidden rounded-xl bg-term-green px-3.5 py-1.5 text-xs font-medium text-white transition-all hover:bg-term-green/90 sm:inline-flex">
              Get Started
            </Link>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="inline-flex items-center justify-center rounded-xl p-2 hover:bg-accent md:hidden">
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div className="border-t border-border px-4 pb-4 pt-2 md:hidden">
            <Link href="/courses" onClick={() => setMobileOpen(false)} className="block rounded px-3 py-2.5 text-sm text-muted-foreground hover:bg-accent/60">Catalog</Link>
            <Link href="/instructors" onClick={() => setMobileOpen(false)} className="block rounded px-3 py-2.5 text-sm text-muted-foreground hover:bg-accent/60">Instructors</Link>
            <a href="#features" onClick={() => setMobileOpen(false)} className="block rounded px-3 py-2.5 text-sm text-muted-foreground hover:bg-accent/60">Features</a>
            <Link href="/auth" onClick={() => setMobileOpen(false)} className="block rounded px-3 py-2.5 text-sm text-muted-foreground hover:bg-accent/60">Sign in</Link>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-hero-gradient noise-bg">
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:py-36">
          <motion.div initial="initial" animate="animate" variants={stagger}>
            <motion.div variants={fadeUp} className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
              <Sprout className="size-3.5 text-term-green" />
              <span>Modern Agriculture Training Platform</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="max-w-2xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Grow Your Expertise with{" "}
              <span className="text-gradient-green">AgriSkills Academy</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
              Master modern agriculture with expert-led courses, hands-on farm simulators, AI crop diagnostics, and a thriving community of farmers across the region.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
              <Link href="/courses" className="inline-flex items-center gap-2 rounded-xl bg-term-green px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-term-green/90 hover:shadow-lg">
                Browse Courses <ArrowRight className="size-4" />
              </Link>
              <Link href="/auth" className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm font-medium transition-all hover:border-term-green/40 hover:bg-term-green/5">
                Create Free Account
              </Link>
            </motion.div>
          </motion.div>
        </div>
        {/* Decorative orbs */}
        <div className="pointer-events-none absolute -top-20 right-0 size-80 rounded-full bg-agri-green/5 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 size-60 rounded-full bg-agri-amber/5 blur-3xl" />
      </section>

      {/* Stats */}
      <section className="border-b border-border bg-card/50">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 py-10 sm:px-6 lg:grid-cols-4">
          {statsData.map((stat, i) => (
            <motion.div key={i} initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeUp} className="flex items-center gap-3">
              <div className={`flex size-10 shrink-0 items-center justify-center rounded-2xl ${stat.color === "green" ? "bg-term-green/10 text-term-green" : "bg-term-amber/10 text-term-amber"}`}>
                <stat.icon className="size-5" />
              </div>
              <div>
                <p className="text-xl font-bold tracking-tight">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeUp} className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-tight sm:text-2xl">Featured Courses</h2>
              <p className="mt-1 text-sm text-muted-foreground">Start your agriculture learning journey today</p>
            </div>
            <Link href="/courses" className="hidden items-center gap-1 text-xs font-medium text-term-green hover:underline sm:flex">
              View all <ArrowRight className="size-3.5" />
            </Link>
          </motion.div>
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sampleCourses.map((course, i) => (
              <motion.div key={i} variants={item}>
                <Link href="/courses" className="group block overflow-hidden rounded-xl border border-border bg-card p-5 transition-all hover:border-term-green/40 hover:shadow-[4px_4px_0_0_color-mix(in_oklch,var(--term-green)_10%,transparent)]">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="rounded-full bg-term-green/10 px-2.5 py-0.5 text-[10px] font-medium text-term-green">{course.category}</span>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">{course.level}</span>
                  </div>
                  <h3 className="text-sm font-semibold tracking-tight group-hover:text-term-green transition-colors">{course.title}</h3>
                  <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Sun className="size-3" />{course.duration}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-section-alt py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeUp} className="mb-10 text-center">
            <h2 className="text-xl font-bold tracking-tight sm:text-2xl">Everything You Need to Succeed</h2>
            <p className="mt-2 text-sm text-muted-foreground">A complete toolkit for modern agriculture education</p>
          </motion.div>
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <motion.div key={i} variants={item} className="group relative overflow-hidden border border-border bg-card p-7 transition-all hover:border-term-green/40 hover:shadow-[4px_4px_0_0_color-mix(in_oklch,var(--term-green)_10%,transparent)]">
                <div className="pointer-events-none absolute -top-12 -right-12 size-32 rounded-full bg-agri-green/5 blur-2xl transition-all group-hover:bg-agri-green/10" />
                <div className={`mb-3 inline-flex items-center justify-center size-9 rounded-2xl border ${f.accent === "green" ? "border-term-green/30 bg-term-green/10 text-term-green" : "border-term-amber/30 bg-term-amber/10 text-term-amber"}`}>
                  <f.icon className="size-5" />
                </div>
                <h3 className="text-sm font-semibold tracking-tight">{f.title}</h3>
                <p className="mt-1.5 text-xs leading-5 text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeUp} className="mb-10 text-center">
            <h2 className="text-xl font-bold tracking-tight sm:text-2xl">How It Works</h2>
            <p className="mt-2 text-sm text-muted-foreground">Three simple steps to transform your farming skills</p>
          </motion.div>
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((step, i) => (
              <motion.div key={i} initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeUp} className="relative rounded-xl border border-border bg-card p-6">
                <span className="text-4xl font-black text-term-green/10">{step.num}</span>
                <h3 className="mt-2 text-sm font-bold tracking-tight">{step.title}</h3>
                <p className="mt-1.5 text-xs leading-5 text-muted-foreground">{step.desc}</p>
                {i < steps.length - 1 && (
                  <ArrowRight className="absolute -right-3 top-1/2 hidden size-5 -translate-y-1/2 text-muted-foreground/30 md:block" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="bg-section-alt py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeUp} className="mb-10 text-center">
            <h2 className="text-xl font-bold tracking-tight sm:text-2xl">What Farmers Say</h2>
            <p className="mt-2 text-sm text-muted-foreground">Real results from real farmers in our community</p>
          </motion.div>
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger} className="grid gap-4 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.div key={i} variants={item} className="rounded-xl border border-border bg-card p-6">
                <p className="text-sm leading-6 text-muted-foreground">&ldquo;{t.text}&rdquo;</p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-full bg-term-green/10 text-xs font-bold text-term-green">{t.name[0]}</div>
                  <div>
                    <p className="text-xs font-semibold">{t.name}</p>
                    <p className="text-[10px] text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 sm:py-20">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeUp} className="mb-10 text-center">
            <h2 className="text-xl font-bold tracking-tight sm:text-2xl">Frequently Asked Questions</h2>
          </motion.div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={i} variants={item} className="rounded-xl border border-border bg-card">
                <details className="group">
                  <summary className="cursor-pointer px-5 py-4 text-sm font-medium list-none flex items-center justify-between">
                    {faq.q}
                    <ChevronDown className="size-4 text-muted-foreground transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="px-5 pb-4 text-xs leading-5 text-muted-foreground">{faq.a}</div>
                </details>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-hero-gradient noise-bg py-16 sm:py-20">
        <div className="relative z-10 mx-auto max-w-2xl px-4 text-center sm:px-6">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-xl font-bold tracking-tight sm:text-2xl">Ready to Transform Your Farming?</h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
              Join thousands of farmers who are improving their yields, reducing costs, and building sustainable agricultural practices.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/auth" className="inline-flex items-center gap-2 rounded-xl bg-term-green px-6 py-3 text-sm font-medium text-white transition-all hover:bg-term-green/90 hover:shadow-lg">
                Get Started Free <ArrowRight className="size-4" />
              </Link>
            </div>
          </motion.div>
        </div>
        <div className="pointer-events-none absolute -bottom-20 left-1/4 size-60 rounded-full bg-agri-green/8 blur-3xl" />
        <div className="pointer-events-none absolute -top-10 right-1/4 size-40 rounded-full bg-agri-amber/5 blur-3xl" />
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
          <div className="flex items-center gap-2">
            <Leaf className="size-4 text-term-green" />
            <span className="text-xs font-semibold">AgriSkills Academy</span>
          </div>
          <p className="text-[10px] text-muted-foreground">Built for farmers, by farmers. Empowering agriculture through education.</p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <Link href="/market" className="hover:text-foreground transition-colors">Market Prices</Link>
            <Link href="/courses" className="hover:text-foreground transition-colors">Courses</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
