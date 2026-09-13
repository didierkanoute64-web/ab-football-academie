"use client";

import Link from "next/link";
import { Instagram, MessageCircle, Music2, MapPin, Mail, Phone, Settings } from "lucide-react";
import { CONTACT, FOOTER_LEGAL_LINKS, NAV_LINKS, SITE, SOCIAL } from "@/lib/constants";
import { useContactDrawer } from "@/components/contact/ContactDrawerProvider";

const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Instagram,
  WhatsApp: MessageCircle,
  TikTok: Music2,
};

export function Footer() {
  const { open: openContactDrawer } = useContactDrawer();

  return (
    <footer className="bg-ab-green text-ab-cream">
      <div className="container-ab grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:py-20">
        <div>
          <p className="font-display text-2xl tracking-wide">
            AB Football <span className="text-ab-orange">Académie</span>
          </p>
          <p className="mt-3 font-body text-sm italic text-ab-cream/70">
            {SITE.baseline}
          </p>
        </div>

        <div>
          <p className="eyebrow mb-5 text-ab-cream/50">Navigation</p>
          <ul className="space-y-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-body text-sm text-ab-cream/80 transition-colors hover:text-ab-orange"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={openContactDrawer}
                className="font-body text-sm text-ab-cream/80 transition-colors hover:text-ab-orange"
              >
                Contact
              </button>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-5 text-ab-cream/50">Coordonnées</p>
          <ul className="space-y-3 font-body text-sm text-ab-cream/80">
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-ab-orange" />
              <a href={CONTACT.phoneHref} className="hover:text-ab-orange">
                {CONTACT.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-ab-orange" />
              <a href={`mailto:${CONTACT.email}`} className="hover:text-ab-orange">
                {CONTACT.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-ab-orange" />
              <span>{CONTACT.address}</span>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-5 text-ab-cream/50">Suivez-nous</p>
          <div className="flex gap-3">
            {SOCIAL.map((s) => {
              const Icon = socialIcons[s.name] ?? Instagram;
              return (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-ab-cream/25 transition-colors duration-300 hover:border-ab-orange hover:bg-ab-orange"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
          <p className="mt-6 font-display text-xl tracking-wide text-ab-cream/90">
            Ensemble, <span className="text-ab-orange">allons plus loin.</span>
          </p>
        </div>
      </div>

      <div className="border-t border-ab-cream/10">
        <div className="container-ab flex flex-col items-center justify-between gap-4 py-6 text-xs text-ab-cream/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {SITE.name}. Tous droits réservés.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {FOOTER_LEGAL_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-ab-orange">
                {link.label}
              </Link>
            ))}
            <button
              onClick={() =>
                window.dispatchEvent(new CustomEvent("ab-open-cookie-settings"))
              }
              className="-my-2 flex items-center gap-1.5 py-2 hover:text-ab-orange"
            >
              <Settings className="h-3.5 w-3.5" />
              Gérer mes cookies
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
