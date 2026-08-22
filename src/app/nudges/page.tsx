"use client";
import { RequireAuth } from "@/components/RequireAuth";
import NudgesPage from "@/pages/Nudges";

export default function Page() {
  return (
    <RequireAuth>
      <NudgesPage />
    </RequireAuth>
  );
}
