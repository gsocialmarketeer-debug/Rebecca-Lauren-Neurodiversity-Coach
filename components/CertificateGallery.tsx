"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const certificates = [
  { src: "/images/certificate-adhd.webp", label: "ADHD Coach — Distinction", alt: "ADHD Coach certificate awarded to Rebecca Shaw" },
  { src: "/images/certificate-neurodiversity.webp", label: "Neurodiversity Coach — Distinction", alt: "Neurodiversity Coach certificate awarded to Rebecca Shaw" },
  { src: "/images/certificate-trauma-healing.webp", label: "Trauma Healing Practitioner — Distinction", alt: "Trauma Healing Practitioner certificate awarded to Rebecca Shaw" },
  { src: "/images/certificate-infant-sleep-consultant.jpg", label: "Infant Sleep Consultant — Level Three", alt: "OCN London Record of Achievement in infant sleep consultancy awarded to Rebecca Lauren Shaw" },
];

export function CertificateGallery() {
  const [active, setActive] = useState<number | null>(null);
  useEffect(() => { const close = (e: KeyboardEvent) => e.key === "Escape" && setActive(null); document.addEventListener("keydown", close); return () => document.removeEventListener("keydown", close); }, []);
  return <>
    <div className="certificate-grid">{certificates.map(({ src, label, alt }, index) => <button className="certificate-card" key={src} onClick={() => setActive(index)} aria-label={`Enlarge ${label}`}>
      <span className="certificate-image"><Image src={src} alt={alt} fill sizes="(max-width: 760px) 90vw, (max-width: 1000px) 45vw, 25vw" /></span><span><b>{label}</b><small>View certificate ↗</small></span>
    </button>)}</div>
    {active !== null && <div className="modal" role="dialog" aria-modal="true" aria-label={certificates[active].label} onClick={() => setActive(null)}>
      <button className="modal-close" onClick={() => setActive(null)} aria-label="Close certificate">×</button><div className="modal-image" onClick={(e) => e.stopPropagation()}><Image src={certificates[active].src} alt={certificates[active].alt} fill sizes="90vw" /></div>
    </div>}
  </>;
}
