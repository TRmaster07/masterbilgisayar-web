import type { Metadata } from "next";
import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";

import { QuoteForm } from "@/components/forms/quote-form";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Button } from "@/components/ui/button";
import {
  BUSINESS,
  DIRECTIONS_HREF,
  PHONE_HREF,
  whatsappHref,
} from "@/data/business";

export const metadata: Metadata = {
  title: { absolute: "İletişim | Master Bilgisayar — Bilgisayar Servisi Alanya" },
  description:
    "Master Bilgisayar Alanya: Güller Pınarı Mah. Yenilmez Cd. No:41. Telefon, WhatsApp, yol tarifi ve çalışma saatleri. Ücretsiz arıza tespiti için ulaşın.",
  alternates: { canonical: "/iletisim" },
};

const MAP_EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(
  `Master Bilgisayar, ${BUSINESS.address.street}, Alanya`,
)}&output=embed`;

const DAY_ROWS = [
  { label: "Pazartesi – Cuma", hours: "09:00 – 19:00" },
  { label: "Cumartesi", hours: "09:10 – 19:00" },
  { label: "Pazar", hours: "Kapalı" },
] as const;

export default function ContactPage() {
  return (
    <main className="flex-1">
      <Breadcrumbs items={[{ label: "İletişim" }]} />
      <section className="mx-auto max-w-6xl px-4 pb-14 pt-4">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          İletişim
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Arayın, yazın veya uğrayın — arıza tespiti ücretsizdir.
        </p>

        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-12 px-6 text-base">
                <a href={PHONE_HREF} data-cta="call">
                  <Phone aria-hidden /> {BUSINESS.phoneDisplay}
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                className="h-12 bg-whatsapp px-6 text-base text-whatsapp-foreground hover:bg-whatsapp/85"
              >
                <a
                  href={whatsappHref()}
                  target="_blank"
                  rel="noopener"
                  data-cta="whatsapp"
                >
                  <MessageCircle aria-hidden /> WhatsApp
                </a>
              </Button>
            </div>

            <address className="space-y-4 text-sm not-italic">
              <a
                href={DIRECTIONS_HREF}
                target="_blank"
                rel="noopener"
                data-cta="directions"
                className="flex items-start gap-2 font-medium hover:text-primary"
              >
                <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-primary" />
                {BUSINESS.address.street}, {BUSINESS.address.postalCode}{" "}
                {BUSINESS.address.district}/{BUSINESS.address.city} — Yol tarifi
                al
              </a>
              <div className="flex items-start gap-2">
                <Clock aria-hidden className="mt-0.5 size-4 shrink-0 text-primary" />
                <table className="text-left">
                  <caption className="sr-only">Çalışma saatleri</caption>
                  <tbody>
                    {DAY_ROWS.map((row) => (
                      <tr key={row.label}>
                        <th scope="row" className="pr-4 font-medium">
                          {row.label}
                        </th>
                        <td className="text-muted-foreground">{row.hours}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </address>

            <iframe
              src={MAP_EMBED_SRC}
              title="Master Bilgisayar konumu — Google Haritalar"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-72 w-full rounded-xl border border-border"
            />
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-xl font-bold tracking-tight">
              Hemen Teklif Alın
            </h2>
            <p className="mt-1.5 mb-5 text-sm text-muted-foreground">
              Bilgileri doldurun, mesajınız WhatsApp&apos;tan bize ulaşsın.
            </p>
            <QuoteForm />
          </div>
        </div>
      </section>
    </main>
  );
}
