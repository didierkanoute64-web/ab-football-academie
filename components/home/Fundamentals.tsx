import { GraduationCap, HeartHandshake, TrendingUp, Trophy } from "lucide-react";
import { StaggerGroup, StaggerItem } from "@/components/animations/RevealOnScroll";

const items = [
  {
    icon: GraduationCap,
    title: "Formation",
    text: "Un encadrement de qualité pour révéler le potentiel de chaque joueur.",
  },
  {
    icon: HeartHandshake,
    title: "Valeurs",
    text: "Respect, travail, solidarité au cœur de notre projet.",
  },
  {
    icon: TrendingUp,
    title: "Progression",
    text: "Des méthodes adaptées pour évoluer à chaque étape.",
  },
  {
    icon: Trophy,
    title: "Ambition",
    text: "Former les talents de demain.",
  },
];

export function Fundamentals() {
  return (
    <section className="bg-ab-green py-12 lg:py-0">
      <div className="container-ab lg:flex lg:min-h-[260px] lg:items-center">
        <StaggerGroup className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-ab-cream/15">
          {items.map(({ icon: Icon, title, text }) => (
            <StaggerItem key={title}>
              <div className="lg:px-8">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-ab-orange/50">
                  <Icon className="h-4 w-4 text-ab-orange" strokeWidth={1.5} />
                </span>
                <h3 className="text-display mt-4 text-xl tracking-wide text-ab-cream">
                  {title}
                </h3>
                <p className="mt-2 max-w-[22ch] font-body text-sm text-ab-cream/70">{text}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
