import { Container } from "@/components/ui/container";
import { ScrollRevealText } from "@/components/ui/scroll-reveal-text";
import { PinnedReveal } from "@/components/ui/pinned-reveal";
import { Section } from "@/components/ui/section";

const statement =
  "The best software doesn’t force you to choose between clarity and craft. It combines thoughtful product structure, intuitive workflows and exceptional UI into an experience customers understand, trust and want to keep using.";

export function StatementSection() {
  return (
    // No top hairline: the social-proof block above already closes with one.
    // Pinned in the viewport while it reveals (see PinnedReveal), so the
    // Figma 136px top / 160px bottom padding only applies in the unpinned
    // reduced-motion layout.
    <Section id="statement" spacing="none">
      <PinnedReveal reducedClassName="pt-24 pb-28 md:pt-34 md:pb-40">
        <Container width="full">
          <ScrollRevealText
            text={statement}
            className="mx-auto max-w-[880px] text-center text-display font-semibold text-foreground"
          />
        </Container>
      </PinnedReveal>
    </Section>
  );
}
