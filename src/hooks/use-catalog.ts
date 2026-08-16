import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useEffect, useRef } from "react";

/**
 * Subscribes to the training catalog and seeds the starter curriculum on first
 * load (idempotent — the seed mutation no-ops once courses exist).
 */
export function useCatalog() {
  const courses = useQuery(api.courses.list);
  const seed = useMutation(api.courses.seed);
  const attempted = useRef(false);

  useEffect(() => {
    if (courses !== undefined && courses.length === 0 && !attempted.current) {
      attempted.current = true;
      void seed();
    }
  }, [courses, seed]);

  return courses;
}
