import { z } from "zod";

import { SERVICES } from "@/data/services";

const PostSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string(),
  metaDescription: z.string().min(70).max(160),
  /** ISO tarih (YYYY-MM-DD) */
  publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  /** Yazının desteklediği pillar hizmet sayfası (iç link zorunluluğu) */
  relatedService: z.string(),
  excerpt: z.string(),
  /** Markdown gövde — H2/H3 başlıklar ve göreli iç linkler içerir */
  body: z.string().min(500),
});

export type Post = z.infer<typeof PostSchema>;

const posts: Post[] = [
  {
    slug: "laptop-acilmiyor-nedenleri-cozumleri",
    title: "Laptop Açılmıyor: En Sık 7 Neden ve Çözümleri",
    metaDescription:
      "Laptopunuz açılmıyor mu? Güç, şarj, RAM, anakart kaynaklı en sık 7 nedeni ve evde deneyebileceğiniz güvenli çözümleri adım adım anlattık.",
    publishedAt: "2026-07-04",
    relatedService: "laptop-tamiri",
    excerpt:
      "Güç düğmesine basıyorsunuz ama laptop tepki vermiyor mu? Panik yapmadan önce bu 7 nedeni kontrol edin.",
    body: `Laptopunuz açılmıyorsa sorun çoğu zaman düşündüğünüzden daha basittir: vakaların önemli bölümü adaptör, batarya veya RAM temasından kaynaklanır ve ciddi bir onarım gerektirmez. Bu yazıda en sık karşılaştığımız 7 nedeni, evde güvenle deneyebileceğiniz kontrollerle birlikte sıraladık.

## 1. Adaptör ve şarj sorunu

En yaygın neden budur. Adaptör kablosunda kırılma, uçta gevşeme veya adaptörün kendisinde arıza olabilir. Mümkünse aynı voltajda başka bir adaptörle deneyin. Şarj ışığı hiç yanmıyorsa sorun büyük olasılıkla adaptörde veya şarj soketindedir.

## 2. Batarya arızası

Bataryası ömrünü tamamlamış laptoplar bazen adaptör takılıyken bile açılmaz. Çıkarılabilir bataryası olan modellerde bataryayı çıkarıp yalnızca adaptörle açmayı deneyin.

## 3. RAM teması

Laptop güç alıyor, fan dönüyor ama ekran siyah kalıyorsa klasik neden RAM temasıdır. Taşıma ve darbeler RAM'in yuvasından milim düzeyinde oynamasına yol açabilir. RAM'i çıkarıp silgiyle temizleyerek yeniden takmak çoğu zaman işe yarar — ancak cihazı açmaya çekiniyorsanız bu işlemi servise bırakın.

## 4. Ekran veya ekran kablosu arızası

Cihaz açılıyor ama görüntü yoksa, harici bir monitör bağlayın. Harici ekranda görüntü varsa sorun laptop ekranında veya kablosundadır; [laptop ekran değişimi](/laptop-ekran-degisimi) çoğu modelde aynı gün yapılır.

## 5. Aşırı ısınma koruması

Cihaz açılıp birkaç saniye içinde kapanıyorsa termal koruma devreye giriyor olabilir. Kurumuş termal macun ve tozlanmış fan bunun en sık nedenidir; çözümü [periyodik bakım](/bilgisayar-bakim)dır.

## 6. Yazılım/Windows sorunu

Logo ekranında donma veya sürekli yeniden başlama genellikle bozulan Windows dosyalarından kaynaklanır. Bu durumda [yedekli format ve Windows kurulumu](/format-windows-kurulumu) sorunu kökten çözer — dosyalarınız yedeklenir, kaybolmaz.

## 7. Anakart arızası

Hiç tepki yoksa (ışık yok, fan yok) ve adaptör sağlamsa, sorun anakart güç devresinde olabilir. Bu, evde çözülebilecek bir arıza değildir; ancak korkulanın aksine çoğu anakart arızası [çip seviyesinde onarılabilir](/anakart-tamiri) ve yeni anakart almaktan çok daha ekonomiktir.

## Hangi durumda servise gelmelisiniz?

Yukarıdaki basit kontroller (adaptör, batarya, harici ekran) sonuç vermediyse cihazı daha fazla kurcalamayın — özellikle sıvı teması varsa her açma denemesi hasarı büyütür. [Alanya laptop tamiri](/laptop-tamiri) sayfamızdan süreç ve fiyat bilgisine bakabilir, cihazınızı ücretsiz arıza tespiti için getirebilirsiniz. Tüm onarımlarımız 1 yıl garantilidir.`,
  },
  {
    slug: "bilgisayar-nasil-hizlandirilir-ssd-ram",
    title: "Bilgisayar Nasıl Hızlandırılır? SSD mi RAM mi?",
    metaDescription:
      "Yavaş bilgisayarı hızlandırmanın kanıtlanmış yolu: SSD ve RAM yükseltme. Hangisi önce yapılmalı, ne kadar fark yaratır, format çözüm olur mu?",
    publishedAt: "2026-07-04",
    relatedService: "ssd-ram-yukseltme",
    excerpt:
      "Yeni bilgisayar almadan önce okuyun: yavaşlığın gerçek nedeni ve en ekonomik çözümü çoğu zaman aynı — doğru yükseltme.",
    body: `Bilgisayarınız yavaşladıysa ilk aklınıza gelen "yenisini almak" olmasın. Yavaşlığın en sık iki nedeni mekanik disk (HDD) ve yetersiz RAM'dir; ikisi de cihaz fiyatının küçük bir bölümüne çözülür. Peki hangisi önce yapılmalı?

## Önce teşhis: yavaşlığın kaynağı ne?

Görev Yöneticisi'ni (Ctrl+Shift+Esc) açın ve Performans sekmesine bakın:

- **Disk %100 seviyesinde geziyorsa** → sorun mekanik diskte, çözüm SSD.
- **Bellek sürekli %90 üzerindeyse** → sorun RAM yetersizliğinde.
- **İkisi de normalken CPU sürekli yüksekse** → arka planda gereksiz/zararlı yazılım olabilir; [virüs temizliği veya temiz kurulum](/format-windows-kurulumu) gerekir.

## SSD: tek başına en büyük fark

Mekanik diskten SSD'ye geçiş, sıradan bir kullanıcının hissedeceği en büyük hız artışıdır: açılış süresi dakikalardan 10-15 saniyeye iner, programlar anında açılır. Windows'unuz ve tüm dosyalarınız klonlama ile birebir taşınabildiği için yeniden kurulum da gerekmez. Detaylar [SSD yükseltme](/ssd-ram-yukseltme) sayfamızda.

## RAM: çoklu görevin ilacı

Aynı anda çok sekme, Office ve uygulama kullanıyorsanız ve sistem "takılarak" yavaşlıyorsa RAM artırımı gerekir. 8 GB bugün ev kullanımı için alt sınır, 16 GB konforlu seviyedir. Cihazınızın desteklediği maksimum kapasiteyi ücretsiz kontrol ediyoruz.

## Format çözüm olur mu?

Bazen. Sistem yazılımsal olarak kirlendiyse (gereksiz programlar, zararlılar) temiz kurulum ciddi fark yaratır. Ama donanım darboğazı varsa format geçici rahatlama verir; birkaç hafta sonra aynı yavaşlık geri döner. Bu yüzden önce teşhis, sonra çözüm.

## Isınma da yavaşlatır

Sık atlanan bir neden: tozlanma ve kuruyan termal macun yüzünden ısınan işlemci kendini korumak için hız düşürür (thermal throttling). Özellikle oyun sırasında yaşanan ani performans düşüşlerinin klasik nedeni budur; çözümü [termal bakım](/bilgisayar-bakim)dır.

## Özet öneri

1. Hâlâ HDD kullanıyorsanız: önce SSD.
2. SSD var ama çoklu görevde kasıyorsa: RAM artırın.
3. Donanım yeterliyse: temiz kurulum + bakım.

Alanya'daysanız cihazınızı getirin; hangi yükseltmenin gerçekten fark yaratacağını ücretsiz analizle söyleyelim — gereksiz yükseltme önermiyoruz, [arıza çöpe gitmez](/hakkimizda) ama para da boşa gitmez.`,
  },
  {
    slug: "macbook-sivi-temasi-ilk-yardim",
    title: "MacBook'a Su Döküldü: İlk 10 Dakikada Yapılması Gerekenler",
    metaDescription:
      "MacBook'unuza su, çay veya kahve mi döküldü? Cihazı kurtaran ilk müdahale adımları ve asla yapılmaması gereken 3 hata. Alanya MacBook servisi anlatıyor.",
    publishedAt: "2026-07-04",
    relatedService: "macbook-tamiri",
    excerpt:
      "Sıvı temasında ilk 10 dakika cihazın kaderini belirler. Doğru ilk müdahale, anakartı kurtarma şansını ciddi oranda artırır.",
    body: `MacBook'a sıvı döküldüğünde ilk dakikalarda yapılanlar, cihazın tamamen kurtulmasıyla anakartın oksitlenip ağır hasar alması arasındaki farkı belirler. Servis deneyimimizde erken ve doğru müdahaleyle gelen cihazların büyük bölümü veri kaybı olmadan kurtulmaktadır.

## Hemen yapın (ilk 10 dakika)

1. **Cihazı derhal kapatın.** Güç düğmesine basılı tutarak kapatın; "belgemi kaydedeyim" diye beklemeyin — kısa devre riskine karşı her saniye önemli.
2. **Adaptörü çıkarın.** Elektrik akışı sürdükçe korozyon hızlanır.
3. **Ters V şeklinde çevirin.** Klavye aşağı bakacak şekilde çadır pozisyonunda tutun; sıvının anakarta doğru ilerlemesini yavaşlatır.
4. **Görünen sıvıyı emici bezle alın.** Bastırmadan, sürtmeden.
5. **En kısa sürede servise ulaştırın.** Dıştan kurumuş görünmesi içeride kuruduğu anlamına gelmez.

## Asla yapmayın

- **Şarja takıp "çalışıyor mu" diye denemeyin.** En sık yapılan ve en pahalıya mal olan hatadır; kısa devre o anda oluşur.
- **Pirince gömmeyin.** Pirinç efsanedir: nemi yüzeyden alır ama kart üzerindeki mineral kalıntılarını temizlemez; korozyon devam eder. Üstelik pirinç tozu portlara dolar.
- **Fön/kalorifer ile kurutmayın.** Isı, sıvıyı kartın daha derin bölgelerine taşır ve plastik parçalara zarar verir.

## Serviste ne yapıyoruz?

Sıvı temaslı cihaz atölyemizde tamamen sökülür, anakart **ultrasonik banyoda** temizlenir, mikroskop altında korozyona uğramış komponentler tespit edilip değiştirilir. Amaç sadece cihazı çalıştırmak değil, ilerde tekrarlayacak gizli korozyonu da durdurmaktır. Süreç ve fiyat bilgisi için [MacBook tamiri](/macbook-tamiri) sayfamıza bakabilirsiniz.

## Verileriniz ne olacak?

Sıvı hasarında öncelik her zaman veridir. Cihaz açılmasa bile SSD'deki veriler çoğu durumda kurtarılabilir; ayrıntılar [veri kurtarma](/veri-kurtarma) sayfamızda. Onarım öncesinde talebinize göre yedekleme yapıyoruz.

## Son söz

Tatlı su en masum, şekerli ve asitli içecekler (kahve, kola, meyve suyu) en yıkıcı senaryodur — bunlar kuruduğunda iletken ve korozif tabaka bırakır. Hangi sıvı olursa olsun: kapatın, ters çevirin, bekletmeden getirin. Alanya içindeyseniz aynı gün müdahale ediyoruz; tüm işlemler 1 yıl garantilidir.`,
  },
  {
    slug: "ps5-hdmi-arizasi-belirtileri-cozumu",
    title: "PS5 Görüntü Vermiyor: HDMI Arızası Belirtileri ve Çözümü",
    metaDescription:
      "PS5'iniz açılıyor ama TV'de görüntü yok mu? HDMI soket ve retimer arızası belirtileri, evde yapılacak kontroller ve Alanya'da aynı gün çözümü.",
    publishedAt: "2026-07-04",
    relatedService: "ps5-tamiri",
    excerpt:
      "Beyaz ışık yanıyor, ses var ama ekran kapkara mı? PS5'in en yaygın arızası HDMI hattında — ve çoğu durumda aynı gün onarılıyor.",
    body: `PS5'in en sık gördüğümüz arızası görüntü kaybıdır: konsol açılır, beyaz ışık yanar, hatta oyun sesi gelir ama TV "sinyal yok" der. Bu tablonun en yaygın nedeni HDMI soketi veya HDMI sinyalini işleyen retimer entegresinin arızasıdır. İyi haber: bu arıza konsol değişimi değil, çip seviyesinde onarım gerektirir ve genellikle aynı gün çözülür.

## Önce evde kontrol edin

Servise gelmeden şu üç kontrolü yapın:

1. **Kabloyu değiştirin.** HDMI kabloları sanılandan sık bozulur; mümkünse yüksek hızlı başka bir kabloyla deneyin.
2. **Farklı TV/monitör deneyin.** Sorun TV'nin HDMI girişinde olabilir.
3. **Güvenli modda çözünürlük sıfırlayın.** Konsol kapalıyken güç düğmesine iki bip sesi duyana kadar basılı tutun; açılan güvenli mod menüsünden "Change Video Output" seçin. Yazılımsal çözünürlük uyumsuzlukları böyle düzelir.

Bu üçü sonuç vermediyse sorun büyük olasılıkla donanımdadır.

## HDMI arızasının tipik belirtileri

- Görüntü hiç gelmiyor, "sinyal yok" uyarısı
- Görüntü aralıklı gelip gidiyor, kablo oynatınca değişiyor
- Ekranda renk bozulması, karlanma veya çizgiler
- Soketin fiziksel olarak gevşemiş/ezilmiş olması (kabloyu takarken boşluk hissi)

Soket hasarı genellikle kablonun takılıyken çekilmesi veya konsolun kablo takılıyken taşınmasıyla oluşur.

## Onarım nasıl yapılıyor?

HDMI soketi anakarta lehimli olduğu için değişim, sıcak hava istasyonu ve mikroskop altında yapılır. Soket sağlamsa sinyali güçlendiren retimer entegresi arızalı olabilir; bu da aynı yöntemle değiştirilir. Her iki işlem de doğru ekipmanla kalıcı sonuç verir — ayrıntılar [PS5 tamiri](/ps5-tamiri) sayfamızda.

## Isınma sorununu da birlikte çözdürün

HDMI onarımı için gelen konsolların çoğunda yoğun toz birikimi ve bozulmaya başlamış sıvı metal görüyoruz. Konsol zaten açılmışken [termal bakımı](/bilgisayar-bakim) birlikte yaptırmak hem fan sesini keser hem konsol ömrünü uzatır.

## Alanya'da PS5 HDMI onarımı

Parça stokta olduğunda HDMI soket değişimini aynı gün teslim ediyoruz; işçilik ve parça 1 yıl garantilidir. Arıza tespiti ücretsizdir — konsolunuzu getirin, net fiyatı işlem öncesinde söyleyelim. [PS4](/ps4-tamiri) ve [Xbox](/xbox-tamiri) konsollarında da aynı arızaya bakıyoruz.`,
  },
];

const PostsSchema = z.array(PostSchema).superRefine((list, ctx) => {
  const serviceSlugs = new Set(SERVICES.map((s) => s.slug));
  for (const post of list) {
    if (!serviceSlugs.has(post.relatedService)) {
      ctx.addIssue({
        code: "custom",
        message: `"${post.slug}" yazısının relatedService değeri ("${post.relatedService}") tanımlı bir hizmet değil`,
      });
    }
    if (!post.body.includes(`](/${post.relatedService})`)) {
      ctx.addIssue({
        code: "custom",
        message: `"${post.slug}" yazısı gövde içinde /${post.relatedService} sayfasına link vermiyor (iç link zorunluluğu)`,
      });
    }
  }
});

export const POSTS: readonly Post[] = PostsSchema.parse(posts);

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}
