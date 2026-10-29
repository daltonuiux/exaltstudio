import type { BlogArticle, BlogAuthor } from "@/lib/blog";

/**
 * The blog’s articles, in the order the index lists them.
 *
 * Exalt facts in this copy (pricing, team, the free review, case studies) are
 * taken from the live site and lib/pricing.ts, lib/case-studies.ts and the FAQ.
 * If any of those change, update the matching sentences here too: search for
 * "$6,000", "$7,000", "senior product designer" and the case-study slugs.
 *
 * Examples marked as illustrative are invented to explain a point; they are
 * not client work and must stay labelled as such.
 */

/** Verified on the site’s FAQ: Luke is Exalt Studio’s founder. */
const luke: BlogAuthor = { name: "Luke Dalton", jobTitle: "Founder, Exalt Studio" };

/** First published on deployment, 29 October 2026. Never backdate. */
const launchDate = "2026-10-29";

const costArticle: BlogArticle = {
  slug: "saas-product-redesign-cost",
  title: "How much does a SaaS product redesign cost?",
  excerpt:
    "Scope sets the price. How workflows, roles, states, research and implementation drive the cost of redesigning a SaaS product, and how to compare quotes fairly.",
  description:
    "What drives the cost of redesigning an existing SaaS product, how to compare proposals with different scopes, and what to prepare before asking for a quote.",
  topic: "Pricing",
  author: luke,
  status: "published",
  publishedAt: launchDate,
  intro:
    "The cost of a SaaS product redesign depends on how much of the product changes and how much has to be designed beneath the surface: roles, states, edge cases and the work to build it. At Exalt, a Fixed-Price Project starts from $6,000. That is a starting fee for a defined scope, not a quote for redesigning a whole platform.",
  body: [
    { type: "h2", id: "product-vs-website", text: "A product redesign is not a website redesign" },
    {
      type: "p",
      text: "A marketing website redesign changes how you present the product to prospective customers: positioning, page structure, visual identity and the path to a demo or sign-up. A product redesign changes the software your customers use every day: the screens, workflows and logic they rely on to get work done.",
    },
    {
      type: "p",
      text: "They are priced differently because the work is different. A marketing site is mostly a set of pages with a limited number of states. A single product screen can behave differently for each role, each data condition and each step in a process, and every one of those variations needs a design decision. A quote for one tells you very little about the other.",
    },
    { type: "h2", id: "types-of-redesign", text: "What “redesign” can mean" },
    {
      type: "p",
      text: "The word covers several very different pieces of work. The table compares the common types by what changes, what you should expect to receive and what makes each one larger or smaller. It deliberately has no price column: the same type of work varies widely in size from one product to another.",
    },
    {
      type: "table",
      caption: "Types of SaaS product redesign compared",
      head: ["Type", "What changes", "Typical deliverables", "What affects the effort"],
      rows: [
        [
          "Visual refresh",
          "Typography, colour, spacing, components and icons. Workflows and structure stay the same.",
          "An updated visual language, a revised component library and key screens restyled as a reference.",
          "How many distinct components exist, how consistently they are used in code, and whether light and dark modes are needed.",
        ],
        [
          "One workflow",
          "A single task from start to finish, such as onboarding, setup or a reporting view, including its logic and structure.",
          "A flow map, designs for every step and state, a prototype and developer handoff.",
          "The number of steps and roles, branching logic, states and edge cases, and how much research is needed to understand the task.",
        ],
        [
          "Wider product redesign",
          "Several workflows, navigation and information architecture, plus a consistent visual system.",
          "Revised information architecture, designs across the affected areas, a design system and a rollout plan.",
          "The number of workflows and roles, how far navigation changes, legacy constraints and how many people need to review the work.",
        ],
        [
          "Implementation",
          "The redesign built in front-end code rather than handed over as designs.",
          "Production components and screens built in your codebase.",
          "Your stack and existing component code, whether the APIs are ready, your testing and release process, and who builds which parts.",
        ],
      ],
    },
    {
      type: "p",
      text: "Implementation is often quoted separately because its size depends on your codebase as much as on the design. At Exalt, a Fixed-Price Project can include developer-ready handoff or agreed implementation in code, and larger front-end builds are scoped separately after reviewing your requirements and codebase.",
    },
    { type: "h2", id: "scope-drivers", text: "What drives the scope" },
    {
      type: "p",
      text: "Two redesigns with the same number of screens can differ widely in effort. These are the factors that usually explain the difference.",
    },
    { type: "h3", text: "Workflows" },
    {
      type: "p",
      text: "Count tasks, not screens. A task such as “invite a teammate and set their access” may cross four screens, an email and a settings page. Designing it properly means designing the whole sequence, including what happens when someone stops halfway.",
    },
    { type: "h3", text: "Roles and permissions" },
    {
      type: "p",
      text: "Each role that sees a different version of a screen adds design work. Admins, standard users, read-only viewers and external guests may need different actions, empty states and messages on what looks like the same page.",
    },
    { type: "h3", text: "States and edge cases" },
    {
      type: "p",
      text: "Every data-driven screen has more than one state: loading, empty, partially complete, failed, no permission, very long content, thousands of rows. In B2B software these states are often a large share of the design work, and they are the easiest thing for a cheaper proposal to leave out without saying so.",
    },
    { type: "h3", text: "Research" },
    {
      type: "p",
      text: "If the problem is already well understood from support tickets, analytics or customer calls, little new research may be needed. If nobody is sure why users struggle, some interviews or usability testing before design can prevent expensive rework. Either way, the proposal should say which it assumes.",
    },
    { type: "h3", text: "Component reuse" },
    {
      type: "p",
      text: "A product with a consistent component library in code is quicker to redesign than one where each area was built differently. If a design system has to be created or rebuilt as part of the work, that is a significant deliverable in its own right.",
    },
    { type: "h3", text: "Responsive requirements" },
    {
      type: "p",
      text: "Many B2B products are used mainly on desktop, but some tasks, such as approvals or quick look-ups, need to work on a phone. Adapting a dense table or editor to a small screen is real design work, so agree which workflows need it.",
    },
    { type: "h3", text: "Implementation" },
    {
      type: "p",
      text: "Handing designs to your engineers, supporting them during the build and building the front end yourself are three different levels of involvement. Check which one a price includes.",
    },
    { type: "h2", id: "proposal", text: "What a redesign proposal should include" },
    {
      type: "p",
      text: "A proposal you can rely on describes the work clearly enough that two people reading it would agree on whether a request is in or out. Look for:",
    },
    {
      type: "ul",
      items: [
        "The problem being solved, in the provider’s own words.",
        "The workflows, roles and platforms in scope.",
        "Which states and edge cases will be designed.",
        "Research and validation activities, or a clear note that none are included.",
        "Deliverables, their format and level of detail.",
        "Milestones, review points and how feedback is handled.",
        "What handoff or implementation support is included.",
        "What happens if the scope changes partway through.",
      ],
    },
    {
      type: "p",
      text: "Some work is commonly priced separately, which is fine as long as the proposal says so: front-end implementation, a full design system, copywriting, illustration, marketing pages and support after launch.",
    },
    { type: "h2", id: "compare-proposals", text: "How to compare two proposals" },
    {
      type: "p",
      text: "When two quotes differ significantly, the difference often comes down to scope rather than efficiency. Before comparing prices, put the proposals side by side and check:",
    },
    {
      type: "ol",
      items: [
        "**Workflows.** Do both cover the same tasks, not just the same pages?",
        "**Roles and states.** Does one design only the default state for one role?",
        "**Research.** A proposal that includes interviews or testing is doing different work from one that does not.",
        "**Deliverables.** A tested prototype and a set of static screens are not equivalent.",
        "**Implementation.** Is the price for designs, designs plus build support, or working code?",
        "**People.** Who does the work, how senior are they, and how much of their time is included?",
      ],
    },
    {
      type: "p",
      text: "If a lower quote leaves out states or research the product needs, that work has not disappeared. It tends to reappear during development, when decisions get made in code under time pressure.",
    },
    {
      type: "p",
      text: "If you expect design work to continue after the redesign rather than end with it, a monthly arrangement may suit you better than a project. [In-house designer, agency or embedded design partner](/blog/in-house-vs-agency-vs-embedded-design) compares the options.",
    },
    { type: "h2", id: "narrow-scope", text: "How to reduce scope responsibly" },
    {
      type: "p",
      text: "A smaller budget is a reason to design less of the product, not to design it less thoroughly. Useful ways to narrow the scope:",
    },
    {
      type: "ul",
      items: [
        "Redesign one complete workflow rather than restyling many screens.",
        "Design fully for the role that uses the workflow most, then treat other roles as variations.",
        "Keep existing components that work, and redesign only those causing problems.",
        "Use the evidence you already have, such as support themes, analytics and sales feedback, before commissioning new research.",
        "Phase the work: design the first workflow, ship it, then decide on the next.",
      ],
    },
    {
      type: "p",
      text: "What not to cut: the empty, error and permission states of the workflow you are redesigning, and enough validation to know the new design works. Removing those does not make the work cheaper, only less finished. [How to scope a SaaS redesign without rebuilding everything](/blog/how-to-scope-saas-redesign) explains how to draw that boundary.",
    },
    { type: "h2", id: "example", text: "Two screens that look alike" },
    {
      type: "callout",
      label: "Illustrative example",
      text: "This example is invented to show how scope hides behind similar screens. It is not drawn from a client project.",
    },
    {
      type: "p",
      text: "Two products each want a redesigned orders table. Both briefs say the same thing: one table, with search, filters and a detail panel.",
    },
    {
      type: "p",
      text: "**Product A** is used by one team. Everyone sees every order, orders are edited one at a time, and the list rarely exceeds a few hundred rows.",
    },
    {
      type: "p",
      text: "**Product B** has admins, regional managers and read-only finance users. Regional managers see only their region’s orders. Orders can be updated in bulk, some fields lock once an invoice is issued, and larger customers have tens of thousands of orders that load in pages.",
    },
    {
      type: "p",
      text: "Product B needs designs for each role’s view, the rules and messages for locked fields, bulk updates that succeed for some orders and fail for others, and slow or very large result sets. A screenshot of the default state could look almost identical for both products. The work behind it is not.",
    },
    { type: "h2", id: "quote-checklist", text: "Before you ask for a quote" },
    {
      type: "p",
      text: "You will get more accurate and more comparable quotes if you can share:",
    },
    {
      type: "ul",
      items: [
        "The problem you want to solve, and how you know it is a problem.",
        "The workflows you think are in scope, described as user tasks.",
        "The roles that use them, and how their access differs.",
        "Screenshots, a recording or access to the current product.",
        "Any evidence you have: support themes, analytics, customer feedback.",
        "Your front-end stack, and whether you have a component library.",
        "Who will build the design, and when.",
        "Your timeline, budget range and any fixed dates.",
      ],
    },
    {
      type: "p",
      text: "The [copyable project brief](/blog/how-to-scope-saas-redesign#project-brief) in our scoping guide is one way to put this together. If you are not yet sure what the problem is, start with a review rather than a redesign. [SaaS UX audits: what to review and what you should get back](/blog/saas-ux-audit) explains what that involves.",
    },
  ],
  cta: {
    heading: "Planning a product redesign?",
    body: "Tell us which workflows are causing problems. We’ll help you define the scope, then agree the timeline and a fixed fee before any work starts.",
    label: "Discuss your product redesign",
    destination: "intro-call",
  },
  related: ["how-to-scope-saas-redesign", "saas-ux-audit", "in-house-vs-agency-vs-embedded-design"],
};

