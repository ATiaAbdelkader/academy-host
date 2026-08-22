/**
 * Safe shim for convex/react hooks used during SSR / static prerendering.
 * Provides no-op implementations that return safe defaults.
 * This is NOT used at runtime — it's only aliased during Next.js build
 * to prevent build failures when pages are rendered in isolation.
 */
import { useContext, useEffect, useRef, useState, useCallback } from "react";

// Re-export everything from the real convex/react for runtime use
export * from "@/lib/convex-react-safe";

// These will be tree-shaken away at runtime since they're not imported.
// During build-time SSR, the real hooks fail because ConvexProvider context
// is not available (pages are rendered in isolation from the layout).
// The alias in next.config.ts ensures the build uses safe fallbacks.
