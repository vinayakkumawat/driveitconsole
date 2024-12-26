import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**", // Allow all hostnames with http
      },
      {
        protocol: "https",
        hostname: "**", // Allow all hostnames with https
      },
    ],
  },
};

export default nextConfig;
