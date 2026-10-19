import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "@goalos/design-tokens",
    "@goalos/types",
    "@goalos/config",
    "@goalos/core",
    "@goalos/api-client",
  ],
};

export default nextConfig;
