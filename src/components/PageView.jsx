import ContactForm from './ContactForm'

export default function PageView({ pageId, page, onBack }) {
  return (
    <main className="page">
      <article className="page-inner">
        <button type="button" className="page-back" onClick={onBack}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to the directory
        </button>

        <header className="page-head">
          <h1 className="page-title">{page.title}</h1>
          <p className="page-updated">Last reviewed {page.updated}</p>
        </header>

        <p className="page-intro">{page.intro}</p>

        {page.sections.map((section) => (
          <section className="page-section" key={section.heading}>
            <h2>{section.heading}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
            {section.list && (
              <ul className="page-list">
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}

        {pageId === 'contact' && (
          <section className="page-section">
            <h2>Send a message</h2>
            <ContactForm />
          </section>
        )}

        <p className="page-footnote">
          This page is general information, not legal advice. Review it with a
          qualified professional before relying on it for your own site.
        </p>
      </article>
    </main>
  )
}
