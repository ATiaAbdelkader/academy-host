import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Learning Paths: curated sequences of courses that guide students
 * through a specific learning journey (e.g., "Beginner Track",
 * "Farm Management Track").
 */

/** Predefined learning paths for the academy. */
const LEARNING_PATHS = [
  {
    id: "beginner",
    title: "Agricultural Foundations",
    description: "Start here if you're new to agriculture. Build core knowledge in soil, crops, and farm management.",
    icon: "🌱",
    color: "term-green",
    courseSlugs: [
      "soil-health-and-fertility",
      "crop-planning-and-rotation",
      "water-management-essentials",
      "pest-and-disease-control",
    ],
    estimatedWeeks: 8,
    difficulty: "beginner",
  },
  {
    id: "farm-management",
    title: "Farm Business Management",
    description: "Learn to run a profitable farm. Covers budgeting, marketing, and operations planning.",
    icon: "📊",
    color: "term-amber",
    courseSlugs: [
      "agribusiness-fundamentals",
      "farm-financial-management",
      "agricultural-marketing",
      "bmc-in-agriculture-project",
    ],
    estimatedWeeks: 10,
    difficulty: "intermediate",
  },
  {
    id: "sustainable",
    title: "Sustainable Agriculture",
    description: "Master sustainable practices that protect the environment while maintaining productivity.",
    icon: "♻️",
    color: "term-green",
    courseSlugs: [
      "sustainable-farming-practices",
      "organic-farming-methods",
      "climate-smart-agriculture",
      "agroforestry-systems",
    ],
    estimatedWeeks: 10,
    difficulty: "intermediate",
  },
  {
    id: "livestock",
    title: "Livestock & Animal Science",
    description: "Comprehensive training in animal husbandry, health management, and production systems.",
    icon: "🐄",
    color: "term-amber",
    courseSlugs: [
      "livestock-management-basics",
      "animal-health-and-nutrition",
      "poultry-farming-essentials",
      "dairy-farming-operations",
    ],
    estimatedWeeks: 12,
    difficulty: "intermediate",
  },
  {
    id: "advanced",
    title: "Advanced Agricultural Technology",
    description: "Explore precision agriculture, IoT in farming, and modern agricultural technology.",
    icon: "🚜",
    color: "term-green",
    courseSlugs: [
      "precision-agriculture",
      "agricultural-technology",
      "farm-automation",
      "data-driven-farming",
    ],
    estimatedWeeks: 12,
    difficulty: "advanced",
  },
  {
    id: "horticulture",
    title: "Horticulture & Garden Design",
    description: "Master garden design, plant propagation, and nursery management for beautiful, productive spaces.",
    icon: "🌸",
    color: "term-green",
    courseSlugs: [
      "garden-design-layout",
      "plant-propagation-nursery-management",
      "composting-soil-amendments",
      "beekeeping-pollination-services",
    ],
    estimatedWeeks: 10,
    difficulty: "beginner",
  },
  {
    id: "post-harvest",
    title: "Post-Harvest & Farm Operations",
    description: "Handle, store, and transport produce efficiently. Master equipment and water systems.",
    icon: "🚜",
    color: "term-amber",
    courseSlugs: [
      "post-harvest-handling-storage",
      "farm-equipment-machinery-basics",
      "water-harvesting-irrigation-systems",
      "precision-agriculture",
    ],
    estimatedWeeks: 10,
    difficulty: "intermediate",
  },
];

/** Get all available learning paths with course details. */
export const list = query({
  args: {},
  handler: async (ctx) => {
    const courses = await ctx.db.query("courses").collect();
    const courseBySlug = new Map(courses.map((c) => [c.slug, c]));

    return LEARNING_PATHS.map((path) => ({
      ...path,
      courses: path.courseSlugs
        .map((slug) => {
          const course = courseBySlug.get(slug);
          if (!course) return null;
          return {
            _id: course._id,
            title: course.title,
            slug: course.slug,
            description: course.description,
            category: course.category,
            durationMinutes: course.durationMinutes,
            priceCents: course.priceCents,
            published: course.published,
          };
        })
        .filter(Boolean),
      totalCourses: path.courseSlugs.length,
      availableCourses: path.courseSlugs.filter((slug) => {
        const course = courseBySlug.get(slug);
        return course?.published;
      }).length,
    }));
  },
});

/** Get a single learning path by ID. */
export const get = query({
  args: { pathId: v.string() },
  handler: async (ctx, { pathId }) => {
    const path = LEARNING_PATHS.find((p) => p.id === pathId);
    if (!path) return null;

    const courses = await ctx.db.query("courses").collect();
    const courseBySlug = new Map(courses.map((c) => [c.slug, c]));

    return {
      ...path,
      courses: path.courseSlugs
        .map((slug) => {
          const course = courseBySlug.get(slug);
          if (!course) return null;
          return {
            _id: course._id,
            title: course.title,
            slug: course.slug,
            description: course.description,
            category: course.category,
            durationMinutes: course.durationMinutes,
            priceCents: course.priceCents,
            published: course.published,
          };
        })
        .filter(Boolean),
    };
  },
});

/** Get the signed-in student's progress across all learning paths. */
export const myProgress = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;

    const progress = await ctx.db
      .query("progress")
      .withIndex("by_user_course", (q) => q.eq("userId", userId))
      .collect();

    const completedSlugs = new Set<string>();
    const startedSlugs = new Set<string>();

    const courses = await ctx.db.query("courses").collect();
    const slugByCourseId = new Map(courses.map((c) => [c._id, c.slug]));

    for (const p of progress) {
      const slug = slugByCourseId.get(p.courseId);
      if (!slug) continue;
      if (p.status === "completed") {
        completedSlugs.add(slug);
      } else {
        startedSlugs.add(slug);
      }
    }

    return LEARNING_PATHS.map((path) => {
      const completedInPath = path.courseSlugs.filter((s) => completedSlugs.has(s)).length;
      const startedInPath = path.courseSlugs.filter((s) => startedSlugs.has(s)).length;
      const percent = Math.round((completedInPath / path.courseSlugs.length) * 100);

      return {
        pathId: path.id,
        title: path.title,
        icon: path.icon,
        completedCourses: completedInPath,
        totalCourses: path.courseSlugs.length,
        startedCourses: startedInPath,
        percent,
        status: percent === 100 ? "completed" : startedInPath > 0 ? "in-progress" : "not-started",
      };
    });
  },
});

/** Recommended next path based on completed courses. */
export const recommended = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return LEARNING_PATHS[0]; // Default to beginner path
    }

    const progress = await ctx.db
      .query("progress")
      .withIndex("by_user_course", (q) => q.eq("userId", userId))
      .collect();

    const courses = await ctx.db.query("courses").collect();
    const slugByCourseId = new Map(courses.map((c) => [c._id, c.slug]));
    const completedSlugs = new Set(
      progress
        .filter((p) => p.status === "completed")
        .map((p) => slugByCourseId.get(p.courseId))
        .filter(Boolean) as string[]
    );

    // Find the first path that's not completed
    for (const path of LEARNING_PATHS) {
      const allCompleted = path.courseSlugs.every((s) => completedSlugs.has(s));
      if (!allCompleted) {
        return path;
      }
    }

    return null; // All paths completed!
  },
});
