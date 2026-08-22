"use client";
import { RequireAuth } from "@/components/RequireAuth";
import BookingPage from "@/pages/Booking";

// Page receives params: bookingId
export default function Page() {
  return (
    <RequireAuth>
      <BookingPage />
    </RequireAuth>
  );
}
