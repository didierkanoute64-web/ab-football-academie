"use client";

import { Play } from "lucide-react";
import { PhotoPlaceholder } from "@/components/ui/photo-placeholder";
import { GALLERY_CATEGORY_LABELS, type GalleryItem } from "@/lib/media";
import { cn } from "@/lib/utils";

interface VideoTileProps {
  item: Extract<GalleryItem, { type: "video" }>;
  onOpen: () => void;
  /** Background this tile sits on, so caption text stays legible either way. */
  surface?: "light" | "dark";
}

export function VideoTile({ item, onOpen, surface = "light" }: VideoTileProps) {
  return (
    <button
      onClick={onOpen}
      data-cursor="play"
      className="group relative block w-full overflow-hidden text-left focus-visible:outline-none"
      aria-label={`Lire la vidéo : ${item.title}`}
    >
      <div className="relative h-56 w-full sm:h-64">
        <PhotoPlaceholder
          label={item.alt}
          tone="dark"
          video
          className="h-full w-full transition-transform duration-500 ease-premium group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-ab-black/20 transition-colors duration-300 group-hover:bg-ab-black/35" />

        <span className="absolute inset-0 flex items-center justify-center">
          <span className="relative flex h-14 w-14 items-center justify-center rounded-full border border-ab-cream/50 text-ab-cream transition-transform duration-300 group-hover:scale-110 group-hover:border-ab-orange group-hover:bg-ab-orange">
            <Play className="h-5 w-5 translate-x-px" fill="currentColor" />
          </span>
        </span>

        <span className="absolute bottom-3 right-3 rounded bg-ab-black/70 px-2 py-0.5 font-body text-[10px] text-ab-cream">
          {item.duration}
        </span>
      </div>

      <p className="mt-3 font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-ab-orange">
        {GALLERY_CATEGORY_LABELS[item.category]}
      </p>
      <p
        className={cn(
          "mt-1 font-display text-lg tracking-wide",
          surface === "dark" ? "text-ab-cream" : "text-ab-black"
        )}
      >
        {item.title}
      </p>
      <p className={cn("font-body text-xs", surface === "dark" ? "text-ab-cream/50" : "text-ab-black/50")}>
        {item.date}
      </p>
    </button>
  );
}
