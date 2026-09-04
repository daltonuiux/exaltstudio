import type { Metadata, Viewport } from "next";
import { Asta_Sans, DM_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import { SmoothScroll } from "@/components/ui/smooth-scroll";

import { siteConfig } from "@/lib/site";

import "./globals.css";

/**
 * Typefaces per Figma: Asta Sans for UI and headings, DM Mono for the
 * uppercase eyebrow labels. Asta Sans is loaded as a variable font (300-800)
 * so Regular and SemiBold share a single file.
 */
const sans = Asta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans-family",
});

const mono = DM_Mono({
  subsets: ["latin"],
  weight: "500",
  display: "swap",
  variable: "--font-mono-family",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    // Just "Exalt Studio" in the browser tab — siteConfig.title keeps the
    // fuller descriptive version for OpenGraph/Twitter previews below.
    default: "Exalt Studio",
    template: siteConfig.titleTemplate,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  icons: {
    // Light/dark browser-chrome variants, per Luke's exported assets — the
    // mark itself, not a redraw. `media` picks the right one per OS/browser
    // colour scheme, where supported (Safari/Chrome; Firefox falls back to
    // the first entry regardless of scheme).
    icon: [
      {
        url: "/favicon/light.png",
        media: "(prefers-color-scheme: light)",
        type: "image/png",
      },
      {
        url: "/favicon/dark.png",
        media: "(prefers-color-scheme: dark)",
        type: "image/png",
      },
    ],
    // /favicon.ico at the public root also covers legacy crawlers that
    // request that path directly regardless of these tags — no separate
    // entry needed here for that.
    apple: [{ url: "/apple-touch-icon.png", type: "image/png" }],
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
    <html lang="en-GB" className={`${sans.variable} ${mono.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-accent-foreground"
        >
          Skip to content
        </a>
        {children}
        <SmoothScroll />
        {/* Cookieless page-view analytics. Inert outside production. */}
        <Analytics />
      </body>
    </html>
  );
}
