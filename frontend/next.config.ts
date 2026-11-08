import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  // Keep the development issue badge out of visual QA screenshots.
  devIndicators: false,
  async redirects() {
    return [
      { source: "/cart", destination: "/rentals", permanent: true },
      { source: "/shop", destination: "/rentals", permanent: true },
      { source: "/my-account", destination: "/", permanent: true },
      {
        source: "/:path*",
        has: [{ type: "host", value: "hg-frontend-delta\\.vercel\\.app" }],
        destination: "https://heavenlygiggles.com/:path*",
        permanent: true,
      },
    ];
  },
  images: {
    qualities: [75, 90],
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
