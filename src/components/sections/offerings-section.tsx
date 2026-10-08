import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { services } from "@/lib/services";

/**
 * The services list: static numbered rows — index, title, one-line summary —
 * separated by hairline rules. Pricing and engagement detail live in
 * PricingSection directly below, so nothing here expands or links anywhere.
 *
 * Same column template the rows have always used (4rem index / 24rem title /
 * description), so the layout reads exactly as before, minus the control
 * column the old accordion's +/- sat in. Below lg it's a plain stack: index,
 * then title, then description.
 */
export function OfferingsSection() {
  return (
    <Section id="services" spacing="lg" aria-labelledby="offerings-heading">
      <Container width="full">
        <Reveal>
          <SectionHeader
            label="Services"
            titleId="offerings-heading"
            title="What we help you with"
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
              <h3 className="mt-2 text-xl font-semibold text-balance tracking-[-0.03em] sm:text-2xl lg:mt-0">
                {service.title}
              </h3>
              <p className="max-w-[46ch] text-base leading-6 text-foreground/66">
                {service.summary}
              </p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