const resourcingArticle: BlogArticle = {
  slug: "in-house-vs-agency-vs-embedded-design",
  title: "In-house designer, agency or embedded design partner: which should you choose?",
  seoTitle: "In-house designer vs agency vs embedded design partner",
  excerpt:
    "When each way of resourcing product design fits, how they differ on continuity, context and cost structure, and what to ask any provider before you sign.",
  description:
    "How to choose between an in-house product designer, an agency and an embedded design partner, with a comparison table, scenarios and questions to ask.",
  topic: "Design resourcing",
  author: luke,
  status: "published",
  publishedAt: launchDate,
  intro:
    "Hire in-house when design is a permanent, full-time need and you can give a designer the support to do it well. Choose a defined project when the work has a clear outcome and end. Choose an embedded partner when you need senior design continuously, but not necessarily as a full-time hire, or not yet.",
  body: [
    {
      type: "p",
      text: "In practice these options overlap, and the right one can change as the company grows.",
    },
    { type: "h2", id: "terms", text: "What the terms actually mean" },
    {
      type: "p",
      text: "**In-house** means employing a designer as part of your team, managed by you.",
    },
    {
      type: "p",
      text: "**Agency** describes a company that provides design as a service. Agencies work in different ways: some take on defined projects with a fixed scope, some provide ongoing support, and many do both.",
    },
    {
      type: "p",
      text: "**Embedded** describes a way of working, not a type of provider. An embedded designer works inside your team’s rhythm: joining planning, using your tools and channels, and designing features as the roadmap moves. That can be delivered by an agency, a studio or an independent designer.",
    },
    {
      type: "p",
      text: "So the decision is less “agency or embedded” than two separate questions. Do you want to employ the designer? And do you need a defined project, or continuing involvement?",
    },
    { type: "h2", id: "comparison", text: "How the options compare" },
    {
      type: "table",
      caption: "In-house, project-based and embedded product design compared",
      head: ["", "In-house hire", "Defined project", "Embedded partner"],
      rows: [
        [
          "Continuity",
          "High, for as long as the person stays.",
          "Ends with the project. Context has to be handed over.",
          "Continues for as long as the engagement runs.",
        ],
        [
          "Scope flexibility",
          "Works on whatever the business prioritises.",
          "Agreed in advance. Changes are renegotiated.",
          "Priorities agreed regularly, within the agreed level of support.",
        ],
        [
          "Internal management",
          "You recruit, manage, review and develop the designer.",
          "You own the brief and approvals. The provider manages the work.",
          "You set priorities. The partner manages how the work gets done.",
        ],
        [
          "Product context",
          "Builds deep context over time.",
          "Builds context for the scope at hand.",
          "Builds context over time, alongside your team.",
        ],
        [
          "Capacity",
          "One person’s working time, minus everything else they are asked to do.",
          "Planned around the project.",
          "As agreed in the engagement. Not necessarily full-time or dedicated.",
        ],
        [
          "Cost structure",
          "Salary, employment costs, recruitment, equipment and management time.",
          "A fee for the agreed scope.",
          "A recurring fee, usually monthly.",
        ],
      ],
    },
    { type: "h2", id: "partner-vs-dedicated", text: "An ongoing partner is not a full-time employee" },
    {
      type: "p",
      text: "Some providers offer a dedicated designer who works only on your product for a full working week. Others work on your product as an agreed priority alongside other clients. Both can work well. They are different arrangements.",
    },
    {
      type: "p",
      text: "Before signing, find out which one you are getting: how much time is committed, how quickly requests are picked up, and what happens when you have more work than the engagement covers. A monthly fee does not mean you are buying a full-time person, and comparing it directly with a salary can mislead in either direction.",
    },
    { type: "h2", id: "scenarios", text: "Four common situations" },
    {
      type: "p",
      text: "These scenarios are illustrative. They describe typical situations rather than specific companies.",
    },
    { type: "h3", text: "You have a defined redesign" },
    {
      type: "p",
      text: "You know which part of the product needs to change, such as onboarding or a reporting area, and you want it designed and handed over within a known timeframe. A defined project usually fits. You get a clear deliverable and cost without creating a permanent role you may not need afterwards. [How to scope a SaaS redesign without rebuilding everything](/blog/how-to-scope-saas-redesign) explains how to define the work.",
    },
    { type: "h3", text: "You have a continuing roadmap" },
    {
      type: "p",
      text: "You ship new features regularly and need design throughout: shaping requirements, designing flows and reviewing what gets built. An embedded arrangement fits better than a series of separate projects, because the designer keeps context from one feature to the next. Exalt’s [work with Scout](/case-studies/scout) is one example: more than two years embedded alongside Scout’s lead designer as the product developed. The two models also combine. [Openlane](/case-studies/openlane) began with a full UI refactor and continued as an ongoing partnership.",
    },
    { type: "h3", text: "Your design team needs support" },
    {
      type: "p",
      text: "You already have designers, but the signs of strain are visible: features reach engineering before design has looked at them, the design system stalls behind feature work, or a complex workflow needs more focused time than anyone can give it. An external partner can add capacity or specific experience. This works best when the partner adopts your team’s conventions and your designers keep ownership of design decisions.",
    },
    { type: "h3", text: "You are ready for a first permanent designer" },
    {
      type: "p",
      text: "Design work is constant, the product direction is stable enough to plan around, and someone in the business can support a designer’s work and growth. This is often the point to hire. An external partner can still help before the hire starts, for example by establishing a component library the new designer will inherit.",
    },
    { type: "h2", id: "when-in-house", text: "When an in-house hire is the strongest choice" },
    {
      type: "ul",
      items: [
        "Design is needed full-time for the foreseeable future, not in bursts.",
        "The product is central to the business and you want design knowledge to stay inside the company.",
        "Good design decisions depend on daily contact with customers, sales and support.",
        "You can give the role a clear remit, the right tools and a manager who understands design.",
        "You can wait for a hiring process, and for the new person to learn the product.",
      ],
    },
    {
      type: "p",
      text: "The last two points are easy to underestimate. A first designer hired without a clear remit or support can end up producing screens to order without the authority to shape the product. If you hire, give the role access to customers and a real say in product decisions.",
    },
    { type: "h2", id: "total-cost", text: "Comparing total cost" },
    {
      type: "p",
      text: "A salary and a monthly fee are rarely like for like, so avoid converting one into the other. Instead, list what each option involves over the period you actually need design support:",
    },
    {
      type: "ul",
      items: [
        "**A hire:** salary and benefits, employer taxes and contributions where you operate, recruitment fees or time, software and equipment, management time, and the months before the person is fully effective. Add the cost of the role sitting empty if they leave.",
        "**A defined project:** the fee, your team’s time for briefing and reviews, and anything excluded from scope, such as implementation.",
        "**An ongoing engagement:** the monthly fee, any minimum term or notice period, the internal time spent setting priorities, and what happens to work beyond the agreed level.",
      ],
    },
    {
      type: "p",
      text: "Then compare like periods. A permanent hire makes more sense the longer and steadier the need. For a redesign expected to take a few months, the relevant comparison is a few months of each option, not a year of salary against a year of fees.",
    },
    { type: "h2", id: "questions", text: "Questions to ask any provider" },
    {
      type: "ol",
      items: [
        "Who will do the work day to day, and how experienced are they?",
        "How much of their time is committed to us each week or month?",
        "How many other clients or projects will they be working on at the same time?",
        "How do we request work, and how quickly is it usually picked up?",
        "What happens when we have more work than the engagement covers?",
        "How do you hand work to our engineers, and will you review what gets built?",
        "Who owns the design files, components and any code produced?",
        "How do we pause or end the engagement, and how much notice is needed?",
        "What will you leave behind so our team, or a future hire, can carry on?",
      ],
    },
    {
      type: "p",
      text: "Clear answers to these questions tell you more than the label a provider uses for itself.",
    },
    { type: "h2", id: "how-exalt-works", text: "How Exalt works" },
    {
      type: "p",
      text: "Exalt offers both a defined project and an ongoing partnership. In both, you work directly with Luke Dalton, Exalt’s founder, supported by a senior product designer.",
    },
    {
      type: "ul",
      items: [
        "**Fixed-Price Project**, from $6,000 per project. For defined work, from new features to full product redesigns, with the scope, timeline and fee agreed before kickoff.",
        "**Embedded Design Partner**, from $7,000 per month. Ongoing product strategy, UX and UI against agreed priorities, with weekly planning and Slack collaboration, on a flexible monthly renewal.",
      ],
    },
    {
      type: "p",
      text: "Both are starting prices, not quotes. In an ongoing engagement, how much gets done in a month depends on the size of each request: we estimate requests before starting them and flag early if priorities need to shift. Scope, availability and terms are confirmed before work begins, and larger front-end builds are quoted separately. The details are in the [pricing section](/#pricing) of our site.",
    },
  ],
  cta: {
    heading: "Looking for ongoing design support?",
    body: "Tell us about your roadmap and your team. We’ll talk through whether a defined project or an ongoing partnership fits, and what it would cover.",
    label: "Discuss ongoing design support",
    destination: "intro-call",
  },
  related: ["saas-product-redesign-cost", "how-to-scope-saas-redesign", "saas-ux-audit"],
};

