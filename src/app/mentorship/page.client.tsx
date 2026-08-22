"use client";
import { RequireAuth } from "@/components/RequireAuth";
import MentorshipPage from "@/pages/Mentorship";

export default function Page() {
  return (
    <RequireAuth>
      <MentorshipPage />
    </RequireAuth>
  );
}
