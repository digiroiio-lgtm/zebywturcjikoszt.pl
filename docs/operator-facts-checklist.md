# Operatör bilgi kontrol listesi: Polonyalı hastanın karar bilgisi

Güncelleme: 2026-10-28. Amaç: sitede şu an bilerek "doğrulanmadı" diye bırakılan bilgileri, operatörden yazılı ve tarihli olarak almak. Cevaplar gelmeden bu bilgiler sitede yayımlanmaz (bkz. `docs/seo-intent-map.md`: "Waits for confirmation", "needs a cited source").

Nasıl doldurulur: her soruya kısa, tarihli ve doğrulanabilir cevap verin. Emin olunmayan yere "bilinmiyor" yazın; tahmin yazmayın. Her cevabın yanına kaynağı (sözleşme şablonu, fiyat listesi, klinik yazısı, havayolu/havalimanı sayfası) ekleyin.

## Şu an sitede ne yazıyor (özet)
- `/antalya` SSS: kaç gün kalınacağı için "doğrulanmış plan olmadan tek bir sayı vermiyoruz"; otel ve transfer için "güncel teklif için doğrulanmadı"; ödeme para birimi için "yazılı teklifte netleştirin".
- `/antalya` "Obsługa po polsku": hizmet dilleri listeleniyor, ancak Lehçe konuşan hekim veya koordinatör olup olmadığı yazılmıyor.
- `poradniki/pakiety-leczenia-zebow`: doğrulanmamış bir Akdeniz Dental paketi satış teklifi gibi sunulmuyor.
- `poradniki/calkowity-koszt-wyjazdu`: uçuş/otel rakamı yok.
- Uçuş süresi, doğrudan uçuşlar, garanti süresi, ücretsiz düzeltme, ödeme yöntemleri: yazılmıyor.

## 1. Tedavi ziyaretleri ve süre
Açılacak yer: `/antalya` SSS ("Ile trwa leczenie…"), `/antalya` etap tablosu, `/koszt` ilgili tedavi satırları.

| Tedavi | Tipik ziyaret sayısı | Antalya'da toplam gün | İyileşme arası (kaç hafta/ay) | Kaynak/tarih |
|---|---|---|---|---|
| Tek implant + kron | | | | |
| 6 implant + kron | | | | |
| Zirkon kron (birkaç diş) | | | | |
| Lamina (licówki) | | | | |
| Tam çene / All-on-4 | | | | |

Ek sorular: tek seferde bitebilen işlemler hangileri? İkinci ziyaret zorunlu olduğunda ne kadar süre sonra, hangi nedenle?

## 2. Lehçe iletişim
Açılacak yer: `/antalya` "Obsługa po polsku", `/jak-wybrac-klinike` SSS, `/kontakt`.
- Lehçe konuşan **hekim** var mı? Adı ve unvanı?
- Lehçe konuşan **koordinatör/danışman** var mı? Adı, rolü, çalışma saatleri (Polonya saatiyle)?
- Hangi kanallar: WhatsApp, telefon, e-posta? Yanıt süresi için verilebilecek bir söz var mı (verilemiyorsa yazılmaz)?
- Tedavi planı, onam formu ve bakım talimatları hangi dilde veriliyor (Lehçe/İngilizce/Türkçe)?

## 3. Paket kapsamı (otel, transfer)
Açılacak yer: `poradniki/pakiety-leczenia-zebow`, `poradniki/calkowity-koszt-wyjazdu`, `/antalya` SSS (hotel/transfer), `/koszt`.
- Otel dahil mi? Kaç gece, hangi kategori, klinikten uzaklık, kimin ayarladığı?
- Havalimanı ↔ otel/klinik transferi dahil mi? Hangi havalimanı?
- Dahil olmayanlar: uçuş, yemek, ek tedavi, ikinci ziyaret konaklaması?
- Yazılı teklif şablonu var mı? (Örnek, kişisel veri çıkarılmış hâliyle.)
- Başka bir kuruluş (acente) devreye giriyor mu? Kim sorumlu: tıbbi kısım klinik, organizasyon kısmı kim?

## 4. Tedavi sonrası bakım ve garanti
Açılacak yer: `poradniki/opieka-po-leczeniu`, `/antalya` "Po powrocie do Polski", `/reklamacje`.
- Garanti süresi (implant, kron, lamina ayrı ayrı) ve koşulları (kontrollere gelme zorunluluğu vb.)?
- Ücretsiz düzeltme/revizyon hangi koşullarda? Dönüş ziyareti masrafını kim öder?
- Uzaktan takip (fotoğraf/video) var mı? Acil durumda Polonya'dan kime ulaşılır?
- Polonya'da iş birliği yapılan bir diş hekimi var mı? (Yoksa yazılır: "yok, otomatik değil".)

## 5. Ödeme
Açılacak yer: `/antalya` SSS (ödeme), `/koszt`.
- Kabul edilen yöntemler (nakit, kart, havale) ve para birimleri (EUR, PLN, TRY)?
- Kart/komisyon farkı var mı?
- Kapora tutarı, hangi aşamada alınıyor, iade koşulları?
- Fiyat teklifi ne kadar süre geçerli?

## 6. Seyahat (kaynak gerekli)
Açılacak yer: `/antalya` (yeni "Dojazd" bölümü). Burada rakam yazmadan önce havayolu/havalimanı gibi resmî bir kaynak şarttır.
- Polonya'dan Antalya'ya doğrudan uçuş yapılan havalimanları (güncel, kaynak bağlantısıyla)?
- Tipik uçuş süresi (kaynak)?
- Antalya Havalimanı → klinik arası yaklaşık süre?

## Sonraki adım
Cevaplar geldiğinde sayfa bazında Lehçe taslaklar hazırlanır, tek tek onaya sunulur, `npm run verify` ile doğrulanır. Doktor onaylı sayfalarda (`/implanty`, `/licowki`, `/cala-szczeka`, `/all-on-4`) gövde değişikliği hekimin yeniden onayını gerektirir; bu bilgiler bu sayfalara eklenmez, `/antalya`, `/koszt` ve rehberlere eklenir.
