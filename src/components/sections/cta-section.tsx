import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { siteConfig } from "@/lib/site";

export function CtaSection() {
  const mailto = `mailto:${siteConfig.email}`;

  return (
    // Figma frames the block with 40px of its own padding rather than the
    // page's section rhythm; the FAQ above supplies the rest of the gap.
    <Section id="contact" spacing="none" aria-labelledby="contact-heading" className="py-10">
      <Container width="full">
        <div className="relative flex flex-col gap-10 overflow-hidden rounded-lg bg-foreground px-6 py-10 sm:px-10 sm:py-[50px] lg:flex-row lg:items-end lg:justify-between">
          {/* Contour texture, anchored left. `lighten` at 25% lifts only the
              contour lines out of the near-black ground. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-[69%] opacity-25 mix-blend-lighten"
          >
            <Image
              src="/images/decorative/cta-topography.webp"
              alt=""
              fill
              sizes="(min-width: 1024px) 70vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="relative flex flex-col gap-2 lg:flex-1">
            <SectionLabel className="text-background/50">
              Let&rsquo;s talk
            </SectionLabel>
            <h2
              id="contact-heading"
              className="text-display font-semibold text-background"
            >
              Have a good product
              <br />
              that&rsquo;s becoming hard to scale?
            </h2>
          </div>

          <div className="relative flex flex-col items-start gap-6 lg:shrink-0">
            <p className="max-w-[391px] text-base leading-6 text-background/50">
              Tell us where the product is today, what&rsquo;s creating friction
              and the milestone you&rsquo;re working towards.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <Button
                href={siteConfig.bookingUrl}
                variant="inverse"
                target="_blank"
                rel="noreferrer noopener"
              >
                Book intro call
              </Button>
              <a
                href={mailto}
                className="text-base leading-6 text-background underline underline-offset-4 transition-opacity duration-200 hover:opacity-70"
              >
                {siteConfig.email}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
