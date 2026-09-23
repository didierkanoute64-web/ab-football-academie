import type { Metadata } from "next";
import { GsapTextReveal } from "@/components/animations/GsapTextReveal";
import { BlogListing } from "@/components/blog/BlogListing";
import { getPublishedPosts } from "@/lib/blog";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Le Carnet AB — Blog",
  description:
    "Actualités, conseils et vie de l'académie AB Football Académie à Épinay-sur-Seine.",
  alternates: { canonical: "/blog" },
  openGraph: { url: `${SITE.url}/blog` },
};

export default function BlogPage() {
  const posts = getPublishedPosts();

  return (
    <>
      <section className="bg-ab-green-deep py-32 lg:py-44">
        <div className="container-ab max-w-2xl text-center">
          <p className="eyebrow mb-4 text-ab-orange">Le carnet AB</p>
          <GsapTextReveal
            as="h1"
            text="Actualités, conseils et vie de l'académie"
            trigger="immediate"
            className="stacked-header text-ab-cream"
          />
          <p className="mt-8 font-body text-base text-ab-cream/70">
            Actualités, conseils, vie de l&apos;académie et regard sur la
            formation des jeunes.
          </p>
        </div>
      </section>

      <BlogListing posts={posts} />
    </>
  );
}
