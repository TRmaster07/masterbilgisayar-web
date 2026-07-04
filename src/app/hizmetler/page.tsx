import type { Metadata } from "next";

import { CtaSection } from "@/components/blocks/cta-section";
import { ServiceCard } from "@/components/blocks/service-card";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { SERVICES, type Service } from "@/data/services";

export const metadata: Metadata = {
  title: { absolute: "Teknik Servis Hizmetleri Alanya | Master Bilgisayar" },
  description:
    "Alanya'da verdiğimiz tüm teknik servis hizmetleri: laptop, bilgisayar, MacBook, oyun konsolu tamiri, veri kurtarma ve yükseltme. Ücretsiz arıza tespiti.",
  alternates: { canonical: "/hizmetler" },
};

const SILO_LABELS: Record<Service["silo"], string> = {
  laptop: "Laptop Servisi",
  masaustu: "Masaüstü ve Donanım Servisi",
  apple: "Apple Servisi",
  konsol: "Oyun Konsolu Servisi",
  veri: "Veri ve Yükseltme",
  alim: "Alım ve Takas",
};

const SILO_ORDER: readonly Service["silo"][] = [
  "laptop",
  "masaustu",
  "apple",
  "konsol",
  "veri",
  "alim",
];

export default function ServicesHubPage() {
  return (
    <main className="flex-1">
      <Breadcrumbs items={[{ label: "Hizmetler" }]} />
      <section className="mx-auto max-w-6xl px-4 pb-14 pt-4">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Alanya Teknik Servis Hizmetlerimiz
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Laptop&apos;tan oyun konsoluna, veri kurtarmadan yükseltmeye — tüm
          işlemler ücretsiz arıza tespitiyle başlar, 1 yıl garantiyle teslim
          edilir.
        </p>

        {SILO_ORDER.map((silo) => {
          const group = SERVICES.filter((s) => s.silo === silo);
          if (group.length === 0) return null;
          return (
            <section key={silo} className="mt-10">
              <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                {SILO_LABELS[silo]}
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.map((service) => (
                  <ServiceCard key={service.slug} service={service} />
                ))}
              </div>
            </section>
          );
        })}
      </section>
      <CtaSection />
    </main>
  );
}
