import SearchBar from './SearchBar'
import GenreFilter from './GenreFilter'

export default function Header({
  query,
  onQueryChange,
  inputRef,
  genres,
  counts,
  activeGenre,
  onGenreChange,
  total,
  onHome,
}) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="header-row">
          <a
            className="brand"
            href="#top"
            onClick={(event) => {
              event.preventDefault()
              onHome()
            }}
          >
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

          <SearchBar value={query} onChange={onQueryChange} inputRef={inputRef} />

          <p className="header-meta">
            <strong>{total}</strong> hand-picked stores
          </p>
        </div>

        <GenreFilter
          genres={genres}
          counts={counts}
          activeGenre={activeGenre}
          onGenreChange={onGenreChange}
          total={total}
        />
      </div>
    </header>
  )
}
