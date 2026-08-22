"use client";
import { RequireAuth } from "@/components/RequireAuth";
import StudyGroupsPage from "@/pages/StudyGroups";

export default function Page() {
  return (
    <RequireAuth>
      <StudyGroupsPage />
    </RequireAuth>
  );
}
