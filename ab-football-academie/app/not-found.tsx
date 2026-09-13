import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { GsapTextReveal } from "@/components/animations/GsapTextReveal";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center bg-ab-cream px-6 text-center">
      <p className="eyebrow mb-4">Erreur 404</p>
      <GsapTextReveal
        as="h1"
        text="Hors jeu"
        trigger="immediate"
        className="text-display text-6xl text-ab-black sm:text-8xl"
        highlightIndices={[1]}
      />
      <p className="mt-5 max-w-md font-body text-base text-ab-black/60">
        La page que vous cherchez n&apos;existe pas ou a été déplacée.
      </p>
      <Magnetic className="mt-8">
        <Link href="/">
          <Button size="lg">
            Retour à l&apos;accueil <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </Magnetic>
    </section>
  );
}
