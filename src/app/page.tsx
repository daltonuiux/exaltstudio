import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/lib/site";

/**
 * Placeholder homepage.
 *
 * Intentionally minimal — it exists only to verify the foundation renders.
 * The real sections (Nav, Hero, Work, Services, About, CTA, Footer) will be
 * built from Figma and live in `src/components/sections`.
 */
export default function Home() {
  return (
    <main id="main">
      <Section spacing="lg" aria-labelledby="placeholder-heading">
        <Container>
          <h1 id="placeholder-heading" className="text-4xl font-semibold tracking-tight">
            {siteConfig.name}
          </h1>
          <p className="mt-4 max-w-content text-lg text-muted-foreground">
            Foundation ready. Sections will be implemented from Figma.
          </p>
        </Container>
      </Section>
    </main>
  );
}
