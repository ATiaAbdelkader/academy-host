"use client";
import { RequireAuth } from "@/components/RequireAuth";
import LearningPathsPage from "@/pages/LearningPaths";

export default function Page() {
  return (
    <RequireAuth>
      <LearningPathsPage />
    </RequireAuth>
  );
}
