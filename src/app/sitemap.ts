import type { MetadataRoute } from "next";
import { company, products } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://neworigintech.com",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...products.map((product) => ({
      url: product.url,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
