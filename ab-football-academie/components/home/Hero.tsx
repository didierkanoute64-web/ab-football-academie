"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { MediaImage } from "@/components/ui/media-image";
import { GsapTextReveal } from "@/components/animations/GsapTextReveal";
import { useContactDrawer } from "@/components/contact/ContactDrawerProvider";
import { media } from "@/lib/media";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { open: openContactDrawer } = useContactDrawer();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Motion reste léger : très faible scale/parallax, jamais de bascule
  // vers un plein écran sombre au scroll — le blanc + la photo restent
  // visibles en permanence.
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);

  const heroPhoto = media.home.hero;

  return (
    <section ref={ref} className="relative w-full overflow-hidden bg-ab-cream">
      <div className="container-ab grid gap-10 pb-14 pt-32 lg:grid-cols-[45%_55%] lg:items-center lg:gap-0 lg:pb-0 lg:pt-28">
        {/* Contenu — 45%, toujours blanc/crème */}
        <motion.div style={{ y: textY }} className="relative z-10 lg:pr-12">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="eyebrow mb-5"
          >
            Des jeunes d&apos;aujourd&apos;hui,{" "}
            <span className="whitespace-nowrap">les talents de demain</span>
          </motion.p>

          <GsapTextReveal
            as="h1"
            text="Le talent, c'est le travail !"
            trigger="immediate"
            delay={0.35}
            className="text-display max-w-xl text-6xl leading-[0.92] text-ab-green sm:text-7xl lg:text-8xl"
            highlightIndices={[2, 3, 4, 5]}
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="mt-7 max-w-md font-body text-base text-ab-black/70"
          >
            AB Football Académie accompagne les jeunes talents dans leur
            développement sportif et humain. Plus qu&apos;un club, une
            famille, un état d&apos;esprit, une aventure humaine.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4"
          >
            <Magnetic>
              <Button size="lg" onClick={openContactDrawer}>
                Rejoindre l&apos;académie
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Magnetic>

            <Magnetic strength={0.4}>
              <Link
                href="/presentation"
                className="group inline-flex items-center gap-1.5 font-body text-sm font-semibold uppercase tracking-wide text-ab-green"
              >
                Notre philosophie
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Magnetic>

            <Magnetic strength={0.4}>
              <button className="group flex items-center gap-2.5 font-body text-sm font-semibold uppercase tracking-wide text-ab-black/70">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-ab-black/20 transition-colors duration-300 group-hover:border-ab-orange group-hover:bg-ab-orange group-hover:text-ab-cream">
                  <Play className="h-3.5 w-3.5 translate-x-px" fill="currentColor" />
                </span>
                Voir la vidéo de l&apos;académie
              </button>
            </Magnetic>
          </motion.div>
        </motion.div>

        {/* Photo — 55%, bord organique qui se fond dans le crème */}
        <div className="relative h-[52vh] min-h-[360px] lg:h-[86vh] lg:min-h-[560px]">
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0"
            data-cursor="voir"
          >
            <motion.div
              initial={{ scale: 1.15 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
              className="h-full w-full"
            >
              <motion.div
                style={{ scale: photoScale, y: photoY }}
                className="relative h-full w-full"
              >
              <div
                className="absolute inset-0"
                style={{
                  maskImage:
                    "linear-gradient(to right, transparent, black 14%)",
                  WebkitMaskImage:
                    "linear-gradient(to right, transparent, black 14%)",
                }}
              >
                <MediaImage asset={heroPhoto} tone="dark" priority sizes="(min-width: 1024px) 55vw, 100vw" />
              </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Touche brush orange, discrète, au raccord photo/blanc */}
          <svg
            className="pointer-events-none absolute -left-6 top-10 h-24 w-24 text-ab-orange/70 lg:-left-10 lg:top-16"
            viewBox="0 0 100 100"
            fill="none"
          >
            <path
              d="M10 60 C 20 20, 60 10, 85 25 C 70 30, 45 35, 35 55 C 55 50, 70 55, 80 70 C 55 75, 25 78, 10 60 Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
