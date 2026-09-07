"use client";

import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import type { Service } from "@/lib/services";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type ServicesAccordionProps = {
  services: readonly Service[];
};

/**
 * The one column template both the collapsed header and the expanded
 * content are built on, so they're guaranteed to align rather than
 * approximating it with a matching offset — index / title / description /
 * meta, exactly the header's own four columns.
 *
 * The 4th column is an explicit 18rem, not auto (which is what the header
 * alone would want, sized to fit only its small +/- indicator): CSS Grid
 * sizes a shared column to fit the widest thing placed in it *anywhere* in
 * the grid, including a row that's currently visually collapsed — an auto
 * column here would still be pulled wide by the expanded content's price,
 * note and CTA button even while every row sits closed, quietly narrowing
 * the description column the header actually needs to keep its own width.
 * 18rem is comfortably wide enough for that content without redrawing
 * columns 1-3, which keep the header's own 4rem / 24rem / 1fr exactly.
 */
const GRID_TEMPLATE = "grid lg:grid-cols-[4rem_24rem_1fr_18rem] lg:gap-x-10";

/**
 * Interactive service/pricing accordion — one row expanded at a time.
 *
 * Desktop drives primarily through hover: entering a row's `<li>` opens it
 * (closing whatever was open, since there's a single `active` index), and
 * the header button and its own revealed content live inside that same
 * `<li>`, so moving the pointer from one into the other never crosses a
 * boundary that would close it — nothing needs to explicitly keep it open,
 * there's just nothing telling it to close. Only leaving the whole list
 * (`<ol>`'s onMouseLeave) resets to the collapsed default. Clicking the
 * trigger button toggles regardless of hover support, which is also the
 * entire mobile interaction (no hover there to open or close anything) and
 * how keyboard users reach it — onFocusCapture on the `<li>` mirrors hover
 * for focus, covering both the trigger and, once open, the CTA link inside.
 *
 * canHover gates only the mouse handlers: without it (touch), a stray
 * synthetic hover event after a tap can't leave a row stuck open.
 *
 * The reveal itself is a CSS grid-template-rows 0fr->1fr transition, not a
 * JS-measured height: animates to the content's natural height with no
 * ResizeObserver or layout math, and (paired with an opacity fade) is
 * exactly the "height / grid / opacity" transition asked for. `inert` on
 * the collapsed content removes its CTA link from the tab order and a11y
 * tree while it's visually collapsed, without preventing the CSS
 * transition from animating it — a plain `hidden` would do the former but
 * kill the latter.
 */
