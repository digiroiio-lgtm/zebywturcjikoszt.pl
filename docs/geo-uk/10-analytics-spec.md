# Measurement specification (deliverable K)

The site has no GA4 and no consent mechanism; Vercel Analytics is cookieless. Events therefore use the existing `trackEvent` and its allowlist `ANALYTICS_KEYS` (extended in this phase with `page_type`, `geographic_market`, `geographic_region`, `city_slug`, `selected_treatment`, `content_cluster`).

| Event | When | Parameters |
| --- | --- | --- |
| `geo_landing_view` | A geo page renders | `page_type`, `geographic_market` (`uk`), `geographic_region`, `city_slug`, `content_cluster` |
| `geo_city_select` | Visitor picks a place in the finder | `city_slug`, `geographic_region` |
| `treatment_cta_click` | CTA to a treatment page | `selected_treatment`, `city_slug`, `cta_location` |
| `contact_start` / `contact_submit` | Existing | existing attribution (`page_path`, `lead_source` = `OGZ-UK`) |

Rules: parameters describe page or CTA context only; no name, phone, email or complaint text; the city is the page's city or the visitor's explicit selection, never an IP guess; no new form field (city is derived from `page_path`). `qualified_enquiry` is undefined until a CRM exists. **Blocked:** GA4/Google Ads tags need a property, a consent mechanism and a CSP change.

No event code was added in this phase because no geo page renders yet; the allowlist change is the only runtime change.
