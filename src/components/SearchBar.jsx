export default function SearchBar({ value, onChange, inputRef }) {
  return (
    <div className="search" role="search">
      <svg
        className="search-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="6.5" />
        <path d="m16 16 4.5 4.5" strokeLinecap="round" />
      </svg>

      <input
        ref={inputRef}
        id="site-search"
        className="search-input"
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search stores or genres…"
        aria-label="Search bookstores"
        autoComplete="off"
        spellCheck="false"
      />

      {value ? (
        <button
          type="button"
          className="search-clear"
          onClick={() => {
            onChange('')
            inputRef.current?.focus()
          }}
          aria-label="Clear search"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>
      ) : (
        <kbd className="search-hint" aria-hidden="true">
          /
        </kbd>
      )}
    </div>
  )
}
