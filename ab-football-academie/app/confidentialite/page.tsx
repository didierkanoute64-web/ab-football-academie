import type { Metadata } from "next";
import {
  UserCircle,
  Database,
  Target,
  Scale,
  Clock,
  Users2,
  ShieldAlert,
  Lock,
  Cookie,
  Share2,
  ShieldCheck,
  Mail,
} from "lucide-react";
import { LegalLayout, type LegalSection } from "@/components/legal/LegalLayout";
import { LegalContactClosing } from "@/components/legal/LegalContactClosing";
import { CONTACT, SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Confidentialité & Cookies",
  description:
    "Politique de confidentialité d'AB Football Académie : données collectées, finalités, durées de conservation, droits et gestion des cookies.",
  alternates: { canonical: "/confidentialite" },
  robots: { index: true, follow: true },
  openGraph: { url: `${SITE.url}/confidentialite` },
};

function Table({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-ab-black/10">
      <table className="w-full min-w-[480px] border-collapse text-left">
        <thead>
          <tr className="border-b border-ab-black/10 bg-ab-black/[0.02]">
            {head.map((h) => (
              <th key={h} className="px-4 py-3 font-body text-xs font-semibold uppercase tracking-wide text-ab-black/60">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-ab-black/5 last:border-0">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 align-top font-body text-sm text-ab-black/70">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const sections: LegalSection[] = [
  {
    id: "responsable",
    icon: <UserCircle className="h-5 w-5" strokeWidth={1.5} />,
    title: "Responsable du traitement",
    content: (
      <ul className="space-y-1.5">
        <li><strong>Responsable :</strong> [À COMPLÉTER]</li>
        <li><strong>Email :</strong> <a className="text-ab-orange" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></li>
        <li><strong>Téléphone :</strong> <a className="text-ab-orange" href={CONTACT.phoneHref}>{CONTACT.phone}</a></li>
        <li><strong>Adresse juridique :</strong> [À COMPLÉTER]</li>
      </ul>
    ),
  },
  {
    id: "donnees-collectees",
    icon: <Database className="h-5 w-5" strokeWidth={1.5} />,
    title: "Données collectées",
    content: (
      <>
        <p>
          Seules les fonctionnalités réellement présentes sur le site
          collectent des données :
        </p>
        <div className="mt-3 space-y-3">
          <div>
            <p className="font-body text-xs font-semibold uppercase tracking-wide text-ab-green">Contact</p>
            <p>Nom, prénom, email, téléphone, message — via le formulaire de contact (ContactDrawer).</p>
          </div>
          <div>
            <p className="font-body text-xs font-semibold uppercase tracking-wide text-ab-green">Contenus transmis</p>
            <p>Photos ou vidéos que vous transmettez volontairement à l&apos;académie pour publication éventuelle dans la galerie.</p>
          </div>
        </div>
        <p className="mt-3 text-xs text-ab-black/50">
          Aucune donnée technique (analytics, pixel, cookie de mesure
          d&apos;audience) n&apos;est actuellement collectée par le site — voir
          la section « Cookies & traceurs ».
        </p>
      </>
    ),
  },
  {
    id: "finalites",
    icon: <Target className="h-5 w-5" strokeWidth={1.5} />,
    title: "Finalités",
    content: (
      <ul className="space-y-1.5">
        <li><strong>Répondre</strong> aux demandes transmises via le formulaire de contact.</li>
        <li><strong>Accompagner</strong> les familles intéressées par l&apos;académie.</li>
        <li><strong>Gérer</strong> les échanges avec l&apos;académie, y compris les contenus transmis pour la galerie.</li>
      </ul>
    ),
  },
  {
    id: "bases-legales",
    icon: <Scale className="h-5 w-5" strokeWidth={1.5} />,
    title: "Bases légales",
    content: (
      <Table
        head={["Traitement", "Finalité", "Base légale"]}
        rows={[
          ["Formulaire de contact", "Répondre à une demande", "[À CONFIRMER]"],
          ["Contenus transmis (photos/vidéos)", "Publication éventuelle en galerie", "[À CONFIRMER]"],
        ]}
      />
    ),
  },
  {
    id: "duree",
    icon: <Clock className="h-5 w-5" strokeWidth={1.5} />,
    title: "Durées de conservation",
    content: (
      <Table
        head={["Donnée", "Finalité", "Durée", "Base"]}
        rows={[
          ["Formulaire de contact", "Traitement de la demande", "[À DÉFINIR]", "[À CONFIRMER]"],
          ["Contenus transmis", "Publication en galerie", "[À DÉFINIR]", "[À CONFIRMER]"],
        ]}
      />
    ),
  },
  {
    id: "destinataires",
    icon: <Users2 className="h-5 w-5" strokeWidth={1.5} />,
    title: "Destinataires",
    content: (
      <p>
        Les données du formulaire de contact sont transmises via{" "}
        <strong>Formspree</strong> (prestataire technique du formulaire) puis
        traitées par les membres habilités d&apos;{SITE.name}. Le site est
        hébergé par [À COMPLÉTER]. Aucun autre prestataire (analytics,
        publicité, CRM) n&apos;est actuellement utilisé.
      </p>
    ),
  },
  {
    id: "mineurs",
    icon: <ShieldAlert className="h-5 w-5" strokeWidth={1.5} />,
    title: "Mineurs & représentants légaux",
    content: (
      <>
        <p className="font-display text-lg tracking-wide text-ab-green">
          Protéger les jeunes, aussi en ligne.
        </p>
        <p className="mt-2">
          {SITE.name} accueillant majoritairement des mineurs, une vigilance
          renforcée est apportée aux données et contenus les concernant
          (données personnelles, photographies, vidéos). Les représentants
          légaux peuvent exercer les droits décrits ci-dessous au nom de leur
          enfant. La présente politique ne constitue pas, en elle-même, une
          autorisation de droit à l&apos;image : celle-ci est recueillie
          séparément lorsque nécessaire.
        </p>
      </>
    ),
  },
  {
    id: "droits",
    icon: <Lock className="h-5 w-5" strokeWidth={1.5} />,
    title: "Vos droits",
    content: (
      <>
        <p>
          Vous disposez d&apos;un droit d&apos;accès, de rectification,
          d&apos;effacement, d&apos;opposition, de limitation et, lorsque
          applicable, de portabilité de vos données.
        </p>
        <p className="mt-2">
          Pour exercer ces droits :{" "}
          <a className="text-ab-orange" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
          Vous pouvez également saisir l&apos;autorité de contrôle compétente
          lorsque cela est applicable.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    icon: <Cookie className="h-5 w-5" strokeWidth={1.5} />,
    title: "Cookies & traceurs",
    content: (
      <>
        <p>
          Le site dépose uniquement, à ce jour, des cookies{" "}
          <strong>strictement nécessaires</strong> à son fonctionnement :
          mémorisation de votre choix de consentement et de l&apos;affichage
          initial du site. Aucun cookie de mesure d&apos;audience, publicitaire
          ou de réseau social n&apos;est actuellement déposé.
        </p>
        <p className="mt-2">
          Le gestionnaire de préférences (bouton « Gérer mes cookies » en bas
          de chaque page) reste disponible pour anticiper vos choix si de
          tels services venaient à être ajoutés.
        </p>
      </>
    ),
  },
  {
    id: "services-tiers",
    icon: <Share2 className="h-5 w-5" strokeWidth={1.5} />,
    title: "Services tiers",
    content: (
      <Table
        head={["Service", "Usage", "Données", "Consentement"]}
        rows={[
          ["Formspree", "Envoi du formulaire de contact", "Nom, email, téléphone, message", "Nécessaire au service demandé"],
        ]}
      />
    ),
  },
  {
    id: "securite",
    icon: <ShieldCheck className="h-5 w-5" strokeWidth={1.5} />,
    title: "Sécurité",
    content: (
      <p>
        Des mesures générales adaptées sont mises en œuvre pour protéger vos
        données. Aucun détail technique sensible n&apos;est communiqué
        publiquement.
      </p>
    ),
  },
  {
    id: "contact-reclamation",
    icon: <Mail className="h-5 w-5" strokeWidth={1.5} />,
    title: "Contact & réclamation",
    content: (
      <p>
        Pour toute question ou réclamation relative à vos données :{" "}
        <a className="text-ab-orange" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
      </p>
    ),
  },
];

export default function ConfidentialitePage() {
  return (
    <LegalLayout
      eyebrow="Vos données, vos droits"
      title="Confidentialité & Cookies"
      description={`${SITE.name} accorde une attention particulière à la protection de vos données personnelles et à la transparence concernant leur utilisation.`}
      lastUpdate="[DATE]"
      sections={sections}
      closing={
        <LegalContactClosing
          eyebrow="Vie privée & données personnelles"
          title="Une question ?"
        />
      }
    />
  );
}
