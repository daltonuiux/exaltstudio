import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { CtaSection } from "@/components/sections/cta-section";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
import { Container } from "@/components/ui/container";
import { FooterBackground } from "@/components/ui/footer-background";
import { LogoImage } from "@/components/ui/logo-image";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { type CaseStudy, caseStudies } from "@/lib/case-studies";
import { siteConfig } from "@/lib/site";

const description =
  "How we've helped B2B software and AI teams make complex products clearer, easier to use and easier to build on.";

export const metadata: Metadata = {
  title: "Case studies",
  description,
  alternates: { canonical: "/case-studies" },
  // openGraph/twitter replace the layout's objects wholesale rather than
  // merging, so the social card has to be restated here.
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: `Case studies — ${siteConfig.name}`,
    description,
    url: "/case-studies",
    locale: siteConfig.locale,
    images: [{ url: "/exalt-social-card.jpg", type: "image/jpeg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Case studies — ${siteConfig.name}`,
    description,
    images: ["/exalt-social-card.jpg"],
  },
};

/**
 * One case study, as a single link.
 *
 * A white card with a hairline stroke (the same border-foreground/12 as the
 * badges inside it), so the card carries the edge and the screenshot needs no
 * outline of its own.
 *
 * Concentric radii: the card is rounded-xl (16px) with 8px of padding and a
 * 1px border, so the screenshot sits 9px in from the outer edge and gets a
 * 7px radius (16 - 9) — the inner corner is exactly as far from the outer one
 * all the way round, rather than the two curves drifting apart.
 *
 * Hover (pointer devices only — Tailwind gates `hover:` behind
 * @media (hover: hover)): the screenshot eases in 3% and the chevron moves
 * 2px. The card's own stroke deliberately doesn't change. All under 300ms with an
 * ease-out curve so the first frame moves. The image is clipped by its
 * wrapper, so the scale never spills past the rounded corners.
 */
function CaseStudyCard({ study, priority = false }: { study: CaseStudy; priority?: boolean }) {
  return (
    <Link
      href={`/case-studies/${study.slug}`}
      className="group flex h-full flex-col rounded-xl border border-foreground/12 bg-background p-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
    >
      <div className="overflow-hidden rounded-[7px]">
        <Image
          src={study.images[0].src}
          alt=""
          width={study.images[0].width}
          height={study.images[0].height}
          sizes="(min-width: 640px) 45vw, 100vw"
          quality={90}
          // The first row is above the fold and its screenshot is the page's
          // largest paint, so it loads eagerly and is preloaded: as lazy, the
          // browser doesn't even request it until layout, ~0.9s later on a
          // throttled connection. Same source, width and quality either way.
          priority={priority}
          className="h-auto w-full transition-transform duration-300 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between gap-6 p-4 pt-6 sm:p-6 sm:pt-8">
        <div className="flex flex-col gap-4">
          <LogoImage logo={study.logo} />
          <h2 className="text-2xl font-semibold text-balance tracking-[-0.03em]">
            {study.headline}
          </h2>
        </div>

        <div className="flex items-end justify-between gap-4">
          <ul className="flex flex-wrap gap-2">
            {study.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-foreground/12 bg-background px-3 py-1 text-sm text-foreground/66"
              >
                {tag}
              </li>
            ))}
          </ul>
          <svg
            aria-hidden
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="mb-1 shrink-0 text-foreground/50 transition-[color,translate] duration-200 ease-out group-hover:translate-x-0.5 group-hover:text-foreground motion-reduce:transition-none"
          >
            <path
              d="M8 5.5 12.5 10 8 14.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}

export default function CaseStudiesPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />

      <main id="main" className="flex flex-1 flex-col">
        <Section
          spacing="none"
          aria-labelledby="case-studies-heading"
          className="pt-28 pb-12 md:pt-36 md:pb-16"
        >
          <Container width="full">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <SectionLabel>Our work</SectionLabel>
                <h1
                  id="case-studies-heading"
                  className="text-hero font-semibold text-balance text-foreground"
                >
                  Case studies
                </h1>
              </div>
              <p className="max-w-[52ch] text-lg leading-7 text-foreground/66">
                {description}
              </p>
            </div>
          </Container>
        </Section>

        {/* Two across, like the home page's Selected Work grid: the
            screenshots are wide, and two across keeps them large enough to
            read. Driven by the same list as the pages themselves, so a new
            case study in lib/case-studies.ts shows up here on its own. */}
        <Section spacing="none" aria-label="All case studies" className="pb-16 md:pb-24">
          <Container width="full">
            <ul className="grid gap-6 sm:grid-cols-2">
              {caseStudies.map((study, i) => (
                <Reveal
                  as="li"
                  key={study.slug}
                  // Same small column stagger as the Selected Work grid.
                  delayMs={(i % 2) * 100}
                >
                  <CaseStudyCard study={study} priority={i < 2} />
                </Reveal>
              ))}
            </ul>
          </Container>
        </Section>
      </main>

      <div className="relative isolate">
        <FooterBackground />
        <div className="relative z-10">
          <CtaSection />
          <SiteFooter />
        </div>
      </div>
    </div>
  );
}
