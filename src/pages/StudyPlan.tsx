"use client";
import Link from "next/link";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCatalog } from "@/hooks/use-catalog";
import { formatDate } from "@/lib/format";
import { downloadIcs } from "@/lib/ics";
import { useMutation, useQuery } from "convex/react";
import {
  CalendarPlus,
  CalendarX2,
  CheckCircle2,
  Link2,
  Loader2,
  Share2,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function StudyPlan() {
  const plans = useQuery(api.studyplan.myPlans);
  const createPlan = useMutation(api.studyplan.createPlan);
  const courses = useCatalog();

  const [courseId, setCourseId] = useState("");
  const [startDate, setStartDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return toDateInputValue(d.getTime());
  });
  const [submitting, setSubmitting] = useState(false);

  const handleCreate = async () => {
    if (!courseId) {
      toast.error("Choose a course first.");
      return;
    }
    if (!startDate) {
      toast.error("Pick a start date.");
      return;
    }
    setSubmitting(true);
    try {
      await createPlan({
        courseId: courseId as Id<"courses">,
        startDate: new Date(`${startDate}T00:00:00`).getTime(),
      });
      setCourseId("");
      toast.success("Study plan created — day 1 is scheduled.");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not create the plan.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const published = (courses ?? []).filter((c) => c.published);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <AppHeader path="~/study-plan" />

      <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
        <p className="text-xs text-term-green">
          [ok] study scheduler — day by day, module by module
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">Study Plans</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Pick a course and a start date — the academy schedules one lesson and
          one quiz per module, then a review day, so you finish with your
          certificate. Tick tasks off as you go.
        </p>

        {/* ── New plan ───────────────────────────────────────────── */}
        <div className="mt-6 border border-border bg-card">
          <div className="border-b border-border bg-muted px-4 py-2.5">
            <span className="text-xs font-semibold">plan new --course --start</span>
          </div>
          <div className="grid gap-4 p-4 sm:grid-cols-[1fr_auto_auto]">
            <div className="space-y-1.5">
              <Label htmlFor="plan-course">course</Label>
              <Select value={courseId} onValueChange={setCourseId}>
                <SelectTrigger id="plan-course" className="w-full">
                  <SelectValue placeholder="select course" />
                </SelectTrigger>
                <SelectContent>
                  {published.map((course) => (
                    <SelectItem key={course._id} value={course._id}>
                      {course.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="plan-start">start date</Label>
              <Input
                id="plan-start"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <Button
                type="button"
                size="sm"
                className="gap-1.5 text-xs"
                disabled={submitting}
                onClick={handleCreate}
              >
                {submitting ? (
                  <Loader2 className="size-3.5 animate-spin" />
                ) : (
                  <CalendarPlus className="size-3.5" />
                )}
                schedule plan
              </Button>
            </div>
          </div>
        </div>

        {/* ── Plans ──────────────────────────────────────────────── */}
        <div className="mt-8 flex items-center gap-2 text-sm">
          <span className="text-term-green">$</span>
          <span>ls plans/</span>
          <span className="inline-block h-4 w-2 bg-foreground cursor-blink" />
        </div>

        {plans === undefined && (
          <div className="mt-3 space-y-3">
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="h-24 animate-pulse border border-border bg-card"
              />
            ))}
          </div>
        )}

        {plans !== undefined && plans !== null && plans.length === 0 && (
          <div className="mt-3 border border-border bg-card px-4 py-10 text-center text-sm text-muted-foreground">
            <p>
              <span className="text-term-green">[ok]</span> no study plans yet —
              pick a course above and schedule your first day.
            </p>
          </div>
        )}

        {plans !== undefined &&
          plans !== null &&
          plans.length > 0 &&
          plans.map((plan) => {
            const total = plan.tasks.length;
            const done = plan.tasks.filter((t) => t.done).length;
            const pct = total > 0 ? Math.round((done / total) * 100) : 0;
            const barFilled = Math.min(10, Math.round(pct / 10));
            const bar = `${"#".repeat(barFilled)}${"-".repeat(10 - barFilled)}`;
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const currentDay = Math.floor(
              (today.getTime() - plan.startDate) / (24 * 60 * 60 * 1000),
            );
            return (
              <PlanCard
                key={plan._id}
                planId={plan._id}
                title={plan.title}
                courseSlug={plan.courseSlug}
                startDate={plan.startDate}
                completed={plan.completed}
                completedAt={plan.completedAt ?? null}
                total={total}
                done={done}
                pct={pct}
                bar={bar}
                currentDay={currentDay}
                tasks={plan.tasks}
              />
            );
          })}
      </div>
    </main>
  );
}

function PlanCard({
  planId,
  title,
  courseSlug,
  startDate,
  completed,
  completedAt,
  total,
  done,
  pct,
  bar,
  currentDay,
  tasks,
}: {
  planId: Id<"studyPlans">;
  title: string;
  courseSlug: string;
  startDate: number;
  completed: boolean;
  completedAt: number | null;
  total: number;
  done: number;
  pct: number;
  bar: string;
  currentDay: number;
  tasks: Array<{
    _id: Id<"studyTasks">;
    day: number;
    title: string;
    kind: "lesson" | "quiz" | "review";
    done: boolean;
  }>;
}) {
  const toggleTask = useMutation(api.studyplan.toggleTask);
  const deletePlan = useMutation(api.studyplan.deletePlan);
  const [busy, setBusy] = useState<Id<"studyTasks"> | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleToggle = async (taskId: Id<"studyTasks">, next: boolean) => {
    setBusy(taskId);
    try {
      await toggleTask({ taskId, done: next });
      if (next && done + 1 === total) {
        toast.success("Plan complete — every task done. Well earned!");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not update the task.",
      );
    } finally {
      setBusy(null);
    }
  };

  const handleExport = () => {
    const events = tasks.map((task) => ({
      uid: `agriskills-${planId}-${task._id}`,
      title: `${title} — ${task.title}`,
      description:
        task.kind === "quiz"
          ? "Pass the quiz to unlock the next module."
          : task.kind === "review"
            ? "Review the full course and earn your certificate."
            : "Study the module lesson.",
      start: startDate + task.day * 24 * 60 * 60 * 1000,
      end: startDate + (task.day + 1) * 24 * 60 * 60 * 1000,
      allDay: true,
    }));
    downloadIcs(events, `agriskills-study-plan-${planId}`);
    toast.success("Calendar file downloaded — import it into any calendar app.");
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/courses/${courseSlug}`;
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Course link copied — share it with a study buddy.");
    } catch {
      toast.error("Could not copy the link.");
    }
  };

  const handleDelete = async () => {
    if (
      !window.confirm(
        "Delete this study plan and its tasks? This does not touch your course progress.",
      )
    ) {
      return;
    }
    setDeleting(true);
    try {
      await deletePlan({ planId });
      toast.success("Plan deleted.");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not delete the plan.",
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="mt-3 border border-border bg-card">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3">
        <span className="min-w-0">
          <Link href={`/courses/${courseSlug}`}
            className="block truncate text-sm font-semibold underline-offset-4 hover:underline"
          >
            {title}
          </Link>
          <span className="mt-0.5 block text-[11px] text-muted-foreground">
            starts {formatDate(startDate)} · day {Math.max(0, currentDay) + 1} of{" "}
            {total + 1}
          </span>
        </span>
        <span className="flex shrink-0 items-center gap-2">
          {completed && completedAt && (
            <span className="flex items-center gap-1 border border-term-green/40 bg-term-green/10 px-1.5 py-0.5 text-[10px] font-medium text-term-green">
              <CheckCircle2 className="size-3" />
              COMPLETED {formatDate(completedAt)}
            </span>
          )}
          <Button
            variant="outline"
            size="sm"
            className="h-7 gap-1 px-2 text-[11px]"
            onClick={handleExport}
          >
            <CalendarX2 className="size-3" />
            .ics
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-7 gap-1 px-2 text-[11px]"
            onClick={handleShare}
          >
            <Share2 className="size-3" />
            share
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-7 gap-1 px-2 text-[11px] text-destructive hover:text-destructive"
            disabled={deleting}
            onClick={handleDelete}
          >
            {deleting ? (
              <Loader2 className="size-3 animate-spin" />
            ) : (
              <Trash2 className="size-3" />
            )}
          </Button>
        </span>
      </div>

      <div className="border-b border-border px-4 py-3">
        <p className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">
            {done} of {total} tasks done
          </span>
          <span className="font-mono text-term-green">[{bar}] {pct}%</span>
        </p>
      </div>

      <div>
        {tasks.map((task) => {
          const taskDay = startDate + task.day * 24 * 60 * 60 * 1000;
          const isToday = taskDay === dayStartOf(new Date().getTime());
          const tag =
            task.kind === "quiz"
              ? "quiz"
              : task.kind === "review"
                ? "review"
                : "lesson";
          return (
            <button
              key={task._id}
              type="button"
              disabled={busy === task._id}
              onClick={() => handleToggle(task._id, !task.done)}
              className="flex w-full items-center gap-3 border-b border-border px-4 py-2.5 text-left last:border-b-0 hover:bg-accent/30 disabled:opacity-60"
            >
              <span
                className={`flex size-4 shrink-0 items-center justify-center border ${
                  task.done
                    ? "border-term-green/50 bg-term-green text-background"
                    : "border-border"
                }`}
              >
                {task.done && <CheckCircle2 className="size-3" />}
              </span>
              <span
                className={`min-w-0 flex-1 truncate text-sm ${
                  task.done
                    ? "text-muted-foreground line-through"
                    : "text-foreground"
                }`}
              >
                {task.title}
              </span>
              <span
                className={`shrink-0 border px-1.5 py-0.5 text-[10px] font-medium ${
                  tag === "quiz"
                    ? "border-term-amber/40 bg-term-amber/10 text-term-amber"
                    : tag === "review"
                      ? "border-term-green/40 bg-term-green/10 text-term-green"
                      : "border-border bg-muted text-muted-foreground"
                }`}
              >
                {tag}
              </span>
              {isToday && !task.done && (
                <span className="shrink-0 text-[10px] text-term-green">
                  today
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between gap-2 border-t border-border px-4 py-2.5 text-[11px] text-muted-foreground">
        <p>
          <span className="text-term-green">[ok]</span> finishing every task
          earns +30 points on your learner profile
        </p>
        <Link href={`/courses/${courseSlug}`}
          className="flex shrink-0 items-center gap-1 underline-offset-4 hover:underline"
        >
          <Link2 className="size-3" />
          open course
        </Link>
      </div>
    </div>
  );
}

function dayStartOf(ts: number): number {
  const d = new Date(ts);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

function toDateInputValue(ts: number): string {
  const d = new Date(ts);
  const pad = (n: number) => (n < 10 ? `0${n}` : String(n));
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
