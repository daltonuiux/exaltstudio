import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";

const offerings = [
  {
    index: "01",
    title: "Product Redesign",
    body: "For products that work, but have become complex, inconsistent or difficult to use.",
  },
  {
    index: "02",
    title: "New Product & MVP Design",
    body: "For teams turning a complex idea into a product customers can actually use.",
  },
  {
    index: "03",
    title: "Design Systems",
    body: "For growing products that need consistency without slowing engineering down.",
  },
  {
    index: "04",
    title: "Embedded Product Design",
    body: "Senior product design support without making a full-time hire.",
  },
];

/**
 * What was ProcessSection ("How we work" — the muted 3-stage engagement
 * outline) is now this: a plain-white list of the four services themselves.
 * id is "services" (not "process") to match — ServicesSection is the one
 * that actually describes the studio's process (Clarify/Redesign/Systemise/
 * Ship) and now owns id="process" accordingly.
 */
export function OfferingsSection() {
  return (
    <Section id="services" spacing="lg" aria-labelledby="offerings-heading">
      <Container width="full">
        <Reveal>
          <SectionHeader
            label="Services"
            titleId="offerings-heading"
            title="Ways to work together"
          />
        </Reveal>

        <ol className="mt-14 lg:mt-20">
          {offerings.map((offering) => (
            <Reveal
              as="li"
              key={offering.title}
              // The title column is sized to the longest title ("New Product
              // & MVP Design", ~358px unwrapped) plus headroom, so all four
              // stay on one line rather than two of four wrapping while the
              // others don't.
              //
              // items-start, not items-baseline: the body column wraps to two
              // lines while the index and title are always one, and aligning
              // by baseline pins everything to that first line — which pulls
              // the (smaller-font) body up and leaves the index looking too
              // high above the title. Top-aligning keeps index, title and
              // body flush along one edge regardless of how the body wraps.
              //
              // Reveal renders as the `li` itself (not a wrapping div around
              // its contents) — the grid-cols template below applies to the
              // li's direct children, so a wrapper div in between would
              // collapse them into a single column.
              className="grid grid-cols-[2.25rem_1fr] gap-x-4 gap-y-3 border-t border-foreground/12 py-8 last:pb-0 sm:grid-cols-[4rem_1fr] sm:gap-x-6 lg:grid-cols-[4rem_24rem_1fr] lg:items-start lg:gap-x-10 lg:py-10"
            >
              <span className="font-mono text-eyebrow font-medium text-foreground/50 tabular-nums">
                {offering.index}
              </span>
              <h3 className="text-xl font-semibold text-balance tracking-[-0.03em] sm:text-2xl">
                {offering.title}
              </h3>
              <p className="col-span-2 text-base leading-6 text-foreground/66 lg:col-span-1 lg:max-w-[46ch]">
                {offering.body}
              </p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
