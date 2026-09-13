"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";
import { ContactDrawer } from "@/components/contact/ContactDrawer";

interface ContactDrawerContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const ContactDrawerContext = createContext<ContactDrawerContextValue | null>(null);

/**
 * Mount once near the root. Exposes `useContactDrawer()` so any button
 * anywhere in the tree (header, footer, hero CTAs, page CTAs…) can open the
 * same drawer instance without prop-drilling or duplicating markup.
 */
export function ContactDrawerProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);

  const open = useCallback(() => {
    triggerRef.current = (document.activeElement as HTMLElement) ?? null;
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <ContactDrawerContext.Provider value={{ isOpen, open, close }}>
      {children}
      <ContactDrawer isOpen={isOpen} onClose={close} triggerRef={triggerRef} />
    </ContactDrawerContext.Provider>
  );
}

export function useContactDrawer() {
  const ctx = useContext(ContactDrawerContext);
  if (!ctx) {
    throw new Error("useContactDrawer must be used within <ContactDrawerProvider>");
  }
  return ctx;
}
