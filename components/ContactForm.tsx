"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { contact } from "@/data/site";

function sessionFromPreset(preset: string | null) {
  return preset === "discovery" ? "Free discovery call — 20 minutes" : preset === "package" ? "10-session package interest" : preset === "mini" ? "Mini session — 45 minutes" : preset === "full" ? "Full session — 60 minutes" : "Not sure yet";
}

export function ContactForm() {
  const sessionSelect = useRef<HTMLSelectElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useEffect(() => {
    if (sessionSelect.current) sessionSelect.current.value = sessionFromPreset(new URLSearchParams(window.location.search).get("session"));
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const payload = Object.fromEntries(new FormData(form));
    const value = (key: string) => String(payload[key] ?? "").trim();
    const message = [
      "Hello Rebecca,",
      "",
      "I would like to enquire about coaching support.",
      "",
      `Name: ${value("name")}`,
      `Email: ${value("email")}`,
      value("telephone") ? `Telephone: ${value("telephone")}` : "",
      `Support for: ${value("supportFor")}`,
      value("ageRange") ? `Age range: ${value("ageRange")}` : "",
      `Main area of support: ${value("supportArea")}`,
      `Preferred session: ${value("session")}`,
      `Preferred reply method: ${value("contactMethod")}`,
      "",
      "Message:",
      value("message"),
    ].filter(Boolean).join("\n");
    const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    if (submitter?.value === "whatsapp") {
      window.location.href = `${contact.whatsapp}?text=${encodeURIComponent(message)}`;
      return;
    }
    setStatus("sending");
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${contact.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: value("name"),
          email: value("email"),
          telephone: value("telephone") || "Not provided",
          "support for": value("supportFor"),
          "age range": value("ageRange") || "Not provided",
          "main area of support": value("supportArea"),
          "preferred session": value("session"),
          "preferred reply method": value("contactMethod"),
          message: value("message"),
          consent: "Confirmed",
          "privacy policy acknowledged": "Confirmed",
          _subject: `New website enquiry from ${value("name")}`,
          _template: "table",
          _honey: value("_honey"),
          _url: window.location.href,
        }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || result?.success === false || result?.success === "false") throw new Error("Submission failed");
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") return <div className="form-status" role="status"><span>✓</span><h3>Thank you — your enquiry has been sent.</h3><p>Rebecca will reply as soon as she can. Please remember this is not an urgent-support service.</p><button className="text-link" type="button" onClick={() => setStatus("idle")}>Send another enquiry</button></div>;

  return <form className="contact-form" action={`https://formsubmit.co/${contact.email}`} method="POST" onSubmit={submit} noValidate>
    <div className="honeypot" aria-hidden="true"><label>Leave this field blank<input name="_honey" tabIndex={-1} autoComplete="off" /></label></div>
    <div className="form-grid">
      <label>Full name <span>*</span><input name="name" autoComplete="name" required /></label>
      <label>Email address <span>*</span><input type="email" name="email" autoComplete="email" required /></label>
      <label>Telephone number<input type="tel" name="telephone" autoComplete="tel" /></label>
      <label>Who is the support for? <span>*</span><select name="supportFor" required defaultValue=""><option value="" disabled>Please select</option><option>Myself</option><option>My child or teenager</option><option>My family</option><option>Someone else</option></select></label>
      <label>Age range <small>(optional)</small><input name="ageRange" placeholder="e.g. adult or 14–17" /></label>
      <label>Main area of support <span>*</span><select name="supportArea" required defaultValue=""><option value="" disabled>Please select</option>{["Anxiety", "Social anxiety", "ADHD or neurodiversity", "Emotional regulation", "Overwhelm or stress", "Confidence", "Bullying", "Parent or family support", "Other"].map(x => <option key={x}>{x}</option>)}</select></label>
      <label>Preferred session <span>*</span><select ref={sessionSelect} name="session" defaultValue="Not sure yet" required><option>Free discovery call — 20 minutes</option><option>Mini session — 45 minutes</option><option>Full session — 60 minutes</option><option>10-session package interest</option><option>Not sure yet</option></select></label>
      <label>Preferred contact method <span>*</span><select name="contactMethod" required defaultValue="Email"><option>Email</option><option>Telephone</option><option>WhatsApp</option></select></label>
    </div>
    <label>Brief message <span>*</span><textarea name="message" rows={6} required minLength={10} placeholder="Please share only what feels relevant. You do not need to include detailed medical information." /></label>
    <label className="check"><input type="checkbox" name="consent" value="yes" required /><span>I consent to Rebecca Lauren Coaching using the information provided to respond to my enquiry.</span></label>
    <label className="check"><input type="checkbox" name="privacy" value="yes" required /><span>I have read and acknowledge the <a href="/privacy">Privacy Policy</a>.</span></label>
    <p className="form-note">This form is for general enquiries and coaching bookings. Please do not use it for urgent or emergency support.</p>
    {status === "error" && <p className="form-error" role="alert">Your enquiry could not be sent just now. Please try again, use WhatsApp, or email <a href={`mailto:${contact.email}`}>{contact.email}</a>.</p>}
    <p className="send-choice">Send the form directly to Rebecca&apos;s email, or choose WhatsApp to open a message for review before sending.</p>
    <div className="form-actions">
      <button className="button form-submit" type="submit" value="email" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send enquiry"} <span>→</span></button>
      <button className="button form-submit button-whatsapp" type="submit" value="whatsapp" disabled={status === "sending"}>Send by WhatsApp <span>→</span></button>
    </div>
  </form>;
}
