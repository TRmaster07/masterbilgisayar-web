import type { Metadata } from "next";
import {
  BadgeCheck,
  Camera,
  HandCoins,
  MapPin,
  Recycle,
  ShieldCheck,
  Star,
} from "lucide-react";

import { CtaSection } from "@/components/blocks/cta-section";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { BUSINESS } from "@/data/business";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "Master Bilgisayar: Alanya'da komponent seviyesinde onarım yapan teknik servis. 'Arıza çöpe gitmez' prensibi, 1 yıl garanti ve Google'da 4.9 puan.",
  alternates: { canonical: "/hakkimizda" },
};

const PRINCIPLES = [
  {
    icon: Recycle,
    title: "Arıza çöpe gitmez",
    description:
      "Yetkili servislerin 'değişmesi gerek' dediği anakart, ekran kartı ve entegrelerin çoğu, atölyemizde çip seviyesinde onarılır. Bu hem bütçenizi hem de çevreyi korur.",
  },
  {
    icon: ShieldCheck,
    title: "1 yıl garanti",
    description:
      "Yaptığımız her onarımın ve taktığımız her parçanın arkasındayız. Aynı arıza tekrar ederse ücretsiz gideririz.",
  },
  {
    icon: HandCoins,
    title: "Şeffaf fiyat",
    description:
      "Arıza tespiti ücretsizdir. Net fiyat onarım başlamadan önce bildirilir; onayınız olmadan hiçbir işlem yapılmaz.",
  },
  {
    icon: BadgeCheck,
    title: "Dürüst yönlendirme",
    description:
      "Onarım cihazın değerine göre ekonomik değilse bunu açıkça söyler, yükseltme veya takas gibi daha mantıklı seçenekler sunarız.",
  },
] as const;

export default function AboutPage() {
  return (
    <main className="flex-1">
      <Breadcrumbs items={[{ label: "Hakkımızda" }]} />
      <section className="mx-auto max-w-6xl px-4 pb-14 pt-4">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Hakkımızda
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
          Master Bilgisayar, Alanya {BUSINESS.address.street} adresinde hizmet
          veren bilgisayar teknik servisidir. Laptop, masaüstü, MacBook ve oyun
          konsollarını komponent seviyesinde onarıyor; veri kurtarma, yükseltme
          ve arızalı cihaz alımı yapıyoruz.
        </p>

        <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium">
          <span className="flex items-center gap-2">
            <Star aria-hidden className="size-4 fill-amber-400 text-amber-400" />
            Google&apos;da {BUSINESS.rating.value} puan ({BUSINESS.rating.count}+
            yorum)
          </span>
          <span className="flex items-center gap-2">
            <MapPin aria-hidden className="size-4 text-primary" />
            {BUSINESS.address.district} merkezde, kolay ulaşılır konum
          </span>
        </div>

        <h2 className="mt-12 text-2xl font-bold tracking-tight sm:text-3xl">
          Çalışma prensiplerimiz
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {PRINCIPLES.map((principle) => (
            <article
              key={principle.title}
              className="rounded-xl border border-border bg-card p-5"
            >
              <h3 className="flex items-center gap-2 font-semibold">
                <principle.icon aria-hidden className="size-5 text-primary" />
                {principle.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {principle.description}
              </p>
            </article>
          ))}
        </div>

        {/* TODO: Gerçek servis/atölye fotoğrafları geldiğinde bu bölüm
            next/image galerisiyle değiştirilecek — stok görsel kullanılmaz. */}
        <div className="mt-12 flex items-center gap-3 rounded-xl border border-dashed border-border bg-muted/40 p-6 text-sm text-muted-foreground">
          <Camera aria-hidden className="size-5 shrink-0" />
          Atölyemizden ve tamir süreçlerimizden gerçek fotoğraflar yakında bu
          bölümde yer alacak.
        </div>
      </section>
      <CtaSection heading="Cihazınızı güvenle bize emanet edin" />
    </main>
  );
}
