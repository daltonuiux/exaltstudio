import Image from "next/image";

/**
 * Full-bleed sky behind the final CTA card and the footer below it.
 *
 * Shared across both — rather than each rendering its own copy — so the
 * image reads as one continuous scene rather than two separate crops with a
 * seam between them. Same source as the hero's background; Figma reuses the
 * asset here too.
 */
export function FooterBackground() {
  return (
    <div
      aria-hidden
      // z-0 rather than a negative z-index: as a negative-z child of an
      // isolated parent this paints beneath that parent's own background and
      // never shows (see HeroBackground). The content above is raised instead.
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <Image
        src="/images/decorative/hero-sky.webp"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      {/* Figma: rgba(22,18,24,0.2) over the image, to hold the type. Left at
          Figma's spec here — unlike the hero's wash, which Luke asked to be
          lightened to 10%, that request was scoped to the hero only. */}
      <div className="absolute inset-0 bg-foreground/20" />
    </div>
  );
}
