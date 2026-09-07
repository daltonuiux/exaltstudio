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
  // Two representations of the same flag, deliberately: pausedRef is what
  // the interval tick below actually reads (a ref, not state, so toggling
  // it doesn't force the effect to tear down and re-subscribe — see the
  // comment on that effect); `paused` state exists purely to drive the
  // button's icon/label, which does need a render. togglePaused keeps them
  // in lockstep in the one place either changes.
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);

  const advance = useCallback(() => {
    setActive((i) => (i + 1) % testimonials.length);
  }, []);

  const togglePaused = useCallback(() => {
    setPaused((p) => {
      const next = !p;
      pausedRef.current = next;
      return next;
    });
  }, []);

  // setInterval, not a self-rescheduling setTimeout chain — that version's
  // single point of failure (each tick has to itself call schedule() again
  // or rotation stops forever) was one real bug here, shared with
  // ImageCycle's identical pattern. setInterval doesn't have that failure
  // mode: it's one persistent, browser-managed timer, so a single tick lost
  // to throttling (a backgrounded tab, a busy main thread right after a
  // cold first load, browser prerendering ahead of an actual click) doesn't
  // take the rest down with it — it keeps firing on schedule regardless,
  // just possibly throttled while hidden, never permanently blocked.
  //
  // start() unconditionally establishes the interval on mount (bar reduced
  // motion) — it deliberately does NOT also gate on document.hidden. That
  // gate was here in an earlier pass and was itself the remaining bug:
  // skipping start() while hidden made the *only* way rotation could ever
  // begin the visibilitychange listener below firing at some later point —
  // which it won't if the hidden-to-visible transition happens before this
  // effect even attaches it, or by any path that isn't a plain tab-switch.
  // That is strictly worse than never checking hidden at all, since
  // setInterval already tolerates being armed while hidden. hidden is only
  // used below to stop the interval as a battery courtesy while genuinely
  // backgrounded, and restart it on return — a real optimisation now, not
  // the load-bearing recovery path it used to be.
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
      if (reduced.matches || id !== undefined) return;
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

  const current = testimonials[active];

  return (
    <Section id="testimonials" spacing="lg" aria-labelledby="testimonials-heading">
      <Container width="full">
        {/* No hover/focus-triggered pause here any more — that used to
            cover this entire block (quote text included), so simply
            resting the cursor anywhere near a testimonial while reading it
            silently stopped the rotation with no visible sign why, and
            resuming only on the next scheduled tick made the real gap
            between advances stretch unpredictably past INTERVAL_MS. It also
            never did anything for touch, which has no hover state at all.
            Pausing is a deliberate act now: the button below, always
            visible, always the same control on every input method. */}
        <Reveal className="flex flex-col items-center text-center">
          <SectionLabel id="testimonials-heading">Testimonials</SectionLabel>

          {/* Keying on the active index remounts this on every change, which
              retriggers the CSS fade-in automatically — no JS transition
              timing needed. Only the current testimonial is ever in the DOM,
              so screen readers get one clean quote rather than several
              stacked, opacity-hidden ones. */}
          <figure
            key={active}
            id="testimonial-content"
            className="mt-8 flex flex-col items-center animate-fade-in"
          >
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
            <div className="mt-10 flex items-center gap-3">
              <div className="flex items-center gap-2" role="tablist" aria-label="Testimonials">
                {testimonials.map((testimonial, i) => (
                  <button
                    key={testimonial.name + i}
                    type="button"
                    role="tab"
                    aria-selected={i === active}
                    aria-label={`Show testimonial ${i + 1} of ${testimonials.length}`}
                    onClick={() => {
                      // Jumping to a specific testimonial is a deliberate
                      // choice — letting autoplay override it a few seconds
                      // later would undo the thing the user just did.
                      pausedRef.current = true;
                      setPaused(true);
                      setActive(i);
                    }}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300",
                      i === active
                        ? "w-6 bg-foreground"
                        : "w-1.5 bg-foreground/20 hover:bg-foreground/40",
                    )}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={togglePaused}
                aria-pressed={paused}
                aria-controls="testimonial-content"
                aria-label={paused ? "Resume testimonials" : "Pause testimonials"}
                className="flex h-6 w-6 items-center justify-center rounded-full text-foreground/50 transition-colors duration-200 hover:bg-foreground/8 hover:text-foreground"
              >
                {paused ? (
                  // Play: a filled triangle, off-centre by half a pixel so
                  // its own visual weight looks centred in the circle —
                  // true geometric centring reads as left-heavy for a
                  // triangle pointing right.
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                    <path d="M1 0.5v9l8-4.5-8-4.5Z" fill="currentColor" />
                  </svg>
                ) : (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                    <rect x="1" y="0.5" width="2.5" height="9" fill="currentColor" />
                    <rect x="6.5" y="0.5" width="2.5" height="9" fill="currentColor" />
                  </svg>
                )}
              </button>
            </div>
          ) : null}
        </Reveal>
      </Container>
    </Section>
  );
}
