// Website contact form → Google Sheets (Apps Script web app in google-apps-script/master) and the Inloop CRM.
// Sheet: LEADS_WEBHOOK_URL + LEADS_WEBHOOK_SECRET. CRM: CRM_INTAKE_URL + CRM_INTAKE_SECRET.
// Each one is optional; the enquiry counts as saved if at least one of them accepts it.

const REQUIRED = ["firstName", "lastName", "phone", "email", "company", "location", "service"];
const FIELDS = [...REQUIRED, "budget", "message", "newsletter"];

async function sendToSheet(lead) {
  const res = await fetch(process.env.LEADS_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...lead, secret: process.env.LEADS_WEBHOOK_SECRET }),
    redirect: "follow",
    cache: "no-store",
  });
  const data = await res.json().catch(() => ({}));
  if (!data.ok) throw new Error(data.error || `Sheet responded ${res.status}`);
  return data.id;
}

async function sendToCrm(lead) {
  const res = await fetch(process.env.CRM_INTAKE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-intake-secret": process.env.CRM_INTAKE_SECRET },
    body: JSON.stringify(lead),
    cache: "no-store",
  });
  const data = await res.json().catch(() => ({}));
  if (!data.ok) throw new Error(data.error || `CRM responded ${res.status}`);
  return data.id;
}

export async function POST(request) {
  const targets = [];
  if (process.env.LEADS_WEBHOOK_URL && process.env.LEADS_WEBHOOK_SECRET) targets.push(["Sheet", sendToSheet]);
  if (process.env.CRM_INTAKE_URL && process.env.CRM_INTAKE_SECRET) targets.push(["CRM", sendToCrm]);
  if (!targets.length) {
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

  const results = await Promise.allSettled(targets.map(([, send]) => send(lead)));
  results.forEach((r, i) => {
    if (r.status === "rejected") console.error(`Lead capture (${targets[i][0]}) failed:`, r.reason);
  });
  const saved = results.find((r) => r.status === "fulfilled");
  if (!saved) return Response.json({ ok: false, error: "Could not save your enquiry" }, { status: 502 });
  return Response.json({ ok: true, id: saved.value });
}
