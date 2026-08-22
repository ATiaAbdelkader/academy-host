/**
 * Safe wrappers around Convex React hooks.
 *
 * When no Convex deployment URL is configured (preview/demo mode) these
 * wrappers return safe no-op defaults so the UI renders with static
 * fallback data instead of crashing.
 *
 * When Convex IS configured, they delegate to the real hooks from
 * convex/react. All real hooks are imported via ESM (not require) so
 * Turbopack bundles them correctly in the browser.
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

/** True when a real Convex deployment URL is available. */
const CONVEX_CONFIGURED =
  typeof process !== "undefined" &&
  Boolean(
    process.env.NEXT_PUBLIC_CONVEX_URL &&
    process.env.NEXT_PUBLIC_CONVEX_URL !== "" &&
    !process.env.NEXT_PUBLIC_CONVEX_URL.includes("placeholder"),
  );

const isServer = typeof window === "undefined";

// --- Stubs ---
function stubRef() {
  return useRef(null);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useQuery(...args: any[]): any {
  if (isServer || !CONVEX_CONFIGURED) {
    stubRef();
    return undefined;
  }
  return (_useQuery as Function)(...args);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useMutation(...args: any[]): any {
  if (isServer || !CONVEX_CONFIGURED) {
    stubRef();
    return useCallback(() => Promise.resolve(undefined), []);
  }
  return (_useMutation as Function)(...args);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useAction(...args: any[]): any {
  if (isServer || !CONVEX_CONFIGURED) {
    stubRef();
    return useCallback(() => Promise.resolve(undefined), []);
  }
  return (_useAction as Function)(...args);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function usePaginatedQuery(...args: any[]): any {
  if (isServer || !CONVEX_CONFIGURED) {
    stubRef();
    return { results: undefined, status: "Loading" as const, loadMore: async () => {} };
  }
  return (_usePaginatedQuery as Function)(...args);
}

/** useConvexAuth — returns undefined when Convex is not configured. */
export function useConvexAuth() {
  if (isServer || !CONVEX_CONFIGURED) {
    stubRef();
    return undefined;
  }
  return _useConvexAuth();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useQuery_experimental(...args: any[]): any {
  if (isServer || !CONVEX_CONFIGURED) {
    return useQuery(...args);
  }
  return (_useQuery_experimental as Function)(...args);
}

/** ConvexReactClient and ConvexProvider — re-exported for provider setup. */
export { ConvexReactClient, ConvexProvider };
