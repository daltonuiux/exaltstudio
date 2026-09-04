import Image from "next/image";

import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
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
            <Reveal
              as="li"
              key={sample.src}
              // Small stagger between the two columns only, not per item —
              // rows already stagger naturally as they cross into view one
              // after another; this just keeps a row's pair from popping in
              // simultaneously.
              delayMs={(i % 2) * 100}
              // Figma tile: 668 x 472, expressed as a ratio so it holds at any width.
              // rounded-md sm:rounded-lg, matching WorkSection's case-study
              // screenshots just above this section on the page — one shared
              // radius scale for every photo tile on the site rather than
              // each spot picking its own value.
              className="flex aspect-[668/472] items-center justify-center overflow-hidden rounded-md bg-foreground/4 sm:rounded-lg"
            >
              {/* Figma sizes the artwork by height — 325 of the tile's 472 —
                  and lets width follow the source aspect. That is why the one
                  4:2.6 screenshot sits narrower than the 16:10 ones. */}
              <Image
                src={sample.src}
                alt={sample.alt}
                width={sample.width}
                height={sample.height}
                sizes="(min-width: 640px) 40vw, 80vw"
                className="h-[68.86%] w-auto"
              />
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
