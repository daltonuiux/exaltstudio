import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { ServicesAccordion } from "@/components/sections/services-accordion";
import { services } from "@/lib/services";

/**
 * What was ProcessSection ("How we work" — the muted 3-stage engagement
 * outline) is now this: a plain-white list of the five services themselves,
 * each row expandable into pricing/scope detail. id is "services" (not
 * "process") to match — ServicesSection is the one that actually describes
 * the studio's process (Clarify/Redesign/Systemise/Ship) and owns id="process"
 * accordingly.
 *
 * The interactive list is its own "use client" component (ServicesAccordion)
 * rather than making this whole section client — the header above it is
 * static, so there's no reason to ship it any client JS.
 */
export function OfferingsSection() {
  // overflow-x-clip on the section: the open row's fill is w-screen, and 100vw
  // includes the scroll bar's width, so with always-visible scroll bars it pushed
  // the whole page a few pixels wider than the window. Clipped at the section's
  // own full-width edge it can't (clip, unlike hidden, adds no scroll container).
  return (
    <Section
      id="services"
      spacing="lg"
      aria-labelledby="offerings-heading"
      className="overflow-x-clip"
    >
      <Container width="full">
        <Reveal>
          <SectionHeader
            label="Services"
            titleId="offerings-heading"
            title="Ways to work together"
          />
        </Reveal>

        <ServicesAccordion services={services} />
      </Container>
    </Section>
  );
}
