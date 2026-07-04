"use client";

import Link from "next/link";

import { applyConsent, useConsent } from "@/components/analytics/use-consent";
import { Button } from "@/components/ui/button";
import { CLARITY_ID, GTM_ID } from "@/lib/analytics";

export function ConsentBanner() {
  const consent = useConsent();

  // Analitik kurulu değilse veya kullanıcı zaten seçim yaptıysa gösterme
  if ((!GTM_ID && !CLARITY_ID) || consent !== null) return null;

  return (
    <div
      role="dialog"
      aria-label="Çerez tercihi"
      className="fixed inset-x-3 bottom-16 z-[60] rounded-xl border border-border bg-background p-4 shadow-lg sm:left-auto sm:right-4 sm:max-w-sm md:bottom-4"
    >
      <p className="text-sm">
        Deneyimi iyileştirmek için anonim kullanım istatistikleri topluyoruz.
        Detaylar:{" "}
        <Link href="/kvkk" className="font-medium text-primary underline">
          KVKK Aydınlatma Metni
        </Link>
      </p>
      <div className="mt-3 flex gap-2">
        <Button size="sm" onClick={() => applyConsent("granted")}>
          Kabul et
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => applyConsent("denied")}
        >
          Reddet
        </Button>
      </div>
    </div>
  );
}
