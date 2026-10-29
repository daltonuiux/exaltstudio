import type { MetadataRoute } from "next";

import { blogSitemapEntries } from "@/lib/blog";
import { caseStudies } from "@/lib/case-studies";
import { siteConfig } from "@/lib/site";

/**
 * The home page, the case studies index, and one entry per case study (from the same list the
 * pages themselves are generated from, so they can't drift apart). The blog index and its
 * articles appear only once an article is published; drafts never do.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const blog = blogSitemapEntries();
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/case-studies`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    ...caseStudies.map((c) => ({
      url: `${siteConfig.url}/case-studies/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...(blog.length > 0
      ? [
          {
            url: `${siteConfig.url}/blog`,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: 0.7,
          },
          ...blog,
        ]
      : []),
  ];
}
