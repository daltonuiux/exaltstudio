import Image from "next/image";

import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import type { WorkSample } from "@/lib/work-samples";

/**
 * One Selected Work tile, with a desktop hover popover.
 *
 * The popover sits inside the tile (which clips with overflow-hidden),
 * anchored bottom-left over the artwork, so it can never be cut off by the
 * viewport or a neighbouring tile, and needs no JS. group-hover only applies
 * on devices that can genuinely hover (Tailwind wraps it in
 * @media (hover: hover)), so touch never sees a stuck popover; hidden below lg.
 * It stays in the DOM (opacity, not display) for screen readers.
 *
 * A cursor-following version was tried and dropped: it was buggy.
 */
export function WorkSampleTile({
  sample,
  delayMs,
}: {
  sample: WorkSample;
  delayMs?: number;
}) {
  return (
    <Reveal
      as="li"
      // Small stagger between the two columns only, not per item — rows
      // already stagger naturally as they cross into view one after another;
      // this just keeps a row's pair from popping in simultaneously.
      delayMs={delayMs}
      // Figma tile: 668 x 472, expressed as a ratio so it holds at any width.
      // rounded-md sm:rounded-lg, matching WorkSection's case-study
      // screenshots just above this section on the page — one shared radius
      // scale for every photo tile on the site.
      className="group relative flex aspect-[668/472] items-center justify-center overflow-hidden rounded-md bg-foreground/4 sm:rounded-lg"
    >
      {/* Figma sizes the artwork by height — 325 of the tile's 472 — and lets
          width follow the source aspect. That is why the one 4:2.6
          screenshot sits narrower than the 16:10 ones. */}
      <Image
        src={sample.src}
        alt={sample.alt}
        width={sample.width}
        height={sample.height}
        sizes="(min-width: 640px) 40vw, 80vw"
        className="h-[68.86%] w-auto"
      />

      {/* No border: a hairline stroke around the card fought its soft shadow,
          leaving a hard line inside the falloff. The shadow alone defines the
          edge — a tight contact layer plus a wide, low-opacity lift.
          Stays in the DOM (opacity, not display) for screen readers. */}
      <div
        className="pointer-events-none absolute bottom-4 left-4 hidden w-[min(22rem,calc(100%-2rem))] translate-y-2 flex-col gap-3 rounded-md bg-background p-5 opacity-0 shadow-[0_1px_2px_rgb(22_18_24/0.06),0_16px_40px_-12px_rgb(22_18_24/0.22)] transition-[opacity,translate] duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:transition-none lg:flex"
      >
        <SectionLabel>{sample.alt}</SectionLabel>
        <div>
          <p className="text-xl font-semibold tracking-[-0.03em] text-foreground">
            {sample.client ?? sample.descriptor}
          </p>
          {sample.client ? (
            <p className="mt-1 text-sm text-foreground/66">{sample.descriptor}</p>
          ) : null}
        </div>
        <ul className="flex flex-wrap gap-2">
          {sample.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-foreground/12 bg-background px-3 py-1 text-sm text-foreground/66"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
