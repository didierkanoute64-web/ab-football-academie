import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          // text-base (16px) est indispensable sur mobile : en dessous de 16px,
          // iOS Safari zoome automatiquement la page au focus d'un champ, ce qui
          // casse la mise en page du drawer et donne l'impression que le
          // formulaire est "bloqué" après avoir tapé prénom/nom.
          "h-13 w-full rounded-xl border border-ab-black/10 bg-white px-4 py-3 font-body text-base text-ab-black placeholder:text-ab-black/40 transition-colors duration-200 focus:border-ab-orange focus-visible:outline-none sm:text-sm",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        // Même raison qu'Input ci-dessus : 16px minimum pour empêcher le
        // zoom automatique iOS au focus.
        "w-full rounded-xl border border-ab-black/10 bg-white px-4 py-3 font-body text-base text-ab-black placeholder:text-ab-black/40 transition-colors duration-200 focus:border-ab-orange focus-visible:outline-none sm:text-sm",
        className
      )}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn("mb-2 block font-body text-xs font-semibold uppercase tracking-wide text-ab-green", className)}
      {...props}
    />
  )
);
Label.displayName = "Label";

export { Input, Textarea, Label };
