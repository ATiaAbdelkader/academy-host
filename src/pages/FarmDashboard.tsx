"use client";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { useAuth } from "@/hooks/use-auth";
import { Sprout, BookOpen, Trophy, TrendingUp, Calendar, Tractor, Stethoscope, MapPin, ArrowRight } from "lucide-react";

export default function FarmDashboard() {
  const { user } = useAuth();
  const userId = user?._id;

  const progress = useQuery(api.progress.myProgress);
  const stats = useQuery(api.gamification.myStats);
  const farms = useQuery(api.farmSimulator.myFarms, userId ? { userId } : "skip");
  const diagnoses = useQuery(api.cropDoctor.myDiagnoses, userId ? { userId } : "skip");
  const profile = useQuery(api.farmAdvisory.myProfile, userId ? { userId } : "skip");
  const advisories = useQuery(api.farmAdvisory.getAdvisories, userId ? { userId, climateZone: profile?.climateZone } : "skip");
  const courses = useQuery(api.courses.list);

  const completedCourses = progress?.filter((p) => p.status === "completed").length || 0;
  const inProgressCourses = progress?.filter((p) => p.status === "started").length || 0;
  const totalCourses = courses?.length || 0;

  const quickLinks = [
    { to: "/farm-simulator", label: "Farm Simulator", icon: Tractor, desc: "Grow virtual crops" },
    { to: "/crop-doctor", label: "Crop Doctor", icon: Stethoscope, desc: "Diagnose plant issues" },
    { to: "/advisory", label: "Farm Advisory", icon: MapPin, desc: "Location-based advice" },
    { to: "/farm-progress", label: "Farm Progress", icon: TrendingUp, desc: "Track farm outcomes" },
    { to: "/courses", label: "Browse Courses", icon: BookOpen, desc: "Continue learning" },
    { to: "/flashcards", label: "Flashcards", icon: TrendingUp, desc: "Review key concepts" },
    { to: "/field-journal", label: "Field Journal", icon: Calendar, desc: "Log observations" },
    { to: "/nudges", label: "Study Nudges", icon: TrendingUp, desc: "Smart reminders" },
    { to: "/assessments", label: "Assessments", icon: Stethoscope, desc: "Skill assessments" },
    { to: "/peer-teaching", label: "Peer Teaching", icon: TrendingUp, desc: "Earn by helping" },
    { to: "/buddies", label: "Learning Buddies", icon: TrendingUp, desc: "Study together" },
    { to: "/badges", label: "Badges & Milestones", icon: Trophy, desc: "Track achievements" },
    { to: "/gamification", label: "Gamification Hub", icon: Trophy, desc: "XP, levels, leaderboards" },
    { to: "/ai-assistant", label: "AI Assistant", icon: Stethoscope, desc: "Ask anything" },
    { to: "/passport", label: "Skill Passport", icon: TrendingUp, desc: "Your credentials" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-6">
          <p className="text-xs text-term-green font-mono">[ok] farm dashboard</p>
          <h1 className="text-2xl font-bold mt-1">Welcome, {user?.name || "Farmer"}</h1>
          <p className="text-muted-foreground font-mono text-sm">Your learning & farm operations overview</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Courses Completed", value: completedCourses, icon: BookOpen, color: "text-term-green", link: "/courses" },
            { label: "In Progress", value: inProgressCourses, icon: TrendingUp, color: "text-blue-600", link: "/dashboard" },
            { label: "Total Points", value: stats?.points || 0, icon: Trophy, color: "text-amber-600", link: "/leaderboard" },
            { label: "Day Streak", value: stats?.streakDays || 0, icon: Calendar, color: "text-orange-600", link: "/challenges" },
          ].map((s) => (
            <Link key={s.label} to={s.link} className="border border-border bg-card p-3 hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-1.5">
                <s.icon className="w-3 h-3" style={{ color: "currentColor" }} />
                <span className="text-[10px] text-muted-foreground font-mono">{s.label}</span>
              </div>
              <p className={`text-2xl font-mono font-bold mt-1 ${s.color}`}>{s.value}</p>
            </Link>
          ))}
        </div>

        {/* Quick Actions Grid */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold flex items-center gap-2 mb-3"><Sprout className="w-4 h-4" />Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {quickLinks.map((link) => (
              <Link key={link.to} to={link.to} className="border border-border bg-card p-4 hover:bg-muted/50 transition-colors group">
                <link.icon className="w-6 h-6 text-term-green mb-2 group-hover:scale-110 transition-transform" />
                <h3 className="text-sm font-bold font-mono">{link.label}</h3>
                <p className="text-[10px] text-muted-foreground font-mono mt-1">{link.desc}</p>
                <ArrowRight className="w-3 h-3 text-term-green mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        </div>

        {/* Two-column: Farm Status + Advisory */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Farm Status */}
          <div className="border border-border bg-card p-4">
            <h2 className="text-sm font-semibold flex items-center gap-2 mb-3"><Tractor className="w-4 h-4" />Virtual Farm</h2>
            {farms && farms.length > 0 ? (
              <div>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="bg-muted/50 p-2">
                    <span className="text-[10px] text-muted-foreground">Budget</span>
                    <p className="text-sm font-mono font-bold">${((farms[0].currentBudget) / 100).toFixed(0)}</p>
                  </div>
                  <div className="bg-muted/50 p-2">
                    <span className="text-[10px] text-muted-foreground">Crop</span>
                    <p className="text-sm font-mono font-bold">{farms[0].activeCrop || "None"}</p>
                  </div>
                  <div className="bg-muted/50 p-2">
                    <span className="text-[10px] text-muted-foreground">Soil</span>
                    <p className="text-sm font-mono font-bold">{farms[0].soilHealth}%</p>
                  </div>
                  <div className="bg-muted/50 p-2">
                    <span className="text-[10px] text-muted-foreground">Harvested</span>
                    <p className="text-sm font-mono font-bold">{farms[0].cropsHarvested}</p>
                  </div>
                </div>
                <Link href="/farm-simulator" className="text-xs font-mono text-term-green hover:underline">Open Simulator →</Link>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-xs text-muted-foreground font-mono mb-2">No farm yet</p>
                <Link href="/farm-simulator" className="text-xs font-mono text-term-green hover:underline">Create your farm →</Link>
              </div>
            )}
          </div>

          {/* Today's Advisory */}
          <div className="border border-border bg-card p-4">
            <h2 className="text-sm font-semibold flex items-center gap-2 mb-3"><MapPin className="w-4 h-4" />Today's Advisory</h2>
            {advisories && advisories.currentTips.length > 0 ? (
              <div className="space-y-2">
                {advisories.currentTips.slice(0, 3).map((tip, i) => (
                  <div key={i} className="text-xs font-mono border-l-2 border-term-green pl-2">
                    <span className="text-[10px] text-muted-foreground uppercase">{tip.category}</span>
                    <p className="mt-0.5">{tip.advice}</p>
                  </div>
                ))}
                <Link href="/advisory" className="text-xs font-mono text-term-green hover:underline">View full advisory →</Link>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-xs text-muted-foreground font-mono mb-2">Set your location for personalized advice</p>
                <Link href="/advisory" className="text-xs font-mono text-term-green hover:underline">Configure advisory →</Link>
              </div>
            )}
          </div>
        </div>

        {/* Recent Crop Diagnoses */}
        {diagnoses && diagnoses.length > 0 && (
          <div className="border border-border bg-card p-4">
            <h2 className="text-sm font-semibold flex items-center gap-2 mb-3"><Stethoscope className="w-4 h-4" />Recent Diagnoses</h2>
            <div className="space-y-2">
              {diagnoses.slice(0, 3).map((d) => (
                <div key={d._id} className="flex items-center justify-between text-xs font-mono border-b border-border/50 pb-2">
                  <div>
                    <span className="font-bold">{d.diagnosis}</span>
                    <span className="text-muted-foreground ml-2">({d.cropType})</span>
                  </div>
                  <span className={`px-2 py-0.5 border text-[10px] uppercase ${d.severity === "high" ? "border-red-300 text-red-600" : d.severity === "medium" ? "border-orange-300 text-orange-600" : "border-amber-300 text-amber-600"}`}>{d.severity}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Progress Bar */}
        <div className="mt-6 border border-border bg-card p-4">
          <h2 className="text-sm font-semibold mb-3">Learning Progress</h2>
          <div className="w-full bg-muted h-3 rounded">
            <div className="bg-term-green h-3 rounded transition-all" style={{ width: `${totalCourses > 0 ? (completedCourses / totalCourses) * 100 : 0}%` }} />
          </div>
          <p className="text-xs font-mono text-muted-foreground mt-2">{completedCourses} / {totalCourses} courses completed ({totalCourses > 0 ? Math.round((completedCourses / totalCourses) * 100) : 0}%)</p>
        </div>
      </div>
    </div>
  );
}
