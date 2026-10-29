import type { Metadata } from "next";

import { siteConfig } from "@/lib/site";

/**
 * Single content source for the blog: every index, article page and related
 * list reads from `articles` below. Plain typed data, like case-studies.ts, so
 * there is no CMS or markdown pipeline to maintain.
 *
 * Articles are `draft` until they are set to `published` with a real
 * `publishedAt`. Drafts never reach /blog, its article pages, related lists,
 * the sitemap or search indexes: everything public goes through
 * `getPublishedArticles()` / `getPublishedArticle()`. No dates are invented.
 *
 * Body copy is structured blocks rather than HTML, so it renders as real,
 * crawlable markup. Text supports two inline marks only: **bold** and
 * [label](href) links.
 */

export type BlogImage = {
  readonly src: string;
  readonly width: number;
  readonly height: number;
  /** Describes the screen, for screen readers and image search. */
  readonly alt: string;
};

export type BlogBlock =
  | { readonly type: "p"; readonly text: string }
  | { readonly type: "h2"; readonly id: string; readonly text: string }
  | { readonly type: "h3"; readonly text: string }
  | { readonly type: "ul"; readonly items: readonly string[] }
  | { readonly type: "ol"; readonly items: readonly string[] }
  | {
      readonly type: "table";
      readonly caption: string;
      readonly head: readonly string[];
      readonly rows: readonly (readonly string[])[];
    }
  | { readonly type: "figure"; readonly image: BlogImage; readonly caption: string }
  | { readonly type: "callout"; readonly label: string; readonly text: string };

export type BlogAuthor = {
  readonly name: string;
  readonly role: string;
};

/** Groups for the library layout. One per article; not shown as filters. */
export type BlogGroup = "budget-and-team" | "planning-the-work" | "designing-the-product";

export const blogGroups: Record<BlogGroup, string> = {
  "budget-and-team": "Budget and team",
  "planning-the-work": "Planning the work",
  "designing-the-product": "Designing the product",
};

export type BlogArticle = {
  readonly slug: string;
  readonly title: string;
  /** One or two sentences for listings. */
  readonly excerpt: string;
  /** Meta description; falls back to the excerpt. */
  readonly description?: string;
  /** Short topic label, shown as an eyebrow. */
  readonly topic: string;
  readonly group: BlogGroup;
  readonly author: BlogAuthor;
  readonly status: "draft" | "published";
  /** ISO date. Required to publish; never invented for drafts. */
  readonly publishedAt?: string;
  readonly updatedAt?: string;
  readonly image: BlogImage;
  /** The article's opening paragraph, shown under the title. */
  readonly intro: string;
  /** Absent until the article is written. */
  readonly body?: readonly BlogBlock[];
  /** Two or three slugs, in order. */
  readonly related: readonly string[];
  /** Leads layouts that feature one article. At most one should be set. */
  readonly featured?: boolean;
};

const luke: BlogAuthor = { name: "Luke Dalton", role: "Exalt Studio" };

/** 16:10 case-study screenshots, committed at 2880x1800. */
const shot = (src: string, alt: string): BlogImage => ({ src, width: 2880, height: 1800, alt });
/** 16:10 work samples, committed at 1400x875. */
const sample = (src: string, alt: string): BlogImage => ({ src, width: 1400, height: 875, alt });

