"use client";
import { RequireAuth } from "@/components/RequireAuth";
import ShowcaseWallPage from "@/pages/ShowcaseWall";

export default function Page() {
  return (
    <RequireAuth>
      <ShowcaseWallPage />
    </RequireAuth>
  );
}
