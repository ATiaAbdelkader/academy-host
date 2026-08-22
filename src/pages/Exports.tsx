"use client";
import Link from "next/link";
import { api } from "@/convex/_generated/api";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useCatalog } from "@/hooks/use-catalog";
import { useQuery } from "convex/react";
import {
  Award,
  BookOpen,
  Calendar,
  Download,
  FileText,
  GraduationCap,
  ListChecks,
  StickyNote,
} from "lucide-react";
import { toast } from "sonner";

export default function Exports() {
  const { user } = useAuth();
  const progress = useQuery(api.progress.myProgress);
  const courses = useCatalog();
  const myStats = useQuery(api.gamification.myStats);
  const insights = useQuery(api.insights.myQuizInsights);

  const handleDownloadNotes = () => {
    const notes = (progress ?? [])
      .filter((p) => p.note && p.note.trim().length > 0)
      .map((p) => {
        const course = (courses ?? []).find((c) => c._id === p.courseId);
        return `# ${course?.title ?? "Course"}\n\n${p.note}\n`;
      });

    if (notes.length === 0) {
      toast.error("No notes to export yet.");
      return;
    }

    const content = `# AgriSkills Academy — My Study Notes\n\nExported on ${new Date().toLocaleDateString()}\n\n${"─".repeat(60)}\n\n${notes.join("\n" + "─".repeat(60) + "\n\n")}`;
    downloadFile(content, "agriskills-study-notes.md", "text/markdown");
    toast.success("Study notes downloaded as Markdown.");
  };

  const handleDownloadProgress = () => {
    const completed = (progress ?? []).filter(
      (p) => p.status === "completed",
    ).length;
    const total = (courses ?? []).filter((c) => c.published).length;

    let content = `# AgriSkills Academy — Progress Report\n\n`;
    content += `Student: ${user?.name ?? user?.email ?? "N/A"}\n`;
    content += `Generated: ${new Date().toLocaleDateString()}\n`;
    content += `Courses completed: ${completed}/${total}\n`;
    content += `Points: ${myStats?.points ?? 0}\n`;
    content += `Current streak: ${myStats?.streakDays ?? 0} days\n`;
    content += `Best streak: ${myStats?.bestStreak ?? 0} days\n`;
    content += `Badges earned: ${myStats?.badges?.length ?? 0}\n\n`;
    content += `${"─".repeat(60)}\n\n`;

    // Course progress table
    content += `## Course Progress\n\n`;
    content += `| Course | Status | Module | Last Updated |\n`;
    content += `|--------|--------|--------|--------------|\n`;
    (progress ?? []).forEach((p) => {
      const course = (courses ?? []).find((c) => c._id === p.courseId);
      const title = course?.title ?? "Course";
      const totalModules = course?.modules?.length ?? 0;
      content += `| ${title} | ${p.status.toUpperCase()} | ${totalModules > 0 ? `${(p.lastModuleIndex ?? 0) + 1}/${totalModules}` : "—"} | ${new Date(p.updatedAt).toLocaleDateString()} |\n`;
    });

    // Quiz insights
    if (insights && insights.length > 0) {
      content += `\n## Quiz Performance\n\n`;
      content += `| Course | Attempts | Best Score | Pass Rate |\n`;
      content += `|--------|----------|------------|----------|\n`;
      insights.forEach((row) => {
        const passRate =
          row.attempts > 0
            ? Math.round((row.passed / row.attempts) * 100)
            : 0;
        content += `| ${row.courseTitle} | ${row.attempts} | ${row.bestScore}% | ${passRate}% |\n`;
      });
    }

    // Badge list
    if (myStats && myStats.badges.length > 0) {
      content += `\n## Badges Earned\n\n`;
      myStats.badges.forEach((badge) => {
        content += `- ${badge.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}\n`;
      });
    }

    downloadFile(content, "agriskills-progress-report.md", "text/markdown");
    toast.success("Progress report downloaded.");
  };

  const handleDownloadStudyPlan = () => {
    const inProgress = (progress ?? []).filter(
      (p) =>
        p.status !== "completed" &&
        p.lastModuleIndex != null &&
        (p.lastModuleIndex ?? 0) > 0,
    );

    if (inProgress.length === 0) {
      toast.error("No active study plans to export.");
      return;
    }

    let content = `# AgriSkills Academy — Study Plan\n\n`;
    content += `Student: ${user?.name ?? user?.email ?? "N/A"}\n`;
    content += `Generated: ${new Date().toLocaleDateString()}\n\n`;
    content += `${"─".repeat(60)}\n\n`;

    inProgress.forEach((p) => {
      const course = (courses ?? []).find((c) => c._id === p.courseId);
      const modules = course?.modules ?? [];
      const currentModule = p.lastModuleIndex ?? 0;

      content += `## ${course?.title ?? "Course"}\n\n`;
      content += `Progress: Module ${currentModule + 1} of ${modules.length}\n\n`;
      content += `### Remaining Modules\n\n`;

      for (let i = currentModule; i < modules.length; i++) {
        const mod = modules[i];
        const isCurrent = i === currentModule;
        content += `${isCurrent ? "▶" : "○"} **Module ${i + 1}: ${mod.title}**\n`;
        if (isCurrent) {
          content += `  → Currently in progress\n`;
        }
        // Check if there's a quiz
        const hasQuiz = mod.content.some((b) => b.type === "quiz");
        if (hasQuiz) {
          content += `  → Module quiz (pass to continue)\n`;
        }
        content += `\n`;
      }
    });

    content += `\n${"─".repeat(60)}\n`;
    content += `\n*Keep pushing forward — every module completed is progress earned.*\n`;

    downloadFile(content, "agriskills-study-plan.md", "text/markdown");
    toast.success("Study plan downloaded.");
  };

  const handleDownloadBadges = () => {
    if (!myStats || myStats.badges.length === 0) {
      toast.error("No badges earned yet to export.");
      return;
    }

    let content = `# AgriSkills Academy — Badge Collection\n\n`;
    content += `Student: ${user?.name ?? user?.email ?? "N/A"}\n`;
    content += `Total points: ${myStats.points}\n`;
    content += `Generated: ${new Date().toLocaleDateString()}\n\n`;
    content += `${"─".repeat(60)}\n\n`;

    myStats.badges.forEach((badge, i) => {
      const label = badge
        .replace(/_/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
      content += `${i + 1}. **${label}** ✓\n`;
    });

    content += `\n${"─".repeat(60)}\n`;
    content += `\n*Points earned: ${myStats.points} | Best streak: ${myStats.bestStreak} days*\n`;

    downloadFile(content, "agriskills-badges.md", "text/markdown");
    toast.success("Badge collection downloaded.");
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <AppHeader path="~/exports" />

      <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
        <p className="text-xs text-term-green">
          [ok] export center — download your learning data
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">
          Export & Downloads
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Download your study notes, progress reports, certificates, and study
          plans as clean Markdown files.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <ExportCard
            icon={<StickyNote className="size-5 text-term-green" />}
            title="Study Notes"
            description="Download all your private course notes as a single Markdown file."
            action="download notes"
            onClick={handleDownloadNotes}
          />
          <ExportCard
            icon={<FileText className="size-5 text-term-green" />}
            title="Progress Report"
            description="Full progress report with quiz scores, badges earned, and course completion status."
            action="download report"
            onClick={handleDownloadProgress}
          />
          <ExportCard
            icon={<ListChecks className="size-5 text-term-amber" />}
            title="Study Plan"
            description="Export your active study plans with remaining modules and quiz milestones."
            action="download plan"
            onClick={handleDownloadStudyPlan}
          />
          <ExportCard
            icon={<Award className="size-5 text-term-amber" />}
            title="Badge Collection"
            description="Export your earned badges and total points as a shareable document."
            action="download badges"
            onClick={handleDownloadBadges}
          />
        </div>

        {/* ── Certificate downloads ──────────────────────────────── */}
        <div className="mt-8 border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border bg-muted px-4 py-2.5">
            <span className="text-xs font-semibold">
              certificate gallery
            </span>
            <span className="text-[11px] text-muted-foreground">
              {progress?.filter((p) => p.status === "completed").length ?? 0}{" "}
              certificates earned
            </span>
          </div>

          {progress === undefined && (
            <div className="space-y-2 p-4">
              <div className="h-4 animate-pulse bg-muted" />
              <div className="h-4 animate-pulse bg-muted" />
            </div>
          )}

          {progress !== undefined && progress !== null &&
            progress.filter((p) => p.status === "completed").length === 0 && (
              <div className="px-4 py-10 text-center text-sm text-muted-foreground">
                <p>
                  <span className="text-term-green">[ok]</span> complete a
                  course to earn your first certificate.
                </p>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="mt-4 text-xs"
                >
                  <Link href="/courses">browse catalog</Link>
                </Button>
              </div>
            )}

          {progress !== undefined && progress !== null &&
            progress.filter((p) => p.status === "completed").length > 0 && (
              <div>
                {progress
                  .filter((p) => p.status === "completed")
                  .map((entry) => {
                    const course = (courses ?? []).find(
                      (c) => c._id === entry.courseId,
                    );
                    return (
                      <div
                        key={entry._id}
                        className="flex items-center justify-between gap-3 border-b border-border px-4 py-3 last:border-b-0 hover:bg-accent/30"
                      >
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-medium">
                            {course?.title ?? "Course"}
                          </span>
                          <span className="mt-0.5 block text-[11px] text-muted-foreground">
                            {course?.category ?? ""} · completed{" "}
                            {new Date(entry.updatedAt).toLocaleDateString()}
                          </span>
                        </span>
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="gap-1.5 text-xs"
                        >
                          <Link href={`/certificate/${entry.courseId}`}>
                            <Download className="size-3.5" />
                            download
                          </Link>
                        </Button>
                      </div>
                    );
                  })}
              </div>
            )}
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          <span className="text-term-green">[ok]</span> all exports are
          Markdown files — open them in any text editor or converter
        </p>
      </div>
    </main>
  );
}

function ExportCard({
  icon,
  title,
  description,
  action,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: string;
  onClick: () => void;
}) {
  return (
    <div className="border border-border bg-card">
      <div className="flex items-start gap-3 border-b border-border bg-muted px-4 py-3">
        {icon}
        <div>
          <h3 className="text-sm font-semibold">{title}</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="flex items-center justify-between px-4 py-3">
        <span className="text-[11px] text-muted-foreground">
          .md format · readable anywhere
        </span>
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 text-xs"
          onClick={onClick}
        >
          <Download className="size-3.5" />
          {action}
        </Button>
      </div>
    </div>
  );
}

function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
