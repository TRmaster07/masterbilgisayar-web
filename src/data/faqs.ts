export type Faq = { question: string; answer: string };

/** Ana sayfa ve SSS sayfasında kullanılan genel sorular */
export const GENERAL_FAQS: readonly Faq[] = [
  {
    question: "Arıza tespiti gerçekten ücretsiz mi?",
    answer:
      "Evet. Cihazınızı getirin, arızayı ücretsiz tespit edip net fiyat bildirelim. Onarımı onaylamazsanız hiçbir ücret ödemezsiniz.",
  },
  {
    question: "Tamir işlemleri ne kadar sürüyor?",
    answer:
      "Format, bakım ve stoktaki parça değişimleri çoğunlukla aynı gün; anakart seviyesi onarımlar ortalama 1-3 iş günü sürer. Tespit sonrası size net süre bildirilir.",
  },
  {
    question: "Verdiğiniz garanti neleri kapsıyor?",
    answer:
      "Yaptığımız tüm onarımlar ve değiştirdiğimiz parçalar 1 yıl garantilidir. Aynı arıza tekrarlarsa ücretsiz olarak yeniden onarılır.",
  },
  {
    question: "Cihazımı adresten alıyor musunuz?",
    answer:
      "Alanya merkezde cihazınızı adresinizden teslim alıp onarım sonrası geri getiriyoruz. Alanya dışından kargo ile de cihaz kabul ediyoruz.",
  },
  {
    question: "Verilerim güvende olur mu?",
    answer:
      "Evet. Onarım sırasında verilerinize dokunulmaz, riskli işlemler öncesinde talebinize göre yedek alınır. Veri gizliliği bizim için ön koşuldur.",
  },
  {
    question: "Fiyatları önceden öğrenebilir miyim?",
    answer:
      "Her hizmet sayfamızda başlangıç fiyatları şeffaf şekilde yazar. Kesin fiyat, ücretsiz arıza tespiti sonrası işlem yapılmadan önce onayınıza sunulur.",
  },
];
