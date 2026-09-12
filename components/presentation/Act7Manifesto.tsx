"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { MediaImage } from "@/components/ui/media-image";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { GsapTextReveal } from "@/components/animations/GsapTextReveal";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { useContactDrawer } from "@/components/contact/ContactDrawerProvider";
import { media } from "@/lib/media";

export function Act7Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const { open: openContactDrawer } = useContactDrawer();

  const manifestoPhoto = media.presentation.manifesto;

  return (
    <section
      ref={ref}
      className="clip-diagonal-up relative -mt-6 h-[85vh] min-h-[560px] w-full overflow-hidden lg:-mt-10"
    >
      <motion.div style={{ y }} className="absolute inset-0 h-[120%]" data-cursor="voir">
        <MediaImage asset={manifestoPhoto} tone="dark" sizes="100vw" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ab-black via-ab-black/60 to-ab-black/30" />
      <div className="vignette pointer-events-none absolute inset-0" />

      <div className="container-ab relative flex h-full flex-col items-center justify-center px-6 text-center">
        <RevealOnScroll>
          <p className="font-body text-sm italic text-ab-cream/70 lg:text-base">
            La volonté te fait démarrer.
            <br />
            Le travail te fait progresser.
            <br />
            Le talent te fait réussir.
          </p>
        </RevealOnScroll>

        <div className="mt-8">
          <GsapTextReveal
            as="p"
            text="Le talent, c'est le travail !"
            className="stacked-header inline-block text-ab-cream"
            style={{ fontSize: "clamp(2.75rem, 8vw, 6.5rem)" }}
            highlightIndices={[0]}
          />
        </div>

        <Magnetic className="mt-10">
          <Button size="lg" onClick={openContactDrawer}>
            Rejoindre l&apos;académie <ArrowRight className="h-4 w-4" />
          </Button>
        </Magnetic>
      </div>
    </section>
  );
}
