"use client";

import { Component, ReactNode } from "react";

/**
 * Error boundary that catches errors during SSR / static prerendering.
 * Convex hooks throw when the provider is not available at build time.
 * This boundary renders nothing (an empty shell) during prerendering,
 * and the real UI hydrates on the client.
 */
export class PrerenderSafe extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback?: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // During prerendering, Convex errors are expected.
    // Only log if we're actually in the browser.
    if (typeof window !== "undefined") {
      console.error("PrerenderSafe caught:", error, info);
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}

/**
 * HOC that wraps a component in PrerenderSafe.
 * Usage in page files:
 *   export default withPrerenderSafe(MyPage);
 */
export function withPrerenderSafe<P extends object>(
  Component: React.ComponentType<P>
) {
  return function PrerenderSafeWrapper(props: P) {
    return (
      <PrerenderSafe>
        <Component {...props} />
      </PrerenderSafe>
    );
  };
}
