"use client";
import { RequireAuth } from "@/components/RequireAuth";
import KnowledgeBasePage from "@/pages/KnowledgeBase";

export default function Page() {
  return (
    <RequireAuth>
      <KnowledgeBasePage />
    </RequireAuth>
  );
}
