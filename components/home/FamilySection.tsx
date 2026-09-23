"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { MediaImage } from "@/components/ui/media-image";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { media } from "@/lib/media";

const PILLARS = ["Discipline", "Travail", "Progression", "Réussite"];

export function FamilySection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  const familyPhoto = media.home.family;

  return (
    <section id="philosophie" ref={ref} className="relative w-full scroll-mt-20">
      <div className="grid lg:grid-cols-[40%_60%]">
        <div className="relative flex items-center overflow-hidden bg-ab-green-deep px-6 py-20 sm:px-10 lg:px-14 lg:py-0">
          <span className="text-ghost pointer-events-none absolute -left-10 top-1/2 -translate-y-1/2 select-none text-[26rem] leading-none text-ab-cream opacity-[0.03]">
            AB
          </span>
          <RevealOnScroll className="relative">
            <p className="eyebrow mb-4 text-ab-orange">Notre philosophie</p>
            <h2 className="text-display text-4xl leading-[0.95] text-ab-cream sm:text-5xl">
              Bien plus
              <br />
              qu&apos;un club,
              <br />
              <span className="text-ab-orange">une famille.</span>
            </h2>
            <p className="mt-6 max-w-md font-body text-base text-ab-cream/75">
              À AB Football Académie, nous croyons que le football est un
              formidable vecteur d&apos;éducation, de dépassement de soi et
              d&apos;inclusion. Nous accompagnons chaque jeune dans un cadre
              bienveillant et ambitieux, pour l&apos;aider à grandir sur et en
              dehors du terrain.
            </p>
            <FamilyCta />
          </RevealOnScroll>
        </div>

        <div className="relative h-[46vh] min-h-[320px] lg:h-[70vh] lg:min-h-[520px]">
          <motion.div style={{ y }} className="relative h-[110%] w-full">
            <MediaImage
              asset={familyPhoto}
              tone="cream"
              sizes="(min-width: 1024px) 60vw, 100vw"
              objectPosition="center 25%"
            />
          </motion.div>

          <div className="absolute right-6 top-8 flex flex-col items-end gap-1 sm:right-10 sm:top-10">
            {PILLARS.map((p) => (
              <span
                key={p}
                className="font-display text-sm uppercase tracking-[0.25em] text-ab-cream drop-shadow-md sm:text-base"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FamilyCta() {
  return (
    <Magnetic className="mt-8">
      <Link href="/presentation">
        <Button variant="outline-light">
          En savoir plus
          <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>
    </Magnetic>
  );
}
