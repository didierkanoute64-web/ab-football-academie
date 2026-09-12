"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { PhotoPlaceholder } from "@/components/ui/photo-placeholder";
import { GsapTextReveal } from "@/components/animations/GsapTextReveal";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { media } from "@/lib/media";

const PILLARS = [
  {
    n: "01",
    title: "Formation sportive",
    items: ["Technique", "Coordination", "Compréhension du jeu", "Progression"],
    photo: media.presentation.method.formationSportive,
  },
  {
    n: "02",
    title: "Éducation",
    items: ["Respect", "Discipline", "Autonomie", "Esprit collectif"],
    photo: media.presentation.method.education,
  },
  {
    n: "03",
    title: "Épanouissement",
    items: ["Confiance", "Plaisir", "Dépassement de soi", "Sentiment d'appartenance"],
    photo: media.presentation.method.epanouissement,
  },
];

export function Act4Method() {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const pinTarget = pinRef.current;
      const track = trackRef.current;
      if (!pinTarget || !track) return;

      const tween = gsap.to(track, {
        xPercent: -((PILLARS.length - 1) / PILLARS.length) * 100,
        ease: "none",
        scrollTrigger: {
          trigger: pinTarget,
          start: "top top",
          end: `+=${(PILLARS.length - 1) * 100}%`,
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      });

      return () => {
        tween.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section className="bg-ab-cream">
      <div className="container-ab py-24 lg:py-28">
        <p className="eyebrow mb-4">Notre méthode</p>
        <GsapTextReveal
          as="h2"
          text="Une vision, 3 piliers"
          className="stacked-header text-ab-black"
          style={{ fontSize: "clamp(2.75rem, 7vw, 5.5rem)" }}
          highlightIndices={[2, 3]}
        />
      </div>

      {/* Desktop — pinned horizontal scroll across the 3 pillars */}
      <div ref={pinRef} className="relative hidden h-[100svh] w-full overflow-hidden lg:block">
        <div ref={trackRef} className="flex h-full" style={{ width: `${PILLARS.length * 100}%` }}>
          {PILLARS.map((pillar) => (
            <div key={pillar.n} className="relative h-full" style={{ width: `${100 / PILLARS.length}%` }}>
              <div className="absolute inset-0" data-cursor="voir">
                <PhotoPlaceholder label={pillar.photo.alt} tone="dark" className="h-full w-full" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-ab-black/85 via-ab-black/30 to-ab-black/10" />

              <div className="relative flex h-full flex-col justify-end p-10 lg:p-16">
                <span className="font-display text-3xl text-ab-orange">{pillar.n}</span>
                <p className="stacked-header mt-2 text-ab-cream" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
                  {pillar.title}
                </p>
                <ul className="mt-5 space-y-1 font-body text-sm text-ab-cream/70">
                  {pillar.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile — stacked pillars, photo-first */}
      <div className="space-y-14 px-5 pb-20 lg:hidden">
        {PILLARS.map((pillar) => (
          <RevealOnScroll key={pillar.n}>
            <div className="relative h-64 w-full overflow-hidden" data-cursor="voir">
              <PhotoPlaceholder label={pillar.photo.alt} tone="dark" className="h-full w-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-ab-black/80 via-ab-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <span className="font-display text-2xl text-ab-orange">{pillar.n}</span>
                <p className="text-display text-2xl tracking-wide text-ab-cream">{pillar.title}</p>
              </div>
            </div>
            <ul className="mt-4 space-y-1 font-body text-sm text-ab-black/60">
              {pillar.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
