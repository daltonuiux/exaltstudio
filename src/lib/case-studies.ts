import type { Logo } from "@/lib/logos";

/**
 * Single source for both the case-study cards on the home page (WorkSection)
 * and the full case-study pages at /case-studies/<slug>.
 *
 * Every `page` here is final copy. Set `page.draft` to true on a new case study
 * while any [bracketed] placeholder remains, to show a small "draft" note.
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
    /** Only when the length of the engagement is part of the story. */
    readonly engagement?: string;
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
      draft: false,
      headline: "Designing an insurance product from the ground up",
      summary:
        "We partnered with Meshed to design its InsurTech MVP, turning a complex product idea into a clear, usable experience.",
      meta: {
        client: "Meshed",
        industry: "InsurTech",
        services: "MVP product design, UX and UI design",
      },
      brief:
        "Insurance products ask users to understand unfamiliar information and make important decisions. Meshed needed an MVP that made those interactions feel straightforward from the start.",
      work: [
        {
          heading: "A clear path through the product",
          body: "We shaped the core experience around the steps users needed to take, giving the MVP a structure that was easy to follow.",
        },
        {
          heading: "A product ready to grow",
          body: "We designed a consistent interface across the key screens, giving Meshed a foundation to build on as the product developed.",
        },
      ],
      result:
        "A complete MVP design that helped Meshed bring its product to market. Meshed went on to raise **$600k**.",
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
      draft: false,
      headline: "Making complex financial workflows feel simple",
      summary:
        "We worked with Onefin to improve the product experience, with a focus on making it easier for users to enter and manage business information.",
      meta: {
        client: "Onefin",
        industry: "Fintech",
        services: "Product design, UX and UI design",
      },
      brief:
        "Entering business information can be a demanding part of a financial workflow. Onefin needed a clearer way for users to provide the details the product required.",
      work: [
        {
          heading: "A better way to enter business data",
          body: "We redesigned the data entry experience to help users move through a complex task with greater clarity and less friction.",
        },
        {
          heading: "Clarity across the interface",
          body: "We refined the surrounding UI so information, actions and next steps were easier to understand.",
        },
      ],
      result:
        "A more considered product experience that makes a complex part of Onefin’s workflow easier to complete.",
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
      draft: false,
      headline: "Two years embedded in an evolving AI product",
      summary:
        "We worked alongside ScoutOS’s team for more than two years, partnering closely with its lead designer to refine the interface and design new features as the product developed.",
      meta: {
        client: "ScoutOS",
        industry: "AI software",
        services: "Embedded product design, UX and UI design",
        engagement: "2+ years",
      },
      brief:
        "ScoutOS needed design support that could move with the product. That meant improving the experience already in place while helping the team shape what came next.",
      work: [
        {
          heading: "Refining the everyday experience",
          body: "We worked through the details of the interface, making existing features clearer, more consistent and easier to use.",
        },
        {
          heading: "Designing what came next",
          body: "Working with ScoutOS’s lead designer, we helped turn new feature ideas into considered product experiences that fit the wider platform.",
        },
      ],
      result:
        "A long-term design partnership that helped ScoutOS keep improving its product while building new capabilities.",
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
