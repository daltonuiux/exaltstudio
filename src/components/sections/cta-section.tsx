import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { siteConfig } from "@/lib/site";

export function CtaSection() {
  return (
    // Figma frames the block with 40px of its own top padding, then a large
    // gap before the footer content below — both float on the shared sky
    // FooterBackground renders behind this and SiteFooter. Scaled down from
    // Figma's 160px at the smaller breakpoints, where it would otherwise
    // dominate the page.
    <Section
      id="contact"
      spacing="none"
      aria-labelledby="contact-heading"
      className="pt-10 pb-16 md:pb-24 lg:pb-[160px]"
    >
      <Container width="full">
        <div className="flex flex-col gap-10 rounded-lg border border-background/14 bg-background/12 px-6 py-10 backdrop-blur-md sm:px-10 sm:py-[50px] lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-2 lg:flex-1">
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

          <div className="flex flex-col items-start gap-6 lg:shrink-0">
            <p className="max-w-[391px] text-base leading-6 text-background">
              Tell us where the product is today, what&rsquo;s creating friction
              and the milestone you&rsquo;re working towards.
            </p>
            <Button
              href={siteConfig.bookingUrl}
              variant="inverse"
              target="_blank"
              rel="noreferrer noopener"
            >
              Book intro call
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
