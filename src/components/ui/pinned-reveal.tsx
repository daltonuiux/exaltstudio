import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Holds a ScrollRevealText in place while it reveals, so the sentence is read
 * rather than scrolled past.
 *
 * A tall track with a viewport-high sticky stage inside it: the stage stays
 * pinned to the screen for `track height - stage height` of scrolling (100svh
 * with the 200svh below), and ScrollRevealText (which looks for the enclosing
 * `data-reveal-track` / `data-reveal-stage` pair) maps its reveal onto that
 * distance instead of onto the paragraph's own trip through the viewport.
 * Native scrolling throughout, nothing hijacks the wheel or touch, so it works
 * with Lenis as is and the visitor can always scroll straight on through.
 *
 * Under prefers-reduced-motion nothing is pinned or tall: the track collapses
 * to its content, the stage is an ordinary block, and ScrollRevealText shows
 * the text fully revealed. `reducedClassName` is the padding that block gets in
 * that case (the pinned version is centred in the viewport and needs none).
 */
export function PinnedReveal({
  children,
  reducedClassName,
}: {
  children: ReactNode;
  reducedClassName?: string;
}) {
  return (
    <div
      data-reveal-track
      className="relative h-[200svh] motion-reduce:h-auto"
    >
      <div
        data-reveal-stage
        className={cn(
          "sticky top-0 flex h-svh items-center motion-reduce:static motion-reduce:h-auto",
          reducedClassName,
        )}
      >
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
