/**
 * Safe wrappers around Convex React hooks.
 *
 * During Next.js build-time static analysis, pages are rendered in ISOLATION
 * (outside the layout tree), so the ConvexProvider context is missing.
 * These wrappers return safe defaults on the server while maintaining
 * the same hook call count as the client (for hydration compatibility).
 *
 * All real hooks are imported via ESM (not require) so Turbopack bundles
 * them correctly in the browser.
 */
import { useRef, useCallback } from "react";
import {
  useQuery as _useQuery,
  useMutation as _useMutation,
  useAction as _useAction,
  usePaginatedQuery as _usePaginatedQuery,
  useConvexAuth as _useConvexAuth,
  useQuery_experimental as _useQuery_experimental,
  ConvexReactClient,
  ConvexProvider,
} from "convex/react";

const isServer = typeof window === "undefined";

// --- Server-safe stubs ---
// Each stub calls at least one React hook to maintain hook call parity.
function stubRef() {
  return useRef(null);
}

/**
 * useQuery — on server: returns undefined. On client: delegates to real hook.
 * Both paths call exactly one React hook for parity.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useQuery(...args: any[]): any {
  if (isServer) {
    stubRef();
    return undefined;
  }
  return _useQuery(...args);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useMutation(...args: any[]): any {
  if (isServer) {
    stubRef();
    return useCallback(() => Promise.resolve(undefined), []);
  }
  return _useMutation(...args);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useAction(...args: any[]): any {
  if (isServer) {
    stubRef();
    return useCallback(() => Promise.resolve(undefined), []);
  }
  return _useAction(...args);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function usePaginatedQuery(...args: any[]): any {
  if (isServer) {
    stubRef();
    return { results: undefined, status: "Loading" as const, loadMore: async () => {} };
  }
  return _usePaginatedQuery(...args);
}

/** useConvexAuth — returns undefined on server (no auth context). */
export function useConvexAuth() {
  if (isServer) {
    stubRef();
    return undefined;
  }
  return _useConvexAuth();
}

/** useQuery_experimental — same as useQuery but with loading/errored states. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useQuery_experimental(...args: any[]): any {
  if (isServer) {
    return useQuery(...args);
  }
  return _useQuery_experimental(...args);
}

/** ConvexReactClient and ConvexProvider — re-exported for provider setup. */
export { ConvexReactClient, ConvexProvider };
