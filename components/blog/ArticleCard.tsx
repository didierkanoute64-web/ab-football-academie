import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PhotoPlaceholder } from "@/components/ui/photo-placeholder";
import type { BlogPost } from "@/lib/blog";

export function ArticleCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block overflow-hidden rounded-2xl border border-ab-cream/10 bg-ab-black/40"
    >
      <div className="relative h-56 overflow-hidden" data-cursor="voir">
        <PhotoPlaceholder
          label={post.coverLabel}
          tone="dark"
          className="transition-transform duration-500 ease-premium group-hover:scale-105 group-hover:brightness-90"
        />
      </div>
      <div className="p-6">
        <p className="font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-ab-orange">
          {post.category} · {post.date}
        </p>
        <p className="text-display mt-2 text-xl tracking-wide text-ab-cream">{post.title}</p>
        <p className="mt-2 line-clamp-2 font-body text-sm text-ab-cream/60">{post.excerpt}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 font-body text-xs font-semibold uppercase tracking-wide text-ab-cream/80">
          Lire l&apos;article
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
