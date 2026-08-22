"use client";
import { RequireAuth } from "@/components/RequireAuth";
import StudyPlanPage from "@/pages/StudyPlan";

export default function Page() {
  return (
    <RequireAuth>
      <StudyPlanPage />
    </RequireAuth>
  );
}
