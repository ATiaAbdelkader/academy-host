import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
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
      void seed();
      void seedBundles();
    }
  }, [courses, seed, seedBundles]);

  return courses;
}
