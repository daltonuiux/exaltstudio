import { Container } from "@/components/ui/container";
import { IndexedItem } from "@/components/ui/indexed-item";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionLabel } from "@/components/ui/section-label";

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
    <Section id="services" spacing="lg" aria-labelledby="services-heading">
      <Container width="full">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <SectionHeader
            className="lg:col-span-6"
            label="What we do"
            titleId="services-heading"
            title={
              <>
                From complex product
                <br />
                to scalable system.
              </>
            }
          />
          <p className="max-w-[52ch] self-end text-base leading-6 text-foreground/66 lg:col-span-5 lg:col-start-8">
            We work across the product structure, critical workflows and design
            system to make complex software easier to use, easier to trust and
            easier to keep building.
          </p>
        </div>

        <ol className="mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-y-0">
          {stages.map((stage) => (
            <li key={stage.index}>
              <IndexedItem
                layout="stacked"
                index={stage.index}
                title={stage.title}
              >
                {stage.body}
              </IndexedItem>
            </li>
          ))}
        </ol>

        <SectionLabel className="mt-10 border-t border-foreground/12 pt-6 lg:mt-14">
          Typically delivered over 6–8 weeks, shaped around your product and
          next commercial milestone.
        </SectionLabel>
      </Container>
    </Section>
  );
}
