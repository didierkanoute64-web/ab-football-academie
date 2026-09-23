import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PhotoPlaceholder } from "@/components/ui/photo-placeholder";
import { GsapTextReveal } from "@/components/animations/GsapTextReveal";
import { RevealOnScroll, StaggerGroup, StaggerItem } from "@/components/animations/RevealOnScroll";
import { getPublishedPosts } from "@/lib/blog";

/**
 * Alternance volontaire : après plusieurs sections sombres, un aperçu du
 * blog sur fond clair. Si aucun article n'est publié (cas actuel), on
 * affiche 3 emplacements honnêtes "à venir" plutôt que d'inventer du
 * contenu — dès qu'un vrai article existe (lib/blog.ts), il apparaît ici
 * automatiquement.
 */
export function BlogPreview() {
  const posts = getPublishedPosts().slice(0, 3);
  const hasPosts = posts.length > 0;

  return (
    <section className="bg-ab-cream py-24 lg:py-32">
      <div className="container-ab">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6 lg:mb-20">
          <div>
            <p className="eyebrow mb-4">Le carnet AB</p>
            <GsapTextReveal
              as="h2"
              text="Sur le terrain et au-delà"
              className="stacked-header text-ab-black"
              style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)" }}
            />
          </div>
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 font-body text-sm font-semibold uppercase tracking-wide text-ab-orange"
          >
            Voir tous les articles
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(hasPosts ? posts : [0, 1, 2]).map((item, i) => {
            const post = hasPosts ? (item as ReturnType<typeof getPublishedPosts>[number]) : null;
            return (
              <StaggerItem key={post?.slug ?? i}>
                <Link
                  href={post ? `/blog/${post.slug}` : "/blog"}
                  className="group block overflow-hidden rounded-2xl border border-ab-black/10 bg-white"
                >
                  <div className="relative h-52 overflow-hidden" data-cursor="voir">
                    <PhotoPlaceholder
                      label={post?.coverLabel ?? "Article à venir"}
                      tone="cream"
                      className="transition-transform duration-500 ease-premium group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <p className="font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-ab-orange">
                      {post ? `${post.category} · ${post.date}` : "Bientôt disponible"}
                    </p>
                    <p
                      className={
                        post
                          ? "text-display mt-2 text-xl tracking-wide text-ab-black"
                          : "text-display mt-2 text-xl tracking-wide text-ab-black/40"
                      }
                    >
                      {post?.title ?? "Premier article à venir"}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 font-body text-xs font-semibold uppercase tracking-wide text-ab-black/60">
                      Lire l&apos;article
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerGroup>

        {!hasPosts && (
          <RevealOnScroll delay={0.2} className="mt-10 text-center">
            <p className="font-body text-sm text-ab-black/50">
              Aucun article n&apos;est encore publié — revenez bientôt.
            </p>
          </RevealOnScroll>
        )}
      </div>
    </section>
  );
}
