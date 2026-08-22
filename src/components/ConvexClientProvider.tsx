"use client";

import { ConvexReactClient, ConvexProvider } from "convex/react";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ReactNode } from "react";

// Use a placeholder URL for preview mode (queries will return undefined)
const DUMMY_URL = "https://preview.placeholder.convex.cloud";

const convex = new ConvexReactClient(
  process.env.NEXT_PUBLIC_CONVEX_URL || DUMMY_URL
);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ConvexAuthProvider client={convex}>
      {children}
    </ConvexAuthProvider>
  );
}
