"use client";
import { RequireAuth } from "@/components/RequireAuth";
import SkillsTranscriptPage from "@/pages/SkillsTranscript";

export default function Page() {
  return (
    <RequireAuth>
      <SkillsTranscriptPage />
    </RequireAuth>
  );
}
