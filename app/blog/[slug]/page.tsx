import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { GsapTextReveal } from "@/components/animations/GsapTextReveal";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { PhotoPlaceholder } from "@/components/ui/photo-placeholder";
import { getPostBySlug, getRelatedPosts, posts } from "@/lib/blog";
import { SITE } from "@/lib/constants";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Génère toutes les pages (y compris les brouillons, pour vérifier le
// gabarit) — mais seuls les articles publiés sont liés ou indexés ailleurs.
export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { url: `${SITE.url}/blog/${post.slug}`, type: "article" },
    // Un brouillon reste accessible pour prévisualisation mais ne doit
    // jamais être indexé ni découvert par les moteurs de recherche.
    robots: post.draft ? { index: false, follow: false } : { index: true, follow: true },
  };
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: SITE.name },
  };

  return (
    <article className="bg-ab-black">
      {!post.draft && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      {post.draft && (
        <div className="bg-ab-orange py-2 text-center font-body text-xs font-semibold uppercase tracking-wide text-ab-black">
          Brouillon — aperçu du gabarit, non publié
        </div>
      )}

      <header className="container-ab max-w-3xl pb-10 pt-32 lg:pt-40">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-wide text-ab-cream/50 hover:text-ab-orange"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Le carnet AB
        </Link>
        <p className="eyebrow mb-4 text-ab-orange">
          {post.category} · {post.date}
        </p>
        <GsapTextReveal
          as="h1"
          text={post.title}
          trigger="immediate"
          className="stacked-header text-ab-cream"
          style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
        />
        <p className="mt-6 max-w-xl font-body text-lg text-ab-cream/70">{post.excerpt}</p>
      </header>

      <div className="container-ab mb-14 max-w-4xl">
        <div className="relative h-[45vh] min-h-[320px] overflow-hidden rounded-2xl">
          <PhotoPlaceholder label={post.coverLabel} tone="dark" className="h-full w-full" />
        </div>
      </div>

      <div className="container-ab max-w-2xl pb-24">
        {post.content.map((block, i) => {
          if (block.type === "heading") {
            return (
              <RevealOnScroll key={i}>
                <h2 className="text-display mt-12 text-3xl tracking-wide text-ab-cream">
                  {block.text}
                </h2>
              </RevealOnScroll>
            );
          }
          if (block.type === "quote") {
            return (
              <RevealOnScroll key={i}>
                <blockquote className="my-10 border-l-2 border-ab-orange pl-6 font-display text-2xl italic leading-snug text-ab-cream">
                  {block.text}
                  {block.author && (
                    <footer className="mt-3 font-body text-sm not-italic uppercase tracking-wide text-ab-cream/50">
                      — {block.author}
                    </footer>
                  )}
                </blockquote>
              </RevealOnScroll>
            );
          }
          if (block.type === "image") {
            return (
              <RevealOnScroll key={i} className="relative my-10 h-72 overflow-hidden rounded-xl">
                <PhotoPlaceholder label={block.label} tone="dark" className="h-full w-full" />
              </RevealOnScroll>
            );
          }
          return (
            <RevealOnScroll key={i}>
              <p className="mt-6 font-body text-base leading-relaxed text-ab-cream/80">
                {block.text}
              </p>
            </RevealOnScroll>
          );
        })}
      </div>

      {related.length > 0 && (
        <div className="border-t border-ab-cream/10 bg-ab-green-deep py-20">
          <div className="container-ab">
            <p className="eyebrow mb-8 text-ab-orange">Articles associés</p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <ArticleCard key={r.slug} post={r} />
              ))}
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
