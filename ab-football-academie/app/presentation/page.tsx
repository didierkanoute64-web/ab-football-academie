import type { Metadata } from "next";
import { Act1Hero } from "@/components/presentation/Act1Hero";
import { Act2Philosophy } from "@/components/presentation/Act2Philosophy";
import { Act3Values } from "@/components/presentation/Act3Values";
import { Act4Method } from "@/components/presentation/Act4Method";
import { Act5Educators } from "@/components/presentation/Act5Educators";
import { Act6Stats } from "@/components/presentation/Act6Stats";
import { Act7Manifesto } from "@/components/presentation/Act7Manifesto";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Présentation — Notre histoire, notre méthode",
  description:
    "Histoire, philosophie, valeurs et méthode d'AB Football Académie : une école de football pour enfants et jeunes à Épinay-sur-Seine, pensée pour révéler le potentiel de chaque joueur.",
  alternates: { canonical: "/presentation" },
  openGraph: { url: `${SITE.url}/presentation` },
};

export default function PresentationPage() {
  return (
    <>
      <Act1Hero />
      <Act2Philosophy />
      <Act3Values />
      <Act4Method />
      <Act5Educators />
      <Act6Stats />
      <Act7Manifesto />
    </>
  );
}
