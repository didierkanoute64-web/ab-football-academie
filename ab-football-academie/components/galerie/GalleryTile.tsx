"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { MediaImage } from "@/components/ui/media-image";
import { GALLERY_CATEGORY_LABELS, type GalleryItem, type GalleryRatio } from "@/lib/media";
import { cn } from "@/lib/utils";

/** Maps an editorial ratio to the grid span classes used by GalleryGrid. */
export function getSpanClasses(ratio: GalleryRatio): string {
  switch (ratio) {
    case "portrait":
      return "col-span-2 row-span-2 sm:col-span-1";
    case "vertical":
      return "col-span-2 row-span-2 sm:col-span-1";
    case "landscape":
      return "col-span-2 row-span-1";
    case "wide":
      return "col-span-2 row-span-1 lg:col-span-3";
    case "panoramic":
      return "col-span-2 row-span-1 lg:col-span-4";
    default:
      return "col-span-2 row-span-1 sm:col-span-1";
  }
}

const revealVariants: Variants[] = [
  // 0 — clip-path vertical wipe (bottom to top) + slight scale
  {
    hidden: { clipPath: "inset(100% 0% 0% 0%)", scale: 1.08 },
    visible: {
      clipPath: "inset(0% 0% 0% 0%)",
      scale: 1,
      transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] },
    },
  },
  // 1 — clip-path horizontal wipe (left to right) + slight scale
  {
    hidden: { clipPath: "inset(0% 100% 0% 0%)", scale: 1.08 },
    visible: {
      clipPath: "inset(0% 0% 0% 0%)",
      scale: 1,
      transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] },
    },
  },
  // 2 — plain scale + fade, no mask
  {
    hidden: { opacity: 0, scale: 1.08 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
    },
  },
];

interface GalleryTileProps {
  item: Extract<GalleryItem, { type: "image" }>;
  index: number;
  onOpen: () => void;
}

export function GalleryTile({ item, index, onOpen }: GalleryTileProps) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const variant = revealVariants[index % revealVariants.length];

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    setOffset({ x: relX * 12, y: relY * 12 });
  };

  return (
    <motion.button
      layout
      onClick={onOpen}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={variant}
      data-cursor="voir"
      className={cn(
        "group relative overflow-hidden text-left focus-visible:outline-none",
        getSpanClasses(item.ratio)
      )}
      aria-label={`Voir la photo : ${item.title}`}
    >
      <motion.div
        animate={{ x: offset.x, y: offset.y }}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
        className="relative h-full w-full scale-110"
      >
        <MediaImage
          asset={{ src: item.src, alt: item.alt }}
          tone="cream"
          sizes="(min-width: 1024px) 33vw, 50vw"
          className="transition-transform duration-700 ease-premium group-hover:scale-105"
        />
      </motion.div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ab-black/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-end justify-between p-4 opacity-0 transition-all duration-300 ease-premium group-hover:translate-y-0 group-hover:opacity-100 sm:p-5">
        <div>
          <p className="font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-ab-orange">
            {GALLERY_CATEGORY_LABELS[item.category]}
          </p>
          <p className="mt-0.5 font-body text-xs text-ab-cream/80">{item.date}</p>
        </div>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ab-cream/40 text-ab-cream">
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </motion.button>
  );
}
