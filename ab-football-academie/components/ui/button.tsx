import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-body text-sm font-semibold uppercase tracking-wide transition-all duration-300 ease-premium focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-ab-orange text-ab-cream shadow-[0_0_0_0_rgba(249,115,22,0)] hover:-translate-y-0.5 hover:bg-ab-orange-dark hover:shadow-[0_12px_30px_-8px_rgba(249,115,22,0.55)] active:translate-y-0 active:scale-[0.98]",
        outline:
          "border border-current bg-transparent hover:bg-ab-black hover:text-ab-cream hover:border-ab-black",
        "outline-light":
          "border border-ab-cream/70 text-ab-cream bg-transparent hover:bg-ab-cream hover:text-ab-black",
        ghost: "bg-transparent hover:bg-black/5",
        dark: "bg-ab-black text-ab-cream hover:bg-ab-green",
        green: "bg-ab-green text-ab-cream hover:bg-ab-green-light",
      },
      size: {
        default: "h-12 px-7",
        sm: "h-11 px-5 text-xs",
        lg: "h-14 px-9 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
