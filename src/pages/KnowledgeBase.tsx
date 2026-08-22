"use client";
import Link from "next/link";
import { useState, useMemo } from "react";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { Search, BookOpen, ChevronRight, ChevronDown, FileText, Lightbulb, Tag } from "lucide-react";

type ContentItem = {
  courseTitle: string;
  courseSlug: string;
  moduleTitle: string;
  moduleIndex: number;
  type: string;
  text?: string;
  items?: string[];
  title?: string;
};

const CATEGORY_COLORS: Record<string, string> = {
  Foundations: "bg-terminal-green/10 text-terminal-green border-terminal-green/20",
  "Core Skills": "bg-amber-500/10 text-amber-700 border-amber-500/20",
  Horticulture: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20",
  AgTech: "bg-blue-500/10 text-blue-700 border-blue-500/20",
  "Sustainable Agriculture": "bg-green-500/10 text-green-700 border-green-500/20",
  "Plant Health": "bg-red-500/10 text-red-700 border-red-500/20",
  Livestock: "bg-orange-500/10 text-orange-700 border-orange-500/20",
  "Farm Operations": "bg-indigo-500/10 text-indigo-700 border-indigo-500/20",
  "Crop Science": "bg-teal-500/10 text-teal-700 border-teal-500/20",
  "Water Management": "bg-cyan-500/10 text-cyan-700 border-cyan-500/20",
  "Agricultural Science": "bg-violet-500/10 text-violet-700 border-violet-500/20",
};

