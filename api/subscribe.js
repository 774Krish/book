import {
  clientIp,
  isValidEmail,
  oneLine,
  rateLimit,
  readBody,
  sendEmail,
} from './_lib/email.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Only POST is allowed.' })
  }

  const limit = rateLimit(`subscribe:${clientIp(req)}`, {
    limit: 3,
    windowMs: 10 * 60_000,
  })
  if (!limit.ok) {
    res.setHeader('Retry-After', String(limit.retryAfter))
    return res.status(429).json({
      error: 'Too many attempts. Please wait a few minutes and try again.',
    })
  }

  const body = await readBody(req)
  if (body === null) {
    return res.status(400).json({ error: 'Request body must be valid JSON.' })
  }

  if (oneLine(body.website, 80)) {
    return res.status(200).json({ ok: true })
  }

  const email = oneLine(body.email, 254)

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'That email address does not look right.' })
  }

  // NOTE ON SCALING
  // This emails you each new subscriber, which is fine while the list is small
  // and there is no sending infrastructure. Before you actually send a
  // newsletter, move this to a real list provider (Resend Audiences,
  // Buttondown, Mailchimp) — you need double opt-in and an unsubscribe link
  // to comply with GDPR/CAN-SPAM once you mail people.
  const subject = '[BooksOnline] New newsletter subscriber'
  const text = [
    `${email} asked to join the BooksOnline newsletter.`,
    '',
    'They have not confirmed yet — this is a notification, not a subscription.',
  ].join('\n')

  try {
    const result = await sendEmail({ subject, text, replyTo: email })
    return res.status(200).json({ ok: true, delivered: result.delivered })
  } catch (error) {
    console.error('[subscribe] send failed:', error)
    return res.status(502).json({
      error: 'Could not save that just now. Please try again in a moment.',
    })
  }
}
