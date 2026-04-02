import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { rentalProducts } from "@/app/rentals/products";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/rentals`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/about-us`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/contact-us`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/privacy-policy`, changeFrequency: "yearly", priority: 0.3 },
    ...rentalProducts.map((product) => ({
      url: `${SITE_URL}/product/${product.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
