# Google Ads Hazırlık Raporu: Zęby w Turcji (leczeniezebowwturcji.pl)

Tarih: 16 Ekim 2026 · Kapsam: depodaki site kodu (tüm sayfalar, form, takip, yasal metinler, SEO altyapısı)

## 1. Yönetici özeti

**Genel hazırlık tahmini: yaklaşık %50.** Bu rakam benim ağırlıklı, öznel tahminimdir, ölçülmüş bir skor değildir (hesap aşağıda).

- **İçerik ve güven tarafı güçlü (~%80).** Tedavi sayfaları, fiyat listesi, SSS, rehberler, yasal sayfalar, operatör bilgisi ve tıbbi iddialardan kaçınan dil Google Ads politikaları açısından düşük riskli.
- **Reklam altyapısı neredeyse sıfır (~%10-15).** Sitede Google etiketi, GA4, Google Ads dönüşüm etiketi, `gclid` yakalama ve onay (consent) mekanizması yok. Bu haliyle reklam çıkılabilir ama hiçbir şey ölçülemez ve optimize edilemez.
- **Dönüşüm yolu tek kanallı.** Sitede hiç `tel:` veya WhatsApp (`wa.me`) bağlantısı yok. Tek dönüşüm formu doldurmak. Polonya diş turizminde WhatsApp/telefon genellikle ana kanal olduğu için büyük kayıp.
- **Kritik bağımlılık:** Çerez politikası şu an "reklam/pazarlama aracı kullanmıyoruz" diyor. Google etiketi eklenmeden önce onay banner'ı ve politika güncellemesi şart (politika bunu kendisi de taahhüt ediyor).

**Kısa karar:** Kampanya kurulmadan önce 4 işin bitmesi gerekiyor: (1) onay mekanizması + çerez/gizlilik metni güncellemesi, (2) GA4 + Google Ads dönüşüm etiketi, (3) tıklanabilir telefon/WhatsApp, (4) `gclid` yakalama. Bunlar yaklaşık 2-4 iş günü.

## 2. Skor hesabı

| Alan | Ağırlık | Puan | Katkı |
|---|---|---|---|
| İçerik ve sayfa kapsamı | 15 | 85 | 12,8 |
| Güven ve yasal | 15 | 80 | 12,0 |
| Dönüşüm yolu | 15 | 60 | 9,0 |
| Ölçüm / etiketleme | 25 | 10 | 2,5 |
| Onay ve gizlilik uyumu | 10 | 15 | 1,5 |
| Reklam politikası uyumu | 10 | 60 | 6,0 |
| Reklama özel sayfa yapısı | 10 | 40 | 4,0 |
| **Toplam** | **100** | | **~48** |

Ölçüm en yüksek ağırlıkta çünkü Google Ads'te dönüşüm verisi olmadan Smart Bidding çalışmaz ve bütçe kör harcanır.

## 3. Mevcut sayfalar (hazır olanlar)

| Reklam grubu teması | Sayfa | Durum |
|---|---|---|
| Fiyat / "zęby w Turcji koszt" | `/koszt` (28 kalem, EUR + yaklaşık PLN, tarihli) | Hazır, güçlü |
| Implant | `/implanty` | Hazır |
| Zirkonyum kron | `/korony-cyrkonowe` (150 EUR/kalem) | Hazır |
| Lamine / licówki | `/licowki` | Hazır |
| Tüm çene | `/cala-szczeka` | Hazır (tıbbi inceleme yapılmış) |
| All-on-4 | `/all-on-4` | Hazır |
| Antalya diş hekimi | `/antalya` | Hazır |
| UK'deki Polonyalılar | `/uk`, `/uk/...funtach`, `/uk/jak-zaplacic...` | Hazır (finansman/taksit kasıtlı kapalı) |
| Güven | `/opinie`, `/przed-i-po`, `/nasi-lekarze`, `/o-nas`, `/jak-wybrac-klinike` | Hazır |
| Dönüşüm | `/kontakt` + form | Çalışıyor (Formspree), bkz. eksikler |
| Yasal | gizlilik, çerez, regulamin, reklamacje, operatör sayfası | Yayında |
| Rehberler | 7 rehber + SSS sayfası | Hazır |

Derlemede (`npm run build`) hata yok, tüm rotalar üretiliyor. Sitemap, robots, yapılandırılmış veri (Dentist/MedicalClinic), canonical, OG görselleri mevcut.

## 4. Eksikler ve boşluklar

### 4.1 Kritik (kampanya öncesi zorunlu)

