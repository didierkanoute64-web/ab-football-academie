"use client";

import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { PhotoPlaceholder } from "@/components/ui/photo-placeholder";
import { GALLERY_CATEGORY_LABELS, type GalleryItem } from "@/lib/media";
import { useFocusTrap } from "@/lib/use-focus-trap";
import { useScrollLock } from "@/lib/use-scroll-lock";

interface VideoModalProps {
  item: Extract<GalleryItem, { type: "video" }> | null;
  onClose: () => void;
}

export function VideoModal({ item, onClose }: VideoModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const isOpen = item !== null;

  useScrollLock(isOpen);
  useFocusTrap(isOpen, containerRef, onClose, closeButtonRef);

  return (
    <AnimatePresence>
      {isOpen && item && (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          role="dialog"
          aria-modal="true"
          aria-label={`Vidéo : ${item.title}`}
          className="fixed inset-0 z-[85] flex flex-col bg-ab-black/97"
        >
          <div className="flex items-center justify-between px-5 py-5 sm:px-8">
            <p className="font-body text-xs uppercase tracking-[0.2em] text-ab-cream/60">
              {GALLERY_CATEGORY_LABELS[item.category]} · {item.date}
            </p>
            <button
              ref={closeButtonRef}
              onClick={onClose}
              aria-label="Fermer la vidéo"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ab-cream/30 text-ab-cream transition-colors hover:bg-ab-cream hover:text-ab-black"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex flex-1 items-center justify-center px-4 pb-10 sm:px-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="aspect-video w-full max-w-4xl overflow-hidden"
            >
              {item.src ? (
                <video
                  key={item.id}
                  src={item.src}
                  poster={item.poster ?? undefined}
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                  className="h-full w-full"
                  aria-label={item.alt}
                >
                  <track kind="captions" />
                </video>
              ) : (
                <div className="relative h-full w-full">
                  <PhotoPlaceholder label={item.alt} tone="dark" video className="h-full w-full" />
                  <p className="absolute inset-x-0 bottom-4 text-center font-body text-xs uppercase tracking-[0.2em] text-ab-cream/50">
                    Vidéo à venir
                  </p>
                </div>
              )}
            </motion.div>
          </div>

          <p className="px-5 pb-8 text-center font-display text-xl tracking-wide text-ab-cream sm:px-8">
            {item.title}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
