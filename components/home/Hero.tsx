"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { MediaImage } from "@/components/ui/media-image";
import { GsapTextReveal } from "@/components/animations/GsapTextReveal";
import { useContactDrawer } from "@/components/contact/ContactDrawerProvider";
import { media } from "@/lib/media";

const SIDE_WORDS = ["Discipline", "Travail", "Progression", "Réussite"];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { open: openContactDrawer } = useContactDrawer();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax volontairement très faible (spec : 20-50px maximum).
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  const heroPhoto = media.home.hero;

  return (
    <section
      ref={ref}
      className="relative flex h-[92svh] min-h-[640px] w-full items-end overflow-hidden bg-ab-green-deep"
    >
      {/* Photo — révélation par masque au chargement */}
      <motion.div
        initial={{ clipPath: "inset(0 0 100% 0)" }}
        animate={{ clipPath: "inset(0 0 0% 0)" }}
        transition={{ duration: 0.7, delay: 0.25, ease: [0.76, 0, 0.24, 1] }}
        className="absolute inset-0"
        data-cursor="voir"
      >
        <motion.div style={{ scale: photoScale, y: photoY }} className="relative h-full w-full">
          <MediaImage asset={heroPhoto} tone="dark" priority sizes="100vw" />
        </motion.div>
      </motion.div>

      {/* Overlay vert/noir pour la lisibilité */}
      <div className="absolute inset-0 bg-gradient-to-t from-ab-green-deep via-ab-green-deep/50 to-ab-black/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-ab-green-deep/70 via-transparent to-transparent" />

      {/* Colonne verticale des valeurs — desktop uniquement */}
      <div className="absolute right-8 top-28 hidden flex-col items-end gap-1 lg:flex xl:right-14">
        {SIDE_WORDS.map((w) => (
          <span
            key={w}
            className="font-display text-sm uppercase tracking-[0.3em] text-ab-cream/50"
          >
            {w}
          </span>
        ))}
      </div>

      {/* Indicateur discret */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="absolute bottom-10 right-8 hidden font-body text-xs tracking-[0.2em] text-ab-cream/40 lg:block xl:right-14"
      >
        01 / 05
      </motion.span>

      <div className="container-ab relative pb-16 pt-32 lg:pb-24">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.5 }}
          className="eyebrow mb-5 text-ab-cream/70"
        >
          AB Football Académie
        </motion.p>

        <div className="max-w-4xl space-y-0.5">
          <GsapTextReveal
            as="h1"
            text="Le travail,"
            trigger="immediate"
            delay={0.65}
            className="text-display text-7xl leading-[0.86] text-ab-cream sm:text-8xl lg:text-[clamp(4.5rem,9vw,9rem)]"
          />
          <GsapTextReveal
            as="p"
            text="c'est le talent"
            trigger="immediate"
            delay={0.78}
            className="text-display text-7xl leading-[0.86] text-ab-orange sm:text-8xl lg:text-[clamp(4.5rem,9vw,9rem)]"
          />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.5 }}
          className="mt-8 max-w-md font-body text-base text-ab-cream/70"
        >
          Former, accompagner et révéler les talents de demain à travers le
          travail, la discipline et des valeurs fortes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4"
        >
          <Magnetic>
            <Button size="lg" onClick={openContactDrawer}>
              Rejoindre l&apos;académie
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Magnetic>

          <Magnetic strength={0.4}>
            <a
              href="#philosophie"
              className="group inline-flex items-center gap-1.5 font-body text-sm font-semibold uppercase tracking-wide text-ab-cream"
            >
              Découvrir notre philosophie
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
}
