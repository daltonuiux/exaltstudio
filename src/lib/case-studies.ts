import type { Logo } from "@/lib/logos";
import { testimonials, type Testimonial } from "@/lib/testimonials";

/**
 * Single source for both the case-study cards on the home page (WorkSection)
 * and the full case-study pages at /case-studies/<slug>.
 *
 * TEMPLATE STATUS: everything under `page` is draft copy. It is grounded only
 * in what the site already states about each client (headline, tags, product
 * type, and — where one exists — a real testimonial). Anything that needs a
 * project-specific fact is written as a [bracketed placeholder]. While
 * `page.draft` is true the page shows a small "draft" note; flip it to false
 * once the brackets are replaced.
 */

/** A 16:10 screenshot, committed at 2880x1800. Structurally a CycleImage. */
export type CaseStudyImage = {
  readonly src: string;
  readonly width: number;
  readonly height: number;
};

export type CaseStudyChange = {
  readonly heading: string;
  /** What changed and why it mattered — the design decision, not a feature list. */
  readonly body: string;
  /** Index into the case study's `images`. Don't repeat an image the hero or another change uses. */
  readonly imageIndex: number;
  readonly imageAlt: string;
};

export type CaseStudyMetric = {
  readonly value: string;
  readonly label: string;
};

/**
 * Only substantiated results belong here — every field is optional, and the
 * section drops out entirely when none are set, so a case study with no public
 * metrics still reads as complete. Never put a number here that the client
 * hasn't approved, and don't imply visual changes alone caused growth.
 */
export type CaseStudyResult = {
  readonly metrics?: readonly CaseStudyMetric[];
  readonly quote?: Testimonial;
  /** Concrete shipped outcomes. */
  readonly shipped?: readonly string[];
};

export type CaseStudyPage = {
  /** Shows the "draft" note on the page. */
  readonly draft: boolean;
  /** One sentence under the headline. */
  readonly summary: string;
  readonly overview: {
    readonly product: string;
    readonly role: string;
    readonly scope: string;
    readonly engagement: string;
  };
  /** One short paragraph: the business or user problem. */
  readonly challenge: string;
  /** Two or three. */
  readonly changes: readonly CaseStudyChange[];
  readonly result: CaseStudyResult;
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

const quoteBy = (name: string): Testimonial | undefined =>
  testimonials.find((t) => t.name === name);

/** Same three headings for every draft, until real ones replace them. */
const draftBody =
  "[Describe the design decision — what changed on this screen.] It mattered because [state the user or business reason].";

const draftChanges = (client: string): readonly CaseStudyChange[] => [
  { heading: "Simplified the core workflow", body: draftBody, imageIndex: 1, imageAlt: `${client} product screen` },
  { heading: "Made the data easier to read", body: draftBody, imageIndex: 2, imageAlt: `${client} product screen` },
  { heading: "Built a system to scale", body: draftBody, imageIndex: 3, imageAlt: `${client} product screen` },
];

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
      draft: true,
      summary:
        "We redesigned Perlon AI's outreach platform so sales teams can set up, run and read campaigns without a learning curve.",
      overview: {
        product: "AI sales outreach platform",
        role: "UI Design, UX Strategy",
        scope: "[Confirm: workflows and screens covered]",
        engagement: "[Confirm: e.g. 6 weeks]",
      },
      challenge:
        "Perlon AI's platform could do a lot, but new users had to learn all of it at once. [Confirm the specific problem — e.g. onboarding drop-off, hard-to-read analytics, features going unused.]",
      changes: draftChanges("Perlon AI"),
      result: { quote: quoteBy("Brent Rohner") },
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
      draft: true,
      summary:
        "We designed Meshed's business insurance platform from the ground up, turning a complex proposition into a product customers and investors could both follow.",
      overview: {
        product: "Business insurance platform",
        role: "UI Design, UX Strategy",
        scope: "[Confirm: workflows and screens covered]",
        engagement: "[Confirm: e.g. 8 weeks]",
      },
      challenge:
        "Meshed had a strong insurance proposition and a product that had to explain it, quickly, to customers and to investors. [Confirm the specific problem — e.g. what the first version couldn't show or explain.]",
      changes: draftChanges("Meshed"),
      result: { quote: quoteBy("Jake Wells") },
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
      draft: true,
      summary:
        "We gave Onefin a product system for enterprise finance, so the interface stays consistent as the product and the team behind it grow.",
      overview: {
        product: "Enterprise finance platform",
        role: "UI Design, UX Strategy, Design System",
        scope: "[Confirm: workflows and components covered]",
        engagement: "[Confirm: e.g. 10 weeks]",
      },
      challenge:
        "Enterprise finance software is dense by nature, and Onefin's needed to stay usable as it grew. [Confirm the specific problem — e.g. inconsistent patterns, slow feature delivery, hard-to-scan data.]",
      changes: draftChanges("Onefin"),
      // No client quote yet — shipped outcomes keep the section honest.
      result: {
        shipped: ["A design system for the product. [Confirm: components and patterns delivered]"],
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
      draft: true,
      summary:
        "We refined Scout's interface and UX so an increasingly capable automation platform stays easy to use as it scales.",
      overview: {
        product: "AI automation platform",
        role: "UI Design, UX Strategy (embedded with the product team)",
        scope: "[Confirm: workflows and screens covered]",
        engagement: "[Confirm: engagement length — ended]",
      },
      challenge:
        "Scout's platform was gaining capability fast, and every new feature risked making it harder to use. [Confirm the specific problem — e.g. navigation, workflow setup, feature discoverability.]",
      changes: draftChanges("Scout"),
      result: { quote: quoteBy("Bryan Chappell") },
    },
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

/** The next case study in order, wrapping round to the first. */
export function getNextCaseStudy(slug: string): CaseStudy {
  const i = caseStudies.findIndex((c) => c.slug === slug);
  return caseStudies[(i + 1) % caseStudies.length];
}
