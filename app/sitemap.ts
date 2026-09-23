import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { getPublishedPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  // /contact n'est plus une route : le CTA "Nous contacter" ouvre le
  // ContactDrawer partout sur le site (voir components/contact/).
  const routes = ["", "/presentation", "/galerie", "/blog", "/mentions-legales", "/confidentialite"];

  const staticEntries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${SITE.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));

  // Seuls les articles réellement publiés (jamais les brouillons) sont
  // indexés dans le sitemap.
  const postEntries: MetadataRoute.Sitemap = getPublishedPosts().map((post) => ({
    url: `${SITE.url}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...postEntries];
}
