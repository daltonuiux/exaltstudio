/**
 * Single source of truth for site-wide constants.
 * Placeholder copy — replace once final messaging is agreed.
 */

/** Used when nothing else resolves. Must stay a valid absolute URL. */
const FALLBACK_ORIGIN = "https://exaltstudio.co";

/**
 * Coerce a loosely-typed env value into an origin, or null if unusable.
 *
 * Tolerates the ways an env var is realistically wrong in a dashboard:
 * unset, empty, whitespace, a stray trailing slash, or a bare hostname
 * with no protocol. Anything still unparseable returns null so the caller
 * can fall back rather than throwing during the build.
 */
function normaliseOrigin(value: string | undefined): string | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;

  const withProtocol = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;

  try {
    return new URL(withProtocol).origin;
  } catch {
    return null;
  }
}

/**
 * Resolution order:
 *   1. NEXT_PUBLIC_SITE_URL   — explicit override, wins everywhere
 *   2. Vercel production URL  — the project's production domain
 *   3. Vercel deployment URL  — unique per preview deployment
 *   4. FALLBACK_ORIGIN
 *
 * Only step 1 is inlined into client bundles; the VERCEL_* vars are
 * server-only, so keep this module out of Client Components.
 */
function resolveSiteOrigin(): string {
  const fromVercel =
    process.env.VERCEL_ENV === "production"
      ? process.env.VERCEL_PROJECT_PRODUCTION_URL
      : process.env.VERCEL_URL;

  return (
    normaliseOrigin(process.env.NEXT_PUBLIC_SITE_URL) ??
    normaliseOrigin(fromVercel) ??
    FALLBACK_ORIGIN
  );
}

export const siteConfig = {
  name: "Exalt Studio",
  /** Used in the title template, e.g. "Work — Exalt Studio". */
  titleTemplate: "%s — Exalt Studio",
  title: "Exalt Studio — B2B SaaS & AI Product Design Studio",
  description:
    "Exalt Studio is a product design and development studio working with B2B SaaS, AI startups and complex enterprise software.",
  /** Canonical origin, no trailing slash. */
  url: resolveSiteOrigin(),
  locale: "en_GB",
  email: "luke@exaltstudio.co",
  /** Cal.com scheduling link behind every "Book intro call" CTA. */
  bookingUrl:
    "https://cal.com/luke-dalton-wp2kwb/intro-exalt-studio?overlayCalendar=true",
} as const;
