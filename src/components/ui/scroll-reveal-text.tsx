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
 * whole effect costs one style write per frame and zero React re-renders,
 * however many words there are.
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
    let frame = 0;
    let running = false;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const span = rect.height + vh * (START - END);
      const progress = (vh * START - rect.top) / span;
      el.style.setProperty(
        "--reveal",
        String(Math.min(1, Math.max(0, progress))),
      );
    };

    const loop = () => {
      measure();
      if (running) frame = requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    const apply = () => {
      if (reduced.matches) {
        stop();
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
          if (!running) {
            running = true;
            frame = requestAnimationFrame(loop);
          }
        } else {
          stop();
          // Settle on the correct end state rather than freezing mid-reveal.
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
      stop();
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
