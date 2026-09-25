import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CtaSection } from "@/components/sections/cta-section";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
import { Container } from "@/components/ui/container";
import { FooterBackground } from "@/components/ui/footer-background";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import {
  type CaseStudyImage,
  caseStudies,
  getCaseStudy,
  getRelatedCaseStudies,
} from "@/lib/case-studies";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type PageProps = { params: Promise<{ slug: string }> };

// Only the slugs in lib/case-studies exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};

  const title = `${study.client} case study`;
  const url = `/case-studies/${study.slug}`;
  // openGraph/twitter replace the layout's objects wholesale rather than
  // merging, so the social card has to be restated here.
  return {
    title,
    description: study.page.summary,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title: `${title} — ${siteConfig.name}`,
      description: study.page.summary,
      url,
      locale: siteConfig.locale,
      images: [{ url: "/exalt-social-card.jpg", type: "image/jpeg" }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${siteConfig.name}`,
      description: study.page.summary,
      images: ["/exalt-social-card.jpg"],
    },
  };
}

/**
 * A screenshot with a 1px pure-black-at-10% outline inset over its edge —
 * not a border (which would push the image in) and not the tinted foreground
 * colour (which picks up the surface underneath and reads as dirt on the edge).
 */
function Visual({
  image,
  alt,
  priority = false,
  sizes,
  className,
}: {
  image: CaseStudyImage;
  alt: string;
  priority?: boolean;
  sizes: string;
  className?: string;
}) {
  return (
    <Image
      src={image.src}
      alt={alt}
      width={image.width}
      height={image.height}
      priority={priority}
      sizes={sizes}
      className={cn(
        "h-auto w-full rounded-md outline -outline-offset-1 outline-black/10 sm:rounded-lg",
        className,
      )}
    />
  );
}

const bodyClass = "text-base leading-6 text-foreground/66";

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const { page } = study;
  const related = getRelatedCaseStudies(study.slug);
  const meta = [
    ["Client", page.meta.client],
    ["Industry", page.meta.industry],
    ["Services", page.meta.services],
  ] as const;

  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />

      <main id="main" className="flex flex-1 flex-col">
        {/* Title block: client, headline, one-sentence summary, tags. */}
        <Section
          spacing="none"
          aria-labelledby="case-study-heading"
          className="pt-28 pb-12 md:pt-36 md:pb-16"
        >
          <Container width="full">
            <div className="flex flex-col items-start gap-6">
              {/* -my-2 py-2 grows the tappable box past the 12px label without moving it. */}
              <Link
                href="/#work"
                className="-my-2 py-2 font-mono text-eyebrow font-medium text-foreground/50 uppercase transition-colors duration-200 hover:text-foreground"
              >
                &larr; All case studies
              </Link>

              <div className="flex flex-col gap-2">
                <SectionLabel>{study.client}</SectionLabel>
                <h1
                  id="case-study-heading"
                  className="max-w-4xl text-hero font-semibold text-balance text-foreground"
                >
                  {page.headline}
                </h1>
              </div>

              <p className="max-w-[52ch] text-lg leading-7 text-foreground/66">
                {page.summary}
              </p>

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

              {page.draft ? (
                <p className="rounded-full border border-dashed border-foreground/25 px-3 py-1 font-mono text-eyebrow font-medium text-foreground/66 uppercase">
                  Draft — replace [bracketed] copy
                </p>
              ) : null}
            </div>
          </Container>
        </Section>

        {/* The scroll: visuals stack down the left and scroll past, while the
            copy stays pinned on the right. Copy comes first in the DOM (so it
            reads first on mobile and to screen readers) and is placed on the
            right at lg with explicit grid rows/columns.

            The pin only applies when the viewport is tall enough to show the
            whole copy block: a sticky element taller than the viewport would
            have its bottom stuck out of reach until the end of the stack. On
            shorter screens it just scrolls with the page. top-24 clears the
            fixed header (64px) when it slides back in on scroll-up. */}
        <Section spacing="none" aria-label={`${study.client} case study`} className="pb-16 md:pb-24">
          <Container width="full">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-6">
              <div className="flex flex-col gap-10 lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:self-start [@media(min-height:760px)]:lg:sticky [@media(min-height:760px)]:lg:top-24">
                <dl className="border-b border-foreground/12">
                  {meta.map(([label, value]) => (
                    <div
                      key={label}
                      className="grid grid-cols-[6.5rem_1fr] gap-4 border-t border-foreground/12 py-3"
                    >
                      <dt className="text-base text-foreground/50">{label}</dt>
                      <dd className="text-base text-foreground">{value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="flex flex-col gap-3">
                  <SectionLabel as="h2">The brief</SectionLabel>
                  <p className={bodyClass}>{page.brief}</p>
                </div>

                <div className="flex flex-col gap-3">
                  <SectionLabel as="h2">The work</SectionLabel>
                  <div className="flex flex-col gap-5">
                    {page.work.map((item) => (
                      <div key={item.heading}>
                        <h3 className="text-lg font-semibold tracking-[-0.02em] text-foreground">
                          {item.heading}
                        </h3>
                        <p className={cn(bodyClass, "mt-1")}>{item.body}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <SectionLabel as="h2">The result</SectionLabel>
                  <p className={bodyClass}>{page.result}</p>
                </div>
              </div>

              <div className="flex flex-col gap-6 lg:col-span-8 lg:col-start-1 lg:row-start-1">
                {study.images.map((image, i) => {
                  const visual = (
                    <Visual
                      image={image}
                      alt={`${study.client} product screen ${i + 1}`}
                      priority={i === 0}
                      sizes="(min-width: 1024px) 66vw, 100vw"
                    />
                  );
                  // The first visual is in view on load, so it shows straight
                  // away; the rest fade up as they scroll in.
                  return i === 0 ? <div key={image.src}>{visual}</div> : <Reveal key={image.src}>{visual}</Reveal>;
                })}
              </div>
            </div>
          </Container>
        </Section>

        {/* Testimonial — drops out when there is no quote. */}
        {page.quote ? (
          <Section spacing="none" aria-label="Testimonial" className="pb-16 md:pb-24">
            <Container width="full">
              <Reveal className="grid gap-6 lg:grid-cols-12 lg:gap-6">
                <SectionLabel className="lg:col-span-4">Testimonial</SectionLabel>
                <figure className="flex flex-col gap-10 rounded-lg bg-foreground/4 p-8 sm:p-10 lg:col-span-8">
                  <blockquote className="max-w-[40ch] text-2xl font-medium text-balance">
                    <p>&ldquo;{page.quote.quote}&rdquo;</p>
                  </blockquote>
                  <figcaption className="flex items-center gap-3">
                    {page.quote.avatarSrc ? (
                      <Image
                        src={page.quote.avatarSrc}
                        alt=""
                        width={48}
                        height={48}
                        className="h-12 w-12 rounded-full object-cover outline -outline-offset-1 outline-black/10"
                      />
                    ) : null}
                    <div>
                      <p className="text-sm font-semibold text-foreground">{page.quote.name}</p>
                      <p className="text-sm text-foreground/66">{page.quote.role}</p>
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            </Container>
          </Section>
        ) : null}

        {/* Related projects — the other case studies. */}
        <Section spacing="none" aria-labelledby="related-heading" className="pb-16 md:pb-24">
          <Container width="full">
            <Reveal className="flex flex-col gap-6">
              <SectionLabel as="h2" id="related-heading">
                Related projects
              </SectionLabel>
              <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/case-studies/${c.slug}`}
                      className="group flex flex-col gap-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
                    >
                      <Visual
                        image={c.images[0]}
                        alt=""
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      />
                      <div>
                        <p className="text-base font-semibold text-foreground">{c.client}</p>
                        <p className="mt-1 text-sm leading-5 text-foreground/66 transition-colors duration-200 group-hover:text-foreground">
                          {c.headline}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </Container>
        </Section>
      </main>

      {/* The same sky, CTA card and footer the home page ends with. */}
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
