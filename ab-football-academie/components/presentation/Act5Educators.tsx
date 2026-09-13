"use client";

import { PhotoPlaceholder } from "@/components/ui/photo-placeholder";
import { GsapTextReveal } from "@/components/animations/GsapTextReveal";
import { RevealOnScroll, StaggerGroup, StaggerItem } from "@/components/animations/RevealOnScroll";
import { media } from "@/lib/media";

const STAFF = [
  {
    role: "Coach principal",
    focus: ["Direction sportive", "Formation des jeunes", "Suivi global et pédagogique"],
  },
  { role: "Coach adjoint", focus: ["Accompagnement sportif", "Développement technique"] },
  { role: "Coach adjoint", focus: ["Préparation des séances", "Suivi et progression"] },
  { role: "Coach adjoint", focus: ["Encadrement des jeunes", "Accompagnement individuel"] },
];

export function Act5Educators() {
  const coaches = media.presentation.coaches;

  return (
    <section className="bg-ab-cream py-32 lg:py-40">
      <div className="container-ab">
        <RevealOnScroll className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <p className="eyebrow mb-4">Nos éducateurs</p>
            <GsapTextReveal
              as="h2"
              text="Transmettre pour faire grandir"
              className="stacked-header text-ab-black"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
              highlightIndices={[2, 3]}
            />
          </div>
          <div className="flex gap-10">
            <div>
              <p className="text-display text-5xl text-ab-green">4</p>
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

        <StaggerGroup className="mt-16 grid gap-1 sm:grid-cols-2 lg:grid-cols-4">
          {STAFF.map((member, i) => {
            const photo = coaches[i];
            return (
              <StaggerItem key={i}>
                <div className="group relative h-[420px] overflow-hidden lg:h-[520px]" data-cursor="voir">
                  <PhotoPlaceholder
                    label={photo?.alt ?? `Portrait ${member.role.toLowerCase()}`}
                    tone="cream"
                    className="h-full w-full grayscale transition-all duration-700 ease-premium group-hover:scale-105 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ab-black/90 via-ab-black/10 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-90" />

                  <div className="absolute inset-x-0 bottom-0 translate-y-8 p-6 opacity-0 transition-all duration-500 ease-premium group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="text-display text-2xl tracking-wide text-ab-cream">
                      {member.role}
                    </p>
                    <ul className="mt-2 space-y-0.5 font-body text-xs text-ab-cream/70">
                      {member.focus.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                  </div>

                  <p className="absolute bottom-6 left-6 font-display text-2xl tracking-wide text-ab-cream transition-opacity duration-300 group-hover:opacity-0">
                    {member.role}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
