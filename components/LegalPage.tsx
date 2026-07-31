import Link from "next/link";

export function LegalPage({ eyebrow, title, intro, sections }: { eyebrow: string; title: string; intro: string; sections: Array<[string, string]> }) {
  return <main><section className="page-hero legal-hero"><div className="container narrow"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="hero-lede">{intro}</p><div className="draft-label">Draft content — professional legal review recommended.</div></div></section><section className="section"><div className="container legal-copy">{sections.map(([heading, copy]) => <section key={heading}><h2>{heading}</h2><p>{copy}</p></section>)}<Link className="button button-outline" href="/contact">Ask Rebecca a question</Link></div></section></main>;
}
