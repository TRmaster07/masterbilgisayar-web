# Yayın Kontrol Listesi — masterbilgisayar.tr

## 1. Vercel'e deploy
1. [vercel.com](https://vercel.com) hesabı açın (GitHub ile).
2. Projeyi GitHub'a push'layın, Vercel'de "Import Project" ile seçin — ayar gerekmez, otomatik algılar.
3. Vercel → Settings → Environment Variables:
   - `NEXT_PUBLIC_GTM_ID` = GTM-XXXXXXX (GTM hesabı açınca)
   - `NEXT_PUBLIC_CLARITY_ID` = Clarity proje kimliği
4. Domains bölümüne `masterbilgisayar.tr` ekleyin, Vercel'in verdiği DNS kayıtlarını (A / CNAME) domain sağlayıcınıza girin.

## 2. Eski domain yönlendirmesi (KRİTİK)
1. `alanyabilgisayartamiri.com` ve `www.alanyabilgisayartamiri.com` domainlerini AYNI Vercel projesine ekleyin — `next.config.ts` içindeki 301 kuralları devreye girer.
2. **Yayından önce** eski sitenin tüm URL listesini çıkarın:
   - Eski GSC mülkü → Dizine Ekleme → Sayfalar raporu, VEYA
   - Eski hosting panelinden sitemap.xml
3. Her eski URL'yi yeni karşılığına eşleyin ve `next.config.ts`'te catch-all kuralın ÜSTÜNE ekleyin. Örnek:
   ```ts
   { source: "/laptop-tamiri-alanya", has: [{ type: "host", value: "www.alanyabilgisayartamiri.com" }], destination: "https://masterbilgisayar.tr/laptop-tamiri", permanent: true },
   ```
4. Eski domainin kirası SÜRESİZ yenilenmeli — yönlendirme kalıcı kalmalı.

## 3. Google Search Console
1. [search.google.com/search-console](https://search.google.com/search-console) → `masterbilgisayar.tr` için "Alan adı" mülkü ekleyin (DNS TXT doğrulaması).
2. Sitemap gönderin: `https://masterbilgisayar.tr/sitemap.xml`
3. Eski domain GSC mülkünde: Ayarlar → **Adres Değişikliği** aracıyla yeni domaini bildirin.

## 4. Google Business Profile
1. İşletme profilindeki web sitesi linkini `https://masterbilgisayar.tr` yapın.
2. GBP'den işletmenin kesin koordinatlarını alıp `src/data/business.ts` → `geo` alanını güncelleyin.
3. GBP "yorum bırakın" kısa linkini alıp `business.ts` → `REVIEWS_HREF`'i güncelleyin.

## 5. GTM + GA4 + Clarity
1. GTM konteyneri açın → kimliği env değişkenine girin.
2. GTM'de: GA4 Yapılandırma etiketi + `cta_click` özel olayı tetikleyicisi (Data Layer değişkeni `cta_type` ile) → GA4 event.
3. GA4'te `cta_click` olayını "anahtar etkinlik" (dönüşüm) olarak işaretleyin.
4. Clarity projesi açın → kimliği env değişkenine girin.

## 6. Yayın sonrası ilk hafta
- [ ] GSC: tarama hataları ve dizin durumu kontrolü
- [ ] Zengin Sonuç Testi: bir hizmet sayfası URL'si test edin (FAQ + LocalBusiness)
- [ ] PageSpeed Insights ile saha verisi takibi
- [ ] Eski URL'lerden birkaçını tarayıcıda deneyip 301'i doğrulayın

## Bekleyen içerik güncellemeleri
- [ ] Gerçek fotoğraflar (hero, hakkımızda galerisi, hizmet sayfaları) — stok kullanılmayacak
- [ ] `services.ts` içindeki başlangıç fiyatlarının teyidi
- [ ] Hafta içi çalışma saatlerinin teyidi (`business.ts`)
- [ ] İşletme e-postası (`business.ts`)
- [ ] Gerçek Google yorumlarından 3-4 alıntı (ana sayfa sosyal kanıt bölümü)
- [ ] KVKK metninin hukukçu kontrolü
