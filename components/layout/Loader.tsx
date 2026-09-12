"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { hasMedia, media } from "@/lib/media";

const EXIT_DURATION = 0.5;
const HOLD_MS = 1400; // + EXIT_DURATION ≈ 1.9s total, under the 2s max.

export function Loader() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const crest = media.brand.crest;

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const already = window.sessionStorage.getItem("ab-intro-seen");

    if (reduced || already) {
      setMounted(true);
      return;
    }

    setVisible(true);
    setMounted(true);
    const timer = setTimeout(() => {
      setVisible(false);
      window.sessionStorage.setItem("ab-intro-seen", "1");
    }, HOLD_MS);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: EXIT_DURATION, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ab-cream"
        >
          <motion.div
            initial={{ scale: 0.82, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-20 w-20 sm:h-24 sm:w-24"
          >
            {hasMedia(crest) ? (
              <Image src={crest.src} alt={crest.alt} fill className="object-contain" priority />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-full border-2 border-ab-orange font-display text-3xl text-ab-green">
                AB
              </div>
            )}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-6 text-center font-display text-lg uppercase tracking-[0.15em] text-ab-green sm:text-xl"
          >
            Le talent, c&apos;est le travail !
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
