import { useMemo, useState } from 'react'

function faviconUrl(url) {
  try {
    return `https://www.google.com/s2/favicons?domain=${new URL(url).hostname}&sz=64`
  } catch {
    return null
  }
}

export default function SiteCard({ site }) {
  const [logoFailed, setLogoFailed] = useState(false)
  const icon = useMemo(() => faviconUrl(site.url), [site.url])

  return (
    <article className="card">
      <div className="card-top">
        <span className="card-logo" aria-hidden="true">
          {icon && !logoFailed ? (
            <img
              src={icon}
              alt=""
              width="26"
              height="26"
              loading="lazy"
              onError={() => setLogoFailed(true)}
            />
          ) : (
            <span className="card-logo-fallback">{site.name.charAt(0)}</span>
          )}
        </span>

        <div className="card-heading">
          <h3 className="card-name">
            <a href={site.url} target="_blank" rel="noopener noreferrer">
              {site.name}
            </a>
          </h3>
          <p className="card-region">{site.region}</p>
        </div>
      </div>

      <p className="card-blurb">{site.blurb}</p>

      <ul className="card-tags">
        {site.genres.map((genre) => (
          <li key={genre}>{genre}</li>
        ))}
      </ul>

      <a
        className="card-link"
        href={site.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        Visit store
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="visually-hidden">(opens in a new tab)</span>
      </a>
    </article>
  )
}
