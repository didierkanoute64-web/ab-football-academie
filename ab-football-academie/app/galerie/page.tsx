import type { Metadata } from "next";
import { GalleryHero } from "@/components/galerie/GalleryHero";
import { GalleryPhotosSection } from "@/components/galerie/GalleryPhotosSection";
import { VideosSection } from "@/components/galerie/VideosSection";
import { SeasonTimeline } from "@/components/galerie/SeasonTimeline";
import { ShareMoments } from "@/components/galerie/ShareMoments";
import { GalleryClosing } from "@/components/galerie/GalleryClosing";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Galerie photos et vidéos",
  description:
    "Entraînements, matchs, stages et moments de vie : découvrez en photos et vidéos le quotidien des jeunes footballeurs d'AB Football Académie à Épinay-sur-Seine.",
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
