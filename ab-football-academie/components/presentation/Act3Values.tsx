"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PhotoPlaceholder } from "@/components/ui/photo-placeholder";
import { GsapTextReveal } from "@/components/animations/GsapTextReveal";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { media } from "@/lib/media";
import { cn } from "@/lib/utils";

const VALUES = [
  { title: "Respect", text: "Considération et bienveillance." },
  { title: "Travail", text: "Rigueur et constance." },
  { title: "Passion", text: "L'envie de progresser." },
  { title: "Solidarité", text: "Grandir ensemble." },
  { title: "Discipline", text: "Respecter le cadre." },
];

export function Act3Values() {
  const [active, setActive] = useState(0);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Mobile: the value nearest the vertical center of the viewport becomes active.
  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (isDesktop) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-index"));
            if (!Number.isNaN(idx)) setActive(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const valuesPhoto = media.presentation.values;

  return (
    <section className="bg-ab-green py-32 lg:py-40">
      <div className="container-ab">
        <RevealOnScroll className="max-w-2xl">
          <p className="eyebrow mb-4 text-ab-orange">Nos valeurs</p>
          <GsapTextReveal
            as="h2"
            text="Ce que nous formons va bien au-delà du joueur"
            className="stacked-header text-ab-cream"
            style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)" }}
          />
        </RevealOnScroll>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-20">
          <div>
            {VALUES.map((value, i) => (
              <div
                key={value.title}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                data-index={i}
                onMouseEnter={() => setActive(i)}
                className="group cursor-default border-b border-ab-cream/10 py-5 first:border-t lg:py-6"
              >
                <p
                  className={cn(
                    "text-display text-4xl tracking-wide transition-all duration-500 sm:text-5xl lg:text-6xl",
                    active === i ? "text-ab-orange" : "text-ab-cream/35"
                  )}
                >
                  {value.title}
                </p>
                <p
                  className={cn(
                    "mt-2 font-body text-sm text-ab-cream/70 transition-all duration-500 lg:hidden",
                    active === i ? "block" : "hidden"
                  )}
                >
                  {value.text}
                </p>
              </div>
            ))}
          </div>

          <div className="relative hidden h-[420px] overflow-hidden lg:block" data-cursor="voir">
            <PhotoPlaceholder label={valuesPhoto.alt} tone="dark" className="h-full w-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-ab-black/80 via-ab-black/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8">
              <AnimatePresence mode="wait">
                <motion.p
                  key={active}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="font-body text-lg text-ab-cream"
                >
                  {VALUES[active].text}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
