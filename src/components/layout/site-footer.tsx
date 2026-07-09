import Link from "next/link";
import { Clock, MapPin, MessageCircle, Phone, ShieldCheck, Star } from "lucide-react";

import {
  BUSINESS,
  DIRECTIONS_HREF,
  PHONE_HREF,
  whatsappHref,
} from "@/data/business";
import { LOCATIONS } from "@/data/locations";
import { SERVICES } from "@/data/services";
import { NAV_LINKS } from "@/lib/nav";

const DAY_LABELS_TR: Record<string, string> = {
  Monday: "Pazartesi",
  Tuesday: "Salı",
  Wednesday: "Çarşamba",
  Thursday: "Perşembe",
  Friday: "Cuma",
  Saturday: "Cumartesi",
  Sunday: "Pazar",
};

const FOOTER_SERVICE_COUNT = 8;

function formatDays(days: readonly string[]): string {
  if (days.length === 1) return DAY_LABELS_TR[days[0] ?? ""] ?? "";
  const first = DAY_LABELS_TR[days[0] ?? ""];
  const last = DAY_LABELS_TR[days[days.length - 1] ?? ""];
  return `${first} – ${last}`;
}

export function SiteFooter() {
  return (
    <footer className="dark border-t border-border bg-background text-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-lg font-bold tracking-tight">
            <span className="text-primary">Master</span> Bilgisayar
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Alanya&apos;da bilgisayar, laptop, MacBook ve oyun konsolu teknik
            servisi. &ldquo;{BUSINESS.slogan}&rdquo;
          </p>
          <p className="mt-4 flex items-center gap-2 text-sm font-medium">
            <Star aria-hidden className="size-4 fill-amber-400 text-amber-400" />
            Google&apos;da {BUSINESS.rating.value} ({BUSINESS.rating.count}+ yorum)
          </p>
          <p className="mt-2 flex items-center gap-2 text-sm font-medium">
            <ShieldCheck aria-hidden className="size-4 text-primary" />
            Tüm işlemler {BUSINESS.warrantyMonths / 12} yıl garantili
          </p>
        </div>

        <nav aria-label="Hizmetler">
          <h2 className="text-sm font-semibold">Hizmetler</h2>
          <ul className="mt-3 space-y-2">
            {SERVICES.slice(0, FOOTER_SERVICE_COUNT).map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/${service.slug}`}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {service.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/hizmetler"
                className="text-sm font-medium text-primary hover:underline"
              >
                Tüm hizmetler →
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Kurumsal">
          <h2 className="text-sm font-semibold">Kurumsal</h2>
          <ul className="mt-3 space-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/kvkk"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                KVKK Aydınlatma Metni
              </Link>
            </li>
            <li>
              <Link
                href="/cerez-politikasi"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Çerez Politikası
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold">İletişim</h2>
          <address className="mt-3 space-y-3 text-sm not-italic text-muted-foreground">
            <a
              href={DIRECTIONS_HREF}
              target="_blank"
              rel="noopener"
              data-cta="directions"
              className="flex items-start gap-2 hover:text-foreground"
            >
              <MapPin aria-hidden className="mt-0.5 size-4 shrink-0" />
              {BUSINESS.address.street}, {BUSINESS.address.postalCode}{" "}
              {BUSINESS.address.district}/{BUSINESS.address.city}
            </a>
            <a
              href={PHONE_HREF}
              data-cta="call"
              className="flex items-center gap-2 font-medium text-foreground hover:text-primary"
            >
              <Phone aria-hidden className="size-4 shrink-0" />
              {BUSINESS.phoneDisplay}
            </a>
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener"
              data-cta="whatsapp"
              className="flex items-center gap-2 hover:text-foreground"
            >
              <MessageCircle aria-hidden className="size-4 shrink-0" />
              WhatsApp&apos;tan yazın
            </a>
            <div className="flex items-start gap-2">
              <Clock aria-hidden className="mt-0.5 size-4 shrink-0" />
              <ul>
                {BUSINESS.openingHours.map((slot) => (
                  <li key={slot.days.join()}>
                    {formatDays(slot.days)}: {slot.opens} – {slot.closes}
                  </li>
                ))}
                <li>Pazar: Kapalı</li>
              </ul>
            </div>
          </address>
        </div>
      </div>

      <nav
        aria-label="Hizmet bölgeleri"
        className="border-t border-border"
      >
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-5 gap-y-2 px-4 py-4">
          <h2 className="text-xs font-semibold">Hizmet Bölgeleri:</h2>
          {LOCATIONS.map((location) => (
            <Link
              key={location.slug}
              href={`/${location.slug}`}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              {location.name} Bilgisayar Tamiri
            </Link>
          ))}
        </div>
      </nav>

      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-muted-foreground">
          © {new Date().getFullYear()} {BUSINESS.name} — Alanya Bilgisayar
          Teknik Servisi. Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  );
}
