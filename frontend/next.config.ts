import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "heavenlygiggles.com",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "wp.heavenlygiggles.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
