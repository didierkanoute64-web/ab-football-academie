"use client";

import { useMemo, useState } from "react";
import { GsapTextReveal } from "@/components/animations/GsapTextReveal";
import { GalleryFilters, type FilterValue } from "@/components/galerie/GalleryFilters";
import { GalleryGrid } from "@/components/galerie/GalleryGrid";
import { Lightbox } from "@/components/galerie/Lightbox";
import { gallery } from "@/lib/media";

export function GalleryPhotosSection() {
  const [filter, setFilter] = useState<FilterValue>("all");
  const [activeId, setActiveId] = useState<string | null>(null);

  const photos = useMemo(
    () => gallery.filter((item): item is Extract<typeof item, { type: "image" }> => item.type === "image"),
    []
  );

  const filtered = useMemo(
    () => (filter === "all" ? photos : photos.filter((item) => item.category === filter)),
    [photos, filter]
  );

  return (
    <section className="bg-ab-cream py-24 lg:py-32">
      <div className="container-ab">
        <div className="mb-12 flex flex-col gap-6 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow mb-4">Acte 2</p>
            <GsapTextReveal
              as="h2"
              text="Une galerie éditoriale"
              className="text-display text-3xl tracking-wide text-ab-black sm:text-4xl lg:text-5xl"
              highlightIndices={[2]}
            />
          </div>
        </div>

        <div className="mb-10">
          <GalleryFilters active={filter} onChange={setFilter} />
        </div>

        <GalleryGrid items={filtered} onOpen={setActiveId} />
      </div>

      <Lightbox items={filtered} activeId={activeId} onClose={() => setActiveId(null)} onNavigate={setActiveId} />
    </section>
  );
}
