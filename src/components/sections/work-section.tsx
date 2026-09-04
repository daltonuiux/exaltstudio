import { Container } from "@/components/ui/container";
import { type CycleImage, ImageCycle } from "@/components/ui/image-cycle";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { LogoImage } from "@/components/ui/logo-image";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import type { Logo } from "@/lib/logos";

type CaseStudy = {
  client: string;
  headline: string;
  tags: string[];
  /**
   * Client wordmark shown in place of a text eyebrow — the `-dark` SVGs
   * (see below), not the white-fill ones SocialProof's marquee uses.
   */
  logo: Logo;
  /**
   * Product screenshots to autoplay through. Omit until a case study
   * actually has artwork — falls back to ImagePlaceholder.
   */
  images?: readonly CycleImage[];
};

/**
 * Recoloured (fill="#161218", the standard heading colour) copies of the
 * same marques' white-fill logos SocialProof uses — those are exported for
 * the dark hero backdrop, so they'd disappear against this section's light
 * card background. `-dark` suffix keeps the two variants unambiguous.
 *
 * Heights sit in a 24-32px band and widths follow each logo's own (already
 * tightly-cropped) viewBox aspect ratio, so — like the marquee's own
 * logos — they read as optically similar in weight rather than literally
 * identical in height.
 */
const onefinLogo: Logo = {
  name: "Onefin",
  src: "/images/logos/onefin-dark.svg",
  width: 126,
  height: 28,
};
const meshedLogo: Logo = {
  name: "Meshed",
  src: "/images/logos/meshed-dark.svg",
  width: 166.75,
  height: 28,
};
const perlonAiLogo: Logo = {
  name: "Perlon AI",
  src: "/images/logos/perlon-ai-dark.svg",
  width: 123.85,
  height: 28,
};
const scoutLogo: Logo = {
  name: "Scout",
  src: "/images/logos/scout-dark.svg",
  width: 133.45,
  height: 28,
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

const perlonAiImages: readonly CycleImage[] = [
  { src: "/images/work/perlon-ai/01.webp", width: 2880, height: 1800 },
  { src: "/images/work/perlon-ai/02.webp", width: 2880, height: 1800 },
  { src: "/images/work/perlon-ai/03.webp", width: 2880, height: 1800 },
  { src: "/images/work/perlon-ai/04.webp", width: 2880, height: 1800 },
  { src: "/images/work/perlon-ai/05.webp", width: 2880, height: 1800 },
];

/** Order per Luke: Perlon AI, Meshed, Onefin, Scout. */
const caseStudies: CaseStudy[] = [
  {
    client: "Perlon AI",
    headline: "Enhancing Perlon AI’s user experience for sales success",
    tags: ["UI Design", "UX Strategy", "Raised $1.1mil"],
    logo: perlonAiLogo,
    images: perlonAiImages,
  },
  {
    client: "Meshed",
    headline:
      "Reimagining business insurance with a data-driven, AI-powered platform design",
    tags: ["UI Design", "UX Strategy", "Raised $1.2mil"],
    logo: meshedLogo,
    images: meshedImages,
  },
  {
    client: "Onefin",
    headline:
      "Elevating enterprise finance with a scalable, modern product experience",
    tags: ["UI Design", "UX Strategy", "Design System"],
    logo: onefinLogo,
    images: onefinImages,
  },
  {
    client: "Scout",
    headline: "Refining Scout’s interface and UX for scalable AI automation",
    tags: ["UI Design", "UX Strategy", "Raised $10.6mil"],
    logo: scoutLogo,
    images: scoutImages,
  },
];

function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <article className="grid gap-10 rounded-3xl bg-foreground/4 p-8 sm:p-10 lg:grid-cols-12 lg:items-center lg:gap-14 lg:p-14">
      <div className="lg:col-span-4">
        <LogoImage logo={study.logo} />

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
        {/* A clean, unframed image — no mock browser chrome around it. */}
        {study.images && study.images.length > 0 ? (
          <ImageCycle
            images={study.images}
            alt={`${study.client} product screenshot`}
            className="rounded-2xl border border-foreground/12"
          />
        ) : (
          <ImagePlaceholder
            ratio="16 / 10"
            caption="Product screenshot to come"
            className="rounded-2xl"
          />
        )}
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
