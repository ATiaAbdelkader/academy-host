import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  turbopack: {
    root: __dirname,
    resolveAlias: {
      // Prevent module resolution from leaking to parent node_modules
      convex: path.resolve(__dirname, "node_modules/convex"),
      "@convex-dev/auth": path.resolve(__dirname, "node_modules/@convex-dev/auth"),
    },
  },
};

export default nextConfig;
