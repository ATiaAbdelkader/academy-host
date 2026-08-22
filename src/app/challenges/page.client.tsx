"use client";
import { RequireAuth } from "@/components/RequireAuth";
import ChallengesPage from "@/pages/Challenges";

export default function Page() {
  return (
    <RequireAuth>
      <ChallengesPage />
    </RequireAuth>
  );
}
