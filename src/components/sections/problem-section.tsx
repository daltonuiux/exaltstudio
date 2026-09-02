import { Container } from "@/components/ui/container";
import { IndexedItem } from "@/components/ui/indexed-item";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";

const problems = [
  {
    index: "01",
    title: "The product feels fragmented",
    body: "Features have grown faster than the structure around them.",
  },
  {
    index: "02",
    title: "Important workflows are harder than they should be",
    body: "Customers need more explanation, support and hand-holding.",
  },
  {
    index: "03",
    title: "Engineering is filling in the gaps",
    body: "Developers are making UX and product decisions that should already be resolved.",
  },
];

export function ProblemSection() {
  return (
    <Section
      id="problem"
      spacing="lg"
      aria-labelledby="problem-heading"
      className="border-t border-foreground/12"
    >
      <Container width="full">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <SectionHeader
            className="lg:col-span-5"
            label="Product complexity"
            titleId="problem-heading"
            title={
              <>
                Built fast.
                <br />
                Now complexity is catching up.
              </>
            }
            description="Early shortcuts are useful when you’re proving an idea. But as customers, features and workflows grow, they start creating friction."
          />

          <ol className="lg:col-span-6 lg:col-start-7">
            {problems.map((problem) => (
              <li
                key={problem.index}
                className="border-t border-foreground/12 py-8 last:pb-0 lg:py-10"
                // Top rule on every row builds the ladder; the first sits
                // flush with the headline block on large screens.
              >
                <IndexedItem index={problem.index} title={problem.title}>
                  {problem.body}
                </IndexedItem>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-16 border-t border-foreground/12 pt-10 lg:mt-24 lg:pt-12">
          <p className="max-w-[24ch] text-3xl font-semibold tracking-[-0.03em] text-balance">
            You don’t need another round of UI polish.{" "}
            <span className="text-foreground/40">
              You need the product system clarified.
            </span>
          </p>
        </div>
      </Container>
    </Section>
  );
}
