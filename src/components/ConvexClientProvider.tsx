"use client";

import { ConvexReactClient, ConvexProvider } from "@/lib/convex-react-safe";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ReactNode, useState, useEffect } from "react";

// ConvexReactClient creation is synchronous and doesn't hang.
// Queries will return undefined until a real URL is configured.
const convex = new ConvexReactClient(
  process.env.NEXT_PUBLIC_CONVEX_URL || "https://preview.placeholder.convex.cloud"
);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // SSR / prerendering: provide ConvexProvider (for useQuery/useMutation)
    // but NOT ConvexAuthProvider (which needs browser APIs like localStorage).
    // useConvexAuth returns undefined (handled in use-auth.ts).
    return <ConvexProvider client={convex}>{children}</ConvexProvider>;
  }

  // Client: full auth provider.
  return (
    <ConvexAuthProvider client={convex}>
      {children}
    </ConvexAuthProvider>
  );
}
