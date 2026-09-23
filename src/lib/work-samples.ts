/**
 * Product screenshots shown in the Selected Work grid and cycled in the hero.
 * Order matches the Figma frame, read left-to-right down the two columns.
 *
 * `alt` describes the screen. `client`/`descriptor`/`tags` feed the desktop
 * hover popover in WorkSamplesSection — `client` is the product name visible
 * in the screenshot itself (omitted where the artwork shows none), and
 * `descriptor` says what that product is. Tags for the four case-study
 * clients (Perlon AI, Meshed, Onefin, Scout) are lifted from WorkSection's
 * own tags; everything else just says "UI Design". Worth reviewing as real
 * copy — this is the place to add funding, results or engagement length.
 */
export type WorkSample = {
  readonly src: string;
  readonly alt: string;
  /** Intrinsic size of the committed file, for aspect reservation. */
  readonly width: number;
  readonly height: number;
  readonly client?: string;
  /** What the product is, in a few words. */
  readonly descriptor: string;
  readonly tags: readonly string[];
};

const ui = ["UI Design"] as const;

export const workSamples: readonly WorkSample[] = [
  { src: "/images/work/standard-view.webp", alt: "Standard view", width: 1400, height: 875, client: "Perlon AI", descriptor: "AI sales outreach platform", tags: ["UI Design", "UX Strategy", "Raised $1.1mil"] },
  { src: "/images/work/reporting.webp", alt: "Reporting view", width: 1400, height: 875, client: "Onefin", descriptor: "Enterprise finance platform", tags: ["UI Design", "UX Strategy", "Design System"] },
  { src: "/images/work/records-table.webp", alt: "Records table", width: 1400, height: 875, client: "Signl", descriptor: "Lead intelligence dashboard", tags: ui },
  { src: "/images/work/dashboard-first-state.webp", alt: "Dashboard, first-run state", width: 1400, height: 875, client: "Meshed", descriptor: "Business insurance platform", tags: ["UI Design", "UX Strategy", "Raised $1.2mil"] },
  { src: "/images/work/canvas.webp", alt: "Canvas", width: 1400, height: 875, client: "Qreates", descriptor: "AI product imagery studio", tags: ui },
  { src: "/images/work/pop-up-option.webp", alt: "Comparison view", width: 1400, height: 909, descriptor: "Trading strategy builder", tags: ui },
  { src: "/images/work/tools-nose.webp", alt: "Tools panel", width: 1400, height: 875, descriptor: "Aesthetic simulation tool", tags: ui },
  { src: "/images/work/formulas-screen.webp", alt: "Formulas screen", width: 1400, height: 875, client: "Inscentify", descriptor: "Fragrance formulation platform", tags: ui },
  { src: "/images/work/dashboard-view.webp", alt: "Dashboard view", width: 1400, height: 875, descriptor: "Sales performance dashboard", tags: ui },
  { src: "/images/work/view.webp", alt: "Table view", width: 1400, height: 875, client: "AeroTrack", descriptor: "Aviation work order management", tags: ui },
  { src: "/images/work/dark-mode.webp", alt: "Dark mode interface", width: 1400, height: 875, descriptor: "Compliance management platform", tags: ui },
  { src: "/images/work/comparables.webp", alt: "Comparables, card view", width: 1400, height: 875, descriptor: "AI property research platform", tags: ui },
  { src: "/images/work/default.webp", alt: "Default view", width: 1400, height: 875, client: "Scout", descriptor: "AI automation platform", tags: ["UI Design", "UX Strategy", "Raised $10.6mil"] },
  { src: "/images/work/dashboard.webp", alt: "Dashboard", width: 1400, height: 875, client: "ReferHive", descriptor: "Affiliate program platform", tags: ui },
  { src: "/images/work/manage-pools.webp", alt: "Manage pools", width: 1400, height: 875, client: "Equalizer", descriptor: "DeFi liquidity exchange", tags: ui },
  { src: "/images/work/link-icon.webp", alt: "Product interface", width: 1400, height: 875, client: "Acodei", descriptor: "Payments data sync platform", tags: ui },
] as const;
