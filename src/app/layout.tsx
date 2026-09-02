import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import { siteConfig } from "@/lib/site";

import "./globals.css";

/**
 * PLACEHOLDER typeface. The final family, weights, sizing, tracking and
 * line-heights come from Figma. To swap: change the import and the loader
 * below — the CSS variable name stays the same, so nothing else changes.
 */
const sans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans-placeholder",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: siteConfig.titleTemplate,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    url: "/",
    locale: siteConfig.locale,
    // Add `src/app/opengraph-image.(png|tsx)` once the visual design exists;
    // Next.js will pick it up automatically and populate og:image here.
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className={sans.variable}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-accent-foreground"
        >
          Skip to content
        </a>
        {children}
        {/* Cookieless page-view analytics. Inert outside production. */}
        <Analytics />
      </body>
    </html>
  );
}
