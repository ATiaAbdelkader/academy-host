"use client";
import { RequireAuth } from "@/components/RequireAuth";
import SeasonalChallengesPage from "@/pages/SeasonalChallenges";

export default function Page() {
  return (
    <RequireAuth>
      <SeasonalChallengesPage />
    </RequireAuth>
  );
}
