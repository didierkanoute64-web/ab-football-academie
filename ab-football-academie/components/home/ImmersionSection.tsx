"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play } from "lucide-react";
import { MediaImage } from "@/components/ui/media-image";
import { Magnetic } from "@/components/ui/magnetic";
import { GsapTextReveal } from "@/components/animations/GsapTextReveal";
import { Marquee } from "@/components/ui/marquee";
import { media } from "@/lib/media";

export function ImmersionSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1, 1.15]);
  const posterPhoto = media.home.immersionPoster;

  return (
    <section
      ref={ref}
      className="clip-diagonal-both relative -my-6 h-[90vh] min-h-[560px] w-full overflow-hidden bg-ab-black lg:-my-10"
    >
      <motion.div style={{ scale }} className="absolute inset-0" data-cursor="play">
        <MediaImage asset={posterPhoto} tone="dark" video sizes="100vw" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-ab-black/70 via-ab-black/30 to-ab-black/70" />
      <div className="vignette pointer-events-none absolute inset-0" />

      <div className="absolute inset-x-0 top-10 text-ab-orange/70">
        <Marquee text="Immersion académie" />
      </div>

      <div className="relative flex h-full flex-col items-center justify-center text-center">
        <GsapTextReveal
          as="h2"
          text="Une passion, une méthode, une ambition"
          className="text-display max-w-3xl px-6 text-4xl leading-[1.05] text-ab-cream sm:text-6xl"
        />
        <Magnetic strength={0.4} className="mt-10">
          <button className="group flex items-center gap-3 font-body text-sm font-semibold uppercase tracking-wide text-ab-cream">
            <span className="relative flex h-16 w-16 items-center justify-center rounded-full border border-ab-cream/40 transition-colors duration-300 group-hover:border-ab-orange group-hover:bg-ab-orange">
              <span className="absolute inset-0 rounded-full border border-ab-orange/60 opacity-0 group-hover:animate-pulse-ring group-hover:opacity-100" />
              <Play className="h-5 w-5 translate-x-px" fill="currentColor" />
            </span>
            Découvrir AB Football
          </button>
        </Magnetic>
      </div>
    </section>
  );
}
