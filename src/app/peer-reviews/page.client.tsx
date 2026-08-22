"use client";
import { RequireAuth } from "@/components/RequireAuth";
import PeerReviewsPage from "@/pages/PeerReviews";

export default function Page() {
  return (
    <RequireAuth>
      <PeerReviewsPage />
    </RequireAuth>
  );
}
