"use client";
import { RequireAuth } from "@/components/RequireAuth";
import AssessmentsPage from "@/pages/Assessments";

export default function Page() {
  return (
    <RequireAuth>
      <AssessmentsPage />
    </RequireAuth>
  );
}
