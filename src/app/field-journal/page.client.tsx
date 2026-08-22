"use client";
import { RequireAuth } from "@/components/RequireAuth";
import FieldJournalPage from "@/pages/FieldJournal";

export default function Page() {
  return (
    <RequireAuth>
      <FieldJournalPage />
    </RequireAuth>
  );
}
