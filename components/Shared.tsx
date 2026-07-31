import Link from "next/link";
import { testimonials } from "@/data/site";

export function SectionHeading({ eyebrow, title, copy, align = "center" }: { eyebrow?: string; title: string; copy?: string; align?: "center" | "left" }) {
  return <div className={`section-heading ${align}`}>
    {eyebrow && <p className="eyebrow">{eyebrow}</p>}<h2>{title}</h2>{copy && <p>{copy}</p>}
  </div>;
}

export function TestimonialCards({ limit = testimonials.length }: { limit?: number }) {
  return <div className="testimonial-grid">{testimonials.slice(0, limit).map((item, index) => <figure className="testimonial" key={item.quote}>
    <div className="quote-mark">“</div><div className="stars" aria-label="Five stars">★★★★★</div><blockquote>{item.quote}</blockquote><figcaption>{item.label} <span>0{index + 1}</span></figcaption>
  </figure>)}</div>;
}

export function CTA({ title = "You don’t have to work through everything alone.", copy = "Take the first step towards feeling calmer, more confident and better supported.", button = "Contact Rebecca" }) {
  return <section className="cta-band"><div className="container cta-inner"><div><p className="eyebrow">A gentle first step</p><h2>{title}</h2><p>{copy}</p></div><Link href="/contact" className="button button-light">{button} <span>→</span></Link></div></section>;
}

export function EmergencyNotice() {
  return <aside className="emergency"><span aria-hidden="true">i</span><div><strong>Urgent support</strong><p>Rebecca Lauren Coaching is not an emergency or crisis service. If you or someone else is in immediate danger, contact emergency services. For urgent mental-health support, contact an appropriate crisis or healthcare service in your area.</p></div></aside>;
}
