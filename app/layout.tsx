import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Montserrat } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { Loader } from "@/components/layout/Loader";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { ContactDrawerProvider } from "@/components/contact/ContactDrawerProvider";
import { GrainOverlay } from "@/components/ui/grain-overlay";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { CONTACT, SEO_KEYWORDS, SITE } from "@/lib/constants";

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.baseline}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  keywords: SEO_KEYWORDS,
  authors: [{ name: SITE.name }],
  alternates: {
    canonical: SITE.url,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.baseline}`,
    description: SITE.description,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.baseline}`,
    description: SITE.description,
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#103B2B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    telephone: CONTACT.phone,
    email: CONTACT.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Épinay-sur-Seine",
      addressRegion: "Île-de-France",
      addressCountry: "FR",
    },
    sport: "Football",
  };

  return (
    <html lang="fr" className={`${bebas.variable} ${montserrat.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Loader />
        <GrainOverlay />
        <CustomCursor />
        <SmoothScrollProvider>
          <ContactDrawerProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </ContactDrawerProvider>
        </SmoothScrollProvider>
        <CookieBanner />
      </body>
    </html>
  );
}