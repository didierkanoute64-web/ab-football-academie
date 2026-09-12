import { Camera } from "lucide-react";
import { GsapTextReveal } from "@/components/animations/GsapTextReveal";
import { ContactDrawerButton } from "@/components/contact/ContactDrawerButton";

export function ShareMoments() {
  return (
    <section className="clip-diagonal-both relative -my-6 overflow-hidden bg-ab-green py-24 text-center lg:-my-10">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.05]">
        <span className="text-ghost whitespace-nowrap text-[10vw] text-ab-cream">PARTAGEZ</span>
      </div>
      <div className="container-ab relative flex flex-col items-center">
        <Camera className="h-8 w-8 text-ab-orange" strokeWidth={1.5} />
        <GsapTextReveal
          as="h2"
          text="Partagez vos plus beaux moments !"
          className="text-display mt-4 max-w-xl text-3xl leading-tight text-ab-cream sm:text-4xl"
          highlightIndices={[3, 4]}
        />
        <p className="mt-3 max-w-md font-body text-sm text-ab-cream/60">
          Vous disposez d&apos;une photo ou d&apos;une vidéo prise lors d&apos;un
          événement AB ? Transmettez-la à l&apos;académie — elle sera
          publiée dans la galerie après validation.
        </p>
        <ContactDrawerButton size="lg" magneticClassName="mt-7">
          Nous envoyer un contenu
        </ContactDrawerButton>
      </div>
    </section>
  );
}
