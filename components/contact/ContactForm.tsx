"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "";

type Status = "idle" | "loading" | "success" | "error";

interface ContactFormProps {
  /** Pré-remplit le message (ex. choix rapide dans le drawer) — non intrusif, reste modifiable. */
  initialMessage?: string;
  /** Objet de l'e-mail envoyé (champ caché Formspree `_subject`), selon le choix rapide sélectionné. */
  initialSubject?: string;
  /** Ref exposée pour permettre au parent (drawer) de placer le focus sur le premier champ. */
  firstFieldRef?: React.RefObject<HTMLInputElement | null>;
}

const DEFAULT_SUBJECT = "Nouveau message depuis le site AB Football Académie";

export function ContactForm({
  initialMessage = "",
  initialSubject = "",
  firstFieldRef,
}: ContactFormProps) {
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!FORMSPREE_ID || FORMSPREE_ID === "your_formspree_id") {
      // eslint-disable-next-line no-console
      console.warn(
        "NEXT_PUBLIC_FORMSPREE_ID n'est pas configuré. Voir .env.example."
      );
    }

    setStatus("loading");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-ab-green/20 bg-ab-green/5 px-8 py-16 text-center">
        <CheckCircle2 className="h-12 w-12 text-ab-green" strokeWidth={1.5} />
        <p className="text-display mt-5 text-2xl tracking-wide text-ab-black">
          Votre demande a bien été envoyée.
        </p>
        <p className="mt-2 max-w-sm font-body text-sm text-ab-black/60">
          Nous vous répondrons dans les meilleurs délais.
        </p>
        <Button variant="outline" className="mt-6" onClick={() => setStatus("idle")}>
          Envoyer un autre message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <input type="hidden" name="_subject" value={initialSubject || DEFAULT_SUBJECT} />
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="prenom">Prénom</Label>
          <Input id="prenom" name="prenom" required placeholder="Votre prénom" ref={firstFieldRef} />
        </div>
        <div>
          <Label htmlFor="nom">Nom</Label>
          <Input id="nom" name="nom" required placeholder="Votre nom" />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" name="email" required placeholder="vous@email.com" />
        </div>
        <div>
          <Label htmlFor="telephone">Téléphone</Label>
          <Input id="telephone" type="tel" name="telephone" placeholder="07 82 57 09 66" />
        </div>
      </div>

      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea
          key={initialMessage}
          id="message"
          name="message"
          required
          rows={5}
          defaultValue={initialMessage}
          placeholder="Votre message..."
        />
      </div>

      {status === "error" && (
        <p className="font-body text-sm text-red-600">
          Une erreur est survenue. Merci de réessayer ou de nous contacter
          directement par téléphone.
        </p>
      )}

      <Button type="submit" size="lg" disabled={status === "loading"} className="w-full sm:w-auto">
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Envoi en cours...
          </>
        ) : (
          <>
            Envoyer le message <ArrowRight className="h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
}
