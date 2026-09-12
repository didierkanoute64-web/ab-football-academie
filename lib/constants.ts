export const SITE = {
  name: "AB Football Académie",
  baseline: "Le talent, c'est le travail !",
  slogan: "Discipline · Travail · Progression · Réussite",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ab-football.fr",
  description:
    "AB Football Académie accompagne les jeunes talents dans leur développement sportif et humain à Épinay-sur-Seine et en Île-de-France. Plus qu'un club, une famille, un état d'esprit et une aventure humaine.",
};

// Coordonnées validées (brief AB Football Académie) — ne pas modifier sans instruction.
export const CONTACT = {
  phone: "06 29 23 57 49",
  phoneHref: "tel:+33629235749",
  email: "contact@ab-football-academie.fr",
  address: "Stade municipal, Épinay-sur-Seine",
};

export const SOCIAL = [
  { name: "Instagram", href: "https://instagram.com/abfootballacademie" },
  { name: "WhatsApp", href: "https://wa.me/33629235749" },
  { name: "TikTok", href: "https://tiktok.com/@abfootballacademie" },
];

export const NAV_LINKS = [
  { label: "Accueil", href: "/" },
  { label: "Présentation", href: "/presentation" },
  { label: "Galerie", href: "/galerie" },
];

export const FOOTER_LEGAL_LINKS = [
  { label: "Mentions légales & CGU", href: "/mentions-legales" },
  { label: "Confidentialité & Cookies", href: "/confidentialite" },
];

export const STATS = [
  { value: 120, suffix: "", label: "Jeunes accompagnés" },
  { value: 4, suffix: "", label: "Éducateurs passionnés" },
  { value: 10, suffix: "", label: "Années d'expérience" },
];

export const SEO_KEYWORDS = [
  "AB Football Académie",
  "Académie Football Épinay-sur-Seine",
  "Formation football jeunes",
  "École football Île-de-France",
  "Football jeunesse",
];
