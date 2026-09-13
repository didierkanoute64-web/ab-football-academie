"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface GsapTextRevealProps {
  text: string;
  className?: string;
  wordClassName?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  /** "scroll" reveals progressively as the title enters the viewport, "immediate" plays on mount (above-the-fold heroes). */
  trigger?: "scroll" | "immediate";
  delay?: number;
  /** Zero-based word indices to render in the accent (orange) color. */
  highlightIndices?: number[];
  style?: React.CSSProperties;
}

/**
 * Hand-rolled "SplitText"-style word reveal (no paid GSAP plugin required):
 * each word is wrapped and masked, then animated in with a soft, restrained
 * rise + blur + fade — no rotation, no overshoot, nothing brutal. Designed to
 * read as calm and luxurious rather than punchy.
 */
export function GsapTextReveal({
  text,
  className,
  wordClassName,
  as = "h2",
  trigger = "scroll",
  delay = 0,
  highlightIndices = [],
  style,
}: GsapTextRevealProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const words = text.split(" ");

  useLayoutEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = node.querySelectorAll<HTMLElement>(".word-inner");

    if (reduced) {
      gsap.set(targets, { yPercent: 0, opacity: 1, filter: "blur(0px)" });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { yPercent: 105, opacity: 0, filter: "blur(10px)" },
        {
          yPercent: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.4,
          ease: "expo.out",
          stagger: 0.07,
          delay,
          scrollTrigger:
            trigger === "scroll"
              ? { trigger: node, start: "top 90%" }
              : undefined,
        }
      );
    }, node);

    return () => ctx.revert();
  }, [text, trigger, delay]);

  const Component = as as React.ElementType;

  return (
    <Component ref={containerRef} className={cn(className)} style={style}>
      {words.map((w, i) => (
        <span
          key={i}
          className="mr-[0.28em] inline-block overflow-hidden pb-[0.2em] align-bottom"
        >
          <span
            className={cn(
              "word-inner inline-block will-change-transform",
              highlightIndices.includes(i) && "text-ab-orange",
              wordClassName
            )}
          >
            {w}
          </span>
        </span>
      ))}
    </Component>
  );
}
