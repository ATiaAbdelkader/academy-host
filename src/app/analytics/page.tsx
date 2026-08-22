"use client";
import { RequireAuth } from "@/components/RequireAuth";
import AnalyticsPage from "@/pages/Analytics";

export default function Page() {
  return (
    <RequireAuth>
      <AnalyticsPage />
    </RequireAuth>
  );
}
