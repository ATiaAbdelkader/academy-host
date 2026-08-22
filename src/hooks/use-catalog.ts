import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "@/lib/convex-react-safe";
import { useEffect, useRef } from "react";

/**
 * Subscribes to the training catalog and seeds the starter curriculum. The
 * seed is idempotent and fills in only missing courses, so it runs once per
 * session load — new catalog additions reach existing deployments on their
 * next load.
 */
export function useCatalog() {
  const courses = useQuery(api.courses.list);
  const seed = useMutation(api.courses.seed);
  const seedBundles = useMutation(api.bundles.seed);
  const attempted = useRef(false);

  useEffect(() => {
    if (courses !== undefined && !attempted.current) {
      attempted.current = true;
      // Seed in batches to avoid the 16 MB single-execution limit.
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
  }, [courses, seed, seedBundles]);

  return courses;
}
