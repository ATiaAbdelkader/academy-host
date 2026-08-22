"use client";
import { RequireAuth } from "@/components/RequireAuth";
import CompetenciesPage from "@/pages/Competencies";

export default function Page() {
  return (
    <RequireAuth>
      <CompetenciesPage />
    </RequireAuth>
  );
}
