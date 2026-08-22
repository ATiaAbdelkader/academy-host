"use client";
import { RequireAuth } from "@/components/RequireAuth";
import RevenuePage from "@/pages/Revenue";

export default function Page() {
  return (
    <RequireAuth>
      <RevenuePage />
    </RequireAuth>
  );
}
