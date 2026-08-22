"use client";
import { RequireAuth } from "@/components/RequireAuth";
import KnowledgeGapsPage from "@/pages/KnowledgeGaps";

export default function Page() {
  return (
    <RequireAuth>
      <KnowledgeGapsPage />
    </RequireAuth>
  );
}
