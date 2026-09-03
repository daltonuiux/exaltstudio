import { BrowserMockup } from "@/components/ui/browser-mockup";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionLabel } from "@/components/ui/section-label";

type CaseStudy = {
  client: string;
  headline: string;
  tags: string[];
  /** Shown in the mock browser's address bar. */
  domain: string;
};

/**
 * All four are placeholders — client, headline and tags alike — pending
 * real case-study copy. Deliberately generic ("Client One") rather than
 * real client names paired with invented outcomes, so nothing here reads
 * as an actual claim about a real client before the real copy lands.
 */
const caseStudies: CaseStudy[] = [
  {
    client: "Client One",
    headline:
      "Placeholder headline describing the product and business outcome for this case study",
    tags: ["Product", "Brand", "Web"],
    domain: "clientone.com",
  },
  {
    client: "Client Two",
    headline:
      "Placeholder headline describing the product and business outcome for this case study",
    tags: ["Product", "MVP", "Design system"],
    domain: "clienttwo.com",
  },
  {
    client: "Client Three",
    headline:
      "Placeholder headline describing the product and business outcome for this case study",
    tags: ["Brand", "Web", "UX/UI"],
    domain: "clientthree.com",
  },
  {
    client: "Client Four",
    headline:
      "Placeholder headline describing the product and business outcome for this case study",
    tags: ["Product", "Crypto", "Web"],
    domain: "clientfour.com",
  },
];

function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <article className="grid gap-10 rounded-3xl bg-foreground/4 p-8 sm:p-10 lg:grid-cols-12 lg:items-center lg:gap-14 lg:p-14">
      <div className="lg:col-span-4">
        <SectionLabel>{study.client}</SectionLabel>

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

      <div className="lg:col-span-8">
        <BrowserMockup url={study.domain} />
      </div>
    </article>
  );
}

export function WorkSection() {
  return (
    <Section id="work" spacing="lg" aria-labelledby="work-heading">
      <Container width="full">
        <SectionHeader
          label="Selected work"
          titleId="work-heading"
          title="Better products for ambitious teams"
        />

        <div className="mt-14 flex flex-col gap-6 lg:mt-20 lg:gap-8">
          {caseStudies.map((study) => (
            <CaseStudyCard key={study.client} study={study} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
