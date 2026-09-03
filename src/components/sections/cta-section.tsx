import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { siteConfig } from "@/lib/site";

export function CtaSection() {
  return (
    <Section
      id="contact"
      spacing="lg"
      aria-labelledby="contact-heading"
      // Inverted ground: the page's deliberate full stop.
      className="bg-foreground text-background"
    >
      <Container width="full">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <SectionLabel className="text-background/60">
              Let&rsquo;s talk
            </SectionLabel>
            <h2
              id="contact-heading"
              className="mt-4 text-hero font-semibold text-balance"
            >
              Have a good product
              <br />
              that&rsquo;s becoming hard to scale?
            </h2>
          </div>

          <div className="flex flex-col gap-8 lg:col-span-4 lg:col-start-9 lg:self-end">
            <p className="max-w-[46ch] text-base leading-6 text-background/70">
              Tell us where the product is today, what&rsquo;s creating friction
              and the milestone you&rsquo;re working towards.
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
              <Button href={`mailto:${siteConfig.email}`} variant="inverse">
                Book intro call
              </Button>
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-sm text-background/70 underline underline-offset-4 transition-colors duration-200 hover:text-background"
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
