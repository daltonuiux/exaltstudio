/**
 * The five services offered, and what powers each row of the "Ways to work
 * together" accordion. A typed array here rather than inlining five near-
 * identical blocks of JSX keeps the component itself generic.
 */
export type Service = {
  readonly index: string;
  readonly title: string;
  /** Shown in the collapsed row, unchanged from the summary text. */
  readonly summary: string;
  readonly bestFor: string;
  readonly whatYouGet: readonly string[];
  /** Duration, scope, then price — rendered in that order, price given
   * slightly stronger emphasis than its two siblings. */
  readonly engagement: readonly [duration: string, scope: string, price: string];
  /** Optional line under Engagement — only Design Systems and Design
   * Engineering have one. */
  readonly note?: string;
};

export const services: readonly Service[] = [
  {
    index: "01",
    title: "Product Redesign",
    summary:
      "For products that work, but have become complex, inconsistent or difficult to use.",
    bestFor:
      "Established products that work, but have become fragmented, inconsistent or harder to use as they’ve grown.",
    whatYouGet: [
      "Product and UX audit",
      "Information architecture and core workflow redesign",
      "High-fidelity responsive UX/UI",
      "Interactive prototypes",
      "Developer-ready Figma and handoff",
    ],
    engagement: ["6–8 weeks", "3–6 priority workflows", "From $7,500"],
  },
  {
    index: "02",
    title: "New Product & MVP Design",
    summary:
      "For teams turning a complex idea into a product customers can actually use.",
    bestFor:
      "Funded teams turning a clear product idea into something customers can understand, use and trust.",
    whatYouGet: [
      "Product structure and user journeys",
      "Core workflow definition",
      "Wireframes and UX exploration",
      "High-fidelity responsive UI",
      "Developer-ready designs and handoff",
    ],
    engagement: ["4–8 weeks", "Defined MVP scope", "From $7,500"],
  },
  {
    index: "03",
    title: "Design Systems",
    summary:
      "For growing products that need consistency without slowing engineering down.",
    bestFor:
      "Growing products where inconsistent components and repeated design decisions are slowing design and engineering down.",
    whatYouGet: [
      "Typography, colour and design tokens",
      "Reusable component library",
      "States, variants and interaction patterns",
      "Responsive behaviours",
      "Developer-aligned documentation",
    ],
    engagement: ["2–4 weeks", "Scoped to product complexity", "From $4,000"],
    note: "Can be aligned to your existing frontend framework and component architecture.",
  },
  {
    index: "04",
    title: "Embedded Product Design",
    summary: "Senior product design support without making a full-time hire.",
    bestFor:
      "Teams that need senior product design capacity without adding another full-time hire.",
    whatYouGet: [
      "Ongoing UX/UI design",
      "New features and workflow improvements",
      "Design system development",
      "Product and design reviews",
      "Direct collaboration with founders and engineering",
    ],
    engagement: ["Monthly", "20 hours / month", "From $3,000 / month"],
  },
  {
    index: "05",
    title: "Design Engineering",
    summary: "Take approved product designs from Figma to a production-ready frontend.",
    bestFor:
      "Teams that want approved product designs taken through to a polished production frontend without another design-to-development handoff.",
    whatYouGet: [
      "Figma-to-code frontend implementation",
      "Responsive production UI",
      "Interaction and motion refinement",
      "Browser and responsive QA",
      "Vercel deployment",
      "Clean repository and developer handoff",
    ],
    engagement: ["Scoped per build", "Frontend implementation", "From $5,000"],
    note: "Backend systems, APIs and infrastructure are scoped separately where required.",
  },
] as const;
