import { Hero } from "@/components/sections/hero";
import { SiteHeader } from "@/components/sections/site-header";
import { SocialProof } from "@/components/sections/social-proof";

export default function Home() {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main id="main" className="flex flex-1 flex-col">
        <Hero className="flex-1" />
        <SocialProof />
      </main>
    </div>
  );
}
