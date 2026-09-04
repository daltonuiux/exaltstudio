import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Hero({ className }: { className?: string }) {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className={cn("flex items-center py-16 md:py-20", className)}
    >
      <Container width="full">
        <div className="flex w-full max-w-[566px] flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <SectionLabel className="text-background/70">
                Product design for B2B AI &amp; SaaS
              </SectionLabel>
              <h1
                id="hero-heading"
                className="text-hero font-semibold text-balance text-background"
              >
                Your product works.{" "}
                <br />
                Now it needs to scale
              </h1>
            </div>
            <p className="text-base leading-6 text-background/80">
              We turn complex, fast-built software into clear, scalable product
              systems your customers understand and your developers can build on.
            </p>
          </div>

          <div className="flex flex-wrap items-start gap-3">
            <Button
              variant="inverse"
              href={siteConfig.bookingUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              Book intro call
            </Button>
            <Button href="#work" variant="inverse-soft">
              View selected work
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
