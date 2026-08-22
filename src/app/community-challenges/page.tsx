"use client";
import { RequireAuth } from "@/components/RequireAuth";
import CommunityChallengesPage from "@/pages/CommunityChallenges";

export default function Page() {
  return (
    <RequireAuth>
      <CommunityChallengesPage />
    </RequireAuth>
  );
}
