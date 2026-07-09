import type { Metadata } from "next";
import Link from "next/link";
import {
  BadgeCheck,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Star,
} from "lucide-react";

import { BrandMarquee } from "@/components/blocks/brand-marquee";
import { CtaSection } from "@/components/blocks/cta-section";
import { FaqSection } from "@/components/blocks/faq-section";
import { HeroCircuit } from "@/components/blocks/hero-circuit";
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

/** Hero altındaki istatistik şeridi — puan kartıyla tekrar etmeyen değerler */
const HERO_STATS = [
  { value: "Ücretsiz", label: "Arıza tespiti" },
  { value: `${BUSINESS.warrantyMonths / 12} yıl`, label: "Garanti süresi" },
  { value: "Aynı gün", label: "Teslim imkânı" },
  { value: "Çip seviyesi", label: "Anakart onarımı" },
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
      {/* Ana sayfa baştan sona koyu tema — .dark ile tüm semantik tokenlar laciverte döner */}
      <div className="dark bg-background text-foreground">
      {/* Hero — koyu lacivert zemin, ışıma ve devre deseniyle derinlik */}
      <section className="relative overflow-hidden text-white">
        {/* Dekoratif katmanlar: köşe ışımaları + devre deseni + çip illüstrasyonu */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -top-48 right-[-12%] size-[38rem] rounded-full bg-[oklch(0.45_0.17_258/0.4)] blur-3xl" />
          <div className="absolute -bottom-56 left-[-16%] size-[34rem] rounded-full bg-[oklch(0.45_0.17_258/0.25)] blur-3xl" />
          <div className="absolute inset-0 [background-image:radial-gradient(circle,oklch(1_0_0/0.07)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
          <HeroCircuit className="absolute top-[44%] right-[-5rem] hidden w-[30rem] -translate-y-1/2 opacity-45 xl:block" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4">
          <div className="grid gap-12 pt-16 pb-12 sm:pt-20 lg:grid-cols-[1fr_20rem] lg:items-center">
            <div>
              <p className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold sm:text-sm">
                <MapPin aria-hidden className="size-3.5 text-sky-300" />
                {BUSINESS.address.district} / {BUSINESS.address.city}
                <span aria-hidden className="text-white/40">
                  •
                </span>
                <span className="text-sky-300">{BUSINESS.slogan}</span>
              </p>
              <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                Alanya Bilgisayar Tamiri ve{" "}
                <span className="bg-gradient-to-r from-sky-300 to-blue-400 bg-clip-text text-transparent">
                  Teknik Servis
                </span>
              </h1>
              <p className="mt-5 max-w-2xl text-lg text-white/70">
                Laptop, masaüstü, MacBook ve oyun konsollarınızı komponent
                seviyesinde onarıyoruz. Arıza tespiti ücretsiz, tüm işlemler{" "}
                {BUSINESS.warrantyMonths / 12} yıl garantili.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  asChild
                  size="lg"
                  className="h-12 bg-white px-6 text-base text-[oklch(0.21_0.05_262)] hover:bg-white/90"
                >
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
              <p className="mt-4 flex items-center gap-2 text-sm text-white/60">
                <BadgeCheck aria-hidden className="size-4 shrink-0 text-sky-300" />
                Arıza tespiti ücretsiz — net fiyat, onarım öncesi bildirilir.
              </p>
            </div>

            {/* Güven kartı — cam efekti, arkasında ışıma */}
            <aside className="relative">
              <div
                aria-hidden
                className="absolute -inset-4 rounded-3xl bg-[oklch(0.45_0.17_258/0.3)] blur-2xl"
              />
              <div className="relative rounded-2xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur">
                <p className="text-5xl font-bold tracking-tight">
                  {BUSINESS.rating.value}
                  <span className="text-2xl text-white/50">/5</span>
                </p>
                <div
                  aria-hidden
                  className="mt-2 flex items-center gap-0.5 text-amber-400"
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-5 fill-current" />
                  ))}
                </div>
                <p className="mt-2 text-sm text-white/70">
                  Google&apos;da {BUSINESS.rating.count}+ gerçek müşteri yorumu
                </p>
                <a
                  href={REVIEWS_HREF}
                  target="_blank"
                  rel="noopener"
                  className="mt-3 inline-block text-sm font-medium text-sky-300 hover:underline"
                >
                  Yorumları okuyun →
                </a>
                <div className="mt-5 space-y-3 border-t border-white/10 pt-5 text-sm font-medium">
                  <p className="flex items-center gap-2">
                    <ShieldCheck aria-hidden className="size-4 text-sky-300" />
                    Tüm işlemler {BUSINESS.warrantyMonths / 12} yıl garantili
                  </p>
                  <p className="flex items-center gap-2">
                    <BadgeCheck aria-hidden className="size-4 text-sky-300" />
                    Arıza tespiti ücretsiz
                  </p>
                </div>
              </div>
            </aside>
          </div>

          {/* İstatistik şeridi */}
          <dl className="reveal grid grid-cols-2 gap-x-6 gap-y-8 border-t border-white/10 py-8 sm:grid-cols-4">
            {HERO_STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse">
                <dt className="mt-1 text-sm text-white/60">{stat.label}</dt>
                <dd className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Kayan marka bandı */}
      <BrandMarquee />

      {/* Hizmetler */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="reveal flex items-end justify-between gap-4">
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
            <div key={service.slug} className="reveal h-full">
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      </section>

      {/* Süreç */}
      <div className="reveal border-y border-border bg-muted/40">
        <ProcessSteps heading="Nasıl çalışıyoruz?" steps={HOME_PROCESS_STEPS} />
      </div>

      {/* Sosyal kanıt bandı */}
      <section className="border-b border-border bg-white/[0.04] text-white">
        <div className="reveal mx-auto max-w-6xl px-4 py-16 text-center">
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
          <p className="mx-auto mt-3 max-w-xl text-white/75">
            Alanya&apos;daki müşterilerimizin deneyimlerini Google üzerinden
            okuyabilir, memnuniyetinizi siz de paylaşabilirsiniz.
          </p>
          {/* TODO: Kullanıcıdan gelecek gerçek Google yorum alıntıları buraya
              kart olarak eklenecek — uydurma yorum koyulmaz. */}
          <Button
            asChild
            size="lg"
            className="mt-6 bg-white text-[oklch(0.24_0.05_258)] hover:bg-white/90"
          >
            <a href={REVIEWS_HREF} target="_blank" rel="noopener">
              Google yorumlarını okuyun
            </a>
          </Button>
        </div>
      </section>

      {/* SSS */}
      <div className="reveal">
        <FaqSection faqs={GENERAL_FAQS} />
      </div>
      </div>

      <CtaSection />
    </main>
  );
}
