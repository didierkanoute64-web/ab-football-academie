import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { StatsSection } from "@/components/home/StatsSection";
import { FamilySection } from "@/components/home/FamilySection";
import { Fundamentals } from "@/components/home/Fundamentals";
import { ImmersionSection } from "@/components/home/ImmersionSection";
import { CoachQuote } from "@/components/home/CoachQuote";
import { BlogPreview } from "@/components/home/BlogPreview";
import { CtaFinal } from "@/components/home/CtaFinal";

export const metadata: Metadata = {
  title: "École de football pour enfants et jeunes à Épinay-sur-Seine",
  description:
    "AB Football Académie, académie de football pour enfants et jeunes à Épinay-sur-Seine, accompagne chaque joueur dans son développement sportif et humain. Plus qu'un club : une famille, un état d'esprit, une aventure humaine.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      {/* 01 Hero · 02 Chiffres · 03 Philosophie · 04 Piliers ·
          05 Immersion · 06 Mot du coach · 07 Carnet AB · 08 CTA final */}
      <Hero />
      <StatsSection />
      <FamilySection />
      <Fundamentals />
      <ImmersionSection />
      <CoachQuote />
      <BlogPreview />
      <CtaFinal />
    </>
  );
}

