import type { Logo } from "@/lib/logos";

/**
 * Single source for both the case-study cards on the home page (WorkSection)
 * and the full case-study pages at /case-studies/<slug>.
 *
 * Perlon AI's `page` is final copy. The others are placeholders: grounded only
 * in what the site already states about each client, with anything that needs
 * a project-specific fact written as a [bracketed placeholder]. While
 * `page.draft` is true the page shows a small "draft" note.
 */

/** A 16:10 screenshot, committed at 2880x1800. Structurally a CycleImage. */
export type CaseStudyImage = {
  readonly src: string;
  readonly width: number;
  readonly height: number;
};

export type CaseStudyWork = {
  readonly heading: string;
  readonly body: string;
};

export type CaseStudyPage = {
  /**
   * True while any [bracketed] placeholder copy remains; shows a small
   * "draft" note on the page. Flip to false once the copy is final.
   */
  readonly draft: boolean;
  /** The page's h1 (the home-page card keeps its own, separate headline). */
  readonly headline: string;
  /** One sentence under the headline. */
  readonly summary: string;
  readonly meta: {
    readonly client: string;
    readonly industry: string;
    readonly services: string;
  };
  readonly brief: string;
  /** Short sections, each a heading and a sentence or two. */
  readonly work: readonly CaseStudyWork[];
  readonly result: string;
};

export type CaseStudy = {
  readonly slug: string;
  readonly client: string;
  /** Card headline, and the page's h1. */
  readonly headline: string;
  readonly tags: readonly string[];
  /**
   * Client wordmark — the `-dark` SVGs, not the white-fill ones SocialProof's
   * marquee uses (those are exported for the dark hero and would disappear
   * against a light card). Heights sit in a 24-32px band, widths follow each
   * logo's own tightly-cropped viewBox aspect ratio.
   */
  readonly logo: Logo;
  /** Five screenshots, 2880x1800 (16:10), resized down from the 4800x3000 originals and converted to WebP. */
  readonly images: readonly CaseStudyImage[];
  readonly page: CaseStudyPage;
};

const screenshots = (folder: string): readonly CaseStudyImage[] =>
  ["01", "02", "03", "04", "05"].map((n) => ({
    src: `/images/work/${folder}/${n}.webp`,
    width: 2880,
    height: 1800,
  }));


const placeholder = (client: string): Omit<CaseStudyPage, "meta"> => ({
  draft: true,
  headline: "[Page headline — short and outcome-led]",
  summary: `[One sentence on what we did for ${client}.]`,
  brief: "[The brief — what the product needed and why.]",
  work: [
    { heading: "[First area of work]", body: "[What we changed, in a sentence or two.]" },
    { heading: "[Second area of work]", body: "[What we changed, in a sentence or two.]" },
  ],
  result: "[The result — only what can be substantiated.]",
});

/** Order per Luke: Perlon AI, Meshed, Onefin, Scout. Also the "next case study" order. */
export const caseStudies: readonly CaseStudy[] = [
  {
    slug: "perlon-ai",
    client: "Perlon AI",
    headline: "Making a complex AI sales platform easier to understand, adopt and grow",
    tags: ["UI Design", "UX Strategy", "Raised $1.1mil"],
    logo: { name: "Perlon AI", src: "/images/logos/perlon-ai-dark.svg", width: 123.85, height: 28 },
    images: screenshots("perlon-ai"),
    page: {
      draft: false,
      headline: "A clearer experience for AI-powered sales",
      summary:
        "We redesigned Perlon’s product experience to make its capabilities easier to understand and its core workflows easier to use.",
      meta: {
        client: "Perlon AI",
        industry: "AI sales",
        services: "Product strategy, UX and UI design",
      },
      brief:
        "Perlon’s product was growing. The experience needed a clearer structure and a more considered interface to support the people using it every day.",
      work: [
        {
          heading: "Clarity across the product",
          body: "We simplified how information and actions are presented, helping users find their way through the platform.",
        },
        {
          heading: "Designed for everyday use",
          body: "We refined key workflows and established a more consistent visual language across the experience.",
        },
      ],
      result:
        "A more cohesive product experience, built to support Perlon’s next stage of growth.",
    },
  },
  {
    slug: "meshed",
    client: "Meshed",
    headline: "Turning a complex insurance proposition into an investor-ready product",
    tags: ["UI Design", "UX Strategy", "Raised $1.2mil"],
    logo: { name: "Meshed", src: "/images/logos/meshed-dark.svg", width: 166.75, height: 28 },
    images: screenshots("meshed"),
    page: {
      ...placeholder("Meshed"),
      meta: {
        client: "Meshed",
        industry: "Insurance",
        services: "UX strategy, UI design",
      },
    },
  },
  {
    slug: "onefin",
    client: "Onefin",
    headline: "Creating a product system that makes enterprise finance easier to use and build",
    tags: ["UI Design", "UX Strategy", "Design System"],
    logo: { name: "Onefin", src: "/images/logos/onefin-dark.svg", width: 126, height: 28 },
    images: screenshots("onefin"),
    page: {
      ...placeholder("Onefin"),
      meta: {
        client: "Onefin",
        industry: "Enterprise finance",
        services: "UX strategy, UI design, design system",
      },
    },
  },
  {
    slug: "scout",
    client: "Scout",
    headline: "Helping an AI automation platform scale without overwhelming its users",
    tags: ["UI Design", "UX Strategy", "Raised $10.6mil"],
    logo: { name: "Scout", src: "/images/logos/scout-dark.svg", width: 133.45, height: 28 },
    images: screenshots("scout"),
    page: {
      ...placeholder("Scout"),
      meta: {
        client: "Scout",
        industry: "AI automation",
        services: "UX strategy, UI design",
      },
    },
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

/** Every other case study, in order, starting from the one after this one. */
export function getRelatedCaseStudies(slug: string): readonly CaseStudy[] {
  const i = caseStudies.findIndex((c) => c.slug === slug);
  return [...caseStudies.slice(i + 1), ...caseStudies.slice(0, i)];
}
