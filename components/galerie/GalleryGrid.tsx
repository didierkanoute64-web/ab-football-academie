"use client";

import { AnimatePresence, motion } from "framer-motion";
import { GalleryTile } from "@/components/galerie/GalleryTile";
import type { GalleryItem } from "@/lib/media";

interface GalleryGridProps {
  items: Extract<GalleryItem, { type: "image" }>[];
  onOpen: (id: string) => void;
}

export function GalleryGrid({ items, onOpen }: GalleryGridProps) {
  if (items.length === 0) {
    return (
      <p className="py-24 text-center font-body text-sm text-ab-black/50">
        Aucune photo dans cette catégorie pour le moment.
      </p>
    );
  }

  return (
    <motion.div
      layout
      className="grid auto-rows-[42vw] grid-cols-2 gap-3 sm:auto-rows-[220px] sm:grid-cols-3 lg:auto-rows-[260px] lg:grid-cols-4"
    >
      <AnimatePresence mode="popLayout">
        {items.map((item, i) => (
          <GalleryTile key={item.id} item={item} index={i} onOpen={() => onOpen(item.id)} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
