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
    <Section
      id="services"
      spacing="lg"
      aria-labelledby="services-heading"
      className="border-t border-foreground/12"
    >
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

        {/* Horizontal rule across the top, fine vertical rules between columns. */}
        <ol className="mt-14 grid sm:grid-cols-2 sm:gap-x-10 lg:mt-20 lg:grid-cols-4 lg:gap-x-0 lg:border-t lg:border-foreground/12 lg:pt-10">
          {stages.map((stage) => (
            <li
              key={stage.index}
              className={
                "border-t border-foreground/12 pt-6 pb-8 last:pb-0 " +
                "lg:border-t-0 lg:border-l lg:pt-0 lg:pb-0 lg:pl-8 " +
                "lg:first:border-l-0 lg:first:pl-0"
              }
            >
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
