"use client";
import Link from "next/link";
import { useState, useMemo } from "react";
import { useQuery } from "@/lib/convex-react-safe";
import { api } from "../convex/_generated/api";
import { GitCompare, Plus, X, Check, Clock, BarChart3, BookOpen } from "lucide-react";

const CATEGORY_COLORS: Record<string, string> = {
  Foundations: "text-terminal-green",
  "Core Skills": "text-amber-600",
  Horticulture: "text-emerald-600",
  AgTech: "text-blue-600",
  "Sustainable Agriculture": "text-green-600",
  "Plant Health": "text-red-600",
  Livestock: "text-orange-600",
  "Farm Operations": "text-indigo-600",
  "Crop Science": "text-teal-600",
  "Water Management": "text-cyan-600",
  "Agricultural Science": "text-violet-600",
};

export default function CourseCompare() {
  const courses = useQuery(api.courses.list);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const selectedCourses = useMemo(() => {
    if (!courses) return [];
    return courses.filter(
      (c) => selectedIds.includes(c._id) && c.published
    );
  }, [courses, selectedIds]);

  const availableCourses = useMemo(() => {
    if (!courses) return [];
    const q = searchQuery.toLowerCase();
    return courses.filter(
      (c) =>
        c.published &&
        !selectedIds.includes(c._id) &&
        (c.title.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q))
    );
  }, [courses, selectedIds, searchQuery]);

  const addCourse = (id: string) => {
    if (selectedIds.length < 4) {
      setSelectedIds([...selectedIds, id]);
      setShowPicker(false);
      setSearchQuery("");
    }
  };

  const removeCourse = (id: string) => {
    setSelectedIds(selectedIds.filter((i) => i !== id));
  };

  const formatPrice = (cents: number) =>
    cents === 0 ? "Free" : `$${(cents / 100).toFixed(2)}`;

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins}m`;
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}m`;
  };

  if (courses === undefined) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="font-mono text-sm text-muted-foreground animate-pulse">
          Loading courses...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <GitCompare className="h-8 w-8 text-terminal-green" />
          <h1 className="font-mono text-2xl md:text-3xl font-bold tracking-tight">
            Compare Courses
          </h1>
        </div>
        <p className="font-mono text-sm text-muted-foreground">
          Select up to 4 courses to compare side by side. Find the best fit for your learning goals.
        </p>
      </div>

      {/* Selected Courses Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {selectedCourses.map((course) => (
          <div
            key={course._id}
            className="flex items-center gap-2 px-3 py-2 border border-terminal-green/30 rounded-lg bg-terminal-green/5"
          >
            <span className="font-mono text-xs font-medium truncate max-w-[200px]">
              {course.title}
            </span>
            <button
              onClick={() => removeCourse(course._id)}
              className="text-muted-foreground hover:text-destructive transition-colors"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
        {selectedIds.length < 4 && (
          <button
            onClick={() => setShowPicker(true)}
            className="flex items-center gap-1 px-3 py-2 border border-dashed border-border rounded-lg hover:border-terminal-green/50 transition-colors"
          >
            <Plus className="h-3 w-3 text-muted-foreground" />
            <span className="font-mono text-xs text-muted-foreground">Add course</span>
          </button>
        )}
      </div>

      {/* Course Picker Modal */}
      {showPicker && (
        <div className="border border-border rounded-lg p-4 bg-card space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-mono text-sm font-semibold">Select a course</h3>
            <button
              onClick={() => {
                setShowPicker(false);
                setSearchQuery("");
              }}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
            className="w-full px-3 py-2 font-mono text-xs border border-border rounded bg-background focus:outline-none focus:ring-1 focus:ring-terminal-green/30"
          />
          <div className="max-h-64 overflow-y-auto space-y-1">
            {availableCourses.slice(0, 20).map((course) => (
              <button
                key={course._id}
                onClick={() => addCourse(course._id)}
                className="w-full flex items-center justify-between p-2 rounded hover:bg-muted/50 transition-colors text-left"
              >
                <div>
                  <p className="font-mono text-xs font-medium">{course.title}</p>
                  <p className="font-mono text-[10px] text-muted-foreground">
                    {course.category} · {formatDuration(course.durationMinutes)}
                  </p>
                </div>
                <Plus className="h-3 w-3 text-muted-foreground" />
              </button>
            ))}
            {availableCourses.length === 0 && (
              <p className="font-mono text-xs text-muted-foreground text-center py-4">
                No courses available
              </p>
            )}
          </div>
        </div>
      )}

      {/* Comparison Table */}
      {selectedCourses.length > 0 ? (
        <div className="border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full font-mono text-xs">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left p-3 w-40 text-muted-foreground font-medium">
                    Attribute
                  </th>
                  {selectedCourses.map((course) => (
                    <th key={course._id} className="text-left p-3 font-medium min-w-[200px]">
                      <Link href={`/courses/${course.slug}`}
                        className="hover:text-terminal-green transition-colors"
                      >
                        {course.title}
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Category */}
                <tr className="border-b border-border">
                  <td className="p-3 text-muted-foreground">Category</td>
                  {selectedCourses.map((c) => (
                    <td key={c._id} className="p-3">
                      <span className={`font-medium ${CATEGORY_COLORS[c.category] || ""}`}>
                        {c.category}
                      </span>
                    </td>
                  ))}
                </tr>
                {/* Price */}
                <tr className="border-b border-border bg-muted/10">
                  <td className="p-3 text-muted-foreground">Price</td>
                  {selectedCourses.map((c) => (
                    <td key={c._id} className="p-3">
                      <span
                        className={
                          c.priceCents === 0
                            ? "text-terminal-green font-semibold"
                            : "font-semibold"
                        }
                      >
                        {formatPrice(c.priceCents)}
                      </span>
                    </td>
                  ))}
                </tr>
                {/* Duration */}
                <tr className="border-b border-border">
                  <td className="p-3 text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" /> Duration
                  </td>
                  {selectedCourses.map((c) => (
                    <td key={c._id} className="p-3">
                      {formatDuration(c.durationMinutes)}
                    </td>
                  ))}
                </tr>
                {/* Modules */}
                <tr className="border-b border-border bg-muted/10">
                  <td className="p-3 text-muted-foreground flex items-center gap-1">
                    <BookOpen className="h-3 w-3" /> Modules
                  </td>
                  {selectedCourses.map((c) => (
                    <td key={c._id} className="p-3">
                      {(c.modules ?? []).length} modules
                    </td>
                  ))}
                </tr>
                {/* Quizzes */}
                <tr className="border-b border-border">
                  <td className="p-3 text-muted-foreground flex items-center gap-1">
                    <BarChart3 className="h-3 w-3" /> Module Quizzes
                  </td>
                  {selectedCourses.map((c) => {
                    const quizCount = (c.modules ?? []).filter((m) =>
                      m.content.some((b) => b.type === "quiz")
                    ).length;
                    return <td key={c._id} className="p-3">{quizCount} quizzes</td>;
                  })}
                </tr>
                {/* Difficulty */}
                <tr className="border-b border-border bg-muted/10">
                  <td className="p-3 text-muted-foreground">Difficulty</td>
                  {selectedCourses.map((c) => (
                    <td key={c._id} className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] border bg-terminal-green/10 text-terminal-green border-terminal-green/20">
                        {c.modules?.length ?? 0} modules
                      </span>
                    </td>
                  ))}
                </tr>
                {/* Instructor */}
                <tr className="border-b border-border">
                  <td className="p-3 text-muted-foreground">Instructor</td>
                  {selectedCourses.map((c) => (
                    <td key={c._id} className="p-3">
                      <div>{c.instructor || "TBA"}</div>
                      {c.instructorTitle && (
                        <div className="text-[10px] text-muted-foreground mt-0.5">
                          {c.instructorTitle}
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
                {/* Description */}
                <tr className="bg-muted/10">
                  <td className="p-3 text-muted-foreground align-top">Description</td>
                  {selectedCourses.map((c) => (
                    <td key={c._id} className="p-3 text-muted-foreground leading-relaxed">
                      {c.description}
                    </td>
                  ))}
                </tr>
                {/* Module Titles */}
                <tr className="border-t border-border">
                  <td className="p-3 text-muted-foreground align-top">Modules</td>
                  {selectedCourses.map((c) => (
                    <td key={c._id} className="p-3">
                      <ol className="space-y-1">
                        {(c.modules ?? []).map((m, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-terminal-green mt-0.5 shrink-0">
                              {i + 1}.
                            </span>
                            <span className="text-muted-foreground">{m.title}</span>
                          </li>
                        ))}
                      </ol>
                    </td>
                  ))}
                </tr>
                {/* Actions */}
                <tr className="border-t border-border bg-muted/20">
                  <td className="p-3"></td>
                  {selectedCourses.map((c) => (
                    <td key={c._id} className="p-3">
                      <Link href={`/courses/${c.slug}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-terminal-green text-white rounded text-xs font-mono hover:bg-terminal-green/90 transition-colors"
                      >
                        <Check className="h-3 w-3" />
                        {c.priceCents === 0 ? "Start Free" : "Enroll Now"}
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed border-border rounded-lg">
          <GitCompare className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
          <p className="font-mono text-sm text-muted-foreground mb-2">
            Select courses above to compare them side by side
          </p>
          <p className="font-mono text-xs text-muted-foreground/70">
            You can compare up to 4 courses at a time
          </p>
        </div>
      )}
    </div>
  );
}
