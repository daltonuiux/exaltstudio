"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { Container } from "@/components/ui/container";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { testimonials } from "@/lib/testimonials";
import { cn } from "@/lib/utils";

/** How long each testimonial stays up before auto-advancing. */
const INTERVAL_MS = 4000;

/**
 * Tallest the quote gets at each breakpoint, measured by rendering the
 * longest of the three real testimonials (Jake Wells') at a sweep of
 * viewport widths — height isn't monotonic with width here, since the box
 * widens (fewer lines) while the fluid text-3xl font is simultaneously
 * growing (more lines), so it dips around 768px before climbing again as
 * the font keeps scaling up past it. Applied as a min-height on the
 * blockquote so switching to a shorter quote doesn't shrink the section
 * and shunt everything below it up the page.
 */
const QUOTE_MIN_HEIGHT = "min-h-[620px] sm:min-h-[380px] md:min-h-[390px]";

export function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const pausedRef = useRef(false);

  const advance = useCallback(() => {
    setActive((i) => (i + 1) % testimonials.length);
  }, []);

  // A single self-rescheduling timer, not one setTimeout re-armed on every
  // `active` change: that version's callback was `advance` itself, so a
  // timeout already in flight when the user hovered (paused) fired anyway —
  // pausing didn't actually stop the pending advance, just the next one.
  // Checking pausedRef inside the tick (fired every INTERVAL_MS regardless)
  // means a paused tick is genuinely skipped, and the loop always keeps
  // rescheduling itself so it can't stall out.
  useEffect(() => {
    if (testimonials.length < 2) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let id: number | undefined;

    const schedule = () => {
      if (reduced.matches) return;
      id = window.setTimeout(tick, INTERVAL_MS);
    };
    const tick = () => {
      if (!pausedRef.current) advance();
      schedule();
    };

    schedule();
    // If motion preference flips mid-visit, stop or (re)start accordingly.
    const onChange = () => {
      window.clearTimeout(id);
      schedule();
    };
    reduced.addEventListener("change", onChange);

    return () => {
      reduced.removeEventListener("change", onChange);
      window.clearTimeout(id);
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
        <div
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
              <p className="text-3xl font-medium text-balance">
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
        </div>
      </Container>
    </Section>
  );
}
