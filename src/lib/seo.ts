import { BUSINESS } from "@/data/business";

export const SITE_URL = BUSINESS.domain;

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}
