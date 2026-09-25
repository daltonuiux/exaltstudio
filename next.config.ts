import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Don't advertise the framework.
  poweredByHeader: false,
  // Consistent canonical URLs.
  trailingSlash: false,
  experimental: {
    // Inline the (small, ~24KB) stylesheet into the HTML instead of linking it.
    // As a separate render-blocking request it queued behind, and shared
    // bandwidth with, everything else the page requests at start-up (the hero
    // image, fonts, ~13 script chunks) — on a throttled mobile connection it
    // finished after ~2s and held up first paint until then. Inlined, it
    // arrives with the HTML and there's nothing to wait for.
    inlineCss: true,
  },
  images: {
    // Modern formats first; falls back automatically.
    formats: ["image/avif", "image/webp"],
    // Next only serves quality=75 unless it's explicitly allow-listed here —
    // an unlisted `quality` prop is silently dropped back to 75 rather than
    // erroring, which is what happened when HeroBackground/FooterBackground
    // first asked for 90. 90 is what the hero, footer sky and every work
    // screenshot use; 75 stays for the few things still on the default
    // (avatars, small logos).
    qualities: [75, 90],
  },
};

export default nextConfig;
