"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/constants";
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
        "fixed inset-x-0 top-0 z-50 border-b bg-[rgba(250,248,243,0.9)] backdrop-blur-[18px] transition-all duration-500 ease-premium",
        isSolid
          ? "border-ab-black/[0.08] shadow-[0_8px_30px_-12px_rgba(17,17,17,0.15)]"
          : "border-transparent"
      )}
    >
      <div
        className={cn(
          "container-ab flex items-center justify-between transition-[height] duration-500 ease-premium",
          isSolid ? "h-16 lg:h-[72px]" : "h-20 lg:h-24"
        )}
      >
        <Link href="/" className="flex items-center gap-3">
          {hasMedia(crest) ? (
            <span className="relative h-11 w-11 shrink-0 lg:h-12 lg:w-12">
              <Image src={crest.src} alt={crest.alt} fill className="object-contain" priority />
            </span>
          ) : (
            <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-ab-green font-display text-lg text-ab-green lg:h-12 lg:w-12">
              AB
            </div>
          )}
          <div className="leading-none">
            <p className="font-display text-xl tracking-wide text-ab-black lg:text-2xl">
              AB Football <span className="text-ab-orange">Académie</span>
            </p>
            <p className="hidden font-body text-[10px] font-medium uppercase tracking-[0.15em] text-ab-black/50 sm:block">
              {SITE.baseline}
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-10 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group relative inline-block py-2 font-body text-sm font-semibold uppercase tracking-wide text-ab-black transition-all duration-300 hover:-translate-y-px",
                  active && "text-ab-orange"
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute -bottom-0.5 left-0 h-[2px] w-full origin-left bg-ab-orange transition-transform duration-300 ease-premium",
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Magnetic>
            <Button variant="green" size="default" onClick={openContactDrawer}>
              Nous contacter
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Magnetic>
        </div>

        <button
          aria-label="Ouvrir le menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-ab-black/20 text-ab-black transition-colors duration-300 lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden bg-ab-cream lg:hidden"
            id="mobile-menu"
          >
            <div className="container-ab flex flex-col gap-1 pb-8 pt-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={pathname === link.href ? "page" : undefined}
                  className={cn(
                    "border-b border-ab-black/10 py-4 font-display text-2xl tracking-wide text-ab-black",
                    pathname === link.href && "text-ab-orange"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Button
                variant="primary"
                className="mt-6 w-full"
                onClick={() => {
                  setOpen(false);
                  openContactDrawer();
                }}
              >
                Nous contacter <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
