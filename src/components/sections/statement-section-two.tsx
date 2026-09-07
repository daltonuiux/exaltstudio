import { Container } from "@/components/ui/container";
import { ScrollRevealText } from "@/components/ui/scroll-reveal-text";
import { Section } from "@/components/ui/section";

const statement =
  "The interface is only what customers see. Behind great product design is a clearer product to sell, an easier experience to adopt, and a stronger system for your team to keep building as the company grows.";

/**
 * Second editorial pause statement, between Services and Testimonials.
 * Deliberately just StatementSection's own shape reused wholesale — same
 * ScrollRevealText component, same type scale, same centered/no-chrome
 * treatment — rather than a parallel implementation: the only things that
 * differ are the copy and (per spacing="lg", not spacing="none" with
 * StatementSection's own bespoke pt/pb) the vertical rhythm, since this one
 * sits between two ordinary spacing="lg" sections rather than right after
 * the hero, where StatementSection's bespoke Figma-specified 136/160px
 * padding was answering a problem specific to that position.
 */
export function StatementSectionTwo() {
  return (
    <Section id="statement-two" spacing="lg">
      <Container width="full">
        {/* max-w-[960px], not StatementSection's own 880px: this copy runs a
            little longer (36 words vs. 33), and 880px wrapped it to 6 lines
            at ordinary desktop widths — a bit past the "roughly 3-5 lines"
            this needs. 960px lands at 5 lines from 1280px up through 1920px,
            still a clearly constrained editorial column rather than a full
            paragraph width. */}
        <ScrollRevealText
          text={statement}
          className="mx-auto max-w-[960px] text-center text-display font-semibold text-foreground"
        />
      </Container>
    </Section>
  );
}
