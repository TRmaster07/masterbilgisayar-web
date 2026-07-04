/** GTM konteyner kimliği — boşsa hiçbir analitik script yüklenmez */
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "";

/** Microsoft Clarity proje kimliği */
export const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID ?? "";

/** Onay tercihinin saklandığı localStorage anahtarı */
export const CONSENT_STORAGE_KEY = "mb-consent-v1";

export type ConsentChoice = "granted" | "denied";
