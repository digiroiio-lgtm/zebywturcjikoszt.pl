# Authority, SEO and GEO audit

Audit date: 2026-09-19  
Repository baseline: `6553084c373118d121a5fd9dcc77acbdf3d97ffc`  
Scope: repository, rendered production build, route contract, content model and conversion path  
Data limitation: no verified GSC, GA4, backlink-provider or AI-citation dataset was available. Organic value, query ownership and priorities below are architectural assessments, not claimed performance data.

## 1. Executive authority assessment

The site has a sound first-release architecture: one Polish locale, one canonical URL per intent, 14 indexable URLs, four noindex legal placeholders, a clean sitemap, direct-answer blocks, transparent medical-review status and no fabricated prices, reviewers or patient claims. No broken internal link, duplicate canonical, duplicate title, accidental noindex or high-risk published cannibalisation pair was found in the rendered build.

The main constraint is not page count. It is missing verified identity and evidence. The operator, clinic relationship, privacy controller, complaint channel, current commercial offer, Polish-market prices, qualified medical reviewer and case metadata are not confirmed. These gaps limit trust, conversion activation, schema depth, original data and earned-link potential. They must not be filled with assumptions.

## 2. Confirmed technical findings

| Priority | Finding | Status / action |
|---|---|---|
| P0 | No automated contract checked canonicals, sitemap ownership, noindex separation, JSON-LD validity, H1 uniqueness or broken internal links after a build. | Fixed with `npm run audit:seo` and `npm run verify`. |
| P1 | Canonical host was hard-coded to the current Vercel URL. | Fixed safely: `NEXT_PUBLIC_SITE_URL` can set the verified production domain, with the current live URL retained as fallback. |
| P1 | WebSite and WebPage schema nodes were not connected by stable IDs. | Fixed without inventing an operator or reviewer. |
| P1 | Basic response hardening was absent and the framework header disclosed Next.js. | Fixed with safe headers and `poweredByHeader: false`. |
| P1 | Source coverage is insufficient for several medical or decision-support pages. | Requires editorial and clinical verification. Do not bulk-add unrelated authority links. |
| P1 | Operator, controller and service-provider identity are unverified. | Human/business verification required before lead activation. |
| P2 | IndexNow is absent. | Defer until the final public domain and key ownership are verified. Notify only meaningful URL changes. |
| P2 | GSC, GA4 and backlink data are unavailable in the repo. | Connect verified data before changing URL ownership based on performance. |

HTTP to HTTPS, apex to www and deployment redirects cannot be certified from source alone. They must be checked after the final custom domain is connected.

## 3. Intent ownership and authority upgrade map

| URL | Primary intent | Role | Current action | Priority | Main dependency / gap |
|---|---|---:|---|---:|---|
| `/` | broad investigation: teeth treatment in Turkey | POWER | UPGRADE | P1 | verified operator/entity and stronger evidence paths |
| `/koszt` | cost and quote comparison | MONEY | POWER PAGE | P1 | verified Polish-market price dataset |
| `/implanty` | implant process, qualification and cost | MONEY | UPGRADE | P1 | qualified review and claim-level sources |
| `/licowki` | veneers, suitability and cost | MONEY | UPGRADE | P1 | qualified review and claim-level sources |
| `/cala-szczeka` | full-mouth treatment options | POWER | UPGRADE | P1 | expert review and evidence for treatment comparisons |
| `/all-on-4` | All-on-4 qualification and scope | MONEY | UPGRADE | P1 | expert review and method-specific evidence |
| `/opinie` | how to evaluate patient reviews | SUPPORT | KEEP | P2 | real, consented evidence if reviews are later published |
| `/przed-i-po` | how to evaluate before/after results | SUPPORT | UPGRADE | P1 | consent, dates, treatment scope and provenance for every case |
| `/antalya` | treatment-trip planning in Antalya | MONEY | UPGRADE | P1 | verified provider, itinerary and aftercare responsibility |
| `/jak-wybrac-klinike` | clinic due diligence | POWER | UPGRADE | P1 | Polish/EU/Turkish verification sources and operator disclosure |
| `/o-nas` | site and operator identity | ENTITY | UPGRADE | P0 | legal operator and commercial relationship |
| `/kontakt` | lead submission | UTILITY | KEEP | P0 | privacy controller, webhook, reCAPTCHA and data-processing validation |
| `/polityka-redakcyjna` | editorial standards | ENTITY | KEEP | P2 | named accountable editor when verified |
| `/weryfikacja-medyczna` | review workflow and status | ENTITY | UPGRADE | P1 | real qualified reviewer and documented review workflow |
| `/polityka-prywatnosci` | privacy notice | UTILITY | UPGRADE | P0 | controller, processors, retention, rights and transfer details |
| `/cookies` | cookie notice | UTILITY | KEEP | P2 | update only when analytics/marketing cookies are deployed |
| `/regulamin` | site terms | UTILITY | UPGRADE | P0 | approved operator and service scope |
| `/reklamacje` | complaints route | UTILITY | UPGRADE | P0 | responsible entities, channel and response times |

No published URL currently warrants MERGE, REDIRECT or DELETE. The deferred `/czy-warto`, `/turcja-czy-polska`, `/implanty/koszt`, `/all-on-6`, `/na-raty`, `/korony-cyrkonowe` and `/bonding` ideas should remain unpublished until distinct demand and verified content justify them.

## 4. Internal authority map

