"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContactDrawer } from "@/components/contact/ContactDrawerProvider";
import { Magnetic } from "@/components/ui/magnetic";
import { MediaImage } from "@/components/ui/media-image";
import { GsapTextReveal } from "@/components/animations/GsapTextReveal";
import { media } from "@/lib/media";

export function CtaFinal() {
  const ref = useRef<HTMLDivElement>(null);
  const { open: openContactDrawer } = useContactDrawer();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const ctaPhoto = media.home.ctaFinal;

  return (
    <section
      ref={ref}
      className="clip-diagonal-up relative -mt-6 h-[75vh] min-h-[520px] w-full overflow-hidden lg:-mt-10"
    >
      <motion.div style={{ y }} className="absolute inset-0 h-[120%]">
        <MediaImage asset={ctaPhoto} tone="dark" sizes="100vw" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ab-green-deep via-ab-green-deep/70 to-ab-black/30" />
      <div className="vignette pointer-events-none absolute inset-0" />

      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
        <GsapTextReveal
          as="h2"
          text="Prêt à rejoindre l'aventure AB ?"
          className="text-display text-4xl leading-[0.95] text-ab-cream sm:text-6xl"
        />
        <p className="mt-5 max-w-md font-body text-base text-ab-cream/70">
          Des valeurs. Un cadre. Des opportunités.
          <br />
          Et surtout, une famille.
        </p>
        <Magnetic className="mt-8">
          <Button size="lg" onClick={openContactDrawer}>
            Faire une demande d&apos;inscription
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Magnetic>
      </div>
    </section>
  );
}
