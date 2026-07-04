import { BUSINESS } from "@/data/business";
import type { Faq } from "@/data/faqs";
import type { Service } from "@/data/services";
import { absoluteUrl, SITE_URL } from "@/lib/seo";

const BUSINESS_ID = `${SITE_URL}/#localbusiness`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export function localBusinessSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": BUSINESS_ID,
    name: BUSINESS.name,
    slogan: BUSINESS.slogan,
    url: SITE_URL,
    telephone: BUSINESS.phoneE164,
    priceRange: "₺₺",
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.address.street,
      addressLocality: BUSINESS.address.district,
      addressRegion: BUSINESS.address.city,
      postalCode: BUSINESS.address.postalCode,
      addressCountry: BUSINESS.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS.geo.lat,
      longitude: BUSINESS.geo.lng,
    },
    openingHoursSpecification: BUSINESS.openingHours.map((slot) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: slot.days,
      opens: slot.opens,
      closes: slot.closes,
    })),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: BUSINESS.phoneE164,
      contactType: "customer service",
      availableLanguage: ["Turkish"],
    },
    areaServed: {
      "@type": "City",
      name: "Alanya",
    },
  };
}

export function webSiteSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: BUSINESS.name,
    url: SITE_URL,
    inLanguage: "tr-TR",
    publisher: { "@id": BUSINESS_ID },
  };
}

export function serviceSchema(service: Service): Record<string, unknown> {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.name,
    description: service.metaDescription,
    url: absoluteUrl(`/${service.slug}`),
    provider: { "@id": BUSINESS_ID },
    areaServed: { "@type": "City", name: "Alanya" },
  };
  if (service.priceFrom) {
    schema.offers = {
      "@type": "Offer",
      priceCurrency: "TRY",
      priceSpecification: {
        "@type": "PriceSpecification",
        minPrice: service.priceFrom,
        priceCurrency: "TRY",
      },
      availability: "https://schema.org/InStock",
      url: absoluteUrl(`/${service.slug}`),
    };
  }
  return schema;
}

export function faqPageSchema(faqs: readonly Faq[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function breadcrumbSchema(
  items: readonly { label: string; href?: string }[],
): Record<string, unknown> {
  const allItems = [{ label: "Ana Sayfa", href: "/" }, ...items];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: absoluteUrl(item.href) } : {}),
    })),
  };
}
