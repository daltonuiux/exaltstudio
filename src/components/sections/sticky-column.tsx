"use client";

import { type ReactNode, useLayoutEffect, useRef } from "react";

import { cn } from "@/lib/utils";

/** Where the column pins when it fits: clears the fixed 64px header with room to spare. */
const TOP = 96;
/** Breathing room kept under the column when it pins by its bottom edge instead. */
const BOTTOM = 24;

/**
 * A column that stays pinned beside a long stack of visuals (lg and up — below
 * that it's an ordinary block).
 *
 * A pinned block taller than the viewport is a trap: its bottom sits out of
 * reach until the stack ends. So `top` is measured, not fixed. If the column
 * fits, it pins at TOP as usual. If it doesn't, `top` drops (going negative for
 * a column taller than the screen) so the column scrolls until its bottom edge
 * is BOTTOM above the bottom of the screen, then pins there — everything is
 * readable, and it still stays put while the visuals scroll.
 *
 * `top` is written straight to the element, not held in React state: it only
 * changes on resize or when the copy's height does, and a render buys nothing.
 * Until the first measurement it's the plain TOP, which is right for the
 * common case and — since sticky offsets never move layout — can't cause a shift.
 */
export function StickyColumn({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      // The lower of the two: TOP when there's room, otherwise whatever puts
      // the bottom edge BOTTOM above the screen's bottom (which can be
      // negative for a column taller than the screen).
      const fit = window.innerHeight - el.offsetHeight - BOTTOM;
      el.style.top = `${Math.min(TOP, fit)}px`;
    };
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div ref={ref} style={{ top: TOP }} className={cn("lg:sticky", className)}>
      {children}
    </div>
  );
}