/** Display order: also the order every index lists them in. */
export const articles: readonly BlogArticle[] = [
  {
    slug: "saas-product-redesign-cost",
    title: "How much does a SaaS product redesign cost?",
    excerpt:
      "What drives the price of a redesign, how fixed-price and retained work compare, and which decisions move the number most.",
    topic: "Pricing",
    group: "budget-and-team",
    author: luke,
    status: "draft",
    image: shot(
      "/images/work/onefin/01.webp",
      "Onefin debt portfolio simulation with profit and loss and balance sheet projections",
    ),
    intro:
      "Redesign quotes vary widely because the word covers very different amounts of work. This article breaks down what actually drives the cost.",
    related: ["scope-a-saas-redesign", "embedded-designer-vs-agency-vs-in-house", "saas-ux-audit-deliverables"],
  },
  {
    slug: "embedded-designer-vs-agency-vs-in-house",
    title: "Embedded product designer vs agency vs in-house hire",
    excerpt:
      "Three ways to add design capacity, compared on speed to start, cost, continuity and how much product context each one builds.",
    topic: "Hiring design",
    group: "budget-and-team",
    author: luke,
    status: "draft",
    image: shot(
      "/images/work/scout/01.webp",
      "Scout home screen with a prompt composer and shortcuts to agents, workflows and tables",
    ),
    intro:
      "Most teams reach the point where design is the bottleneck. The right way to add capacity depends on how long you need it and how much context the work requires.",
    related: ["saas-product-redesign-cost", "scope-a-saas-redesign", "saas-ux-audit-deliverables"],
  },
  {
    slug: "scope-a-saas-redesign",
    title: "How to scope a SaaS redesign without rebuilding everything",
    excerpt:
      "A practical way to decide what changes, what stays and what ships first, so a redesign improves the product without stalling the roadmap.",
    description:
      "How to scope a SaaS redesign: define the problem, map existing workflows, choose the right depth of change and ship a first slice without a full rebuild.",
    topic: "Scoping",
    group: "planning-the-work",
    author: luke,
    status: "draft",
    image: shot(
      "/images/work/voren/01.webp",
      "Voren backtests table listing trading strategies with broker, symbols and assignee columns",
    ),
    intro:
      "Redesigns rarely stall because the design is weak. They stall because nobody drew a boundary around the work, so a redesign slowly turns into a rebuild. This guide covers how to set that boundary.",
    body: [
      {
        type: "p",
        text: "A redesign is a decision about what to change and what to leave alone. The second half of that decision gets less attention, and it is usually where the time and budget go. The steps below are the ones we work through with product teams before any screens are designed.",
      },
      { type: "h2", id: "start-with-the-problem", text: "Start with the problem, not the screens" },
      {
        type: "p",
        text: "“The product feels dated” is a reasonable trigger, but it is not a scope. Before deciding what to redesign, write down what is going wrong for customers and for the team. Common signals include:",
      },
      {
        type: "ul",
        items: [
          "New customers need hand-holding to complete the core workflow.",
          "Sales demos rely on workarounds or carefully chosen paths.",
          "New features have no obvious home in the navigation.",
          "Areas built by different people look and behave differently.",
          "The same questions keep reaching support.",
        ],
      },
      {
        type: "p",
        text: "Turn those signals into a one-sentence problem statement. For example: **“Admins can’t set up a new workspace without help, which slows onboarding for every new account.”** A statement like that tells you which workflow matters and gives you a way to judge the result.",
      },
      { type: "h2", id: "map-what-you-have", text: "Map what you have before deciding what changes" },
      {
        type: "p",
        text: "A quick inventory prevents two expensive mistakes: redesigning screens nobody uses, and missing a dependency that forces a wider change later.",
      },
      {
        type: "ol",
        items: [
          "List the core workflows, described as tasks rather than pages.",
          "For each one, note how often it is used and how much friction it causes.",
          "Mark shared components and patterns that several workflows rely on.",
          "Record technical constraints, such as API limits or legacy front-end code.",
          "Note what already works well and should be kept as it is.",
        ],
      },
      {
        type: "p",
        text: "The output does not need to be polished. A spreadsheet or a board of annotated screenshots is enough, as long as product, design and engineering agree on it.",
      },
      { type: "h2", id: "choose-the-depth", text: "Choose the right depth of change" },
      {
        type: "p",
        text: "Not every area needs the same treatment. Deciding the depth of change per area, rather than for the whole product, is what keeps a redesign from becoming a rebuild.",
      },
      {
        type: "table",
        caption: "Three depths of redesign and when each one fits",
        head: ["Approach", "What changes", "Engineering impact", "Good fit when"],
        rows: [
          [
            "Visual refresh",
            "Typography, colour, spacing and component styling",
            "Low. Mostly styles and shared components.",
            "The product works but looks inconsistent or dated.",
          ],
          [
            "Workflow redesign",
            "Specific journeys, navigation and information architecture",
            "Medium. Front-end changes, sometimes small API changes.",
            "Particular tasks cause friction, errors or support load.",
          ],
          [
            "Rebuild",
            "The product model, architecture and most screens",
            "High. New front end and often new back-end work.",
            "The underlying model no longer matches how customers work.",
          ],
        ],
      },
      {
        type: "p",
        text: "Most products need a mix: a visual refresh across the whole interface, a workflow redesign for one or two journeys, and no rebuild at all.",
      },
      { type: "h2", id: "pick-a-first-slice", text: "Pick a first slice" },
      {
        type: "p",
        text: "Choose one workflow that matters to customers and can ship on its own. It should be valuable enough to be noticed, and contained enough that it does not depend on every other area changing at the same time.",
      },
      {
        type: "figure",
        image: shot(
          "/images/work/voren/02.webp",
          "Voren backtests list with a progress panel showing one running backtest and overall progress",
        ),
        caption:
          "Voren’s backtesting view. The redesign covered the strategy builder, backtesting and onboarding as one defined scope.",
      },
      {
        type: "callout",
        label: "A useful test",
        text: "If the first slice can’t ship without changes to every other part of the product, it is too big. Narrow it until it can.",
      },
      {
        type: "p",
        text: "Our [Voren case study](/case-studies/voren) shows what a defined scope looks like in practice: the builder, testing tools and onboarding, redesigned in eight weeks ahead of launch.",
      },
      { type: "h2", id: "plan-how-it-ships", text: "Plan how design and engineering ship it" },
      {
        type: "p",
        text: "A scope is only useful if the team can deliver it alongside the rest of the roadmap. A few habits make that easier:",
      },
      {
        type: "ul",
        items: [
          "Update shared components first, so later screens inherit the changes.",
          "Release redesigned areas behind a flag and switch them on when ready.",
          "Keep a visible list of out-of-scope requests instead of absorbing them.",
          "Review the work in the real product, not only in design files.",
        ],
      },
      { type: "h2", id: "what-the-scope-includes", text: "What a good scope document includes" },
      {
        type: "p",
        text: "The scope does not need to be long. It needs to be specific enough that anyone on the team can say whether a request is in or out.",
      },
      {
        type: "ol",
        items: [
          "The problem statement and who it affects.",
          "Workflows in scope, and workflows explicitly out of scope.",
          "The depth of change for each area.",
          "Known technical and timeline constraints.",
          "How the team will judge whether it worked.",
          "Review points where scope can be adjusted deliberately.",
        ],
      },
      {
        type: "p",
        text: "With that in place, the redesign becomes a sequence of decisions the team can make and revisit, rather than an open-ended project that competes with everything else.",
      },
    ],
    related: ["saas-product-redesign-cost", "saas-ux-audit-deliverables", "complex-b2b-workflows"],
    featured: true,
  },
  {
    slug: "saas-ux-audit-deliverables",
    title: "What a SaaS UX audit should actually deliver",
    excerpt:
      "The difference between an audit you can act on and a list of observations, and what to ask for before you commission one.",
    topic: "UX audits",
    group: "planning-the-work",
    author: luke,
    status: "draft",
    image: shot(
      "/images/work/perlon-ai/01.webp",
      "Perlon AI campaign analytics with email performance metrics and a stacked bar chart",
    ),
    intro:
      "An audit is only useful if it changes what the team does next. This article covers the outputs that make an audit actionable.",
    related: ["scope-a-saas-redesign", "saas-product-redesign-cost", "complex-b2b-workflows"],
  },
  {
    slug: "complex-b2b-workflows",
    title: "Designing complex B2B workflows: tables, filters and bulk actions",
    excerpt:
      "Patterns for data-heavy screens where users compare, select and act on many records at once, without losing their place.",
    topic: "B2B workflows",
    group: "designing-the-product",
    author: luke,
    status: "draft",
    image: sample(
      "/images/work/view.webp",
      "AeroTrack work orders table with filter fields, status labels and row actions",
    ),
    intro:
      "Tables do most of the work in B2B software. Small decisions about density, selection and filtering decide whether they feel fast or fragile.",
    related: ["ai-product-ux-beyond-chat", "saas-ux-audit-deliverables", "scope-a-saas-redesign"],
  },
  {
    slug: "ai-product-ux-beyond-chat",
    title: "AI product UX beyond the chat interface",
    excerpt:
      "Where AI features fit into existing workflows, how to show what the system did, and when a chat box is the wrong tool.",
    topic: "AI products",
    group: "designing-the-product",
    author: luke,
    status: "draft",
    image: sample(
      "/images/work/records-table.webp",
      "Signl dashboard showing surfaced leads with match scores alongside recurring search loops",
    ),
    intro:
      "A chat box is the easiest way to ship an AI feature and often not the best way to use one. This article looks at the alternatives.",
    related: ["complex-b2b-workflows", "saas-ux-audit-deliverables", "embedded-designer-vs-agency-vs-in-house"],
  },
];

