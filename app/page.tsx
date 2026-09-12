import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Fundamentals } from "@/components/home/Fundamentals";
import { StatsSection } from "@/components/home/StatsSection";
import { FamilySection } from "@/components/home/FamilySection";
import { BrandShowcase } from "@/components/home/BrandShowcase";
import { MomentsShowreel } from "@/components/home/MomentsShowreel";
import { CoachQuote } from "@/components/home/CoachQuote";
import { ImmersionSection } from "@/components/home/ImmersionSection";
import { CtaFinal } from "@/components/home/CtaFinal";

export const metadata: Metadata = {
  title: "Académie de football à Épinay-sur-Seine",
  description:
    "AB Football Académie accompagne les jeunes talents dans leur développement sportif et humain. Plus qu'un club, une famille, un état d'esprit et une aventure humaine.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      {/* Séquence revue (validation en cours) : Hero → Fondamentaux → Chiffres
          → Plus qu'un club, en blanc/crème dominant comme la maquette AB. */}
      <Hero />
      <Fundamentals />
      <StatsSection />
      <FamilySection />
      <BrandShowcase />

      {/* Sections pas encore revues dans cette passe — en attente de validation
          avant de leur appliquer le même traitement clair. */}
      <MomentsShowreel />
      <CoachQuote />
      <ImmersionSection />
      <CtaFinal />
    </>
  );
}

