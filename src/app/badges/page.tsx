"use client";
import { RequireAuth } from "@/components/RequireAuth";
import BadgesPage from "@/pages/Badges";

export default function Page() {
  return (
    <RequireAuth>
      <BadgesPage />
    </RequireAuth>
  );
}