- `/` remains the broad hub and links to every primary treatment and decision path.
- `/koszt`, `/jak-wybrac-klinike` and `/cala-szczeka` are the strongest POWER candidates.
- Treatment money pages link contextually to cost, alternatives and clinic due diligence.
- Review and visual-proof pages link to verification guidance instead of acting as unsupported conversion endpoints.
- Footer links support discovery but are not treated as a substitute for contextual links.

Current structure is coherent. Do not add site-wide exact-match anchors or make every page link to every money page. GSC query-to-page data should decide any later rebalancing.

## 5. E-E-A-T, entity and source gaps

Confirmed strengths:

- commercial intent is disclosed;
- medical review is explicitly marked incomplete;
- no invented doctor, accreditation, warranty, price, review or outcome is published;
- legal placeholder pages are noindex and excluded from the sitemap;
- clinical qualification is consistently separated from editorial information.

Required human verification:

- legal operator name, address and contact details;
- relationship between the site, coordinator and treating clinic;
- data controller and processor chain;
- named clinical reviewer, credentials, review scope and date;
- clinic, dentist and licensing details;
- complaint and aftercare responsibility;
- image provenance, consent, treatment scope and capture dates.

Source work must be claim-led. Prefer relevant Polish/EU patient-safety authorities, recognised dental bodies, guidelines and high-quality dental literature. A high-authority domain that does not support the adjacent claim must not be cited.

## 6. Schema and machine-readability assessment

Implemented:

- WebSite, WebPage or MedicalWebPage, BreadcrumbList and truthful FAQPage markup;
- stable `@id` links between WebPage and WebSite;
- canonical, indexability, language, published and modified dates;
- build-time checks for JSON-LD parsing and canonical/sitemap consistency.

Deferred:

- Organization or LocalBusiness schema for the operator/clinic;
- Person and reviewedBy entities;
- Service, price, rating, review and aggregateRating markup;
- clinic address, credentials and business attributes.

These items require verified visible facts. Schema must not be used to manufacture authority.

## 7. GEO and AI-citation opportunities

The existing direct-answer and comparison-table pattern is extractable. Highest-impact upgrades are:

1. turn `/koszt` into the owner of a verified Poland vs Turkey cost methodology and dated dataset;
2. strengthen `/jak-wybrac-klinike` with a sourced verification workflow and downloadable checklist;
3. strengthen `/cala-szczeka` with reviewed decision-support comparisons;
4. attach claim-level evidence and a real reviewer to treatment pages;
5. publish clear methodology, limitations and update history for every future data asset.

Do not claim AI citation visibility until a measurable platform, referral record or citation test confirms it.

## 8. Proposed data assets

| Asset | Why it may earn citations | Required input | Status |
|---|---|---|---|
| Poland vs Turkey Dental Cost Index 2026 | dated, comparable price reference for patients and media | verified quotes, inclusions, currencies, sample definition and update method | DATA REQUIRED |
| Dental Quote Comparison Worksheet | practical decision tool that supports `/koszt` | verified comparison fields and legal review | DATA REQUIRED |
| Clinic Due-Diligence Checklist | reusable patient-safety resource | regulator/professional-body sources and legal review | DATA REQUIRED |
| Treatment Travel Aftercare Map | clarifies responsibility before, during and after travel | real clinic/coordinator workflow | DATA REQUIRED |
| Anonymised Case Outcomes Report | could support editorial references when mature | consented first-party cases, sample rules, outcomes, follow-up periods and limitations | DATA REQUIRED |

## 9. Earned authority plan

- Digital PR: use only verified cost-index or patient-decision findings with a published method.
- Expert contributions: named dentists may comment only after identity and credentials are verified.
- Partnerships: seek legitimate mentions from the treating provider, professional partners and relevant patient-information resources.
- Link reclamation: monitor brand mentions, image/data attribution and obsolete URLs once the public domain is stable.
- Exclude paid link farms, bulk directories, PBNs, mass guest posts, irrelevant exchanges and fabricated scholarship campaigns.

Primary KPIs: relevant editorial referring domains, branded mentions, non-brand impressions/clicks, P0/P1 visibility, organic leads and citations of original assets. DA/DR remain secondary diagnostics.

## 10. 30 / 60 / 90-day roadmap

### 0-30 days

- Verify and publish the operator, privacy controller, provider relationship, contact and complaints facts.
- Set `NEXT_PUBLIC_SITE_URL` only after the final domain resolves and redirects are confirmed.
- Configure and test the CRM webhook and reCAPTCHA before enabling the form.
- Obtain a real clinical-review workflow for treatment pages.
- Connect GSC and GA4, then record the first query-to-page baseline.

### 31-60 days

- Add claim-level sources and complete real medical review on P1 treatment pages.
- Upgrade `/koszt`, `/jak-wybrac-klinike` and `/cala-szczeka` before creating new URLs.
- Collect verified price and quote data for the cost methodology.
- Verify every before/after asset or remove it from any evidentiary role.
- Build the first internal-authority report using actual impressions and page ownership.

### 61-90 days

- Publish the first original data asset only if its dataset and methodology are complete.
- Run targeted digital PR and legitimate partner outreach around that asset.
- Measure cited/not-cited queries, competing sources, evidence gaps and content gaps.
- Use verified GSC and conversion data to decide whether any deferred URL deserves independent ownership.

## 11. Release gate

Run `npm run verify`. A release must not proceed if the build, lint, typecheck or SEO contract fails. After deployment, verify the production commit status, homepage, robots, sitemap, canonical host, noindex pages, form state and redirects. IndexNow should notify only meaningful URL additions, changes or removals after domain ownership is verified.
