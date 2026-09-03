import Image from "next/image";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";

type Sample = {
  src: string;
  alt: string;
  /** Intrinsic size of the committed file, for aspect reservation. */
  width: number;
  height: number;
};

/**
 * Order matches the Figma frame, read left-to-right down the two columns.
 * Labels describe the screens rather than the clients — worth reviewing as
 * real copy.
 */
const samples: Sample[] = [
  { src: "/images/work/standard-view.webp", alt: "Standard view", width: 1400, height: 875 },
  { src: "/images/work/reporting.webp", alt: "Reporting view", width: 1400, height: 875 },
  { src: "/images/work/records-table.webp", alt: "Records table", width: 1400, height: 875 },
  { src: "/images/work/dashboard-first-state.webp", alt: "Dashboard, first-run state", width: 1400, height: 875 },
  { src: "/images/work/canvas.webp", alt: "Canvas", width: 1400, height: 875 },
  { src: "/images/work/pop-up-option.webp", alt: "Comparison view", width: 1400, height: 909 },
  { src: "/images/work/tools-nose.webp", alt: "Tools panel", width: 1400, height: 875 },
  { src: "/images/work/formulas-screen.webp", alt: "Formulas screen", width: 1400, height: 875 },
  { src: "/images/work/dashboard-view.webp", alt: "Dashboard view", width: 1400, height: 875 },
  { src: "/images/work/view.webp", alt: "Table view", width: 1400, height: 875 },
  { src: "/images/work/dark-mode.webp", alt: "Dark mode interface", width: 1400, height: 875 },
  { src: "/images/work/comparables.webp", alt: "Comparables, card view", width: 1400, height: 875 },
  { src: "/images/work/default.webp", alt: "Default view", width: 1400, height: 875 },
  { src: "/images/work/dashboard.webp", alt: "Dashboard", width: 1400, height: 875 },
  { src: "/images/work/manage-pools.webp", alt: "Manage pools", width: 1400, height: 875 },
  { src: "/images/work/link-icon.webp", alt: "Product interface", width: 1400, height: 875 },
];

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
