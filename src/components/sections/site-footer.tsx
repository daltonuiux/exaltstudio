import Link from "next/link";

import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { siteConfig } from "@/lib/site";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { label: "X", href: "https://x.com" },
  { label: "LinkedIn", href: "https://www.linkedin.com" },
];

const linkClass =
  "text-sm text-foreground/66 transition-colors duration-200 hover:text-foreground";

export function SiteFooter() {
  return (
    <footer className="border-t border-foreground/12">
      <Container width="full" className="py-12 lg:py-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-12 lg:gap-10">
          <div className="col-span-2 lg:col-span-4">
            <p className="text-base font-semibold">{siteConfig.name}</p>
            <p className="mt-2 max-w-[32ch] text-sm text-foreground/66">
              Product design for B2B AI &amp; SaaS.
            </p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-2 lg:col-start-6">
            <SectionLabel>Sections</SectionLabel>
            <ul className="mt-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2 lg:col-start-8">
            <SectionLabel>Social</SectionLabel>
            <ul className="mt-4 flex flex-col gap-2">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className={linkClass}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-3 lg:col-start-10">
            <SectionLabel>Contact</SectionLabel>
            <p className="mt-4">
              <a href={`mailto:${siteConfig.email}`} className={linkClass}>
                {siteConfig.email}
              </a>
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-foreground/12 pt-6 lg:mt-16">
          <SectionLabel>&copy; 2026 {siteConfig.name}</SectionLabel>
        </div>
      </Container>
    </footer>
  );
}
