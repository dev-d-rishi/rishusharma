import type { MetadataRoute } from "next";
import { blogPosts } from "@/src/components/portfolio/content/blogPosts";
import { caseStudies } from "@/src/components/portfolio/content/caseStudies";
import { blogEnabled, siteUrl } from "@/src/components/portfolio/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    {
      url: `${siteUrl}/case-studies`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...caseStudies.map((c) => ({
      url: `${siteUrl}/case-studies/${c.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...(blogEnabled
      ? [
          {
            url: `${siteUrl}/blog`,
            changeFrequency: "weekly" as const,
            priority: 0.8,
          },
          ...blogPosts.map((p) => ({
            url: `${siteUrl}/blog/${p.slug}`,
            lastModified: p.date,
            changeFrequency: "yearly" as const,
            priority: 0.6,
          })),
        ]
      : []),
  ];
}
