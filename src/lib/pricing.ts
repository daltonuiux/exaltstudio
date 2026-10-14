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
  /** Small line above the price, e.g. "4-week sprint" / "From". */
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
    kind: "Fixed scope",
    name: "Product Design Sprint",
    positioning: "One important product challenge, solved.",
    description:
      "A focused, four-week engagement to transform a frustrating product workflow into a beautifully designed, intuitive experience that’s ready to build.",
    bestFor:
      "Teams with a specific workflow, feature or UX problem that needs attention.",
    priceLabel: "4-week sprint",
    price: "$6,000",
    priceQualifier: "Fixed fee",
    included: [
      "Founder-led delivery, supported by a senior product designer",
      "Workflow review and UX direction",
      "High-fidelity UI and key interaction states",
      "Interactive prototype",
      "Reusable components",
      "Developer handoff and walkthrough",
    ],
    note: "One agreed workflow. Clear deliverables before kickoff.",
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
