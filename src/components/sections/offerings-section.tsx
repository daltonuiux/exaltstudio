import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { services } from "@/lib/services";

/**
 * The services list: static numbered rows separated by hairline rules. Each
 * row leads with the outcome (the heading), with the capability behind it as
 * a small label above, then a one-line summary. This section says what we
 * help teams achieve; how to engage lives in PricingSection directly below,
 * so nothing here expands or links anywhere.
 *
 * Columns at lg: 4rem index / 24rem label + heading / summary. Below lg it's
 * a plain stack: index, label, heading, summary.
 */
export function OfferingsSection() {
  return (
    <Section id="services" spacing="lg" aria-labelledby="offerings-heading">
      <Container width="full">
        <Reveal>
          <SectionHeader
            label="Services"
            titleId="offerings-heading"
            title="What we help you achieve"
          />
        </Reveal>

        <ol className="mt-14 lg:mt-20">
          {services.map((service) => (
            <Reveal
              as="li"
              key={service.title}
              className="grid gap-y-3 border-t border-foreground/12 py-8 last:border-b lg:grid-cols-[4rem_24rem_1fr] lg:items-center lg:gap-x-10 lg:py-10"
            >
              <span className="font-mono text-eyebrow font-medium text-foreground/50 tabular-nums lg:pl-4">
                {service.index}
              </span>
              <div className="mt-2 flex flex-col gap-2 lg:mt-0">
                <p className="font-mono text-eyebrow font-medium text-foreground/66 uppercase">
                  {service.capability}
                </p>
                <h3 className="text-xl font-semibold text-balance tracking-[-0.03em] sm:text-2xl">
                  {service.title}
                </h3>
              </div>
              <p className="max-w-[52ch] text-base leading-6 text-pretty text-foreground/66">
                {service.summary}
              </p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
