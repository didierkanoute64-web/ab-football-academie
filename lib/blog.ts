/**
 * Couche de données du blog — "données locales structurées" comme demandé,
 * prête à être branchée sur un CMS plus tard (Contentful, Sanity, etc.) :
 * il suffira de remplacer les fonctions ci-dessous par des appels API tout
 * en gardant le même type `BlogPost`.
 */

export type BlogCategory =
  | "Académie"
  | "Entraînement"
  | "Éducation"
  | "Conseils"
  | "Stages"
  | "Événements";

export const BLOG_CATEGORIES: BlogCategory[] = [
  "Académie",
  "Entraînement",
  "Éducation",
  "Conseils",
  "Stages",
  "Événements",
];

export type BlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "quote"; text: string; author?: string }
  | { type: "image"; label: string };

export interface BlogPost {
  slug: string;
  title: string;
  category: BlogCategory;
  date: string;
  excerpt: string;
  /** Décrit la photo de couverture attendue tant qu'aucun vrai fichier n'est fourni. */
  coverLabel: string;
  content: BlogBlock[];
  relatedSlugs?: string[];
  /**
   * Un brouillon est généré statiquement (pour prévisualisation du gabarit)
   * mais jamais listé publiquement, jamais dans le sitemap, et indexé en
   * `noindex` — voir getPublishedPosts().
   */
  draft?: boolean;
}

/**
 * Un seul article "exemple" pour valider le gabarit /blog/[slug].
 * À remplacer par de vrais articles avant publication — ne sert qu'à
 * vérifier que la mise en page fonctionne, n'est jamais affiché sur le
 * site public (voir getPublishedPosts()).
 */
export const posts: BlogPost[] = [
  {
    slug: "exemple-article",
    title: "Exemple d'article — à remplacer avant publication",
    category: "Académie",
    date: "À définir",
    excerpt:
      "Ceci est un article de démonstration destiné à valider la mise en page du gabarit. Remplacez ce contenu par un vrai article avant toute publication.",
    coverLabel: "Photo de couverture à venir",
    content: [
      {
        type: "paragraph",
        text: "Ce paragraphe d'introduction montre le rendu du corps de texte de l'article : taille, interlignage et largeur de lecture.",
      },
      { type: "heading", text: "Exemple d'intertitre" },
      {
        type: "paragraph",
        text: "Un second paragraphe illustre l'enchaînement du contenu après un intertitre, avec la même mise en page éditoriale que le reste du site.",
      },
      {
        type: "quote",
        text: "Une citation mise en avant peut apparaître ici, par exemple une parole d'éducateur ou de joueur.",
        author: "AB Football Académie",
      },
      { type: "image", label: "Image d'illustration à venir" },
      {
        type: "paragraph",
        text: "Le contenu peut continuer après une image, jusqu'à la conclusion de l'article.",
      },
    ],
    draft: true,
  },
];

/** Articles réellement publiés — c'est la seule liste utilisée par les pages publiques. */
export function getPublishedPosts(): BlogPost[] {
  return posts.filter((p) => !p.draft);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getRelatedPosts(post: BlogPost): BlogPost[] {
  if (!post.relatedSlugs?.length) return [];
  return post.relatedSlugs
    .map((slug) => getPostBySlug(slug))
    .filter((p): p is BlogPost => Boolean(p) && !p!.draft);
}
