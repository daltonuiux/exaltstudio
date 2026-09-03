import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { WorkSampleCycler } from "@/components/ui/work-sample-cycler";
import { SectionLabel } from "@/components/ui/section-label";
import { siteConfig } from "@/lib/site";
import { workSamples } from "@/lib/work-samples";
import { cn } from "@/lib/utils";

export function Hero({ className }: { className?: string }) {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className={cn("flex items-center py-16 md:py-20", className)}
    >
      <Container
        width="full"
        className="flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-10"
      >
        <div className="flex w-full max-w-[566px] flex-col gap-8 lg:shrink-0">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <SectionLabel>Product design for B2B AI &amp; SaaS</SectionLabel>
              <h1
                id="hero-heading"
                className="text-hero font-semibold text-balance text-foreground"
              >
                Your product works.
                <br />
                Now it needs to scale.
              </h1>
            </div>
            <p className="text-base leading-6 text-foreground/66">
              We turn complex, fast-built software into clear, scalable product
              systems your customers understand and your developers can build on.
            </p>
          </div>

          <div className="flex flex-wrap items-start gap-3">
            <Button
              href={siteConfig.bookingUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              Book intro call
            </Button>
            <Button href="#work" variant="soft">
              View selected work
            </Button>
          </div>
        </div>

        <WorkSampleCycler
          samples={workSamples}
          className="w-full max-w-[539px] lg:shrink-0"
        />
      </Container>
    </section>
  );
}
