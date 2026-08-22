"use client";
import { RequireAuth } from "@/components/RequireAuth";
import CropDoctorPage from "@/pages/CropDoctor";

export default function Page() {
  return (
    <RequireAuth>
      <CropDoctorPage />
    </RequireAuth>
  );
}
