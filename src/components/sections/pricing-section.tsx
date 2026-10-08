import { BookCallButton } from "@/components/ui/book-call-button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionLabel } from "@/components/ui/section-label";
import { packages, type Package } from "@/lib/pricing";

/**
 * The two engagements, directly below the services list.
 *
 * At lg the cards sit side by side and each one is a subgrid spanning the
 * same five rows (intro / price / included / note / CTA), so the prices, lists
 * and CTAs line up across both cards however differently their copy wraps.
 * Below lg they stack as plain single-column grids.
 */
export function PricingSection() {
  return (
    <Section id="pricing" spacing="lg" aria-labelledby="pricing-heading">
      <Container width="full">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
            <SectionHeader
              className="lg:col-span-6"
              label="Pricing"
              titleId="pricing-heading"
              title="Two ways to work together"
            />
            <p className="max-w-[52ch] self-end text-base leading-6 text-foreground/66 lg:col-span-5 lg:col-start-8">
              Resolve a critical workflow or get ongoing senior design support.
              Work directly with Luke from the first conversation through to
              delivery.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-4 lg:mt-20 lg:grid-cols-2 lg:gap-x-6">
          {packages.map((pkg, i) => (
            <PricingCard key={pkg.id} pkg={pkg} delayMs={i * 80} />
          ))}
        </div>

        <Reveal className="mt-10 flex flex-col gap-2 text-base leading-6 text-foreground/66">
          <p className="max-w-[72ch]">
            <span className="font-semibold text-foreground">
              Not sure which fits?
            </span>{" "}
            Bring a product walkthrough to a 20-minute call. We’ll recommend an
            engagement and confirm scope, timing and cost.
          </p>
          <p className="max-w-[72ch]">
            Frontend implementation can be scoped separately after reviewing
            your requirements and codebase.
          </p>
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
      className="grid gap-8 rounded-lg border border-foreground/12 p-6 sm:p-10 lg:row-span-5 lg:grid-rows-subgrid lg:gap-y-8"
    >
      <div className="flex flex-col gap-3">
        <h3
          id={headingId}
          className="text-xl font-semibold tracking-[-0.03em] sm:text-2xl"
        >
          {pkg.name}
        </h3>
        <p className="text-base leading-6 font-medium text-foreground">
          {pkg.headline}
        </p>
        <p className="max-w-[52ch] text-base leading-6 text-foreground/66">
          {pkg.description}
        </p>
      </div>

      <div className="flex flex-col gap-2 border-t border-foreground/12 pt-8">
        <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="text-4xl font-semibold tracking-[-0.03em] tabular-nums">
            {pkg.price}
          </span>
          <span className="text-sm text-foreground/66">{pkg.priceQualifier}</span>
        </p>
        <p className="text-base leading-6 text-foreground/66">{pkg.term}</p>
      </div>

      <div>
        <SectionLabel as="h4">Included</SectionLabel>
        <ul className="mt-4 flex flex-col gap-2">
          {pkg.included.map((item) => (
            <li
              key={item}
              className="flex gap-3 text-base leading-6 text-foreground/66"
            >
              <svg
                aria-hidden
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="mt-1 size-4 shrink-0 text-foreground/50"
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

      <p className="text-sm leading-5 text-foreground/66">{pkg.note}</p>

      <BookCallButton className="w-full justify-center self-end sm:w-fit">
        {pkg.cta}
      </BookCallButton>
    </Reveal>
  );
}
