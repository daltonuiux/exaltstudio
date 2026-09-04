import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { siteConfig } from "@/lib/site";

const offerings = [
  {
    index: "01",
    title: "Product Redesign",
    body: "For products that work, but have become complex, inconsistent or difficult to use.",
  },
  {
    index: "02",
    title: "New Product & MVP Design",
    body: "For teams turning a complex idea into a product customers can actually use.",
  },
  {
    index: "03",
    title: "Design Systems",
    body: "For growing products that need consistency without slowing engineering down.",
  },
  {
    index: "04",
    title: "Embedded Product Design",
    body: "Senior product design support without making a full-time hire.",
  },
  {
    index: "05",
    title: "Design Engineering",
    body: "Take approved product designs from Figma to a production-ready frontend.",
  },
];

/**
 * What was ProcessSection ("How we work" — the muted 3-stage engagement
 * outline) is now this: a plain-white list of the four services themselves.
 * id is "services" (not "process") to match — ServicesSection is the one
 * that actually describes the studio's process (Clarify/Redesign/Systemise/
 * Ship) and now owns id="process" accordingly.
 */
export function OfferingsSection() {
  return (
    <Section id="services" spacing="lg" aria-labelledby="offerings-heading">
      <Container width="full">
        <Reveal>
          <SectionHeader
            label="Services"
            titleId="offerings-heading"
            title="Ways to work together"
          />
        </Reveal>

        <ol className="mt-14 lg:mt-20">
          {offerings.map((offering) => (
            <Reveal
              as="li"
              key={offering.title}
              // group: the row-wide hover fill and the CTA arrow's nudge
              // both key off hovering anywhere in the row, not just the
              // link text itself.
              //
              // The hover fill is a separate absolutely-positioned layer
              // (below) rather than a background-color on the row itself,
              // so its own transition-colors doesn't fight the row's
              // transition-[opacity,translate] from Reveal — both set the
              // `transition-property` CSS property, and a single element
              // can only have one value for it.
              //
              // The title column is sized to the longest title ("New Product
              // & MVP Design", ~358px unwrapped) plus headroom, so all four
              // stay on one line rather than two of four wrapping while the
              // others don't.
              //
              // items-center, not items-baseline or items-start: baseline
              // pinned everything to the body's first line, which pulled the
              // (smaller-font) body up and left the index floating too high
              // above the title; items-start fixed that but left the index
              // sitting at the row's top edge rather than against the
              // title's own visual centre. items-center sidesteps both —
              // index and title are both single-line, so centering aligns
              // them with each other regardless of the row's total height,
              // which the (possibly two-line) body doesn't disturb since
              // it's centered by that same rule too.
              //
              // Reveal renders as the `li` itself (not a wrapping div around
              // its contents) — the grid-cols template below applies to the
              // li's direct children, so a wrapper div in between would
              // collapse them into a single column.
              //
              // No last:pb-0: that trimmed the final row's own bottom
              // padding to avoid doubling up with the section's own spacing
              // below it, but it also made the last row's hover fill visibly
              // shorter than every other row's — same top/bottom padding on
              // every row, hover fill included, matters more than trimming
              // that little bit of now-doubled space. last:border-b closes
              // the list off with the same rule the other rows open with,
              // rather than leaving it open underneath.
              className="group relative grid grid-cols-[2.25rem_1fr] items-center gap-x-4 gap-y-3 border-t border-foreground/12 py-8 last:border-b sm:grid-cols-[4rem_1fr] sm:gap-x-6 lg:grid-cols-[4rem_24rem_1fr_auto] lg:gap-x-10 lg:py-10"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 bg-transparent transition-colors duration-200 group-hover:bg-foreground/3"
              />

              <span className="font-mono text-eyebrow font-medium text-foreground/50 tabular-nums lg:pl-4">
                {offering.index}
              </span>
              <h3 className="text-xl font-semibold text-balance tracking-[-0.03em] sm:text-2xl">
                {offering.title}
              </h3>
              <p className="col-span-2 text-base leading-6 text-foreground/66 lg:col-span-1 lg:max-w-[46ch]">
                {offering.body}
              </p>

              {/* The whole row is the click target — Book a call is just
                  the label, not a separate small hit area. The visible
                  link wraps only the label text (so its accessible name
                  stays "Book a call about X"); the aria-hidden span inside
                  it is absolutely positioned against the li (the nearest
                  positioned ancestor, since this span's own parent — the
                  link — isn't itself positioned) and stretches to cover
                  the full row without adding a second, redundant link. */}
              <Link
                href={siteConfig.bookingUrl}
                target="_blank"
                rel="noreferrer noopener"
                // Hover-revealed on desktop only (lg:opacity-0, shown via
                // group-hover) — always visible below that, since touch
                // devices have no real hover to reveal it with. Also shown
                // on group-focus-within, so tabbing to the link doesn't
                // land keyboard focus on something invisible.
                className="col-span-2 inline-flex w-fit items-center gap-2 text-sm font-semibold text-foreground transition-opacity duration-200 lg:col-span-1 lg:col-start-4 lg:justify-self-end lg:pr-4 lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100"
              >
                <span aria-hidden className="absolute inset-0" />
                Book a call
                <span className="sr-only"> about {offering.title}</span>
                <span
                  aria-hidden
                  className="transition-transform duration-200 group-hover:translate-x-1"
                >
                  &rarr;
                </span>
              </Link>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
