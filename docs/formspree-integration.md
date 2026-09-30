# Formspree contact form

This Vercel project uses Next.js 15 and React 19. The React guide matches the site, adapted to the existing client component and `/api/lead` route. A custom React submission handler preserves server validation, the existing design, Polish feedback and conversion tracking, without an additional SDK dependency.

## Submission flow

`components/lead-form.tsx` posts JSON to `/api/lead`. The route validates the request and forwards it to `https://formspree.io/f/mvkgleln` with `Accept: application/json`. Success requires a successful HTTP response and a recognised Formspree JSON receipt (`next` or `ok: true`), without an error payload.

Both the contact page and before/after consultation dialogs use this shared form. Submitted fields are name, phone, WhatsApp, email, country and an optional message. Attribution includes the site, lead source, CTA location, source page, landing page, case reference and UTM fields. The `email` field enables the sender's reply address; `_subject` identifies consultation enquiries from the current domain.

The form prevents concurrent submissions, retains entered values on errors and clears them after confirmation. The route retains its same-origin check and honeypot and handles rejected submissions, rate limits and a 10-second delivery timeout. No contact details or message content are sent to analytics.

## Configuration

No Vercel environment variables or API keys are required for this endpoint. Legacy `LEAD_WEBHOOK_URL`, `LEAD_WEBHOOK_TOKEN` and `CONTACT_PROCESS_VERIFIED` values no longer control submission. To temporarily disable the form, set `CONTACT_FORM_ENABLED=false` in Vercel and redeploy; the route also enforces this setting.

Notification recipients and email verification are managed in the Formspree dashboard. If domain restrictions are enabled there, allow `leczeniezebowwturcji.pl`. The server passes the verified request origin as the referral URL. This integration does not change the Formspree account's recipients or settings.

## Verification

Run `npm run verify` for lint, TypeScript, lead delivery regression checks, the production build and the SEO contract. Delivery checks mock Formspree and cover required fields, attribution, blocked origins, the honeypot, disabled forms, provider receipts, rejection, rate limits and network/timeout failures. They do not send real enquiries or verify inbox delivery.

Reference implementation: [Formspree React client](https://github.com/formspree/formspree-js/tree/main/packages/formspree-react) and [JSON response handling](https://github.com/formspree/formspree-js/blob/main/packages/formspree-core/src/submission.ts).
