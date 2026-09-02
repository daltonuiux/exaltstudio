/**
 * Single source of truth for site-wide constants.
 * Placeholder copy — replace once final messaging is agreed.
 */
export const siteConfig = {
  name: "Exalt Studio",
  /** Used in the title template, e.g. "Work — Exalt Studio". */
  titleTemplate: "%s — Exalt Studio",
  title: "Exalt Studio — Product design and development studio",
  description:
    "Exalt Studio is a product design and development studio working with B2B SaaS, AI startups and complex enterprise software.",
  /**
   * Canonical origin. Set NEXT_PUBLIC_SITE_URL in Vercel for preview
   * deployments so canonicals and OG URLs resolve correctly per environment.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://exaltstudio.co",
  locale: "en_GB",
  email: "luke@exaltstudio.co",
} as const;
