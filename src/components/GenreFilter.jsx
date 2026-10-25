const ALL = 'all'

export default function GenreFilter({
  genres,
  counts,
  activeGenre,
  onGenreChange,
  total,
}) {
  return (
    <section className="genre-section" aria-labelledby="genre-heading">
      <h2 className="genre-heading" id="genre-heading">
        Browse by genre
      </h2>

      <ul className="genre-list">
        <li>
          <button
            type="button"
            className={`pill${activeGenre === ALL ? ' is-active' : ''}`}
            onClick={() => onGenreChange(ALL)}
            aria-pressed={activeGenre === ALL}
          >
            All stores
            <span className="pill-count">{total}</span>
          </button>
        </li>

        {genres.map((genre) => (
          <li key={genre}>
            <button
              type="button"
              className={`pill${activeGenre === genre ? ' is-active' : ''}`}
              onClick={() => onGenreChange(genre)}
              aria-pressed={activeGenre === genre}
            >
              {genre}
              <span className="pill-count">{counts[genre]}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}

export { ALL }
