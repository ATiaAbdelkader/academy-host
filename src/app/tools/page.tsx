"use client";
import { RequireAuth } from "@/components/RequireAuth";
import ToolsPage from "@/pages/Tools";

export default function Page() {
  return (
    <RequireAuth>
      <ToolsPage />
    </RequireAuth>
  );
}
