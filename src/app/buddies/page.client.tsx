"use client";
import { RequireAuth } from "@/components/RequireAuth";
import BuddiesPage from "@/pages/Buddies";

export default function Page() {
  return (
    <RequireAuth>
      <BuddiesPage />
    </RequireAuth>
  );
}
