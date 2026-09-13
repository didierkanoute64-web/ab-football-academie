"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PhotoPlaceholder } from "@/components/ui/photo-placeholder";
import { GsapTextReveal } from "@/components/animations/GsapTextReveal";
import { cn } from "@/lib/utils";

const STEPS = [
  { label: "Entraînements", alt: "Séance d'entraînement AB Football Académie" },
  { label: "Stages", alt: "Stage AB Football Académie" },
  { label: "Matchs", alt: "Match AB Football Académie" },
  { label: "Événements", alt: "Événement AB Football Académie" },
  { label: "Moments de vie", alt: "Vie de l'académie AB Football Académie" },
];

export function SeasonTimeline() {
  const [active, setActive] = useState(0);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (!isDesktop) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-index"));
            if (!Number.isNaN(idx)) setActive(idx);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-ab-cream py-32 lg:py-40">
      <div className="container-ab">
        <div className="mb-14 max-w-2xl lg:mb-20">
          <p className="eyebrow mb-4">Acte 4</p>
          <GsapTextReveal
            as="h2"
            text="Une saison, des souvenirs, une même passion"
            className="stacked-header text-ab-black"
            style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)" }}
            highlightIndices={[4, 5]}
          />
          <Link
            href="/presentation"
            className="group mt-6 inline-flex items-center gap-2 font-body text-sm font-semibold uppercase tracking-wide text-ab-orange"
          >
            Découvrir notre méthode
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Desktop — sticky image that follows the active step */}
          <div className="hidden lg:block">
            <div className="sticky top-28 h-[440px] w-full overflow-hidden" data-cursor="explore">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full w-full"
                >
                  <PhotoPlaceholder label={STEPS[active].alt} tone="green" className="h-full w-full" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <ol className="space-y-0">
            {STEPS.map((step, i) => (
              <li
                key={step.label}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                data-index={i}
                onMouseEnter={() => setActive(i)}
                className="border-b border-ab-black/10 py-8 first:border-t lg:py-10"
              >
                <div className="flex items-baseline gap-5">
                  <span
                    className={cn(
                      "font-display text-lg transition-colors duration-500",
                      active === i ? "text-ab-orange" : "text-ab-black/30"
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p
                    className={cn(
                      "text-display text-3xl tracking-wide transition-colors duration-500 sm:text-4xl",
                      active === i ? "text-ab-black" : "text-ab-black/30"
                    )}
                  >
                    {step.label}
                  </p>
                </div>

                {/* Mobile — each step keeps its own inline image, no pin/interactivity needed */}
                <div className="mt-5 h-48 w-full overflow-hidden lg:hidden" data-cursor="explore">
                  <PhotoPlaceholder label={step.alt} tone="green" className="h-full w-full" />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
