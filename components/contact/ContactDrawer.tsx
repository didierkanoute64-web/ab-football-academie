"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, MapPin, Phone, X } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { CONTACT } from "@/lib/constants";
import { getLenisInstance } from "@/lib/lenis-singleton";

interface ContactDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.MutableRefObject<HTMLElement | null>;
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export function ContactDrawer({ isOpen, onClose, triggerRef }: ContactDrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Body scroll lock + pause Lenis while the drawer is open, restore on close.
  useEffect(() => {
    if (!isOpen) return;

    const lenis = getLenisInstance();
    lenis?.stop();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      lenis?.start();
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  // Focus management: move focus into the drawer on open, trap Tab inside it,
  // close on Escape, and return focus to whatever triggered it on close.
  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = triggerRef.current;
    const raf = requestAnimationFrame(() => closeButtonRef.current?.focus());

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;

      const focusables = panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [isOpen, onClose, triggerRef]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[80]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-drawer-title"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 bg-ab-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            ref={panelRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-y-0 right-0 flex h-full w-full max-w-full flex-col overflow-y-auto bg-ab-cream sm:max-w-lg"
          >
            <div className="flex items-center justify-between border-b border-ab-black/10 px-6 py-6 sm:px-10">
              <p className="eyebrow">Nous contacter</p>
              <button
                ref={closeButtonRef}
                onClick={onClose}
                aria-label="Fermer la fenêtre de contact"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ab-black/15 text-ab-black transition-colors hover:border-ab-orange hover:bg-ab-orange hover:text-ab-cream"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 px-6 py-8 sm:px-10 sm:py-10">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <h2
                  id="contact-drawer-title"
                  className="stacked-header text-ab-black"
                  style={{ fontSize: "clamp(2.25rem, 5vw, 3.5rem)" }}
                >
                  Nous contacter
                </h2>
                <p className="mt-4 max-w-sm font-body text-sm text-ab-black/60">
                  Une question ? Une inscription ? Envie d&apos;en savoir plus
                  sur l&apos;académie ? Notre équipe vous répond rapidement.
                </p>
              </motion.div>

              <motion.ul
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mt-8 space-y-4 border-y border-ab-black/10 py-8 font-body text-sm text-ab-black/80"
              >
                <li className="flex items-center gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ab-green/10 text-ab-green">
                    <Phone className="h-4 w-4" />
                  </span>
                  <a href={CONTACT.phoneHref} className="hover:text-ab-orange">
                    {CONTACT.phone}
                  </a>
                </li>
                <li className="flex items-center gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ab-green/10 text-ab-green">
                    <Mail className="h-4 w-4" />
                  </span>
                  <a href={`mailto:${CONTACT.email}`} className="hover:text-ab-orange">
                    {CONTACT.email}
                  </a>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ab-green/10 text-ab-green">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <span>{CONTACT.address}</span>
                </li>
              </motion.ul>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mt-8"
              >
                <ContactForm />
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
