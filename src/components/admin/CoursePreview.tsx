import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Doc } from "@/convex/_generated/dataModel";
import type { ContentBlock, CourseModule } from "@/convex/schema";
import { ArrowLeft, Eye, Lock, Play, MessageSquare, Star } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

type CourseDoc = Doc<"courses">;

/**
 * Admin-only course preview — shows the course exactly as a student would
 * see it, with module tabs, quiz previews, and content blocks rendered
 * in the terminal theme. Available as a dialog from the admin courses tab.
 */
export function CoursePreviewDialog({
  course,
  open,
  onOpenChange,
}: {
  course: CourseDoc | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!course) return null;

  const modules: CourseModule[] =
    course.modules && course.modules.length > 0
      ? course.modules
      : [{ title: "Course content", content: course.content }];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Eye className="size-4 text-term-green" />
            Course Preview — {course.title}
          </DialogTitle>
          <DialogDescription>
            Viewing as a student would see it. Categories: {course.category} ·{" "}
            {modules.length} module{modules.length !== 1 ? "s" : ""} ·{" "}
            {course.published ? "published" : "draft"}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="gap-1 rounded-none border border-border bg-muted">
              <TabsTrigger value="overview">overview</TabsTrigger>
              {modules.map((mod, i) => (
                <TabsTrigger key={i} value={`module-${i}`}>
                  {i + 1}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="overview" className="mt-4">
              <div className="space-y-4">
                <div className="border border-border bg-card p-4">
                  <h3 className="text-lg font-semibold">{course.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {course.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
                    {course.instructor && (
                      <span>Instructor: {course.instructor}</span>
                    )}
                    <span>Category: {course.category}</span>
                    <span>
                      {modules.length} module
                      {modules.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>

                <div className="border border-border bg-card">
                  <div className="border-b border-border bg-muted px-4 py-2 text-xs font-semibold">
                    module outline
                  </div>
                  {modules.map((mod, i) => {
                    const quizCount = mod.content.filter(
                      (b) => b.type === "quiz",
                    ).length;
                    const videoCount = mod.content.filter(
                      (b) => b.type === "video",
                    ).length;
                    const blockCount = mod.content.length;
                    return (
                      <div
                        key={i}
                        className="flex items-center justify-between gap-3 border-b border-border px-4 py-2.5 last:border-b-0"
                      >
                        <span className="flex items-center gap-2">
                          <span className="w-6 text-right text-[11px] font-mono text-term-green">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="text-sm font-medium">
                            {mod.title}
                          </span>
                        </span>
                        <span className="flex items-center gap-3 text-[11px] text-muted-foreground">
                          {videoCount > 0 && <span>{videoCount} video{videoCount !== 1 ? "s" : ""}</span>}
                          <span>{blockCount} block{blockCount !== 1 ? "s" : ""}</span>
                          {quizCount > 0 && (
                            <span className="border border-term-amber/40 bg-term-amber/10 px-1.5 py-0.5 text-term-amber">
                              quiz
                            </span>
                          )}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </TabsContent>

            {modules.map((mod, i) => (
              <TabsContent key={i} value={`module-${i}`} className="mt-4">
                <div className="border border-border bg-card">
                  <div className="flex items-center justify-between border-b border-border bg-muted px-4 py-2.5">
                    <span className="text-xs font-semibold">
                      module {i + 1}: {mod.title}
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      {mod.content.length} content block
                      {mod.content.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="divide-y divide-border">
                    {mod.content.map((block, bi) => (
                      <PreviewBlock key={bi} block={block} />
                    ))}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function PreviewBlock({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "heading":
      return (
        <div className="px-4 py-3">
          <h4 className="text-sm font-semibold">{block.text}</h4>
        </div>
      );
    case "paragraph":
      return (
        <div className="px-4 py-3">
          <p className="text-sm text-foreground/80">{block.text}</p>
        </div>
      );
    case "code":
      return (
        <div className="px-4 py-3">
          <pre className="overflow-x-auto border border-border border-l-2 border-l-term-green bg-muted/50 px-3 py-2 text-xs leading-5">
            {block.text}
          </pre>
        </div>
      );
    case "list":
      return (
        <div className="px-4 py-3">
          <ul className="list-disc pl-5 text-sm text-foreground/80">
            {block.items.map((item, i) => (
              <li key={i} className="py-0.5">
                {item}
              </li>
            ))}
          </ul>
        </div>
      );
    case "note":
      return (
        <div className="px-4 py-3">
          <div
            className={`border-l-2 px-3 py-2 text-xs ${
              block.tone === "warn"
                ? "border-l-term-amber bg-term-amber/5 text-term-amber"
                : "border-l-term-green bg-term-green/5 text-term-green"
            }`}
          >
            {block.tone === "warn" ? "⚠ " : "ℹ "}
            {block.text}
          </div>
        </div>
      );
    case "video":
      return (
        <div className="px-4 py-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Play className="size-3.5 text-term-green" />
            <span>Video: {block.url}</span>
          </div>
          {block.caption && (
            <p className="mt-1 text-[11px] text-muted-foreground">
              {block.caption}
            </p>
          )}
        </div>
      );
    case "quiz":
      return (
        <div className="px-4 py-3">
          <div className="border border-term-amber/30 bg-term-amber/5 p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-term-amber">
                📝 Quiz: {block.title}
              </span>
              <span className="text-[10px] text-muted-foreground">
                pass at {block.passPercent}% · {block.questions.length} questions
              </span>
            </div>
            <div className="mt-2 space-y-2">
              {block.questions.map((q, qi) => (
                <div
                  key={qi}
                  className="border border-border bg-card p-2 text-xs"
                >
                  <span className="font-medium">
                    Q{qi + 1}: {q.question}
                  </span>
                  <div className="mt-1 space-y-0.5 pl-2 text-muted-foreground">
                    {q.options.map((opt, oi) => (
                      <div key={oi}>
                        {oi === q.answerIndex ? "✓ " : "○ "}
                        {opt}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
}
