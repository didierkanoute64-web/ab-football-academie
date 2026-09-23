"use client";

import { BLOG_CATEGORIES, type BlogCategory } from "@/lib/blog";
import { cn } from "@/lib/utils";

export type BlogFilterValue = "all" | BlogCategory;

interface BlogFiltersProps {
  active: BlogFilterValue;
  onChange: (value: BlogFilterValue) => void;
}

export function BlogFilters({ active, onChange }: BlogFiltersProps) {
  const filters: BlogFilterValue[] = ["all", ...BLOG_CATEGORIES];

  return (
    <nav
      aria-label="Filtrer les articles par catégorie"
      className="no-scrollbar flex gap-8 overflow-x-auto border-b border-ab-cream/10 pb-1"
    >
      {filters.map((filter) => {
        const isActive = active === filter;
        return (
          <button
            key={filter}
            onClick={() => onChange(filter)}
            aria-pressed={isActive}
            className={cn(
              "group relative shrink-0 whitespace-nowrap pb-4 font-body text-sm font-semibold uppercase tracking-wide transition-colors duration-300",
              isActive ? "text-ab-cream" : "text-ab-cream/40 hover:text-ab-cream/70"
            )}
          >
            {filter === "all" ? "Tous" : filter}
            <span
              className={cn(
                "absolute -bottom-px left-0 h-[2px] w-full origin-left bg-ab-orange transition-transform duration-300 ease-premium",
                isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              )}
            />
          </button>
        );
      })}
    </nav>
  );
}
