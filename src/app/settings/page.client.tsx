"use client";
import { RequireAuth } from "@/components/RequireAuth";
import SettingsPage from "@/pages/Settings";

export default function Page() {
  return (
    <RequireAuth>
      <SettingsPage />
    </RequireAuth>
  );
}
