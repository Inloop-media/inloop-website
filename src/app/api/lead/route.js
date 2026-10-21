// Website contact form → Google Sheets (Apps Script web app in google-apps-script/master)
// Needs LEADS_WEBHOOK_URL and LEADS_WEBHOOK_SECRET in the environment.

const REQUIRED = ["firstName", "lastName", "phone", "email", "company", "location", "service"];
const FIELDS = [...REQUIRED, "budget", "message", "newsletter"];

export async function POST(request) {
  const url = process.env.LEADS_WEBHOOK_URL;
  const secret = process.env.LEADS_WEBHOOK_SECRET;
  if (!url || !secret) {
    return Response.json({ ok: false, error: "Lead capture is not configured" }, { status: 503 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  // Honeypot: real visitors never fill this hidden field
  if (body.website) return Response.json({ ok: true });

  const lead = {};
  for (const key of FIELDS) {
    const v = body[key];
    lead[key] = typeof v === "string" ? v.trim().slice(0, 4000) : Boolean(v);
  }
  const missing = REQUIRED.filter((k) => !lead[k]);
  if (missing.length || !/^\S+@\S+\.\S+$/.test(lead.email)) {
    return Response.json({ ok: false, error: "Please fill all required fields" }, { status: 400 });
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...lead, secret }),
      redirect: "follow",
      cache: "no-store",
    });
    const data = await res.json().catch(() => ({}));
    if (!data.ok) throw new Error(data.error || `Sheet responded ${res.status}`);
    return Response.json({ ok: true, id: data.id });
  } catch (err) {
    console.error("Lead capture failed:", err);
    return Response.json({ ok: false, error: "Could not save your enquiry" }, { status: 502 });
  }
}
