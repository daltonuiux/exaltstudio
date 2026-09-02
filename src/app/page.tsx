import { CtaSection } from "@/components/sections/cta-section";
import { Hero } from "@/components/sections/hero";
import { ProblemSection } from "@/components/sections/problem-section";
import { ProcessSection } from "@/components/sections/process-section";
import { ServicesSection } from "@/components/sections/services-section";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
import { SocialProof } from "@/components/sections/social-proof";
import { TrustSection } from "@/components/sections/trust-section";
import { WorkSection } from "@/components/sections/work-section";

export default function Home() {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main id="main" className="flex flex-1 flex-col">
        {/* Hero + social proof fill the first viewport, as designed in Figma. */}
        <div className="flex min-h-[calc(100svh-4rem)] flex-col">
          <Hero className="flex-1" />
          <SocialProof />
        </div>

        <ProblemSection />
        <WorkSection />
        <ServicesSection />
        <ProcessSection />
        <TrustSection />
        <CtaSection />
      </main>
      <SiteFooter />
    </div>
  );
}
