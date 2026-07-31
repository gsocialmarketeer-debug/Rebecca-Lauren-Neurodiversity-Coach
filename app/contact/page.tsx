import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { ContactForm } from "@/components/ContactForm";
import { EmergencyNotice } from "@/components/Shared";
import { contact } from "@/data/site";

export const metadata: Metadata = { title: "Contact & Book | Rebecca Lauren Coaching", description: "Contact Rebecca Lauren to ask a question or enquire about flexible online coaching support.", alternates: { canonical: "/contact" } };

export default function ContactPage() {
  return <main>
    <section className="page-hero contact-hero"><div className="container contact-hero-grid"><div><p className="eyebrow">You’re welcome here</p><h1>Let’s take the first<br /><em>step together.</em></h1></div><div><p className="hero-lede">Whether you are looking for support for yourself, your child or your family, you are welcome to get in touch and ask any questions before booking.</p><p className="script-line">A gentle conversation can be the beginning of change. ♡</p></div></div></section>
    <section className="section discovery-section"><div className="container discovery-grid">
      <div className="discovery-photo"><Image src="/images/rebecca-outdoors.jpg" alt="Rebecca enjoying a peaceful moment outdoors" fill priority sizes="(max-width: 760px) 100vw, 42vw" /></div>
      <div className="discovery-copy"><p className="eyebrow">Free 20-minute consultation</p><h2>Start with a relaxed<br /><em>discovery call.</em></h2><p>This complimentary call is a gentle, no-pressure opportunity to meet Rebecca, talk through what you would like support with and discuss the goals that matter to you.</p><p>You can ask questions, learn how coaching could work and take a little time to see whether the approach feels comfortable and right for you before booking a session.</p><p className="script-line">A comfortable first step, at your own pace. ♡</p><Link className="button" href="/contact?session=discovery#enquiry">Arrange your free discovery call <span>→</span></Link></div>
    </div></section>
    <section className="section contact-section"><div className="container contact-layout"><aside className="contact-details"><p className="eyebrow">Contact Rebecca</p><h2>Choose the way that feels <em>most comfortable.</em></h2><div className="contact-links">
      <a href={`mailto:${contact.email}`}><span>✉</span><div><small>Email</small><strong>{contact.email}</strong></div><b>↗</b></a>
      <a href={`tel:${contact.phone}`}><span>☏</span><div><small>Telephone</small><strong>{contact.phoneDisplay}</strong></div><b>↗</b></a>
      <a href={contact.whatsapp} target="_blank" rel="noreferrer"><span>◉</span><div><small>WhatsApp</small><strong>Message Rebecca</strong></div><b>↗</b></a>
      <a href={contact.instagram} target="_blank" rel="noreferrer"><span>◎</span><div><small>Instagram</small><strong>@rebecca_neurocoach</strong></div><b>↗</b></a>
    </div><p className="reply-note">Rebecca will respond as soon as she can. Please remember this is not an urgent-support service.</p></aside>
    <div className="form-card" id="enquiry"><div className="form-heading"><p className="eyebrow">Booking & enquiry form</p><h2>Tell me how I can help</h2><p>Share only the information needed to begin the conversation.</p></div><Suspense fallback={<p>Loading form…</p>}><ContactForm /></Suspense></div></div></section>
    <section className="container notice-wrap"><EmergencyNotice /></section>
  </main>;
}
