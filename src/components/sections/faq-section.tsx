import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { siteConfig } from "@/lib/site";

type Faq = {
  question: string;
  /** One entry per paragraph. */
  answer: string[];
};

const faqs: Faq[] = [
  {
    question: "Who do I work with?",
    answer: [
      "You will work directly with Luke Dalton, the founder of Exalt Studio who has lead successful design projects with 30+ global clients and consulted on design work for HSBC, Cantor Fitzgerald and the FIA.",
      "Having previously worked in-house and agency side in London, he started Exalt Studio to give startups access to top tier product design without the difficulty of a lengthy hiring process.",
      "Connect with him using the links in the footer.",
    ],
  },
  {
    question: "How much work can I expect in a month?",
    answer: [
      "Micro updates (24–48h), small flows (3–5 days), larger modules (1–2 weeks), brand sprints (4 weeks), and landing pages (1–2 weeks design +1–2 weeks for build).",
      "Most clients see first polished designs within 3–5 days of kickoff.",
    ],
  },
  {
    question: "Why wouldn’t I hire a full-time designer?",
    answer: [
      "Recruiting a full-time senior designer with the right expertise can be time-consuming and expensive, with high salaries and benefits.",
      "With Exalt Studio you get immediate and direct access to a specialised designer you can trust to deliver first rate deliverables.",
    ],
  },
  {
    question: "What is your pricing?",
    answer: [
      "Pricing depends on the scope, timeline, and level of support required. Most projects are quoted individually so we can shape the engagement around what you actually need, rather than forcing you into a fixed package.",
      "As a guide, our minimum engagement is typically $5000, with larger product design, MVP, and ongoing design support projects quoted based on complexity and delivery requirements.",
      "The best next step is to book a short intro call so we can understand your goals and recommend the most suitable approach.",
    ],
  },
  {
    question: "How do we communicate?",
    answer: [
      "We communicate via Slack or any messaging application of your choice (WhatsApp, Telegram, Discord etc...).",
    ],
  },
  {
    question: "Do you partner with agencies?",
    answer: [
      "Yes, we can partner with other digital agencies to provide support across product, web and mobile design.",
    ],
  },
  {
    question: "Do you offer any equity-based deals?",
    answer: [
      "For founders and startups we truly believe in, we are open to discussions when it comes to equity-based deals.",
    ],
  },
  {
    question: "What about refunds and cancellations?",
    answer: [
      "Cancellations before a project starts receive a full refund. Once the project has commenced, refunds will be discussed with the client personally and will be based on the work completed up to that point.",
      "No refunds after final design approval. No refunds have ever been requested.",
    ],
  },
];

function Chevron() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className="mt-1 shrink-0 text-foreground/50 transition-transform duration-200 group-open:rotate-180 group-hover:text-foreground"
    >
      <path
        d="M4 6.5 8 10.5 12 6.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function FaqSection() {
  return (
    <Section
      id="faq"
      spacing="lg"
      aria-labelledby="faq-heading"
      className="border-t border-foreground/12"
    >
      <Container width="full">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-16">
              <SectionHeader
                label="FAQ"
                titleId="faq-heading"
                title={
                  <>
                    Common
                    <br />
                    questions
                  </>
                }
              />
            </div>
          </div>

          {/* Native <details>: keyboard accessible and fully functional with
              no JavaScript, and the answers stay in the DOM for search. */}
          <div className="lg:col-span-7 lg:col-start-6">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group border-t border-foreground/12 last:border-b"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                  <h3 className="text-base font-semibold transition-opacity duration-200 group-hover:opacity-70 sm:text-lg">
                    {faq.question}
                  </h3>
                  <Chevron />
                </summary>
                <div className="flex flex-col gap-4 pb-8">
                  {faq.answer.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="max-w-[62ch] text-base leading-6 text-foreground/66"
                    >
                      {paragraph}
                    </p>
                  ))}
                  {faq.question === "What about refunds and cancellations?" ? (
                    <p className="max-w-[62ch] text-base leading-6 text-foreground/66">
                      For inquiries, contact{" "}
                      <a
                        href={`mailto:${siteConfig.email}`}
                        className="text-foreground underline underline-offset-4 transition-opacity duration-200 hover:opacity-70"
                      >
                        {siteConfig.email}
                      </a>
                    </p>
                  ) : null}
                </div>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
