"use client";
import { RequireAuth } from "@/components/RequireAuth";
import VirtualLabsPage from "@/pages/VirtualLabs";

export default function Page() {
  return (
    <RequireAuth>
      <VirtualLabsPage />
    </RequireAuth>
  );
}
