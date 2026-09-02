"use client";

import type { CSSProperties } from "react";
import { useCallback, useRef } from "react";

import { LogoImage } from "@/components/ui/logo-image";
import type { Logo } from "@/lib/logos";
import { cn } from "@/lib/utils";

type LogoMarqueeProps = {
  logos: readonly Logo[];
  /** Seconds for one complete pass. */
  duration?: number;
  /** Playback rate while pointer is over / focus is inside. 1 = full speed. */
  hoverRate?: number;
  /** Space between logos, in px. Figma uses 48. */
  gap?: number;
  /** Width of the opacity fade at each edge. */
  fade?: string;
  className?: string;
};

/**
 * Infinitely looping logo row with an opacity fade at both edges.
 *
 * The scroll itself is a pure CSS animation, so it runs before hydration and
 * still runs if JS never arrives. The only thing JS adds is the hover
 * slow-down: `updatePlaybackRate` retimes the running animation smoothly,
 * whereas swapping `animation-duration` in CSS recomputes progress as
 * elapsed/duration and visibly jumps the track backwards.
 */
export function LogoMarquee({
  logos,
  duration = 60,
  hoverRate = 0.25,
  gap = 48,
  fade = "8%",
  className,
}: LogoMarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const setRate = useCallback((rate: number) => {
    const track = trackRef.current;
    if (!track) return;
    for (const animation of track.getAnimations()) {
      animation.updatePlaybackRate(rate);
    }
  }, []);

  const slow = useCallback(() => setRate(hoverRate), [setRate, hoverRate]);
  const resume = useCallback(() => setRate(1), [setRate]);

  return (
    <div
      className={cn("relative", className)}
      onMouseEnter={slow}
      onMouseLeave={resume}
      // Keyboard users tabbing through the row get the same slow-down.
      onFocusCapture={slow}
      onBlurCapture={resume}
    >
      <div
        data-marquee-viewport
        className="marquee-fade overflow-hidden"
        style={{ "--marquee-fade": fade } as CSSProperties}
      >
        <div
          ref={trackRef}
          data-marquee-track
          className="flex w-max animate-marquee will-change-transform"
          style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
        >
          {/* Two identical copies. Each logo carries its gap as a trailing
              margin, so the track is exactly two equal periods and the
              -50% keyframe lands seamlessly on the start of the second. */}
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              className="flex shrink-0 items-center"
              // The duplicate exists only to make the loop seamless.
              aria-hidden={copy === 1 || undefined}
            >
              {logos.map((logo) => (
                <li
                  key={logo.name}
                  className="flex shrink-0 items-center"
                  style={{ marginRight: gap }}
                >
                  <LogoImage logo={logo} />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
