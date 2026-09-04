import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Don't advertise the framework.
  poweredByHeader: false,
  // Consistent canonical URLs.
  trailingSlash: false,
  images: {
    // Modern formats first; falls back automatically.
    formats: ["image/avif", "image/webp"],
    // Next only serves quality=75 unless it's explicitly allow-listed here —
    // an unlisted `quality` prop is silently dropped back to 75 rather than
    // erroring, which is what happened when HeroBackground/FooterBackground
    // first asked for 90. 75 stays for everything else already relying on
    // the default.
    qualities: [75, 90],
  },
};

export default nextConfig;
