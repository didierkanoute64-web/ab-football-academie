"use client";

import { useEffect, useMemo, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { MediaImage } from "@/components/ui/media-image";
import { GALLERY_CATEGORY_LABELS, type GalleryItem } from "@/lib/media";
import { useFocusTrap } from "@/lib/use-focus-trap";
import { useScrollLock } from "@/lib/use-scroll-lock";

interface LightboxProps {
  items: Extract<GalleryItem, { type: "image" }>[];
  activeId: string | null;
  onClose: () => void;
  onNavigate: (id: string) => void;
}

const SWIPE_THRESHOLD = 50;

export function Lightbox({ items, activeId, onClose, onNavigate }: LightboxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);

  const activeIndex = useMemo(
    () => items.findIndex((item) => item.id === activeId),
    [items, activeId]
  );
  const isOpen = activeIndex !== -1;
  const current = isOpen ? items[activeIndex] : null;

  const goTo = (direction: 1 | -1) => {
    if (!isOpen) return;
    const nextIndex = (activeIndex + direction + items.length) % items.length;
    onNavigate(items[nextIndex].id);
  };

  useScrollLock(isOpen);
  useFocusTrap(isOpen, containerRef, onClose, closeButtonRef);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goTo(-1);
      if (e.key === "ArrowRight") goTo(1);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, activeIndex]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > SWIPE_THRESHOLD) goTo(delta > 0 ? -1 : 1);
    touchStartX.current = null;
  };

  return (
    <AnimatePresence>
      {isOpen && current && (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          role="dialog"
          aria-modal="true"
          aria-label={`Photo : ${current.title}`}
          className="fixed inset-0 z-[85] flex flex-col bg-ab-black/97"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="flex items-center justify-between px-5 py-5 sm:px-8">
            <p className="font-body text-xs uppercase tracking-[0.2em] text-ab-cream/60">
              {activeIndex + 1} / {items.length}
            </p>
            <button
              ref={closeButtonRef}
              onClick={onClose}
              aria-label="Fermer la photo"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ab-cream/30 text-ab-cream transition-colors hover:bg-ab-cream hover:text-ab-black"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="relative flex flex-1 items-center justify-center px-4 pb-6 sm:px-10">
            <button
              onClick={() => goTo(-1)}
              aria-label="Photo précédente"
              className="absolute left-2 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-ab-cream/30 text-ab-cream transition-colors hover:bg-ab-cream hover:text-ab-black sm:left-6"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="relative h-full w-full max-w-5xl overflow-hidden"
              >
                <MediaImage asset={{ src: current.src, alt: current.alt }} tone="dark" sizes="100vw" />
              </motion.div>
            </AnimatePresence>

            <button
              onClick={() => goTo(1)}
              aria-label="Photo suivante"
              className="absolute right-2 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-ab-cream/30 text-ab-cream transition-colors hover:bg-ab-cream hover:text-ab-black sm:right-6"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="px-5 pb-8 text-center sm:px-8">
            <p className="font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-ab-orange">
              {GALLERY_CATEGORY_LABELS[current.category]} · {current.date}
            </p>
            <p className="mt-1 font-display text-xl tracking-wide text-ab-cream">
              {current.title}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
