"use client";
import { RequireAuth } from "@/components/RequireAuth";
import StorePage from "@/pages/Store";

export default function Page() {
  return (
    <RequireAuth>
      <StorePage />
    </RequireAuth>
  );
}
