import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // Allow cross-origin access from Z AI preview and any local proxy
  allowedDevOrigins: [
    "preview-chat-f01ff209-902e-42d9-9dd4-96badcc17810.space-z.ai",
    "21.0.7.49",
    "localhost",
    "127.0.0.1",
  ],
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
