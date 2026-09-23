"use client";

import { GsapTextReveal } from "@/components/animations/GsapTextReveal";
import { RevealOnScroll, StaggerGroup, StaggerItem } from "@/components/animations/RevealOnScroll";
import { CoachCard } from "@/components/presentation/CoachCard";
import { media } from "@/lib/media";

const PRINCIPAL = {
  role: "Coach principal",
  focus: ["Direction sportive", "Formation des jeunes", "Accompagnement", "Suivi des jeunes"],
};

const ADJOINTS = [
  { role: "Coach adjoint", focus: ["Accompagnement sportif", "Développement technique"] },
  { role: "Coach adjoint", focus: ["Préparation des séances", "Suivi et progression"] },
  { role: "Coach adjoint", focus: ["Encadrement des jeunes", "Accompagnement individuel"] },
  { role: "Coach adjoint", focus: ["Suivi individuel", "Accompagnement collectif"] },
];

const PREPARATRICE = {
  role: "Préparatrice sportive",
  focus: ["Préparation physique", "Prévention des blessures"],
};

export function Act5Educators() {
  const coaches = media.presentation.coaches;

  return (
    <section className="bg-ab-cream py-32 lg:py-40">
      <div className="container-ab">
        <RevealOnScroll className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <p className="eyebrow mb-4">Notre équipe</p>
            <GsapTextReveal
              as="h2"
              text="Ceux qui transmettent"
              className="stacked-header text-ab-black"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
              highlightIndices={[2]}
            />
            <p className="mt-4 max-w-md font-body text-base text-ab-black/60">
              Une équipe engagée au service des jeunes.
            </p>
          </div>
          <div className="flex gap-10">
            <div>
              <p className="text-display text-5xl text-ab-green">6</p>
              <p className="font-body text-xs uppercase tracking-wide text-ab-black/50">
                Éducateurs passionnés
              </p>
            </div>
            <div>
              <p className="text-display text-5xl text-ab-green">10</p>
              <p className="font-body text-xs uppercase tracking-wide text-ab-black/50">
                Années d&apos;expérience de coaching
              </p>
            </div>
          </div>
        </RevealOnScroll>

        <div className="mt-16 space-y-4">
          {/* Coach principal — carte dominante, 55-60% de largeur */}
          <RevealOnScroll className="grid gap-4 lg:grid-cols-[58%_42%]">
            <CoachCard
              photo={coaches[0] ?? { src: null, alt: "Portrait coach principal" }}
              role={PRINCIPAL.role}
              focus={PRINCIPAL.focus}
              variant="large"
            />
            <div className="flex flex-col justify-center bg-ab-green-deep p-8 lg:p-12">
              <p className="eyebrow mb-4 text-ab-orange">Coach principal</p>
              <p className="text-display text-3xl leading-tight tracking-wide text-ab-cream lg:text-4xl">
                Direction sportive &amp; formation des jeunes
              </p>
              <ul className="mt-6 space-y-2 font-body text-sm text-ab-cream/70">
                {PRINCIPAL.focus.map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <span className="h-px w-6 bg-ab-orange" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </RevealOnScroll>

          {/* 4 coachs adjoints — 2 x 2 */}
          <StaggerGroup className="grid gap-4 sm:grid-cols-2">
            {ADJOINTS.map((member, i) => (
              <StaggerItem key={i}>
                <CoachCard
                  photo={coaches[i + 1] ?? { src: null, alt: `Portrait ${member.role.toLowerCase()} ${i + 1}` }}
                  role={member.role}
                  focus={member.focus}
                />
              </StaggerItem>
            ))}
          </StaggerGroup>

          {/* Préparatrice sportive — même niveau visuel que le coach principal,
              structurée en photo + texte pour que le portrait (vertical)
              conserve une taille lisible plutôt que d'être écrasé dans un
              format très large et peu adapté à une image portrait. */}
          <RevealOnScroll className="grid gap-4 lg:grid-cols-[42%_58%]">
            <div className="order-2 flex flex-col justify-center bg-ab-green-deep p-8 lg:order-1 lg:p-12">
              <p className="eyebrow mb-4 text-ab-orange">Préparatrice sportive</p>
              <p className="text-display text-3xl leading-tight tracking-wide text-ab-cream lg:text-4xl">
                Préparation physique &amp; prévention
              </p>
              <ul className="mt-6 space-y-2 font-body text-sm text-ab-cream/70">
                {PREPARATRICE.focus.map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <span className="h-px w-6 bg-ab-orange" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-1 lg:order-2">
              <CoachCard
                photo={coaches[5] ?? { src: null, alt: "Portrait préparatrice sportive" }}
                role={PREPARATRICE.role}
                focus={PREPARATRICE.focus}
                variant="large"
              />
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
