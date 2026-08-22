"use client";
import { RequireAuth } from "@/components/RequireAuth";
import FlashcardsPage from "@/pages/Flashcards";

export default function Page() {
  return (
    <RequireAuth>
      <FlashcardsPage />
    </RequireAuth>
  );
}
