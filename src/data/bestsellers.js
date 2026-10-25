// Best-seller shelves shown at the top of the home page.
//
// IMPORTANT — keep this honest:
//   * `rank` mirrors the NYT list as checked on `checked`. Update the date
//     whenever you refresh a list, and never invent a rank.
//   * We do not sell these books and we do not know current prices or stock.
//     `stores` only powers "search this store" links.
//
// Each shelf is:
//   id            - stable slug, used for the section and heading ids
//   heading       - the <h2> above the row of covers
//   name / url    - the source list, shown as a link in the eyebrow line
//   category      - the NYT category those ranks come from
//   checked       - the date the ranks were read (printed in the footnote)
//   fallbackLabel - shown under the author when a book has no series/imprint
//   cta           - optional button { genre, label }; `genre` must match one
//                   used in data/sites.js
//   books         - the titles, in rank order
//
// To add a book: append an object to that shelf's `books`. `cover` is a path
// to an image bundled in /public (e.g. '/covers/my-book.png') and wins over
// everything else; otherwise `coverId` is the Open Library cover id
// (https://covers.openlibrary.org/b/id/<coverId>-L.jpg), and failing that the
// cover is fetched by `isbn`. With none of the three a typographic placeholder
// is shown. `stores` must match ids in data/sites.js. `note`, `series`,
// `imprint`, `format` and `isbn` are optional.

export const bestsellerLists = [
  {
    id: 'childrens',
    name: 'The New York Times Best Sellers',
    url: 'https://www.nytimes.com/books/best-sellers/',
    category: 'Children’s books',
    checked: '23 October 2026',
    heading: 'This week’s children’s bestsellers',
    fallbackLabel: 'Children’s',
    cta: { genre: 'Kids & Storybooks', label: 'Browse children’s stores' },
    books: [
      {
        id: 'the-wild-zone',
        rank: 1,
        title: 'The Wild Zone',
        author: 'Rick Riordan & Annabelle Oh',
        series: 'Camp Half-Blood · Book 1',
        imprint: null,
        format: 'Hardcover',
        isbn: '9780241840719',
        coverId: 1521949,
        note: 'Set in the world of Percy Jackson and the first book of the new Camp Half-Blood series — the obvious next read for anyone who finished the original five.',
        stores: ['bookshop-org', 'amazon-books', 'waterstones', 'blackwells'],
      },
      {
        id: 'building-903',
        rank: 2,
        title: 'Building 903',
        author: 'Lois Lowry',
        imprint: null,
        format: 'Hardcover',
        isbn: '9780063515109',
        coverId: 15217470,
        note: 'New middle-grade fiction from the author of The Giver, a reliable starting point for readers moving past chapter books.',
        stores: ['bookshop-org', 'amazon-books', 'waterstones', 'foyles'],
      },
      {
        id: 'wonder',
        rank: 3,
        title: 'Wonder',
        author: 'R. J. Palacio',
        imprint: 'Knopf Books for Young Readers',
        format: 'Hardcover',
        isbn: '9780375869020',
        coverId: 8223160,
        note: 'Still the default recommendation for ages 8–12, and the book most often set as a class read.',
        stores: ['bookshop-org', 'waterstones', 'abebooks', 'worldofbooks'],
      },
      {
        id: 'complete-cookbook-young-chefs',
        rank: 4,
        title: 'The Complete Cookbook for Young Chefs',
        author: "America's Test Kitchen Kids",
        imprint: 'Sourcebooks Jabberwocky',
        format: 'Hardcover',
        isbn: '9781492670025',
        coverId: 14418784,
        note: 'The odd one out on a fiction list — a tested-recipe cookbook that gets requested as a gift far more than as a read.',
        stores: ['bookshop-org', 'amazon-books', 'waterstones', 'worldofbooks'],
      },
      {
        id: 'kikis-delivery-service',
        rank: 5,
        title: "Kiki's Delivery Service",
        author: 'Eiko Kadono · illustrated by Yuta Onoda',
        imprint: 'Delacorte / Clarion',
        format: 'Hardcover',
        isbn: '9781984896667',
        coverId: 10486121,
        note: 'The novel behind the Ghibli film — a good bridge for readers who want translated fiction but not yet light novels.',
        stores: ['bookshop-org', 'waterstones', 'blackwells', 'amazon-books'],
      },
    ],
  },

  {
    id: 'nonfiction',
    name: 'The New York Times Best Sellers',
    url: 'https://www.nytimes.com/books/best-sellers/hardcover-nonfiction/',
    category: 'Hardcover nonfiction',
    checked: '25 October 2026',
    heading: 'This week’s nonfiction bestsellers',
    fallbackLabel: 'Nonfiction',
    cta: null,
    books: [
      {
        id: 'in-the-shadow-of-eight',
        rank: 1,
        title: 'In the Shadow of Eight',
        author: 'Collin Gosselin with Allie Kingsley Baker',
        isbn: '9781538784730',
        cover: '/covers/in-the-shadow-of-eight.png',
        stores: ['bookshop-org', 'amazon-books', 'waterstones', 'worldofbooks'],
      },
      {
        id: 'vibe',
        rank: 2,
        title: 'Vibe',
        author: 'Adam Grant',
        isbn: '9798217414222',
        cover: '/covers/vibe.jpg',
        stores: ['bookshop-org', 'amazon-books', 'waterstones', 'worldofbooks'],
      },
      {
        id: 'out-of-the-shadows',
        rank: 3,
        title: 'Out of the Shadows',
        author: 'Jay Stratton',
        cover: '/covers/shadows.jpg',
        stores: ['bookshop-org', 'amazon-books', 'waterstones', 'worldofbooks'],
      },
      {
        id: 'one-helluva-ride',
        rank: 4,
        title: 'One Helluva Ride',
        author: 'Michael Douglas with Shane Salerno and Michael Fleming Jr',
        cover: '/covers/one.jpg',
        stores: ['bookshop-org', 'amazon-books', 'waterstones', 'worldofbooks'],
      },
      {
        id: 'uniting-the-states',
        rank: 5,
        title: 'Uniting the States',
        author: 'Brian Kilmeade',
        cover: '/covers/images.jpg',
        stores: ['bookshop-org', 'amazon-books', 'waterstones', 'worldofbooks'],
      },
    ],
  },
]
