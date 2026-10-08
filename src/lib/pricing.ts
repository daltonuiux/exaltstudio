/**
 * The two engagements shown in the Pricing section. Both cards render from
 * the same shape, so they stay structurally identical (and their prices and
 * CTAs line up) by construction.
 */
export type Package = {
  readonly id: string;
  readonly name: string;
  readonly headline: string;
  readonly description: string;
  readonly price: string;
  /** Small lead-in before the price, e.g. "From". */
  readonly pricePrefix?: string;
  /** Sits beside the price, e.g. "Fixed fee" / "/month". */
  readonly priceQualifier: string;
  /** Timing or scope — the one line under the price. */
  readonly term: string;
  readonly included: readonly string[];
  /** Scope / commitment note under the list. */
  readonly note: string;
  readonly cta: string;
};

export const packages: readonly Package[] = [
  {
    id: "sprint",
    name: "Product Design Sprint",
    headline: "One important workflow, redesigned.",
    description:
      "For teams with a product journey that’s become confusing, inconsistent or difficult to use. We resolve the friction and deliver a polished design your engineers can build.",
    price: "$6,000",
    priceQualifier: "Fixed fee",
    term: "3–4 weeks",
    included: [
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
    headline: "Senior product design, built into your team.",
    description:
      "For teams shipping regularly who need an experienced designer alongside founders and engineers. We improve existing workflows, design new features and keep the product consistent.",
    pricePrefix: "From",
    price: "$4,500",
    priceQualifier: "/month",
    term: "Support tailored to your team’s priorities.",
    included: [
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
