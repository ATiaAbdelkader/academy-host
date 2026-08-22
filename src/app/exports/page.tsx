"use client";
import { RequireAuth } from "@/components/RequireAuth";
import ExportsPage from "@/pages/Exports";

export default function Page() {
  return (
    <RequireAuth>
      <ExportsPage />
    </RequireAuth>
  );
}