/** Intro copy shared by every index layout. */
export const blogIntro = {
  label: "Blog",
  heading: "Notes on designing complex software",
  description:
    "Practical guidance for founders and product teams on redesigns, design hiring and the details of B2B and AI product UX.",
} as const;

const isPublished = (a: BlogArticle) => a.status === "published" && Boolean(a.publishedAt);

/** What public listings, the sitemap and feeds may show. */
export function getPublishedArticles(): readonly BlogArticle[] {
  return articles.filter(isPublished);
}

export function getPublishedArticle(slug: string): BlogArticle | undefined {
  return articles.find((a) => a.slug === slug && isPublished(a));
}

/** The article's `related` list, skipping anything not yet published. */
export function getRelatedArticles(article: BlogArticle): readonly BlogArticle[] {
  return article.related
    .map((slug) => getPublishedArticle(slug))
    .filter((a): a is BlogArticle => Boolean(a));
}

export function getHeadings(article: BlogArticle) {
  return (article.body ?? []).flatMap((b) => (b.type === "h2" ? [{ id: b.id, text: b.text }] : []));
}

/** Plain text of a string carrying inline marks. */
function plain(text: string) {
  return text.replace(/\*\*/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
}

/** Whole minutes at ~230 words a minute; null until there is a body. */
export function getReadingMinutes(article: BlogArticle): number | null {
  if (!article.body) return null;
  const words = [article.intro, ...article.body.flatMap(blockText)]
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 230));
}

