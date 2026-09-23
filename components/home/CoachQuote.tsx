"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { MediaImage } from "@/components/ui/media-image";
import { GsapTextReveal } from "@/components/animations/GsapTextReveal";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { hasMedia, media } from "@/lib/media";

export function CoachQuote() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.04]);
  const coachPhoto = media.home.coach;
  const crest = media.brand.crest;

  return (
    <section ref={ref} className="relative overflow-hidden bg-ab-black py-32 lg:py-44">
      {hasMedia(crest) && (
        <div className="pointer-events-none absolute right-[-8vw] top-1/2 h-[70vw] max-h-[620px] w-[70vw] max-w-[620px] -translate-y-1/2 opacity-[0.07]">
          <Image src={crest.src} alt="" fill className="object-contain" aria-hidden="true" />
        </div>
      )}

      <div className="container-ab relative grid gap-14 lg:grid-cols-[0.9fr_1.4fr] lg:items-center lg:gap-20">
        <div className="relative h-[280px] overflow-hidden lg:h-[420px]">
          <motion.div style={{ y, scale }} className="relative h-[120%] w-full">
            <MediaImage
              asset={coachPhoto}
              tone="dark"
              sizes="(min-width: 1024px) 40vw, 100vw"
              objectPosition="center 15%"
            />
          </motion.div>
        </div>

        <div>
          <p className="eyebrow mb-6 text-ab-orange">Le mot du coach</p>
          <div className="space-y-1">
            <GsapTextReveal
              as="p"
              text="Croire"
              trigger="scroll"
              className="stacked-header block text-4xl text-ab-cream sm:text-6xl lg:text-7xl"
            />
            <GsapTextReveal
              as="p"
              text="Travailler"
              trigger="scroll"
              delay={0.12}
              className="stacked-header block text-4xl text-ab-cream sm:text-6xl lg:text-7xl"
            />
            <GsapTextReveal
              as="p"
              text="Transmettre"
              trigger="scroll"
              delay={0.24}
              className="stacked-header block text-4xl sm:text-6xl lg:text-7xl"
              highlightIndices={[0]}
            />
          </div>
          <RevealOnScroll delay={0.5} className="mt-8 flex items-center gap-4">
            <span className="h-px w-12 bg-ab-orange" />
            <p className="font-body text-sm uppercase tracking-[0.2em] text-ab-cream/50">
              AB Football Académie, saison 2025 – 2026
            </p>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
