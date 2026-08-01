import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");

test("includes every requested route and navigation destination", async () => {
  const [home, about, services, contact, header, footer] = await Promise.all([
    read("app/page.tsx"), read("app/about/page.tsx"), read("app/services/page.tsx"),
    read("app/contact/page.tsx"), read("components/Header.tsx"), read("components/Footer.tsx"),
  ]);
  assert.match(home, /Feel heard/);
  assert.match(about, /Meet Rebecca/);
  assert.match(services, /Coaching & <em>Support/);
  assert.match(contact, /step together/);
  for (const route of ["/about", "/services", "/contact"]) assert.match(header, new RegExp(route));
  for (const route of ["/privacy", "/terms", "/disclaimer", "/safeguarding"]) assert.match(footer, new RegExp(route));
});

test("uses the live site URL and a landscape social preview card", async () => {
  const layout = await read("app/layout.tsx");
  assert.match(layout, /rebecca-lauren-neurodiversity-coach\.vercel\.app/);
  assert.match(layout, /\/og\.png/);
  assert.match(layout, /width: 1200, height: 630/);
  assert.doesNotMatch(layout, /www\.example\.com/);
});

test("keeps coaching scope, session details and pricing honest", async () => {
  const [home, services, disclaimer, siteData] = await Promise.all([
    read("app/page.tsx"), read("app/services/page.tsx"), read("app/disclaimer/page.tsx"), read("data/site.ts"),
  ]);
  const combined = `${home}\n${services}\n${disclaimer}\n${siteData}`;
  assert.match(combined, /Mental Health Coach and Advocate/);
  assert.match(combined, /45 minutes/);
  assert.match(combined, /60 minutes/);
  assert.match(combined, /Coming Soon/);
  assert.match(combined, /prices will be confirmed directly/i);
  assert.match(combined, /not psychotherapy/i);
  assert.match(combined, /promised or guaranteed/i);
  assert.doesNotMatch(combined, /£\d|\$\d/);
});

test("publishes complete legal and safeguarding information", async () => {
  const [terms, privacy, disclaimer, safeguarding, legalPage, certificates] = await Promise.all([
    read("app/terms/page.tsx"), read("app/privacy/page.tsx"), read("app/disclaimer/page.tsx"),
    read("app/safeguarding/page.tsx"), read("components/LegalPage.tsx"), read("components/CertificateGallery.tsx"),
  ]);
  const legal = `${terms}\n${privacy}\n${disclaimer}\n${safeguarding}\n${legalPage}`;
  assert.doesNotMatch(legal, /Draft content/i);
  assert.match(terms, /consumer rights/i);
  assert.match(privacy, /lawful bases/i);
  assert.match(privacy, /Information Commissioner/i);
  assert.match(disclaimer, /not psychotherapy/i);
  assert.match(safeguarding, /NHS 111/);
  assert.match(safeguarding, /116 123/);
  assert.match(certificates, /Infant Sleep Consultant — Level Three/);
  assert.match(certificates, /certificate-infant-sleep-consultant\.jpg/);
});

test("contact form includes validation, consent, direct email delivery and WhatsApp handoff", async () => {
  const [form, contact] = await Promise.all([
    read("components/ContactForm.tsx"), read("app/contact/page.tsx"),
  ]);
  assert.match(form, /required/);
  assert.match(form, /honeypot/);
  assert.match(form, /I consent to Rebecca Lauren Coaching/);
  assert.match(form, /Please do not use it for urgent or emergency support/);
  assert.match(form, /formsubmit\.co\/ajax/);
  assert.match(form, /Thank you — your enquiry has been sent/);
  assert.match(form, /contact\.whatsapp/);
  assert.match(form, /Send enquiry/);
  assert.match(form, /Send by WhatsApp/);
  assert.match(form, /Free discovery call — 20 minutes/);
  assert.match(contact, /Free 20-minute consultation/);
  assert.match(contact, /rebecca-outdoors\.jpg/);
  assert.doesNotMatch(contact, /Loading form/);
});
