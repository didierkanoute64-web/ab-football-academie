"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Desktop-only CONTEXTUAL cursor badge — a secondary effect, never a
 * replacement for the native pointer. The system arrow always stays
 * visible (see globals.css: no `cursor: none` anywhere); this badge only
 * appears a few pixels away from it when hovering an element tagged with
 * `data-cursor="voir" | "play" | "ouvrir" | "explore"`, matching the label
 * to the attribute value automatically — no per-element logic needed.
 */
export function CustomCursor() {
  const badgeRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    setEnabled(true);

    const badge = badgeRef.current;
    if (!badge) return;

    // Offset a little down-right of the real pointer so the native arrow
    // is never covered by the badge.
    gsap.set(badge, { xPercent: -20, yPercent: -20 });
    const badgeX = gsap.quickTo(badge, "x", { duration: 0.25, ease: "power3.out" });
    const badgeY = gsap.quickTo(badge, "y", { duration: 0.25, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      badgeX(e.clientX + 18);
      badgeY(e.clientY + 18);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const contextual = target.closest<HTMLElement>("[data-cursor]");
      if (contextual) {
        setLabel(contextual.dataset.cursor ?? null);
      }
    };

    const onOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-cursor]")) {
        setLabel(null);
      }
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={badgeRef}
      className="pointer-events-none fixed left-0 top-0 z-[95] transition-opacity duration-200"
      style={{ opacity: label ? 1 : 0 }}
      aria-hidden="true"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-ab-orange bg-ab-cream/90 shadow-md">
        <span className="font-body text-[10px] font-semibold uppercase tracking-[0.1em] text-ab-green">
          {label}
        </span>
      </div>
    </div>
  );
}
