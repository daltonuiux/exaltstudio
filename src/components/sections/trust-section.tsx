import { Container } from "@/components/ui/container";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";

export function TrustSection() {
  return (
    <Section
      id="about"
      spacing="lg"
      aria-labelledby="about-heading"
      className="border-t border-foreground/12"
    >
      <Container width="full">
        {/* The testimonial gets the full measure of the grid rather than a card. */}
        <figure className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <blockquote className="lg:col-span-8">
            <p className="text-3xl font-medium tracking-[-0.03em] text-balance lg:text-4xl">
              &ldquo;Exalt joined our team and immediately made an impact,
              helping us ship new features that drive our growth.&rdquo;
            </p>
          </blockquote>
          <figcaption className="flex flex-col gap-1 self-end lg:col-span-3 lg:col-start-10">
            <SectionLabel>Bryan Chappell</SectionLabel>
            <p className="text-sm text-foreground/66">CEO, ScoutOS</p>
          </figcaption>
        </figure>

        <div className="mt-16 grid gap-10 border-t border-foreground/12 pt-12 lg:mt-24 lg:grid-cols-12 lg:pt-16">
          <div className="lg:col-span-5">
            <ImagePlaceholder
              ratio="4 / 5"
              caption="Founder portrait to come"
              className="max-w-sm lg:max-w-none"
            />
          </div>

          <div className="lg:col-span-6 lg:col-start-7 lg:self-center">
            <SectionLabel>Founder-led</SectionLabel>
            <h2
              id="about-heading"
              className="mt-4 text-3xl font-semibold tracking-[-0.03em]"
            >
              You&rsquo;ll work directly
              <br />
              with the person doing the work.
            </h2>
            <p className="mt-6 max-w-[52ch] text-base leading-6 text-foreground/66">
              Exalt is led by Luke Dalton, a senior product designer who has
              worked with startups and global organisations across complex
              software, including projects for HSBC, Cantor Fitzgerald and the
              FIA.
            </p>
            <p className="mt-4 max-w-[52ch] text-base leading-6 text-foreground/66">
              From the first product discussion through to developer handoff,
              you work directly with me.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
