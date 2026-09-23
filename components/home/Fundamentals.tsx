import { GraduationCap, HeartHandshake, TrendingUp, Trophy } from "lucide-react";
import { GsapTextReveal } from "@/components/animations/GsapTextReveal";
import { StaggerGroup, StaggerItem } from "@/components/animations/RevealOnScroll";

const items = [
  {
    n: "01",
    icon: GraduationCap,
    title: "Formation",
    text: "Un encadrement de qualité pour révéler le potentiel de chaque joueur.",
  },
  {
    n: "02",
    icon: HeartHandshake,
    title: "Valeurs",
    text: "Respect, travail, solidarité au cœur de notre projet.",
  },
  {
    n: "03",
    icon: TrendingUp,
    title: "Progression",
    text: "Des méthodes adaptées pour évoluer à chaque étape.",
  },
  {
    n: "04",
    icon: Trophy,
    title: "Ambition",
    text: "Former les talents de demain.",
  },
];

export function Fundamentals() {
  return (
    <section className="bg-ab-green-deep py-24 lg:py-32">
      <div className="container-ab">
        <p className="eyebrow mb-4 text-ab-orange">Nos piliers</p>
        <GsapTextReveal
          as="h2"
          text="Former aujourd'hui, révéler demain"
          className="stacked-header text-ab-cream"
          style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)" }}
        />

        <StaggerGroup className="mt-16 grid grid-cols-1 gap-px overflow-hidden bg-ab-cream/10 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ n, icon: Icon, title, text }) => (
            <StaggerItem key={title}>
              <div className="group relative h-full bg-ab-green-deep p-8 transition-transform duration-300 ease-premium hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-display text-2xl text-ab-cream/30">{n}</span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-ab-orange/40 transition-colors duration-300 group-hover:border-ab-orange group-hover:bg-ab-orange/10">
                    <Icon className="h-4 w-4 text-ab-orange" strokeWidth={1.5} />
                  </span>
                </div>
                <h3 className="text-display mt-6 text-2xl tracking-wide text-ab-cream">
                  {title}
                </h3>
                <p className="mt-2 max-w-[24ch] font-body text-sm text-ab-cream/60">{text}</p>
                <span className="absolute inset-x-8 bottom-0 h-[2px] origin-left scale-x-0 bg-ab-orange transition-transform duration-300 ease-premium group-hover:scale-x-100" />
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
