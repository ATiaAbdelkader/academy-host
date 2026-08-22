"use client";
import { RequireAuth } from "@/components/RequireAuth";
import FarmDashboardPage from "@/pages/FarmDashboard";

export default function Page() {
  return (
    <RequireAuth>
      <FarmDashboardPage />
    </RequireAuth>
  );
}
