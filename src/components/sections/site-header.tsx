import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

/**
 * Nav labels are still the placeholder "Menu" from the Figma frame.
 * Replace once the real navigation is designed.
 */
const navItems = [
  { label: "Menu", href: "#work" },
  { label: "Menu", href: "#services" },
  { label: "Menu", href: "#about" },
  { label: "Menu", href: "#process" },
  { label: "Menu", href: "#contact" },
];

export function SiteHeader() {
  return (
    <header className="w-full py-4">
      <Container width="full" className="flex items-center justify-between gap-4">
        <Link href="/" aria-label="Exalt Studio — home" className="shrink-0">
          <Image
            src="/images/logos/exalt-studio.svg"
            alt="Exalt Studio"
            width={152}
            height={24}
            priority
          />
        </Link>

        {/* Hidden below lg — the mobile navigation has not been designed yet. */}
        <nav aria-label="Main" className="hidden items-center gap-2 lg:flex">
          {navItems.map((item, i) => (
            <Button key={i} href={item.href} variant="ghost" size="sm" className="font-normal">
              {item.label}
            </Button>
          ))}
        </nav>

        <Button href="#contact" size="sm" className="shrink-0">
          Book call
        </Button>
      </Container>
    </header>
  );
}
