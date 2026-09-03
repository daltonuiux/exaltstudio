import Link from "next/link";

import { Container } from "@/components/ui/container";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionLabel } from "@/components/ui/section-label";
import { cn } from "@/lib/utils";

type Project = {
  index: string;
  name: string;
  category: string;
  description: string;
  services: string[];
  href: string;
  /** Client mark used inside the placeholder until real artwork lands. */
  markSrc: string;
};

const projects: Project[] = [
  {
    index: "01",
    name: "Onefin",
    category: "Enterprise fintech",
    description:
      "A fragmented financial platform redesigned into a cohesive product system built for complex workflows and enterprise customers.",
    services: ["Product strategy", "UX/UI", "Design system"],
    href: "#work",
    markSrc: "/images/logos/onefin.svg",
  },
  {
    index: "02",
    name: "Meshed",
    category: "Insurtech",
    description:
      "Turning an early-stage insurance product into a clear, credible experience ready for customers and investors.",
    services: ["Product strategy", "UX/UI"],
    href: "#work",
    markSrc: "/images/logos/meshed.svg",
  },
  {
    index: "03",
    name: "Perlon AI",
    category: "AI sales",
    description:
      "Refining a fast-evolving AI product across critical workflows, new features and the broader product experience.",
    services: ["Product design", "UX/UI"],
    href: "#work",
    markSrc: "/images/logos/perlon-ai.svg",
  },
];

function ProjectRow({ project, flipped }: { project: Project; flipped: boolean }) {
  return (
    <article className="group grid gap-6 lg:grid-cols-12 lg:gap-10">
      {/* DOM order stays text-then-image for reading order; the grid places
          them explicitly, so alternating sides costs nothing in semantics. */}
      <div
        className={cn(
          "order-2 flex flex-col lg:order-none lg:row-start-1 lg:col-span-4 lg:self-end",
          flipped ? "lg:col-start-9" : "lg:col-start-1",
        )}
      >
        <div className="flex items-baseline gap-4">
          <SectionLabel as="span" className="tabular-nums">
            {project.index}
          </SectionLabel>
          <SectionLabel>{project.category}</SectionLabel>
        </div>

        <h3 className="mt-5 text-3xl font-semibold tracking-[-0.03em]">
          <Link
            href={project.href}
            className="transition-opacity duration-200 group-hover:opacity-70"
          >
            {/* Stretches the hit area over the whole row, image included. */}
            <span className="absolute inset-0 z-10" aria-hidden />
            {project.name}
          </Link>
        </h3>

        <p className="mt-4 max-w-[42ch] text-base leading-6 text-foreground/66">
          {project.description}
        </p>

        <ul className="mt-6 flex flex-col border-t border-foreground/12">
          {project.services.map((service) => (
            <li
              key={service}
              className="border-b border-foreground/12 py-2.5 text-sm text-foreground/66"
            >
              {service}
            </li>
          ))}
        </ul>

        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
          View project
          <span
            aria-hidden
            className="transition-transform duration-200 group-hover:translate-x-1"
          >
            &rarr;
          </span>
        </span>
      </div>

      <div
        className={cn(
          "order-1 lg:order-none lg:row-start-1 lg:col-span-7",
          flipped ? "lg:col-start-1" : "lg:col-start-6",
        )}
      >
        <div className="overflow-hidden">
          <ImagePlaceholder
            ratio="16 / 10"
            markSrc={project.markSrc}
            caption="Project imagery to come"
            className="transition-transform duration-500 ease-out group-hover:scale-[1.015]"
          />
        </div>
      </div>
    </article>
  );
}

export function WorkSection() {
  return (
    <Section
      id="work"
      spacing="lg"
      aria-labelledby="work-heading"
      className="border-t border-foreground/12"
    >
      <Container width="full">
        <SectionHeader
          label="Selected work"
          titleId="work-heading"
          title={
            <>
              Complex products,
              <br />
              made clear.
            </>
          }
        />

        <div className="mt-14 flex flex-col gap-16 lg:mt-20 lg:gap-28">
          {projects.map((project, i) => (
            <div key={project.name} className="relative">
              <ProjectRow project={project} flipped={i % 2 === 1} />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
