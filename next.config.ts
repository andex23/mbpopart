import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  turbopack: {
    root: process.cwd(),
  },
  images: {
    formats: ["image/avif", "image/webp"],
    localPatterns: [
      {
        pathname: "/api/legacy-image",
      },
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mbpopart.com",
        pathname: "/assets/**",
      },
      {
        protocol: "https",
        hostname: "www.mbpopart.com",
        pathname: "/assets/**",
      },
    ],
  },
};

export default nextConfig;
