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
