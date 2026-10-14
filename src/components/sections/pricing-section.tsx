import { BookCallButton } from "@/components/ui/book-call-button";
import { Container } from "@/components/ui/container";
import { HeroLines } from "@/components/ui/hero-lines";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionLabel } from "@/components/ui/section-label";
import { packages, type Package } from "@/lib/pricing";
import { siteConfig } from "@/lib/site";

/**
 * The two engagements, directly below the services list — set on the same
 * dark ground and animated lines as the hero and footer, with both offers on
 * frosted cards like the final CTA's, so pricing reads as a deliberate scene
 * change mid-page.
 *
 * The section is its own `isolate` stacking context: HeroLines is
 * screen-blended, which only blends with the fill inside it. The cards are
 * darker and more heavily blurred than the CTA card (foreground/60, blur-2xl)
 * so the lines glow through without cutting into the copy's contrast.
 *
 * At lg the cards sit side by side and each one is a subgrid spanning the
 * same six rows (intro / best for / price / included / note / CTA), so the
 * prices, lists and CTAs line up across both cards however differently their
 * copy wraps.
 *
 * Below the cards, the free UX audit: a lower-commitment way in for teams not
 * ready to buy. It's a single horizontal panel rather than a third card, on a
 * lighter, borderless surface, so it can't read as another pricing tier.
 */
export function PricingSection() {
  return (
    <Section
      id="pricing"
      spacing="lg"
      aria-labelledby="pricing-heading"
      className="isolate overflow-hidden"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 bg-foreground" />
      <HeroLines />

      <Container width="full" className="relative z-10">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
            <SectionHeader
              // SectionHeader's eyebrow is hard-wired to the light-ground
              // tint; lift it for the dark ground.
              className="lg:col-span-6 [&>p:first-child]:text-background/50"
              label="Pricing"
              titleId="pricing-heading"
              title="Two ways to work together"
              titleClassName="text-background"
            />
            <p className="max-w-[52ch] self-end text-base leading-6 text-background/70 lg:col-span-5 lg:col-start-8">
              Solve one important problem with a fixed-scope sprint, or bring us
              in as an ongoing design partner. Either way, you work directly
              with Luke, supported by a senior product designer.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-4 lg:mt-20 lg:grid-cols-2">
          {packages.map((pkg, i) => (
            <PricingCard key={pkg.id} pkg={pkg} delayMs={i * 80} />
          ))}
        </div>

        <AuditPanel />

        <Reveal
          as="p"
          className="mt-8 max-w-[72ch] text-sm leading-5 text-background/70"
        >
          Larger frontend builds can be scoped separately after reviewing your
          requirements and codebase.
        </Reveal>
      </Container>
    </Section>
  );
}

function PricingCard({ pkg, delayMs }: { pkg: Package; delayMs: number }) {
  const headingId = `pricing-${pkg.id}-heading`;

  return (
    <Reveal
      as="article"
      aria-labelledby={headingId}
      delayMs={delayMs}
      className="grid gap-8 rounded-lg border border-background/14 bg-foreground/60 p-6 backdrop-blur-2xl sm:p-10 lg:row-span-6 lg:grid-rows-subgrid"
    >
      <div className="flex flex-col">
        <SectionLabel className="text-background/50">{pkg.kind}</SectionLabel>
        <h3
          id={headingId}
          className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-background"
        >
          {pkg.name}
        </h3>
        <p className="mt-2 text-lg leading-7 font-medium text-pretty text-background">
          {pkg.positioning}
        </p>
        <p className="mt-4 max-w-[52ch] text-base leading-6 text-pretty text-background/70">
          {pkg.description}
        </p>
      </div>

      <div>
        <SectionLabel as="h4" className="text-background/50">
          Best for
        </SectionLabel>
        <p className="mt-2 max-w-[52ch] text-base leading-6 text-pretty text-background">
          {pkg.bestFor}
        </p>
      </div>

      <div className="flex flex-col gap-1 border-t border-background/14 pt-8">
        <p className="text-sm leading-5 text-background/70">{pkg.priceLabel}</p>
        <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="text-5xl font-semibold tracking-[-0.03em] text-background tabular-nums">
            {pkg.price}
          </span>
          <span className="text-sm text-background/70">{pkg.priceQualifier}</span>
        </p>
      </div>

      <div>
        <SectionLabel as="h4" className="text-background/50">
          Included
        </SectionLabel>
        <ul className="mt-4 flex flex-col gap-2">
          {pkg.included.map((item) => (
            <li
              key={item}
              className="flex gap-3 text-base leading-6 text-background/70"
            >
              <svg
                aria-hidden
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="mt-1 size-4 shrink-0 text-background/50"
              >
                <path
                  d="M3.5 8.5 6.5 11.5 12.5 4.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <p className="text-sm leading-5 text-background/70">{pkg.note}</p>

      <BookCallButton
        variant="inverse"
        className="w-full justify-center self-end sm:w-fit"
      >
        {pkg.cta}
      </BookCallButton>
    </Reveal>
  );
}

/**
 * The free UX audit. Eyebrow, heading and description on the left; the CTA
 * and its reassurance line on the right (stacked, CTA full-width, below sm).
 * Books the dedicated audit event type rather than the intro call, so the
 * booking page itself tells people what they're signing up for.
 */
function AuditPanel() {
  return (
    <Reveal
      as="aside"
      aria-labelledby="audit-heading"
      className="mt-4 flex flex-col gap-8 rounded-lg bg-background/6 p-6 backdrop-blur-2xl sm:p-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16"
    >
      <div className="flex max-w-[60ch] flex-col">
        <SectionLabel className="text-background/50">
          Not ready to commit?
        </SectionLabel>
        <h3
          id="audit-heading"
          className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-balance text-background"
        >
          Let’s find what’s holding your product back.
        </h3>
        <p className="mt-3 text-base leading-6 text-pretty text-background/70">
          Get a free expert review of one key product workflow. We’ll identify
          usability issues, opportunities for improvement and practical next
          steps to make your product better.
        </p>
      </div>

      <div className="flex shrink-0 flex-col items-stretch gap-3 sm:items-start lg:items-end">
        <BookCallButton
          variant="inverse"
          href={siteConfig.auditBookingUrl}
          className="w-full justify-center sm:w-fit"
        >
          Get a free UX audit
        </BookCallButton>
        <p className="text-sm leading-5 text-background/70">
          No commitment. Just useful, actionable feedback.
        </p>
      </div>
    </Reveal>
  );
}
