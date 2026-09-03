import { CtaSection } from "@/components/sections/cta-section";
import { FaqSection } from "@/components/sections/faq-section";
import { Hero } from "@/components/sections/hero";
import { FooterBackground } from "@/components/ui/footer-background";
import { HeroBackground } from "@/components/ui/hero-background";
import { OfferingsSection } from "@/components/sections/offerings-section";
import { ServicesSection } from "@/components/sections/services-section";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
import { StatementSection } from "@/components/sections/statement-section";
import { SocialProof } from "@/components/sections/social-proof";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { WorkSamplesSection } from "@/components/sections/work-samples-section";
import { WorkSection } from "@/components/sections/work-section";

export default function Home() {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main id="main" className="flex flex-1 flex-col">
        {/* SiteHeader is position:fixed (so it can hide/reveal on scroll),
            so it no longer reserves its own 4rem in flow — pt-16 here does
            that instead, and fills the full viewport (min-h-svh, not
            svh-4rem) since nothing above it takes space any more. The sky
            behind fills this whole block from true y-0, showing through
            the transparent header at the top of the page exactly as
            before. */}
        <div
          id="hero-region"
          className="relative isolate flex min-h-svh flex-col pt-16"
        >
          <HeroBackground />
          <div className="relative z-10 flex flex-1 flex-col">
            <Hero className="flex-1" />
            <SocialProof />
          </div>
        </div>

        <StatementSection />
        <WorkSection />
        <ServicesSection />
        <OfferingsSection />
        <TestimonialsSection />
        <WorkSamplesSection />
        <FaqSection />
      </main>

      {/* CTA + footer share one continuous sky image, matching Figma's own
          frame, which models both as one unit — the CTA card floating on
          the same photo the footer content sits on below it. */}
      <div className="relative isolate">
        <FooterBackground />
        <div className="relative z-10">
          <CtaSection />
          <SiteFooter />
        </div>
      </div>
    </div>
  );
}
