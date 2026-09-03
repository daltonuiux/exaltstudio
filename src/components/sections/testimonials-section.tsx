"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { Container } from "@/components/ui/container";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { testimonials } from "@/lib/testimonials";
import { cn } from "@/lib/utils";

/** How long each testimonial stays up before auto-advancing. */
const INTERVAL_MS = 7000;

export function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const pausedRef = useRef(false);

  const advance = useCallback(() => {
    setActive((i) => (i + 1) % testimonials.length);
  }, []);

  // A fresh timeout scheduled on every index change — rather than one
  // long-running setInterval — so a manual dot click always buys a full
  // interval before the next auto-advance, instead of firing early.
  useEffect(() => {
    if (testimonials.length < 2) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const schedule = () => {
      if (reduced.matches || pausedRef.current) return;
      return window.setTimeout(advance, INTERVAL_MS);
    };

    let id = schedule();
    // If motion preference flips mid-visit, stop or (re)start accordingly.
    const onChange = () => {
      window.clearTimeout(id);
      id = schedule();
    };
    reduced.addEventListener("change", onChange);

    return () => {
      reduced.removeEventListener("change", onChange);
      window.clearTimeout(id);
    };
  }, [active, advance]);

  const pause = useCallback(() => {
    pausedRef.current = true;
  }, []);
  const resume = useCallback(() => {
    pausedRef.current = false;
  }, []);

  const current = testimonials[active];

  return (
    <Section
      id="testimonials"
      spacing="lg"
      aria-labelledby="testimonials-heading"
      className="border-t border-foreground/12"
    >
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
            <blockquote className="max-w-[720px]">
              <p className="text-display font-medium text-balance">
                &ldquo;{current.quote}&rdquo;
              </p>
            </blockquote>

            <figcaption className="mt-8 flex flex-col items-center gap-3">
              <ImagePlaceholder
                ratio="1 / 1"
                className="w-14 rounded-lg"
              />
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
