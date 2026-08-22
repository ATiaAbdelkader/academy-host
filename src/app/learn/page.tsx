"use client";
import { RequireAuth } from "@/components/RequireAuth";
import MicroLearningPage from "@/pages/MicroLearning";

export default function Page() {
  return (
    <RequireAuth>
      <MicroLearningPage />
    </RequireAuth>
  );
}
