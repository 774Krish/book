import SiteCard from './SiteCard'

export default function SiteGrid({ sites, query, activeGenre, onReset }) {
  if (sites.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-title">No stores match that search</p>
        <p className="empty-body">
          {query ? (
            <>
              Nothing found for <strong>“{query}”</strong>
              {activeGenre !== 'all' ? ` in ${activeGenre}` : ''}. Try a
              different spelling or clear the filters.
            </>
          ) : (
            <>There is nothing listed in this genre yet.</>
          )}
        </p>
        <button type="button" className="btn-reset" onClick={onReset}>
          Reset filters
        </button>
      </div>
    )
  }

  return (
    <ul className="card-grid">
      {sites.map((site) => (
        <li key={site.id}>
          <SiteCard site={site} />
        </li>
      ))}
    </ul>
  )
}
