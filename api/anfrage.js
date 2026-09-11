const MAX_BODY_BYTES = 32 * 1024;
const MAX_FIELDS = 24;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value, maxLength) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function escapeHtml(value) {
  return value.replace(/[&<>'"]/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  })[character]);
}

function requestOriginIsAllowed(req) {
  const origin = req.headers.origin;
  if (!origin) return true;
  const host = req.headers.host || '';
  return origin === `https://${host}` ||
    origin === 'https://revermann.de' ||
    origin === 'https://www.revermann.de' ||
    /^https:\/\/revermann10(?:-[a-z0-9-]+)?\.vercel\.app$/i.test(origin);
}

function bodyAsObject(body) {
  if (typeof body === 'string') return JSON.parse(body);
  return body && typeof body === 'object' ? body : {};
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (!requestOriginIsAllowed(req)) return res.status(403).json({ error: 'Forbidden' });
  if (Number(req.headers['content-length'] || 0) > MAX_BODY_BYTES) {
    return res.status(413).json({ error: 'Request too large' });
  }

  let payload;
  try {
    payload = bodyAsObject(req.body);
  } catch (_error) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  const kind = payload.kind === 'cruise' ? 'cruise' : payload.kind === 'travel' ? 'travel' : '';
  const firstName = clean(payload.firstName, 80);
  const lastName = clean(payload.lastName, 100);
  const email = clean(payload.email, 254).toLowerCase();
  const phone = clean(payload.phone, 80);
  const consent = payload.consent === true;
  const honeypot = clean(payload.website, 200);

  if (honeypot) return res.status(200).json({ ok: true });
  if (!kind || !firstName || !lastName || !consent) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  if (email && !EMAIL_PATTERN.test(email)) return res.status(400).json({ error: 'Invalid email' });
  if ((kind === 'travel' && !email) || (kind === 'cruise' && !email && !phone)) {
    return res.status(400).json({ error: 'Missing contact method' });
  }

  const fields = Array.isArray(payload.fields) ? payload.fields.slice(0, MAX_FIELDS) : [];
  const lines = fields
    .map(field => ({ label: clean(field?.label, 100), value: clean(field?.value, 2000) }))
    .filter(field => field.label && field.value)
    .map(field => `${field.label}: ${field.value}`);
  const subject = kind === 'cruise'
    ? `Neue Kreuzfahrt-Anfrage von ${firstName} ${lastName}`
    : `Neue Reiseanfrage von ${firstName} ${lastName}`;
  const text = [
    'Neue Anfrage über revermann.de',
    '',
    ...lines,
    '',
    '— automatisch über das Anfrageformular übermittelt'
  ].join('\n');
  const html = [
    '<h2>Neue Anfrage über revermann.de</h2>',
    '<table style="border-collapse:collapse">',
    ...fields
      .map(field => ({ label: clean(field?.label, 100), value: clean(field?.value, 2000) }))
      .filter(field => field.label && field.value)
      .map(field => `<tr><td style="padding:6px 12px 6px 0;font-weight:600;vertical-align:top">${escapeHtml(field.label)}</td><td style="padding:6px 0;white-space:pre-wrap">${escapeHtml(field.value)}</td></tr>`),
    '</table>'
  ].join('');

  const apiKey = process.env.RESEND_API_KEY;
  const sendingDomain = clean(process.env.RESEND_EMAIL_DOMAIN, 253) || 'anfragen.revermann.de';
  if (!apiKey) return res.status(503).json({ error: 'Mail service unavailable' });

  try {
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: `Bustouristik Revermann <anfrage@${sendingDomain}>`,
        to: ['info@revermann.de'],
        ...(email ? { reply_to: email } : {}),
        subject,
        text,
        html
      })
    });
    if (!resendResponse.ok) return res.status(502).json({ error: 'Mail delivery failed' });
  } catch (_error) {
    return res.status(502).json({ error: 'Mail delivery failed' });
  }

  return res.status(200).json({ ok: true });
}
