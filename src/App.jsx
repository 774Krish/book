import { useEffect, useMemo, useRef, useState } from 'react'
import Header from './components/Header'
import SiteGrid from './components/SiteGrid'
import Footer from './components/Footer'
import PageView from './components/PageView'
import BestSellers from './components/BestSellers'
import { ALL } from './components/GenreFilter'
import { sites } from './data/sites'
import { pages, SITE_NAME } from './data/pages'
import './App.css'

// Hash routes are "#/terms", "#/about" and so on. Anything else ("#top")
// is treated as a plain in-page anchor, so the directory stays at home.
function readRoute() {
  const hash = window.location.hash
  if (!hash.startsWith('#/')) return null
  const id = hash.slice(2)
  return Object.hasOwn(pages, id) ? id : null
}

function App() {
  const [query, setQuery] = useState('')
  const [activeGenre, setActiveGenre] = useState(ALL)
  const [pageId, setPageId] = useState(readRoute)
  const searchRef = useRef(null)
  const mainRef = useRef(null)

  const genres = useMemo(
    () => [...new Set(sites.flatMap((site) => site.genres))],
    [],
  )

  const counts = useMemo(
    () =>
      Object.fromEntries(
        genres.map((genre) => [
          genre,
          sites.filter((site) => site.genres.includes(genre)).length,
        ]),
      ),
    [genres],
  )

  const visibleSites = useMemo(() => {
    const needle = query.trim().toLowerCase()

    return sites.filter((site) => {
      if (activeGenre !== ALL && !site.genres.includes(activeGenre)) return false
      if (!needle) return true

      return [site.name, site.blurb, site.region, ...site.genres]
        .join(' ')
        .toLowerCase()
        .includes(needle)
    })
  }, [query, activeGenre])

  // Back/forward buttons and direct hash links.
  useEffect(() => {
    function handleHashChange() {
      setPageId(readRoute())
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  // Each page gets its own document title and a fresh scroll position.
  useEffect(() => {
    if (pageId) {
      document.title = `${pages[pageId].title} — ${SITE_NAME}`
      window.scrollTo({ top: 0, behavior: 'auto' })
    } else {
      document.title = `${SITE_NAME} — storybooks & novels, curated`
    }
  }, [pageId])

  // "/" jumps into the search field, Escape clears and leaves it.
  useEffect(() => {
    function handleKeyDown(event) {
      const field = searchRef.current
      const typingElsewhere =
        event.target instanceof HTMLElement &&
        /^(INPUT|TEXTAREA|SELECT)$/.test(event.target.tagName)

      if (event.key === '/' && !typingElsewhere) {
        event.preventDefault()
        field?.focus()
      }

      if (event.key === 'Escape' && document.activeElement === field) {
        setQuery('')
        field.blur()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const isFiltered = query !== '' || activeGenre !== ALL

  function resetFilters() {
    setQuery('')
    setActiveGenre(ALL)
    searchRef.current?.focus()
  }

  function goHome() {
    if (window.location.hash.startsWith('#/')) {
      window.history.pushState(
        null,
        '',
        window.location.pathname + window.location.search,
      )
    }
    setPageId(null)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }

  function navigate(id) {
    if (!Object.hasOwn(pages, id)) return
    window.location.hash = `#/${id}`
    setPageId(id)
  }

  function handleGenreChange(genre) {
    setActiveGenre(genre)
    if (pageId) goHome()
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleFooterGenre(genre) {
    setQuery('')
    setActiveGenre(genre === 'all' ? ALL : genre)
    goHome()
    requestAnimationFrame(() => {
      mainRef.current?.scrollIntoView({ block: 'start', behavior: 'auto' })
    })
  }

  return (
    <div className="app" id="top">
      <Header
        query={query}
        onQueryChange={setQuery}
        inputRef={searchRef}
        genres={genres}
        counts={counts}
        activeGenre={activeGenre}
        onGenreChange={handleGenreChange}
        total={sites.length}
        onHome={goHome}
      />

      {pageId ? (
        <PageView pageId={pageId} page={pages[pageId]} onBack={goHome} />
      ) : (
        <main className="main" ref={mainRef}>
          {!isFiltered && (
            <BestSellers onGenreSelect={handleFooterGenre} />
          )}

          <div className="results-head">
            <h1 className="results-title">
              {activeGenre === ALL ? 'Online bookstores' : activeGenre}
            </h1>

            <p className="results-count" aria-live="polite">
              {visibleSites.length} of {sites.length} stores
              {isFiltered && (
                <button
                  type="button"
                  className="link-reset"
                  onClick={resetFilters}
                >
                  clear filters
                </button>
              )}
            </p>
          </div>

          <SiteGrid
            sites={visibleSites}
            query={query}
            activeGenre={activeGenre}
            onReset={resetFilters}
          />
        </main>
      )}

      <Footer
        onNavigate={navigate}
        onGenreSelect={handleFooterGenre}
        genres={genres}
      />
    </div>
  )
}

export default App
