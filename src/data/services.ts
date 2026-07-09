import { z } from "zod";

/**
 * Sitenin tek doğruluk kaynağı: hizmet sayfaları, sitemap, schema markup ve
 * iç linkler bu dosyadan türetilir.
 *
 * TODO (FİYAT): Tüm priceFrom değerleri geçici yer tutucudur; işletme
 * sahibiyle birlikte netleştirilecek.
 */

const ProcessStepSchema = z.object({
  title: z.string(),
  description: z.string(),
});

const FaqSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

const ServiceSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  /** Kısa ad (kart ve menülerde) */
  name: z.string(),
  /** H1 */
  title: z.string(),
  metaTitle: z.string().max(60),
  metaDescription: z.string().min(70).max(160),
  primaryKeyword: z.string(),
  /** Kart ve giriş paragrafı özeti */
  excerpt: z.string(),
  silo: z.enum(["laptop", "masaustu", "apple", "konsol", "veri", "alim"]),
  symptoms: z.array(z.string()).min(4),
  audience: z.array(z.string()).min(2),
  process: z.array(ProcessStepSchema).min(3),
  /** Ortalama teslim süresi (insan okunur) */
  turnaround: z.string(),
  /** TL cinsinden "başlangıç" fiyatı; teklif usulü işlerde null */
  priceFrom: z.number().positive().nullable(),
  priceNote: z.string(),
  faqs: z.array(FaqSchema).min(3),
  /**
   * Uzun-kuyruk aramaları hedefleyen, iç link veren markdown içerik blokları.
   * Her hizmet için özgün yazılır — şablon kopyası (doorway) YASAKTIR.
   */
  deepDives: z
    .array(z.object({ title: z.string(), bodyMd: z.string().min(200) }))
    .min(2),
  /** İlgili hizmet slug'ları (iç link silosu) */
  related: z.array(z.string()).min(2),
});

export type Service = z.infer<typeof ServiceSchema>;

