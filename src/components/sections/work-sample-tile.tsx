"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";

import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import type { WorkSample } from "@/lib/work-samples";

/** Gap between the cursor and the popover's nearest corner. */
const CURSOR_OFFSET = 20;
/** Minimum distance kept between the popover and the tile's edge. */
const EDGE_PADDING = 8;
/** Share of the remaining distance covered per frame — lower is floatier. */
const FOLLOW_EASE = 0.18;

/**
 * One Selected Work tile, with a desktop hover popover that follows the
 * cursor.
 *
 * The popover lives inside the tile (which clips with overflow-hidden), so
 * position is clamped to the tile and flips to the cursor's other side near
 * the right/bottom edge rather than being cut off. Position is written
 * straight to `transform` from a rAF loop, not React state — it changes every
 * frame, and a re-render per frame buys nothing. The loop eases toward the
 * pointer (a little lag reads as weight, not lag) and only runs while hovered;
 * on entry it snaps to the cursor so the popover never sweeps in from a stale
 * spot. Visibility itself stays CSS (group-hover), which Tailwind gates behind
 * @media (hover: hover) so touch never sees it; hidden below lg.
 *
 * `transform` carries the following; the fade-in nudge uses the separate
 * `translate` property, so the two compose instead of fighting.
 */
export function WorkSampleTile({
  sample,
  delayMs,
}: {
  sample: WorkSample;
  delayMs?: number;
}) {
  const popoverRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return () => {
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    };
  }, []);

  const paint = useCallback(() => {
    const el = popoverRef.current;
    if (el) el.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0)`;
  }, []);

  const start = useCallback(() => {
    const step = () => {
      const c = current.current;
      const t = target.current;
      c.x += (t.x - c.x) * FOLLOW_EASE;
      c.y += (t.y - c.y) * FOLLOW_EASE;
      paint();
      raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
  }, [paint]);

  const aim = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const tile = e.currentTarget.getBoundingClientRect();
    const pop = popoverRef.current;
    const pw = pop?.offsetWidth ?? 0;
    const ph = pop?.offsetHeight ?? 0;
    const px = e.clientX - tile.left;
    const py = e.clientY - tile.top;

    // Prefer bottom-right of the cursor; flip to the other side when that
    // would run past the tile, then clamp as a last resort.
    let x = px + CURSOR_OFFSET;
    let y = py + CURSOR_OFFSET;
    if (x + pw > tile.width - EDGE_PADDING) x = px - CURSOR_OFFSET - pw;
    if (y + ph > tile.height - EDGE_PADDING) y = py - CURSOR_OFFSET - ph;
    x = Math.min(Math.max(x, EDGE_PADDING), tile.width - pw - EDGE_PADDING);
    y = Math.min(Math.max(y, EDGE_PADDING), tile.height - ph - EDGE_PADDING);

    target.current = { x, y };
  }, []);

  const onEnter = (e: React.MouseEvent<HTMLElement>) => {
    aim(e);
    current.current = { ...target.current };
    paint();
    if (!reduced.current && raf.current === null) start();
  };

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    aim(e);
    if (reduced.current) {
      current.current = { ...target.current };
      paint();
    }
  };

  const onLeave = () => {
    if (raf.current !== null) {
      cancelAnimationFrame(raf.current);
      raf.current = null;
    }
  };

  return (
    <Reveal
      as="li"
      // Small stagger between the two columns only, not per item — rows
      // already stagger naturally as they cross into view one after another;
      // this just keeps a row's pair from popping in simultaneously.
      delayMs={delayMs}
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
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
        ref={popoverRef}
        className="pointer-events-none absolute top-0 left-0 hidden w-[min(22rem,calc(100%-2rem))] translate-y-2 flex-col gap-3 rounded-md bg-background p-5 opacity-0 shadow-[0_1px_2px_rgb(22_18_24/0.06),0_16px_40px_-12px_rgb(22_18_24/0.22)] transition-[opacity,translate] duration-300 ease-out will-change-transform group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:transition-none lg:flex"
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
