"use client";
import { RequireAuth } from "@/components/RequireAuth";
import FarmSimulatorPage from "@/pages/FarmSimulator";

export default function Page() {
  return (
    <RequireAuth>
      <FarmSimulatorPage />
    </RequireAuth>
  );
}
