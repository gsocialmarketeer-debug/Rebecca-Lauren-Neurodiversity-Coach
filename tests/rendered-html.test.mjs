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
  assert.match(combined, /does not promise or guarantee/i);
  assert.doesNotMatch(combined, /£\d|\$\d/);
});

test("contact form includes validation, consent, spam protection and server handling", async () => {
  const [form, route, env] = await Promise.all([
    read("components/ContactForm.tsx"), read("app/api/enquiry/route.ts"), read(".env.example"),
  ]);
  assert.match(form, /required/);
  assert.match(form, /honeypot/);
  assert.match(form, /I consent to Rebecca Lauren Coaching/);
  assert.match(form, /Please do not use it for urgent or emergency support/);
  assert.match(route, /FORMSPREE_ENDPOINT/);
  assert.match(route, /status: 400/);
  assert.match(env, /FORMSPREE_ENDPOINT=/);
});
