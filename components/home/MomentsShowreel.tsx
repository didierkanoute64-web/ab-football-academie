"use client";

import { useRef } from "react";
import { MediaImage } from "@/components/ui/media-image";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { GsapTextReveal } from "@/components/animations/GsapTextReveal";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { gallery } from "@/lib/media";

// Réutilise les meilleures photos réelles déjà présentes dans le projet
// (galerie) quand leur contenu correspond au thème de la vignette. Les
// vignettes sans correspondance réelle honnête gardent le placeholder
// abstrait plutôt qu'une photo forcée.
const MOMENTS = [
  { label: "Séance matinale, terrain synthétique", tag: "Entraînement — 2025", galleryId: "g01" },
  { label: "Frappe enroulée, plein effort", tag: "Match — 2025", galleryId: "g08" },
  { label: "Briefing tactique avant coup d'envoi", tag: "Coaching — 2025", galleryId: "g03" },
  { label: "Stage d'été, exercices collectifs", tag: "Stage — 2024", galleryId: "g11" },
  { label: "Célébration collective après le but", tag: "Match — 2024", galleryId: null },
  { label: "Retour au vestiaire, groupe soudé", tag: "Vie de club — 2024", galleryId: null },
] as const;

export function MomentsShowreel() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    scrollerRef.current?.scrollBy({ left: dir * 420, behavior: "smooth" });
  };

  return (
    <section className="bg-ab-cream py-24 lg:py-28">
      <div className="container-ab mb-10 flex items-end justify-between">
        <RevealOnScroll>
          <p className="eyebrow mb-4">Le carnet AB</p>
          <GsapTextReveal
            as="h2"
            text="Nos moments"
            className="stacked-header text-ab-black"
            highlightIndices={[1]}
          />
        </RevealOnScroll>

        <div className="hidden gap-3 lg:flex">
          <button
            onClick={() => scrollBy(-1)}
            aria-label="Précédent"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-ab-black/15 text-ab-black transition-colors hover:bg-ab-black hover:text-ab-cream"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scrollBy(1)}
            aria-label="Suivant"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-ab-black/15 text-ab-black transition-colors hover:bg-ab-black hover:text-ab-cream"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:px-8 lg:px-12"
      >
        {MOMENTS.map((m, i) => {
          const matched = m.galleryId ? gallery.find((g) => g.id === m.galleryId) : null;
          const asset = matched
            ? { src: matched.src, alt: matched.alt }
            : { src: null, alt: m.label };

          return (
            <div
              key={i}
              className="group relative h-[60vh] min-h-[380px] w-[78vw] shrink-0 snap-start overflow-hidden sm:w-[46vw] lg:w-[30vw]"
              data-cursor="explore"
            >
              <MediaImage
                asset={asset}
                tone={i % 2 === 0 ? "cream" : "green"}
                sizes="(min-width: 1024px) 30vw, 46vw"
                className="transition-transform duration-700 ease-premium group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-ab-orange/0 mix-blend-multiply transition-colors duration-500 group-hover:bg-ab-orange/20" />
              <span className="absolute right-5 top-5 font-display text-sm text-ab-cream/50">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ab-black/70 to-transparent p-5">
                <p className="font-body text-xs uppercase tracking-[0.2em] text-ab-cream/80">
                  {m.tag}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
