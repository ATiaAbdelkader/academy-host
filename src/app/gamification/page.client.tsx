"use client";
import { RequireAuth } from "@/components/RequireAuth";
import GamificationPage from "@/pages/Gamification";

export default function Page() {
  return (
    <RequireAuth>
      <GamificationPage />
    </RequireAuth>
  );
}
