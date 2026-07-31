"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const certificates = [
  ["/images/certificate-adhd.webp", "ADHD Coach — Distinction"],
  ["/images/certificate-neurodiversity.webp", "Neurodiversity Coach — Distinction"],
  ["/images/certificate-trauma-healing.webp", "Trauma Healing Practitioner — Distinction"],
];

export function CertificateGallery() {
  const [active, setActive] = useState<number | null>(null);
  useEffect(() => { const close = (e: KeyboardEvent) => e.key === "Escape" && setActive(null); document.addEventListener("keydown", close); return () => document.removeEventListener("keydown", close); }, []);
  return <>
    <div className="certificate-grid">{certificates.map(([src, label], index) => <button className="certificate-card" key={src} onClick={() => setActive(index)} aria-label={`Enlarge ${label}`}>
      <span className="certificate-image"><Image src={src} alt={`${label} certificate awarded to Rebecca Shaw`} fill sizes="(max-width: 760px) 90vw, 30vw" /></span><span><b>{label}</b><small>View certificate ↗</small></span>
    </button>)}</div>
    {active !== null && <div className="modal" role="dialog" aria-modal="true" aria-label={certificates[active][1]} onClick={() => setActive(null)}>
      <button className="modal-close" onClick={() => setActive(null)} aria-label="Close certificate">×</button><div className="modal-image" onClick={(e) => e.stopPropagation()}><Image src={certificates[active][0]} alt={certificates[active][1]} fill sizes="90vw" /></div>
    </div>}
  </>;
}
