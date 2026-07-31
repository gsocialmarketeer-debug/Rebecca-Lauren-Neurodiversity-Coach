# Rebecca Lauren Coaching

A responsive website for Rebecca Lauren Coaching, providing warm, personalised online coaching and advocacy for adults, children, teenagers and families.

## Pages

- Home
- About & Testimonials
- Services & Packages
- Contact & Booking
- Privacy Policy, Website Terms, Coaching Disclaimer and Safeguarding Information

## Local development

Requires Node.js 22.13 or later and pnpm.

```bash
pnpm install
pnpm dev
pnpm build
pnpm lint
pnpm test
```

## Enquiry form

The form validates submissions in the browser, includes consent and privacy acknowledgement, and prepares the completed enquiry for the visitor to send through their own email or WhatsApp app. No form-submission service or API key is required.

## Updating site content

Core contact details, session information, the pricing note, services and testimonials are kept in `data/site.ts`. Page copy is under `app/`, and reusable layout and form components are under `components/`.

Set `NEXT_PUBLIC_SITE_URL` to the final domain before launch so canonical links, sitemap and social metadata use the correct address.
