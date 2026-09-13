import { cn } from "@/lib/utils";

interface MarqueeProps {
  text: string;
  className?: string;
  reverse?: boolean;
}

function Segment({ text }: { text: string }) {
  const items = Array.from({ length: 6 });
  return (
    <div className="inline-flex shrink-0 items-center">
      {items.map((_, i) => (
        <span
          key={i}
          className="mx-4 inline-flex items-center gap-4 font-display text-sm uppercase tracking-[0.3em]"
        >
          {text}
          <span className="h-1.5 w-1.5 rounded-full bg-current opacity-50" />
        </span>
      ))}
    </div>
  );
}

export function Marquee({ text, className, reverse }: MarqueeProps) {
  return (
    <div className={cn("overflow-hidden whitespace-nowrap", className)}>
      <div
        className={cn(
          "inline-flex w-max animate-marquee items-center",
          reverse && "[animation-direction:reverse]"
        )}
      >
        <Segment text={text} />
        <Segment text={text} />
      </div>
    </div>
  );
}
