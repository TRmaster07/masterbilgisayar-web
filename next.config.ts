import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Eski domain → yeni domain (SEO değerini taşıyan kalıcı yönlendirme).
      // Yayın günü eski sitenin URL listesi çıkarıldığında, path bazlı birebir
      // eşlemeler bu listenin ÜSTÜNE eklenecek (spesifik kural önce gelir).
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.alanyabilgisayartamiri.com" }],
        destination: "https://masterbilgisayar.tr/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "alanyabilgisayartamiri.com" }],
        destination: "https://masterbilgisayar.tr/:path*",
        permanent: true,
      },
      // www → apex kanonikleştirme
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.masterbilgisayar.tr" }],
        destination: "https://masterbilgisayar.tr/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
