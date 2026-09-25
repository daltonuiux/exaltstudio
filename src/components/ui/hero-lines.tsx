"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

// three.js is ~130KB gzipped: it's loaded as its own chunk, only in the browser,
// and only after the page has finished loading (below), so it never competes
// with the hero's own paint.
const FloatingLines = dynamic(() => import("@/components/ui/floating-lines"), {
  ssr: false,
});

// Module-level constants, not inline literals: FloatingLines rebuilds its whole
// WebGL scene whenever a prop's identity changes, so these must be stable.
const WAVES: ("top" | "middle" | "bottom")[] = ["top", "middle", "bottom"];
const GRADIENT = ["#ffffff", "#b9c8ff", "#e2c9ff"];
// Steers the middle wave into the empty sky above the headline. Left at its
// default (y: 0) it runs straight through the headline and paragraph and blows
// them out. Values chosen by rendering variants and stepping through a full
// animation cycle: text and buttons stay clear throughout.
const MIDDLE_WAVE = { x: 5, y: 0.8, rotate: 0.2 };

/**
 * Animated lines over the hero's sky. Sits between the sky image and the hero
 * content, and is `screen`-blended, so the canvas's black is invisible and only
 * the lines glow onto the sky.
 *
 * Not rendered at all for visitors who ask for reduced motion, and not started
 * until the window's load event plus an idle moment, so it can't affect the LCP.
 */
export function HeroLines() {
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    const start = () => {
      if (!cancelled) setEnabled(true);
    };
    const schedule = () => {
      // Safari has no requestIdleCallback.
      if (typeof window.requestIdleCallback === "function") {
        window.requestIdleCallback(start, { timeout: 2000 });
      } else {
        globalThis.setTimeout(start, 500);
      }
    };

    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener("load", schedule);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className={cn(
        // mix-blend-screen lives on THIS element, not on the canvas's own
        // container: an absolutely-positioned element with a z-index is its own
        // stacking context, and a blend mode inside it can only blend with what
        // is inside it (nothing), not with the sky beneath. Here it's a direct
        // child of the hero's isolated stacking context, so it blends with the sky.
        // The mask fades the effect out under the fixed header (64px), so the
        // lines emerge from beneath it instead of washing out the logo and nav
        // links when they sweep past.
        "pointer-events-none absolute inset-0 z-[1] mix-blend-screen transition-opacity duration-1000 ease-out [mask-image:linear-gradient(to_bottom,transparent_0,transparent_64px,#000_190px)]",
        ready ? "opacity-85" : "opacity-0",
      )}
    >
      <FloatingLines
        enabledWaves={WAVES}
        linesGradient={GRADIENT}
        middleWavePosition={MIDDLE_WAVE}
        lineCount={5}
        lineDistance={5}
        animationSpeed={1}
        interactive
        parallax
        mixBlendMode="normal"
        onReady={() => setReady(true)}
      />
    </div>
  );
}
