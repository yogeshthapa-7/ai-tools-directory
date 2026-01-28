// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",   // allow all HTTPS domains
      },
      {
        protocol: "http",
        hostname: "**",   // allow all HTTP domains (optional, if you need it)
      },
    ],
  },
};

export default nextConfig;
