// Shared helpers for the API routes.
//
// Files inside api/ whose names start with an underscore are NOT deployed as
// endpoints by Vercel — they are just modules. So this file is safe to import
// from contact.js and subscribe.js without exposing it as a URL.
//
// Nothing here uses an npm package: email is sent by calling Resend's REST API
// with fetch(), which is built into Node 18+.

const RESEND_URL = 'https://api.resend.com/emails'

/* ------------------------------------------------------------------ *
 * Sanitising input
 * ------------------------------------------------------------------ */

// Collapse to a single line. Use for names, subjects, emails.
export function oneLine(value, max = 200) {
  return String(value ?? '')
    // Stripping control characters is the whole point here.
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max)
}

// Keep line breaks, drop other control characters. Use for message bodies.
export function multiLine(value, max = 4000) {
  return String(value ?? '')
    .replace(/\r\n/g, '\n')
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .trim()
    .slice(0, max)
}

// Deliberately simple. Real validation is "did the email arrive?" — this
// only catches obvious typos, which is all a form can reasonably do.
//
// The domain part disallows empty labels, so "abc@.gmail.com" and
// "abc@gmail..com" are rejected rather than silently accepted.
export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/.test(oneLine(value, 254))
}

/* ------------------------------------------------------------------ *
 * Request helpers
 * ------------------------------------------------------------------ */

// On Vercel the body is usually already parsed. In the local dev server it is
// still a stream, so read it ourselves.
export async function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body

  const chunks = []
  for await (const chunk of req) chunks.push(chunk)
  const raw = Buffer.concat(chunks).toString('utf8')
  if (!raw) return {}

  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function clientIp(req) {
  const forwarded = req.headers['x-forwarded-for']
  if (typeof forwarded === 'string' && forwarded) return forwarded.split(',')[0].trim()
  return req.socket?.remoteAddress || 'unknown'
}

/* ------------------------------------------------------------------ *
 * Rate limiting
 * ------------------------------------------------------------------ */

// Best-effort only. Serverless instances are short-lived and there may be
// several of them, so this slows down casual abuse rather than stopping a
// determined attacker. For real protection put a WAF or CAPTCHA in front.
const hits = new Map()

export function rateLimit(key, { limit = 5, windowMs = 10 * 60_000 } = {}) {
  const now = Date.now()
  let entry = hits.get(key)

  if (!entry || now > entry.reset) {
    entry = { count: 0, reset: now + windowMs }
  }

  entry.count += 1
  hits.set(key, entry)

  // Keep the map from growing forever.
  if (hits.size > 2000) {
    for (const [k, v] of hits) if (now > v.reset) hits.delete(k)
  }

  return {
    ok: entry.count <= limit,
    retryAfter: Math.max(1, Math.ceil((entry.reset - now) / 1000)),
  }
}

/* ------------------------------------------------------------------ *
 * Sending email
 * ------------------------------------------------------------------ */

export async function sendEmail({ subject, text, replyTo }) {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO
  const from = process.env.MAIL_FROM || 'BooksOnline <onboarding@resend.dev>'

  // No key configured: print the email to the server console instead. This is
  // how you test the whole flow before creating a Resend account.
  if (!apiKey) {
    console.log('\n────────── DEV EMAIL (RESEND_API_KEY not set) ──────────')
    console.log('To:      ', to || '(CONTACT_TO not set!)')
    console.log('From:    ', from)
    if (replyTo) console.log('Reply-To:', replyTo)
    console.log('Subject: ', subject)
    console.log('')
    console.log(text)
    console.log('────────────────────────────────────────────────────────\n')
    return { delivered: false, reason: 'no-api-key' }
  }

  if (!to) throw new Error('CONTACT_TO is not set.')

  const response = await fetch(RESEND_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      text,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  })

  if (!response.ok) {
    const detail = await response.text().catch(() => '')
    throw new Error(`Resend responded ${response.status}: ${detail.slice(0, 300)}`)
  }

  return { delivered: true }
}
