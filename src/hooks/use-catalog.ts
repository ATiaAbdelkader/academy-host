import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "@/lib/convex-react-safe";
import { fallbackCatalog, type FallbackCourse } from "@/lib/seed-catalog";
import { useEffect, useRef, useMemo } from "react";

/**
 * Returns true when the Convex client is pointing at a real deployment
 * (not the placeholder URL baked into ConvexClientProvider).
 */
function isConvexConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL;
  return Boolean(url && url !== "" && !url.includes("placeholder"));
}

/** Memoised flag — computed once per module load. */
const CONVEX_READY = isConvexConfigured();

/**
 * Subscribes to the training catalog and seeds the starter curriculum.
 *
 * When no Convex deployment URL is configured the hook returns a static
 * fallback catalog so the UI still renders course cards in preview / demo
 * mode — on both server (SSR) and client.
 */
export function useCatalog() {
  const convexCourses = useQuery(api.courses.list);
  const seed = useMutation(api.courses.seed);
  const seedBundles = useMutation(api.bundles.seed);
  const attempted = useRef(false);

  // When Convex IS configured, seed on first load.
  useEffect(() => {
    if (convexCourses !== undefined && !attempted.current && CONVEX_READY) {
      attempted.current = true;
      const seedAll = async () => {
        let batch = 0;
        // eslint-disable-next-line no-constant-condition
        while (true) {
          const result = await seed({ batch });
          if (result.done) break;
          batch++;
        }
      };
      void seedAll();
      void seedBundles();
    }
  }, [convexCourses, seed, seedBundles]);

  // Priority: Convex live data > fallback > undefined (loading)
  if (convexCourses !== undefined) return convexCourses;
  if (!CONVEX_READY) return fallbackCatalog;
  return undefined;
}

/**
 * Look up a single course by slug, with static fallback when Convex is
 * not configured. Returns the course object, null if not found, or
 * undefined while loading.
 */
export function useCourseBySlug(slug: string | undefined): FallbackCourse | null | undefined {
  const liveCourse = useQuery(
    api.courses.getBySlug,
    slug ? { slug } : "skip",
  );

  const fallback = useMemo(() => {
    if (CONVEX_READY || !slug) return undefined;
    return fallbackCatalog.find((c) => c.slug === slug) ?? null;
  }, [slug]);

  if (liveCourse !== undefined) return liveCourse as FallbackCourse | null;
  if (fallback !== undefined) return fallback;
  return undefined;
}
