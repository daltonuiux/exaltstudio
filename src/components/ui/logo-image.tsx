import type { Logo } from "@/lib/logos";

/**
 * A single brand logo at its Figma display size.
 *
 * Deliberately a plain <img> rather than next/image: these are static SVGs at
 * fixed sizes, so the optimiser has nothing to do, and the marquee renders 30
 * of them. Width/height attributes are set so space is reserved and nothing
 * shifts on load.
 */
export function LogoImage({ logo }: { logo: Logo }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- see above
    <img
      src={logo.src}
      alt={logo.name}
      width={Math.round(logo.width)}
      height={Math.round(logo.height)}
      style={{ width: logo.width, height: logo.height }}
      decoding="async"
      draggable={false}
    />
  );
}
