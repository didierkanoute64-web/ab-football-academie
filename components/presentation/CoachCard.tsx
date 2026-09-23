import { Sparkles } from "lucide-react";
import { MediaImage } from "@/components/ui/media-image";
import type { MediaAsset } from "@/lib/media";
import { cn } from "@/lib/utils";

interface CoachCardProps {
  photo: MediaAsset;
  role: string;
  focus: string[];
  /** "large" = portrait dominant (coach principal), "wide" = format large (préparatrice), "default" = grille standard. */
  variant?: "large" | "wide" | "default";
  className?: string;
}

export function CoachCard({ photo, role, focus, variant = "default", className }: CoachCardProps) {
  const isIllustration = Boolean(photo.isIllustration);

  return (
    <div
      className={cn(
        "group relative overflow-hidden",
        variant === "large" && "h-[520px] lg:h-[640px]",
        variant === "wide" && "h-[360px] lg:h-[440px]",
        variant === "default" && "h-[420px] lg:h-[480px]",
        isIllustration && "bg-gradient-to-br from-ab-green-deep via-ab-black to-ab-green-deep",
        className
      )}
      data-cursor="voir"
    >
      {isIllustration ? (
        // Illustration : jamais rognée — object-contain dans un cadre respirant,
        // toute l'image reste visible (aucune tête coupée, aucun élément perdu).
        <div className="absolute inset-6 lg:inset-10">
          <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]">
            <MediaImage
              asset={photo}
              fit="contain"
              tone="dark"
              sizes={variant === "default" ? "(min-width: 640px) 50vw, 100vw" : "100vw"}
              className="bg-ab-cream/5 transition-transform duration-700 ease-premium group-hover:scale-[1.03]"
            />
          </div>
        </div>
      ) : (
        <MediaImage
          asset={photo}
          tone="cream"
          sizes={variant === "default" ? "(min-width: 640px) 50vw, 100vw" : "100vw"}
          className="grayscale transition-all duration-700 ease-premium group-hover:scale-[1.03] group-hover:grayscale-0"
        />
      )}

      {/* Signale clairement une illustration temporaire — jamais présentée comme une vraie photo. */}
      {isIllustration && (
        <span className="absolute left-4 top-4 z-10 flex items-center gap-1.5 rounded-full bg-ab-black/70 px-3 py-1.5 font-body text-[10px] font-semibold uppercase tracking-wide text-ab-cream backdrop-blur-sm">
          <Sparkles className="h-3 w-3 text-ab-orange" />
          Illustration — photo à venir
        </span>
      )}

      {/* Overlay vert profond au hover (photos réelles uniquement — l'illustration a déjà son propre cadre) */}
      {!isIllustration && (
        <>
          <div className="absolute inset-0 bg-ab-green-deep/0 transition-colors duration-500 ease-premium group-hover:bg-ab-green-deep/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-ab-black/90 via-ab-black/20 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />
        </>
      )}
      {isIllustration && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ab-black/95 to-transparent lg:h-40" />
      )}

      {/* Ligne orange qui se révèle */}
      <span className="absolute inset-x-6 bottom-20 h-px origin-left scale-x-0 bg-ab-orange transition-transform duration-500 ease-premium group-hover:scale-x-100 lg:bottom-24" />

      {/* Texte — remonte légèrement au hover */}
      <div className="absolute inset-x-0 bottom-0 p-6 transition-transform duration-500 ease-premium group-hover:-translate-y-2 lg:p-8">
        <p
          className={cn(
            "text-display tracking-wide text-ab-cream",
            variant === "large" ? "text-3xl lg:text-4xl" : "text-2xl"
          )}
        >
          {role}
        </p>
        <ul className="mt-2 space-y-0.5 font-body text-xs text-ab-cream/70 lg:text-sm">
          {focus.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
