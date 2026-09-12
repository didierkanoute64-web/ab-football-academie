import type { Metadata } from "next";
import { GalleryHero } from "@/components/galerie/GalleryHero";
import { GalleryPhotosSection } from "@/components/galerie/GalleryPhotosSection";
import { VideosSection } from "@/components/galerie/VideosSection";
import { SeasonTimeline } from "@/components/galerie/SeasonTimeline";
import { ShareMoments } from "@/components/galerie/ShareMoments";
import { GalleryClosing } from "@/components/galerie/GalleryClosing";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Galerie | AB Football Académie",
  description:
    "Découvrez en photos et vidéos les entraînements, matchs, stages et moments de vie d'AB Football Académie.",
  alternates: { canonical: "/galerie" },
  openGraph: {
    url: `${SITE.url}/galerie`,
  },
};

export default function GaleriePage() {
  return (
    <>
      <GalleryHero />
      <GalleryPhotosSection />
      <VideosSection />
      <SeasonTimeline />
      <ShareMoments />
      <GalleryClosing />
    </>
  );
}
