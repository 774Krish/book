import { useState } from 'react'
import { bestsellerLists } from '../data/bestsellers'
import { sites, storeSearchUrl } from '../data/sites'

const BASE_URL = import.meta.env.BASE_URL

// -L is the large size (~500px wide), sharp enough for the card at any
// device pixel ratio without shipping the original scan. A locally bundled
// `cover` path wins over both. Books with no usable image get a typographic
// placeholder rather than a broken image.
function coverUrl(book) {
  // `cover` paths are written as if served from the site root
  // ('/covers/one.jpg'), so the build's base path goes in front of them.
  // Without this the images 404 on a GitHub Pages project site.
  if (book.cover) return `${BASE_URL}${book.cover.replace(/^\//, '')}`
  if (book.coverId) {
    return `https://covers.openlibrary.org/b/id/${book.coverId}-L.jpg`
  }
  if (book.isbn) {
    return `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`
  }
  return null
}

function BookCard({ book, fallbackLabel }) {
  const [coverFailed, setCoverFailed] = useState(false)
  const cover = coverUrl(book)

  // Open Library answers a missing cover with a blank 1x1 image rather than a
  // 404, so a successful load is only trusted once it has real dimensions.
  function handleCoverLoad(event) {
    if (event.currentTarget.naturalWidth < 10) setCoverFailed(true)
  }

  const storeLinks = book.stores
    .map((id) => sites.find((site) => site.id === id))
    .filter(Boolean)

  const meta = [book.series || book.imprint || fallbackLabel, book.format]
    .filter(Boolean)
    .join(' · ')

  return (
    <article className="book">
      <div className="book-frame">
        <span className="book-rank" aria-label={`Number ${book.rank}`}>
          {book.rank}
        </span>

        {!cover || coverFailed ? (
          <div className="book-cover book-cover-fallback" aria-hidden="true">
            <span>{book.title.slice(0, 2)}</span>
          </div>
        ) : (
          <img
            className="book-cover"
            src={cover}
            alt={`Cover of ${book.title} by ${book.author}`}
            width="150"
            height="225"
            loading="lazy"
            onLoad={handleCoverLoad}
            onError={() => setCoverFailed(true)}
          />
        )}
      </div>

      <h3 className="book-title">{book.title}</h3>
      <p className="book-author">{book.author}</p>
      <p className="book-imprint">{meta}</p>

      {book.note && <p className="book-note">{book.note}</p>}

      <p className="book-stores-label">Find it at</p>
      <ul className="book-stores">
        {storeLinks.map((site) => (
          <li key={site.id}>
            <a
              href={storeSearchUrl(site, book.title)}
              target="_blank"
              rel="noopener noreferrer"
              title={`Search ${site.name} for ${book.title}`}
            >
              {site.name}
            </a>
          </li>
        ))}
      </ul>
    </article>
  )
}

export default function BestSellers({ onGenreSelect }) {
  return (
    <>
      {bestsellerLists.map((shelf) => (
        <Shelf key={shelf.id} shelf={shelf} onGenreSelect={onGenreSelect} />
      ))}
    </>
  )
}

function Shelf({ shelf, onGenreSelect }) {
  // The first shelf keeps the plain "bestsellers" anchor so existing links to
  // #bestsellers still land on the top of the page's book section.
  const sectionId =
    shelf.id === 'childrens' ? 'bestsellers' : `bestsellers-${shelf.id}`
  const headingId = `${sectionId}-heading`

  return (
    <section className="shelf" id={sectionId} aria-labelledby={headingId}>
      <div className="shelf-head">
        <div>
          <p className="shelf-eyebrow">
            <span className="nyt-badge" aria-hidden="true">
              NYT
            </span>
            <a href={shelf.url} target="_blank" rel="noopener noreferrer">
              {shelf.name}
            </a>
            <span className="shelf-eyebrow-sep" aria-hidden="true">
              ·
            </span>
            {shelf.category}
          </p>
          <h2 className="shelf-title" id={headingId}>
            {shelf.heading}
          </h2>
        </div>

        {shelf.cta && (
          <button
            type="button"
            className="shelf-more"
            onClick={() => onGenreSelect(shelf.cta.genre)}
          >
            {shelf.cta.label}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      </div>

      <ul className="shelf-grid">
        {shelf.books.map((book) => (
          <li key={book.id}>
            <BookCard book={book} fallbackLabel={shelf.fallbackLabel} />
          </li>
        ))}
      </ul>

      <p className="shelf-note">
        Ranks are taken from {shelf.name} — {shelf.category}, as checked on{' '}
        {shelf.checked}. Links open each store’s own search results — prices,
        editions and stock are set by the store, not by us.
      </p>
    </section>
  )
}
