"use client";

import type LenisType from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";

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
  const lenisRef = useRef<LenisType | null>(null);
  const pathname = usePathname();
  const previousPathname = useRef(pathname);

  // Land at the top of every new page. Next resets scroll on navigation
  // itself, but Lenis keeps its own target: click a link while the page is
  // still gliding from a wheel scroll and Lenis carries on easing toward
  // the OLD page's position, dropping the new page mid-way down (a case
  // study opening at its fourth screenshot instead of its heading).
  // scrollTo(0, immediate) resets Lenis's internal position and cancels the
  // glide; the native scrollTo covers the no-Lenis case (reduced motion,
  // touch). useLayoutEffect so it lands before the first paint of the new
  // page rather than flashing at the old offset. Hash navigations are left
  // alone — those are the anchors' job.
  useLayoutEffect(() => {
    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;
    if (window.location.hash) return;
    lenisRef.current?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

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
        // offset mirrors the scroll-padding-top the CSS applies (64px —
        // SiteHeader's own fixed height), which Lenis bypasses by scrolling
        // imperatively.
        anchors: { offset: -64 },
        // Touch keeps its native momentum: the OS does it better than we can
        // simulate, and syncing it fights the platform.
        syncTouch: false,
      });
      lenisRef.current = lenis;
    };

    const stop = () => {
      lenis?.destroy();
      lenis = null;
      lenisRef.current = null;
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
