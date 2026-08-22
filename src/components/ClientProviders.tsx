"use client";

import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import { PrerenderSafe } from "@/components/PrerenderSafe";
import { ReactNode } from "react";
import { Toaster } from "sonner";

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <PrerenderSafe>
      <ConvexClientProvider>
        {children}
        <Toaster />
      </ConvexClientProvider>
    </PrerenderSafe>
  );
}
