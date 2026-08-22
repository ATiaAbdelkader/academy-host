/**
 * Safe wrappers around Convex React hooks.
 *
 * During Next.js build-time static analysis, pages are rendered in ISOLATION
 * (outside the layout tree), so the ConvexProvider context is missing.
 * These wrappers return safe defaults on the server while maintaining
 * the same hook call count as the client (for hydration compatibility).
 */
import { useContext, useRef, useCallback, useState } from "react";

// --- Real convex/react imports (client-only) ---
// These are dynamically accessed to avoid bundling issues on server.
let realHooks: Record<string, unknown> | null = null;
function getRealHooks() {
  if (!realHooks && typeof window !== "undefined") {
    realHooks = require("convex/react");
  }
  return realHooks;
}

// --- Server-safe stubs ---
// Each stub calls at least one React hook to maintain hook call parity.

// We use a throwaway ref as a minimal hook call
function stubRef() {
  return useRef(null);
}

/**
 * useQuery — on server: returns undefined. On client: delegates to real hook.
 * Both paths call exactly one React hook for parity.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useQuery(...args: any[]): any {
  const real = getRealHooks();
  if (real) {
    return (real.useQuery as Function)(...args);
  }
  // Server: return undefined, but call a hook for parity
  stubRef();
  return undefined;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useMutation(...args: any[]): any {
  const real = getRealHooks();
  if (real) {
    return (real.useMutation as Function)(...args);
  }
  stubRef();
  return useCallback(() => Promise.resolve(undefined), []);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useAction(...args: any[]): any {
  const real = getRealHooks();
  if (real) {
    return (real.useAction as Function)(...args);
  }
  stubRef();
  return useCallback(() => Promise.resolve(undefined), []);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function usePaginatedQuery(...args: any[]): any {
  const real = getRealHooks();
  if (real) {
    return (real.usePaginatedQuery as Function)(...args);
  }
  stubRef();
  return { results: undefined, status: "Loading" as const, loadMore: async () => {} };
}

/** useConvexAuth — returns undefined on server (no auth context). */
export function useConvexAuth() {
  const real = getRealHooks();
  if (real) {
    return (real.useConvexAuth as Function)();
  }
  stubRef();
  return undefined;
}

/** useQuery_experimental — same as useQuery but with loading/errored states. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useQuery_experimental(...args: any[]): any {
  const real = getRealHooks();
  if (real && real.useQuery_experimental) {
    return (real.useQuery_experimental as Function)(...args);
  }
  // Fallback to regular useQuery
  return useQuery(...args);
}

/** ConvexReactClient — re-export for provider setup (only used on client). */
export { ConvexReactClient, ConvexProvider } from "convex/react";
