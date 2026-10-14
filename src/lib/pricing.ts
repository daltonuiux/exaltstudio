/**
 * The two engagements shown in the Pricing section. Both cards render from
 * the same shape, so they stay structurally identical (and their prices and
 * CTAs line up) by construction.
 */
export type Package = {
  readonly id: string;
  /** Small label naming the kind of engagement, e.g. "Fixed scope". */
  readonly kind: string;
  readonly name: string;
  readonly description: string;
  /** Small line above the price, e.g. "From". */
  readonly priceLabel: string;
  readonly price: string;
  /** Sits beside the price, e.g. "/project" / "/month". */
  readonly priceQualifier: string;
  readonly included: readonly string[];
  /** Scope / commitment note under the list. */
  readonly note: string;
  readonly cta: string;
};

export const packages: readonly Package[] = [
  {
    id: "project",
    kind: "Fixed scope",
    name: "Fixed-Price Project",
    description:
      "From new features to full product redesigns. Clear scope, predictable costs and exceptional execution.",
    priceLabel: "From",
    price: "$6,000",
    priceQualifier: "/project",
    included: [
      "Founder-led delivery with senior design support",
      "Product discovery and UX direction",
      "High-fidelity product design and prototyping",
      "Design systems and reusable components",
      "Developer-ready handoff or agreed implementation in code",
      "Clear milestones and deliverables",
    ],
    note: "Defined scope, timeline and fixed fee before kickoff.",
    cta: "Discuss your project",
  },
  {
    id: "embedded",
    kind: "Ongoing partnership",
    name: "Embedded Design Partner",
    description:
      "Senior design expertise, embedded in your team. Better workflows, new features and continuous product improvements.",
    priceLabel: "From",
    price: "$7,000",
    priceQualifier: "/month",
    included: [
      "Founder-led collaboration, supported by a senior product designer",
      "Ongoing product strategy, UX and UI",
      "New features and workflow improvements",
      "Design system development",
      "Design engineering, with agreed interfaces built in code",
      "Weekly planning and Slack collaboration",
    ],
    note: "Agreed priorities. Flexible monthly renewal.",
    cta: "Discuss your team’s needs",
  },
] as const;
