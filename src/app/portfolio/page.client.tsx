"use client";
import { RequireAuth } from "@/components/RequireAuth";
import PortfolioPage from "@/pages/Portfolio";

export default function Page() {
  return (
    <RequireAuth>
      <PortfolioPage />
    </RequireAuth>
  );
}