const services: Service[] = [
  {
    slug: "laptop-tamiri",
    name: "Laptop Tamiri",
    title: "Alanya Laptop Tamiri",
    metaTitle: "Laptop Tamiri Alanya | 1 Yıl Garantili",
    metaDescription:
      "Alanya'da tüm marka laptop tamiri: açılmama, ekran, menteşe, şarj ve anakart arızaları. Ücretsiz arıza tespiti, 1 yıl garanti. Aynı gün dönüş.",
    primaryKeyword: "laptop tamiri alanya",
    excerpt:
      "Açılmayan, ısınan, ekranı kırılan veya şarj olmayan laptopunuz için Alanya merkezde komponent seviyesinde onarım.",
    silo: "laptop",
    symptoms: [
      "Laptop hiç açılmıyor veya güç ışığı yanıp sönüyor",
      "Ekran karanlık, çizgili veya kırık",
      "Şarj olmuyor ya da adaptör takılıyken kapanıyor",
      "Aşırı ısınma ve fan sesi, oyun sırasında kapanma",
      "Klavye veya touchpad tepki vermiyor",
      "Menteşe kırık, kapak kapanmıyor",
    ],
    audience: [
      "Günlük kullanıcılar ve öğrenciler",
      "Oyuncular (gaming laptop sahipleri)",
      "Evden çalışanlar ve yazılımcılar",
      "Küçük işletmeler",
    ],
    process: [
      {
        title: "Ücretsiz arıza tespiti",
        description:
          "Cihazınızı mağazada veya adresinizden teslim alarak inceliyoruz; arızanın kaynağını ve net fiyatı size bildiriyoruz.",
      },
      {
        title: "Onay ve onarım",
        description:
          "Onayınız olmadan hiçbir işlem yapılmaz. Onarım komponent seviyesinde, mikroskop altında gerçekleştirilir.",
      },
      {
        title: "Test süreci",
        description:
          "Onarılan cihaz yük testi, ısı testi ve stabilite testinden geçirilir.",
      },
      {
        title: "Teslim ve garanti",
        description:
          "Cihazınız 1 yıl garanti belgesiyle teslim edilir; Alanya merkezde adrese teslim mümkündür.",
      },
    ],
    turnaround: "Çoğu arızada aynı gün – 3 iş günü",
    priceFrom: 950,
    priceNote: "Arıza tespiti ücretsizdir; net fiyat onarım öncesi bildirilir.",
    faqs: [
      {
        question: "Laptop tamiri ne kadar sürer?",
        answer:
          "Yazılım ve basit donanım arızaları çoğunlukla aynı gün teslim edilir. Anakart seviyesi onarımlar ve parça temini gereken işler ortalama 1-3 iş günü sürer.",
      },
      {
        question: "Arıza tespiti ücretli mi?",
        answer:
          "Hayır. Arıza tespiti tamamen ücretsizdir; onarımı onaylamazsanız herhangi bir ücret ödemezsiniz.",
      },
      {
        question: "Hangi marka laptopları tamir ediyorsunuz?",
        answer:
          "Asus, Lenovo, HP, Dell, Acer, MSI, Monster, Casper, Huawei ve Apple dahil tüm markalara servis veriyoruz.",
      },
      {
        question: "Verilerim güvende olur mu?",
        answer:
          "Evet. Onarım sırasında verilerinize dokunulmaz; riskli işlemlerden önce talebinize göre yedekleme yapılır.",
      },
    ],
    deepDives: [
      {
        title: "Alanya'da laptop tamiri: yetkili servise gitmeden önce okuyun",
        bodyMd:
          "Laptopunuz arızalandığında ilk duyacağınız öneri çoğunlukla \"yetkili servise götürün, parça değişsin\" olur. Oysa açılmama, şarj devresi arızası, ısınma ve güç sorunlarının büyük bölümü parça değişimi değil, **komponent seviyesinde onarım** gerektirir: anakart üzerindeki mosfet, şarj entegresi veya güç katındaki tek bir bileşenin mikroskop altında değişmesiyle cihaz kurtarılır. Bu yaklaşım hem maliyeti ciddi oranda düşürür hem de verileriniz cihazda kalır. Atölyemizde arıza tespiti ücretsizdir: laptopunuzu Alanya merkezdeki mağazamıza getirin ya da [adresten teslim alalım](/iletisim); arızanın kaynağını ve net fiyatı onarım başlamadan önce bildiririz. Karmaşık anakart arızaları için [çip seviyesi anakart tamiri](/anakart-tamiri) sayfamıza da göz atabilirsiniz.",
      },
      {
        title: "Gaming laptop ısınma ve performans sorunları",
        bodyMd:
          "Alanya'nın sıcak ikliminde gaming laptoplar kışın sorunsuz çalışırken yazın oyun ortasında kapanmaya, FPS düşüşüne ve yüksek fan sesine başlayabilir. Bunun en yaygın nedeni kurumuş termal macun ve toz dolmuş soğutma kanallarıdır; ihmal edildiğinde ekran kartı ve işlemcinin güç katmanına kalıcı hasar verir. Termal bakım çoğunlukla aynı gün teslim edilir — düzenli bakım için [bilgisayar bakım ve temizlik](/bilgisayar-bakim) hizmetimize bakın. Oyun sırasında ekranda çizgi, artefakt veya sürücü çökmesi görüyorsanız sorun termalden çıkmış, GPU tarafına ilerlemiş olabilir; bu durumda [ekran kartı tamiri](/ekran-karti-tamiri) kapsamında çip seviyesi teşhis yapıyoruz. Yavaşlık şikâyetinin donanım arızası değil disk darboğazı olduğu durumlarda ise [SSD yükseltme](/ssd-ram-yukseltme) en kalıcı çözümdür.",
      },
    ],
    related: ["laptop-ekran-degisimi", "anakart-tamiri", "ssd-ram-yukseltme"],
  },
  {
    slug: "bilgisayar-tamiri",
    name: "Bilgisayar Tamiri",
    title: "Alanya Bilgisayar Tamiri",
    metaTitle: "Bilgisayar Tamiri Alanya | Masaüstü PC Servisi",
    metaDescription:
      "Alanya'da masaüstü bilgisayar tamiri: açılmama, mavi ekran, donma, güç kaynağı ve donanım arızaları. Ücretsiz tespit, 1 yıl garanti.",
    primaryKeyword: "bilgisayar tamiri alanya",
    excerpt:
      "Açılmayan, donan veya mavi ekran veren masaüstü bilgisayarınız için hızlı ve garantili çözüm.",
    silo: "masaustu",
    symptoms: [
      "Bilgisayar hiç açılmıyor veya kendini yeniden başlatıyor",
      "Mavi ekran (BSOD) hataları",
      "Aşırı yavaşlama ve donmalar",
      "Görüntü gelmiyor, sinyal yok uyarısı",
      "Güç kaynağından ses veya yanık kokusu",
    ],
    audience: [
      "Ev kullanıcıları",
      "Oyun bilgisayarı sahipleri",
      "Ofisler ve kurumsal firmalar",
    ],
    process: [
      {
        title: "Ücretsiz arıza tespiti",
        description:
          "Kasanızı test donanımlarımızla parça parça test ederek arızalı bileşeni kesin olarak belirliyoruz.",
      },
      {
        title: "Fiyat onayı",
        description:
          "Tespit sonrası net fiyat bildirilir; onayınız olmadan işlem yapılmaz.",
      },
      {
        title: "Onarım veya parça değişimi",
        description:
          "Arızalı bileşen onarılır ya da orijinal/uyumlu parça ile değiştirilir.",
      },
      {
        title: "Test ve teslim",
        description:
          "Sistem stres testinden geçirilir, 1 yıl garantiyle teslim edilir.",
      },
    ],
    turnaround: "Aynı gün – 2 iş günü",
    priceFrom: 750,
    priceNote: "Arıza tespiti ücretsizdir.",
    faqs: [
      {
        question: "Bilgisayarım açılmıyor, sorun ne olabilir?",
        answer:
          "En sık nedenler güç kaynağı arızası, RAM teması, anakart arızası veya işlemci sorunlarıdır. Ücretsiz tespit ile kesin nedeni aynı gün bildiriyoruz.",
      },
      {
        question: "Yerinde (adreste) servis veriyor musunuz?",
        answer:
          "Alanya merkezde cihazınızı adresinizden alıp onarım sonrası teslim ediyoruz; kurumsal müşterilere yerinde müdahale de yapıyoruz.",
      },
      {
        question: "Eski bilgisayarımı tamir ettirmek mantıklı mı?",
        answer:
          "Çoğu durumda evet — prensibimiz 'arıza çöpe gitmez'. Onarım maliyeti cihaz değerini aşıyorsa dürüstçe söyler, yükseltme veya arızalı alım seçeneği sunarız.",
      },
    ],
    deepDives: [
      {
        title: "Bilgisayar açılmıyor: güç kaynağından anakarta adım adım teşhis",
        bodyMd:
          "Masaüstü bilgisayar hiç tepki vermiyorsa sorun çoğunlukla güç zincirinin bir halkasındadır: priz ve kablodan başlayıp güç kaynağı (PSU), anakart güç katı, RAM ve işlemciye kadar uzanan bu zinciri atölyemizde sırayla ve ölçerek test ediyoruz. \"Açılmıyor\" şikâyetiyle gelen cihazların önemli bir kısmında suçlu sanılan parça sağlam çıkar; körleme parça değiştirmek yerine ölçüm yapmak hem paranızı hem sağlam parçalarınızı korur. Fanlar dönüyor ama görüntü gelmiyorsa RAM, ekran kartı veya anakart devrede demektir — bu senaryoda [çip seviyesi anakart tamiri](/anakart-tamiri) deneyimimiz devreye girer. Arıza tespiti her durumda ücretsizdir; onarımı onaylamazsanız ücret ödemezsiniz.",
      },
      {
        title: "Mavi ekran (BSOD) ve donma sorunlarına kalıcı çözüm",
        bodyMd:
          "Sürekli mavi ekran veren ya da rastgele donan bir bilgisayarda sorun yazılımda da donanımda da olabilir — ikisini ayırt etmeden format atmak çoğu zaman zaman kaybıdır. Atölyemizde önce RAM testi, disk sağlık analizi ve sıcaklık izlemesi yapıyor; donanım temizse sürücü ve sistem kaynaklı nedenlere geçiyoruz. Diskin ömrünü tamamladığı durumlarda [verileriniz korunarak SSD yükseltme](/ssd-ram-yukseltme) hem sorunu çözer hem bilgisayarı gözle görülür hızlandırır. Yazılım kaynaklı sorunlarda ise [yedekli format ve lisanslı Windows kurulumu](/format-windows-kurulumu) ile cihazınızı ilk günkü kararlılığına döndürüyoruz. Amaç aynı arızayla bir daha karşılaşmamanız — tüm işlemler 1 yıl garantilidir.",
      },
    ],
    related: ["anakart-tamiri", "bilgisayar-bakim", "format-windows-kurulumu"],
  },
  {
    slug: "macbook-tamiri",
    name: "MacBook Tamiri",
    title: "Alanya MacBook ve iMac Tamiri",
    metaTitle: "MacBook Tamiri Alanya | iMac Servisi",
    metaDescription:
      "Alanya'da MacBook Air, MacBook Pro ve iMac tamiri: açılmama, ekran, batarya ve anakart onarımı. Yetkili servisten uygun fiyat, 1 yıl garanti.",
    primaryKeyword: "macbook tamiri alanya",
    excerpt:
      "MacBook Air, MacBook Pro ve iMac cihazlarınız için Alanya'da komponent seviyesinde, veri kaybı olmadan onarım.",
    silo: "apple",
    symptoms: [
      "MacBook açılmıyor veya elma logosunda kalıyor",
      "Batarya şişmesi ya da hızlı tükenme",
      "Ekranda çizgi, leke veya görüntü yok",
      "Sıvı teması sonrası açılmama",
      "Klavye tuşları çalışmıyor",
      "iMac yavaşladı veya görüntü vermiyor",
    ],
    audience: [
      "MacBook ile çalışan profesyoneller",
      "Grafiker, yazılımcı ve içerik üreticileri",
      "iMac kullanan ofisler",
    ],
    process: [
      {
        title: "Ücretsiz tespit",
        description:
          "Cihaz seri numarası üzerinden model geçmişi incelenir, arıza mikroskop altında teşhis edilir.",
      },
      {
        title: "Veri güvenliği",
        description:
          "Onarım öncesi talep halinde verileriniz yedeklenir; Apple cihazlarda veri gizliliği esastır.",
      },
      {
        title: "Komponent seviyesi onarım",
        description:
          "Anakart üzerindeki arızalı entegre kart komple değiştirilmez, çip seviyesinde onarılır — bu yetkili servise göre ciddi maliyet avantajı sağlar.",
      },
      {
        title: "Test ve garanti",
        description:
          "macOS üzerinde tam donanım testi yapılır, cihaz 1 yıl garantiyle teslim edilir.",
      },
    ],
    turnaround: "1 – 3 iş günü",
    priceFrom: 1500,
    priceNote:
      "Model ve arızaya göre değişir; tespit sonrası net fiyat bildirilir.",
    faqs: [
      {
        question: "Yetkili servis yerine neden sizi tercih edeyim?",
        answer:
          "Yetkili servisler çoğu arızada parça (ör. tüm anakart) değişimi önerir. Biz çip seviyesinde onarım yaptığımız için maliyet genellikle çok daha düşüktür ve verileriniz cihazda kalır.",
      },
      {
        question: "Sıvı temas eden MacBook kurtulur mu?",
        answer:
          "Erken müdahale edilirse çoğunlukla evet. Cihazı şarja takmayın, kapatın ve en kısa sürede getirin; ultrasonik temizlik ile oksitlenme durdurulur.",
      },
      {
        question: "MacBook tamirinde verilerim silinir mi?",
        answer:
          "Hayır. Donanım onarımlarında verilere dokunulmaz; disk değişimi gereken durumlarda önce yedekleme seçeneği sunulur.",
      },
    ],
    deepDives: [
      {
        title: "MacBook sıvı teması: ilk 24 saat neden kritik?",
        bodyMd:
          "MacBook'a çay, kahve veya deniz suyu temas ettiğinde asıl hasarı sıvının kendisi değil, sonraki günlerde ilerleyen **korozyon** verir. Cihaz o an çalışıyor olsa bile anakart üzerindeki iyonlu kalıntılar devreleri sessizce aşındırır; \"iki gün sonra açılmadı\" vakalarının tipik nedeni budur. Yapmanız gereken: cihazı kapatın, şarja takmayın ve en kısa sürede getirin. Atölyemizde anakart sökülür, ultrasonik temizlik yapılır ve hasar gören komponentler mikroskop altında değiştirilir. Bu vakalarda önceliğimiz her zaman verilerinizdir — gerekirse önce [veri kurtarma](/veri-kurtarma) yapılır, onarım sonra gelir. Ayrıntılı ilk yardım adımları için [MacBook sıvı teması rehberimizi](/blog/macbook-sivi-temasi-ilk-yardim) okuyabilirsiniz.",
      },
      {
        title: "Yetkili servis \"anakart komple değişmeli\" dediyse",
        bodyMd:
          "Apple yetkili servislerinin standart yaklaşımı arızalı anakartı komple değiştirmektir — bu, cihazın değerine yaklaşan bir fatura ve çoğu zaman verilerinizin kaybı demektir. Oysa MacBook anakartlarındaki arızaların büyük bölümü tek bir güç entegresinin, şarj devresinin veya mosfetin arızasından ibarettir ve [çip seviyesinde](/anakart-tamiri) onarılabilir. Alanya ve çevresindeki yabancı yerleşimcilerden bu nedenle çok sayıda MacBook talebi alıyoruz; yurt dışı garanti geçmişi ve farklı klavye düzenleri konusunda deneyimliyiz, WhatsApp üzerinden İngilizce de yazabilirsiniz. Batarya şişmesi, açılmama ve ekran arızalarında ücretsiz tespitle net fiyatı önceden bildiririz; onarımlar 1 yıl garantilidir. Yavaşlayan eski model MacBook'lar için [SSD yükseltme](/ssd-ram-yukseltme) da ekonomik bir alternatiftir.",
      },
    ],
    related: ["veri-kurtarma", "anakart-tamiri", "ssd-ram-yukseltme"],
  },
  {
    slug: "anakart-tamiri",
    name: "Anakart Tamiri",
    title: "Alanya Anakart Tamiri",
    metaTitle: "Anakart Tamiri Alanya | Çip Seviyesi Onarım",
    metaDescription:
      "Alanya'da laptop ve masaüstü anakart tamiri: kısa devre, sıvı teması, mosfet ve chipset onarımı. Mikroskop altında çip seviyesi müdahale, 1 yıl garanti.",
    primaryKeyword: "anakart tamiri alanya",
    excerpt:
      "Değişim değil onarım: kısa devre, sıvı teması ve chipset arızalarında mikroskop altında çip seviyesi anakart tamiri.",
    silo: "laptop",
    symptoms: [
      "Cihaz hiç güç almıyor",
      "Şarj ışığı yanıyor ama açılmıyor",
      "Sıvı teması sonrası arıza",
      "Rastgele kapanma ve donmalar",
      "USB, ses veya ekran çıkışları çalışmıyor",
    ],
    audience: [
      "Yetkili serviste 'anakart değişmeli' denilen kullanıcılar",
      "Sıvı teması yaşayan laptop sahipleri",
      "Ekonomik onarım arayan herkes",
    ],
    process: [
      {
        title: "Şematik üzerinden teşhis",
        description:
          "Anakart, cihaz şeması (boardview) üzerinden ölçüm alınarak incelenir; arızalı hat ve komponent belirlenir.",
      },
      {
        title: "Mikroskop altında onarım",
        description:
          "Arızalı mosfet, entegre veya chipset profesyonel rework istasyonunda değiştirilir.",
      },
      {
        title: "Ultrasonik temizlik",
        description:
          "Sıvı teması olan kartlar ultrasonik banyoda temizlenerek oksitlenme tamamen giderilir.",
      },
      {
        title: "Yük testi ve teslim",
        description:
          "Kart, cihaz üzerinde uzun süreli yük testine alınır ve 1 yıl garantiyle teslim edilir.",
      },
    ],
    turnaround: "1 – 4 iş günü",
    priceFrom: 1250,
    priceNote: "Arızanın kapsamına göre değişir; tespit ücretsizdir.",
    faqs: [
      {
        question: "Anakart tamiri mi, değişimi mi daha mantıklı?",
        answer:
          "Çoğu arıza tek bir komponentten kaynaklanır ve onarım, yeni anakart fiyatının çok altındadır. Onarımın ekonomik olmadığı nadir durumlarda dürüstçe değişim öneririz.",
      },
      {
        question: "Tamir edilen anakart tekrar bozulur mu?",
        answer:
          "Doğru teşhis ve kaliteli komponentle onarılan kartların tekrar arızalanma oranı düşüktür; bu yüzden işçiliğimize 1 yıl garanti veriyoruz.",
      },
      {
        question: "Chipset (kuzey/güney köprüsü) onarımı yapıyor musunuz?",
        answer:
          "Evet. BGA rework istasyonumuzla chipset ve ekran kartı entegresi değişimi/reballing işlemleri yapıyoruz.",
      },
    ],
    deepDives: [
      {
        title: "Çip seviyesi anakart tamiri nasıl yapılır?",
        bodyMd:
          "\"Anakart arızalı, değişmesi gerek\" cümlesi çoğu zaman doğru değildir. Anakart yüzlerce bağımsız komponentten oluşur; arıza genellikle bunlardan bir-ikisindedir. Atölyemizde arızalı kart önce şema üzerinden güç hatları ölçülerek analiz edilir, ardından mikroskop altında sorunlu bileşen — mosfet, entegre, kapasitör veya BGA çip — hassas lehim istasyonuyla değiştirilir. Bu yöntemle yetkili servislerin \"ekonomik değil\" dediği kartların önemli bölümü kurtarılır; verileriniz cihazda kalır, maliyet parça değişiminin çok altında olur. Sloganımız tam da bunu anlatır: **arıza çöpe gitmez.** Laptop, masaüstü, [MacBook](/macbook-tamiri) ve [oyun konsolu](/ps5-tamiri) anakartlarının tümünde aynı yaklaşımı uyguluyoruz.",
      },
      {
        title: "Kısa devre ve sıvı teması: anakartı çöpe atmadan önce",
        bodyMd:
          "Sıvı teması, yanlış adaptör kullanımı ya da elektrik dalgalanması sonrası açılmayan cihazların anakartında tipik olarak kısa devre oluşur. Kısa devre tespitinde devreyi hat hat izleyip sorunlu bölgeyi buluyor, hasarlı komponenti değiştiriyor ve kartı ultrasonik banyoda temizliyoruz. Onarım sonrası kart, yük ve ısı testlerinden geçmeden cihaza takılmaz — 1 yıl garantiyi bu sayede verebiliyoruz. Cihazınız hiç açılmıyorsa ve içinde önemli dosyalar varsa endişelenmeyin: anakart onarılamayan istisnai durumlarda bile disk sağlamsa [verileriniz kurtarılır](/veri-kurtarma). Arıza tespiti ücretsizdir; \"değmez\" diyeceğimiz bir durum varsa bunu da dürüstçe söyler, dilerseniz [arızalı cihazınızı değerinde satın alırız](/arizali-cihaz-alimi).",
      },
    ],
    related: ["laptop-tamiri", "ekran-karti-tamiri", "macbook-tamiri"],
  },
  {
    slug: "ekran-karti-tamiri",
    name: "Ekran Kartı Tamiri",
    title: "Alanya Ekran Kartı ve Chipset Tamiri",
    metaTitle: "Ekran Kartı Tamiri Alanya | GPU Onarımı",
    metaDescription:
      "Alanya'da masaüstü ve laptop ekran kartı tamiri: görüntü yok, artefakt, fan ve ısınma sorunları. BGA rework ile chipset onarımı, 1 yıl garanti.",
    primaryKeyword: "ekran kartı tamiri alanya",
    excerpt:
      "Görüntü vermeyen, artefakt oluşturan veya aşırı ısınan ekran kartlarında çip seviyesi onarım ve bakım.",
    silo: "masaustu",
    symptoms: [
      "Görüntü gelmiyor, kart takılıyken sistem açılmıyor",
      "Ekranda renkli karıncalanma / artefakt",
      "Oyunda kasma ve sürücü çökmesi",
      "Fan dönmüyor veya aşırı ses yapıyor",
      "Aşırı ısınma sonrası kapanma",
    ],
    audience: [
      "Oyuncular ve e-spor kullanıcıları",
      "Grafik/render işi yapan profesyoneller",
      "Madencilikten çıkmış kart alan kullanıcılar",
    ],
    process: [
      {
        title: "Teşhis ve ölçüm",
        description:
          "Kart, riser ve test sistemi üzerinde beslemeleri ölçülerek arızalı bölge saptanır.",
      },
      {
        title: "Komponent / BGA onarımı",
        description:
          "Arızalı mosfet ve bellek çipleri değiştirilir; gerekiyorsa GPU reballing uygulanır.",
      },
      {
        title: "Termal yenileme",
        description:
          "Termal macun ve pedler yenilenir, fan bakımı yapılır — kartın ömrü uzar.",
      },
      {
        title: "Stres testi",
        description:
          "Kart uzun süreli FurMark/oyun testinden geçirilerek teslim edilir.",
      },
    ],
    turnaround: "1 – 3 iş günü",
    priceFrom: 1500,
    priceNote: "Kart modeline ve arızaya göre değişir; tespit ücretsizdir.",
    faqs: [
      {
        question: "Ekran kartım görüntü vermiyor, tamiri mümkün mü?",
        answer:
          "Çoğu durumda evet. Besleme devresi ve bellek arızaları onarılabilir; GPU çekirdeği fiziksel hasarlıysa dürüstçe bildiririz.",
      },
      {
        question: "Artefakt (ekranda karıncalanma) neden olur?",
        answer:
          "Genellikle bellek çiplerinin veya GPU lehimlerinin ısı kaynaklı bozulmasındandır. Bellek değişimi veya reballing ile giderilebilir.",
      },
      {
        question: "Laptop ekran kartı arızası da tamir ediliyor mu?",
        answer:
          "Evet. Laptoplarda ekran kartı anakarta lehimli olduğu için işlem anakart üzerinde BGA rework ile yapılır.",
      },
    ],
    deepDives: [
      {
        title: "Ekran kartı arızası belirtileri: artefakt, siyah ekran, sürücü çökmesi",
        bodyMd:
          "Ekran kartı arızaları kendini kademeli gösterir: önce oyunlarda rastgele renkli noktalar ve şerit şeklinde **artefaktlar**, ardından sürücü çökmeleri, en sonunda görüntünün tamamen gitmesi. Bu belirtilerden herhangi birini görüyorsanız kartı zorlamaya devam etmek hasarı büyütür. Atölyemizde kart önce test düzeneğinde doğrulanır; arıza bellek çiplerinde mi, güç katında mı yoksa GPU çekirdeğinde mi ölçülerek ayrıştırılır ve sorunlu bileşen çip seviyesinde değiştirilir. \"Görüntü yok\" şikâyetlerinin bir bölümünde suçlu kart değil anakarttır — bu ayrımı ücretsiz tespitte netleştiririz, gerekirse [anakart tamiri](/anakart-tamiri) devreye girer. Onarılan kartlar yük testinden geçirilip 1 yıl garantiyle teslim edilir.",
      },
      {
        title: "Isınma kaynaklı GPU arızaları ve önleme",
        bodyMd:
          "Ekran kartlarının en büyük düşmanı ısıdır: kurumuş termal macun, tıkanmış soğutucu ve yetersiz kasa havalandırması GPU'yu her oyun oturumunda limitin üzerinde çalıştırır. Zamanla lehim noktaları yorulur ve kart \"soğukken çalışıp ısınınca görüntüyü kesen\" tipik arıza desenine girer. Alanya'nın yaz sıcağında bu süreç daha da hızlanır. Onarımın yanı sıra kök nedeni de çözüyoruz: termal macun ve ped yenileme, fan bakımı ve kasa hava akışı düzenlemesi için [bilgisayar bakım](/bilgisayar-bakim) hizmetimizi yılda bir öneriyoruz. Kartınız garanti kapsamı dışına çıkmış diye üzülmeyin — yetkili servislerin değişim önerdiği kartların çoğu [masaüstü sistemlerde](/bilgisayar-tamiri) olduğu gibi komponent seviyesinde kurtarılabiliyor.",
      },
    ],
    related: ["anakart-tamiri", "bilgisayar-tamiri", "bilgisayar-bakim"],
  },
  {
    slug: "monitor-tamiri",
    name: "Monitör Tamiri",
    title: "Alanya Monitör ve LCD Panel Tamiri",
    metaTitle: "Monitör Tamiri Alanya | LCD Panel Onarımı",
    metaDescription:
      "Alanya'da monitör tamiri: görüntü yok, çizgili ekran, güç ve panel arızaları. LCD panel değişimi ve elektronik kart onarımı, 1 yıl garantili.",
    primaryKeyword: "monitör tamiri alanya",
    excerpt:
      "Açılmayan, çizgi veren veya görüntüsü titreyen monitörleriniz için elektronik kart ve panel seviyesinde onarım.",
    silo: "masaustu",
    symptoms: [
      "Monitör hiç açılmıyor, güç ışığı yanmıyor",
      "Ekranda dikey/yatay çizgiler",
      "Görüntü birkaç saniye gelip kayboluyor",
      "Ekranda leke, gölge veya renk bozulması",
      "HDMI/DP girişleri çalışmıyor",
    ],
    audience: [
      "Ofisler ve evden çalışanlar",
      "Oyuncular (yüksek yenileme hızlı monitörler)",
      "İşletmeler (toplu monitör bakımı)",
    ],
    process: [
      {
        title: "Ücretsiz tespit",
        description:
          "Güç kartı, ana kart (main board) ve panel ayrı ayrı test edilerek arıza kaynağı belirlenir.",
      },
      {
        title: "Elektronik kart onarımı",
        description:
          "Güç ve görüntü kartlarındaki arızalı komponentler değiştirilir; kart komple değişmez, onarılır.",
      },
      {
        title: "Panel değişimi (gerekirse)",
        description:
          "Fiziksel hasarlı panellerde uyumlu panel temin edilir ve değiştirilir.",
      },
      {
        title: "Renk ve stabilite testi",
        description:
          "Monitör uzun süreli görüntü testinden geçirilir, 1 yıl garantiyle teslim edilir.",
      },
    ],
    turnaround: "Aynı gün – 3 iş günü",
    priceFrom: 950,
    priceNote: "Panel değişimi gereken işlerde fiyat panel modeline bağlıdır.",
    faqs: [
      {
        question: "Monitör tamiri yeni almaktan ucuz mu?",
        answer:
          "Elektronik kart arızalarında evet — onarım genellikle yeni monitör fiyatının %20-30'u kadardır. Panel kırığında modele göre değerlendirip dürüst öneri sunarız.",
      },
      {
        question: "Kırık ekran (panel) değişiyor mu?",
        answer:
          "Evet, uyumlu panel temin edilebilen tüm modellerde panel değişimi yapıyoruz.",
      },
      {
        question: "Televizyon tamiri de yapıyor musunuz?",
        answer:
          "Elektronik kart seviyesinde benzer arızalarda TV ana kartlarına da bakıyoruz; cihazı getirmeden telefonla danışabilirsiniz.",
      },
    ],
    deepDives: [
      {
        title: "Monitör açılmıyor veya görüntü gelmiyor: panel mi, kart mı?",
        bodyMd:
          "Monitör arızalarında ilk soru her zaman aynıdır: sorun panelde mi, yoksa içerideki elektronik kartlarda mı? Güç ışığı hiç yanmıyorsa besleme kartı, ışık yanıp görüntü gelmiyorsa ana kart (T-CON/scaler) veya panel devrededir; arka ışık yanmıyor ama silik görüntü seçilebiliyorsa LED sürücü katı arızalıdır. Bu ayrım önemli çünkü elektronik kart arızaları panelin aksine **ekonomik şekilde onarılabilir** — monitörü çöpe atmanıza gerek yoktur. Atölyemizde kart seviyesi onarım yapılır, kondansatör ve entegre değişimleriyle monitörlerin büyük bölümü kurtarılır. Görüntü sorunu monitörden değil bilgisayardan da kaynaklanıyor olabilir; ücretsiz tespitte bunu netleştirir, gerekirse [ekran kartı tamiri](/ekran-karti-tamiri) yönlendirmesi yaparız.",
      },
      {
        title: "Çizgi, leke ve titreme: hangi monitör arızaları onarılır?",
        bodyMd:
          "Ekranda dikey/yatay çizgiler, bölgesel kararmalar, renk bozulması ve titreme monitörlerde en sık karşılaştığımız şikâyetlerdir. Titreme ve rastgele kapanma çoğunlukla besleme katındaki yaşlanmış kondansatörlerden kaynaklanır ve düşük maliyetle çözülür. Çizgilerin kaynağı ise flex kablo, T-CON kartı veya panel olabilir — tespitte hangisi olduğunu ölçerek söyleriz; panelin fiziksel hasarlı olduğu durumlarda onarım yerine dürüstçe \"değmez\" deriz. Ofisler ve oyun kafeler için birden fazla monitörde toplu bakım da yapıyoruz. Laptop ekranındaki benzer sorunlar için [laptop ekran değişimi](/laptop-ekran-degisimi) sayfasına, görüntü sinyalinin hiç gelmediği durumlar için [masaüstü bilgisayar tamiri](/bilgisayar-tamiri) sayfasına göz atın.",
      },
    ],
    related: ["ekran-karti-tamiri", "bilgisayar-tamiri", "laptop-ekran-degisimi"],
  },
  {
    slug: "ps5-tamiri",
    name: "PS5 Tamiri",
    title: "Alanya PS5 Tamiri",
    metaTitle: "PS5 Tamiri Alanya | PlayStation 5 Servisi",
    metaDescription:
      "Alanya'da PS5 tamiri: açılmama, HDMI arızası, aşırı ısınma, disk okumama ve yazılım sorunları. Ücretsiz tespit, 1 yıl garantili onarım.",
    primaryKeyword: "ps5 tamiri alanya",
    excerpt:
      "Açılmayan, görüntü vermeyen veya aşırı ısınan PlayStation 5 konsolunuz için hızlı ve garantili onarım.",
    silo: "konsol",
    symptoms: [
      "PS5 açılmıyor veya bip sesiyle kapanıyor",
      "HDMI görüntü yok (en sık arıza)",
      "Aşırı ısınma ve yüksek fan sesi",
      "Disk sürücüsü okumuyor / çekmiyor",
      "Sürekli yeniden başlama, güvenli mod döngüsü",
    ],
    audience: [
      "Oyun konsolu kullanıcıları",
      "Yoğun kullanılan konsollara sahip aileler",
      "Playstation kafeler",
    ],
    process: [
      {
        title: "Ücretsiz tespit",
        description:
          "Konsolun güç, HDMI ve okuyucu üniteleri ayrı ayrı test edilerek arıza belirlenir.",
      },
      {
        title: "Çip seviyesi onarım",
        description:
          "HDMI entegresi (retimer/redriver), güç devresi veya APU çevresindeki arızalı komponentler mikroskop altında değiştirilir.",
      },
      {
        title: "Termal bakım",
        description:
          "PS5'in sıvı metal termal yapısı yenilenir, toz temizliği yapılır — ısınma ve fan sesi sorunu kökten çözülür.",
      },
      {
        title: "Oyun testi ve teslim",
        description:
          "Konsol uzun süreli oyun testiyle doğrulanır, 1 yıl garantiyle teslim edilir.",
      },
    ],
    turnaround: "Aynı gün – 2 iş günü",
    priceFrom: 1250,
    priceNote: "HDMI değişimi dahil çoğu onarımda sabit fiyat bildirilir.",
    faqs: [
      {
        question: "PS5 HDMI soketi değişimi ne kadar sürer?",
        answer:
          "Parça stokta ise genellikle aynı gün teslim edilir. Soket veya retimer entegresi değişimi mikroskop altında yapılır.",
      },
      {
        question: "PS5'im çok ses yapıyor, temizlik şart mı?",
        answer:
          "Evet. PS5'te sıvı metal ve toz birikimi zamanla ısınmayı artırır; periyodik termal bakım konsol ömrünü belirgin şekilde uzatır.",
      },
      {
        question: "Garanti kapsamındaki konsola müdahale eder misiniz?",
        answer:
          "Sony garantisi devam eden cihazlarda önce yetkili servisi öneririz; garanti dışı kalan tüm durumlarda 1 yıl kendi garantimizle onarırız.",
      },
    ],
    deepDives: [
      {
        title: "PS5 açılmıyor, kapanıyor veya görüntü vermiyor",
        bodyMd:
          "PS5'te ani kapanma, açılmama ve \"görüntü yok\" şikâyetlerinin arkasında çoğunlukla üç kaynak vardır: güç katı, HDMI çıkış devresi ve aşırı ısınma. HDMI portu fiziksel darbeye çok açıktır — kablo takılıyken konsolun itilmesi bile port lehimlerini kırabilir; port değişimini mikroskop altında, anakarta zarar vermeden yapıyoruz. Belirtiler ve çözüm yolları için [PS5 HDMI arızası rehberimize](/blog/ps5-hdmi-arizasi-belirtileri-cozumu) bakabilirsiniz. Güç katı arızalarında ise konsolun anakartı [çip seviyesinde](/anakart-tamiri) onarılır; Sony'nin değişim önerdiği kartların önemli kısmı kurtarılır. Tespit ücretsizdir, onarımlar 1 yıl garantilidir — oyun kütüphaneniz ve kayıtlarınız cihazda kalır.",
      },
      {
        title: "PS5 ısınma, fan sesi ve sıvı metal bakımı",
        bodyMd:
          "PS5, işlemcisiyle soğutucu arasında klasik termal macun yerine **sıvı metal** kullanır; bu üstün bir çözümdür ama yıllar içinde ve özellikle konsol dik kullanıldığında dağılabilir, ısınma ve türbin gibi fan sesine yol açar. Alanya'nın sıcak yazlarında kapalı TV ünitesine yerleştirilen konsollarda bu süreç belirgin hızlanır. Bakımda konsolu söküp toz temizliği yapıyor, sıvı metali yeniliyor ve fan performansını test ediyoruz — çoğunlukla aynı gün teslim. Isınmayı ihmal etmek zamanla APU lehimlerini yorar ve masraflı anakart arızalarına dönüşür; yıllık bakım bunun sigortasıdır. Elinizde kullanmadığınız arızalı bir konsol varsa [değerinde satın alıyoruz](/arizali-cihaz-alimi); [PS4](/ps4-tamiri) ve [Xbox](/xbox-tamiri) için de aynı hizmetleri veriyoruz.",
      },
    ],
    related: ["ps4-tamiri", "xbox-tamiri", "anakart-tamiri"],
  },
  {
    slug: "ps4-tamiri",
    name: "PS4 Tamiri",
    title: "Alanya PS4 Tamiri",
    metaTitle: "PS4 Tamiri Alanya | PlayStation 4 Servisi",
    metaDescription:
      "Alanya'da PS4, PS4 Slim ve Pro tamiri: açılmama, mavi ışık, HDMI, aşırı ısınma ve disk arızaları. Ücretsiz tespit, 1 yıl garanti.",
    primaryKeyword: "ps4 tamiri alanya",
    excerpt:
      "PS4, PS4 Slim ve PS4 Pro modellerinde açılmama, ısınma ve HDMI arızalarına garantili çözüm.",
    silo: "konsol",
    symptoms: [
      "Mavi ışık yanıp sönüyor, görüntü yok (BLOD)",
      "Konsol aşırı ısınıp kapanıyor",
      "HDMI portu ezik veya görüntü çıkışı yok",
      "Disk okumuyor veya diski geri itiyor",
      "Uçak gibi fan sesi",
    ],
    audience: [
      "PS4 kullanıcıları ve aileler",
      "İkinci el konsol alan oyuncular",
      "Playstation kafeler",
    ],
    process: [
      {
        title: "Ücretsiz tespit",
        description: "Güç, görüntü ve okuyucu üniteleri test edilir.",
      },
      {
        title: "Onarım",
        description:
          "HDMI soketi/entegresi değişimi, güç devresi onarımı veya APU reballing mikroskop altında yapılır.",
      },
      {
        title: "Termal bakım",
        description:
          "Termal macun yenilenir, fan ve soğutucu bloklar temizlenir.",
      },
      {
        title: "Test ve teslim",
        description:
          "Uzun süreli oyun testi sonrası 1 yıl garantiyle teslim edilir.",
      },
    ],
    turnaround: "Aynı gün – 2 iş günü",
    priceFrom: 950,
    priceNote: "Arıza tespiti ücretsizdir.",
    faqs: [
      {
        question: "PS4'te mavi ışık arızası (BLOD) tamir edilir mi?",
        answer:
          "Evet. Genellikle HDMI entegresi, güç devresi veya APU lehim sorunundan kaynaklanır ve çip seviyesinde onarılabilir.",
      },
      {
        question: "PS4 fan sesi neden artar?",
        answer:
          "Toz birikimi ve kuruyan termal macun ısıyı artırır, fan da yüksek devirde çalışır. Termal bakım ile ses normale döner.",
      },
      {
        question: "PS4 tamiri yerine PS5'e geçsem mi?",
        answer:
          "Onarım maliyeti genellikle düşüktür ve cihaz yıllarca kullanılabilir. Dilerseniz arızalı PS4'ünüzü alıp değerini yeni alışverişinizden düşebiliriz.",
      },
    ],
    deepDives: [
      {
        title: "PS4 hâlâ tamir ettirmeye değer mi?",
        bodyMd:
          "Kesinlikle evet. PS4 ve PS4 Pro hâlâ geniş bir oyun kütüphanesini sorunsuz çalıştırıyor ve ikinci el piyasasında karşılığı olan cihazlar. Buna karşılık en yaygın arızaları — HDMI port hasarı, güç entegresi bozulması, disk sürücüsünün okumaması ve aşırı ısınma — onarım maliyeti düşük arızalardır; çalışan bir konsolu birkaç yüz liralık port değişimi yüzünden elden çıkarmak yazık olur. Atölyemizde HDMI portu mikroskop altında değiştirilir, güç katı arızaları [çip seviyesinde](/anakart-tamiri) onarılır. Yine de \"tamir mi, satış mı?\" ikileminde kalırsanız her iki seçeneği de sunuyoruz: tespit sonrası net onarım fiyatını söyleriz, dilerseniz [arızalı konsolunuzu değerinde satın alırız](/arizali-cihaz-alimi) — karar tamamen sizindir.",
      },
      {
        title: "PS4 yavaşladı ve ses yapıyor: bakım + disk çözümü",
        bodyMd:
          "Yıllanmış PS4'lerin iki klasik şikâyeti vardır: uçak kalkışını andıran fan sesi ve oyunlarda uzayan yükleme süreleri. Fan sesinin nedeni neredeyse her zaman içeride birikmiş toz ve kurumuş termal macundur; bakımda konsol komple sökülür, soğutma bloğu temizlenir, macun yenilenir — ses gözle görülür azalır ve konsol termal kısıtlamaya girmeden tam performans çalışır. Yükleme süreleri içinse mekanik diskin SSD ile değiştirilmesi ciddi fark yaratır; oyunlarınız ve kayıtlarınız aktarılarak yapılır. Bu iki işlem bir arada, çoğunlukla aynı gün teslim edilir. Görüntü ve güç arızaları için [PS5](/ps5-tamiri) ve [Xbox](/xbox-tamiri) sayfalarındaki süreçlerin aynısı PS4 için de geçerlidir; tespit her zaman ücretsizdir.",
      },
    ],
    related: ["ps5-tamiri", "xbox-tamiri", "arizali-cihaz-alimi"],
  },
  {
    slug: "xbox-tamiri",
    name: "Xbox Tamiri",
    title: "Alanya Xbox Tamiri",
    metaTitle: "Xbox Tamiri Alanya | Series X/S ve One Servisi",
    metaDescription:
      "Alanya'da Xbox Series X, Series S ve Xbox One tamiri: açılmama, HDMI, ısınma ve güç arızaları. Ücretsiz arıza tespiti, 1 yıl garanti.",
    primaryKeyword: "xbox tamiri alanya",
    excerpt:
      "Xbox Series X/S ve Xbox One konsollarında güç, görüntü ve ısınma arızalarına çip seviyesinde onarım.",
    silo: "konsol",
    symptoms: [
      "Xbox açılmıyor veya anında kapanıyor",
      "HDMI görüntü çıkışı yok",
      "Aşırı ısınma ve kapanma",
      "Disk sürücüsü çalışmıyor",
      "Güç adaptörü/devresi arızası",
    ],
    audience: [
      "Xbox kullanıcıları",
      "Game Pass ile yoğun oynayan oyuncular",
      "İkinci el konsol sahipleri",
    ],
    process: [
      {
        title: "Ücretsiz tespit",
        description: "Konsol üniteleri ayrı ayrı test edilerek arıza bulunur.",
      },
      {
        title: "Çip seviyesi onarım",
        description:
          "HDMI entegresi, güç devresi ve anakart arızaları mikroskop altında giderilir.",
      },
      {
        title: "Termal bakım",
        description: "Termal macun yenilenir, soğutma sistemi temizlenir.",
      },
      {
        title: "Test ve teslim",
        description: "Oyun testi sonrası 1 yıl garantiyle teslim edilir.",
      },
    ],
    turnaround: "Aynı gün – 2 iş günü",
    priceFrom: 1250,
    priceNote: "Arıza tespiti ücretsizdir.",
    faqs: [
      {
        question: "Xbox Series X görüntü vermiyor, ne yapmalıyım?",
        answer:
          "Önce kabloyu ve TV girişini deneyin; sorun sürüyorsa büyük olasılıkla HDMI entegresi/soketi arızasıdır ve aynı gün onarılabilir.",
      },
      {
        question: "Xbox One güç adaptörü arızası tamir edilir mi?",
        answer:
          "Evet, adaptör ve konsol içi güç devresi arızalarının çoğu komponent seviyesinde onarılır.",
      },
      {
        question: "Konsolumu kargoyla gönderebilir miyim?",
        answer:
          "Evet, Alanya dışından kargo ile cihaz kabul ediyoruz. Göndermeden önce telefonla bilgi vermeniz yeterli.",
      },
    ],
    deepDives: [
      {
        title: "Xbox Series X/S güç ve görüntü arızaları",
        bodyMd:
          "Xbox Series X/S konsollarında en sık gördüğümüz tablo, cihazın hiç açılmaması ya da açılıp ekrana görüntü göndermemesidir. Kaynak çoğunlukla güç katındaki entegre arızası veya HDMI çıkış devresidir — her ikisi de konsol değişimi değil, [çip seviyesi onarım](/anakart-tamiri) gerektiren, mikroskop altında çözülen arızalardır. Xbox'ların kompakt tasarımı ısıyı yoğun üretir; Alanya sıcağında kapalı dolapta çalışan konsollarda termal yorulma kaynaklı arızalar belirgin artar. Onarım öncesi ücretsiz tespitle net fiyatı bildiririz; oyun kütüphaneniz ve hesabınız cihazda kalır, işlemler 1 yıl garantilidir. Series öncesi nesil için [Xbox One arızaları](/xbox-tamiri) da dahil tüm modellere bakıyoruz.",
      },
      {
        title: "Xbox One disk sürücüsü ve HDMI sorunları",
        bodyMd:
          "Xbox One ailesinde iki kronik arıza öne çıkar: diski yutmayan ya da okumayan optik sürücü ve \"No Signal\" veren HDMI portu. Disk sürücüsünde sorun çoğunlukla lazer ünitesi veya sürücü kartındadır; sürücü değişiminde konsolun ana kartıyla eşleşme gerektiğini bilerek onarımı doğru yöntemle yapıyoruz — yanlış yerde yaptırılan sürücü değişimi konsolu tamamen kullanılmaz hâle getirebilir. HDMI port değişimi ise mikroskop altında, çevre komponentlere zarar vermeden gerçekleştirilir. Tamir ettirmek istemediğiniz arızalı Xbox'ınız varsa [değerinde nakit alıyoruz](/arizali-cihaz-alimi). PlayStation tarafında benzer sorunlar için [PS5](/ps5-tamiri) ve [PS4](/ps4-tamiri) tamiri sayfalarımıza göz atabilirsiniz; tüm konsol onarımlarında tespit ücretsizdir.",
      },
    ],
    related: ["ps5-tamiri", "ps4-tamiri", "anakart-tamiri"],
  },
  {
    slug: "laptop-ekran-degisimi",
    name: "Laptop Ekran Değişimi",
    title: "Alanya Laptop Ekran Değişimi",
    metaTitle: "Laptop Ekran Değişimi Alanya | Aynı Gün",
    metaDescription:
      "Alanya'da kırık ve çizgili laptop ekranı değişimi. Tüm markalar için IPS/FHD/144Hz panel temini, çoğu modelde aynı gün teslim, 1 yıl garanti.",
    primaryKeyword: "laptop ekran değişimi alanya",
    excerpt:
      "Kırık, çizgili veya görüntüsüz laptop ekranınız çoğu modelde aynı gün, orijinal kalitede panelle değiştirilir.",
    silo: "laptop",
    symptoms: [
      "Ekran kırık veya çatlak",
      "Ekranda dikey/yatay çizgiler",
      "Görüntü var ama çok karanlık (aydınlatma arızası)",
      "Ekranda leke veya mürekkep dağılması",
      "Görüntü titriyor veya kapak hareketiyle gidip geliyor",
    ],
    audience: [
      "Ekranı kırılan tüm laptop kullanıcıları",
      "Oyuncular (144Hz+ panel yükseltmek isteyenler)",
      "Öğrenciler",
    ],
    process: [
      {
        title: "Model tespiti",
        description:
          "Panel model kodu okunarak birebir uyumlu (çözünürlük, yenileme hızı, konnektör) panel belirlenir.",
      },
      {
        title: "Panel temini",
        description:
          "Yaygın modellerde panel stoktan çıkar; özel panellerde 1-2 gün içinde temin edilir.",
      },
      {
        title: "Değişim ve test",
        description:
          "Panel değiştirilir; ölü piksel, renk ve aydınlatma testleri yapılır.",
      },
      {
        title: "Teslim",
        description: "Çoğu modelde aynı gün, 1 yıl garantiyle teslim edilir.",
      },
    ],
    turnaround: "Stoktaki panellerde aynı gün",
    priceFrom: 2750,
    priceNote:
      "Fiyat panel dahildir; çözünürlük ve panel tipine göre değişir.",
    faqs: [
      {
        question: "Laptop ekran değişimi ne kadar sürer?",
        answer:
          "Panel stokta ise işlem 1-2 saat içinde tamamlanır. Özel paneller için süre 1-2 iş günüdür.",
      },
      {
        question: "Ekranımı daha iyi bir panelle yükseltebilir miyim?",
        answer:
          "Çoğu modelde evet — TN panelden IPS'e veya 60Hz'den 144Hz'e yükseltme yapılabilir; uyumluluğu ücretsiz kontrol ederiz.",
      },
      {
        question: "Dokunmatik ekranlar da değişiyor mu?",
        answer:
          "Evet, dokunmatik ve çerçevesiz (bezel-less) modeller dahil tüm panel tiplerinde değişim yapıyoruz.",
      },
    ],
    deepDives: [
      {
        title: "Laptop ekranı kırıldı: doğru paneli seçmek neden önemli?",
        bodyMd:
          "Laptop ekranı değişiminde en kritik nokta, cihazınıza **birebir uyumlu ve orijinal kalitede** panel takılmasıdır. Aynı modelin farklı üretim partilerinde bile panel bağlantısı, çözünürlük, yenileme hızı (60Hz/120Hz/144Hz) ve yüzey tipi (mat/parlak, IPS/TN) değişebilir; ucuz muadil panellerde renk soluklaşması, ışık sızması ve kısa ömür tipiktir. Atölyemizde panel, cihazın orijinal özellikleri korunacak şekilde seçilir — gaming laptopa 144Hz yerine 60Hz panel takıp \"değişti\" demek bizim işimiz değildir. Değişim çoğu modelde stoklu panellerle **aynı gün** tamamlanır ve 1 yıl garanti kapsamındadır. Görüntü sorununuz kırık değil de çizgi/karartıysa kablo veya anakart kaynaklı olabilir; bunu ücretsiz tespitte ayırt eder, gerekirse [laptop tamiri](/laptop-tamiri) kapsamında çözeriz.",
      },
      {
        title: "Ekran mı anakart mı? Görüntü sorunlarında doğru teşhis",
        bodyMd:
          "\"Ekranım gitti\" diye gelen laptopların bir bölümünde panel sapasağlamdır — sorun ekran kablosunda (flex), menteşeden geçen hat yıpranmasında ya da anakartın görüntü katındadır. Paneli değiştirip sorunu çözmemek müşteriye para kaybettirir; bu yüzden önce harici monitör testi, kablo ve panel ölçümleri yapılır, arıza noktası kesinleştirilir. Menteşe kırıkları da ekran arızalarının gizli nedenidir: kırık menteşe kasayı zorlayıp kabloyu ve paneli zamanla öldürür; ekranla birlikte menteşe onarımını da aynı seansta yapıyoruz. MacBook ekranları için [MacBook tamiri](/macbook-tamiri), harici monitör sorunları için [monitör tamiri](/monitor-tamiri) sayfalarımız var. Tespit ücretsiz, net fiyat onarım öncesi bildirilir.",
      },
    ],
    related: ["laptop-tamiri", "monitor-tamiri", "macbook-tamiri"],
  },
  {
    slug: "veri-kurtarma",
    name: "Veri Kurtarma",
    title: "Alanya Veri Kurtarma",
    metaTitle: "Veri Kurtarma Alanya | HDD, SSD, Flash",
    metaDescription:
      "Alanya'da silinen veya arızalı diskten veri kurtarma: HDD, SSD, USB bellek ve hafıza kartı. Veri kurtarılamazsa ücret alınmaz, gizlilik garantili.",
    primaryKeyword: "veri kurtarma alanya",
    excerpt:
      "Silinen dosyalar, açılmayan diskler ve bozulan SSD'lerden gizlilik esaslı veri kurtarma — kurtarılamazsa ücret yok.",
    silo: "veri",
    symptoms: [
      "Disk bilgisayarda görünmüyor",
      "Yanlışlıkla silinen veya formatlanan dosyalar",
      "Diskten tık tık sesi geliyor",
      "SSD aniden ölü duruma geçti",
      "USB bellek 'biçimlendirin' hatası veriyor",
    ],
    audience: [
      "Önemli dosyalarını kaybeden bireysel kullanıcılar",
      "Fotoğraf/video arşivi kaybolan aileler",
      "Muhasebe ve müşteri verisi kaybeden işletmeler",
    ],
    process: [
      {
        title: "Ücretsiz ön inceleme",
        description:
          "Diskin durumu değerlendirilir; kurtarma ihtimali ve net fiyat önceden bildirilir.",
      },
      {
        title: "Birebir kopya (imaj)",
        description:
          "Orijinal disk üzerinde çalışılmaz; sektör bazlı kopya alınarak veriniz güvenceye alınır.",
      },
      {
        title: "Kurtarma işlemi",
        description:
          "Mantıksal arızalarda profesyonel yazılımlarla, elektronik arızalarda kart onarımı ile veriler çıkarılır.",
      },
      {
        title: "Gizli teslim",
        description:
          "Kurtarılan veriler yeni bir diske aktarılır; kopyalar teslim sonrası silinir, gizlilik esastır.",
      },
    ],
    turnaround: "1 – 5 iş günü (arıza tipine göre)",
    priceFrom: 1500,
    priceNote: "Veri kurtarılamazsa ücret alınmaz.",
    faqs: [
      {
        question: "Verilerim kurtarılamazsa ücret öder miyim?",
        answer:
          "Hayır. 'Veri yoksa ücret yok' prensibiyle çalışıyoruz; yalnızca başarılı kurtarmada ücret alınır.",
      },
      {
        question: "Verilerimin gizliliği nasıl korunuyor?",
        answer:
          "Verileriniz yalnızca kurtarma işlemi için kopyalanır, teslimden sonra tüm kopyalar kalıcı olarak silinir. Talep halinde gizlilik taahhüdü imzalıyoruz.",
      },
      {
        question: "Tık sesi gelen diskte ne yapmalıyım?",
        answer:
          "Diski derhal kapatın ve tekrar elektrik vermeyin — her deneme kafaların plaklara zarar verme riskini artırır. Diski en kısa sürede bize ulaştırın.",
      },
    ],
    deepDives: [
      {
        title: "Veri kaybında ilk 10 dakika: ne yapmalı, ne yapmamalı?",
        bodyMd:
          "Veri kaybettiğinizde yapacağınız ilk hamle, kurtarma şansınızı belirler. **Yapmayın:** diske yeni dosya yazmayın, kurtarma programlarını arızalı diskin kendisine kurmayın, tıkırtı sesi gelen diski tekrar tekrar başlatmayın — her deneme plakalara kalıcı hasar verir. **Yapın:** cihazı kapatın ve diski olduğu gibi bize getirin. Silinen dosyalarda disk kullanılmadığı sürece veriler çoğunlukla yerinde durur ve yüksek oranda kurtarılır; mekanik arızalarda ise erken müdahale kritiktir. Çalışma prensibimiz nettir: önce ücretsiz analizle kurtarılabilecek verilerin listesini çıkarır, net fiyat veririz — **kurtaramazsak ücret almayız.** Kurtarma tamamlanana kadar orijinal disk üzerinde değil, birebir kopyası üzerinde çalışılır; verileriniz üçüncü kişilerle asla paylaşılmaz.",
      },
      {
        title: "HDD, SSD ve açılmayan cihazlardan kurtarma farkları",
        bodyMd:
          "Her veri kaybı aynı değildir. Mekanik disklerde (HDD) sorun çoğunlukla fiziksel — kafa, motor veya elektronik kart — olur ve donanım müdahalesi gerektirir. SSD'lerde ise kontrolcü arızası ve ani ölüm tablosu görülür; NAND çiplerine doğrudan erişim gerektiren bu vakalar özel ekipmanla çözülür. Üçüncü senaryo en sık gördüğümüz: cihaz açılmıyor ama disk sağlam. Bu durumda [açılmayan laptopun](/laptop-tamiri) veya [MacBook'un](/macbook-tamiri) diskini söküp verilerinizi yeni bir ortama aktarıyoruz — çoğu zaman aynı gün. Sıvı temas etmiş cihazlarda önce veri güvence altına alınır, onarım sonra yapılır. Kurtarma sonrası veri kaybını bir daha yaşamamak için yedekleme düzeni kurulumu ve [SSD yenileme](/ssd-ram-yukseltme) konusunda da yönlendiriyoruz.",
      },
    ],
    related: ["ssd-ram-yukseltme", "laptop-tamiri", "macbook-tamiri"],
  },
  {
    slug: "ssd-ram-yukseltme",
    name: "SSD ve RAM Yükseltme",
    title: "Alanya SSD ve RAM Yükseltme",
    metaTitle: "SSD Yükseltme Alanya | RAM Artırma",
    metaDescription:
      "Alanya'da laptop ve masaüstü için SSD yükseltme, RAM artırma ve Windows taşıma. Verileriniz kaybolmadan aynı gün 5-10 kat hız artışı.",
    primaryKeyword: "ssd yükseltme alanya",
    excerpt:
      "Yavaşlayan bilgisayarınıza en etkili çözüm: verileriniz korunarak aynı gün SSD ve RAM yükseltme.",
    silo: "veri",
    symptoms: [
      "Bilgisayarın açılması dakikalar sürüyor",
      "Programlar geç açılıyor, sistem donuyor",
      "Disk kullanımı sürekli %100 görünüyor",
      "Chrome sekmeleri ve ofis programları yetersiz RAM'den kasıyor",
    ],
    audience: [
      "Yavaşlıktan şikayetçi tüm kullanıcılar",
      "Öğrenciler (ekonomik hız çözümü)",
      "Ofis bilgisayarlarını yenilemek istemeyen işletmeler",
    ],
    process: [
      {
        title: "Ücretsiz analiz",
        description:
          "Cihazınızın desteklediği maksimum RAM ve SSD tipi (SATA/NVMe) belirlenir.",
      },
      {
        title: "Doğru donanım seçimi",
        description:
          "İhtiyacınıza ve bütçenize uygun, garantili SSD/RAM önerilir; parayı boşa harcatacak gereksiz yükseltme önerilmez.",
      },
      {
        title: "Veri kaybı olmadan taşıma",
        description:
          "Windows'unuz ve tüm dosyalarınız klonlama ile yeni diske birebir taşınır — kurulum ve ayar kaybı yaşanmaz.",
      },
      {
        title: "Aynı gün teslim",
        description: "İşlem çoğunlukla 1-2 saat içinde tamamlanır.",
      },
    ],
    turnaround: "Aynı gün (çoğunlukla 1-2 saat)",
    priceFrom: 450,
    priceNote: "İşçilik fiyatıdır; SSD/RAM parça fiyatı kapasiteye göre eklenir.",
    faqs: [
      {
        question: "SSD taktırınca bilgisayarım gerçekten hızlanır mı?",
        answer:
          "Evet — mekanik diskten SSD'ye geçiş, açılış ve program yükleme sürelerini 5-10 kat kısaltır. Yavaşlığın en yaygın çözümüdür.",
      },
      {
        question: "Dosyalarım ve programlarım silinir mi?",
        answer:
          "Hayır. Klonlama yöntemiyle sisteminiz birebir yeni diske taşınır; her şey bıraktığınız gibi açılır.",
      },
      {
        question: "Laptopuma kaç GB RAM takılabilir?",
        answer:
          "Modele göre değişir; cihazınızın desteklediği maksimum kapasiteyi ücretsiz kontrol edip söylüyoruz.",
      },
    ],
    deepDives: [
      {
        title: "Bilgisayarım yavaş: SSD mi RAM mi lazım?",
        bodyMd:
          "İkisi farklı sorunları çözer. Bilgisayar **açılırken ve program başlatırken** yavaşsa, disk ışığı sürekli yanıyorsa darboğaz disktir — mekanik diskten SSD'ye geçiş, yaşlı bir bilgisayarda hissedilir en büyük sıçramayı yapar; açılış süresi dakikalardan saniyelere iner. Sorun **aynı anda çok sekme/program açıkken** donma şeklindeyse RAM yetersizdir. Hangisinin gerektiğini tahminle değil ölçümle söylüyoruz: ücretsiz tespitte disk sağlığını ve bellek kullanımını analiz edip net öneri ve fiyat çıkarıyoruz. Çoğu durumda ikisinin birlikte yapılması, yeni bilgisayar almanın küçük bir bedeliyle cihaza yıllar kazandırır. Yavaşlığın virüs ya da dolmuş sistemden kaynaklandığı durumlarda ise [yedekli format](/format-windows-kurulumu) daha doğru çözümdür — size masraf çıkarmadan bunu da söyleriz.",
      },
      {
        title: "Verileriniz korunarak aynı gün yükseltme",
        bodyMd:
          "SSD yükseltmesinde en çok sorulan soru: \"Dosyalarım, programlarım ne olacak?\" Cevap: hiçbir şey. Mevcut diskiniz yeni SSD'ye **birebir klonlanır** — Windows kurulumunuz, programlarınız, masaüstünüz ve lisanslarınız aynen taşınır; bilgisayarınızı bıraktığınız gibi, sadece çok daha hızlı geri alırsınız. İşlem stoklu diskler için çoğunlukla aynı gün tamamlanır. Eski diskiniz talebinize göre harici yedek diske dönüştürülür, böylece ekstra bir yedekleme katmanı kazanırsınız. [Laptop](/laptop-tamiri), masaüstü ve [MacBook](/macbook-tamiri) dahil tüm cihazlarda uygulanır; MacBook'larda model bazlı uyumluluğu önceden kontrol ederiz. Takılan SSD ve işçilik 1 yıl garanti kapsamındadır. Disk sağlığı kritik seviyedeyse önce [veri kurtarma](/veri-kurtarma) protokolüyle ilerleriz — riskli diskte klonlama denemesi veri kaybettirebilir, bu ayrımı biz yaparız.",
      },
    ],
    related: ["laptop-tamiri", "format-windows-kurulumu", "veri-kurtarma"],
  },
  {
    slug: "bilgisayar-bakim",
    name: "Bakım ve Temizlik",
    title: "Alanya Bilgisayar Bakımı: Termal Bakım ve Fan Temizliği",
    metaTitle: "Bilgisayar Bakım Alanya | Termal Bakım",
    metaDescription:
      "Alanya'da laptop ve masaüstü periyodik bakımı: termal macun yenileme, fan temizliği, toz alımı. Isınma ve fan sesine kesin çözüm, aynı gün teslim.",
    primaryKeyword: "bilgisayar bakım alanya",
    excerpt:
      "Isınan ve ses yapan cihazınız için termal macun yenileme, fan temizliği ve genel performans bakımı.",
    silo: "masaustu",
    symptoms: [
      "Fan sürekli yüksek devirde çalışıyor",
      "Cihaz elinizi yakacak kadar ısınıyor",
      "Oyun/render sırasında performans düşüyor (thermal throttling)",
      "Cihaz aniden kapanıyor",
    ],
    audience: [
      "Oyuncular ve yoğun kullanıcılar",
      "2 yıldan uzun süredir bakım yaptırmayanlar",
      "Sahil/nemli ortamda kullanılan cihaz sahipleri",
    ],
    process: [
      {
        title: "Söküm ve toz temizliği",
        description:
          "Cihaz tamamen sökülür; fanlar, soğutucu kanallar ve anakart basınçlı hava ve fırça ile temizlenir.",
      },
      {
        title: "Termal macun/ped yenileme",
        description:
          "Kuruyan termal macun kaliteli macunla yenilenir; gerekli noktalarda termal pedler değiştirilir.",
      },
      {
        title: "Isı testi",
        description:
          "Bakım öncesi/sonrası sıcaklık değerleri karşılaştırmalı olarak raporlanır.",
      },
    ],
    turnaround: "Aynı gün (1-3 saat)",
    priceFrom: 850,
    priceNote: "Laptop ve masaüstü için fiyat farklıdır; tespit ücretsizdir.",
    faqs: [
      {
        question: "Bilgisayar bakımı ne sıklıkla yapılmalı?",
        answer:
          "Yoğun kullanımda yılda bir, normal kullanımda 1,5-2 yılda bir termal bakım öneriyoruz. Alanya gibi nemli ve tozlu iklimlerde aralık kısalabilir.",
      },
      {
        question: "Bakım performansı gerçekten artırır mı?",
        answer:
          "Isınan cihaz kendini korumak için hız düşürür (throttling). Bakım sonrası cihaz fabrika soğutma değerlerine döner ve performans normale çıkar.",
      },
      {
        question: "Gaming laptop'ta sıvı metal uygulaması yapıyor musunuz?",
        answer:
          "Uygun modellerde evet; sıvı metal standart macuna göre 8-10°C daha iyi soğutma sağlar.",
      },
    ],
    deepDives: [
      {
        title: "Termal bakım neden yılda bir şart? (Özellikle Alanya'da)",
        bodyMd:
          "İşlemci ve ekran kartının üzerindeki termal macun zamanla kurur; kuruyan macun ısıyı iletemez, cihaz kendini korumak için hızını düşürür — \"bilgisayarım eskisi gibi değil\" hissinin en yaygın nedeni budur. Alanya'nın sıcak ve nemli ikliminde bu süreç iç bölgelere göre belirgin hızlanır; sahile yakın evlerde nem, kartlarda oksitlenmeyi de tetikler. Yıllık bakımda cihaz sökülür, fan ve soğutma kanalları tozdan arındırılır, macun yenilenir, sıcaklıklar bakım öncesi/sonrası ölçülerek raporlanır. Fark çoğu cihazda 10-20 derecedir ve bu, [ekran kartı](/ekran-karti-tamiri) ile anakartın ömrünü doğrudan uzatır. Bakım çoğunlukla aynı gün teslim edilir; [gaming laptoplar](/laptop-tamiri) ve [PS5 gibi konsollar](/ps5-tamiri) için de aynı hizmeti veriyoruz.",
      },
      {
        title: "Bakım mı, tamir mi? Erken belirtileri kaçırmayın",
        bodyMd:
          "Cihazlar ölmeden önce haber verir: artan fan sesi, kasada olağan dışı sıcaklık, oyun ortasında ani kapanma, yükleme sürelerinde uzama. Bu belirtiler bakım aşamasında yakalanırsa maliyet düşük bir temizlik ve macun yenilemeyle kapanır; ihmal edilirse iş, güç katı arızasına ya da GPU lehim sorununa — yani gerçek bir [anakart tamirine](/anakart-tamiri) — dönüşür. Bakım paketimiz donanım temizliğiyle sınırlı değildir: disk sağlığı taranır, başlangıç programları ayıklanır, sistem güncellemeleri ve sürücüler düzenlenir; talep ederseniz gereksiz yüklerden arınmış bir sistem için [yedekli format](/format-windows-kurulumu) da eklenir. Küçük işletmeler ve ofisler için birden fazla cihazda periyodik toplu bakım anlaşması yapıyoruz — cihazlarınız iş günü kaybettirmeden sırayla bakımdan geçer.",
      },
    ],
    related: ["laptop-tamiri", "ekran-karti-tamiri", "ps5-tamiri"],
  },
  {
    slug: "format-windows-kurulumu",
    name: "Format ve Windows Kurulumu",
    title: "Alanya Bilgisayar Format ve Windows Kurulumu",
    metaTitle: "Bilgisayar Format Alanya | Windows Kurulumu",
    metaDescription:
      "Alanya'da format, Windows 11 kurulumu, sürücü yükleme ve virüs temizleme. Verileriniz yedeklenir, cihaz aynı gün kullanıma hazır teslim edilir.",
    primaryKeyword: "bilgisayar format alanya",
    excerpt:
      "Yavaşlayan veya virüs bulaşan bilgisayarınız için yedekli format, lisanslı Windows kurulumu ve tam sürücü desteği.",
    silo: "masaustu",
    symptoms: [
      "Windows açılmıyor veya döngüye giriyor",
      "Reklam pencereleri ve şüpheli programlar açılıyor (virüs)",
      "Sistem aşırı yavaş ve hata veriyor",
      "Güncelleme sonrası sorunlar başladı",
    ],
    audience: [
      "Ev kullanıcıları",
      "Öğrenciler",
      "Format sonrası kurulumla uğraşmak istemeyen herkes",
    ],
    process: [
      {
        title: "Veri yedekleme",
        description:
          "Belgeler, fotoğraflar ve masaüstü dosyalarınız format öncesi güvenle yedeklenir.",
      },
      {
        title: "Temiz kurulum",
        description:
          "Windows 11/10 kurulur, tüm sürücüler ve güncellemeler eksiksiz yüklenir.",
      },
      {
        title: "Yazılım ve koruma",
        description:
          "İhtiyacınız olan temel programlar kurulur, güvenlik ayarları yapılır, verileriniz geri yüklenir.",
      },
    ],
    turnaround: "Aynı gün",
    priceFrom: 750,
    priceNote: "Veri yedekleme dahildir.",
    faqs: [
      {
        question: "Format atınca dosyalarım silinir mi?",
        answer:
          "Bizde hayır — format öncesi tüm kişisel dosyalarınız yedeklenir ve kurulum sonrası yerine yüklenir.",
      },
      {
        question: "Virüsü format atmadan temizleyebilir misiniz?",
        answer:
          "Çoğu durumda evet; sistem dosyalarına bulaşmış ağır vakalarda ise yedekli format en sağlıklı çözümdür.",
      },
      {
        question: "Windows lisansım korunur mu?",
        answer:
          "Evet, cihaza tanımlı dijital lisans format sonrası otomatik olarak yeniden etkinleşir.",
      },
    ],
    deepDives: [
      {
        title: "Yedekli format: verileriniz kaybolmadan temiz kurulum",
        bodyMd:
          "Format korkusunun tek nedeni veri kaybıdır — bizde bu risk yoktur. Kurulumdan önce belgeleriniz, fotoğraflarınız, masaüstünüz, tarayıcı yer imleriniz ve varsa özel program verileriniz (muhasebe, arşiv vb.) ayrı bir ortama yedeklenir; temiz kurulumdan sonra aynen yerine taşınır. WhatsApp yedekleri ve e-posta hesapları gibi gözden kaçan kalemleri de kontrol listemizle tek tek geçeriz. Kurulum sonrası cihazınızı \"kutudan çıkmış ama hazır\" hâlde teslim ederiz: tüm sürücüler yüklü, güncellemeler tamamlanmış, ofis ve temel programlar kurulmuş. Sık format ihtiyacı çoğunlukla yavaş diskin işaretidir; formatla birlikte [SSD yükseltme](/ssd-ram-yukseltme) yapıldığında fark kalıcı olur. Sisteme virüs bulaştıysa temizlik ve güvenlik yapılandırması da işleme dahildir.",
      },
      {
        title: "Lisanslı Windows ve doğru kurulumun önemi",
        bodyMd:
          "İnternetten indirilen korsan Windows imajları ve \"ömür boyu lisans\" vaatleri, sisteminize virüs ve arka kapıyla birlikte gelir; bankacılık kullandığınız bir bilgisayarda bunun bedeli ağır olabilir. Biz kurulumu **orijinal Microsoft imajıyla ve lisanslı** yapıyoruz; mevcut lisansınız varsa aktarıyor, yoksa uygun seçenekleri sunuyoruz. Doğru kurulum sürücüyle biter: yanlış ya da eksik sürücü, yeni kurulmuş sistemde donma ve [mavi ekran](/bilgisayar-tamiri) şikâyetlerinin başlıca nedenidir — cihazınızın modeline özel tam sürücü seti yüklenir, kararlılık testi yapılır. Kurulum sonrası ilk ay içinde yazılımsal bir sorun çıkarsa ücretsiz düzeltiriz. Yeni sisteminizin hızını korumak için yıllık [bakım paketimize](/bilgisayar-bakim) göz atmayı unutmayın.",
      },
    ],
    related: ["ssd-ram-yukseltme", "bilgisayar-tamiri", "bilgisayar-bakim"],
  },
  {
    slug: "arizali-cihaz-alimi",
    name: "Arızalı Cihaz Alımı",
    title: "Alanya Arızalı Laptop ve Bilgisayar Alımı",
    metaTitle: "Arızalı Laptop Alan Yerler Alanya | Nakit Alım",
    metaDescription:
      "Alanya'da arızalı laptop, bilgisayar ve oyun konsolu alımı. Yerinde değerleme, anında nakit ödeme. Çekmecede bekleyen cihazınız değer kaybetmesin.",
    primaryKeyword: "arızalı laptop alan yerler alanya",
    excerpt:
      "Tamir ettirmek istemediğiniz arızalı laptop, bilgisayar ve konsollarınızı değerinde, nakit ödeyerek alıyoruz.",
    silo: "alim",
    symptoms: [
      "Tamiri masraflı bulunan arızalı laptop",
      "Kullanılmayan eski masaüstü bilgisayar",
      "Ekranı kırık veya açılmayan cihazlar",
      "Yükseltme sonrası elde kalan parçalar",
    ],
    audience: [
      "Yeni cihaz alacak olanlar (takas avantajı)",
      "Kullanmadığı cihazı elden çıkarmak isteyenler",
      "Toplu cihaz yenileyen işletmeler",
    ],
    process: [
      {
        title: "Bilgi ve ön fiyat",
        description:
          "Cihazın modelini ve arızasını WhatsApp'tan iletin; ön değerleme fiyatını hemen bildirelim.",
      },
      {
        title: "Yerinde inceleme",
        description:
          "Cihaz mağazamızda incelenir ve nihai fiyat şeffaf şekilde açıklanır.",
      },
      {
        title: "Anında ödeme ve veri güvenliği",
        description:
          "Anlaşma halinde ödeme anında yapılır; cihazdaki tüm verileriniz gözünüzün önünde güvenle silinir.",
      },
    ],
    turnaround: "Aynı gün — anında ödeme",
    priceFrom: null,
    priceNote: "Fiyat cihaz modeli ve durumuna göre teklif edilir.",
    faqs: [
      {
        question: "Hangi cihazları satın alıyorsunuz?",
        answer:
          "Arızalı veya çalışır durumda laptop, masaüstü bilgisayar, MacBook, monitör ve oyun konsollarını alıyoruz.",
      },
      {
        question: "Cihazdaki kişisel verilerim ne olacak?",
        answer:
          "Alım sırasında diskiniz geri getirilemez şekilde silinir; talep ederseniz diski size teslim ederiz.",
      },
      {
        question: "Takas yapıyor musunuz?",
        answer:
          "Evet — arızalı cihazınızın bedelini yeni alacağınız cihazdan veya onarım ücretinden düşebiliriz.",
      },
    ],
    deepDives: [
      {
        title: "Arızalı cihazınız çöp değil: nasıl değer biçiyoruz?",
        bodyMd:
          "Çekmecede bekleyen arızalı laptop, açılmayan bilgisayar ya da görüntü vermeyen konsol her geçen ay değer kaybeder — elektronikte bekletmek her zaman zarardır. Değerlemeyi şeffaf yapıyoruz: cihazın modeli, yaşı, arızanın türü ve sağlam parçaların (ekran, kasa, RAM, disk, batarya) durumu üzerinden net bir teklif çıkarır, nedenleriyle açıklarız. Teklifi kabul ederseniz ödeme **anında nakit** yapılır; kabul etmezseniz hiçbir ücret ödemeden cihazınızı geri alırsınız. Satış öncesi en önemli konu verilerinizdir: talebinize göre diskteki veriler size aktarılır ya da yanınızda güvenli şekilde silinir — cihazınız kişisel verilerinizle birlikte el değiştirmez.",
      },
      {
        title: "Satmak mı, tamir ettirmek mi? Dürüst karşılaştırma",
        bodyMd:
          "Aynı çatı altında hem [tamir](/laptop-tamiri) hem alım yaptığımız için bu soruya çıkar çatışması olmadan cevap verebiliyoruz. Ücretsiz tespitte önce onarım maliyetini çıkarırız; cihazın piyasa değeriyle kıyaslayıp iki seçeneği de rakamlarıyla önünüze koyarız. Görece yeni bir cihazda küçük bir arızayı onarmak neredeyse her zaman daha kârlıdır — [SSD yükseltmesiyle](/ssd-ram-yukseltme) birleşince cihaz yıllarca daha gider. Eski bir cihazda büyük arıza varsa da dürüstçe \"tamire değmez, şu fiyata alalım\" deriz. Alanya merkezde mağazamıza getirebilir, uzaktaysanız önce WhatsApp'tan fotoğraf ve arıza bilgisiyle ön teklif alabilirsiniz; [masaüstü sistemler](/bilgisayar-tamiri) ve oyun konsolları dahil tüm cihazlar için geçerlidir.",
      },
    ],
    related: ["laptop-tamiri", "bilgisayar-tamiri", "ssd-ram-yukseltme"],
  },
];

/* Çapraz doğrulama: related alanındaki her slug gerçekten var olmalı (orphan/broken iç link önlenir) */
const ServicesSchema = z.array(ServiceSchema).superRefine((list, ctx) => {
  const slugs = new Set(list.map((s) => s.slug));
  for (const service of list) {
    for (const rel of service.related) {
      if (!slugs.has(rel)) {
        ctx.addIssue({
          code: "custom",
          message: `"${service.slug}" hizmetinin related alanındaki "${rel}" slug'ı tanımlı değil`,
        });
      }
    }
  }
});

export const SERVICES: readonly Service[] = ServicesSchema.parse(services);

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function getRelatedServices(service: Service): Service[] {
  return service.related
    .map((slug) => getService(slug))
    .filter((s): s is Service => s !== undefined);
}
