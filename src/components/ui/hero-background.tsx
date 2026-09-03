import Image from "next/image";

/**
 * Full-bleed sky behind the first viewport.
 *
 * Fills its container edge to edge — the container itself now starts at
 * true page y-0 (SiteHeader is position:fixed, so it no longer pushes this
 * down), so the sky reaches all the way up and shows through the
 * transparent header at the top of the page via z-index.
 */
export function HeroBackground() {
  return (
    <div
      aria-hidden
      // z-0 rather than a negative z-index: as a negative-z child of an
      // isolated parent this paints beneath that parent's background and never
      // shows. The content above is raised instead.
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <Image
        src="/images/decorative/hero-sky.webp"
        alt=""
        fill
        // The LCP candidate: preload it rather than letting it queue.
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* A 10% foreground wash over the image, to hold the type.
          Figma specifies 20%; lightened at Luke's request. */}
      <div className="absolute inset-0 bg-foreground/10" />
    </div>
  );
}
