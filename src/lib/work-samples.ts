/**
 * Product screenshots shown in the Selected Work grid and cycled in the hero.
 * Order matches the Figma frame, read left-to-right down the two columns.
 *
 * Labels describe the screens rather than the clients — worth reviewing as
 * real copy.
 */
export type WorkSample = {
  readonly src: string;
  readonly alt: string;
  /** Intrinsic size of the committed file, for aspect reservation. */
  readonly width: number;
  readonly height: number;
};

export const workSamples: readonly WorkSample[] = [
  { src: "/images/work/standard-view.webp", alt: "Standard view", width: 1400, height: 875 },
  { src: "/images/work/reporting.webp", alt: "Reporting view", width: 1400, height: 875 },
  { src: "/images/work/records-table.webp", alt: "Records table", width: 1400, height: 875 },
  { src: "/images/work/dashboard-first-state.webp", alt: "Dashboard, first-run state", width: 1400, height: 875 },
  { src: "/images/work/canvas.webp", alt: "Canvas", width: 1400, height: 875 },
  { src: "/images/work/pop-up-option.webp", alt: "Comparison view", width: 1400, height: 909 },
  { src: "/images/work/tools-nose.webp", alt: "Tools panel", width: 1400, height: 875 },
  { src: "/images/work/formulas-screen.webp", alt: "Formulas screen", width: 1400, height: 875 },
  { src: "/images/work/dashboard-view.webp", alt: "Dashboard view", width: 1400, height: 875 },
  { src: "/images/work/view.webp", alt: "Table view", width: 1400, height: 875 },
  { src: "/images/work/dark-mode.webp", alt: "Dark mode interface", width: 1400, height: 875 },
  { src: "/images/work/comparables.webp", alt: "Comparables, card view", width: 1400, height: 875 },
  { src: "/images/work/default.webp", alt: "Default view", width: 1400, height: 875 },
  { src: "/images/work/dashboard.webp", alt: "Dashboard", width: 1400, height: 875 },
  { src: "/images/work/manage-pools.webp", alt: "Manage pools", width: 1400, height: 875 },
  { src: "/images/work/link-icon.webp", alt: "Product interface", width: 1400, height: 875 },
] as const;
