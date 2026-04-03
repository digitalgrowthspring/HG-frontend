import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  async redirects() {
    return [
      { source: "/cart", destination: "/rentals", permanent: true },
      { source: "/shop", destination: "/rentals", permanent: true },
      { source: "/my-account", destination: "/", permanent: true },
    ];
  },
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
