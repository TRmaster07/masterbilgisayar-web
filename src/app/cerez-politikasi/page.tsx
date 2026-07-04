import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";

export const metadata: Metadata = {
  title: "Çerez Politikası",
  description:
    "Master Bilgisayar web sitesinde kullanılan çerezler: hangi çerezler, ne amaçla kullanılır ve tercihlerinizi nasıl yönetirsiniz.",
  alternates: { canonical: "/cerez-politikasi" },
  robots: { index: false },
};

export default function CookiePolicyPage() {
  return (
    <main className="flex-1">
      <Breadcrumbs items={[{ label: "Çerez Politikası" }]} />
      <section className="mx-auto max-w-3xl space-y-5 px-4 pb-14 pt-4 text-[0.95rem] leading-7 text-foreground/90 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-foreground [&_ul]:list-disc [&_ul]:pl-5">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Çerez Politikası
        </h1>
        <p>
          Bu site, yalnızca onay vermeniz hâlinde istatistik amaçlı çerezler
          kullanır. Zorunlu çerez kullanmıyoruz; onay vermezseniz hiçbir çerez
          yazılmaz ve siteyi tüm işlevleriyle kullanmaya devam edersiniz.
        </p>

        <h2>Kullanılan çerezler (onay sonrası)</h2>
        <ul>
          <li>
            <strong>Google Analytics (GA4):</strong> Sayfa görüntüleme ve
            etkileşim istatistikleri — hangi sayfaların ziyaret edildiğini
            anonim olarak ölçer.
          </li>
          <li>
            <strong>Microsoft Clarity:</strong> Anonim kullanım kaydı (ısı
            haritası) — siteyi iyileştirmemize yardımcı olur.
          </li>
        </ul>

        <h2>Tercihinizi değiştirmek</h2>
        <p>
          Çerez tercihinizi tarayıcınızın site verilerini temizleyerek
          sıfırlayabilirsiniz; bir sonraki ziyaretinizde onay ekranı yeniden
          gösterilir. Ayrıntılı bilgi için KVKK Aydınlatma Metnimize
          bakabilirsiniz.
        </p>

        <p className="text-sm text-muted-foreground">
          Son güncelleme: 4 Temmuz 2026.
        </p>
      </section>
    </main>
  );
}
