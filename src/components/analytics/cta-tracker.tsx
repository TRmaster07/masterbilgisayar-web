"use client";

import { useEffect } from "react";

/**
 * data-cta öznitelikli tüm tıklamaları dataLayer'a iletir.
 * GTM tarafında tek "cta_click" özel olayı ile GA4'e eşlenir
 * (cta_type: call | whatsapp | whatsapp-form | directions).
 */
export function CtaTracker() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = (event.target as HTMLElement).closest<HTMLElement>(
        "[data-cta]",
      );
      if (!target) return;
      window.dataLayer?.push({
        event: "cta_click",
        cta_type: target.dataset.cta,
        page_path: window.location.pathname,
      });
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