const auditArticle: BlogArticle = {
  slug: "saas-ux-audit",
  title: "SaaS UX audits: what to review and what you should get back",
  excerpt:
    "How to bound a UX audit around a real task, what to review in a B2B product, how a useful finding is written, and what an audit can and cannot tell you.",
  description:
    "What a SaaS UX audit is, the evidence it can and cannot provide, what to review in a B2B product, a worked example finding, and what a useful audit handoff contains.",
  topic: "UX audits",
  author: luke,
  status: "published",
  publishedAt: launchDate,
  intro:
    "A UX audit is a structured review of how well a product supports the tasks people use it for. It is most useful when you can point to a task that causes trouble but are not sure why, or before a redesign, to decide what actually needs to change.",
  body: [
    {
      type: "p",
      text: "A good audit gives you specific, prioritised findings you can act on. On its own, it does not give you certainty about user behaviour, and it should be honest about that difference.",
    },
    { type: "h2", id: "when-useful", text: "When an audit is useful" },
    {
      type: "ul",
      items: [
        "Support requests or sales feedback keep pointing to the same part of the product.",
        "Activation, or adoption of a feature, is lower than expected and the cause is unclear.",
        "You are planning a redesign and need to decide what to change first.",
        "The product has grown feature by feature and nobody has reviewed it as a whole.",
        "You have data, such as analytics or session recordings, but no one has had time to interpret it.",
      ],
    },
    {
      type: "p",
      text: "An audit is less useful when the problem is already well understood and the team simply needs design capacity, or when the real question is about pricing, positioning or missing features rather than the experience itself.",
    },
    { type: "h2", id: "evidence", text: "Three kinds of evidence" },
    {
      type: "p",
      text: "“Audit” is used for several different activities. They answer different questions, and the strongest audits combine more than one.",
    },
    {
      type: "table",
      caption: "Sources of evidence in a UX audit",
      head: ["Method", "What it shows", "What it cannot show"],
      rows: [
        [
          "Expert review",
          "Where the interface breaks established usability principles, behaves inconsistently or makes a task harder than it needs to be.",
          "Whether real users actually struggle there, or how often.",
        ],
        [
          "Analytics review",
          "Where people drop out, which features they use and how long tasks take.",
          "Why people behave that way.",
        ],
        [
          "User testing",
          "How real users attempt a task, in their own words, and where they get stuck.",
          "How common a problem is across your whole customer base, unless testing is done at scale.",
        ],
      ],
    },
    {
      type: "p",
      text: "An expert review is often the quickest place to start. It usually draws on recognised principles, such as Jakob Nielsen’s [10 usability heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/), together with knowledge of how B2B products are used. Its findings are informed judgements. Analytics and testing then show which of them matter most.",
    },
    { type: "h2", id: "bound-the-audit", text: "Bound the audit around a task" },
    {
      type: "p",
      text: "Reviewing a whole product at once tends to produce a long list of small issues. A tighter scope produces more useful findings. Define three things before starting:",
    },
    {
      type: "ol",
      items: [
        "**The task.** A specific job, such as “set up a workspace and invite the team” or “find an overdue invoice and send a reminder”.",
        "**The role.** Who is doing it: a new admin, an experienced daily user, a read-only stakeholder. The same screens can work well for one and badly for another.",
        "**The outcome.** What success looks like for the user and the business, such as completing setup without contacting support.",
      ],
    },
    {
      type: "p",
      text: "Then work through the task from start to finish with realistic data and the right permissions, including what happens when things go wrong.",
    },
    { type: "h2", id: "review-areas", text: "What to review in a B2B product" },
    { type: "h3", text: "Onboarding" },
    {
      type: "p",
      text: "Does a new user understand what to do first and reach something useful without help? Look at empty states, setup steps, sample data and how the product explains what each step is for.",
    },
    { type: "h3", text: "Navigation" },
    {
      type: "p",
      text: "Can people find the area they need and tell where they are? Check whether labels use the words customers use, and whether related tasks sit near each other.",
    },
    { type: "h3", text: "Core workflows" },
    {
      type: "p",
      text: "Can someone who does the main task every day complete it efficiently? Count the steps, look for repeated data entry, and check whether the product remembers sensible choices.",
    },
    { type: "h3", text: "Tables and filtering" },
    {
      type: "p",
      text: "Can users find, compare and act on the records they need? Review search, filters, sorting, column choices and saved views, and how selection works, especially across pages.",
    },
    { type: "h3", text: "Permissions" },
    {
      type: "p",
      text: "Does each role see what it should, and understand why something is unavailable? Look for actions that disappear without explanation, and errors that only appear after someone has done the work.",
    },
    { type: "h3", text: "Feedback and system status" },
    {
      type: "p",
      text: "Does the product confirm what happened after an action, show progress for long-running work, and make it clear when data is saving, syncing or out of date?",
    },
    { type: "h3", text: "Error recovery" },
    {
      type: "p",
      text: "When something fails, does the message explain what happened and what to do next? Can people undo destructive actions or recover work they had partly completed?",
    },
    { type: "h3", text: "Accessibility" },
    {
      type: "p",
      text: "Can the task be completed with a keyboard alone? Is text readable, with enough contrast? Are form fields labelled and errors announced to assistive technology? The [Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/WCAG22/) are the reference standard.",
    },
    { type: "h2", id: "checklist", text: "A checklist to start with" },
    {
      type: "p",
      text: "Work through these questions for one task and one role. They are a starting point, not a complete audit.",
    },
    {
      type: "ul",
      items: [
        "Can a new user tell what the task is for and where to begin?",
        "Do labels use the customer’s language rather than internal names?",
        "Is the current step, and overall progress, always clear?",
        "Are defaults sensible, and are earlier choices remembered?",
        "Does every action confirm what changed?",
        "Is it clear which records an action will affect before it runs?",
        "Can destructive actions be undone, or are they confirmed with specifics?",
        "Do empty, loading and error states explain what to do next?",
        "Does each role understand why an option is unavailable to them?",
        "Can the task be completed using only a keyboard?",
        "Can someone stop halfway and pick up where they left off?",
      ],
    },
    { type: "h2", id: "worked-example", text: "A worked example: one finding" },
    {
      type: "callout",
      label: "Illustrative example",
      text: "This finding is invented to show how a finding should be written. It is not drawn from a client project or real user data.",
    },
    {
      type: "p",
      text: "An admin console lists a company’s user accounts, 50 per page. An admin filters to inactive users, ticks “Select all” and chooses “Deactivate”. The filter matches 1,240 accounts.",
    },
    {
      type: "dl",
      items: [
        [
          "Observation",
          "“Select all” selects every account matching the filter, including those on other pages. The confirmation asks “Deactivate selected users?” without saying how many accounts are affected or that they extend beyond the visible page.",
        ],
        [
          "Evidence available",
          "Expert review against two heuristics: visibility of system status and error prevention. Support tickets or audit logs could show whether accidental bulk deactivations happen; in this example they have not been checked.",
        ],
        [
          "Possible consequence",
          "An admin intending to deactivate the 50 visible accounts deactivates 1,240, locking people out of the product. Restoring access takes time and support effort, and may not restore everything if deactivation removes settings.",
        ],
        [
          "Confidence",
          "Medium. The interface clearly fails to communicate the selection scope, but how often this causes real mistakes is unknown.",
        ],
        [
          "Recommendation",
          "After “Select all”, show “All 50 on this page are selected. Select all 1,240 matching users?” Put the exact count in the confirmation button, such as “Deactivate 1,240 users”, and offer undo once the action completes.",
        ],
        [
          "Validation",
          "Check support tickets and logs for unintended bulk changes. Then test the revised pattern with a few admins doing a bulk task, and check they can say how many accounts will change before they confirm.",
        ],
      ],
    },
    {
      type: "p",
      text: "Written this way, the finding separates what was seen from what is inferred, and tells the team how to find out whether it matters.",
    },
    { type: "h2", id: "handoff", text: "What you should get back" },
    {
      type: "p",
      text: "A useful audit is more than a deck of annotated screenshots. Expect:",
    },
    {
      type: "ul",
      items: [
        "**Annotated findings**, each tied to a specific screen and step in the task.",
        "**Prioritisation**, based on the effect on the task and the reviewer’s confidence, not only on how visible the issue is.",
        "**Reasoning**, so your team can understand and challenge each finding.",
        "**Recommended actions**, specific enough to estimate, with trade-offs noted.",
        "**Open research questions**: what the audit could not answer, and how to find out.",
      ],
    },
    {
      type: "p",
      text: "Agree in advance which of these you will receive and in what format. A shared document or annotated design file is often easier to act on than a presentation.",
    },
    { type: "h2", id: "limits", text: "What an audit cannot tell you" },
    {
      type: "p",
      text: "An expert review can identify likely causes of friction. It cannot prove why customers churn, or guarantee that fixing an issue will improve conversion. Churn and conversion depend on pricing, product fit, sales, support and competition as well as usability.",
    },
    {
      type: "p",
      text: "Treat findings as well-reasoned hypotheses. Where a finding is important or expensive to fix, check it with data or user testing before committing significant development time.",
    },
    { type: "h2", id: "next-steps", text: "Targeted fixes or broader discovery?" },
    {
      type: "p",
      text: "Targeted fixes are usually enough when findings cluster around particular screens or patterns, the underlying workflow makes sense to users, and changes can be made without restructuring the product.",
    },
    {
      type: "p",
      text: "Broader discovery may be needed when findings point to a mismatch between how the product is organised and how customers work, when different roles need fundamentally different things, or when the audit raises more questions than it answers. In that case the next step is research, then a scoped redesign. [How to scope a SaaS redesign without rebuilding everything](/blog/how-to-scope-saas-redesign) covers how to define that work, and [How much does a SaaS product redesign cost?](/blog/saas-product-redesign-cost) explains what drives its budget.",
    },
  ],
  cta: {
    heading: "Get a free review of one workflow",
    body: "We’ll review one key workflow in your product and send back usability issues, opportunities for improvement and practical next steps. It is a focused expert review of a single workflow, not a full product audit or user research.",
    label: "Request a free workflow review",
    destination: "free-audit",
  },
  related: ["how-to-scope-saas-redesign", "saas-product-redesign-cost", "in-house-vs-agency-vs-embedded-design"],
};

