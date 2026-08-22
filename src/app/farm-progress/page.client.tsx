"use client";
import { RequireAuth } from "@/components/RequireAuth";
import FarmProgressPage from "@/pages/FarmProgress";

export default function Page() {
  return (
    <RequireAuth>
      <FarmProgressPage />
    </RequireAuth>
  );
}
