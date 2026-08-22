"use client";
import { RequireAuth } from "@/components/RequireAuth";
import LiveSessionsPage from "@/pages/LiveSessions";

export default function Page() {
  return (
    <RequireAuth>
      <LiveSessionsPage />
    </RequireAuth>
  );
}
