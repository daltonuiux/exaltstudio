"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Case Studies", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Services", href: "#services" },
  { label: "Selected Work", href: "#work-samples" },
];

/** Matches the header's own h-16. */
const HEADER_HEIGHT = 64;

export function SiteHeader() {
  // `scrolled`: past the hero, so on a white ground — swaps the logo, nav
  // and button to their dark-on-white styling.
  // `hidden`: slid out of view because the user is currently scrolling
  // down; only ever true once `scrolled` is (the hero state never hides),
  // and forced back to false the moment they reach the very top.
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const lastY = useRef(0);
  const ticking = useRef(false);

  // useLayoutEffect, not useEffect: on a reload that lands mid-scroll (back/
  // forward navigation, scroll restoration), this settles the real state
  // before the browser paints, rather than the hero look flashing for a
  // frame first.
  useLayoutEffect(() => {
    lastY.current = window.scrollY;
    const heroRegion = document.getElementById("hero-region");

    // Direct classList toggling would dodge the re-render entirely, same as
    // Reveal/ScrollRevealText — but this state also drives real prop
    // changes (which logo file, which Button variant), so it has to be
    // React state either way. What actually costs a render is scroll
    // *position*; scroll *direction reversals* (and the one-time hero
    // exit) are what we care about here, and those are inherently rare
    // relative to scroll events, so gating every setState behind an
    // equality check keeps re-renders down to one per genuine transition
    // rather than one per scroll frame.
    const measure = () => {
      ticking.current = false;
      const y = window.scrollY;

      // Switches the instant the hero's own bottom edge passes behind the
      // header, not at some arbitrary scroll offset — tying it to a fixed
      // pixel count (e.g. "8px scrolled") meant the header turned solid
      // white while still floating most of the way up the (much taller)
      // hero image, which read as a mistimed, un-smooth jump cut. Once the
      // hero's edge is at or above the header's own bottom, the header's
      // full band sits over the section that follows, so going opaque
      // exactly then is both correct and the earliest it can be.
      const heroBottom = heroRegion?.getBoundingClientRect().bottom ?? -1;
      const isScrolled = heroBottom <= HEADER_HEIGHT;
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

  // Closing the mobile menu: three independent reasons, only wired up while
  // it's actually open. Scroll and Escape are the two a user would expect;
  // the resize case is for a device rotation or window resize crossing lg
  // while the menu happens to be open, which would otherwise leave `menuOpen`
  // true (and its scroll-lock-adjacent effects below moot but stale) under
  // the desktop nav that just appeared over it.
  useEffect(() => {
    if (!menuOpen) return;

    const close = () => setMenuOpen(false);
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) close();
    };

    window.addEventListener("scroll", close, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", close);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

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

        {/* Desktop only — below lg this collapses into the toggle + panel
            further down, which reuses this exact same navItems list. */}
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

        <div className="flex shrink-0 items-center gap-2">
          <Button
            href={siteConfig.bookingUrl}
            target="_blank"
            rel="noreferrer noopener"
            variant={scrolled ? "solid" : "inverse"}
            size="sm"
          >
            Book call
          </Button>

          {/* Toggle for the mobile nav panel below — plain button (not the
              shared Button component) since it's an icon-only square, not a
              pill: Button's own h/px sizing is a single string per variant,
              and overriding part of it via className risks losing that
              fight depending on Tailwind's generated stylesheet order (bit
              this codebase's hover-fill/Reveal transitions already learned
              the hard way), not JSX class order. */}
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-200 lg:hidden",
              scrolled
                ? "text-foreground hover:bg-foreground/8"
                : "text-background hover:bg-background/10",
            )}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
              {menuOpen ? (
                <path
                  d="M5 5l10 10M15 5 5 15"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M3 6h14M3 10h14M3 14h14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </Container>

      {/* Mobile nav panel — a solid-ground dropdown regardless of the header's
          own scrolled/transparent state, since it can sit over arbitrary page
          content (the hero photo included) rather than just the header's own
          64px band. `hidden` (not just opacity/height) below lg — the toggle
          that opens it doesn't exist there either, so this can never actually
          be open at that breakpoint, but keeps it out of tab order and the
          a11y tree regardless of `menuOpen`'s value if a resize ever raced it. */}
      <nav
        id="mobile-nav"
        aria-label="Mobile"
        hidden={!menuOpen}
        className="absolute inset-x-0 top-16 flex flex-col border-b border-foreground/12 bg-background p-2 lg:hidden"
      >
        {navItems.map((item) => (
          <Button
            key={item.label}
            href={item.href}
            variant="ghost"
            size="md"
            onClick={() => setMenuOpen(false)}
            // !justify-start: Button's own base classes already set
            // justify-center for the same CSS property, and this codebase
            // has already been burned once (OfferingsSection's hover fill)
            // trusting a later same-property class in the *source* string to
            // win — Tailwind v4 resolves that by each utility's position in
            // the *generated* stylesheet instead. `!` forces it unambiguously
            // rather than hoping cn()'s ordering happens to cooperate.
            className="w-full !justify-start font-normal"
          >
            {item.label}
          </Button>
        ))}
      </nav>
    </header>
  );
}
