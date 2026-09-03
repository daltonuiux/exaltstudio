import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

const navItems = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function SiteHeader() {
  return (
    // relative z-10 so the hero sky, which extends up behind it, stays below.
    <header className="relative z-10 h-16 w-full">
      <Container width="full" className="flex h-full items-center justify-between gap-4">
        <Link href="/" aria-label="Exalt Studio — home" className="shrink-0">
          <Image
            src="/images/logos/exalt-studio-white.svg"
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
              variant="inverse-ghost"
              size="sm"
              className="font-normal"
            >
              {item.label}
            </Button>
          ))}
        </nav>

        <Button href="#contact" variant="inverse" size="sm" className="shrink-0">
          Book call
        </Button>
      </Container>
    </header>
  );
}
