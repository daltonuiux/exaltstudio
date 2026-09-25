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
            checked line by line from 320px to 1920px: text-balance splits the
            headline into two even lines ("Your product has / outgrown its
            design") from 375px up, and three even lines at 320px; text-pretty
            on the paragraph stops it ending on a stranded word. */}
        <div className="flex w-full max-w-[646px] flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <SectionLabel className="text-background/70">
                Product design for growing AI &amp; B2B software
              </SectionLabel>
              <h1
                id="hero-heading"
                className="max-w-[646px] text-hero font-semibold text-balance text-background"
              >
                Your product has outgrown its design
              </h1>
            </div>
            <p className="max-w-[566px] text-base leading-6 text-pretty text-background/80">
              We help SaaS and AI teams untangle complex workflows, improve the
              customer experience, and build a product that feels ready for its
              next stage.
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
