import Link from "next/link";
import type { ReactNode } from "react";

type LegalSection = {
  heading: string;
  content: ReactNode;
};

const sectionId = (heading: string) => heading.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export function LegalPage({ eyebrow, title, intro, sections }: { eyebrow: string; title: string; intro: string; sections: LegalSection[] }) {
  return <main>
    <section className="page-hero legal-hero">
      <div className="container narrow">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="hero-lede">{intro}</p>
        <div className="policy-meta"><span>Last updated</span><strong>1 August 2026</strong></div>
      </div>
    </section>
    <section className="section">
      <div className="container legal-copy">
        <nav className="legal-contents" aria-label={`Contents of ${title}`}>
          <strong>On this page</strong>
          <div>{sections.map(({ heading }) => <a key={heading} href={`#${sectionId(heading)}`}>{heading}</a>)}</div>
        </nav>
        {sections.map(({ heading, content }) => <section id={sectionId(heading)} key={heading}><h2>{heading}</h2><div>{content}</div></section>)}
        <div className="legal-contact"><p>If you have a question about this information, please contact Rebecca before using the service.</p><Link className="button button-outline" href="/contact">Ask Rebecca a question</Link></div>
      </div>
    </section>
  </main>;
}
