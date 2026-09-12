import { Mail, MapPin, Phone } from "lucide-react";
import { ContactDrawerButton } from "@/components/contact/ContactDrawerButton";
import { CONTACT } from "@/lib/constants";

interface LegalContactClosingProps {
  eyebrow: string;
  title: string;
}

export function LegalContactClosing({ eyebrow, title }: LegalContactClosingProps) {
  return (
    <section className="border-t border-ab-black/10 bg-ab-green py-20">
      <div className="container-ab max-w-3xl text-center">
        <p className="eyebrow mb-4 text-ab-orange">{eyebrow}</p>
        <h2 className="text-display text-4xl leading-[0.95] text-ab-cream sm:text-5xl">
          {title}
        </h2>

        <ul className="mt-8 flex flex-col items-center gap-3 font-body text-sm text-ab-cream/80 sm:flex-row sm:justify-center sm:gap-8">
          <li className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-ab-orange" />
            <a href={CONTACT.phoneHref} className="hover:text-ab-orange">
              {CONTACT.phone}
            </a>
          </li>
          <li className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-ab-orange" />
            <a href={`mailto:${CONTACT.email}`} className="hover:text-ab-orange">
              {CONTACT.email}
            </a>
          </li>
          <li className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-ab-orange" />
            {CONTACT.address}
          </li>
        </ul>

        <ContactDrawerButton size="lg" magneticClassName="mt-8">
          Nous contacter
        </ContactDrawerButton>
      </div>
    </section>
  );
}
