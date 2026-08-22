"use client";
import { RequireAuth } from "@/components/RequireAuth";
import AdminPage from "@/pages/Admin";

export default function Page() {
  return (
    <RequireAuth>
      <AdminPage />
    </RequireAuth>
  );
}
