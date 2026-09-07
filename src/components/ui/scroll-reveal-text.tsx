"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

/** Paragraph top at this fraction of the viewport height => reveal begins. */
const START = 0.9;
/** Paragraph bottom at this fraction => reveal is complete. */
const END = 0.25;
/** How many words the leading edge is spread over. Higher = softer. */
const FEATHER = 5;

type ScrollRevealTextProps = {
  text: string;
  className?: string;
};

/**
 * Reveals a sentence word by word as the section scrolls through the viewport.
 *
 * Scroll progress is written to a single CSS custom property on the paragraph;
 * each word derives its own opacity from that in CSS, using its index. So the
 * whole effect costs one style write per update and zero React re-renders,
 * however many words there are.
 *
 * Updates are driven by scroll events (rAF-throttled to at most one per
 * frame), not an unconditional per-frame rAF loop — this used to
 * getBoundingClientRect() the paragraph on every single animation frame for
 * as long as it was anywhere near the viewport (the IntersectionObserver's
 * rootMargin gives it a wide window either side), which is a forced
 * synchronous layout read repeated up to 60+ times a second regardless of
 * whether the page was even moving. The value only ever changes in response
 * to scrollY changing, so there's nothing to compute on a frame nothing
 * scrolled. remeasure() pays that one layout cost just once per intersection
 * (when the section starts being tracked, and again on resize, since the
 * cached position only stays valid across scroll, not layout changes);
 * every frame in between reads window.scrollY instead, which never forces
 * layout.
 *
 * Under prefers-reduced-motion the paragraph is simply set to fully revealed
 * and no scroll work happens at all.
 */
export function ScrollRevealText({ text, className }: ScrollRevealTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let ticking = false;
    // Document-relative (not viewport-relative) position — stays valid as
    // the page scrolls, only goes stale on an actual layout change.
    let top = 0;
    let height = 0;

    const remeasure = () => {
      const rect = el.getBoundingClientRect();
      top = rect.top + window.scrollY;
      height = rect.height;
    };

    const measure = () => {
      ticking = false;
      const vh = window.innerHeight;
      const viewportTop = top - window.scrollY;
      const span = height + vh * (START - END);
      const progress = (vh * START - viewportTop) / span;
      el.style.setProperty(
        "--reveal",
        String(Math.min(1, Math.max(0, progress))),
      );
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(measure);
    };
    const onResize = () => {
      remeasure();
      measure();
    };

    const apply = () => {
      if (reduced.matches) {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onResize);
        observer.unobserve(el);
        el.style.setProperty("--reveal", "1");
        return;
      }
      // Deliberately do NOT measure here. The paragraph stays at the CSS
      // default of fully revealed until the observer confirms it is actually
      // driving the effect, so if IntersectionObserver never reports (or the
      // effect is torn down early) the text is legible rather than stuck dim.
      observer.observe(el);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          remeasure();
          measure();
          window.addEventListener("scroll", onScroll, { passive: true });
          window.addEventListener("resize", onResize);
        } else {
          window.removeEventListener("scroll", onScroll);
          window.removeEventListener("resize", onResize);
          // Settle on the correct end state rather than freezing mid-reveal
          // — remeasure first in case a resize happened while this was the
          // last thing tracking this element's position.
          remeasure();
          measure();
        }
      },
      { rootMargin: "20% 0px" },
    );

    apply();
    reduced.addEventListener("change", apply);

    return () => {
      reduced.removeEventListener("change", apply);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <p
      ref={ref}
      data-reveal-text
      className={cn(className)}
      style={
        {
          "--reveal-words": words.length,
          "--reveal-feather": FEATHER,
        } as CSSProperties
      }
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} style={{ "--reveal-index": i } as CSSProperties}>
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}
