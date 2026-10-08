/**
 * The two engagements shown in the Pricing section. Both cards render from
 * the same shape, so they stay structurally identical (and their prices and
 * CTAs line up) by construction.
 */
export type Package = {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  /** Small line above the price, e.g. "4 week sprint" / "From". */
  readonly priceLabel: string;
  readonly price: string;
  /** Sits beside the price, e.g. "Fixed fee" / "/month". */
  readonly priceQualifier: string;
  readonly included: readonly string[];
  /** Scope / commitment note under the list. */
  readonly note: string;
  readonly cta: string;
};

export const packages: readonly Package[] = [
  {
    id: "sprint",
    name: "Product Design Sprint",
    description:
      "For teams with a product journey that’s become confusing, inconsistent or difficult to use. We resolve the friction and deliver a polished design your engineers can build.",
    priceLabel: "4 week sprint",
    price: "$6,000",
    priceQualifier: "Fixed fee",
    included: [
      "Founder + one senior product designer",
      "Workflow review and UX direction",
      "High-fidelity UI and key interaction states",
      "Interactive prototype",
      "Reusable components",
      "Developer handoff and walkthrough",
    ],
    note: "One agreed workflow. Clear scope before kickoff.",
    cta: "Discuss your product",
  },
  {
    id: "embedded",
    name: "Embedded Design Partner",
    description:
      "For teams shipping regularly who need an experienced designer alongside founders and engineers. We improve existing workflows, design new features and keep the product consistent.",
    priceLabel: "From",
    price: "$4,500",
    priceQualifier: "/month",
    included: [
      "Founder + one senior product designer",
      "Ongoing product strategy, UX and UI",
      "New features and workflow improvements",
      "Design system development",
      "Weekly planning and design reviews",
      "Direct Slack collaboration and handoff support",
    ],
    note: "Agreed priorities. Renew month to month.",
    cta: "Discuss your team’s needs",
  },
] as const;
