import { z } from "zod";

const OpeningHoursSchema = z.object({
  /** Schema.org dayOfWeek değerleri */
  days: z.array(
    z.enum([
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ]),
  ),
  opens: z.string().regex(/^\d{2}:\d{2}$/),
  closes: z.string().regex(/^\d{2}:\d{2}$/),
});

const BusinessSchema = z.object({
  name: z.string(),
  slogan: z.string(),
  domain: z.url(),
  phoneE164: z.string().regex(/^\+\d{10,15}$/),
  phoneDisplay: z.string(),
  whatsappE164: z.string().regex(/^\d{10,15}$/),
  email: z.email().nullable(),
  address: z.object({
    street: z.string(),
    district: z.string(),
    city: z.string(),
    postalCode: z.string(),
    country: z.literal("TR"),
  }),
  /* TODO: Kesin koordinatları Google Business Profile'dan alıp güncelle */
  geo: z.object({ lat: z.number(), lng: z.number() }),
  rating: z.object({ value: z.number(), count: z.number() }),
  warrantyMonths: z.number(),
  openingHours: z.array(OpeningHoursSchema),
});

export type Business = z.infer<typeof BusinessSchema>;

export const BUSINESS: Business = BusinessSchema.parse({
  name: "Master Bilgisayar",
  slogan: "Arıza çöpe gitmez.",
  domain: "https://masterbilgisayar.tr",
  phoneE164: "+905061545174",
  phoneDisplay: "0506 154 51 74",
  whatsappE164: "905061545174",
  email: null, // TODO: işletme e-postası netleşince ekle
  address: {
    street: "Güller Pınarı Mah. Yenilmez Cd. No:41",
    district: "Alanya",
    city: "Antalya",
    postalCode: "07400",
    country: "TR",
  },
  geo: { lat: 36.5449, lng: 31.9954 },
  rating: { value: 4.9, count: 166 },
  warrantyMonths: 12,
  openingHours: [
    // TODO: Hafta içi saatleri işletmeden teyit et (Cumartesi 09:10 teyitli)
    {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "19:00",
    },
    { days: ["Saturday"], opens: "09:10", closes: "19:00" },
  ],
});

export const PHONE_HREF = `tel:${BUSINESS.phoneE164}`;

export function whatsappHref(message?: string): string {
  const base = `https://wa.me/${BUSINESS.whatsappE164}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/* TODO: GBP kısa linki netleşince gerçek "yorum yaz/oku" linkiyle değiştir */
export const REVIEWS_HREF = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  "Master Bilgisayar Alanya Yenilmez Caddesi",
)}`;

export const DIRECTIONS_HREF = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  `${BUSINESS.name}, ${BUSINESS.address.street}, ${BUSINESS.address.district}/${BUSINESS.address.city}`,
)}`;
