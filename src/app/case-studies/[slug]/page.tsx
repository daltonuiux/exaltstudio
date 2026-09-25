import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { FooterBackground } from "@/components/ui/footer-background";
import { LogoImage } from "@/components/ui/logo-image";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import {
  type CaseStudy,
  type CaseStudyImage,
  caseStudies,
  getCaseStudy,
  getNextCaseStudy,
} from "@/lib/case-studies";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type PageProps = { params: Promise<{ slug: string }> };

// Only the slugs in lib/case-studies exist; anything else is a 404 rather
// than an on-demand render of nothing.
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
 * A screenshot, drawn the way the rest of the page's product visuals are:
 * rounded to the site's photo radius, with a 1px pure-black-at-10% outline
 * inset over the edge (not a border, which would push the image in, and not
 * the tinted foreground colour, which picks up the surface underneath and
 * reads as dirt on the edge).
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

/** Label on the left, content on the right — the shape every section below the hero shares. */
function Split({
  label,
  labelId,
  children,
}: {
  label: string;
  labelId: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
      <SectionLabel as="h2" id={labelId} className="lg:col-span-4">
        {label}
      </SectionLabel>
      <div className="lg:col-span-8">{children}</div>
    </div>
  );
}

/** Compact label/value rows on hairline dividers — same treatment as the services accordion. */
function Rows({ items }: { items: readonly (readonly [label: string, value: string])[] }) {
  return (
    <dl className="border-b border-foreground/12">
      {items.map(([label, value]) => (
        <div
          key={label}
          className="grid gap-1 border-t border-foreground/12 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6"
        >
          <dt className="text-base text-foreground/50">{label}</dt>
          <dd className="text-base text-foreground">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

function Tags({ tags }: { tags: readonly string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-full border border-foreground/12 bg-background px-3 py-1 text-sm text-foreground/66"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

function Result({ study }: { study: CaseStudy }) {
  const { metrics, quote, shipped } = study.page.result;
  const hasResult = Boolean(metrics?.length || quote || shipped?.length);
  // A case study with no public numbers, quote or shipped outcomes simply has
  // no result section — the page still reads as complete without it.
  if (!hasResult) return null;

  return (
    <Section spacing="md" aria-labelledby="result-heading">
      <Container width="full">
        <Reveal>
          <Split label="The result" labelId="result-heading">
            <div className="flex flex-col gap-12">
              {metrics?.length ? (
                <Rows items={metrics.map((m) => [m.label, m.value] as const)} />
              ) : null}

              {shipped?.length ? (
                <ul className="border-b border-foreground/12">
                  {shipped.map((item) => (
                    <li
                      key={item}
                      className="border-t border-foreground/12 py-4 text-base text-foreground"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}

              {quote ? (
                <figure className="flex flex-col gap-8">
                  <blockquote className="text-2xl font-medium text-balance">
                    <p>&ldquo;{quote.quote}&rdquo;</p>
                  </blockquote>
                  <figcaption className="flex items-center gap-3">
                    {quote.avatarSrc ? (
                      <Image
                        src={quote.avatarSrc}
                        alt=""
                        width={48}
                        height={48}
                        className="h-12 w-12 rounded-full object-cover outline -outline-offset-1 outline-black/10"
                      />
                    ) : null}
                    <div>
                      <p className="text-sm font-semibold text-foreground">{quote.name}</p>
                      <p className="text-sm text-foreground/66">{quote.role}</p>
                    </div>
                  </figcaption>
                </figure>
              ) : null}
            </div>
          </Split>
        </Reveal>
      </Container>
    </Section>
  );
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const next = getNextCaseStudy(study.slug);
  const { page } = study;
  const overview = [
    ["Product", page.overview.product],
    ["Our role", page.overview.role],
    ["Scope", page.overview.scope],
    ["Engagement length", page.overview.engagement],
  ] as const;

  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />

      <main id="main" className="flex flex-1 flex-col">
        {/* 1. Hero — client, outcome-led headline, one-sentence summary, product visual. */}
        <Section
          spacing="none"
          aria-labelledby="case-study-heading"
          className="pt-28 pb-16 md:pt-36 md:pb-24"
        >
          <Container width="full">
            <div className="flex flex-col gap-10">
              <div className="flex flex-col items-start gap-6">
                {/* Hit area: the -my-2 py-2 pair grows the tappable box past
                    the 12px label without moving it. */}
                <Link
                  href="/#work"
                  className="-my-2 py-2 font-mono text-eyebrow font-medium text-foreground/50 uppercase transition-colors duration-200 hover:text-foreground"
                >
                  &larr; All case studies
                </Link>

                <LogoImage logo={study.logo} />

                <h1
                  id="case-study-heading"
                  className="max-w-4xl text-hero font-semibold text-balance text-foreground"
                >
                  {study.headline}
                </h1>

                <p className="max-w-[52ch] text-lg leading-7 text-foreground/66">
                  {page.summary}
                </p>

                <Tags tags={study.tags} />

                {page.draft ? (
                  <p className="rounded-full border border-dashed border-foreground/25 px-3 py-1 font-mono text-eyebrow font-medium text-foreground/66 uppercase">
                    Draft template — replace [bracketed] copy with project facts
                  </p>
                ) : null}
              </div>

              <Visual
                image={study.images[0]}
                alt={`${study.client} product interface`}
                priority
                sizes="100vw"
              />
            </div>
          </Container>
        </Section>

        {/* 2. Project overview */}
        <Section spacing="md" aria-labelledby="overview-heading">
          <Container width="full">
            <Reveal>
              <Split label="Project overview" labelId="overview-heading">
                <Rows items={overview} />
              </Split>
            </Reveal>
          </Container>
        </Section>

        {/* 3. The challenge — one short paragraph. */}
        <Section spacing="md" aria-labelledby="challenge-heading">
          <Container width="full">
            <Reveal>
              <Split label="The challenge" labelId="challenge-heading">
                <p className="text-2xl font-medium text-balance">{page.challenge}</p>
              </Split>
            </Reveal>
          </Container>
        </Section>

        {/* 4. What we changed — visual + heading + the decision and why it mattered.
            Layouts alternate (stacked, then side-by-side) but read in the same
            order every time: visual, then the words. */}
        <Section spacing="md" aria-labelledby="changes-heading">
          <Container width="full">
            <SectionLabel as="h2" id="changes-heading">
              What we changed
            </SectionLabel>

            <div className="mt-10 flex flex-col gap-20 lg:gap-32">
              {page.changes.map((change, i) => {
                const image = study.images[change.imageIndex];
                const index = String(i + 1).padStart(2, "0");
                const stacked = i % 2 === 0;

                const copy = (
                  <>
                    <SectionLabel>{index}</SectionLabel>
                    <h3 className="mt-3 text-2xl font-semibold text-balance tracking-[-0.03em] sm:text-3xl">
                      {change.heading}
                    </h3>
                  </>
                );

                return (
                  <Reveal key={change.heading}>
                    {stacked ? (
                      <div className="flex flex-col gap-8">
                        <Visual image={image} alt={change.imageAlt} sizes="100vw" />
                        <div className="grid gap-4 lg:grid-cols-12 lg:gap-10">
                          <div className="lg:col-span-4">{copy}</div>
                          <p className="max-w-[52ch] text-base leading-6 text-foreground/66 lg:col-span-6 lg:col-start-5">
                            {change.body}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-10">
                        <div className="lg:col-span-8">
                          <Visual
                            image={image}
                            alt={change.imageAlt}
                            sizes="(min-width: 1024px) 66vw, 100vw"
                          />
                        </div>
                        <div className="flex flex-col gap-4 lg:col-span-4">
                          <div>{copy}</div>
                          <p className="text-base leading-6 text-foreground/66">
                            {change.body}
                          </p>
                        </div>
                      </div>
                    )}
                  </Reveal>
                );
              })}
            </div>
          </Container>
        </Section>

        {/* 5. The result — only what can be substantiated; drops out if there is nothing. */}
        <Result study={study} />

        {/* 6. CTA + next case study */}
        <Section
          spacing="md"
          aria-labelledby="cta-heading"
          className="border-t border-foreground/12"
        >
          <Container width="full">
            <Reveal className="grid gap-12 lg:grid-cols-12 lg:gap-10">
              <div className="flex flex-col items-start gap-6 lg:col-span-6">
                <div className="flex flex-col gap-2">
                  <SectionLabel>Let&rsquo;s talk</SectionLabel>
                  <h2
                    id="cta-heading"
                    className="text-display font-semibold text-balance text-foreground"
                  >
                    Facing a similar product challenge?
                  </h2>
                </div>
                <p className="max-w-[44ch] text-base leading-6 text-foreground/66">
                  Tell us where the product is today, what&rsquo;s creating friction and the
                  milestone you&rsquo;re working towards.
                </p>
                <Button
                  href={siteConfig.bookingUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Book intro call
                </Button>
              </div>

              <Link
                href={`/case-studies/${next.slug}`}
                className="group flex flex-col gap-5 rounded-lg bg-foreground/4 p-6 transition-colors duration-200 hover:bg-foreground/8 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground sm:p-8 lg:col-span-5 lg:col-start-8"
              >
                <SectionLabel>Next case study</SectionLabel>
                <LogoImage logo={next.logo} />
                <p className="text-xl font-semibold text-balance tracking-[-0.03em]">
                  {next.headline}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold">
                  View case study
                  <span
                    aria-hidden
                    className="transition-transform duration-200 ease-out group-hover:translate-x-1 motion-reduce:transition-none"
                  >
                    &rarr;
                  </span>
                </span>
              </Link>
            </Reveal>
          </Container>
        </Section>
      </main>

      {/* The same sky the home page's CTA + footer share, minus the CTA card —
          the invitation to talk sits above, in the page's own voice. */}
      <div className="relative isolate">
        <FooterBackground />
        <div className="relative z-10 pt-20 md:pt-32">
          <SiteFooter />
        </div>
      </div>
    </div>
  );
}
