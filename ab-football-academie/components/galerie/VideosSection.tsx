"use client";

import { useState } from "react";
import { GsapTextReveal } from "@/components/animations/GsapTextReveal";
import { StaggerGroup, StaggerItem } from "@/components/animations/RevealOnScroll";
import { VideoTile } from "@/components/galerie/VideoTile";
import { VideoModal } from "@/components/galerie/VideoModal";
import { galleryVideos } from "@/lib/media";

export function VideosSection() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = galleryVideos.find((v) => v.id === activeId) ?? null;

  return (
    <section className="bg-ab-black py-32 lg:py-40">
      <div className="container-ab">
        <div className="mb-12 lg:mb-16">
          <p className="eyebrow mb-4 text-ab-orange">Acte 3</p>
          <GsapTextReveal
            as="h2"
            text="Immersion vidéo"
            className="text-display text-3xl tracking-wide text-ab-cream sm:text-4xl lg:text-5xl"
          />
        </div>

        <StaggerGroup className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {galleryVideos.map((video) => (
            <StaggerItem key={video.id}>
              <VideoTile item={video} surface="dark" onOpen={() => setActiveId(video.id)} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>

      <VideoModal item={active} onClose={() => setActiveId(null)} />
    </section>
  );
}
