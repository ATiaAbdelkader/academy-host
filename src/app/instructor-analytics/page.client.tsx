"use client";
import { RequireAuth } from "@/components/RequireAuth";
import InstructorAnalyticsPage from "@/pages/InstructorAnalytics";

export default function Page() {
  return (
    <RequireAuth>
      <InstructorAnalyticsPage />
    </RequireAuth>
  );
}