1. **Google etiketi / GTM / GA4 / Ads dönüşümü yok.**
   `window.dataLayer` push'ları var (`contact_start`, `contact_submit`, CTA tıklamaları), yani GTM kurulursa olaylar hazır. Ama etiket yüklenmiyor; olaylar şu an sadece Vercel Analytics'e gidiyor. Gerekli: GTM (veya doğrudan gtag), GA4 mülkü, Google Ads dönüşüm eylemi (`contact_submit` birincil), Ads ↔ GA4 bağlantısı.
2. **Onay (consent) mekanizması yok.**
   Polonya = AEA. Reklam etiketleri için Consent Mode v2 + CMP/banner gerekir. Banner olmadan ya yasa ihlali olur ya da Google dönüşüm modellemesi çalışmaz. `/cookies` sayfası "pazarlama/reklam aracı kullanmıyoruz" diyor; etiket eklenince bu metin yanlış olur. `/polityka-prywatnosci` içine Google (Ads/GA4) alıcı olarak, aktarım gerekçesiyle eklenmeli.
3. **`gclid`/`gbraid`/`wbraid` yakalanmıyor.**
   `lead-form.tsx` sadece `utm_*` ve `guide_source` okuyor, `tracked-link.tsx` iç linklerde sadece `utm_*` taşıyor. Kullanıcı reklamdan gelip ikinci sayfaya geçerse `gclid` kaybolur, Formspree'ye de gitmez. Sonuç: gerçek hasta/satış verisini Ads'e geri yükleme (offline conversion import) imkansız. İdeal: `gclid`'i yakala, forma gizli alan olarak ekle, `/api/lead` → Formspree'ye ilet.
4. **Telefon / WhatsApp tıklama yolu yok.**
   Sitede `tel:` ve `wa.me` bağlantısı sıfır. Form seçeneklerinde WhatsApp var ama kullanıcı numarasını yazıyor. Eksikler: tıklanabilir WhatsApp butonu, telefon bağlantısı, ayrı dönüşüm olayları (`whatsapp_click`, `phone_click`). Ayrıca Ads'te çağrı/ WhatsApp varlıkları için sitede görünür numara gerekir (şu an numara yalnızca operatör bilgi bloklarında).
5. **Yanıt süresi taahhüdü boş.** `CONTACT_PROMISE.responseTime = null`. Lead formunda "X saat içinde döneriz" yok; reklamdan gelen trafikte dönüşüm oranını doğrudan etkiler. Kliniğin gerçek SLA'sı onaylanmalı.

### 4.2 Yüksek öncelik

