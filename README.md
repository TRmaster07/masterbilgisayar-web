# Master Bilgisayar — masterbilgisayar.tr

Alanya bilgisayar teknik servisi web sitesi. Next.js App Router + TypeScript strict + Tailwind CSS v4 + shadcn/ui. Tüm sayfalar statik üretilir (SSG).

## Komutlar

```bash
npm run dev     # geliştirme sunucusu
npm run build   # production build (Zod veri doğrulaması dahil)
npm run lint    # ESLint
```

## Mimari

- **Tek doğruluk kaynağı:** Tüm işletme bilgisi `src/data/business.ts`, tüm hizmet içeriği `src/data/services.ts`, blog `src/data/posts.ts`. Sayfalar, sitemap, schema markup ve iç linkler buradan türetilir.
- **Zod koruması:** Meta uzunlukları, kırık iç linkler ve eksik alanlar build sırasında hata verir.
- **Yeni hizmet eklemek:** `services.ts`'e kayıt ekleyin — sayfa, sitemap ve linkler otomatik oluşur.
- **Yeni blog yazısı:** `posts.ts`'e ekleyin; gövde markdown'dır ve en az bir hizmet sayfasına link vermek zorundadır.

## Analitik

GTM + Consent Mode v2 + Microsoft Clarity. Kimlikler `.env.local` dosyasında (`.env.example`'a bakın); boşken hiçbir script yüklenmez.

## Yayın

Adım adım yayın süreci için `docs/YAYIN.md` dosyasına bakın (Vercel, DNS, 301 yönlendirmeler, GSC, GTM).
