# AB Football Académie — Site officiel

Site vitrine premium pour AB Football Académie, construit avec Next.js 15
(App Router), TypeScript, Tailwind CSS, Framer Motion, GSAP et Lenis Scroll.

## ✨ Stack technique

- **Next.js 15** (App Router, React 19)
- **TypeScript**
- **Tailwind CSS** (config sur-mesure : palette AB, typographies, container)
- **Framer Motion** — text reveal, image reveal, transitions, stagger
- **GSAP** (+ ScrollTrigger, prêt à l'emploi via `lib/gsap.ts`)
- **Lenis** — smooth scroll, synchronisé avec GSAP ScrollTrigger
- **Composants type shadcn/ui** (`Button`, `Input`, `Textarea`, `Label`) —
  écrits à la main dans `components/ui`, sans dépendance à une CLI externe
- **lucide-react** pour l'iconographie
- **Formspree** pour le formulaire de contact
- SEO complet : metadata, Open Graph, `sitemap.xml`, `robots.txt`, JSON-LD

## 🚀 Démarrage rapide

```bash
npm install
cp .env.example .env.local   # puis renseigner vos variables
npm run dev
```

Le site est disponible sur http://localhost:3000.

### Variables d'environnement (`.env.local`)

```
NEXT_PUBLIC_FORMSPREE_ID=xxxxxxxx   # identifiant de votre formulaire Formspree
NEXT_PUBLIC_SITE_URL=https://ab-football.fr
```

Pour Formspree : créez un formulaire sur https://formspree.io, récupérez
l'identifiant dans l'URL `https://formspree.io/f/xxxxxxxx` et renseignez-le
dans `NEXT_PUBLIC_FORMSPREE_ID`.

## 🗂️ Structure du projet

```
app/
  layout.tsx              Layout racine (fonts, SEO, JSON-LD, header/footer)
  page.tsx                Accueil
  academie/page.tsx        Page "L'Académie"
  galerie/page.tsx          Page "Galerie"
  contact/page.tsx          Page "Contact"
  mentions-legales/page.tsx Mentions légales & CGU
  confidentialite/page.tsx  Confidentialité & Cookies (RGPD)
  sitemap.ts / robots.ts    SEO technique
  icon.svg                  Favicon (monogramme AB)

components/
  layout/     Header, Footer, PageHero, CookieBanner, SmoothScrollProvider
  ui/         Button, Input/Textarea/Label, PhotoPlaceholder (composants "shadcn-style")
  animations/ TextReveal, RevealOnScroll, ImageReveal, Counter
  home/       Sections de la page d'accueil
  academie/   Sections de la page Académie
  galerie/    Filtres, masonry grid, lightbox, vidéos
  contact/    Formulaire, coordonnées, carte
  legal/      Layout des pages juridiques (sommaire sticky)

lib/
  constants.ts  Coordonnées, réseaux sociaux, navigation, SEO
  utils.ts      Helper `cn()` (clsx + tailwind-merge)
  gsap.ts       Enregistrement des plugins GSAP
```

## 🖼️ Assets à fournir avant mise en ligne

**Toutes les photos et vidéos du site sont pour l'instant des
`PhotoPlaceholder`** (blocs avec dégradé et légende) — aucune photo
libre de droits n'a été utilisée, pour éviter tout problème de droit à
l'image, en particulier sur les mineurs.

Remplacez chaque `<PhotoPlaceholder label="..." />` par un vrai
`next/image` (ou `<video>` pour les placeholders `video`) une fois vos
médias disponibles. La légende de chaque placeholder indique précisément
le type de photo attendu (ex. "Photo hero — jeune joueur en action, plein
écran").

Prévoir notamment :
- 1 photo hero plein écran (page d'accueil)
- 1 vidéo de fond plein écran (section immersion)
- Portraits des 4 éducateurs
- Photos d'entraînement, matchs, stages, événements, vie de club (galerie)
- 1 photo collective (CTA final)
- Logo du club en SVG/PNG (actuellement un monogramme "AB" généré en CSS)
- Une image Open Graph 1200×630 à placer dans `public/og-image.jpg`

## ⚖️ À compléter avant publication

Les pages `mentions-legales` et `confidentialite` contiennent des
informations juridiques rédigées à partir du brief fourni, mais certains
champs restent à confirmer avec votre structure (forme juridique, adresse
du siège, hébergeur définitif, etc.) — repérables par `[à renseigner]`
dans `app/mentions-legales/page.tsx`. Les coordonnées par défaut dans
`lib/constants.ts` (téléphone, e-mail, adresse) sont également des
valeurs d'exemple à remplacer.

Il est recommandé de faire relire les pages juridiques par un
professionnel avant mise en ligne.

## 🎬 Animations

- **Lenis** assure un smooth scroll global (`components/layout/SmoothScrollProvider.tsx`) réglé pour une sensation lourde et cinématique (durée 1.35s, easing exponentiel, `syncTouch` activé pour un rendu cohérent desktop/mobile) — désactivé automatiquement si l'utilisateur a activé "réduire les animations".
- **GsapTextReveal** (`components/animations/GsapTextReveal.tsx`) est une implémentation maison façon "SplitText" (sans le plugin payant GSAP Club) : chaque titre important est découpé en mots, masqués, puis révélés un par un au scroll avec une montée douce + flou + fondu — sans rotation ni rebond, pour un rendu "luxe" et jamais brutal. Tous les titres principaux du site (Hero, sections Académie, Galerie, Contact, pages légales, 404…) l'utilisent.
- **ManifestoScroll** (`components/home/ManifestoScroll.tsx`) est une section **pinnée** façon Awwwards : le scroll est "capturé" pendant 4 écrans et fait défiler 4 mots-clés (Discipline / Travail / Progression / Réussite) avec un fond qui change en fondu.
- **Parallax** : la plupart des grandes photos (Hero, PageHero, sections Immersion/CTA/Famille/Coach) bougent à une vitesse différente du scroll via `framer-motion useScroll/useTransform`.
- **Curseur magnétique custom** (`components/ui/custom-cursor.tsx`, desktop uniquement) : anneau + point qui suivent la souris via `gsap.quickTo` et s'agrandissent au survol des liens/boutons.
- **Boutons magnétiques** (`components/ui/magnetic.tsx`) : les CTA principaux sont légèrement attirés vers le curseur au survol.
- **Grain cinématique** (`components/ui/grain-overlay.tsx`) : texture de bruit SVG animée en overlay `mix-blend-overlay`, très subtile, désactivée si `prefers-reduced-motion`.
- **Diagonales façon Nike/Adidas** (`.clip-diagonal-up/down/both` dans `globals.css`) : séparations obliques entre certaines sections plutôt que des lignes droites.
- **Vignette cinématique** (`.vignette`) appliquée sur les grandes photos/vidéos plein écran.
- **ImageReveal / RevealOnScroll / StaggerGroup** gèrent les rideaux d'image et les apparitions fade + blur + translate.
- **Counter** anime les chiffres clés (120 jeunes, 4 éducateurs, 10 ans).
- Le header est une vraie **navbar glass** : dégradé transparent en haut de page, effet verre (`backdrop-blur-xl`) au scroll.
- **Loader d'intro** (`components/layout/Loader.tsx`) : écran de chargement animé au tout premier chargement de session, désactivé ensuite (`sessionStorage`) et si `prefers-reduced-motion`.
- `lib/gsap.ts` enregistre `ScrollTrigger` une seule fois et est prêt pour toute animation GSAP additionnelle.

Toutes les animations GSAP utilisent `gsap.context()` + cleanup au démontage pour rester compatibles avec la navigation client de Next.js (App Router) sans fuite mémoire ni doublons de `ScrollTrigger`.



## 🚢 Déploiement sur Vercel

1. Poussez ce projet sur un dépôt Git (GitHub/GitLab/Bitbucket).
2. Sur [vercel.com](https://vercel.com), cliquez sur **Add New → Project** et importez le dépôt.
3. Renseignez les variables d'environnement (`NEXT_PUBLIC_FORMSPREE_ID`, `NEXT_PUBLIC_SITE_URL`) dans **Settings → Environment Variables**.
4. Lancez le déploiement — Vercel détecte automatiquement Next.js (aucune configuration supplémentaire nécessaire).
5. Une fois le nom de domaine définitif connu, mettez à jour `NEXT_PUBLIC_SITE_URL` et redéployez pour que le `sitemap.xml`, les URLs canoniques et les métadonnées Open Graph soient corrects.

### Alternative en ligne de commande

```bash
npm i -g vercel
vercel        # déploiement de preview
vercel --prod # déploiement en production
```

## ✅ Qualité & performance

- Composants responsive (mobile / tablette / desktop) sur toutes les pages.
- Focus visible au clavier, respect de `prefers-reduced-motion`.
- Métadonnées SEO complètes par page (title, description, canonical, Open Graph, Twitter Card).
- `sitemap.xml` et `robots.txt` générés dynamiquement.
- Schema.org (`SportsActivityLocation`) injecté dans le layout racine.
- Une fois les vraies photos/vidéos optimisées ajoutées (formats WebP/AVIF, dimensions adaptées), le site est prêt pour un score Lighthouse > 95.

## 🍪 Cookies & RGPD

Le bandeau cookies (`components/layout/CookieBanner.tsx`) propose "Tout
refuser", "Personnaliser" et "Tout accepter", stocke le consentement en
`localStorage`, et peut être rouvert à tout moment via le lien "Gérer mes
cookies" dans le footer. Aucun cookie non essentiel n'est déposé avant
consentement explicite.