6. **Reklama özel iniş sayfası yok.** Mevcut sayfalar editoryal (uzun, çok menülü, çok çıkış linki). SEO için iyi, ama ücretli trafikte dönüşümü düşürür. Öneri: 3-4 sade iniş sayfası (implant, lamine/zirkonyum kron, All-on-4/tüm çene, fiyat/teklif) tek CTA, kısa form, güven kutusu ile. Mevcut sayfalarla içerik çakışmasını `seo-intent-map.md` kurallarına göre noindex ile çözmek mümkün.
7. **Mobil sabit CTA var (iyi), ama "Sprawdź koszt" tek mesaj.** Reklam metniyle birebir uyumlu başlık/CTA varyantları (anahtar kelimeye göre) yok. Reklam grubu başına dinamik başlık gerekebilir.
8. **Güven belgeleri yayınlanmamış.** `lib/credentials.ts` boş, bu yüzden `/dokumenty-i-licencje` sayfası yok. Vergi no ve MERSIS no boş. Sağlık Bakanlığı sağlık turizmi yetki belgesi, klinik ruhsatı, doktor diplomaları eklenirse hem Ads hem hasta güveni için büyük artı (ve reklam hesabı doğrulamasında işe yarar).
9. **Dönüşüm değeri / lead kalitesi ölçümü yok.** Form Formspree üzerinden e-postaya düşüyor; CRM yok, lead durumu (randevu, ödeme) izlenmiyor. Smart Bidding için en azından "nitelikli lead" geri bildirimi (offline import) planlanmalı.
10. **Sayfa hızı ölçülmedi.** Bu ortamdan canlı siteye erişim yok (proxy 403). Vercel Speed Insights bağlı ama veriyi göremedim. Mevcut kaynak görseller ~100-220 KB JPEG, `next/image` AVIF/WebP açık; iyi görünüyor, ama Core Web Vitals / PageSpeed mobil skorunu canlıda doğrulamak lazım (iniş sayfası deneyimi Kalite Puanı'nın parçası).

### 4.3 Orta öncelik

11. **Anahtar kelime kapsamı:** Ayrı sayfası olmayan, aranan konular: ortodonti/şeffaf plak, protez/köprü, kanal tedavisi, beyazlatma (sadece `/koszt` SSS'te), "All-on-6" (bilinçli ertelenmiş), "bonding" (ertelenmiş). Ads'te bu kelimeler için ya sayfa ya da hariç tutma gerekir.
12. **Hedef kitle / dil:** Tüm site Lehçe; UK için Lehçe sayfalar var, İngilizce yok. UK'de İngilizce aramalar (ör. "dental treatment Turkey") kapsanmıyor, bu bilinçli olabilir.
13. **Canlı domain doğrulaması:** Kodda varsayılan domain `leczeniezebowwturcji.pl`, depo adı `zebywturcjikoszt.pl`. Reklam final URL'sinin hangi domain olacağını teyit edin (`NEXT_PUBLIC_SITE_URL` ortam değişkeni).
14. **GBP bağlantısı:** Google Haritalar kaydı (5,0 · 1157 yorum) sitede referans, ama GBP'nin Ads hesabına bağlanıp konum varlığı olarak eklenmesi site dışında yapılacak iş.

### 4.4 Site dışı (depoda doğrulanamayan) hazırlıklar

Bunları koddan göremiyorum, kontrol listesi olarak ekledim:

- [ ] Google Ads hesabı, faturalandırma, reklamveren doğrulaması (sağlık kategorisi için istenebilir)
- [ ] Google Search Console doğrulaması ve Ads ile bağlantı
- [ ] GA4 mülkü ve Ads bağlantısı
- [ ] Google Business Profile doğrulama + Ads'e bağlama
- [ ] Dönüşüm eylemleri: form gönderimi, WhatsApp, telefon
- [ ] Negatif kelime listesi (ucuz, bedava, forum, ranking, praca/iş, NFZ, ubezpieczenie…)
- [ ] Kampanya hedefi: Polonya + UK (Polonyalı topluluk), dil Lehçe
- [ ] Bütçe, teklif stratejisi (başta Maksimize Dönüşüm yerine manuel/Max. tıklama, 30+ dönüşüme kadar)

## 5. Google Ads politika riskleri

| Konu | Durum | Not |
|---|---|---|
| Sağlık ve ilaç politikası | Düşük risk | Diş hizmetleri genelde izinli. Hedef ülke (PL, UK) için kısıtlama olup olmadığı reklam hesabında doğrulanmalı. |
| Yanıltıcı/abartılı iddia | Düşük risk | Sitede "garanti", "ağrısız", "ömür boyu" gibi vaatler yok; hatta bunlara karşı uyarı var. Reklam metinleri de aynı çizgide kalmalı. |
| Fiyat tutarlılığı | Dikkat | Reklamdaki fiyat sayfadaki fiyatla birebir olmalı. Fiyatlar EUR + yaklaşık PLN, tarihli; reklamda "od 150 EUR" gibi yazılacaksa kapsamı (kron tek kalem, implant/abutment ayrı) açık yazılmalı. |
| Önce/sonra görselleri | Doğrulayın | Sitede galeri var. Reklam görsel varlıklarında kullanmadan önce güncel Google politikasını kontrol edin. |
| Yeniden pazarlama (sağlık) | **Yüksek risk** | Sağlık durumuna dayalı kişiselleştirilmiş reklam kısıtlıdır. Diş tedavisi sayfaları üzerinden remarketing listesi kurmak hesap uyarısı doğurabilir; ilk aşamada kapalı tutmanız önerilir. |
| Tıbbi veri / form | Dikkat | Form sağlık verisi istemiyor (iyi). Etiketler form alanlarını (isim, telefon, mesaj) asla toplamamalı; yalnızca olay adı gönderilmeli. |
| İşletme şeffaflığı | İyi | Operatör adı, adres, e-posta, telefon, çalışma saatleri, gizlilik/şartlar sayfaları mevcut. Eksik: vergi no, MERSIS, belgeler. |
| Ticari amaç beyanı | İyi | Sitede "operatör kliniği de işletiyor" şeffaf biçimde yazılı; reklam metinleri de bunu çelişmemeli. |

## 6. Önerilen yol haritası

**Aşama 1: Zorunlu (2-4 iş günü)**
1. Onay banner'ı (CMP) + Consent Mode v2; `/cookies` ve `/polityka-prywatnosci` güncellemesi
2. GTM veya gtag; GA4; Ads dönüşüm etiketi (`contact_submit`)
3. WhatsApp ve telefon bağlantıları + olayları
4. `gclid`/`gbraid`/`wbraid` yakalama → forma → Formspree
5. Mevcut `verify` / SEO denetimlerinin yeni etiketlerle geçtiğini doğrulama

**Aşama 2: Kampanya kalitesi (1-2 hafta)**
6. 3-4 reklama özel iniş sayfası (sade, tek CTA)
7. Kliniğin yanıt süresi taahhüdünü onaylatıp forma eklemek
8. Belgeler (`credentials.ts`), vergi no/MERSIS
9. Canlıda PageSpeed/CWV ölçümü ve düzeltme
10. Negatif kelime listesi ve reklam grubu yapısı (tema başına bir sayfa)

**Aşama 3: Optimizasyon (sonraki ay)**
11. Lead kalitesi geri bildirimi (offline import), basit CRM
12. Eksik konu sayfaları (ortodonti, protez, beyazlatma vb.) verilere göre

## 7. Sınırlar

- Canlı siteye bu ortamdan erişilemedi (proxy 403), bu yüzden canlı durum (indeksleme, hız, Search Console, gerçek PageSpeed) doğrulanmadı. Analiz depodaki kaynak koda dayanıyor.
- Google Ads politikaları sık değişir; "doğrulayın" işaretli maddeler reklam hesabında güncel politika sayfasından teyit edilmeli.
- %48 skoru ağırlıklı bir tahmin; hedef göstergesidir, sınav notu değildir.

## 8. Sonradan eklenen not: rapor yazıldıktan sonra değişenler (aynı gün)

Bu bölüm ilk analizin parçası değildir; rapor yazıldıktan sonra `main`'e giren değişikliklerin yukarıdaki maddelere etkisini gösterir. Bölüm 1-7'deki tespitler (etiket, onay mekanizması, `gclid`, telefon/WhatsApp yok) hâlâ geçerlidir. Tek düzeltme: §3 tablosundaki fiyat kalemi sayısı 24 değil **28**'dir (ilk metinde yanlıştı).

**Aşama 1'i doğrudan etkileyenler**

| Değişiklik | PR | Ads hazırlığına etkisi |
| --- | --- | --- |
| Sitede artık `Content-Security-Policy` başlığı var: `script-src 'self' 'unsafe-inline'`, `connect-src 'self'`, `img-src 'self' data: blob:` | #50 | **Madde 2 (GTM/gtag/GA4/Ads etiketi) bu haliyle çalışmaz:** etiket betiği ve gönderdiği istekler engellenir. Etiket eklenirken `next.config.ts` içindeki CSP, Google'ın güncel CSP rehberindeki alan adlarıyla (betik, bağlantı ve görsel/piksel istekleri) genişletilmeli ve Aşama 1'in 5. maddesine "tarayıcı konsolunda CSP ihlali 0" kontrolü eklenmeli. Politika boşluğa açılmamalı, yalnızca gereken alan adları eklenmeli. |
| İç linklerde artık izleme parametresi yok; `lead_source`, `cta_location`, `page_path`, `guide_source` tıklamada `sessionStorage`'a yazılıyor (`components/tracked-link.tsx`) ve form oradan okuyor | #50 | **Madde 3 (`gclid`/`gbraid`/`wbraid`):** yakalama, iç linklere parametre ekleyerek yapılmamalı (derleme denetimi `validate-seo` buna artık hata verir). Aynı kalıpla, reklamdan gelen ilk sayfada URL'den okuyup tarayıcı depolamasına yazmak ve `lead-form.tsx` içindeki `getLeadContext()` ile forma eklemek uyumlu yoldur. Çerez/onay kararı yine Aşama 1, madde 1'e bağlıdır. |
| Header, mobil menü, ana sayfa hero ve alt CTA'lar artık ayrı `cta_location` taşıyor (`header`, `mobile_menu`, `home_hero`, `home_bottom`) ve CTA metni iki varyanta indi ("Poproś o wstępną wycenę" / "Poproś o bezpłatną wstępną ocenę") | #47, #48 | Reklam tıklamasından sonra hangi düğmenin lead getirdiği ölçülebilir; kampanya CTA'sı için bu iki metin dışına çıkılacaksa doğru metin seçimi §4'te değerlendirilmeli. |
| Fiyat sayfalarında masaüstü exit-intent penceresi; olaylar `exit_intent_shown` ve `exit_intent_cta` | #49 | Fiyat sayfasına gelen reklam trafiği için ek bir mikro-dönüşüm sinyali (ayrı bir Ads dönüşümü olarak değil, önce Analytics'te gözlemlenmeli). |
| Fiyat tutarlılığı için otomatik test (`test:prices`) ve `llms` dosyası düzeltmeleri | #53 | Reklam metinlerinde ve iniş sayfalarında fiyat verilirse sayfalardaki kalemlerle birebir aynı olmalı; test yeni sayfalarda da çalışır. |

**Hâlâ geçerli sınır:** Canlı site, Search Console verisi ve gerçek PageSpeed bu not için de yeniden doğrulanmadı; yalnızca depo kodu ve `main`'in derlemesi esas alındı.
