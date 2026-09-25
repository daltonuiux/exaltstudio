import { BookCallButton } from "@/components/ui/book-call-button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";

export function CtaSection() {
  return (
    // The card's top padding, the gap down to the footer card, and the side
    // gutters are all the same value (the Container's gutter at each
    // breakpoint), so the two cards sit in an even frame. Both float on the
    // shared background FooterBackground renders behind this and SiteFooter.
    <Section
      id="contact"
      spacing="none"
      aria-labelledby="contact-heading"
      className="pt-gutter pb-gutter md:pt-gutter-md md:pb-gutter-md lg:pt-gutter-lg lg:pb-gutter-lg"
    >
      <Container width="full">
        {/* rounded-lg is the shared "big card" radius — WorkSection's
            case-study cards use the same value, rather than their own
            (previously undefined-token, coincidentally-larger) rounding. */}
        <Reveal className="flex flex-col gap-10 rounded-lg border border-background/14 bg-background/12 px-6 py-10 backdrop-blur-md sm:px-10 sm:py-[50px] lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-2 lg:flex-1">
            <SectionLabel className="text-background/50">
              Let&rsquo;s talk
            </SectionLabel>
            <h2
              id="contact-heading"
              className="text-display font-semibold text-background"
            >
              Have a good product{" "}
              <br />
              that&rsquo;s becoming hard to scale?
            </h2>
          </div>

          <div className="flex flex-col items-start gap-6 lg:shrink-0">
            <p className="max-w-[391px] text-base leading-6 text-background">
              Tell us where the product is today, what&rsquo;s creating friction
              and the milestone you&rsquo;re working towards.
            </p>
            <BookCallButton variant="inverse" />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
