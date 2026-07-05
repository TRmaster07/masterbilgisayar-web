import { z } from "zod";

import { SERVICES } from "@/data/services";

/**
 * Semt (location) sayfaları — map pack dışındaki "semt + tamir" aramalarını
 * hedefler. Her sayfa özgün içerik taşır; şablon kopyası (doorway page)
 * üretmek YASAKTIR — yeni semt eklerken localNotes ve faqs özgün yazılmalıdır.
 *
 * TODO: Adresten teslim alma kapsamı işletme sahibiyle teyit edilecek.
 */

const LocationSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  /** Semt adı (ör. "Oba") */
  name: z.string(),
  title: z.string(),
  metaTitle: z.string().max(60),
  metaDescription: z.string().min(70).max(160),
  /** Mağazadan yaklaşık uzaklık (dürüst, "yaklaşık" ifadeli) */
  distance: z.string(),
  /** Arama niyetini ilk paragrafta karşılayan giriş */
  intro: z.string(),
  /** Semte özel, özgün içerik blokları */
  localNotes: z.array(z.object({ title: z.string(), body: z.string() })).min(2),
  /** Bu semtte öne çıkan hizmet slug'ları */
  featuredServices: z.array(z.string()).min(3),
  faqs: z
    .array(z.object({ question: z.string(), answer: z.string() }))
    .min(3),
});

export type Location = z.infer<typeof LocationSchema>;

