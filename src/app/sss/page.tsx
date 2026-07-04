import type { Metadata } from "next";
import Link from "next/link";

import { CtaSection } from "@/components/blocks/cta-section";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { GENERAL_FAQS } from "@/data/faqs";
import { SERVICES } from "@/data/services";

export const metadata: Metadata = {
  title: "Sık Sorulan Sorular",
  description:
    "Alanya bilgisayar tamiri hakkında merak edilenler: fiyatlar, garanti, teslim süreleri, veri güvenliği ve hizmetlerimizle ilgili tüm soruların cevapları.",
  alternates: { canonical: "/sss" },
};

export default function FaqPage() {
  return (
    <main className="flex-1">
      <Breadcrumbs items={[{ label: "Sık Sorulan Sorular" }]} />
      <section className="mx-auto max-w-3xl px-4 pb-14 pt-4">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Sık Sorulan Sorular
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Cevabını bulamadığınız soruları telefonla veya WhatsApp&apos;tan
          sorabilirsiniz — arıza tespiti her zaman ücretsizdir.
        </p>

        <h2 className="mt-10 text-xl font-bold tracking-tight sm:text-2xl">
          Genel sorular
        </h2>
        <Accordion type="single" collapsible className="mt-4">
          {GENERAL_FAQS.map((faq) => (
            <AccordionItem key={faq.question} value={faq.question}>
              <AccordionTrigger className="text-left text-base">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {SERVICES.map((service) => (
          <section key={service.slug} className="mt-10">
            <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
              {service.name}
            </h2>
            <Accordion type="single" collapsible className="mt-4">
              {service.faqs.map((faq) => (
                <AccordionItem key={faq.question} value={faq.question}>
                  <AccordionTrigger className="text-left text-base">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <p className="mt-3 text-sm">
              <Link
                href={`/${service.slug}`}
                className="font-medium text-primary hover:underline"
              >
                {service.title} hizmet sayfasına gidin →
              </Link>
            </p>
          </section>
        ))}
      </section>
      <CtaSection heading="Sorunuz mu var? Hemen sorun" />
    </main>
  );
}
