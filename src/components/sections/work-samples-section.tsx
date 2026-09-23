import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { WorkSampleTile } from "@/components/sections/work-sample-tile";
import { workSamples } from "@/lib/work-samples";

export function WorkSamplesSection() {
  return (
    <Section id="work-samples" spacing="lg" aria-labelledby="work-samples-heading">
      <Container width="full">
        <Reveal className="flex flex-col gap-2 text-center">
          <SectionLabel>Our work</SectionLabel>
          <h2
            id="work-samples-heading"
            className="text-display font-semibold text-foreground"
          >
            Selected Work
          </h2>
        </Reveal>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2">
          {workSamples.map((sample, i) => (
            <WorkSampleTile key={sample.src} sample={sample} delayMs={(i % 2) * 100} />
          ))}
        </ul>
      </Container>
    </Section>
  );
}
