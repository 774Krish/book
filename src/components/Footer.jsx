import { useState } from 'react'

const LEGAL_LINKS = [
  { id: 'terms', label: 'Terms & conditions' },
  { id: 'privacy', label: 'Privacy policy' },
  { id: 'affiliate', label: 'Affiliate disclosure' },
  { id: 'disclaimer', label: 'Disclaimer' },
]

const COMPANY_LINKS = [
  { id: 'about', label: 'About us' },
  { id: 'contact', label: 'Contact' },
  { id: 'contact', label: 'Suggest a store' },
  { id: 'faq', label: 'FAQ' },
]

// Computed once at module load rather than during render, so the value is stable
// across re-renders.
const COPYRIGHT_YEAR = new Date().getFullYear()

export default function Footer({ onNavigate, onGenreSelect, genres }) {
  const [email, setEmail] = useState('')
  const [honeypot, setHoneypot] = useState('')
  // idle | invalid | sending | ok | failed
  const [status, setStatus] = useState('idle')
  const [failMessage, setFailMessage] = useState('')

  async function handleSubscribe(event) {
    event.preventDefault()
    if (status === 'sending') return

    if (!/^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/.test(email.trim())) {
      setStatus('invalid')
      return
    }

    setStatus('sending')
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), website: honeypot }),
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        setFailMessage(data.error || `Error ${response.status}`)
        setStatus('failed')
        return
      }

      setStatus('ok')
      setEmail('')
    } catch {
      setFailMessage('Could not reach the server.')
      setStatus('failed')
    }
  }

  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <a className="brand" href="#top">
            <span className="brand-mark" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path
                  d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v18H6.5A2.5 2.5 0 0 1 4 18.5v-13Z"
                  strokeLinejoin="round"
                />
                <path
                  d="M20 5.5A2.5 2.5 0 0 0 17.5 3H13v18h4.5a2.5 2.5 0 0 0 2.5-2.5v-13Z"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="brand-text">
              <span className="brand-name">
                Books<em>Online</em>
              </span>
              <span className="brand-tagline">storybooks &amp; novels, curated</span>
            </span>
          </a>

          <p className="footer-blurb">
            A hand-checked directory of UK bookshops that sell storybooks and
            novels. We link, you choose — the shop handles the order.
          </p>

          <form className="newsletter" onSubmit={handleSubscribe} noValidate>
            <label className="newsletter-label" htmlFor="nl-email">
              New shops, once a month
            </label>
            <div className="newsletter-row">
              <input
                id="nl-email"
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value)
                  setStatus('idle')
                }}
                placeholder="you@example.com"
                autoComplete="email"
                aria-invalid={status === 'invalid'}
              />
              <button type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Joining…' : 'Join'}
              </button>
            </div>

            {/* Honeypot: hidden from people, filled in by bots. */}
            <div className="hp" aria-hidden="true">
              <label htmlFor="nl-website">Website</label>
              <input
                id="nl-website"
                type="text"
                name="website"
                value={honeypot}
                onChange={(event) => setHoneypot(event.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {status === 'ok' && (
              <p className="newsletter-msg is-ok" role="status">
                Thanks — we have your address.
              </p>
            )}
            {status === 'invalid' && (
              <p className="newsletter-msg is-error" role="alert">
                That email address does not look right.
              </p>
            )}
            {status === 'failed' && (
              <p className="newsletter-msg is-error" role="alert">
                {failMessage}
              </p>
            )}
          </form>
        </div>

        <nav className="footer-col" aria-labelledby="footer-explore">
          <h2 id="footer-explore">Explore</h2>
          <ul>
            <li>
              <button type="button" onClick={() => onGenreSelect('all')}>
                All stores
              </button>
            </li>
            {genres.slice(0, 4).map((genre) => (
              <li key={genre}>
                <button type="button" onClick={() => onGenreSelect(genre)}>
                  {genre}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="footer-col" aria-labelledby="footer-company">
          <h2 id="footer-company">Company</h2>
          <ul>
            {COMPANY_LINKS.map((link) => (
              <li key={link.label}>
                <button type="button" onClick={() => onNavigate(link.id)}>
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="footer-col" aria-labelledby="footer-legal">
          <h2 id="footer-legal">Legal</h2>
          <ul>
            {LEGAL_LINKS.map((link) => (
              <li key={link.id}>
                <button type="button" onClick={() => onNavigate(link.id)}>
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="footer-bar">
        <p>© {COPYRIGHT_YEAR} BooksOnline. All rights reserved.</p>
        <p className="footer-bar-note">
          Store names and logos belong to their owners. Orders, delivery and
          refunds are handled by each shop.
        </p>
        <a className="to-top" href="#top">
          Back to top
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M12 19V6M6 12l6-6 6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </footer>
  )
}
