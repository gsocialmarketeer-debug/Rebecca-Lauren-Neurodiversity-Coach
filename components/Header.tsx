"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [["/", "Home"], ["/about", "About"], ["/services", "Services"], ["/contact", "Contact"]];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="announcement">A gentle place to pause, be heard, and move forward <span>♡</span></div>
      <div className="nav-shell">
        <Link href="/" className="brand" aria-label="Rebecca Lauren Coaching home">
          <span>Rebecca Lauren</span><small>COACHING</small>
        </Link>
        <button className="menu-button" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen(!open)}>
          <span /><span /><span />
        </button>
        <nav className={open ? "nav-links open" : "nav-links"} aria-label="Main navigation">
          {links.map(([href, label]) => <Link key={href} href={href} className={pathname === href ? "active" : ""} onClick={() => setOpen(false)}>{label}</Link>)}
          <Link className="button button-small" href="/contact?session=full" onClick={() => setOpen(false)}>Book a Support Session</Link>
        </nav>
      </div>
    </header>
  );
}
