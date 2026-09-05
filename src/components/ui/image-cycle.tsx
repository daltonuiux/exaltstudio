"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export type CycleImage = {
  readonly src: string;
  /** Intrinsic size of the committed file, for next/image's srcset math. */
  readonly width: number;
  readonly height: number;
};

type ImageCycleProps = {
  images: readonly CycleImage[];
  /** Shared across every frame — these are different shots of the same
   * product, not different subjects, so one description covers all of them. */
  alt: string;
  /** How long each image stays up before the next crossfades in. */
  intervalMs?: number;
  className?: string;
};

/**
 * Autoplaying crossfade through a case study's product screenshots — same
 * self-rescheduling-timer / reduced-motion / pause-on-hover shape as
 * TestimonialsSection's rotation, so the two autoplay surfaces on the page
 * behave identically.
 *
 * All frames are mounted at once, stacked with absolute positioning, and
 * cross-fade via opacity — unlike Testimonials' remount-on-key approach,
 * that's deliberate here: a remount would drop the outgoing frame instantly
 * rather than dissolving into the next one, and with five frames per case
 * study rather than one quote, only the active image is ever actually
 * decoded/painted at full opacity anyway.
 */
export function ImageCycle({
  images,
  alt,
  intervalMs = 2500,
  className,
}: ImageCycleProps) {
  const [active, setActive] = useState(0);
  const pausedRef = useRef(false);

  const advance = useCallback(() => {
    setActive((i) => (i + 1) % images.length);
  }, [images.length]);

  // setInterval, not a self-rescheduling setTimeout chain: the chain's
  // single point of failure — each tick has to itself call schedule() again
  // or cycling stops forever — was one real bug here. setInterval doesn't
  // have that failure mode: it's one persistent, browser-managed timer, so
  // a single tick lost to throttling (a backgrounded tab, a busy main
  // thread right after a cold first load, browser prerendering ahead of an
  // actual click) doesn't take the rest down with it — it keeps firing on
  // schedule regardless, just possibly throttled while hidden, never
  // permanently blocked.
  //
  // start() unconditionally establishes the interval on mount (bar reduced
  // motion) — it deliberately does NOT also gate on document.hidden. That
  // gate was here in an earlier pass and was itself the remaining bug:
  // skipping start() while hidden made the *only* way cycling could ever
  // begin the visibilitychange listener below firing at some later point —
  // which it won't if the hidden-to-visible transition happens before this
  // effect even attaches it, or by any path that isn't a plain tab-switch.
  // That is strictly worse than never checking hidden at all, since
  // setInterval already tolerates being armed while hidden. hidden is only
  // used below to stop the interval as a battery courtesy while genuinely
  // backgrounded, and restart it on return — a real optimisation now, not
  // the load-bearing recovery path it used to be.
  useEffect(() => {
    if (images.length < 2) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let id: number | undefined;

    const start = () => {
      if (reduced.matches || id !== undefined) return;
      id = window.setInterval(() => {
        if (!pausedRef.current) advance();
      }, intervalMs);
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
  }, [advance, images.length, intervalMs]);

  const pause = useCallback(() => {
    pausedRef.current = true;
  }, []);
  const resume = useCallback(() => {
    pausedRef.current = false;
  }, []);

  return (
    <div
      className={cn("relative w-full overflow-hidden", className)}
      style={{ aspectRatio: "16 / 10" }}
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocusCapture={pause}
      onBlurCapture={resume}
    >
      {images.map((image, i) => (
        <Image
          key={image.src}
          src={image.src}
          alt={alt}
          // Only the frame actually on screen belongs in the accessibility
          // tree — the other four are decorative duplicates of the same
          // description mid-crossfade, not distinct content.
          aria-hidden={i === active ? undefined : true}
          width={image.width}
          height={image.height}
          sizes="(min-width: 1024px) 60vw, 100vw"
          // First frame only: it's what's actually visible on load, so it's
          // the one worth prioritising if this card is above the fold.
          priority={i === 0}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out",
            i === active ? "opacity-100" : "opacity-0",
          )}
        />
      ))}
    </div>
  );
}
