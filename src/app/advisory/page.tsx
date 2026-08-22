"use client";
import { RequireAuth } from "@/components/RequireAuth";
import AdvisoryPage from "@/pages/Advisory";

export default function Page() {
  return (
    <RequireAuth>
      <AdvisoryPage />
    </RequireAuth>
  );
}
