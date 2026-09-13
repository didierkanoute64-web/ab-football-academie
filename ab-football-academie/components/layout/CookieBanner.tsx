"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "ab-cookie-consent";

type Consent = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

const defaultConsent: Consent = { necessary: true, analytics: false, marketing: false };

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [customizing, setCustomizing] = useState(false);
  const [consent, setConsent] = useState<Consent>(defaultConsent);
  const prefersReducedMotion = useReducedMotion();

  // Show the banner on first visit, and load any previously saved choice.
  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
    try {
      setConsent(JSON.parse(stored));
    } catch {
      // ignore malformed stored value
    }
  }, []);

  // Always-on listener (registered exactly once) so "Gérer mes cookies" in
  // the footer can reopen the panel in customize mode at any time.
  useEffect(() => {
    const openSettings = () => {
      setCustomizing(true);
      setVisible(true);
    };
    window.addEventListener("ab-open-cookie-settings", openSettings);
    return () => window.removeEventListener("ab-open-cookie-settings", openSettings);
  }, []);

  const save = (next: Consent) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setConsent(next);
    setVisible(false);
    setCustomizing(false);
  };

  const refuseAll = () => save({ necessary: true, analytics: false, marketing: false });
  const acceptAll = () => save({ necessary: true, analytics: true, marketing: true });

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={prefersReducedMotion ? { opacity: 0 } : { y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { y: 100, opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.15 : 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-[60] p-3 sm:p-6"
        >
          <div className="container-ab">
            <div className="mx-auto max-w-3xl rounded-2xl border border-ab-black/10 bg-ab-cream/95 p-4 shadow-2xl backdrop-blur-md sm:p-7">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ab-green/10 text-ab-green sm:flex">
                  <Cookie className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="font-display text-base tracking-wide text-ab-black sm:text-lg">
                    Vos données, vos droits
                  </p>
                  <p className="mt-1 font-body text-xs text-ab-black/70 sm:hidden">
                    Cookies strictement nécessaires uniquement. Aucun suivi sans votre accord.
                  </p>
                  <p className="mt-1 hidden font-body text-sm text-ab-black/70 sm:block">
                    AB Football Académie utilise des cookies strictement
                    nécessaires au bon fonctionnement du site. Aucun cookie de
                    mesure d&apos;audience ou de réseau social n&apos;est
                    déposé sans votre accord. Vous pouvez accepter, refuser ou
                    personnaliser vos choix à tout moment.
                  </p>

                  {customizing && (
                    <div className="mt-4 space-y-4 border-t border-ab-black/10 pt-4">
                      <label className="flex items-center justify-between font-body text-sm text-ab-black/70">
                        Cookies nécessaires (toujours actifs)
                        <input type="checkbox" checked disabled className="h-4 w-4 accent-ab-green" />
                      </label>
                      <div>
                        <label className="flex items-center justify-between font-body text-sm text-ab-black/70">
                          Cookies de mesure d&apos;audience
                          <input
                            type="checkbox"
                            checked={consent.analytics}
                            onChange={(e) =>
                              setConsent((c) => ({ ...c, analytics: e.target.checked }))
                            }
                            className="h-4 w-4 accent-ab-orange"
                          />
                        </label>
                        <p className="mt-0.5 font-body text-xs text-ab-black/40">
                          Aucun service de ce type n&apos;est actif pour le moment.
                        </p>
                      </div>
                      <div>
                        <label className="flex items-center justify-between font-body text-sm text-ab-black/70">
                          Cookies réseaux sociaux
                          <input
                            type="checkbox"
                            checked={consent.marketing}
                            onChange={(e) =>
                              setConsent((c) => ({ ...c, marketing: e.target.checked }))
                            }
                            className="h-4 w-4 accent-ab-orange"
                          />
                        </label>
                        <p className="mt-0.5 font-body text-xs text-ab-black/40">
                          Aucun service de ce type n&apos;est actif pour le moment.
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="mt-4 flex flex-wrap gap-2 sm:mt-5 sm:gap-3">
                    <Button variant="outline" size="sm" onClick={refuseAll}>
                      Tout refuser
                    </Button>
                    {customizing ? (
                      <Button size="sm" onClick={() => save(consent)}>
                        Enregistrer mes choix
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" onClick={() => setCustomizing(true)}>
                        Personnaliser
                      </Button>
                    )}
                    <Button size="sm" onClick={acceptAll}>
                      Tout accepter
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
