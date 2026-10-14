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
  /** One-line promise under the name. */
  readonly positioning: string;
  readonly description: string;
  readonly bestFor: string;
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
    positioning: "A clear scope. One agreed price. Exceptional execution.",
    description:
      "For teams with a defined challenge or project. From new features and product redesigns to MVPs and design systems, we’ll agree on the scope, timeline and deliverables upfront.",
    bestFor:
      "Teams with a defined project who want predictable costs, without an ongoing retainer.",
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
    positioning: "Your senior design partner, without the overhead of hiring.",
    description:
      "We work alongside your founders and engineers to continuously improve your product, design new features and ship exceptional experiences.",
    bestFor:
      "Funded startups and growing software teams with ongoing design needs.",
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
