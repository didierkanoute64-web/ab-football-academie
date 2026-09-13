"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ImageRevealProps {
  children: React.ReactNode;
  containerClassName?: string;
  delay?: number;
}

/**
 * Wraps any media (Image, PhotoPlaceholder, video…) with a premium
 * curtain-wipe + scale reveal, triggered once the element enters the viewport.
 */
export function ImageReveal({
  children,
  containerClassName,
  delay = 0,
}: ImageRevealProps) {
  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      <motion.div
        className="absolute inset-0 z-10 bg-ab-green"
        initial={{ scaleX: 1 }}
        whileInView={{ scaleX: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, delay, ease: [0.76, 0, 0.24, 1] }}
        style={{ transformOrigin: "right" }}
      />
      <motion.div
        initial={{ scale: 1.2 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.4, delay, ease: [0.16, 1, 0.3, 1] }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
