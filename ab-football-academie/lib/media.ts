/**
 * Registre central de tous les médias du site.
 *
 * OBJECTIF : ne jamais disperser de chemins d'images/vidéos dans les
 * composants. Chaque section importe sa clé depuis `media` plutôt que
 * d'écrire un chemin en dur.
 *
 * ÉTAT ACTUEL (Phase 4) : une première série de vraies photographies AB a
 * été intégrée (voir /public/images/{home,presentation,gallery}). Les
 * emplacements sans photo réelle correspondante restent à `null` et les
 * composants affichent alors un <PhotoPlaceholder /> de repli — notamment
 * les portraits individuels des éducateurs (identité de chaque personne non
 * confirmée) et certaines catégories de galerie (stages, matchs officiels,
 * événements) pour lesquelles aucune photo dédiée n'a encore été fournie.
 *
 * POUR AJOUTER UNE VRAIE PHOTO :
 * 1. Déposez le fichier optimisé dans /public/images/... (voir le README).
 * 2. Renseignez son chemin ci-dessous, ex. home.hero: "/images/home/hero.jpg".
 * 3. Le composant correspondant bascule automatiquement sur next/image dès
 *    qu'un chemin non-nul est présent (voir `components/home/Hero.tsx` pour
 *    un exemple du pattern à reproduire section par section).
 */

export interface MediaAsset {
  /** Chemin public (ex: "/images/home-hero.jpg") ou null si non fourni. */
  src: string | null;
  /** Texte alternatif obligatoire dès qu'un src est renseigné. */
  alt: string;
}

function asset(alt: string, src: string | null = null): MediaAsset {
  return { src, alt };
}

export const media = {
  brand: {
    crest: asset(
      "Écusson officiel AB Football Académie — Le talent, c'est le travail. Ambition du ballon.",
      "/images/brand/logo-crest.png"
    ),
  },
  home: {
    hero: asset(
      "Un éducateur AB Football Académie, en veste orange, donne des consignes sur le terrain",
      "/images/home/hero.jpg"
    ),
    coach: asset(
      "Portrait du coach principal AB Football Académie, veste orange, sur le terrain",
      "/images/home/coach-ab-football.jpg"
    ),
    family: asset(
      "Un éducateur AB Football Académie aux côtés d'un jeune joueur, terrain d'entraînement",
      "/images/home/family.jpg"
    ),
    immersionVideo: asset("Séquence immersion AB Football Académie", null),
    immersionPoster: asset(
      "Jeunes joueurs AB Football Académie en opposition lors d'un exercice à l'entraînement",
      "/images/home/immersion-poster.jpg"
    ),
    ctaFinal: asset(
      "Le groupe de jeunes et leur éducateur réunis près du but, à l'entraînement AB Football Académie",
      "/images/home/cta-final.jpg"
    ),
  },
  presentation: {
    hero: asset(
      "Duel pour le ballon entre deux jeunes joueurs AB Football Académie, terrain synthétique",
      "/images/presentation/hero.jpg"
    ),
    philosophy: asset(
      "Travail de coordination à l'échelle de rythme, entraînement AB Football Académie",
      "/images/presentation/philosophy.jpg"
    ),
    values: asset("Texture / ambiance terrain AB Football Académie, fond vert profond", null),
    method: {
      formationSportive: asset("Travail technique au ballon, AB Football Académie"),
      education: asset("Coach expliquant une tactique au tableau, AB Football Académie"),
      epanouissement: asset("Groupe de joueurs mains jointes, AB Football Académie"),
    },
    coaches: [
      asset("Portrait coach principal AB Football Académie"),
      asset("Portrait coach adjoint — accompagnement sportif"),
      asset("Portrait coach adjoint — préparation des séances"),
      asset("Portrait coach adjoint — encadrement des jeunes"),
    ],
    manifesto: asset(
      "Un éducateur AB Football Académie, concentré pendant une séance",
      "/images/presentation/manifesto.jpg"
    ),
  },
  gallery: {
    hero: asset(
      "Un éducateur AB Football Académie donne des consignes, plots à la main, sur le terrain",
      "/images/gallery/hero.jpg"
    ),
  },
};

/** True si un vrai média a été renseigné pour cet asset. */
export function hasMedia(a: MediaAsset): a is MediaAsset & { src: string } {
  return typeof a.src === "string" && a.src.length > 0;
}

// ---------------------------------------------------------------------------
// Galerie — structure typée dédiée (photos + vidéos)
// ---------------------------------------------------------------------------

export type GalleryCategory =
  | "training"
  | "matches"
  | "stages"
  | "events"
  | "academy-life";

export const GALLERY_CATEGORY_LABELS: Record<GalleryCategory, string> = {
  training: "Entraînements",
  matches: "Matchs",
  stages: "Stages",
  events: "Événements",
  "academy-life": "Vie de l'académie",
};

/**
 * Ratio éditorial utilisé pour la composition de la grille asymétrique.
 * Piloté à la main (plutôt que calculé depuis width/height) tant que les
 * vraies photos ne sont pas connues — voir GalleryGrid pour le mapping
 * vers les classes de grille.
 */
