"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MediaImage } from "@/components/ui/media-image";
import { GsapTextReveal } from "@/components/animations/GsapTextReveal";
import { media } from "@/lib/media";

export function Act1Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const bgScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.22]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.35, 0.8]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const heroPhoto = media.presentation.hero;

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-ab-black">
      <motion.div
        initial={{ clipPath: "inset(0 0 100% 0)" }}
        animate={{ clipPath: "inset(0 0 0% 0)" }}
        transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
        className="absolute inset-0"
        data-cursor="voir"
      >
        <motion.div style={{ scale: bgScale }} className="relative h-full w-full">
          <MediaImage asset={heroPhoto} tone="dark" priority sizes="100vw" />
        </motion.div>
      </motion.div>

      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-gradient-to-t from-ab-black via-ab-black/35 to-ab-black/10"
      />
      <div className="vignette pointer-events-none absolute inset-0" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative flex h-full flex-col justify-end"
      >
        <div className="container-ab pb-16 pt-32 sm:pb-20 lg:pb-24">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="eyebrow mb-5 text-ab-cream/80"
          >
            Notre histoire
          </motion.p>

          <GsapTextReveal
            as="h1"
            text="Plus qu'un club, une aventure humaine"
            trigger="immediate"
            delay={0.3}
            className="stacked-header max-w-4xl text-ab-cream"
            highlightIndices={[4, 5]}
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-7 max-w-xl font-body text-base text-ab-cream/80 lg:text-lg"
          >
            AB Football Académie accompagne les jeunes dans leur progression
            sportive et leur construction personnelle. Notre ambition :
            développer leur potentiel, transmettre des valeurs fortes et leur
            donner les moyens de grandir, sur le terrain comme en dehors.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="mt-6 font-display text-2xl italic tracking-wide text-ab-orange"
          >
            Le talent, c&apos;est le travail !
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
