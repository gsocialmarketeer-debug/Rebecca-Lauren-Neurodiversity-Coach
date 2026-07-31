import Link from "next/link";
import { contact } from "@/data/site";

export function Footer() {
  return <footer className="footer">
    <div className="container footer-grid">
      <div><div className="brand brand-footer"><span>Rebecca Lauren</span><small>COACHING</small></div><p>Warm, personalised online support for adults, children, teenagers and families.</p></div>
      <div><h3>Explore</h3><div className="footer-links"><Link href="/">Home</Link><Link href="/about">About</Link><Link href="/services">Services</Link><Link href="/contact">Contact</Link></div></div>
      <div><h3>Connect</h3><div className="footer-links"><a href={`mailto:${contact.email}`}>{contact.email}</a><a href={`tel:${contact.phone}`}>{contact.phoneDisplay}</a><a href={contact.instagram} target="_blank" rel="noreferrer">Instagram ↗</a><a href={contact.linktree} target="_blank" rel="noreferrer">Linktree ↗</a></div></div>
      <div><h3>Information</h3><div className="footer-links"><Link href="/privacy">Privacy Policy</Link><Link href="/terms">Website Terms</Link><Link href="/disclaimer">Coaching Disclaimer</Link><Link href="/safeguarding">Safeguarding</Link></div></div>
    </div>
    <div className="container footer-bottom"><span>© {new Date().getFullYear()} Rebecca Lauren Coaching. All rights reserved.</span><span>Coach & advocate • Online support</span></div>
  </footer>;
}