export type GalleryRatio = "portrait" | "landscape" | "wide" | "vertical" | "panoramic";

interface GalleryPhotoItem {
  id: string;
  type: "image";
  src: string | null;
  category: GalleryCategory;
  title: string;
  date: string;
  alt: string;
  width: number;
  height: number;
  ratio: GalleryRatio;
}

interface GalleryVideoItem {
  id: string;
  type: "video";
  src: string | null;
  poster: string | null;
  category: GalleryCategory;
  title: string;
  date: string;
  alt: string;
  width: number;
  height: number;
  duration: string;
}

export type GalleryItem = GalleryPhotoItem | GalleryVideoItem;

function photo(
  id: string,
  category: GalleryCategory,
  title: string,
  date: string,
  ratio: GalleryRatio,
  alt: string,
  src: string | null = null
): GalleryPhotoItem {
  const dims: Record<GalleryRatio, [number, number]> = {
    portrait: [900, 1200],
    landscape: [1600, 1000],
    wide: [1920, 960],
    vertical: [800, 1400],
    panoramic: [2000, 800],
  };
  const [width, height] = dims[ratio];
  return { id, type: "image", src, category, title, date, alt, width, height, ratio };
}

function video(
  id: string,
  category: GalleryCategory,
  title: string,
  date: string,
  duration: string,
  alt: string
): GalleryVideoItem {
  return {
    id,
    type: "video",
    src: null,
    poster: null,
    category,
    title,
    date,
    alt,
    width: 1600,
    height: 900,
    duration,
  };
}

export const gallery: GalleryItem[] = [
  photo("g01", "training", "Opposition à l'entraînement", "Saison 2024-2025", "wide", "Jeunes joueurs AB Football Académie en opposition 4 contre 4 pendant une séance d'entraînement", "/images/gallery/g01.jpg"),
  photo("g02", "training", "Dribble entre les plots", "Saison 2024-2025", "portrait", "Jeune joueur de l'académie en dribble entre des plots à l'entraînement", "/images/gallery/g02.jpg"),
  photo("g03", "training", "Échange avec l'éducateur", "Saison 2024-2025", "landscape", "Un éducateur AB Football Académie échange avec deux jeunes joueurs sur le terrain", "/images/gallery/g03.jpg"),
  photo("g04", "training", "Concentration avant l'exercice", "Saison 2024-2025", "portrait", "Jeune joueur AB Football Académie, capuche relevée, ballon au pied", "/images/gallery/g04.jpg"),
  photo("g05", "training", "Échauffement collectif", "Saison 2024-2025", "landscape", "Groupe de jeunes joueurs AB Football Académie en sprint pendant l'échauffement", "/images/gallery/g05.jpg"),
  photo("g06", "academy-life", "Concentration", "Saison 2024-2025", "vertical", "Un éducateur AB Football Académie très investi pendant la séance", "/images/gallery/g06.jpg"),
  photo("g07", "training", "Contrôle de balle", "Saison 2024-2025", "portrait", "Jeune joueur AB Football Académie en contrôle de balle à l'entraînement", "/images/gallery/g07.jpg"),
  photo("g08", "training", "Duel pour le ballon", "Saison 2024-2025", "landscape", "Duel pour le ballon pendant un exercice d'opposition, AB Football Académie", "/images/gallery/g08.jpg"),
  photo("g09", "training", "Course balle au pied", "Saison 2024-2025", "portrait", "Jeune joueur AB Football Académie courant balle au pied en fin de journée", "/images/gallery/g09.jpg"),
  photo("g10", "training", "Échelle de rythme", "Saison 2024-2025", "portrait", "Travail de coordination à l'échelle de rythme, entraînement AB Football Académie", "/images/gallery/g10.jpg"),
  photo("g11", "academy-life", "Briefing près du but", "Saison 2024-2025", "wide", "Le groupe de jeunes réuni autour de leur éducateur près du but, AB Football Académie", "/images/gallery/g11.jpg"),
  photo("g12", "academy-life", "Retour au vestiaire", "25 janvier 2025", "landscape", "Groupe de joueurs au retour au vestiaire, ambiance soudée"),
];

export const galleryVideos: GalleryVideoItem[] = [
  video("v01", "training", "Séance d'entraînement", "12 avril 2025", "01:24", "Vidéo d'une séance d'entraînement AB Football Académie"),
  video("v02", "training", "Travail technique", "5 avril 2025", "00:56", "Vidéo de travail technique individuel"),
  video("v03", "academy-life", "Ambiance au club", "28 mars 2025", "02:15", "Vidéo d'ambiance à l'académie"),
  video("v04", "matches", "Match amical", "15 mars 2025", "01:37", "Vidéo d'un match amical AB Football Académie"),
  video("v05", "academy-life", "Les coulisses", "8 mars 2025", "01:10", "Vidéo des coulisses de l'académie"),
];
