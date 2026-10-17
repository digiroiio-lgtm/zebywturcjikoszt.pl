# Homepage Shorts section

Section "Filmy Akdeniz Dental" sits after the before/after gallery ("Zobacz przykładowe metamorfozy") and before the doctors on the home page. It renders **nothing** until `data/shorts.json` has an approved video.

## Adding videos
Edit only `data/shorts.json`:

```json
{ "url": "https://www.youtube.com/shorts/VIDEO_ID", "title": "Opis po polsku (min. 10 znaków)", "description": "Jedno zdanie o treści filmu",
  "kind": "patient-testimonial", "approved": true, "consentReference": "numer zgody w kartotece kliniki", "thumbnail": "/shorts/video-1.jpg", "uploadDate": "2026-10-16" }
```
- `approved: true` **and** `consentReference` (a pointer to the clinic's written consent, never personal data) are both required, otherwise the video stays hidden (`docs/consent-and-data-handling.md` §3).
- `kind: "patient-testimonial"` only for films where a patient speaks about their own experience. If any film is not a testimonial, the section uses a neutral heading ("Filmy Akdeniz Dental").
- `thumbnail` is optional. Recommended: a self-hosted file under `/public` (e.g. `public/shorts/video-1.jpg`, 9:16, under 100 KB). With self-hosted thumbnails nothing is requested from YouTube until Play. Without it the thumbnail comes from `i.ytimg.com` on page load (a third-party request; the section note says so).
- `uploadDate` (+ a self-hosted thumbnail) enables `VideoObject` JSON-LD; without both, none is emitted.
- Accepted URL forms: `youtube.com/shorts/ID`, `youtube.com/watch?v=ID`, `youtu.be/ID`, `youtube(-nocookie).com/embed/ID`.

## Behaviour
- Desktop (>760px): 3-column grid, 9:16 frames. Mobile: native scroll-snap carousel, 1.15 cards per view, hidden scrollbar, ← → buttons, ArrowLeft/ArrowRight when the track is focused.
- No iframe exists in the initial HTML. Pressing Play swaps the thumbnail for `https://www.youtube-nocookie.com/embed/ID` (`loading="lazy"`; autoplay starts only because the visitor pressed Play). Each card also links to YouTube as a fallback.
- CSP (`next.config.ts`) widens only when videos are approved: `frame-src https://www.youtube-nocookie.com`, plus `https://i.ytimg.com` in `img-src` when a video has no self-hosted thumbnail.
- `SHORTS_PREVIEW=1 npm run dev` shows four clearly labelled placeholder cards for layout checks (never in production or on Vercel).
- `npm run test:shorts` (part of `verify`) checks URL parsing, the approval/consent rules, no placeholder in production data, no iframe or YouTube reference in the homepage HTML, and, once videos exist, the section order.

## Open points for the operator / lawyer
- Cookies and privacy policies say the site sets no cookies and uses no third-party tools; YouTube embeds after Play are a third-party service (Google). The policy text should mention them before the first video goes live (legal review gate: `lib/legal-review.ts`). The text was not changed here.
- Written patient consent for each video, including voice and face, with a withdrawal route.
