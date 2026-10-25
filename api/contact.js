import {
  clientIp,
  isValidEmail,
  multiLine,
  oneLine,
  rateLimit,
  readBody,
  sendEmail,
} from './_lib/email.js'

const TOPICS = new Set([
  'Suggest a store',
  'Report a broken link',
  'Correction to a description',
  'Privacy or data question',
  'Something else',
])

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Only POST is allowed.' })
  }

  const limit = rateLimit(`contact:${clientIp(req)}`, {
    limit: 5,
    windowMs: 10 * 60_000,
  })
  if (!limit.ok) {
    res.setHeader('Retry-After', String(limit.retryAfter))
    return res.status(429).json({
      error: 'Too many messages. Please wait a few minutes and try again.',
    })
  }

  const body = await readBody(req)
  if (body === null) {
    return res.status(400).json({ error: 'Request body must be valid JSON.' })
  }

  // Honeypot: a field hidden from humans. Anything typed into it is a bot, so
  // pretend the request succeeded without doing any work.
  if (oneLine(body.website, 80)) {
    return res.status(200).json({ ok: true })
  }

  const name = oneLine(body.name, 80)
  const email = oneLine(body.email, 254)
  const topic = oneLine(body.topic, 60)
  const message = multiLine(body.message, 4000)

  const fields = {}
  if (name.length < 2) fields.name = 'Please tell us your name.'
  if (!isValidEmail(email)) fields.email = 'Enter an email address we can reply to.'
  if (!TOPICS.has(topic)) fields.topic = 'Choose one of the listed topics.'
  if (message.length < 12) {
    fields.message = 'A little more detail helps — 12 characters minimum.'
  }

  if (Object.keys(fields).length > 0) {
    return res
      .status(400)
      .json({ error: 'Please check the highlighted fields.', fields })
  }

  const subject = `[BooksOnline] ${topic} — ${name}`
  const text = [
    `From:  ${name} <${email}>`,
    `Topic: ${topic}`,
    '',
    message,
    '',
    '---',
    'Sent from the BooksOnline contact form.',
  ].join('\n')

  try {
    const result = await sendEmail({ subject, text, replyTo: email })
    return res.status(200).json({ ok: true, delivered: result.delivered })
  } catch (error) {
    console.error('[contact] send failed:', error)
    return res.status(502).json({
      error:
        'The message could not be sent right now. Please email us directly instead.',
    })
  }
}
