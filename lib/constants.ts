export const SITE = {
  name: "AB Football Académie",
  baseline: "Le travail, c'est le talent !",
  slogan: "Discipline · Travail · Progression · Réussite",
  url:
    process.env.NEXT_PUBLIC_SITE_URL && process.env.NEXT_PUBLIC_SITE_URL.trim() !== ""
      ? process.env.NEXT_PUBLIC_SITE_URL
      : "https://ab-football.fr",
  description:
    "AB Football Académie accompagne les jeunes talents dans leur développement sportif et humain à Épinay-sur-Seine et en Île-de-France. Plus qu'un club, une famille, un état d'esprit et une aventure humaine.",
};

// Coordonnées validées (brief AB Football Académie) — ne pas modifier sans instruction.
export const CONTACT = {
  phone: "07 82 57 09 66",
  phoneHref: "tel:+33782570966",
  email: "abfootball.academie@gmail.com",
  address: "Stade municipal, Épinay-sur-Seine",
};

// Identifiants confirmés par l'académie le 25/09/2026 — ne pas modifier sans instruction.
export const SOCIAL = [
  { name: "Instagram", href: "https://www.instagram.com/ab_football_academie/" },
  { name: "WhatsApp", href: "https://wa.me/qr/HJLLH66GHAYKI1" },
  { name: "TikTok", href: "https://www.tiktok.com/@ab.football938" },
];

export const NAV_LINKS = [
  { label: "Accueil", href: "/" },
  { label: "Présentation", href: "/presentation" },
  { label: "Galerie", href: "/galerie" },
  { label: "Blog", href: "/blog" },
];

export const FOOTER_LEGAL_LINKS = [
  { label: "Mentions légales & CGU", href: "/mentions-legales" },
  { label: "Confidentialité & Cookies", href: "/confidentialite" },
];

export const STATS = [
  { value: 120, suffix: "", label: "Jeunes accompagnés" },
  { value: 6, suffix: "", label: "Éducateurs passionnés" },
  { value: 10, suffix: "", label: "Années d'expérience" },
];

export const SEO_KEYWORDS = [
  "AB Football Académie",
  "Académie Football Épinay-sur-Seine",
  "Formation football jeunes",
  "École football Île-de-France",
  "Football jeunesse",
];
