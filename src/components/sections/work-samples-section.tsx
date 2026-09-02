import Image from "next/image";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";

/**
 * Labels come from the Figma layer names, so they describe the screens rather
 * than the clients. Worth reviewing as real copy.
 */
const samples = [
  { src: "/images/work/01-dashboard.webp", alt: "Dashboard" },
  { src: "/images/work/02-reporting.webp", alt: "Reporting view" },
  { src: "/images/work/03-link-icon.webp", alt: "Product interface" },
  { src: "/images/work/04-dashboard-first-state.webp", alt: "Dashboard, first-run state" },
  { src: "/images/work/05-dashboard-view.webp", alt: "Dashboard view" },
  { src: "/images/work/06-view.webp", alt: "Table view" },
  { src: "/images/work/07-dark-mode.webp", alt: "Dark mode interface" },
  { src: "/images/work/08-comparables.webp", alt: "Comparables, card view" },
  { src: "/images/work/09-default.webp", alt: "Default view" },
  { src: "/images/work/10-standard-view.webp", alt: "Standard view" },
  { src: "/images/work/11-manage-pools.webp", alt: "Manage pools" },
] as const;

/* Figma tile: 668 x 472 at 1440, with the artwork centred at 72% of the
   tile width. Ratios rather than fixed pixels, so it holds at any width. */
const tileClass =
  "flex aspect-[668/472] items-center justify-center overflow-hidden rounded-lg border border-foreground/12 bg-foreground/4";

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
          {samples.map((sample) => (
            <li key={sample.src} className={tileClass}>
              {/* The artwork is 16:10, matching the 4000x2500 source, so
                  object-cover crops nothing. */}
              <div className="relative aspect-[16/10] w-[82%] sm:w-[72%]">
                <Image
                  src={sample.src}
                  alt={sample.alt}
                  fill
                  sizes="(min-width: 640px) 35vw, 78vw"
                  className="object-cover"
                />
              </div>
            </li>
          ))}
          {/* Figma closes the grid with an empty tile to square off the last
              row. Pointless when the grid is a single column. */}
          <li className={`${tileClass} hidden sm:flex`} aria-hidden />
        </ul>
      </Container>
    </Section>
  );
}
