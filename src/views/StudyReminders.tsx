"use client";
import Link from "next/link";
import { useQuery } from "@/lib/convex-react-safe";
import { api } from "../convex/_generated/api";
import { useAuth } from "@/hooks/use-auth";
import { Bell, Clock, CheckCircle, AlertCircle, BookOpen } from "lucide-react";

export default function StudyReminders() {
  const { user } = useAuth();
  const userId = user?._id;

  const reviewCards = useQuery(api.flashcards.dueCards);
  const studyPlans = useQuery(api.studyplan.myPlans);
  const progress = useQuery(api.progress.myProgress);

  const now = Date.now();
  const overdueCards = reviewCards?.filter((c) => c.due < now) || [];
  const dueSoon = reviewCards?.filter((c) => c.due >= now && c.due < now + 7 * 24 * 60 * 60 * 1000) || [];
  const upcomingCards = reviewCards?.filter((c) => c.due >= now + 7 * 24 * 60 * 60 * 1000) || [];

  const activePlans = studyPlans?.filter((p) => !p.completed) || [];
  const completedPlans = studyPlans?.filter((p) => p.completed) || [];

  const activeCourseProgress = progress?.filter((p) => p.status === "started") || [];

  const formatDue = (dueMs: number) => {
    const diff = dueMs - now;
    if (diff < 0) return "Overdue";
    if (diff < 60 * 60 * 1000) return `In ${Math.round(diff / 60000)}min`;
    if (diff < 24 * 60 * 60 * 1000) return `In ${Math.round(diff / 3600000)}h`;
    return `In ${Math.round(diff / 86400000)}d`;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <p className="text-xs text-term-green font-mono">[system] study reminders</p>
          <h1 className="text-2xl font-bold mt-1">Smart Study Reminders</h1>
          <p className="text-muted-foreground font-mono text-sm">Spaced repetition keeps your knowledge fresh</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="border border-red-300 bg-red-50 p-3 text-center">
            <AlertCircle className="w-5 h-5 mx-auto text-red-500 mb-1" />
            <p className="text-lg font-mono font-bold text-red-600">{overdueCards.length}</p>
            <span className="text-[10px] font-mono text-red-600">Overdue</span>
          </div>
          <div className="border border-amber-300 bg-amber-50 p-3 text-center">
            <Clock className="w-5 h-5 mx-auto text-amber-500 mb-1" />
            <p className="text-lg font-mono font-bold text-amber-600">{dueSoon.length}</p>
            <span className="text-[10px] font-mono text-amber-600">Due This Week</span>
          </div>
          <div className="border border-term-green bg-term-green/5 p-3 text-center">
            <CheckCircle className="w-5 h-5 mx-auto text-term-green mb-1" />
            <p className="text-lg font-mono font-bold text-term-green">{upcomingCards.length}</p>
            <span className="text-[10px] font-mono text-term-green">Upcoming</span>
          </div>
        </div>

        {/* Overdue Cards */}
        {overdueCards.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-semibold flex items-center gap-2 mb-3"><AlertCircle className="w-4 h-4 text-red-500" />Overdue Reviews</h2>
            <div className="space-y-2">
              {overdueCards.slice(0, 10).map((card) => (
                <Link key={card._id} href={"/flashcards"} className="border border-red-200 bg-card p-3 flex items-center justify-between hover:bg-red-50 transition-colors">
                  <div>
                    <p className="text-sm font-bold font-mono">{card.question.slice(0, 60)}...</p>
                    <p className="text-[10px] text-muted-foreground font-mono">{card.courseTitle} · {card.moduleTitle}</p>
                  </div>
                  <span className="text-xs font-mono text-red-500">{formatDue(card.due)}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Due This Week */}
        {dueSoon.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-semibold flex items-center gap-2 mb-3"><Clock className="w-4 h-4 text-amber-500" />Due This Week</h2>
            <div className="space-y-2">
              {dueSoon.slice(0, 10).map((card) => (
                <div key={card._id} className="border border-amber-200 bg-card p-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold font-mono">{card.question.slice(0, 60)}...</p>
                    <p className="text-[10px] text-muted-foreground font-mono">{card.courseTitle} · {card.moduleTitle}</p>
                  </div>
                  <span className="text-xs font-mono text-amber-600">{formatDue(card.due)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Active Study Plans */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold flex items-center gap-2 mb-3"><BookOpen className="w-4 h-4" />Active Study Plans</h2>
          {activePlans.length > 0 ? (
            <div className="space-y-2">
              {activePlans.map((plan) => (
                <Link key={plan._id} href="/study" className="border border-border bg-card p-3 block hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold font-mono">{plan.title}</p>
                      <p className="text-[10px] text-muted-foreground font-mono">Started {new Date(plan.startDate).toLocaleDateString()}</p>
                    </div>
                    <span className="text-xs font-mono text-term-green">In Progress</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="border border-border bg-card p-4 text-center">
              <p className="text-xs text-muted-foreground font-mono">No active study plans.</p>
              <Link href="/courses" className="text-xs font-mono text-term-green hover:underline mt-2 inline-block">Start a course to create a plan →</Link>
            </div>
          )}
        </div>

        {/* In-Progress Courses */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold flex items-center gap-2 mb-3"><Bell className="w-4 h-4" />Continue Learning</h2>
          {activeCourseProgress.length > 0 ? (
            <div className="space-y-2">
              {activeCourseProgress.map((p) => (
                <Link key={p._id} href={"/courses"} className="border border-border bg-card p-3 flex items-center justify-between hover:bg-muted/50 transition-colors">
                  <div>
                    <p className="text-sm font-bold font-mono">{p.courseId}</p>
                    <p className="text-[10px] text-muted-foreground font-mono">Module {(p.lastModuleIndex || 0) + 1}</p>
                  </div>
                  <span className="text-xs font-mono text-term-green">Continue →</span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="border border-border bg-card p-4 text-center">
              <p className="text-xs text-muted-foreground font-mono">Start a course to see it here.</p>
            </div>
          )}
        </div>

        {/* Tips */}
        <div className="border border-term-green/30 bg-term-green/5 p-4">
          <h2 className="text-sm font-semibold flex items-center gap-2 mb-2"><Bell className="w-4 h-4 text-term-green" />How Smart Reminders Work</h2>
          <ul className="text-xs font-mono text-muted-foreground space-y-1">
            <li>• Quiz questions you answer wrong are saved as review cards</li>
            <li>• Cards are scheduled using spaced repetition (FSRS algorithm)</li>
            <li>• Review just before you forget for maximum retention</li>
            <li>• Complete daily reviews to build lasting knowledge</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
