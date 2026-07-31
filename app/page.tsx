import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CTA, SectionHeading, TestimonialCards } from "@/components/Shared";
import { supportAreas } from "@/data/site";

export const metadata: Metadata = {
  title: "Rebecca Lauren Coaching | Anxiety, ADHD & Family Support Online",
  description: "Compassionate online coaching for adults, children, teenagers and families navigating anxiety, ADHD, overwhelm, emotional regulation and confidence.",
  alternates: { canonical: "/" },
};

const audiences = [
  ["01", "Adults", "Support with anxiety, overwhelm, confidence, emotional regulation and understanding neurodiverse needs."],
  ["02", "Children & Teenagers", "A safe, age-appropriate space to talk, feel heard and develop practical coping tools."],
  ["03", "Parents & Families", "Collaborative support to create greater consistency, understanding and calm at home."],
  ["04", "Neurodiverse Individuals", "Personalised support for ADHD-related challenges, organisation, routines and self-understanding."],
];

export default function Home() {
  return <>
    <main>
      <section className="hero home-hero">
        <div className="hero-bloom bloom-one" /><div className="hero-bloom bloom-two" />
        <div className="container hero-grid">
          <div className="hero-copy fade-up">
            <p className="eyebrow">Compassionate • Personalised • Neurodiverse-friendly</p>
            <h1>Feel heard,<br /><em>supported</em> and<br />empowered.</h1>
            <p className="hero-lede">Warm, personalised coaching for adults, children, teenagers and families navigating anxiety, ADHD, overwhelm, emotional regulation and life’s challenges.</p>
            <div className="button-row"><Link className="button" href="/contact?session=full">Book a Support Session <span>→</span></Link><Link className="text-link" href="/services">Explore My Services <span>↗</span></Link></div>
            <p className="support-line"><span>♡</span> Online coaching with flexible mini and full-length sessions.</p>
          </div>
          <div className="hero-visual fade-up">
            <div className="portrait-shell"><Image src="/images/rebecca-hero-lakeside.jpg" alt="Rebecca holding white flowers beside a peaceful lake" fill priority sizes="(max-width: 800px) 90vw, 44vw" /></div>
            <div className="floating-note"><span>♡</span><strong>You matter.</strong><small>You’re not alone.</small></div>
            <div className="signature-note">Here to listen,<br />here to support.</div>
          </div>
        </div>
        <div className="container trust-row">{["Warm and non-judgemental", "Online and flexible", "Practical, personalised support"].map((x, i) => <div key={x}><span>0{i + 1}</span>{x}</div>)}</div>
      </section>

      <section className="section welcome">
        <div className="container welcome-grid">
          <div className="welcome-image image-frame"><Image src="/images/meet-rebecca.webp" alt="Meet Rebecca, Anxiety and ADHD Coach" fill sizes="(max-width: 800px) 90vw, 42vw" /></div>
          <div><p className="eyebrow">Welcome, you’re safe here</p><h2>Hi, I’m Rebecca.<br /><em>I’m so glad you’re here.</em></h2>
            <p>I’m a Mental Health Coach and Advocate, passionate about supporting adults, children and families through challenges including ADHD, anxiety, social anxiety, overwhelm, emotional regulation and bullying experiences.</p>
            <p>After receiving my own ADHD diagnosis later in life and living with Fibromyalgia, so much of my experience finally began to make sense. My personal journey has given me a deep and genuine understanding of how overwhelming life can sometimes feel.</p>
            <p>I offer a warm, safe and non-judgemental space where we can work together to build practical strategies, confidence, resilience and a greater sense of calm.</p>
            <p className="script-line">Whatever you’re facing, you don’t have to face it alone. ♡</p>
            <Link className="button button-outline" href="/about">Meet Rebecca <span>→</span></Link>
          </div>
        </div>
      </section>

      <section className="section audience-section">
        <div className="container"><SectionHeading eyebrow="Support for real life" title="Who I support" copy="Every person deserves to feel seen, understood and supported in a way that works for them." />
          <div className="audience-grid">{audiences.map(([num, title, copy]) => <article className="audience-card" key={title}><span className="card-num">{num}</span><div className="line-icon">♡</div><h3>{title}</h3><p>{copy}</p><Link href="/services" aria-label={`Learn more about support for ${title}`}>Learn more <span>→</span></Link></article>)}</div>
        </div>
      </section>

      <section className="section help-section"><div className="container help-layout"><div className="help-intro"><p className="eyebrow">How I can help</p><h2>Small steps can create <em>meaningful change.</em></h2><p>Gentle, practical support for the challenges that can make everyday life feel heavy.</p><Link href="/services" className="text-link">See all services <span>→</span></Link></div>
        <div className="help-grid">{supportAreas.map(([title, copy, icon]) => <article key={title}><span>{icon}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>

      <section className="section services-preview"><div className="container"><SectionHeading eyebrow="Flexible online coaching" title="Support that meets you where you are." />
        <div className="session-grid"><article className="session-card featured"><div><span className="session-number">01</span><span className="pill">Focused support</span></div><h3>Mini Session</h3><p className="duration">45 <span>minutes</span></p><p>A focused online session for guidance, reassurance or support with one specific challenge.</p><Link className="button button-outline" href="/contact?session=mini">Enquire about a mini session</Link></article>
        <article className="session-card"><div><span className="session-number">02</span><span className="pill">Deeper support</span></div><h3>Full Session</h3><p className="duration">60 <span>minutes</span></p><p>A more in-depth coaching session with time to explore your needs, goals and practical next steps. Sessions may continue up to 90 minutes when agreed and genuinely needed.</p><Link className="button button-outline" href="/contact?session=full">Enquire about a full session</Link></article></div>
        <div className="coming-soon"><span>Coming soon</span><p>A structured 10-session support package for consistent, ongoing support.</p><Link href="/contact?session=package">Register your interest →</Link></div>
      </div></section>

      <section className="section approach-section"><div className="container approach-grid"><div><p className="eyebrow">My approach</p><h2>A calm and supportive space, <em>centred around you.</em></h2><p>Your story, pace and needs are unique. Coaching should feel human, collaborative and useful in everyday life.</p></div><div className="approach-list">{["Warm, compassionate and non-judgemental", "Person-centred support", "Practical strategies for everyday life", "Sessions tailored to individual needs", "Flexible online support", "Collaborative family guidance where appropriate"].map((x, i) => <div key={x}><span>0{i + 1}</span><p>{x}</p></div>)}</div></div></section>

      <section className="section testimonials-section"><div className="container"><SectionHeading eyebrow="Kind words" title="What people have shared" copy="Experiences of feeling heard, understood and supported." /><TestimonialCards limit={3} /><div className="center"><Link className="button button-outline" href="/about#testimonials">Read More Testimonials <span>→</span></Link></div></div></section>
      <CTA />
    </main>
  </>;
}
