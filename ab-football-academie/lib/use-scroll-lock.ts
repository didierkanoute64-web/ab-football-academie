"use client";

import { useEffect } from "react";
import { getLenisInstance } from "@/lib/lenis-singleton";

/** Pauses Lenis smooth scroll and locks native body scroll while `active` is true. */
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;

    const lenis = getLenisInstance();
    lenis?.stop();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      lenis?.start();
      document.body.style.overflow = previousOverflow;
    };
  }, [active]);
}
