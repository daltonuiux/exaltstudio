"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import type { WorkSample } from "@/lib/work-samples";
import { cn } from "@/lib/utils";

const INTERVAL_MS = 2000;

type WorkSampleCyclerProps = {
  samples: readonly WorkSample[];
  className?: string;
};

/**
 * Cross-fades through the work samples inside the hero tile.
 *
 * Frames are introduced lazily — only the ones that have actually been shown
 * are in the DOM — so first paint carries a single image rather than sixteen,
 * which matters for a tile this size above the fold.
 *
 * Decorative: the same screenshots are presented properly in Selected Work, so
 * the whole tile is hidden from assistive tech rather than announcing sixteen
 * rotating alt texts. Cycling stops entirely under prefers-reduced-motion.
 */
export function WorkSampleCycler({ samples, className }: WorkSampleCyclerProps) {
  const [{ index, mounted }, setState] = useState({ index: 0, mounted: 1 });

  useEffect(() => {
    if (samples.length < 2) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    const id = window.setInterval(() => {
      setState((prev) => {
        const next = (prev.index + 1) % samples.length;
        return { index: next, mounted: Math.max(prev.mounted, next + 1) };
      });
    }, INTERVAL_MS);

    return () => window.clearInterval(id);
  }, [samples.length]);

  return (
    <div
      aria-hidden
      className={cn(
        // Figma tile: 539 x 381, as a ratio so it holds at any width.
        "relative flex aspect-[539/381] items-center justify-center overflow-hidden rounded-lg border border-foreground/12 bg-foreground/4",
        className,
      )}
    >
      {samples.slice(0, mounted).map((sample, i) => (
        <Image
          key={sample.src}
          src={sample.src}
          alt=""
          width={sample.width}
          height={sample.height}
          // Figma sizes the artwork by height — 250 of the tile's 381 — and
          // lets width follow the source aspect, as the work grid does.
          className={cn(
            "absolute h-[65.6%] w-auto transition-opacity duration-700 ease-out",
            i === index ? "opacity-100" : "opacity-0",
          )}
          sizes="(min-width: 1024px) 400px, 74vw"
          priority={i === 0}
        />
      ))}
    </div>
  );
}
