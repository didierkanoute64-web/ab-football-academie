"use client";

import { useEffect, useRef, useState } from "react";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { GsapTextReveal } from "@/components/animations/GsapTextReveal";
import { cn } from "@/lib/utils";

export interface LegalSection {
  id: string;
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
}

interface LegalLayoutProps {
  eyebrow: string;
  title: string;
  description: string;
  lastUpdate: string;
  sections: LegalSection[];
  /** Rendered after the last numbered section — used for the closing contact block. */
  closing?: React.ReactNode;
}

export function LegalLayout({
  eyebrow,
  title,
  description,
  lastUpdate,
  sections,
  closing,
}: LegalLayoutProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveId(id);
  };

  // Scrollspy: keep the sommaire in sync while the visitor scrolls freely,
  // not only when they click a link.
  useEffect(() => {
    const elements = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sections.length]);

  return (
    <>
      {/* Hero — sobre : pas de photo, pas d'animation cinématique */}
      <section className="relative bg-ab-cream pb-14 pt-32 lg:pb-16 lg:pt-40">
        <div className="container-ab max-w-3xl">
          <div className="mb-5 h-px w-16 bg-ab-orange" />
          <p className="eyebrow mb-4">{eyebrow}</p>
          <GsapTextReveal
            as="h1"
            text={title}
            trigger="immediate"
            className="text-display text-5xl leading-[0.95] text-ab-black sm:text-6xl lg:text-7xl"
          />
          <p className="mt-6 max-w-xl font-body text-base text-ab-black/70">{description}</p>
          <p className="mt-4 font-body text-xs uppercase tracking-wide text-ab-black/40">
            Dernière mise à jour : {lastUpdate}
          </p>
        </div>
      </section>

      {/* Sommaire compact — mobile uniquement */}
      <div className="container-ab lg:hidden">
        <details className="mb-10 rounded-xl border border-ab-black/10 bg-white">
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between px-5 py-3 font-body text-sm font-semibold uppercase tracking-wide text-ab-black">
            Sommaire
            <span aria-hidden="true" className="text-ab-orange">＋</span>
          </summary>
          <nav className="space-y-1 border-t border-ab-black/10 px-5 py-3">
            {sections.map((s, i) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className="flex min-h-11 w-full items-center gap-3 text-left font-body text-sm text-ab-black/70"
              >
                <span className="font-display text-xs text-ab-orange">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {s.title}
              </button>
            ))}
          </nav>
        </details>
      </div>

      <section className="bg-ab-cream pb-24">
        <div className="container-ab grid gap-12 lg:grid-cols-[280px_1fr] lg:gap-16">
          {/* Sommaire sticky — desktop uniquement */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <p className="eyebrow mb-5">Sommaire</p>
              <nav className="space-y-1 border-l border-ab-black/10">
                {sections.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => scrollTo(s.id)}
                    className={cn(
                      "-ml-px flex min-h-11 w-full items-center gap-3 border-l-2 py-2 pl-4 text-left font-body text-sm transition-colors",
                      activeId === s.id
                        ? "border-ab-orange text-ab-black font-semibold"
                        : "border-transparent text-ab-black/50 hover:text-ab-black"
                    )}
                  >
                    <span className="font-display text-xs text-ab-orange">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {s.title}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          <div className="max-w-[70ch] space-y-14">
            {sections.map((s, i) => (
              <RevealOnScroll key={s.id} amount={0.15}>
                <div id={s.id} className="scroll-mt-28 border-t border-ab-black/10 pt-8">
                  <div className="flex items-start gap-4">
                    <span className="font-display text-3xl leading-none text-ab-orange">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="mt-1 shrink-0 text-ab-green">{s.icon}</span>
                    <div className="flex-1">
                      <h2 className="text-display text-2xl tracking-wide text-ab-black">
                        {s.title}
                      </h2>
                      <div className="mt-3 space-y-3 font-body text-sm leading-relaxed text-ab-black/70">
                        {s.content}
                      </div>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {closing}
    </>
  );
}
