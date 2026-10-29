import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlogShell } from "@/components/blog/blog-shell";
import { BlogPost } from "@/components/blog/journal";
import {
  articleJsonLd,
  articleMetadata,
  getPublishedArticle,
  getPublishedArticles,
  getRelatedArticles,
} from "@/lib/blog";

type PageProps = { params: Promise<{ slug: string }> };

// Only published articles exist; drafts and anything else are a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return getPublishedArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article = getPublishedArticle((await params).slug);
  return article ? articleMetadata(article) : {};
}

export default async function BlogArticlePage({ params }: PageProps) {
  const article = getPublishedArticle((await params).slug);
  if (!article) notFound();

  return (
    <BlogShell article>
      <script
        type="application/ld+json"
        // JSON.stringify output from our own typed data; `<` escaped so the
        // payload can't close the script tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(article)).replace(/</g, "\\u003c") }}
      />
      <BlogPost article={article} related={getRelatedArticles(article)} />
    </BlogShell>
  );
}
