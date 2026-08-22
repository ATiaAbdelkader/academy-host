"use client";
import { RequireAuth } from "@/components/RequireAuth";
import FarmToolsPage from "@/pages/FarmTools";

export default function Page() {
  return (
    <RequireAuth>
      <FarmToolsPage />
    </RequireAuth>
  );
}
