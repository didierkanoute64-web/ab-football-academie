"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { hasMedia, media } from "@/lib/media";

export function BrandShowcase() {
  const crest = media.brand.crest;
  if (!hasMedia(crest)) return null;

  return (
    <section className="relative overflow-hidden bg-ab-cream py-24 lg:py-36">
      {/* Halo subtil derrière l'écusson */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[60vw] max-h-[560px] w-[60vw] max-w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-ab-orange/15 via-ab-green/10 to-transparent blur-3xl"
      />

      <div className="container-ab relative flex justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 24 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-[280px] sm:max-w-[360px] lg:max-w-[440px]"
        >
          <Image
            src={crest.src}
            alt={crest.alt}
            width={1347}
            height={1400}
            className="h-auto w-full"
            sizes="(min-width: 1024px) 440px, 60vw"
          />
        </motion.div>
      </div>
    </section>
  );
}
