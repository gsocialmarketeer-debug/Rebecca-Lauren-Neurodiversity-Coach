import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { contact } from "@/data/site";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Rebecca Lauren Coaching", template: "%s" },
  description: "Warm, personalised online coaching for adults, children, teenagers and families.",
  openGraph: { title: "Rebecca Lauren Coaching", description: "Feel heard, supported and empowered with warm, personalised online coaching.", url: siteUrl, siteName: "Rebecca Lauren Coaching", type: "website", images: [{ url: "/images/anxiety-adhd-coaching.webp", width: 1024, height: 1536, alt: "Rebecca Lauren Coaching" }] },
  twitter: { card: "summary_large_image", title: "Rebecca Lauren Coaching", description: "Warm, personalised online coaching support.", images: ["/images/anxiety-adhd-coaching.webp"] },
  icons: { icon: "/favicon.jpg", shortcut: "/favicon.jpg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const schema = { "@context": "https://schema.org", "@type": "ProfessionalService", name: "Rebecca Lauren Coaching", description: "Online mental health coaching and advocacy for adults, children, teenagers and families.", url: siteUrl, email: contact.email, telephone: contact.phone, areaServed: "United Kingdom", sameAs: [contact.instagram, contact.linktree], contactPoint: { "@type": "ContactPoint", email: contact.email, telephone: contact.phone, contactType: "customer support" } };
  return <html lang="en"><body><a className="skip-link" href="#main-content">Skip to content</a><Header /><div id="main-content">{children}</div><Footer /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /></body></html>;
}
