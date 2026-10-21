# Durmaz Kardeşler Yapı İnşaat

Türkçe, mobil uyumlu Next.js kurumsal sitesi ve parola korumalı içerik yönetim paneli.

## Geliştirme

Node.js 20.9 veya üzeri ve npm gerekir.

```bash
npm install
cp .env.example .env.local
```

`.env.local` dosyasında güçlü ve en az 12 karakterli bir yönetici parolası ile en az 32 baytlık rastgele bir oturum anahtarı ayarlayın. Örnek anahtar oluşturma:

```bash
openssl rand -base64 48
```

Ardından `npm run dev` komutuyla geliştirme sunucusunu başlatın. Kurumsal site `http://localhost:3000`, yönetim paneli `http://localhost:3000/admin` adresindedir. Logo dosyası panelin **Site Ayarları** bölümünden yüklenebilir; gönderilen görseldeki telefon ve WhatsApp numarası varsayılan olarak tanımlıdır.

## İçerik yönetimi

Panelden projeler ve görseller eklenebilir, düzenlenebilir ve silinebilir; hizmetler yönetilebilir; web teklif talepleri görüntülenip durumları güncellenebilir veya silinebilir; telefon, WhatsApp, hizmet bölgesi ve ana sayfa metinleri düzenlenebilir. **Site Ayarları** bölümünden Hizmetlerimiz ve Projeler sayfalarının/bölümlerinin başlık ve açıklamalarıyla Hakkımızda sayfasının metinleri ve değer kartları da düzenlenebilir. İçerikler aynı Node.js sunucusundan halka açık siteye aktarılır. Müşteri teklif formu talebi CMS'e kaydeder, ardından WhatsApp mesajını hazırlar.

## Mimari

Uygulama Next.js App Router ve React Server/Client Components kullanır. `src/app` sayfaları, layout'u, global stilleri ve HTTP Route Handler'ları barındırır. Feature kodları `src/features/<özellik>` altında bileşen, hook, API, model, stil ve yardımcı dosyaları olarak ayrıştırılır. CMS dosya depolama ve oturum imzalama gibi sunucu altyapısı `src/infrastructure`; uygulama servisleri ve domain tipleri `src/application` ve `src/domain` içindedir.

Öne çıkan feature alanları:

- `features/home`: CMS verisiyle beslenen ana sayfa, kanca ve animasyonlu mimari vinç illüstrasyonu.
- `features/projects` ve `features/services`: CMS bağlantılı portföy/katalog arayüzleri, kartlar ve yardımcılar.
- `features/inquiries`: teklif formu, talep tablosu ve talep işlemleri.
- `features/admin`: yönetim arayüzü, Redux store, panel oturumu ve yönetim API'leri.
- `features/site`: ortak gezinme ve altbilgi bileşenleri.

`/admin` isteği sunucuda imzalı oturum çereziyle doğrulanır ve başlangıç CMS verisi sunucu bileşeninden Redux Provider'a aktarılır. Yönetim API'si ayrıca her istekte oturumu yeniden doğrular. `next-redux-wrapper` Pages Router'a özgü olduğundan kaldırılmıştır; App Router Redux store'u yalnızca yönetim alanının Provider'ında oluşturur.

CMS state yönetimi Redux Toolkit ile feature içinde tutulur. `admin-thunks.ts` HTTP işlemlerini feature API istemcilerine yönlendirir; `admin-slice.ts` yükleme, hata ve CMS state geçişlerini yönetir. `use-admin-dashboard.ts` typed Redux hook'larını kullanarak panel akışlarını ve form işlemlerini sunar; `model/type.ts`, `validation.ts` ve `utils.ts` ise tipleri, kullanıcı girdisi kontrollerini ve tekrar kullanılabilir hesaplamaları içerir. Sunum bileşenleri (`components/`) iş akışlarını hook üzerinden kullanır; styled-components tanımları ilgili feature içindeki `styles/` altında tutulur. Axios yapılandırması `infrastructure/http/http-client.ts` içinde merkezileştirilmiştir.

Kurumsal sitede eklenen özgün lacivert/mavi görsel tasarım `src/app/site-design.css` ve `site-overrides.css` içindedir; animasyonlarda hareket azaltma tercihi dikkate alınır. Ana sayfa CMS'teki hizmet ve proje kayıtlarını gösterir. Ziyaretçiler `/hizmetlerimiz`, `/projeler` ve `/hakkimizda` sayfalarına gezinme menüsünden ve ana sayfa bağlantılarından ulaşabilir.

Public sayfaların SEO başlıkları ve arama açıklamaları CMS **Site Ayarları** bölümünden yönetilir. `/robots.txt` ve `/sitemap.xml` Next.js tarafından üretilir. Yayında Search Console'a `https://durmazkardeslerinsaat.com` domainini ekleyip sitemap'i `https://durmazkardeslerinsaat.com/sitemap.xml` adresinden göndermek gerekir. Canonical ve sitemap domain'i `src/presentation/utils/seo-metadata.ts` içinde yapılandırılmıştır.

### Yayın ortamı gereksinimleri

CMS, Node.js sunucu ortamında yazılabilir `.data/site-content.json` dosyası ve görseller için yazılabilir `public/uploads/` dizini kullanır. Verilerin korunması için:

- Uygulamayı kalıcı diske sahip, `next start` çalıştıran bir Node.js sunucusunda barındırın.
- `.data/` ve `public/uploads/` dizinlerini kalıcı disk üzerinde saklayın ve düzenli yedekleyin.
- Salt okunur veya geçici dosya sistemi kullanan sunucusuz dağıtımlarda kullanmayın. Birden fazla uygulama örneği/worker ile yatay ölçeklemeyin; bu depolama, tek kalıcı Node.js örneği için tasarlanmıştır.
- Uygulamayı güvenilir bir reverse proxy arkasında yayınlayın; proxy gelen `X-Real-IP` değerini silip istemcinin gerçek adresiyle yeniden yazmalıdır. Giriş ve teklif gönderim sınırları bu değeri kullanır. Header yoksa uygulama tek bir ortak sınırlama kovasına düşer; istemciden gelen `X-Forwarded-For` değerine güvenilmez.
- Yönetici girişleri IP başına 15 dakikada 8, teklif formu gönderimleri IP başına 15 dakikada 10 istekle sınırlıdır. CMS içerik güncellemeleri 2 MB, görsel yüklemeleri ise 4 MB dosya boyutunu taşıyacak kadar JSON gövdesiyle sınırlıdır.
- `CMS_ADMIN_PASSWORD` ve `CMS_SESSION_SECRET` değerlerini sunucu gizli değişkenleri olarak ayarlayın; istemciye açık `NEXT_PUBLIC_` değişkenlerine yönetici sırrı koymayın.
- Gerçek saha fotoğraflarını örnek portföy görselleri yerine yönetim panelinden yükleyin. Görsel yükleme JPG, PNG ve WebP biçimlerini, dosya başına 4 MB'a kadar destekler.

## Kullanılan kütüphaneler

Axios, Chart.js, Framer Motion, Lucide, Next.js, React Hook Form, React Redux/Redux, Slick Carousel ve styled-components.

## Kontroller

```bash
npm run build
npm audit
```
