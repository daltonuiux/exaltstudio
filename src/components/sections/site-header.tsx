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
          {navItems.map((item) => (
            <Button key={item.label} href={item.href} variant="ghost" size="sm" className="font-normal">
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
