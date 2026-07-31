import type { Metadata } from "next";
import Link from "next/link";
import { CTA, SectionHeading } from "@/components/Shared";
import { sessions, supportAreas } from "@/data/site";

export const metadata: Metadata = { title: "Online Coaching Services | Rebecca Lauren Coaching", description: "Flexible online anxiety, ADHD, neurodiversity, confidence and family coaching support with Rebecca Lauren.", alternates: { canonical: "/services" } };

const faqs = [
  ["Do I need an ADHD diagnosis?", "No. You do not need a formal diagnosis to enquire about coaching support."],
  ["Who can book?", "Adults, parents, caregivers and families may enquire. For children and teenagers, contact should initially come from a parent or legal guardian."],
  ["Are the sessions online?", "Yes. Current mini and full sessions are offered online."],
  ["How long are sessions?", "Mini sessions last 45 minutes. Full sessions are usually 60 minutes and may extend to 90 minutes where required and agreed."],
  ["Is coaching confidential?", "Rebecca aims to provide a private and respectful environment. If information raises a safeguarding or immediate-risk concern, further action may be needed to help keep someone safe."],
  ["Does coaching replace medical care or therapy?", "No. Coaching is not a replacement for diagnosis, medical treatment, psychotherapy or emergency mental-health support."],
  ["How do I get started?", "Complete the enquiry form or contact Rebecca by email or telephone. You can ask questions before deciding whether to book."],
];

export default function ServicesPage() {
  return <main>
    <section className="page-hero services-hero"><div className="container narrow"><p className="eyebrow">Flexible • Personalised • Online</p><h1>Coaching & <em>Support</em></h1><p className="hero-lede">Flexible, personalised online support designed around your individual needs.</p><div className="button-row center"><Link className="button" href="/contact">Send an enquiry <span>→</span></Link><a className="text-link" href="#sessions">View session options ↓</a></div></div></section>

    <section className="section intro-centered"><div className="container narrow"><p className="eyebrow">A space centred around you</p><h2>Support that feels human,<br /><em>practical and personal.</em></h2><p>Every person and every situation is different. Sessions provide a calm, non-judgemental space where we can explore what you are experiencing and work towards practical strategies that feel realistic for you.</p></div></section>

    <section className="section service-area-section"><div className="container"><SectionHeading eyebrow="Ways I can support you" title="Service areas" /><div className="service-area-grid">{supportAreas.map(([title, copy, icon], i) => <article key={title}><div><span className="service-index">0{i + 1}</span><span className="service-icon">{icon}</span></div><h3>{title}</h3><p>{copy}</p><Link href={`/contact?area=${encodeURIComponent(title)}`}>Enquire about support <span>→</span></Link></article>)}</div></div></section>

    <section className="section session-options" id="sessions"><div className="container"><SectionHeading eyebrow="Choose what works for you" title="Session options" copy="All current sessions are delivered online, with flexibility discussed during your enquiry." /><div className="option-grid">
      <article className="option-card"><div className="option-top"><span>Focused support</span><strong>45 <small>minutes</small></strong></div><h3>{sessions.mini.title}</h3><p>A focused online session for support with a particular situation, question or immediate challenge.</p><h4>Well suited to</h4><ul>{["Focused guidance", "A specific concern", "Follow-up support", "Parents seeking practical direction", "Clients who prefer a shorter session"].map(x => <li key={x}>{x}</li>)}</ul><Link className="button button-outline" href="/contact?session=mini">Enquire About a Mini Session</Link></article>
      <article className="option-card dark"><div className="option-top"><span>Deeper support</span><strong>60 <small>minutes</small></strong></div><h3>{sessions.full.title}</h3><p>A deeper coaching session with more time to explore your experiences, understand your needs and work through practical tools and strategies.</p><p className="flex-note">♡ May continue for up to 90 minutes where required and agreed.</p><h4>Well suited to</h4><ul>{["Ongoing anxiety support", "ADHD and neurodiversity coaching", "Emotional regulation", "Confidence and resilience", "Young people and family support", "More complex or ongoing challenges"].map(x => <li key={x}>{x}</li>)}</ul><Link className="button button-light" href="/contact?session=full">Enquire About a Full Session</Link></article>
      <article className="option-card package"><span className="coming-label">Coming Soon</span><p className="eyebrow">10-session package</p><h3>Ongoing Support Package</h3><p>A structured package of ten sessions for clients who would benefit from consistent, ongoing support and the opportunity to work towards longer-term goals.</p><Link className="button button-outline" href="/contact?session=package">Register Your Interest</Link></article>
    </div><p className="pricing-note"><span>Pricing</span>{sessions.pricingNote}</p></div></section>

    <section className="section how-section"><div className="container"><SectionHeading eyebrow="Simple and supportive" title="How sessions work" /><div className="steps">{[["Send an enquiry", "Tell Rebecca who the support is for and what you would like help with."], ["A friendly conversation", "Rebecca will contact you to learn a little more about the support you are looking for."], ["Choose your session", "Select a mini or full online session that suits your needs."], ["Move forward together", "Receive personalised support and practical next steps."]].map(([title, copy], i) => <article key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>

    <section className="section online-section"><div className="container online-grid"><div><p className="eyebrow">Support from your own space</p><h2>All current sessions are <em>delivered online.</em></h2><p>Talk in the place where you feel most comfortable, without travel or waiting rooms.</p></div><div className="online-card">{[["⌘", "Secure video call"], ["☏", "Telephone support where agreed"], ["♡", "Flexible arrangements discussed during enquiry"]].map(([icon, label]) => <div key={label}><span>{icon}</span><p>{label}</p></div>)}</div></div></section>

    <section className="section faq-section"><div className="container faq-grid"><div><p className="eyebrow">Common questions</p><h2>Good to know,<br /><em>before we begin.</em></h2><p>If your question is not answered here, you are welcome to ask Rebecca directly.</p><Link href="/contact" className="text-link">Ask a question →</Link></div><div className="faqs">{faqs.map(([q, a]) => <details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div></div></section>
    <CTA title="Let’s find the right support for you." copy="Tell Rebecca a little about what you’re looking for and ask any questions before booking." button="Start an enquiry" />
  </main>;
}
