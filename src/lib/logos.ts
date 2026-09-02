/**
 * Social-proof logos, exported from Figma as single SVGs.
 *
 * Dimensions are the display sizes from the design — each logo is optically
 * sized rather than normalised to a common height, so keep them as-is.
 * The SVGs carry Figma's #2A252E fill; the 50% wash is applied in CSS.
 */
export type Logo = {
  readonly name: string;
  readonly src: string;
  readonly width: number;
  readonly height: number;
};

/** "We've helped build brands and products for global B2B companies" */
export const clientLogos: readonly Logo[] = [
  { name: "Meshed", src: "/images/logos/meshed.svg", width: 105.34, height: 17.69 },
  { name: "Optimal Intellect", src: "/images/logos/optimal-intellect.svg", width: 176.16, height: 24.3 },
  { name: "AeroTrack", src: "/images/logos/aerotrack.svg", width: 126, height: 16 },
  { name: "Power My Analytics", src: "/images/logos/power-my-analytics.svg", width: 170.7, height: 24.78 },
  { name: "Perlon AI", src: "/images/logos/perlon-ai.svg", width: 114.05, height: 25.06 },
  { name: "Scout", src: "/images/logos/scout.svg", width: 98.4, height: 20.65 },
  { name: "LegalOS", src: "/images/logos/legalos.svg", width: 120, height: 22 },
  { name: "Acodei", src: "/images/logos/acodei.svg", width: 94.99, height: 20.65 },
  { name: "FactorySense", src: "/images/logos/factorysense.svg", width: 173.84, height: 20.65 },
  { name: "Onefin", src: "/images/logos/onefin.svg", width: 108, height: 24 },
] as const;

/** "Our clients have raised $15m+ from" */
export const investorLogos: readonly Logo[] = [
  { name: "Anthropic", src: "/images/logos/anthropic.svg", width: 134.07, height: 15.05 },
  { name: "Y Combinator", src: "/images/logos/y-combinator.svg", width: 106.63, height: 21.55 },
  { name: "Aviva", src: "/images/logos/aviva.svg", width: 105.09, height: 26.34 },
  { name: "Menlo Ventures", src: "/images/logos/menlo-ventures.svg", width: 63.98, height: 25.09 },
  { name: "Haatch", src: "/images/logos/haatch.svg", width: 23.21, height: 23.93 },
] as const;
