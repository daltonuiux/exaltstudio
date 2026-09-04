import { BrowserMockup } from "@/components/ui/browser-mockup";
import { Container } from "@/components/ui/container";
import type { CycleImage } from "@/components/ui/image-cycle";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionLabel } from "@/components/ui/section-label";

type CaseStudy = {
  client: string;
  headline: string;
  tags: string[];
  /** Shown in the mock browser's address bar. */
  domain: string;
  /**
   * Product screenshots to autoplay through. Omit until a case study
   * actually has artwork — BrowserMockup falls back to the placeholder.
   */
  images?: readonly CycleImage[];
};

/** Each case study's 5 screenshots, committed at 2880x1800 (16:10, matching
 * every other case study's frame) — resized down from the 4800x3000
 * originals Luke supplied, which was far more resolution than any real
 * viewport needs (see the earlier sizing discussion) and converted to WebP. */
const meshedImages: readonly CycleImage[] = [
  { src: "/images/work/meshed/01.webp", width: 2880, height: 1800 },
  { src: "/images/work/meshed/02.webp", width: 2880, height: 1800 },
  { src: "/images/work/meshed/03.webp", width: 2880, height: 1800 },
  { src: "/images/work/meshed/04.webp", width: 2880, height: 1800 },
  { src: "/images/work/meshed/05.webp", width: 2880, height: 1800 },
];

const onefinImages: readonly CycleImage[] = [
  { src: "/images/work/onefin/01.webp", width: 2880, height: 1800 },
  { src: "/images/work/onefin/02.webp", width: 2880, height: 1800 },
  { src: "/images/work/onefin/03.webp", width: 2880, height: 1800 },
  { src: "/images/work/onefin/04.webp", width: 2880, height: 1800 },
  { src: "/images/work/onefin/05.webp", width: 2880, height: 1800 },
];

const scoutImages: readonly CycleImage[] = [
  { src: "/images/work/scout/01.webp", width: 2880, height: 1800 },
  { src: "/images/work/scout/02.webp", width: 2880, height: 1800 },
  { src: "/images/work/scout/03.webp", width: 2880, height: 1800 },
  { src: "/images/work/scout/04.webp", width: 2880, height: 1800 },
  { src: "/images/work/scout/05.webp", width: 2880, height: 1800 },
];

/**
 * Real copy for all four now, from Luke. He mentioned reordering is
 * coming later, so this array order isn't final.
 *
 * `domain` is decorative (the mock browser's address bar) and was never
 * confirmed against each client's actual URL — just the company name,
 * lowercased — worth a look before this reads as a verified live link.
 */
const caseStudies: CaseStudy[] = [
  {
    client: "Onefin",
    headline:
      "Elevating enterprise finance with a scalable, modern product experience",
    tags: ["UI Design", "UX Strategy", "Design System"],
    domain: "onefin.com",
    images: onefinImages,
  },
  {
    client: "Meshed",
    headline:
      "Reimagining business insurance with a data-driven, AI-powered platform design",
    tags: ["UI Design", "UX Strategy", "Raised $1.2mil"],
    domain: "meshed.com",
    images: meshedImages,
  },
  {
    client: "Perlon AI",
    headline: "Enhancing Perlon AI’s user experience for sales success",
    tags: ["UI Design", "UX Strategy", "Raised $1.1mil"],
    domain: "perlonai.com",
  },
  {
    client: "Scout",
    headline: "Refining Scout’s interface and UX for scalable AI automation",
    tags: ["UI Design", "UX Strategy", "Raised $10.6mil"],
    domain: "scout.com",
    images: scoutImages,
  },
];

function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <article className="grid gap-10 rounded-3xl bg-foreground/4 p-8 sm:p-10 lg:grid-cols-12 lg:items-center lg:gap-14 lg:p-14">
      <div className="lg:col-span-4">
        <SectionLabel>{study.client}</SectionLabel>

        <h3 className="mt-5 text-2xl font-semibold text-balance tracking-[-0.03em] sm:text-3xl">
          {study.headline}
        </h3>

        <ul className="mt-6 flex flex-wrap gap-2">
          {study.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-foreground/12 bg-background px-3 py-1 text-sm text-foreground/66"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>

      <div className="lg:col-span-8">
        <BrowserMockup
          url={study.domain}
          images={study.images}
          imagesAlt={`${study.client} product screenshot`}
        />
      </div>
    </article>
  );
}

export function WorkSection() {
  return (
    <Section id="work" spacing="lg" aria-labelledby="work-heading">
      <Container width="full">
        <Reveal>
          <SectionHeader
            label="Selected work"
            titleId="work-heading"
            title="Better products for ambitious teams"
            className="items-center text-center"
          />
        </Reveal>

        <div className="mt-14 flex flex-col gap-6 lg:mt-20 lg:gap-8">
          {caseStudies.map((study) => (
            <Reveal key={study.client}>
              <CaseStudyCard study={study} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
