"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PhotoPlaceholder } from "@/components/ui/photo-placeholder";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { GsapTextReveal } from "@/components/animations/GsapTextReveal";
import { useContactDrawer } from "@/components/contact/ContactDrawerProvider";

export function GalleryClosing() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const { open: openContactDrawer } = useContactDrawer();

  return (
    <section
      ref={ref}
      className="clip-diagonal-up relative -mt-6 h-[65vh] min-h-[440px] w-full overflow-hidden lg:-mt-10"
    >
      <motion.div style={{ y }} className="absolute inset-0 h-[120%]" data-cursor="voir">
        <PhotoPlaceholder label="Photo collective de l'effectif AB Football Académie" tone="dark" className="h-full w-full" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ab-black via-ab-black/60 to-ab-black/20" />
      <div className="vignette pointer-events-none absolute inset-0" />

      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
        <GsapTextReveal
          as="h2"
          text="Ensemble, allons plus loin"
          className="text-display text-4xl leading-[0.95] text-ab-cream sm:text-6xl"
          highlightIndices={[2, 3]}
        />
        <Magnetic className="mt-8">
          <Button size="lg" onClick={openContactDrawer}>
            Rejoindre l&apos;académie
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Magnetic>
      </div>
    </section>
  );
}
