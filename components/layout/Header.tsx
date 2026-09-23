"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { useContactDrawer } from "@/components/contact/ContactDrawerProvider";
import { hasMedia, media } from "@/lib/media";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { open: openContactDrawer } = useContactDrawer();
  const crest = media.brand.crest;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isSolid = scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ease-premium",
        isSolid
          ? "border-ab-cream/10 bg-[rgba(4,27,23,0.82)] shadow-[0_8px_30px_-12px_rgba(0,0,0,0.5)] backdrop-blur-[18px]"
          : "border-transparent bg-gradient-to-b from-ab-green-deep/50 to-transparent"
      )}
    >
      <div
        className={cn(
          "container-ab grid grid-cols-[1fr_auto_1fr] items-center transition-[height] duration-500 ease-premium lg:grid-cols-[1fr_auto_1fr]",
          isSolid ? "h-16 lg:h-[72px]" : "h-20 lg:h-24"
        )}
      >
        {/* Logo — gauche */}
        <Link href="/" className="flex items-center gap-3 justify-self-start">
          {hasMedia(crest) ? (
            <span className="relative h-11 w-11 shrink-0 lg:h-12 lg:w-12">
              <Image src={crest.src} alt={crest.alt} fill className="object-contain" priority />
            </span>
          ) : (
            <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-ab-orange font-display text-lg text-ab-cream lg:h-12 lg:w-12">
              AB
            </div>
          )}
          <span className="hidden font-display text-xl tracking-wide text-ab-cream sm:block lg:text-2xl">
            AB Football <span className="text-ab-orange">Académie</span>
          </span>
        </Link>

        {/* Navigation — centrée */}
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group relative inline-block rounded-full px-3 py-2 font-body text-sm font-semibold uppercase tracking-wide text-ab-cream transition-all duration-300 ease-premium hover:-translate-y-px",
                  active && "text-ab-orange"
                )}
              >
                <span
                  className={cn(
                    "absolute inset-0 -z-10 rounded-full bg-ab-orange/10 transition-all duration-300 ease-premium",
                    active ? "scale-100 opacity-100" : "scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-60"
                  )}
                />
                {link.label}
                <span
                  className={cn(
                    "absolute -bottom-0.5 left-3 right-3 h-[2px] origin-left bg-ab-orange transition-transform duration-300 ease-premium",
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  )}
                />
              </Link>
            );
          })}
        </nav>

        {/* CTA — droite */}
        <div className="hidden justify-self-end lg:block">
          <Magnetic>
            <Button variant="primary" size="default" onClick={openContactDrawer}>
              Rejoindre l&apos;académie
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Magnetic>
        </div>

        <button
          aria-label="Ouvrir le menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="col-start-3 flex h-11 w-11 items-center justify-center justify-self-end rounded-full border border-ab-cream/25 text-ab-cream transition-colors duration-300 lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Menu mobile — plein écran, fond vert sombre */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 top-0 z-40 flex h-[100svh] flex-col justify-center bg-ab-green-deep lg:hidden"
            id="mobile-menu"
          >
            <nav className="container-ab flex flex-col gap-2">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    aria-current={pathname === link.href ? "page" : undefined}
                    className={cn(
                      "flex min-h-[64px] items-center border-b border-ab-cream/10 font-display text-4xl tracking-wide text-ab-cream transition-colors",
                      pathname === link.href && "text-ab-orange"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + NAV_LINKS.length * 0.06, duration: 0.4 }}
              >
                <Button
                  variant="primary"
                  size="lg"
                  className="mt-8 w-full"
                  onClick={() => {
                    setOpen(false);
                    openContactDrawer();
                  }}
                >
                  Rejoindre l&apos;académie <ArrowRight className="h-4 w-4" />
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
