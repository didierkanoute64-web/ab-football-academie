"use client";

import { GALLERY_CATEGORY_LABELS, type GalleryCategory } from "@/lib/media";
import { cn } from "@/lib/utils";

export type FilterValue = "all" | GalleryCategory;

const FILTERS: { value: FilterValue; label: string }[] = [
  { value: "all", label: "Tous" },
  ...(Object.entries(GALLERY_CATEGORY_LABELS) as [GalleryCategory, string][]).map(
    ([value, label]) => ({ value, label })
  ),
];

interface GalleryFiltersProps {
  active: FilterValue;
  onChange: (value: FilterValue) => void;
}

export function GalleryFilters({ active, onChange }: GalleryFiltersProps) {
  return (
    <nav
      aria-label="Filtrer la galerie par catégorie"
      className="no-scrollbar flex gap-8 overflow-x-auto border-b border-ab-black/10 pb-1"
    >
      {FILTERS.map((filter) => {
        const isActive = active === filter.value;
        return (
          <button
            key={filter.value}
            onClick={() => onChange(filter.value)}
            aria-pressed={isActive}
            className={cn(
              "group relative shrink-0 whitespace-nowrap pb-4 font-body text-sm font-semibold uppercase tracking-wide transition-colors duration-300",
              isActive ? "text-ab-black" : "text-ab-black/40 hover:text-ab-black/70"
            )}
          >
            {filter.label}
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