const locations: Location[] = [
  {
    slug: "oba-bilgisayar-tamiri",
    name: "Oba",
    title: "Oba Bilgisayar ve Laptop Tamiri",
    metaTitle: "Oba Bilgisayar Tamiri | Master Bilgisayar",
    metaDescription:
      "Oba'da bilgisayar ve laptop tamiri mi arıyorsunuz? 5 dakika mesafedeki servisimizde ücretsiz arıza tespiti, 1 yıl garanti. Adresten alma imkânı.",
    distance: "yaklaşık 3 km — araçla 5-10 dakika",
    intro:
      "Oba'da oturuyorsanız bilgisayarınız veya laptopunuz için şehir merkezine inmenize gerek yok: servisimiz Güller Pınarı'nda, Oba sınırına birkaç dakika mesafede. Cihazınızı kendiniz getirebilir ya da adresinizden teslim almamızı isteyebilirsiniz — arıza tespiti her durumda ücretsizdir.",
    localNotes: [
      {
        title: "Oba'ya en yakın teknik servislerden biriyiz",
        body: "Servisimiz Yenilmez Caddesi üzerinde, Oba Çayı tarafından şehir merkezine girişte yer alır. Oba'nın site bölgelerinden araçla 5-10 dakikada ulaşabilirsiniz; D-400 üzerinden gelenler için otopark sorunu yaşatmayan bir konumdayız.",
      },
      {
        title: "Oba'dan en çok hangi arızalar geliyor?",
        body: "Oba'dan bize en sık evden çalışanların ve öğrencilerin laptop arızaları ulaşıyor: açılmama, şarj sorunu, kırık ekran ve yavaşlama. Ayrıca sitelerde yaygın kullanılan hepsi bir arada (All-in-One) bilgisayarların ve oyun konsollarının onarımı da sık taleplerden.",
      },
      {
        title: "Hastane ve iş yerleri için hızlı dönüş",
        body: "Alanya Eğitim ve Araştırma Hastanesi çevresindeki iş yerleri ve ofisler için aynı gün müdahale önceliğimiz var — işi bilgisayara bağlı olanları bekletmiyoruz; format, SSD yükseltme ve bakım işlemlerinin çoğu aynı gün teslim edilir.",
      },
    ],
    featuredServices: [
      "laptop-tamiri",
      "bilgisayar-tamiri",
      "laptop-ekran-degisimi",
      "ssd-ram-yukseltme",
      "format-windows-kurulumu",
      "ps5-tamiri",
    ],
    faqs: [
      {
        question: "Oba'dan cihazımı almaya geliyor musunuz?",
        answer:
          "Evet. Oba, adresten teslim alma hizmetimizin kapsamındadır — telefonla veya WhatsApp'tan adresinizi iletin, cihazınızı alıp onarım sonrası geri getirelim.",
      },
      {
        question: "Oba'ya yol tarifi nasıl?",
        answer:
          "Servisimiz Güller Pınarı Mah. Yenilmez Cd. No:41 adresinde, Oba'dan şehir merkezi yönüne girişte. Sayfadaki 'Yol Tarifi' butonuna dokunduğunuzda Google Haritalar sizi doğrudan kapımıza getirir.",
      },
      {
        question: "Aynı gün teslim Oba için de geçerli mi?",
        answer:
          "Evet — format, temizlik/bakım, SSD yükseltme ve stokta panel olan ekran değişimlerinde cihazınızı aynı gün teslim edebiliyoruz. Anakart seviyesi onarımlarda süre 1-3 iş günüdür.",
      },
    ],
  },
  {
    slug: "mahmutlar-bilgisayar-tamiri",
    name: "Mahmutlar",
    title: "Mahmutlar Bilgisayar ve Laptop Tamiri",
    metaTitle: "Mahmutlar Bilgisayar Tamiri | Master Bilgisayar",
    metaDescription:
      "Mahmutlar'da güvenilir bilgisayar ve laptop tamiri: adresten teslim alma, ücretsiz arıza tespiti, 1 yıl garanti. MacBook ve konsol tamiri dahil.",
    distance: "yaklaşık 12 km — araçla 15-20 dakika",
    intro:
      "Mahmutlar'da bilgisayarı veya laptopu arızalanan çoğu kişi 'Alanya'ya kadar gitmeye değer mi?' diye düşünür. Cevabımız: gitmenize gerek yok — cihazınızı Mahmutlar'daki adresinizden teslim alıyor, onarım tamamlanınca elden geri getiriyoruz. Arıza tespiti ücretsiz, tüm işlemler 1 yıl garantilidir.",
    localNotes: [
      {
        title: "Mahmutlar'a düzenli teslim alma / getirme hizmeti",
        body: "Mahmutlar, adresten alım rotamızın içindedir. Barbaros Caddesi ve sahil şeridindeki sitelerden düzenli cihaz alıyoruz; telefonla gün ve saat kararlaştırmak yeterli. Dilerseniz D-400 üzerinden 15-20 dakikada servisimize kendiniz de gelebilirsiniz.",
      },
      {
        title: "Yabancı yerleşimcilere de hizmet veriyoruz",
        body: "Mahmutlar'da yaşayan yabancı komşularımızdan çok sayıda MacBook ve laptop tamiri talebi alıyoruz. Fiyat her zaman işlem öncesinde net olarak bildirilir; cihazların klavye düzeni, yurt dışı garanti geçmişi ve farklı şarj standartları konusunda deneyimliyiz. WhatsApp üzerinden İngilizce de yazabilirsiniz.",
      },
      {
        title: "Nem ve sahil ikliminin cihazlara etkisi",
        body: "Sahile yakın konutlarda nem, elektronik kartlarda oksitlenmeyi hızlandırır — Mahmutlar'dan gelen cihazlarda bunu sık görüyoruz. Yılda bir termal bakım ve iç temizlik, bu iklimde cihaz ömrünü belirgin şekilde uzatır; bakım işlemleri çoğunlukla aynı gün teslim edilir.",
      },
    ],
    featuredServices: [
      "laptop-tamiri",
      "macbook-tamiri",
      "bilgisayar-bakim",
      "anakart-tamiri",
      "veri-kurtarma",
      "arizali-cihaz-alimi",
    ],
    faqs: [
      {
        question: "Mahmutlar'dan cihaz alıyor musunuz, ücreti var mı?",
        answer:
          "Evet, Mahmutlar'dan cihaz teslim alıyoruz. Onarım yaptırmanız durumunda alma-getirme için ek ücret talep etmiyoruz; planlama için telefonla veya WhatsApp'tan ulaşmanız yeterli.",
      },
      {
        question: "Mahmutlar'a servis kaç günde döner?",
        answer:
          "Basit işlemlerde (format, bakım, SSD) cihaz genellikle ertesi gün adresinize döner. Parça gerektiren onarımlarda süreyi tespit sonrasında net olarak bildiririz.",
      },
      {
        question: "İngilizce iletişim mümkün mü? / Do you speak English?",
        answer:
          "Evet — WhatsApp üzerinden İngilizce yazışabilirsiniz. Yes, you can text us on WhatsApp in English for free diagnostics and a fixed price quote.",
      },
    ],
  },
  {
    slug: "kestel-bilgisayar-tamiri",
    name: "Kestel",
    title: "Kestel Bilgisayar ve Laptop Tamiri",
    metaTitle: "Kestel Bilgisayar Tamiri | Master Bilgisayar",
    metaDescription:
      "Kestel'de laptop ve bilgisayar tamiri: ALKÜ öğrencilerine hızlı çözüm, ücretsiz arıza tespiti, 1 yıl garanti, adresten teslim alma imkânı.",
    distance: "yaklaşık 7 km — araçla 10-15 dakika",
    intro:
      "Kestel'de laptopu bozulan birinin en sık sorunu zamandır: ödev teslimi, sınav haftası veya evden çalışma derken cihazsız kalmak olmaz. Servisimiz Kestel'e 10-15 dakika mesafede; cihazınızı adresinizden alabiliyor, çoğu işlemi aynı gün bitiriyoruz. Arıza tespiti ücretsizdir.",
    localNotes: [
      {
        title: "ALKÜ öğrencilerine öncelikli destek",
        body: "Alanya Alaaddin Keykubat Üniversitesi'nin Kestel kampüsünden çok sayıda öğrenci laptopu onarıyoruz. Sınav ve ödev dönemlerinde önceliklendirme yapıyor, mümkün olan işlemleri bekletmeden aynı gün teslim ediyoruz. Öğrenci bütçesini biliyoruz: net fiyat işlem öncesi söylenir, gereksiz masraf çıkarılmaz — onarım ekonomik değilse dürüstçe söyleriz.",
      },
      {
        title: "Kestel'den en çok gelen arızalar",
        body: "Yoğun taşınan öğrenci laptoplarında en sık kırık ekran, menteşe hasarı ve şarj soketi arızası görüyoruz. Üçü de çoğunlukla 1-2 gün içinde çözülür; yaygın modellerin panelleri stoğumuzda bulunur ve ekran değişimi aynı gün yapılabilir.",
      },
      {
        title: "Veri kaybına karşı: bitirme tezleri güvende",
        body: "Ödev ve tez döneminde disk arızası yaşayan öğrenciler için veri kurtarma önceliğimizdir. Açılmayan cihazdan dosyalarınızı çoğu durumda kurtarabiliyoruz — 'veri kurtarılamazsa ücret yok' prensibiyle çalışırız.",
      },
    ],
    featuredServices: [
      "laptop-tamiri",
      "laptop-ekran-degisimi",
      "veri-kurtarma",
      "ssd-ram-yukseltme",
      "format-windows-kurulumu",
      "bilgisayar-bakim",
    ],
    faqs: [
      {
        question: "Kestel'den laptopumu almaya gelir misiniz?",
        answer:
          "Evet, Kestel adresten teslim alma kapsamımızdadır. Kampüs çevresi ve site bölgelerinden gün içinde cihaz alıyoruz; WhatsApp'tan adres ve uygun saat iletmeniz yeterli.",
      },
      {
        question: "Öğrenciye özel fiyat uygulamanız var mı?",
        answer:
          "Fiyatlarımız zaten yetkili servislerin belirgin altındadır ve tespit ücretsizdir. Öğrenci yoğun dönemlerde işçilikte elimizden gelen kolaylığı sağlıyoruz — çekinmeden sorun, cihazı görmeden de yaklaşık aralık söyleyebiliriz.",
      },
      {
        question: "Sınav haftasında acil onarım mümkün mü?",
        answer:
          "Format, bakım, SSD ve stokta panel olan ekran değişimleri aynı gün teslim edilir. Cihazı sabah bırakırsanız çoğu durumda akşam alırsınız; aciliyeti telefonda belirtmeniz yeterli.",
      },
    ],
  },
  {
    slug: "cikcilli-bilgisayar-tamiri",
    name: "Cikcilli",
    title: "Cikcilli Bilgisayar ve Laptop Tamiri",
    metaTitle: "Cikcilli Bilgisayar Tamiri | Master Bilgisayar",
    metaDescription:
      "Cikcilli'de bilgisayar ve laptop tamiri: birkaç dakika mesafede servis, ücretsiz arıza tespiti, 1 yıl garanti. Oyun bilgisayarı ve konsol tamiri dahil.",
    distance: "yaklaşık 3 km — araçla 5-10 dakika",
    intro:
      "Cikcilli'de oturuyorsanız Alanya'nın en yakın komponent seviyesi tamir atölyelerinden birine birkaç dakika mesafedesiniz. Alanyum AVM çevresinden veya site bölgelerinden 5-10 dakikada servisimize ulaşabilir, dilerseniz cihazınızı adresinizden aldırabilirsiniz. Arıza tespiti ücretsizdir.",
    localNotes: [
      {
        title: "AVM'ye gelmişken bırakın, dönüşte alın",
        body: "Cikcilli'den müşterilerimizin sık kullandığı yöntem: Alanyum tarafına inerken cihazı bize bırakmak. Format, bakım ve SSD yükleme gibi işlemler 1-3 saat sürdüğü için alışveriş dönüşünde cihazınızı hazır teslim alabilirsiniz.",
      },
      {
        title: "Oyun bilgisayarları ve konsollar",
        body: "Cikcilli'deki sitelerden bize en çok oyun donanımı geliyor: ısınan gaming laptoplar, görüntü vermeyen ekran kartları ve PS5/Xbox konsolları. Termal bakım ve sıvı metal uygulamasıyla oyun performansını fabrika değerlerine döndürüyoruz; konsol HDMI arızaları çoğunlukla aynı gün çözülür.",
      },
      {
        title: "Ev ve ofis için yerinde pratiklik",
        body: "Cikcilli yakınlığımız sayesinde bu bölgede adresten alma-getirme aynı gün içinde planlanabilir. Kurumsal ofisler için toplu bakım ve format işlerini mesai dışına da alabiliyoruz — iş akışınız kesintiye uğramaz.",
      },
    ],
    featuredServices: [
      "bilgisayar-tamiri",
      "ekran-karti-tamiri",
      "ps5-tamiri",
      "bilgisayar-bakim",
      "laptop-tamiri",
      "ssd-ram-yukseltme",
    ],
    faqs: [
      {
        question: "Cikcilli'den servise nasıl ulaşırım?",
        answer:
          "Servisimiz Güller Pınarı Mah. Yenilmez Cd. No:41'de — Cikcilli'den şehir merkezi yönünde araçla 5-10 dakika. 'Yol Tarifi' butonuyla Google Haritalar sizi doğrudan getirir; dilerseniz cihazınızı adresinizden de alırız.",
      },
      {
        question: "Oyun bilgisayarım ısınıyor, Cikcilli'den aynı gün çözülür mü?",
        answer:
          "Büyük olasılıkla evet. Isınma sorunlarının çoğu termal bakımla çözülür ve bakım 1-3 saat sürer — sabah bırakılan cihaz genellikle aynı gün teslim edilir.",
      },
      {
        question: "PS5'imi Cikcilli'den getirsem ne zaman alırım?",
        answer:
          "HDMI ve ısınma gibi yaygın PS5 arızalarında parça stoktaysa aynı gün, değilse 1-2 iş günü içinde teslim ediyoruz. Tespit ücretsizdir, net süre ve fiyat işlem öncesi bildirilir.",
      },
    ],
  },
  {
    slug: "avsallar-bilgisayar-tamiri",
    name: "Avsallar",
    title: "Avsallar Bilgisayar ve Laptop Tamiri",
    metaTitle: "Avsallar Bilgisayar Tamiri | Master Bilgisayar",
    metaDescription:
      "Avsallar'da bilgisayar ve laptop tamiri: otel ve işletmelere hızlı destek, ücretsiz arıza tespiti, 1 yıl garanti. Teslim alma için arayın.",
    distance: "yaklaşık 23 km — araçla 25-30 dakika",
    intro:
      "Avsallar'da güvenilir bilgisayar tamircisi bulmak kolay değil; çoğu cihaz ya Alanya merkeze ya da Manavgat'a gidiyor. Master Bilgisayar olarak Avsallar'dan gelen cihazlara aynı titizlikle bakıyor, uzaklığı sizin için sorun olmaktan çıkarıyoruz: telefonla planlayarak cihazınızı teslim alabiliyor veya kargo ile kabul ediyoruz. Arıza tespiti ücretsizdir.",
    localNotes: [
      {
        title: "Otel ve turizm işletmelerine öncelik",
        body: "Avsallar ve İncekum bölgesindeki oteller için resepsiyon bilgisayarı, yazıcı bağlantılı sistemler ve ofis donanımı arızalarında hızlı dönüş kritik — sezonda cihaz bekleyemez. Otel ve işletme arızalarında teslim alma ve önceliklendirme yapıyoruz; toplu bakım anlaşması için arayabilirsiniz.",
      },
      {
        title: "Uzaklık sorun değil: planlı alım ve kargo",
        body: "Avsallar'a düzenli rota kadar sık çıkmasak da haftanın belirli günlerinde bölgeden cihaz topluyoruz; telefonla gün belirlemek yeterli. Acil durumlarda cihazınızı kargoyla da gönderebilirsiniz — paketleme konusunda telefonda yönlendiriyoruz, kargo süreci boyunca cihaz sigortalı gönderilebilir.",
      },
      {
        title: "Sezonluk kullanımın yıprattığı cihazlar",
        body: "Yazlık konutlarda aylarca kapalı kalan bilgisayarlarda nem kaynaklı oksitlenme ve şişen batarya sorunlarını sık görüyoruz. Sezon başında yaptırılacak bir bakım ve kontrol, yaz ortasında cihazsız kalmanızı önler.",
      },
    ],
    featuredServices: [
      "bilgisayar-tamiri",
      "laptop-tamiri",
      "monitor-tamiri",
      "bilgisayar-bakim",
      "veri-kurtarma",
      "format-windows-kurulumu",
    ],
    faqs: [
      {
        question: "Avsallar'a teslim alma hizmetiniz var mı?",
        answer:
          "Evet, planlı olarak var: haftanın belirli günlerinde Avsallar bölgesinden cihaz alıyoruz. Telefonla veya WhatsApp'tan yazın, ilk uygun günü birlikte belirleyelim. Acil durumlar için kargo seçeneği de mevcut.",
      },
      {
        question: "Kargoyla göndersem cihazım güvende olur mu?",
        answer:
          "Evet — paketleme için telefonda adım adım yönlendiriyoruz (orijinal kutu şart değil). Cihaz elimize ulaştığında sizi arayıp durumu teyit ediyor, tespit sonrası net fiyatı bildiriyoruz.",
      },
      {
        question: "Otelimizin bilgisayarları için sezonda destek alabilir miyiz?",
        answer:
          "Evet. Avsallar bölgesindeki oteller ve işletmeler için öncelikli teslim alma ve dönüş yapıyoruz; sezon öncesi toplu bakım planlaması için bizi arayın.",
      },
    ],
  },
];

const LocationsSchema = z.array(LocationSchema).superRefine((list, ctx) => {
  const serviceSlugs = new Set(SERVICES.map((s) => s.slug));
  for (const location of list) {
    for (const slug of location.featuredServices) {
      if (!serviceSlugs.has(slug)) {
        ctx.addIssue({
          code: "custom",
          message: `"${location.slug}" sayfasının featuredServices alanındaki "${slug}" tanımlı bir hizmet değil`,
        });
      }
    }
  }
});

export const LOCATIONS: readonly Location[] = LocationsSchema.parse(locations);

export function getLocation(slug: string): Location | undefined {
  return LOCATIONS.find((l) => l.slug === slug);
}
