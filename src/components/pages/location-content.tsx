import { MapPin, MessageCircle, Phone, ShieldCheck, Truck } from "lucide-react";

import { CtaSection } from "@/components/blocks/cta-section";
import { FaqSection } from "@/components/blocks/faq-section";
import { ServiceCard } from "@/components/blocks/service-card";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import {
  BUSINESS,
  DIRECTIONS_HREF,
  PHONE_HREF,
  whatsappHref,
} from "@/data/business";
import type { Location } from "@/data/locations";
import { getService } from "@/data/services";
import { faqPageSchema } from "@/lib/schema";
import { absoluteUrl, SITE_URL } from "@/lib/seo";

export function LocationContent({ location }: { location: Location }) {
  const services = location.featuredServices
    .map((slug) => getService(slug))
    .filter((s) => s !== undefined);

  const whatsappMessage = `Merhaba, ${location.name}'dan yazıyorum; cihazım için ücretsiz arıza tespiti istiyorum.`;

  const locationServiceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: location.title,
    serviceType: "Bilgisayar Tamiri",
    description: location.metaDescription,
    url: absoluteUrl(`/${location.slug}`),
    provider: { "@id": `${SITE_URL}/#localbusiness` },
    areaServed: { "@type": "Place", name: `${location.name}, Alanya` },
  };

  return (
    <main className="flex-1">
      <JsonLd data={locationServiceSchema} />
      <JsonLd data={faqPageSchema(location.faqs)} />
      <Breadcrumbs items={[{ label: location.title }]} />

      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-b from-primary/5 to-background">
        <div className="mx-auto max-w-6xl px-4 pb-12 pt-6 sm:pb-16">
          <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
            {location.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            {location.intro}
          </p>

          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium">
            <span className="flex items-center gap-2">
              <MapPin aria-hidden className="size-4 shrink-0 text-primary" />
              {location.name} → servisimiz: {location.distance}
            </span>
            <span className="flex items-center gap-2">
              <Truck aria-hidden className="size-4 shrink-0 text-primary" />
              Adresten teslim alma imkânı
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck aria-hidden className="size-4 shrink-0 text-primary" />
              {BUSINESS.warrantyMonths / 12} yıl garanti
            </span>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
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
                href={whatsappHref(whatsappMessage)}
                target="_blank"
                rel="noopener"
                data-cta="whatsapp"
              >
                <MessageCircle aria-hidden /> WhatsApp&apos;tan Yaz
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 px-6 text-base">
              <a href={DIRECTIONS_HREF} target="_blank" rel="noopener" data-cta="directions">
                <MapPin aria-hidden /> Yol Tarifi
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Semte özel içerik */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-6 lg:grid-cols-3">
          {location.localNotes.map((note) => (
            <article
              key={note.title}
              className="rounded-xl border border-border bg-card p-6"
            >
              <h2 className="text-lg font-semibold">{note.title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {note.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Öne çıkan hizmetler */}
      <section className="border-y border-border bg-muted/40">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {location.name} için öne çıkan hizmetlerimiz
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <FaqSection
        faqs={location.faqs}
        heading={`${location.name} için sık sorulanlar`}
      />

      <CtaSection
        heading={`${location.name}'dan bize ulaşın`}
        whatsappMessage={whatsappMessage}
      />
    </main>
  );
}
