import { MapPin, MessageCircle, Phone } from "lucide-react";

import { DIRECTIONS_HREF, PHONE_HREF, whatsappHref } from "@/data/business";

const WHATSAPP_PRESET_MESSAGE =
  "Merhaba, cihazım için arıza tespiti yaptırmak istiyorum.";

/**
 * Mobilde her sayfada görünen sabit alt CTA barı.
 * Saf link'lerden oluşur — JS gerektirmez (INP maliyeti sıfır).
 */
export function MobileCtaBar() {
  return (
    <nav
      aria-label="Hızlı iletişim"
      className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-3 border-t border-border bg-background pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <a
        href={PHONE_HREF}
        data-cta="call"
        className="flex h-14 flex-col items-center justify-center gap-0.5 text-xs font-medium text-primary"
      >
        <Phone aria-hidden className="size-5" />
        Hemen Ara
      </a>
      <a
        href={whatsappHref(WHATSAPP_PRESET_MESSAGE)}
        target="_blank"
        rel="noopener"
        data-cta="whatsapp"
        className="flex h-14 flex-col items-center justify-center gap-0.5 text-xs font-medium text-whatsapp"
      >
        <MessageCircle aria-hidden className="size-5" />
        WhatsApp
      </a>
      <a
        href={DIRECTIONS_HREF}
        target="_blank"
        rel="noopener"
        data-cta="directions"
        className="flex h-14 flex-col items-center justify-center gap-0.5 text-xs font-medium text-foreground"
      >
        <MapPin aria-hidden className="size-5" />
        Yol Tarifi
      </a>
    </nav>
  );
}
