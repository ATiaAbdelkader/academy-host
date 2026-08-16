import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useEffect, useRef } from "react";

/**
 * Subscribes to the curriculum and seeds the starter lessons on first load
 * (idempotent — the seed mutation no-ops once data exists).
 */
export function useLessons() {
  const lessons = useQuery(api.lessons.list);
  const seed = useMutation(api.lessons.seed);
  const attempted = useRef(false);

  useEffect(() => {
    if (lessons !== undefined && lessons.length === 0 && !attempted.current) {
      attempted.current = true;
      void seed();
    }
  }, [lessons, seed]);

  return lessons;
}
