"use client";
import { RequireAuth } from "@/components/RequireAuth";
import CompetencyPassportPage from "@/pages/CompetencyPassport";

export default function Page() {
  return (
    <RequireAuth>
      <CompetencyPassportPage />
    </RequireAuth>
  );
}
