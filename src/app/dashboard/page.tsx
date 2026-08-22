"use client";
import { RequireAuth } from "@/components/RequireAuth";
import DashboardPage from "@/pages/Dashboard";

export default function Page() {
  return (
    <RequireAuth>
      <DashboardPage />
    </RequireAuth>
  );
}
