import { Container } from "@/components/ui/container";
import { LogoImage } from "@/components/ui/logo-image";
import { LogoMarquee } from "@/components/ui/logo-marquee";
import { SectionLabel } from "@/components/ui/section-label";
import { clientLogos, investorLogos } from "@/lib/logos";

/** Figma: DM Mono Medium 12px, +0.24px tracking, uppercase, 50% foreground. */
function GroupLabel({ children, id }: { children: React.ReactNode; id: string }) {
  return (
    <SectionLabel id={id}>{children}</SectionLabel>
  );
}

export function SocialProof() {
  return (
    <section aria-labelledby="social-proof-clients" className="w-full py-6">
      <Container width="full" className="flex flex-col gap-6">
        <hr className="border-foreground/12" />

        <div className="flex flex-col gap-4">
          <GroupLabel id="social-proof-clients">
            Trusted by B2B software teams around the world
          </GroupLabel>
          {/* Figma renders this row at 50%; the marquee handles the motion. */}
          <LogoMarquee
            logos={clientLogos}
            gap={48}
            duration={60}
            hoverRate={0.25}
            fade="7%"
            className="opacity-50"
          />
        </div>

        <hr className="border-foreground/12" />

        <div className="flex flex-col gap-4">
          <GroupLabel id="social-proof-investors">
            Our clients have raised $15m+ from
          </GroupLabel>
          <ul
            aria-labelledby="social-proof-investors"
            className="flex flex-wrap items-center gap-x-[38px] gap-y-5 opacity-50"
          >
            {investorLogos.map((logo) => (
              <li key={logo.name} className="flex shrink-0 items-center">
                <LogoImage logo={logo} />
              </li>
            ))}
          </ul>
        </div>

        <hr className="border-foreground/12" />
      </Container>
    </section>
  );
}
