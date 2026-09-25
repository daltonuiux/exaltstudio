import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ImageCycle } from "@/components/ui/image-cycle";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { LogoImage } from "@/components/ui/logo-image";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { type CaseStudy, caseStudies } from "@/lib/case-studies";

function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <article className="grid gap-10 rounded-lg bg-foreground/4 p-8 sm:p-10 lg:grid-cols-12 lg:items-stretch lg:gap-14 lg:p-14">
      {/* Text/logo/badges pinned to the top, button to the bottom
          (justify-between) — the column stretches to the row's full height
          at lg, where it sits beside the screenshot. The gap keeps the two
          groups apart when the column is at its shortest, and on mobile,
          where the column just stacks. */}
      <div className="flex flex-col justify-between gap-10 lg:col-span-4">
        <div>
          <LogoImage logo={study.logo} />

          <h3 className="mt-5 text-2xl font-semibold text-balance tracking-[-0.03em] sm:text-3xl">
            {study.headline}
          </h3>

          <ul className="mt-6 flex flex-wrap gap-2">
            {study.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-foreground/12 bg-background px-3 py-1 text-sm text-foreground/66"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>

        {/* The existing white pill (Button's "inverse" — bg-background), which
            reads as white on this card's grey ground. */}
        <Button
          href={`/case-studies/${study.slug}`}
          variant="inverse"
          className="self-start"
        >
          View case study
        </Button>
      </div>

      {/* self-center: the text column can now be taller than the image (it
          stretches to fit the button), so keep the screenshot vertically
          centred beside it as before. */}
      <div className="lg:col-span-8 lg:self-center">
        {/* A clean, unframed image — no mock browser chrome around it.
            rounded-md sm:rounded-lg (not a flat rounded-2xl, and not the
            same value at every width): capped at the card's own rounded-lg
            so it's never rounder than its container, and stepped down
            further on mobile specifically — a 24px corner read fine against
            an ~1100px desktop screenshot but was disproportionately
            aggressive at the ~270px width this shrinks to on a phone,
            visibly eating into the corners of the actual product UI being
            shown. Matches WorkSamplesSection's grid tiles, the other place
            on the page a photo sits in its own rounded frame. */}
        {study.images && study.images.length > 0 ? (
          <ImageCycle
            images={study.images}
            alt={`${study.client} product screenshot`}
            className="rounded-md border border-foreground/12 sm:rounded-lg"
          />
        ) : (
          <ImagePlaceholder
            ratio="16 / 10"
            caption="Product screenshot to come"
            className="rounded-md sm:rounded-lg"
          />
        )}
      </div>
    </article>
  );
}

export function WorkSection() {
  return (
    <Section id="work" spacing="lg" aria-labelledby="work-heading">
      <Container width="full">
        <Reveal>
          <SectionHeader
            label="Selected work"
            titleId="work-heading"
            title="Better products for ambitious teams"
            className="items-center text-center"
          />
        </Reveal>

        <div className="mt-14 flex flex-col gap-6 lg:mt-20 lg:gap-8">
          {caseStudies.map((study) => (
            <Reveal key={study.client}>
              <CaseStudyCard study={study} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
