"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MediaImage } from "@/components/ui/media-image";
import { GsapTextReveal } from "@/components/animations/GsapTextReveal";
import { gallery, media } from "@/lib/media";

const WORDS = ["Apprendre", "Progresser", "Se dépasser", "Ensemble"];

export function ImmersionSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  // Parallax très léger — spec : 20 à 50px maximum.
  const yMain = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const ySide = useTransform(scrollYProgress, [0, 1], [20, -20]);

  const mainPhoto = media.home.immersionPoster;
  const secondary1 = gallery.find((g) => g.id === "g07");
  const secondary2 = gallery.find((g) => g.id === "g10");

  return (
    <section ref={ref} className="bg-ab-cream py-24 lg:py-32">
      <div className="container-ab">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6 lg:mb-20">
          <div>
            <p className="eyebrow mb-4">Immersion</p>
            <GsapTextReveal
              as="h2"
              text="Le quotidien de l'académie"
              className="stacked-header text-ab-black"
              style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)" }}
            />
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {WORDS.map((w) => (
              <span
                key={w}
                className="font-display text-sm uppercase tracking-[0.25em] text-ab-orange"
              >
                {w}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-12 lg:gap-5">
          <motion.div
            style={{ y: yMain }}
            className="relative h-[50vh] min-h-[360px] overflow-hidden lg:col-span-7 lg:row-span-2 lg:h-full"
            data-cursor="voir"
          >
            <MediaImage
              asset={mainPhoto}
              tone="dark"
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="transition-transform duration-700 ease-premium hover:scale-105"
            />
          </motion.div>

          <motion.div
            style={{ y: ySide }}
            className="relative h-[28vh] min-h-[220px] overflow-hidden lg:col-span-5"
            data-cursor="voir"
          >
            {secondary1 && (
              <MediaImage
                asset={{ src: secondary1.src, alt: secondary1.alt }}
                tone="cream"
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="transition-transform duration-700 ease-premium hover:scale-105"
              />
            )}
          </motion.div>

          <motion.div
            style={{ y: ySide }}
            className="relative h-[28vh] min-h-[220px] overflow-hidden lg:col-span-5"
            data-cursor="voir"
          >
            {secondary2 && (
              <MediaImage
                asset={{ src: secondary2.src, alt: secondary2.alt }}
                tone="cream"
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="transition-transform duration-700 ease-premium hover:scale-105"
              />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
