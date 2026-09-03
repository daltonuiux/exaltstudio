"use client";

import type LenisType from "lenis";
import { useEffect } from "react";

/**
 * Eased ("inertia") page scrolling.
 *
 * Lenis drives the real window scroll rather than transforming a wrapper, so
 * `position: sticky`, the browser's find-in-page and native scrollbars all
 * keep working — the usual casualties of transform-based smooth scrollers.
 *
 * The library is imported dynamically: it is pure enhancement, so it has no
 * business in the first-load bundle. Until it arrives the page scrolls
 * natively, which is a perfectly good fallback.
 *
 * Renders nothing; it exists only to own the instance lifecycle.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: LenisType | null = null;
    let disposed = false;

    const start = async () => {
      if (lenis || reduced.matches) return;
      const { default: Lenis } = await import("lenis");
      // The effect may have torn down, or the setting flipped, while the
      // chunk was in flight.
      if (disposed || reduced.matches || lenis) return;
      lenis = new Lenis({
        autoRaf: true,
        // Slightly softer than the default: eased, without the page feeling
        // like it is lagging behind the input.
        lerp: 0.09,
        // Route same-page anchors through Lenis so nav links ease too. The
        // offset mirrors the scroll-padding-top the CSS applies, which Lenis
        // bypasses by scrolling imperatively.
        anchors: { offset: -80 },
        // Touch keeps its native momentum: the OS does it better than we can
        // simulate, and syncing it fights the platform.
        syncTouch: false,
      });
    };

    const stop = () => {
      lenis?.destroy();
      lenis = null;
    };

    // Honour the OS setting, and keep honouring it if it changes.
    const apply = () => {
      if (reduced.matches) stop();
      else void start();
    };

    apply();
    reduced.addEventListener("change", apply);

    return () => {
      disposed = true;
      reduced.removeEventListener("change", apply);
      stop();
    };
  }, []);

  return null;
}
