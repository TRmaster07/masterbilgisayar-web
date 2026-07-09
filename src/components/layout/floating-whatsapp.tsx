import { MessageCircle } from "lucide-react";

import { whatsappHref } from "@/data/business";

/**
 * Masaüstünde her sayfada sağ altta duran WhatsApp butonu.
 * Mobilde gizli — orada MobileCtaBar aynı işi görüyor.
 */
export function FloatingWhatsapp() {
  return (
    <a
      href={whatsappHref("Merhaba, cihazım için ücretsiz arıza tespiti istiyorum.")}
      target="_blank"
      rel="noopener"
      data-cta="whatsapp"
      aria-label="WhatsApp'tan yazın"
      className="fixed right-6 bottom-6 z-50 hidden size-14 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-lg transition-transform hover:scale-105 md:flex"
    >
      <MessageCircle aria-hidden className="size-7" />
    </a>
  );
}
