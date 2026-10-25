// Curated list of UK online stores that sell storybooks and novels.
//
// Every entry links to the shop's UK storefront (.co.uk, or the UK branch of
// a global site) and only shops that deliver in the UK are listed.
//
// To add a store, append an object below. Everything else (genre pills,
// counts, search) is derived from this array automatically.
//
//   name      - display name
//   url       - full https URL of the store
//   region    - where it ships from / ships to
//   blurb     - one short sentence describing the store
//   genres    - must match strings used by other entries
//   searchUrl - optional template for this store's search page. `{q}` is
//               replaced with the URL-encoded query. Omit it if unsure —
//               storeSearchUrl() then falls back to the store homepage.

export const sites = [
  {
    id: 'abebooks',
    name: 'AbeBooks UK',
    url: 'https://www.abebooks.co.uk',
    searchUrl: 'https://www.abebooks.co.uk/servlet/SearchResults?kn={q}',
    region: 'United Kingdom · sellers worldwide',
    blurb:
      'Second-hand, out-of-print and collectible copies from independent sellers, all priced in pounds.',
    genres: ['Used & Discount', 'Rare & Collectible'],
  },
  {
    id: 'amazon-books',
    name: 'Amazon UK',
    url: 'https://www.amazon.co.uk/books',
    searchUrl: 'https://www.amazon.co.uk/s?k={q}&i=stripbooks',
    region: 'United Kingdom',
    blurb:
      'Print, Kindle and Audible editions with UK delivery, plus a large second-hand marketplace.',
    genres: ['Fiction & Novels', 'Kids & Storybooks', 'Audiobooks'],
  },
  {
    id: 'audible-uk',
    name: 'Audible UK',
    url: 'https://www.audible.co.uk',
    searchUrl: 'https://www.audible.co.uk/search?keywords={q}',
    region: 'United Kingdom',
    blurb:
      'Audiobook editions of novels and childrens titles, sold through a monthly credit subscription.',
    genres: ['Audiobooks'],
  },
  {
    id: 'blackwells',
    name: "Blackwell's",
    url: 'https://blackwells.co.uk',
    searchUrl: 'https://blackwells.co.uk/bookshop/search?keyword={q}',
    region: 'United Kingdom · ships worldwide',
    blurb:
      'Oxford academic bookseller that also ships fiction and childrens titles to most countries.',
    genres: ['Fiction & Novels'],
  },
  {
    id: 'bookshop-org',
    name: 'Bookshop.org',
    url: 'https://uk.bookshop.org',
    searchUrl: 'https://uk.bookshop.org/search?keywords={q}',
    region: 'United Kingdom',
    blurb:
      'Every order is fulfilled by an independent UK bookshop, so the money stays on the local high street.',
    genres: ['Fiction & Novels', 'Kids & Storybooks'],
  },
  {
    id: 'forbidden-planet',
    name: 'Forbidden Planet',
    url: 'https://forbiddenplanet.com',
    searchUrl: 'https://forbiddenplanet.com/?s={q}',
    region: 'United Kingdom · ships worldwide',
    blurb:
      'Graphic novels, manga and tie-in fiction, alongside comics and collectibles.',
    genres: ['Comics & Manga'],
  },
  {
    id: 'foyles',
    name: 'Foyles',
    url: 'https://www.foyles.co.uk',
    searchUrl: 'https://www.foyles.co.uk/search?q={q}',
    region: 'United Kingdom',
    blurb:
      'Charing Cross Road institution with a celebrated childrens department and curated fiction tables.',
    genres: ['Fiction & Novels', 'Kids & Storybooks'],
  },
  {
    id: 'usborne',
    name: 'Usborne',
    url: 'https://usborne.com',
    region: 'United Kingdom · ships worldwide',
    blurb:
      'Publisher-direct picture books and early readers, sold through a network of local sellers.',
    genres: ['Kids & Storybooks'],
  },
  {
    id: 'waterstones',
    name: 'Waterstones',
    url: 'https://www.waterstones.com',
    searchUrl: 'https://www.waterstones.com/books/search/term/{q}',
    region: 'United Kingdom',
    blurb:
      'The UK high-street chain, strong on signed editions, childrens storybooks and staff picks.',
    genres: ['Fiction & Novels', 'Kids & Storybooks'],
  },
  {
    id: 'worldofbooks',
    name: 'World of Books',
    url: 'https://www.worldofbooks.com',
    searchUrl: 'https://www.worldofbooks.com/en-gb/search?q={q}',
    region: 'United Kingdom',
    blurb:
      'Second-hand novels and childrens classics from a West Sussex warehouse, with free UK delivery on larger orders.',
    genres: ['Used & Discount', 'Fiction & Novels', 'Kids & Storybooks'],
  },
]

// Build a link to a store's own search results for a given title.
// Falls back to the store homepage when no searchUrl is defined, so a link
// is never broken — at worst it lands you on the shop front.
//
// encodeURIComponent leaves apostrophes alone, but a few of these stores
// treat them badly in query strings, so they are escaped explicitly.
export function storeSearchUrl(site, query) {
  if (!site) return null
  if (!site.searchUrl) return site.url
  const encoded = encodeURIComponent(query).replace(/'/g, '%27')
  return site.searchUrl.replace('{q}', encoded)
}
