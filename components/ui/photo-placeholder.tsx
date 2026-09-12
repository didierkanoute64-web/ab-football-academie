import { cn } from "@/lib/utils";

interface PhotoPlaceholderProps {
  label: string;
  className?: string;
  tone?: "cream" | "green" | "dark";
  video?: boolean;
}

const tones = {
  cream: "from-white via-ab-cream to-ab-cream border border-ab-black/[0.06]",
  green: "from-ab-green via-ab-green-light to-ab-green",
  dark: "from-ab-black via-ab-black/90 to-ab-black",
};

const ringTone = {
  cream: "border-ab-green/20",
  green: "border-ab-cream/15",
  dark: "border-ab-cream/10",
};

/**
 * Abstract brand-pattern placeholder standing in for real academy
 * photography/video — deliberately NOT a photorealistic or figurative
 * image (no invented people, no "broken image" iconography). A soft
 * diagonal texture + off-center ring in AB colors, reading as an
 * intentional design choice rather than an empty state.
 *
 * `label` describes the intended real photo and is kept for context
 * (visually hidden) — replace usages with a real <Image>/<video> once
 * the asset exists (see lib/media.ts).
 */
export function PhotoPlaceholder({
  label,
  className,
  tone = "cream",
  video = false,
}: PhotoPlaceholderProps) {
  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br",
        tones[tone],
        className
      )}
    >
      <span className="sr-only">{label}</span>

      {/* Texture diagonale de marque */}
      <div
        className={cn(
          "absolute inset-0 opacity-[0.05]",
          tone === "cream" ? "text-ab-green" : "text-ab-cream"
        )}
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 0, transparent 14px)",
        }}
      />

      {/* Anneau décentré façon rond central de terrain */}
      <div
        className={cn(
          "pointer-events-none absolute -right-[18%] -top-[18%] aspect-square w-[65%] rounded-full border",
          ringTone[tone]
        )}
      />
      <div
        className={cn(
          "pointer-events-none absolute -bottom-[22%] -left-[12%] aspect-square w-[45%] rounded-full border",
          ringTone[tone]
        )}
      />

      {/* Touche orange de marque */}
      <span
        className={cn(
          "absolute h-px w-10 bg-ab-orange/60",
          video ? "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45" : "bottom-8 left-8"
        )}
      />
    </div>
  );
}
