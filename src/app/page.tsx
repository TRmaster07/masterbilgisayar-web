import type { Metadata } from "next";
import Link from "next/link";
import {
  BadgeCheck,
  Clock,
  MessageCircle,
  Phone,
  ShieldCheck,
  Star,
} from "lucide-react";

import { CtaSection } from "@/components/blocks/cta-section";
import { FaqSection } from "@/components/blocks/faq-section";
import { ProcessSteps } from "@/components/blocks/process-steps";
import { ServiceCard } from "@/components/blocks/service-card";
import { Button } from "@/components/ui/button";
import {
  BUSINESS,
  PHONE_HREF,
  REVIEWS_HREF,
  whatsappHref,
} from "@/data/business";
import { GENERAL_FAQS } from "@/data/faqs";
import { SERVICES } from "@/data/services";

export const metadata: Metadata = {
  title: "Master Bilgisayar | Alanya Bilgisayar Tamiri ve Teknik Servis",
  description:
    "Alanya'da bilgisayar, laptop, MacBook ve oyun konsolu tamiri. Ücretsiz arıza tespiti, 1 yıl garanti, aynı gün teslim. Google'da 4.9 puan, 166+ yorum.",
  alternates: { canonical: "/" },
};

const HERO_TRUST_ITEMS = [
  { icon: Star, label: `Google'da ${BUSINESS.rating.value} puan` },
  { icon: ShieldCheck, label: "1 yıl garanti" },
  { icon: BadgeCheck, label: "Ücretsiz arıza tespiti" },
  { icon: Clock, label: "Aynı gün teslim imkânı" },
] as const;

const HOME_PROCESS_STEPS = [
  {
    title: "Ulaşın",
    description:
      "Telefonla arayın, WhatsApp'tan yazın veya cihazınızı mağazamıza getirin.",
  },
  {
    title: "Ücretsiz tespit",
    description:
      "Arızanın kaynağını bulup net fiyat ve teslim süresini size bildirelim.",
  },
  {
    title: "Onaylı onarım",
    description:
      "Onayınız olmadan işlem yapılmaz; onarım komponent seviyesinde yapılır.",
  },
  {
    title: "Garantili teslim",
    description:
      "Test edilen cihazınız 1 yıl garanti ile teslim edilir.",
  },
] as const;

export default function HomePage() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-b from-primary/5 to-background">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
          <p className="text-sm font-semibold text-primary">
            {BUSINESS.address.district} / {BUSINESS.address.city} —{" "}
            {BUSINESS.slogan}
          </p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
            Alanya Bilgisayar Tamiri ve Teknik Servis
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Laptop, masaüstü, MacBook ve oyun konsollarınızı komponent
            seviyesinde onarıyoruz. Arıza tespiti ücretsiz, tüm işlemler{" "}
            {BUSINESS.warrantyMonths / 12} yıl garantili.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="h-12 px-6 text-base">
              <a href={PHONE_HREF} data-cta="call">
                <Phone aria-hidden /> Hemen Ara: {BUSINESS.phoneDisplay}
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              className="h-12 bg-whatsapp px-6 text-base text-whatsapp-foreground hover:bg-whatsapp/85"
            >
              <a
                href={whatsappHref(
                  "Merhaba, cihazım için ücretsiz arıza tespiti istiyorum.",
                )}
                target="_blank"
                rel="noopener"
                data-cta="whatsapp"
              >
                <MessageCircle aria-hidden /> WhatsApp&apos;tan Yaz
              </a>
            </Button>
          </div>
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {HERO_TRUST_ITEMS.map((item) => (
              <li
                key={item.label}
                className="flex items-center gap-2 text-sm font-medium"
              >
                <item.icon aria-hidden className="size-4 shrink-0 text-primary" />
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Hizmetler */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Hizmetlerimiz
            </h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Yetkili serviste &ldquo;değişmesi gerek&rdquo; denilen çoğu parça,
              atölyemizde çip seviyesinde onarılır — {BUSINESS.slogan.toLowerCase()}
            </p>
          </div>
          <Link
            href="/hizmetler"
            className="hidden shrink-0 text-sm font-medium text-primary hover:underline sm:block"
          >
            Tümünü gör →
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>

      {/* Süreç */}
      <div className="border-y border-border bg-muted/40">
        <ProcessSteps heading="Nasıl çalışıyoruz?" steps={HOME_PROCESS_STEPS} />
      </div>

      {/* Sosyal kanıt */}
      <section className="mx-auto max-w-6xl px-4 py-14 text-center">
        <div
          aria-hidden
          className="mx-auto flex w-fit items-center gap-1 text-amber-400"
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="size-6 fill-current" />
          ))}
        </div>
        <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
          Google&apos;da {BUSINESS.rating.value} puan, {BUSINESS.rating.count}+
          gerçek yorum
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Alanya&apos;daki müşterilerimizin deneyimlerini Google üzerinden
          okuyabilir, memnuniyetinizi siz de paylaşabilirsiniz.
        </p>
        <Button asChild variant="outline" size="lg" className="mt-6">
          <a href={REVIEWS_HREF} target="_blank" rel="noopener">
            Google yorumlarını okuyun
          </a>
        </Button>
      </section>

      {/* SSS */}
      <div className="border-t border-border">
        <FaqSection faqs={GENERAL_FAQS} />
      </div>

      <CtaSection />
    </main>
  );
}