function blockText(block: BlogBlock): string[] {
  switch (block.type) {
    case "ul":
    case "ol":
      return block.items.map(plain);
    case "table":
      return [...block.head, ...block.rows.flat()];
    case "figure":
      return [block.caption];
    default:
      return [plain(block.text)];
  }
}

/** "12 March 2027", or "Draft" while there is no publication date. */
export function formatPublished(article: BlogArticle): string {
  if (article.status !== "published" || !article.publishedAt) return "Draft";
  return new Intl.DateTimeFormat("en-GB", { dateStyle: "long", timeZone: "UTC" }).format(
    new Date(article.publishedAt),
  );
}

/* ---------------------------------------------------------------------------
   SEO for /blog/[slug]. Only ever called with published articles.
--------------------------------------------------------------------------- */

export function articleUrl(article: BlogArticle) {
  return `/blog/${article.slug}`;
}

export function articleMetadata(article: BlogArticle): Metadata {
  const url = articleUrl(article);
  const description = article.description ?? article.excerpt;
  const image = { url: article.image.src, width: article.image.width, height: article.image.height, alt: article.image.alt };
  return {
    title: article.title,
    description,
    alternates: { canonical: url },
    authors: [{ name: article.author.name }],
    openGraph: {
      type: "article",
      siteName: siteConfig.name,
      title: article.title,
      description,
      url,
      locale: siteConfig.locale,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt ?? article.publishedAt,
      authors: [article.author.name],
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description,
      images: [article.image.src],
    },
  };
}

/** schema.org Article, for a <script type="application/ld+json"> tag. */
export function articleJsonLd(article: BlogArticle) {
  const url = `${siteConfig.url}${articleUrl(article)}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description ?? article.excerpt,
    image: `${siteConfig.url}${article.image.src}`,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    author: { "@type": "Person", name: article.author.name },
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    mainEntityOfPage: url,
  };
}

/** Sitemap rows for published articles only. */
export function blogSitemapEntries() {
  return getPublishedArticles().map((a) => ({
    url: `${siteConfig.url}${articleUrl(a)}`,
    lastModified: new Date(a.updatedAt ?? a.publishedAt!),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
}
