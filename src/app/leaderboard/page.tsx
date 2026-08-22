"use client";
import { RequireAuth } from "@/components/RequireAuth";
import LeaderboardPage from "@/pages/Leaderboard";

export default function Page() {
  return (
    <RequireAuth>
      <LeaderboardPage />
    </RequireAuth>
  );
}
