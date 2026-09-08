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
        {/* max-w-[646px] here, not 566px — widened specifically to give the
            headline room to fill 646px and wrap onto fewer, longer lines
            instead of stacking narrowly. The paragraph gets its own
            max-w-[566px] below so it keeps its original, more readable line
            length rather than stretching out to match. */}
        <div className="flex w-full max-w-[646px] flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <SectionLabel className="text-background/70">
                Product design for B2B AI &amp; SaaS
              </SectionLabel>
              <h1
                id="hero-heading"
                className="max-w-[646px] text-hero font-semibold text-balance text-background"
              >
                Product design and interface engineering for complex B2B
                software
              </h1>
            </div>
            <p className="max-w-[566px] text-base leading-6 text-background/80">
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
