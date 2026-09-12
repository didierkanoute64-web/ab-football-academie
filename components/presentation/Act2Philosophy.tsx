"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { MediaImage } from "@/components/ui/media-image";
import { GsapTextReveal } from "@/components/animations/GsapTextReveal";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { media } from "@/lib/media";
import { cn } from "@/lib/utils";

const STEPS = [
  { n: "01", title: "Développer", text: "Le potentiel de chaque jeune.", align: "left" as const },
  { n: "02", title: "Transmettre", text: "Des valeurs fortes.", align: "right" as const },
  { n: "03", title: "Créer du lien", text: "Par le respect et le collectif.", align: "left" as const },
  { n: "04", title: "Se dépasser", text: "Chaque jour.", align: "right" as const },
];

export function Act2Philosophy() {
  const pinRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);
  const dotRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const pinTarget = pinRef.current;
      const photo = photoRef.current;
      const overlay = overlayRef.current;
      const steps = stepRefs.current.filter(Boolean) as HTMLDivElement[];
      const dots = dotRefs.current.filter(Boolean) as HTMLSpanElement[];
      if (!pinTarget || !photo || !overlay || steps.length === 0) return;

      gsap.set(steps, { opacity: 0, y: 32 });
      gsap.set(steps[0], { opacity: 1, y: 0 });
      gsap.set(dots[0], { backgroundColor: "#F97316", scale: 1.3 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinTarget,
          start: "top top",
          end: `+=${steps.length * 100}%`,
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      });

      steps.forEach((step, i) => {
        if (i === 0) return;
        const prev = steps[i - 1];

        tl.to(prev, { opacity: 0, y: -32, duration: 0.5 }, i - 0.5)
          .fromTo(step, { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.5 }, i - 0.5)
          .to(photo, { scale: 1 + i * 0.045, duration: 0.6 }, i - 0.5)
          .to(overlay, { opacity: i % 2 === 0 ? 0.25 : 0.5, duration: 0.6 }, i - 0.5)
          .to(dots[i - 1], { backgroundColor: "rgba(250,248,243,0.3)", scale: 1 }, i - 0.5)
          .to(dots[i], { backgroundColor: "#F97316", scale: 1.3 }, i - 0.5);
      });

      return () => {
        tl.kill();
      };
    });

    return () => mm.revert();
  }, []);

  const philosophyPhoto = media.presentation.philosophy;

  return (
    <section className="bg-ab-cream">
      <div className="container-ab py-24 lg:py-28">
        <p className="eyebrow mb-4">Notre philosophie</p>
        <GsapTextReveal
          as="h2"
          text="Grandir par le football"
          className="stacked-header text-ab-black"
          style={{ fontSize: "clamp(2.75rem, 7vw, 5.5rem)" }}
          highlightIndices={[0]}
        />
      </div>

      {/* Desktop — pinned photographic sequence */}
      <div ref={pinRef} className="relative hidden h-[100svh] w-full overflow-hidden bg-ab-black lg:block">
        <div ref={photoRef} className="absolute inset-0 h-full w-full" data-cursor="voir">
          <MediaImage asset={philosophyPhoto} tone="dark" sizes="100vw" />
        </div>
        <div ref={overlayRef} className="absolute inset-0 bg-ab-black" style={{ opacity: 0.25 }} />

        <div className="relative flex h-full items-center">
          <div className="container-ab">
            <div className="relative h-64 w-full max-w-xl">
              {STEPS.map((step, i) => (
                <div
                  key={step.n}
                  ref={(el) => {
                    stepRefs.current[i] = el;
                  }}
                  className={cn(
                    "absolute inset-0 flex flex-col justify-center",
                    step.align === "right" ? "ml-auto items-end text-right" : "items-start text-left"
                  )}
                >
                  <span className="font-display text-2xl text-ab-orange">{step.n}</span>
                  <p className="stacked-header mt-2 text-ab-cream" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
                    {step.title}
                  </p>
                  <p className="mt-3 font-body text-base text-ab-cream/70">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 items-center gap-3">
          {STEPS.map((step, i) => (
            <span
              key={step.n}
              ref={(el) => {
                dotRefs.current[i] = el;
              }}
              className="h-1.5 w-1.5 rounded-full bg-ab-cream/30"
            />
          ))}
        </div>
      </div>

      {/* Mobile — natural vertical sequence, no pinning */}
      <div className="space-y-16 px-5 pb-20 lg:hidden">
        {STEPS.map((step) => (
          <RevealOnScroll key={step.n} className="space-y-4">
            <div className="relative h-56 w-full overflow-hidden" data-cursor="voir">
              <MediaImage asset={philosophyPhoto} tone="dark" sizes="100vw" />
            </div>
            <span className="font-display text-xl text-ab-orange">{step.n}</span>
            <p className="text-display text-3xl tracking-wide text-ab-black">{step.title}</p>
            <p className="font-body text-sm text-ab-black/60">{step.text}</p>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