export default function KnowledgeBase() {
  const courses = useQuery(api.courses.list);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
  const [expandedModule, setExpandedModule] = useState<string | null>(null);

  // Build searchable index from all courses
  const searchableItems = useMemo(() => {
    if (!courses) return [];
    const items: ContentItem[] = [];
    for (const course of courses) {
      if (!course.published) continue;
      for (let mi = 0; mi < (course.modules ?? []).length; mi++) {
        const mod = (course.modules ?? [])[mi];
        if (!mod) continue;
        for (const block of mod.content) {
          if (block.type === "paragraph" && block.text) {
            items.push({
              courseTitle: course.title,
              courseSlug: course.slug,
              moduleTitle: mod.title,
              moduleIndex: mi,
              type: "paragraph",
              text: block.text,
            });
          }
          if (block.type === "list" && block.items) {
            items.push({
              courseTitle: course.title,
              courseSlug: course.slug,
              moduleTitle: mod.title,
              moduleIndex: mi,
              type: "list",
              items: block.items,
            });
          }
          if (block.type === "quiz" && block.title) {
            items.push({
              courseTitle: course.title,
              courseSlug: course.slug,
              moduleTitle: mod.title,
              moduleIndex: mi,
              type: "quiz",
              title: block.title,
            });
          }
        }
      }
    }
    return items;
  }, [courses]);

  // Filter by search query
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return searchableItems;
    const q = searchQuery.toLowerCase();
    return searchableItems.filter(
      (item) =>
        item.text?.toLowerCase().includes(q) ||
        item.courseTitle.toLowerCase().includes(q) ||
        item.moduleTitle.toLowerCase().includes(q) ||
        item.items?.some((i) => i.toLowerCase().includes(q))
    );
  }, [searchableItems, searchQuery]);

  // Group by course
  const groupedByCourse = useMemo(() => {
    const groups: Record<string, ContentItem[]> = {};
    for (const item of filteredItems) {
      if (!groups[item.courseTitle]) groups[item.courseTitle] = [];
      groups[item.courseTitle].push(item);
    }
    return groups;
  }, [filteredItems]);

  // Categories
  const categories = useMemo(() => {
    if (!courses) return [];
    const cats = new Set<string>();
    for (const c of courses) {
      if (c.published) cats.add(c.category);
    }
    return Array.from(cats).sort();
  }, [courses]);

  // Filter by category
  const displayedCourses = useMemo(() => {
    if (!selectedCategory) return groupedByCourse;
    if (!courses) return {};
    const filtered: Record<string, ContentItem[]> = {};
    for (const [title, items] of Object.entries(groupedByCourse)) {
      const course = courses.find((c) => c.title === title);
      if (course?.category === selectedCategory) {
        filtered[title] = items;
      }
    }
    return filtered;
  }, [groupedByCourse, selectedCategory, courses]);

  const stats = useMemo(() => {
    const courseCount = Object.keys(displayedCourses).length;
    const moduleCount = new Set(
      Object.values(displayedCourses)
        .flat()
        .map((i) => `${i.courseTitle}::${i.moduleTitle}`)
    ).size;
    const paragraphCount = filteredItems.filter((i) => i.type === "paragraph").length;
    return { courseCount, moduleCount, paragraphCount };
  }, [displayedCourses, filteredItems]);

  if (courses === undefined) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="font-mono text-sm text-muted-foreground animate-pulse">
          Loading knowledge base...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <BookOpen className="h-8 w-8 text-terminal-green" />
          <h1 className="font-mono text-2xl md:text-3xl font-bold tracking-tight">
            Knowledge Base
          </h1>
        </div>
        <p className="font-mono text-sm text-muted-foreground">
          Searchable reference from {stats.courseCount} courses, {stats.moduleCount} modules, and{" "}
          {stats.paragraphCount} content sections.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search across all courses, modules, and content..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 font-mono text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-terminal-green/30 focus:border-terminal-green"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-xs font-mono"
          >
            clear
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-3 py-1.5 rounded-full text-xs font-mono border transition-colors ${
            !selectedCategory
              ? "bg-terminal-green text-white border-terminal-green"
              : "bg-background text-muted-foreground border-border hover:border-terminal-green/50"
          }`}
        >
          All Categories
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-mono border transition-colors ${
              selectedCategory === cat
                ? "bg-terminal-green text-white border-terminal-green"
                : CATEGORY_COLORS[cat] || "bg-background text-muted-foreground border-border"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results */}
      {Object.keys(displayedCourses).length === 0 ? (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
          <p className="font-mono text-sm text-muted-foreground">
            {searchQuery
              ? "No results found. Try different keywords."
              : "No content available yet."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {Object.entries(displayedCourses).map(([courseTitle, items]) => {
            const course = courses.find((c) => c.title === courseTitle);
            const isExpanded = expandedCourse === courseTitle;
            const uniqueModules = Array.from(new Set(items.map((i) => i.moduleTitle)));

            return (
              <div
                key={courseTitle}
                className="border border-border rounded-lg overflow-hidden bg-card"
              >
                {/* Course Header */}
                <button
                  onClick={() => setExpandedCourse(isExpanded ? null : courseTitle)}
                  className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3 text-left">
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                    )}
                    <div>
                      <h3 className="font-mono text-sm font-semibold">{courseTitle}</h3>
                      <p className="font-mono text-xs text-muted-foreground mt-0.5">
                        {items.length} content items across {uniqueModules.length} modules
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono border ${
                        CATEGORY_COLORS[course?.category || ""] ||
                        "bg-background text-muted-foreground border-border"
                      }`}
                    >
                      {course?.category}
                    </span>
                    <Link href={`/courses/${course?.slug}`}
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs font-mono text-terminal-green hover:underline px-2"
                    >
                      view course
                    </Link>
                  </div>
                </button>

                {/* Course Content */}
                {isExpanded && (
                  <div className="border-t border-border p-4 space-y-4">
                    {uniqueModules.map((modTitle) => {
                      const modItems = items.filter((i) => i.moduleTitle === modTitle);
                      const modKey = `${courseTitle}::${modTitle}`;
                      const isModExpanded = expandedModule === modKey;

                      return (
                        <div key={modKey} className="ml-4">
                          <button
                            onClick={() =>
                              setExpandedModule(isModExpanded ? null : modKey)
                            }
                            className="flex items-center gap-2 text-left hover:text-terminal-green transition-colors"
                          >
                            {isModExpanded ? (
                              <ChevronDown className="h-3 w-3" />
                            ) : (
                              <ChevronRight className="h-3 w-3" />
                            )}
                            <span className="font-mono text-xs font-medium">{modTitle}</span>
                            <span className="font-mono text-[10px] text-muted-foreground">
                              ({modItems.length} items)
                            </span>
                          </button>

                          {isModExpanded && (
                            <div className="ml-6 mt-2 space-y-2">
                              {modItems.map((item, idx) => (
                                <div
                                  key={idx}
                                  className="p-2 rounded bg-muted/30 border-l-2 border-terminal-green/30"
                                >
                                  {item.type === "paragraph" && item.text && (
                                    <p className="font-mono text-xs leading-relaxed text-muted-foreground">
                                      {searchQuery
                                        ? highlightText(item.text, searchQuery)
                                        : item.text}
                                    </p>
                                  )}
                                  {item.type === "list" && item.items && (
                                    <ul className="space-y-1">
                                      {item.items.map((listItem, li) => (
                                        <li
                                          key={li}
                                          className="flex items-start gap-2 font-mono text-xs text-muted-foreground"
                                        >
                                          <span className="text-terminal-green mt-0.5">•</span>
                                          <span>
                                            {searchQuery
                                              ? highlightText(listItem, searchQuery)
                                              : listItem}
                                          </span>
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                  {item.type === "quiz" && item.title && (
                                    <div className="flex items-center gap-2">
                                      <Lightbulb className="h-3 w-3 text-amber-500" />
                                      <span className="font-mono text-xs text-amber-700">
                                        Quiz: {item.title}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Stats Footer */}
      <div className="flex items-center justify-center gap-6 py-4 border-t border-border">
        <div className="flex items-center gap-2">
          <Tag className="h-3 w-3 text-muted-foreground" />
          <span className="font-mono text-xs text-muted-foreground">
            {stats.courseCount} courses
          </span>
        </div>
        <div className="flex items-center gap-2">
          <FileText className="h-3 w-3 text-muted-foreground" />
          <span className="font-mono text-xs text-muted-foreground">
            {stats.paragraphCount} sections
          </span>
        </div>
      </div>
    </div>
  );
}

function highlightText(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text;
  const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="bg-terminal-green/20 text-terminal-green rounded px-0.5">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}
