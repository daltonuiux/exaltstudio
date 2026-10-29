import type { Metadata } from "next";

import { BlogShell } from "@/components/blog/blog-shell";
import { BlogIndex } from "@/components/blog/journal";
import { blogIntro, getPublishedArticles } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

const articles = getPublishedArticles();
const title = "Blog";

export const metadata: Metadata = {
  title,
  description: blogIntro.description,
  alternates: { canonical: "/blog" },
  // Kept out of search results until there is something to read; the sitemap
  // follows the same rule.
  ...(articles.length === 0 ? { robots: { index: false, follow: true } } : {}),
  // openGraph/twitter replace the layout's objects wholesale rather than
  // merging, so the social card has to be restated here.
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: `${title} — ${siteConfig.name}`,
    description: blogIntro.description,
    url: "/blog",
    locale: siteConfig.locale,
    images: [{ url: "/exalt-social-card-v2.jpg", type: "image/jpeg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} — ${siteConfig.name}`,
    description: blogIntro.description,
    images: ["/exalt-social-card-v2.jpg"],
  },
};

export default function BlogPage() {
  return (
    <BlogShell>
      <BlogIndex articles={articles} />
    </BlogShell>
  );
}