const scopeArticle: BlogArticle = {
  slug: "how-to-scope-saas-redesign",
  title: "How to scope a SaaS redesign without rebuilding everything",
  excerpt:
    "Define a redesign around one complete user task, separate what must change from what could, and agree the scope with engineering before anything is designed.",
  description:
    "How to scope a SaaS redesign around one complete user task: find the problem, map roles, states and dependencies, and agree scope with engineering.",
  topic: "Scoping",
  author: luke,
  status: "published",
  publishedAt: launchDate,
  image: {
    src: "/images/work/voren/01.webp",
    width: 2880,
    height: 1800,
    alt: "Voren backtests table listing trading strategies with created date, broker, symbols and assignee",
  },
  intro:
    "Scope a redesign around a complete user task, not a set of screens. Choose the task causing the most trouble, follow it from start to finish for each role, and include everything needed to do it well: every step, state and dependency. Leave everything else out, deliberately and in writing.",
  body: [
    {
      type: "p",
      text: "That gives you a redesign your team can design, build and release without pausing the rest of the roadmap.",
    },
    { type: "h2", id: "kinds-of-change", text: "Decide what kind of change you need" },
    {
      type: "p",
      text: "Teams say “redesign” when they mean very different things. Naming the type of change early stops a visual update from quietly becoming a rebuild.",
    },
    {
      type: "ul",
      items: [
        "**Visual refresh:** new typography, colour, spacing and components, with workflows unchanged. Low risk to users, but it rarely fixes usability problems.",
        "**Workflow redesign:** a task is restructured, changing its steps, logic, defaults and feedback. This is the level at which problems with a task can actually be fixed.",
        "**Information architecture change:** navigation, naming and where things live. It affects every user’s habits, so it needs the most care at rollout.",
        "**Technical rebuild:** the underlying code or data model is replaced. Sometimes necessary, but it is an engineering decision with design implications, not a design project.",
      ],
    },
    {
      type: "p",
      text: "One project can combine these, such as a workflow redesign that adopts a refreshed visual style. What matters is deciding which applies to which part of the product. [How much does a SaaS product redesign cost?](/blog/saas-product-redesign-cost) explains how each type affects the budget.",
    },
    { type: "h2", id: "identify-the-problem", text: "Identify the problem" },
    {
      type: "p",
      text: "Start with the evidence you already have. Each source tells you something different:",
    },
    {
      type: "ul",
      items: [
        "**Support evidence:** tickets, chat logs and help-centre searches show where people get stuck, and what they call things.",
        "**Usage data:** funnels, feature usage and time on task show where people drop out or slow down.",
        "**Customer research:** interviews, sales calls and usability sessions explain why.",
      ],
    },
    {
      type: "p",
      text: "Write the problem as one sentence naming the user, the task and the consequence. An illustrative example: “Account managers can’t quickly find and update a customer’s billing contact, so changes are delayed and support handles them instead.” If you cannot write that sentence yet, an audit is a better first step than a redesign. [SaaS UX audits: what to review and what you should get back](/blog/saas-ux-audit) explains how to approach one.",
    },
    { type: "h2", id: "map-the-workflow", text: "Map the workflow" },
    {
      type: "p",
      text: "Follow the task from the moment someone decides to do it until it is finished. For each step, note:",
    },
    {
      type: "ul",
      items: [
        "**Roles:** who performs the step, and how their access differs.",
        "**States:** empty, loading, error, partial success, no permission, and unusually large or long data.",
        "**Dependencies:** the APIs, data, shared components, notifications and other features the step relies on.",
        "**Entry points:** everywhere the task can start, such as navigation, search, an email link or a notification.",
      ],
    },
    {
      type: "p",
      text: "This map is where the real size of a redesign usually becomes visible. A step that looks simple may rely on a shared component used in a dozen other places.",
    },
    { type: "h2", id: "necessary-vs-adjacent", text: "Separate necessary changes from adjacent ones" },
    {
      type: "p",
      text: "Mapping a workflow surfaces plenty of problems, and it is tempting to fix them all. Sort each one:",
    },
    {
      type: "ol",
      items: [
        "**Necessary:** the task cannot be done well without it. This is in scope.",
        "**Adjacent:** it would improve a nearby task or screen, but the main task works without it. Note it for a later phase.",
        "**Out of scope:** it belongs to a different problem altogether.",
      ],
    },
    {
      type: "p",
      text: "A useful test for an adjacent improvement: if it were not done, would the redesigned task still meet its success measure? If so, it can wait.",
    },
    { type: "h2", id: "scope-table", text: "A scope table you can reuse" },
    {
      type: "p",
      text: "Recording scope in a table makes inclusions and exclusions explicit, and gives design and engineering the same reference. Use one row per user task:",
    },
    {
      type: "table",
      caption: "Reusable redesign scope table",
      head: [
        "User task",
        "Current problem",
        "Proposed change",
        "Included states",
        "Dependencies",
        "Exclusions",
        "Success measure",
      ],
      rows: [
        [
          "The job, in the user’s words",
          "What goes wrong today, and the evidence for it",
          "What will change, in a sentence or two",
          "Every state that will be designed",
          "APIs, data, components and teams involved",
          "What is deliberately left out",
          "How you will know it worked",
        ],
      ],
    },
    { type: "h2", id: "example", text: "Example: find, review and update a record" },
    {
      type: "callout",
      label: "Illustrative example",
      text: "This example is invented to show the method. It is not based on a client project.",
    },
    {
      type: "p",
      text: "A B2B product lets account managers look after customer accounts. Support tickets suggest they struggle to update a customer’s billing contact: search often opens the wrong account, billing details are split across two tabs, and the field they need sits deep in settings. The team had considered redesigning the whole customer area. Mapped as a task, the scope is much narrower:",
    },
    {
      type: "table",
      caption: "Illustrative scope for updating a customer record",
      head: [
        "User task",
        "Current problem",
        "Proposed change",
        "Included states",
        "Dependencies",
        "Exclusions",
        "Success measure",
      ],
      rows: [
        [
          "Find the right customer",
          "Search only matches exact company names, and similar names are hard to tell apart",
          "Search by name, email or account ID, with account owner and location shown in results",
          "Results, no results, many results, slow response",
          "Search API support for email and ID",
          "Redesigning the full customer list",
          "Users open the correct account first time in testing",
        ],
        [
          "Review the account",
          "Billing details are split across two tabs",
          "A summary panel on the record showing billing contact and status",
          "Default, missing billing contact, read-only role",
          "Customer and billing APIs",
          "Account health metrics",
          "Users confirm billing details without switching tabs",
        ],
        [
          "Update the billing contact",
          "The field is buried in settings and save errors are unclear",
          "Edit in place from the summary panel, with inline validation",
          "Editing, validation error, save failed, no permission, edited by someone else",
          "Permissions service, audit log",
          "Invoice templates",
          "Fewer support tickets about billing contact changes",
        ],
      ],
    },
    {
      type: "p",
      text: "The customer list, account health and invoicing stay as they are. Three rows replace an open-ended “customer area redesign”, and every state the team will need to build is named before design starts.",
    },
    { type: "h2", id: "involve-engineering", text: "Involve engineering before the scope is final" },
    {
      type: "p",
      text: "Engineers know where the cost and risk sit. Review the draft scope table with them before agreeing it, and ask:",
    },
    {
      type: "ul",
      items: [
        "Which dependencies are harder than they look, and which already exist?",
        "Which shared components would a change affect elsewhere in the product?",
        "Do the APIs return the data the new design needs, quickly enough?",
        "Can the change be released gradually, for example behind a feature flag?",
        "Is any part cheaper to build another way, with a similar result for users?",
      ],
    },
    {
      type: "p",
      text: "Their answers may move items between necessary and adjacent, or change the proposed design. That is the point: changing a scope table is far cheaper than changing a half-built feature.",
    },
    { type: "h2", id: "rollout", text: "Sequence the rollout" },
    {
      type: "p",
      text: "Release the redesign in stages that each leave the product working:",
    },
    {
      type: "ol",
      items: [
        "Ship shared components or visual updates first if later steps depend on them.",
        "Release the redesigned workflow to internal users, then to a group of customers who opt in or are selected.",
        "Watch the success measure, support requests and feedback, and fix issues before releasing more widely.",
        "Retire the old version once the new one is stable, with notice for anyone who relied on it.",
      ],
    },
    {
      type: "p",
      text: "Preserve familiar behaviour where it still works. Keyboard shortcuts, column orders, saved filters, URLs and the names of things are part of how experienced users do their jobs. Change them only when the change solves part of the problem, and tell people when you do.",
    },
    { type: "h2", id: "voren", text: "A project example: Voren" },
    {
      type: "p",
      text: "Exalt’s [redesign of Voren](/case-studies/voren), a platform for building, backtesting and exporting automated trading strategies without code, had to fit a launch deadline and a defined budget. The work covered the strategy builder, the journey through onboarding, backtesting and optimisation, and a design system for light and dark modes, and was delivered in eight weeks, ahead of Voren’s public launch. That timeline reflects that project’s scope and deadline; it is an example, not a standard duration.",
    },
    {
      type: "figure",
      image: {
        src: "/images/work/voren/01.webp",
        width: 2880,
        height: 1800,
        alt: "Voren backtests table listing trading strategies with created date, broker, symbols and assignee",
      },
      caption: "Voren’s backtests view, part of the redesigned journey from building a strategy to reviewing its results.",
    },
    { type: "h2", id: "project-brief", text: "A project brief you can copy" },
    {
      type: "p",
      text: "Use this as the starting point for an internal planning document, or to brief a design partner. Replace the prompts in square brackets.",
    },
    {
      type: "template",
      label: "Redesign project brief",
      text: `Project brief: [name of the workflow]

Problem
[Who] struggles to [task] because [cause].
As a result, [consequence].

Evidence
- Support: [recurring themes or ticket examples]
- Usage data: [where people drop out or slow down]
- Research: [interviews, sales calls or testing]

Users and roles
- [Role]: [what they need to do, and their access]

In scope
- Task: [user task]
  States: [default, empty, loading, error, no permission, ...]

Out of scope for now
- [Adjacent improvement or separate problem]

Dependencies
- [APIs, data, shared components, other teams]

Constraints
- Platforms: [desktop, mobile or both]
- Front-end stack: [framework and component library]
- Dates: [fixed deadlines and why]

Success measure
- [How you will know the redesign worked]

Rollout
- [Internal, selected customers, everyone]`,
    },
  ],
  cta: {
    heading: "Have a defined redesign in mind?",
    body: "Share the workflow and the problem you want to solve. We’ll agree the scope, timeline and a fixed fee before kickoff.",
    label: "Discuss your redesign project",
    destination: "intro-call",
  },
  related: ["saas-product-redesign-cost", "saas-ux-audit", "in-house-vs-agency-vs-embedded-design"],
};

export const articles: readonly BlogArticle[] = [costArticle, resourcingArticle, auditArticle, scopeArticle];
