import { BookCallButton } from "@/components/ui/book-call-button";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { cn } from "@/lib/utils";

export function Hero({ className }: { className?: string }) {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className={cn("flex items-center py-16 md:py-20", className)}
    >
      <Container width="full">
        {/* The column is 646px wide so the headline has room, and the paragraph
            keeps its own, narrower 566px measure for readability. Wrapping,
            text-balance keeps the headline's lines even wherever it wraps, and
            text-pretty on the paragraph stops it ending on a stranded word. */}
        <div className="flex w-full max-w-[646px] flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <SectionLabel className="text-background/70">
                Product design &amp; design engineering for AI &amp; SaaS
              </SectionLabel>
              <h1
                id="hero-heading"
                className="max-w-[646px] text-hero font-semibold text-balance text-background"
              >
                Complex products. Beautifully simple.
              </h1>
            </div>
            <p className="max-w-[566px] text-base leading-6 text-pretty text-background/80">
              We help ambitious AI and SaaS teams simplify complex workflows,
              elevate their product experience and ship exceptional software.
            </p>
          </div>

          <div className="flex flex-wrap items-start gap-3">
            <BookCallButton variant="inverse" />
            <Button href="#work-samples" variant="inverse-soft">
              View selected work
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
