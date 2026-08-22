"use client";
import { RequireAuth } from "@/components/RequireAuth";
import StudyRemindersPage from "@/pages/StudyReminders";

export default function Page() {
  return (
    <RequireAuth>
      <StudyRemindersPage />
    </RequireAuth>
  );
}
