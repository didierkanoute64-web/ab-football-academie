import type { Metadata } from "next";
import {
  Building2,
  Server,
  Laptop,
  Copyright,
  ImageIcon,
  ShieldCheck,
  Lock,
  ExternalLink,
  FileText,
  Gavel,
  Mail,
} from "lucide-react";
import { LegalLayout, type LegalSection } from "@/components/legal/LegalLayout";
import { LegalContactClosing } from "@/components/legal/LegalContactClosing";
import { CONTACT, SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Mentions légales & CGU",
  description:
    "Informations légales relatives à l'éditeur du site AB Football Académie et conditions générales d'utilisation.",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: true, follow: true },
  openGraph: { url: `${SITE.url}/mentions-legales` },
};

const sections: LegalSection[] = [
  {
    id: "editeur",
    icon: <Building2 className="h-5 w-5" strokeWidth={1.5} />,
    title: "Éditeur du site",
    content: (
      <ul className="space-y-1.5">
        <li><strong>Nom / structure :</strong> {SITE.name} — [À COMPLÉTER]</li>
        <li><strong>Forme juridique :</strong> [À COMPLÉTER]</li>
        <li><strong>Siège social :</strong> [À COMPLÉTER]</li>
        <li><strong>Responsable / directeur de publication :</strong> [À COMPLÉTER]</li>
        <li><strong>Téléphone :</strong> <a className="text-ab-orange" href={CONTACT.phoneHref}>{CONTACT.phone}</a></li>
        <li><strong>Email :</strong> <a className="text-ab-orange" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></li>
        <li><strong>Site :</strong> <a className="text-ab-orange" href={SITE.url}>{SITE.url}</a></li>
      </ul>
    ),
  },
  {
    id: "hebergement",
    icon: <Server className="h-5 w-5" strokeWidth={1.5} />,
    title: "Hébergement",
    content: (
      <ul className="space-y-1.5">
        <li><strong>Hébergeur :</strong> [À COMPLÉTER]</li>
        <li><strong>Raison sociale :</strong> [À COMPLÉTER]</li>
        <li><strong>Adresse :</strong> [À COMPLÉTER]</li>
        <li><strong>Site :</strong> [À COMPLÉTER]</li>
      </ul>
    ),
  },
  {
    id: "acces",
    icon: <Laptop className="h-5 w-5" strokeWidth={1.5} />,
    title: "Accès et utilisation",
    content: (
      <p>
        Le site {SITE.name} a notamment pour objet de présenter
        l&apos;académie, son projet, ses activités, ses éducateurs, ses
        contenus, ses photos et vidéos, ainsi que ses moyens de contact.
        L&apos;utilisateur s&apos;engage à utiliser le site de manière licite
        et à ne pas tenter d&apos;en perturber le fonctionnement.
      </p>
    ),
  },
  {
    id: "propriete",
    icon: <Copyright className="h-5 w-5" strokeWidth={1.5} />,
    title: "Propriété intellectuelle",
    content: (
      <p>
        Le nom, l&apos;identité visuelle, le logo, les textes, les
        photographies, les vidéos, les éléments graphiques ainsi que le
        design du site et ses contenus éditoriaux sont protégés. Leur
        reproduction ou exploitation, totale ou partielle, peut nécessiter
        une autorisation préalable.
      </p>
    ),
  },
  {
    id: "droit-image",
    icon: <ImageIcon className="h-5 w-5" strokeWidth={1.5} />,
    title: "Photos, vidéos & droit à l'image",
    content: (
      <>
        <p>
          {SITE.name} accueille notamment des mineurs. Les photographies et
          vidéos diffusées sur le site doivent l&apos;être dans le respect
          des droits applicables, avec une vigilance particulière portée aux
          contenus représentant des mineurs. Les autorisations nécessaires
          sont recueillies lorsque cela est requis.
        </p>
        <div className="mt-4 rounded-xl bg-ab-green/5 p-4">
          <p className="font-body text-xs font-semibold uppercase tracking-wide text-ab-green">
            Une question concernant une image ?
          </p>
          <p className="mt-1">
            <a className="text-ab-orange" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          </p>
        </div>
      </>
    ),
  },
  {
    id: "responsabilite",
    icon: <ShieldCheck className="h-5 w-5" strokeWidth={1.5} />,
    title: "Responsabilité",
    content: (
      <p>
        {SITE.name} s&apos;efforce de maintenir des informations exactes et
        actualisées sur le site. L&apos;académie ne peut toutefois garantir
        l&apos;absence totale d&apos;erreurs ou d&apos;omissions.
      </p>
    ),
  },
  {
    id: "securite",
    icon: <Lock className="h-5 w-5" strokeWidth={1.5} />,
    title: "Sécurité & disponibilité",
    content: (
      <p>
        Des mesures adaptées peuvent être mises en œuvre pour protéger le
        site. L&apos;accès peut néanmoins être interrompu, notamment en cas
        de maintenance, de mise à jour, d&apos;incident technique ou
        d&apos;indisponibilité d&apos;un service tiers.
      </p>
    ),
  },
  {
    id: "liens-externes",
    icon: <ExternalLink className="h-5 w-5" strokeWidth={1.5} />,
    title: "Liens externes",
    content: (
      <p>
        Le site peut contenir des liens vers des réseaux sociaux, lecteurs
        vidéo ou autres services tiers. {SITE.name} n&apos;exerce pas de
        contrôle sur ces services externes et ne saurait être responsable de
        leur contenu.
      </p>
    ),
  },
  {
    id: "evolution",
    icon: <FileText className="h-5 w-5" strokeWidth={1.5} />,
    title: "Modification des CGU",
    content: (
      <p>
        Le présent contenu peut évoluer avec le site ou le cadre applicable.
        Dernière mise à jour : [DATE].
      </p>
    ),
  },
  {
    id: "droit-applicable",
    icon: <Gavel className="h-5 w-5" strokeWidth={1.5} />,
    title: "Droit applicable",
    content: <p>Droit français.</p>,
  },
  {
    id: "contact",
    icon: <Mail className="h-5 w-5" strokeWidth={1.5} />,
    title: "Contact",
    content: (
      <p>
        Pour toute question relative aux présentes mentions légales :{" "}
        <a className="text-ab-orange" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>{" "}
        ou <a className="text-ab-orange" href={CONTACT.phoneHref}>{CONTACT.phone}</a>.
      </p>
    ),
  },
];

export default function MentionsLegalesPage() {
  return (
    <LegalLayout
      eyebrow="Informations juridiques"
      title="Mentions légales & CGU"
      description="Retrouvez les informations relatives à l'éditeur du site ainsi que les conditions encadrant son utilisation."
      lastUpdate="[DATE]"
      sections={sections}
      closing={
        <LegalContactClosing eyebrow="Une question ?" title="Contactez l'académie." />
      }
    />
  );
}
