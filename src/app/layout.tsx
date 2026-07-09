import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Clarity } from "@/components/analytics/clarity";
import { ConsentBanner } from "@/components/analytics/consent-banner";
import { CtaTracker } from "@/components/analytics/cta-tracker";
import { GoogleTagManager } from "@/components/analytics/gtm";
import { FloatingWhatsapp } from "@/components/layout/floating-whatsapp";
import { MobileCtaBar } from "@/components/layout/mobile-cta-bar";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { JsonLd } from "@/components/seo/json-ld";
import { localBusinessSchema, webSiteSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Master Bilgisayar | Alanya Bilgisayar Tamiri ve Teknik Servis",
    template: "%s | Master Bilgisayar Alanya",
  },
  description:
    "Alanya'da laptop, bilgisayar, MacBook ve oyun konsolu tamiri. 1 yıl garantili, ücretsiz arıza tespiti. Google'da 4.9 puan.",
  openGraph: {
    type: "website",
    siteName: "Master Bilgisayar",
    locale: "tr_TR",
  },
  twitter: {
    card: "summary",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* Site genelinde koyu lacivert tema — .dark paleti globals.css'te */}
      <body className="dark min-h-full flex flex-col bg-background text-foreground pb-14 md:pb-0">
        <JsonLd data={localBusinessSchema()} />
        <JsonLd data={webSiteSchema()} />
        <SiteHeader />
        {children}
        <SiteFooter />
        <MobileCtaBar />
        <FloatingWhatsapp />
        <GoogleTagManager />
        <Clarity />
        <ConsentBanner />
        <CtaTracker />
      </body>
    </html>
  );
}
