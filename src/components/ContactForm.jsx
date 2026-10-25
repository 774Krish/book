import { useState } from 'react'
import { CONTACT_EMAIL } from '../data/pages'

const TOPICS = [
  'Suggest a store',
  'Report a broken link',
  'Correction to a description',
  'Privacy or data question',
  'Something else',
]

const EMPTY = { name: '', email: '', topic: TOPICS[0], message: '', website: '' }

// Disallows empty domain labels, so "abc@.gmail.com" and "abc@gmail..com" fail.
const EMAIL_RE = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/

export default function ContactForm() {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [serverError, setServerError] = useState('')
  const [sent, setSent] = useState(false)

  function update(field) {
    return (event) => {
      setValues((prev) => ({ ...prev, [field]: event.target.value }))
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  function validate() {
    const next = {}
    if (values.name.trim().length < 2) {
      next.name = 'Please tell us your name.'
    }
    if (!EMAIL_RE.test(values.email.trim())) {
      next.email = 'Enter an email address we can reply to.'
    }
    if (values.message.trim().length < 12) {
      next.message = 'A little more detail helps — 12 characters minimum.'
    }
    return next
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (sending) return

    setServerError('')
    const found = validate()
    setErrors(found)
    if (Object.keys(found).length > 0) return

    setSending(true)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          topic: values.topic,
          message: values.message.trim(),
          website: values.website,
        }),
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        if (data.fields) setErrors(data.fields)
        setServerError(
          data.error || `Something went wrong (error ${response.status}).`,
        )
        return
      }

      setSent(true)
      setValues(EMPTY)
    } catch {
      // Network failure, offline, or the API isn't running in dev.
      setServerError(
        `Could not reach the server. You can email us directly at ${CONTACT_EMAIL} instead.`,
      )
    } finally {
      setSending(false)
    }
  }

  if (sent) {
    return (
      <div className="form-done" role="status">
        <p className="form-done-title">Message sent</p>
        <p className="form-done-body">
          Thanks — we have it, and a real person will reply within two to three
          working days. If it was a broken link, it is usually fixed sooner.
        </p>
        <button
          type="button"
          className="btn-reset"
          onClick={() => setSent(false)}
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      {serverError && (
        <p className="form-banner" role="alert">
          {serverError.includes('@') ? (
            <>
              Could not reach the server. You can email us directly at{' '}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> instead.
            </>
          ) : (
            serverError
          )}
        </p>
      )}

      {/* Honeypot: hidden from people, filled in by bots. */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="cf-website">Website</label>
        <input
          id="cf-website"
          type="text"
          name="website"
          value={values.website}
          onChange={update('website')}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="cf-name">Your name</label>
          <input
            id="cf-name"
            type="text"
            value={values.name}
            onChange={update('name')}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'cf-name-error' : undefined}
            autoComplete="name"
          />
          {errors.name && (
            <p className="field-error" id="cf-name-error">
              {errors.name}
            </p>
          )}
        </div>

        <div className="field">
          <label htmlFor="cf-email">Email</label>
          <input
            id="cf-email"
            type="email"
            value={values.email}
            onChange={update('email')}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'cf-email-error' : undefined}
            autoComplete="email"
          />
          {errors.email && (
            <p className="field-error" id="cf-email-error">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="field">
        <label htmlFor="cf-topic">What is this about?</label>
        <select id="cf-topic" value={values.topic} onChange={update('topic')}>
          {TOPICS.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="cf-message">Message</label>
        <textarea
          id="cf-message"
          rows={6}
          value={values.message}
          onChange={update('message')}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'cf-message-error' : 'cf-message-hint'}
          placeholder="Store name, the URL, and what you noticed…"
        />
        {errors.message ? (
          <p className="field-error" id="cf-message-error">
            {errors.message}
          </p>
        ) : (
          <p className="field-hint" id="cf-message-hint">
            Please do not include passwords or payment details.
          </p>
        )}
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-primary" disabled={sending}>
          {sending ? 'Sending…' : 'Send message'}
        </button>
        <p className="form-note">
          Or write to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </p>
      </div>
    </form>
  )
}
