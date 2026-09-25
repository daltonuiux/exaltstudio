import { HeroLines } from "@/components/ui/hero-lines";

/**
 * The solid #161218 fill and animated lines behind the final CTA card and the
 * footer below it, shared across both so it reads as one continuous scene.
 *
 * Renders two siblings into the caller's `relative isolate` wrapper (the lines
 * are screen-blended, which only blends within that stacking context), and the
 * content above is raised to z-10.
 */
export function FooterBackground() {
  return (
    <>
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 bg-foreground" />
      <HeroLines />
    </>
  );
}