export function ServicesAccordion({ services }: ServicesAccordionProps) {
  const [active, setActive] = useState<number | null>(null);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const apply = () => setCanHover(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const closeAll = useCallback(() => setActive(null), []);

  return (
    <ol className="mt-14 lg:mt-20" onMouseLeave={canHover ? closeAll : undefined}>
      {services.map((service, i) => {
        const isOpen = active === i;
        const triggerId = `service-${service.index}-trigger`;
        const contentId = `service-${service.index}-content`;

        return (
          <Reveal
            as="li"
            key={service.title}
            className="group relative border-t border-foreground/12 last:border-b"
            onMouseEnter={canHover ? () => setActive(i) : undefined}
            onFocusCapture={() => setActive(i)}
          >
            {/* Same row-wide fill OfferingsSection always had, just keyed
                off `isOpen` (a real state) rather than a raw :hover
                pseudo-class — correctly reflects click/keyboard activation
                too, not only literal mouse hover. */}
            <div
              aria-hidden
              className={cn(
                "pointer-events-none absolute inset-0 -z-10 transition-colors duration-200 motion-reduce:transition-none",
                isOpen ? "bg-foreground/3" : "bg-transparent",
              )}
            />

            <button
              type="button"
              id={triggerId}
              aria-expanded={isOpen}
              aria-controls={contentId}
              onClick={() => setActive(isOpen ? null : i)}
              className={cn(
                GRID_TEMPLATE,
                "relative w-full grid-cols-1 gap-y-3 py-8 text-left lg:items-center lg:py-10",
              )}
            >
              <span className="font-mono text-eyebrow font-medium text-foreground/50 tabular-nums lg:pl-4">
                {service.index}
              </span>
              <h3 className="mt-2 pr-8 text-xl font-semibold text-balance tracking-[-0.03em] sm:text-2xl lg:mt-0 lg:pr-0">
                {service.title}
              </h3>
              <p className="text-base leading-6 text-foreground/66 lg:max-w-[46ch]">
                {service.summary}
              </p>
              <PlusMinus open={isOpen} />
            </button>

            <div
              id={contentId}
              role="region"
              aria-labelledby={triggerId}
              inert={!isOpen}
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                {/* Same GRID_TEMPLATE as the trigger button above, not a
                    fresh lg:grid-cols-3 — that was an independent grid with
                    its own (equal-thirds) column proportions, unrelated to
                    the header's, offset into rough alignment with a single
                    lg:pl-[6.5rem] guess. Sharing the literal template means
                    "Best for" / "What you get" / "Engagement" land in the
                    exact same columns as the title / description / meta
                    area above them because they're placed in the same
                    column tracks, not because an offset happens to match —
                    col-start-2/3/4 below, leaving column 1 (the index's own
                    4rem) empty on purpose. */}
                <div
                  className={cn(
                    GRID_TEMPLATE,
                    "gap-y-8 pb-8 opacity-0 transition-opacity duration-300 motion-reduce:transition-none lg:pb-10",
                    isOpen && "opacity-100",
                  )}
                >
                  {/* items-start (the grid default — no override needed):
                      Best for / What you get / Engagement read as a table's
                      columns, each column's label and content starting at
                      the same height as its neighbours regardless of which
                      is longer. A centered pass here previously (per an
                      earlier, incorrect read of "align the secondary text
                      optically with what you get") pulled Best for's label
                      down to the row's midpoint instead, breaking exactly
                      that shared baseline — reverted. */}
                  <div className="lg:col-start-2">
                    <SectionLabel as="p">Best for</SectionLabel>
                    <p className="mt-3 text-base leading-6 text-foreground/66">
                      {service.bestFor}
                    </p>
                  </div>

                  <div className="lg:col-start-3">
                    <SectionLabel as="p">What you get</SectionLabel>
                    <ul className="mt-3 flex flex-col gap-2">
                      {service.whatYouGet.map((item) => (
                        <li key={item} className="text-base leading-6 text-foreground/66">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col gap-6 lg:col-start-4">
                    <div>
                      <SectionLabel as="p">Engagement</SectionLabel>
                      <div className="mt-3 flex flex-col gap-1">
                        <p className="text-base leading-6 text-foreground/66">
                          {service.engagement[0]}
                        </p>
                        <p className="text-base leading-6 text-foreground/66">
                          {service.engagement[1]}
                        </p>
                        {/* The one place price gets more weight than its
                            surrounding metadata — still the same base type
                            size, just semibold and full-strength foreground
                            rather than /66, so it reads as the headline
                            number without turning into a price-tag. */}
                        <p className="text-base font-semibold leading-6 text-foreground">
                          {service.engagement[2]}
                        </p>
                      </div>
                      {service.note ? (
                        <p className="mt-3 text-sm leading-5 text-foreground/50">
                          {service.note}
                        </p>
                      ) : null}
                    </div>

                    <Button
                      href={siteConfig.bookingUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="w-full justify-center sm:w-fit"
                    >
                      Book intro call
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        );
      })}
    </ol>
  );
}

/**
 * A "+" built from two bars rather than a glyph or an SVG chevron — the
 * vertical bar fades out on open, leaving the horizontal one as "−". Purely
 * typographic in spirit (same idea as the FAQ chevron elsewhere on the
 * page) without reaching for an icon.
 */
function PlusMinus({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        // top-1/2 -translate-y-1/2, not a fixed top-N: below lg the row is a
        // stacked index/title/description column of variable height (the
        // description alone can wrap to one or two lines depending on the
        // service), and a fixed offset happened to land wherever that
        // description's own text was wrapping for some services, reading as
        // the indicator floating mid-sentence rather than a clean edge
        // marker. Centering it against the row's actual height, however
        // tall that turns out to be, keeps it clear of the text at any
        // length — and matches how it already sits at lg, where the row's
        // own lg:items-center centers it for the same reason.
        //
        // lg:mr-4 mirrors the index span's own lg:pl-4 (see below) — the
        // index sits 16px in from the row's left edge, but this had no
        // matching inset from the right, so the two ends of the row read as
        // unbalanced (numbering comfortably inset, indicator flush against
        // the very edge). A margin, not padding: this span is a fixed
        // h-3 w-3 box, and padding would eat into that already-tight
        // content area (border-box sizing) rather than just shifting the
        // whole glyph inward the way margin does.
        "absolute top-1/2 right-0 mr-0 h-3 w-3 shrink-0 -translate-y-1/2 transition-colors duration-200 motion-reduce:transition-none lg:static lg:top-auto lg:right-auto lg:col-start-4 lg:mr-4 lg:translate-y-0 lg:justify-self-end",
        open ? "text-foreground" : "text-foreground/40",
      )}
    >
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="h-px w-3 bg-current" />
      </span>
      <span
        className={cn(
          "absolute inset-0 flex items-center justify-center transition-opacity duration-300 motion-reduce:transition-none",
          open ? "opacity-0" : "opacity-100",
        )}
      >
        <span className="h-3 w-px bg-current" />
      </span>
    </span>
  );
}
