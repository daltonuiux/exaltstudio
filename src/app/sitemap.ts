import type { MetadataRoute } from "next";

import { caseStudies } from "@/lib/case-studies";
import { siteConfig } from "@/lib/site";

/**
 * The home page plus one entry per case study (from the same list the
 * pages themselves are generated from, so they can't drift apart).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...caseStudies.map((c) => ({
      url: `${siteConfig.url}/case-studies/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
