"use client";
import { RequireAuth } from "@/components/RequireAuth";
import PeerTeachingPagePage from "@/pages/PeerTeachingPage";

export default function Page() {
  return (
    <RequireAuth>
      <PeerTeachingPagePage />
    </RequireAuth>
  );
}
