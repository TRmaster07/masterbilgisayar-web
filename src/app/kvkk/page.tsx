import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { BUSINESS } from "@/data/business";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni",
  description:
    "Master Bilgisayar KVKK aydınlatma metni: hangi kişisel veriler, hangi amaçla işlenir; haklarınız ve başvuru yolları hakkında bilgilendirme.",
  alternates: { canonical: "/kvkk" },
  robots: { index: false },
};

export default function KvkkPage() {
  return (
    <main className="flex-1">
      <Breadcrumbs items={[{ label: "KVKK Aydınlatma Metni" }]} />
      <section className="prose-legal mx-auto max-w-3xl space-y-5 px-4 pb-14 pt-4 text-[0.95rem] leading-7 text-foreground/90 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-foreground [&_ul]:list-disc [&_ul]:pl-5">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          KVKK Aydınlatma Metni
        </h1>
        <p>
          6698 sayılı Kişisel Verilerin Korunması Kanunu (&ldquo;KVKK&rdquo;)
          kapsamında, veri sorumlusu sıfatıyla {BUSINESS.name} (
          {BUSINESS.address.street}, {BUSINESS.address.postalCode}{" "}
          {BUSINESS.address.district}/{BUSINESS.address.city}) tarafından
          kişisel verilerinizin işlenmesine ilişkin olarak bilgilendirilmeniz
          amacıyla hazırlanmıştır.
        </p>

        <h2>Hangi veriler işlenir?</h2>
        <ul>
          <li>
            <strong>İletişim verileri:</strong> Bize telefon veya WhatsApp
            üzerinden ulaştığınızda adınız, telefon numaranız ve ilettiğiniz
            arıza bilgisi.
          </li>
          <li>
            <strong>Servis kayıtları:</strong> Cihaz teslimi sırasında verilen
            ad-soyad, telefon ve cihaz bilgileri (servis fişi ve garanti takibi
            için).
          </li>
          <li>
            <strong>Site kullanım verileri:</strong> Onay vermeniz hâlinde
            anonimleştirilmiş ziyaret istatistikleri (Google Analytics,
            Microsoft Clarity). Web sitemizdeki teklif formu bilgileri
            sunucularımızda saklanmaz; mesajınız doğrudan WhatsApp uygulamanız
            üzerinden iletilir.
          </li>
        </ul>

        <h2>İşleme amaçları ve hukuki sebep</h2>
        <p>
          Verileriniz; servis hizmetinin sunulması, garanti yükümlülüklerinin
          yerine getirilmesi ve talebinize dönüş yapılması amacıyla, KVKK m.5
          kapsamında sözleşmenin kurulması/ifası ve meşru menfaat hukuki
          sebeplerine dayanılarak işlenir. Site istatistikleri yalnızca açık
          rızanıza (çerez onayı) dayanır.
        </p>

        <h2>Aktarım</h2>
        <p>
          Kişisel verileriniz pazarlama amacıyla üçüncü kişilerle paylaşılmaz.
          Analitik hizmet sağlayıcıları (Google, Microsoft) çerez onayınız
          kapsamında yurt dışında sunucularda veri işleyebilir.
        </p>

        <h2>Saklama süresi</h2>
        <p>
          Servis ve garanti kayıtları, garanti süresi ve yasal saklama
          yükümlülükleri boyunca; iletişim kayıtları talebinizin
          sonuçlandırılmasından itibaren makul süreyle saklanır.
        </p>

        <h2>Haklarınız</h2>
        <p>
          KVKK m.11 uyarınca verilerinize erişme, düzeltilmesini veya
          silinmesini isteme, işlemeye itiraz etme haklarına sahipsiniz.
          Başvurularınızı {BUSINESS.phoneDisplay} numaralı telefondan veya
          mağazamızdan yazılı olarak iletebilirsiniz.
        </p>

        <p className="text-sm text-muted-foreground">
          Bu metin genel bilgilendirme amaçlıdır; nihai hukuki geçerlilik için
          bir hukuk danışmanına inceletilmesi önerilir. Son güncelleme:
          4 Temmuz 2026.
        </p>
      </section>
    </main>
  );
}
