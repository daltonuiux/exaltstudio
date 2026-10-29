import type { ReactNode } from "react";

import { CtaSection } from "@/components/sections/cta-section";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
import { FooterBackground } from "@/components/ui/footer-background";

/**
 * Page frame for /blog and /blog/[slug]: the site header and footer.
 *
 * The index ends with the site's CTA card, like /case-studies. Articles don't:
 * they carry their own single closing CTA, so the footer follows directly.
 */
export function BlogShell({ article = false, children }: { article?: boolean; children: ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />

      <main id="main" className="flex flex-1 flex-col pt-16">
        {children}
      </main>

      <div className="relative isolate mt-16 md:mt-24">
        <FooterBackground />
        <div className="relative z-10">
          {article ? <div className="h-gutter md:h-gutter-md lg:h-gutter-lg" /> : <CtaSection />}
          <SiteFooter />
        </div>
      </div>
    </div>
  );
}
