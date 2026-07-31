"use client";

import { useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { contact } from "@/data/site";

type State = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const params = useSearchParams();
  const preset = params.get("session");
  const initialSession = preset === "package" ? "10-session package interest" : preset === "mini" ? "Mini session — 45 minutes" : preset === "full" ? "Full session — 60 minutes" : "Not sure yet";
  const [state, setState] = useState<State>("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) { form.reportValidity(); return; }
    setState("sending");
    const payload = Object.fromEntries(new FormData(form));
    try {
      const response = await fetch("/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!response.ok) throw new Error("Unable to send");
      setState("success"); form.reset();
    } catch { setState("error"); }
  }

  if (state === "success") return <div className="form-status success" role="status"><span>✓</span><h3>Thank you for getting in touch.</h3><p>Rebecca will respond as soon as she can.</p></div>;
  return <form className="contact-form" onSubmit={submit} noValidate>
    <div className="honeypot" aria-hidden="true"><label>Leave this field blank<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <div className="form-grid">
      <label>Full name <span>*</span><input name="name" autoComplete="name" required /></label>
      <label>Email address <span>*</span><input type="email" name="email" autoComplete="email" required /></label>
      <label>Telephone number<input type="tel" name="telephone" autoComplete="tel" /></label>
      <label>Who is the support for? <span>*</span><select name="supportFor" required defaultValue=""><option value="" disabled>Please select</option><option>Myself</option><option>My child or teenager</option><option>My family</option><option>Someone else</option></select></label>
      <label>Age range <small>(optional)</small><input name="ageRange" placeholder="e.g. adult or 14–17" /></label>
      <label>Main area of support <span>*</span><select name="supportArea" required defaultValue=""><option value="" disabled>Please select</option>{["Anxiety", "Social anxiety", "ADHD or neurodiversity", "Emotional regulation", "Overwhelm or stress", "Confidence", "Bullying", "Parent or family support", "Other"].map(x => <option key={x}>{x}</option>)}</select></label>
      <label>Preferred session <span>*</span><select name="session" defaultValue={initialSession} required><option>Mini session — 45 minutes</option><option>Full session — 60 minutes</option><option>10-session package interest</option><option>Not sure yet</option></select></label>
      <label>Preferred contact method <span>*</span><select name="contactMethod" required defaultValue="Email"><option>Email</option><option>Telephone</option><option>WhatsApp</option></select></label>
    </div>
    <label>Brief message <span>*</span><textarea name="message" rows={6} required minLength={10} placeholder="Please share only what feels relevant. You do not need to include detailed medical information." /></label>
    <label className="check"><input type="checkbox" name="consent" value="yes" required /><span>I consent to Rebecca Lauren Coaching using the information provided to respond to my enquiry.</span></label>
    <label className="check"><input type="checkbox" name="privacy" value="yes" required /><span>I have read and acknowledge the <a href="/privacy">Privacy Policy</a>.</span></label>
    <p className="form-note">This form is for general enquiries and coaching bookings. Please do not use it for urgent or emergency support.</p>
    {state === "error" && <p className="form-error" role="alert">Your enquiry could not be sent just now. Please email <a href={`mailto:${contact.email}`}>{contact.email}</a> instead.</p>}
    <button className="button form-submit" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send My Enquiry"} <span>→</span></button>
  </form>;
}
