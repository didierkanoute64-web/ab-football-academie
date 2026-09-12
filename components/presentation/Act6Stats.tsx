import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { GsapTextReveal } from "@/components/animations/GsapTextReveal";
import { Counter } from "@/components/animations/Counter";
import { STATS } from "@/lib/constants";

export function Act6Stats() {
  return (
    <section className="bg-ab-cream py-28 lg:py-36">
      <div className="container-ab">
        <div className="grid gap-12 sm:grid-cols-3 sm:gap-6">
          {STATS.map((stat, i) => (
            <RevealOnScroll key={stat.label} delay={i * 0.1} className="text-center sm:text-left">
              <p className="text-display text-6xl text-ab-green sm:text-7xl lg:text-8xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 font-body text-sm font-medium uppercase tracking-wide text-ab-black/60">
                {stat.label}
              </p>
            </RevealOnScroll>
          ))}
        </div>

        <div className="mt-16 border-t border-ab-black/10 pt-12 text-center">
          <p className="eyebrow mb-4">Une même ambition</p>
          <GsapTextReveal
            as="p"
            text="Faire grandir chaque jeune"
            className="stacked-header inline-block text-ab-black"
            style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)" }}
            highlightIndices={[0, 1]}
          />
        </div>
      </div>
    </section>
  );
}
