import { MessageCircle, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { BUSINESS, PHONE_HREF, whatsappHref } from "@/data/business";

export function CtaSection({
  heading = "Cihazınız mı arızalandı?",
  description = "Hemen arayın veya WhatsApp'tan yazın — arıza tespiti ücretsiz, tüm işlemler 1 yıl garantili.",
  whatsappMessage,
}: {
  heading?: string;
  description?: string;
  whatsappMessage?: string;
}) {
  return (
    // Koyu temada da kraliyet mavisi kalması için renkler sabitlendi
    <section className="bg-[oklch(0.45_0.17_258)]">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-4 py-14 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          {heading}
        </h2>
        <p className="max-w-xl text-white/85">{description}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button
            asChild
            size="lg"
            className="bg-white text-[oklch(0.21_0.05_262)] hover:bg-white/90"
          >
            <a href={PHONE_HREF} data-cta="call">
              <Phone aria-hidden /> {BUSINESS.phoneDisplay}
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            className="bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/85"
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
        </div>
      </div>
    </section>
  );
}
