"use client";
import { RequireAuth } from "@/components/RequireAuth";
import CertificatePage from "@/pages/Certificate";

// Page receives params: courseId
export default function Page() {
  return (
    <RequireAuth>
      <CertificatePage />
    </RequireAuth>
  );
}
