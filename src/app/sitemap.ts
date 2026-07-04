import type { MetadataRoute } from "next";

import { POSTS } from "@/data/posts";
import { SERVICES } from "@/data/services";
import { absoluteUrl } from "@/lib/seo";

const STATIC_ROUTES = [
  "/",
  "/hizmetler",
  "/hakkimizda",
  "/iletisim",
  "/sss",
  "/blog",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = STATIC_ROUTES.map((route) => ({
    url: absoluteUrl(route),
    changeFrequency: "monthly" as const,
    priority: route === "/" ? 1 : 0.7,
  }));

  const serviceEntries = SERVICES.map((service) => ({
    url: absoluteUrl(`/${service.slug}`),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const postEntries = POSTS.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: post.publishedAt,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...serviceEntries, ...postEntries];
}
