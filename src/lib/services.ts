/**
 * The services listed in the "What we help you with" section. Static rows —
 * pricing and engagement detail live in `pricing.ts`, not here.
 */
export type Service = {
  readonly index: string;
  readonly title: string;
  readonly summary: string;
};

export const services: readonly Service[] = [
  {
    index: "01",
    title: "Product Redesign",
    summary: "Make complex, inconsistent software clearer and easier to use.",
  },
  {
    index: "02",
    title: "New Product & Feature Design",
    summary:
      "Turn product ideas into clear user journeys and polished interfaces.",
  },
  {
    index: "03",
    title: "Design Systems",
    summary:
      "Create reusable components and patterns that help your team build consistently.",
  },
  {
    index: "04",
    title: "Design Engineering",
    summary:
      "Bring approved designs into code with responsive UI and considered interactions.",
  },
] as const;
