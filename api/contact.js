const allowedOrigins = new Set([
  "https://www.ycland.com.tw",
  "https://ycland.com.tw",
  "https://ycland-website.vercel.app",
]);

const clean = (value, maxLength) => String(value ?? "").trim().slice(0, maxLength);

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ ok: false, error: "method_not_allowed" });
  }

  const origin = request.headers.origin;
  if (origin && !allowedOrigins.has(origin)) {
    return response.status(403).json({ ok: false, error: "origin_not_allowed" });
  }

  const appsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
  const secret = process.env.CONTACT_FORM_SECRET;
  if (!appsScriptUrl || !secret) {
    return response.status(503).json({ ok: false, error: "service_not_configured" });
  }

  const name = clean(request.body?.name, 100);
  const contact = clean(request.body?.contact, 150);
  const availableTime = clean(request.body?.availableTime, 150);
  const message = clean(request.body?.message, 1000);
  if (!name || !contact || !message) {
    return response.status(400).json({ ok: false, error: "missing_fields" });
  }

  try {
    const upstream = await fetch(appsScriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret,
        name,
        contact,
        availableTime,
        message,
        source: "https://www.ycland.com.tw/",
      }),
    });
    const result = await upstream.json();
    if (!upstream.ok || !result.ok) {
      console.error("contact_storage_failed", result?.error || upstream.status);
      return response.status(502).json({ ok: false, error: "storage_failed" });
    }
    return response.status(200).json({ ok: true });
  } catch (error) {
    console.error("contact_storage_unavailable", error);
    return response.status(502).json({ ok: false, error: "storage_unavailable" });
  }
}
