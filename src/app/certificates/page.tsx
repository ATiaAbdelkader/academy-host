"use client";
import { RequireAuth } from "@/components/RequireAuth";
import CertificatesPage from "@/pages/Certificates";

export default function Page() {
  return (
    <RequireAuth>
      <CertificatesPage />
    </RequireAuth>
  );
}
