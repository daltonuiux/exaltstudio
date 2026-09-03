"use client";

import type {
  ComponentPropsWithoutRef,
  CSSProperties,
  ElementType,
  ReactNode,
} from "react";
import { useLayoutEffect, useRef } from "react";

import { cn } from "@/lib/utils";

/** Applied/removed via classList directly (see below), not React state —
 * both classes need to exist as literal strings somewhere in scanned
 * source for Tailwind to generate them, which this satisfies on its own. */
const HIDDEN_CLASSES = ["opacity-0", "translate-y-6"] as const;

type RevealProps<T extends ElementType> = {
  /** Element to render. Defaults to `div`. Set this to whatever the caller
   * would otherwise have rendered (`li`, `details`, `article`…) rather than
   * wrapping it in an extra div — some of these carry layout the wrapped
   * element depends on (a CSS Grid item's own column-template, a `<summary>`
   * that has to stay `<details>`'s direct child), which an extra div would
   * quietly break. */
  as?: T;
  className?: string;
  children?: ReactNode;
  /** Stagger for siblings that enter the viewport together (a grid row) —
   * irrelevant for a vertical stack, which staggers naturally as each item
   * crosses into view at its own scroll position. */
  delayMs?: number;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

/**
 * Fades a block up into view the first time it scrolls into the viewport —
 * a one-shot reveal, not a repeating one.
 *
 * Starts fully visible, same idea as ScrollRevealText, and for the same
 * reason: content stays legible without JavaScript or before hydration.
 * Also like ScrollRevealText, the toggle is a direct DOM write (classList),
 * not React state — a re-render buys nothing here and effects that call
 * setState synchronously trigger an extra cascading render. useLayoutEffect
 * (not useEffect) so the hidden class lands before the browser paints —
 * otherwise the visible state would flash for a frame first.
 */
export function Reveal<T extends ElementType = "div">({
  as,
  className,
  children,
  delayMs,
  ...props
}: RevealProps<T>) {
  const Component = (as ?? "div") as ElementType;
  // A generic `as` can't be typed precisely against a specific DOM element,
  // same trade-off Section/Container make.
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    el.classList.add(...HIDDEN_CLASSES);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.remove(...HIDDEN_CLASSES);
          observer.disconnect();
        }
      },
      // Fires a little before the element's bottom would clear the fold,
      // so the reveal lands as it's scrolling in rather than after.
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  // Spread first so an explicit `style` a caller passes through `...props`
  // merges with the delay rather than silently replacing it.
  const { style, ...rest } = props as { style?: CSSProperties };

  return (
    <Component
      ref={ref}
      data-reveal
      // Deliberately no baseline opacity-100/translate-y-0 here: Tailwind's
      // cascade is resolved by each utility's position in the generated
      // stylesheet, not by where a class sits in this attribute string, so
      // a permanent "opacity-100" would fight (and, empirically, beat)
      // "opacity-0" the instant classList adds it below. Visible is simply
      // the absence of the hidden classes — opacity 1 / no transform is the
      // element's default anyway.
      className={cn(
        // Tailwind v4's translate-y-* utilities animate the CSS `translate`
        // property, not `transform` — transitioning `transform` here would
        // leave the y-offset snapping instantly instead of easing.
        "transition-[opacity,translate] duration-700 ease-out",
        className,
      )}
      style={{ ...style, ...(delayMs ? { transitionDelay: `${delayMs}ms` } : null) }}
      {...rest}
    >
      {children}
    </Component>
  );
}
