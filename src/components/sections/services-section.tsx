import { Container } from "@/components/ui/container";
import { IndexedItem } from "@/components/ui/indexed-item";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";

const stages = [
  {
    index: "01",
    title: "Clarify",
    body: "Define the product structure, priorities and critical user journeys.",
  },
  {
    index: "02",
    title: "Redesign",
    body: "Resolve high-impact workflows with clear, high-quality UX and UI.",
  },
  {
    index: "03",
    title: "Systemise",
    body: "Create reusable patterns and components that keep the product consistent as it grows.",
  },
  {
    index: "04",
    title: "Ship",
    body: "Give engineering developer-ready designs, behaviours and implementation support.",
  },
];

export function ServicesSection() {
  return (
    <Section id="process" spacing="lg" aria-labelledby="services-heading">
      <Container width="full">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
            <SectionHeader
              className="lg:col-span-6"
              label="Process"
              titleId="services-heading"
              title={
                <>
                  From complex product
                  <br />
                  to scalable system
                </>
              }
            />
            <p className="max-w-[52ch] self-end text-base leading-6 text-foreground/66 lg:col-span-5 lg:col-start-8">
              We work across the product structure, critical workflows and design
              system to make complex software easier to use, easier to trust and
              easier to keep building.
            </p>
          </div>
        </Reveal>

        <ol className="mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-y-0">
          {stages.map((stage, i) => (
            <li
              key={stage.index}
              // Base (1 col): a horizontal rule between each stacked item —
              // border-t on everything but the first — same look OfferingsSection
              // now has below lg, which is the "services section" match Luke
              // asked for.
              // sm (2 cols): that becomes a vertical rule between the two
              // items in a row (even items only, via border-l) and a
              // horizontal rule between the two rows (odd, non-first items
              // keep their base border-t; even items don't need it, since
              // they're beside their row's first item, not below it).
              // lg (4 cols, one row): vertical rules between all four —
              // border-l on everything but the first — and no horizontal
              // rule at all, since there's only one row.
              className="border-t border-foreground/12 first:border-t-0 sm:even:border-t-0 sm:even:border-l lg:border-t-0 lg:border-l lg:first:border-l-0"
            >
              <Reveal delayMs={i * 80}>
                <IndexedItem
                  layout="stacked"
                  index={stage.index}
                  title={stage.title}
                >
                  {stage.body}
                </IndexedItem>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
