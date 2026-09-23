"use client";

import { useMemo, useState } from "react";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { BlogFilters, type BlogFilterValue } from "@/components/blog/BlogFilters";
import type { BlogPost } from "@/lib/blog";

export function BlogListing({ posts }: { posts: BlogPost[] }) {
  const [filter, setFilter] = useState<BlogFilterValue>("all");

  const filtered = useMemo(
    () => (filter === "all" ? posts : posts.filter((p) => p.category === filter)),
    [posts, filter]
  );

  return (
    <section className="bg-ab-black py-20 lg:py-28">
      <div className="container-ab">
        <div className="mb-10">
          <BlogFilters active={filter} onChange={setFilter} />
        </div>

        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <p className="font-body text-base text-ab-cream/60">
              Aucun article n&apos;est encore publié{filter !== "all" ? " dans cette catégorie" : ""}
              . Revenez bientôt.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
