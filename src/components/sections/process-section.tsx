import { Container } from "@/components/ui/container";
import { IndexedItem } from "@/components/ui/indexed-item";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionLabel } from "@/components/ui/section-label";

const stages = [
  {
    index: "01",
    title: "Diagnose",
    body: "Understand the product, users, technical constraints and commercial milestone.",
  },
  {
    index: "02",
    title: "Design",
    body: "Resolve the product structure and redesign the workflows that matter most.",
  },
  {
    index: "03",
    title: "Systemise",
    body: "Turn the solution into reusable, developer-ready product foundations.",
  },
];

const engagementMeta = [
  "Founder-led",
  "6–8 week engagements",
  "Async + collaborative",
  "Developer-ready delivery",
];

export function ProcessSection() {
  return (
    <Section
      id="process"
      spacing="lg"
      aria-labelledby="process-heading"
      // The one place the ground shifts: a single step of mauve, no more.
      className="border-t border-foreground/12 bg-muted"
    >
      <Container width="full">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-16">
              <SectionHeader
                label="How we work"
                titleId="process-heading"
                title={
                  <>
                    Senior product design,
                    <br />
                    without months of hiring.
                  </>
                }
              />

              <p className="mt-10 border-t border-foreground/12 pt-6 text-lg leading-7 font-medium text-foreground">
                Work directly with Exalt founder Luke Dalton throughout the
                engagement.
              </p>

              <SectionLabel
                as="ul"
                className="mt-6 flex flex-wrap gap-x-6 gap-y-2"
              >
                {engagementMeta.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </SectionLabel>
            </div>
          </div>

          <ol className="lg:col-span-6 lg:col-start-7">
            {stages.map((stage) => (
              <li
                key={stage.index}
                className="border-t border-foreground/12 py-8 last:pb-0 lg:py-10"
              >
                <IndexedItem index={stage.index} title={stage.title}>
                  {stage.body}
                </IndexedItem>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
