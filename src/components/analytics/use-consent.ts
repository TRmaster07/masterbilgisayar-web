"use client";

import { useSyncExternalStore } from "react";

import { CONSENT_STORAGE_KEY, type ConsentChoice } from "@/lib/analytics";

export const CONSENT_EVENT = "mb-consent";

/** SSR sırasında dönen değer — banner sunucuda asla render edilmez */
const SSR_SENTINEL = "ssr";

function subscribe(callback: () => void) {
  window.addEventListener(CONSENT_EVENT, callback);
  return () => window.removeEventListener(CONSENT_EVENT, callback);
}

function getSnapshot(): string | null {
  try {
    return localStorage.getItem(CONSENT_STORAGE_KEY);
  } catch {
    return SSR_SENTINEL;
  }
}

function getServerSnapshot(): string {
  return SSR_SENTINEL;
}

/**
 * Kullanıcının çerez tercihi: null = henüz seçmedi,
 * "granted"/"denied" = seçti, "ssr" = sunucu render'ı.
 */
export function useConsent(): string | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function applyConsent(choice: ConsentChoice) {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch {
    /* localStorage kapalıysa sessizce geç */
  }
  // GTM consent komutları "arguments" nesnesi bekler (resmî gtag deseni)
  window.dataLayer = window.dataLayer ?? [];
  function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer?.push(arguments);
  }
  // @ts-expect-error -- gtag imzası bilinçli olarak arguments üzerinden çalışır
  gtag("consent", "update", { analytics_storage: choice });
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: choice }));
}

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}
