import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Don't advertise the framework.
  poweredByHeader: false,
  // Consistent canonical URLs.
  trailingSlash: false,
  images: {
    // Modern formats first; falls back automatically.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
