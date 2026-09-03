import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { GoodFirmsBadge } from "@/components/ui/goodfirms-badge";
import { SectionLabel } from "@/components/ui/section-label";
import { siteConfig } from "@/lib/site";

type FooterLink = { label: string; href: string; external?: boolean };

const navGroups: { label: string; width?: string; links: FooterLink[] }[] = [
  {
    label: "Menu",
    links: [
      { label: "Case Studies", href: "#work" },
      { label: "Services", href: "#services" },
      { label: "Process", href: "#process" },
      { label: "Selected Work", href: "#work-samples" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    label: "Social",
    links: [
      { label: "X", href: "https://x.com/exaltxstudio", external: true },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/exalt-studio",
        external: true,
      },
      { label: "Dribbble", href: "https://dribbble.com/exaltstudio", external: true },
    ],
  },
  {
    label: "Press",
    links: [
      {
        label: "Dribbble Trendsetter",
        href: "https://dribbble.com/resources/agencies/trendsetter-product-design-agencies#exalt-studio",
        external: true,
      },
    ],
  },
  {
    label: "Contact",
    links: [
      { label: siteConfig.email, href: `mailto:${siteConfig.email}` },
      { label: "ellie@exaltstudio.co", href: "mailto:ellie@exaltstudio.co" },
    ],
  },
];

/* Figma: Asta Sans Medium 14/20, full-white now the footer sits on the
   shared sky rather than the page's white background. */
const linkClass =
  "text-sm leading-5 font-medium text-background transition-opacity duration-200 hover:opacity-60";

export function SiteFooter() {
  return (
    <footer>
      <Container
        width="full"
        className="flex flex-col gap-16 pb-10 md:gap-24 lg:gap-[160px]"
      >
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          {/* Brand column */}
          <div className="flex flex-col gap-6 lg:w-[509px] lg:shrink-0">
            <Link href="/" aria-label="Exalt Studio — home" className="shrink-0">
              <Image
                src="/images/logos/exalt-studio-white.svg"
                alt="Exalt Studio"
                width={203}
                height={32}
              />
            </Link>

            <p className="text-base leading-6 text-background">
              Your product works.
              <br />
              Now it needs to scale.
            </p>

            <ul className="flex flex-wrap items-center gap-5">
              <li className="flex shrink-0 items-center">
                {/* eslint-disable-next-line @next/next/no-img-element -- static SVG badge at a fixed size */}
                <img
                  src="/images/logos/award-dribbble-select.svg"
                  alt="Dribbble Select — Top Product Company"
                  width={55}
                  height={55}
                  decoding="async"
                />
              </li>
              <li className="flex shrink-0 items-center">
                <GoodFirmsBadge />
              </li>
            </ul>
          </div>

          {/* Nav groups */}
          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:flex lg:gap-10"
          >
            {navGroups.map((group, i) => (
              <div
                key={group.label}
                className={
                  "flex flex-col gap-6 " +
                  (i < navGroups.length - 1 ? "lg:w-[180px]" : "")
                }
              >
                <SectionLabel className="text-background/75">
                  {group.label}
                </SectionLabel>
                <ul className="flex flex-col gap-1">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      {link.external ? (
                        <a
                          href={link.href}
                          className={linkClass}
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link href={link.href} className={linkClass}>
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-10">
          <hr className="border-background/24" />

          {/* Figma right-aligns this; kept left per Luke's earlier request on
              the previous footer, so it stays flush with the wordmark and
              rule above it rather than reverting that decision. */}
          <p className="text-xs leading-4 text-background/50">
            &copy; 2026 Exalt Digital Ltd.
          </p>
        </div>
      </Container>
    </footer>
  );
}
