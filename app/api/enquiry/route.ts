import { NextResponse } from "next/server";

const required = ["name", "email", "supportFor", "supportArea", "session", "contactMethod", "message", "consent", "privacy"];

export async function POST(request: Request) {
  try {
    const body = await request.json() as Record<string, unknown>;
    if (body.website) return NextResponse.json({ ok: true });
    if (required.some((key) => typeof body[key] !== "string" || !String(body[key]).trim())) return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
    if (!/^\S+@\S+\.\S+$/.test(String(body.email)) || String(body.message).length < 10) return NextResponse.json({ error: "Please check your email and message." }, { status: 400 });
    const endpoint = process.env.FORMSPREE_ENDPOINT;
    if (!endpoint) return NextResponse.json({ error: "Enquiry service is not configured." }, { status: 503 });
    const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(body) });
    if (!response.ok) return NextResponse.json({ error: "Enquiry service unavailable." }, { status: 502 });
    return NextResponse.json({ ok: true });
  } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
}
