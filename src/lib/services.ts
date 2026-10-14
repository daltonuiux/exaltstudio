/**
 * The "What we help you achieve" rows. Each leads with the outcome (the
 * heading) and names the capability behind it (the small label) — what we
 * help teams achieve, not how they buy it; engagement detail lives in
 * `pricing.ts`.
 */
export type Service = {
  readonly index: string;
  /** The capability, shown as a small label above the outcome. */
  readonly capability: string;
  /** The outcome, shown as the row's heading. */
  readonly title: string;
  readonly summary: string;
};

export const services: readonly Service[] = [
  {
    index: "01",
    capability: "Product Design & UX",
    title: "Make complex products simple to use",
    summary:
      "We untangle complicated workflows and redesign key journeys, so customers understand your product faster and get more from it.",
  },
  {
    index: "02",
    capability: "UI Design & Design Systems",
    title: "Raise the quality of every screen",
    summary:
      "Refined, consistent interfaces backed by a scalable design system, so every new feature looks and feels like it belongs.",
  },
  {
    index: "03",
    capability: "Design Engineering",
    title: "Ship polished, production-ready UI",
    summary:
      "We build agreed interfaces in code alongside your engineers, so what ships matches the design down to the interaction details.",
  },
  {
    index: "04",
    capability: "Embedded Product Design",
    title: "Keep improving with every release",
    summary:
      "Senior design support inside your team, shaping new features and refining the details customers notice.",
  },
] as const;
