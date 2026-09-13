import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { Counter } from "@/components/animations/Counter";
import { STATS } from "@/lib/constants";

export function StatsSection() {
  return (
    <section className="bg-ab-cream py-28 lg:py-40">
      <div className="container-ab">
        <div className="grid divide-y divide-ab-black/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {STATS.map((stat, i) => (
            <RevealOnScroll
              key={stat.label}
              delay={i * 0.12}
              className="py-8 text-center sm:px-8 sm:py-0"
            >
              <p className="text-display text-6xl text-ab-orange sm:text-7xl lg:text-8xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-3 font-body text-xs font-medium uppercase tracking-[0.2em] text-ab-green">
                {stat.label}
              </p>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delay={0.3} className="mt-14 flex justify-center border-t border-ab-black/10 pt-12">
          <p className="font-display text-3xl italic tracking-wide text-ab-green sm:text-4xl">
            Le talent, c&apos;est le travail !
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
