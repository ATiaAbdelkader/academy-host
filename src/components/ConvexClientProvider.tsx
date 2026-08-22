"use client";

import { ConvexReactClient, ConvexProvider } from "@/lib/convex-react-safe";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ReactNode, useState, useEffect, useMemo } from "react";

/** True when a real Convex deployment URL is configured. */
const CONVEX_CONFIGURED =
  typeof process !== "undefined" &&
  process.env.NEXT_PUBLIC_CONVEX_URL &&
  process.env.NEXT_PUBLIC_CONVEX_URL !== "" &&
  !process.env.NEXT_PUBLIC_CONVEX_URL.includes("placeholder");

// Only create the Convex client when a real URL is available.
// Otherwise queries are handled by fallback data — no WebSocket noise.
const convex = CONVEX_CONFIGURED
  ? new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!)
  : null;

/**
 * Lightweight no-op provider that satisfies the Convex context contract
 * without actually connecting to any backend.
 */
function NullConvexProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // No Convex URL → skip real provider entirely (no WebSocket attempts).
  if (!convex) {
    return <NullConvexProvider>{children}</NullConvexProvider>;
  }

  if (!mounted) {
    return <ConvexProvider client={convex}>{children}</ConvexProvider>;
  }

  return (
    <ConvexAuthProvider client={convex}>
      {children}
    </ConvexAuthProvider>
  );
}
