import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";

/**
 * Single-page site: one entry. Add routes here if the site ever grows.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
