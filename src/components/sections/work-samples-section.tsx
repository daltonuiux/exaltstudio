import Image from "next/image";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { workSamples } from "@/lib/work-samples";

export function WorkSamplesSection() {
  return (
    <Section
      id="work-samples"
      spacing="lg"
      aria-labelledby="work-samples-heading"
      className="border-t border-foreground/12"
    >
      <Container width="full">
        <div className="flex flex-col gap-2 text-center">
          <SectionLabel>Our work</SectionLabel>
          <h2
            id="work-samples-heading"
            className="text-display font-semibold text-foreground"
          >
            Selected Work
          </h2>
        </div>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2">
          {workSamples.map((sample) => (
            <li
              key={sample.src}
              // Figma tile: 668 x 472, expressed as a ratio so it holds at any width.
              className="flex aspect-[668/472] items-center justify-center overflow-hidden rounded-lg border border-foreground/12 bg-foreground/4"
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
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
