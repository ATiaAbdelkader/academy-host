"use client";
import { RequireAuth } from "@/components/RequireAuth";
import CourseComparePage from "@/pages/CourseCompare";

export default function Page() {
  return (
    <RequireAuth>
      <CourseComparePage />
    </RequireAuth>
  );
}
