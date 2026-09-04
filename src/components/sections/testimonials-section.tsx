"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { Container } from "@/components/ui/container";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { testimonials } from "@/lib/testimonials";
import { cn } from "@/lib/utils";

/** How long each testimonial stays up before auto-advancing. */
const INTERVAL_MS = 4000;

/**
 * Tallest the quote gets at each breakpoint, measured by rendering the
 * longest of the three real testimonials (Jake Wells') at a sweep of
 * viewport widths — re-measured for text-2xl (was text-3xl). Height isn't
 * monotonic with width here, since the box widens (fewer lines) while the
 * fluid font is simultaneously growing (more lines): at this size it falls
 * the whole way from 320px to 1024px, then climbs again and plateaus once
 * both the font and the 840px box cap out, around 1280px. Applied as a
 * min-height on the blockquote so switching to a shorter quote doesn't
 * shrink the section and shunt everything below it up the page.
 *
 * The base tier is split in two rather than one value covering 0-639px:
 * that range's own worst case (320px, 437px tall) is a lot taller than
 * what an actual iPhone-width viewport (375px, 350px tall) ever needs, and
 * reserving the 320px figure for every phone was exactly the "far too
 * much space above the photo" Luke flagged on an ordinary phone width.
 * min-[375px] instead of sm (640px) keeps that split where the real drop
 * in required height is, not at the next arbitrary layout breakpoint.
 */
const QUOTE_MIN_HEIGHT =
  "min-h-[440px] min-[375px]:min-h-[360px] sm:min-h-[250px] md:min-h-[220px] lg:min-h-[240px]";

export function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const pausedRef = useRef(false);

  const advance = useCallback(() => {
    setActive((i) => (i + 1) % testimonials.length);
  }, []);

  // setInterval, not a self-rescheduling setTimeout chain — that version's
  // single point of failure (each tick has to itself call schedule() again
  // or rotation stops forever) is exactly what let ImageCycle's identical
  // pattern get stuck on a first visit: a browser that speculatively
  // prerenders this page ahead of an actual click (Chrome's Speculation
  // Rules API; a plain search-result or omnibox suggestion is enough) runs
  // this effect while document.hidden is still true, and a setTimeout armed
  // in that state isn't guaranteed to survive the handoff to a real,
  // activated tab — so the very first tick can silently never fire, and
  // nothing was ever going to re-arm the next one after that. A plain
  // reload is never prerendered, which is why that "fixed" it there.
  // setInterval doesn't have that failure mode (one persistent,
  // browser-managed timer, not a chain), and the visibilitychange
  // revalidation below gives a genuinely stuck timer — from this or any
  // other cause — one more chance to establish itself the moment the page
  // is actually visible to someone, rather than staying stuck until an
  // unrelated reload happens to reset everything cleanly.
  //
  // pausedRef is still checked inside the tick itself (fired every
  // INTERVAL_MS regardless) rather than stopping/starting the interval on
  // hover — same reasoning as before: an advance already due the instant
  // the user hovers should still be skipped, not fire anyway.
  useEffect(() => {
    if (testimonials.length < 2) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let id: number | undefined;

    const start = () => {
      if (reduced.matches || id !== undefined || document.hidden) return;
      id = window.setInterval(() => {
        if (!pausedRef.current) advance();
      }, INTERVAL_MS);
    };
    const stop = () => {
      if (id === undefined) return;
      window.clearInterval(id);
      id = undefined;
    };

    start();

    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };
    // If motion preference flips mid-visit, stop or (re)start accordingly.
    const onReducedChange = () => {
      if (reduced.matches) stop();
      else start();
    };

    document.addEventListener("visibilitychange", onVisibility);
    reduced.addEventListener("change", onReducedChange);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      reduced.removeEventListener("change", onReducedChange);
      stop();
    };
  }, [advance]);

  const pause = useCallback(() => {
    pausedRef.current = true;
  }, []);
  const resume = useCallback(() => {
    pausedRef.current = false;
  }, []);

  const current = testimonials[active];

  return (
    <Section id="testimonials" spacing="lg" aria-labelledby="testimonials-heading">
      <Container width="full">
        <Reveal
          className="flex flex-col items-center text-center"
          onMouseEnter={pause}
          onMouseLeave={resume}
          // Keyboard users tabbing to a dot get the same pause.
          onFocusCapture={pause}
          onBlurCapture={resume}
        >
          <SectionLabel id="testimonials-heading">Testimonials</SectionLabel>

          {/* Keying on the active index remounts this on every change, which
              retriggers the CSS fade-in automatically — no JS transition
              timing needed. Only the current testimonial is ever in the DOM,
              so screen readers get one clean quote rather than several
              stacked, opacity-hidden ones. */}
          <figure key={active} className="mt-8 flex flex-col items-center animate-fade-in">
            <blockquote
              className={cn(
                "flex max-w-[840px] items-center justify-center",
                QUOTE_MIN_HEIGHT,
              )}
            >
              <p className="text-2xl font-medium text-balance">
                &ldquo;{current.quote}&rdquo;
              </p>
            </blockquote>

            <figcaption className="mt-8 flex flex-col items-center gap-3">
              {current.avatarSrc ? (
                <Image
                  src={current.avatarSrc}
                  alt=""
                  width={56}
                  height={56}
                  className="h-14 w-14 rounded-full object-cover"
                />
              ) : (
                <ImagePlaceholder ratio="1 / 1" className="w-14 rounded-full" />
              )}
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {current.name}
                </p>
                <p className="text-sm text-foreground/66">{current.role}</p>
              </div>
            </figcaption>
          </figure>

          {testimonials.length > 1 ? (
            <div className="mt-10 flex items-center gap-2" role="tablist" aria-label="Testimonials">
              {testimonials.map((testimonial, i) => (
                <button
                  key={testimonial.name + i}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`Show testimonial ${i + 1} of ${testimonials.length}`}
                  onClick={() => setActive(i)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    i === active
                      ? "w-6 bg-foreground"
                      : "w-1.5 bg-foreground/20 hover:bg-foreground/40",
                  )}
                />
              ))}
            </div>
          ) : null}
        </Reveal>
      </Container>
    </Section>
  );
}
