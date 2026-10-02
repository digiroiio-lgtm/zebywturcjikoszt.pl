# Patient data, consent and publication rules

Status: draft for lawyer review. Nothing here is legal advice. Gate: `lib/legal-review.ts` (`LEGAL_REVIEW_CONFIRMED_DATE`).

## 1. Where data lives

| Data | Lives in | May appear on the site / repo / JSON-LD / analytics |
|---|---|---|
| Contact form (name, phone, WhatsApp, e-mail, country, message, UTM) | Formspree, then the operator | No |
| Passport / travel document, flight, accommodation | Clinic CRM only | **Never** |
| Medical records, X-rays, photos | Clinic records only | Only as a consented, masked case (section 3) |
| Date of birth, national ID, address of a patient | Clinic CRM only | **Never** |
| Official documents of the clinic and doctors | `lib/credentials.ts` | Yes, after checking against the official source; no personal data on scans |
| Aggregate counts | Derived from CRM export | Only per section 4 |

The CRM stays outside the site. No live connection is built: an approved, anonymised export is turned into static data in the repo.

## 2. What the internal CRM check is for
Passport and flight records are used only inside the clinic to confirm that a case or testimonial belongs to a real patient and that treatment dates are consistent. The result ("verified") is recorded as `consentDocumented` and `medicalVerificationDocumented` in `lib/evidence.ts`; the records themselves are not copied.

## 3. Consent for cases and testimonials (text for the lawyer to adapt, Polish)
> Wyrażam zgodę na publikację w serwisie leczeniezebowwturcji.pl [zdjęć przed i po / opisu leczenia / mojej opinii] bez podawania mojego imienia, nazwiska i innych danych identyfikujących. Rozumiem, że zdjęcia i opis dotyczą mojego indywidualnego przypadku i nie gwarantują takiego samego wyniku u innych osób. Zgoda jest dobrowolna, nie wpływa na leczenie ani cenę i mogę ją cofnąć w każdej chwili, pisząc na adres [e-mail]; materiał zostanie usunięty bez zbędnej zwłoki, a o usunięciu zostanę poinformowany(-a). Cofnięcie zgody nie wpływa na zgodność z prawem publikacji przed jej cofnięciem.
>
> Zgodę wyrażam: data ______  podpis / potwierdzenie elektroniczne ______

Rules: one consent per item and per purpose; consent separate from the treatment contract; kept in the clinic's records, never in the repo (`approvalReference`-style pointer only); faces and tattoos masked or cropped; no reward for consent; no consent from minors without a guardian.

## 4. Aggregate statistics
- Counts only, by country and year; suppress any cell below 10.
- State the date of the export and how "patient" was counted.
- Never combine columns that could identify a person.
- Remove or update statistics older than 12 months.

## 5. Open items for the lawyer
1. Confirm the new privacy-policy sections ("Dane pacjentów kliniki poza formularzem", "Publikacja przypadków, opinii i statystyk").
2. State retention periods for contact data and for medical records under Turkish and Polish law.
3. Legal basis and cross-border transfer wording for the clinic CRM (Turkey) and for Formspree/Vercel (USA).
4. Whether the clinic needs its own patient information notice and who is the controller for CRM data.
5. Approve the consent text above and the withdrawal procedure.

## 6. Gate before publishing
Before adding any verified case, patient testimonial or patient statistic: lawyer confirmation received, set `LEGAL_REVIEW_CONFIRMED_DATE`, add a line to the correction log on `/korekty`.
