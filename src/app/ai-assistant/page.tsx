"use client";
import { RequireAuth } from "@/components/RequireAuth";
import AiAssistantPage from "@/pages/AiAssistant";

export default function Page() {
  return (
    <RequireAuth>
      <AiAssistantPage />
    </RequireAuth>
  );
}
