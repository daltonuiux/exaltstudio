"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

/** Scroll offset past which the header leaves its transparent hero state. */
const SCROLLED_AT = 8;

export function SiteHeader() {
  // `scrolled`: past the hero, so on a white ground — swaps the logo, nav
  // and button to their dark-on-white styling.
  // `hidden`: slid out of view because the user is currently scrolling
  // down; only ever true once `scrolled` is (the hero state never hides),
  // and forced back to false the moment they reach the very top.
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  const lastY = useRef(0);
  const ticking = useRef(false);

  // useLayoutEffect, not useEffect: on a reload that lands mid-scroll (back/
  // forward navigation, scroll restoration), this settles the real state
  // before the browser paints, rather than the hero look flashing for a
  // frame first.
  useLayoutEffect(() => {
    lastY.current = window.scrollY;

    // Direct classList toggling would dodge the re-render entirely, same as
    // Reveal/ScrollRevealText — but this state also drives real prop
    // changes (which logo file, which Button variant), so it has to be
    // React state either way. What actually costs a render is scroll
    // *position*; scroll *direction reversals* are what we care about here,
    // and those are inherently rare relative to scroll events, so gating
    // every setState behind an equality check keeps re-renders down to one
    // per genuine transition rather than one per scroll frame.
    const measure = () => {
      ticking.current = false;
      const y = window.scrollY;
      const isScrolled = y > SCROLLED_AT;
      const goingDown = y > lastY.current;
      lastY.current = y;

      setScrolled((prev) => (prev === isScrolled ? prev : isScrolled));
      setHidden((prev) => {
        const next = isScrolled && goingDown;
        return prev === next ? prev : next;
      });
    };

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        // translate, not transform: Tailwind v4's -translate-y-full sets the
        // CSS `translate` property, not `transform` — learned the hard way
        // on Reveal, so it's transition-[translate,...] here from the start.
        "fixed inset-x-0 top-0 z-50 h-16 w-full border-b transition-[translate,background-color,border-color] duration-300 ease-out",
        scrolled
          ? "border-foreground/12 bg-background"
          : "border-transparent bg-transparent",
        hidden && "-translate-y-full",
      )}
    >
      <Container width="full" className="flex h-full items-center justify-between gap-4">
        <Link href="/" aria-label="Exalt Studio — home" className="shrink-0">
          <Image
            src={
              scrolled
                ? "/images/logos/exalt-studio.svg"
                : "/images/logos/exalt-studio-white.svg"
            }
            alt="Exalt Studio"
            width={152}
            height={24}
            priority
          />
        </Link>

        {/* Hidden below lg — the mobile navigation has not been designed yet. */}
        <nav aria-label="Main" className="hidden items-center gap-2 lg:flex">
          {navItems.map((item) => (
            <Button
              key={item.label}
              href={item.href}
              variant={scrolled ? "ghost" : "inverse-ghost"}
              size="sm"
              className="font-normal"
            >
              {item.label}
            </Button>
          ))}
        </nav>

        <Button
          href="#contact"
          variant={scrolled ? "solid" : "inverse"}
          size="sm"
          className="shrink-0"
        >
          Book call
        </Button>
      </Container>
    </header>
  );
}
