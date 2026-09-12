import Image from "next/image";
import { PhotoPlaceholder } from "@/components/ui/photo-placeholder";
import { hasMedia, type MediaAsset } from "@/lib/media";
import { cn } from "@/lib/utils";

interface MediaImageProps {
  asset: MediaAsset;
  className?: string;
  tone?: "cream" | "green" | "dark";
  video?: boolean;
  priority?: boolean;
  sizes?: string;
  /** CSS object-position, e.g. "center 20%" — use to avoid cropping a face/action when the container ratio differs from the source photo. */
  objectPosition?: string;
}

/**
 * Renders a real photo via next/image when `asset.src` is set, otherwise
 * falls back to <PhotoPlaceholder>. Centralizes the pattern used across the
 * site so every section swaps to a real image the same way once one is
 * added to lib/media.ts. Parent element must be `position: relative` (fill).
 */
export function MediaImage({
  asset,
  className,
  tone = "cream",
  video = false,
  priority = false,
  sizes = "100vw",
  objectPosition = "center",
}: MediaImageProps) {
  if (hasMedia(asset)) {
    return (
      <Image
        src={asset.src}
        alt={asset.alt}
        fill
        priority={priority}
        sizes={sizes}
        quality={82}
        style={{ objectPosition }}
        className={cn("object-cover", className)}
      />
    );
  }

  return <PhotoPlaceholder label={asset.alt} tone={tone} video={video} className={className} />;
}
