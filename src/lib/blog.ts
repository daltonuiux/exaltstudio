import type { Metadata } from "next";

import { articles } from "@/lib/blog-articles";
import { siteConfig } from "@/lib/site";

/**
 * Types and helpers for the blog. The articles themselves live in
 * blog-articles.ts: plain typed data, like case-studies.ts, so there is no CMS
 * or markdown pipeline to maintain.
 *
 * An article reaches /blog, its own page, related lists and the sitemap only
 * when it is `published` with a real `publishedAt`; drafts 404. Everything
 * public goes through `getPublishedArticles()` / `getPublishedArticle()`.
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
  /** Term and description pairs, e.g. the parts of an audit finding. */
  | { readonly type: "dl"; readonly items: readonly (readonly [string, string])[] }
  | { readonly type: "figure"; readonly image: BlogImage; readonly caption: string }
  | { readonly type: "callout"; readonly label: string; readonly text: string }
  /** Plain text for readers to copy, shown with a copy button. */
  | { readonly type: "template"; readonly label: string; readonly text: string };

export type BlogAuthor = {
  readonly name: string;
  readonly jobTitle: string;
};

/** The article's one closing call to action. */
export type BlogCta = {
  readonly heading: string;
  readonly body: string;
  readonly label: string;
  /** Which of the site's booking links it opens. */
  readonly destination: "intro-call" | "free-audit";
};

export type BlogArticle = {
  readonly slug: string;
  readonly title: string;
  /** <title> and social title when the H1 is too long for one. */
  readonly seoTitle?: string;
  /** One or two sentences for listings. */
  readonly excerpt: string;
  /** Meta description. */
  readonly description: string;
  /** Short topic label, shown as an eyebrow. */
  readonly topic: string;
  readonly author: BlogAuthor;
  readonly status: "draft" | "published";
  /** ISO date. Required to publish; never backdated. */
  readonly publishedAt?: string;
  readonly updatedAt?: string;
  /** Only where a screenshot adds information; most articles are text-led. */
  readonly image?: BlogImage;
  /** The article's opening paragraph, shown under the title. */
  readonly intro: string;
  readonly body: readonly BlogBlock[];
  readonly cta: BlogCta;
  /** Two or three slugs, in order. Unpublished ones are skipped. */
  readonly related: readonly string[];
};

/** Intro copy for the index. */
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
  return article.body.flatMap((b) => (b.type === "h2" ? [{ id: b.id, text: b.text }] : []));
}

export function ctaHref(cta: BlogCta) {
  return cta.destination === "free-audit" ? siteConfig.auditBookingUrl : siteConfig.bookingUrl;
}

/** Plain text of a string carrying inline marks. */
function plain(text: string) {
  return text.replace(/\*\*/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
}

function blockText(block: BlogBlock): string[] {
  switch (block.type) {
    case "ul":
    case "ol":
      return block.items.map(plain);
    case "table":
      return [...block.head, ...block.rows.flat()];
    case "dl":
      return block.items.flat();
    case "figure":
      return [block.caption];
    case "callout":
    case "template":
      return [block.label, plain(block.text)];
    default:
      return [plain(block.text)];
  }
}

export function getWordCount(article: BlogArticle): number {
  return [article.intro, ...article.body.flatMap(blockText)].join(" ").split(/\s+/).filter(Boolean).length;
}

/** Whole minutes at ~230 words a minute, from the final content. */
export function getReadingMinutes(article: BlogArticle): number {
  return Math.max(1, Math.round(getWordCount(article) / 230));
}

/** "29 October 2026", or "Draft" while there is no publication date. */
export function formatPublished(article: BlogArticle): string {
  if (article.status !== "published" || !article.publishedAt) return "Draft";
  return new Intl.DateTimeFormat("en-GB", { dateStyle: "long", timeZone: "UTC" }).format(
    new Date(article.publishedAt),
  );
}

/* ---------------------------------------------------------------------------
   SEO for /blog/[slug]. Only ever called with published articles.
--------------------------------------------------------------------------- */

const socialCard = { url: "/exalt-social-card-v2.jpg", type: "image/jpeg" } as const;

export function articleUrl(article: BlogArticle) {
  return `/blog/${article.slug}`;
}

export function articleMetadata(article: BlogArticle): Metadata {
  const url = articleUrl(article);
  const title = article.seoTitle ?? article.title;
  const image = article.image
    ? { url: article.image.src, width: article.image.width, height: article.image.height, alt: article.image.alt }
    : socialCard;
  return {
    title,
    description: article.description,
    alternates: { canonical: url },
    authors: [{ name: article.author.name }],
    // openGraph/twitter replace the layout's objects wholesale rather than
    // merging, so everything is restated here.
    openGraph: {
      type: "article",
      siteName: siteConfig.name,
      title,
      description: article.description,
      url,
      locale: siteConfig.locale,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt ?? article.publishedAt,
      authors: [article.author.name],
      section: article.topic,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: article.description,
      images: [image.url],
    },
  };
}

/** schema.org BlogPosting, for a <script type="application/ld+json"> tag. */
export function articleJsonLd(article: BlogArticle) {
  const url = `${siteConfig.url}${articleUrl(article)}`;
  const organization = { "@type": "Organization", name: siteConfig.name, url: siteConfig.url };
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    image: `${siteConfig.url}${article.image?.src ?? socialCard.url}`,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    inLanguage: "en-GB",
    wordCount: getWordCount(article),
    articleSection: article.topic,
    author: {
      "@type": "Person",
      name: article.author.name,
      jobTitle: article.author.jobTitle,
      worksFor: organization,
    },
    publisher: organization,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
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
