import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  // /contact n'est plus une route : le CTA "Nous contacter" ouvre le
  // ContactDrawer partout sur le site (voir components/contact/).
  const routes = ["", "/presentation", "/galerie", "/mentions-legales", "/confidentialite"];

  return routes.map((route) => ({
    url: `${SITE.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
