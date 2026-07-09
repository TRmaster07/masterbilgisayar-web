import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import {
  AlertTriangle,
  BadgeCheck,
  Clock,
  MessageCircle,
  Phone,
  ShieldCheck,
  Users,
} from "lucide-react";

import { CtaSection } from "@/components/blocks/cta-section";
import { LocationContent } from "@/components/pages/location-content";
import { JsonLd } from "@/components/seo/json-ld";
import { getLocation, LOCATIONS } from "@/data/locations";
import { faqPageSchema, serviceSchema } from "@/lib/schema";
import { FaqSection } from "@/components/blocks/faq-section";
import { ProcessSteps } from "@/components/blocks/process-steps";
import { ServiceCard } from "@/components/blocks/service-card";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Button } from "@/components/ui/button";
import { BUSINESS, PHONE_HREF, whatsappHref } from "@/data/business";
import { getRelatedServices, getService, SERVICES } from "@/data/services";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    ...SERVICES.map((service) => ({ slug: service.slug })),
    ...LOCATIONS.map((location) => ({ slug: location.slug })),
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocation(slug);
  if (location) {
    return {
      title: { absolute: location.metaTitle },
      description: location.metaDescription,
      alternates: { canonical: `/${location.slug}` },
      openGraph: {
        title: location.metaTitle,
        description: location.metaDescription,
        url: `/${location.slug}`,
        type: "website",
      },
    };
  }
  const service = getService(slug);
  if (!service) return {};
  return {
    title: { absolute: service.metaTitle },
    description: service.metaDescription,
    alternates: { canonical: `/${service.slug}` },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `/${service.slug}`,
      type: "website",
    },
  };
}

const PRICE_FORMATTER = new Intl.NumberFormat("tr-TR");

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;

  const location = getLocation(slug);
  if (location) return <LocationContent location={location} />;

  const service = getService(slug);
  if (!service) notFound();

  const related = getRelatedServices(service);
  const whatsappMessage = `Merhaba, ${service.name.toLocaleLowerCase("tr")} için ücretsiz arıza tespiti istiyorum.`;

  return (
    <main className="flex-1">
      <JsonLd data={serviceSchema(service)} />
      <JsonLd data={faqPageSchema(service.faqs)} />
      <Breadcrumbs
        items={[
          { label: "Hizmetler", href: "/hizmetler" },
          { label: service.name },
        ]}
      />

      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-b from-primary/5 to-background">
        <div className="mx-auto max-w-6xl px-4 pb-12 pt-6 sm:pb-16">
          <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
            {service.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            {service.excerpt}
          </p>

          <dl className="mt-6 grid max-w-2xl gap-4 text-sm sm:grid-cols-3">
            <div className="rounded-lg border border-border bg-card p-3">
              <dt className="flex items-center gap-1.5 font-medium">
                <Clock aria-hidden className="size-4 text-primary" /> Teslim
                süresi
              </dt>
              <dd className="mt-1 text-muted-foreground">
                {service.turnaround}
              </dd>
            </div>
            <div className="rounded-lg border border-border bg-card p-3">
              <dt className="flex items-center gap-1.5 font-medium">
                <BadgeCheck aria-hidden className="size-4 text-primary" />{" "}
                Fiyat
              </dt>
              <dd className="mt-1 text-muted-foreground">
                {service.priceFrom
                  ? `${PRICE_FORMATTER.format(service.priceFrom)} TL'den başlar`
                  : "Cihaza göre teklif"}
              </dd>
            </div>
            <div className="rounded-lg border border-border bg-card p-3">
              <dt className="flex items-center gap-1.5 font-medium">
                <ShieldCheck aria-hidden className="size-4 text-primary" />{" "}
                Garanti
              </dt>
              <dd className="mt-1 text-muted-foreground">
                {BUSINESS.warrantyMonths / 12} yıl
              </dd>
            </div>
          </dl>
          <p className="mt-3 text-sm text-muted-foreground">
            {service.priceNote}
          </p>

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
                <MessageCircle aria-hidden /> WhatsApp&apos;tan Sor
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Belirtiler + Kimler yaşar */}
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-14 lg:grid-cols-2">
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
            <AlertTriangle aria-hidden className="size-6 text-primary" />
            Bu belirtiler size tanıdık mı?
          </h2>
          <ul className="mt-5 space-y-3">
            {service.symptoms.map((symptom) => (
              <li
                key={symptom}
                className="flex items-start gap-2 rounded-lg border border-border bg-card p-3 text-sm"
              >
                <span
                  aria-hidden
                  className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary"
                />
                {symptom}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
            <Users aria-hidden className="size-6 text-primary" />
            En çok kimler yaşıyor?
          </h2>
          <ul className="mt-5 space-y-3">
            {service.audience.map((item) => (
              <li
                key={item}
                className="rounded-lg border border-border bg-muted/40 p-3 text-sm"
              >
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-6 rounded-xl border border-primary/25 bg-primary/5 p-5">
            <h3 className="flex items-center gap-2 font-semibold">
              <ShieldCheck aria-hidden className="size-5 text-primary" />
              {BUSINESS.warrantyMonths / 12} yıl garanti — {BUSINESS.slogan}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Yaptığımız tüm onarımlar ve kullandığımız parçalar{" "}
              {BUSINESS.warrantyMonths} ay boyunca garantimiz altındadır. Aynı
              arıza tekrar ederse ücretsiz onarılır.
            </p>
          </div>
        </div>
      </section>

      {/* Uzun-kuyruk içerik blokları */}
      <section className="mx-auto max-w-3xl px-4 pb-14">
        {service.deepDives.map((dive) => (
          <article key={dive.title} className="mt-10 first:mt-0">
            <h2 className="text-2xl font-bold tracking-tight">{dive.title}</h2>
            <div className="mt-4 space-y-4 text-[0.95rem] leading-7 text-foreground/90 [&_a]:font-medium [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4">
              <ReactMarkdown>{dive.bodyMd}</ReactMarkdown>
            </div>
          </article>
        ))}
      </section>

      {/* Süreç */}
      <div className="border-y border-border bg-muted/40">
        <ProcessSteps
          heading="Tamir süreci nasıl işliyor?"
          steps={service.process}
        />
      </div>

      {/* SSS */}
      <FaqSection
        faqs={service.faqs}
        heading={`${service.name} hakkında sık sorulanlar`}
      />

      {/* İlgili hizmetler */}
      {related.length > 0 && (
        <section className="border-t border-border bg-muted/40">
          <div className="mx-auto max-w-6xl px-4 py-14">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              İlgili hizmetler
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((rel) => (
                <ServiceCard key={rel.slug} service={rel} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaSection
        heading={`${service.name} için hemen ulaşın`}
        whatsappMessage={whatsappMessage}
      />
    </main>
  );
}
