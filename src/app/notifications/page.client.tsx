"use client";
import { RequireAuth } from "@/components/RequireAuth";
import NotificationsPage from "@/pages/Notifications";

export default function Page() {
  return (
    <RequireAuth>
      <NotificationsPage />
    </RequireAuth>
  );
}
