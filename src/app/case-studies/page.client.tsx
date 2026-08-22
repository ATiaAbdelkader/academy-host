"use client";
import { RequireAuth } from "@/components/RequireAuth";
import CaseStudiesPage from "@/pages/CaseStudies";

export default function Page() {
  return (
    <RequireAuth>
      <CaseStudiesPage />
    </RequireAuth>
  );
}
